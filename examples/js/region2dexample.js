define([
        'lib/plane2d',
        'lib/polygon2d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(Plane2D, Polygon2D, Viewport, Trackball) {


    var Node = function(plane, back, front, region) {
        this.plane  = plane;
        this.back   = back;
        this.front  = front;
        this.region = region;
    }

    Node.prototype.clone = function() {
        return new Node(
            this.plane,
            this.back.clone(),
            this.front.clone(),
            this.region);
    }

    var Cell = function(inside, region) {
        this.inside = inside;
        this.region = region;
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

        var updateRegion = function(region, node) {
            if (node instanceof Cell) { 
                if (node.inside) {
                    node.region = region;
                } else {
                    // Keep unchanged
                }
            } else {
                var newRegion = region.splitBy(node.plane);
                updateRegion(newRegion.back, node.back);
                updateRegion(newRegion.front, node.front);
            }
        }

        var intersect = function(t1,t2) {

            var merge = function(currentNode, region) {

                var newBackFront = ['back', 'front'].map(function(key) {
                    var newChild;
                    if (currentNode[key] instanceof Cell) {
                        if (currentNode[key].inside) {
                            newChild = t2.clone();
                            updateRegion(currentNode[key].region, newChild);
                        } else {
                            newChild = new Cell(false);
                        }
                    } else {
                        newChild = merge(currentNode[key], t2);
                    }
                    return newChild;
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

        var newTree = intersect(t1, t2);
        var regions = findRegions(newTree);


        regions.forEach(function(region) {
            splitViewport.addPolygon2D(region, 0xff0000);
        });

        splitViewport.addPolygon2D(p1, 0xffff00);
        splitViewport.addPolygon2D(p2, 0x00ffff);

    }

    return Example;

}); 