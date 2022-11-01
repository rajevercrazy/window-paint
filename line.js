function Line(startPoint,endPoint,lineWidth,strokeStyle,ctx) {

    this.obj = "Line"
    this.startPoint = startPoint; 
    this.endPoint = endPoint; 
    this.lineWidth = lineWidth; 
    this.strokeStyle = strokeStyle; 
    this.ctx = ctx;

    this.draw = () => {
      ctx.beginPath();
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = this.strokeStyle;
      ctx.moveTo(startPoint.xCoordinate,startPoint.yCoordinate);
      ctx.lineTo(endPoint.xCoordinate,endPoint.yCoordinate);
      ctx.stroke();
      ctx.closePath();
    }
}
