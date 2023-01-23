
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

const BonesActive = true;
const ComplexBones = false;


Main = {};
//-----------------------------------------------------------------------
Main.Start = function () {

  //setTimeout(Main.Start, 4000);

  Main.Init();
  Main.animate();

}
//-----------------------------------------------------------------------
Main.Init = function () {
  //initStats();
  Canvas.init();
  initScene();


  SimpleBonesInit();


}
//-----------------------------------------------------------------------
Main.animate = function () {
  // THIS IS THE MAIN ANIMATION LOOP
  // note: three.js includes requestAnimationFrame shim
  // alternative to using setInterval for updating in-browser drawing
  // this effectively requests that the animate function be called again for next draw
  // http://learningwebgl.com/blog/?p=3189
  requestAnimationFrame(Main.animate);



  // update camera position and render scene
  //TODO: NPBP00 This functions has to be modified to configure depending on user choices.
  Main.renderScenes();
}
//-----------------------------------------------------------------------
Main.renderScenes = function renderScenes() {
  // threejs rendering updates
  //Main render.

  simple_bones_update();
  orbit.update();  
  renderer.render(scene, camera);
}
//-----------------------------------------------------------------------
function initScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(20, 30, 40);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: Canvas.MainCanvas });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  orbit = new THREE.OrbitControls(camera, Canvas.MainCanvas);
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
function SimpleBonesInit() {

  const bones = [];

  const BaseLinkBone = new THREE.Bone();
  const link1Bone = new THREE.Bone();
  const link2Bone = new THREE.Bone();
  const link3Bone = new THREE.Bone();
  const EndEffectorBone = new THREE.Bone();

  BaseLinkBone.position.set(0, -3, 0);
  bones.push(BaseLinkBone);
  link1Bone.position.set(0, 0, 0);
  BaseLinkBone.add(link1Bone);
  bones.push(link1Bone);

  link2Bone.position.set(0, 6, 0);
  link1Bone.add(link2Bone);
  bones.push(link2Bone);

  link3Bone.position.set(0, 6, 0);
  link2Bone.add(link3Bone);
  bones.push(link3Bone);

  EndEffectorBone.position.set(0, 6, 0);
  link3Bone.add(EndEffectorBone);
  bones.push(EndEffectorBone);

  const targetBone = new THREE.Bone();
  targetBone.position.y = 5;
  targetBone.position.x = 10;
  BaseLinkBone.add(targetBone);
  bones.push(targetBone);





  const link1_geom = new THREE.BoxGeometry(0.05, 6, 0.05 );
  const link2_geom = new THREE.BoxGeometry(0.05, 6, 0.05);
  const link3_geom = new THREE.BoxGeometry(0.05, 6, 0.05);

  link1_geom.translate(0, 0, 0);
  link2_geom.translate(0, 6, 0);
  link3_geom.translate(0, 12, 0);

  const link1_vertices = link1_geom.attributes.position;
  const link2_vertices = link2_geom.attributes.position;
  const link3_vertices = link3_geom.attributes.position;

  const arm_geom = THREE.BufferGeometryUtils.mergeBufferGeometries([link1_geom, link2_geom, link3_geom]);




  //const position = geometry.attributes.position;

  const vertex = new THREE.Vector3();

  const skinIndices = [];
  const skinWeights = [];

  //Section to display wireframe.

  /*
  const wireframe = new THREE.WireframeGeometry( geometry );
  const line = new THREE.LineSegments( wireframe );
  line.material.depthTest = false;
  line.material.opacity = 1.0;
  line.material.transparent = true;
  scene.add( line );
*/

  //Attach bones to the geometry 
  for (let i = 0; i < link1_vertices.count; i++) {
    vertex.fromBufferAttribute(link1_vertices, i);
    skinIndices.push(0, 1, 0, 0);
    skinWeights.push(0, 1, 0, 0);
  }


  for (let i = 0; i < link2_vertices.count; i++) {
    vertex.fromBufferAttribute(link2_vertices, i);
    skinIndices.push(1, 2, 0, 0);
    skinWeights.push(0, 1, 0, 0);
  }

  for (let i = 0; i < link3_vertices.count; i++) {
    vertex.fromBufferAttribute(link3_vertices, i);
    skinIndices.push(2, 3, 0, 0);
    skinWeights.push(0, 1, 0, 0);
  }

  arm_geom.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
  arm_geom.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));


  const material = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    flatShading: true
  });

  mesh = new THREE.SkinnedMesh(arm_geom, material);
  const skeleton = new THREE.Skeleton(bones);

  mesh.add(bones[0]);

  mesh.bind(skeleton);

  mesh.position.x = 0;
  mesh.position.y = 3;
  mesh.position.z = 0;
  scene.add(mesh);

  //skeletonHelper = new THREE.SkeletonHelper(mesh);
  //skeletonHelper.material.linewidth = 2;
  //scene.add(skeletonHelper);


  const iks = [
    {
      target: 5, // "target"
      effector: 4, // "bone3"
      links: [   { index: 3  , limitation : new THREE.Vector3( 0, 0, 1 ) },  
                 { index: 2  , limitation : new THREE.Vector3( 0, 0, 1 ) }, 
                 { index: 1  , limitation : new THREE.Vector3( 0, 1, 0 ) }
              ], // "bone2", "bone1", "bone0"
      iteration: 0.5
    }
  ];
  ikSolver = new THREE.CCDIKSolver(mesh, iks);



  //EFgeom = new THREE.SphereGeometry( 0.8, 32, 16 );
  //EFmaterial = new THREE.MeshBasicMaterial( { color: 0x156289 } );
  //EFsphere = new THREE.Mesh( EFgeom, EFmaterial );
  //scene.add( EFsphere );


  TGgeom = new THREE.SphereGeometry(0.8, 32, 16);
  TGmaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  TGsphere = new THREE.Mesh(TGgeom, TGmaterial);
  scene.add(TGsphere);




}
//-----------------------------------------------------------------------
function complex_bones_update() {
  const time = Date.now() * 0.001;
  const angle = Math.sin(time);

  const bones = mesh.skeleton.bones;

  // Head
  bones[1].rotation.y = (Math.PI * angle) / 8;

  // Left arm
  bones[2].rotation.x = (Math.PI * angle) / 4;

  // Right arm
  bones[3].rotation.x = -(Math.PI * angle) / 4;

  // Left leg
  bones[4].rotation.x = -(Math.PI * angle) / 4;

  // Right leg
  bones[5].rotation.x = (Math.PI * angle) / 4;
}


function simple_bones_update() {

  const time = Date.now() * 0.0005;
  const angle = Math.sin(time);

  const bones = mesh.skeleton.bones;



  //EFsphere.position.x = twinGlobalPos.x;
  //EFsphere.position.y = twinGlobalPos.y;
  //EFsphere.position.z = twinGlobalPos.z;


  // Body
  bones[5].position.y = 12;
  bones[5].position.x = 5 + 15 * angle;
  bones[5].position.z = 5+ 7 * angle;

  TGsphere.position.x = bones[5].position.x;
  TGsphere.position.y = bones[5].position.y;
  TGsphere.position.z = bones[5].position.z;

  ikSolver?.update();


}
