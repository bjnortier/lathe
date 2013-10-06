define(['lib/plane3d'], function(Plane3D) {

  describe('3D Planes', function() {

    it('can be created', function() {

      var plane = new Plane3D(1,2,3,4);
      assert.equal(1, plane.a);
      assert.equal(2, plane.b);
      assert.equal(3, plane.c);
      assert.equal(4, plane.d);

    });

    it.skip('are immutable', function() {

      var plane1 = new Plane3D(1,2,3,4);
      plane1.a = 5;
      plane1.b = 6;
      plane1.c = 7;
      plane1.d = 8;
      assert.equal(1, plane1.a);
      assert.equal(2, plane1.b);
      assert.equal(3, plane1.c);
      assert.equal(4, plane1.d);

    });

    it('can be tested for coincidence and orientation', function() {

      var a = new Plane3D(0,0,1,0);
      var b = new Plane3D(0,0,1,0);
      var c = new Plane3D(0,0,1,1);
      var d = new Plane3D(0,0,-1,-1);

      assert.isTrue(a.isCoincident(b));
      assert.isFalse(a.isCoincident(c));
      assert.isTrue(c.isCoincident(d));

      assert.isTrue(a.isSameOrientation(b));
      assert.isFalse(c.isSameOrientation(d));

    });

  });

});