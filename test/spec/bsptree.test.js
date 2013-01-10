define(['lib/plane', 'lib/polygon', 'lib/bsptree'], function(Plane, Polygon, BspTree) {

    describe('BSPTree', function() {

        it.only('can be created from polygons', function() {

            var p1 = new Polygon(
                new Plane(0,0,-1,0), [new Plane(0,-1,0,0),new Plane(1,1,0,1),new Plane(-1,0,0,0)]);
            var p2 = new Polygon(
                new Plane(0,-1,0,0), [new Plane(0,0,-1,0),new Plane(1,0,1,1),new Plane(-1,0,0,0)]);
            var p3 = new Polygon(
                new Plane(-1,0,0,0), [new Plane(0,-1,0,0),new Plane(0,1,1,1),new Plane(0,0,-1,0)]);

            var tree = BspTree.fromPolygons([p1,p2,p3]);

            assert.isUndefined(tree.front);
            assert.isObject(tree.back);
            assert.isUndefined(tree.back.front);
            assert.isObject(tree.back.back);
            assert.isUndefined(tree.back.back.front);
            assert.isUndefined(tree.back.back.back);

            
        });

    });

});