define(['lib/plane2d', 'lib/polygon2d'], function(Plane2D, Polygon2D) {

    describe('2D Polygons', function() {

        it('can be constructed from a plane and bounding planes', function() {

            var bounding = [
                new Plane2D(1,0,0),
                new Plane2D(0,1,0),
                new Plane2D(1,1,1),
            ];
            var polygon = new Polygon2D(bounding);

            var vertices = polygon.toVertices();
            assert.equal(vertices.length, 3);

            var xy    = {a:1,b:1,c:1};
            var x0    = {a:1,b:0,c:0};
            var y0    = {a:0,b:1,c:0};

            assert.deepEqual(vertices[0], {p:xy, q:x0});
            assert.deepEqual(vertices[1], {p:x0, q:y0});
            assert.deepEqual(vertices[2], {p:y0, q:xy});

        });

        // it('can be constructed from a plane', function() {

        //     var p1a = new Polygon2D().fromPlane(new Plane2D(5,-2,1,0));
        //     var p1b = new Polygon2D().fromPlane(new Plane2D(-6,2,-1,0));
        //     var p2a = new Polygon2D().fromPlane(new Plane2D(-6,7,2,0));
        //     var p2b = new Polygon2D().fromPlane(new Plane2D(0,-8,3,0));
        //     var p3a = new Polygon2D().fromPlane(new Plane2D(2,1,9,0));
        //     var p3b = new Polygon2D().fromPlane(new Plane2D(0,1,-2,0));
        //     var p4 = new Polygon2D().fromPlane(new Plane2D(1,1,1,0));

        //     var xplus = {a:1,b:0,c:0,d:1000000},
        //         yplus = {a:0,b:1,c:0,d:1000000},
        //         zplus = {a:0,b:0,c:1,d:1000000},
        //         xmin = {a:-1,b:0,c:0,d:1000000},
        //         ymin = {a:0,b:-1,c:0,d:1000000},
        //         zmin = {a:0,b:0,c:-1,d:1000000};

        //     assert.deepEqual(p1a, {
        //         s: {a:5, b:-2, c:1, d:0},
        //         boundingPlanes: [yplus, zplus, ymin, zmin],
        //     });
        //     assert.deepEqual(p1b, {
        //         s: {a:-6, b:2, c:-1, d:0},
        //         boundingPlanes: [yplus, zmin, ymin, zplus],
        //     });

        //     assert.deepEqual(p2a, {
        //         s: {a:-6, b:7, c:2, d:0},
        //         boundingPlanes: [zplus, xplus, zmin, xmin],
        //     });
        //     assert.deepEqual(p2b, {
        //         s: {a:0, b:-8, c:3, d:0},
        //         boundingPlanes: [zplus, xmin, zmin, xplus],
        //     });

        //     assert.deepEqual(p3a, {
        //         s: {a:2, b:1, c:9, d:0},
        //         boundingPlanes: [xplus, yplus, xmin, ymin],
        //     });
        //     assert.deepEqual(p3b, {
        //         s: {a:0, b:1, c:-2, d:0},
        //         boundingPlanes: [xplus, ymin, xmin, yplus],
        //     });

        //     assert.deepEqual(p4, {
        //         s: {a:1, b:1, c:1, d:0},
        //         boundingPlanes: [yplus, zplus, ymin, zmin],
        //     });

        // });

        // it('can be split by a plane', function() {

        //     var s = new Plane2D(0,0,1,0);
        //     var bounding = [
        //         new Plane2D(1,0,0,1),
        //         new Plane2D(0,1,0,1),
        //         new Plane2D(-1,0,0,1),
        //         new Plane2D(0,-1,0,1)
        //     ];
        //     var polygon = new Polygon2D(s, bounding);

        //     var result1 = polygon.splitBy(new Plane2D(0,0,1,0));
        //     var result2 = polygon.splitBy(new Plane2D(0,0,-1,0));
        //     var result3 = polygon.splitBy(new Plane2D(1,0,0,0));

        //     // Coincident and same orientation
        //     assert.deepEqual(result1.front, polygon);
        //     assert.isUndefined(result1.back);
        //     // Coincident and different orientation
        //     assert.isUndefined(result2.front);
        //     assert.deepEqual(result2.back, polygon);
        //     // Square split by ZY plane
        //     assert.deepEqual(result3.front, {
        //         s: {a: 0, b: 0, c: 1, d: 0},
        //         boundingPlanes: [
        //             {a: 1, b: 0, c: 0, d: 1},
        //             {a: 0, b: 1, c: 0, d: 1},
        //             {a: 1, b: 0, c: 0, d: 0},
        //             {a: 0, b:-1, c: 0, d: 1}
        //         ]
        //     });
        // });

    });

});