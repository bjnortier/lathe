define(['lib/plane3d', 'lib/vertex3d'], function(Plane3D, Vertex3D) {

    describe('3D Vertex', function() {

        it('can be created', function() {

            var p = new Vertex3D(new Plane3D(1,0,0,0), new Plane3D(0,1,0,0), new Plane3D(0,0,1,0));

            try {
                new Vertex3D(1,2,3);
                assert.fail();
            } catch (e) {
                assert.equal(e.message, 'invalid vertex construction: 1,2,3');
                assert.equal(e.name, 'InvalidVertex');
            }

            try {
                new Vertex3D(new Plane3D(1,0,0,0), new Plane3D(1,0,0,0), new Plane3D(1,0,0,0));
                assert.fail();
            } catch (e) {
                assert.equal(e.name, 'InvalidVertex');
            }

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

        })

        it('can generate coordinates', function() {
            assert.deepEqual(
                new Vertex3D(new Plane3D(1,0,0,1), new Plane3D(0,1,0,1), new Plane3D(0,0,1,1)).toCoordinate(), 
                {x:1, y:1, z:1});

            assert.deepEqual(
                new Vertex3D(new Plane3D(-1,0,0,2), new Plane3D(0,1,0,1), new Plane3D(0,0,1,1)).toCoordinate(), 
                {x:-2, y:1, z:1});

            assert.deepEqual(
                new Vertex3D(new Plane3D(1,1,1,1), new Plane3D(0,1,0,0), new Plane3D(0,0,1,0)).toCoordinate(), 
                {x:1, y:0, z:0});

            assert.deepEqual(
                new Vertex3D(new Plane3D(1,1,1,1), new Plane3D(0,1,0,0.5), new Plane3D(0,0,1,0.5)).toCoordinate(), 
                {x:0, y:0.5, z:0.5});

            assert.deepEqual(
                new Vertex3D(new Plane3D(1,1,1,1), new Plane3D(0,1,0,0.5), new Plane3D(0,0,1,0.5)).toCoordinate(), 
                {x:0, y:0.5, z:0.5});

            assert.deepEqual(
                new Vertex3D(new Plane3D(0,1,0,5), new Plane3D(0,0,1,100), new Plane3D(1,0,0,100)).toCoordinate(), 
                {x:100, y:5, z:100});
        })
        

    })

});