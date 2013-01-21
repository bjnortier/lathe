// 2D Plane objects
// 

define([], function() { 

    var Plane = function(a,b,c) {
        this.a = a;
        this.b = b;
        this.c = c;
        Object.freeze(this);
    }

    // Very similar to the algorithm for 3D polygons, with
    // one less column.
    Plane.prototype.isCoincident = function(other) {
        var cols = [
            [this.a, other.a], [this.b, other.b], [this.c, other.c]
        ]
        for (var i = 0; i < 2; ++i) {
            for (var j = i + 1; j < 3; ++j) {
                if ((cols[i][0]*cols[j][1] - cols[j][0]*cols[i][1]) !== 0) {
                    return false;
                }
            }
        }

        return true;
    }

    // Same as for 3D polygons
    Plane.prototype.isSameOrientation = function(other) {
        return ((this.a*other.a >= 0) && 
                (this.b*other.b >= 0) && 
                (this.c*other.c >= 0));
    }

    Plane.prototype.reverse = function() {
        return new Plane(-this.a, -this.b, -this.c);
    }

    return Plane;

});