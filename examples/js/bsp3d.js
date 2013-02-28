requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/plane3d',
        'lib/polygon3d',
        'lib/region3d',
        'lib/bsp',
        'examples/js/bsptree3dexample',
    ], 
    function(
        Plane3D,
        Polygon3D,
        Region3D,
        BSP2D,
        BSPTree3DExample) {

    var Node = BSP2D.Node;
    var Cell = BSP2D.Cell;
    var worldRegion = Region3D.world;

    var createConvexTree = function(i, planes, region) {
        if (i < planes.length) {
            var hyperplane = planes[i];
            var splits = region.splitBy(hyperplane);
            var frontNode = new Cell('+', false, splits.front);
            var backNode = createConvexTree(i + 1, planes, splits.back);
            var node = new Node(region, hyperplane, backNode, frontNode);
            // var boundary = Polygon3D.fromPlane(hyperplane);
            // var shp = Polygon3D.fromPlane(hyperplane);
            // for (var j = 0; j < planes.length; ++j) {
            //     if (j < i) {
            //         var splits = shp.splitBy(planes[j]);
            //         if (splits.back) {
            //             shp = splits.back;
            //         }
            //     }
            //     if (j !== i) {
            //         var splits = boundary.splitBy(planes[j]);
            //         if (splits.back) {
            //             boundary = splits.back;
            //         }
            //     }
            // }
            // node.shp = shp;
            // node.boundary = boundary;
            return node;
        } else {
            return new Cell('-', true, region);
        }
    }

    var t1 = createConvexTree(
        0,
        [new Plane3D(0,0,-1,0), new Plane3D(0,-1,0,0), new Plane3D(-1,0,0,0), new Plane3D(1,1,1,10)], 
        worldRegion);
    var t2 = createConvexTree(
        0,
        [new Plane3D(0,0,-1,-1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,4)],
        worldRegion);

    // var t2 = createConvexTree(
    //     0,
    //     [
    //         new Plane3D(0,0,-1,0), 
    //         new Plane3D(0,0,1,5), 
    //         new Plane3D(1,0,0,5), 
    //         new Plane3D(-1,0,0,5), 
    //         new Plane3D(0,1,0,5), 
    //         new Plane3D(0,-1,0,5), 
    //         // new Plane3D(1,-1,1,3),
    //         new Plane3D(1,1,0,0),
    //     ],
    //     worldRegion);

    new BSPTree3DExample(t1, t2, BSP2D.intersection);
    // new BSPTree3DExample(t1, t2, BSP2D.union);
    // new BSPTree3DExample(t1, t2, BSP2D.difference);

    // var t3 = createConvexTree(
    //     ['0', '1', '2', '3', '4'], 
    //     [new Plane3D(0,0,-1,0), new Plane3D(1,-1,1,10), new Plane3D(-1,-1,1,10), new Plane3D(-1,1,1,10), new Plane3D(1,1,1,10)], 
    //     worldRegion);
    // var t4 = createConvexTree(
    //     ['a', 'b', 'c', 'd', 'e', 'f'],
    //     [new Plane3D(0,0,-1,1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,5)],
    //     worldRegion);
    
    // new BSPTree3DExample(t3, t4, BSP2D.intersection);
    // new BSPTree3DExample(t3, t4, BSP2D.difference);
    // new BSPTree3DExample(t3, t4, BSP2D.union);

});
