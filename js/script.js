console.log("Connected");

const scene = new THREE.Scene();

let camera;

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

var geometry = new THREE.BoxGeometry( 3, 1, 3 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000} );
var cube = new THREE.Mesh( geometry, material );
let grid = new THREE.GridHelper( 100, 100 );
scene.add( grid );
scene.add( cube );
geometry = new THREE.PlaneGeometry( 3, 3 );
material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, side : THREE.DoubleSide, opacity: 0.85, transparent: true } );
const plane = new THREE.Mesh( geometry, material);
scene.add( plane );
plane.rotateX(1.5707999)
plane.position.set(0, 0.55, 0);


function animate() {
    requestAnimationFrame( animate );
    AnimationForceField();
    renderer.render( scene, camera );
}
let count = 0;
function AnimationForceField(waves = 3)
{
    if (count < waves) {
        plane.scale.x += 0.0025;
        plane.scale.y += 0.0025;
        if (plane.scale.x > 1.2) {
            plane.scale.x = 1;
            plane.scale.y = 1;
            count = count + 1;
            console.log(count);
        }
    }
    else {
        count = 0;
    }
}

animate();