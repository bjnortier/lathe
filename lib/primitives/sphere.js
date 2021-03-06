define([
    '../vector3',
    '../plane3d',
    '../polygon3d',
    '../bsp',
    '../primitives/primitive',
    '../primitives/sphericalbsp',
  ], function(Vector3, Plane3D, Polygon3D, BSP, Primitive, SphericalBSP) {


  var Sphere = function(params, resolution) {
    var x = params.x, y = params.y, z = params.z, r = params.r;
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