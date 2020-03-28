var sys = require('sys');
var exec = require('child_process').exec;
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index/form.html'));
});
app.get('/:file', function (req, res) {
  var options = {
    root: path.join(__dirname, 'index'),
    dotfiles: 'allow',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  var file = req.params.file;
  res.sendFile(file, options);
});
app.get('/yt-stream/:url', function (req, res) {
  res.send('Streaming YouTube Video...');
  exec("livestreamer --player=mplayer https://www.youtube.com/watch?v=" + req.params.url + " best");
});
app.post('/stream/', function (req, res) {
  res.send('Streaming Video...');
  exec("livestreamer --player=mplayer " + req.query.url + " best");
});

// Setup PiCAST Server
var srv = app.listen(3000, function () {
  var host = srv.address().address;
  var port = srv.address().port;

  console.log('Access at http://%s:%s', host, port);
});
