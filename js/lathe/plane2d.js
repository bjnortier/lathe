// 2D Plane objects
// 

define(['./fmt'], function(fmt) { 

  var Plane2D = function(a,b,c) {
    this.a = new Float32Array([a])[0];
    this.b = new Float32Array([b])[0];
    this.c = new Float32Array([c])[0];
    Object.freeze(this);
  }

  Plane2D.deserialize = function(obj) {
    return new Plane3D(obj.a, obj.b, obj.c);
  }

  // Equality
  Plane2D.prototype.equals = function(other) {
    return ((this.a === other.a) && (this.b === other.b) && (this.c === other.c));
  }

  // Very similar to the algorithm for 3D polygons, with
  // one less column.
  Plane2D.prototype.isCoincident = function(other) {
    var cols = [
      [this.a, other.a], [this.b, other.b], [this.c, other.c]
    ]
    for (var i = 0; i < 2; ++i) {
      for (var j = i + 1; j < 3; ++j) {
        if ((cols[i][0]*cols[j][1] - cols[j][0]*cols[i][1]) !== 0) {
          return false;
        }
      }
    }

    return true;
  }

  // Same as for 3D polygons
  Plane2D.prototype.isSameOrientation = function(other) {
    return ((this.a*other.a >= 0) && 
        (this.b*other.b >= 0) && 
        (this.c*other.c >= 0));
  }

  Plane2D.prototype.reverse = function() {
    return new Plane2D(-this.a, -this.b, -this.c);
  }


  // Create an eval string that can easily be copied & pasted into a test case
  Plane2D.prototype.toEval = function() {
    return fmt('new Plane2D({0},{1},{2})', this.a, this.b, this.c);
  }


  return Plane2D;

});