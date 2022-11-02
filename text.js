function Text(ctx) {
    this.nmae = "Text";
    this.x;
    this.y;
    this.value;
    this.width = 400;
    this.ctx = ctx;
    
  }
  Text.prototype.draw = function() {
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "14px sans-serif";
    ctx.fillText(
      this.value,
      parseInt(this.x, 10) - 4,
      parseInt(this.y, 10) - 4
    );
  }