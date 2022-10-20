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

const topCanvas = document.getElementById("top-drawing-board");
const topCtx = topCanvas.getContext("2d");

const topCanvasOffsetX = topCanvas.offsetLeft;
const topCanvasOffsetY = topCanvas.offsetTop;

topCanvas.width = window.innerWidth - topCanvasOffsetX;
topCanvas.height = window.innerHeight - topCanvasOffsetY;

let isPainting = false;
let paintBtn = false;
let eraserBtn = false;
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
      ctx.fillStyle = "white";
      ctx.lineWidth = 2;
      ctx.beginPath();
      let eraserX = event.x - canvasOffsetX;
      let eraserY = event.y - canvasOffsetY;
      ctx.rect(eraserX, eraserY, 10, 10);
      ctx.fill();

      break;
    default:
      break;
  }
});

function pencil() {
  paintBtn = !paintBtn;
  tool = paintBtn ? "Pencil" : undefined;
}
function eraser() {
  eraserBtn = !eraserBtn;
  tool = eraserBtn ? "Eraser" : undefined;
}
