function Text(ctx) {
    this.obj = "Text";
    this.x;
    this.y;
    this.value;
    this.width = 400;
    this.ctx = ctx;
    
  }
  Text.prototype.draw = function() {
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "left";
    this.ctx.font = "14px sans-serif";
    this.ctx.fillText(
      this.value,
      parseInt(this.x, 10) - 4,
      parseInt(this.y, 10) - 4
    );
  }