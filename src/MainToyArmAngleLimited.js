
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let orbit;
let stats;
let lights;
let helper;
let gridHelper;

const origin = new THREE.Vector3(0, 0, 0);

let sphere0 = {};
let sphere1 = {};
let sphere2 = {};
let sphere3 = {};
let link1 = {};
let link2 = {};
let link3 = {};

let lastTime = 0;
let angle = 0;
let increasing = true;

Main = {};

//-----------------------------------------------------------------------

Main.Start = function () {
  Canvas.init();
  Main.InitScene();
  Main.AddObjects();
  requestAnimationFrame(Main.animate);
}

//-----------------------------------------------------------------------

Main.animate = function (time) {
  time *= 0.0005;  // convert time to seconds

  let deltaAngle = time - lastTime;

  // Move over a single axis, limit angle motion.

  if (increasing) {
    angle += deltaAngle;
    if (angle > Math.PI / 2) {
      angle = Math.PI / 2;
      increasing = false;
    }
  }
  else {
    angle -= deltaAngle;
    if (angle < -Math.PI / 2) {
      angle = -Math.PI / 2;
      increasing = true;
    }
  }
 
  sphere0.rotation.z = angle;
  sphere1.rotation.z = angle;
  sphere2.rotation.z = angle;

  lastTime = time;

  orbit.update();
  renderer.render(scene, camera);
  requestAnimationFrame(Main.animate);  
}

//-----------------------------------------------------------------------

Main.InitScene = function () {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: Canvas.MainCanvas });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 5, 5);
  camera.lookAt(origin);

  THREEx.WindowResize(renderer, camera);  

  orbit = new THREE.OrbitControls(camera, Canvas.MainCanvas);

  control = new THREE.TransformControls(camera, Canvas.MainCanvas);
  control.space = 'world';
  control.addEventListener('mouseDown', () => orbit.enabled = false);
  control.addEventListener('mouseUp', () => orbit.enabled = true);
  
  gridHelper = new THREE.GridHelper(40, 10);

  lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1);
  lights[1] = new THREE.PointLight(0xffffff, 0.5);
  lights[0].position.set(30, 30, 20);
  lights[1].position.set(-40, -40, -40);
  
  scene = new THREE.Scene();
  scene.add(control);
  scene.add(gridHelper);
  scene.add(lights[0]);
  scene.add(lights[1]);
}

//-----------------------------------------------------------------------
// Creates a 3 link toy arm
// There are 3 spheres which acts as parents of the following link and sphere 
// (owners of the reference axis for its child objects).
// When the sphere rotates, its link and sphere move accordingly.
// When its child sphere moves/rotates, the child children move according
// its parent sphere position/rotation.
//-----------------------------------------------------------------------

Main.AddObjects = function () {
  const boxWidth = 1.0;
  const boxHeight = 0.2;
  const boxDepth = 0.2;
  const radius = 0.1;

  const boxGeom = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const sphereGeom = new THREE.SphereGeometry(radius, 16, 8);

  const material0 = new THREE.MeshPhongMaterial({color: 0xff0000});
  const material1 = new THREE.MeshPhongMaterial({color: 0x00ff00});
  const material2 = new THREE.MeshPhongMaterial({color: 0x0000ff});
  const material3 = new THREE.MeshPhongMaterial({color: 0xffff00});

  sphere0 = new THREE.Mesh(sphereGeom, material0);
  
  link1   = new THREE.Mesh(boxGeom, material1);
  sphere1 = new THREE.Mesh(sphereGeom, material1);

  link2   = new THREE.Mesh(boxGeom, material2);
  sphere2 = new THREE.Mesh(sphereGeom, material2);

  link3 = new THREE.Mesh(boxGeom, material3);
  sphere3 = new THREE.Mesh(sphereGeom, material3);

  scene.add(sphere0);
  sphere0.position.set(0, 0, 0);  

  scene.add(link1);
  scene.add(sphere1);
  sphere0.add(link1);
  sphere0.add(sphere1);
  link1.position.set(0.5, 0, 0);
  sphere1.position.set(1, 0, 0);

  scene.add(link2);
  scene.add(sphere2);
  sphere1.add(link2);
  sphere1.add(sphere2);
  link2.position.set(0.5, 0, 0);
  sphere2.position.set(1, 0, 0);

  scene.add(link3);
  scene.add(sphere3);
  sphere2.add(link3);
  sphere2.add(sphere3);
  link3.position.set(0.5, 0, 0);
  sphere3.position.set(1, 0, 0);
}
