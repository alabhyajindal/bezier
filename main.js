import * as THREE from 'three';
import * as d3 from 'd3';
import { DragControls } from 'three/addons/controls/DragControls.js';

/** 2d camera set up - copied from codepen */
const width = window.innerWidth;
const height = window.innerHeight;

const near_plane = 2;
const far_plane = 100;

// Set up camera and scene
let camera = new THREE.PerspectiveCamera(
  40,
  width / height,
  near_plane,
  far_plane
);
camera.position.set(0, 0, far_plane);
camera.lookAt(new THREE.Vector3(0, 0, 0));

/** drawing a green cube */

// const geometry = new THREE.BoxGeometry(2, 0.7, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// scene.add(cube);

// camera.position.z = 20;

// function animate() {
//   requestAnimationFrame(animate);

//   // cube.rotation.x += 0.01;
//   // cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// animate();

/** fetching json and plotting it */
// fetch('//fastforwardlabs.github.io/visualization_assets/word2vec_tsne_2d.json')
//   .then((response) => response.json())
//   .then((raw_points) => {
//     console.log(raw_points);
//     const pointsGeometry = new THREE.BufferGeometry();
//     const colors = [];
//     for (const point of raw_points) {
//       const vertex = new THREE.Vector3(point.coords[0], point.coords[1], 0);
//       pointsGeometry.vertices.push(vertex);
//       const color = new THREE.Color();
//       color.setHSL(Math.random(), 1.0, 0.5);
//       colors.push(color);
//     }
//     pointsGeometry.colors = colors;
//     pointsMaterial = new THREE.PointsMaterial({
//       // map: spriteMap,
//       size: 6,
//       // transparent: true,
//       // blending: THREE.AdditiveBlending,
//       sizeAttenuation: false,
//       vertexColors: THREE.VertexColors,
//     });
//     const points = new THREE.Points(pointsGeometry, pointsMaterial);
//     const pointsContainer = new THREE.Object3D();
//     pointsContainer.add(points);
//     scene.add(pointsContainer);
//   });

/** drawing a line */
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

// const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
// const points = [];
// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));

// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const line = new THREE.Line(geometry, material);

// scene.add(line);
// renderer.render(scene, camera);

/** drawing a bezier curve */
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
// // Define the control points
// var startPoint = new THREE.Vector3(-10, 0, 0);
// var endPoint = new THREE.Vector3(10, 0, 0);
// var controlPoint1 = new THREE.Vector3(-5, 15, 0);
// var controlPoint2 = new THREE.Vector3(5, -15, 0);

// // Create the curve
// var curve = new THREE.CubicBezierCurve3(
//   startPoint,
//   controlPoint1,
//   controlPoint2,
//   endPoint
// );

// // Create the geometry using the curve
// var geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

// // Create the material and mesh
// var material = new THREE.LineBasicMaterial({ color: 0x000000 });
// var mesh = new THREE.Line(geometry, material);

// // Add the mesh to the scene
// scene.add(mesh);
// renderer.render(scene, camera);

// Another one
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Define the control points
const startPoint = new THREE.Vector3(-10, 0, 0);
const endPoint = new THREE.Vector3(10, 0, 0);
const controlPoint1 = new THREE.Vector3(-5, 15, 0);
const controlPoint2 = new THREE.Vector3(5, -15, 0);

// Create the material
const material = new THREE.LineBasicMaterial({ color: 0x000000 });

// Add 50 curves with different positions to the scene
for (let i = 0; i < 500; i++) {
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
}

// Add canvas
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);
