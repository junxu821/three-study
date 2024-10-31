<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 初始化渲染器，并设置其大小与当前窗口大小一致
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建一个透视相机，并设置其位置和视角
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// 创建一个场景对象
const scene = new THREE.Scene();

// 创建一个线条材质对象，颜色设置为蓝色
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
// 定义线条的顶点
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
// 创建一个缓冲几何体，并从顶点数组中设置几何体
const geometry = new THREE.BufferGeometry().setFromPoints(points);
// 创建一个线条对象，并将其添加到场景中
const line = new THREE.Line(geometry, material);
scene.add(line);

// 渲染场景
renderer.render(scene, camera);

// 当组件挂载后，调用初始化函数
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
