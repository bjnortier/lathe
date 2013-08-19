define(['lib/plane2d'], function(Plane) {

  describe('2D Planes', function() {

    it('can be created', function() {

      var plane = new Plane(1,2,3);
      assert.equal(1, plane.a);
      assert.equal(2, plane.b);
      assert.equal(3, plane.c);

    });

    it('are immutable', function() {

      var plane1 = new Plane(1,2,3);
      plane1.a = 5;
      plane1.b = 6;
      plane1.c = 7;
      assert.equal(1, plane1.a);
      assert.equal(2, plane1.b);
      assert.equal(3, plane1.c);

    });

    it('can be tested for coincidence and orientation', function() {

      var a = new Plane(1,1,1);
      var b = new Plane(2,2,2);
      var c = new Plane(-1,-1,0.9);
      var d = new Plane(1,1,-0.9);

      assert.isTrue(a.isCoincident(b));
      assert.isFalse(a.isCoincident(c));
      assert.isTrue(c.isCoincident(d));

      assert.isTrue(a.isSameOrientation(b));
      assert.isFalse(c.isSameOrientation(d));

    });

  })

});