define([
    'lib/world3d', 
    'lib/plane3d', 
    'lib/polygon3d',
    'lib/vertex3d',
  ], function(world3D, Plane3D, Polygon3D, Vertex3D) {

    describe('3D Polygons', function() {

      it('can be constructed from a plane and bounding planes', function() {

        var s = new Plane3D(0,0,1,0);
        var bounding = [
          new Plane3D(1,0,0,1),
          new Plane3D(0,1,0,1),
          new Plane3D(1,0,0,-1),
          new Plane3D(0,1,0,-1)
        ];
        var polygon = new Polygon3D(s, bounding);

        var vertices = polygon.toVertices();
        assert.equal(vertices.length, 4);

        var xy  = new Plane3D(0,0,1, 0),
          x1  = new Plane3D(1,0,0, 1),
          y1  = new Plane3D(0,1,0, 1),
          xmin1 = new Plane3D(1,0,0,-1),
          ymin1 = new Plane3D(0,1,0,-1);

        assert.deepEqual(vertices[0], new Vertex3D(xy, ymin1, x1));
        assert.deepEqual(vertices[1], new Vertex3D(xy, x1,  y1));
        assert.deepEqual(vertices[2], new Vertex3D(xy, y1,  xmin1));
        assert.deepEqual(vertices[3], new Vertex3D(xy, xmin1, ymin1));

      });

      it('can be constructed from a plane', function() {

        var p1a = Polygon3D.fromPlane(new Plane3D(5,-2,1,0));
        var p1b = Polygon3D.fromPlane(new Plane3D(-6,2,-1,0));
        var p2a = Polygon3D.fromPlane(new Plane3D(-6,7,2,0));
        var p2b = Polygon3D.fromPlane(new Plane3D(0,-8,3,0));
        var p3a = Polygon3D.fromPlane(new Plane3D(2,1,9,0));
        var p3b = Polygon3D.fromPlane(new Plane3D(0,1,-2,0));
        var p4  = Polygon3D.fromPlane(new Plane3D(1,1,1,0));

        var xplus = new Plane3D(1,0,0,world3D.bigNumber),
          yplus = new Plane3D(0,1,0,world3D.bigNumber),
          zplus = new Plane3D(0,0,1,world3D.bigNumber),
          xmin  = new Plane3D(-1,0,0,world3D.bigNumber),
          ymin  = new Plane3D(0,-1,0,world3D.bigNumber),
          zmin  = new Plane3D(0,0,-1,world3D.bigNumber);

        assert.deepEqual(p1a, new Polygon3D(
          new Plane3D(5, -2, 1, 0),
          [yplus, zplus, ymin, zmin]
        ));
        assert.deepEqual(p1b, new Polygon3D(
          new Plane3D(-6, 2, -1, 0),
          [yplus, zmin, ymin, zplus]
        ));

        assert.deepEqual(p2a, new Polygon3D(
          new Plane3D(-6, 7, 2, 0),
          [zplus, xplus, zmin, xmin]
        ));
        assert.deepEqual(p2b, new Polygon3D(
          new Plane3D(0, -8, 3, 0),
          [zplus, xmin, zmin, xplus]
        ));

        assert.deepEqual(p3a, new Polygon3D(
          new Plane3D(2, 1, 9, 0),
          [xplus, yplus, xmin, ymin]
        ));
        assert.deepEqual(p3b, new Polygon3D(
          new Plane3D(0, 1, -2, 0),
          [xplus, ymin, xmin, yplus]
        ));

        assert.deepEqual(p4, new Polygon3D(
          new Plane3D(1, 1, 1, 0),
          [yplus, zplus, ymin, zmin]
        ));

      });

      it('can be split by a plane', function() {

        var s = new Plane3D(0,0,1,0);
        var bounding = [
          new Plane3D(1,0,0,1),
          new Plane3D(0,1,0,1),
          new Plane3D(-1,0,0,1),
          new Plane3D(0,-1,0,1)
        ];
        var polygon = new Polygon3D(s, bounding);

        var result1 = polygon.splitBy(new Plane3D(0,0,1,0));
        var result2 = polygon.splitBy(new Plane3D(0,0,-1,0));
        var result3 = polygon.splitBy(new Plane3D(1,0,0,0));

        // Coincident and same orientation
        assert.deepEqual(result1.coincident, polygon);
        assert.isUndefined(result1.back);
        assert.isUndefined(result1.front);

        // Coincident and different orientation
        assert.isUndefined(result2.front);
        assert.isUndefined(result2.back);
        assert.deepEqual(result2.coincident, polygon);

        // Square split by ZY plane
        assert.isTrue(result3.front.equals(new Polygon3D(
          new Plane3D(0, 0, 1, 0),
          [
            new Plane3D(1,  0, 0, 1),
            new Plane3D(0,  1, 0, 1),
            new Plane3D(1,  0, 0, 0),
            new Plane3D(0, -1, 0, 1),
          ]
        )));
      });

    });

  });