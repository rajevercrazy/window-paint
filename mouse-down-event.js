const mouseDown = (event) => {
  const canvasObj = canvasSetting;
  const app = commonModules;
  const canvasX = event.clientX - canvasObj.canvasOffsetX;
  const canvasY = event.clientY - canvasObj.canvasOffsetY;

  switch (app.tool) {
    case "Pencil":
      app.pencil = new Pencil(app.pencilSize, !app.color ? "black" : app.color, true);

      app.pencil.addPointer(new Point(canvasX, canvasY));

      canvasObj.ctx.beginPath();
      canvasObj.ctx.lineWidth = app.pencil.lineWidth;
      canvasObj.ctx.lineCap = app.pencil.lineCap;
      canvasObj.ctx.strokeStyle = app.pencil.strokeStyle;
      canvasObj.ctx.moveTo(canvasX, canvasY);
      break;
    case "Eraser":
      app.eraser = new Eraser(true);
      app.eraser.addPointer(new Point(canvasX, canvasY,));
      canvasObj.ctx.beginPath();
      canvasObj.ctx.strokeStyle = app.eraser.strokeStyle;
      canvasObj.ctx.lineWidth = app.eraser.lineWidth;
      canvasObj.ctx.lineCap = app.eraser.lineCap;
      canvasObj.ctx.moveTo(canvasX, canvasY);
      break;
    case "Text":
      app.addInput(event.x, event.y);
      break;
    case "Shape":
      app.shape = Object.assign(new Shape('', canvasObj.ctx), app.shape);
      app.shape.isDrawing = true;
      app.shape.startPoint = new Point(canvasX, canvasY)
      app.shape.strokeStyle = !app.color ? "black" : app.color
      break;
    case "Select":
      app.startX = canvasX;
      app.startY = canvasY;
      for (let i = 0; i < app.shapeLis.length; i++) {
        let shape = app.shapeLis[i];

        if ((shape.name == 'Shape' && app.isMouseInShape(shape)) || (shape.name == 'Text' && app.isMouseInText(shape))) {
          app.currentShapeIndex = i;
          app.isDragging = true;
        }
      }
      break;
    default:
      app.startX = canvasX;
      app.startY = canvasY;

      for (let i = 0; i < app.shapeLis.length; i++) {

        if (app.shapeLis[i].name == 'Shape' && app.shapeLis[i].isPointOnShapeRotationArea(canvasX, canvasY)) {
          app.currentShapeIndex = i;
          app.isRotated = true;
          app.startRotationPoint = new Point(canvasX,canvasY);
          app.rotationAngle = 0;
          break;
        }
      }
      break;
  }

};
