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
        ];
        var m2 = [
            [this.p.a, this.p.b, this.p.c, this.p.d],
            [this.q.a, this.q.b, this.q.c, this.q.d],
            [this.r.a, this.r.b, this.r.c, this.r.d],
            [s.a, s.b, s.c, s.d],
        ];
        var d1d2 = determinant3x3(m1)*determinant4x4(m2);
        if (d1d2 > 0) {
            return '-';
        } else if (d1d2 < 0) {
            return '+';
        } else {
            return '0';
        }
    } 

    // Find the intersection of the planes by solving the 
    // simultaneous equations of the 3 planes
    // 
    // Based on http://maths.ucd.ie/courses/math1200/algebra/algebranotes4-3.pdf
    // but merging step1 and step2
    //
    // [ pa pb pc ][ x ]   [ pd ]
    // [ qa qb qc ][ y ] = [ qd ]
    // [ qa qb qc ][ z ]   [ rd ]
    Vertex.prototype.toCoordinate = function() {
        var a = [
                [this.p.a, this.p.b, this.p.c],
                [this.q.a, this.q.b, this.q.c],
                [this.r.a, this.r.b, this.r.c]
                ],
            detA = determinant3x3(a);

        var cofactorMatrix = [];
        for (var i = 0; i < 3; ++i) {
            cofactorMatrix[i] = [];
            for (var j = 0; j < 3; ++j) {
                cofactorMatrix[i][j] = minorDeterminant(a, i, j);
            }
        }
        var adjA = transpose3x3(cofactorMatrix);
        var aInverse = [
            [adjA[0][0]/detA, adjA[0][1]/detA, adjA[0][2]/detA],
            [adjA[1][0]/detA, adjA[1][1]/detA, adjA[1][2]/detA],
            [adjA[2][0]/detA, adjA[2][1]/detA, adjA[2][2]/detA]
        ];
        return {
            x: (aInverse[0][0]*this.p.d + aInverse[0][1]*this.q.d + aInverse[0][2]*this.r.d),
            y: (aInverse[1][0]*this.p.d + aInverse[1][1]*this.q.d + aInverse[1][2]*this.r.d),
            z: (aInverse[2][0]*this.p.d + aInverse[2][1]*this.q.d + aInverse[2][2]*this.r.d),
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

    var minorDeterminant = function(m, i, j) {
        return m[(i+1)%3][(j+1)%3]*m[(i+2)%3][(j+2)%3] - m[(i+1)%3][(j+2)%3]*m[(i+2)%3][(j+1)%3];
    }

    var transpose3x3 = function(a) {
        return [
            [a[0][0], a[1][0], a[2][0]],
            [a[0][1], a[1][1], a[2][1]],
            [a[0][2], a[1][2], a[2][2]]
        ];
    }

    var multiply3x3 = function(a,b) {
        return [
            [
                a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0],
                a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0],
                a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0]
            ],
            [
                a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1],
                a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1],
                a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1]
            ],
            [
                a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2],
                a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2],
                a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2]
            ]
        ];
    }

    return Vertex;

});