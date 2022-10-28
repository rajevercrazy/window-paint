function Eraser(){
    this.isEraser = false;
    this.size = 10;    
    this.arr = [];
    this.strokeStyle = 'white';
    this.lineCap = 'square';
    this.usingEraser = (flag) => {
        this.isEraser = flag;
    }

  this.addPointer = (x, y, lineWidth) => {
    this.size = lineWidth;
    this.arr.push([x, y]);
  }

  this.getEraserObj = () => {
    return {
      points: this.arr,
      obj: "Eraser",
      lineWidth: this.size,
      strokeStyle: this.strokeStyle,
      lineCap: this.lineCap
    };
  }
}