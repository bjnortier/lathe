'use strict';

define([
        'lib/plane2d',
        'lib/polygon2d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane2D, Polygon2D, Viewport, Trackball) {

    var Node = function(label, region, plane, back, front) {
        this.label = label;
        this.region = region;
        this.plane  = plane;
        this.back   = back;
        this.front  = front;
        Object.freeze(this);
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
        Object.freeze(this);
    }

    Cell.prototype.clone = function(region) {
        var region = region || this.region;
        return new Cell(this.label, this.inside, region);
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

        var createConvexTree = function(labels, planes, region) {
            if (planes.length) {
                var splits = region.splitBy(planes[0]);
                var frontNode = new Cell('+', false, splits.front);
                var backNode = createConvexTree(labels.slice(1), planes.slice(1), splits.back);
                return new Node(labels[0], region, planes[0], backNode, frontNode);
            } else {
                return new Cell('-', true, region);
            }
        }

        var plane0 = new Plane2D(0,-1,-1);
        var splits0 = worldRegion.splitBy(plane0);
        var t1 = 
            new Node('0', worldRegion, 
                plane0,
                // new Cell('-', false, splits0.back),
                createConvexTree(
                    ['1','2'],
                    [new Plane2D(1,1,10), new Plane2D(-1,0,-1)],
                    worldRegion.splitBy(new Plane2D(0,-1,-1)).back),
                createConvexTree(
                    ['3','4'],
                    [new Plane2D(1,-1,10), new Plane2D(-1,0,-1)],
                    splits0.front));
        // var t1 = createConvexTree(
        //     ['0','1','1'],
        //     [new Plane2D(0,-1,2), new Plane2D(1,1,5), new Plane2D(-1,0,-1)],
        //     worldRegion);

        var plane1 = new Plane2D(-1,0,-3);
        var splits1 = worldRegion.splitBy(plane1);
        var t2 = 
            new Node('a', worldRegion, 
                plane1,
                createConvexTree(
                    ['b','c'],
                    [new Plane2D(0,-1,-5), new Plane2D(1,1,12)],
                    splits1.back),
                createConvexTree(
                    ['d','e'],
                    [new Plane2D(0,-1,-5), new Plane2D(-1,1,5)],
                    splits1.front));


        var updateRegions = function(region, node) {
            if (region === undefined) {
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
        
        var intersection = function(t1, t2) {
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
        
        var union = function(t1, t2) {
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

        var difference = function(t1, t2) {
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


        var symmetricDifference = function(t1, t2) {
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

            console.log(pInPosHs, pInNegHs, tInPosHS, tInNegHS);

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

        var merged = mergeBspts(t1, t2, symmetricDifference);
        console.log(merged);

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

        findRegions(t1).forEach(function(region) {
            beforeViewport.addPolygon2D(region, 0xffff00);
        });
        findRegions(t2).forEach(function(region) {
            beforeViewport.addPolygon2D(region, 0x00ffff);
        });

        findRegions(merged).forEach(function(region, i) {
            splitViewport.addPolygon2D(region, 0xff0000);
        });

    }

    return Example;

}); 