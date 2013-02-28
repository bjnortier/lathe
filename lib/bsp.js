'use strict';
define([], function() {

    var Node = function(region, plane, back, front) {
        this.region = region;
        this.plane  = plane;
        this.back   = back;
        this.front  = front;
        // Object.freeze(this);
    }

    Node.prototype.clone = function(region) {
        var region = region || this.region;
        return new Node(
            this.label,
            region,
            this.plane,
            this.back.clone(),
            this.front.clone());
    }

    var Cell = function(label, inside, region) {
        this.label = label;
        this.inside = inside;
        this.region = region;
        // Object.freeze(this);
    }

    Cell.prototype.clone = function(region) {
        var region = region || this.region;
        return new Cell(this.label, this.inside, region);
    }

    var updateRegions = function(region, node) {
        if ((region === undefined)) { // || !region.isValid()) {
            return new Cell(node.label, false, undefined);
        }
        else if (node instanceof Cell) {
            return node.clone(region);
        } else {
            var splits = region.splitBy(node.plane);
            return new Node(
                node.label,
                region,
                node.plane,
                updateRegions(splits.back, node.back),
                updateRegions(splits.front, node.front))
        }
    }

    var complement = function(node) {
        if (node instanceof Cell) {
            return new Cell(node.label, !node.inside, node.region);
        } else {
            return new Node(
                node.label,
                node.region,
                node.plane, 
                complement(node.back),
                complement(node.front));
        }
    }
    
    var intersectionCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return updateRegions(t1.region, t2);
            } else {
                return t1;
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return t1;
            } else {
                return updateRegions(t1.region, t2);
            }
        }
    }
    
    var unionCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return t1;
            } else {
                return updateRegions(t1.region, t2);
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return updateRegions(t1.region, t2);
            } else {
                return t1;
            }
        }
    }

    var differenceCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return updateRegions(t1.region, complement(t2));
            } else {
                return t1;
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return updateRegions(t1.region, complement(t2));
            } else {
                return t1;
            }
        }
    }


    var symmetricDifferenceCellOp = function(t1, t2) {
        if (t1 instanceof Cell) {
            if (t1.inside) {
                return updateRegions(t1.region, complement(t2));
            } else {
                return updateRegions(t1.region, t2);
            }
        } else if (t2 instanceof Cell) {
            if (t2.inside) {
                return complement(t1);
            } else {
                return t1;
            }
        }
    }


    var partitionBspt = function(t, plane) {
        var splitByT = t.region.splitBy(t.plane);
        var splitByTFrontSplitByP = splitByT.front.splitBy(plane);
        var splitByTBackSplitByP = splitByT.back.splitBy(plane)

        var splitByP = t.region.splitBy(plane);
        var splitByPFrontSplitByT = splitByP.front.splitBy(t.plane);
        var splitByPBackSplitByT = splitByP.back.splitBy(t.plane)

        var pInPosHs = (splitByTFrontSplitByP.back !== undefined);
        var pInNegHs = (splitByTBackSplitByP.front !== undefined);

        var tInPosHS = (splitByPFrontSplitByT.back !== undefined);
        var tInNegHS = (splitByPBackSplitByT.front !== undefined);

        if (pInPosHs && !pInNegHs && !tInPosHS && tInNegHS) {
            return {
                inNegHs: new Node(
                    t.label,
                    splitByP.back, 
                    t.plane, 
                    t.back,
                    t.front.clone(splitByP.back)),
                inPosHs: t.front.clone(splitByP.front)
            }
        } else if (!pInPosHs && pInNegHs && tInPosHS && !tInNegHS) {
            return {
                inNegHs: t.back.clone(splitByP.back),
                inPosHs: new Node(
                    t.label,
                    splitByP.front, 
                    t.plane, 
                    t.back.clone(splitByP.front),
                    t.front),   
            }
        } else if (pInPosHs && pInNegHs && tInPosHS && tInNegHS) {
            return {
                inNegHs: new Node(
                    t.label,
                    splitByP.back, 
                    t.plane, 
                    t.back,
                    t.front.clone(splitByP.back)),
                inPosHs: new Node(
                    t.label,
                    splitByP.front, 
                    t.plane, 
                    t.back.clone(splitByP.front),
                    t.front),   
            }
        } else {
            throw Error('not implemented');
        }

    }
    
    var mergeBspts = function(t1, t2, cellOp) {
        if ((t1 instanceof Cell) || (t2 instanceof Cell)) {
            return cellOp(t1,t2);
        } else {
            var t2Partitioned = partitionBspt(t2, t1.plane);
            var negSubtree = mergeBspts(t1.back, t2Partitioned.inNegHs, cellOp);
            var posSubtree = mergeBspts(t1.front, t2Partitioned.inPosHs, cellOp);
            return new Node(
                t1.label,
                t1.region, 
                t1.plane, 
                negSubtree,
                posSubtree)
        }
    }

    var union = function(t1, t2) {
        return mergeBspts(t1, t2, unionCellOp);
    }

    var intersection = function(t1, t2) {
        return mergeBspts(t1, t2, intersectionCellOp);
    }

    var difference = function(t1, t2) {
        return mergeBspts(t1, t2, differenceCellOp);
    }

    var symmetricDifference = function(t1, t2) {
        return mergeBspts(t1, t2, symmetricDifferenceCellOp);
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
