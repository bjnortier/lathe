'use strict';

requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/vector3',
        'lib/plane3d',
        'lib/region3d',
        'lib/bsp2d',
        'examples/js/primitivesexample',
    ], 
    function(
        Vector3,
        Plane3D,
        Region3D,
        BSP2D,
        PrimitivesExample) {

    var Node = BSP2D.Node;
    var Cell = BSP2D.Cell;
    var worldRegion = Region3D.world;

    var createConvexTree = function(planes, region) {
        if (planes.length) {
            var splits = region.splitBy(planes[0]);
            var frontNode = new Cell('+', false, splits.front);
            var backNode = createConvexTree(planes.slice(1), splits.back);
            return new Node(undefined, region, planes[0], backNode, frontNode);
        } else {
            return new Cell('-', true, region);
        }
    }


    var t2 = createConvexTree(
        [new Plane3D(0,0,-1,-1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,4)],
        worldRegion);

    var Cube = function(x,y,z,w,l,h) {
       this.bsp = createConvexTree(
            [
                new Plane3D(0,0,-1,-z), new Plane3D(0,0,1,z+h), 
                new Plane3D(1,0,0,x+w), new Plane3D(-1,0,0,-x), 
                new Plane3D(0,1,0,y+l), new Plane3D(0,-1,0,-y)
            ], 
            worldRegion);
    }

    var Sphere = function(r, order) {
        var order = order || 0;

        var points = [
            new Vector3(1,-1/Math.sqrt(3),-1/Math.sqrt(6)).mult(r*Math.sqrt(6)/3),
            new Vector3(-1,-1/Math.sqrt(3),-1/Math.sqrt(6)).mult(r*Math.sqrt(6)/3),
            new Vector3(0,2/Math.sqrt(3),-1/Math.sqrt(6)).mult(r*Math.sqrt(6)/3),
            new Vector3(0,0,3/Math.sqrt(6)).mult(r*Math.sqrt(6)/3),
        ]
        var planes = points.map(function(p, i) {
            var plane = Plane3D.fromPoints(points[i], 
                points[(i+1)%points.length], 
                points[(i+2)%points.length])
            if (i % 2 !== 0) {
                plane = plane.reverse();
            }
            return plane;
        })

        this.bsp = createConvexTree(
            planes,
            worldRegion);

        var expandFront = function(node, i) {

            var points2 = [points[i%4], points[(i+1)%4], points[(i+2)%4]];
            var center = points2[0].add(points2[1]).add(points2[2]).mult(1/3);
            var onSphere = center.mult(r/center.length());
            if (i % 2 === 0) {
                var planes2 = [
                    Plane3D.fromPoints(points2[0], points2[1], onSphere),
                    Plane3D.fromPoints(points2[1], points2[2], onSphere),
                    Plane3D.fromPoints(points2[2], points2[0], onSphere),
                ]
            } else {
                var planes2 = [
                    // Plane3D.fromPoints(points2[0], onSphere, points2[1]),
                    // Plane3D.fromPoints(points2[1], onSphere, points2[2]),
                    // Plane3D.fromPoints(points2[2], onSphere, points2[0]),
                ]
            }

            node.front = createConvexTree(planes2, node.front.region);
            // if (node.back && (i < 0)) {
            //     expandFront(node.back, i+1);
            // }
        }
        // expandFront(this.bsp.back, 1);

    }

    var Sphere2 = function(r) {

        var halfVRes = 1;
        var thetaN = 5;
        
        var planes = [new Plane3D(0,0,-1,0), new Plane3D(0,0,1,10)];
        for (var i = 0; i < thetaN; ++i) {
            var theta = Math.PI*2*(i/thetaN);
            var phi = Math.PI/4;
            planes[i+2] = new Plane3D(
                Math.cos(phi)*Math.cos(theta), 
                Math.cos(phi)*Math.sin(theta), 
                Math.sin(phi), 
                r);
        }

        this.bsp = createConvexTree(
            planes,
            worldRegion);
    }

    var p1 = new Cube(0.5,0.5,0.5,5,5,5);
    // var p2 = new Cube(1,2,3,5,5,5);
    var p2 = new Sphere2(5);

    // new PrimitivesExample(p1, p2, BSP2D.union);
    // new PrimitivesExample(p1, p2, BSP2D.intersection);
    new PrimitivesExample(p1, p2, BSP2D.difference);

});