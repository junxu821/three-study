import { AmbientLight, HemisphereLight, Scene } from "three";
import { SMART_FACTORY_URL } from "./constant";
import { Loader } from "./loader";
import { DRACOLoader } from "three/examples/jsm/Addons.js";

interface EnvironmentParams {
    loader: Loader
    scene: Scene
}
export class Environment {
    private loader: Loader
    private scene: Scene

    constructor({
        loader,
        scene
    }: EnvironmentParams) {
        this.loader = loader
        this.scene = scene
        this._initLight()
        this._loadFactoryModel()
    }
    /**
     * 加载工厂模型
     */
    private _loadFactoryModel() {
        const dracoLoader = new DRACOLoader();
        this.loader.gltfLoader.setDRACOLoader(dracoLoader)
        this.loader.gltfLoader.load(SMART_FACTORY_URL, (gltf) => {
            gltf.scene.updateMatrixWorld(true);
            gltf.scene.traverse(function (obj) {
                if (obj) { //判断是否是网格模型
                    // 批量设置所有Mesh都可以产生阴影和接收阴影
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                }
            });
            this.scene.add(gltf.scene)
        })
    }
    private _initLight() {
        const ambientLight = new AmbientLight(0xffffff, 1); // 白光，强度为1
        this.scene.add(ambientLight);
        const fill_light = new HemisphereLight(0xffffff, 0xe49959, 2);
        fill_light.position.set(2, 1, 1);
        this.scene.add(fill_light);

    }
}