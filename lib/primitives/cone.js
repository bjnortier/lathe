define([
    '../vector3',
    '../plane3d',
    '../polygon3d',
    '../bsp',
    '../primitives/primitive',
    '../primitives/sphericalbsp',
  ], function(Vector3, Plane3D, Polygon3D, BSP, Primitive, SphericalBSP) {

  var createSlice = function(r, h, resolution) {
    var curvePlanes = [];   
    var phi = Math.atan(r/h)
    for (var i = 0; i < resolution; ++i) {
      var theta = Math.PI*2*(i/resolution);
      
      // http://www.siggraph.org/education/materials/HyperGraph/modeling/mod_tran/3drota.htm
      var u = Math.cos(phi);
      var v = 0;
      var w = Math.sin(phi);
      var d = r*u;

      var a = u*Math.cos(theta) - v*Math.sin(theta);
      var b = u*Math.sin(theta) + v*Math.cos(theta); 
      var c = w;

      curvePlanes.push(new Plane3D(a,b,c,d));

    }

    var curvedTree = Primitive.createConvexTree(curvePlanes);
    return curvedTree;

  }

  var Cone = function(params, resolution) {
    if ((params.r <= 0) || (params.h <= 0)) {
      this.bsp = new BSP.Cell(false);
    } else {

      var x = params.x || 0;
      var y = params.y || 0;
      var z = params.z || 0;
      var r = params.r, h = params.h;
      var resolution = resolution || 12;
      var halfZRes = Math.floor(resolution/2);

      this.bsp = new BSP.Node(
        new Plane3D(0,0,-1,0),
        createSlice(r, h, resolution), 
        new BSP.Cell(false));

      this.bsp.createSHPs(Polygon3D);
      this.bsp = this.bsp.translate(x,y,z);
    }

  }

  return Cone;
});