(() => {
  let canvasObj = app.canvasSetting();
  const ctx = canvasObj.ctx;
  app.draw = () => {
    ctx.clearRect(0,0,canvasObj.canvas.width,canvasObj.canvas.height);

    let i = 0;

    for (let shape of app.shapeLis) {
      if (shape.obj == "Pencil") {
        ctx.beginPath();
        ctx.moveTo(shape.arr[0][0], shape.arr[0][1]);
        ctx.lineWidth = shape.size;
        ctx.strokeStyle = shape.strokeStyle;
        ctx.lineCap = shape.lineCap;
        for (let j = 1; j < shape.arr.length; j++) {
          ctx.lineTo(shape.arr[j][0], shape.arr[j][1]);
          ctx.stroke();
        }
        ctx.beginPath();
      } 
      else if (shape.obj == "Eraser") {
        ctx.beginPath();
        ctx.moveTo(shape.arr[0][0], shape.arr[0][1]);
        ctx.lineWidth = shape.size;
        ctx.strokeStyle = shape.strokeStyle;
        ctx.lineCap = shape.lineCap;
        for (let j = 1; j < shape.arr.length; j++) {
          ctx.lineTo(shape.arr[j][0], shape.arr[j][1]);
          ctx.stroke();
        }
        ctx.closePath();
      } 
      else if (shape.obj == "Text") {
        shape.draw();
      } 
      else {
        let s = new Shapes(ctx);
        s.x1 = shape.x1;
        s.y1 = shape.y1;
        s.x2 = shape.x2;
        s.y2 = shape.y2;
        app.shapeLis[i] = s.draw(shape.obj);
      }
      i++;
    }
  };

  let textX;
  let textY;
  let textarea;
  app.addInput = (x, y) => {
    textX = x - canvasObj.canvasOffsetX;
    textY = y - canvasObj.canvasOffsetY;
    textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.left = x + "px";
    textarea.style.top = y + "px";
    textarea.onkeydown = app.handleEnter;
    document.body.appendChild(textarea);
  };

  app.handleEnter = (event) => {
    let keyCode = event.keyCode;
    if (keyCode == 13) {
      textObj = new Text(ctx);
      textObj.x = textX;
      textObj.y = textY;
      textObj.value = textarea.value;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.font = "14px sans-serif";
      ctx.fillText(textObj.value, textX, textY);
      textBtn = true;
      app.shapeLis.push(textObj);
      document.body.removeChild(textarea);
    }
  };

  app.setShape = (shape) => {
    app.tool = "Shape";
  app.shape = shape;
}

  app.colorId = "color1";
  app.setColor = (color) => {
    let selectedColor = document.getElementById(app.colorId);
    selectedColor.style.backgroundColor = color;
    app.color = color;
    if (app.tool == "Shape") app.shapes.color = color;
  };

  app.isMouseInShape = (shape) => {
    console.table(app.startX, app.startY);
    console.table(shape);
    if (
      app.startX > shape.x1 &&
      app.startX < shape.x2 &&
      app.startY > shape.y1 &&
      app.startY < shape.y2
    ) {
      return true;
    }
    return false;
  };

  app.isMouseInText = (shape) => {
    if (
      app.startX > shape.x &&
      app.startX < shape.x + 400 &&
      app.startY > shape.y &&
      app.startY < shape.y + 14
    ) {
      return true;
    }

    return false;
  };

  app.rotated = (angle) => {
    // ctx.save();
    ctx.clearRect(
      0,
      0,
      canvasObj.canvas.width,
      canvasObj.canvas.height
    );
    let index = app.currentShapeIndex
      ? app.currentShapeIndex
      : app.shapeLis.length - 1;

    let currentShape = app.shapeLis[index];
    
    let xAxisCenter = currentShape.x1 + ((currentShape.x2 - currentShape.x1)/2);
    let yAxisCenter = currentShape.y1 + ((currentShape.y2 - currentShape.y1)/2);

    ctx.translate(xAxisCenter, yAxisCenter);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(- xAxisCenter, - yAxisCenter)
    
    let shape = new Shapes(ctx);
    shape.x1 = currentShape.x1; 
    shape.y1 = currentShape.y1;
    shape.x2 = currentShape.x2;   
    shape.y2 = currentShape.y2;   
    shape.draw(currentShape.obj);

    app.draw();
  };
})();
