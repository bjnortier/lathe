// Vertex3D objects
// 
// Vertices are defined as the intersection of 3 planes as per [1]\
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

define([
    'gl-matrix',
    './vector3',
    './matrix',
    './plane3d'
  ], function(
    glMatrix,
    Vector3, 
    matrix, 
    Plane3D) {

  var mat3 = glMatrix.mat3;
  var mat4 = glMatrix.mat4;

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

    this.m3 = mat3.create();
    this.m3[0] = this.p.a;
    this.m3[1] = this.p.b;
    this.m3[2] = this.p.c;
    this.m3[3] = this.q.a;
    this.m3[4] = this.q.b;
    this.m3[5] = this.q.c;
    this.m3[6] = this.r.a;
    this.m3[7] = this.r.b;
    this.m3[8] = this.r.c;

    this.det3 = mat3.determinant(this.m3);

  }

  // Is valid if the derminant is non-zero. [1] § 3.1
  //
  // | pa, pb, pc |
  // | qa, qb, qc |
  // | ra, rb, rc |
  //
  Vertex3D.prototype.isValid = function() {
    return this.det3  !== 0;
  }

  // [1] § 3.1
  // Given that the point (p;q;r) is valid, it lies
  // behind, on, or in-front of the plane s if and only if the 
  // following expression is negative, zero, or positive, respectively:
  //
  // |pa pb pc|  |pa pb pc pd|
  // |qa qb qc|* |qa qb qc qd|
  // |ra rb rc|  |ra rb rc rd|
  //       |sa sb sc sd|
  //
  Vertex3D.prototype.orientationToPlane = function(s) {
    var m2 = [
      [this.p.a, this.p.b, this.p.c, this.p.d],
      [this.q.a, this.q.b, this.q.c, this.q.d],
      [this.r.a, this.r.b, this.r.c, this.r.d],
      [s.a, s.b, s.c, s.d],
    ];
    // Caching the determinant on creation actually makes in slower
    var d1d2 = this.det3*matrix.determinant4x4(m2);
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
    var m3inv = mat3.create();
    mat3.invert(m3inv, this.m3);
    return new Vector3(
      (m3inv[0]*this.p.d + m3inv[1]*this.q.d + m3inv[2]*this.r.d),
      (m3inv[3]*this.p.d + m3inv[4]*this.q.d + m3inv[5]*this.r.d),
      (m3inv[6]*this.p.d + m3inv[7]*this.q.d + m3inv[8]*this.r.d));
    
  }

  return Vertex3D;

});