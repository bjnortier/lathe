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
        'lib/polygon3d',
        'lib/plane3d',
        'lib/bsp',
        'examples/js/primitivesexample',
    ], 
    function(
        Vector3,
        Polygon3D,
        Plane3D,
        BSP2D,
        PrimitivesExample) {

    var Node = BSP2D.Node;
    var Cell = BSP2D.Cell;

    var createConvexTree = function(planes) {
        if (planes.length) {
            var frontNode = new Cell(false);
            var backNode = createConvexTree(planes.slice(1));
            return new Node(planes[0], backNode, frontNode);
        } else {
            return new Cell(true);
        }
    }


    var t2 = createConvexTree(
        [new Plane3D(0,0,-1,-1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,4)]);

    var Cube = function(x,y,z,w,l,h) {
       this.bsp = createConvexTree(
            [
                new Plane3D(0,0,-1,-z), new Plane3D(0,0,1,z+h), 
                new Plane3D(1,0,0,x+w), new Plane3D(-1,0,0,-x), 
                new Plane3D(0,1,0,y+l), new Plane3D(0,-1,0,-y)
            ]); 
    }

    var Sphere2 = function(r) {

        var thetaN = 20;
        var halfZRes = 10;

        var createTopSlice = function(z) {

            var curvePlanes = [];
            var phi = Math.PI/2*z/halfZRes;
            var phi1 = Math.PI/2*(z+1)/halfZRes;
            var rz = r*Math.cos(phi)
            for (var i = 0; i < thetaN; ++i) {
                var theta = Math.PI*2*(i/thetaN);
                var theta1 = Math.PI*2*((i+1)/thetaN);
                var p1 = new Vector3(
                    r*Math.cos(phi)*Math.cos(theta),
                    r*Math.cos(phi)*Math.sin(theta),
                    r*Math.sin(phi));
                var p2 = new Vector3(
                    r*Math.cos(phi)*Math.cos(theta1),
                    r*Math.cos(phi)*Math.sin(theta1),
                    r*Math.sin(phi));
                var p3 = new Vector3(
                    r*Math.cos(phi1)*Math.cos(theta),
                    r*Math.cos(phi1)*Math.sin(theta),
                    r*Math.sin(phi1));
                curvePlanes.push(new Plane3D.fromPoints(p1, p2, p3));
            }

            var planeZ = new Plane3D(0,0,1,r*Math.sin(phi1));
            var curvedTree = createConvexTree(curvePlanes);
            if (z < halfZRes-1) {
                var front = createTopSlice(z+1);
                return new Node(planeZ, curvedTree, front);
            } else {
                return curvedTree;
            }

        }

        var createBottomSlice = function(z) {

            var curvePlanes = [];
            var phi = Math.PI/2*z/halfZRes;
            var phi1 = Math.PI/2*(z+1)/halfZRes;
            var rz = -r*Math.cos(phi)
            for (var i = 0; i < thetaN; ++i) {
                var theta = Math.PI*2*(i/thetaN);
                var theta1 = Math.PI*2*((i+1)/thetaN);
                var p1 = new Vector3(
                    r*Math.cos(phi)*Math.cos(theta),
                    r*Math.cos(phi)*Math.sin(theta),
                    -r*Math.sin(phi));
                var p2 = new Vector3(
                    r*Math.cos(phi)*Math.cos(theta1),
                    r*Math.cos(phi)*Math.sin(theta1),
                    -r*Math.sin(phi));
                var p3 = new Vector3(
                    r*Math.cos(phi1)*Math.cos(theta),
                    r*Math.cos(phi1)*Math.sin(theta),
                    -r*Math.sin(phi1));
                curvePlanes.push(new Plane3D.fromPoints(p1, p3, p2));
            }

            var planeZ = new Plane3D(0,0,-1,r*Math.sin(phi1));
            var curvedTree = createConvexTree(curvePlanes);
            if (z < halfZRes-1) {
                var front = createBottomSlice(z+1);
                return new Node(planeZ, curvedTree, front);
            } else {
                return curvedTree;
            }

        }

        var plane0 = new Plane3D(0,0,-1,0);
        this.bsp = new Node(
            plane0, 
            createTopSlice(0), createBottomSlice(0));

    }

    var time = function(fn, msg) {
        var t1 = new Date().getTime();
        var r = fn();
        console.log(msg, new Date().getTime()-t1);
        return r;
    }
    var p1 = time(function() { return new Cube(-8,-8,-8,10,10,10); }, 'cube');
    p1.bsp.createSHPs(Polygon3D);
    
    var p2 = time(function() { return new Sphere2(5); }, 'sphere');
    p2.bsp.createSHPs(Polygon3D);

    // var p2 = new Cube(-5,-5,-5,10,10,10);
    // p2.bsp.createSHPs(Polygon3D);

    // new PrimitivesExample(p1, p2, BSP2D.union);
    // new PrimitivesExample(p1, p2, BSP2D.intersection);
    new PrimitivesExample(p1, p2, BSP2D.difference);

});
