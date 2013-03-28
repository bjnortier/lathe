define(['./plane3d'], function(Plane3D) {

    var bigNumber = 1000000;
    return {
        bigNumber: bigNumber,
        xPlus  : new Plane3D(1,0,0,bigNumber),
        yPlus  : new Plane3D(0,1,0,bigNumber),
        zPlus  : new Plane3D(0,0,1,bigNumber),
        xMinus : new Plane3D(-1,0,0,bigNumber),
        yMinus : new Plane3D(0,-1,0,bigNumber),
        zMinus : new Plane3D(0,0,-1,bigNumber),
    };

});