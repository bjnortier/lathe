'use strict';

define([
    'lib/bench',
    'lib/polygon3d',
    'lib/conv',
    'lib/bsp',
    'lib/stlimport',
    'examples/js/viewport',
    'examples/js/trackball',
  ], function(Bench, Polygon3D, Conv, BSP, STLImport, Viewport, Trackball) {

    function Example(url) {

      var exampleContainer = document.createElement('div');
      exampleContainer.classList.add('example');
      var primitiveContainer = document.createElement('div');
      primitiveContainer.classList.add('viewport');
      document.body.appendChild(exampleContainer);
      exampleContainer.appendChild(primitiveContainer);
      var viewport = new Viewport(primitiveContainer);
      new Trackball([viewport]);

      var xhr = new XMLHttpRequest();

      function onloaded( event ) {
        if (event.target.status === 200 || event.target.status === 0 ) {
          var bsp = STLImport.parse(event.target.response || event.target.responseText);
          bsp.createSHPs(Polygon3D);
          var polygons = Conv.bspToBrep(bsp);
          viewport.addBRep(polygons, 0x00ff00);
        } else {
          console.error({ type: 'error', message: 'Couldn\'t load URL [' + url + ']', response: event.target.responseText });
        }
      }

      xhr.addEventListener('load', onloaded, false);

      xhr.addEventListener('progress', function(event) {
        console.log({ type: 'progress', loaded: event.loaded, total: event.total});
      }, false );

      xhr.addEventListener( 'error', function () {
        console.error({ type: 'error', message: 'Couldn\'t load URL [' + url + ']' });
      }, false );

      if (xhr.overrideMimeType) {
        xhr.overrideMimeType( 'text/plain; charset=x-user-defined');
      }
      xhr.open( 'GET', url, true );
      xhr.responseType = 'arraybuffer';
      xhr.send(null);

    }

    return Example;

  }); 