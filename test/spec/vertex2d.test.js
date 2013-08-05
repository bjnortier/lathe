define(['lib/plane2d', 'lib/vertex2d'], function(Plane2D, Vertex3D) {

  describe('2D Vertex', function() {

    it('can be created', function() {

      var p = new Vertex3D(new Plane2D(1,0,0), new Plane2D(0,1,0));

      assert.throws(function() {
        new Vertex3D(1,2);
      }, Error, 'invalid vertex construction: 1,2');

      assert.throws(function() {
        new Vertex3D(new Plane2D(1,0,0), new Plane2D(1,0,0));
      }, Error, 'invalid vertex');

    });

    it('can be in front, behind, or on a plane', function() {

      var vertex00 = new Vertex3D(new Plane2D(1,0,0), new Plane2D(0,1,0));
      var vertex11 = new Vertex3D(new Plane2D(1,0,1), new Plane2D(0,1,1));
      
      assert.equal(vertex00.orientationToPlane(new Plane2D(1,1,1)), '-');
      assert.equal(vertex00.orientationToPlane(new Plane2D(-1,-1,-1)), '+');

      assert.equal(vertex00.orientationToPlane(new Plane2D(-1,-1,1)), '-');
      assert.equal(vertex00.orientationToPlane(new Plane2D(1,1,-1)), '+');

      assert.equal(vertex11.orientationToPlane(new Plane2D(0,1,1)), '0');
      assert.equal(vertex11.orientationToPlane(new Plane2D(1,0,1)), '0');
      assert.equal(vertex11.orientationToPlane(new Plane2D(1,1,2)), '0');

    })

    it('can generate coordinates', function() {

      assert.deepEqual(
        new Vertex3D(new Plane2D(1,0,1), new Plane2D(0,1,1)).toCoordinate(), 
        {x:1, y:1});

      assert.deepEqual(
        new Vertex3D(new Plane2D(-1,0,2), new Plane2D(0,1,1)).toCoordinate(), 
        {x:-2, y:1});

      assert.deepEqual(
        new Vertex3D(new Plane2D(0,1,0.5), new Plane2D(1,0,0.5)).toCoordinate(), 
        {x:0.5, y:0.5});

      assert.deepEqual(
        new Vertex3D(new Plane2D(2,3,9), new Plane2D(-1, 1, -2)).toCoordinate(), 
        {x:3, y:1});

      assert.deepEqual(
        new Vertex3D(new Plane2D(1,2,4), new Plane2D(3, -5, 1)).toCoordinate(), 
        {x:2, y:0.9999999999999999});

    })
    

  })

});