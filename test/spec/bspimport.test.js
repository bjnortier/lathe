define(['lib/line2d', 'lib/plane2d', 'lib/bspimport'], function(Line2D, Plane2D, BSPImport) {

  describe('2D Planes', function() {

    it.only('can inport 2D faces (lines) into a BSP', function() {

      var lines = [
        new Line2D(new Plane2D(0,-1,-1),[new Plane2D(1,1,12),new Plane2D(-1,0,-1)]),
        new Line2D(new Plane2D(1,1,12),[new Plane2D(0,-1,-1),new Plane2D(-1,0,-1)]),
        new Line2D(new Plane2D(-1,0,-1),[new Plane2D(0,-1,-1),new Plane2D(1,1,12)]),
      ];

      var bsp = BSPImport.fromLines(lines);

      assert.isObject(bsp);
    });

  });

});