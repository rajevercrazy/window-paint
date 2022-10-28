((event) => {
  app.mouseUp = (event) => {
    canvasObj = app.canvasSetting();
    switch (app.tool) {
      case "Pencil":
        app.pencil.isDrawing = false;
        app.shapeLis.push(app.pencil.getPencilObj());
        canvasObj.ctx.stroke();
        canvasObj.ctx.beginPath();
        break;
      case "Eraser":
        app.eraser.isEraser = false;
        canvasObj.ctx.stroke();
        canvasObj.ctx.beginPath();
        break;
      case "Shape":
        app.shapes.x2 = event.x - canvasObj.canvasOffsetX;
        app.shapes.y2 = event.y - canvasObj.canvasOffsetY;
        app.shapeLis.push(app.shapes.draw(app.shape));
        break;
      case "Select":
        app.isDragging = false;
        break;
      default:
        break;
    }
  };
})();
