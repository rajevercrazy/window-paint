const commonModules = (() => {
  const canvasObj = canvasSetting;
  const ctx = canvasObj.ctx;

  let tools = [];
  let pencilSize = 1;
  let isDragging = false;
  let lastShapeIndex;
  let startX = null;
  let startY = null;
  let tool = "";
  let preTool = "";

  const draw = () => {
    tools.forEach((tool) => {
      if (tool.name == "PENCIL" || tool.name == "ERASER") {
        drawLine(tool);
      } else if (tool.name == "TEXT") {
        tool.draw();
      } else {
        tool.draw();
      }
    });
  };

  const drawLine = (tool) => {
    ctx.beginPath();
    ctx.moveTo(tool.arr[0].xCoordinate, tool.arr[0].yCoordinate);
    ctx.lineWidth = tool.lineWidth;
    ctx.strokeStyle = tool.strokeStyle;
    ctx.lineCap = tool.lineCap;
    tool.arr.forEach((point) => {
      ctx.lineTo(point.xCoordinate, point.yCoordinate);
    });
    ctx.stroke();
    ctx.closePath();
  };

  const createTextAreaElement = (x, y) => {
    let textX = x - canvasObj.canvasOffsetX;
    let textY = y - canvasObj.canvasOffsetY;

    let textarea = document.createElement("textarea");
    textarea.setAttribute("id", "textArea");
    textarea.style.position = "fixed";
    textarea.style.left = x + "px";
    textarea.style.top = y + "px";

    textarea.onkeydown = (event) => {
      if (event.key === "Enter") {
        drawTextValueOnCanvas(textX, textY);
      }
    };
    document.body.appendChild(textarea);
  };

  const drawTextValueOnCanvas = (textX, textY) => {
    let textarea = document.getElementById("textArea");
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "14px sans-serif";
    ctx.fillText(textarea.value, textX, textY);
    tools.push(new Text(ctx, new Point(textX, textY), textarea.value));
    document.body.removeChild(textarea);
  };
  const setShape = (shapeName) => {
    commonModules.tool = "SHAPE";
    commonModules.shape = new Shape(shapeName, ctx);
    commonModules.lastShapeIndex = commonModules.tools.length;
  };

  colorId = "color1";
  const setColorPallet = (colorId) => {
    let selectedColor = document.getElementById(colorId);
    commonModules.colorId = colorId;
    commonModules.color = selectedColor.style.backgroundColor;
    if (commonModules.shape)
      commonModules.shape.strokeStyle = selectedColor.style.backgroundColor;
  };

  const setColor = (color) => {
    let selectedColor = document.getElementById(commonModules.colorId);
    selectedColor.style.backgroundColor = color;
    commonModules.color = color;
    if (commonModules.tool == "SHAPE") commonModules.shape.strokeStyle = color;
  };

  const isMouseInShape = (shape) => {
    return (
      (shape.shapeName == "LINE" &&
        shape
          .createGivenNameObj()
          .isPointOnLine(commonModules.startX, commonModules.startY)) ||
      shape.isPointOnShape(commonModules.startX, commonModules.startY)
    );
  };

  const isMouseInText = (shape) => {
    return (
      commonModules.startX > shape.location.xCoordinate &&
      commonModules.startX < shape.location.xCoordinate + 400 &&
      commonModules.startY > shape.location.yCoordinate &&
      commonModules.startY < shape.location.yCoordinate + 20
    );
  };

  const rotation = (angle) => {
    ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);

    let index =
      commonModules.lastShapeIndex >= 0
        ? commonModules.lastShapeIndex
        : tools.length - 1;
    let currentShape = tools[index];

    for (let i = 0; i < currentShape.positionArr.length; i++) {
      currentShape.positionArr[i].rotate(currentShape.center, angle);
    }

    draw();
    currentShape.drawDashRect();
  };

  return {
    tools,
    pencilSize,
    isDragging,
    lastShapeIndex,
    startX,
    startY,
    tool,
    draw,
    createTextAreaElement,
    setShape,
    colorId,
    setColor,
    isMouseInShape,
    isMouseInText,
    rotation,
    preTool,
    setColorPallet,
  };
})();
