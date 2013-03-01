var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '..',
    nodeRequire: require,
});

var chai = requirejs('chai');
    assert = chai.assert;

chai.Assertion.includeStack = true;

requirejs('./spec/plane2d.test.js');
requirejs('./spec/plane3d.test.js');
requirejs('./spec/vertex2d.test.js');
requirejs('./spec/vertex3d.test.js');
requirejs('./spec/polygon2d.test.js');
requirejs('./spec/polygon3d.test.js');
