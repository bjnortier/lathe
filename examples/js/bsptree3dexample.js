'use strict';

define([
        'lib/bsp',
        'lib/conv',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(BSP2D, Conv, Viewport, Trackball) {

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

        // beforeViewport.addBoundary(t1, 0xffff00);

        // beforeViewport.addPolygon3D(t1.shp, 0xff0000);
        // beforeViewport.addPolygon3D(t1.back.shp, 0xffff00);
        // beforeViewport.addPolygon3D(t1.back.back.shp, 0x00ff00);
        // beforeViewport.addPolygon3D(t1.back.back.back.shp, 0x00ffff);

        var brep = Conv.bsp3DtoBrep(t1).forEach(function(polygon, i) {
            var color = Math.random()*0xffffff;
            bspAViewport.addPolygon3D(polygon, color);
        })


        // beforeViewport.addBoundary(t2, 0x00ffff);

        // var time = function(fn) {
        //     var t1 = new Date().getTime();
        //     var r = fn();
        //     console.log(new Date().getTime()-t1);
        //     return r;
        // }
        
        // var merged = time(function() { return operation(t1, t2) });
        // bspAViewport.addBSPTree3D(merged, 0x00ff00);

        // var merged = time(function() { return operation(t2, t1) });
        // bspBViewport.addBSPTree3D(merged, 0x00ff00);

    }

    return Example;

}); 

