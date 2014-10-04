var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res){
  res.send({'ok': true});
});

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});
