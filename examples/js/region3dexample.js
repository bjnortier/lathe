define([
        'lib/plane3d',
        'lib/polygon3d',
        'lib/region3d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane3D, Polygon3D, Region3D, Viewport, Trackball) {


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

        // var polyhedron1 = [
        //     new Polygon3D(
        //         new Plane3D(0,0,-1,0), [new Plane3D(0,-1,0,0),new Plane3D(-1,0,0,0),new Plane3D(1,1,0,10)]),
        //     new Polygon3D(
        //         new Plane3D(0,-1,0,0), [new Plane3D(0,0,-1,0),new Plane3D(1,0,1,10),new Plane3D(-1,0,0,0)]),
        //     new Polygon3D(
        //         new Plane3D(-1,0,0,0), [new Plane3D(0,-1,0,0),new Plane3D(0,1,1,10),new Plane3D(0,0,-1,0)]),
        //     new Polygon3D(
        //         new Plane3D(1,1,1,10), [new Plane3D(0,-1,0,0),new Plane3D(0,0,-1,0),new Plane3D(-1,0,0,0)]),
        // ]

        var polyhedron1 = [
            new Polygon3D(
                new Plane3D(0,0,-1,0), [new Plane3D(1,0,0,5),new Plane3D(0,1,0,5),new Plane3D(-1,0,0,5),new Plane3D(0,-1,0,5)]),
            new Polygon3D(
                new Plane3D(0,0,1,5), [new Plane3D(1,0,0,5),new Plane3D(0,1,0,5),new Plane3D(-1,0,0,5),new Plane3D(0,-1,0,5)]),
            new Polygon3D(
                new Plane3D(1,0,0,5), [new Plane3D(0,0,-1,0),new Plane3D(0,1,0,5),new Plane3D(0,0,1,5),new Plane3D(0,-1,0,5)]),
            new Polygon3D(
                new Plane3D(-1,0,0,5), [new Plane3D(0,0,-1,0),new Plane3D(0,1,0,5),new Plane3D(0,0,1,5),new Plane3D(0,-1,0,5)]),
            new Polygon3D(
                new Plane3D(0,1,0,5), [new Plane3D(0,0,-1,0),new Plane3D(1,0,0,5),new Plane3D(0,0,1,5),new Plane3D(-1,0,0,5)]),
            new Polygon3D(
                new Plane3D(0,-1,0,5), [new Plane3D(0,0,-1,0),new Plane3D(1,0,0,5),new Plane3D(0,0,1,5),new Plane3D(-1,0,0,5)]),

        ]

        var polyhedron2 = [
            new Polygon3D(
                new Plane3D(0,0,-1,-2), [new Plane3D(0,-1,0,-2),new Plane3D(-1,0,0,-2),new Plane3D(1,1,1,14)]),
            new Polygon3D(
                new Plane3D(0,-1,0,-2), [new Plane3D(0,0,-1,-2),new Plane3D(1,1,1,14),new Plane3D(-1,0,0,-2)]),
            new Polygon3D(
                new Plane3D(-1,0,0,-2), [new Plane3D(0,-1,0,-2),new Plane3D(1,1,1,14),new Plane3D(0,0,-1,-2)]),
            new Polygon3D(
                new Plane3D(1,1,1,14), [new Plane3D(0,-1,0,-2),new Plane3D(0,0,-1,-2),new Plane3D(-1,0,0,-2)]),
        ]

        polyhedron1.forEach(function(p) {
            beforeViewport.addPolygon3D(p, 0xffff00);
        });
        polyhedron2.forEach(function(p) {
            beforeViewport.addPolygon3D(p, 0x00ffff);
        });

        

        var splits = splitPolyhedron(polyhedron1, polyhedron2[0].s);
        var splits2 = splitPolyhedron(splits.back, polyhedron2[1].s);
        var splits3 = splitPolyhedron(splits2.back, polyhedron2[2].s);
        var splits4 = splitPolyhedron(splits3.back, polyhedron2[3].s);

        splits4.back.forEach(function(p) {
            splitViewport.addPolygon3D(p, 0x00ff00);
        });

        // var tree = [
        //     new Plane3D(0,0,-1,0), 
        //     new Plane3D(0,-1,0,0), 
        //     new Plane3D(-1,0,0,0), 
        //     // new Plane3D(1,1,1,10), 
        // ]

        // var s = new Plane3D(2,2,2,2);

        // var bounding = [];
        // tree.forEach(function(hp) {

        // });

        // regionViewport.addPolygon(new Polygon3D(s, tree), 0xff0000);
        // tree.forEach(function(plane) {
        //     regionViewport.addPlane(plane, 0x00ff00);
        // })

    }

    return Example;

});