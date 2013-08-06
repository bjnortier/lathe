define([
    'lib/plane3d', 
    'lib/planes3d.v2',
    './time'
  ], function(Plane3D, Planes3D, time) {

  describe('Benchmark 3D Planes', function() {

    it('creation', function() {

      console.log('\n3D Planes');

      var n = 5000;

      time(function() {
        var planes = [];
        for (var i = 0; i < n; ++i) {
          planes.push(new Plane3D(i,i*2,i*3,i*4));
        }
        return planes;
      }, '3D planes v1\t');

      time(function() {
        var planes = new Planes3D();
        for (var i = 0; i < n; ++i) {
          planes.add(i,i*2,i*3,i*4);
        }
        return planes;
      }, '3D planes v2\t');


    });

  });

});