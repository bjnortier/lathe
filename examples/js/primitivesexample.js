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

        beforeViewport.addBSPTree3D(t1.bsp, 0x00ff00);
        beforeViewport.addBSPTree3D(t2.bsp, 0x0000ff);

        var time = function(fn) {
            var t1 = new Date().getTime();
            var r = fn();
            console.log(new Date().getTime()-t1);
            return r;
        }
        
        var merged = time(function() { return operation(t1.bsp, t2.bsp) });
        bspAViewport.addBSPTree3D(merged, 0x00ffff);

        var merged = time(function() { return operation(t2.bsp, t1.bsp) });
        bspBViewport.addBSPTree3D(merged, 0x00ffff);

    }

    return Example;

}); 
