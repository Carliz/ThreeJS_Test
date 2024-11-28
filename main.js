import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';


//para marcar el canvas donde trabajaremos
const w = window.innerWidth;
const h = window.innerHeight;

//se crea la escena y se ponce color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//creamos la camara y le ponemos la posición de Z para que se vea el cubo (0,0,0)
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
//animate();

//revisar si tiene compatibilidad con webGL2
if(WebGL.isWebGL2Available()){
    // Initiate function or other initializations here
    animate();
    renderer.render(scene, camera);
}
else
{
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById('container').appendChild(warning);
}
//lo edité y puse dentro del if de webGL2 support
//renderer.render(scene, camera);
