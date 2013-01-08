define(['lib/plane', 'lib/point'], function(Plane, Point) {

    var Polygon = function(s, boundingPlanes) {
        this.s = s;
        this.boundingPlanes = boundingPlanes;
    }

    Polygon.prototype.toVertices = function() {
        var n = this.boundingPlanes.length;
        var that = this;
        return this.boundingPlanes.map(function(bi, i) {
            var bmin1 = that.boundingPlanes[(i+n-1) % n];
            return [that.s, bmin1, bi];
        });
    }

    var xPlusBig = new Plane(1,0,0,1000000),
        yPlusBig = new Plane(0,1,0,1000000),
        zPlusBig = new Plane(0,0,1,1000000),
        xMinusBig = new Plane(-1,0,0,1000000),
        yMinusBig = new Plane(0,-1,0,1000000),
        zMinusBig = new Plane(0,0,-1,1000000);

    // Create a polygon from the plane a a very big box
    Polygon.prototype.fromPlane = function(s) {
        this.s = s;

        var aAbs = Math.abs(this.s.a),
            bAbs = Math.abs(this.s.b),
            cAbs = Math.abs(this.s.c);
        if ((aAbs >= bAbs) && (aAbs >= cAbs)) {
            if (this.s.a > 0) {
                this.boundingPlanes = [yPlusBig, zPlusBig, yMinusBig, zMinusBig];
            } else {
                this.boundingPlanes = [yPlusBig, zMinusBig, yMinusBig, zPlusBig];
            }
        } else if ((bAbs >= aAbs) && (bAbs >= cAbs)) {
            if (this.s.b > 0) {
                this.boundingPlanes = [zPlusBig, xPlusBig, zMinusBig, xMinusBig];
            } else {
                this.boundingPlanes = [zPlusBig, xMinusBig, zMinusBig, xPlusBig];
            }
        } else if ((cAbs >= aAbs) && (cAbs >= bAbs)) {
            if (this.s.c > 0) {
                this.boundingPlanes = [xPlusBig, yPlusBig, xMinusBig, yMinusBig];
            } else {
                this.boundingPlanes = [xPlusBig, yMinusBig, xMinusBig, yPlusBig];
            }
        }
        return this;
    }

    return Polygon;

});