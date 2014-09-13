


var express = require('express');



var app = express();
app.get('/', function(req, res){
    var play = '';
    if(req.query && req.query.q && req.query.q.length > 0){
        play = '<Play digits="ww' + req.query.q.split('').join('ww') + '" > </Play>';
    }
    var output = '<?xml version="1.0" encoding="UTF-8"?><Response>' +
 play +
  '<Record maxLength="100" timeout="4" transcribe="true" transcribeCallback="http://482c5aa6.ngrok.com/transcribe" ' +
  'action="http://482c5aa6.ngrok.com/"/></Response>';
  res.send(output);
  console.log(output);
})





var port = process.env.PORT || 3000;
app.listen(port);