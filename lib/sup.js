module.exports = function(io, port){

  // If run locally, init the phidgets lib
  // and connect to the remote socket-io server
  if(process.env.ENV != 'remote'){
    var phidgetsLib = require('phidgets');
    var phidget = new phidgetsLib();

    var ioClient = require('socket.io-client')(process.env.URL);
    ioClient.on('connect', function(){
      console.log('connected to remote server');
    });

    phidget.connect(function(){
      console.log('phidget connected');
    });

    phidget.on('input', function(boardId, inputId, state){
      if(inputId == 1 && state == 1)
        ioClient.emit('sup');
    });
  }

  // If this is remote, expose this method to emit
  // client events
  return {
    saySup : function(){
      io.sockets.emit('sup');
    }
  };
};
