function Rectangle(startPoint, endPoint, lineWidth, strokeStyle, ctx) {
  this.obj = "rectangle";

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
    let centers = {
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
  return centers
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
