// Functions for converting between representations
//
'use strict';
define([
        'lib/plane3d', 
        'lib/polygon3d', 
        'lib/bsp',
    ], function(Plane3D, Polygon3D, BSP) {

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
        bsp3DtoBrep: bsp3DtoBrep
    }

});
