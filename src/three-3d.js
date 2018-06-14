var THREE = require("three");
var TWEEN = require("@tweenjs/tween.js");
var TrackballControls = require("three-trackballcontrols");

import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from "three-css3drenderer";

var table = [
  "乔布斯",
  "Hydrogen",
  "1.00794",
  1,
  1,
  "乔布斯",
  "Hydrogen",
  "1.00794",
  2,
  1,
  "雷锋",
  "Helium",
  "4.002602",
  1,
  2,
  "习大大",
  "Lithium",
  "6.941",
  3,
  3,
  "克林顿",
  "Beryllium",
  "9.012182",
  4,
  4,
  "奥巴马",
  "Boron",
  "10.811",
  5,
  5,
  "奥巴马",
  "Boron",
  "10.811",
  5,
  5,
  "奥巴马",
  "Boron",
  "10.811",
  5,
  5,
  "奥巴马",
  "Boron",
  "10.811",
  5,
  5,
  "奥巴马",
  "Boron",
  "10.811",
  5,
  5,
  "奥巴马",
  "Boron",
  "10.811",
  5,
  5,
  "奥巴马",
  "Boron",
  "10.811",
  5,
  5
];

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };
let timer = null;
var _root;
var run = true;
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 4200;

  scene = new THREE.Scene();

  _root = new THREE.Object3D();
  scene.add(_root);


  // createElement

  for (var i = 0; i < table.length; i += 5) {
    var element = document.createElement("div");
    element.className = "element";
    element.style.backgroundColor =
      "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

    var number = document.createElement("div");
    number.className = "number";
    number.textContent = i / 5 + 1;
    element.appendChild(number);

    var symbol = document.createElement("div");
    symbol.className = "symbol";
    symbol.textContent = table[i];
    element.appendChild(symbol);

    var details = document.createElement("div");
    details.className = "details";
    details.innerHTML = table[i + 1] + "<br>" + table[i + 2];
    element.appendChild(details);

    var object = new CSS3DObject(element);
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add(object);
    // push
    _root.add(object);
    objects.push(object);
  }

  // grid

  for (var i = 0; i < objects.length; i++) {
    var object = new THREE.Object3D();

    object.position.x = (i % 5) * 400 - 800;
    object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
    object.position.z = Math.floor(i / 25) * 1000 - 2000;
    targets.grid.push(object);
  }

  // renderer

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // controls

  controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.3;
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener("change", render);


  // gird
  transform(targets.grid, 800);

  // 

  window.addEventListener("resize", onWindowResize, false);

  // start

  var button = document.getElementById("start");
  button.addEventListener(
    "click",
    function (event) {
      console.log("start...");
      run = true;
      _root.rotation.y = 0;
      camera.position.z = 4200;
    },
    false
  );

  // stop

  var button = document.getElementById("stop");
  button.addEventListener(
    "click",
    function (event) {
      console.log("stop...");
      run = false;
      _root.rotation.y = 0;
      camera.position.z = 900;
    },
    false
  );
}

function transform(targets, duration) {
  TWEEN.removeAll();

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var target = targets[i];

    new TWEEN.Tween(object.position)
      .to(
        { x: target.position.x, y: target.position.y, z: target.position.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();
  controls.update();
  if (run) {
    runControls()
  }
  render();
}

function runControls() {
  // 1528780371900
  var time = Date.now() * 0.00003;
  _root.rotation.y = time * 3.14;
  //console.log('x'+_root.rotation.x+' y'+_root.rotation.y +' z'+_root.rotation.z  );
}

function render() {
  //console.log( camera.position.z);
  renderer.render(scene, camera);
}
