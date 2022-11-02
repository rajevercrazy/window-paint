function Shape(shapeName,ctx) {
    this.shapeName = shapeName;
    this.startPoint = {}; 
    this.endPoint = {}; 
    this.lineWidth = 2; 
    this.strokeStyle = 'black';
    this.ctx = ctx; 
  }


  Shape.prototype.draw = function() {
    
    let shape;

    switch(this.shapeName){
      case 'circle': 
      shape = new Circle(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);
      break;
      case 'rectangle': 
      shape = new Rectangle(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);
      break;
      case 'triangle': 
      shape = new Triangle(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);
      break;
      case 'line': 
      shape = new Line(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);
      break;
      default:
      break;
    }
    shape.draw();
  }