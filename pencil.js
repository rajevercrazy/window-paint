function Pencil(lineWidth,strokeStyle,isDrawing) {
  
  this.obj= "Pencil";
  this.isDrawing = isDrawing;
  this.lineWidth = lineWidth;
  this.arr = [];
  this.strokeStyle = strokeStyle;
  this.lineCap = 'round';

}

Pencil.prototype.addPointer = function(x, y) {
  this.arr.push([x, y]);
}