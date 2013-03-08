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

    var p1 = Bench.time(function() { return new Cube(-10,-10,-10,10,10,10); }, 'cube');
    var p2 = Bench.time(function() { return new Cube(-2,-2,-2,10,10,10); }, 'cube');
    new BooleanExample(p1.bsp, p2.bsp);
    
    // Robustness example
    var p5 = Bench.time(function() { return new Cube(0,0,0,20,20,10); }, 'cube');
    var p6 = Bench.time(function() { return new HalfSphere(0,0,0,20,12); }, 'halfsphere');
    new BooleanExample(p5.bsp, p6.bsp);

    var p4 = Bench.time(function() { return new HalfSphere(0,0,0,5,3); }, 'halfsphere');
    new BooleanExample(p1.bsp, p4.bsp);


});
