requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/plane2d',
        'lib/plane3d',
        'lib/polygon2d',
        'lib/polygon3d',
        'lib/region3d',
        'lib/bsp2d',
        'examples/js/split2dexample',
        'examples/js/split3dexample',
        'examples/js/region3dexample',
        'examples/js/bsptree2dexample',
        'examples/js/bsptree3dexample',
    ], 
    function(
        Plane2D,
        Plane3D,
        Polygon2D,
        Polygon3D,
        Region3D,
        BSP2D,
        Split2DExample,
        Split3DExample,
        Region3DExample,
        BSPTree2DExample,
        BSPTree3DExample) {

    var Node = BSP2D.Node;
    var Cell = BSP2D.Cell;

    new Split2DExample(
        new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
        new Plane2D(1,0,5));

    new Region3DExample();
});