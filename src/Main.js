
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

let cube = {};
let cube2 = {};
let cube3 = {};
let cube4 = {};
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
 
  cube2.rotation.x = time;
  cube3.rotation.y = time;
  cube4.rotation.z = time;
  cube.rotation.z = time;

  orbit.update();
  renderer.render(scene, camera);

  requestAnimationFrame(Main.animate);  
}

//-----------------------------------------------------------------------

Main.InitScene = function () {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: Canvas.MainCanvas });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 10, 15);
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
  //lights[1] = new THREE.PointLight(0xffffff, 1);
  lights[0].position.set(300, 300, 300);
  //lights[1].position.set(-200, -300, -400);
  
  scene = new THREE.Scene();
  scene.add(control);
  scene.add(gridHelper);
  scene.add(lights[0]);
  //scene.add(lights[1]);
}

//-----------------------------------------------------------------------

Main.AddObjects = function () {
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
  const material1 = new THREE.MeshPhongMaterial({color: 0xff0000});
  const material2 = new THREE.MeshPhongMaterial({color: 0x00ff00});
  const material3 = new THREE.MeshPhongMaterial({color: 0x0000ff});
  const material4 = new THREE.MeshPhongMaterial({color: 0xffff00});
  cube = new THREE.Mesh(geometry, material1);
  cube2 = new THREE.Mesh(geometry, material2);
  cube3 = new THREE.Mesh(geometry, material3);
  cube4 = new THREE.Mesh(geometry, material4);
  scene.add(cube);
  scene.add(cube2);
  scene.add(cube3);
  scene.add(cube4);
  cube.add(cube2);
  cube.add(cube3);
  cube.add(cube4);
  cube2.position.x = 2.0;
  cube3.position.y = 2.0;
  cube4.position.x = -2.0;
  //cube.rotation.z = 45 * 3.1415 / 180;
  cube.position.z = 2.0;
}
