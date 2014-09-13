var express = require('express');
var app = express();
var url = require('url');

// queries: tonesSoFar, number
app.get('/', function(req, res){
    var play = '';

    if (req.query.tonesSoFar && req.query.tonesSoFar.length > 0){
        play = '<Play digits="ww' + req.query.tonesSoFar.split('').join('ww') + '"> </Play>';
    } else {
        return res.send(400).end();
    }

    if (!req.query.number || !req.query.name) {
        return res.send(400).end();
    }

    var callbackUrl = url.format({
      host: process.env.CALLBACK_HOST,
      protocol: 'http',
      query: {
        tonesSoFar: req.query.tonesSoFar,
        number: req.query.number,
        name: req.query.name
      }
    });

    var output = '<?xml version="1.0" encoding="UTF-8"?><Response>' + play +
    '<Record maxLength="30" timeout="4" transcribe="true" transcribeCallback="' +
    callbackUrl + '" action="' + process.env.CALLBACK_HOST + '"/></Response>';
    res.send(output);
    console.log(output);
});

var port = process.env.PORT || 3000;
app.listen(port);
