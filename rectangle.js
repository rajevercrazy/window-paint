function Rectangle(startPoint, endPoint, lineWidth, strokeStyle, ctx, height,width,center) {
  this.name = "rectangle";

  Line.call(this, startPoint, endPoint, lineWidth, strokeStyle, ctx);

  this.width = width;
  this.height = height;

  this.center = center;
}

Object.setPrototypeOf(Rectangle.prototype, Line.prototype);

Rectangle.prototype.calcAllCorner = function () {
  return {
    TOP_LEFT: new Point(this.center.xCoordinate - (this.width/2),this.center.yCoordinate - (this.height/2)),
    TOP_RIGHT: new Point(this.center.xCoordinate + (this.width/2),this.center.yCoordinate - (this.height/2)),
    BOTTOM_LEFT: new Point(this.center.xCoordinate - (this.width/2),this.center.yCoordinate + (this.height/2)),
    BOTTOM_RIGHT: new Point(this.center.xCoordinate + (this.width/2),this.center.yCoordinate + (this.height/2)),
  };
};

Rectangle.prototype.getCenterOfSide = function () {
    return {
        TOP: new Point(this.center.xCoordinate, this.center.yCoordinate - (this.height/2)),
        BOTTOM: new Point(this.center.xCoordinate, this.center.yCoordinate + (this.height/2)),
        LEFT: new Point(this.center.xCoordinate - (this.width/2), this.center.yCoordinate),
        RIGHT: new Point(this.center.xCoordinate + (this.width/2), this.center.yCoordinate),
      };
};


Rectangle.prototype.widthCalc = function () {
  return Math.abs(this.endPoint.xCoordinate - this.startPoint.xCoordinate);
};

Rectangle.prototype.heightCalc = function () {
  return Math.abs(this.endPoint.yCoordinate - this.startPoint.yCoordinate);
};

Rectangle.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.strokeStyle = this.strokeStyle;
  this.ctx.rect(
    this.startPoint.xCoordinate,
    this.startPoint.yCoordinate,
    this.width,
    this.height
  );
  this.ctx.stroke();
  this.ctx.closePath();
};

Rectangle.prototype.drawDashPatten = function() {
  this.ctx.beginPath();
  this.ctx.lineWidth = 0.5;
  this.ctx.strokeStyle = '#1682fc';
  this.ctx.setLineDash([6])
  this.ctx.rect(
    this.startPoint.xCoordinate,
    this.startPoint.yCoordinate,
    this.width,
    this.height
  );
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.setLineDash([])
};