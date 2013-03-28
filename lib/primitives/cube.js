define([
        '../bsp',
        '../plane3d',
        '../polygon3d',
        '../primitives/primitive',
    ] , function(BSP, Plane3D, Polygon3D, Primitive) {

    var Cube = function(params) {
        if ((params.w === 0) || (params.d === 0) || (params.h === 0)) {
            this.bsp = new BSP.Cell(false);
        } else {
            this.bsp = Primitive.createConvexTree([
                new Plane3D(0,0,-1,-params.z), new Plane3D(0,0,1,params.z+params.h), 
                new Plane3D(1,0,0,params.x+params.w), new Plane3D(-1,0,0,-params.x), 
                new Plane3D(0,1,0,params.y+params.d), new Plane3D(0,-1,0,-params.y)
            ]); 
            this.bsp.createSHPs(Polygon3D);
        }
    }

    return Cube;
});