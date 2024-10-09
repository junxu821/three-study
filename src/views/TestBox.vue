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
scene.background = new THREE.Color('#ffffff')
const geometry = new THREE.BoxGeometry(100, 100, 100);
//材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff, //设置材质颜色
    transparent: true, //开启透明
    opacity: 0.5 //设置透明度
});
for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // 沿着x轴分布
    mesh.position.set(i * 200, 0, 0);
    scene.add(mesh); //网格模型添加到场景中
}
renderer.render(scene, camera);
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
