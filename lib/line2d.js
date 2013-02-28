define([
        'lib/world2d',
        'lib/vertex2d'
    ], function(
        world2d,
        Vertex2D) {

    var Line2D = function(plane, boundingplanes) {
        if (!boundingplanes.length === 2) {
            throw Error('Line2D must have 2 bounding planes');
        }
        this.plane = plane;
        this.boundingplanes = boundingplanes;
        this.vertices = undefined;
    }

    // Create a line from the plane a a very big box
    Line2D.fromPlane = function(s) {
        var aAbs = Math.abs(s.a),
            bAbs = Math.abs(s.b);
        var boundingPlanes;
        if (aAbs >= bAbs) {
            boundingPlanes = [world2d.yPlus, world2d.yMinus];
        } else {
            boundingPlanes = [world2d.xPlus, world2d.xMinus];
        } 
        return new Line2D(s, boundingPlanes) ;
    }

    Line2D.prototype.toVertices = function() {
        if (this.vertices) {
            return this.vertices;
        }
        this.vertices = [
            new Vertex2D(this.plane, this.boundingplanes[0]),
            new Vertex2D(this.plane, this.boundingplanes[1]),
        ]
        return this.vertices;
    }

    Line2D.prototype.splitBy = function(h) {
        var vertices = this.toVertices();

        var orientations = [
            vertices[0].orientationToPlane(h),
            vertices[1].orientationToPlane(h),
        ].join('');

        switch (orientations) {
            // Line lies in front of plane
            case '++':
            case '0+':
            case '+0':
                return {
                    back: undefined,
                    front: this,
                    coincident: undefined
                }
            // Line lies behind plane
            case '--': 
            case '0-': 
            case '-0': 
                return {
                    back: this,
                    front: undefined,
                    coincident: undefined,
                }
            // First vertex behind, second in front
            case '-+':
                return {
                    back: new Line2D(this.plane, [this.boundingplanes[0], h]),
                    front: new Line2D(this.plane, [this.boundingplanes[1], h]),
                    coincident: undefined,
                }
            // First vertex in front, second behine
            case '+-': 
                return {
                    back: new Line2D(this.plane, [this.boundingplanes[1], h]),
                    front: new Line2D(this.plane, [this.boundingplanes[0], h]),
                    coincident: undefined,
                }
            // Coincident
            case '00': 
                return {
                    back: undefined,
                    front: undefined,
                    coincident: this
                }
            throw Error('Unexpected orientations: ' + orientations);
        }

    }

    return Line2D;

});