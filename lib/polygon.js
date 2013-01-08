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

    return Polygon;

});