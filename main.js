import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {FirstPersonControls} from 
'three/examples/jsm/controls/FirstPersonControls.js';



//para marcar el canvas donde trabajaremos
const w = window.innerWidth;
const h = window.innerHeight;

//creamos la camara y le ponemos la posición de Z para que se vea el cubo (0,0,0)
const fov = 75;
const aspect = 2; //canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, w/h, near, far);
camera.position.z = 5;


//se crea la escena y se pone color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//creacion de la caja con medidas especificas
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
//THREE.MeshBasicMaterial si el material no se afecta por la luz
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
cube.scale.setScalar(1);
//scene.add(cube);

//se agrega la luz para afectar al material standard
//const light = new THREE.HemisphereLight(0xffffff, 0x444444);
const color = 0xffffff;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

function animate(){    
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
//animate();

//para crear un nuevo material con color específico
function makeInstance(geometry, color, positionX){
    const newMaterial = new THREE.MeshStandardMaterial({color});
    const newCube = new THREE.Mesh(geometry, newMaterial);
    scene.add(newCube);
    newCube.position.x = positionX;
    return newCube; 
}

//cargo los cubos a partir de la funcion anterior
const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
];

//prueba para el orbit
const fpControls = new FirstPersonControls(camera, renderer.domElement);
const clock = new THREE.Clock();

//para girar los 3 cubos instanciados
function newRender(time){      
    time *= 0.001;
    fpControls.update(clock.getDelta());
    // const canvas = renderer.domElement;
    // camera.aspect = canvas.clientWidth / canvas.clientHeight;
    
    // if(resizeRendererToDisplaySize(newRender)){
    //     const canvas = renderer.domElement;
    //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //     camera.updateProjectionMatrix();
    // }

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        //const speed = .1;
        const rotation = time * speed;
        cube.rotation.x = rotation;
        cube.rotation.y = rotation;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(newRender);  
}
requestAnimationFrame(newRender);


// function resizeRendererToDisplaySize(renderer){
//     const canvas = renderer.domElement;
//     const widthC = canvas.clientWidth;
//     const heigthC = canvas.clientHeight;
//     const needResize = canvas.clientWidth !== widthC || canvas.heigthClient !== heigthC;
//     if(needResize){
//         renderer.setSize(widthClient, heigthClient, false);
//     }
//     return needResize;
// }