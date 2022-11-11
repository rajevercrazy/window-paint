const mouseMoveModule = (() => {

  const mouseMove = (event) => {
    const canvasObj = canvasSetting;
    const app = commonModules;
    const ctx = canvasObj.ctx;
    const canvasX = event.clientX - canvasObj.canvasOffsetX;
    const canvasY = event.clientY - canvasObj.canvasOffsetY;

    if (app.toolLis[app.currentShapeIndex]?.name == 'Shape' && app.toolLis[app.currentShapeIndex]?.isPointOnShapeRotationArea(canvasX, canvasY)) {
      document.body.style.cursor = "grab";
    app.tool = 'rotation'
    }
    else {
      document.body.style.cursor = 'default';
    }



    switch (app.tool) {
      case "Pencil":
        if (app.pencil?.isDrawing) {
          app.pencil.addPointer(canvasX, canvasY,);
          ctx.lineTo(canvasX, canvasY);
          ctx.stroke();
        }

        break;
      case "Eraser":
        if (app.eraser?.isEraser) {
          app.eraser.addPointer(canvasX, canvasY);
          ctx.lineTo(canvasX, canvasY);
          ctx.stroke();
        }
        break;
      case "Shape":
        if (app.shape?.isDrawing) {
          ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
          app.shape.endPoint = new Point(canvasX, canvasY);
          app.shape.calc();
          app.shape.draw()
          app.draw();
        }
        break;
      case "Select":
        if (app.isDragging) {
          let mouseX = canvasX;
          let mouseY = canvasY;
          let dx = mouseX - app.startX;
          let dy = mouseY - app.startY;

          let curShape = app.toolLis[app.currentShapeIndex];
          if (curShape.name == "Text") {
            curShape.location.xCoordinate += dx;
            curShape.location.yCoordinate += dy;
          } else {
            curShape.positionArr = curShape.positionArr.map((element) => new Point(element.xCoordinate + dx, element.yCoordinate + dy));
            curShape.center.xCoordinate += dx;
            curShape.center.yCoordinate += dy;
          }
          ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
          app.draw();

          app.startX = mouseX;
          app.startY = mouseY;
        }
        break;
      default:
        if (app.isRotated) {

          let mouseX = canvasX;
          let mouseY = canvasY;


          let curShape = app.toolLis[app.currentShapeIndex];
          let oppSide = (new Point(app.startX, app.startY)).calcDistance(mouseX, mouseY);
          let adjSide = curShape.width / 2;
          let angle = (Math.atan(oppSide / adjSide) * 180) / Math.PI;

          if (getRotationDirection(
            getQuadrand(new Point(mouseX, mouseY), curShape.center),
            new Point(app.startX, app.startY),
            new Point(mouseX, mouseY)
          ) == -1) {
            angle = 360 - angle;
          }

          if (angle) {
            app.rotation(angle);
            app.startX = mouseX;
            app.startY = mouseY;
          }
        }
        break;
    }
  }

  const getQuadrand = (point, center) => {
    if (
      point.xCoordinate > center.xCoordinate
      && point.yCoordinate < center.yCoordinate) {
      return 1;
    }
    if (
      point.xCoordinate < center.xCoordinate
      && point.yCoordinate < center.yCoordinate) {
      return 2;
    }
    if (
      point.xCoordinate < center.xCoordinate
      && point.yCoordinate > center.yCoordinate) {
      return 3;
    }
    return 4
  }

  const getRotationDirection = (quadrand, basePoint, currPoint) => {

    /** 
     * 1: Clockwise Direction
     * -1: Anti Clockwise Direction
    */
    switch (quadrand) {
      case 1:
        return (basePoint.xCoordinate < currPoint.xCoordinate || basePoint.yCoordinate < currPoint.yCoordinate) ? 1 : -1;
      case 2:
        return (basePoint.xCoordinate < currPoint.xCoordinate || basePoint.yCoordinate > currPoint.yCoordinate) ? 1 : -1;
      case 3:
        return (basePoint.xCoordinate > currPoint.xCoordinate || basePoint.yCoordinate > currPoint.yCoordinate) ? 1 : -1;
      default:
        return (basePoint.xCoordinate > currPoint.xCoordinate || basePoint.yCoordinate < currPoint.yCoordinate) ? 1 : -1;

    }
  }

  return {
    mouseMove
  }
})()
