function Triangle(startPoint,endPoint,lineWidth,strokeStyle,ctx) {
    obj = "triangle";
    Rectangle.call(this,startPoint,endPoint,lineWidth,strokeStyle,ctx);
  }
  
  Object.setPrototypeOf(Triangle.prototype, Rectangle.prototype);
  
  Triangle.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strokeStyle;
    let topSideCenter = this.getCenter().TOP;
    let corner = this.calcAllCorner();

    this.ctx.moveTo(topSideCenter.xCoordinate,topSideCenter.yCoordinate);
    this.ctx.lineTo(corner.BOTTOM_LEFT.xCoordinate, corner.BOTTOM_LEFT.yCoordinate);
    this.ctx.lineTo(corner.BOTTOM_RIGHT.xCoordinate, corner.BOTTOM_RIGHT.yCoordinate);
    this.ctx.lineTo(topSideCenter.xCoordinate,topSideCenter.yCoordinate);
    this.ctx.stroke();
    this.ctx.closePath();
  };
  