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


        // var tree = new BSPTree.Node(
        //     new Plane3D(0,0,-1,0),
        //     new BSPTree.Node(
        //         new Plane3D(0,-1,0,0),
        //         new BSPTree.Node(
        //             new Plane3D(-1,0,0,0),
        //             new BSPTree.Node(
        //                 new Plane3D(1,1,1,5),
        //                 new BSPTree.Cell('OUT'),
        //                 new BSPTree.Cell('IN')),
        //             new BSPTree.Cell('IN')),
        //         new BSPTree.Cell('IN')),
        //     new BSPTree.Cell('IN'));

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
                // Sort the bounding polygons so that they form a valid boundary
                // i.e. all vertices are valid
                var findValidPolygon = function(h, sequence) {

                    var permutate = function(toHere, values) {
                        if (values.length === 1) {
                            try {
                                var p = new Polygon3D(h, toHere.concat(values[0]));
                                p.toVertices();
                                return p;
                            } catch (e) {
                                return undefined;
                            }
                        }

                        var found;
                        for (var i = 0; (i < values.length) && (!found); ++i) {
                            var newValues = values.slice(0);
                            newValues.splice(i, 1);
                            found = permutate(toHere.concat(values[i]), newValues);
                        }
                        return found;
                    }
                    return permutate([], sequence);
                }
                var capPolygon = findValidPolygon(h, intersectedpolygons.map(function(p) {
                    return p.s;
                }));

                frontPolygons.push(capPolygon);
                backPolygons.push(capPolygon);
            }   


            return {
                front: frontPolygons,
                back: backPolygons
            }
        }

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