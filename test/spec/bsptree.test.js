define(['lib/plane', 'lib/polygon', 'lib/bsptree'], function(Plane3D, Polygon3D, BspTree) {

    describe('BSPTree', function() {

        it('can be created from polygons', function() {

            var p1 = new Polygon3D(
                new Plane3D(0,0,-1,0), [new Plane3D(0,-1,0,0),new Plane3D(-1,0,0,0),new Plane3D(1,1,0,10)]);
            var p2 = new Polygon3D(
                new Plane3D(0,-1,0,0), [new Plane3D(0,0,-1,0),new Plane3D(1,0,1,10),new Plane3D(-1,0,0,0)]);
            var p3 = new Polygon3D(
                new Plane3D(-1,0,0,0), [new Plane3D(0,-1,0,0),new Plane3D(0,1,1,10),new Plane3D(0,0,-1,0)]);
            var p4 = new Polygon3D(
                new Plane3D(1,1,1,10), [new Plane3D(0,-1,0,0),new Plane3D(0,0,-1,0),new Plane3D(-1,0,0,0)]);
    
            var tree = BspTree.fromPolygons([p1,p2,p3,p4]);

            assert.isUndefined(tree.front);
            assert.isObject(tree.back);
            assert.isUndefined(tree.back.front);
            assert.isObject(tree.back.back);
            assert.isUndefined(tree.back.back.front);
            assert.isObject(tree.back.back.back);
            assert.isUndefined(tree.back.back.back.front);
            assert.isUndefined(tree.back.back.back.back);

            
        });

    });

});