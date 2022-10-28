function Text(ctx) {
    this.x;
    this.y;
    this.value;
    this.obj = "Text";
    this.width = 400;
    this.ctx = ctx;
    
    this.draw = () => {
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.font = "14px sans-serif";
      ctx.fillText(
        this.value,
        parseInt(this.x, 10) - 4,
        parseInt(this.y, 10) - 4
      );
    }
  }