const mouseMoveModule = (() => {
  const mouseMove = (event) => {
    const canvasObj = canvasSetting;
    const ctx = canvasObj.ctx;
    const canvasX = event.clientX - canvasObj.canvasOffsetX;
    const canvasY = event.clientY - canvasObj.canvasOffsetY;

    if (
      commonModules.tools[commonModules.lastShapeIndex]?.name == "SHAPE" &&
      commonModules.tools[
        commonModules.lastShapeIndex
      ]?.isPointOnShapeRotationArea(canvasX, canvasY)
    ) {
      document.body.style.cursor = "grab";

      if (commonModules.tool != "ROTATED") {
        commonModules.preTool = commonModules.tool;
      }
      commonModules.tool = "ROTATED";
    } else {
      document.body.style.cursor = "default";
    }

    switch (commonModules.tool) {
      case "PENCIL":
        if (commonModules.pencil?.isDrawing) {
          drawLine(commonModules.pencil, ctx, canvasX, canvasY);
        }

        break;
      case "ERASER":
        if (commonModules.eraser?.isEraser) {
          drawLine(commonModules.eraser, ctx, canvasX, canvasY);
        }
        break;
      case "SHAPE":
        if (commonModules.shape?.isDrawing) {
          ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
          commonModules.shape.endPoint = new Point(canvasX, canvasY);
          commonModules.shape.setMeasurement();
          commonModules.shape.calcAllPoint();
          commonModules.shape.draw();
          commonModules.draw();
        }
        break;
      case "SELECT":
        if (commonModules.isDragging) {
          let mouseX = canvasX;
          let mouseY = canvasY;
          let dx = mouseX - commonModules.startX;
          let dy = mouseY - commonModules.startY;

          let tool = commonModules.tools[commonModules.lastShapeIndex];
          if (tool.name == "TEXT") {
            tool.location.xCoordinate += dx;
            tool.location.yCoordinate += dy;
          } else {
            tool.positionArr = tool.positionArr.map(
              (element) =>
                new Point(element.xCoordinate + dx, element.yCoordinate + dy)
            );
            tool.center.xCoordinate += dx;
            tool.center.yCoordinate += dy;
          }
          ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
          commonModules.draw();

          commonModules.startX = mouseX;
          commonModules.startY = mouseY;
        }
        break;
      default:
        if (commonModules.isRotated) {
          let mouseX = canvasX;
          let mouseY = canvasY;

          let curShape = commonModules.tools[commonModules.lastShapeIndex];
          let oppSide = new Point(
            commonModules.startX,
            commonModules.startY
          ).calcDistance(mouseX, mouseY);
          let adjSide = curShape.width / 2;
          let angle = (Math.atan(oppSide / adjSide) * 180) / Math.PI;

          const ANTI_CLOCK_WISE = -1;

          if (
            getRotationDirection({
              quadrand: getQuadrand(new Point(mouseX, mouseY), curShape.center),
              basePoint: new Point(commonModules.startX, commonModules.startY),
              currPoint: new Point(mouseX, mouseY),
            }) == ANTI_CLOCK_WISE
          ) {
            angle = 360 - angle;
          }

          if (angle) {
            commonModules.rotation(angle);
            commonModules.startX = mouseX;
            commonModules.startY = mouseY;
          }
        }
        break;
    }
  };

  const drawLine = (tool, ctx, canvasX, canvasY) => {
    tool.addPointer(canvasX, canvasY);
    ctx.lineTo(canvasX, canvasY);
    ctx.stroke();
  };

  const getQuadrand = (point, center) => {
    if (
      point.xCoordinate > center.xCoordinate &&
      point.yCoordinate < center.yCoordinate
    ) {
      return 1;
    }
    if (
      point.xCoordinate < center.xCoordinate &&
      point.yCoordinate < center.yCoordinate
    ) {
      return 2;
    }
    if (
      point.xCoordinate < center.xCoordinate &&
      point.yCoordinate > center.yCoordinate
    ) {
      return 3;
    }
    return 4;
  };

  const getRotationDirection = ({ quadrand, basePoint, currPoint }) => {
    const CLOCK_WISE = 1;
    const ANTI_CLOCK_WISE = -1;
    switch (quadrand) {
      case 1:
        return basePoint.xCoordinate < currPoint.xCoordinate ||
          basePoint.yCoordinate < currPoint.yCoordinate
          ? CLOCK_WISE
          : ANTI_CLOCK_WISE;
      case 2:
        return basePoint.xCoordinate < currPoint.xCoordinate ||
          basePoint.yCoordinate > currPoint.yCoordinate
          ? CLOCK_WISE
          : ANTI_CLOCK_WISE;
      case 3:
        return basePoint.xCoordinate > currPoint.xCoordinate ||
          basePoint.yCoordinate > currPoint.yCoordinate
          ? CLOCK_WISE
          : ANTI_CLOCK_WISE;
      default:
        return basePoint.xCoordinate > currPoint.xCoordinate ||
          basePoint.yCoordinate < currPoint.yCoordinate
          ? CLOCK_WISE
          : ANTI_CLOCK_WISE;
    }
  };

  return {
    mouseMove,
  };
})();
