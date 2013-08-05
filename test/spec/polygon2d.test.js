define([
    'lib/plane2d', 
    'lib/vertex2d', 
    'lib/polygon2d'
  ], function(Plane2D, Vertex2D,  Polygon2D) {

  describe('2D Polygons', function() {

    it('can be constructed from a plane and bounding planes', function() {

      var bounding = [
        new Plane2D(1,0,0),
        new Plane2D(0,1,0),
        new Plane2D(1,1,1),
      ];
      var polygon = new Polygon2D(bounding);

      var vertices = polygon.toVertices();
      assert.equal(vertices.length, 3);

      var xy = new Plane2D(1,1,1);
      var x0 = new Plane2D(1,0,0);
      var y0 = new Plane2D(0,1,0);

      assert.deepEqual(vertices[0], new Vertex2D(xy, x0));
      assert.deepEqual(vertices[1], new Vertex2D(x0, y0));
      assert.deepEqual(vertices[2], new Vertex2D(y0, xy));

    });

    it('can be split by a plane', function() {

      var bounding = [
        new Plane2D(1,0,1),
        new Plane2D(0,1,1),
        new Plane2D(1,0,-1),
        new Plane2D(0,1,-1)
      ];
      var polygon = new Polygon2D(bounding);

      var result1 = polygon.splitBy(new Plane2D(1,0,-1));
      var result2 = polygon.splitBy(new Plane2D(1,0,1));
      var result3 = polygon.splitBy(new Plane2D(1,0,0));

      // Coincident and same orientation
      assert.deepEqual(result1.front, polygon);
      assert.isUndefined(result1.back);

      // Coincident and different orientation
      assert.isUndefined(result2.front);
      assert.deepEqual(result2.back, polygon);

      // Square split by y=0 plane
      assert.deepEqual(result3.front, new Polygon2D(
        [
          new Plane2D(1, 0,  1),
          new Plane2D(0, 1,  1),
          new Plane2D(1, 0,  0),
          new Plane2D(0, 1, -1),
        ]));
    });

  });

});