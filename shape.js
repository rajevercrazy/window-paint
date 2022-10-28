function Shapes(ctx) {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.ctx = ctx;
    color = "black";
    
    this.drawRectangle = () =>{
      this.ctx.beginPath();
      this.ctx.rect(this.x1, this.y1, (this.x2 - this.x1), (this.y2 - this.y1));
      this.ctx.stroke();
      this.ctx.closePath();
    }
  
    this.drawCircle = ()=>{
      this.ctx.beginPath()
      // this.ctx.arc(this.x1, this.y1, 10, 0, Math.PI * 2, false);
      let yAxisCenter = this.y1 + (this.y2 - this.y1)/2;
      ctx.moveTo(this.x2,yAxisCenter);
      ctx.bezierCurveTo(this.x2,this.y1,this.x1,this.y1,this.x1,yAxisCenter);
      ctx.bezierCurveTo(this.x1,this.y2,this.x2,this.y2,this.x2,yAxisCenter);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  
    this.drawTriangle = () => {
      this.ctx.beginPath()
      let xAxisCenter = this.x1 + (this.x2 - this.x1)/2
      this.ctx.moveTo(xAxisCenter, this.y1);
      this.ctx.lineTo(this.x1, this.y2);
      this.ctx.lineTo(this.x2,this.y2);
      this.ctx.lineTo(xAxisCenter, this.y1);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  
    this.drawLine = () => {
      ctx.beginPath();
      ctx.moveTo(this.x1,this.y1);
      ctx.lineTo(this.x2,this.y2);
      ctx.stroke();
      ctx.closePath();
    }
  
    this.draw =(shape) =>{
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
    }
  }