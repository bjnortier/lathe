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
        'examples/js/split3dexample',
        'examples/js/region3dexample',
        'examples/js/bsptree3dexample',
    ], 
    function(
        Plane3D,
        Polygon3D,
        Region3D,
        SplitExample,
        RegionExample,
        BSPTreeExample) {

    // new SplitExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
    //     new Plane3D(0,1,0,0));

    // new SplitExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
    //     new Plane3D(0,0,1,0));

    new SplitExample(
        new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(-1,1,0,0), new Plane3D(0,1,0,5), new Plane3D(1,0,0,1)]),
        new Plane3D(0,1,0,1));

    // new SplitExample(
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

    // new BSPTreeExample(mesh1, mesh2);

    new RegionExample();
});