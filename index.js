import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const marchGroup = new THREE.Group();
marchGroup.rotation.z = -23.4 * (Math.PI / 180);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

const detail = 6;
const geometry = new THREE.IcosahedronGeometry(1, detail);
const loader = new THREE.TextureLoader();
const material = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/mars_1k_color.jpg"),
});
const marchMesh = new THREE.Mesh(geometry, material);
marchGroup.add(marchMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/mars_1k_color.jpg"),
  transparent: true,
  opacity: 0.1,
  blending: THREE.AdditiveBlending,
});
const lightMesh = new THREE.Mesh(geometry, lightsMat);
marchGroup.add(lightMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
marchGroup.add(glowMesh);

const starfield = getStarfield({ numStars: 2000 });
scene.add(starfield);

const sun = new THREE.DirectionalLight(0xffffff);
sun.position.set(-2, 0.5, 1.5);
scene.add(sun);

scene.add(marchGroup);

function animate() {
  requestAnimationFrame(animate);
  marchGroup.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.001);
  renderer.render(scene, camera);
  ctrls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);