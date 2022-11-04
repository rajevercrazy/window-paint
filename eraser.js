function Eraser() {
  this.name = "Eraser";
  this.isEraser = false;
  this.lineWidth = 10;
  this.arr = [];
  this.strokeStyle = "white";
  this.lineCap = "square";

}

Eraser.prototype.addPointer = function(x, y) {
  this.arr.push(new Point(x,y));
};