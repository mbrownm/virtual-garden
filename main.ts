import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0,6,12);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);

const groundGeometry = new THREE.CylinderGeometry(10, 10, 1, 8);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x7fe97b, flatShading: true});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -0.5;
scene.add(ground);

const stemGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 5);
const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x4fb84e, flatShading: true});
const stem = new THREE.Mesh(stemGeometry, stemMaterial);
stem.position.y = 1;

function makeLeaf(angle: number): THREE.Mesh {
    const leafGeometry = new THREE.ConeGeometry(0.4, 1, 6);
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x4f54fd, flatShading: true});
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.y = 1.6;
    leaf.position.z = angle;
    leaf.position.x = Math.cos(angle) * 0.5;
    leaf.position.z = Math.sin(angle) * 0.5;
    return leaf;
}

const plant = new THREE.Group();
plant.add(stem);
plant.add(makeLeaf(0));
plant.add(makeLeaf(Math.PI * 2 / 3));
plant.add(makeLeaf(Math.PI * 4/3));
plant.add(makeLeaf(Math.PI * 1.5));
scene.add(plant);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    plant.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

