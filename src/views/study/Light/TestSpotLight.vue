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
const spotLight = new THREE.SpotLight(0xffffff,1.0);
spotLight.angle = Math.PI / 6;//
spotLight.position.set(0, 50, 0);
scene.add(spotLight);//光源添加到场景中
const spotLightHelper = new THREE.SpotLightHelper(spotLight,0xffffff)
scene.add(spotLightHelper)
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
renderer.render(scene, camera);
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
