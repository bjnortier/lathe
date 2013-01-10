define([], function() {

    var Viewport = function(container) {


        var camera, renderer, light;
        var containerWidth = 300, containerHeight = 300;

        var that = this;
        that.container = container;
        init();
        animate();

        function init() {

            container.style.width  = containerWidth + 'px';
            container.style.height = containerHeight + 'px';

            camera = new THREE.PerspectiveCamera(70, containerWidth / containerHeight, 1, 10000 );
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

    }

    return Viewport;

});