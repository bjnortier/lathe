define(['lib/plane', 'lib/point'], function(Plane, Point) {

    describe('Points', function() {

        it('can be created', function() {

            var p = new Point(new Plane(1,0,0,0), new Plane(0,1,0,0), new Plane(0,0,1,0));

            assert.throws(function() {
                new Point(1,2,3);
            }, Error, 'invalid point construction: 1,2,3');

            assert.throws(function() {
                new Point(new Plane(1,0,0,0), new Plane(1,0,0,0), new Plane(1,0,0,0));
            }, Error, 'invalid point');

        });

        it('can be in front, behind, or on a plane', function() {

            var point000 = new Point(new Plane(1,0,0,0), new Plane(0,1,0,0), new Plane(0,0,1,0));
            var point111 = new Point(new Plane(1,0,0,1), new Plane(0,1,0,1), new Plane(0,0,1,1));
            
            assert.equal(point000.orientationToPlane(new Plane(0,0,1,-1)), 1);
            assert.equal(point000.orientationToPlane(new Plane(0,0,1,1)), -1);

            assert.equal(point111.orientationToPlane(new Plane(1,0,0,0)), 1);
            assert.equal(point111.orientationToPlane(new Plane(0,1,0,0)), 1);
            assert.equal(point111.orientationToPlane(new Plane(0,0,1,0)), 1);

            assert.equal(point111.orientationToPlane(new Plane(1,1,1,0)), 1);
            assert.equal(point111.orientationToPlane(new Plane(1,1,1,1)), 1);
            assert.equal(point111.orientationToPlane(new Plane(1,1,1,3)), 0);
            assert.equal(point111.orientationToPlane(new Plane(1,1,1,4)), -1);
            assert.equal(point111.orientationToPlane(new Plane(1,1,1,5)), -1);

        })

    })

});