function Point(x, y) {
  this.xCoordinate = x;
  this.yCoordinate = y;
}

Point.prototype.rotate = function (origin, angle) {
  let tetra = (angle * Math.PI) / 180;

  let dx = this.xCoordinate - origin.xCoordinate;
  let dy = this.yCoordinate - origin.yCoordinate;

  this.xCoordinate =
    Math.cos(tetra) * dx - Math.sin(tetra) * dy + origin.xCoordinate;
  this.yCoordinate =
    Math.sin(tetra) * dx + Math.cos(tetra) * dy + origin.yCoordinate;
};

Point.prototype.calcDistance = function (x, y) {
  return Math.sqrt(
    Math.pow(this.xCoordinate - x, 2) + Math.pow(this.yCoordinate - y, 2)
  );
};
