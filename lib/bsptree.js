define(['lib/bspnode'], function(Node) {

    var fromPolygons = function(polygons) {
        var front = [], back = [];
        for (var i = 1; i < polygons.length; ++i) {
            var splits = polygons[i].splitBy(polygons[0].s);
            splits.front && front.push(splits.front);
            splits.back && back.push(splits.back);
        }
        return new Node(
            polygons[0], 
            front.length > 0 ? fromPolygons(front) : undefined, 
            back.length  > 0 ? fromPolygons(back)  : undefined);
    }

    return {
        fromPolygons: fromPolygons
    }


});