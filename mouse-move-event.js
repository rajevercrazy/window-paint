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
            app.pencil.size,
            app.color
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
            currentShape.x1 += dx;
            currentShape.y1 += dy;
            currentShape.x2 += dx;
            currentShape.y2 += dy;
          }

          app.draw();

          app.startX = mouseX;
          app.startY = mouseY;
        }
        break;
      default:
        break;
    }
}
