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

    var xPlusBig = new Plane(1,0,0,1000000),
        yPlusBig = new Plane(0,1,0,1000000),
        zPlusBig = new Plane(0,0,1,1000000),
        xMinusBig = new Plane(-1,0,0,1000000),
        yMinusBig = new Plane(0,-1,0,1000000),
        zMinusBig = new Plane(0,0,-1,1000000);

    // Create a polygon from the plane a a very big box
    Polygon.prototype.fromPlane = function(s) {
        this.s = s;

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

    // Split polygon with plane h as per [1] § 3.2 
    Polygon.prototype.splitBy = function(h) {
        if (this.s.isCoincident(h)) {
            if (this.s.isSameOrientation(h)) {
                return this;
            } else {
                return undefined;
            }
        } else {
            var outputPlanes = [];
            var n = this.boundingPlanes.length;
            for (var i = 0; i < n; ++i) {
                var bi_min1  = this.boundingPlanes[(i+n-1) % n];
                var bi_min2  = this.boundingPlanes[(i+n-2) % n];
                var bi       = this.boundingPlanes[i];
                var bi_plus1 = this.boundingPlanes[(i+1) % n];
                var lookupKey = [
                    new Vertex(this.s, bi_min2, bi_min1).orientationToPlane(h),
                    new Vertex(this.s, bi_min1, bi).orientationToPlane(h),
                    new Vertex(this.s, bi, bi_plus1).orientationToPlane(h)
                ].join('');
                var signal = lookupTable[lookupKey];
                if (signal === 'B') {
                    outputPlanes.push(bi);
                } else if (signal === 'HB') {
                    outputPlanes.push(h);
                    outputPlanes.push(bi);
                }
            }
            return new Polygon(this.s, outputPlanes);
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