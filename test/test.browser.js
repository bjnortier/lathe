requirejs.config({
    baseUrl:'..',
    paths: {
        'underscore': 'node_modules/underscore/underscore',
        'backbone-events': 'node_modules/backbone-events/lib/backbone-events',
    },
});

requirejs(['test/specs'], function(specs) {

    assert = chai.assert;

    require(specs, function() {
        mocha.setup('bdd');
        mocha.run();
    });

});