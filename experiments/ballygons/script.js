var canvas = document.querySelector('.c');
var ctx = canvas.getContext('2d');
var width, height;

var cos = Math.cos;
var sin = Math.sin;
var random = require('../../utils/random');
var trimUnit = require('../../utils/trim');

var thingy;

var points = [];

var clearContext = function clearContext() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
};

var canvasSize = function() {
  var s;

  setTimeout(function() {
    s = getComputedStyle(canvas);
    width = canvas.width = trimUnit(s.width, 'px');
    height = canvas.height = trimUnit(s.height, 'px');
    clearContext();
    thingy = ballygon(width/2,height/2);
    thingy.initialize();
  }, 5);
};

function ballygon(x, y, posDX) {
  var b_width,
    b_length,
    angle,
    size,
    deltaX,
    deltaY;

  var update = function() {
    b_width = random(1,5);
    b_length = random(25,100);
    size = random(5,10);
    angle = random(0,25);//!posDX ? random(-90,-45) : random(45, 90);
    points.push({x: x, y: y});
    deltaX = b_length * cos(angle);
    deltaY = b_length * sin(angle);

    if(x + deltaX < 0 || x + deltaX > width || y + deltaY < 0 || y + deltaY > height) {
      angle-=180;
      deltaX = b_length * cos(angle);
      deltaY = b_length * sin(angle);
    }
  };

  return {
    initialize: function(){
      ctx.strokeStyle = '#79d82a';
      ctx.fillStyle = '#79d82a';

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();
    },
    draw: function() {
      update();

      ctx.lineWidth = b_width;

      ctx.beginPath();
      ctx.moveTo(x,y)
      ctx.lineTo(x + deltaX, y + deltaY);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(x + deltaX, y + deltaY, size, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();

      return ballygon(x + deltaX, y + deltaY, deltaX > 0);
    },
    close: function() {

    }
  };

};

canvasSize();

function draw() {
  var newThingy = thingy.draw();
  thingy = newThingy;
}



var interval = setInterval(draw, 100);
setTimeout(function() {
  clearInterval(interval);
  thingy.close();
}, 20000);

addEventListener('resize', canvasSize, false);