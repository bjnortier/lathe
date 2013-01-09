define(['examples/js/viewport', 'lib/plane', 'lib/polygon'], function(Viewport, Plane, Polygon) {

    var polygonToMesh = function(polygon) {
        var geometry = new THREE.Geometry();
        var vertices = polygon.toVertices();
        var coordinates = vertices.map(function(vertex) {
            return vertex.toCoordinate();
        });

        coordinates.forEach(function(coordinate) {
            var i = geometry.vertices.push(new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z));
            if (geometry.vertices[i-1].length() > 100000) {
                geometry.vertices[i-1].divideScalar(100000);
            }
        });
        if (coordinates.length === 3) {
            geometry.faces.push(new THREE.Face4(0,1,2));
        } else if (coordinates.length === 4) {
            geometry.faces.push(new THREE.Face4(0,1,2,3));
        } else {
            throw Error('not implemented');
        }
        geometry.computeFaceNormals();
        return geometry;
    }

    var addPolygon = function(viewport, polygon, color) {
        var geometry = polygonToMesh(polygon);
        var object = THREE.SceneUtils.createMultiMaterialObject(geometry, [
            new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide, ambient: color}),
            new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
        ]);
        viewport.scene.add(object);
    }

    var Example = function() {
        var beforeContainer = document.createElement('div');
        var afterContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        afterContainer.classList.add('viewport');
        document.body.appendChild(beforeContainer);
        document.body.appendChild(afterContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var afterViewport  = new Viewport(afterContainer);

        var p1 = new Polygon().fromPlane(new Plane(0,0,1,0));
        var h = new Polygon().fromPlane(new Plane(1,0,0,0));
        var p2 = p1.splitBy(new Plane(1,0,0,0)); 
        
        addPolygon(beforeViewport, p1, 0x00ff00);
        addPolygon(beforeViewport, h, 0xff0000);

        addPolygon(afterViewport, h, 0xff0000);
        addPolygon(afterViewport, p2, 0x0000ff);
    }

    return Example;


});