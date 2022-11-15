const commonModules = (() => {
  const _ = canvasSetting;

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
    _.CTX.beginPath();
    _.CTX.moveTo(tool.arr[0].xCoordinate, tool.arr[0].yCoordinate);
    _.CTX.lineWidth = tool.lineWidth;
    _.CTX.strokeStyle = tool.strokeStyle;
    _.CTX.lineCap = tool.lineCap;
    tool.arr.forEach((point) => {
      _.CTX.lineTo(point.xCoordinate, point.yCoordinate);
    });
    _.CTX.stroke();
    _.CTX.closePath();
  };

  const createTextAreaElement = (x, y) => {
    let textX = x - _.CANVAS_OFF_SET_X;
    let textY = y - _.CANVAS_OFF_SET_X;

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
    _.CTX.textBaseline = "top";
    _.CTX.textAlign = "left";
    _.CTX.font = "14px sans-serif";
    _.CTX.fillText(textarea.value, textX, textY);
    tools.push(new Text(_.CTX, new Point(textX, textY), textarea.value));
    document.body.removeChild(textarea);
  };
  const setShape = (shapeName) => {
    commonModules.tool = "SHAPE";
    commonModules.shape = new Shape(shapeName, _.CTX);
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
    _.CTX.clearRect(0, 0, _.CANVAS.width, _.CANVAS.height);

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
