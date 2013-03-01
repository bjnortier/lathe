define(['lib/bsp'], function(BSP) {

    var Node = BSP.Node;
    var Cell = BSP.Cell;

    var createConvexTree = function(planes) {
        if (planes.length) {
            var frontNode = new Cell(false);
            var backNode = createConvexTree(planes.slice(1));
            return new Node(planes[0], backNode, frontNode);
        } else {
            return new Cell(true);
        }
    }

    return {
        createConvexTree: createConvexTree
    }

});