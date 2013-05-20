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
        'lib/primitives/cylinder',
        'examples/js/primitiveexample',
    ], 
    function(
        Bench,
        Sphere,
        HalfSphere,
        Cube,
        Cylinder,
        PrimitiveExample) {

    var p4 = Bench.time(function() { return new Cylinder({
        x: 0, y: 0, z: 0, r: 5, h: 5,
    }, 20); }, 'cylinder');
    new PrimitiveExample(p4.bsp);


    var p1 = Bench.time(function() { return new Cube({
        x: 0, y: 0, z: 0, w: 5, d: 5, h: 5
    }); }, 'cube');
    new PrimitiveExample(p1.bsp);
    
    var p2 = Bench.time(function() { return new HalfSphere({
        x: 0, y: 0, z: 0, r: 5,
    }); }, 'halfsphere');
    new PrimitiveExample(p2.bsp);

    var p3 = Bench.time(function() { return new Sphere({
        x: 0, y: 0, z: 0, r: 5
    }); }, 'sphere');
    new PrimitiveExample(p3.bsp);


});