((event) => {
  app.mouseUp = (event) => {
    canvasObj = app.canvasSetting();
    switch (app.tool) {
      case "Pencil":
        app.pencil.isDrawing = false;
        canvasObj.ctx.stroke();
        canvasObj.ctx.beginPath();
        break;
      case "Eraser":
        app.eraser.isEraser = false;
        canvasObj.ctx.stroke();
        canvasObj.ctx.beginPath();
        break;
      case "Shape":
        drawShape(event.x - canvasOffsetX, event.y - canvasOffsetY);
        break;
      default:
        break;
    }
  };
})();
