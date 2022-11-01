function Eraser() {
  this.obj = "Eraser";
  this.isEraser = false;
  this.lineWidth = 10;
  this.arr = [];
  this.strokeStyle = "white";
  this.lineCap = "square";

}

Eraser.prototype.addPointer = function(x, y) {
  this.arr.push([x, y]);
};