define(['lib/bspnode'], function(Node) {

    var partitionBSP = function(node, polygon) {
        var partitionPlane = node.polygon.s;
        var splitResult = polygon.splitBy(partitionPlane);
        if (splitResult.front && splitResult.back) {
            return {
                front: new Node(node.polygon, partitionPlane, node.front, node.back),
                back: new Node(node.polygon, partitionPlane, node.front, node.back),
            }
        } else if (splitResult.front && !splitResult.back) {
            return {
                front: new Node(node.polygon, partitionPlane, node.front, node.back),
                back: undefined,
            }
        } else if (!splitResult.front && splitResult.back) {
            return {
                front: undefined,
                back: new Node(node.polygon, partitionPlane, node.front, node.back),
            }
        }
        
    }

    var mergeTreeWithCell = function(t1, t2) {
        return t1 === undefined ? t2 : t1;
    }
    
    var Merger = function() {

        var mergeTrees = function(t1, t2) {
            if ((t1 === undefined) || (t2 === undefined)) {
                return mergeTreeWithCell(t1, t2);
            } else {
                var t2Partitioned = partitionBSP(t2, t1.polygon);
                var backSubtree = mergeTrees(t1.back, t2Partitioned.back);
                var frontSubtree = mergeTrees(t1.front,t2Partitioned.front);
                return new Node(t1.polygon, t2.partitionPlane, frontSubtree, backSubtree);
            }
        }

        this.mergeTrees = mergeTrees;

    }

    return {
        Merger: Merger,
    }

});
