var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '..',
    nodeRequire: require,
});

var chai = requirejs('chai');
    assert = chai.assert;

var specs = requirejs('test/specs');
specs.forEach(function(spec) {
    requirejs(spec);
});
