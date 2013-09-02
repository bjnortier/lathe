// Vertex3D objects
// 
// Vertices are defined as the intersection of 3 planes as per [1]\
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

'use strict';

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

  var vec3 = glMatrix.vec3;
  var mat3 = glMatrix.mat3;
  var mat4 = glMatrix.mat4;

  var Vertex3D = function(p,q,r) {
    if (!((p instanceof Plane3D) && (q instanceof Plane3D) && (r instanceof Plane3D))) {
      throw { 
        name: 'InvalidVertex',
        message: 'invalid vertex construction: ' + [p,q,r].join(',')
      };
    }
    this.p = p;
    this.q = q;
    this.r = r;
  };

  // Creating Float32Arrays are quite slow, so re-use
  // them for calculations
  var m4 = mat4.create();
  var m3 = mat3.create();
  var m3inv = mat3.create();
  var m3invT = mat3.create();
  var coordinate = vec3.create();

  // Is valid if the derminant is non-zero. [1] § 3.1
  //
  // | pa, pb, pc |
  // | qa, qb, qc |
  // | ra, rb, rc |
  //
  Vertex3D.prototype.isValid = function() {
    m3[0] = this.p.a;
    m3[1] = this.p.b;
    m3[2] = this.p.c;

    m3[3] = this.q.a;
    m3[4] = this.q.b;
    m3[5] = this.q.c;

    m3[6] = this.r.a;
    m3[7] = this.r.b;
    m3[8] = this.r.c;

    return mat3.determinant(m3) !== 0;
  };

  // [1] § 3.1
  // Given that the point (p,q,r) is valid, it lies
  // behind, on, or in-front of the plane s if and only if the 
  // following expression is negative, zero, or positive, respectively:
  //
  // |pa pb pc|  |pa pb pc pd|
  // |qa qb qc|* |qa qb qc qd|
  // |ra rb rc|  |ra rb rc rd|
  //       |sa sb sc sd|
  //



  Vertex3D.prototype.orientationToPlane = function(s) {
    m4[0] = this.p.a;
    m4[1] = this.p.b;
    m4[2] = this.p.c;
    m4[3] = this.p.d;

    m4[4] = this.q.a;
    m4[5] = this.q.b;
    m4[6] = this.q.c;
    m4[7] = this.q.d;

    m4[8]  = this.r.a;
    m4[9]  = this.r.b;
    m4[10] = this.r.c;
    m4[11] = this.r.d;

    m4[12] = s.a;
    m4[13] = s.b;
    m4[14] = s.c;
    m4[15] = s.d;

    mat3.fromMat4(m3, m4);

    // Caching the determinant on creation actually makes in slower
    var d1d2 = mat3.determinant(m3)*mat4.determinant(m4);
    var eps = 1e-10;
    if (d1d2 > eps) {
      return '-';
    } else if (d1d2 < -eps) {
      return '+';
    } else {
      return '0';
    }
  };

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
    m3[0] = this.p.a;
    m3[1] = this.p.b;
    m3[2] = this.p.c;

    m3[3] = this.q.a;
    m3[4] = this.q.b;
    m3[5] = this.q.c;

    m3[6] = this.r.a;
    m3[7] = this.r.b;
    m3[8] = this.r.c;

    mat3.invert(m3inv, m3);
    mat3.transpose(m3invT, m3inv);

    var xyz = vec3.fromValues(this.p.d, this.q.d, this.r.d);
    glMatrix.vec3.transformMat3(coordinate, xyz, m3invT);
    return new Vector3(coordinate[0], coordinate[1], coordinate[2]);

  };

  return Vertex3D;

});