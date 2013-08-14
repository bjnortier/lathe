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

  var createSegment = function(r) {


    var createNode = function(startPi, endPi, d, maxD) {

      var midPi = (startPi + endPi)/2;
      if (d < maxD) {

        return new BSP.Node(
          new Plane3D(0,1,0,0).rotate(0,0,1,midPi*Math.PI),
          createNode(startPi, midPi, d+1, maxD),
          createNode(midPi, endPi, d+1, maxD));

      } else {

        return new BSP.Node(
            new Plane3D(1,0,0,r).rotate(0,0,1,midPi*Math.PI),
            new BSP.Cell(true),
            new BSP.Cell(false)
          );
      }

    };

    return createNode(0,2,1,6);

  };

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
        // createSegment(r),
        new BSP.Cell(false)),
      new BSP.Cell(false));
    this.bsp.createSHPs(Polygon3D);

  }

  return Cylinder;
});