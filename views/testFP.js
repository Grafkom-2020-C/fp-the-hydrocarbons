import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

function main() {
  let canvas = document.querySelector('#c');
  let renderer = new THREE.WebGLRenderer({canvas});

  let fov = 45;
  let aspect = 2;  // the canvas default
  let near = 0.1;
  let far = 100;
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 30);

  let controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  let scene = new THREE.Scene();
  scene.background = new THREE.Color('#e97e70');

    //ini mesh yang carbonnya
    let sphereRadius = 1.5;
    let sphereWidthDivisions = 32;
    let sphereHeightDivisions = 16;
    let color = '#64c14c'
    let sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    let sphereMat = new THREE.MeshPhongMaterial({color: 'blue'});
    let mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(0, 10.5, 0);
    scene.add(mesh);

    //4 mesh selanjutnya buat yg hidrogen
    //di addnya ngga ke scene, tapi ke mesh carbonnya biar kalo carbonnya muter, hidronya auto ngikut
    let hydroGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    let hydroMat = new THREE.MeshPhongMaterial({color: 'red'});
    let hydroMesh = new THREE.Mesh(hydroGeo, hydroMat);
    hydroMesh.position.set(-5, -5, 5);
    mesh.add(hydroMesh);

    hydroGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    hydroMat = new THREE.MeshPhongMaterial({color: 'red'});
    hydroMesh = new THREE.Mesh(hydroGeo, hydroMat);
    hydroMesh.position.set(5, -5, 5);
    mesh.add(hydroMesh);

    hydroGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    hydroMat = new THREE.MeshPhongMaterial({color: 'red'});
    hydroMesh = new THREE.Mesh(hydroGeo, hydroMat);
    hydroMesh.position.set(5, -5, -5);
    mesh.add(hydroMesh);
    
    hydroGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    hydroMat = new THREE.MeshPhongMaterial({color: 'red'});
    hydroMesh = new THREE.Mesh(hydroGeo, hydroMat);
    hydroMesh.position.set(-5, -5, -5);
    mesh.add(hydroMesh);
    
    let len = 3 * Math.sqrt(5) + 2.5;
    
    //yang ini buat ikatannya
    let bondGeo = new THREE.CylinderGeometry(0.2, 0.2, len, 32);
    let bondMat = new THREE.MeshPhongMaterial({color : 'yellow'});
    let bondMesh = new THREE.Mesh(bondGeo,bondMat);
    bondMesh.position.set(2, -1.89, -2);
    bondMesh.rotation.x = 0.8;
    bondMesh.rotation.z = 0.6;
    mesh.add(bondMesh);
    
    bondGeo = new THREE.CylinderGeometry(0.2, 0.2, len + 1, 32);
    bondMat = new THREE.MeshPhongMaterial({color : 'yellow'});
    bondMesh = new THREE.Mesh(bondGeo,bondMat);
    bondMesh.position.set(-2.993, -2.331, 2.742);
    bondMesh.rotation.x = 0;
    bondMesh.rotation.y = 3.894;
    bondMesh.rotation.z = 0.984;
    mesh.add(bondMesh);

    
    bondGeo = new THREE.CylinderGeometry(0.2, 0.2, len + 1, 32);
    bondMat = new THREE.MeshPhongMaterial({color : 'yellow'});
    bondMesh = new THREE.Mesh(bondGeo,bondMat);
    bondMesh.position.set(2.632, -2.221, 2.301);
    bondMesh.rotation.x = 2.301;
    bondMesh.rotation.y = 3.132;
    bondMesh.rotation.z = 0.637;
    mesh.add(bondMesh);
    
    color = 0xFFFFFF;
    let intensity = 1;
    let light = new THREE.PointLight(color, intensity);
    light.position.set(0, 20, 0);
    // light.target.position.set(-5, 0, 0);
    scene.add(light);
    // scene.add(light.target)
    
    
    bondGeo = new THREE.CylinderGeometry(0.2, 0.2, len, 32);
    bondMat = new THREE.MeshPhongMaterial({color : 'yellow'});
    bondMesh = new THREE.Mesh(bondGeo,bondMat);
    bondMesh.position.set(-1.89, -2, -2);
    bondMesh.rotation.x = 0.568; // -> ini nilai dapet setelah ngatur-ngatur GUI
    bondMesh.rotation.y = 2.993;
    bondMesh.rotation.z = 0.568;
    mesh.add(bondMesh);
    
      function makeXYZGUI(gui, vector3, name,l,r) {
          const folder = gui.addFolder(name);
          folder.add(vector3, 'x', l, r,0.001);
          folder.add(vector3, 'y', l, r,0.001);
          folder.add(vector3, 'z', l, r,0.001);
          folder.open();
      }
      
      const gui = new GUI({autoplace : false});
      makeXYZGUI(gui,bondMesh.position,'position',-5,5);
      makeXYZGUI(gui,bondMesh.rotation,'rotation',0, 2 * Math.PI);
      
      //buat ngatur posisi ikatannya bagian diatas ini di-uncomment, nanti muncul GUI buat ngatur-ngatur posisi sama rotasi dari mesh ikatannya
      //urutannya, bikin mesh buat bondnya -> bikin guinya -> atur-atur posisi sama rotasinya -> kalo udah bagus, ambil nilai yang ada di guinya
      //lakukan itu buat setiap bond
      //ngatur-ngaturnya harus manual sih jadi butuh kesabaran berlebih hehe :)
    
    
    function resizeRendererToDisplaySize(renderer) {
      let canvas = renderer.domElement;
      let width = canvas.clientWidth;
      let height = canvas.clientHeight;
      let needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
  }

  function render(time) {
    time *= 0.001;
    if (resizeRendererToDisplaySize(renderer)) {
      let canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    // mesh.rotation.x = time;
    mesh.rotation.y = time;
    // mesh.rotation.z = time;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
