function Pencil() {
  this.isDrawing = false;
  this.size = 1;
  this.arr = [];
  this.strokeStyle = 'black';
  this.lineCap = 'round';

  this.usingPencil = (flag) => {
    this.isDrawing = flag;
  };

  this.addPointer = (x, y, lineWidth, strokeStyle, lineCap) => {
    this.size = lineWidth;
    this.strokeStyle = strokeStyle;
    this.lineCap = lineCap;
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