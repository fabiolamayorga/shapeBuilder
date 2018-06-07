
class ShapesBuilder {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.coordinates = [];
        this.parallelogram = new Parallelogram(context);
        this.circle = new Circle(context);
        this.generalCalculations = new GeneralCalculations(this.context);
        this.diagonalCenter = 0;
        this.isSelected = false;

        console.log(this.parallelogram);
    }

    addEventHandlers() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var self = this;
        var interceptedPoint = 0;

        self.canvas.addEventListener('click', function(e){
            if (self.coordinates.length < 3){
                self.coordinates.push(self.getCoordinates(e));
                self.render(self.coordinates);
            }
        }, true);


        self.canvas.addEventListener('mousedown', function(e) {
            if (self.coordinates.length >= 3 ){
                interceptedPoint = self.interceptMouseClick(e);
            }
        });

        self.canvas.addEventListener('mouseup', function(e){
            if (self.coordinates.length >= 3){
                self.newPoint = self.releaseMouseClick(e);
            }
        });

        self.canvas.addEventListener('mousemove', function(e){
            if (self.coordinates.length >= 3 ){
                self.movePoint(e, interceptedPoint);
            }
        });
     
    }

    getCoordinates(e){
        var coordinates = {
            x: e.clientX - this.canvas.offsetLeft,
            y: e.clientY - this.canvas.offsetTop
        }

        if (this.coordinates.length < 3) {
            this.generalCalculations.drawRedDotes(coordinates);
        }

        return coordinates;
    }


    interceptMouseClick(e) {
        var clickedCoordinate = (this.getCoordinates(e));
        var coordinates = this.coordinates;
        var interceptedPoint = {x: 0, y:0};
        var interceptedPointIndex = 0;
        this.isSelected = true;

        console.log(clickedCoordinate);

        coordinates.map((coordinate, index) => {
            if (clickedCoordinate.x === coordinate.x) {
                console.log('esta entrando');
                interceptedPoint = coordinate;
                interceptedPointIndex = index;
            }if ((clickedCoordinate.x <= coordinate.x + 5.5) && (clickedCoordinate.x >= coordinate.x - 5.5)) {
                console.log('entra aca');
                interceptedPoint = coordinate;
                interceptedPointIndex = index;
            }
        });
        return interceptedPointIndex;
    }

    releaseMouseClick(e) {
        this.isSelected = false;
        var finalPoint = this.getCoordinates(e);

        var coordinates = this.coordinates;
        return this.getCoordinates(e);

    }

    movePoint(e, interceptedPoint) {
        if(this.isSelected) {
            this.context.clearRect(0, 0, canvas.width, canvas.height);

            var newCoordinates = this.coordinates;
            var clickedCoordinate = (this.getCoordinates(e));
            var pointC = (interceptedPoint+2 >= 3) ? 0 : interceptedPoint+2;
            var newdiagonalCenter = this.generalCalculations.findParallelCenter(clickedCoordinate, this.coordinates[pointC]);
            var newVertex = this.generalCalculations.findVertex(clickedCoordinate, newdiagonalCenter);

            var pointA = 0; 
            var pointB = interceptedPoint;
            var pointC = 0;

            if (interceptedPoint === 0) {
                pointA = 3;
                pointC = 1;
            }else if (interceptedPoint === 3){
                pointA = 2;
                pointC = 0;
            }else{
                pointA = interceptedPoint - 1;
                pointC = interceptedPoint + 1;
            }
            
            this.generalCalculations.drawRedDotes(clickedCoordinate);
            newCoordinates[interceptedPoint] = clickedCoordinate;

            newCoordinates.map((coordinate, index) => {
                //if (interceptedPoint !== index) {
                    this.generalCalculations.drawRedDotes(coordinate);
                //}
            });
            this.render([newCoordinates[pointA],newCoordinates[pointB],newCoordinates[pointC]]);
        }
    }

    render (coordinates) {
        var diagonalCenter = this.generalCalculations.findParallelCenter(coordinates[0], coordinates[2]);
        this.parallelogram.setCoordinates(coordinates);
        this.parallelogram.drawParallelogram(coordinates);
        this.circle.drawCircle(coordinates, this.parallelogram.getParallelogramArea(), diagonalCenter);
    }

    init() {
        this.addEventHandlers();
    }
}

var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext('2d');
var builder = new ShapesBuilder(canvas, context);
window.onload = builder.init();
