define([
        'lib/world3d', 
        'lib/polygon3d'], function(world, Polygon3D) { 


    var Region3D = function(polygons) {
        this.polygons = polygons;
    }

    Region3D.prototype.isValid = function() {
        return this.polygons.indexOf(undefined) === -1;
    }

    Region3D.prototype.splitBy = function(h) {
        var frontPolygons = [], backPolygons = [];
        var intersectedpolygons = [];
        this.polygons.forEach(function(polygon) {
            var splits = polygon.splitBy(h);
            splits.front && frontPolygons.push(splits.front);
            splits.back && backPolygons.push(splits.back);
            if(splits.front && splits.back) {
                intersectedpolygons.push(polygon);
            }
        })
        if (intersectedpolygons.length > 0) {
            // Sort the bounding polygons so that they form a valid boundary
            // i.e. all vertices are valid
            var that = this;
            var findValidPolygon = function(h, sequence) {

                var permutate = function(toHere, values) {
                    if (values.length === 1) {
                        var p = new Polygon3D(h, toHere.concat(values[0]));
                        return p.isConvex() ? p : undefined;
                    }

                    var found;
                    for (var i = 0; (i < values.length) && (!found); ++i) {
                        var newValues = values.slice(0);
                        newValues.splice(i, 1);
                        found = permutate(toHere.concat(values[i]), newValues);
                    }
                    return found;
                }
                return permutate([], sequence);
            }
            var capPolygon = findValidPolygon(h, intersectedpolygons.map(function(p) {
                return p.s;
            }));

            if (!capPolygon) {
                console.info(this.toEval());
                throw Error('no cap polygon');

            }

            frontPolygons.push(capPolygon);
            backPolygons.push(capPolygon);
        }   

        return {
            front: new Region3D(frontPolygons),
            back: new Region3D(backPolygons)
        }
    }

    // Create an eval string that can easily be copied & pasted into a test case
    Region3D.prototype.toEval = function() {
        return 'new Region3D([' + this.polygons.map(function(p) { return p.toEval() }).join(',') + '])';
    }

    Region3D.world = new Region3D([
        new Polygon3D().fromPlane(world.xPlus),
        new Polygon3D().fromPlane(world.xMinus),
        new Polygon3D().fromPlane(world.yPlus),
        new Polygon3D().fromPlane(world.yMinus),
        new Polygon3D().fromPlane(world.zPlus),
        new Polygon3D().fromPlane(world.zMinus)
    ]);


    return Region3D;

});