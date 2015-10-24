'use strict';

var pg = require('pg');

function Connection(connString){
    this.connString = connString;
}

Connection.prototype = {
    conn: null,

    connect: function(){
        pg.connect(this.connString, function(err, client, done){
            if (err) {
                console.log(err);
                if (client) { done(client); }
            }
            done();
        });
    },

    query: function(sql, params, callback){
        pg.connect(this.connString, function(err, client, done){
            if (err){
                console.err(err);
                done(client);
            }
            var options = {
                text: sql, 
                values: params,
                rowMode: 'array'
            };
            var q = client.query(options, function(err, result){
                if (err) {
                    done(client);
                    return {
                        err: err,
                        success: false
                    };
                } 
                done();
                callback(err, result);
            });
            
            return function(){
                pg.cancel(client.connectionParameters, client, q);
            };
        });
    },
    getSchema: function(params, callback){
        var sql = "SELECT table_schema, table_name "+
                "FROM information_schema.tables "+
                "WHERE "+
                "table_type = 'BASE TABLE' and "+
                "table_catalog='portal' AND table_schema NOT IN ('pg_catalog','information_schema') "+
                "ORDER BY 1, 2";

        return this.query(sql, params, callback);
    }
};

module.exports = Connection;
