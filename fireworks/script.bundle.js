(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9tb2xsZXJzZS9wcm9qZWN0cy9jcmVhdGl2ZS9ub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvbW9sbGVyc2UvcHJvamVjdHMvY3JlYXRpdmUvdHJlZS9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG52YXIgd2lkdGggPSBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbnZhciBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xudmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xudmFyIGNvcyA9IE1hdGguY29zO1xudmFyIHNpbiA9IE1hdGguc2luO1xuXG5mdW5jdGlvbiByYW5kb20gKG1pbiwgbWF4KSB7XG4gIHJldHVybiAoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn07XG5cbmZ1bmN0aW9uIGNsZWFyQ29udGV4dCgpIHtcbiAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG59O1xuXG5mdW5jdGlvbiBwYXJ0aWNsZSh4LCB5LCByLCBnLCBiKSB7XG4gIHZhciB2ZWxvY2l0eSA9IHJhbmRvbSgtMTAsMTApO1xuICB2YXIgYW5nbGUgPSByYW5kb20oMCwgMipNYXRoLlBJKTtcbiAgdmFyIGZhZGUgPSAwLjAyO1xuICB2YXIgc2hyaW5rID0gMC4zO1xuICB2YXIgZHJhZyA9IHJhbmRvbSgwLjIsMSk7XG5cbiAgdmFyIHBvc1ggPSB4LCBwb3NZID0geTtcbiAgdmFyIGFscGhhID0gMC45O1xuICB2YXIgc2l6ZSA9IDEwO1xuXG4gIHZhciB1cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBwb3NYID0gcG9zWCsoY29zKGFuZ2xlKSp2ZWxvY2l0eSpkcmFnKTtcbiAgICBwb3NZID0gcG9zWSsoc2luKGFuZ2xlKSp2ZWxvY2l0eSpkcmFnKTtcbiAgICBhbHBoYSAtPSBmYWRlO1xuICAgIHNpemUgLT0gc2hyaW5rO1xuICB9XG4gIHJldHVybiB7XG4gICAgZHJhdzogZnVuY3Rpb24oKSB7XG4gICAgICB1cGRhdGUoKTtcbiAgICAgIGlmKGFscGhhIDwgMCB8fCBzaXplIDwgMCkgcmV0dXJuO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKCcrcisnLCAnK2crJywgJytiKycsICcrYWxwaGErJyknO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhwb3NYLCBwb3NZLCBzaXplLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gIH07XG5cbn07XG5cbnZhciBjbHVzdGVycyA9IFtdO1xuXG5kb2N1bWVudC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICBpZihjbHVzdGVycy5sZW5ndGggPiA2KSBjbHVzdGVycy5zaGlmdCgpO1xuICBjbHVzdGVycy5wdXNoKG1ha2VDbHVzdGVyKGUucGFnZVgsIGUucGFnZVkpKTtcbn1cblxuZnVuY3Rpb24gbWFrZUNsdXN0ZXIoeCwgeSkge1xuICB2YXIgcGFydGljbGVzID0gW107XG4gIHZhciByID0gcmFuZG9tKDAsIDEpID4gMC41ID8gMCA6IDI1NTtcbiAgdmFyIGcgPSByYW5kb20oMCwgMSkgPiAwLjUgPyAwIDogMjU1O1xuICB2YXIgYiA9IHJhbmRvbSgwLCAxKSA+IDAuNSA/IDAgOiAyNTU7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCAyMDA7IGkrKykge1xuICAgIHBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKHgrcmFuZG9tKC0xMCwxMCksIHkrcmFuZG9tKC0xMCwxMCksIHIsIGcsIGIpKTtcbiAgIH1cbiAgcmV0dXJuIHBhcnRpY2xlcztcbn1cblxuZnVuY3Rpb24gZHJhdygpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICBjbGVhckNvbnRleHQoKTtcbiAgY2x1c3RlcnMuZm9yRWFjaChmdW5jdGlvbihjKSB7XG4gICAgYy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtwLmRyYXcoKX0pO1xuICB9KTtcbn1cbmRyYXcoKTsiXX0=
