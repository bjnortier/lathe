define([
        '../plane3d',
        '../polygon3d',
        '../primitives/primitive',
    ] , function(Plane3D, Polygon3D, Primitive) {

    var Cube = function(params) {
        this.bsp = Primitive.createConvexTree([
            new Plane3D(0,0,-1,-params.z), new Plane3D(0,0,1,params.z+params.h), 
            new Plane3D(1,0,0,params.x+params.w), new Plane3D(-1,0,0,-params.x), 
            new Plane3D(0,1,0,params.y+params.d), new Plane3D(0,-1,0,-params.y)
        ]); 
        this.bsp.createSHPs(Polygon3D);
    }

    return Cube;
});