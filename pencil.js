function Pencil(size,strokeStyle,isDrawing) {
  this.obj= "Pencil"
  this.isDrawing = isDrawing;
  this.size = size;
  this.arr = [];
  this.strokeStyle = strokeStyle;
  this.lineCap = 'round';

  this.addPointer = (x, y, lineWidth, strokeStyle) => {
    this.size = lineWidth;
    this.strokeStyle = strokeStyle;
    this.arr.push([x, y]);
  }

}
