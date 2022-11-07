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

    let i = 0;

    for (let shape of shapeLis) {
      if (shape.name == "Pencil") {
        ctx.beginPath();
        ctx.moveTo(shape.arr[0].xCoordinate, shape.arr[0].yCoordinate);
        ctx.lineWidth = shape.lineWidth;
        ctx.strokeStyle = shape.strokeStyle;
        ctx.lineCap = shape.lineCap;
        for (let j = 1; j < shape.arr.length; j++) {
          ctx.lineTo(shape.arr[j].xCoordinate, shape.arr[j].yCoordinate);
          ctx.stroke();
        }
        ctx.beginPath();
      } 
      else if (shape.name == "Eraser") {
        ctx.beginPath();
        ctx.moveTo(shape.arr[0].xCoordinate, shape.arr[0].yCoordinate);
        ctx.lineWidth = shape.lineWidth;
        ctx.strokeStyle = shape.strokeStyle;
        ctx.lineCap = shape.lineCap;
        for (let j = 1; j < shape.arr.length; j++) {
          ctx.lineTo(shape.arr[j].xCoordinate, shape.arr[j].yCoordinate);
          ctx.stroke();
        }
        ctx.closePath();
      } 
      else if (shape.name == "Text") {
        shape.draw();
      } 
      else {
        shapeLis[i].draw();
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
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.font = "14px sans-serif";
        ctx.fillText(textarea.value, textX, textY);
        shapeLis.push(new Text(ctx, new Point(textX,textY), textarea.value));
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
  setColorPallet = (colorId) => {
    let selectedColor = document.getElementById(colorId);
    commonModules.colorId = colorId;
    commonModules.color = selectedColor.style.backgroundColor;
    if (tool == "Shape") commonModules.shape.strokeStyle = selectedColor.style.backgroundColor;
  }
  setColor = (color) => {
    let selectedColor = document.getElementById(commonModules.colorId);
    selectedColor.style.backgroundColor = color;
    commonModules.color = color;
    if (tool == "Shape") commonModules.shape.strokeStyle = color;
  };

  isMouseInShape = (shape) => {
    if(shape.shapeName == 'line' && shape.createGivenNameObj().isPointOnLine(commonModules.startX,commonModules.startY)){
      return true;
    }
    else if (
      commonModules.startX > shape.center.xCoordinate - (shape.width/2) &&
      commonModules.startX < shape.center.xCoordinate + (shape.width/2) &&
      commonModules.startY > shape.center.yCoordinate - (shape.height/2) &&
      commonModules.startY < shape.center.yCoordinate + (shape.height/2)
    ) {
      return true;
    }
    return false;
  };

  isMouseInText = (shape) => {
    return (
      commonModules.startX > shape.location.xCoordinate &&
      commonModules.startX < shape.location.xCoordinate + 400 &&
      commonModules.startY > shape.location.yCoordinate &&
      commonModules.startY < shape.location.yCoordinate + 14
    )
  };

  rotated = (angle) => {
    // ctx.save();
    ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
    let index = commonModules.currentShapeIndex >= 0 ? commonModules.currentShapeIndex : shapeLis.length - 1;

    let currentShape = shapeLis[index];

    if(currentShape){
      
    if (angle == 90 || angle == 270) {
      [currentShape.width,currentShape.height] = [currentShape.height,currentShape.width];
      currentShape.startPoint = new Point(currentShape.center.xCoordinate - (currentShape.width / 2), currentShape.center.yCoordinate - (currentShape.height / 2));
      currentShape.endPoint = new Point(currentShape.center.xCoordinate + (currentShape.width / 2), currentShape.center.yCoordinate + (currentShape.height / 2));
    }

    if (angle == 90) {
      currentShape.currentRotation = (currentShape.currentRotation + 1) % 4;
    }
    if (angle == 270) {
      currentShape.currentRotation = (currentShape.currentRotation - 1) % 4;
    }
    if (angle == 180) {
      currentShape.currentRotation = (currentShape.currentRotation + 2) % 4;
    }
  
    currentShape.currentRotation = currentShape.currentRotation < 0 ? 3 : currentShape.currentRotation;
    currentShape.angle = (currentShape.angle + angle) % 360;
    draw();
    currentShape.drawDashRect()
  }

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
  };
})();
