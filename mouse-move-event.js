const mouseMove = (event) => {
  const canvasObj = canvasSetting;
  const app = commonModules;
  const ctx = canvasObj.ctx;
    
    switch (app.tool) {
      case "Pencil":
        if (app.pencil?.isDrawing) {
          ctx.lineWidth = app.pencil.lineWidth;
          ctx.lineCap = app.pencil.lineCap;
          ctx.strokeStyle = app.pencil.strokeStyle;

          app.pencil.addPointer(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY,
          );

          ctx.lineTo(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY
          );
          ctx.stroke();
        }
        break;
      case "Eraser":
        if (app.eraser?.isEraser) {
          ctx.strokeStyle = app.eraser.strokeStyle;
          ctx.lineWidth = app.eraser.lineWidth;
          ctx.lineCap = app.eraser.lineCap;
          ctx.beginPath();
          app.eraser.addPointer(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY,
          );
          ctx.lineTo(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY
          );
          ctx.stroke();
          ctx.closePath();
        }
        break;
      case "Shape":
        if(app.shape?.isDrawing){
          ctx.clearRect(0,0,canvasObj.canvas.width,canvasObj.canvas.height);
          app.shape.endPoint = new Point(event.x - canvasObj.canvasOffsetX, event.y - canvasObj.canvasOffsetY)
          app.shape.draw()
          app.draw();
        }
        break;
      case "Select":
        if (app.isDragging) {
          let mouseX = event.clientX - canvasObj.canvasOffsetX;
          let mouseY = event.clientY - canvasObj.canvasOffsetY;
          let dx = mouseX - app.startX;
          let dy = mouseY - app.startY;

          let currentShape = app.shapeLis[app.currentShapeIndex];
          if (currentShape.obj == "Text") {
            currentShape.x += dx;
            currentShape.y += dy;
          } else {
            currentShape.startPoint.xCoordinate += dx;
            currentShape.startPoint.yCoordinate += dy;
            currentShape.endPoint.xCoordinate += dx;
            currentShape.endPoint.yCoordinate += dy;
          }
          ctx.clearRect(0,0,canvasObj.canvas.width,canvasObj.canvas.height);
          app.draw();

          app.startX = mouseX;
          app.startY = mouseY;
        }
        break;
      default:
        break;
    }
}
