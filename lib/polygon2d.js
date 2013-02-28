define(['lib/plane2d', 'lib/world2d', 'lib/vertex2d'], function(Plane2D, world, Vertex2D) {

    var Polygon2D = function(boundingPlanes) {
        this.boundingPlanes = boundingPlanes;
    }

    Polygon2D.world = new Polygon2D([world.xPlus, world.yPlus, world.xMinus, world.yMinus]);

    Polygon2D.prototype.toVertices = function() {
        var n = this.boundingPlanes.length;
        var that = this;
        return this.boundingPlanes.map(function(bi, i) {
            var bmin1 = that.boundingPlanes[(i+n-1) % n];
            return new Vertex2D(bmin1, bi);
        });
    }

    Polygon2D.prototype.reverse = function() {  
        return new Polygon2D(this.boundingPlanes.slice(0).reverse());
    }
    
    Polygon2D.prototype.splitBy = function(h) {
        var frontOutputPlanes = [];
        var backOutputPlanes = [];
        var n = this.boundingPlanes.length;
        for (var i = 0; i < n; ++i) {
            var bi_min1  = this.boundingPlanes[(i+n-1) % n];
            var bi       = this.boundingPlanes[i];
            var bi_plus1 = this.boundingPlanes[(i+1) % n];
            var frontLookupKey = [
                new Vertex2D(bi_min1, bi).orientationToPlane(h),
                new Vertex2D(bi, bi_plus1).orientationToPlane(h)
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
            front: frontOutputPlanes.length > 0 ? new Polygon2D(frontOutputPlanes) : undefined,
            back: backOutputPlanes.length > 0 ? new Polygon2D(backOutputPlanes) : undefined,
        }
    }

    var lookupTable = {
        '+-' : 'B',
        '--' : '0',
        '-+' : 'HB',
        '++' : 'B',
        '00' : '0',
        '+0' : 'B',
        '0+' : 'HB',    
        '-0' : '0',    
        '0-' : '0',    
    }

    return Polygon2D;

});