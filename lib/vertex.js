// Vertex objects
// 
// Vertices are defined as the intersection of 3 planes as per [1]\
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

define(['lib/plane'], function(Plane) {

    var Vertex = function(p,q,r) {
        if (!((p instanceof Plane) && (q instanceof Plane) && (r instanceof Plane))) {
            throw Error('invalid vertex construction: ' + [p,q,r].join(','));
        }
        this.p = p;
        this.q = q;
        this.r = r;
        if (!this.isValid()) {
            throw Error('invalid vertex construction: ' + [p,q,r].join(','));
        }
    }

    // Is valid if the derminant is zero. [1] § 3.1
    //
    // | pa, pb, pc |
    // | qa, qb, qc |
    // | ra, rb, rc |
    //
    Vertex.prototype.isValid = function() {
        var matrix = [
            [this.p.a, this.p.b, this.p.c],
            [this.q.a, this.q.b, this.q.c],
            [this.r.a, this.r.b, this.r.c],
        ]
        return determinant3x3(matrix) !== 0;

    }

    // [1] § 3.1
    // Given that the point (p;q;r) is valid, it lies
    // behind, on, or in-front of the plane s if and only if the 
    // following expression is negative, zero, or positive, respectively:
    //
    // |pa pb pc|  |pa pb pc pd|
    // |qa qb qc|* |qa qb qc qd|
    // |ra rb rc|  |ra rb rc rd|
    //             |sa sb sc sd|
    //
    Vertex.prototype.orientationToPlane = function(s) {
        var m1 = [
            [this.p.a, this.p.b, this.p.c],
            [this.q.a, this.q.b, this.q.c],
            [this.r.a, this.r.b, this.r.c],
        ]
        var m2 = [
            [this.p.a, this.p.b, this.p.c, this.p.d],
            [this.q.a, this.q.b, this.q.c, this.q.d],
            [this.r.a, this.r.b, this.r.c, this.r.d],
            [s.a, s.b, s.c, s.d],
        ]
        var d1d2 = determinant3x3(m1)*determinant4x4(m2);
        if (d1d2 > 0) {
            return -1;
        } else if (d1d2 < 0) {
            return 1;
        } else {
            return 0;
        }
    } 

    var determinant3x3 = function(m) {
        return (m[0][0]*m[1][1]*m[2][2] + m[0][1]*m[1][2]*m[2][0] + m[0][2]*m[1][0]*m[2][1] 
              - m[0][0]*m[1][2]*m[2][1] - m[0][1]*m[1][0]*m[2][2] - m[0][2]*m[1][1]*m[2][0]);
    }

    var determinant4x4 = function(m) {
        return m[0][3]*m[1][2]*m[2][1]*m[3][0] - m[0][2]*m[1][3]*m[2][1]*m[3][0] - m[0][3]*m[1][1]*m[2][2]*m[3][0] + m[0][1]*m[1][3]*m[2][2]*m[3][0]+
               m[0][2]*m[1][1]*m[2][3]*m[3][0] - m[0][1]*m[1][2]*m[2][3]*m[3][0] - m[0][3]*m[1][2]*m[2][0]*m[3][1] + m[0][2]*m[1][3]*m[2][0]*m[3][1]+
               m[0][3]*m[1][0]*m[2][2]*m[3][1] - m[0][0]*m[1][3]*m[2][2]*m[3][1] - m[0][2]*m[1][0]*m[2][3]*m[3][1] + m[0][0]*m[1][2]*m[2][3]*m[3][1]+
               m[0][3]*m[1][1]*m[2][0]*m[3][2] - m[0][1]*m[1][3]*m[2][0]*m[3][2] - m[0][3]*m[1][0]*m[2][1]*m[3][2] + m[0][0]*m[1][3]*m[2][1]*m[3][2]+
               m[0][1]*m[1][0]*m[2][3]*m[3][2] - m[0][0]*m[1][1]*m[2][3]*m[3][2] - m[0][2]*m[1][1]*m[2][0]*m[3][3] + m[0][1]*m[1][2]*m[2][0]*m[3][3]+
               m[0][2]*m[1][0]*m[2][1]*m[3][3] - m[0][0]*m[1][2]*m[2][1]*m[3][3] - m[0][1]*m[1][0]*m[2][2]*m[3][3] + m[0][0]*m[1][1]*m[2][2]*m[3][3];
    }

    return Vertex;

});