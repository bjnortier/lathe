define([], function() {

    var Viewport = function(container) {


        var container, camera, controls, renderer, plane, light;
        var mouse = new THREE.Vector2(),
            offset = new THREE.Vector3();
        var containerWidth = 300, containerHeight = 300;

        var that = this;
        init();
        animate();


        function init() {

            container.style.width  = containerWidth + 'px';
            container.style.height = containerHeight + 'px';

            camera = new THREE.PerspectiveCamera(70, containerWidth / containerHeight, 1, 10000 );
            camera.position.z = 100;

            controls = new THREE.TrackballControls(camera, container);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;

            that.scene = new THREE.Scene();
            that.scene.add( new THREE.AmbientLight( 0x505050 ) );

            light = new THREE.SpotLight( 0xffffff, 1.5 );
            light.position.set( 0, 500, 2000 );
            that.scene.add( light );

            var geometry = new THREE.CubeGeometry( 40, 40, 40 );
            var i = 0;

            var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
            object.material.ambient = object.material.color;


            that.scene.add( object );

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.sortObjects = false;
            renderer.setSize(containerWidth, containerHeight);


            container.appendChild(renderer.domElement);

            renderer.domElement.addEventListener( 'mousemove', mouseMove, false);
            renderer.domElement.addEventListener( 'mouseup', mousUp, false);

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {
            camera.aspect = containerWidth/containerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerWidth, containerHeight);
        }

        function mouseMove(event) {
            event.preventDefault();
            mouse.x =  (event.clientX/containerWidth)*2-1;
            mouse.y = -(event.clientY/containerHeight)*2+1;
        }

        function mousUp(event) {
            event.preventDefault();
            controls.enabled = true;
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            controls.update();
            light.position = camera.position;
            renderer.render(that.scene, camera);
        }

    }

    return Viewport;

});