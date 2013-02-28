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

    new Region3DExample(Region3D.world, new Plane3D(1,1,0,0));

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
    // new Region3DExample(region1, new Plane3D(1,-1,1,3));

    // Corner case
    // var r3 = new Region3D([new Polygon3D(new Plane3D(1,0,0,20),[new Plane3D(1,-1,1,10),new Plane3D(0,0,-1,0),new Plane3D(0,1,0,20)]),new Polygon3D(new Plane3D(-1,0,0,20),[new Plane3D(-1,-1,1,10),new Plane3D(0,1,0,20),new Plane3D(0,0,-1,0)]),new Polygon3D(new Plane3D(0,1,0,20),[new Plane3D(-1,-1,1,10),new Plane3D(0,0,1,20),new Plane3D(1,-1,1,10),new Plane3D(1,0,0,20),new Plane3D(0,0,-1,0),new Plane3D(-1,0,0,20)]),new Polygon3D(new Plane3D(0,0,1,20),[new Plane3D(-1,-1,1,10),new Plane3D(1,-1,1,10),new Plane3D(0,1,0,20)]),new Polygon3D(new Plane3D(0,0,-1,0),[new Plane3D(-1,-1,1,10),new Plane3D(1,-1,1,10),new Plane3D(1,0,0,20),new Plane3D(0,1,0,20),new Plane3D(-1,0,0,20)]),new Polygon3D(new Plane3D(1,-1,1,10),[new Plane3D(1,0,0,20),new Plane3D(0,1,0,20),new Plane3D(0,0,1,20),new Plane3D(-1,-1,1,10),new Plane3D(0,0,-1,0)]),new Polygon3D(new Plane3D(-1,-1,1,10),[new Plane3D(-1,0,0,20),new Plane3D(0,1,0,20),new Plane3D(0,0,1,20),new Plane3D(1,-1,1,10),new Plane3D(0,0,-1,0)])]);
    // new Region3DExample(r3, new Plane3D(0,0,1,2));

    // Corner case
    // var r4 = new Region3D([new Polygon3D(new Plane3D(-1,0,0,20),[new Plane3D(0,1,0,20),new Plane3D(0,0,-1,1.666666666666667),new Plane3D(0,-1,0,20),new Plane3D(0,0,1,20)]),new Polygon3D(new Plane3D(0,1,0,20),[new Plane3D(0,0,1,20),new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,-1,1.666666666666667),new Plane3D(-1,0,0,20)]),new Polygon3D(new Plane3D(0,-1,0,20),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,1,20),new Plane3D(-1,0,0,20),new Plane3D(0,0,-1,1.666666666666667)]),new Polygon3D(new Plane3D(0,0,1,20),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,1,0,20),new Plane3D(-1,0,0,20),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(0,0,-1,1.666666666666667),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,1,0,20),new Plane3D(-1,0,0,20),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),[new Plane3D(0,1,0,20),new Plane3D(0,0,1,20),new Plane3D(0,-1,0,20),new Plane3D(0,0,-1,1.666666666666667)])]) 
    // var h = new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295) ;
    // new Region3DExample(Region3D.world, h);

    // new Region3DExample(r4, h);

    // Corner case
    // var r5 = new Region3D([new Polygon3D(new Plane3D(-1,0,0,20),[new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295),new Plane3D(0,-1,0,20),new Plane3D(0,0,1,20)]),new Polygon3D(new Plane3D(0,-1,0,20),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,1,20),new Plane3D(-1,0,0,20),new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295),new Plane3D(0,0,-1,1.666666666666667)]),new Polygon3D(new Plane3D(0,0,1,20),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(-1,0,0,20),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(0,0,-1,1.666666666666667),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),[new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(0,0,1,20),new Plane3D(0,-1,0,20),new Plane3D(0,0,-1,1.666666666666667)]),new Polygon3D(new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295),[new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(-1,0,0,20),new Plane3D(0,-1,0,20),new Plane3D(0,0,-1,1.666666666666667)]),new Polygon3D(new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),[new Plane3D(-1,0,0,20),new Plane3D(0,0,1,20),new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,-1,1.666666666666667),new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295)])]);
    // new Region3DExample(r5, new Plane3D(-0.7071067811865476,-0.408248290463863,0.5773502691896257,2.886751345948129));

    // var r6 = new Region3D([new Polygon3D(new Plane3D(-1,0,0,20),[new Plane3D(0,1,0,20),new Plane3D(0,0,-1,1.666666666666667),new Plane3D(0,-1,0,20),new Plane3D(0,0,1,20)]),new Polygon3D(new Plane3D(0,1,0,20),[new Plane3D(0,0,1,20),new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,-1,1.666666666666667),new Plane3D(-1,0,0,20)]),new Polygon3D(new Plane3D(0,-1,0,20),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,1,20),new Plane3D(-1,0,0,20),new Plane3D(0,0,-1,1.666666666666667)]),new Polygon3D(new Plane3D(0,0,1,20),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,1,0,20),new Plane3D(-1,0,0,20),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(0,0,-1,1.666666666666667),[new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,1,0,20),new Plane3D(-1,0,0,20),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),[new Plane3D(0,1,0,20),new Plane3D(0,0,1,20),new Plane3D(0,-1,0,20),new Plane3D(0,0,-1,1.666666666666667)])]);
    // new Region3DExample(r6, new Plane3D(-0.7071067811865477,0.408248290463863,-0.5773502691896257,2.8867513459481295)); 

    // var r7 = new Region3D([new Polygon3D(new Plane3D(0,0,-1,-0.5),[new Plane3D(0,-1,0,-0.5),new Plane3D(1,0,0,5.5),new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5),new Plane3D(0,1,0,5.5),new Plane3D(-1,0,0,-0.5)]),new Polygon3D(new Plane3D(1,0,0,5.5),[new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5),new Plane3D(0,0,-1,-0.5),new Plane3D(0,-1,0,-0.5)]),new Polygon3D(new Plane3D(-1,0,0,-0.5),[new Plane3D(0,0,1,5),new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5),new Plane3D(0,1,0,5.5),new Plane3D(0,0,-1,-0.5),new Plane3D(0,-1,0,-0.5)]),new Polygon3D(new Plane3D(0,1,0,5.5),[new Plane3D(0,0,-1,-0.5),new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5),new Plane3D(-1,0,0,-0.5)]),new Polygon3D(new Plane3D(0,-1,0,-0.5),[new Plane3D(0,0,-1,-0.5),new Plane3D(1,0,0,5.5),new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(0,0,1,5),new Plane3D(-1,0,0,-0.5)]),new Polygon3D(new Plane3D(0,0,1,5),[new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5),new Plane3D(-1,0,0,-0.5),new Plane3D(0,-1,0,-0.5)]),new Polygon3D(new Plane3D(0.7071067811865476,0,0.7071067811865475,5),[new Plane3D(1,0,0,5.5),new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5),new Plane3D(0,0,1,5),new Plane3D(0,-1,0,-0.5)]),new Polygon3D(new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5),[new Plane3D(0,0,-1,-0.5),new Plane3D(1,0,0,5.5),new Plane3D(0,0,1,5),new Plane3D(0,1,0,5.5),new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(-1,0,0,-0.5)])]);
    // new Region3DExample(r7, new Plane3D(-0.5720614028176843,0.4156269377774535,0.7071067811865475,5));

    // var r8 = new Region3D([new Polygon3D(new Plane3D(0,0,-1,-0.5),[new Plane3D(0,-1,0,-0.5),new Plane3D(1,0,0,5.5),new Plane3D(0,1,0,5.5),new Plane3D(-1,0,0,-0.5)]),new Polygon3D(new Plane3D(0,0,1,5.5),[new Plane3D(0,-1,0,-0.5),new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(0,1,0,5.5),new Plane3D(-1,0,0,-0.5)]),new Polygon3D(new Plane3D(1,0,0,5.5),[new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(0,1,0,5.5),new Plane3D(0,0,-1,-0.5),new Plane3D(0,-1,0,-0.5)]),new Polygon3D(new Plane3D(-1,0,0,-0.5),[new Plane3D(0,1,0,5.5),new Plane3D(0,0,-1,-0.5),new Plane3D(0,-1,0,-0.5),new Plane3D(0,0,1,5.5)]),new Polygon3D(new Plane3D(0,1,0,5.5),[new Plane3D(0,0,-1,-0.5),new Plane3D(1,0,0,5.5),new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(0,0,1,5.5),new Plane3D(-1,0,0,-0.5)]),new Polygon3D(new Plane3D(0,-1,0,-0.5),[new Plane3D(0,0,-1,-0.5),new Plane3D(1,0,0,5.5),new Plane3D(0.7071067811865476,0,0.7071067811865475,5),new Plane3D(0,0,1,5.5),new Plane3D(-1,0,0,-0.5)]),new Polygon3D(new Plane3D(0.7071067811865476,0,0.7071067811865475,5),[new Plane3D(0,0,1,5.5),new Plane3D(0,1,0,5.5),new Plane3D(1,0,0,5.5),new Plane3D(0,-1,0,-0.5)])]);
    // new Region3DExample(r8, new Plane3D(0.21850801222441057,0.6724985119639574,0.7071067811865475,5));
    // ok

    // var r9 = new Region3D([new Polygon3D(new Plane3D(1,0,0,20),[new Plane3D(0,0,-1,1.666666666666667),new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(0,0,1,20),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(0,-1,0,20),[new Plane3D(0,0,1,20),new Plane3D(0.8164965809277261,0.4714045207910316,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,-1,1.666666666666667),new Plane3D(1,0,0,20)]),new Polygon3D(new Plane3D(0,0,1,20),[new Plane3D(1,0,0,20),new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0.8164965809277261,0.4714045207910316,0.3333333333333333,1.6666666666666667),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(0,0,-1,1.666666666666667),[new Plane3D(1,0,0,20),new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0.8164965809277261,0.4714045207910316,0.3333333333333333,1.6666666666666667),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),[new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),new Plane3D(0,0,1,20),new Plane3D(0.8164965809277261,0.4714045207910316,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,-1,1.666666666666667)]),new Polygon3D(new Plane3D(0.8164965809277261,0.4714045207910316,0.3333333333333333,1.6666666666666667),[new Plane3D(0,-1,0,20),new Plane3D(0,0,1,20),new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,-1,1.666666666666667)]),new Polygon3D(new Plane3D(0,0.816496580927726,0.5773502691896257,2.8867513459481295),[new Plane3D(1,0,0,20),new Plane3D(0,0,1,20),new Plane3D(-0.816496580927726,0.47140452079103157,0.3333333333333333,1.6666666666666667),new Plane3D(0,0,-1,1.666666666666667)])]);
    // new Region3DExample(r9, new Plane3D(0.7071067811865476,-0.408248290463863,0.5773502691896257,2.886751345948129));

    var r10 = new Region3D([new Polygon3D(new Plane3D(0,-1,0,20),[new Plane3D(0.3686977986659302,0.2678746307127566,0.8901152259563935,4.450576129781967),new Plane3D(0,0,1,5),new Plane3D(-0.45573554230562113,9.738889301321507e-17,0.8901152259563935,4.450576129781967),new Plane3D(0,0,1,3.5355339059327373)]),new Polygon3D(new Plane3D(0,0,1,3.5355339059327373),[new Plane3D(0.3686977986659302,0.2678746307127566,0.8901152259563935,4.450576129781967),new Plane3D(-0.14083002751311968,0.4334302572170666,0.8901152259563935,4.450576129781967),new Plane3D(-0.45573554230562113,9.738889301321507e-17,0.8901152259563935,4.450576129781967),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(0,0,1,5),[new Plane3D(0.3686977986659302,0.2678746307127566,0.8901152259563935,4.450576129781967),new Plane3D(-0.14083002751311968,0.4334302572170666,0.8901152259563935,4.450576129781967),new Plane3D(-0.45573554230562113,9.738889301321507e-17,0.8901152259563935,4.450576129781967),new Plane3D(0,-1,0,20)]),new Polygon3D(new Plane3D(0.3686977986659302,0.2678746307127566,0.8901152259563935,4.450576129781967),[new Plane3D(-0.14083002751311968,0.4334302572170666,0.8901152259563935,4.450576129781967),new Plane3D(0,0,1,3.5355339059327373),new Plane3D(0,-1,0,20),new Plane3D(0,0,1,5)]),new Polygon3D(new Plane3D(-0.14083002751311968,0.4334302572170666,0.8901152259563935,4.450576129781967),[new Plane3D(-0.45573554230562113,9.738889301321507e-17,0.8901152259563935,4.450576129781967),new Plane3D(0,0,1,3.5355339059327373),new Plane3D(0.3686977986659302,0.2678746307127566,0.8901152259563935,4.450576129781967),new Plane3D(0,0,1,5)]),new Polygon3D(new Plane3D(-0.45573554230562113,9.738889301321507e-17,0.8901152259563935,4.450576129781967),[new Plane3D(0,-1,0,20),new Plane3D(0,0,1,3.5355339059327373),new Plane3D(-0.14083002751311968,0.4334302572170666,0.8901152259563935,4.450576129781967),new Plane3D(0,0,1,5)])]) ;
    new Region3DExample(r10, new Plane3D(-0.1408300275131198,-0.4334302572170665,0.8901152259563935,4.450576129781967));
});