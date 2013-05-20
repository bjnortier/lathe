define([
        '../vector3',
        '../plane3d',
        '../polygon3d',
        '../bsp',
        '../primitives/primitive',
        '../primitives/sphericalbsp',
    ], function(Vector3, Plane3D, Polygon3D, BSP, Primitive, SphericalBSP) {

    var createCylinderTree = function(x,y,z,r,thetaN) {

      var curvePlanes = [];   
      for (var i = 0; i < thetaN; ++i) {
        var theta = Math.PI*2*(i/thetaN);
        curvePlanes.push(
          new Plane3D(
            x+Math.cos(theta),
            y+Math.sin(theta),
            0, r));
      }
      return Primitive.createConvexTree(curvePlanes);

    }

    var Cylinder = function(params, resolution) {
        var x = params.x, y = params.y, z = params.z, r = params.r, h = params.h;
        var resolution = resolution || 12;
        var thetaN = resolution;
        var halfZRes = Math.floor(resolution/2);

        this.bsp = new BSP.Node(
            new Plane3D(0,0,-1,-z), 
            new BSP.Node(
                new Plane3D(0,0,1,z+h),
                createCylinderTree(x,y,z,r,thetaN),
                new BSP.Cell(false)),
            new BSP.Cell(false));
        this.bsp.createSHPs(Polygon3D);

    }

    return Cylinder;
});