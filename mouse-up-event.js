const mouseUpModule = (() => {
const mouseUp = () => {
  const app = commonModules;

    switch (app.tool) {
      case "Pencil":
        app.pencil.isDrawing = false;
        app.toolLis.push(app.pencil);
        break;
      case "Eraser":
        app.eraser.isEraser = false;
        app.toolLis.push(app.eraser);
        break;
      case "Shape":
        app.shape.isDrawing = false;
        app.toolLis.push(app.shape);
        app.currentShapeIndex = app.toolLis.length - 1;
        app.shape.drawDashRect();
        break;
      case "Select":
        app.isDragging = false;
        if(app.toolLis[app.currentShapeIndex].name == "Shape") app.toolLis[app.currentShapeIndex].drawDashRect();
        break;
        default:
        app.isRotated = false;
        app.tool = app.preTool;
        break;
    }
}
return {
  mouseUp
}
})()
