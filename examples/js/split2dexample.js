define([
        'lib/plane3d',
        'lib/polygon3d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane3D, Polygon3D, Viewport, Trackball) {


    var Example = function(p1, h) {
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

        beforeViewport.addPolygon2D(p1, 0x00ffff);
        beforeViewport.addPlane2D(h, 0xff0000);

        var splits = p1.splitBy(h); 
        splits.front && splitViewport.addPolygon2D(splits.front, 0x0000ff);
        splits.back && splitViewport.addPolygon2D(splits.back, 0x00ff00);
        splitViewport.addPlane2D(h, 0xff0000);

    }

    return Example;


});