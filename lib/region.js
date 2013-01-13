define(['lib/world', 'lib/polygon'], function(world, Polygon) { 

    var xPlus  = new Polygon().fromPlane(world.xPlus),
        xMinus = new Polygon().fromPlane(world.xMinus),
        yPlus  = new Polygon().fromPlane(world.yPlus),
        yMinus = new Polygon().fromPlane(world.yMinus),
        zPlus  = new Polygon().fromPlane(world.zPlus),
        zMinus = new Polygon().fromPlane(world.zMinus);

    var worldPolyhedron = [
        xPlus, xMinus, yPlus, yMinus, zPlus, zMinus
    ]

    // A region is defined by a list of halfspaces. Each halfspace partitions 
    // the region into a front a back region, either of which is potentially empty
    var Region = function(halfspaces) {
        this.polyhedron = worldPolyhedron;
        this.halfspaces = halfspaces;

        // Reduce the region by the halfspace
        halfspaces.forEach(function(h) {

        });
    }

    return Region;

});