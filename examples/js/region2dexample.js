define([
        'lib/plane2d',
        'lib/polygon2d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane2D, Polygon2D, Viewport, Trackball) {


    var Example = function(region) {

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

        var p1 = new Polygon2D([new Plane2D(0,-1,-1), new Plane2D(1,1,10), new Plane2D(-1,0,-1)]);
        var p2 = new Polygon2D([new Plane2D(0,-1,-3), new Plane2D(1,1,12), new Plane2D(-1,0,-3)]);

        beforeViewport.addPolygon2D(p1, 0xffff00);
        beforeViewport.addPolygon2D(p2, 0x00ffff);

        var splits1 = p1.splitBy(p2.boundingPlanes[0]);
        var splits2 = splits1.back.splitBy(p2.boundingPlanes[1]);
        var splits3 = splits2.back.splitBy(p2.boundingPlanes[2]);

        splitViewport.addPolygon2D(splits3.back, 0x00ff00);

    }

    return Example;

}); 