function Text(ctx,location,value) {
    this.name = "TEXT";
    this.location = location;
    this.value = value;
    this.width = 400;
    this.ctx = ctx;
    
  }
  Text.prototype.draw = function() {
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "left";
    this.ctx.font = "14px sans-serif";
    this.ctx.fillText(
      this.value,
      parseInt(this.location.xCoordinate, 10) - 4,
      parseInt(this.location.yCoordinate, 10) - 4
    );
  }