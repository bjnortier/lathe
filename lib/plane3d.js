// 3D Plane3D objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

'use strict';
define(['./fmt', './vector3'], function(fmt, Vector3) { 

    var Plane3D = function(a,b,c,d) {
        this.a = new Float32Array([a])[0];
        this.b = new Float32Array([b])[0];
        this.c = new Float32Array([c])[0];
        this.d = new Float32Array([d])[0];
        this.cacheKey = this.a + '_' + this.b + '_' + this.c + '_' + this.d + '_';
        Object.freeze(this);
    }

    Plane3D.prototype.equals = function(other) {
         return ((this.a === other.a) 
                && (this.b === other.b) 
                && (this.c === other.c)
                && (this.d === other.d));
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

    // Create from 3 points
    Plane3D.fromPoints = function(a,b,c) {
        var ab = b.sub(a);
        var ac = c.sub(a);
        var normal = ab.cross(ac).normalize();
        var d = (a.x*normal.x + a.y*normal.y + a.z*normal.z);
        return new Plane3D(normal.x, normal.y, normal.z, d);
    }

    // Create an eval string that can easily be copied & pasted into a test case
    Plane3D.prototype.toEval = function() {
        return fmt('new Plane3D({0},{1},{2},{3})', this.a, this.b, this.c, this.d);
    }


    return Plane3D;

});