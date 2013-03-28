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
        'lib/primitives/sphere',
        'lib/primitives/halfsphere',
        'lib/primitives/cube',
        'examples/js/booleanexample',
    ], 
    function(
        Bench,
        Sphere,
        HalfSphere,
        Cube,
        BooleanExample) {

    
    // Robustness example
    var p3 = Bench.time(function() { return new Cube(0,0,0,20,20,10); }, 'cube');
    var p4 = Bench.time(function() { return new HalfSphere(0,0,0,20,12); }, 'halfsphere');
    new BooleanExample(p3.bsp, p4.bsp);

    // Splitting problem case
    var p6 = Bench.time(function() { return new Sphere(0,0,0,5); }, 'halfsphere');
    var p7 = new Cube(-8,-8,-8,10,10,10);
    new BooleanExample(p6.bsp, p7.bsp);

});
