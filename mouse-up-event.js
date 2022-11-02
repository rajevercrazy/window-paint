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
        app.shapes.x2 = event.x - canvasObj.canvasOffsetX;
        app.shapes.y2 = event.y - canvasObj.canvasOffsetY;
        app.shapeLis.push(app.shapes);
        app.shapes.draw(app.shape)
        break;
      case "Select":
        app.isDragging = false;
        break;
      default:
        break;
    }
}
