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

    var createConvexTree = function(planes, region) {
        if (planes.length) {
            var hyperplane = planes[0];
            var splits = region.splitBy(hyperplane);
            var frontNode = new Cell('+', false, splits.front);
            var backNode = createConvexTree(planes.slice(1), splits.back);
            var node = new Node(region, hyperplane, backNode, frontNode);
            return node;
        } else {
            return new Cell('-', true, region);
        }
    }

    var t1 = createConvexTree(
        [new Plane3D(0,0,-1,0), new Plane3D(0,-1,0,0), new Plane3D(-1,0,0,0), new Plane3D(1,1,1,10)], 
        worldRegion);
    var t2 = createConvexTree(
        [new Plane3D(0,0,-1,-1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,4)],
        worldRegion);

    new BSPTree3DExample(t1, t2, BSP2D.intersection);
    new BSPTree3DExample(t1, t2, BSP2D.union);
    new BSPTree3DExample(t1, t2, BSP2D.difference);

    var t3 = createConvexTree(
        [new Plane3D(0,0,-1,0), new Plane3D(1,-1,1,10), new Plane3D(-1,-1,1,10), new Plane3D(-1,1,1,10), new Plane3D(1,1,1,10)], 
        worldRegion);
    var t4 = createConvexTree(
        [new Plane3D(0,0,-1,1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,5)],
        worldRegion);
    
    new BSPTree3DExample(t3, t4, BSP2D.intersection);
    new BSPTree3DExample(t3, t4, BSP2D.difference);
    // new BSPTree3DExample(t3, t4, BSP2D.union);

});
