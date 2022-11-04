const canvasSetting = (() => {
    const canvas = document.getElementById("drawing-board");
    const ctx = canvas.getContext("2d");
    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;
    return {
        'canvas': canvas,
        'ctx':ctx,
        'canvasOffsetX':canvasOffsetX,
        'canvasOffsetY':canvasOffsetY
    }
})();
