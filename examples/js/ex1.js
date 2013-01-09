define(['examples/js/viewport'], function(Viewport) {

    var Example = function() {
        var container = document.createElement('div');
        container.classList.add('viewport');
        document.body.appendChild(container);
        var viewPort = new Viewport(container);

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0,0,0));
        geometry.vertices.push(new THREE.Vector3(10,0,0));
        geometry.vertices.push(new THREE.Vector3(10,10,0));
        geometry.vertices.push(new THREE.Vector3(0,10,0));
        geometry.faces.push(new THREE.Face4(0,1,2,3));

        var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xff0000 }));
        object.material.ambient = object.material.color;
    }

    return Example;


});