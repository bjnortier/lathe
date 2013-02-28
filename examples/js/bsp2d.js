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

    var createConvexTree = function(planes) {
        if (planes.length) {
            var frontNode = new Cell(false);
            var backNode = createConvexTree(planes.slice(1));
            return new Node(planes[0], backNode, frontNode);
        } else {
            return new Cell(true);
        }
    }

    var plane0 = new Plane2D(0,-1,-1);
    var t1 = 
        new Node(
            plane0,
            createConvexTree([new Plane2D(1,1,10), new Plane2D(-1,0,-1)]),
            createConvexTree([new Plane2D(1,-1,10), new Plane2D(-1,0,-1)]));

    t1 = createConvexTree([new Plane2D(0,-1,-1), new Plane2D(1,1,10), new Plane2D(-1,0,-1)]);
    // t1 = createConvexTree([new Plane2D(-1,0,-5)]);

    // var plane1 = new Plane2D(-1,0,-3);
    // var t2 = 
    //     new Node(
    //         plane1,
    //         createConvexTree([new Plane2D(0,-1,-2), new Plane2D(1,1,12)]),
    //         createConvexTree([new Plane2D(0,-1,1), new Plane2D(-1,1,5)]));

    t2 = createConvexTree([new Plane2D(-1,0,-3), new Plane2D(0,-1,-2), new Plane2D(1,1,12)]);


    new BSPTree2DExample(t1, t2, BSP2D.intersection);
    new BSPTree2DExample(t1, t2, BSP2D.union);
    new BSPTree2DExample(t2, t1, BSP2D.difference);
    // new BSPTree2DExample(t1, t2, BSP2D.symmetricDifference);

    // var t3 = createConvexTree(
    //             [new Plane2D(1,1,10), new Plane2D(-1,0,0), new Plane2D(0,-1,0)],
    //             worldRegion);

    // var t4 = createConvexTree(
    //             [new Plane2D(-1,0,-3), new Plane2D(0,-1,-2), new Plane2D(1,1,9)],
    //             worldRegion);

    // new BSPTree2DExample(t3, t4, BSP2D.union);
});
