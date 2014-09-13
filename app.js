var express = require('express');
var app = express();

// queries: tonesSoFar, number
app.get('/', function(req, res){
    var play = '';

    if (req.query.tonesSoFar && req.query.tonesSoFar.length > 0){
        play = '<Play digits="ww' + req.query.tonesSoFar.split('').join('ww') + '" > </Play>';
    } else {
        return res.send(400);
    }

    if (!req.query.number) {
        return res.send(400);
    }

    var output = '<?xml version="1.0" encoding="UTF-8"?><Response>' +
    play +
    '<Record maxLength="30" timeout="4" transcribe="true" transcribeCallback="' + process.env.CALLBACK_HOST +
    '?tonesSoFar='+req.query.tonesSoFar + '&number='+req.query.number+'" ' +
    'action="'+process.env.CALLBACK_HOST+'"/></Response>';
    res.send(output);
    console.log(output);
});

var port = process.env.PORT || 3000;
app.listen(port);
