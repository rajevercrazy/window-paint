function Line(positionArr, lineWidth, strokeStyle, ctx, center) {
  this.name = "LINE";
  this.startPoint = positionArr[0];
  this.endPoint = positionArr[1];
  this.lineWidth = lineWidth;
  this.strokeStyle = strokeStyle;
  this.ctx = ctx;
  this.center = center;
}

Line.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.strokeStyle = this.strokeStyle;
  this.ctx.moveTo(this.startPoint.xCoordinate, this.startPoint.yCoordinate);
  this.ctx.lineTo(this.endPoint.xCoordinate, this.endPoint.yCoordinate);
  this.ctx.stroke();
  this.ctx.closePath();
};

Line.prototype.isPointOnLine = function (x, y) {
  const point = new Point(x, y);

  const lenOfLine = this.startPoint.calcDistance(
    this.endPoint.xCoordinate,
    this.endPoint.yCoordinate
  );
  const lenFirstnHalfOfLine = this.startPoint.calcDistance(
    point.xCoordinate,
    point.yCoordinate
  );
  const lenSecondHalfOfLine = this.calDistance(point, this.endPoint);

  return (
    Math.round(lenFirstnHalfOfLine + lenSecondHalfOfLine) ==
    Math.round(lenOfLine)
  );
};

Line.prototype.getCenter = function () {
  const xPointCloseToAxis = Math.min(
    this.startPoint.xCoordinate,
    this.endPoint.xCoordinate
  );

  const yPointCloseToAxis = Math.min(
    this.startPoint.yCoordinate,
    this.endPoint.yCoordinate
  );

  const xDistanceBtwLine = Math.abs(
    this.startPoint.xCoordinate - this.endPoint.xCoordinate
  );

  const yDistanceBtwLine = Math.abs(
    this.startPoint.yCoordinate - this.endPoint.yCoordinate
  );

  let xCenterOfLine = xPointCloseToAxis + xDistanceBtwLine / 2;
  let yCenterOfLine = yPointCloseToAxis + yDistanceBtwLine / 2;

  return new Point(xCenterOfLine, yCenterOfLine);
};

Line.prototype.calDistance = function (point1, point2) {
  return Math.sqrt(
    Math.pow(point2.xCoordinate - point1.xCoordinate, 2) +
      Math.pow(point2.yCoordinate - point2.yCoordinate, 2)
  );
};
