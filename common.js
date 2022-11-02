const commonModules = (() => {
  const canvasObj = canvasSetting;
  const ctx = canvasObj.ctx;

  let shapeLis = [];
  let pencilSize = 1;
  let isDragging = false;
  let currentShapeIndex = null;
  let startX = null;
  let startY = null;
  let tool = "";

  draw = () => {
    ctx.clearRect(0,0,canvasObj.canvas.width,canvasObj.canvas.height);

    let i = 0;

    for (let shape of shapeLis) {
      if (shape.obj == "Pencil") {
        ctx.beginPath();
        ctx.moveTo(shape.arr[0][0], shape.arr[0][1]);
        ctx.lineWidth = shape.lineWidth;
        ctx.strokeStyle = shape.strokeStyle;
        ctx.lineCap = shape.lineCap;
        for (let j = 1; j < shape.arr.length; j++) {
          ctx.lineTo(shape.arr[j][0], shape.arr[j][1]);
          ctx.stroke();
        }
        ctx.beginPath();
      } 
      else if (shape.obj == "Eraser") {
        ctx.beginPath();
        ctx.moveTo(shape.arr[0][0], shape.arr[0][1]);
        ctx.lineWidth = shape.lineWidth;
        ctx.strokeStyle = shape.strokeStyle;
        ctx.lineCap = shape.lineCap;
        for (let j = 1; j < shape.arr.length; j++) {
          ctx.lineTo(shape.arr[j][0], shape.arr[j][1]);
          ctx.stroke();
        }
        ctx.closePath();
      } 
      else if (shape.obj == "Text") {
        shape.draw();
      } 
      else {
        shapeLis[i].x1 = shape.x1;
        shapeLis[i].y1 = shape.y1;
        shapeLis[i].x2 = shape.x2;
        shapeLis[i].y2 = shape.y2;
        shapeLis[i].draw(shape.obj);
      }
      i++;
    }
  };

  addInput = (x, y) => {
    let textX = x - canvasObj.canvasOffsetX;
    let textY = y - canvasObj.canvasOffsetY;

    let textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.left = x + "px";
    textarea.style.top = y + "px";

    textarea.onkeydown = (event) => {
      if (event.key === "Enter") {
        textObj = new Text(ctx);
        textObj.x = textX;
        textObj.y = textY;
        textObj.value = textarea.value;
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.font = "14px sans-serif";
        ctx.fillText(textObj.value, textX, textY);
        shapeLis.push(textObj);
        document.body.removeChild(textarea);
      }
    };

    document.body.appendChild(textarea);
  };

  setShape = (shapeName) => {
    commonModules.tool = "Shape";
    commonModules.shape = new Shape(shapeName,ctx);
  };

  colorId = "color1";
  setColor = (color) => {
    let selectedColor = document.getElementById(commonModules.colorId);
    selectedColor.style.backgroundColor = color;
    commonModules.color = color;
    if (tool == "Shape") commonModules.shape.strokeStyle = color;
  };

  isMouseInShape = (shape) => {
    if (
      commonModules.startX > shape.startPoint.xCoordinate &&
      commonModules.startX < shape.endPoint.xCoordinate &&
      commonModules.startY > shape.startPoint.yCoordinate &&
      commonModules.startY < shape.endPoint.yCoordinate
    ) {
      return true;
    }
    return false;
  };

  isMouseInText = (shape) => {
    if (
      commonModules.startX > shape.x &&
      commonModules.startX < shape.x + 400 &&
      commonModules.startY > shape.y &&
      commonModules.startY < shape.y + 14
    ) {
      return true;
    }

    return false;
  };

  rotated = (angle) => {
    // ctx.save();
    ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
    let index = currentShapeIndex ? currentShapeIndex : shapeLis.length - 1;

    let currentShape = shapeLis[index];

    let xAxisCenter = currentShape.x1 + (currentShape.x2 - currentShape.x1) / 2;
    let yAxisCenter = currentShape.y1 + (currentShape.y2 - currentShape.y1) / 2;

    ctx.translate(xAxisCenter, yAxisCenter);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-xAxisCenter, -yAxisCenter);

    let shape = new Shapes(ctx);
    shape.x1 = currentShape.x1;
    shape.y1 = currentShape.y1;
    shape.x2 = currentShape.x2;
    shape.y2 = currentShape.y2;
    shape.draw(currentShape.obj);

    draw();
  };

  return {
    shapeLis,
    pencilSize,
    isDragging,
    currentShapeIndex,
    startX,
    startY,
    tool,
    draw,
    addInput,
    setShape,
    colorId,
    setColor,
    isMouseInShape,
    isMouseInText,
    rotated,
    draw
  };
})();
