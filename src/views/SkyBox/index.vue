<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
import { COLLISION_SCENE_URL, SKY_BG } from './constant';
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 初始化渲染器，并设置其大小与当前窗口大小一致
const renderer = new THREE.WebGLRenderer();
// 创建一个透视相机，并设置其位置和视角
const camera = new THREE.PerspectiveCamera();
const scene = new THREE.Scene();
const orbitControls = new OrbitControls(camera, renderer.domElement);
const gltfLoader = new GLTFLoader();
// const clock = new Clock();
orbitControls.addEventListener('change', () => {
    console.log(camera.position);
});
/**
 * 初始化场景设置
 */
const initScene = () => {
    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150);
    scene.add(axesHelper);
    // 设置场景的背景颜色为黑色
    scene.background = new THREE.CubeTextureLoader().load(SKY_BG);
};
/**
 * 初始化相机参数
 */
const initCamera = () => {
    // 相机视角参数
    camera.fov = 55;
    // 场景宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 设置相机的近平面距离，防止渲染时出现裁剪现象
    camera.near = 0.1;
    // 设置相机的远平面距离，确保能正确渲染远距离的物体
    camera.far = 1000;
    // 调整相机在世界坐标系中的位置，以获得所需的观察视角
    // camera.position.set(0, 0, 3);
    camera.position.set(-54, 12, -18);
    // 更新投影矩阵，以应用上述对相机属性的更改
    camera.updateProjectionMatrix();
};
/**
 * 挂载到容器上
 */
const initRenderer = () => {
    // 启用阴影映射以增强场景的视觉效果
    renderer.shadowMap.enabled = true;
    // 设置输出颜色空间为sRGB，以保证颜色的准确性
    renderer.outputColorSpace = SRGBColorSpace;
    // 使用ACES Filmic色调映射来改善渲染输出的视觉效果
    renderer.toneMapping = ACESFilmicToneMapping;
    // 设置渲染器的尺寸以匹配窗口大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器DOM元素的样式以便正确显示
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.style.top = '0px';
    containerRef.value?.appendChild(renderer.domElement);
};
/**
 * 响应式重新渲染
 */
const initResponsiveResize = () => {
    // 监听窗口大小变化事件，当窗口大小改变时更新渲染
    window.addEventListener('resize', () => {
        // 更新相机的宽高比，以适应窗口大小的变化
        camera.aspect = window.innerWidth / window.innerHeight;
        // 更新相机的投影矩阵，确保渲染正确
        camera.updateProjectionMatrix();
        // 调整渲染器的大小，使其与窗口大小一致
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 设置渲染器的像素比，以适应不同设备的显示特性
        renderer.setPixelRatio(window.devicePixelRatio);
    });
};
const loadModel = () => {
    gltfLoader.load(COLLISION_SCENE_URL, gltf => {
        gltf.scene.updateMatrixWorld(true);
        scene.add(gltf.scene);
    });
};
const init = () => {
    initScene();
    // 初始化相机
    initCamera();
    // 初始化渲染器
    initRenderer();
    // 初化响应式窗口大小调整
    initResponsiveResize();
    loadModel();
    render();
};
const render = () => {
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
        // const delta_time = Math.min(0.05, clock.getDelta());

        orbitControls.update();
    });
};
onMounted(() => {
    nextTick(() => {
        init();
    });
});
</script>
<style lang="scss" scoped></style>
