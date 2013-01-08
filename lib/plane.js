// Plane objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

define([], function() {

    var Plane = function(a,b,c,d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    // Determine plane coincidence as described in [1], §3.1 by checking 
    // the determinants of all the 2x2 determinants of the matrix
    // [ pa pb pc pd ]
    // [ qa qb qc qd ]
    Plane.prototype.isCoincident = function(other) {
        var cols = [
            [this.a, other.a], [this.b, other.b], [this.c, other.c], [this.d, other.d]
        ]
        for (var i = 0; i < 3; ++i) {
            for (var j = i + 1; j < 4; ++j) {
                if ((cols[i][0]*cols[j][1] - cols[j][0]*cols[i][1]) !== 0) {
                    return false;
                }
            }
        }

        return true;
    }

    Plane.prototype.isCoincidentAndSameOrientation = function(other) {
        var isCoincident = this.isCoincident(other);
        if (!isCoincident) {
            return false;
        }
        return ((this.a*other.a >= 0) && 
                (this.b*other.b >= 0) && 
                (this.c*other.c >= 0) && 
                (this.d*other.d >= 0));
    }

    return Plane;

});