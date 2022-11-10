const mouseUp = () => {
  const app = commonModules;

    switch (app.tool) {
      case "Pencil":
        app.pencil.isDrawing = false;
        app.shapeLis.push(app.pencil);
        break;
      case "Eraser":
        app.eraser.isEraser = false;
        app.shapeLis.push(app.eraser);
        break;
      case "Shape":
        app.shape.isDrawing = false;
        app.shapeLis.push(app.shape);
        app.currentShapeIndex = app.shapeLis.length - 1;
        app.shape.drawDashRect();
        break;
      case "Select":
        app.isDragging = false;
        app.shapeLis[app.currentShapeIndex].drawDashRect();
        break;
        default:
        app.isRotated = false;
        app.tool = "Shape"
        break;
    }
}
