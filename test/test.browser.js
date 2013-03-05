requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': 'node_modules/underscore/underscore',
        'backbone-events': 'node_modules/backbone-events/lib/backbone-events',
    },
});

chai.Assertion.includeStack = true;

requirejs(['test/spec/specs'], function(specs) {

    assert = chai.assert;

    require(specs, function() {
        mocha.setup('bdd');
        mocha.run();
    });

});