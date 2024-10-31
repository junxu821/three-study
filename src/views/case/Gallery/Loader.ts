import { TextureLoader, AudioLoader, DefaultLoadingManager } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ON_LOAD_PROGRESS } from "./constant";
import { Emitter, emitter } from "./Emitter";


export default class Loader {
    gltfLoader = new GLTFLoader();;
    textureLoader = new TextureLoader();
    audioLoader = new AudioLoader();
    private emitter: Emitter = emitter
    constructor() {
        DefaultLoadingManager.onProgress = (url, loaded, total) => {
            this.emitter.emit(ON_LOAD_PROGRESS, { url, loaded, total });
        };
    }
}
