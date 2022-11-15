const mainModules = (() => {
  const _ = canvasSetting;

  _.CANVAS.addEventListener("mousedown", mouseDownModule.mouseDown);
  _.CANVAS.addEventListener("mousemove", mouseMoveModule.mouseMove);
  _.CANVAS.addEventListener("mouseup", mouseUpModule.mouseUp);
})();