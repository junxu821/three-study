<template>
    <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GROUND_IMG, RAIN_IMG } from './constant.ts';
// 导入Three.js库
import * as THREE from 'three';
import { AmbientLight } from 'three';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();
// 初始化渲染器，并设置其大小与当前窗口大小一致
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建一个透视相机，并设置其位置和视角
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 800);
camera.position.set(292, 109, 268); //设置相机位置
camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();
const orbitControls = new OrbitControls(camera, renderer.domElement);
// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
/**
 * 精灵创建下雨效果
 */
// 加载雨滴理贴图
const textureLoader = new THREE.TextureLoader();
const textureTree = textureLoader.load(RAIN_IMG);
const gassImg = textureLoader.load(GROUND_IMG)
gassImg.wrapS = gassImg.wrapT = THREE.RepeatWrapping;
gassImg.repeat.set(10,10)
//material.map.repeat.set(repeatX,repeatY);repeatX：指定在x轴方向多久重复一次。repeatY：指定在y轴方向多久重复一次。
//如果设置为1，都不会重复。 如果设置<1，纹理就会被放大。 如果设置为负数，就会产生纹理镜像。
const gassMaterial = new THREE.MeshPhongMaterial({
    map: gassImg,
    side: THREE.BackSide //两面可见
});

const geometry = new THREE.PlaneGeometry(500, 500);

const gassMesh = new THREE.Mesh(geometry, gassMaterial);

gassMesh.rotation.set(Math.PI / 2, 0, 0);
scene.add(gassMesh);

const group = new THREE.Group();
// 批量创建表示雨滴的精灵模型
for (let i = 0; i < 1000; i++) {
    const spriteMaterial = new THREE.SpriteMaterial({
        map: textureTree //设置精灵纹理贴图
    });
    // 创建精灵模型对象
    const sprite = new THREE.Sprite(spriteMaterial);
    group.add(sprite);
    // 控制精灵大小,
    sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
    const k1 = Math.random() - 0.5;
    const k2 = Math.random() - 0.5;
    // 设置精灵模型位置，在空间中随机分布
    sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2);
}
scene.add(group);
const ambientLight = new AmbientLight(0xffffff, 2); // 白光，强度为1
scene.add(ambientLight);
renderer.setAnimationLoop(() => {
    group.children.forEach(sprite => {
        // 雨滴的y坐标每次减1
        sprite.position.y -= 1;
        if (sprite.position.y < 0) {
            // 如果雨滴落到地面，重置y，从新下落
            sprite.position.y = 200;
        }
    });
    renderer.render(scene, camera);
    orbitControls.update();
});
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
onMounted(() => {
    containerRef.value?.appendChild(renderer.domElement);
});
</script>
<style lang="scss" scoped></style>
