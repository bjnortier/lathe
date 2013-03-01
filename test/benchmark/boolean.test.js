define([
        'lib/bench',
        'lib/polygon3d',
        'lib/bsp',
        'lib/conv',
        'lib/primitives/cube',
        'lib/primitives/sphere',
    ], function(Bench, Polygon3D, BSP, Conv, Cube, Sphere) {

    describe('Boolean benchmarks', function() {

        it('sphere & cube', function() {

            console.log('\nsphere & cube:')

            var sphere = Bench.time(function() { 
                return new Sphere(5);
            }, 'create sphere:\t');
     
            var cube = Bench.time(function() { 
                return new Cube(-8,-8,-8,10,10,10);
            }, 'create cube:\t');

            ['union', 'intersection', 'difference'].forEach(function(op) {
                var diff = Bench.time(function() { 
                    return BSP[op](cube.bsp, sphere.bsp, Polygon3D)
                }, op + ' bool:\t');

                Bench.time(function() { 
                    return Conv.bspToBrep3D(diff);
                }, op + ' brep:\t');
            });


        });

    });

});