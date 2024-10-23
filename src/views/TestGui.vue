<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 初始化渲染器，并设置其大小与当前窗口大小一致
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建一个透视相机，并设置其位置和视角
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
// 创建一个基础材质，颜色设置为绿色
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//BoxGeometry：长方体
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMesh = new THREE.Mesh(boxGeometry, material);
scene.add(boxMesh);
renderer.render(scene, camera);
const gui = new GUI();
gui.add(boxMesh.position, 'x', 0, 180).onChange(() => {
    renderer.render(scene, camera);
});
gui.add(boxMesh.position, 'y', 0, 180).onChange(() => {
    renderer.render(scene, camera);
});
gui.add(boxMesh.position, 'z', 0, 180).onChange(() => {
    renderer.render(scene, camera);
});
gui.addColor(
    {
        color: 0xff0000
    },
    'color'
).onChange(function (value) {
    boxMesh.material.color.set(value);
    renderer.render(scene, camera);
});
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50);
directionalLight.target = boxMesh;
scene.add(directionalLight);
gui.add(directionalLight, 'intensity', 0, 2.0)
    .name('环境光强度')
    .step(0.1)
    .onChange(() => {
        renderer.render(scene, camera);
    });
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
