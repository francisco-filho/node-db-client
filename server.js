var http = require('http'),
    express = require('express'),
    app = require('express')(),
    pg = require('pg'),
    bodyParser = require('body-parser'),
    logger = require('morgan');

app.set('port', 3030);

app.use(logger('combined'));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.post('/api/query', function(req, res, next){
    var queryStartTime = Date.now();

    query(req.body.sql, {}, function(result){
        
        var data = {
            fields: result.fields,
            rows: result.rows,
            rowCount: result.rowCount,
            time: Date.now() - queryStartTime
        };

        res.send(data);
    });
});

/** Database connection **/
var conString = 'postgres://postgres:12345678@localhost/portal';
var client, queryDone;
pg.connect(conString, function(err, cli, done){
    if (err) console.error(err);
    client = cli;
    queryDone = done;
});

var query = function(sql, params, callback){
    params.rowMode = 'array';
    params.text = sql;
    client.query(params, function(err, result){
        queryDone();

        if (err) console.error(err); 
        callback(result);
    });
};

var server = http
    .createServer(app)
    .listen(app.get('port'), function(){
        console.info('Server Listening on port: ', app.get('port'));
    });
