requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/plane2d',
        'lib/polygon2d',
        'examples/js/split2dexample'
    ], 
    function(
        Plane2D,
        Polygon2D,
        Split2DExample) {

    new Split2DExample(
        new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
        new Plane2D(1,0,5));

    new Split2DExample(
        new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
        new Plane2D(-1,0,-5));

    new Split2DExample(
        new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
        new Plane2D(-1,1,0));

    new Split2DExample(
        new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
        new Plane2D(1,1,10));

    new Split2DExample(
        new Polygon2D([new Plane2D(0,1,1), new Plane2D(1,1,10), new Plane2D(1,0,1)]),
        new Plane2D(-1,-1,-10));

});