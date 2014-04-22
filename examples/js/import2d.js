requirejs.config({
  baseUrl:'..',
  paths: {
    'underscore': '../../node_modules/underscore/underscore',
    'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    'gl-matrix': 'node_modules/gl-matrix/dist/gl-matrix',
  },
});

requirejs([
    'lib/line2d',
    'lib/plane2d',
    'lib/bspimport',
    'examples/js/import2dexample',
  ], 
  function(
    Line2D,
    Plane2D,
    BSPImport,
    Import2DExample) {

    var lines = [
      new Line2D(new Plane2D(0,-1,-1),[new Plane2D(1,1,12),new Plane2D(-1,0,-1)]),
      new Line2D(new Plane2D(1,1,12),[new Plane2D(0,-1,-1),new Plane2D(-1,0,-1)]),
      new Line2D(new Plane2D(-1,0,-1),[new Plane2D(0,-1,-1),new Plane2D(1,1,12)]),
    ];

    var t1 = BSPImport.fromLines(lines);
    t1.createSHPs(Line2D);

    new Import2DExample(t1);

  });
