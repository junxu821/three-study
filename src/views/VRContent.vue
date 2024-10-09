<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 创建一个场景，场景是用来放置所有对象的地方
const scene = new THREE.Scene();

// 创建一个透视相机，相机用于从特定视角观察场景
// 参数分别是视野角度、宽高比、近裁剪面、远裁剪面
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建一个WebGL渲染器，用于将场景渲染到屏幕上
const renderer = new THREE.WebGLRenderer();
renderer.xr.enabled = true;
renderer.setAnimationLoop(function () {
    renderer.render(scene, camera);
});

onMounted(() => {
    // 将渲染器的DOM元素添加到文档体中
    containerRef.value?.appendChild(VRButton.createButton(renderer));
});
</script>
<style lang="scss" scoped></style>
