import { PerspectiveCamera, Scene } from "three";
import { Environment } from "./environment";
import { Loader } from "./loader";
import Css3DRenderer from "./Css3DRenderer";
interface WordParams {
    loader: Loader
    scene: Scene
    camera:PerspectiveCamera
}
export class World {
    environment: Environment
    css3DRenderer: Css3DRenderer
    constructor({
        loader,
        scene,
        camera
    }: WordParams) {
        this.environment = new Environment({
            loader,
            scene
        })
        this.css3DRenderer = new Css3DRenderer({
            camera
        })
    }
    update(delta_time: number) {
        delta_time
        this.css3DRenderer.update()

    }
}