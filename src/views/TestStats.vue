<template>
 <div class="container" ref="containerRef"></div>
</template>
<script lang="ts" setup>
// 导入Three.js库
import * as THREE from 'three';
//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';
// 定义一个引用，用于后续引用包含渲染器的DOM元素
const containerRef = ref<HTMLDivElement>();

// 创建一个场景，场景是用来放置所有对象的地方
const scene = new THREE.Scene();

// 创建一个透视相机，相机用于从特定视角观察场景
// 参数分别是视野角度、宽高比、近裁剪面、远裁剪面
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建一个WebGL渲染器，用于将场景渲染到屏幕上
const renderer = new THREE.WebGLRenderer();

//创建stats对象
const stats = new Stats();
//stats.domElement:web页面上输出计算结果,一个div元素，
// 渲染函数
function render() {
	//requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
	stats.update();
	renderer.render(scene, camera); //执行渲染操作
	requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();
onMounted(()=>{
  containerRef.value?.appendChild(stats.dom);

})
</script>
<style lang="scss" scoped>
</style>