var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var needle = require('needle');
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res){
  res.send({'ok': true});
});

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});




// Hey There demo
var notifySpark = function(status, next){
  var url = [
    'https://api.spark.io/v1/devices/',
    process.env.SPARK_CORE_ID,
    '/updateState'
  ].join('');

  var params = [
    'access_token=',
    process.env.SPARK_CORE_TOKEN,
    '&params=',
    status
  ].join('');

  needle.post(url, params, next);
};

var busy = false;
var handleStatusUpdate = function(data){
  if(!busy){
    busy = true;

    io.sockets.emit('disable-buttons');
    notifySpark(data.status, function(err, res){
      busy = false;
      io.sockets.emit('enable-buttons');
    });
  }
};

io.on('connection', function(socket){
  socket.on('status-update', handleStatusUpdate);
});





// Phidgets stuff / Sup demo
var phidgetsLib = require('phidgets');
var phidget = new phidgetsLib();

phidget.connect(function(){
  console.log('phidget connected');
});

phidget.on('input', function(boardId, inputId, state){
  if(inputId == 1 && state == 1)
    io.sockets.emit('sup');
});
