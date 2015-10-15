var http = require('http'),
    app = require('express')(),
    bodyParser = require('body-parser'),
    logger = require('morgan');

app.set('port', 3030);

app.use(logger('combined'));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.post('/api/query', function(req, res, next){
    next();
});

var server = http
    .createServer(app)
    .listen(app.get('port'), function(){
        console.info('Server Listening on port: ', app.get('port'));
    });
