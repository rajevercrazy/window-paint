((app) => {
  canvasObj = app.canvasSetting();
  app.shapes = new Shapes(canvasObj.ctx);
  app.shapeLis = [];
  app.pencilSize = 1;
  app.isDragging = false;
  app.currentShapeIndex = null;
  app.startX = null;
  app.startY = null;
  canvasObj.toolbar.addEventListener("change", (event) => {
    switch (event.target.id) {
      case "stroke":
        canvasObj.ctx.strokeStyle = event.target.value;
        app.setColor(event.target.value);
        break;
    }
  });

  canvasObj.canvas.addEventListener("mousedown", (event) => {
    switch (app.tool) {
      case "Pencil":
        app.pencil = new Pencil();
        app.pencil.size = app.pencilSize;
        app.pencil.strokeStyle = !app.color ? "black" : app.color;
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
        app.eraser = new Eraser();
        app.eraser.isEraser = true;
        app.eraser.arr.push([
          event.clientX - canvasObj.canvasOffsetX,
          event.clientY - canvasObj.canvasOffsetY,
        ]);
        canvasObj.ctx.moveTo(
          event.clientX - canvasObj.canvasOffsetX,
          event.clientY - canvasObj.canvasOffsetY
        );
        break;
      case "Text":
        app.addInput(event.x, event.y);
        break;
      case "Shape":
        app.shapes.x1 = event.clientX - canvasObj.canvasOffsetX;
        app.shapes.y1 = event.clientY - canvasObj.canvasOffsetY;
        break;
      case "Select":
        app.startX = event.clientX - canvasObj.canvasOffsetX;
        app.startY = event.clientY - canvasObj.canvasOffsetY;
        let index = 0;
        for (let shape of app.shapeLis) {
          if (
            app.isMouseInShape(shape) ||
            app.isMouseInText(shape)
          ) {
            app.currentShapeIndex = index;
            app.isDragging = true;
          }
          index++;
        }
        break;
      default:
        break;
    }
  });

  canvasObj.canvas.addEventListener("mousemove", app.mouseMove);
  canvasObj.canvas.addEventListener("mouseup", app.mouseUp);
})(app);
