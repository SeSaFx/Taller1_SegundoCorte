import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import gsap from 'gsap';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';


/* 
    Actividad
    - Cambiar imagenes por modelos(puede ser el mismo modelo)
    - Limitar el scroll
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1 ;
  
});

let y = 0;
let position = 0;

let car;
let hlight;
let directionalLight;
let light;
let light2;
let light3;
let light4;
let objs = [];

document.body.onload = () => {
  main();
};



/* window.addEventListener( 'resize', onWindowResize, false ); */
window.addEventListener('wheel', onMouseWheel, false);



window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  scene.background = new THREE.Color(0xdddddd);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};



function main() {
  // Configurracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.background = new THREE.Color(0xdddddd);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  /* camera.position.x = 12;
  camera.position.y = 5;
  camera.position.z = 0; */
  scene.add(camera);

  //new OrbitControls(camera, renderer.domElement);
let loader = new GLTFLoader();
  for (let i = 0; i < 4; i++) {
    

  loader.load(
    `assets/${i}.gltf`,
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(gltf.scene);
      
      //animate();
      car.rotation.z = 8;
      car.position.set(Math.random()+ 2, i* -4);

      scene.add(car);
  scene.traverse((object) => {
    if (object.isMesh) objs.push(object);
  });
      
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
  
  }
  /* scene.traverse((object) => {
    if (object.isMesh) objs.push(object);
  }); */

  

  // Lights
  setupLights();

  // Imagenes
  //loadImages();

  animate();
  cameraConfig();
  //loadGUI();

}
/* function loadImages() {


  
} */
function animate() {
  requestAnimationFrame(animate);
  updateElements();
  renderer.render(scene, camera);
}



// WHEEL
function onMouseWheel(event) {

  //event.preventDefault();
  y = -event.deltaY * 0.001;
  //camera.position.clampScalar( 5, 0);

} 



function updateElements() {
  position += y;
  y *= 0.9;
  
  if(position>-0){
    position=-0;
  }else if(position<-9){
    position=-9;
  }


// RAYCASTER
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs);
  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1, y: 1 });
    gsap.to(intersect.object.rotation, { y: -1.7 });
    gsap.to(intersect.object.position, { z: -0.9 });
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
      gsap.to(object.position, { z: 0 });
    }
  }
  

  camera.position.y = position;
}



// CAMARA
function cameraConfig() {
  camera.position.x = 1;
  camera.position.y = 0;
  camera.position.z = 8;
  
}



// LUCES
function setupLights() {
/*   hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight); */

/*   directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight); */

  light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);

light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);
  
  light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);

/*   light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  scene.add(light4);  */
}


