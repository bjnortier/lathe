define([
    'lib/plane3d',
    'lib/polygon3d',
    'examples/js/viewport',
    'examples/js/trackball',
  ], function(Plane3D, Polygon3D, Viewport, Trackball) {


  var Example = function(l1, h) {
    var exampleContainer = document.createElement('div');
    exampleContainer.classList.add('example');
    var beforeContainer = document.createElement('div');
    var splitContainer = document.createElement('div');
    beforeContainer.classList.add('viewport');
    splitContainer.classList.add('viewport');
    document.body.appendChild(exampleContainer);
    exampleContainer.appendChild(beforeContainer);
    exampleContainer.appendChild(splitContainer);
    var beforeViewport = new Viewport(beforeContainer);
    var splitViewport  = new Viewport(splitContainer);
    new Trackball([beforeViewport, splitViewport]);

    beforeViewport.addLine2D(l1, 0xff00ff);
    beforeViewport.addPlane2D(h, 0x00ff00);

    var splits = l1.splitBy(h); 
    splits.front && splitViewport.addLine2D(splits.front, 0xff0000);
    splits.back && splitViewport.addLine2D(splits.back, 0x0000ff);
    splitViewport.addPlane2D(h, 0x00ff00);

  }

  return Example;


});