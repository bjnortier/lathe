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
        new Polygon3D(new Plane3D(0,0,-1,0),[new Plane3D(0.984717,-0.155964,0.077498,4.923589),new Plane3D(0.888326,-0.452626,0.077498,4.923589),new Plane3D(0.70498,-0.704981,0.077498,4.923589),new Plane3D(0.452625,-0.888327,0.077498,4.923589),new Plane3D(0.155963,-0.984718,0.077498,4.923589),new Plane3D(-0.155964,-0.984718,0.077498,4.923589),new Plane3D(-0.452626,-0.888327,0.077498,4.923589),new Plane3D(-0.452626,-0.888327,-0.077499,4.923589),new Plane3D(-0.704981,-0.704981,-0.077499,4.923589),new Plane3D(-0.888327,-0.452626,0.077498,4.923589),new Plane3D(-0.984718,-0.155964,0.077498,4.923589),new Plane3D(-0.984718,0.155963,0.077498,4.923589),new Plane3D(-0.888327,0.452625,0.077498,4.923589),new Plane3D(-0.704981,0.70498,-0.077499,4.923589),new Plane3D(-0.452626,0.888326,-0.077499,4.923589),new Plane3D(-0.155964,0.984717,0.077498,4.923589),new Plane3D(0.155963,0.984717,-0.077499,4.923589),new Plane3D(0.452625,0.888326,-0.077499,4.923589),new Plane3D(0.70498,0.70498,-0.077499,4.923589),new Plane3D(0.888326,0.452625,-0.077499,4.923589),new Plane3D(0.984717,0.155963,0.077498,4.923589)]),
        new Plane3D(-0.155964,-0.984718,-0.077499,4.923589));


    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,10),[new Plane3D(0.776013,0.207932,0.595455,19.395502),new Plane3D(0.568081,0.568081,0.595455,19.395502),new Plane3D(0.207932,0.776013,0.595455,19.395502),new Plane3D(-0.207933,0.776013,0.595455,19.395502),new Plane3D(-0.568082,0.568081,0.595455,19.395502),new Plane3D(-1,0,0,1000000),new Plane3D(0,-1,0,1000000)]),
    //     new Plane3D(-0.207933,0.776013,0.595455,19.395502));

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(1,0,0,0),[new Plane3D(0,0,-1,10),new Plane3D(0,1,0,20),new Plane3D(0,0,1,0),new Plane3D(0,-1,0,20)]),
    //     new Plane3D(0,0,-1,0));

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
    //     new Plane3D(0,1,0,0));

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,1,0), [new Plane3D(1,0,0,-1), new Plane3D(0,1,0,-1), new Plane3D(1,1,0,5)]),
    //     new Plane3D(0,0,1,0));

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
    //     new Polygon3D(new Plane3D(0,0,-1,1.666666666666667),[
    //         new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),
    //         new Plane3D(0,1,0,20),
    //         new Plane3D(-1,0,0,20),
    //         new Plane3D(0,-1,0,20)]),
    //     new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295));

    // new Split3DExample(
    //     new Polygon3D(new Plane3D(0,0,-1,0),[new Plane3D(1,0,0,20),new Plane3D(0,-1,0,20),new Plane3D(-1,0,0,20),new Plane3D(0,1,0,20)]),
    //     new Plane3D(1,0,0,5));


});