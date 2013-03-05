define(['lib/world3d', 'lib/plane3d', 'lib/polygon3d'], function(world3D, Plane3D, Polygon3D) {

    describe('3D Polygons', function() {

        it('can be constructed from a plane and bounding planes', function() {

            var s = new Plane3D(0,0,1,0);
            var bounding = [
                new Plane3D(1,0,0,1),
                new Plane3D(0,1,0,1),
                new Plane3D(1,0,0,-1),
                new Plane3D(0,1,0,-1)
            ];
            var polygon = new Polygon3D(s, bounding);

            var vertices = polygon.toVertices();
            assert.equal(vertices.length, 4);

            var xy    = {a:0,b:0,c:1,d: 0},
                x1    = {a:1,b:0,c:0,d: 1},
                y1    = {a:0,b:1,c:0,d: 1},
                xmin1 = {a:1,b:0,c:0,d:-1},
                ymin1 = {a:0,b:1,c:0,d:-1};

            assert.deepEqual(vertices[0], {p:xy, q:ymin1, r:x1});
            assert.deepEqual(vertices[1], {p:xy, q:x1,    r:y1});
            assert.deepEqual(vertices[2], {p:xy, q:y1,    r:xmin1});
            assert.deepEqual(vertices[3], {p:xy, q:xmin1, r:ymin1});

        });

        it('can be constructed from a plane', function() {

            var p1a = Polygon3D.fromPlane(new Plane3D(5,-2,1,0));
            var p1b = Polygon3D.fromPlane(new Plane3D(-6,2,-1,0));
            var p2a = Polygon3D.fromPlane(new Plane3D(-6,7,2,0));
            var p2b = Polygon3D.fromPlane(new Plane3D(0,-8,3,0));
            var p3a = Polygon3D.fromPlane(new Plane3D(2,1,9,0));
            var p3b = Polygon3D.fromPlane(new Plane3D(0,1,-2,0));
            var p4  = Polygon3D.fromPlane(new Plane3D(1,1,1,0));

            var xplus = {a:1,b:0,c:0,d:world3D.bigNumber},
                yplus = {a:0,b:1,c:0,d:world3D.bigNumber},
                zplus = {a:0,b:0,c:1,d:world3D.bigNumber},
                xmin = {a:-1,b:0,c:0,d:world3D.bigNumber},
                ymin = {a:0,b:-1,c:0,d:world3D.bigNumber},
                zmin = {a:0,b:0,c:-1,d:world3D.bigNumber};

            assert.deepEqual(p1a, {
                s: {a:5, b:-2, c:1, d:0},
                boundingPlanes: [yplus, zplus, ymin, zmin],
            });
            assert.deepEqual(p1b, {
                s: {a:-6, b:2, c:-1, d:0},
                boundingPlanes: [yplus, zmin, ymin, zplus],
            });

            assert.deepEqual(p2a, {
                s: {a:-6, b:7, c:2, d:0},
                boundingPlanes: [zplus, xplus, zmin, xmin],
            });
            assert.deepEqual(p2b, {
                s: {a:0, b:-8, c:3, d:0},
                boundingPlanes: [zplus, xmin, zmin, xplus],
            });

            assert.deepEqual(p3a, {
                s: {a:2, b:1, c:9, d:0},
                boundingPlanes: [xplus, yplus, xmin, ymin],
            });
            assert.deepEqual(p3b, {
                s: {a:0, b:1, c:-2, d:0},
                boundingPlanes: [xplus, ymin, xmin, yplus],
            });

            assert.deepEqual(p4, {
                s: {a:1, b:1, c:1, d:0},
                boundingPlanes: [yplus, zplus, ymin, zmin],
            });

        });

        it('can be split by a plane', function() {

            var s = new Plane3D(0,0,1,0);
            var bounding = [
                new Plane3D(1,0,0,1),
                new Plane3D(0,1,0,1),
                new Plane3D(-1,0,0,1),
                new Plane3D(0,-1,0,1)
            ];
            var polygon = new Polygon3D(s, bounding);

            var result1 = polygon.splitBy(new Plane3D(0,0,1,0));
            var result2 = polygon.splitBy(new Plane3D(0,0,-1,0));
            var result3 = polygon.splitBy(new Plane3D(1,0,0,0));

            // Coincident and same orientation
            assert.deepEqual(result1.coincident, polygon);
            assert.isUndefined(result1.back);
            assert.isUndefined(result1.front);

            // Coincident and different orientation
            assert.isUndefined(result2.front);
            assert.isUndefined(result2.back);
            assert.deepEqual(result2.coincident, polygon);

            // Square split by ZY plane
            assert.deepEqual(result3.front, {
                s: {a: 0, b: 0, c: 1, d: 0},
                boundingPlanes: [
                    {a: 1, b: 0, c: 0, d: 1},
                    {a: 0, b: 1, c: 0, d: 1},
                    {a: 1, b: 0, c: 0, d: 0},
                    {a: 0, b:-1, c: 0, d: 1}
                ]
            });
        });

    });

});