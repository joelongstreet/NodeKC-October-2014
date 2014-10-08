var socket = io();

$(function(){

  socket.on('disable-buttons', function(){
    $('.button').addClass('disabled');
  });

  socket.on('enable-buttons', function(){
    $('.button').removeClass('disabled');
  });

  $('.button').click(function(e){
    var status = e.target.dataset.status;
    if(!$(this).hasClass('disabled'))
      socket.emit('status-update', { status : status});
  });

});
