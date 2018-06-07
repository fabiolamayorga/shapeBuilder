class GeneralCalculations{
    constructor(context) {
        this.context = context;
    }

    findVertex(pointB, centerDiagonal) {
        return {
            x: - pointB.x + 2*centerDiagonal.x,
            y: - pointB.y + 2*centerDiagonal.y
        };       
    }

    findParallelCenter(pointA, pointC) {
        return {
            x: (pointA.x + pointC.x)/2,
            y: (pointA.y + pointC.y)/2
        };
    }   


    drawRedDotes(coordinates) {
        var context = this.context;
        context.fillStyle = "red";
        context.beginPath();
        context.arc(coordinates.x,coordinates.y,5.5,0,Math.PI*2);
        context.fill();
        context.fillText("  ("+coordinates.x+", "+coordinates.y+")",coordinates.x,coordinates.y);
        context.fillStyle = "black";
    }


    getDistanceBetweenPoints(pointA, pointB) {
        var a = pointA.x - pointB.x;
        var b = pointA.y - pointB.x;
        return Math.sqrt( a*a + b*b );    
    }

}