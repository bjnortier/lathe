// Functions for converting between representations
//
'use strict';
define([
        'lib/line2d', 
        'lib/plane2d', 
        'lib/plane3d', 
        'lib/polygon2d', 
        'lib/polygon3d', 
        'lib/bsp',
    ], function(Line2D, Plane2D, Plane3D, Polygon2D, Polygon3D, BSP) {

    // Classify a 2D line with respect to a bsp
    // [Thi87] Figure 16
    var classifyLine2DBSP2D = function(lines, v) {
        if (lines === undefined) {
            throw Error('no lines');
        }
        if (!lines.length) {
            return {inside: [], outside: [], on: []};
        } else if (v instanceof BSP.Cell) {
            if (v.inside) {
                return {inside: lines, outside: [], on: []};
            } else {
                return {inside: [], outside: lines, on: []};
            }

        } else {
            var accumulatedSplits = {back: [], front: [], coincident: []};
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                var splits = line.splitBy(v.plane);
                if (splits.back) {
                    accumulatedSplits.back = 
                        accumulatedSplits.back.concat(splits.back);
                }
                if (splits.front) {
                    accumulatedSplits.front = 
                        accumulatedSplits.front.concat(splits.front);
                }
                if (splits.coincident) {
                    accumulatedSplits.coincident = 
                        accumulatedSplits.coincident.concat(splits.coincident);
                }
            }

            var L_left = accumulatedSplits.back;
            var L_right = accumulatedSplits.front;
            var L_coincident = accumulatedSplits.coincident;

            var tmp = classifyLine2DBSP2D(L_left, v.back);
            var L_left_inS = tmp.inside;
            var L_left_outS = tmp.outside;
            var L_left_onS = tmp.on;

            tmp = classifyLine2DBSP2D(L_right, v.front);
            var L_right_inS = tmp.inside;
            var L_right_outS = tmp.outside;
            var L_right_onS = tmp.on;

            tmp = classifyLine2DBSP2D(L_coincident, v.back);
            var co_inL = tmp.inside;
            var co_outL = tmp.outside;
            var co_onL = tmp.on;

            tmp = classifyLine2DBSP2D(co_inL, v.front);
            var co_inLinR = tmp.inside;
            var co_inLoutR = tmp.outside;
            var co_inLonR = tmp.on;

            tmp = classifyLine2DBSP2D(co_outL, v.front);
            var co_outLinR = tmp.inside;
            var co_outLoutR = tmp.outside;
            var co_outLonR = tmp.on;

            var append = function(lists) {
                return lists.reduce(function(l, acc) {
                    return acc.concat(l);
                }, []);
            }

            return {
                inside: append([L_left_inS, L_right_inS, co_inLinR]),
                outside: append([L_left_outS, L_right_outS, co_outLoutR]),
                on: append([L_left_onS, L_right_onS, co_inLoutR, co_inLonR, co_outLinR, co_outLonR])
            } 
        }

    }

    // Convert from a 2D BSP to a Brep, which
    // is a list of unordered lines
    var bsp2DtoBrep = function(bsp) {

        // [Thi87] Chapter 3 - § Generating the boundary of a labeled-lead BSP tree
        // For each internal node v, a sub-hyperplane is contructed, then classified
        // with respect to the tree rooted at v

        var polygons = [];

        var accumulatePolygons = function(ancestors, v) {
            if (v instanceof BSP.Node) {

                // shp is contructed from the hyperplane of the vertex,
                // clipped by each ancestor to this vertex.
                var shp = Line2D.fromPlane(v.plane);
                for (var i = 0; i < ancestors.length; ++i) {
                    var ancestorPlane = ancestors[i].node.plane;
                    var splits = shp.splitBy(ancestorPlane);
                    if (ancestors[i].side === 'front') {
                        if (splits.front) {
                            shp = splits.front;
                        } else {
                            shp = undefined;
                            break;
                        }
                    } else if (ancestors[i].side === 'back') {
                        if (splits.back) {
                            shp = splits.back;
                        } else {
                            shp = undefined;
                            break;
                        }
                    }
                }

                // If the shp is clipped into non-existence there is
                // no brep polygon to accumulate
                if (shp) {
                    var classification = classifyLine2DBSP2D([shp], v);
                    polygons = polygons.concat(classification.on);
                }

                accumulatePolygons(ancestors.concat([{node: v, side: 'back'}]), v.back);
                accumulatePolygons(ancestors.concat([{node: v, side: 'front'}]), v.front);
            }
        }

        accumulatePolygons([], bsp);

        return polygons;

    }

    // Convert from a 3D BSP to a Brep, which
    // is a list of unordered polygons
    var bsp3DtoBrep = function(bsp) {

        // [Thi87] Chapter 3 - § Generating the boundary of a labeled-lead BSP tree
        // For each internal node v, a sub-hyperplane is contructed, then classified
        // with respect to the tree rooted at v

        var polygons = [];

        var accumulatePolygons = function(ancestors, v) {
            if (v instanceof BSP.Node) {

                // shp is contructed from the hyperplane of the vertex,
                // clipped by each ancestor to this vertex
                var shp = Polygon3D.fromPlane(v.plane);
                for (var i = 0; i < ancestors.length; ++i) {
                    var ancestorPlane = ancestors[i].node.plane;
                    var splits = shp.splitBy(ancestorPlane);
                    if ((ancestors[i].side === 'front') && splits.front) {
                        shp = splits.front;
                    } else if ((ancestors[i].side === 'back') && splits.back) {
                        shp = splits.back;
                    }
                }


                polygons.push(shp);
                accumulatePolygons(ancestors.concat([{node: v, side: 'back'}]), v.back);
                accumulatePolygons(ancestors.concat([{node: v, side: 'front'}]), v.front);
            }
        }

        accumulatePolygons([], bsp);

        return polygons;

    }



    return {
        bsp2DtoBrep: bsp2DtoBrep,
        bsp3DtoBrep: bsp3DtoBrep,
    }

});
