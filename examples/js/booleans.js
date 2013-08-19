'use strict';

requirejs.config({
  baseUrl:'..',
  paths: {
    'underscore': '../../node_modules/underscore/underscore',
    'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    'gl-matrix': 'node_modules/gl-matrix/dist/gl-matrix',
  },
});

requirejs([
    'lib/bench',
    'lib/primitives/sphere',
    'lib/primitives/halfsphere',
    'lib/primitives/cube',
    'examples/js/booleanexample',
  ], 
  function(
    Bench,
    Sphere,
    HalfSphere,
    Cube,
    BooleanExample) {

  var p1 = Bench.time(function() { return new Cube({
    x: -10, y: -10, z: -10, w: 10, d: 10, h: 10
  }); }, 'cube');
  var p2 = Bench.time(function() { return new Cube({
     x: -2, y: -2, z: -2, w: 10, d: 10, h: 10
  }); }, 'cube');
  new BooleanExample(p1.bsp, p2.bsp);
  
  var p3 = Bench.time(function() { return new HalfSphere({
    x: 0, y: 0, z: 0, r: 5,
  }, 3); }, 'halfsphere');
  new BooleanExample(p1.bsp, p3.bsp);

  var p4 = Bench.time(function() { return new Sphere({
    x: 0, y: 0, z: 0, r: 5
  }); }, 'sphere');
  new BooleanExample(p1.bsp, p4.bsp);

});
