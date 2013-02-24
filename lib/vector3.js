define([], function() {

    var Vec = function(a,b,c) {
        // From a Vec
        if (a.hasOwnProperty('x') && a.hasOwnProperty('y') && a.hasOwnProperty('z')) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
        } else {
            this.x = a;
            this.y = b;
            this.z = c;
        }
    }

    Vec.prototype.equals = function(that, eps) {
        return ((Math.abs(that.x - this.x) < eps) &&
                (Math.abs(that.y - this.y) < eps) &&
                (Math.abs(that.z - this.z) < eps));
    }

    Vec.prototype.isNaN = function(that) {
        return (_.isNaN(this.x) ||
                _.isNaN(this.y) ||
                _.isNaN(this.z));
    }

    Vec.prototype.add = function(that) {
        return new Vec(that.x + this.x, that.y + this.y, that.z + this.z);
    }

    Vec.prototype.sub = function(that) {
        return new Vec(this.x - that.x, this.y - that.y, this.z - that.z);
    }

    Vec.prototype.round = function(places) {
        return new Vec(
            Math.round(this.x*(10*places))/(10*places),
            Math.round(this.y*(10*places))/(10*places),
            Math.round(this.z*(10*places))/(10*places));
    }

    Vec.prototype.cross = function(that) {
        return new Vec(
            this.y * that.z - this.z * that.y,
            this.z * that.x - this.x * that.z,
            this.x * that.y - this.y * that.x)
    }

    Vec.prototype.dot = function (that) {
        return this.x * that.x + this.y * that.y + this.z * that.z;
    },

    Vec.prototype.length = function(that) {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    Vec.prototype.normalize = function() {
        var length = this.length();
        return new Vec(this.x/length, this.y/length, this.z/length);
    }

    Vec.prototype.mult = function(scalar) {
        return new Vec(this.x*scalar, this.y*scalar, this.z*scalar);
    }

    Vec.prototype.angleBetween = function(that) {
        return Math.acos(this.dot(that)/this.length()/that.length());
    }

    return Vec;

});