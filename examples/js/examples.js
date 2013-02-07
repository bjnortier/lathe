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
        'examples/js/split2dexample',
        'examples/js/split3dexample',
        'examples/js/region2dexample',
        'examples/js/region3dexample',
        'examples/js/bsptree3dexample',
    ], 
    function(
        Plane2D,
        Plane3D,
        Polygon2D,
        Polygon3D,
        Region3D,
        Split2DExample,
        Split3DExample,
        Region2DExample,
        Region3DExample,
        BSPTree3DExample) {


    // new Split2DExample(
    //     new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
    //     new Plane2D(1,0,5));

    // new Split2DExample(
    //     new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
    //     new Plane2D(-1,0,-5));

    // new Split2DExample(
    //     new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
    //     new Plane2D(-1,1,0));

    // new Split2DExample(
    //     new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
    //     new Plane2D(1,1,10));

    // new Split2DExample(
    //     new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
    //     new Plane2D(-1,-1,-10));


    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
    //     new Plane3D(0,1,0,0));

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
    //     new Plane3D(0,0,1,0));

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(-1,1,0,0), new Plane3D(0,1,0,5), new Plane3D(1,0,0,1)]),
    //     new Plane3D(0,1,0,1));

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [
    //         new Plane3D(0,-1,0,5),
    //         new Plane3D(1,-1,0,10),
    //         new Plane3D(1,1,0,10),
    //         new Plane3D(0,1,0,5),
    //         new Plane3D(-1,1,0,10),
    //         new Plane3D(-1,-1,0,10),
    //     ]),
    //     new Plane3D(-1,0,0,1));

    // var mesh1 = [
    //     new Polygon3D(
    //         new Plane3D(0,0,-1,0), [new Plane3D(0,-1,0,0),new Plane3D(-1,0,0,0),new Plane3D(1,1,0,10)]),
    //     new Polygon3D(
    //         new Plane3D(0,-1,0,0), [new Plane3D(0,0,-1,0),new Plane3D(1,0,1,10),new Plane3D(-1,0,0,0)]),
    //     new Polygon3D(
    //         new Plane3D(-1,0,0,0), [new Plane3D(0,-1,0,0),new Plane3D(0,1,1,10),new Plane3D(0,0,-1,0)]),
    //     new Polygon3D(
    //         new Plane3D(1,1,1,10), [new Plane3D(0,-1,0,0),new Plane3D(0,0,-1,0),new Plane3D(-1,0,0,0)]),
    // ];
    // var mesh2 = [
    //     new Polygon3D(
    //         new Plane3D(0,0,-1,-2), [new Plane3D(0,-1,0,-2),new Plane3D(-1,0,0,-2),new Plane3D(1,1,1,14)]),
    //     // new Polygon3D(
    //     //     new Plane3D(0,-1,0,-2), [new Plane3D(0,0,-1,0),new Plane3D(1,1,1,14),new Plane3D(-1,0,0,-2)]),
    //     // new Polygon3D(
    //     //     new Plane3D(-1,0,0,-2), [new Plane3D(0,-1,0,-2),new Plane3D(1,1,1,14),new Plane3D(0,0,-1,0)]),
    //     // new Polygon3D(
    //     //     new Plane3D(1,1,1,14), [new Plane3D(0,-1,0,-2),new Plane3D(0,0,-1,0),new Plane3D(-1,0,0,-2)]),
    // ];

    // new BSPTree3DExample(mesh1, mesh2);

    new Region2DExample();
    new Region3DExample();
});