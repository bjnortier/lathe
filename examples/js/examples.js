requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs(['lib/plane', 'lib/polygon', 'examples/js/splitexample'], function(Plane, Polygon, SplitExample) {

    new SplitExample(
        new Polygon(new Plane(0,0,1,0), [new Plane(1,0,0,-1), new Plane(0,1,0,-1), new Plane(1,1,0,5)]),
        new Plane(0,1,0,0));

    new SplitExample(
        new Polygon(new Plane(0,0,1,0), [new Plane(1,0,0,-1), new Plane(0,1,0,-1), new Plane(1,1,0,5)]),
        new Plane(0,0,1,0));

    new SplitExample(
        new Polygon(new Plane(0,0,1,0), [new Plane(1,0,0,1), new Plane(0,1,0,1), new Plane(1,1,0,5)]),
        new Plane(0,1,0,4));

    new SplitExample(
        new Polygon(new Plane(0,0,1,0), [
            new Plane(0,-1,0,5),
            new Plane(1,-1,0,10),
            new Plane(1,1,0,10),
            new Plane(0,1,0,5),
            new Plane(-1,1,0,10),
            new Plane(-1,-1,0,10),
        ]),
        new Plane(0,1,0,0));
  


});