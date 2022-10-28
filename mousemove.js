((event) => {
  app.mouseMove = (event) => {
    canvasObj = app.canvasSetting();
    switch (app.tool) {
      case "Pencil":
        if (app.pencil?.isDrawing) {
          canvasObj.ctx.lineWidth = app.pencil.size;
          canvasObj.ctx.lineCap = app.pencil.lineCap;
          canvasObj.strokeStyle = app.color;

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
            app.eraser.size,
          );
          canvasObj.ctx.lineTo(
            event.clientX - canvasObj.canvasOffsetX,
            event.clientY - canvasObj.canvasOffsetY
          );
          canvasObj.ctx.stroke();
          canvasObj.ctx.closePath();
        }
        break;
      default:
        break;
    }
  };
})();
