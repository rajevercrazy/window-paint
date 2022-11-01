function Pencil(size,strokeStyle,isDrawing) {
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

  this.getPencilObj = () => {
    return {
      points: this.arr,
      obj: "Pencil",
      lineWidth: this.size,
      strokeStyle: this.strokeStyle,
      lineCap: this.lineCap
    };
  }

}
