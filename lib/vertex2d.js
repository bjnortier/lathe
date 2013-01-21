// Vertex3D objects
// 
// Vertices are defined as the intersection of 2, similar to 3d vertices
// are the intersection of 3 planes.
// 

define(['lib/matrix', 'lib/plane2d'], function(matrix, Plane2D) {

    var Vertex2D = function(p,q) {
        if (!((p instanceof Plane2D) && (q instanceof Plane2D))) {
            throw Error('invalid vertex construction: ' + [p,q].join(','));
        }
        this.p = p;
        this.q = q;
        if (!this.isValid()) {
            throw Error('invalid vertex construction: ' + [p,q].join(','));
        }
    }

    // Is valid if the derminant is zero. See Vertex3D.
    //
    // | pa, pb | 
    // | qa, qb | 
    //
    Vertex2D.prototype.isValid = function() {
        var m = [
            [this.p.a, this.p.b],
            [this.q.a, this.q.b],
        ]
        return matrix.determinant2x2(m) !== 0;

    }

    // See Vertex3D.orientationToPlane3D 
    // 
    Vertex2D.prototype.orientationToPlane = function(s) {
        var m1 = [
            [this.p.a, this.p.b],
            [this.q.a, this.q.b],
        ];
        var m2 = [
            [this.p.a, this.p.b, this.p.c],
            [this.q.a, this.q.b, this.q.c],
            [s.a,      s.b,      s.c],
        ];
        var d1d2 = matrix.determinant2x2(m1)*matrix.determinant3x3(m2);
        if (d1d2 > 0) {
            return '-';
        } else if (d1d2 < 0) {
            return '+';
        } else {
            return '0';
        }
    }     

    // Find the intersection of the planes by solving the 
    // simultaneous equations of the 2 planes
    // 
    // [ pa pb ][ x ]   [ pc ]
    // [ qa qb ][ y ] = [ qc ]
    Vertex2D.prototype.toCoordinate = function() {
        var a = [
                    [this.p.a, this.p.b],
                    [this.q.a, this.q.b],
                ];
        var detA = matrix.determinant2x2(a);

        var aInverse = [
            [a[1][1]/detA, -a[0][1]/detA],
            [-a[1][0]/detA, a[0][0]/detA],
        ];
        return {
            x: (aInverse[0][0]*this.p.c + aInverse[0][1]*this.q.c),
            y: (aInverse[1][0]*this.p.c + aInverse[1][1]*this.q.c),
        }
    }    


    return Vertex2D;

});