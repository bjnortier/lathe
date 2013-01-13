define([
        'lib/plane',
        'lib/polygon',
        'lib/region',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane, Polygon, Region, Viewport, Trackball) {


    var Example = function(region) {

        var exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');
        var regionContainer = document.createElement('div');
        regionContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(regionContainer);
        var regionViewport = new Viewport(regionContainer);
        new Trackball([regionViewport]);

        region.polyhedron.forEach(function(p) {
            regionViewport.addPolygon(p, 0x00ff00);
        })

    }

    return Example;

});