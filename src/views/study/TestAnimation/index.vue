<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 初始化渲染器，并设置其大小与当前窗口大小一致
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 创建一个透视相机，并设置其位置和视角
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);
const orbitControls = new OrbitControls(camera, renderer.domElement);
const scene = new THREE.Scene();
// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
// 创建一个基础材质，颜色设置为绿色
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//BoxGeometry：长方体
const boxGeometry = new THREE.BoxGeometry(10, 20, 30);
const boxMesh = new THREE.Mesh(boxGeometry, material);
const sphereGeometry = new THREE.SphereGeometry(10);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
boxMesh.name = 'Box';
sphereMesh.name = 'Sphere';
const group = new THREE.Group();
group.add(boxMesh);
group.add(sphereMesh);
scene.add(group);

const times = [0, 10]; //关键帧时间数组，离散的时间点序列
const values = [0, 0, 0, 150, 0, 0]; //与时间点对应的值组成的数组
// 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
const posTrack = new THREE.KeyframeTrack('Box.position', times, values);
// 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
const colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
// 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
const scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);

// duration决定了默认的播放时间，一般取所有帧动画的最大时间
// duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
const duration = 20;
// 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
const clip = new THREE.AnimationClip('default', duration, [posTrack, colorKF, scaleTrack]);
const mixer = new THREE.AnimationMixer(group);
// 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
const AnimationAction = mixer.clipAction(clip);
// 创建一个时钟对象Clock
const clock = new THREE.Clock();
//通过操作Action设置播放方式
AnimationAction.timeScale = 20; //默认1，可以调节播放速度
// AnimationAction.loop = THREE.LoopOnce; //不循环播放
AnimationAction.play(); //开始播放
// AnimationAction.loop = THREE.LoopOnce; //不循环播放
// AnimationAction.clampWhenFinished = true; //暂停在最后一帧播放的状态
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    mixer.update(clock.getDelta());
    orbitControls.update()
});
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
