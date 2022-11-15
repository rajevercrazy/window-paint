function Pencil(lineWidth, strokeStyle, isDrawing) {
  this.name = "PENCIL";
  this.isDrawing = isDrawing;
  this.lineWidth = lineWidth;
  this.arr = [];
  this.strokeStyle = strokeStyle;
  this.lineCap = "round";
}

Pencil.prototype.addPointer = function (x, y) {
  this.arr.push(new Point(x, y));
};
