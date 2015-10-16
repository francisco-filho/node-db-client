var pg = require('pg');

function Connection(connString){
    this.connString = connString;
}

Connection.prototype = {
    conn: null,

    connect: function(){
        'use strict';
        pg.connect(this.connString, function(err, client, done){
            if (err) {
                console.log(err);
                if (client) { done(client); }
            }

            done();
        });
    },

    query: function(sql, params, callback){
        'use strict';
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
            client.query(options, function(err, result){
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
        });
    },

    close: function(){
    
    }
};

module.exports = Connection;
