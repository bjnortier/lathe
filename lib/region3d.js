define([
        'lib/world3d', 
        'lib/polygon3d']    , function(world, Polygon3D) { 


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
            if (splits.front && splits.back) {
                intersectedpolygons.push(polygon);
            } else {
                if (!splits.front && splits.touchedFront) {
                    intersectedpolygons.push(polygon);
                }
                // if (!splits.back && splits.touchedBack) {
                //     intersectedpolygons.push(polygon);
                // }
            }
        })
        if (intersectedpolygons.length > 0) {
            // Sort the bounding polygons so that they form a valid boundary
            // i.e. all vertices are valid
            var that = this;

            // var findValidPolygon = function(h, sequence) {

            //     var permutate = function(toHere, values) {
            //         if (values.length === 1) {
            //             var p = new Polygon3D(h, toHere.concat(values[0]), true);
            //             if (p.isConvex()) {
            //                 // All the vertices must lie on one of the intersected
            //                 // polygons
            //                 var vertices = p.toVertices();
            //                 var onAPlane = false;
            //                 for (var i = 0; (i < intersectedpolygons.length) && (!onAPlane); ++i) {
            //                     if (vertices[i].orientationToPlane(intersectedpolygons[i].s) === '0') {
            //                         onAPlane = true;
            //                     }
            //                 }
            //                 if (onAPlane) {
            //                     return p;
            //                 } else {
            //                     return undefined;
            //                 }
            //             } else {
            //                 return undefined;
            //             } 
            //         }

            //         var found;
            //         for (var i = 0; (i < values.length) && (!found); ++i) {
            //             var newValues = values.slice(0);
            //             newValues.splice(i, 1);
            //             found = permutate(toHere.concat(values[i]), newValues);
            //         }
            //         return found;
            //     }
            //     return permutate([], sequence);
            // }

            var capPolygons = [];
            var findValidPolygon = function(h, sequence) {

                var permutate = function(toHere, values) {
                    if (values.length === 1) {
                        var p = new Polygon3D(h, toHere.concat(values[0]), true);
                        if (p.isConvex2()) {
                            // // All the vertices must lie on one of the intersected
                            // // polygons
                            // var vertices = p.toVertices();
                            // var onAPlane = false;
                            // for (var i = 0; (i < intersectedpolygons.length) && (!onAPlane); ++i) {
                            //     if (vertices[i].orientationToPlane(intersectedpolygons[i].s) === '0') {
                            //         onAPlane = true;
                            //     }
                            // }
                            // if (onAPlane) {
                            //     capPolygons.push(p);
                            // } 


                            var capCoordiantes = p.toVertices().map(function(v) {
                                return v.toCoordinate();
                            })

                            var foundAll = true;
                            for (var j = 0; j < capCoordiantes.length; ++j) {
                                var foundVertex = false;
                                for (var i = 0; (i < frontPolygons.length) && (!foundVertex); ++i) {
                                    var frontCoordinates = frontPolygons[i].toVertices().map(function(v) {
                                        return v.toCoordinate();
                                    })
                                    // console.log('front', frontCoordinates);
                                    for (var k = 0; (k < frontCoordinates.length) && (!foundVertex); ++k) {
                                        if (capCoordiantes[j].equals(frontCoordinates[k])) {
                                            foundVertex = true;
                                            break;
                                        }
                                    }
                                }
                                if (!foundVertex) {
                                    foundAll = false;
                                    break;
                                }
                            }
                            if (foundAll) {
                                capPolygons.push(p);
                            }


                        } 
                    }

                    for (var i = 0; (i < values.length); ++i) {
                        var newValues = values.slice(0);
                        newValues.splice(i, 1);
                        permutate(toHere.concat(values[i]), newValues);
                    }
                }
                permutate([sequence[0]], sequence.slice(1));
            }
            var capPolygon = findValidPolygon(h, intersectedpolygons.map(function(p) {
                return p.s;
            }));

            if (!capPolygons.length) {
                console.info(this.toEval());
                console.info(h.toEval());
                throw Error('no cap polygon');

            } else {
                console.log('how many?', capPolygons.length)
                if (capPolygons.length > 1 ){
                    console.warn('multiple cap polygons');
                }
                var capPolygon = capPolygons[0];

                // console.log('cap', capCoordiantes);
                // console.log(foundVertex);

                // console.log(capPolygons[1].isConvex2())
                frontPolygons.push(capPolygon);
                backPolygons.push(capPolygon);
            }
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
        Polygon3D.fromPlane(world.xPlus),
        Polygon3D.fromPlane(world.xMinus),
        Polygon3D.fromPlane(world.yPlus),
        Polygon3D.fromPlane(world.yMinus),
        Polygon3D.fromPlane(world.zPlus),
        Polygon3D.fromPlane(world.zMinus)
    ]);

    return Region3D;

});