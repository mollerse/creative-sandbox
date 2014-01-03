var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var cos = Math.cos;
var sin = Math.sin;

function random (min, max) {
  return (Math.random() * (max - min)) + min;
};

function clearContext() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
};

function particle(x, y, r, g, b) {
  var velocity = random(-10,10);
  var angle = random(0, 2*Math.PI);
  var fade = 0.02;
  var shrink = 0.3;
  var drag = random(0.2,1);

  var posX = x, posY = y;
  var alpha = 0.9;
  var size = 10;

  var update = function() {
    posX = posX+(cos(angle)*velocity*drag);
    posY = posY+(sin(angle)*velocity*drag);
    alpha -= fade;
    size -= shrink;
  }
  return {
    draw: function() {
      update();
      if(alpha < 0 || size < 0) return;
      ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', '+alpha+')';
      ctx.beginPath();
      ctx.arc(posX, posY, size, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
    }
  };

};

var clusters = [];

document.onclick = function(e) {
  if(clusters.length > 6) clusters.shift();
  clusters.push(makeCluster(e.pageX, e.pageY));
}

function makeCluster(x, y) {
  var particles = [];
  var r = random(0, 1) > 0.5 ? 0 : 255;
  var g = random(0, 1) > 0.5 ? 0 : 255;
  var b = random(0, 1) > 0.5 ? 0 : 255;
  for(var i = 0; i < 200; i++) {
    particles.push(particle(x+random(-10,10), y+random(-10,10), r, g, b));
   }
  return particles;
}

function draw() {
  requestAnimationFrame(draw);
  clearContext();
  clusters.forEach(function(c) {
    c.forEach(function(p) {p.draw()});
  });
}
draw();