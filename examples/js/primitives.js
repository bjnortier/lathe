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
        'lib/vector3',
        'lib/polygon3d',
        'lib/plane3d',
        'lib/bsp',
        'lib/primitives/sphere',
        'lib/primitives/cube',
        'examples/js/primitivesexample',
    ], 
    function(
        Bench,
        Vector3,
        Polygon3D,
        Plane3D,
        BSP2D,
        Sphere,
        Cube,
        PrimitivesExample) {

    var p1 = Bench.time(function() { return new Cube(-8,-8,-8,10,10,10); }, 'cube');
    var p2 = Bench.time(function() { return new Sphere(5); }, 'sphere');

    // new PrimitivesExample(p1, p2, BSP2D.union);
    // new PrimitivesExample(p1, p2, BSP2D.intersection);
    new PrimitivesExample(p1, p2, BSP2D.difference);

});
