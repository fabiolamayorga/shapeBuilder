class Circle { 
    constructor(context) {
        this.context = context;
        //this.area = area;
    }

    drawCircle(coordinates, area, diagonalCenter) {
        var radio = Math.sqrt(area/Math.PI);
        this.context.strokeStyle = "yellow";
        this.context.beginPath();
        this.context.arc(diagonalCenter.x,diagonalCenter.y,radio,Math.PI*2,0);
        this.context.stroke();
        this.context.closePath();

    }

}

