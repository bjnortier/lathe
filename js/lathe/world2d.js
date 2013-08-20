define(['./plane2d'], function(Plane2D) {

  var bigNumber = 1000000;
  return {
    bigNumber: bigNumber,
    xPlus  : new Plane2D(1,0,bigNumber),
    yPlus  : new Plane2D(0,1,bigNumber),
    xMinus : new Plane2D(-1,0,bigNumber),
    yMinus : new Plane2D(0,-1,bigNumber),
  };

});