var BSP = {};

(function() {
    var Node = function(partition, front, back) {
        this.partition = partition;
        if (front) {
            this.front = front;
        }
        if (back) { 
            this.back = back;
        }
    }

    var Merger = function(mergeTreeWithCell, partitionBSP) {

        var mergeTrees = function(t1, t2) {
            if ((t1 === undefined) || (t2 === undefined)) {
                return mergeTreeWithCell(t1, t2);
            } else {
                var t2Partitioned = partitionBSP(t2, t1.partition);
                var backSubtree = mergeTrees(t1.back, t2Partitioned.back);
                var frontSubtree = mergeTrees(t1.front,t2Partitioned.front);
                return new Node(t1.partition, frontSubtree, backSubtree);
            }
        }

        this.mergeTrees = mergeTrees;

    }

    BSP.Node = Node;
    BSP.Merger = Merger;
})();

// Requirejs
if (typeof define === "function") {
    define([], function() {
        return BSP;
    });
}