define([], function() {
  
  var time = function(fn, msg) {
    var t1 = new Date().getTime();
    var r = fn();
    console.log(msg, new Date().getTime()-t1);
    return r;
  };
  
  return {
    time: time
  };

});