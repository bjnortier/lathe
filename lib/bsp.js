'use strict';
define([], function() {

    var Node = function(plane, back, front) {
        this.plane  = plane;
        this.back   = back;
        this.front  = front;
        back.parent = this;
        front.parent = this;
        // Object.freeze(this);
    }

    Node.prototype.clone = function() {
        var v = new Node(
            this.plane,
            this.back.clone(),
            this.front.clone());
        // v.shp = this.shp;
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
            if (shp) {
                return this.parent.clipSHP(shp);
            } else {
                // Break when non-existing
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
        // Object.freeze(this);
    }

    Cell.prototype.clone = function() {
        return this;
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
            v.shp = node.shp;
            v.complemented = true;
            return v;
        }
    }
    
    var intersectionCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return t2;
            } else {
                return t1;
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return t1;
            } else {
                return t2;
            }
        }
    }
    
    var unionCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return t1;
            } else {
                return t2;
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return t2;
            } else {
                return t1;
            }
        }
    }

    var differenceCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return complement(t2);
            } else {
                return t1;
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return complement(t2);
            } else {
                return t1;
            }
        }
    }

    var symmetricDifferenceCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return complement(t2);
            } else {
                return t2;
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return complement(t1);
            } else {
                return t1;
            }
        }
    }

    // [Thi87] Figure 41
    var splitBSP = function(v, h, shpclass) {
        var t;
        if (v instanceof Cell) {
            return {
                back: v,
                front: v,
            }
        } else {

            var Hshp = shpclass.fromPlane(h);
            var Vshp = shpclass.fromPlane(v.plane);
            // var Vshp = v.shp;

            var HsplitByT = Hshp.splitBy(Vshp.s);
            var TsplitByH = Vshp.splitBy(h);

            if (HsplitByT.coincident || TsplitByH.coincident) {
                throw Error('not implemented');

            } else if (TsplitByH.front && TsplitByH.back) {

                t = splitBSP(v.back, h, shpclass);
                var left_minus = t.back;
                var left_plus = t.front;

                t = splitBSP(v.front, h, shpclass);
                var right_minus = t.back;
                var right_plus = t.front;

                // t = Vshp.splitBy(h);
                // var shp_left_tree = t.back;
                // var shp_right_tree = t.front;

                var leftNode = new Node(v.plane, left_minus, right_minus);
                // leftNode.shp = shp_left_tree;

                var rightNode = new Node(v.plane, left_plus, right_plus);
                // rightNode.shp = shp_right_tree;

                return {
                    back  : leftNode,
                    front : rightNode,
                }

            } else {

                var TinHPlus = TsplitByH.front;
                var HinTPlus = HsplitByT.front;
                // Vshp in H+ and H behind Vshp
                // Case 4
                if (TinHPlus && !HinTPlus) {
                    t = splitBSP(v.back, h, shpclass);
                    var frontNode = new Node(v.plane, t.front, v.front);
                    // frontNode.shp = Vshp;
                    return {
                        back: t.back,
                        front: frontNode,
                    }
                // // Vshp in H+ and H in front of Vshp
                // // Case 5
                } else if (TinHPlus && HinTPlus) {
                    t = splitBSP(v.front, h, shpclass);
                    var frontNode = new Node(v.plane, v.back, t.front);
                    // frontNode.shp = Vshp;
                    return {
                        back: t.back,
                        front: frontNode,
                    }
                // // Vshp in H- and H behind Vshp
                // // Case 6
                } else if (!TinHPlus && !HinTPlus) {
                    t = splitBSP(v.back, h, shpclass);
                    var backNode = new Node(v.plane, t.back, v.front);
                    // backNode.shp = Vshp;
                    return {
                        back: backNode,
                        front: t.front,
                    }
                // // Vshp in H- and H in front of Vshp
                // // Case 7
                } else if (HinTPlus && !TinHPlus) {
                    t = splitBSP(v.front, h, shpclass);
                    var backNode = new Node(v.plane, v.back, t.back);
                    // backNode.shp = Vshp;
                    return {
                        back: backNode,
                        front: t.front,
                    }

                } else {
                    throw Error('!');
                }

            }

        }
    }
    
    var mergeBspts = function(t1, t2, cellOp, shpclass) {
        if ((t1 instanceof Cell) || (t2 instanceof Cell)) {
            return cellOp(t1,t2);
        } else {
            var split = splitBSP(t2, t1.plane, shpclass);
            var negSubtree = mergeBspts(t1.back, split.back, cellOp, shpclass);
            var posSubtree = mergeBspts(t1.front, split.front, cellOp, shpclass);
            var v = new Node(
                t1.plane, 
                negSubtree,
                posSubtree);
            return v;
        }
    }

    var union = function(t1, t2, shpclass) {
        return mergeBspts(t1, t2, unionCellOp, shpclass);
    }

    var intersection = function(t1, t2, shpclass) {
        return mergeBspts(t1, t2, intersectionCellOp, shpclass);
    }

    var difference = function(t1, t2, shpclass) {
        return mergeBspts(t1, t2, differenceCellOp, shpclass);
    }

    var symmetricDifference = function(t1, t2, shpclass) {
        return mergeBspts(t1, t2, symmetricDifferenceCellOp, shpclass);
    }

    return {
        Node: Node,
        Cell: Cell,
        union: union,
        intersection: intersection,
        difference: difference,
        symmetricDifference: symmetricDifference
    }


});
