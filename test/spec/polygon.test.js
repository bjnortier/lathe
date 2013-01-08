define(['lib/plane', 'lib/polygon'], function(Plane, Polygon) {

    describe('Polygons', function() {

        it('can be constructed from a plane and bounding planes', function() {

            var h = new Plane(0,0,1,0);
            var bounding = [
                new Plane(1,0,0,1),
                new Plane(0,1,0,1),
                new Plane(1,0,0,-1),
                new Plane(0,1,0,-1)
            ];
            var polygon = new Polygon(h, bounding);

            var vertices = polygon.toVertices();
            assert.equal(vertices.length, 4);

            var xy    = {a:0,b:0,c:1,d: 0},
                x1    = {a:1,b:0,c:0,d: 1},
                y1    = {a:0,b:1,c:0,d: 1},
                xmin1 = {a:1,b:0,c:0,d:-1},
                ymin1 = {a:0,b:1,c:0,d:-1};

            assert.deepEqual(vertices[0], [xy, ymin1,    x1]);
            assert.deepEqual(vertices[1], [xy,    x1,    y1]);
            assert.deepEqual(vertices[2], [xy,    y1, xmin1]);
            assert.deepEqual(vertices[3], [xy, xmin1, ymin1]);

        });

        it.skip('can be constructed from a plane', function() {

            var h = new Plane(0,0,1,0);
            var p1 = new Polygon().fromPlane(h);


        })

    });

});