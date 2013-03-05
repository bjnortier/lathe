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
        'lib/primitives/halfsphere',
        'lib/primitives/cube',
        'examples/js/primitivesexample',
    ], 
    function(
        Bench,
        Plane3D,
        Sphere,
        HalfSphere,
        Cube,
        PrimitivesExample) {

    var p1 = Bench.time(function() { return new Cube(-10,-10,-10,10,10,10); }, 'cube');
    var p2 = Bench.time(function() { return new Cube(-2,-2,-2,10,10,10); }, 'cube');
    new PrimitivesExample(p1, p2);

    var p3 = Bench.time(function() { return new Sphere(0,0,0,5,20); }, 'sphere');
    new PrimitivesExample(p1, p3);

    var p4 = Bench.time(function() { return new HalfSphere(0,0,0,5,3); }, 'halfsphere');
    new PrimitivesExample(p1, p4);

});
