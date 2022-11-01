function Eraser() {
  this.obj = "Eraser";
  this.isEraser = false;
  this.size = 10;
  this.arr = [];
  this.strokeStyle = "white";
  this.lineCap = "square";

  this.addPointer = (x, y, lineWidth) => {
    this.size = lineWidth;
    this.arr.push([x, y]);
  };
}
