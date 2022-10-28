((app) => {
  canvasObj = app.canvasSetting();
  app.shapes = new Shapes(canvasObj.ctx);
  app.eraser = new Eraser();
  app.shapeLis = [];
  app.pencilSize = 1
  canvasObj.toolbar.addEventListener("change", (event) => {
    switch (event.target.id) {
      case "stroke":
        canvasObj.ctx.strokeStyle = event.target.value;
        setColor(event.target.value);
        break;
    }
  });

  canvasObj.canvas.addEventListener("mousedown", (event) => {
    switch (app.tool) {
      case "Pencil":
        app.pencil = new Pencil();
        app.pencil.size = app.pencilSize;
        app.pencil.isDrawing = true;
        app.pencil.arr.push([
          event.clientX - canvasObj.canvasOffsetX,
          event.clientY - canvasObj.canvasOffsetY,
        ]);
        canvasObj.ctx.moveTo(
          event.clientX - canvasObj.canvasOffsetX,
          event.clientY - canvasObj.canvasOffsetY
        );
        break;
      case "Eraser":
        app.eraser.isEraser = true;
        break;
      case "Text":
        if (textBtn) {
          addInput(event.x, event.y);
        }
        break;
      case "Shape":
        shapes.x1 = event.clientX - canvasObj.canvasOffsetX;
        shapes.y1 = event.clientY - canvasObj.canvasOffsetY;
        break;
      default:
        break;
    }
  });

  canvasObj.canvas.addEventListener("mousemove", app.mouseMove);
  canvasObj.canvas.addEventListener("mouseup", app.mouseUp);
})(app);
