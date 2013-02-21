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
        'examples/js/primitivesexample',
    ], 
    function(
        Plane3D,
        Region3D,
        BSP2D,
        PrimitivesExample) {

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


    var t2 = createConvexTree(
        ['a', 'b', 'c', 'd', 'e', 'f'],
        [new Plane3D(0,0,-1,-1), new Plane3D(0,0,1,5), new Plane3D(1,0,0,5), new Plane3D(-1,0,0,5), new Plane3D(0,1,0,5), new Plane3D(0,-1,0,4)],
        worldRegion);

    var Cube = function(x,y,z,w,l,h) {

       this.bsp = createConvexTree(['a', 'b', 'c', 'd', 'e', 'f'],
            [
                new Plane3D(0,0,-1,-z), new Plane3D(0,0,1,z+h), 
                new Plane3D(1,0,0,x+w), new Plane3D(-1,0,0,-x), 
                new Plane3D(0,1,0,y+l), new Plane3D(0,-1,0,-y)
            ], 
            worldRegion);

    }

    var cube1 = new Cube(0,0,0,5,5,5);
    var cube2 = new Cube(1,2,3,5,5,5);

    new PrimitivesExample(cube1, cube2, BSP2D.union);
    new PrimitivesExample(cube1, cube2, BSP2D.intersection);
    new PrimitivesExample(cube1, cube2, BSP2D.difference);

});
