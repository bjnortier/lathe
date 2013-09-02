// 3D Plane3D objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf

'use strict';

define([
    'gl-matrix',
    './fmt',
  ], function(
    glMatrix,
    fmt
  ) { 

  var mat4 = glMatrix.mat4;
  var vec4 = glMatrix.vec4;
  var vec3 = glMatrix.vec3;

  var ExpandableFloat32Array = function() {
   
    var size = 32;
    var allocated = 0;
    this.array = new Float32Array(size);

    var ensureSpaceAvailableFor = function(n) {
      if (allocated + n > size) {
        size = size*2;
        var previous = this.array;
        this.array = new Float32Array(size);
        for (var i = 0; i < allocated; ++i) {
          this.array[i] = previous[i];
        }
      }
    };

    this.add = function(values) {
      var length = values.length;
      ensureSpaceAvailableFor.call(this, length);
      for (var i = 0; i < length; ++i) {
        this.array[allocated + i] = values[i];
      }
      var firstElementIndex = allocated;
      allocated += length;
      return firstElementIndex;
    };

  };

  var expandableArray = new ExpandableFloat32Array;

  var Plane3D = function(a,b,c,d) {
    this.expandableArray = expandableArray;
    if (b === undefined) {
      this.index0 = expandableArray.add([a[0], a[1], a[2], a[3]]);
    } else {
      this.index0 = expandableArray.add([a,b,c,d]);
    }
    this.cacheKey = this.a + '_' + this.b + '_' + this.c + '_' + this.d;
  };

  Plane3D.prototype = {
    get a() {
      return this.expandableArray.array[this.index0];
    },
    get b() {
      return this.expandableArray.array[this.index0+1];
    },
    get c() {
      return this.expandableArray.array[this.index0+2];
    },
    get d() {
      return this.expandableArray.array[this.index0+3];
    },
  };

  Plane3D.deserialize = function(obj) {
    return new Plane3D(obj.equation);
  };

  Plane3D.prototype.equals = function(other) {
   return ((this.a === other.a) && 
           (this.b === other.b) && 
           (this.c === other.c) && 
           (this.d === other.d));
  };

  // Determine plane coincidence as described in [1], §3.1 by checking 
  // the determinants of all the 2x2 determinants of the matrix
  // [ pa pb pc pd ]
  // [ qa qb qc qd ]
  Plane3D.prototype.isCoincident = function(other) {
    var cols = [
      [this.a, other.a], 
      [this.b, other.b], 
      [this.c, other.c], 
      [this.d, other.d]
    ];
    for (var i = 0; i < 3; ++i) {
      for (var j = i + 1; j < 4; ++j) {
        if ((cols[i][0]*cols[j][1] - cols[j][0]*cols[i][1]) !== 0) {
          return false;
        }
      }
    }

    return true;
  };

  // Check for orientation of coincident planes
  // NB: Assumes the coincidence check has already been done
  Plane3D.prototype.isSameOrientation = function(other) {
    return ((this.a*other.a >= 0) && 
            (this.b*other.b >= 0) && 
            (this.c*other.c >= 0) && 
            (this.d*other.d >= 0));
  };

  // Reverse the orientation
  Plane3D.prototype.reverse = function() {
    return new Plane3D(-this.a ,-this.b, -this.c, -this.d);
  };

  // Create from 3 points
  Plane3D.fromPoints = function(a,b,c) {
    var ab = b.sub(a);
    var ac = c.sub(a);
    var normal = ab.cross(ac).normalize();
    var d = (a.x*normal.x + a.y*normal.y + a.z*normal.z);
    return new Plane3D(normal.x, normal.y, normal.z, d);
  };

  // Translate
  Plane3D.prototype.translate = function(x,y,z) {
    var d2 = this.d + (this.a*x + this.b*y + this.c*z);
    return new Plane3D(this.a, this.b, this.c, d2);
  };

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
  };

  // Scale
  Plane3D.prototype.scale = function(factor) {
    return new Plane3D(this.a, this.b, this.c, this.d*factor);
  };


  // Create an eval string that can easily be copied & pasted into a test case
  Plane3D.prototype.toEval = function() {
    return fmt('new Plane3D({0},{1},{2},{3})', this.a, this.b, this.c, this.d);
  };

  return Plane3D;

});