var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var height = canvas.height = 1000;
var width = canvas.width = 1000;
var mouseDown = false
var lastX = 0, lastY= 0;
var midxy = [];

context.lineWidth = 3;

//document.addEventListener("click", onMouseClick, false);
document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mouseup", onMouseUp, false);
document.addEventListener("contextmenu", event => event.preventDefault());

document.addEventListener("touchmove", onTouchMove, false);
document.addEventListener("touchstart", onTouchStart, false);
document.addEventListener("touchend", onMouseUp, false);

function onMouseDown(e) {
  if(e.button === 0) {
    lastX = 0;
    lastY= 0;
    mouseDown = true;
    Draw(e.pageX - 10 ,e.pageY - 10);
  }
}

function onMouseUp(e) {
  mouseDown = false;
  midxy = []
}
function onMouseMove(e) {
  if (mouseDown) {
    Draw(e.pageX - 10 ,e.pageY -10 );
    midxy.push(e.pageX - 10,e.pageY -10);
  }
}

function onTouchStart(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
  mouseDown = true;
  var touch = e.touches[0];
  lastX = touch.clientX - canvas.offsetLeft;
  lastY = touch.clientY - canvas.offsetTop;
  Draw(touch.clientX - canvas.offsetLeft,touch.clientY - canvas.offsetTop);
}

function onTouchMove(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
  var touch = e.touches[0];
  Draw(touch.clientX - canvas.offsetLeft,touch.clientY - canvas.offsetTop);
}

function Draw(x, y) {
  if (lastX ===0 && lastY === 0) {
    lastX = x;
    lastY = y;
  }
  if (mouseDown && x < 1000 && y < 1000) {
    context.strokeStyle = "#000";
    context.lineJoin = "round"
    context.beginPath();
    if(lastX === x && lastY === y) {
      context.arc(x, y, 2, 1, (2 * Math.PI), true);
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
  document.getElementById("penCircle").style["height"]=val+"px";
  document.getElementById("penCircle").style["width"]=val+"px";
  document.getElementById("penCircleBox").style["padding-bottom"]=(100-val)/2+"px";
  document.getElementById("penCircleBox").style["padding-left"]=(100-val)/2+"px";
  document.getElementById("penCircleBox").style["padding-top"]=(100-val)/2+"px";
}
