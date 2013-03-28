requirejs.config({
    baseUrl:'..',
    paths: {
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
        new Polygon3D(new Plane3D(0,0,-1,0),[new Plane3D(-0.9582091569900513,-0.2567513585090637,0.12615062296390533,4.791045665740967),new Plane3D(-0.7014577984809875,-0.7014577984809875,0.12615062296390533,4.791045665740967),new Plane3D(0.9582091569900513,0.2567513585090637,0.12615062296390533,4.791045665740967),new Plane3D(0,-1,0,50)]),
        new Plane3D(0.9582091569900513,0.2567513585090637,-0.12615062296390533,4.791045665740967));


    new Split3DExample(
        new Polygon3D(new Plane3D(0,0,1,10),[new Plane3D(0.6565096192647729,0.6565096192647729,0.37147037516556536,19.247888121748677),new Plane3D(0.7760132217981928,0.20793211609669945,0.5954558881142562,19.395502156139422),new Plane3D(0,1,0,1000000)]),
        new Plane3D(0.5680811057014935,0.5680811057014933,0.5954558881142562,19.395502156139425));

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