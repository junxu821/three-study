import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { COLLISION_SCENE_URL } from "./constant";
import { Entry } from "./entry";
import { AmbientLight, Mesh } from "three";
import { MeshBVH, MeshBVHOptions, StaticGeometryGenerator } from "three-mesh-bvh";

export class Environment {
    gltfLoader = new GLTFLoader();;
    entry!: Entry
    collider!: Mesh;
    boundsTree!: MeshBVH
    constructor() {
        this.entry = new Entry()
        this._initLight()
        this._loadModel()
    }
    /**
     * 加载模型
     */
    _loadModel() {
        this.gltfLoader.load(COLLISION_SCENE_URL, gltf => {
            gltf.scene.updateMatrixWorld(true);
            gltf.scene.receiveShadow = true
            const staticGeometryGenerator = new StaticGeometryGenerator(gltf.scene);
            staticGeometryGenerator.attributes = ["position"];

            const mergedGeometry = staticGeometryGenerator.generate();
            this.boundsTree = new MeshBVH(mergedGeometry, { lazyGeneration: false } as MeshBVHOptions);

            this.collider = new Mesh(mergedGeometry);
            this.entry.scene.add(gltf.scene);
        });
    };
    _initLight() {
        const ambientLight = new AmbientLight(0xffffff, 2); // 白光，强度为1
        this.entry.scene.add(ambientLight);

    }

}