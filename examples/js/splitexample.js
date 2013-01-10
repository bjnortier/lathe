define(['examples/js/viewport', 'lib/plane', 'lib/polygon'], function(Viewport, Plane, Polygon) {

    var polygonToMesh = function(polygon) {
        var geometry = new THREE.Geometry();
        var vertices = polygon.toVertices();
        var coordinates = vertices.map(function(vertex) {
            return vertex.toCoordinate();
        });

        coordinates.forEach(function(coordinate) {
            var i = geometry.vertices.push(new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z)) - 1;
            // Is a big-space coordinate - scale it down
            if (polygon.bigNumber) {
                ['x', 'y', 'z'].forEach(function(dim) {
                    if (geometry.vertices[i][dim] === polygon.bigNumber) {
                        geometry.vertices[i][dim] = 10;
                    } else if(geometry.vertices[i][dim] === -polygon.bigNumber) {
                        geometry.vertices[i][dim] = -10;
                    }
                });
            }
        });
        if (coordinates.length === 3) {
            geometry.faces.push(new THREE.Face3(0,1,2));
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
            new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide, opacity: 0.5, transparent: true}),
            new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
        ]);
        viewport.scene.add(object);
    }

    var addPlane = function(viewport, plane, color) {
        var polygon = new Polygon().fromPlane(plane);
        addPolygon(viewport, polygon, color);
    }

    var Example = function(p1, h) {
        var exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');
        var beforeContainer = document.createElement('div');
        var splitContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        splitContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(splitContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var splitViewport  = new Viewport(splitContainer);


        var splits = p1.splitBy(h); 

        addPolygon(beforeViewport, p1, 0x00ffff);
        addPlane(beforeViewport, h, 0xff0000);

        splits.front && addPolygon(splitViewport, splits.front, 0x0000ff);
        splits.back && addPolygon(splitViewport, splits.back, 0x00ff00);
        addPlane(splitViewport, h, 0xff0000);

    }

    return Example;


});