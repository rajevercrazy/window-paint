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
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.lineCap = lineCap;
    this.arr.push([x, y]);
  }

  this.getPencilObj = () => {
    return {
      points: this.arr,
      obj: "Pencil",
    };
  }

}
