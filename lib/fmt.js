// Adapted from 
// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
// by fearphage
define([], function() {

  return function(string) {
    var args = Array.prototype.slice.call(arguments, 1);
    return string.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  };
});