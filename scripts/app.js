var circle = new Circle();


class ShapesBuilder {
    constructor() {
        this.coordinates = [];
        this.parallelogramArea = 0;
        this.diagonalCenter = 0;
        this.isSelected = false;
        //this.interceptedPoint = {x:0,y:0};
        //this.newPoint = {x:0,y:0};;
    }

    addEventHandlers() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var self = this;
        var interceptedPoint = 0;
        //var newPoint;

        canvas.addEventListener('click', function(e){
            if (self.coordinates.length < 3){
                self.coordinates.push(self.getCoordinates(e));
                self.drawParallelogram(canvas);
                self.setParallelogramArea();
                self.drawCircle(this.centerDiagonal);
            }
        }, true);


        canvas.addEventListener('mousedown', function(e) {
            //console.log("selecte", self.coordinates);

            if (self.coordinates.length >= 3){
                interceptedPoint = self.interceptMouseClick(e)
            }
        });

        canvas.addEventListener('mouseup', function(e){
            if (self.coordinates.length >= 3){
                self.newPoint = self.releaseMouseClick(e);
            }
        });

        canvas.addEventListener('mousemove', function(e){
            if (self.coordinates.length >= 3){

            if(self.isSelected) {
                var canvas = document.getElementsByTagName("canvas")[0];
                var ctx = canvas.getContext('2d');
                var newCoordinates = self.getCoordinatesTest();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var clickedCoordinate = (self.getCoordinates(e));
                var pointC = (interceptedPoint+2 >= 4) ? 0 : interceptedPoint+2;
                var newdiagonalCenter = self.findParallelCenter(clickedCoordinate, self.coordinates[pointC]);
                var newVertex = self.findVertex(clickedCoordinate, newdiagonalCenter);
                var pointA = interceptedPoint - 1 === -1 ? 3 : interceptedPoint - 1; 
                var pointB = interceptedPoint;
                var pointC = interceptedPoint + 1 >= 4 ? 3 : interceptedPoint + 1;
    
                self.drawRedDotes(clickedCoordinate);
                self.drawRedDotes(newVertex);
                newCoordinates[interceptedPoint] = clickedCoordinate;
                console.log('intercepted point',interceptedPoint);
                self.redrawParallelogram([newCoordinates[pointA],newCoordinates[pointB],newCoordinates[pointC]],newdiagonalCenter);
                newCoordinates.map((coordinate, index) => {
                    if (interceptedPoint !== index) {
                        self.drawRedDotes(coordinate);
                    }
                });
            }}
        });
     
    }

    getCoordinates(e){
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext('2d');

        var coordinates = {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
        }

        if (this.coordinates.length < 3) {
            this.drawRedDotes(coordinates);
        }

        return coordinates;
    }

    drawParallelogram(canvas) {
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext('2d');

        this.diagonalCenter = this.findParallelCenter(this.coordinates[0], this.coordinates[2]);
        if (this.coordinates.length === 3) {
            var fourthVertex = this.findVertex(this.coordinates[1], this.diagonalCenter);
            this.coordinates.push(fourthVertex);
            this.drawRedDotes(fourthVertex);
            this.drawRedDotes(this.diagonalCenter);
        }

        if (this.coordinates.length === 4) {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[0].x, this.coordinates[0].y);
            ctx.lineTo(this.coordinates[1].x, this.coordinates[1].y);
            ctx.lineTo(this.coordinates[2].x, this.coordinates[2].y);
            ctx.lineTo(this.coordinates[3].x, this.coordinates[3].y);
            ctx.lineTo(this.coordinates[0].x, this.coordinates[0].y);
            ctx.stroke();
            ctx.strokeStyle = "black";

        }

    }

    redrawParallelogram(nC){
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext('2d');
        var newCoordinates=[];
        newCoordinates = nC;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.diagonalCenter = this.findParallelCenter(newCoordinates[0], newCoordinates[2]);
        if (newCoordinates.length === 3) {
            var fourthVertex = this.findVertex(newCoordinates[1], this.diagonalCenter);
            newCoordinates.push(fourthVertex);
            this.drawRedDotes(fourthVertex);
        }

        //if (this.coordinates.length === 4) {
            ctx.beginPath();
            ctx.moveTo(newCoordinates[0].x, newCoordinates[0].y);
            ctx.lineTo(newCoordinates[1].x, newCoordinates[1].y);
            ctx.lineTo(newCoordinates[2].x, newCoordinates[2].y);
            ctx.lineTo(newCoordinates[3].x, newCoordinates[3].y);
            ctx.lineTo(newCoordinates[0].x, newCoordinates[0].y);
            ctx.stroke();
            ctx.strokeStyle = "black";

       // }
    }


    getCoordinatesTest() {
        return this.coordinates;
    }

    drawRedDotes(coordinates) {
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(coordinates.x,coordinates.y,5.5,0,Math.PI*2);
        ctx.fill();
        ctx.fillText("  ("+coordinates.x+", "+coordinates.y+")",coordinates.x,coordinates.y);
        ctx.fillStyle = "black";
    }

    drawStrokes(coordinates) {
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(coordinates.x, coordinates.y);
        ctx.lineTo(coordinates.x, coordinates.y);
        ctx.stroke();

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

    getParallelogramArea() {
        return this.parallelogramArea;
    }

    setParallelogramArea() {
        this.parallelogramArea = this.getTriangleArea() * 2;
        console.log(this.parallelogramArea);
    }

    getDistanceBetweenPoints(pointA, pointB) {
        var a = pointA.x - pointB.x;
        var b = pointA.y - pointB.x;
        return Math.sqrt( a*a + b*b );    
    }

    interceptMouseClick(e) {
        //console.log('mousedown happening');
        var clickedCoordinate = (this.getCoordinates(e));
        var coordinates = this.coordinates;
        var interceptedPoint = {x: 0, y:0};
        var interceptedPointIndex = 0;
        //console.log('clickedCoordinate', clickedCoordinate);
        this.isSelected = true;

        coordinates.map((coordinate, index) => {
            if (clickedCoordinate.x === coordinate.x) {
                interceptedPoint = coordinate;
                interceptedPointIndex = index;
                //console.log('intercepted point');
            }
        });
        return interceptedPointIndex;
    }

    releaseMouseClick(e) {
        //console.log('mouseup happening');
        this.isSelected = false;
        var finalPoint = this.getCoordinates(e);

        var coordinates = this.coordinates;
        return this.getCoordinates(e);

    }

    movePoint(e) {
        //console.log('mouse moving', this.interceptedPoint);
        //console.log('coordinates',this.coordinates[this.interceptedPoint])
        if (this.isSelected) {



        }
    }

    //using heron's formule 
    getTriangleArea() {
        var lineAB =  this.getDistanceBetweenPoints(this.coordinates[0], this.coordinates[1]);
        var lineBC =  this.getDistanceBetweenPoints(this.coordinates[1], this.coordinates[2]);
        var lineAC =  this.getDistanceBetweenPoints(this.coordinates[0], this.coordinates[2]);

        var semiperimeter = (lineAB + lineBC + lineAC) / 2;
        var area = Math.sqrt(semiperimeter*((semiperimeter - lineAB)*(semiperimeter - lineBC)*(semiperimeter - lineAC)));
        console.log('semiperimeter', semiperimeter);
        console.log('area',area);
        return area;
        
    }

    drawCircle(coordinates) {
        var radio = Math.sqrt(this.getParallelogramArea(), Math.PI);
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.diagonalCenter.x,this.diagonalCenter.y,radio,0,Math.PI*2);
        ctx.stroke();
    }


    init() {
        this.addEventHandlers();
    }
}

var builder = new ShapesBuilder();
window.onload = builder.init();
