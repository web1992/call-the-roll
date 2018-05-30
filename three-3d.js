//import * as THREE from "three";
var THREE = require("three");
var TWEEN = require("@tweenjs/tween.js");
//import * as TWEEN from "@tweenjs/tween.js";
//import { TrackballControls } from "three-trackballcontrols";
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
  5
];

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 3000;

  scene = new THREE.Scene();

  // table

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

    objects.push(object);

    //

    var object = new THREE.Object3D();
    object.position.x = table[i + 3] * 300 - 1330;
    object.position.y = -(table[i + 4] * 350) + 990;

    targets.table.push(object);
  }

  // sphere

  var vector = new THREE.Vector3();
  var spherical = new THREE.Spherical();

  for (var i = 0, l = objects.length; i < l; i++) {
    var phi = Math.acos(-1 + 2 * i / l);
    var theta = Math.sqrt(l * Math.PI) * phi;

    var object = new THREE.Object3D();

    spherical.set(800, phi, theta);

    object.position.setFromSpherical(spherical);

    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);

    targets.sphere.push(object);
  }

  // helix

  var vector = new THREE.Vector3();
  var cylindrical = new THREE.Cylindrical();

  for (var i = 0, l = objects.length; i < l; i++) {
    var theta = i * 0.175 + Math.PI;
    var y = -(i * 8) + 450;

    var object = new THREE.Object3D();

    cylindrical.set(900, theta, y);

    object.position.setFromCylindrical(cylindrical);

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt(vector);

    targets.helix.push(object);
  }

  // grid

  for (var i = 0; i < objects.length; i++) {
    var object = new THREE.Object3D();

    object.position.x = (i % 5) * 400 - 800;
    object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
    object.position.z = Math.floor(i / 25) * 1000 - 2000;

    targets.grid.push(object);
  }

  //

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  //

  controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.5;
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener("change", render);

  var button = document.getElementById("table");
  button.addEventListener(
    "click",
    function(event) {
      transform(targets.table, 1000);
    },
    false
  );

  var button = document.getElementById("sphere");
  button.addEventListener(
    "click",
    function(event) {
      transform(targets.sphere, 100);
    },
    false
  );

  var button = document.getElementById("helix");
  button.addEventListener(
    "click",
    function(event) {
      transform(targets.helix, 200);
    },
    false
  );

  var button = document.getElementById("grid");
  button.addEventListener(
    "click",
    function(event) {
      transform(targets.grid, 600);
    },
    false
  );

  transform(targets.table, 2000);

  //

  window.addEventListener("resize", onWindowResize, false);
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
}

function render() {
  renderer.render(scene, camera);
}
