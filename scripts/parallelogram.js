//var generalCalculations = new GeneralCalculations();

class Parallelogram { 
    constructor(context, coordinates) {
        this.context = context;
        this.coordinates = [];
    }

    drawParallelogram(coordinates) {
        var generalCalculations = new GeneralCalculations(context);
        if (coordinates.length === 3) {
            var diagonalCenter = generalCalculations.findParallelCenter(coordinates[0], coordinates[2]);
            var fourthVertex = generalCalculations.findVertex(coordinates[1], diagonalCenter);
            coordinates.push(fourthVertex);
            generalCalculations.drawRedDotes(fourthVertex, context);
        }

        if (coordinates.length === 4) {
            context.beginPath();
            context.moveTo(coordinates[0].x, coordinates[0].y);
            coordinates.forEach(coordinate => {
                context.lineTo(coordinate.x, coordinate.y);
            });
            context.lineTo(coordinates[0].x, coordinates[0].y);
            context.strokeStyle = "blue";

            context.stroke();
            context.closePath();

        }
    }

    getParallelogramArea() {
        var traingle = new Triangle();
        var coordinates = this.getCoordinates();
        return traingle.getTriangleArea(coordinates) * 2;
    }

    setCoordinates(coordinates) {
        this.coordinates = coordinates;
    }

    getCoordinates() {
        return this.coordinates;
    }



}

