function Eraser(){
    this.isEraser = false;
    this.size = 10;    

    this.usingEraser = (flag) => {
        this.isEraser = flag;
    }
}