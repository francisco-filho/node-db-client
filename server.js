var http = require('http'),
    express = require('express'),
    app = require('express')(),
    pg = require('pg'),
    bodyParser = require('body-parser'),
    logger = require('morgan');
var Connection = require('./lib/connection');

app.set('port', 3030);

app.use(logger('combined'));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.post('/api/query', function(req, res, next){
    var queryStartTime = Date.now();

    if (!req.body.sql){
        return next();
    }

    postgres.query(req.body.sql, {}, function(err, result){
        res.json({
            fields: result.fields,
            rows: result.rows,
            rowCount: result.rowCount,
            time: Date.now() - queryStartTime
        });
    });

});

/** Database connection **/
var conString = 'postgres://postgres:12345678@localhost/portal';

var postgres = new Connection(conString);

//Starting the server
var server = http
    .createServer(app)
    .listen(app.get('port'), function(){
        console.info('Server Listening on port: ', app.get('port'));
    });
