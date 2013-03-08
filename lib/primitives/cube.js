define([
        '../plane3d',
        '../polygon3d',
        '../primitives/primitive',
    ] , function(Plane3D, Polygon3D, Primitive) {

    var Cube = function(x,y,z,w,d,h) {
        this.bsp = Primitive.createConvexTree([
            new Plane3D(0,0,-1,-z), new Plane3D(0,0,1,z+h), 
            new Plane3D(1,0,0,x+w), new Plane3D(-1,0,0,-x), 
            new Plane3D(0,1,0,y+d), new Plane3D(0,-1,0,-y)
        ]); 
        this.bsp.createSHPs(Polygon3D);
    }

    return Cube;
});