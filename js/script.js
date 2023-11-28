console.log("Connected");

const scene = new THREE.Scene();

let camera;
const scaleWave = 0.27;

const c_width = 10;
const cameraPos = {
    width: c_width,
    height: c_width * (window.innerHeight/window.innerWidth),
    near: 1,
    far: 100,
    size: (window.innerWidth > 700)? 1 : 2
}
camera = new THREE.OrthographicCamera(
    cameraPos.width / -cameraPos.size, // left
    cameraPos.width / cameraPos.size, // right
    cameraPos.height / cameraPos.size, // top
    cameraPos.height / -cameraPos.size, // bottom
    cameraPos.near, // near
    cameraPos.far // far
)
// Ilumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0);
scene.add(directionalLight);

// Camera
cameraPos.size = (window.innerWidth > 700)? 1 : 2;
camera.position.set(4, 4, 4)
camera.lookAt(0, 0, 0);

// Render the scene
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create a new figure
/*
    var 
*/

var geometry = new THREE.BoxGeometry( 3, 1, 3 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000} );
var cube = new THREE.Mesh( geometry, material );
let grid = new THREE.GridHelper( 100, 100 );
scene.add( grid );
scene.add( cube );
let cube2 = cube.clone();
scene.add( cube2 );
scene.background = new THREE.Color( 0x000000 );
cube.position.set(0, 1, 0);
geometry = new THREE.RingGeometry( 6, 8, 4, 1, 0 );
material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, side : THREE.DoubleSide, opacity: 1, transparent: true } );
const ring = new THREE.Mesh( geometry, material);
scene.add( ring );
ring.position.set(0, 0.5, 0);
// scene.remove(cube);

ring.scale.set(scaleWave, scaleWave, scaleWave);

ring.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/2);
ring.rotateZ(Math.PI/4);

function animate() {
    requestAnimationFrame( animate );
    AnimationForceField();
    renderer.render( scene, camera );
}
let count = 0;
function AnimationForceField(waves = 3)
{
    // ring.scale.set(scaleWave, scaleWave, scaleWave);
    ring.scale.x += 0.0020;
    ring.scale.y += 0.0020;
    if (ring.scale.x > 0.4) {
        ring.scale.x = 0.4;
        ring.scale.y = 0.4;
        resetWave();
    }
}
function resetWave()
{
    ring.scale.set(scaleWave, scaleWave, scaleWave);
    console.log("Ha entrado a la función")
}

let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
    identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 1000);
    setInterval(AnimationForceField, 1000);
}
function mandarMensaje() {
    console.log("Ha pasado 1 segundo.");
}
repetirCadaSegundo();
animate();