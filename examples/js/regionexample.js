define([
        'lib/plane',
        'lib/polygon',
        'lib/region',
        'lib/bspnode',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane, Polygon, Region, BSPTree, Viewport, Trackball) {


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


        var tree = new BSPTree.Node(
            new Plane(0,0,-1,0),
            new BSPTree.Node(
                new Plane(0,-1,0,0),
                new BSPTree.Node(
                    new Plane(-1,0,0,0),
                    new BSPTree.Node(
                        new Plane(1,1,1,5),
                        new BSPTree.Cell('OUT'),
                        new BSPTree.Cell('IN')),
                    new BSPTree.Cell('IN')),
                new BSPTree.Cell('IN')),
            new BSPTree.Cell('IN'));

        var polyhedron1 = [
            new Polygon(
                new Plane(0,0,-1,0), [new Plane(0,-1,0,0),new Plane(-1,0,0,0),new Plane(1,1,0,10)]),
            new Polygon(
                new Plane(0,-1,0,0), [new Plane(0,0,-1,0),new Plane(1,0,1,10),new Plane(-1,0,0,0)]),
            new Polygon(
                new Plane(-1,0,0,0), [new Plane(0,-1,0,0),new Plane(0,1,1,10),new Plane(0,0,-1,0)]),
            new Polygon(
                new Plane(1,1,1,10), [new Plane(0,-1,0,0),new Plane(0,0,-1,0),new Plane(-1,0,0,0)]),
        ]

        var polyhedron2 = [
            new Polygon(
                new Plane(0,0,-1,-2), [new Plane(0,-1,0,-2),new Plane(-1,0,0,-2),new Plane(1,1,1,14)]),
            new Polygon(
                new Plane(0,-1,0,-2), [new Plane(0,0,-1,-2),new Plane(1,1,1,14),new Plane(-1,0,0,-2)]),
            new Polygon(
                new Plane(-1,0,0,-2), [new Plane(0,-1,0,-2),new Plane(1,1,1,14),new Plane(0,0,-1,-2)]),
            new Polygon(
                new Plane(1,1,1,14), [new Plane(0,-1,0,-2),new Plane(0,0,-1,-2),new Plane(-1,0,0,-2)]),
        ]

        polyhedron1.forEach(function(p) {
            beforeViewport.addPolygon(p, 0xffff00);
        });
        polyhedron2.forEach(function(p) {
            beforeViewport.addPolygon(p, 0x00ffff);
        });

        var splitPolyhedron = function(polyhedron, h) {
            var frontPolygons = [], backPolygons = [];
            var intersectedpolygons = [];
            polyhedron.forEach(function(polygon) {
                var splits = polygon.splitBy(h);
                splits.front && frontPolygons.push(splits.front);
                splits.back && backPolygons.push(splits.back);
                if(splits.front && splits.back) {
                    intersectedpolygons.push(polygon);
                }
            })
            if (intersectedpolygons.length > 0) {
                frontPolygons.push(new Polygon(h, intersectedpolygons.map(function(p) {
                    return p.s;
                })));
                backPolygons.push(new Polygon(h, intersectedpolygons.map(function(p) {
                    return p.s;
                }).reverse()));
            }
            return {
                front: frontPolygons,
                back: backPolygons
            }
        }

        // var splits = splitPolyhedron(polyhedron2, new Plane(1,0,0,4));
        var splits = splitPolyhedron(polyhedron1, polyhedron2[0].s);
        var splits2 = splitPolyhedron(splits.back, polyhedron2[1].s);
        var splits3 = splitPolyhedron(splits2.back, polyhedron2[2].s);
        var splits4 = splitPolyhedron(splits3.back, polyhedron2[3].s);
        // splits.front.forEach(function(p) {
        //     splitViewport.addPolygon(p, 0x0000ff);
        // });
        splits4.back.forEach(function(p) {
            splitViewport.addPolygon(p, 0x00ff00);
        });

        // var tree = [
        //     new Plane(0,0,-1,0), 
        //     new Plane(0,-1,0,0), 
        //     new Plane(-1,0,0,0), 
        //     // new Plane(1,1,1,10), 
        // ]

        // var s = new Plane(2,2,2,2);

        // var bounding = [];
        // tree.forEach(function(hp) {

        // });

        // regionViewport.addPolygon(new Polygon(s, tree), 0xff0000);
        // tree.forEach(function(plane) {
        //     regionViewport.addPlane(plane, 0x00ff00);
        // })

    }

    return Example;

});