const mouseMoveModule = (() => {
  const _ = canvasSetting;
  const CTX = _.ctx;
  const STRAIGHT_ANGLES = 180;
  const CLOCK_WISE = 1;
  const ANTI_CLOCK_WISE = -1;
  const FULL_ANGLE = 360;
  const mouseMove = (event) => {
    const CANVAS_X = event.clientX - _.CANVAS_OFF_SET_X;
    const CANVAS_Y = event.clientY - _.CANVAS_OFF_SET_Y;
    if (
      commonModules.tools[commonModules.lastShapeIndex]?.name == "SHAPE" &&
      commonModules.tools[
        commonModules.lastShapeIndex
      ]?.isPointOnShapeRotationArea(CANVAS_X, CANVAS_Y)
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
          drawLine(commonModules.pencil, CTX, CANVAS_X, CANVAS_Y);
        }

        break;
      case "ERASER":
        if (commonModules.eraser?.isEraser) {
          drawLine(commonModules.eraser, CTX, CANVAS_X, CANVAS_Y);
        }
        break;
      case "SHAPE":
        if (commonModules.shape?.isDrawing) {
          CTX.clearRect(0, 0, _.CANVAS.width, _.CANVAS.height);
          commonModules.shape.endPoint = new Point(CANVAS_X, CANVAS_Y);
          commonModules.shape.setMeasurement();
          commonModules.shape.calcAllPoint();
          commonModules.shape.draw();
          commonModules.draw();
        }
        break;
      case "SELECT":
        if (commonModules.isDragging) {
          let mouseX = CANVAS_X;
          let mouseY = CANVAS_Y;
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
          CTX.clearRect(0, 0, _.CANVAS.width, _.CANVAS.height);
          commonModules.draw();

          commonModules.startX = mouseX;
          commonModules.startY = mouseY;
        }
        break;
      default:
        if (commonModules.isRotated) {
          let mouseX = CANVAS_X;
          let mouseY = CANVAS_Y;

          let curShape = commonModules.tools[commonModules.lastShapeIndex];
          let oppSide = new Point(
            commonModules.startX,
            commonModules.startY
          ).calcDistance(mouseX, mouseY);
          let hypSide = curShape.distanceBtwPointAndCenter;

          let angle =
            (Math.asin(oppSide / hypSide) * STRAIGHT_ANGLES) / Math.PI;

          if (
            getRotationDirection({
              quadrant: getQuadrant(new Point(mouseX, mouseY), curShape.center),
              basePoint: new Point(commonModules.startX, commonModules.startY),
              currPoint: new Point(mouseX, mouseY),
            }) == ANTI_CLOCK_WISE
          ) {
            angle = FULL_ANGLE - angle;
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

  const getQuadrant = (point, center) => {
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

  const getRotationDirection = ({ quadrant, basePoint, currPoint }) => {
    switch (quadrant) {
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
