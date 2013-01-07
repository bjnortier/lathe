define(['lib/plane'], function(Plane) {

    describe('Planes', function() {

        it('can be created', function() {

            var plane = new Plane(1,2,3,4);
            assert.equal(1, plane.a);
            assert.equal(2, plane.b);
            assert.equal(3, plane.c);
            assert.equal(4, plane.d);

        });

        it('can be tested for coincidence', function() {

            var a = new Plane(0,0,1,0);
            var b = new Plane(0,0,1,0);
            var c = new Plane(0,0,1,1);
            var d = new Plane(0,0,-1,-1);

            assert.isTrue(a.isCoincident(b));
            assert.isFalse(a.isCoincident(c));
            assert.isTrue(c.isCoincident(d));

            assert.isTrue(a.isCoincidentAndSameOrientation(b));
            assert.isFalse(c.isCoincidentAndSameOrientation(d));

        })

    })

});