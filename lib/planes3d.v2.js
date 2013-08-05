'use strict';

define([], function() {

  var Plane3D = function(buffer, index) {
    this.array = new Float32Array(buffer, index, 4);
    Object.freeze(this);
  };

  Plane3D.prototype = {

    get a() {
      return this.array[0];
    },

    get b() {
      return this.array[1];
    },

    get c() {
      return this.array[2];
    },

    get d() {
      return this.array[3];
    },

  };

  // A new plane collection, where planes have 'd' dimensions
  var Planes3D = function() {

    var size = 4;
    var index = 0;
    var buffer = new ArrayBuffer(16*4);

    this.add = function(a,b,c,d) {
      if ((index + 1) > size) {
        size = size * 2;
        var newBuffer = new ArrayBuffer(size*4*4);

        var from = new Float32Array(buffer);
        var to = new Float32Array(newBuffer);
        for (var i = 0; i < from.length; ++i) {
          to[i] = from[i];
        }
        buffer = newBuffer;
      }

      var plane = new Float32Array(buffer, index*16, 4);
      plane[0] = a;
      plane[1] = b;
      plane[2] = c;
      plane[3] = d;
      return index++;
    };

    this.get = function(i) {
      return new Plane3D(buffer, i*16, 4);
    };

  };

  return Planes3D;

});