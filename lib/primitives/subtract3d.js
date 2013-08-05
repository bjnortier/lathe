define([
  'gl-matrix',
  '../bsp',
  '../vector3',
  '../plane3d',
  '../polygon3d',
  '../primitives/primitive',
  ] , function(glMatrix, BSP, Vector3, Plane3D, Polygon3D, Primitive) {

  var vec3 = glMatrix.vec3;

  return function(bspA, bspB) {
    this.bsp = BSP.difference(bspA, bspB, Polygon3D);
  }

});