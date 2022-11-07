function Triangle(startPoint, endPoint, lineWidth, strokeStyle, ctx, startingPosition,height,width,center) {
  this.name = "triangle";
  Rectangle.call(this, startPoint, endPoint, lineWidth, strokeStyle, ctx,height,width,center);
  this.startingPosition = startingPosition;
}

Object.setPrototypeOf(Triangle.prototype, Rectangle.prototype);

Triangle.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.strokeStyle = this.strokeStyle;
  
  let triangleStartPoint;
  let p1;
  let p2;

  switch (this.startingPosition) {
    case 'RIGHT':
      triangleStartPoint = new Point(this.center.xCoordinate + (this.width/2), this.center.yCoordinate)
      p1 = new Point(this.center.xCoordinate - (this.width/2), this.center.yCoordinate - (this.height/2));
      p2 = new Point(this.center.xCoordinate - (this.width/2), this.center.yCoordinate + (this.height/2));
      break;
    case 'BOTTOM':
      triangleStartPoint = new Point(this.center.xCoordinate, this.center.yCoordinate + (this.height/2))
      p1 = new Point(this.center.xCoordinate + (this.width/2), this.center.yCoordinate - (this.height/2));
      p2 = new Point(this.center.xCoordinate - (this.width/2), this.center.yCoordinate - (this.height/2));
      break;
    case 'LEFT':
      triangleStartPoint = new Point(this.center.xCoordinate - (this.width/2), this.center.yCoordinate)
      p1 = new Point(this.center.xCoordinate + (this.width/2), this.center.yCoordinate - (this.height/2));
      p2 = new Point(this.center.xCoordinate + (this.width/2), this.center.yCoordinate + (this.height/2));
      break;
    default:
      triangleStartPoint = new Point(this.center.xCoordinate, this.center.yCoordinate - (this.height/2))
      p1 = new Point(this.center.xCoordinate - (this.width/2), this.center.yCoordinate + (this.height/2));
      p2 = new Point(this.center.xCoordinate + (this.width/2), this.center.yCoordinate + (this.height/2));
      break;
  };

  this.ctx.moveTo(triangleStartPoint.xCoordinate, triangleStartPoint.yCoordinate);
  this.ctx.lineTo(p1.xCoordinate, p1.yCoordinate);
  this.ctx.lineTo(p2.xCoordinate, p2.yCoordinate);
  this.ctx.lineTo(triangleStartPoint.xCoordinate, triangleStartPoint.yCoordinate);
  this.ctx.stroke();
  this.ctx.closePath();
};
