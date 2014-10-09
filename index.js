var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


var sup = require('./lib/sup')(io, port);
var heyThere = require('./lib/hey-there')(io);


app.use(express.static(path.join(__dirname, 'public')));
app.use('/hey-there', function(req, res){
  res.sendfile('public/hey-there.html');
});
app.use('/', function(req, res){
  res.sendfile('public/sup.html');
});
app.use('/sup', function(req, res){
  res.sendfile('public/sup.html');
});
server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});


io.on('connection', function(socket){
  console.log('new client connected');

  socket.on('sup', sup.saySup);
  socket.on('status-update', heyThere.statusUpdate);
});
