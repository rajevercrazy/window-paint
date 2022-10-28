class Text {
    x;
    y;
    value;
    obj = "Text";
    width = 400;
    draw() {
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