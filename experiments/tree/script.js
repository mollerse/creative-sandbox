var canvas = document.querySelector('.c');
var ctx = canvas.getContext('2d');
var width, height;

var cos = Math.cos;
var sin = Math.sin;
var random = require('../../utils/random');
var trimUnit = require('../../utils/trim');

var clearContext = function clearContext() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  ctx.lineCap = 'round';
};

var canvasSize = function() {
  var s;

  setTimeout(function() {
    s = getComputedStyle(canvas);
    width = canvas.width = trimUnit(s.width, 'px');
    height = canvas.height = trimUnit(s.height, 'px');
    treeA = tree(width/2, height, Math.min(100, height/4), 15);
    clearContext();
  }, 5);
}

function tree(x, y, height, width, left) {
  var posX = x,
    posY = y,
    cpX,
    cpY,
    offsetX = left ? random(-65,0) : random(0,65),
    shrinkWidth,
    shrinkHeight,
    branches = [];

  var update = function() {
    cpX = width * random(-0.6, 0.6);
    cpY = height * random(0.2, 0.8);
    shrinkWidth = random(0.4, 0.8);
    shrinkHeight = random(0.6, 0.9);

    if(width > 1 && height > 1) {
      branches = [];
      for(var i = 0; i < random(1,4); i++) {
        branches[i] = tree(posX + offsetX, posY-height, height*shrinkHeight, width*shrinkWidth, i % 2 == 0);
      }
    }
  };

  return {
    draw: function() {
      update();

      ctx.strokeStyle = '#f00';
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(posX, posY);
      ctx.lineTo(posX + offsetX, posY - height);
      ctx.stroke();

      return branches;

    }
  };

};

var treeA;
var branches = [];

function draw() {

  var newBranches = [];
  if(branches.length < 1) {
    newBranches = treeA.draw();
  } else {
    branches.forEach(function(b){
      var moreBranches = b.draw();
      moreBranches.forEach(function(mb) {
        newBranches.push(mb);
      });
    });
  }
  branches = newBranches;

}

canvasSize();


var interval = setInterval(draw, 100);
setTimeout(function() {
  clearInterval(interval);
}, 2000);

addEventListener('resize', canvasSize, false);