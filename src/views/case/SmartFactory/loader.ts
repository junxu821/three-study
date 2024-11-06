import { AudioLoader, DefaultLoadingManager, TextureLoader } from "three";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { emitter } from "./Emitter";
import { ON_LOAD_PROGRESS } from "./constant";

export class Loader {
    readonly gltfLoader = new GLTFLoader();;
    readonly textureLoader = new TextureLoader();
    readonly audioLoader = new AudioLoader();
    readonly dracoLoader= new DRACOLoader();
    constructor() {
        DefaultLoadingManager.onProgress = (url, loaded, total) => {
            emitter.emit(ON_LOAD_PROGRESS, { url, loaded, total });
        };
    }
}