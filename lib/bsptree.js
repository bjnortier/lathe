define(['lib/plane2d', 'lib/polygon3d', 'lib/bspnode'], function(Plane3D, Polygon3D, Node) {

    var bigNumber = 1000000;
    var xPlusBig = new Plane3D(1,0,0,bigNumber),
        yPlusBig = new Plane3D(0,1,0,bigNumber),
        zPlusBig = new Plane3D(0,0,1,bigNumber),
        xMinusBig = new Plane3D(-1,0,0,bigNumber),
        yMinusBig = new Plane3D(0,-1,0,bigNumber),
        zMinusBig = new Plane3D(0,0,-1,bigNumber);

    var rootRegion = (function() {
        return [
            new Polygon3D(xPlusBig, [yPlusBig, zPlusBig, yMinusBig, zMinusBig]),
            new Polygon3D(xMinusBig, [yPlusBig, zMinusBig, yMinusBig, zPlusBig]),
            new Polygon3D(yPlusBig, [zPlusBig, xPlusBig, zMinusBig, xMinusBig]),
            new Polygon3D(yMinusBig, [zPlusBig, xMinusBig, zMinusBig, xPlusBig]),
            new Polygon3D(zPlusBig, [xPlusBig, yPlusBig, xMinusBig, yMinusBig]),
            new Polygon3D(zMinusBig, [xPlusBig, yMinusBig, xMinusBig, yPlusBig]),
        ]
    })();


    // var boundariesFromPlane = function(s) {
    //     this.bigNumber = bigNumber;
    //     var aAbs = Math.abs(this.s.a),
    //         bAbs = Math.abs(this.s.b),
    //         cAbs = Math.abs(this.s.c);

    //     // 6 planes will bound each reagion
    //     var frontPlanes, backPlanes;
    //     if ((aAbs >= bAbs) && (aAbs >= cAbs)) {
    //         frontPlanes = [s, yPlusBig, zPlusBig, yMinusBig, zMinusBig, xPlusBig];
    //         backPlanes = [s, yPlusBig, zMinusBig, yMinusBig, zPlusBig, xMinusBig];
    //     } else if ((bAbs >= aAbs) && (bAbs >= cAbs)) {
    //         frontPlanes = [s, zPlusBig, xPlusBig, zMinusBig, xMinusBig, yPlusBig];
    //         backPlanes = [s, zPlusBig, xMinusBig, zMinusBig, xPlusBig, yPlusBig];
    //     } else if ((cAbs >= aAbs) && (cAbs >= bAbs)) {
    //         frontPlanes = [s, xPlusBig, yPlusBig, xMinusBig, yMinusBig, zPlusBig];
    //         backPlanes = [s, xPlusBig, yPlusBig, xMinusBig, yMinusBig, zMinusBig];
    //     }

    //     var frontPolygons = [], backPolygons = [];
    //     for (var i = 0; i < 6; ++i) {
    //         var front = [];
    //         var back = [];
    //         for (var j = 0; j < 6; ++j) {
    //             if (i !== j) {
    //                 front.push(frontPlanes[j])
    //                 back.push(backPlanes[j])
    //             }
    //         }
    //     }

    //     return {
    //         front: frontPolygons;
    //         back: backPolygons;
    //     }
        
    // }

    var fromPolygons = function(polygons) {


        var frontBoundary = [], backBoundary = [];
        rootRegion.forEach(function(polygon) {
            var result = polygon.splitBy(polygons[0].s);
            result.front && frontBoundary.push(result.front);
            result.back && backBoundary.push(result.back);
        })
 
        return new Node(polygons[0].s, rootRegion, 
            new Node(undefined, frontBoundary, undefined, undefined),
            new Node(undefined, backBoundary, undefined, undefined));

        // var front = [], back = [];
        // for (var i = 1; i < polygons.length; ++i) {
        //     var splits = polygons[i].splitBy(polygons[0].s);
        //     splits.front && front.push(splits.front);
        //     splits.back && back.push(splits.back);
        // }
        // return new Node(
        //     polygons[0], 
        //     polygons[0].s,
        //     front.length > 0 ? fromPolygons(front) : undefined, 
        //     back.length  > 0 ? fromPolygons(back)  : undefined);
    }

    return {
        fromPolygons: fromPolygons
    }


});