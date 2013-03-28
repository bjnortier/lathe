define([
        'lib/polygon3d',
        'lib/bsp',
        'lib/conv',
        'lib/primitives/cube',
        'lib/primitives/sphere',
    ], function(Polygon3D, BSP, Conv, Cube, Sphere) {

    var time = function(fn, msg, n) {
        var n = n || 5;
        var times = [];
        var result;
        var sum = 0;
        for (var i = 0; i < n; ++i) {
            var t1 = new Date().getTime();
            result = fn();
            times[i] = new Date().getTime()-t1;
            sum += times[i];
        }
        var mean = sum/n;
        var min = Infinity, max = -Infinity;
        var sigma = Math.sqrt(times.reduce(function(acc, t) {
            min = Math.min(min, t);
            max = Math.max(max, t);
            return acc + (mean-t)*(mean-t)
        }, 0)/n);
        console.log(msg, 'mean:', mean.toFixed(2), '±', sigma.toFixed(2), '\tmin:', min.toFixed(2), '\tmax:', max.toFixed(2));
        return result;

    }

    describe('Boolean benchmarks', function() {

        it('sphere & cube', function() {

            console.log('\nsphere & cube:')

            var sphere = time(function() { 
                return new Sphere({x: 0, y: 0, z: 0, r: 5});
            }, 'create sphere:\t');
     
            var cube = time(function() { 
                return new Cube({x: -8, y: -8, z: -8, w: 10, d: 10, h: 10});
            }, 'create cube:\t');

            ['union', 'intersection', 'difference'].forEach(function(op) {
                var diff = time(function() { 
                    return BSP[op](cube.bsp, sphere.bsp, Polygon3D)
                }, op.slice(0,5) + ' bool:\t', 5);

                time(function() { 
                    return Conv.bspToBrep(diff);
                }, op.slice(0,5) + ' brep:\t', 5);
            });


        });

    });

});