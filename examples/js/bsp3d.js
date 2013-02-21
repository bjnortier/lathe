requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/plane3d',
        'lib/region3d',
        'lib/bsp2d',
        'examples/js/bsptree3dexample',
    ], 
    function(
        Plane3D,
        Region3D,
        BSP2D,
        BSPTree3DExample) {

    var Node = BSP2D.Node;
    var Cell = BSP2D.Cell;
    var worldRegion = Region3D.world;

    var createConvexTree = function(labels, planes, region) {
        if (planes.length) {
            var splits = region.splitBy(planes[0]);
            var frontNode = new Cell('+', false, splits.front);
            var backNode = createConvexTree(labels.slice(1), planes.slice(1), splits.back);
            return new Node(labels[0], region, planes[0], backNode, frontNode);
        } else {
            return new Cell('-', true, region);
        }
    }

    var t1 = createConvexTree(
        ['0', '1', '2', '3'], 
        [new Plane3D(0,0,-1,0), new Plane3D(0,-1,0,0), new Plane3D(-1,0,0,0), new Plane3D(1,1,1,10)], 
        worldRegion);
    var t2 = createConvexTree(
        ['a', 'b', 'c', 'd', 'e', 'f'],
        [new Plane3D(0,0,-1,-1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,4)],
        worldRegion);

    // new BSPTree3DExample(t1, t2, BSP2D.intersection);
    // new BSPTree3DExample(t1, t2, BSP2D.union);
    // new BSPTree3DExample(t1, t2, BSP2D.difference);

    var t3 = createConvexTree(
        ['0', '1', '2', '3', '4'], 
        [new Plane3D(0,0,-1,0), new Plane3D(1,-1,1,10), new Plane3D(-1,-1,1,10), new Plane3D(-1,1,1,10), new Plane3D(1,1,1,10)], 
        worldRegion);
    var t4 = createConvexTree(
        ['a', 'b', 'c', 'd', 'e', 'f'],
        [new Plane3D(0,0,-1,1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,5)],
        worldRegion);
    
    // new BSPTree3DExample(t3, t4, BSP2D.intersection);
    new BSPTree3DExample(t3, t4, BSP2D.union);
    // new BSPTree3DExample(t3, t4, BSP2D.difference);

});
