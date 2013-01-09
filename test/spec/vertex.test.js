define(['lib/plane', 'lib/vertex'], function(Plane, Vertex) {

    describe('Vertex', function() {

        it('can be created', function() {

            var p = new Vertex(new Plane(1,0,0,0), new Plane(0,1,0,0), new Plane(0,0,1,0));

            assert.throws(function() {
                new Vertex(1,2,3);
            }, Error, 'invalid vertex construction: 1,2,3');

            assert.throws(function() {
                new Vertex(new Plane(1,0,0,0), new Plane(1,0,0,0), new Plane(1,0,0,0));
            }, Error, 'invalid vertex');

        });

        it('can be in front, behind, or on a plane', function() {

            var vertex000 = new Vertex(new Plane(1,0,0,0), new Plane(0,1,0,0), new Plane(0,0,1,0));
            var vertex111 = new Vertex(new Plane(1,0,0,1), new Plane(0,1,0,1), new Plane(0,0,1,1));
            
            assert.equal(vertex000.orientationToPlane(new Plane(0,0,1,-1)), '+');
            assert.equal(vertex000.orientationToPlane(new Plane(0,0,1,1)), '-');

            assert.equal(vertex111.orientationToPlane(new Plane(1,0,0,0)), '+');
            assert.equal(vertex111.orientationToPlane(new Plane(0,1,0,0)), '+');
            assert.equal(vertex111.orientationToPlane(new Plane(0,0,1,0)), '+');
            assert.equal(vertex111.orientationToPlane(new Plane(1,1,1,0)), '+');
            assert.equal(vertex111.orientationToPlane(new Plane(1,1,1,1)), '+');
            assert.equal(vertex111.orientationToPlane(new Plane(1,1,1,3)), '0');
            assert.equal(vertex111.orientationToPlane(new Plane(1,1,1,4)), '-');
            assert.equal(vertex111.orientationToPlane(new Plane(1,1,1,5)), '-');

        })

    })

});