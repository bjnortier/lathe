requirejs.config({
  baseUrl:'.',
  paths: {
    'gl-matrix' : 'node_modules/gl-matrix/dist/gl-matrix'
  },
});

chai.Assertion.includeStack = true;

requirejs(['bench/spec/specs'], function(specs) {

  assert = chai.assert;

  require(specs, function() {
      mocha.setup('bdd');
      mocha.run();
  });

});