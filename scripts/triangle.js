class Triangle {
    constructor() {}

    getTriangleArea(coordinates) {
        var generalCalculations = new GeneralCalculations();
        if (coordinates.length > 0) {
            var lineAB =  generalCalculations.getDistanceBetweenPoints(coordinates[0], coordinates[1]);
            var lineBC =  generalCalculations.getDistanceBetweenPoints(coordinates[1], coordinates[2]);
            var lineAC =  generalCalculations.getDistanceBetweenPoints(coordinates[0], coordinates[2]);

            var semiperimeter = (lineAB + lineBC + lineAC) / 2;
            var area = Math.sqrt(semiperimeter*((semiperimeter - lineAB)*(semiperimeter - lineBC)*(semiperimeter - lineAC)));
            console.log('semiperimeter', semiperimeter);
            console.log('area',area);
            return area;
        }
        
    }
}