
define(['lib/plane2d', 'lib/world2d', 'lib/vertex2d'], function(Plane2D, world, Vertex2D) {

    var Polygon2D = function(boundingPlanes) {
        this.boundingPlanes = boundingPlanes;
    }

    Polygon2D.prototype.toVertices = function() {
        var n = this.boundingPlanes.length;
        var that = this;
        return this.boundingPlanes.map(function(bi, i) {
            var bmin1 = that.boundingPlanes[(i+n-1) % n];
            return new Vertex2D(bmin1, bi);
        });
    }

    // // Create a polygon from the plane a a very big box
    // Polygon2D.prototype.fromPlane = function(s) {
    //     this.s = s;
    //     var aAbs = Math.abs(this.s.a),
    //         bAbs = Math.abs(this.s.b),
    //         cAbs = Math.abs(this.s.c);
    //     if ((aAbs >= bAbs) && (aAbs >= cAbs)) {
    //         if (this.s.a > 0) {
    //             this.boundingPlanes = [world.yPlus, world.zPlus, world.yMinus, world.zMinus];
    //         } else {
    //             this.boundingPlanes = [world.yPlus, world.zMinus, world.yMinus, world.zPlus];
    //         }
    //     } else if ((bAbs >= aAbs) && (bAbs >= cAbs)) {
    //         if (this.s.b > 0) {
    //             this.boundingPlanes = [world.zPlus, world.xPlus, world.zMinus, world.xMinus];
    //         } else {
    //             this.boundingPlanes = [world.zPlus, world.xMinus, world.zMinus, world.xPlus];
    //         }
    //     } else if ((cAbs >= aAbs) && (cAbs >= bAbs)) {
    //         if (this.s.c > 0) {
    //             this.boundingPlanes = [world.xPlus, world.yPlus, world.xMinus, world.yMinus];
    //         } else {
    //             this.boundingPlanes = [world.xPlus, world.yMinus, world.xMinus, world.yPlus];
    //         }
    //     }
    //     return this;
    // }

    // Polygon2D.prototype.reverse = function() {
    //     return new Polygon2D(this.s.reverse, this.boundingPlanes.slice(0).reverse());
    // }

    // // Split polygon with plane h as per [1] § 3.2 
    // Polygon2D.prototype.splitBy = function(h) {
    //     if (this.s.isCoincident(h)) {
    //         if (this.s.isSameOrientation(h)) {
    //             return { 
    //                 front: this,
    //                 back: undefined
    //             }
    //         } else {
    //             return {
    //                 front: undefined,
    //                 back: this
    //             }
    //         }
    //     } else {
    //         var frontOutputPlanes = [];
    //         var backOutputPlanes = [];
    //         var n = this.boundingPlanes.length;
    //         for (var i = 0; i < n; ++i) {
    //             var bi_min1  = this.boundingPlanes[(i+n-1) % n];
    //             var bi_min2  = this.boundingPlanes[(i+n-2) % n];
    //             var bi       = this.boundingPlanes[i];
    //             var bi_plus1 = this.boundingPlanes[(i+1) % n];
    //             var frontLookupKey = [
    //                 new Vertex3D(this.s, bi_min2, bi_min1).orientationToPlane(h),
    //                 new Vertex3D(this.s, bi_min1, bi).orientationToPlane(h),
    //                 new Vertex3D(this.s, bi, bi_plus1).orientationToPlane(h)
    //             ].join('');
    //             var backLookupKey = frontLookupKey.split('').map(function(orientation) {
    //                 if (orientation === '-') {
    //                     return '+';
    //                 } else if (orientation === '+') {
    //                     return '-';
    //                 } else {
    //                     return '0';
    //                 }
    //             }).join('');

    //             var frontSignal = lookupTable[frontLookupKey];
    //             if (frontSignal === 'B') {
    //                 frontOutputPlanes.push(bi);
    //             } else if (frontSignal === 'HB') {
    //                 frontOutputPlanes.push(h);
    //                 frontOutputPlanes.push(bi);
    //             }

    //             var backSignal = lookupTable[backLookupKey];
    //             if (backSignal === 'B') {
    //                 backOutputPlanes.push(bi);
    //             } else if (backSignal === 'HB') {
    //                 backOutputPlanes.push(h);
    //                 backOutputPlanes.push(bi);
    //             }
    //         }
    //         return {
    //             front: frontOutputPlanes.length > 0 ? new Polygon2D(this.s, frontOutputPlanes) : undefined,
    //             back: backOutputPlanes.length > 0 ? new Polygon2D(this.s, backOutputPlanes) : undefined,
    //         }
    //     }
    // }

    // var lookupTable = {
    //     '-++': 'B',
    //     '0++': 'B',
    //     '+++': 'B',
    //     '-+0': 'B',
    //     '0+0': 'B',
    //     '++0': 'B',
    //     '-+-': 'B',
    //     '0+-': 'B',
    //     '++-': 'B',
    //     '+0+': 'B',
    //     '00+': 'HB',
    //     '-0+': 'HB',
    //     '-00': '0',
    //     '000': '0',
    //     '+00': '0',
    //     '-0-': '0',
    //     '00-': '0',
    //     '+0-': '0',
    //     '--+': 'HB',
    //     '0-+': 'HB',
    //     '+-+': 'HB',
    //     '--0': '0',
    //     '0-0': '0',
    //     '+-0': '0',
    //     '---': '0',
    //     '0--': '0',
    //     '+--': '0',
    // }

    return Polygon2D;

});