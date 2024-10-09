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

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 8000);
// 超出视锥体远裁界面的范围的会被剪裁掉，不渲染  可以调整far参数适配
camera.position.set(2000, 2000, 2000);
camera.lookAt(0, 0, 0);

// 创建一个场景对象
const scene = new THREE.Scene();
// 创建一个基础材质，颜色设置为绿色
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
//BoxGeometry：长方体
const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const boxMesh = new THREE.Mesh(boxGeometry, material);

// SphereGeometry：球体
const sphereGeometry = new THREE.SphereGeometry(50);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.set(0, 0, 0);
// CylinderGeometry：圆柱
const cylinderGeometry = new THREE.CylinderGeometry(50, 50, 100);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
cylinderMesh.position.set(200, 0, 0);
// PlaneGeometry：矩形平面
const planeGeometry = new THREE.PlaneGeometry(100, 50);
const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.position.set(400, 0, 0);
// CircleGeometry：圆形平面
const circleGeometry = new THREE.CircleGeometry(50);
const circleMesh = new THREE.Mesh(circleGeometry, material);
circleMesh.position.set(600, 0, 0);
const group = new THREE.Group();
group.add(boxMesh);
group.add(sphereMesh);
group.add(cylinderMesh);
group.add(planeMesh);
group.add(circleMesh);
scene.add(group)
renderer.render(scene, camera);

/**
 * 动画函数，用于不断更新立方体的旋转并渲染场景
 */
function animate() {
    // 使用requestAnimationFrame递归调用动画函数，实现持续动画效果
    requestAnimationFrame(animate);
    // // 每帧更新立方体的旋转角度
    // group.rotation.x += 0.01;
    // group.rotation.y += 0.01;
    group.rotateY(Math.PI/6)
    renderer.render(scene, camera);
}
animate(); // 开始动画
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
