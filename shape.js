function Shape(shapeName, ctx) {
  this.name = 'Shape';
  this.shapeName = shapeName;
  this.startPoint = {};
  this.endPoint = {};
  this.lineWidth = 2;
  this.strokeStyle = 'black';
  this.ctx = ctx;
  this.isDrawing = false;
  this.currentRotation = 0;
  this.center;
  this.width;
  this.height;
  this.angle = 0;
  this.positionArr = [];
}


Shape.prototype.draw = function () {

  let shape = this.createGivenNameObj();
  shape.draw();
}

Shape.prototype.drawDashRect = function () {
  let shape = this.createGivenNameObj();
  if (this.shapeName != 'line' && this.shapeName != 'Pencil' && this.shapeName != 'Text' && this.shapeName != 'Eraser') {
    shape.drawDashPatten();
  }
}

Shape.prototype.createGivenNameObj = function () {
  switch (this.shapeName) {
    case 'circle':
      return new Circle(this.positionArr, this.lineWidth, this.strokeStyle, this.ctx, this.height, this.width, this.center);

    case 'rectangle':
      return new Rectangle(this.positionArr, this.lineWidth, this.strokeStyle, this.ctx, this.height, this.width, this.center);

    case 'triangle':
      return this.createTriangle(this.angle)

    case 'line':
      return new Line(this.positionArr, this.lineWidth, this.strokeStyle, this.ctx);

    default:
  }
}

Shape.prototype.createTriangle = function () {

  

  let obj = ['TOP', 'RIGHT', 'BOTTOM', 'LEFT'];

  return new Triangle(this.positionArr, this.lineWidth, this.strokeStyle, this.ctx, obj[this.currentRotation], this.height, this.width, this.center);

}

Shape.prototype.calc = function () {
  this.center = this.getCenter();
  this.height = this.heightCalc();
  this.width = this.widthCalc();
}

Shape.prototype.widthCalc = function () {
  return Math.abs(this.endPoint.xCoordinate - this.startPoint.xCoordinate);
};

Shape.prototype.heightCalc = function () {
  return Math.abs(this.endPoint.yCoordinate - this.startPoint.yCoordinate);
};

Shape.prototype.getCenter = function () {
  let xAxisCenter = this.startPoint.xCoordinate + (this.width / 2);
  let yAxisCenter = this.startPoint.yCoordinate + (this.height / 2);

  return new Point(xAxisCenter, yAxisCenter);
}