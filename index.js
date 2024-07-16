import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: false });

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const light = new THREE.HemisphereLight(0xDEC2C1, 0x765A7E);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.001;
    sphere.rotation.x += 0.002;
    renderer.render(scene, camera);
    controls.update();
}

animate();