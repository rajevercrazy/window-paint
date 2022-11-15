function Eraser(isEraser) {
  this.name = "ERASER";
  this.isEraser = isEraser;
  this.lineWidth = 10;
  this.arr = [];
  this.strokeStyle = "white";
  this.lineCap = "square";
}

Eraser.prototype.addPointer = function (x, y) {
  this.arr.push(new Point(x, y));
};