function Rectangle(positionArr, lineWidth, strokeStyle, ctx, height,width,center) {
  this.name = "rectangle";

  this.diagonal1 = new Line(positionArr[0],positionArr[2],lineWidth, strokeStyle, ctx);
  this.diagonal2 = new Line(positionArr[1],positionArr[3],lineWidth, strokeStyle, ctx);

  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.lineWidth = lineWidth;
  this.strokeStyle = strokeStyle;
  this.center = center;
}


Rectangle.prototype.calcAllCorner = function () {
  return {
    TOP_LEFT: this.diagonal1.startPoint,
    TOP_RIGHT: this.diagonal2.startPoint,
    BOTTOM_LEFT: this.diagonal1.endPoint,
    BOTTOM_RIGHT: this.diagonal2.endPoint
  };
};

Rectangle.prototype.getCenterOfSide = function () {

  let topSide = new Line(positionArr[0],positionArr[1],lineWidth, strokeStyle, ctx)
  let rightSide = new Line(positionArr[1],positionArr[2],lineWidth, strokeStyle, ctx)
  let leftSide = new Line(positionArr[2],positionArr[3],lineWidth, strokeStyle, ctx)
  let bottomSide = new Line(positionArr[3],positionArr[0],lineWidth, strokeStyle, ctx)

    return {
        TOP: topSide.getCenter(),
        BOTTOM: bottomSide.getCenter(),
        LEFT: leftSide.getCenter(),
        RIGHT: rightSide.getCenter()
      };
};

Rectangle.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.strokeStyle = this.strokeStyle;
  this.ctx.strokeStyle = 'black';
  this.ctx.setLineDash([])
  this.createRectSide()
};

Rectangle.prototype.drawDashPatten = function() {
  this.ctx.beginPath();
  this.ctx.lineWidth = 0.5;
  this.ctx.strokeStyle = '#1682fc';
  this.ctx.setLineDash([6])
  this.createRectSide()
  this.ctx.setLineDash([])
};

Rectangle.prototype.createRectSide = function() {
  this.ctx.moveTo(this.diagonal1.startPoint.xCoordinate,this.diagonal1.startPoint.yCoordinate)
  this.ctx.lineTo(this.diagonal2.startPoint.xCoordinate,this.diagonal2.startPoint.yCoordinate)
  this.ctx.lineTo(this.diagonal1.endPoint.xCoordinate,this.diagonal1.endPoint.yCoordinate)
  this.ctx.lineTo(this.diagonal2.endPoint.xCoordinate,this.diagonal2.endPoint.yCoordinate)
  this.ctx.lineTo(this.diagonal1.startPoint.xCoordinate,this.diagonal1.startPoint.yCoordinate)
  this.ctx.stroke();
  this.ctx.closePath();
}