'use strict';

define([
        'lib/conv',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Conv, Viewport, Trackball) {

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

        var time = function(fn) {
            var t1 = new Date().getTime();
            var r = fn();
            console.log(new Date().getTime()-t1);
            return r;
        }

        var mergedA = time(function() { return operation(t1, t2) });
        bspAViewport.addBRep3D(Conv.bspToBrep3D(mergedA), 0x00ffff);

        var mergedB = time(function() { return operation(t2, t1) });
        bspBViewport.addBRep3D(Conv.bspToBrep3D(mergedB), 0x00ffff);

    }

    return Example;

}); 

