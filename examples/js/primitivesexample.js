'use strict';

define([
        'lib/conv',
        'lib/polygon3D',
        'lib/bsp',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Conv, Polygon3D, BSP, Viewport, Trackball) {

    var Example = function(t1, t2, operation) {

        var exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');
        var beforeContainer = document.createElement('div');
        var bspAContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        bspAContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(bspAContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var bspAViewport  = new Viewport(bspAContainer);
        new Trackball([beforeViewport, bspAViewport]);

        beforeViewport.addBRep3D(Conv.bspToBrep3D(t1.bsp), 0x00ff00);
        beforeViewport.addBRep3D(Conv.bspToBrep3D(t2.bsp), 0x0000ff);

        var time = function(fn, msg) {
            var t1 = new Date().getTime();
            var r = fn();
            console.log(msg, new Date().getTime()-t1);
            return r;
        }

        var calculate = function(booleanFn) {
            // Polygon3D.record = {};
            bspAViewport.clear();
            var merged = time(function() { 
                return booleanFn();
            }, 'boolean');
            var brep = time(function() { 
                return Conv.bspToBrep3D(merged); 
            }, 'brep');
            bspAViewport.addBRep3D(brep, 0x00ffff);
        }

        var controls = $('<div class="controls"></div>')
        var union = $('<input type="button" value="A &cup; B">');
        var intersect = $('<input type="button" value="A &cap; B">');
        var diffAB = $('<input type="button" value="A - B">');
        var diffBA = $('<input type="button" value="B - A">');
        $(bspAContainer).append(controls);
        $(controls).append(union);
        $(controls).append(intersect);
        $(controls).append(diffAB);
        $(controls).append(diffBA);

        union.click(function() {
            calculate(function() {
                return BSP.union(t1.bsp, t2.bsp, Polygon3D);
            });
        });
        intersect.click(function() {
            calculate(function() {
                return BSP.intersection(t1.bsp, t2.bsp, Polygon3D);
            });
        });
        diffAB.click(function() {
            calculate(function() {
                return BSP.difference(t1.bsp, t2.bsp, Polygon3D);
            });
        });
        diffBA.click(function() {
            calculate(function() {
                return BSP.difference(t2.bsp, t1.bsp, Polygon3D);
            });
        });

        union.click();

    }

    return Example;

}); 
