define([
    'lib/plane3d', 
    'lib/vertex3d',
    'lib/vector3',
  ], function(
    Plane3D, 
    Vertex3D,
    Vec3) {

    describe('3D Vertex', function() {

      it('can be created', function() {

        new Vertex3D(new Plane3D(1,0,0,0), new Plane3D(0,1,0,0), new Plane3D(0,0,1,0));

        try {
          new Vertex3D(1,2,3);
          assert.fail();
        } catch (e) {
          assert.equal(e.message, 'invalid vertex construction: 1,2,3');
          assert.equal(e.name, 'InvalidVertex');
        }

      });

      it('can test for validity', function() {

        var v1 = new Vertex3D(new Plane3D(1,0,0,0), new Plane3D(1,0,0,0), new Plane3D(1,0,0,0));
        assert.isFalse(v1.isValid());

      });

      it('can be in front, behind, or on a plane', function() {

        var vertex000 = new Vertex3D(new Plane3D(1,0,0,0), new Plane3D(0,1,0,0), new Plane3D(0,0,1,0));
        var vertex111 = new Vertex3D(new Plane3D(1,0,0,1), new Plane3D(0,1,0,1), new Plane3D(0,0,1,1));
        
        assert.equal(vertex000.orientationToPlane(new Plane3D(0,0,1,-1)), '+');
        assert.equal(vertex000.orientationToPlane(new Plane3D(0,0,1,1)), '-');

        assert.equal(vertex111.orientationToPlane(new Plane3D(1,0,0,0)), '+');
        assert.equal(vertex111.orientationToPlane(new Plane3D(0,1,0,0)), '+');
        assert.equal(vertex111.orientationToPlane(new Plane3D(0,0,1,0)), '+');
        assert.equal(vertex111.orientationToPlane(new Plane3D(1,1,1,0)), '+');
        assert.equal(vertex111.orientationToPlane(new Plane3D(1,1,1,1)), '+');
        assert.equal(vertex111.orientationToPlane(new Plane3D(1,1,1,3)), '0');
        assert.equal(vertex111.orientationToPlane(new Plane3D(1,1,1,4)), '-');
        assert.equal(vertex111.orientationToPlane(new Plane3D(1,1,1,5)), '-');

      });

      it('can generate coordinates', function() {
        assert.deepEqual(
          new Vertex3D(new Plane3D(1,0,0,1), new Plane3D(0,1,0,1), new Plane3D(0,0,1,1)).toCoordinate(), 
          new Vec3(1, 1, 1));

        assert.deepEqual(
          new Vertex3D(new Plane3D(-1,0,0,2), new Plane3D(0,1,0,1), new Plane3D(0,0,1,1)).toCoordinate(), 
          new Vec3(-2, 1, 1));

        assert.deepEqual(
          new Vertex3D(new Plane3D(1,1,1,1), new Plane3D(0,1,0,0), new Plane3D(0,0,1,0)).toCoordinate(), 
          new Vec3(1, 0, 0));

        assert.deepEqual(
          new Vertex3D(new Plane3D(1,1,1,1), new Plane3D(0,1,0,0.5), new Plane3D(0,0,1,0.5)).toCoordinate(), 
          new Vec3(0, 0.5, 0.5));

        assert.deepEqual(
          new Vertex3D(new Plane3D(1,1,1,1), new Plane3D(0,1,0,0.5), new Plane3D(0,0,1,0.5)).toCoordinate(), 
          new Vec3(0, 0.5, 0.5));

        assert.deepEqual(
          new Vertex3D(new Plane3D(0,1,0,5), new Plane3D(0,0,1,100), new Plane3D(1,0,0,100)).toCoordinate(), 
          new Vec3(100, 5, 100));
      });

    });

  });