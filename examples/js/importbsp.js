requirejs.config({
  baseUrl:'..',
  paths: {
    'underscore': '../../node_modules/underscore/underscore',
    'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    'gl-matrix': 'node_modules/gl-matrix/dist/gl-matrix',
  },
});

requirejs([
    'lib/vector3',
    'lib/line2d',
    'lib/plane2d',
    'lib/polygon3d',
    'lib/plane3d',
    'lib/bspimport',
    'examples/js/importbspexample',
  ], 
  function(
    Vector3,
    Line2D,
    Plane2D,
    Polygon3D,
    Plane3D,
    BSPImport,
    ImportBSPExample) {

    var lines = [
      new Line2D(new Plane2D(0,-1,-1),[new Plane2D(1,1,12),new Plane2D(-1,0,-1)]),
      new Line2D(new Plane2D(1,1,12),[new Plane2D(0,-1,-1),new Plane2D(-1,0,-1)]),
      new Line2D(new Plane2D(-1,0,-1),[new Plane2D(0,-1,-1),new Plane2D(1,1,12)]),
    ];

    var t1 = BSPImport.fromFaces(lines);
    t1.createSHPs(Line2D);

    new ImportBSPExample(t1);

    var polygons = [
      new Polygon3D(new Plane3D(0,0,-1,0),[new Plane3D(1,1,1,10),new Plane3D(0,-1,0,0),new Plane3D(-1,0,0,0)]),
      new Polygon3D(new Plane3D(0,-1,0,0),[new Plane3D(1,1,1,10),new Plane3D(0,0,-1,-1),new Plane3D(-1,0,0,0),new Plane3D(0,0,-1,0)]),
      new Polygon3D(new Plane3D(0,-1,0,0),[new Plane3D(0,0,-1,-1),new Plane3D(1,1,1,10),new Plane3D(-1,0,0,0)]),
      new Polygon3D(new Plane3D(-1,0,0,0),[new Plane3D(0,0,-1,-1),new Plane3D(1,1,1,10),new Plane3D(0,0,-1,0),new Plane3D(0,-1,0,0)]),
      new Polygon3D(new Plane3D(-1,0,0,0),[new Plane3D(1,1,1,10),new Plane3D(0,-1,0,-1),new Plane3D(0,0,-1,-1),new Plane3D(0,-1,0,0)]),
      new Polygon3D(new Plane3D(-1,0,0,0),[new Plane3D(0,-1,0,-1),new Plane3D(1,1,1,10),new Plane3D(0,0,-1,-1)]),
      new Polygon3D(new Plane3D(1,1,1,10),[new Plane3D(-1,0,0,0),new Plane3D(0,0,-1,-1),new Plane3D(0,-1,0,0),new Plane3D(0,0,-1,0)]),
      new Polygon3D(new Plane3D(1,1,1,10),[new Plane3D(0,0,-1,-1),new Plane3D(0,-1,0,-1),new Plane3D(-1,0,0,0),new Plane3D(0,-1,0,0)]),
      new Polygon3D(new Plane3D(1,1,1,10),[new Plane3D(0,-1,0,-1),new Plane3D(-1,0,0,-1),new Plane3D(0,0,-1,-1),new Plane3D(-1,0,0,0)]),
      new Polygon3D(new Plane3D(0,0,1,1),[new Plane3D(-1,0,0,-1),new Plane3D(0,-1,0,-1),new Plane3D(1,1,1,10)]),
      new Polygon3D(new Plane3D(0,1,0,1),[new Plane3D(0,0,-1,-1),new Plane3D(-1,0,0,-1),new Plane3D(1,1,1,10)]),
      new Polygon3D(new Plane3D(1,0,0,1),[new Plane3D(0,-1,0,-1),new Plane3D(0,0,-1,-1),new Plane3D(1,1,1,10)])
    ];

    var t2 = BSPImport.fromFaces(polygons);
    t2.createSHPs(Polygon3D);

    new ImportBSPExample(t2);

    var faces = [
      Polygon3D.from3PointsAndNormal(new Vector3(0,10,0), new Vector3(10,0,0), new Vector3(0,0,0), new Vector3(0,0,-1,0)),
      Polygon3D.from3PointsAndNormal(new Vector3(10,0,0), new Vector3(0,0,10), new Vector3(0,0,0), new Vector3(0,-1,0,0)),
      Polygon3D.from3PointsAndNormal(new Vector3(0,0,10), new Vector3(0,10,0), new Vector3(0,0,0), new Vector3(-1,0,0,0)),
      Polygon3D.from3PointsAndNormal(new Vector3(0,10,0), new Vector3(0,0,10), new Vector3(10,0,0), new Vector3(1,1,1,10)),
      Polygon3D.from3PointsAndNormal(new Vector3(1,10,1), new Vector3(10,1,1), new Vector3(1,1,1), new Vector3(0,0,-1,-1)),
      Polygon3D.from3PointsAndNormal(new Vector3(10,1,1), new Vector3(1,1,10), new Vector3(1,1,1), new Vector3(0,-1,0,-1)),
      Polygon3D.from3PointsAndNormal(new Vector3(1,1,10), new Vector3(1,10,1), new Vector3(1,1,1), new Vector3(-1,0,0,-1)),
      Polygon3D.from3PointsAndNormal(new Vector3(1,10,1), new Vector3(1,1,10), new Vector3(10,1,1), new Vector3(1,1,1,12)),
    ];

    var t3 = BSPImport.fromFaces(faces);
    t3.createSHPs(Polygon3D);
    new ImportBSPExample(t3);

  });
