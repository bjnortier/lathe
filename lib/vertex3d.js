// Vertex3D objects
// 
// Vertices are defined as the intersection of 3 planes as per [1]\
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

define(['./vector3', './matrix', './plane3d'], function(Vector3, matrix, Plane3D) {

    var Vertex3D = function(p,q,r) {
        if (!((p instanceof Plane3D) && (q instanceof Plane3D) && (r instanceof Plane3D))) {
            throw { 
                name: 'InvalidVertex',
                message: 'invalid vertex construction: ' + [p,q,r].join(',')
            }
        }
        this.p = p;
        this.q = q;
        this.r = r;
        // if (!this.isValid()) {
        //     throw { 
        //         name: 'InvalidVertex',
        //         message: 'invalid vertex construction: ' + [p,q,r].join(',')
        //     }
        // }
    }

    // Is valid if the derminant is non-zero. [1] § 3.1
    //
    // | pa, pb, pc |
    // | qa, qb, qc |
    // | ra, rb, rc |
    //
    Vertex3D.prototype.isValid = function() {
        var m = [
            [this.p.a, this.p.b, this.p.c],
            [this.q.a, this.q.b, this.q.c],
            [this.r.a, this.r.b, this.r.c],
        ]
        return matrix.determinant3x3(m) !== 0;

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
    Vertex3D.prototype.orientationToPlane = function(s) {
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
        var d1d2 = matrix.determinant3x3(m1)*matrix.determinant4x4(m2);
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
    Vertex3D.prototype.toCoordinate = function() {
        var a = [
                [this.p.a, this.p.b, this.p.c],
                [this.q.a, this.q.b, this.q.c],
                [this.r.a, this.r.b, this.r.c]
                ],
            detA = matrix.determinant3x3(a);

        var cofactorMatrix = [];
        for (var i = 0; i < 3; ++i) {
            cofactorMatrix[i] = [];
            for (var j = 0; j < 3; ++j) {
                cofactorMatrix[i][j] = matrix.minorDeterminant(a, i, j);
            }
        }
        var adjA = matrix.transpose3x3(cofactorMatrix);
        var aInverse = [
            [adjA[0][0]/detA, adjA[0][1]/detA, adjA[0][2]/detA],
            [adjA[1][0]/detA, adjA[1][1]/detA, adjA[1][2]/detA],
            [adjA[2][0]/detA, adjA[2][1]/detA, adjA[2][2]/detA]
        ];
        return new Vector3(
            (aInverse[0][0]*this.p.d + aInverse[0][1]*this.q.d + aInverse[0][2]*this.r.d),
            (aInverse[1][0]*this.p.d + aInverse[1][1]*this.q.d + aInverse[1][2]*this.r.d),
            (aInverse[2][0]*this.p.d + aInverse[2][1]*this.q.d + aInverse[2][2]*this.r.d));
        
    }

    return Vertex3D;

});