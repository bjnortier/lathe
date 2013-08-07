define(['lib/plane3dcreator.v2'], function(Plane3DCreator) {

  describe('3D Planes', function() {

    it('can be created', function() {

      var planeCreator = new Plane3DCreator();
      var planeIndex = planeCreator.create(1,2,3,4);
      var plane = planeCreator.get(planeIndex);

      assert.equal(plane.a, 1);
      assert.equal(plane.b, 2);
      assert.equal(plane.c, 3);
      assert.equal(plane.d, 4);

    });
    
    it('are immutable', function() {

      var planeCreator = new Plane3DCreator();
      var planeIndex = planeCreator.create(1,2,3,4);
      var plane = planeCreator.get(planeIndex);

      plane[0] = 5;
      plane[1] = 6;
      plane[2] = 7;
      plane[3] = 8;

      assert.equal(plane.a, 1);
      assert.equal(plane.b, 2);
      assert.equal(plane.c, 3);
      assert.equal(plane.d, 4);

    });

    it('can grow in size', function() {

      var planeCreator = new Plane3DCreator();
      var indices = [];
      var i, n = 65;

      for (i = 0; i < n; ++i) {
        indices.push(planeCreator.create(i,i*2,i*3,i*4));
      }

      for (i = 0; i < n; ++i) {
        var plane = planeCreator.get(indices[i]);
        assert.equal(plane.a, i);
        assert.equal(plane.b, i*2);
        assert.equal(plane.c, i*3);
        assert.equal(plane.d, i*4);
      }

    });

  });

});