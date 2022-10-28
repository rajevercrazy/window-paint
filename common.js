(() => {
    let canvasObj = app.canvasSetting();
  app.draw = () => {
    
    canvasObj.ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i = 0;
    for (let shape of app.shapeLis) {
      if (shape.obj == "Pencil") {
        canvasObj.ctx.moveTo(shape.points[0][0], shape.points[0][1]);
        canvasObj.ctx.lineWidth = shape.lineWidth;
        canvasObj.ctx.strokeStyle = shape.strokeStyle;
        canvasObj.ctx.lineCap = shape.lineCap;
        for (let j = 1; j < shape.points.length; j++) {
          canvasObj.ctx.lineTo(shape.points[j][0], shape.points[j][1]);
          canvasObj.ctx.stroke();
        }
        canvasObj.ctx.beginPath();
      } else if (shape.obj == "Text") {
        shape.draw();
      } else {
        let s = new Shapes(canvasObj.ctx);
        s.x1 = shape.x1;
        s.y1 = shape.y1;
        s.x2 = shape.x2;
        s.y2 = shape.y2;
        shapeLis[i] = s.draw(shape.obj);
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
//   textBtn = false;
}

  app.handleEnter = (event) => {
  let keyCode = event.keyCode;
  if (keyCode == 13) {
      textObj = new Text();
      textObj.x = textX;
      textObj.y = textY;
      textObj.value = textarea.value;
    canvasObj.ctx.textBaseline = "top";
    canvasObj.ctx.textAlign = "left";
    canvasObj.ctx.font = "14px sans-serif";
    canvasObj.ctx.fillText(textObj.value, textX, textY);
    textBtn = true;
    app.shapeLis.push(textObj);
    document.body.removeChild(textarea);
  }
}

app.setShape = (shape) => {
  app.tool = "Shape";
  app.shape = shape;
}

let colorId = "color1";
app.setColor = (color) => {
  let selectedColor = document.getElementById(colorId);
  selectedColor.style.backgroundColor = color;
  app.color = color;
  if (tool == "Shape") app.shapes.color = color;
}

app.isMouseInShape = (x, y, shape) => {
  if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
    return true;
  }
  return false;
}

app.isMouseInText = (x, y, shape) => {
  if (x > shape.x && x < shape.x + 400 && y > shape.y && y < shape.y + 14) {
    return true;
  }

  return false;
}
})();
