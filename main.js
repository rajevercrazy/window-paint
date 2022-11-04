const mainModules = (() => {
  const canvasObj = canvasSetting;

  canvasObj.canvas.addEventListener("mousedown", mouseDown);
  canvasObj.canvas.addEventListener("mousemove", mouseMove);
  canvasObj.canvas.addEventListener("mouseup", mouseUp);
})();