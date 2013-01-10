define(['lib/plane', 'lib/polygon'], function(Plane, Polygon) {

    var Node = function(polygon, front, back) {
        this.p = polygon;
        this.front = front;
        this.back = back;
    }

    return Node;

});