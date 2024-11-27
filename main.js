import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
//THREE.MeshBasicMaterial si el material no se afecta por la luz
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
cube.scale.setScalar(2);
scene.add(cube);

//se agrega la luz para afectar al material standard
const hemLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemLight);

function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

renderer.render(scene, camera);