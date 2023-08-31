
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

let mesh;

const origin = new THREE.Vector3(0, 0, 0);

let cube = {};
let cube2 = {};
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
  time *= 0.0001;  // convert time to seconds
 
  cube2.rotation.x = time;
  cube2.rotation.y = time;
  cube.rotation.z = time;

  // update camera position and render scene
  //TODO: NPBP00 This functions has to be modified to configure depending on user choices.
  orbit.update();
  renderer.render(scene, camera);

  requestAnimationFrame(Main.animate);  
}

//-----------------------------------------------------------------------

Main.InitScene = function () {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(20, 30, 40);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: Canvas.MainCanvas });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  orbit = new THREE.OrbitControls(camera, Canvas.MainCanvas);
  control = new THREE.TransformControls(camera, Canvas.MainCanvas);
  control.space = 'world';
  control.addEventListener('mouseDown', () => orbit.enabled = false);
  control.addEventListener('mouseUp', () => orbit.enabled = true);
  scene.add(control);

  THREEx.WindowResize(renderer, camera);
  const gridHelper = new THREE.GridHelper(40, 10);
  scene.add(gridHelper);
  lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1);
  lights[1] = new THREE.PointLight(0xffffff, 1);
  lights[0].position.set(200, 300, 400);
  lights[1].position.set(-200, -300, -400);
  scene.add(lights[0]);
  scene.add(lights[1]);
}

//-----------------------------------------------------------------------

Main.AddObjects = function () {
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
  cube = new THREE.Mesh(geometry, material);
  cube2 = new THREE.Mesh(geometry, material);
  scene.add(cube);
  scene.add(cube2);
  cube.add(cube2);
  cube2.position.y = 2.0;
  cube.rotation.z = 45 * 3.1415 / 180;
  cube.position.z = 1.0;
}
