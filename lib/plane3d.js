// 3D Plane3D objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

define(['lib/fmt'], function(fmt) { 

    var Plane3D = function(a,b,c,d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        Object.freeze(this);
    }

    // Determine plane coincidence as described in [1], §3.1 by checking 
    // the determinants of all the 2x2 determinants of the matrix
    // [ pa pb pc pd ]
    // [ qa qb qc qd ]
    Plane3D.prototype.isCoincident = function(other) {
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

    // Check for orientation of coincident planes
    // NB: Assumes the coincidence check has already been done
    Plane3D.prototype.isSameOrientation = function(other) {
        return ((this.a*other.a >= 0) && 
                (this.b*other.b >= 0) && 
                (this.c*other.c >= 0) && 
                (this.d*other.d >= 0));
    }

    // Reverse the orientation
    Plane3D.prototype.reverse = function() {
        return new Plane3D(-this.a, -this.b, -this.c, -this.d);
    }

    // Create an eval string that can easily be copied & pasted into a test case
    Plane3D.prototype.toEval = function() {
        return fmt('new Plane3D({0},{1},{2},{3})', this.a, this.b, this.c, this.d);
    }

    return Plane3D;

});