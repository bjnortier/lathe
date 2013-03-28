requirejs.config({
    baseUrl:'..',
    paths: {
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