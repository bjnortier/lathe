define([
    'lib/plane3d', 
    'lib/plane3dcreator.v2',
    './time'
  ], function(Plane3D, Plane3DCreator, time) {

  describe.only('Benchmark 3D Planes', function() {

    it('creation', function() {

      console.log('\n3D Planes');

      var n = 5000;

      time(function() {
        var planes = [];
        for (var i = 0; i < n; ++i) {
          planes.push(new Plane3D(i,i*2,i*3,i*4));
        }
        var acc = 0;
        for (var i = 0; i < n; ++i) {
          acc += planes[i].a;
        }
      }, '3D planes v1\t');

      time(function() {
        var planeCreator = new Plane3DCreator();
        for (var i = 0; i < n; ++i) {
          planeCreator.create(i,i*2,i*3,i*4);
        }
        var acc = 0;
        for (var i = 0; i < n; ++i) {
          acc += planeCreator.get(i).a;
        }
      }, '3D planes v2\t');

    });

  });

});