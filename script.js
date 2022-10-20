/**
 * @type HTMLCanvasElement
 */

const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");

const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let paintBtn = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener("change", (event) => {
  switch (event.target.id) {
    case "lineWidth":
      lineWidth = event.target.value;
      break;
  }
});

canvas.addEventListener("mousedown", (event) => {
  isPainting = true;
  startX = event.x;
  startY = event.y;
});

canvas.addEventListener("mouseup", (event) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", (event) => {
  if (isPainting && paintBtn) {
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    ctx.lineTo(event.x - canvasOffsetX, event.y);
    ctx.stroke();
  }
});
