define([], function() {
  
  var time = function(fn, msg, n) {
    var n = n || 5;
    var times = [];
    var result;
    var sum = 0;
    for (var i = 0; i < n; ++i) {
      var t1 = new Date().getTime();
      result = fn();
      times[i] = new Date().getTime()-t1;
      sum += times[i];
    }
    var mean = sum/n;
    var min = Infinity, max = -Infinity;
    var sigma = Math.sqrt(times.reduce(function(acc, t) {
      min = Math.min(min, t);
      max = Math.max(max, t);
      return acc + (mean-t)*(mean-t)
    }, 0)/n);
    console.log(msg, 'mean:', mean.toFixed(2), '±', sigma.toFixed(2), '\tmin:', min.toFixed(2), '\tmax:', max.toFixed(2));
    return result;
  };

  return time;
});

