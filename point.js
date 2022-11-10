function Point(x,y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
}

Point.prototype.rotate = function(origin,angle){

    let tetha = angle * Math.PI / 180;

    let dx = this.xCoordinate - origin.xCoordinate;
    let dy = this.yCoordinate - origin.yCoordinate;

    this.xCoordinate = Math.cos(tetha) * (dx) - Math.sin(tetha) * (dy) + origin.xCoordinate;
    this.yCoordinate = Math.sin(tetha) * (dx) + Math.cos(tetha) * (dy) + origin.yCoordinate;
}

Point.prototype.calcDistance = function(x,y) {
    return Math.sqrt(Math.pow((this.xCoordinate - x), 2) + Math.pow((this.yCoordinate - y), 2));
  }