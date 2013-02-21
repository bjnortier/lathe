define([
        'lib/plane3d',
        'lib/polygon3d',
        'lib/region3d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane3D, Polygon3D, Region3D, Viewport, Trackball) {


    var Example = function(region, h) {

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

        beforeViewport.addRegion3D(region, 0x00ffff);

        var splits = region.splitBy(h);
        splitViewport.addRegion3D(splits.back, 0x00ff00);
        splitViewport.addRegion3D(splits.front, 0x0000ff);
    }

    return Example;

});