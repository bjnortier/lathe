requirejs.config({
  baseUrl:'..',
  paths: {
    'underscore': '../../node_modules/underscore/underscore',
    'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    'gl-matrix': 'node_modules/gl-matrix/dist/gl-matrix',
  },
});

requirejs([
    'lib/plane2d',
    'lib/line2d',
    'lib/polygon2d',
    'lib/bsp',
    'examples/js/booleanexample',
  ], 
  function(
    Plane2D,
    Line2D,
    Polygon2D,
    BSP,
    BooleanExample) {

  var Node = BSP.Node;
  var Cell = BSP.Cell;
  var worldRegion = Polygon2D.world;

  var createConvexTree = function(planes) {
    if (planes.length) {
      var frontNode = new Cell(false);
      var backNode = createConvexTree(planes.slice(1));
      var v = new Node(planes[0], backNode, frontNode);
      return v;
    } else {
      return new Cell(true);
    }
  }

  var t1 = 
    new Node(
      new Plane2D(0,-1,-1),
      createConvexTree([new Plane2D(1,1,10), new Plane2D(-1,0,-1)]),
      createConvexTree([new Plane2D(1,-1,10), new Plane2D(-1,0,-1)]));
  t1.createSHPs(Line2D);

  var t2 = 
    new Node(
      new Plane2D(-1,0,-3),
      createConvexTree([new Plane2D(0,-1,-2), new Plane2D(1,1,12)]),
      createConvexTree([new Plane2D(0,-1,1), new Plane2D(-1,1,5)]));

  t2.createSHPs(Line2D);

  // new BooleanExample(t1, t2, Line2D);

  var t3 = createConvexTree([
    new Plane2D(1,0,5),
    new Plane2D(0,1,1),
    new Plane2D(0,-1,0),
    new Plane2D(-1,0,0),
  ])
  t3.createSHPs(Line2D); 

  var t4 = createConvexTree([
    new Plane2D(0,-1,-1), 
    new Plane2D(1,1,12), 
    new Plane2D(-1,0,-1)
  ])
  t4.createSHPs(Line2D);

  // Example for the oppositely coincident SHPs, similar to the 3D case
  new BooleanExample(t3, t4, Line2D);

  // Example of non-overlapping
  var t5 = createConvexTree([
    new Plane2D(0,1,0), 
    new Plane2D(-1,-1,12), 
    new Plane2D(1,0,-1)
  ])
  t5.createSHPs(Line2D); 

  var t6 = createConvexTree([
    new Plane2D(0,-1,-1), 
    new Plane2D(1,1,12), 
    new Plane2D(-1,0,-1)
  ])
  t6.createSHPs(Line2D);
  // new BooleanExample(t5, t6, Line2D);
});
