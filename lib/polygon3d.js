// Convex polygon objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf


define(['lib/vector3', 'lib/plane3d', 'lib/world3d', 'lib/vertex3d'], function(Vector3, Plane3D, world3d, Vertex3D) {

    var Polygon3D = function(s, boundingPlanes, supressCheck) {
        this.s = s;
        this.boundingPlanes = boundingPlanes;
        if (!supressCheck) {
            this.toVertices();
        }
    }

    // Create an eval string that can easily be copied & pasted into a test case
    Polygon3D.prototype.toEval = function() {
        return 'new Polygon3D(' + 
                    this.s.toEval() + ',[' + 
                    this.boundingPlanes.map(function(p) { return p.toEval()}).join(',') + '])';
    }

    Polygon3D.prototype.toVertices = function() {
        if (this.vertices) {
            return this.vertices;
        }
        var n = this.boundingPlanes.length;
        var that = this;
        this.vertices = this.boundingPlanes.map(function(bi, i) {
            var bmin1 = that.boundingPlanes[(i+n-1) % n];
            return new Vertex3D(that.s, bmin1, bi);
        });
        return this.vertices;
    }

    Polygon3D.prototype.toCoordinates = function() {
        if (this.coordinates) {
            return this.coordinates;
        }
        this.coordinates = this.toVertices().map(function(v) {
            return v.toCoordinate();
        })
        return this.coordinates;
    }

    Polygon3D.prototype.isConvex = function() {
        try {
            var vertices = this.toVertices();
            if (vertices.length === 3) {
                return true;
            }

            // var vectors = vertices.map(function(v) {
            //     return v.toCoordinate();
            // });

            // var startToVs = [];
            // for (var i = 1; i < vectors.length; ++i) {
            //     startToVs.push(vectors[i].sub(vectors[0]));
            // }
            // var cross012 = startToVs[1].cross(startToVs[0]);
            // for (var i = 2; i < startToVs.length; ++i) {
            //     var cross = startToVs[i].cross(startToVs[i-1]);
            //     if (cross.dot(cross012) < 0) {
            //         return false;
            //     }
            // }

            return true;
        } catch (e) {
            if (e.name === 'InvalidVertex') {
                return false;
            }
            throw e;
        }
    }

    // Create a polygon from the plane a a very big box
    Polygon3D.fromPlane = function(s) {
        var aAbs = Math.abs(s.a),
            bAbs = Math.abs(s.b),
            cAbs = Math.abs(s.c);
        var boundingPlanes;
        if ((aAbs >= bAbs) && (aAbs >= cAbs)) {
            if (s.a > 0) {
                boundingPlanes = [world3d.yPlus, world3d.zPlus, world3d.yMinus, world3d.zMinus];
            } else {
                boundingPlanes = [world3d.yPlus, world3d.zMinus, world3d.yMinus, world3d.zPlus];
            }
        } else if ((bAbs >= aAbs) && (bAbs >= cAbs)) {
            if (s.b > 0) {
                boundingPlanes = [world3d.zPlus, world3d.xPlus, world3d.zMinus, world3d.xMinus];
            } else {
                boundingPlanes = [world3d.zPlus, world3d.xMinus, world3d.zMinus, world3d.xPlus];
            }
        } else if ((cAbs >= aAbs) && (cAbs >= bAbs)) {
            if (s.c > 0) {
                boundingPlanes = [world3d.xPlus, world3d.yPlus, world3d.xMinus, world3d.yMinus];
            } else {
                boundingPlanes = [world3d.xPlus, world3d.yMinus, world3d.xMinus, world3d.yPlus];
            }
        }
        return new Polygon3D(s, boundingPlanes) ;
    }

    Polygon3D.prototype.reverse = function() {
        return new Polygon3D(this.s.reverse, this.boundingPlanes.slice(0).reverse());
    }

    // Split polygon with plane h as per [1] § 3.2 
    Polygon3D.prototype.splitBy = function(h) {
        if (this.s.isCoincident(h)) {
            if (this.s.isSameOrientation(h)) {
                return { 
                    front: undefined,
                    back: undefined,
                    coincident: this,
                }
            } else {
                return {
                    front: undefined,
                    // back: 
                    back: undefined,
                    coincident: this,
                }
            }
        } else {
            var frontOutputPlanes = [];
            var backOutputPlanes = [];
            var n = this.boundingPlanes.length;

            var touchedBack = false;
            var touchedFront = false;

            var orientations = [];
            for (var i = 0; i < n; ++i) {
                var bi       = this.boundingPlanes[i];
                var bi_plus1 = this.boundingPlanes[(i+1) % n];
                orientations[i] = new Vertex3D(this.s, bi, bi_plus1).orientationToPlane(h);
            }


            for (var i = 0; i < n; ++i) {
                var bi_min1  = this.boundingPlanes[(i+n-1) % n];
                var bi_min2  = this.boundingPlanes[(i+n-2) % n];
                var bi       = this.boundingPlanes[i];
                var bi_plus1 = this.boundingPlanes[(i+1) % n];
                var frontLookupKey = [
                    orientations[(i+n-2) % n],
                    orientations[(i+n-1) % n],
                    orientations[(i+n) % n],
                ].join('');
                var backLookupKey = frontLookupKey.split('').map(function(orientation) {
                    if (orientation === '-') {
                        return '+';
                    } else if (orientation === '+') {
                        return '-';
                    } else {
                        return '0';
                    }
                }).join('');

                if (backLookupKey === '-00') {
                    touchedBack = true;
                }
                if (frontLookupKey === '-00') {
                    touchedFront = true;
                }

                var frontSignal = lookupTable[frontLookupKey];
                if (frontSignal === 'B') {
                    frontOutputPlanes.push(bi);
                } else if (frontSignal === 'HB') {
                    frontOutputPlanes.push(h);
                    frontOutputPlanes.push(bi);
                }

                var backSignal = lookupTable[backLookupKey];
                if (backSignal === 'B') {
                    backOutputPlanes.push(bi);
                } else if (backSignal === 'HB') {
                    backOutputPlanes.push(h);
                    backOutputPlanes.push(bi);
                }
            }

            var result = {
                front: frontOutputPlanes.length > 0 ? new Polygon3D(this.s, frontOutputPlanes) : undefined,
                back: backOutputPlanes.length > 0 ? new Polygon3D(this.s, backOutputPlanes) : undefined,
                touchedBack : touchedBack,
                touchedFront: touchedFront
            }

            return result;
        }
    }

    var lookupTable = {
        '-++': 'B',
        '0++': 'B',
        '+++': 'B',
        '-+0': 'B',
        '0+0': 'B',
        '++0': 'B',
        '-+-': 'B',
        '0+-': 'B',
        '++-': 'B',
        '+0+': 'B',
        '00+': 'HB',
        '-0+': 'HB',
        '-00': '0',
        '000': '0',
        '+00': '0',
        '-0-': '0',
        '00-': '0',
        '+0-': '0',
        '--+': 'HB',
        '0-+': 'HB',
        '+-+': 'HB',
        '--0': '0',
        '0-0': '0',
        '+-0': '0',
        '---': '0',
        '0--': '0',
        '+--': '0',
    }

    return Polygon3D;

});