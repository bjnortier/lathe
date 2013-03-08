define([
        'lib/vector3',
        'lib/plane3d',
        'lib/polygon3d',
        'lib/bsp',
        'lib/primitives/primitive',
    ], function(Vector3, Plane3D, Polygon3D, BSP, Primitive) {

    var createSlice = function(x, y, z, r, halfZRes, thetaN, slice, sign) {
        var curvePlanes = [];   
        var phi = Math.PI/2*slice/halfZRes;
        var phi1 = Math.PI/2*(slice+1)/halfZRes;
        var rz = sign*r*Math.cos(phi);
        for (var i = 0; i < thetaN; ++i) {
            var theta = Math.PI*2*(i/thetaN);
            var theta1 = Math.PI*2*((i+1)/thetaN);
            var p1 = new Vector3(
                x+r*Math.cos(phi)*Math.cos(theta),
                y+r*Math.cos(phi)*Math.sin(theta),
                z+(sign*r)*Math.sin(phi));
            var p2 = new Vector3(
                x+r*Math.cos(phi)*Math.cos(theta1),
                y+r*Math.cos(phi)*Math.sin(theta1),
                z+(sign*r)*Math.sin(phi));
            var p3 = new Vector3(
                x+r*Math.cos(phi1)*Math.cos(theta),
                y+r*Math.cos(phi1)*Math.sin(theta),
                z+(sign*r)*Math.sin(phi1));
            if (sign > 0) {
                curvePlanes.push(new Plane3D.fromPoints(p1, p2, p3));
            } else {
                curvePlanes.push(new Plane3D.fromPoints(p1, p3, p2));
            }
        }

        // Round off to avoid unnecessary numerical robustness issues.
        var planeZ = new Plane3D(0,0,sign*1,Math.round(sign*z+r*Math.sin(phi1)*1000)/1000);
        var curvedTree = Primitive.createConvexTree(curvePlanes);
        if (slice < halfZRes-1) {
            var front = createSlice(x, y, z, r, halfZRes, thetaN, slice+1, sign);
            return new BSP.Node(planeZ, curvedTree, front);
        } else {
            return curvedTree;
        }

    }

    return {
        createSlice: createSlice
    }


});