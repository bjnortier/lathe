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
        
        var mergeTreeWithCell = function(t1, t2) {
            if (t1 instanceof Cell) {
                if (t1.inside) {
                    return t2;
                } else {
                    return t1;
                }
            } else if (t2 instanceof Cell) {
                if (t2.inside) {
                    return t1
                } else {
                    return t2;
                }
            }
        }

        var partitionBspt = function(t, region, plane) {
            var tSplits = region.splitBy(t.plane);
            var tFrontSplits = tSplits.front.splitBy(plane);
            var tBackSplits = tSplits.back.splitBy(plane)

            var pSplits = region.splitBy(plane);
            var pFrontSplits = pSplits.front.splitBy(t.plane);
            var pBackSplits = pSplits.back.splitBy(t.plane)

            var pInPosHs = (tFrontSplits.back !== undefined);
            var pInNegHs = (tBackSplits.front !== undefined);

            var tInPosHS = (pFrontSplits.back !== undefined);
            var tInNegHS = (pBackSplits.front !== undefined);

            console.log(pInPosHs, pInNegHs, tInPosHS, tInNegHS);

            if (pInPosHs && !pInNegHs && !tInPosHS && tInNegHS) {
                return {
                    inNegHs: new Node(
                        pSplits.back, 
                        t.plane, 
                        t.back,
                        t.front),
                    inPosHs: t
                }
            }
            if (pInPosHs && pInNegHs && tInPosHS && tInNegHS) {
                return {
                    inNegHs: new Node(
                        pSplits.back, 
                        t.plane, 
                        t.back,
                        t.front),
                    inPosHs: new Node(
                        pSplits.front, 
                        t.plane, 
                        t.back,
                        t.front),   
                }
            }
 
        }

        var updateLeafRegions = function(key, plane, node) {
            if (node instanceof Cell) { 
                if (node.region) {
                    var splitRegion = node.region.splitBy(plane);
                    return new Cell(node.inside, splitRegion[key]);
                } else {
                    return node.clone();
                }
            } else {
                var splitRegion = node.region.splitBy(plane);
                return new Node(
                    splitRegion[key],
                    node.plane, 
                    updateLeafRegions(key, plane, node.back), 
                    updateLeafRegions(key, plane, node.front));
            }
        }
        
        var mergeBspts = function(t1, t2) {
            if ((t1 instanceof Cell) || (t2 instanceof Cell)) {
                return mergeTreeWithCell(t1,t2);
            } else {
                var t2Partitioned = partitionBspt(t2, t1.region, t1.plane);
                var negSubtree = mergeBspts(t1.back, t2Partitioned.inNegHs);
                var posSubtree = mergeBspts(t1.front, t2Partitioned.inPosHs);
                return new Node(
                    t1.region, 
                    t1.plane, 
                    updateLeafRegions('back', t1.plane, negSubtree),
                    updateLeafRegions('front', t1.plane, posSubtree));
            }
        }

        var merged = mergeBspts(t1, t2);
        console.log(merged);

        var regions = [];
        var findRegions = function(node, toHere) {
            if (node instanceof Cell) {
                if (node.inside) {
                    regions.push(toHere.concat(node));
                } 
            } else {
                var backRegions = findRegions(node.back, toHere.concat(node));
                var frontRegions = findRegions(node.front, toHere.concat(node));
            }

        }

        findRegions(merged, []);
        console.log(regions);

        regions.forEach(function(region, i) {
            // A regions here is a list of nodes
            var result = Polygon2D.world;
            region.forEach(function(node) {
                if (node instanceof Node) {
                    result = result.splitBy(node.plane).back;
                }
            });
            splitViewport.addPolygon2D(result, 0xff0000, i+1);
        });
        splitViewport.addPolygon2D(t1.back.back.back.region, 0xffff00);
        splitViewport.addPolygon2D(t2.back.back.back.region, 0x00ffff);

    }

    return Example;

}); 