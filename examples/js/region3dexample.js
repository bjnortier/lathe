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
        beforeViewport.addPlane3D(h, 0xff0000);

        // beforeViewport.addPolygon3D(region.polygons[0], 0x0000ff);
        // beforeViewport.addPolygon3D(region.polygons[1], 0x00ffff);
        // beforeViewport.addPolygon3D(region.polygons[2], 0x00ff00);
        // beforeViewport.addPolygon3D(region.polygons[3], 0x000000);
        // beforeViewport.addPolygon3D(region.polygons[4], 0xff0000);
        // beforeViewport.addPolygon3D(region.polygons[5], 0xff00ff);
        // beforeViewport.addPolygon3D(region.polygons[6], 0xffff00);
        var splits = region.splitBy(h);

        splitViewport.addRegion3D(splits.front, 0x0000ff);


        // splitViewport.addPolygon3D(splits.front.polygons[0], 0x0000ff);
        // splitViewport.addPolygon3D(splits.front.polygons[1], 0xff00ff);
        // splitViewport.addPolygon3D(splits.front.polygons[2], 0xff0000);
        // splitViewport.addPolygon3D(splits.front.polygons[3], 0xffff00);
        // splitViewport.addPolygon3D(splits.front.polygons[4], 0x00ff00);
        // splitViewport.addPolygon3D(splits.front.polygons[5], 0x00ffff);
        // splitViewport.addPolygon3D(splits.front.polygons[6], 0x0000ff);

        // console.log(splits.front.polygons[6].toVertices().map(function(v) {
        //     return v.toCoordinate();
        // }));
        // console.log(splits.front.polygons[6].isConvex())

        splitViewport.addRegion3D(splits.back, 0x00ff00);
    }

    return Example;

});