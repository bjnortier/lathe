'use strict';

requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': '../../node_modules/underscore/underscore',
        'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs([
        'lib/bench',
        'lib/plane3d',
        'lib/primitives/sphere',
        'lib/primitives/cube',
        'examples/js/primitivesexample',
    ], 
    function(
        Bench,
        Plane3D,
        Sphere,
        Cube,
        PrimitivesExample) {

    var p1 = Bench.time(function() { return new Cube(-8,-8,-8,10,10,10); }, 'cube');
    var p2 = Bench.time(function() { return new Sphere(0,0,0,5,40); }, 'sphere');

    // new PrimitivesExample(p1, p2, BSP2D.union);
    // new PrimitivesExample(p1, p2, BSP2D.intersection);
    new PrimitivesExample(p1, p2);

});
