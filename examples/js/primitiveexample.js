'use strict';

define([
        'lib/bench',
        'lib/conv',
        'lib/bsp',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Bench, Conv, BSP, Viewport, Trackball) {

    var Example = function(t1) {

        var exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');
        var primitiveContainer = document.createElement('div');
        primitiveContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(primitiveContainer);
        var primitiveViewport = new Viewport(primitiveContainer);
        new Trackball([primitiveViewport]);

        primitiveViewport.addBRep(Conv.bspToBrep(t1), 0x00ff00);



    }

    return Example;

}); 
