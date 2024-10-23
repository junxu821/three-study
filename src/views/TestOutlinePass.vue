<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
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
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
const outlinePass = new OutlinePass(v2, scene, camera);
outlinePass.visibleEdgeColor.set(0xffffff);
//高亮发光描边厚度
outlinePass.edgeThickness = 4;
//高亮描边发光强度
outlinePass.edgeStrength = 6;
//模型闪烁频率控制，默认0不闪烁
outlinePass.pulsePeriod = 2;
outlinePass.selectedObjects = [boxMesh];

composer.addPass(outlinePass);

// // 在动画循环中渲染Composer
function animate() {
    composer.render(); // 应用后期处理
    requestAnimationFrame(animate);
}
animate();
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
