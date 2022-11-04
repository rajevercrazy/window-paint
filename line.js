function Line(startPoint,endPoint,lineWidth,strokeStyle,ctx) {

    this.name = "line"
    this.startPoint = startPoint; 
    this.endPoint = endPoint; 
    this.lineWidth = lineWidth; 
    this.strokeStyle = strokeStyle; 
    this.ctx = ctx;

  }
  
  Line.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.moveTo(this.startPoint.xCoordinate,this.startPoint.yCoordinate);
    this.ctx.lineTo(this.endPoint.xCoordinate,this.endPoint.yCoordinate);
    this.ctx.stroke();
    this.ctx.closePath();
  }