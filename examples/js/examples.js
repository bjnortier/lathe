requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/plane',
        'lib/polygon',
        'lib/region',
        'examples/js/splitexample',
        'examples/js/regionexample',
        'examples/js/bsptreeexample',
    ], 
    function(
        Plane,
        Polygon,
        Region,
        SplitExample,
        RegionExample,
        BSPTreeExample) {

    // new SplitExample(
    //     new Polygon(new Plane(0,0,1,0), [new Plane(1,0,0,-1), new Plane(0,1,0,-1), new Plane(1,1,0,5)]),
    //     new Plane(0,1,0,0));

    // new SplitExample(
    //     new Polygon(new Plane(0,0,1,0), [new Plane(1,0,0,-1), new Plane(0,1,0,-1), new Plane(1,1,0,5)]),
    //     new Plane(0,0,1,0));

    // new SplitExample(
    //     new Polygon(new Plane(0,0,1,0), [new Plane(-1,1,0,0), new Plane(0,1,0,5), new Plane(1,0,0,1)]),
    //     new Plane(0,1,0,1));

    // new SplitExample(
    //     new Polygon(new Plane(0,0,1,0), [
    //         new Plane(0,-1,0,5),
    //         new Plane(1,-1,0,10),
    //         new Plane(1,1,0,10),
    //         new Plane(0,1,0,5),
    //         new Plane(-1,1,0,10),
    //         new Plane(-1,-1,0,10),
    //     ]),
    //     new Plane(-1,0,0,1));

    // var mesh1 = [
    //     new Polygon(
    //         new Plane(0,0,-1,0), [new Plane(0,-1,0,0),new Plane(-1,0,0,0),new Plane(1,1,0,10)]),
    //     new Polygon(
    //         new Plane(0,-1,0,0), [new Plane(0,0,-1,0),new Plane(1,0,1,10),new Plane(-1,0,0,0)]),
    //     new Polygon(
    //         new Plane(-1,0,0,0), [new Plane(0,-1,0,0),new Plane(0,1,1,10),new Plane(0,0,-1,0)]),
    //     new Polygon(
    //         new Plane(1,1,1,10), [new Plane(0,-1,0,0),new Plane(0,0,-1,0),new Plane(-1,0,0,0)]),
    // ];
    // var mesh2 = [
    //     new Polygon(
    //         new Plane(0,0,-1,-2), [new Plane(0,-1,0,-2),new Plane(-1,0,0,-2),new Plane(1,1,1,14)]),
    //     // new Polygon(
    //     //     new Plane(0,-1,0,-2), [new Plane(0,0,-1,0),new Plane(1,1,1,14),new Plane(-1,0,0,-2)]),
    //     // new Polygon(
    //     //     new Plane(-1,0,0,-2), [new Plane(0,-1,0,-2),new Plane(1,1,1,14),new Plane(0,0,-1,0)]),
    //     // new Polygon(
    //     //     new Plane(1,1,1,14), [new Plane(0,-1,0,-2),new Plane(0,0,-1,0),new Plane(-1,0,0,-2)]),
    // ];

    // new BSPTreeExample(mesh1, mesh2);

    new RegionExample();
});