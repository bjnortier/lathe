'use strict';

define([
        'lib/bsp2d',
        'examples/js/viewport',
        'examples/js/trackball',
    ], function(BSP2D, Viewport, Trackball) {

    var Example = function(t1, t2, operation) {

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
        new Trackball([beforeViewport, splitViewport]);


        beforeViewport.addBSPTree3D(t1, 0xffff00);
        beforeViewport.addBSPTree3D(t2, 0x00ffff);
        
        var merged = operation(t1, t2);
        splitViewport.addBSPTree3D(merged, 0x00ff00);

    }

    return Example;

}); 

// define([
//         'lib/plane3d',
//         'lib/polygon3d',
//         'lib/bsptree',
//         'lib/bsp',
//         'examples/js/viewport',
//         'examples/js/trackball',
//     ], function(Plane3D, Polygon3D, BSPTree, BSP, Viewport, Trackball) {


//     var Example = function(mesh1, mesh2) {

//         var exampleContainer = document.createElement('div');
//         exampleContainer.classList.add('example');
//         var beforeContainer = document.createElement('div');
//         var bspTreeContainer = document.createElement('div');
//         beforeContainer.classList.add('viewport');
//         bspTreeContainer.classList.add('viewport');
//         document.body.appendChild(exampleContainer);
//         exampleContainer.appendChild(beforeContainer);
//         exampleContainer.appendChild(bspTreeContainer);
//         var beforeViewport = new Viewport(beforeContainer);
//         var bspTreeViewport  = new Viewport(bspTreeContainer);
//         new Trackball([beforeViewport, bspTreeViewport]);

//         mesh1.forEach(function(p) {
//             addPolygon(beforeViewport, p, 0x00ff00);
//         })
//         mesh2.forEach(function(p) {
//             addPolygon(beforeViewport, p, 0x0000ff);
//         })

//         var t1 = BSPTree.fromPolygons(mesh1);
//         var t2 = BSPTree.fromPolygons(mesh2);

//         t1.front.boundary.forEach(function(polygon) {
//             addPolygon(bspTreeViewport, polygon, 0x00ff00);
//         });
//         t1.back.boundary.forEach(function(polygon) {
//             addPolygon(bspTreeViewport, polygon, 0x0000ff);
//         });

//         // var merged = new BSP.Merger().mergeTrees(t1, t2);

//         // var addNode = function(node) {
//         //     addPolygon(bspTreeViewport, node.polygon, 0xff0000);
//         //     node.front && addNode(node.front);
//         //     node.back && addNode(node.back);
//         // }
//         // addNode(merged);

//     }

//     var polygonToMesh = function(polygon) {
//         var geometry = new THREE.Geometry();
//         var vertices = polygon.toVertices();
//         var coordinates = vertices.map(function(vertex) {
//             return vertex.toCoordinate();
//         });

//         coordinates.forEach(function(coordinate) {
//             var i = geometry.vertices.push(new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z)) - 1;
//             ['x', 'y', 'z'].forEach(function(dim) {
//                 if (geometry.vertices[i][dim] === 1000000) {
//                     geometry.vertices[i][dim] = 10;
//                 } else if(geometry.vertices[i][dim] === -1000000) {
//                     geometry.vertices[i][dim] = -10;
//                 }
//             });
//         });
//         if (coordinates.length < 3) {
//             throw Error('invalid polygon');
//         } else if (coordinates.length === 3) {
//             geometry.faces.push(new THREE.Face3(0,1,2));
//         } else if (coordinates.length === 4) {
//             geometry.faces.push(new THREE.Face4(0,1,2,3));
//         } else {
//             geometry.faces.push(new THREE.Face3(0,1,2));
//             for (var i = 2; i < coordinates.length -1; ++i) {
//                 geometry.faces.push(new THREE.Face3(0,i,i+1));
//             }
//         }
//         geometry.computeFaceNormals();
//         return geometry;
//     }

//     var addPolygon = function(viewport, polygon, color) {
//         var faceGeometry = polygonToMesh(polygon);
//         var meshObject = THREE.SceneUtils.createMultiMaterialObject(faceGeometry, [
//             new THREE.MeshLambertMaterial({color: color, opacity: 0.5, transparent: true}),
//         ]);
//         viewport.scene.add(meshObject);

//         var edgeGeometry = new THREE.Geometry();
//         for (var i = 0; i <= faceGeometry.vertices.length; ++i) {
//             edgeGeometry.vertices.push(faceGeometry.vertices[i % faceGeometry.vertices.length]);
//         }
//         var material = new THREE.LineBasicMaterial({color: color & 0x9f9f9f, linewidth: 1 });
//         var edges = new THREE.Line(edgeGeometry, material);
//         viewport.scene.add(edges);
//     }

//     var addPlane = function(viewport, plane, color) {
//         var polygon = new Polygon3D().fromPlane(plane);
//         addPolygon(viewport, polygon, color);
//     }

//     return Example;


// });