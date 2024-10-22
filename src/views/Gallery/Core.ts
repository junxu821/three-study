import { ACESFilmicToneMapping, Clock, Color, Loader, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import World from "./World";
import ControlManage from "./ControlManage";
import UI from "./UI";

/**
 * 入口类
 */
class Entry {
	/**
	 * 全局唯一的入口操作实例
	 */
	private static instance: Entry;
	/**
	 * 场景实例
	 */
	scene = new Scene();
	/**
	 *渲染器抗锯齿
	 */
	renderer = new WebGLRenderer({ antialias: true });
	/**
	 * 初始化一个透视相机对象，用于后续的3D场景渲染
	 */
	camera = new PerspectiveCamera();

	/**
	 * 初始化一个时钟对象，用于跟踪时间差，常用于动画和物理模拟中
	 */
	clock = new Clock();

	/**
	 * 声明一个轨道控制对象，用于鼠标或触摸事件来改变相机的位置和方向
	 */
	orbit_controls!: OrbitControls;
	/**
	 * world做全局交互的调度
	 */
	world!: World;
	control_manage!: ControlManage;
	loader!: Loader;
	ui!: UI
	constructor() { }
	/**
	 * 实现单例模式
	 * @returns 返回 Entry 类的单例实例
	 */
	public static getInstance(): Entry {
		// 检查是否已经存在实例，如果不存在则创建一个新的实例
		if (!Entry.instance) {
			Entry.instance = new Entry();
		}
		// 返回现有的或新创建的实例
		return Entry.instance;
	}
	/**
	 * 初始化并渲染
	 * 此方法负责调用初始化方法和渲染方法，以完成对象的初始化和渲染过程
	 */
	render() {
		this._init()
		this._render()
	}
	/**
	 * 初始化参数
	 */
	private _init() {
		// 初始化轨道控制器，用于控制相机的旋转、缩放等操作
		this.orbit_controls = new OrbitControls(this.camera, this.renderer.domElement);
		// 初始化场景
		this._initScene();
		// 初始化相机
		this._initCamera();
		// 初始化渲染器
		this._initRenderer();
		// 初始化响应式窗口大小调整
		this._initResponsiveResize();
		// 初始化用户界面
		this.ui = new UI();
		// 初始化控制管理器
		this.control_manage = new ControlManage();
		// 初始化加载器
		this.loader = new Loader();
		// 初始化世界
		this.world = new World();
	}
	/**
	 * 循环渲染
	 * 此方法负责设置渲染器的动画循环，通过不断地渲染场景和摄像机视图来创建动画效果
	 * 它还负责更新物理世界的状态和轨道控件，以确保动画的实时性和交互性
	 */
	private _render() {
		this.renderer.setAnimationLoop(() => {
			this.renderer.render(this.scene, this.camera);
			const delta_time = Math.min(0.05, this.clock.getDelta());
			this.world.update(delta_time);
			this.orbit_controls.update();
		});
	}
	/**
	 * 初始化场景设置
	 */
	private _initScene() {
		// 设置场景的背景颜色为黑色
		// this.scene.background = new Color(0x000000);
		this.scene.background = new Color(0xffffff);
	}
	/**
	 * 初始化相机参数
	 */
	private _initCamera() {
		// 相机视角参数
		this.camera.fov = 55;
		// 场景宽高比
		this.camera.aspect = window.innerWidth / window.innerHeight;
		// 设置相机的近平面距离，防止渲染时出现裁剪现象
		this.camera.near = 0.1;
		// 设置相机的远平面距离，确保能正确渲染远距离的物体
		this.camera.far = 1000;
		// 调整相机在世界坐标系中的位置，以获得所需的观察视角
		this.camera.position.set(0, 0, 3);
		// 更新投影矩阵，以应用上述对相机属性的更改
		this.camera.updateProjectionMatrix();
	}
	/**
	 * 挂载到容器上
	 */
	private _initRenderer() {
		// 启用阴影映射以增强场景的视觉效果
		this.renderer.shadowMap.enabled = true;
		// 设置输出颜色空间为sRGB，以保证颜色的准确性
		this.renderer.outputColorSpace = SRGBColorSpace;
		// 使用ACES Filmic色调映射来改善渲染输出的视觉效果
		this.renderer.toneMapping = ACESFilmicToneMapping;
		// 设置渲染器的尺寸以匹配窗口大小
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// 设置渲染器DOM元素的样式以便正确显示
		this.renderer.domElement.style.position = "absolute";
		this.renderer.domElement.style.zIndex = "1";
		this.renderer.domElement.style.top = "0px";
		// 将渲染器的DOM元素添加到页面上的指定容器中
		document.querySelector(".gallery")?.appendChild(this.renderer.domElement);
	}
	/**
	 * 响应式重新渲染
	 */
	private _initResponsiveResize() {
		// 监听窗口大小变化事件，当窗口大小改变时更新渲染
		window.addEventListener("resize", () => {
			// 更新相机的宽高比，以适应窗口大小的变化
			this.camera.aspect = window.innerWidth / window.innerHeight;
			// 更新相机的投影矩阵，确保渲染正确
			this.camera.updateProjectionMatrix();
			// 调整渲染器的大小，使其与窗口大小一致
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			// 设置渲染器的像素比，以适应不同设备的显示特性
			this.renderer.setPixelRatio(window.devicePixelRatio);
		});
	}
}
export const core = Entry.getInstance();
export type Core = Entry
