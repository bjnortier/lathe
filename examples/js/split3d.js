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
        'examples/js/split3dexample',
    ], 
    function(
        Plane3D,
        Polygon3D,
        Split3DExample) {

    new Split3DExample(
        new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
        new Plane3D(0,1,0,0));

    new Split3DExample(
        new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
        new Plane3D(0,0,1,0));

    new Split3DExample(
        new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(-1,1,0,0), new Plane3D(0,1,0,5), new Plane3D(1,0,0,1)]),
        new Plane3D(0,1,0,1));

    new Split3DExample(
        new Polygon3D(new Plane3D(0,0,1,0), [
            new Plane3D(0,-1,0,5),
            new Plane3D(1,-1,0,10),
            new Plane3D(1,1,0,10),
            new Plane3D(0,1,0,5),
            new Plane3D(-1,1,0,10),
            new Plane3D(-1,-1,0,10),
        ]),
        new Plane3D(-1,0,0,1));
});