define([
        'lib/vector3',
        'lib/plane3d',
        'lib/polygon3d',
        'lib/bsp',
        'lib/primitives/primitive',
        'lib/primitives/sphericalbsp',
    ], function(Vector3, Plane3D, Polygon3D, BSP, Primitive, SphericalBSP) {


    var Sphere = function(x, y, z, r, resolution) {
        var resolution = resolution || 12;
        var thetaN = resolution;
        var halfZRes = Math.floor(resolution/2);

        this.bsp = new BSP.Node(
            new Plane3D(0,0,-1,-z), 
            SphericalBSP.createSlice(x, y, z, r, halfZRes, thetaN, 0, +1), 
            SphericalBSP.createSlice(x, y, z, r, halfZRes, thetaN, 0, -1));
        this.bsp.createSHPs(Polygon3D);

    }

    return Sphere;
});