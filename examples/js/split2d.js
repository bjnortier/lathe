requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/line2d',
        'lib/plane2d',
        'lib/polygon2d',
        'examples/js/split2dexample'
    ], 
    function(
        Line2D,
        Plane2D,
        Polygon2D,
        Split2DExample) {

    // new Split2DExample(
    //     new Line2D(new Plane2D(1,1,12),[new Plane2D(0,-1,-2),new Plane2D(-1,0,-3)]),
    //     new Plane2D(0,-1,-1));


    // new Split2DExample(
    //     new Line2D(new Plane2D(0,-1,-1),[new Plane2D(1,0,1000000),new Plane2D(-1,0,1000000)]),
    //     new Plane2D(1,1,12));

    // new Split2DExample(
    //     new Line2D(new Plane2D(-1,0,-3),[new Plane2D(0,1,1000000),new Plane2D(0,-1,1000000)]),
    //     new Plane2D(0,-1,-1));

    new Split2DExample(
        new Line2D(new Plane2D(-1,1,0),[new Plane2D(-1,-1,0),new Plane2D(1,0,3)]),
        new Plane2D(1,0,0.00000000000000001));


});