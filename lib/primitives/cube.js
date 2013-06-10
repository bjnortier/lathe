define([
        '../bsp',
        '../vector3',
        '../plane3d',
        '../polygon3d',
        '../primitives/primitive',
    ] , function(BSP, Vector3, Plane3D, Polygon3D, Primitive) {

    var Cube = function(params) {
        if ((params.w === 0) || (params.d === 0) || (params.h === 0)) {
            this.bsp = new BSP.Cell(false);
        } else {
            var x = params.x || 0;
            var y = params.y || 0;
            var z = params.z || 0;
            this.bsp = Primitive.createConvexTree([
                new Plane3D(0,0,-1,0),
                new Plane3D(0,0,1,params.h),
                new Plane3D(1,0,0,params.w),
                new Plane3D(-1,0,0,0),
                new Plane3D(0,1,0,params.d),
                new Plane3D(0,-1,0,0),
            ].map(function(p) {
                return p.translate(x,y,z).rotate(new Vector3(0,0,1), Math.PI/4);
            }));
            this.bsp.createSHPs(Polygon3D);
        }
    }

    return Cube;
});