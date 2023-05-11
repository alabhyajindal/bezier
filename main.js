import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

let camera, scene, renderer;
let controls;

const nodes = [];
const edges = [];
const NUMBER_OF_BEZIER_LINES = 50;

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

  // renderBeziers(NUMBER_OF_BEZIER_LINES);
  renderTwoNodes();

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

function renderTwoNodes() {
  const color = 0xadb5bd;
  // Create the materials
  const material1 = new THREE.MeshBasicMaterial({ color });
  const material2 = new THREE.MeshBasicMaterial({ color });

  // Create the geometries
  const geometry1 = new THREE.PlaneGeometry(30, 10);
  const geometry2 = new THREE.PlaneGeometry(30, 10);

  // Create the meshes and position them
  const mesh1 = new THREE.Mesh(geometry1, material1);
  mesh1.position.set(-15, 25, 0);
  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(-15, 0, 0);

  // Add the meshes to the scene
  scene.add(mesh1);
  scene.add(mesh2);
  nodes.push(mesh1, mesh2);
  controls = new DragControls([...nodes], camera, renderer.domElement);
  controls.addEventListener('drag', render);
}

function render() {
  renderer.render(scene, camera);
}
