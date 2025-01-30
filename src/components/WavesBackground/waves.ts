import * as THREE from 'three';

const SEPARATION = 120;
const AMOUNTX = 70;
const AMOUNTY = 70;
let camera: THREE.Camera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

let particles: THREE.Points;
let count = 0;

let mouseX = 5;
let mouseY = -5;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// let lastMouseXPosition = 0;
// let lastMouseYPosition = 0;

export const startAnimation = () => {
    const container = document.getElementById('waves-background');
    // const radialBackgroundElement = document.getElementById('radial-background');
    if (container?.childElementCount) {
        return;
    }

    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0,
        j = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
            positions[i + 1] = 0; // y
            positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

            scales[j] = 1;

            i += 3;
            j++;
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (container) {
        container.appendChild(renderer.domElement);
        container.style.touchAction = 'none';
        document.addEventListener('pointermove', onPointerMove);
    }

    // if (radialBackgroundElement) {
    //     document.addEventListener('pointermove', onRadialBackgroundPointerMove);
    //     document.addEventListener('scroll', onRadialBackgroundScroll);
    // }

    window.addEventListener('resize', onWindowResize);

    animate();
};

const onWindowResize = () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    // @ts-ignore
    camera.aspect = window.innerWidth / window.innerHeight;
    // @ts-ignore
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const onPointerMove = (event: PointerEvent) => {
    if (event.isPrimary === false) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
};

// const onRadialBackgroundScroll = () => {
//     const backgroundElement = document.getElementById('radial-background');

//     if (backgroundElement) {
//         const elementRect = backgroundElement.getBoundingClientRect();
//         const windowWidth = elementRect.width;
//         const windowHeight = elementRect.height;

//         const mouseXpercentage = Math.round((lastMouseXPosition / windowWidth) * 100);
//         const mouseYpercentage = Math.round((lastMouseYPosition / windowHeight) * 100);

//         backgroundElement.style.background =
//             'radial-gradient(circle at ' + mouseXpercentage + '% ' + mouseYpercentage + '%,  #262847, #0d111e)';
//     }
// };

// const onRadialBackgroundPointerMove = (event: PointerEvent) => {
//     const backgroundElement = document.getElementById('radial-background');

//     if (backgroundElement) {
//         const elementRect = backgroundElement.getBoundingClientRect();
//         const windowWidth = elementRect.width;
//         const windowHeight = elementRect.height;

//         lastMouseXPosition = event.clientX;
//         lastMouseYPosition = event.clientY;
//         const mouseXpercentage = Math.round((lastMouseXPosition / windowWidth) * 100);
//         const mouseYpercentage = Math.round((lastMouseYPosition / windowHeight) * 100);

//         backgroundElement.style.background =
//             'radial-gradient(circle at ' + mouseXpercentage + '% ' + mouseYpercentage + '%,  #262847, #0d111e)';
//     }
// };

const animate = () => {
    requestAnimationFrame(animate);

    render();
};

const render = () => {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += 30 + (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    const positions = particles.geometry.attributes.position.array;
    const scales = particles.geometry.attributes.scale.array;

    let i = 0,
        j = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            positions[i + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
            scales[j] = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
            i += 3;
            j++;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;

    renderer.render(scene, camera);

    count += 0.1;
};
