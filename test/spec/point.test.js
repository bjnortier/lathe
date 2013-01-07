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

    })

});