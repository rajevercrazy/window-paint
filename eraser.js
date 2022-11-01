function Eraser() {
  this.obj = "Eraser";
  this.isEraser = false;
  this.lineWidth = 10;
  this.arr = [];
  this.strokeStyle = "white";
  this.lineCap = "square";

  this.addPointer = (x, y) => {
    this.arr.push([x, y]);
  };
}
