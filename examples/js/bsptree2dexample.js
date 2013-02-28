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
        var splitContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        splitContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(splitContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var splitViewport  = new Viewport(splitContainer);
        new Trackball([beforeViewport, splitViewport]);

        var brep = Conv.bsp2DtoBrep(t1).forEach(function(line, i) {
            var color = Math.random()*0xffffff;
            beforeViewport.addLine2D(line, color);
        })

        var brep = Conv.bsp2DtoBrep(t2).forEach(function(line, i) {
            var color = Math.random()*0xffffff;
            splitViewport.addLine2D(line, color);
        })

        // beforeViewport.addBSPTree2D(t1, 0xffff00);
        // beforeViewport.addBSPTree2D(t2, 0x00ffff);
        
        // var merged = operation(t1, t2);
        // splitViewport.addBSPTree2D(merged, 0x00ff00);

    }

    return Example;

}); 