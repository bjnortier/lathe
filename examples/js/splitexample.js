define([
        'lib/plane',
        'lib/polygon',
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

        beforeViewport.addPolygon(p1, 0x00ffff);
        beforeViewport.addPlane(h, 0xff0000);

        var splits = p1.splitBy(h); 
        splits.front && splitViewport.addPolygon(splits.front, 0x0000ff);
        splits.back && splitViewport.addPolygon(splits.back, 0x00ff00);
        splitViewport.addPlane(h, 0xff0000);

    }


    return Example;


});