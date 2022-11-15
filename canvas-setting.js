const canvasSetting = (() => {
  return {
    canvas: document.getElementById("drawing-board"),
    ctx: canvas.getContext("2d"),
    canvasOffsetX: canvas.offsetLeft,
    canvasOffsetY: canvas.offsetTop,
  };
})();
