// Point objects
// 
// Point objects are defined as the intersection of 3 planes as per [1]
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

define(['lib/plane'], function(Plane) {

    var Point = function(p,q,r) {
        if (!((p instanceof Plane) && (q instanceof Plane) && (r instanceof Plane))) {
            throw Error('invalid point construction: ' + [p,q,r].join(','));
        }
        this.p = p;
        this.q = q;
        this.r = r;
        if (!this.isValid()) {
            throw Error('invalid point construction: ' + [p,q,r].join(','));
        }
    }

    // Is valid if the derminant is zero. [1] § 3.1
    //
    // [ pa, pb, pc ]
    // [ qa, qb, qc ]
    // [ ra, rb, rc ]
    //
    Point.prototype.isValid = function() {
        var p = this.p, q = this.q, r = this.r;
        return (p.a*q.b*r.c + p.b*q.c*r.a + p.c*q.a*r.b 
                - p.c*q.b*r.a - p.b*q.a*r.c - p.a*q.c*r.b) !== 0;

    }

    return Point;

});