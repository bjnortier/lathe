'use strict';

// 3D Plane3D objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

define([
  'gl-matrix',
  './fmt', 
  './vector3',
  ], function(
    glMatrix,
    fmt, 
    Vector3) { 

  var mat4 = glMatrix.mat4;
  var vec4 = glMatrix.vec4;
  var vec3 = glMatrix.vec3;

  var Plane3D = function(a,b,c,d) {
    if (b === undefined) {
      this.equation = vec4.create();
      vec4.copy(this.equation, a);
    } else {
      this.equation = vec4.fromValues(a,b,c,d);
    }
    this.cacheKey = this.equation[0] + '_' + this.equation[1] + '_' + this.equation[2] + '_' + this.equation[3];
    Object.freeze(this);
  }

  Plane3D.prototype = {

    get a() {
      return this.equation[0];
    },

    get b() {
      return this.equation[1];
    },

    get c() {
      return this.equation[2];
    },

    get d() {
      return this.equation[3];
    },

  };

  Plane3D.deserialize = function(obj) {
    return new Plane3D(obj.equation);
  }

  Plane3D.prototype.equals = function(other) {
   return ((this.equation[0] === other.equation[0]) 
      && (this.equation[1] === other.equation[1]) 
      && (this.equation[2] === other.equation[2])
      && (this.equation[3] === other.equation[3]));
  }

  // Determine plane coincidence as described in [1], §3.1 by checking 
  // the determinants of all the 2x2 determinants of the matrix
  // [ pa pb pc pd ]
  // [ qa qb qc qd ]
  Plane3D.prototype.isCoincident = function(other) {
    var cols = [
      [this.equation[0], other.equation[0]], 
      [this.equation[1], other.equation[1]], 
      [this.equation[2], other.equation[2]], 
      [this.equation[3], other.equation[3]]
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
    return ((this.equation[0]*other.equation[0] >= 0) && 
        (this.equation[1]*other.equation[1] >= 0) && 
        (this.equation[2]*other.equation[2] >= 0) && 
        (this.equation[3]*other.equation[3] >= 0));
  }

  // Reverse the orientation
  Plane3D.prototype.reverse = function() {
    var out = vec4.create();
    vec4.negate(out, this.equation);
    return new Plane3D(out);
  }

  // Create from 3 points
  Plane3D.fromPoints = function(a,b,c) {
    var ab = b.sub(a);
    var ac = c.sub(a);
    var normal = ab.cross(ac).normalize();
    var d = (a.x*normal.x + a.y*normal.y + a.z*normal.z);
    return new Plane3D(normal.x, normal.y, normal.z, d);
  }

  // Translate
  Plane3D.prototype.translate = function(x,y,z) {
    var d2 = this.d + (this.a*x + this.b*y + this.c*z);
    return new Plane3D(this.a, this.b, this.c, d2);
  }

  // Rotate using a vector and an angle
  Plane3D.prototype.rotate = function(axisx, axisy, axisz, angle) {

    var m1 = mat4.create();
    mat4.rotate(m1, mat4.create(), angle, vec3.fromValues(axisx, axisy, axisz));

    var m2 = mat4.create();
    mat4.invert(m2, m1);

    var m3 = mat4.create();
    mat4.transpose(m3, m2);

    var rotatedEquation = vec4.create();
    vec4.transformMat4(rotatedEquation, this.equation, m3);

    return new Plane3D(rotatedEquation);
  }

  // Scale
  Plane3D.prototype.scale = function(factor) {
    return new Plane3D(this.a, this.b, this.c, this.d*factor);
  }


  // Create an eval string that can easily be copied & pasted into a test case
  Plane3D.prototype.toEval = function() {
    return fmt('new Plane3D({0},{1},{2},{3})', this.a, this.b, this.c, this.d);
  }

  return Plane3D;

});