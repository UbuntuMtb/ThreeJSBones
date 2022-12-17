
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

Main = {};
//-----------------------------------------------------------------------
Main.Start = function () {
 
 //setTimeout(Main.Start, 4000);
 Canvas.init();
 Main.Init();
 Main.animate();

}
//-----------------------------------------------------------------------
Main.Init = function () {
    //initStats();
    initScene();
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
     //camera_controls.update();
     update();
     renderer.render(scene, camera);
}
//-----------------------------------------------------------------------
/*
function initStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '20px';
    stats.setMode(0); // 0: fps, 1: ms
    document.getElementById('stats').appendChild(stats.domElement);
  }
*/
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
  
    //document.body.appendChild(renderer.domElement);
  
    
     const gridHelper = new THREE.GridHelper(40, 10);
     scene.add(gridHelper);
  

  
    lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1);
    lights[1] = new THREE.PointLight(0xffffff, 1);
    // lights[2] = new THREE.PointLight(0xffffff, 1);
  
    lights[0].position.set(200, 300, 400);
    lights[1].position.set(-200, -300, -400);
    // lights[2].position.set(-400, -500, 500);
  
    scene.add(lights[0]);
    scene.add(lights[1]);
    // scene.add(lights[2]);
  
    const bodyBone = new THREE.Bone();
    const headBone = new THREE.Bone();
    const leftArmBone = new THREE.Bone();
    const rightArmBone = new THREE.Bone();
    const leftLegBone = new THREE.Bone();
    const rightLegBone = new THREE.Bone();
  
    bodyBone.position.set(0, 0, 0);
    headBone.position.set(0, 10, 0);
    leftArmBone.position.set(6, 6, 0);
    rightArmBone.position.set(-6, 6, 0);
    leftLegBone.position.set(2, -6, 0);
    rightLegBone.position.set(-2, -6, 0);
  
    bodyBone.add(headBone);
    bodyBone.add(leftArmBone);
    bodyBone.add(rightArmBone);
    bodyBone.add(leftLegBone);
    bodyBone.add(rightLegBone);
  
    const bones = [];
    bones.push(bodyBone);
    bones.push(headBone);
    bones.push(leftArmBone);
    bones.push(rightArmBone);
    bones.push(leftLegBone);
    bones.push(rightLegBone);
  
    const skeleton = new THREE.Skeleton(bones);
  
    const bodyGeometry = new THREE.BoxGeometry(8, 12, 4, 1, 1, 1);
    const headGeometry = new THREE.BoxGeometry(8, 8, 8, 1, 1, 1);
    const leftArmGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);
    const rightArmGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);
    const leftLegGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);
    const rightLegGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);
  
    headGeometry.translate(0, 10, 0);
    leftArmGeometry.translate(6, 0, 0);
    rightArmGeometry.translate(-6, 0, 0);
    leftLegGeometry.translate(2, -12, 0);
    rightLegGeometry.translate(-2, -12, 0);

    const humanGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries([bodyGeometry, headGeometry, leftArmGeometry, rightArmGeometry, leftLegGeometry, rightLegGeometry]);
    const position = humanGeometry.attributes.position;

    const skinIndices = [];
    const skinWeights = [];

    // 6 geometries, 6 bones, 8 vertices per geometry
    for (let boneIndex = 0; boneIndex < 6; boneIndex += 1) {
        for (let vertexIndex = 0; vertexIndex < 8; vertexIndex += 1) {
            skinIndices.push(new THREE.Vector4(boneIndex, 0, 0, 0));
            skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
        }
    }


    humanGeometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
    humanGeometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));


   
    const material = new THREE.MeshPhongMaterial( {
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true
    } );
  
    mesh = new THREE.SkinnedMesh(humanGeometry, material);
  
    mesh.add(bodyBone);
    mesh.bind(skeleton);
  
    scene.add(mesh);
  
    //helper = new THREE.SkeletonHelper(mesh);
    //helper.material.linewidth = 4; // Not working ?
    //scene.add(helper);
  }
//-----------------------------------------------------------------------
  function update() {
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
  
    //elper.update();
    //stats.update();
    orbit.update();
  }
  

  
