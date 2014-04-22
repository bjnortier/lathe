define([
    './bsp',
  ], function(
    BSP) {

    function addFaceToBsp(bsp, line) {
      
      if (bsp && (bsp instanceof BSP.Node)) {

        var splits = line.splitBy(bsp.plane);
        if (splits.back) {

          bsp.back = addFaceToBsp(bsp.back, splits.back);
        }
        if (splits.front) {
          bsp.front = addFaceToBsp(bsp.front, splits.front);
        }
        return bsp;

      } else {
        return new BSP.Node(line.s, new BSP.Cell(true), new BSP.Cell(false));
      }


    }

    // Faces can be either lines (2d) or polygons (3d)
    function fromFaces(faces) {
      var result;
      for (var i = 0; i < faces.length; ++i) {
        result = addFaceToBsp(result, faces[i]);
      }
      return result;

    }

    return {
      fromFaces: fromFaces,
    };

  });