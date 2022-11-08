function Circle(positionArr, lineWidth, strokeStyle, ctx, height, width, center) {
  this.name = "circle";
  Rectangle.call(this, positionArr, lineWidth, strokeStyle, ctx, height, width, center);
}

Object.setPrototypeOf(Circle.prototype, Rectangle.prototype);

Circle.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.strokeStyle = this.strokeStyle;
  let corner = this.calcAllCorner();

  let rightSideCenter = this.getCenterOfSide().RIGHT;
  let leftSideCenter = this.getCenterOfSide().LEFT;
  this.ctx.moveTo(rightSideCenter.xCoordinate, rightSideCenter.yCoordinate);

  this.ctx.bezierCurveTo(
    corner.TOP_RIGHT.xCoordinate,
    corner.TOP_RIGHT.yCoordinate,
    corner.TOP_LEFT.xCoordinate,
    corner.TOP_LEFT.yCoordinate,
    leftSideCenter.xCoordinate,
    leftSideCenter.yCoordinate
  );
  this.ctx.bezierCurveTo(
    corner.BOTTOM_LEFT.xCoordinate,
    corner.BOTTOM_LEFT.yCoordinate,
    corner.BOTTOM_RIGHT.xCoordinate,
    corner.BOTTOM_RIGHT.yCoordinate,
    rightSideCenter.xCoordinate,
    rightSideCenter.yCoordinate
  );

  this.ctx.stroke();
  this.ctx.closePath();
};
