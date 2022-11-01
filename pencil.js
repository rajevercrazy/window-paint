function Pencil(lineWidth,strokeStyle,isDrawing) {
  this.obj= "Pencil"
  this.isDrawing = isDrawing;
  this.lineWidth = lineWidth;
  this.arr = [];
  this.strokeStyle = strokeStyle;
  this.lineCap = 'round';

  this.addPointer = (x, y, lineWidth, strokeStyle) => {
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.arr.push([x, y]);
  }

}
