import { Control } from "./control";
import Css3DRenderer from "./Css3DRenderer";
import { Environment } from "./environment";
import Observer from "./observer";

export class World {
    environment!: Environment
    css3DRenderer!: Css3DRenderer
    control!: Control
    observer!: Observer
    constructor() {
        this.environment = new Environment()
        this.css3DRenderer = new Css3DRenderer();
        this.observer = new Observer({ speed: 6 })
    }
    update(delta_time: number) {
        this.css3DRenderer.update();
        this.observer.update(delta_time, this.environment.collider, this.environment.boundsTree)

    }
}