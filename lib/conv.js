// Functions for converting between representations
//
'use strict';
define([
    './line2d', 
    './plane2d', 
    './plane3d', 
    './polygon2d', 
    './polygon3d', 
    './bsp',
  ], function(Line2D, Plane2D, Plane3D, Polygon2D, Polygon3D, BSP) {

  var ensureSameOrientation = function(shps, h) {
    return shps.map(function(shp) {
      if (!shp.s.isSameOrientation(h)) {
        return shp.reverse();
      } else {
        return shp;
      }
    });
  }

  var ensureOppositeOrientation = function(shps, h) {
    return shps.map(function(shp) {
      if (shp.s.isSameOrientation(h)) {
        return shp.reverse();
      } else {
        return shp;
      }
    });
  }

  // Classify a set of sub-hyperplanes with respect to a bsp
  // [Thi87] Figure 16
  var classifyWrtBSP = function(shps, v) {
    if (shps === undefined) {
      throw Error('no shps');
    }
    if (!shps.length) {
      return {inside: [], outside: [], on: []};
    } else if (v instanceof BSP.Cell) {
      if (v.inside) {
        return {inside: shps, outside: [], on: []};
      } else {
        return {inside: [], outside: shps, on: []};
      }

    } else {
      var accumulatedSplits = {back: [], front: [], coincident: []};
      for (var i = 0; i < shps.length; ++i) {
        var shp = shps[i];
        var splits = shp.splitBy(v.plane);
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

      var tmp = classifyWrtBSP(L_left, v.back);
      var L_left_inS = tmp.inside;
      var L_left_outS = tmp.outside;
      var L_left_onS = tmp.on;

      tmp = classifyWrtBSP(L_right, v.front);
      var L_right_inS = tmp.inside;
      var L_right_outS = tmp.outside;
      var L_right_onS = tmp.on;

      tmp = classifyWrtBSP(L_coincident, v.back);
      var co_inL = tmp.inside;
      var co_outL = tmp.outside;
      var co_onL = tmp.on;

      tmp = classifyWrtBSP(co_inL, v.front);
      var co_inLinR = tmp.inside;
      var co_inLoutR = ensureSameOrientation(tmp.outside, v.plane);
      var co_inLonR = tmp.on;

      tmp = classifyWrtBSP(co_outL, v.front);
      var co_outLinR = ensureOppositeOrientation(tmp.inside, v.plane);
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

  // Convert from a BSP to a Brep, which is an unordered array of lines
  // for a 2D BSP, ot an unordered array of polygons for a 3D bsp
  var bspToBrep = function(bsp) {

    // [Thi87] Chapter 3 - § Generating the boundary of a labeled-lead BSP tree
    // For each internal node v, a sub-hyperplane is contructed, then classified
    // with respect to the tree rooted at v
    // 
    // Our BSP is already augmented with the sub-hyperplanes, so they 
    // only need to be classified wrt the tree

    var breps = [];
    var accumulateBreps = function(v) {
      if (v instanceof BSP.Node) {
        var classification = classifyWrtBSP([v.shp], v);
        if (classification.on.length) {
          breps = breps.concat(classification.on);
        } 
        accumulateBreps(v.back);
        accumulateBreps(v.front);
      }
    }
    accumulateBreps(bsp);

    return breps;

  }


  return {
    bspToBrep: bspToBrep,
  }

});
