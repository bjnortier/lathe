define(['lib/world3d', 'lib/polygon3D',  'lib/plane2d', 'lib/vertex2d', 'lib/bsp'], 
    function(world, Polygon3D, Plane2D, Vertex2D, BSP2D) {

    var Node = BSP2D.Node;
    var Cell = BSP2D.Cell; 

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
            that.scene.add( new THREE.AmbientLight(0x505050) );

            light = new THREE.PointLight( 0xffffff, 1.5 );
            light.position.set(0, 0, 2000);
            that.scene.add( light );

            var xMaterial = new THREE.LineBasicMaterial({color: 0x00ff00, opacity: 0.5});
            var yMaterial = new THREE.LineBasicMaterial({color: 0x0000ff, opacity: 0.5});
            var zMaterial = new THREE.LineBasicMaterial({color: 0xff0000, opacity: 0.5});

            // Axes have a slight angle to eliminate z-fighting
            // http://en.wikipedia.org/wiki/Z-fighting
            var xGeom = new THREE.Geometry();
            xGeom.vertices.push(new THREE.Vector3(0, 0, 0));
            xGeom.vertices.push(new THREE.Vector3(1000, 1, 1));
            var yGeom = new THREE.Geometry();
            yGeom.vertices.push(new THREE.Vector3(0,0, 0));
            yGeom.vertices.push(new THREE.Vector3(1, 1000, 1));
            var zGeom = new THREE.Geometry();
            zGeom.vertices.push(new THREE.Vector3(0, 0, 0));
            zGeom.vertices.push(new THREE.Vector3(1, 1, 1000));

            that.scene.add(new THREE.Line(xGeom, xMaterial));
            that.scene.add(new THREE.Line(yGeom, yMaterial));
            that.scene.add(new THREE.Line(zGeom, zMaterial));

            // that.scene.add(new THREE.Mesh(
            //     new THREE.SphereGeometry(5, 20, 20), 
            //     new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000, transparent: true, opacity: 0.5})));

            renderer = new THREE.WebGLRenderer( { antialias: true } );
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

        var polygonToMesh = function(polygon) {
            var geometry = new THREE.Geometry();
            var vertices = polygon.toVertices();
            var coordinates = vertices.map(function(vertex) {
                return vertex.toCoordinate();
            });

            coordinates.forEach(function(coordinate) {
                var i = geometry.vertices.push(new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z)) - 1;
                // ['x', 'y', 'z'].forEach(function(dim) {
                //     if (geometry.vertices[i][dim] === world.bigNumber) {
                //         geometry.vertices[i][dim] = 10;
                //     } else if(geometry.vertices[i][dim] === -world.bigNumber) {
                //         geometry.vertices[i][dim] = -10;
                //     }
                // });
            });
            if (coordinates.length < 3) {
                throw Error('invalid polygon');
            } else if (coordinates.length === 3) {
                geometry.faces.push(new THREE.Face3(0,1,2));
            } else if (coordinates.length === 4) {
                geometry.faces.push(new THREE.Face4(0,1,2,3));
            } else {
                geometry.faces.push(new THREE.Face3(0,1,2));
                for (var i = 2; i < coordinates.length -1; ++i) {
                    geometry.faces.push(new THREE.Face3(0,i,i+1));
                }
            }
            geometry.computeFaceNormals();
            return geometry;
        }   

         this.addLine2D = function(line, color) {
            var edgeGeometry = new THREE.Geometry();
            edgeGeometry.vertices = line.toVertices().map(function(v) {
                var coordinate = v.toCoordinate();
                return new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z)
            })

            var material = new THREE.LineBasicMaterial({color: color & 0x9f9f9f, linewidth: 1 });
            var edges = new THREE.Line(edgeGeometry, material);
            this.scene.add(edges);
        }

        this.addPolygon2D = function(polygon, color, z) {
            var faceGeometry = polygonToMesh(polygon);
            var meshObject = THREE.SceneUtils.createMultiMaterialObject(faceGeometry, [
                new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide, opacity: 0.5, transparent: true}),
            ]);
            this.scene.add(meshObject);

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
            this.scene.add(edges);
        }

        this.addPolygon3D = function(polygon, color) {
            var faceGeometry = polygonToMesh(polygon);
            var meshObject = THREE.SceneUtils.createMultiMaterialObject(faceGeometry, [
                new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide, opacity: 0.5, transparent: true}),
            ]);
            this.scene.add(meshObject);

            var edgeGeometry = new THREE.Geometry();
            for (var i = 0; i <= faceGeometry.vertices.length; ++i) {
                edgeGeometry.vertices.push(faceGeometry.vertices[i % faceGeometry.vertices.length]);
            }
            var material = new THREE.LineBasicMaterial({color: color & 0x9f9f9f, linewidth: 1 });
            var edges = new THREE.Line(edgeGeometry, material);
            this.scene.add(edges);
        }

        this.addPlane2D = function(plane, color) {
            var vertices = [];
            try {
                vertices = [
                    new Vertex2D(plane, new Plane2D(1,0,-1000)),
                    new Vertex2D(plane, new Plane2D(1,0,1000)),
                ]
            } catch(e) {
                vertices = [
                    new Vertex2D(plane, new Plane2D(0,1,-1000)),
                    new Vertex2D(plane, new Plane2D(0,1,1000)),
                ]
            }
            var geometry = new THREE.Geometry();
            vertices.forEach(function(v) {
                var coordinate = v.toCoordinate();
                geometry.vertices.push(new THREE.Vector3(coordinate.x, coordinate.y, coordinate.z));
            })
            var material = new THREE.LineBasicMaterial({color: color & 0x9f9f9f, linewidth: 1});
            var edges = new THREE.Line(geometry, material);
            this.scene.add(edges);
        }

        this.addPlane3D = function(plane, color) {
            var polygon = Polygon3D.fromPlane(plane);
            this.addPolygon3D(polygon, color);
        }

        var findRegions = function(node) {
            if (node instanceof Cell) {
                if (node.inside) {
                    return [node.region];
                } else {
                    return [];
                }
            } else {
                var backRegions = findRegions(node.back);
                var frontRegions = findRegions(node.front);
                var regions = [];
                backRegions && (regions = regions.concat(backRegions));
                frontRegions && (regions = regions.concat(frontRegions));
                return regions;
            }

        }

        var findBoundaries = function(node) {
            if (node instanceof Cell) {
                return [];
            } else {
                return [node.boundary].concat(findBoundaries(node.back));
            }

        }

        this.addBSPTree2D = function(t, color) {
            findRegions(t).forEach(function(region) {
                that.addPolygon2D(region, color);
            });
        }

        this.addBSPTree3D = function(t, color) {
            findRegions(t).forEach(function(region) {
                region.polygons.forEach(function(polygon) {
                    that.addPolygon3D(polygon, color);
                });
            });
        }

        this.addBoundary = function(t, color) {
            findBoundaries(t).forEach(function(polygon) {
                that.addPolygon3D(polygon, color);
            });
        }

        this.addRegion3D = function(r, color) {
            r.polygons.forEach(function(polygon) {
                that.addPolygon3D(polygon, color);
            });
        }


    }

    return Viewport;

});