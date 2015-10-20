'use strict';
var Connection = require('../lib/connection.js'),
    conString = 'postgres://postgres:12345678@localhost/portal',
    postgres = new Connection(conString),
    router = require('express').Router();

router.post('/query', function(req, res, next){
    var queryStartTime = Date.now();

    if (!req.body.sql){
        return next();
    }
    postgres.query(req.body.sql, req.body.params || {}, function(err, result){
        if (err) return next(err);
        res.json({
            fields: result.fields,
            rows: result.rows,
            rowCount: result.rowCount,
            time: Date.now() - queryStartTime
        });
    });
    
});

module.exports = router;
