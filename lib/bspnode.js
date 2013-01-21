define(['lib/plane', 'lib/polygon'], function(Plane3D, Polygon3D) {

    var Node = function(hyperplane, minus, plus) {
        this.hyperplane = hyperplane;
        // this.boundary = boundary;
        if (minus) {
            this.minus = minus;
        }
        if (plus) { 
            this.plus = plus;
        }
    }

    var Cell = function(attribute) {
        this.attribute = attribute;
    }

    return {
        Node: Node,
        Cell: Cell
    }

});