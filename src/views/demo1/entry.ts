import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SKY_BG } from "./constant";
import { ACESFilmicToneMapping, AxesHelper, Clock, CubeTextureLoader, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { World } from "./world";
import { Control } from "./control";
let instance: Entry
export class Entry {
    // 初始化渲染器，并设置其大小与当前窗口大小一致
    renderer = new WebGLRenderer({ antialias: true });
    // 创建一个透视相机，并设置其位置和视角
    camera = new PerspectiveCamera();
    scene = new Scene();
    world!: World
    /**
   * 声明一个轨道控制对象，用于鼠标或触摸事件来改变相机的位置和方向
   */
    orbitControls!: OrbitControls;
    control!:Control
    clock = new Clock();
    constructor() {
        if (instance) return instance
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.addEventListener('change', () => {


        })
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        instance = this

    }
    private _init() {
        this._initScene()
        this._initCamera()
        this._initResponsiveResize()
        this._initRenderer()
        this.world = new World()
        this.control = new Control()
    }
    start() {
        this._init()
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
            const delta_time = Math.min(0.05, this.clock.getDelta());
            this.world.update(delta_time)
            this.orbitControls.update();
        });
    }
    /**
     * 初始化场景设置
     */
    private _initScene() {
        // AxesHelper：辅助观察的坐标系
        const axesHelper = new AxesHelper(150);
        this.scene.add(axesHelper);
        // 设置场景的背景颜色为黑色
        this.scene.background = new CubeTextureLoader().load(SKY_BG);
    };
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
        // camera.position.set(0, 0, 3);
        this.camera.position.set(-21, 25, 47);
        // 更新投影矩阵，以应用上述对相机属性的更改
        this.camera.updateProjectionMatrix();
    };
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
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.zIndex = '1';
        this.renderer.domElement.style.top = '0px';
        document.getElementById('container')?.appendChild(this.renderer.domElement);
    };
    /**
 * 响应式重新渲染
 */
    private _initResponsiveResize() {
        // 监听窗口大小变化事件，当窗口大小改变时更新渲染
        window.addEventListener('resize', () => {
            // 更新相机的宽高比，以适应窗口大小的变化
            this.camera.aspect = window.innerWidth / window.innerHeight;
            // 更新相机的投影矩阵，确保渲染正确
            this.camera.updateProjectionMatrix();
            // 调整渲染器的大小，使其与窗口大小一致
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            // 设置渲染器的像素比，以适应不同设备的显示特性
            this.renderer.setPixelRatio(window.devicePixelRatio);
        });
    };
}
