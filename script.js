/**
 * @type HTMLCanvasElement
 */

class Shapes {
  x1;
  y1;
  x2;
  y2;
  ctx;
  color = "black";

  constructor(ctx) {
    this.ctx = ctx;
  }

  rectangle() {
    this.ctx.beginPath();
    ctx.strokeStyle = this.color;
    this.ctx.rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  circle() {
    this.ctx.beginPath();
    // this.ctx.arc(this.x1, this.y1, 10, 0, Math.PI * 2, false);
    let yAxisCenter = this.y1 + (this.y2 - this.y1) / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x2, yAxisCenter);
    ctx.bezierCurveTo(this.x2, this.y1, this.x1, this.y1, this.x1, yAxisCenter);
    ctx.bezierCurveTo(this.x1, this.y2, this.x2, this.y2, this.x2, yAxisCenter);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  triangle() {
    this.ctx.beginPath();
    ctx.strokeStyle = this.color;
    let xAxisCenter = this.x1 + (this.x2 - this.x1) / 2;
    this.ctx.moveTo(xAxisCenter, this.y1);
    this.ctx.lineTo(this.x1, this.y2);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.lineTo(xAxisCenter, this.y1);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  line() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
    ctx.closePath();
  }

  draw(shape) {
    switch (shape) {
      case "circle":
        this.circle();
        break;
      case "rectangle":
        this.rectangle();
        break;
      case "triangle":
        this.triangle();
        break;
      case "line":
        this.line();
        break;
      default:
        break;
    }

    return {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      obj: shape,
    };
  }
}

class Pencil {
  arr = [];
  lineWidth;
  strokeStyle;
  lineCap;

  addPointer(x, y, lineWidth, strokeStyle, lineCap) {
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.lineCap = lineCap;
    this.arr.push([x, y]);
  }

  getPencilObj() {
    return {
      points: this.arr,
      obj: "Pencil",
    };
  }
}

class Eraser {
  arr = [];
  lineWidth;
  strokeStyle;
  lineCap;

  addPointer(x, y, lineWidth, strokeStyle, lineCap) {
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.lineCap = lineCap;
    this.arr.push([x, y]);
  }

  getEraserObj() {
    return {
      points: this.arr,
      obj: "Eraser",
    };
  }
}

class Text {
  x;
  y;
  value;
  obj = "Text";
  width = 400;
  draw() {
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "14px sans-serif";
    ctx.fillText(
      this.value,
      parseInt(this.x, 10) - 4,
      parseInt(this.y, 10) - 4
    );
  }
}
const toolbar = document.getElementById("toolbar");
const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");
const shapes = new Shapes(ctx);
// canvas.width = 1152;
// canvas.height = 648;

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

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
let curveLineBtn = false;
let lineWidth = 1;
let tool;
let pColor = "black";
let shapeLis = [];
let currentShapeIndex = null;
let isDragging;
let startX;
let startY;
let pencilObj;
let eraserObj;
let textObj;

toolbar.addEventListener("change", (event) => {
  switch (event.target.id) {
    case "stroke":
      ctx.strokeStyle = event.target.value;
      setColor(event.target.value);
      break;
    // case "lineWidth":
    //   lineWidth = event.target.value;
    //   break;
  }
});

canvas.onmousedown = (event) => {
  switch (tool) {
    case "Pencil":
      isPainting = true;
      pencilObj = new Pencil();
      pencilObj.arr.push([
        event.clientX - canvasOffsetX,
        event.clientY - canvasOffsetY,
      ]);
      ctx.moveTo(event.clientX - canvasOffsetX, event.clientY - canvasOffsetY);
      break;
    case "Eraser":
      isEraser = true;
      eraserObj = new Eraser();
      ctx.moveTo(event.clientX - canvasOffsetX, event.clientY - canvasOffsetY);
      break;
    case "Text":
      if (textBtn) {
        addInput(event.x, event.y);
      }
      break;
    case "Shape":
      shapes.x1 = event.clientX - canvasOffsetX;
      shapes.y1 = event.clientY - canvasOffsetY;
      break;
    case "Select":
      startX = event.clientX - canvasOffsetX;
      startY = event.clientY - canvasOffsetY;
      let index = 0;
      for (let shape of shapeLis) {
        if (
          isMouseInShape(startX, startY, shape) ||
          isMouseInText(startX, startY, shape)
        ) {
          currentShapeIndex = index;
          isDragging = true;
        }
        index++;
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
      shapeLis.push(pencilObj.getPencilObj());
      ctx.stroke();
      ctx.beginPath();
      break;
    case "Eraser":
      isEraser = false;
      ctx.stroke();
      ctx.beginPath();
      break;
    case "Shape":
      drawShape(event.x - canvasOffsetX, event.y - canvasOffsetY);
      break;
    case "Select":
      isDragging = false;
      break;
    default:
      break;
  }
});

canvas.addEventListener("mousemove", (event) => {
  event.preventDefault();
  switch (tool) {
    case "Pencil":
      if (isPainting && paintBtn) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = pColor;
        ctx.lineCap = "round";
        pencilObj.addPointer(
          event.clientX - canvasOffsetX,
          event.clientY - canvasOffsetY,
          lineWidth,
          pColor,
          "round"
        );
        ctx.lineTo(
          event.clientX - canvasOffsetX,
          event.clientY - canvasOffsetY
        );
        ctx.stroke();
      }
      break;
    case "Eraser":
      if (isEraser && eraserBtn) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = lineWidth + 10;
        ctx.lineCap = "square";
        ctx.beginPath();
        ctx.lineTo(
          event.clientX - canvasOffsetX,
          event.clientY - canvasOffsetY
        );
        ctx.stroke();
        ctx.closePath();
      }
      break;
    case "Select":
      if (isDragging) {
        let mouseX = event.clientX - canvasOffsetX;
        let mouseY = event.clientY - canvasOffsetY;
        let dx = mouseX - startX;
        let dy = mouseY - startY;

        let currentShape = shapeLis[currentShapeIndex];

        if (currentShape.obj == "Text") {
          currentShape.x += dx;
          currentShape.y += dy;
        } else {
          currentShape.x1 += dx;
          currentShape.y1 += dy;
          currentShape.x2 += dx;
          currentShape.y2 += dy;
        }

        draw();

        startX = mouseX;
        startY = mouseY;
      }

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
    // <div id="eraseCursor" class="erase-square"></div>
    // cursor = document.createElement("div");
    // cursor.setAttribute(class,"erase-square");
    // console.log(cursor);
    // canvas.style.cursor = "crosshair";
  }

  // if (!eraserBtn) {
  //   canvas.style.removeProperty("cursor");
  // }
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

function drawShape(x, y) {
  eraserBtn = false;
  paintBtn = false;
  textBtn = false;

  shapes.x2 = x;
  shapes.y2 = y;
  shapeLis.push(shapes.draw(shape));
}

function curveLine() {
  curveLineBtn = !curveLine;
  if (curveLineBtn) {
    eraserBtn = false;
    paintBtn = false;
    textBtn = false;
    lineBtn = false;
  }
}

let textX;
let textY;
function addInput(x, y) {
  textX = x - canvasOffsetX;
  textY = y - canvasOffsetY;
  let textarea = document.createElement("textarea");
  textarea.style.position = "fixed";
  textarea.style.left = x + "px";
  textarea.style.top = y + "px";
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
    ctx.fillText(this.value, textX, textY);
    textBtn = true;
    textObj = new Text();
    textObj.x = textX;
    textObj.y = textY;
    textObj.value = this.value;
    shapeLis.push(textObj);
    document.body.removeChild(this);
  }
}

function setShape(s) {
  tool = "Shape";
  shape = s;
}

function rotate(degree) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degree * Math.PI) / 2);
  ctx.fillStyle = "red";
  ctx.fillRect(-100, -50, 200, 100);
  ctx.restore();
}

let colorId = "color1";
function setColor(color) {
  let selectedColor = document.getElementById(colorId);
  selectedColor.style.backgroundColor = color;
  pColor = color;
  if (tool == "Shape") shapes.color = color;
}

function isMouseInShape(x, y, shape) {
  if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
    return true;
  }
  return false;
}

function isMouseInText(x, y, shape) {
  if (x > shape.x && x < shape.x + 400 && y > shape.y && y < shape.y + 14) {
    return true;
  }

  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let i = 0;
  // let shapeLisCopy = [...shapeLis];
  // shapeLis = [];
  for (let shape of shapeLis) {
    if (shape.obj == "Pencil") {
      ctx.moveTo(shape.points[0][0], shape.points[0][1]);
      ctx.lineWidth = shape.lineWidth;
      ctx.strokeStyle = shape.strokeStyle;
      ctx.lineCap = shape.lineCap;
      for (let j = 1; j < shape.points.length; j++) {
        ctx.lineTo(shape.points[j][0], shape.points[j][1]);
        ctx.stroke();
      }
      ctx.beginPath();
    } else if (shape.obj == "Text") {
      shape.draw();
    } else {
      let s = new Shapes(ctx);
      s.x1 = shape.x1;
      s.y1 = shape.y1;
      s.x2 = shape.x2;
      s.y2 = shape.y2;
      shapeLis[i] = s.draw(shape.obj);
    }
    i++;
  }
}

function select() {
  eraserBtn = false;
  paintBtn = false;
  textBtn = false;

  tool = "Select";
}
