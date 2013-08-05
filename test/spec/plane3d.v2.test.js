define(['lib/planes3d.v2', 'lib/plane3d.v2'], function(Planes3D) {

  describe('3D Planes', function() {

    it('can be created', function() {

      var planes = new Planes3D();
      var planeIndex = planes.add(1,2,3,4);
      var plane = planes.get(planeIndex);

      assert.equal(plane.a, 1);
      assert.equal(plane.b, 2);
      assert.equal(plane.c, 3);
      assert.equal(plane.d, 4);

    });
    
    it('are immutable', function() {

      var planes = new Planes3D();
      var planeIndex = planes.add(1,2,3,4);
      var plane = planes.get(planeIndex);

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

      var planes = new Planes3D();
      var indices = [];
      var i, n = 65;

      for (i = 0; i < n; ++i) {
        indices.push(planes.add(i,i*2,i*3,i*4));
      }

      for (i = 0; i < n; ++i) {
        var plane = planes.get(indices[i]);
        assert.equal(plane.a, i);
        assert.equal(plane.b, i*2);
        assert.equal(plane.c, i*3);
        assert.equal(plane.d, i*4);
      }

    });

  });

});