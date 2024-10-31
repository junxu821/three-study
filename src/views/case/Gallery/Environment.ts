import {
	Group,
	Material,
	Mesh, MeshBasicMaterial, Object3D,
	PlaneGeometry,
	SRGBColorSpace, Texture
} from "three";
import { BOARD_TEXTURES, BOARDS_INFO, COLLISION_SCENE_URL, ON_LOAD_MODEL_FINISH, ON_LOAD_PROGRESS, STATIC_SCENE_URL } from "./constant";
import { type Core, core } from "./Core";
import Loader from './Loader'
import { isLight, isMesh } from "./is";
import { MeshBVH, MeshBVHOptions, StaticGeometryGenerator } from "three-mesh-bvh";
import { emitter, type Emitter } from "./Emitter";
import { Reflector } from "./Reflector";
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
	private galleryBoards: Record<string, Mesh> = {};
	private textureBoards: Record<string, Texture> = {};
	/**
	 * 注册射线事件的模型
	 */
	raycastObjects: Object3D[] = [];
	collider?: Mesh;
	boundsTree?: MeshBVH
	isLoadFinished = false
	private emitter: Emitter = emitter
	constructor() {
		this.loader = this.core.loader;
		this._loadScenes()
	}
	/**
	 * 加载全部场景物体（地图、画框和贴图、地板反射）
	 */
	private async _loadScenes() {
		await this._loadSceneAndCollisionDetection();
		await this._loadStaticScene()
		await this._loadBoardsTexture()
		await this._configureGallery()
		await this._createSpecularReflection();
		this.isLoadFinished = true
		this.emitter.emit(ON_LOAD_MODEL_FINISH);
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
						this.galleryBoards[item.name] = item;
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
				this.emitter.emit(ON_LOAD_PROGRESS, { url: COLLISION_SCENE_URL, loaded: event.loaded, total: event.total });

			});
		});
	}
	/**
	 * 加载纹理
	 * @returns
	 */
	private async _loadBoardsTexture(): Promise<void> {
		for (let i = 0; i < BOARD_TEXTURES.length; i++) {
			this.textureBoards[i + 1] = await this.loader.textureLoader.loadAsync(BOARD_TEXTURES[i]);
		}

		for (const key in this.textureBoards) {
			const texture = this.textureBoards[key]
			texture.colorSpace = SRGBColorSpace;

			// 根据纹理的宽高比和平面的宽高比，计算需要的缩放比例
			const texture_aspect_ratio = texture.image.width / texture.image.height;
			let scale_x = 1;
			let scale_y = 1;

			if (texture_aspect_ratio > 1) {
				scale_x = 1 / texture_aspect_ratio;
			} else {
				scale_y = texture_aspect_ratio;
			}

			// 设置纹理的偏移和重复以进行居中和适应
			texture.offset.set(0.5 - scale_x / 2, 0.5 - scale_y / 2);
			texture.repeat.set(scale_x, scale_y);
			texture.needsUpdate = true;
		}
	}
	/*
* 设置画板userData数据、贴图翻转
* */
	private _configureGallery() {
		for (const key in this.textureBoards) {
			const board = this.galleryBoards[`gallery${key}_board`];
			const board_material = board.material;
			(board_material as MeshBasicMaterial).map = this.textureBoards[key];
			board.userData = {
				name: board.name,
				title: BOARDS_INFO[key].title,
				author: BOARDS_INFO[key].author,
				describe: BOARDS_INFO[key].describe,
				index: key,
				src: this.textureBoards[key].image.src,
				show_boards: true
			};

			// 翻转贴图
			if ([4, 5, 6, 7, 9].includes(+key)) {
				board.rotation.y = -Math.PI / 2;
			}
			if (8 === +key) {
				board.rotation.y = Math.PI;
			}

			(board_material as MeshBasicMaterial).needsUpdate = true;
		}
	}
	/*
	* 加载不含碰撞其他的场景
	* */
	private _loadStaticScene(): Promise<void> {
		return new Promise(resolve => {
			this.loader.gltfLoader.load(STATIC_SCENE_URL, (gltf) => {
				this.core.scene.add(gltf.scene);
				gltf.scene.traverse(item => {
					if (item.name === "computer") {
						item.userData = {
							name: item.name,
							title: "噢，是远方 🏕",
						};
						this.raycastObjects.push(item);
					}
				});
				resolve();
			}, (event) => {
				this.emitter.emit(ON_LOAD_PROGRESS, { url: STATIC_SCENE_URL, loaded: event.loaded, total: event.total });
			});
		});
	}
	/*
* 产生地面镜面反射
* */
	private _createSpecularReflection() {
		const mirror = new Reflector(new PlaneGeometry(100, 100), {
			textureWidth: window.innerWidth * window.devicePixelRatio,
			textureHeight: window.innerHeight * window.devicePixelRatio,
			color: 0xffffff,
		});
		if (mirror.material instanceof Material) {
			mirror.material.transparent = true;
		}
		mirror.rotation.x = -0.5 * Math.PI;
		this.core.scene.add(mirror);
	}
}