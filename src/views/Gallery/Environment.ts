import { Group, Mesh, Object3D } from "three";
import { COLLISION_SCENE_URL } from "./constant";
import { type Core, core } from "./Core";
import Loader from './Loader'
import { isLight, isMesh } from "./is";
import { MeshBVH, MeshBVHOptions, StaticGeometryGenerator } from "three-mesh-bvh";
export default class Environment {
	private core: Core = core;
	/**
	 * 模型加载器
	 */
	private loader: Loader;
	/**
	 * 碰撞检测场景
	 */
	private collisionScene?: Group;
	/**
	 * 相框map
	 */
	private photoFrameMap: Record<string, Mesh> = {};
	/**
	 * 注册射线事件的模型
	 */
	raycastObjects: Object3D[] = [];
	collider?: Mesh;
	boundsTree?: MeshBVH
	isLoadFinished = false
	constructor() {
		this.loader = new Loader();
		this._loadScenes()
	}
	/**
	 * 加载全部场景物体（地图、画框和贴图、地板反射）
	 */
	private async _loadScenes() {
		await this._loadSceneAndCollisionDetection();
		this.isLoadFinished = true
	}
	/*
	* 加载含碰撞检测的场景
	* */
	private _loadSceneAndCollisionDetection(): Promise<void> {
		return new Promise(resolve => {
			this.loader.gltfLoader.load(COLLISION_SCENE_URL, (gltf) => {
				this.collisionScene = gltf.scene;

				this.collisionScene.updateMatrixWorld(true);

				this.collisionScene.traverse(item => {
					if (item.name === "home001" || item.name === "PointLight") {
						item.castShadow = true;
					}

					if (item.name.includes("PointLight") && isLight(item)) {
						item.intensity *= 2000;
					}

					if (item.name === "home002") {
						item.castShadow = true;
						item.receiveShadow = true;
					}

					// 提取出相框元素
					if (/gallery.*_board/.test(item.name) && isMesh(item)) {
						this.photoFrameMap[item.name] = item;
					}

					this.raycastObjects.push(item);
				});

				const staticGeometryGenerator = new StaticGeometryGenerator(this.collisionScene);
				staticGeometryGenerator.attributes = ["position"];

				const mergedGeometry = staticGeometryGenerator.generate();
				this.boundsTree = new MeshBVH(mergedGeometry, { lazyGeneration: false } as MeshBVHOptions);

				this.collider = new Mesh(mergedGeometry);
				this.core.scene.add(this.collisionScene);

				resolve();
			}, (event) => {
				console.log(event);

			});
		});
	}
}