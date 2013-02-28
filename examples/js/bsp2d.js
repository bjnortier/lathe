requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/plane2d',
        'lib/polygon2d',
        'lib/bsp',
        'examples/js/bsptree2dexample',
    ], 
    function(
        Plane2D,
        Polygon2D,
        BSP2D,
        BSPTree2DExample) {

    var Node = BSP2D.Node;
    var Cell = BSP2D.Cell;
    var worldRegion = Polygon2D.world;

    var createConvexTree = function(planes, region) {
        if (planes.length) {
            var splits = region.splitBy(planes[0]);
            var frontNode = new Cell('+', false, splits.front);
            var backNode = createConvexTree(planes.slice(1), splits.back);
            return new Node(region, planes[0], backNode, frontNode);
        } else {
            return new Cell('-', true, region);
        }
    }

    var plane0 = new Plane2D(0,-1,-1);
    var splits0 = worldRegion.splitBy(plane0);
    var t1 = 
        new Node(worldRegion, 
            plane0,
            createConvexTree(
                [new Plane2D(1,1,10), new Plane2D(-1,0,-1)],
                worldRegion.splitBy(new Plane2D(0,-1,-1)).back),
            createConvexTree(
                [new Plane2D(1,-1,10), new Plane2D(-1,0,-1)],
                splits0.front));

    t1 = createConvexTree([new Plane2D(0,-1,-1), new Plane2D(1,1,10), new Plane2D(-1,0,-1)], worldRegion);

    var plane1 = new Plane2D(-1,0,-3);
    var splits1 = worldRegion.splitBy(plane1);
    var t2 = 
        new Node(worldRegion, 
            plane1,
            createConvexTree(
                [new Plane2D(0,-1,-2), new Plane2D(1,1,12)],
                splits1.back),
            createConvexTree(
                [new Plane2D(0,-1,0), new Plane2D(-1,1,5)],
                splits1.front));

    t2 = createConvexTree([new Plane2D(-1,0,-3), new Plane2D(0,-1,-2), new Plane2D(1,1,12)], worldRegion);


    new BSPTree2DExample(t1, t2, BSP2D.intersection);
    // new BSPTree2DExample(t1, t2, BSP2D.union);
    // new BSPTree2DExample(t1, t2, BSP2D.difference);
    // new BSPTree2DExample(t1, t2, BSP2D.symmetricDifference);

    // var t3 = createConvexTree(
    //             ['1','2','3'], 
    //             [new Plane2D(1,1,10), new Plane2D(-1,0,0), new Plane2D(0,-1,0)],
    //             worldRegion);

    // var t4 = createConvexTree(
    //             ['a', 'b','c'],
    //             [new Plane2D(-1,0,-3), new Plane2D(0,-1,-2), new Plane2D(1,1,9)],
    //             worldRegion);

    // new BSPTree2DExample(t3, t4, BSP2D.union);
});
