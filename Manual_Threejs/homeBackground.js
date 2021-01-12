import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 100;

// Create a Full Screen WebGL Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor("#DDDDDD");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Make sure the project is responsive based on window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var controls = new OrbitControls(camera, renderer.domElement);
//controls.update();
// Add a light
var ambient = new THREE.AmbientLight(0x404040);
var light = new THREE.PointLight(0xFFFFFF, 1.5, 1000)
light.position.set(5, 5, 50);
scene.add(ambient);
scene.add(light);

var sphereC = new THREE.SphereGeometry(5, 32, 32);
var sphereH = new THREE.SphereGeometry(3, 32, 32);
var cylinder = new THREE.CylinderGeometry(1, 1, 5, 32);
var cylinderC = new THREE.CylinderGeometry(1, 1, 15, 32);
let pivots = [];

function makeMethane(x,y,z) {
    var geom = [];
    geom.push([sphereC, new THREE.Vector3(x, y, z), 0, new THREE.Vector3(0, 0, 0), "orange"]);

    geom.push([sphereH, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(0, 1, 0), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(0, 1, 0), "red"]);

    geom.push([sphereH, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(-Math.cos(Math.PI / 6), -0.4 , Math.sin(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(-Math.cos(Math.PI / 6), -0.4 , Math.sin(Math.PI / 6)), "red"]);

    geom.push([sphereH, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(Math.cos(Math.PI / 6), -0.4, Math.sin(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(Math.cos(Math.PI / 6), -0.4, Math.sin(Math.PI / 6)), "red"]);

    geom.push([sphereH, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(0, -0.4, -Math.sin(Math.PI / 3)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x, y, z), 10, new THREE.Vector3(0, -0.4, -Math.sin(Math.PI / 3)), "red"]);
    addObject(geom);
}

function makePropane(x1,y,z) {
    var geom = [];
    let x2 = x1 + 12;
    let x3 = x2 + 12;
    geom.push([sphereC, new THREE.Vector3(x2, y, z), 0, new THREE.Vector3(0, 0, 0), "orange"]);
    geom.push([sphereC, new THREE.Vector3(x1, y - 8, z), 0, new THREE.Vector3(0, 0, 0), "orange"]);
    geom.push([sphereC, new THREE.Vector3(x3, y - 8, z), 0, new THREE.Vector3(0, 0, 0), "orange"]);
    geom.push([cylinderC, new THREE.Vector3(x2, y, z), 15, new THREE.Vector3(-12, -8, 0), "red"]);
    geom.push([cylinderC, new THREE.Vector3(x2, y, z), 15, new THREE.Vector3(12, -8, 0), "red"]);

    geom.push([sphereH, new THREE.Vector3(x1, y - 8, z), 10, new THREE.Vector3(-0.6, -Math.cos(Math.PI / 6), -Math.cos(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x1, y - 8, z), 10, new THREE.Vector3(-0.6, -Math.cos(Math.PI / 6), -Math.cos(Math.PI / 6)), "red"]);

    geom.push([sphereH, new THREE.Vector3(x1, y - 8, z), 10, new THREE.Vector3(-0.6, -Math.cos(Math.PI / 6), Math.cos(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x1, y - 8, z), 10, new THREE.Vector3(-0.6, -Math.cos(Math.PI / 6), Math.cos(Math.PI / 6)), "red"]);

    geom.push([sphereH, new THREE.Vector3(x1, y - 8, z), 10, new THREE.Vector3(-0.6, 1, 0), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x1, y - 8, z), 10, new THREE.Vector3(-0.6, 1, 0), "red"]);

    geom.push([sphereH, new THREE.Vector3(x2, y, z), 10, new THREE.Vector3(0.0, Math.cos(Math.PI / 6), Math.cos(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x2, y, z), 10, new THREE.Vector3(0.0, Math.cos(Math.PI / 6), Math.cos(Math.PI / 6)), "red"]);

    geom.push([sphereH, new THREE.Vector3(x2, y, z), 10, new THREE.Vector3(0.0, Math.cos(Math.PI / 6), -Math.cos(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x2, y, z), 10, new THREE.Vector3(0.0, Math.cos(Math.PI / 6), -Math.cos(Math.PI / 6)), "red"]);


    geom.push([sphereH, new THREE.Vector3(x3, y - 8, z), 10, new THREE.Vector3(0.6, Math.cos(Math.PI / 6), Math.cos(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x3, y - 8, z), 10, new THREE.Vector3(0.6, Math.cos(Math.PI / 6), Math.cos(Math.PI / 6)), "red"]);

    geom.push([sphereH, new THREE.Vector3(x3, y - 8, z), 10, new THREE.Vector3(0.6, Math.cos(Math.PI / 6), -Math.cos(Math.PI / 6)), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x3, y - 8, z), 10, new THREE.Vector3(0.6, Math.cos(Math.PI / 6), -Math.cos(Math.PI / 6)), "red"]);

    geom.push([sphereH, new THREE.Vector3(x3, y - 8, z), 10, new THREE.Vector3(0.6, -1, 0), "gray"]);
    geom.push([cylinder, new THREE.Vector3(x3, y - 8, z), 10, new THREE.Vector3(0.6, -1, 0), "red"]);
    addObject(geom);
}

makeMethane(-100,0,-5);
makePropane(-50,50,-5);

function addObject(geom) {
    var pivot = new THREE.Group();
    scene.add(pivot);

    for (let i = 0; i < geom.length; i++) {
        var element = geom[i];
        var obj = new THREE.Mesh(element[0], new THREE.MeshLambertMaterial({ color: element[4] }));

        if (element[0] == cylinder || element[0] == cylinderC) {
            var rotationVector = element[3].normalize();
            var axis = new THREE.Vector3(0, 1, 0);
            obj.quaternion.setFromUnitVectors(axis, rotationVector.clone().normalize());
            obj.position.add(rotationVector.multiplyScalar(element[2] / 2).add(element[1]));
        } else {
            obj.position.add(element[3].normalize().multiplyScalar(element[2]).add(element[1]));
        }
        pivot.add(obj);
    }
    pivots.push(pivot);
}
// makePropane(-50,50,20);

// Geom[0] = Tipe
// Geom[1] = Posisi awal. Untuk C terhadap World, sisanya terhadap C
// Geom[2] = Distance ke C.
// Geom[3] = Arah H dan silinder terhadap C (geom[0]);
// Geom[4] = Warna;






// new THREE.Box3().setFromObject(pivot).getCenter(pivot.position).multiplyScalar(- 1);
// scene.add(pivot);

// Define Render Function
var render = function (time) {
    time *= 0.001;
    requestAnimationFrame(render);

    pivots.forEach((piv,idx) => {
        // console.log(idx);
        let speed = 1 + idx * .1;
        let rot = time * speed;
        piv.rotation.x = rot;
        piv.rotation.z = rot;
    });
    //controls.update();
    // Rotate the objects indefinitely
    // pivot.rotation.z += 0.005;
    // pivot.rotation.y += 0.005;
    renderer.render(scene, camera);
}

// Call this to render the entire scene
render();
