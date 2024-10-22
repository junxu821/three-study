import { TextureLoader, AudioLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";


export default class Loader {
    gltfLoader = new GLTFLoader();;
    textureLoader = new TextureLoader();
    audioLoader = new AudioLoader();
}
