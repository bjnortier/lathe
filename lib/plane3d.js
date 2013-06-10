// 3D Plane3D objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

'use strict';
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

  var Plane3D = function(a,b,c,d) {
    this.params = vec4.fromValues(a,b,c,d);
    this.cacheKey = this.params[0] + '_' + this.params[1] + '_' + this.params[2] + '_' + this.params[3];
    Object.freeze(this);
  }

  Plane3D.prototype = {

    get a() {
      return this.params[0];
    },

    get b() {
      return this.params[1];
    },

    get c() {
      return this.params[2];
    },

    get d() {
      return this.params[3];
    },

  };

  Plane3D.deserialize = function(obj) {
    return new Plane3D(obj.a, obj.b, obj.c, obj.d);
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

  // Translate
  Plane3D.prototype.translate = function(x,y,z) {
    var d2 = this.d + (this.a*x + this.b*y + this.c*z);
    return new Plane3D(this.a, this.b, this.c, d2);
  }

  // Rotate using a vector and an angle
  Plane3D.prototype.rotate = function(axis, angle) {

    var m2 = mat4.create();
    var out = mat4.create();
    var axis = glMatrix.vec3.create();
    axis[1] = 1;
    mat4.rotate(out, m2, 45/180*Math.PI, axis);

    var m3 = mat4.create();
    mat4.invert(m3, out);

    var m4 = mat4.create();
    mat4.transpose(m4, m3);

    var p = vec4.create();
    p[0] = this.a;
    p[1] = this.b;
    p[2] = this.c;
    p[3] = this.d;

    var q = vec4.create();
    vec4.transformMat4(q, p, m4);

    var p2 = new Plane3D(q[0], q[1], q[2], q[3]);
    return p2;
  }

  // Create an eval string that can easily be copied & pasted into a test case
  Plane3D.prototype.toEval = function() {
    return fmt('new Plane3D({0},{1},{2},{3})', this.a, this.b, this.c, this.d);
  }


  return Plane3D;

});