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
        var splitBackContainer = document.createElement('div');
        var splitFrontContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        splitBackContainer.classList.add('viewport');
        splitFrontContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(splitBackContainer);
        exampleContainer.appendChild(splitFrontContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var splitBackViewport  = new Viewport(splitBackContainer);
        var splitFrontViewport  = new Viewport(splitFrontContainer);
        new Trackball([beforeViewport, splitBackViewport, splitFrontViewport]);

        beforeViewport.addRegion3D(region, 0x00ffff);

        var splits = region.splitBy(h);
        splitBackViewport.addRegion3D(splits.back, 0x00ff00);
        splitFrontViewport.addRegion3D(splits.front, 0x0000ff);
    }

    return Example;

});