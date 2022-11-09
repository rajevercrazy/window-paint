function Triangle(positionArr, lineWidth, strokeStyle, ctx, height,width,center) {
  this.name = "triangle";
  Rectangle.call(this, positionArr, lineWidth, strokeStyle, ctx,height,width,center);
}

Object.setPrototypeOf(Triangle.prototype, Rectangle.prototype);

Triangle.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.strokeStyle = this.strokeStyle;
  
  let triangleStartPoint = this.getCenterOfSide().TOP;
  let p1 = this.calcAllCorner().BOTTOM_LEFT;
  let p2 = this.calcAllCorner().BOTTOM_RIGHT;

  this.ctx.moveTo(triangleStartPoint.xCoordinate, triangleStartPoint.yCoordinate);
  this.ctx.lineTo(p1.xCoordinate, p1.yCoordinate);
  this.ctx.lineTo(p2.xCoordinate, p2.yCoordinate);
  this.ctx.lineTo(triangleStartPoint.xCoordinate, triangleStartPoint.yCoordinate);
  this.ctx.stroke();
  this.ctx.closePath();
};
