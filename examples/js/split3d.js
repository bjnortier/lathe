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

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
    //     new Plane3D(1,1,0,5));

    // new Split3DExample(        
    //     new Polygon3D(new Plane3D(-1,0,0,20),[new Plane3D(0,1,0,20),new Plane3D(0,0,-1,1.666666666666667),new Plane3D(0,-1,0,20),new Plane3D(0,0,1,20)]),
    //     new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295))

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,-1,1.666666666666667),[
    //         new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),
    //         new Plane3D(0,1,0,20),
    //         new Plane3D(-1,0,0,20),
    //         new Plane3D(0,-1,0,20)]),
    //     new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295));

    new Split3DExample(
        new Polygon3D(new Plane3D(0,0,-1,0),[new Plane3D(1,0,0,20),new Plane3D(0,-1,0,20),new Plane3D(-1,0,0,20),new Plane3D(0,1,0,20)]),
        new Plane3D(1,0,0,5));

    new Split3DExample(
        new Polygon3D(new Plane3D(1,0,0,5),[new Plane3D(0,0,-1,-1),new Plane3D(0,1,0,20),new Plane3D(0,0,1,5),new Plane3D(0,-1,0,20)]),
        new Plane3D(0,0,-1,0));




});