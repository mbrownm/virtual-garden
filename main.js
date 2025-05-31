"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var OrbitControls_js_1 = require("three/examples/jsm/controls/OrbitControls.js");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 6, 12);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);
var groundGeometry = new THREE.CylinderGeometry(10, 10, 1, 8);
var groundMaterial = new THREE.MeshStandardMaterial({ color: 0x7fe97b, flatShading: true });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -0.5;
scene.add(ground);
var stemGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 5);
var stemMaterial = new THREE.MeshStandardMaterial({ color: 0x4fb84e, flatShading: true });
var stem = new THREE.Mesh(stemGeometry, stemMaterial);
stem.position.y = 1;
function makeLeaf(angle) {
    var leafGeometry = new THREE.ConeGeometry(0.4, 1, 6);
    var leafMaterial = new THREE.MeshStandardMaterial({ color: 0x4f54fd, flatShading: true });
    var leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.y = 1.6;
    leaf.position.z = angle;
    leaf.position.x = Math.cos(angle) * 0.5;
    leaf.position.z = Math.sin(angle) * 0.5;
    return leaf;
}
var plant = new THREE.Group();
plant.add(stem);
plant.add(makeLeaf(0));
plant.add(makeLeaf(Math.PI * 2 / 3));
plant.add(makeLeaf(Math.PI * 4 / 3));
plant.add(makeLeaf(Math.PI * 1.5));
scene.add(plant);
var controls = new OrbitControls_js_1.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();
function animate() {
    requestAnimationFrame(animate);
    plant.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
