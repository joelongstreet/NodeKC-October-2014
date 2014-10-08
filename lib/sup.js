module.exports = function(io){

  if(process.env.ENV != 'remote'){
    var phidgetsLib = require('phidgets');
    var phidget = new phidgetsLib();

    phidget.connect(function(){
      console.log('phidget connected');
    });

    phidget.on('input', function(boardId, inputId, state){
      if(inputId == 1 && state == 1)
        io.sockets.emit('sup');
    });
  }
};
