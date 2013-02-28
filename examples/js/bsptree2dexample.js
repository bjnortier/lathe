'use strict';

define([
        'lib/bsp',
        'lib/conv',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(BSP, Conv, Viewport, Trackball) {

    var Example = function(t1, t2, operation) {

        var exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');
        var beforeContainer = document.createElement('div');
        var bspAContainer = document.createElement('div');
        var bspBContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        bspAContainer.classList.add('viewport');
        bspBContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(bspAContainer);
        exampleContainer.appendChild(bspBContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var bspAViewport  = new Viewport(bspAContainer);
        var bspBViewport  = new Viewport(bspBContainer);
        new Trackball([beforeViewport, bspAViewport, bspBViewport]);

        beforeViewport.addBRep2D(Conv.bspToBrep2D(t1), 0x0000ff);
        beforeViewport.addBRep2D(Conv.bspToBrep2D(t2), 0x00ff00);

        var mergedA = operation(t1, t2);
        bspAViewport.addBRep2D(Conv.bspToBrep2D(mergedA), 0x00ffff);

        var mergedB = operation(t2, t1);
        bspBViewport.addBRep2D(Conv.bspToBrep2D(mergedB), 0x00ffff);

    }

    return Example;

}); 