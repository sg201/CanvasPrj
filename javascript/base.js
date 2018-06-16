var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var height = canvas.height = 1000;
var width = canvas.width = 1000;
var mouseDown = false
var lastX = 0, lastY= 0;

context.lineWidth = 3;

//document.addEventListener("click", onMouseClick, false);
document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mouseup", onMouseUp, false);

document.addEventListener("touchmove", onTouchMove, false);
document.addEventListener("touchstart", onTouchStart, false);
document.addEventListener("touchend", onMouseUp, false);

function onMouseDown(e) {
  mouseDown = true;
  Draw(e.pageX - 10 ,e.pageY - 10, mouseDown);
}

function onMouseUp(e) {
  mouseDown = false;
}
function onMouseMove(e) {
  Draw(e.pageX - 10 ,e.pageY -10 , mouseDown);
}

function onTouchStart(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
  mouseDown = true;
  var touch = e.touches[0];
  lastX = touch.clientX - canvas.offsetLeft;
  lastY = touch.clientY - canvas.offsetTop;
  Draw(touch.clientX - canvas.offsetLeft,touch.clientY - canvas.offsetTop, mouseDown);
}

function onTouchMove(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
  var touch = e.touches[0];
  Draw(touch.clientX - canvas.offsetLeft,touch.clientY - canvas.offsetTop, mouseDown);
}

function Draw(x, y, mouseDown) {
  if (mouseDown && x < 1000 && y < 1000) {
    context.strokeStyle = "#000";
    context.lineJoin = "round"
    context.beginPath();
    if(lastX === x && lastY === y) {
      context.arc(x, y, 2, 1, 2 * Math.PI, true);
    }
    else {
      context.moveTo(lastX, lastY);
      context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
  }
  lastX = x;
  lastY = y;
}

function clearCanvas() {
  context.clearRect(0,0,canvas.width,canvas.height);
}

var brushSlider = document.getElementById("brushRange");
context.lineWidth = brushSlider.value;

brushSlider.addEventListener("change", function () {
  context.lineWidth = brushSlider.value;
});

function updateSizeText(val) {
  document.getElementById("textInput").value=val;
}
