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
    'lib/polygon3d',
    'lib/bsp',
    'lib/primitives/cube',
    'lib/primitives/subtract3d',
    'examples/js/primitiveexample',
  ], 
  function(
    Polygon3D,
    BSP,
    Cube,
    Subtract3D,
    PrimitiveExample) {

  var p1 = new Cube({
    x: -5, y: -10, z: -15, w: 5, d: 5, h: 5
  });
  new PrimitiveExample(p1.bsp.translate(5, 10, 15));

  var p2 = new Cube({
    x: 0, y: 0, z: 0, w: 5, d: 5, h: 5,
  });
  var p3 = new Cube({
    x: 2, y: 2, z: 2, w: 5, d: 5, h: 5,
  });
  var subtract = new Subtract3D(p2.bsp, p3.bsp);
  new PrimitiveExample(subtract.bsp.translate(-2, -2, -2));
  
});