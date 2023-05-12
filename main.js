import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

let camera, scene, renderer;
let controls, group;

let enableSelection = false;

const nodes = [];
const edges = [];
const NUMBER_OF_BEZIER_LINES = 50;
const NUMBER_OF_NODES = 50;

init();

function init() {
  // Camera
  const width = window.innerWidth;
  const height = window.innerHeight;
  const near_plane = 2;
  const far_plane = 100;
  camera = new THREE.PerspectiveCamera(
    40,
    width / height,
    near_plane,
    far_plane
  );
  camera.position.set(0, 0, far_plane);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdee2e6);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  // renderBeziers(NUMBER_OF_BEZIER_LINES);
  renderNodes(NUMBER_OF_NODES);

  render();
}

function renderBeziers(count) {
  // Define the control points
  const startPoint = new THREE.Vector3(-10, 0, 0);
  const endPoint = new THREE.Vector3(10, 0, 0);
  const controlPoint1 = new THREE.Vector3(-5, 15, 0);
  const controlPoint2 = new THREE.Vector3(5, -15, 0);

  // Create the material
  const material = new THREE.LineBasicMaterial({ color: 0x000000 });

  // Add 50 curves with different positions to the scene
  for (let i = 0; i < count; i++) {
    // Create a random position for the curve
    const x = THREE.MathUtils.randFloat(-50, 50);
    const y = THREE.MathUtils.randFloat(-50, 50);
    const z = THREE.MathUtils.randFloat(-50, 50);
    const position = new THREE.Vector3(x, y, z);

    // Create the curve using the control points and position
    const curve = new THREE.CubicBezierCurve3(
      startPoint.clone().add(position),
      controlPoint1.clone().add(position),
      controlPoint2.clone().add(position),
      endPoint.clone().add(position)
    );

    // Create the geometry using the curve
    const geometry = new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(50)
    );

    // Create the mesh and add it to the scene
    const mesh = new THREE.Line(geometry, material);
    scene.add(mesh);
    edges.push(mesh);
  }

  controls = new DragControls([...edges], camera, renderer.domElement);
  controls.addEventListener('drag', render);
}

function renderNodes(count) {
  const color = 0xadb5bd;
  const material = new THREE.MeshBasicMaterial({ color });

  // Create the geometries
  const geometry = new THREE.PlaneGeometry(30, 10);

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const z = 0;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    scene.add(mesh);
    nodes.push(mesh);
  }

  controls = new DragControls([...nodes], camera, renderer.domElement);
  controls.addEventListener('drag', render);
}

function onKeyDown(event) {
  enableSelection = event.keyCode === 16 ? true : false;
  console.log(enableSelection);
}

function onKeyUp() {
  enableSelection = false;
  console.log(enableSelection);
}

function render() {
  renderer.render(scene, camera);
}
