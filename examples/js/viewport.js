define([
        'lib/world3d', 
        'lib/polygon3d',  
        'lib/plane2d', 
        'lib/line2d', 
        'lib/vertex2d', 
        'lib/conv',
    ], function(
        world,
        Polygon3D,
        Plane2D,
        Line2D,
        Vertex2D,
        Conv) {


    var Viewport = function(container) {

        var camera, renderer, light;
        var containerWidth = 400, containerHeight = 400;

        var that = this;
        that.container = container;
        init();
        animate();

        function init() {

            container.style.width  = containerWidth + 'px';
            container.style.height = containerHeight + 'px';

            camera = new THREE.PerspectiveCamera(70, containerWidth / containerHeight, 0.1, 10000 );
            that.camera = camera;
            camera.position.z = 10;
            camera.position.x = 20;
            camera.position.y = 20;
            camera.up = new THREE.Vector3(0,0,1);
            camera.lookAt(new THREE.Vector3(0,0,0));

            that.scene = new THREE.Scene();
            that.scene.add( new THREE.AmbientLight(0x101010) );

            light = new THREE.PointLight( 0xffffff, 1.5 );
            light.position.set(0, 0, 2000);
            that.scene.add( light );

            var xMaterial = new THREE.LineBasicMaterial({color: 0x00ff00, opacity: 0.5});
            var yMaterial = new THREE.LineBasicMaterial({color: 0x0000ff, opacity: 0.5});
            var zMaterial = new THREE.LineBasicMaterial({color: 0xff0000, opacity: 0.5});

            var xGeom = new THREE.Geometry();
            xGeom.vertices.push(new THREE.Vector3(0, 0, 0));
            xGeom.vertices.push(new THREE.Vector3(1000, 0, 0));
            var yGeom = new THREE.Geometry();
            yGeom.vertices.push(new THREE.Vector3(0,0, 0));
            yGeom.vertices.push(new THREE.Vector3(0, 1000, 0));
            var zGeom = new THREE.Geometry();
            zGeom.vertices.push(new THREE.Vector3(0, 0, 0));
            zGeom.vertices.push(new THREE.Vector3(0, 0, 1000));

            that.scene.add(new THREE.Line(xGeom, xMaterial));
            that.scene.add(new THREE.Line(yGeom, yMaterial));
            that.scene.add(new THREE.Line(zGeom, zMaterial));
            that.exampleObj = new THREE.Object3D();
            that.scene.add(that.exampleObj);

            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.sortObjects = false;
            renderer.setSize(containerWidth, containerHeight);
            container.appendChild(renderer.domElement);

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {
            camera.aspect = containerWidth/containerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerWidth, containerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            light.position = camera.position;
            renderer.render(that.scene, camera);
        }

        this.clear = function() {

            var clearObj = function(obj) {
                if (obj.geometry) {
                    obj.geometry.dispose();
                }
                if (obj.material) {
                    obj.material.dispose();
                }
                if (obj.children) {
                    obj.children.map(clearObj);
                }
            }
            clearObj(this.exampleObj);

            this.scene.remove(this.exampleObj);
            this.exampleObj = new THREE.Object3D();
            this.scene.add(this.exampleObj);
            render();
        }

        var polygonsToMesh = function(polygons) {
            var geometry = new THREE.Geometry();
            var indices = polygons.map(function(polygon, i) {
                var vertices = polygon.toVertices();
                var _coordinates = vertices.map(function(vertex) {
                    var c = vertex.toCoordinate();
                    return new THREE.Vector3(c.x, c.y, c.z)
                });

                var coordinates = _coordinates.reduce(function(acc, c, i) {
                  if (i === 0) {
                    return acc.concat(c);
                  } else if (new THREE.Vector3().subVectors(c,acc[acc.length-1]).length() > 0.000000001) {
                    return acc.concat(c);
                  } else {
                    return acc;
                  }
                }, []);

                var indices = coordinates.map(function(coordinate) {
                    return geometry.vertices.push(new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z)) - 1;
                });
                if (coordinates.length < 3) {
                  console.warn('invalid polygon');
                } else if (coordinates.length === 3) {
                    geometry.faces.push(new THREE.Face3(indices[0],indices[1],indices[2]));
                } else if (coordinates.length === 4) {
                    geometry.faces.push(new THREE.Face4(indices[0],indices[1],indices[2],indices[3]));
                } else {
                    // Only support cnvex polygons
                    geometry.faces.push(new THREE.Face3(indices[0],indices[1],indices[2]));
                    for (var i = 2; i < coordinates.length -1; ++i) {
                        geometry.faces.push(new THREE.Face3(indices[0], indices[0]+i,indices[0]+i+1));
                    }
                }
                return indices;

            })

            geometry.computeFaceNormals();
            return {geometry: geometry, indices: indices};
        }   

        this.addLine2D = function(line, color) {
            var edgeGeometry = new THREE.Geometry();
            edgeGeometry.vertices = line.toVertices().map(function(v) {
                var coordinate = v.toCoordinate();
                return new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z)
            })
            var center = new THREE.Vector3().addVectors(
                edgeGeometry.vertices[0], edgeGeometry.vertices[1]).multiplyScalar(0.5);
            var normal = new THREE.Vector3(line.s.a, line.s.b, 0);
            edgeGeometry.vertices.push(
                center,
                normal.normalize().multiplyScalar(0.5).add(center));
            edgeGeometry.vertices.push(center);

            var material = new THREE.LineBasicMaterial({color: color & 0x9f9f9f, linewidth: 1 });
            var edges = new THREE.Line(edgeGeometry, material);
            this.exampleObj.add(edges);

        }

        this.addPolygon2D = function(polygon, color, z) {
            var faceGeometry = polygonToMesh(polygon);
            var meshObject = THREE.SceneUtils.createMultiMaterialObject(faceGeometry, [
                new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide, opacity: 0.5, transparent: true}),
            ]);
            this.exampleObj.add(meshObject);

            var edgeGeometry = new THREE.Geometry();
            for (var i = 0; i <= faceGeometry.vertices.length; ++i) {
                edgeGeometry.vertices.push(faceGeometry.vertices[i % faceGeometry.vertices.length]);
            }

            if (z) {
                faceGeometry.vertices.forEach(function(v) {
                    v.z = z;
                });
                edgeGeometry.vertices.forEach(function(v) {
                    v.z = z;
                });
            }

            var material = new THREE.LineBasicMaterial({color: color & 0x9f9f9f, linewidth: 1 });
            var edges = new THREE.Line(edgeGeometry, material);
            this.exampleObj.add(edges);
        }

        this.addPolygon3D = function(polygon, color) {
            this.addPolygons3D([polygon], color);
        }

        this.addPolygons3D = function(polygons, color) {
            var toMesh = polygonsToMesh(polygons);
            var faceGeometry = toMesh.geometry;
            var meshObject = THREE.SceneUtils.createMultiMaterialObject(faceGeometry, [
                new THREE.MeshPhongMaterial({color: color}),
                // new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.5}),
                // new THREE.MeshBasicMaterial({color: color&0x8f8f8f, wireframe: true, linewidth: 5}),
            ]);
            this.exampleObj.add(meshObject);

            var that = this;
            toMesh.indices.forEach(function(polyIndices) {
                var edgeGeometry = new THREE.Geometry();
                polyIndices.forEach(function(i) {
                    edgeGeometry.vertices.push(faceGeometry.vertices[i]);
                });
                edgeGeometry.vertices.push(faceGeometry.vertices[polyIndices[0]]);

                var material = new THREE.LineBasicMaterial({color: color & 0x9f9f9f, linewidth: 1 });
                var edges = new THREE.Line(edgeGeometry, material);
                that.exampleObj.add(edges);
            });
        }

        this.addPlane2D = function(plane, color) {
            this.addLine2D(Line2D.fromPlane(plane), color);
        }

        this.addPlane3D = function(plane, color) {
            var polygon = Polygon3D.fromPlane(plane);
            this.addPolygon3D(polygon, color);
            this.addPolygon3D(polygon.reverse(), color & 0x0f0f0f);
        }

        this.addBRep = function(breps, color) {
            if (breps[0] instanceof Polygon3D) {
                that.addPolygons3D(breps, color);
            } else {
                breps.forEach(function(line) {
                    that.addLine2D(line, color);
                });
            }
        }


    }

    return Viewport;

});