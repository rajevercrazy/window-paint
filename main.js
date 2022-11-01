((app) => {
  canvasObj = app.canvasSetting();

  app.shapes = new Shapes(canvasObj.ctx);
  app.shapeLis = [];
  app.pencilSize = 1;
  app.isDragging = false;
  app.currentShapeIndex = null;
  app.startX = null;
  app.startY = null;

  canvasObj.toolbar.addEventListener("change", app.change);
  canvasObj.canvas.addEventListener("mousedown", app.mouseDown);
  canvasObj.canvas.addEventListener("mousemove", app.mouseMove);
  canvasObj.canvas.addEventListener("mouseup", app.mouseUp);
  
})(app);
