const mouseUp = (event) => {
  const canvasObj = canvasSetting;
  const app = commonModules;
  const ctx = canvasObj.ctx;

    switch (app.tool) {
      case "Pencil":
        app.pencil.isDrawing = false;
        app.shapeLis.push(app.pencil);
        canvasObj.ctx.stroke();
        canvasObj.ctx.beginPath();
        break;
      case "Eraser":
        app.eraser.isEraser = false;
        app.shapeLis.push(app.eraser);
        canvasObj.ctx.stroke();
        canvasObj.ctx.beginPath();
        break;
      case "Shape":
        app.shape.endPoint = new Point(event.x - canvasObj.canvasOffsetX, event.y - canvasObj.canvasOffsetY)
        app.shapeLis.push(app.shape);
        app.shape.draw()
        break;
      case "Select":
        app.isDragging = false;
        break;
      default:
        break;
    }
}
