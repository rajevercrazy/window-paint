const mainModules = (() => {
  const canvasObj = canvasSetting;

  canvasObj.canvas.addEventListener("mousedown", mouseDownModule.mouseDown);
  canvasObj.canvas.addEventListener("mousemove", mouseMoveModule.mouseMove);
  canvasObj.canvas.addEventListener("mouseup", mouseUpModule.mouseUp);
})();