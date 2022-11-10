const mouseMove = (event) => {
  const canvasObj = canvasSetting;
  const app = commonModules;
  const ctx = canvasObj.ctx;
  const canvasX = event.clientX - canvasObj.canvasOffsetX;
  const canvasY = event.clientY - canvasObj.canvasOffsetY;
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

        let currentShape = app.shapeLis[app.currentShapeIndex];
        if (currentShape.name == "Text") {
          currentShape.location.xCoordinate += dx;
          currentShape.location.yCoordinate += dy;
        } else {
          currentShape.positionArr = currentShape.positionArr.map((element) => new Point(element.xCoordinate + dx, element.yCoordinate + dy));
          currentShape.center.xCoordinate += dx;
          currentShape.center.yCoordinate += dy;
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


        let currentShape = app.shapeLis[app.currentShapeIndex];
        let oppSide = (new Point(app.startX, app.startY)).calcDistance(mouseX, mouseY);
        let adjSide = (new Point(mouseX, mouseY)).calcDistance(currentShape.center.xCoordinate, currentShape.center.yCoordinate);
        let angle = (Math.atan(oppSide / adjSide) * 180) / Math.PI;
        if (angle) {

          // let preAngle = (new Point(mouseX,mouseY)).calcDistance(app.startRotationPoint.xCoordinate, app.startRotationPoint.yCoordinate);

          // if(preAngle > app.rotationAngle){
          //   angle = 360 - angle;
          // }
          // app.rotationAngle  = preAngle;
          app.rotation(angle);
          app.rotationAngle = angle;
          app.startX = mouseX;
          app.startY = mouseY;
        }
      }
      break;
  }
}
