'use strict';

define([
        'lib/plane2d',
        'lib/polygon2d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane2D, Polygon2D, Viewport, Trackball) {


    var Node = function(plane, back, front) {
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

        var p1 = new Polygon2D([new Plane2D(0,-1,-1), new Plane2D(1,1,10), new Plane2D(-1,0,-1)]);
        var p2 = new Polygon2D([new Plane2D(0,-1,-3), new Plane2D(1,1,12), new Plane2D(-1,0,-3)]);

        beforeViewport.addPolygon2D(p1, 0xffff00);
        beforeViewport.addPolygon2D(p2, 0x00ffff);

        var t1 = new Node(
            p1.boundingPlanes[0],
            new Node(
                p1.boundingPlanes[1],
                new Node(
                    p1.boundingPlanes[2],
                    new Cell(true, p1),
                    new Cell(false)),
                new Cell(false)),
            new Cell(false));

        var t2 = new Node(
            p2.boundingPlanes[0],
            new Node(
                p2.boundingPlanes[1],
                new Node(
                    p2.boundingPlanes[2],
                    new Cell(true, p2),
                    new Cell(false)),
                new Cell(false)),
            new Cell(false));

        var updateRegions = function(key, plane, node) {
            if (node instanceof Cell) { 
                if (node.region) {
                    var splitRegion = node.region.splitBy(plane);
                    return new Cell(node.inside, splitRegion[key]);
                } else {
                    return node.clone();
                }
            } else {
                return new Node(node.plane, 
                    updateRegions(key, plane, node.back), 
                    updateRegions(key, plane, node.front));
            }
        }

        var intersect = function(t1,t2) {

            var merge = function(currentNode, currentT2) {

                var newBackFront = ['back', 'front'].map(function(key) {
                    var newChild;
                    if (currentNode[key] instanceof Cell) {
                        if (currentNode[key].inside) {
                            newChild = currentT2;
                        } else {
                            newChild = new Cell(false);
                        }
                    } else {
                        // Clone t2 and update regions
                        var newT2 = currentT2.clone();
                        updateRegions(key, currentNode.plane, newT2);
                        newChild = merge(currentNode[key], newT2);
                    }
                    return newChild;
                });
                return new Node(currentNode.plane, newBackFront[0], newBackFront[1]);
            }

            var merged = merge(t1,t2);
            console.log(merged);
            return merged;

        }

        var union = function(t1,t2) {

            var merge = function(currentNode, currentT2) {

                var newBackFront = ['back', 'front'].map(function(key) {
                    if (currentNode[key] instanceof Cell) {
                        if (currentNode[key].inside) {
                            return currentNode[key];
                        } else {
                            return updateRegions(key, currentNode.plane, currentT2.clone());
                        }
                    } else {
                        // Clone t2 and update regions
                        var newT2 = updateRegions(key, currentNode.plane, currentT2.clone());
                        return merge(currentNode[key], newT2);
                    }
                });
                return new Node(currentNode.plane, newBackFront[0], newBackFront[1]);
            }

            var merged = merge(t1,t2);
            console.log(merged);
            return merged;

        }

        var findRegions = function(node) {
            if (node instanceof Cell) {
                if (node.inside) {
                    return node.region;
                } else {
                    return undefined;
                }
            } else {
                var backRegions = findRegions(node.back);
                var frontRegions = findRegions(node.front);
                var regions = [];
                backRegions && (regions = regions.concat(backRegions));
                frontRegions && (regions = regions.concat(frontRegions));
                return regions;
            }

        }

        var newTree = union(t1, t2);
        var regions = findRegions(newTree);
        console.log(regions);

        regions.forEach(function(region, i) {
            splitViewport.addPolygon2D(region, 0xff0000, i+1);
        });

        splitViewport.addPolygon2D(p1, 0xffff00);
        splitViewport.addPolygon2D(p2, 0x00ffff);

    }

    return Example;

}); 