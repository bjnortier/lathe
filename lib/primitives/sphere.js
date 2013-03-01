define([
        'lib/vector3',
        'lib/plane3d',
        'lib/polygon3D',
        'lib/bsp',
        'lib/primitives/primitive',
    ], function(Vector3, Plane3D, Polygon3D, BSP, Primitive) {


    var Sphere = function(r) {

        var thetaN = 20;
        var halfZRes = 10;

        var createSlice = function(z, sign) {

            var curvePlanes = [];
            var phi = Math.PI/2*z/halfZRes;
            var phi1 = Math.PI/2*(z+1)/halfZRes;
            var rz = sign*r*Math.cos(phi);
            for (var i = 0; i < thetaN; ++i) {
                var theta = Math.PI*2*(i/thetaN);
                var theta1 = Math.PI*2*((i+1)/thetaN);
                var p1 = new Vector3(
                    r*Math.cos(phi)*Math.cos(theta),
                    r*Math.cos(phi)*Math.sin(theta),
                    sign*r*Math.sin(phi));
                var p2 = new Vector3(
                    r*Math.cos(phi)*Math.cos(theta1),
                    r*Math.cos(phi)*Math.sin(theta1),
                    sign*r*Math.sin(phi));
                var p3 = new Vector3(
                    r*Math.cos(phi1)*Math.cos(theta),
                    r*Math.cos(phi1)*Math.sin(theta),
                    sign*r*Math.sin(phi1));
                if (sign > 0) {
                    curvePlanes.push(new Plane3D.fromPoints(p1, p2, p3));
                } else {
                    curvePlanes.push(new Plane3D.fromPoints(p1, p3, p2));
                }
            }

            var planeZ = new Plane3D(0,0,sign*1,r*Math.sin(phi1));
            var curvedTree = Primitive.createConvexTree(curvePlanes);
            if (z < halfZRes-1) {
                var front = createSlice(z+1, sign);
                return new BSP.Node(planeZ, curvedTree, front);
            } else {
                return curvedTree;
            }

        }

        var plane0 = new Plane3D(0,0,-1,0);
        this.bsp = new BSP.Node(
            plane0, 
            createSlice(0, +1), createSlice(0, -1));
        this.bsp.createSHPs(Polygon3D);

    }

    return Sphere;
});