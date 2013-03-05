'use strict';

define([
        'lib/conv',
        'lib/polygon3d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Conv, Polygon3D, Viewport, Trackball) {

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

        beforeViewport.addBRep3D(Conv.bspToBrep3D(t1), 0x00ff00);
        beforeViewport.addBRep3D(Conv.bspToBrep3D(t2), 0x0000ff);

        var time = function(fn, msg) {
            var t1 = new Date().getTime();
            var r = fn();
            console.log(msg, new Date().getTime()-t1);
            return r;
        }

        var mergedA = time(function() { return operation(t1, t2, Polygon3D) }, 'boolean');
        var brepA = time(function() { return Conv.bspToBrep3D(mergedA); }, 'brep');
        bspAViewport.addBRep3D(brepA, 0x00ffff);

        // bspBViewport.addPolygon3D(mergedA.shp, 0x00ff00)
        // bspBViewport.addPolygon3D(mergedA.back.shp, 0xff0000)
        // bspBViewport.addPolygon3D(mergedA.back.back.shp, 0x00ff00)
        // bspBViewport.addPolygon3D(mergedA.back.back.back.shp, 0x0000ff)

        // bspBViewport.addPolygon3D(mergedA.back.back.back.back.shp, 0x0000ff)

        // bspBViewport.addPolygon3D(mergedA.back.back.back.back.back.shp, 0x0000ff)
        // bspBViewport.addPolygon3D(mergedA.back.back.back.back.back.back.shp, 0x0000ff)
        // bspBViewport.addPolygon3D(mergedA.back.back.back.back.back.back.back.shp, 0x0000ff)


        var mergedB = time(function() { return operation(t2, t1, Polygon3D) }, 'boolean');
        var brepB = time(function() { return Conv.bspToBrep3D(mergedB); }, 'brep');
        bspBViewport.addBRep3D(brepB, 0x00ffff);

    }

    return Example;

}); 

