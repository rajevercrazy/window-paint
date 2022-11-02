function Shapes(ctx,x1,y1,color) {
    this.obj = ""
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = 0;
    this.y2 = 0;
    this.ctx = ctx;
    this.size = 1;
    this.color = color;
  }


  Shapes.prototype.drawRectangle = function(){
    this.ctx.beginPath();
    this.ctx.lineWidth = this.size;
    this.ctx.strokeStyle = this.color;
    this.ctx.rect(this.x1, this.y1, (this.x2 - this.x1), (this.y2 - this.y1));
    this.ctx.stroke();
    this.ctx.closePath();
  }

  Shapes.prototype.drawCircle = function(){
    this.ctx.beginPath();
    this.ctx.lineWidth = this.size;
    this.ctx.strokeStyle = this.color;
    let yAxisCenter = this.y1 + (this.y2 - this.y1)/2;
    ctx.moveTo(this.x2,yAxisCenter);
    ctx.bezierCurveTo(this.x2,this.y1,this.x1,this.y1,this.x1,yAxisCenter);
    ctx.bezierCurveTo(this.x1,this.y2,this.x2,this.y2,this.x2,yAxisCenter);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  Shapes.prototype.drawTriangle = function() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.size;
    this.ctx.strokeStyle = this.color;
    let xAxisCenter = this.x1 + (this.x2 - this.x1)/2
    this.ctx.moveTo(xAxisCenter, this.y1);
    this.ctx.lineTo(this.x1, this.y2);
    this.ctx.lineTo(this.x2,this.y2);
    this.ctx.lineTo(xAxisCenter, this.y1);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  Shapes.prototype.drawLine = function() {
    ctx.beginPath();
    this.ctx.lineWidth = this.size;
    this.ctx.strokeStyle = this.color;
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
    ctx.closePath();
  }

  Shapes.prototype.draw = function(shape){
    switch(shape){
      case 'circle': 
      this.drawCircle();
      break;
      case 'rectangle': 
      this.drawRectangle();
      break;
      case 'triangle': 
      this.drawTriangle();
      break;
      case 'line': 
      this.drawLine();
      break;
      default:
      break;
    }

    this.obj = shape;
  }