const mouseDownModule = (() => {
  const mouseDown = (event) => {
    const canvasObj = canvasSetting;
    const canvasX = event.clientX - canvasObj.canvasOffsetX;
    const canvasY = event.clientY - canvasObj.canvasOffsetY;

    switch (commonModules.tool) {
      case "PENCIL":
        commonModules.pencil = new Pencil(
          commonModules.pencilSize,
          !commonModules.color ? "black" : commonModules.color,
          true
        );
        createLinePath({
          tool: commonModules.pencil,
          canvasX: canvasX,
          canvasY: canvasY,
          ctx: canvasObj.ctx,
        });
        break;
      case "ERASER":
        commonModules.eraser = new Eraser(true);
        createLinePath({
          tool: commonModules.eraser,
          canvasX: canvasX,
          canvasY: canvasY,
          ctx: canvasObj.ctx,
        });
        break;
      case "TEXT":
        commonModules.createTextAreaElement(event.x, event.y);
        break;
      case "SHAPE":
        drawShape(canvasObj.ctx, canvasX, canvasY);
        break;
      case "SELECT":
        commonModules.startX = canvasX;
        commonModules.startY = canvasY;
        for (let i = 0; i < commonModules.tools.length; i++) {
          let tool = commonModules.tools[i];

          if (
            (tool.name == "SHAPE" && commonModules.isMouseInShape(tool)) ||
            (tool.name == "TEXT" && commonModules.isMouseInText(tool))
          ) {
            commonModules.lastShapeIndex = i;
            commonModules.isDragging = true;
          }
        }
        break;
      default:
        commonModules.startX = canvasX;
        commonModules.startY = canvasY;
        for (let i = 0; i < commonModules.tools.length; i++) {
          if (
            commonModules.tools[i].name == "SHAPE" &&
            commonModules.tools[i].isPointOnShapeRotationArea(canvasX, canvasY)
          ) {
            commonModules.lastShapeIndex = i;
            commonModules.isRotated = true;
            break;
          }
        }

        if (!commonModules.isRotated) {
          commonModules.tool = "SHAPE"
          drawShape(canvasObj.ctx, canvasX, canvasY);
        }

        break;
    }
  };

  const drawShape = (ctx, canvasX, canvasY) => {
    commonModules.shape = Object.assign(
      new Shape("", ctx),
      commonModules.shape
    );
    commonModules.shape.startPoint = new Point(canvasX, canvasY);
    commonModules.shape.isDrawing = true;
    commonModules.shape.strokeStyle = !commonModules.color
      ? "black"
      : commonModules.color;
  };
  const createLinePath = ({ tool, canvasX, canvasY, ctx }) => {
    tool.addPointer(new Point(canvasX, canvasY));

    ctx.beginPath();
    ctx.lineWidth = tool.lineWidth;
    ctx.lineCap = tool.lineCap;
    ctx.strokeStyle = tool.strokeStyle;
    ctx.moveTo(canvasX, canvasY);
  };

  return {
    mouseDown,
  };
})();
