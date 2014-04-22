define([
    './bsp',
  ], function(
    BSP) {

    function addLineToBsp(bsp, line) {

      
      if (bsp && (bsp instanceof BSP.Node)) {

        var splits = line.splitBy(bsp.plane);
        if (splits.back) {

          bsp.back = addLineToBsp(bsp.back, splits.back);
        }
        if (splits.front) {
          bsp.front = addLineToBsp(bsp.front, splits.front);
        }
        return bsp;

      } else {

        return new BSP.Node(line.s, new BSP.Cell(true), new BSP.Cell(false));

      }


    }

    function fromLines(lines) {
      var result;
      for (var i = 0; i < lines.length; ++i) {
        result = addLineToBsp(result, lines[i]);
      }
      return result;

    }

    return {
      fromLines: fromLines,
    };

  });