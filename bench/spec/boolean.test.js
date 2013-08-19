define([
    'lib/polygon3d',
    'lib/bsp',
    'lib/conv',
    'lib/primitives/cube',
    'lib/primitives/sphere',
    './time',
  ], function(Polygon3D, BSP, Conv, Cube, Sphere, time) {

  describe('Boolean benchmarks', function() {

    it('sphere & cube', function() {

      console.log('\nsphere & cube:')

      var sphere = time(function() { 
        return new Sphere({x: 0, y: 0, z: 0, r: 5});
      }, 'create sphere:\t');
   
      var cube = time(function() { 
        return new Cube({x: -8, y: -8, z: -8, w: 10, d: 10, h: 10});
      }, 'create cube:\t');

      ['union', 'intersection', 'difference'].forEach(function(op) {
        var diff = time(function() { 
          return BSP[op](cube.bsp, sphere.bsp, Polygon3D)
        }, op.slice(0,5) + ' bool:\t', 5);

        time(function() { 
          return Conv.bspToBrep(diff);
        }, op.slice(0,5) + ' brep:\t', 5);
      });


    });

  });

});