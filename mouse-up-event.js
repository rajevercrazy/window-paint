const mouseUpModule = (() => {
const mouseUp = () => {
  switch (commonModules.tool) {
      case "PENCIL":
        commonModules.pencil.isDrawing = false;
        commonModules.tools.push(commonModules.pencil);
        break;
      case "ERASER":
        commonModules.eraser.isEraser = false;
        commonModules.tools.push(commonModules.eraser);
        break;
      case "SHAPE":
        commonModules.shape.isDrawing = false;
        commonModules.tools.push(commonModules.shape);
        commonModules.lastShapeIndex = commonModules.tools.length - 1;
        commonModules.shape.drawDashRect();
        break;
      case "SELECT":
        commonModules.isDragging = false;
        if(commonModules.tools[commonModules.lastShapeIndex].name == "SHAPE") commonModules.tools[commonModules.lastShapeIndex].drawDashRect();
        break;
        default:
        commonModules.isRotated = false;
        commonModules.tool = commonModules.preTool;
        break;
    }
}
return {
  mouseUp
}
})()
