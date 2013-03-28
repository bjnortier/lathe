'use strict';

define([
        'lib/bench',
        'lib/conv',
        'lib/bsp',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Bench, Conv, BSP, Viewport, Trackball) {

    var Example = function(t1, t2, shpClass) {

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

        beforeViewport.addBRep(Conv.bspToBrep(t1), 0x00ff00);
        beforeViewport.addBRep(Conv.bspToBrep(t2), 0x0000ff);

        var calculate = function(booleanFn) {
            bspAViewport.clear();
            var merged = Bench.time(function() { 
                return booleanFn();
            }, 'boolean');
            var brep = Bench.time(function() { 
                return Conv.bspToBrep(merged); 
            }, 'brep');
            bspAViewport.addBRep(brep, 0x00ffff);
        }

        var controls = $('<div class="controls"></div>')
        var unionAB = $('<input type="button" value="A &cup; B">');
        var unionBA = $('<input type="button" value="B &cup; A">');
        var intersectAB = $('<input type="button" value="A &cap; B">');
        var intersectBA = $('<input type="button" value="B &cap; A">');
        var diffAB = $('<input type="button" value="A - B">');
        var diffBA = $('<input type="button" value="B - A">');
        $(bspAContainer).append(controls);
        $(controls).append(unionAB);
        $(controls).append(unionBA);
        $(controls).append(intersectAB);
        $(controls).append(intersectBA);
        $(controls).append(diffAB);
        $(controls).append(diffBA);

        unionAB.click(function() {
            calculate(function() {
                return BSP.union(t1, t2, shpClass);
            });
        });

        unionBA.click(function() {
            calculate(function() {
                return BSP.union(t2, t1, shpClass);
            });
        });

        intersectAB.click(function() {
            calculate(function() {
                return BSP.intersection(t1, t2, shpClass);
            });
        });

        intersectBA.click(function() {
            calculate(function() {
                return BSP.intersection(t2, t1, shpClass);
            });
        });

        diffAB.click(function() {
            calculate(function() {
                return BSP.difference(t1, t2, shpClass);
            });
        });
        
        diffBA.click(function() {
            calculate(function() {
                return BSP.difference(t2, t1, shpClass);
            });
        });

    }

    return Example;

}); 
