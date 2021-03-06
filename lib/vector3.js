define([], function() {

  'use strict';

  // Vec3 (coordinates) have full accuracy, so don't use
  // glMatrix.vec3
  var Vec = function(a,b,c) {
    this.x = a;
    this.y = b;
    this.z = c;
  };

  Vec.prototype.equals = function(that) {
    return ((that.x === this.x) &&
            (that.y === this.y) &&
            (that.z === this.z));
  };

  Vec.prototype.isNaN = function() {
    return (isNaN(this.x) ||
            isNaN(this.y) ||
            isNaN(this.z));
  };

  Vec.prototype.add = function(that) {
    return new Vec(that.x + this.x, that.y + this.y, that.z + this.z);
  };

  Vec.prototype.sub = function(that) {
    return new Vec(this.x - that.x, this.y - that.y, this.z - that.z);
  };

  Vec.prototype.round = function(places) {
    return new Vec(
      Math.round(this.x*(10*places))/(10*places),
      Math.round(this.y*(10*places))/(10*places),
      Math.round(this.z*(10*places))/(10*places));
  };

  Vec.prototype.cross = function(that) {
    return new Vec(
      this.y * that.z - this.z * that.y,
      this.z * that.x - this.x * that.z,
      this.x * that.y - this.y * that.x);
  };

  Vec.prototype.dot = function (that) {
    return this.x * that.x + this.y * that.y + this.z * that.z;
  };

  Vec.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  };

  Vec.prototype.normalize = function() {
    var length = this.length();
    return new Vec(this.x/length, this.y/length, this.z/length);
  };

  Vec.prototype.mult = function(scalar) {
    return new Vec(this.x*scalar, this.y*scalar, this.z*scalar);
  };

  Vec.prototype.angleBetween = function(that) {
    return Math.acos(this.dot(that)/this.length()/that.length());
  };

  return Vec;

});