<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// 导入Three.js库
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 初始化渲染器，并设置其大小与当前窗口大小一致
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 创建一个透视相机，并设置其位置和视角
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(0, 0, 500);
camera.lookAt(0, 0, 0);

// 创建一个场景对象
const scene = new THREE.Scene();
// scene.background = new THREE.Color('#FFFFFF');
const loader = new GLTFLoader();
// const axesHelper = new THREE.AxesHelper(1000);
const url = new URL('./2CylinderEngine/glTF-Binary/2CylinderEngine.glb', import.meta.url);
loader.load(url.href, gltf => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 白光，强度为1
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight('rgb(255,255,255)', 5);
    dirLight.position.set(10, 10, 5); // 根据需要自行调整位置
    scene.add(dirLight);

    gltf.scene.rotateZ(1);
    gltf.scene.position.set(10, 0, 10);
    gltf.scene.scale.set(0.5, 0.5, 0.5);

    scene.add(gltf.scene);
    // 渲染场景
    renderer.render(scene, camera);
});
// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};
// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件
// scene.add(axesHelper);

// 当组件挂载后，调用初始化函数
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
