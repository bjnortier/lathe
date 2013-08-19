define([
    './world2d',
    './vertex2d'
  ], function(
    world2d,
    Vertex2D) {

  var Line2D = function(s, boundingplanes) {
    if (!boundingplanes.length === 2) {
      throw Error('Line2D must have 2 bounding planes');
    }
    this.s = s;
    this.boundingplanes = boundingplanes;
    this.vertices = undefined;
  }

  Line2D.deserialize = function(obj) {
    var s = Plane2D.deserialize(obj.s);
    var boundingPlanes = obj.boundingPlanes.map(function(p) {
      return new Plane2D.deserialize(p);
    })
    return new Line2D(s, boundingPlanes);
  }

  Line2D.prototype.equals = function(other) {
    if (!other instanceof Line2D) {
      return false;
    }
    if (!this.s.equals(other.s)) {
      return false;
    }
    return (
        (this.boundingplanes[0].equals(other.boundingplanes[0]) &&
         this.boundingplanes[1].equals(other.boundingplanes[1])) 
        || 
        (this.boundingplanes[0].equals(other.boundingplanes[1]) &&
         this.boundingplanes[1].equals(other.boundingplanes[0])));
  }

  Line2D.prototype.toEval = function() {
    return "new Line2D(" + this.s.toEval() + ',[' + 
      this.boundingplanes.map(function(p) { return p.toEval(); }).join(',') + '])';
  }

  // Create a line from the plane a a very big box
  Line2D.fromPlane = function(s) {
    var aAbs = Math.abs(s.a),
      bAbs = Math.abs(s.b);
    var boundingPlanes;
    if (aAbs >= bAbs) {
      boundingPlanes = [world2d.yPlus, world2d.yMinus];
    } else {
      boundingPlanes = [world2d.xPlus, world2d.xMinus];
    } 
    return new Line2D(s, boundingPlanes) ;
  }

  Line2D.prototype.toVertices = function() {
    if (this.vertices) {
      return this.vertices;
    }
    this.vertices = [
      new Vertex2D(this.s, this.boundingplanes[0]),
      new Vertex2D(this.s, this.boundingplanes[1]),
    ]
    return this.vertices;
  }

  Line2D.prototype.reverse = function() {
    return new Line2D(this.s.reverse(), this.boundingplanes.slice(0).reverse());
  }

  Line2D.prototype.splitBy = function(h) {
    var vertices = this.toVertices();

    var orientations = [
      vertices[0].orientationToPlane(h),
      vertices[1].orientationToPlane(h),
    ].join('');

    switch (orientations) {
      // Line lies in front of plane
      case '++':
      case '0+':
      case '+0':
        return {
          back: undefined,
          front: this,
          coincident: undefined
        }
      // Line lies behind plane
      case '--': 
      case '0-': 
      case '-0': 
        return {
          back: this,
          front: undefined,
          coincident: undefined,
        }
      // First vertex behind, second in front
      case '-+':
        return {
          back: new Line2D(this.s, [this.boundingplanes[0], h]),
          front: new Line2D(this.s, [this.boundingplanes[1], h]),
          coincident: undefined,
        }
      // First vertex in front, second behine
      case '+-': 
        return {
          back: new Line2D(this.s, [this.boundingplanes[1], h]),
          front: new Line2D(this.s, [this.boundingplanes[0], h]),
          coincident: undefined,
        }
      // Coincident
      case '00': 
        return {
          back: undefined,
          front: undefined,
          coincident: this
        }
    }

  }

  return Line2D;

});