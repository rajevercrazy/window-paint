function Rectangle(startPoint, endPoint, lineWidth, strokeStyle, ctx) {
  this.name = "rectangle";

  Line.call(this, startPoint, endPoint, lineWidth, strokeStyle, ctx);

  this.width = this.widthCalc();
  this.breath = this.breathCalc();
}

Object.setPrototypeOf(Rectangle.prototype, Line.prototype);

Rectangle.prototype.calcAllCorner = function () {
  return {
    TOP_LEFT: this.startPoint,
    TOP_RIGHT: new Point(
      this.endPoint.xCoordinate,
      this.startPoint.yCoordinate
    ),
    BOTTOM_LEFT: new Point(
        this.startPoint.xCoordinate,
        this.endPoint.yCoordinate
      ),
    BOTTOM_RIGHT: this.endPoint,
  };
};

Rectangle.prototype.getCenter = function () {
    return {
        TOP: new Point(
          this.startPoint.xCoordinate + (this.width/ 2),
          this.startPoint.yCoordinate
        ),
        BOTTOM: new Point(
          this.startPoint.xCoordinate + (this.width / 2),
          this.endPoint.yCoordinate
        ),
        LEFT: new Point(
            this.startPoint.xCoordinate,
            this.startPoint.yCoordinate + (this.breath / 2)
          ),
          RIGHT: new Point(
            this.endPoint.xCoordinate,
            this.startPoint.yCoordinate + (this.breath / 2)
          ),
      };
};


Rectangle.prototype.widthCalc = function () {
  return this.endPoint.xCoordinate - this.startPoint.xCoordinate;
};

Rectangle.prototype.breathCalc = function () {
  return this.endPoint.yCoordinate - this.startPoint.yCoordinate;
};

Rectangle.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.strokeStyle = this.strokeStyle;
  this.ctx.rect(
    this.startPoint.xCoordinate,
    this.startPoint.yCoordinate,
    this.width,
    this.breath
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
    this.breath
  );
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.setLineDash([])
};