define([
  'gl-matrix',
  '../bsp',
  '../vector3',
  '../plane3d',
  '../polygon3d',
  '../primitives/primitive',
  ] , function(glMatrix, BSP, Vector3, Plane3D, Polygon3D, Primitive) {

  // 'use strict';
  var vec3 = glMatrix.vec3;

  var Cube = function(params) {
  if ((params.w === 0) || (params.d === 0) || (params.h === 0)) {
    this.bsp = new BSP.Cell(false);
  } else {
    var x = params.x || 0;
    var y = params.y || 0;
    var z = params.z || 0;
    this.bsp = Primitive.createConvexTree([
      new Plane3D(0,0,-1,0),
      new Plane3D(0,0,1,params.h),
      new Plane3D(1,0,0,params.w),
      new Plane3D(-1,0,0,0),
      new Plane3D(0,1,0,params.d),
      new Plane3D(0,-1,0,0),
    ].map(function(p) {
      var axis = vec3.fromValues(0,0,1);
      return p.translate(x,y,z);
    }));
    this.bsp.createSHPs(Polygon3D);
  }
  }

  return Cube;
});