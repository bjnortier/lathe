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

    var Example = function() {
        var exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');
        var beforeContainer = document.createElement('div');
        var frontContainer = document.createElement('div');
        var backContainer = document.createElement('div');
        beforeContainer.classList.add('viewport');
        frontContainer.classList.add('viewport');
        backContainer.classList.add('viewport');
        document.body.appendChild(exampleContainer);
        exampleContainer.appendChild(beforeContainer);
        exampleContainer.appendChild(frontContainer);
        exampleContainer.appendChild(backContainer);
        var beforeViewport = new Viewport(beforeContainer);
        var frontViewport  = new Viewport(frontContainer);
        var backViewport  = new Viewport(backContainer);

        var p1 = new Polygon(new Plane(0,0,1,0), [new Plane(1,0,0,-1), new Plane(0,1,0,-1), new Plane(1,1,0,5)]);
        var hplus = new Plane(0,1,0,0);
        var hminus = new Plane(0,-1,0,0);
        var pfront = p1.splitBy(hplus); 
        var pback = p1.splitBy(hminus); 
        
        addPolygon(beforeViewport, p1, 0x00ff00);
        addPlane(beforeViewport, hplus, 0xff0000);

        addPolygon(frontViewport, pfront, 0x0000ff);
        addPlane(frontViewport, hplus, 0xff0000);

        addPolygon(backViewport, pback, 0x0000ff);
        addPlane(backViewport, hminus, 0xff0000);
    }

    return Example;


});