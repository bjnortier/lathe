'use strict';

define([
        'lib/bsp2d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(BSP2D, Viewport, Trackball) {

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

        beforeViewport.addBSPTree3D(t1, 0xffff00);
        beforeViewport.addBSPTree3D(t2, 0x00ffff);
        
        var merged = operation(t1, t2);
        bspAViewport.addBSPTree3D(merged, 0x00ff00);

        var merged = operation(t2, t1);
        bspBViewport.addBSPTree3D(merged, 0x00ff00);

    }

    return Example;

}); 

