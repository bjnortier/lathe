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
        'examples/js/region3dexample',
    ], 
    function(
        Plane3D,
        Polygon3D,
        Region3D,
        Region3DExample) {



    var region2 = new Region3D([
        new Polygon3D(
            new Plane3D(0,0,-1,0), [new Plane3D(0,-1,0,0),new Plane3D(-1,0,0,0),new Plane3D(1,1,0,10)]),
        new Polygon3D(
            new Plane3D(0,-1,0,0), [new Plane3D(0,0,-1,0),new Plane3D(1,0,1,10),new Plane3D(-1,0,0,0)]),
        new Polygon3D(
            new Plane3D(-1,0,0,0), [new Plane3D(0,-1,0,0),new Plane3D(0,1,1,10),new Plane3D(0,0,-1,0)]),
        new Polygon3D(
            new Plane3D(1,1,1,10), [new Plane3D(0,-1,0,0),new Plane3D(0,0,-1,0),new Plane3D(-1,0,0,0)]),
    ]);
    new Region3DExample(region2, new Plane3D(0,0,1,0.5));

    var region1 = new Region3D([
        new Polygon3D(
            new Plane3D(0,0,-1,0), [new Plane3D(1,0,0,5),new Plane3D(0,1,0,5),new Plane3D(-1,0,0,5),new Plane3D(0,-1,0,5)]),
        new Polygon3D(
            new Plane3D(0,0,1,5), [new Plane3D(1,0,0,5),new Plane3D(0,1,0,5),new Plane3D(-1,0,0,5),new Plane3D(0,-1,0,5)]),
        new Polygon3D(
            new Plane3D(1,0,0,5), [new Plane3D(0,0,-1,0),new Plane3D(0,1,0,5),new Plane3D(0,0,1,5),new Plane3D(0,-1,0,5)]),
        new Polygon3D(
            new Plane3D(-1,0,0,5), [new Plane3D(0,0,-1,0),new Plane3D(0,1,0,5),new Plane3D(0,0,1,5),new Plane3D(0,-1,0,5)]),
        new Polygon3D(
            new Plane3D(0,1,0,5), [new Plane3D(0,0,-1,0),new Plane3D(1,0,0,5),new Plane3D(0,0,1,5),new Plane3D(-1,0,0,5)]),
        new Polygon3D(
            new Plane3D(0,-1,0,5), [new Plane3D(0,0,-1,0),new Plane3D(1,0,0,5),new Plane3D(0,0,1,5),new Plane3D(-1,0,0,5)]),
    ]);
    new Region3DExample(region1, new Plane3D(1,-1,1,3));

    // From a bug
    var r3 = new Region3D([new Polygon3D(new Plane3D(1,0,0,20),[new Plane3D(1,-1,1,10),new Plane3D(0,0,-1,0),new Plane3D(0,1,0,20)]),new Polygon3D(new Plane3D(-1,0,0,20),[new Plane3D(-1,-1,1,10),new Plane3D(0,1,0,20),new Plane3D(0,0,-1,0)]),new Polygon3D(new Plane3D(0,1,0,20),[new Plane3D(-1,-1,1,10),new Plane3D(0,0,1,20),new Plane3D(1,-1,1,10),new Plane3D(1,0,0,20),new Plane3D(0,0,-1,0),new Plane3D(-1,0,0,20)]),new Polygon3D(new Plane3D(0,0,1,20),[new Plane3D(-1,-1,1,10),new Plane3D(1,-1,1,10),new Plane3D(0,1,0,20)]),new Polygon3D(new Plane3D(0,0,-1,0),[new Plane3D(-1,-1,1,10),new Plane3D(1,-1,1,10),new Plane3D(1,0,0,20),new Plane3D(0,1,0,20),new Plane3D(-1,0,0,20)]),new Polygon3D(new Plane3D(1,-1,1,10),[new Plane3D(1,0,0,20),new Plane3D(0,1,0,20),new Plane3D(0,0,1,20),new Plane3D(-1,-1,1,10),new Plane3D(0,0,-1,0)]),new Polygon3D(new Plane3D(-1,-1,1,10),[new Plane3D(-1,0,0,20),new Plane3D(0,1,0,20),new Plane3D(0,0,1,20),new Plane3D(1,-1,1,10),new Plane3D(0,0,-1,0)])]);
    new Region3DExample(r3, new Plane3D(0,0,1,2));
});