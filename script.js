/**
 * @type HTMLCanvasElement
 */
const toolbar = document.getElementById("toolbar");

const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

// const topCanvas = document.getElementById("top-drawing-board");
// const topCtx = topCanvas.getContext("2d");

// const topCanvasOffsetX = topCanvas.offsetLeft;
// const topCanvasOffsetY = topCanvas.offsetTop;

// topCanvas.width = window.innerWidth - topCanvasOffsetX;
// topCanvas.height = window.innerHeight - topCanvasOffsetY;

let isPainting = false;
let isEraser = false;
let paintBtn = false;
let eraserBtn = false;
let textBtn = false;
let lineBtn = false;
let lineWidth = 5;
let startX;
let startY;
let tool;

toolbar.addEventListener("change", (event) => {
  switch (event.target.id) {
    case "stroke":
      ctx.strokeStyle = event.target.value;
      break;
    case "lineWidth":
      lineWidth = event.target.value;
      break;
  }
});

canvas.onmousedown = (event) => {
  switch (tool) {
    case "Pencil":
      isPainting = true;
      startX = event.x;
      startY = event.y;
      break;
    case "Eraser":
      isEraser = true;
      startX = event.x;
      startY = event.y;
      break;
    case "Text":
      if (textBtn) {
        addInput(event.x - canvasOffsetX, event.y - canvasOffsetY);
      }
      break;
    case "Line":
      if (lineBtn) {
        ctx.beginPath();
        ctx.moveTo(event.x - canvasOffsetX, event.y - canvasOffsetY);
      }
      break;
    default:
      break;
  }
};

canvas.addEventListener("mouseup", (event) => {
  switch (tool) {
    case "Pencil":
      isPainting = false;
      ctx.stroke();
      ctx.beginPath();
      break;
    case "Eraser":
      isEraser = false;
      ctx.stroke();
      ctx.beginPath();
      break;
    case "Line":
      if (lineBtn) {
        ctx.lineTo(event.x - canvasOffsetX, event.y - canvasOffsetY);
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
      break;
    default:
      break;
  }
});

canvas.addEventListener("mousemove", (event) => {
  switch (tool) {
    case "Pencil":
      if (isPainting && paintBtn) {
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineTo(event.x - canvasOffsetX, event.y);
        ctx.stroke();
      }
      break;
    case "Eraser":
      if (isEraser && eraserBtn) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "square";
        ctx.lineTo(event.x - canvasOffsetX, event.y);
        ctx.stroke();
      }
      break;
    default:
      break;
  }
});

function pencil() {
  paintBtn = !paintBtn;
  tool = paintBtn ? "Pencil" : undefined;
  if (paintBtn) {
    eraserBtn = false;
    textBtn = false;
    lineBtn = false;
  }
}

function eraser() {
  eraserBtn = !eraserBtn;
  tool = eraserBtn ? "Eraser" : undefined;

  if (eraserBtn) {
    paintBtn = false;
    textBtn = false;
    lineBtn = false;
  }
}

function text() {
  textBtn = !textBtn;
  tool = textBtn ? "Text" : undefined;

  if (textBtn) {
    eraserBtn = false;
    paintBtn = false;
    lineBtn = false;
  }
}

function drawLine() {
  lineBtn = !lineBtn;
  tool = lineBtn ? "Line" : undefined;

  if (lineBtn) {
    eraserBtn = false;
    paintBtn = false;
    textBtn = false;
  }
}

function addInput(x, y) {
  let textarea = document.createElement("textarea");
  textarea.style.position = "fixed";
  textarea.style.left = x - 4 + "px";
  textarea.style.top = y - 4 + "px";
  textarea.onkeydown = handleEnter;
  document.body.appendChild(textarea);
  textBtn = false;
}

function handleEnter(event) {
  let keyCode = event.keyCode;
  if (keyCode == 13) {
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "14px sans-serif";
    ctx.fillText(
      this.value,
      parseInt(this.style.left, 10) - 4,
      parseInt(this.style.top, 10) - 4
    );
    textBtn = true;
    document.body.removeChild(this);
  }
}
