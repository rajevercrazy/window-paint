const mouseDownModule = (() => {
  const mouseDown = (event) => {
    const _ = canvasSetting;
    const CANVAS_X = event.clientX - _.CANVAS_OFF_SET_X;
    const CANVAS_Y = event.clientY - _.CANVAS_OFF_SET_Y;

    switch (commonModules.tool) {
      case "PENCIL":
        commonModules.pencil = new Pencil(
          commonModules.pencilSize,
          !commonModules.color ? "black" : commonModules.color,
          true
        );
        createLinePath({
          tool: commonModules.pencil,
          canvasX: CANVAS_X,
          canvasY: CANVAS_Y,
          ctx: _.CTX,
        });
        break;
      case "ERASER":
        commonModules.eraser = new Eraser(true);
        createLinePath({
          tool: commonModules.eraser,
          canvasX: CANVAS_X,
          canvasY: CANVAS_Y,
          ctx: _.CTX,
        });
        break;
      case "TEXT":
        commonModules.createTextAreaElement(event.x, event.y);
        break;
      case "SHAPE":
        drawShape(_.CTX, CANVAS_X, CANVAS_Y);
        break;
      case "SELECT":
        commonModules.startX = CANVAS_X;
        commonModules.startY = CANVAS_Y;
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
        commonModules.startX = CANVAS_X;
        commonModules.startY = CANVAS_Y;
        for (let i = 0; i < commonModules.tools.length; i++) {
          if (
            commonModules.tools[i].name == "SHAPE" &&
            commonModules.tools[i].isPointOnShapeRotationArea(CANVAS_X, CANVAS_Y)
          ) {
            commonModules.lastShapeIndex = i;
            commonModules.isRotated = true;
            break;
          }
        }

        if (!commonModules.isRotated) {
          commonModules.tool = "SHAPE";
          drawShape(_.CTX, CANVAS_X, CANVAS_Y);
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
