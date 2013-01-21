define(['lib/plane'], function(Plane) {

    var bigNumber = 1000000;
    return {
        bigNumber: bigNumber,
        xPlus  : new Plane(1,0,0,bigNumber),
        yPlus  : new Plane(0,1,0,bigNumber),
        zPlus  : new Plane(0,0,1,bigNumber),
        xMinus : new Plane(-1,0,0,bigNumber),
        yMinus : new Plane(0,-1,0,bigNumber),
        zMinus : new Plane(0,0,-1,bigNumber),
    };

});