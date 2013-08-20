define([
    '../vector3',
    '../plane3d',
    '../polygon3d',
    '../bsp',
    '../primitives/primitive',
  ], function(Vector3, Plane3D, Polygon3D, BSP, Primitive) {

  var createSlice1 = function(x, y, z, r, halfZRes, thetaN, slice, sign) {
    var curvePlanes = [];   
    var phi = Math.PI/2*slice/halfZRes;
    var phi1 = Math.PI/2*(slice+1)/halfZRes;
    var rz = sign*r*Math.cos(phi);
    for (var i = 0; i < thetaN; ++i) {
      var theta = Math.PI*2*(i/thetaN);
      var theta1 = Math.PI*2*((i+1)/thetaN);
      var p1 = new Vector3(
        x+r*Math.cos(phi)*Math.cos(theta),
        y+r*Math.cos(phi)*Math.sin(theta),
        z+(sign*r)*Math.sin(phi));
      var p2 = new Vector3(
        x+r*Math.cos(phi)*Math.cos(theta1),
        y+r*Math.cos(phi)*Math.sin(theta1),
        z+(sign*r)*Math.sin(phi));
      var p3 = new Vector3(
        x+r*Math.cos(phi1)*Math.cos(theta),
        y+r*Math.cos(phi1)*Math.sin(theta),
        z+(sign*r)*Math.sin(phi1));
      if (sign > 0) {
        curvePlanes.push(new Plane3D.fromPoints(p1, p2, p3));
      } else {
        curvePlanes.push(new Plane3D.fromPoints(p1, p3, p2));
      }
    }

    var planeZ = new Plane3D(0,0,sign*1,sign*z+r*Math.sin(phi1));
    var curvedTree = Primitive.createConvexTree(curvePlanes);
    if (slice < halfZRes-1) {
      var front = createSlice1(x, y, z, r, halfZRes, thetaN, slice+1, sign);
      return new BSP.Node(planeZ, curvedTree, front);
    } else {
      return curvedTree;
    }

  }

   var createNode = function(r, startPi, endPi, d, maxD) {

    var midPi = (startPi + endPi)/2;
    if (d < maxD) {

      return new BSP.Node(
        new Plane3D(0,1,0,0).rotate(0,0,1,midPi*Math.PI),
        createNode(r, startPi, midPi, d+1, maxD),
        createNode(r, midPi, endPi, d+1, maxD));

    } else {

      return new BSP.Node(
          new Plane3D(1,0,0,r).rotate(0,0,1,midPi*Math.PI),
          new BSP.Cell(true),
          new BSP.Cell(false)
        );
    }

  };

  var createSlice2 = function(x, y, z, r, halfZRes, thetaN, slice, sign) {


    var phi = Math.PI/2*slice/halfZRes;
    var phi1 = Math.PI/2*(slice+1)/halfZRes;

    var planeZ = new Plane3D(0,0,sign*1,sign*z+r*Math.sin(phi1));
    var rz = Math.abs(sign*r*Math.cos(phi));
    var curvedTree = createNode(rz,0,2,1,5);

    if (slice < halfZRes-1) {
      var front = createSlice2(x, y, z, r, halfZRes, thetaN, slice+1, sign);
      return new BSP.Node(planeZ, curvedTree, front);
    } else {
      return new BSP.Node(planeZ, curvedTree, new BSP.Cell(false));
    }

  }

  return {
    createSlice: createSlice1
  }


});