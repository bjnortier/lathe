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

  
  // Robustness example
  var p3 = Bench.time(function() { return new Cube({x:0,y:0,z:0,w:20,d:20,h:10}); }, 'cube');
  var p4 = Bench.time(function() { return new HalfSphere({x:0,y:0,z:0,r:20}, 12); }, 'halfsphere');
  new BooleanExample(p3.bsp, p4.bsp);

  // Splitting problem case
  var p6 = Bench.time(function() { return new Sphere({x:0, y:0, z:0, r:5}); }, 'halfsphere');
  var p7 = new Cube({x:-8,y:-8,z:-8,w:10,d:10,h:10});
  new BooleanExample(p6.bsp, p7.bsp);

});
