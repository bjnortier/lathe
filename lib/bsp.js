'use strict';
define([
    './plane2d',
    './plane3d',
    './line2d',
    './polygon3d',
  ], function(Plane2D, Plane3D, Line2D, Polygon3D) {

  var Node = function(plane, back, front) {
    this.plane  = plane;
    this.back   = back;
    this.front  = front;
  }

  // Front/back get and set is to ensure that the parent is set
  Node.prototype = {

    get back() {
      return this._back;
    },

    set back(val){
      this._back = val;
      val.parent = this;
    },

    get front() {
      return this._front;
    },

    set front(val){
      this._front = val;
      val.parent = this;
    }
  };

  Node.prototype.clone = function() {
    var v = new Node(
      this.plane,
      this.back.clone(),
      this.front.clone());
    v.shp = this.shp;
    v.complemented = this.complemented;
    return v;
  }

  Node.prototype.clipSHP = function(shp) {
    var shp = shp;
    if (this.parent) {
      var parentPlane = this.parent.plane;
      var splits = shp.splitBy(parentPlane);
      if (this.parent.back === this) {
        if (splits.back) {
          shp = splits.back;
        } else {
          shp = undefined;
        } 
      } else if (this.parent.front === this) {
        if (splits.front) {
          shp = splits.front;
        } else {
          shp = undefined;
        }
      }
      // Continue clipping to parents if the SHP still
      // exists
      if (shp) {
        return this.parent.clipSHP(shp);
      } else {
        return shp;
      }

    } else {
      return shp;
    }
  }

  Node.prototype.createSHPs = function(shpclass) {
    // shp is contructed from the hyperplane of the vertex,
    // clipped by each ancestor to this vertex.
    var shp = shpclass.fromPlane(this.plane);
    this.shp = this.clipSHP(shp)
    this.back.createSHPs && this.back.createSHPs(shpclass);
    this.front.createSHPs && this.front.createSHPs(shpclass);
    return this;

  }

  var Cell = function(inside) {
    this.inside = inside;
  }

  Cell.prototype.clone = function() {
    var c = new Cell(this.inside);
    c.complemented = this.complemented;
    return c;
  }

  var complement = function(node) {
    if (node instanceof Cell) {
      var c = new Cell(!node.inside);
      c.complemented = true;
      return c;
    } else {

      var v = new Node(
        node.plane, 
        complement(node.back),
        complement(node.front));
      v.shp = node.shp.reverse();
      v.complemented = true;
      return v;
    }
  }
  
  var intersectionCellOp = function(t1, t2) {
    if (t1 instanceof Cell) {
      return t1.inside ? t2 : t1;
    } else if (t2 instanceof Cell) {
      return t2.inside ? t1 : t2;
    }
  }
  
  var unionCellOp = function(t1, t2) {
    if (t1 instanceof Cell) {
      return t1.inside ? t1 : t2;
    } else if (t2 instanceof Cell) {
      return t2.inside ? t2 : t1;
    }
  }

  var differenceCellOp = function(t1, t2) {
    if (t1 instanceof Cell) {
      return t1.inside ? complement(t2) : t1;
    } else if (t2 instanceof Cell) {
      return t2.inside ? complement(t2) : t1;
    }
  }

  var symmetricDifferenceCellOp = function(t1, t2) {
    if (t1 instanceof Cell) {
      return t1.inside ? complement(t2) : t2;
    } else if (t2 instanceof Cell) {
      return t2.inside ? complement(t1) : t1;
    }
  }

  // [Thi87] Figure 41
  var splitBSP = function(v, h, Hshp, shpclass) {
    var t;
    if (v instanceof Cell) {
      return {
        back: v,
        front: v,
      }
    } else {

      Hshp = v.clipSHP(Hshp);

      // If no sub-hyperplane exists, then H doesn't intersect
      // the region of the current node v, so the result
      // is an outside cell. This will be condensed into a 
      // single outside cell in a subsequent step
      if (!Hshp) {
        return {
          back: new Cell(false),
          front: new Cell(false),
        }
      }

      var Vshp = v.shp;
      var HsplitByT = Hshp.splitBy(Vshp.s);
      var TsplitByH = Vshp.splitBy(h);

      if (HsplitByT.coincident && TsplitByH.coincident) {

        if (Vshp.s.isSameOrientation(h)) {
          return {
            back: v.back, 
            front: v.front
          }
        } else {
          return {
            back: v.front, 
            front: v.back,
          }
        }

      } else if (TsplitByH.front && TsplitByH.back && HsplitByT.front && HsplitByT.back) {

        t = splitBSP(v.back, h, Hshp, shpclass);
        var left_minus = t.back;
        var left_plus = t.front;

        t = splitBSP(v.front, h, Hshp, shpclass);
        var right_minus = t.back;
        var right_plus = t.front;

        t = Vshp.splitBy(h);
        var shp_left_tree = t.back;
        var shp_right_tree = t.front;

        var leftNode = new Node(v.plane, left_minus, right_minus);
        var rightNode = new Node(v.plane, left_plus, right_plus);
        leftNode.shp = shp_left_tree;
        rightNode.shp = shp_right_tree;

        return {
          back  : leftNode,
          front : rightNode,
        }

      } else {

        var TinHPlus = TsplitByH.front && !TsplitByH.back;
        var HinTPlus = HsplitByT.front && !HsplitByT.back;
        // Vshp in H+ and H behind Vshp
        // Case 4
        if (TinHPlus && !HinTPlus) {
          t = splitBSP(v.back, h, Hshp, shpclass);
          v.back = t.front;
          return {
            back: t.back,
            front: v,
          }
        // // Vshp in H+ and H in front of Vshp
        // // Case 5
        } else if (TinHPlus && HinTPlus) {
          t = splitBSP(v.front, h, Hshp, shpclass);
          v.front = t.front;
          return {
            back: t.back,
            front: v,
          }
        // // Vshp in H- and H behind Vshp
        // // Case 6
        } else if (!TinHPlus && !HinTPlus) {
          t = splitBSP(v.back, h, Hshp, shpclass);
          v.back = t.back;
          return {
            back: v,
            front: t.front,
          }
        // // Vshp in H- and H in front of Vshp
        // // Case 7
        } else if (HinTPlus && !TinHPlus) {
          t = splitBSP(v.front, h, Hshp, shpclass);
          v.front = t.back;
          return {
            back: v,
            front: t.front,
          }

        } else {
          throw Error('unexpected combination');
        }

      }

    }
  }
  
  var mergeBspts = function(t1, t2, cellOp, shpclass) {
    if ((t1 instanceof Cell) || (t2 instanceof Cell)) {
      return cellOp(t1,t2);
    } else {
      var split = splitBSP(t2, t1.plane, t1.shp, shpclass);
      var negSubtree = mergeBspts(t1.back, split.back, cellOp, shpclass);
      var posSubtree = mergeBspts(t1.front, split.front, cellOp, shpclass);
      t1.back = negSubtree;
      t1.front = posSubtree;
      return t1;
    }
  }

  var union = function(t1, t2, shpclass) {
    return mergeBspts(t1.clone(), t2.clone(), unionCellOp, shpclass);
  }

  var intersection = function(t1, t2, shpclass) {
    return mergeBspts(t1.clone(), t2.clone(), intersectionCellOp, shpclass);
  }

  var difference = function(t1, t2, shpclass) {
    return mergeBspts(t1.clone(), t2.clone(), differenceCellOp, shpclass);
  }

  var symmetricDifference = function(t1, t2, shpclass) {
    return mergeBspts(t1.clone(), t2.clone(), symmetricDifferenceCellOp, shpclass);
  }

  // Serialize to a non-circular Javascript object
  var serialize = function(obj) {
    if (obj instanceof Cell) {
      return {
        inside: obj.inside
      }
    } else {
      return {
        back : serialize(obj.back),
        front : serialize(obj.front),
        plane: obj.plane,
        shp: obj.shp,
        complemented: obj.complemented,
      }
    }
  }

  // Deserialize a BSP object that has been created by serialize().
  var deserialize = function(obj) {
    // Cell
    if (obj.hasOwnProperty('inside')) {
      return new Cell(obj.inside);
    } else {
      var back = deserialize(obj.back);
      var front = deserialize(obj.front);

      // 2D or 3D planes
      // var plane = obj.plane.hasOwnProperty('d') ?
      //   Plane3D.deserialize(obj.plane) :
      //   Plane2D.deserialize(obj.plane);
      var plane = Plane3D.deserialize(obj.plane);

      // 2D or 3D shp
      // var shp = obj.shp.s.hasOwnProperty('d') ?
      //   Polygon3D.deserialize(obj.shp) :
      //   Line2D.deserialize(obj.shp);
      var shp = Polygon3D.deserialize(obj.shp);

      // Create the node
      var v =  new Node(
        plane, back, front);
      v.shp = shp;
      v.complemented = obj.complemented;
      return v;
    }
  }

  return {
    Node: Node,
    Cell: Cell,
    union: union,
    intersection: intersection,
    difference: difference,
    symmetricDifference: symmetricDifference,
    serialize: serialize,
    deserialize: deserialize,
  }


});
