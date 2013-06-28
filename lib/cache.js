define([], function() {


  var Cache = function() {

    var store = {};

    this.cacheOrStore = function(key, fn) {
      var cachedResult = store[key];
      if (cachedResult !== undefined) {
        return cachedResult;
      }
      var result = fn();
      store[key] = result;
      return result;
    }
  }

  return Cache;

});