define([
        'lib/world3d', 
        'lib/polygon3d'], function(world, Polygon3D) { 


    var Region3D = function(polygons) {
        this.polygons = polygons;
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
            var findValidPolygon = function(h, sequence) {

                var permutate = function(toHere, values) {
                    if (values.length === 1) {
                        try {
                            var p = new Polygon3D(h, toHere.concat(values[0]));
                            p.toVertices();
                            return p;
                        } catch (e) {
                            return undefined;
                        }
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

            frontPolygons.push(capPolygon);
            backPolygons.push(capPolygon);
        }   

        return {
            front: new Region3D(frontPolygons),
            back: new Region3D(backPolygons)
        }
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