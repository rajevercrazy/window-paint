((event) => {
  app.mouseMove = (event) => {
    canvasObj = app.canvasSetting();
    switch (app.tool) {
      case "Pencil":
        if (app.pencil?.isDrawing) {
          canvasObj.ctx.lineWidth = app.pencil.size;
          canvasObj.ctx.lineCap = app.pencil.lineCap;
          canvasObj.ctx.strokeStyle = app.pencil.strokeStyle;

          app.pencil.addPointer(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY,
            app.pencil.size,
            app.color,
            app.pencil.lineCap
          );

          canvasObj.ctx.lineTo(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY
          );
          canvasObj.ctx.stroke();
        }
        break;
      case "Eraser":
        if (app.eraser?.isEraser) {
          canvasObj.ctx.strokeStyle = app.eraser.strokeStyle;
          canvasObj.ctx.lineWidth = app.eraser.size;
          canvasObj.ctx.lineCap = app.eraser.lineCap;
          canvasObj.ctx.beginPath();
          app.eraser.addPointer(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY,
            app.eraser.size
          );
          canvasObj.ctx.lineTo(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY
          );
          canvasObj.ctx.stroke();
          canvasObj.ctx.closePath();
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
  };
})();
