<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';

const containerRef = ref<HTMLDivElement>();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
let cube: THREE.Object3D<THREE.Object3DEventMap>;
const init = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
};
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
onMounted(() => {
    nextTick(() => {
        init();
        animate();
    });
});
</script>
<style lang="scss" scoped></style>
