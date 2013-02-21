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
        var splitContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        splitContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(splitContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var splitViewport  = new Viewport(splitContainer);
        new Trackball([beforeViewport, splitViewport]);


        beforeViewport.addBSPTree3D(t1, 0xffff00);
        beforeViewport.addBSPTree3D(t2, 0x00ffff);
        
        var merged = operation(t1, t2);
        splitViewport.addBSPTree3D(merged, 0x00ff00);
        // splitViewport.addBSPTree3D(merged.back.front, 0x00ff00);
        // splitViewport.addRegion3D(t1.back.front, 0x00ff00);

    }

    return Example;

}); 

