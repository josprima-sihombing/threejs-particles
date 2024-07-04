import "./style.css";
import { OrbitControls, Timer } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const canvas = document.getElementById("three");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas! });

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100,
);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/textures/particles/1.png");

/**
 * Objects
 */
const particleGeometry = new THREE.BufferGeometry();
const width = 100;
const height = 100;
const count = width * height;
const positions = new Float32Array(count * 3);

let point = 1;

positions.forEach((_, i) => {
	if (point === 1) {
		positions[i] = (Math.random() - 0.5) * 20;
	} else if (point === 2) {
		positions[i] = (Math.random() - 0.5) * 20;
	} else if (point === 3) {
		positions[i] = 0;
		point = 0;
	}

	point++;
});

const particleAttribute = new THREE.BufferAttribute(positions, 3);
particleGeometry.setAttribute("position", particleAttribute);

const particleMaterial = new THREE.PointsMaterial();
particleMaterial.size = 0.5;
particleMaterial.sizeAttenuation = true;
particleMaterial.alphaMap = texture;
particleMaterial.transparent = true;
particleMaterial.color = new THREE.Color("#ff88cc");
// particleMaterial.alphaTest = 0.001
// particleMaterial.depthTest = false
particleMaterial.depthWrite = false;

const particles = new THREE.Points(particleGeometry, particleMaterial);

scene.add(particles);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Events
 */
window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Controls
 */
// const controls = new OrbitControls(camera, canvas!);
// controls.enableDamping = true;

/**
 * Helpers
 */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const timer = new Timer();

const tick = () => {
	// Timer
	timer.update();
	const elapsedTime = timer.getElapsed();

	// Update controls
	// controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
