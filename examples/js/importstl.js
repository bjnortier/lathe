requirejs.config({
  baseUrl:'..',
  paths: {
    'underscore': '../../node_modules/underscore/underscore',
    'backbone-events': '../../node_modules/backbone-events/lib/backbone-events',
    'gl-matrix': 'node_modules/gl-matrix/dist/gl-matrix',
  },
});

requirejs([
    'examples/js/importstlexample',
  ], 
  function(
    ImportSTLExample) {

    new ImportSTLExample('./stls/cube.stl');
    new ImportSTLExample('./stls/cylinder.stl');
    new ImportSTLExample('./stls/boolean.stl');

  });
