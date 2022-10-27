/**
 * @type HTMLCanvasElement
 */

 class Shapes {
  x1;
  y1;
  x2;
  y2;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
  }

  rectangle() {
    this.ctx.beginPath();
    this.ctx.rect(this.x1, this.y1, (this.x2 - this.x1), (this.y2 - this.y1));
    this.ctx.stroke();
    this.ctx.closePath();
  }

  circle() {
    this.ctx.beginPath()
    this.ctx.arc(this.x1, this.y1, 10, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  triangle() {
    this.ctx.beginPath()
    let xAxisCenter = this.x1 + (this.x2 - this.x1)/2
    this.ctx.moveTo(xAxisCenter, this.y1);
    this.ctx.lineTo(this.x1, this.y2);
    this.ctx.lineTo(this.x2,this.y2);
    this.ctx.lineTo(xAxisCenter, this.y1);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  line() {
    ctx.beginPath();
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
    ctx.closePath();
  }

  draw(shape){
    switch(shape){
      case 'circle': 
      this.circle();
      break;
      case 'rectangle': 
      this.rectangle();
      break;
      case 'triangle': 
      this.triangle();
      break;
      case 'line': 
      this.line();
      break;
      default:
      break;
    }
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
        break;
      case "Eraser":
        isEraser = true;
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
      case "Shape":
        drawShape(event.x - canvasOffsetX, event.y - canvasOffsetY);
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

  function drawShape(x,y) {
      eraserBtn = false;
      paintBtn = false;
      textBtn = false;

      shapes.x2 = x;
      shapes.y2 = y;
      shapes.draw(shape)
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


function setShape(s){
  tool = "Shape";
  shape = s;
}

function rotate(degree) {
  ctx.rotate(degree * Math.PI / 2);
}

let colorId='color1';
function setColor(color){
  let selectedColor = document.getElementById(colorId);
  selectedColor.style.backgroundColor = color;
  ctx.strokeStyle = color;
}