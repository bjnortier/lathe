// Convex polygon objects
// 
// References:
// [1] http://homes.cs.washington.edu/~gilbo/repofiles/booleans2009.pdf


define(['lib/plane', 'lib/vertex'], function(Plane, Vertex) {

    var Polygon = function(s, boundingPlanes) {
        this.s = s;
        this.boundingPlanes = boundingPlanes;
    }

    Polygon.prototype.toVertices = function() {
        var n = this.boundingPlanes.length;
        var that = this;
        return this.boundingPlanes.map(function(bi, i) {
            var bmin1 = that.boundingPlanes[(i+n-1) % n];
            return new Vertex(that.s, bmin1, bi);
        });
    }

    var bigNumber = 1000000;
    var xPlusBig = new Plane(1,0,0,bigNumber),
        yPlusBig = new Plane(0,1,0,bigNumber),
        zPlusBig = new Plane(0,0,1,bigNumber),
        xMinusBig = new Plane(-1,0,0,bigNumber),
        yMinusBig = new Plane(0,-1,0,bigNumber),
        zMinusBig = new Plane(0,0,-1,bigNumber);

    // Create a polygon from the plane a a very big box
    Polygon.prototype.fromPlane = function(s) {
        this.s = s;
        this.bigNumber = bigNumber;
        var aAbs = Math.abs(this.s.a),
            bAbs = Math.abs(this.s.b),
            cAbs = Math.abs(this.s.c);
        if ((aAbs >= bAbs) && (aAbs >= cAbs)) {
            if (this.s.a > 0) {
                this.boundingPlanes = [yPlusBig, zPlusBig, yMinusBig, zMinusBig];
            } else {
                this.boundingPlanes = [yPlusBig, zMinusBig, yMinusBig, zPlusBig];
            }
        } else if ((bAbs >= aAbs) && (bAbs >= cAbs)) {
            if (this.s.b > 0) {
                this.boundingPlanes = [zPlusBig, xPlusBig, zMinusBig, xMinusBig];
            } else {
                this.boundingPlanes = [zPlusBig, xMinusBig, zMinusBig, xPlusBig];
            }
        } else if ((cAbs >= aAbs) && (cAbs >= bAbs)) {
            if (this.s.c > 0) {
                this.boundingPlanes = [xPlusBig, yPlusBig, xMinusBig, yMinusBig];
            } else {
                this.boundingPlanes = [xPlusBig, yMinusBig, xMinusBig, yPlusBig];
            }
        }
        return this;
    }

    Polygon.prototype.reverse = function() {
        return new Polygon(this.s.reverse, this.boundingPlanes.slice(0).reverse());
    }

    // Split polygon with plane h as per [1] § 3.2 
    Polygon.prototype.splitBy = function(h) {
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
                    new Vertex(this.s, bi_min2, bi_min1).orientationToPlane(h),
                    new Vertex(this.s, bi_min1, bi).orientationToPlane(h),
                    new Vertex(this.s, bi, bi_plus1).orientationToPlane(h)
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
                front: frontOutputPlanes.length > 0 ? new Polygon(this.s, frontOutputPlanes) : undefined,
                back: backOutputPlanes.length > 0 ? new Polygon(this.s, backOutputPlanes) : undefined,
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

    return Polygon;

});