function Shape(shapeName,ctx) {
    this.name = 'Shape';
    this.shapeName = shapeName;
    this.startPoint = {}; 
    this.endPoint = {}; 
    this.lineWidth = 2; 
    this.strokeStyle = 'black';
    this.ctx = ctx; 
    this.isDrawing = false;
  }


  Shape.prototype.draw = function() {
    
    let shape = this.createGivenNameObj();
    shape.draw();
  }

  Shape.prototype.drawDashRect = function() {
    let shape = this.createGivenNameObj();
    if(this.shapeName != 'line' && this.shapeName != 'Pencil' && this.shapeName != 'Text' && this.shapeName != 'Eraser'){
      shape.drawDashPatten();
    }
  }

  Shape.prototype.createGivenNameObj = function() {
    switch(this.shapeName){
      case 'circle': 
      return new Circle(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);

      case 'rectangle': 
      return new Rectangle(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);

      case 'triangle': 
      return new Triangle(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);

      case 'line': 
      return new Line(this.startPoint,this.endPoint,this.lineWidth,this.strokeStyle,this.ctx);

      default:
    }
  }