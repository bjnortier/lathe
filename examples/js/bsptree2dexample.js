'use strict';

define([
        'lib/plane2d',
        'lib/polygon2d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane2D, Polygon2D, Viewport, Trackball) {

    var Node = function(region, plane, back, front) {
        this.region = region;
        this.plane  = plane;
        this.back   = back;
        this.front  = front;
        Object.freeze(this);
    }

    Node.prototype.clone = function() {
        return new Node(
            this.plane,
            this.back.clone(),
            this.front.clone());
    }

    var Cell = function(inside, region) {
        this.inside = inside;
        this.region = region;
        Object.freeze(this);
    }

    Cell.prototype.clone = function() {
        return new Cell(this.inside, this.region);
    }


    var Example = function(region) {

       var exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');
        var beforeContainer = document.createElement('div');
        var splitContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        splitContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(splitContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var splitViewport  = new Viewport(splitContainer);
        new Trackball([beforeViewport, splitViewport]);

        var worldRegion = Polygon2D.world;

        var createConvexTree = function(planes, region) {
            if (planes.length) {
                var splits = region.splitBy(planes[0]);
                var frontNode = new Cell(false, splits.front);
                var backNode = createConvexTree(planes.slice(1), splits.back);
                return new Node(region, planes[0], backNode, frontNode);
            } else {
                return new Cell(true, region);
            }
        }
        var t1 = createConvexTree(
            [new Plane2D(0,-1,-1), new Plane2D(1,1,10), new Plane2D(-1,0,-1)],
            worldRegion);
        var t2 = createConvexTree(
            [new Plane2D(0,-1,-3), new Plane2D(1,1,12), new Plane2D(-1,0,-3)],
            worldRegion);

        beforeViewport.addPolygon2D(t1.back.back.back.region, 0xffff00);
        beforeViewport.addPolygon2D(t2.back.back.back.region, 0x00ffff);
        
        // var p1 = new Polygon2D([new Plane2D(0,-1,-1), new Plane2D(1,1,10), new Plane2D(-1,0,-1)]);
        // var p2 = new Polygon2D([new Plane2D(0,-1,-3), new Plane2D(1,1,12), new Plane2D(-1,0,-3)]);


        // var t1 = new Node(
        //     p1.boundingPlanes[0],
        //     new Node(
        //         p1.boundingPlanes[1],
        //         new Node(
        //             p1.boundingPlanes[2],
        //             new Cell(true, p1),
        //             new Cell(false)),
        //         new Cell(false)),
        //     new Cell(false));

        // var t2 = new Node(
        //     p2.boundingPlanes[0],
        //     new Node(
        //         p2.boundingPlanes[1],
        //         new Node(
        //             p2.boundingPlanes[2],
        //             new Cell(true, p2),
        //             new Cell(false)),
        //         new Cell(false)),
        //     new Cell(false));

        // var mergeTreeWithCell = function(t1, t2) {
        //     if (t1 instanceof Cell) {
        //         if (t1.inside) {
        //             return t2;
        //         } else {
        //             return t1;
        //         }
        //     } else if (t2 instanceof Cell) {
        //         if (t2.inside) {
        //             return t1
        //         } else {
        //             return t2;
        //         }
        //     }
        // }

        // var partitionBspt = function(t, bp) {
            
        // }
        
        // var mergeBspts = function(t1, t2) {
        //     if ((t1 instanceof Cell) || (t2 instanceof Cell)) {
        //         return mergeTreeWithCell(t1,t2);
        //     } else {
        //         var t2Partitioned = partitionBspt(t2, t1.rootRegion.bp);
        //         var negSubtree = mergeBspts(t1.negSubtree, t2Partitioned.inNegHs);
        //         var posSubtree = mergeBspts(t1.posSubtree, t2Partitioned.inPosHs);
        //         return new Node(negSubtree, posSubtree, t1.rootRegion);
        //     }
        // }

    }

    return Example;

}); 