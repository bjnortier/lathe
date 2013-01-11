define(['lib/plane', 'lib/polygon'], function(Plane, Polygon) {

    var Node = function(partitionplane, boundary, front, back) {
        this.partitionplane = partitionplane;
        this.boundary = boundary;
        if (front) {
            this.front = front;
        }
        if (back) { 
            this.back = back;
        }
    }

    return Node;

});