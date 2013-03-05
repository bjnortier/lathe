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
        'lib/bsp',
        'examples/js/bsptree3dexample',
    ], 
    function(
        Plane3D,
        Polygon3D,
        BSP,
        BSPTree3DExample) {

    var Node = BSP.Node;
    var Cell = BSP.Cell;

    var createConvexTree = function(planes) {
        if (planes.length) {
            var hyperplane = planes[0];
            var frontNode = new Cell(false);
            var backNode = createConvexTree(planes.slice(1));
            var node = new Node(hyperplane, backNode, frontNode);
            return node;
        } else {
            return new Cell(true);
        }
    }

    var t1 = createConvexTree(
        [new Plane3D(0,0,-1,0), new Plane3D(0,-1,0,0), new Plane3D(-1,0,0,0), new Plane3D(1,1,1,10)]);
    var t2 = createConvexTree(
        [new Plane3D(0,0,-1,-1), new Plane3D(0,-1,0,-1), new Plane3D(-1,0,0,-1), new Plane3D(1,1,1,12)]);
    
    t1.createSHPs(Polygon3D);
    t2.createSHPs(Polygon3D);

    new BSPTree3DExample(t1, t2, BSP.intersection);
    new BSPTree3DExample(t1, t2, BSP.union);
    new BSPTree3DExample(t1, t2, BSP.difference);

    var t3 = createConvexTree(
        [
            new Plane3D(0,0,-1,0),
            new Plane3D(0,-1,0,0), 
            new Plane3D(-1,1,1,10),
            new Plane3D(1,1,1,10),
        ]); 
    var t4 = createConvexTree(
        [
        new Plane3D(0,0,-1,1),
        new Plane3D(0,0,1,5),
        new Plane3D(1,0,0,5),
        new Plane3D(-1,0,0,5),
        new Plane3D(0,1,0,5),
        new Plane3D(0,-1,0,5)
    ]);
    t3.createSHPs(Polygon3D);
    t4.createSHPs(Polygon3D);
    
    // new BSPTree3DExample(t3, t4, BSP.intersection);
    // new BSPTree3DExample(t3, t4, BSP.difference);
    new BSPTree3DExample(t3, t4, BSP.union);

});
