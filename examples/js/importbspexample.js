'use strict';

define([
    'lib/bench',
    'lib/conv',
    'lib/bsp',
    'examples/js/viewport',
    'examples/js/trackball',
  ], function(Bench, Conv, BSP, Viewport, Trackball) {

    function Example(t1) {

      var exampleContainer = document.createElement('div');
      exampleContainer.classList.add('example');
      var primitiveContainer = document.createElement('div');
      primitiveContainer.classList.add('viewport');
      document.body.appendChild(exampleContainer);
      exampleContainer.appendChild(primitiveContainer);
      var primitiveViewport = new Viewport(primitiveContainer);
      new Trackball([primitiveViewport]);

      var polygons = Conv.bspToBrep(t1);
      primitiveViewport.addBRep(polygons, 0x00ff00);

    }

    return Example;

  }); 