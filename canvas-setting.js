const canvasSetting = (() => {
  const canvas = document.getElementById("drawing-board");
  return {
    CANVAS: canvas,
    CTX: canvas.getContext("2d"),
    CANVAS_OFF_SET_X: canvas.offsetLeft,
    CANVAS_OFF_SET_Y: canvas.offsetTop,
  };
})();
