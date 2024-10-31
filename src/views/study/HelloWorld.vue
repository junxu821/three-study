<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 创建一个场景，场景是用来放置所有对象的地方
const scene = new THREE.Scene();
// 创建一个透视相机，相机用于从特定视角观察场景
// 参数分别是视野角度、宽高比、近裁剪面、远裁剪面
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 创建一个WebGL渲染器，用于将场景渲染到屏幕上
const renderer = new THREE.WebGLRenderer();
// 定义一个THREE.Object3D类型的变量，用于后续存放立方体对象
let cube: THREE.Object3D<THREE.Object3DEventMap>;
// 设置渲染器大小与窗口大小一致
renderer.setSize(window.innerWidth, window.innerHeight);
// 创建一个立方体的几何体，参数分别是长、宽、高
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建一个基础材质，颜色设置为绿色
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 使用几何体和材质创建一个网格对象（立方体）
cube = new THREE.Mesh(geometry, material);
// 将网格对象添加到场景中
scene.add(cube);

// 设置相机位置，使其距离原点5个单位
camera.position.z = 5;

/**
 * 动画函数，用于不断更新立方体的旋转并渲染场景
 */
function animate() {
    // 使用requestAnimationFrame递归调用动画函数，实现持续动画效果
    requestAnimationFrame(animate);

    // 每帧更新立方体的旋转角度
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // 渲染场景，将场景和相机作为参数传入
    renderer.render(scene, camera);
}
animate(); // 开始动画
// 当组件挂载到DOM后调用
onMounted(() => {
    // 确保组件已经挂载且DOM已经更新后再进行初始化和动画
    // 将渲染器的DOM元素添加到之前定义的容器引用中
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
