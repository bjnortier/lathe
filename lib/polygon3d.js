// Convex polygon objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf


define(['lib/plane3d', 'lib/world3d', 'lib/vertex3d'], function(Plane3D, world3d, Vertex3D) {

    var Polygon3D = function(s, boundingPlanes) {
        this.s = s;
        this.boundingPlanes = boundingPlanes;
    }

    // Create an eval string that can easily be copied & pasted into a test case
    Polygon3D.prototype.toEval = function() {
        return 'new Polygon3D(' + 
                    this.s.toEval() + ',[' + 
                    this.boundingPlanes.map(function(p) { return p.toEval()}).join(',') + '])';
    }

    Polygon3D.prototype.toVertices = function() {
        var n = this.boundingPlanes.length;
        var that = this;
        return this.boundingPlanes.map(function(bi, i) {
            var bmin1 = that.boundingPlanes[(i+n-1) % n];
            return new Vertex3D(that.s, bmin1, bi);
        });
    }

    Polygon3D.prototype.isConvex = function() {
        try {
            var vertices = this.toVertices();
            if (vertices.length === 3) {
                return true;
            }

            var vectors = vertices.map(function(v) {
                return v.toCoordinate();
            });

            var edges = [
                vectors[1].sub(vectors[0]),
                vectors[2].sub(vectors[1]),
            ]
            var cross012 = edges[1].cross(edges[0]);

            for (var i = 3; i < vectors.length; ++i) {
                edges[i-1] = vectors[i].sub(vectors[i-1]);
                var cross = edges[i-1].cross(edges[i-2]);
                if (cross.dot(cross012) < 0) {
                    return false;
                }
            }

            return true;
        } catch (e) {
            if (e.name === 'InvalidVertex') {
                return false;
            }
            throw e;
        }
    }

    // Create a polygon from the plane a a very big box
    Polygon3D.prototype.fromPlane = function(s) {
        this.s = s;
        var aAbs = Math.abs(this.s.a),
            bAbs = Math.abs(this.s.b),
            cAbs = Math.abs(this.s.c);
        if ((aAbs >= bAbs) && (aAbs >= cAbs)) {
            if (this.s.a > 0) {
                this.boundingPlanes = [world3d.yPlus, world3d.zPlus, world3d.yMinus, world3d.zMinus];
            } else {
                this.boundingPlanes = [world3d.yPlus, world3d.zMinus, world3d.yMinus, world3d.zPlus];
            }
        } else if ((bAbs >= aAbs) && (bAbs >= cAbs)) {
            if (this.s.b > 0) {
                this.boundingPlanes = [world3d.zPlus, world3d.xPlus, world3d.zMinus, world3d.xMinus];
            } else {
                this.boundingPlanes = [world3d.zPlus, world3d.xMinus, world3d.zMinus, world3d.xPlus];
            }
        } else if ((cAbs >= aAbs) && (cAbs >= bAbs)) {
            if (this.s.c > 0) {
                this.boundingPlanes = [world3d.xPlus, world3d.yPlus, world3d.xMinus, world3d.yMinus];
            } else {
                this.boundingPlanes = [world3d.xPlus, world3d.yMinus, world3d.xMinus, world3d.yPlus];
            }
        }
        return this;
    }

    Polygon3D.prototype.reverse = function() {
        return new Polygon3D(this.s.reverse, this.boundingPlanes.slice(0).reverse());
    }

    // Split polygon with plane h as per [1] § 3.2 
    Polygon3D.prototype.splitBy = function(h) {
        if (this.s.isCoincident(h)) {
            if (this.s.isSameOrientation(h)) {
                return { 
                    front: this,
                    back: undefined
                }
            } else {
                return {
                    front: undefined,
                    back: this
                }
            }
        } else {
            var frontOutputPlanes = [];
            var backOutputPlanes = [];
            var n = this.boundingPlanes.length;
            for (var i = 0; i < n; ++i) {
                var bi_min1  = this.boundingPlanes[(i+n-1) % n];
                var bi_min2  = this.boundingPlanes[(i+n-2) % n];
                var bi       = this.boundingPlanes[i];
                var bi_plus1 = this.boundingPlanes[(i+1) % n];
                var frontLookupKey = [
                    new Vertex3D(this.s, bi_min2, bi_min1).orientationToPlane(h),
                    new Vertex3D(this.s, bi_min1, bi).orientationToPlane(h),
                    new Vertex3D(this.s, bi, bi_plus1).orientationToPlane(h)
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
            return {
                front: frontOutputPlanes.length > 0 ? new Polygon3D(this.s, frontOutputPlanes) : undefined,
                back: backOutputPlanes.length > 0 ? new Polygon3D(this.s, backOutputPlanes) : undefined,
            }
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