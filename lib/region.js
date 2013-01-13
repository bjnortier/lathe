define(['lib/world', 'lib/polygon'], function(world, Polygon) { 

    var world = [];

    

    // var xPlus  = new Polygon().fromPlane(world.xPlus),
    //     xMinus = new Polygon().fromPlane(world.xMinus),
    //     yPlus  = new Polygon().fromPlane(world.yPlus),
    //     yMinus = new Polygon().fromPlane(world.yMinus),
    //     zPlus  = new Polygon().fromPlane(world.zPlus),
    //     zMinus = new Polygon().fromPlane(world.zMinus);

    // var worldPolyhedron = [
    //     xPlus, xMinus, yPlus, yMinus, zPlus, zMinus
    // ]

    // // A region is defined by a list of halfspaces. Each halfspace partitions 
    // // the region into a front a back region, either of which is potentially empty
    // var Region = function() {
    //     this.polyhedron = worldPolyhedron;
    // }

    // Region.prototype.splitBy = function(h) {
    //     var frontPolygons = [], backPolygons = [];
    //     var intersectedpolygons = [];
    //     this.polyhedron.forEach(function(polygon) {
    //         var splits = polygon.splitBy(h);
    //         splits.front && frontPolygons.push(splits.front);
    //         splits.back && backPolygons.push(splits.back);
    //         if(splits.front && splits.back) {
    //             intersectedpolygons.push(polygon);
    //         }
    //     })
    //     this.polyhedron = frontPolygons;
    //     return this;
    // }

    // return Region;

});