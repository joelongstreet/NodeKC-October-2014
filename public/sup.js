var socket = io();
var $background = document.getElementById('container');
var $sup = document.getElementById('sup');
var $audio = document.getElementById('clip');

var colors = [
  'rgb(051,048,065)',
  'rgb(036,069,062)',
  'rgb(075,088,050)',
  'rgb(159,140,052)',
  'rgb(166,064,055)',
];

var highlight = function(){
  var randoIndex = Math.floor(Math.random() * colors.length);
  var color = colors[randoIndex];
  $background.style.backgroundColor = color;
  $sup.className = 'highlight';

  setTimeout(function(){
    $background.style.backgroundColor = 'rgb(0,0,0)';
    sup.className = '';
  }, 300);
};

var playSound = function(){
  if($audio.paused)
    $audio.play();
  else{
    $audio.pause();
    $audio.currentTime = 0;
    $audio.play();
  }
};

socket.on('sup', function(){
  highlight();
  playSound();
});
