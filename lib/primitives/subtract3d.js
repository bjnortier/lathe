define([
  '../bsp',
  '../polygon3d',
  ] , function(BSP, Polygon3D) {

  return function(bspA, bspB) {
    this.bsp = BSP.difference(bspB, bspA, Polygon3D);
  }

});