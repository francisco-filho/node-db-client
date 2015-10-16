'use strict';

var http = require('http'),
    express = require('express'),
    app = require('express')(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    api = require('./routes/api.js');

app.set('port', 3030);

app.use(logger('combined'));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

/** Routes **/
app.use('/api', api);

/** Starting the server **/
http
    .createServer(app)
    .listen(app.get('port'), function(){
        console.info('Server Listening on port: ', app.get('port'));
    });
