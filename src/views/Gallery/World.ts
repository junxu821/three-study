
import { type Core, core } from "./Core"
import Css3DRenderer from "./Css3DRenderer";
import Environment from "./Environment";


export default class World {
    core: Core = core
    environment: Environment = new Environment()
    private css3DRenderer: Css3DRenderer;
    constructor() {
        this.environment = new Environment();
        this.css3DRenderer = new Css3DRenderer();
    }
    update(delta: number) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        delta
        //console.log(delta)
        if (this.environment.collider && this.environment.isLoadFinished) {
            this.css3DRenderer.update();

        }
    }

}