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
//向量Vector3对象表示方向
const axis = new THREE.Vector3(1, 1, 1);
axis.normalize(); //向量归一化
//沿着axis轴表示方向平移100

renderer.render(scene, camera);
/**
 * 动画函数，用于不断更新立方体的旋转并渲染场景
 */
function animate() {
    // 使用requestAnimationFrame递归调用动画函数，实现持续动画效果
    requestAnimationFrame(animate);
    boxMesh.translateOnAxis(axis, -10);
    // 每帧更新立方体的旋转角度
    // boxMesh.rotation.x += 0.01;
    // boxMesh.translateZ(1);
    // axesHelper.rotation.x += 0.01;
    // axesHelper.rotation.y += 0.01;
    // 渲染场景，将场景和相机作为参数传入
    renderer.render(scene, camera);
}
animate(); // 开始动画
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
