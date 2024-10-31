import { DoubleSide, Mesh, MeshStandardMaterial, NoBlending, PlaneGeometry, Scene } from "three";
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { IFRAME_SRC } from "./constant";
import { Entry } from "./entry";

export default class Css3DRenderer {
    private entry:Entry
    private cssScene: Scene;
    private cssRenderer: CSS3DRenderer;

    constructor() {
        this.cssScene = new Scene();
        this.cssRenderer = new CSS3DRenderer();
        this.entry = new Entry()

        this._initRenderer();
        this._initResponsiveResize();
        this._createCssObj();
    }

    update() {
        this.cssRenderer.render(this.cssScene, this.entry.camera);
    }

    private _initRenderer() {
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        this.cssRenderer.domElement.style.position = "absolute";
        this.cssRenderer.domElement.style.top = "0px";
        document.querySelector("#css")?.appendChild(this.cssRenderer.domElement);
    }

    private _initResponsiveResize() {
        window.addEventListener("resize", () => {
            this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    /**
     * Creates a CSS object and adds it to the CSS3D scene.
     *
     * This method creates a GL plane and a CSS plane (iframe), and adds them to their respective scenes.
     * The GL plane is used for positioning and does not render, while the CSS plane displays actual content.
     * This is done to leverage the 3D rendering capabilities of Three.js and the flexibility of CSS for rich interactive content.
     */
    private _createCssObj() {
        // Create GL plane
        const material = new MeshStandardMaterial({ color: 0x000000 });
        material.side = DoubleSide;
        material.transparent = true;
        material.opacity = 0;
        // NoBlending混合模式允许GL平面遮挡CSS平面
        material.blending = NoBlending;
        const geometry = new PlaneGeometry(1.5, 1.3);
        const mesh = new Mesh(geometry, material);
        mesh.position.set(4, 3, -8.01);
        mesh.rotation.set(0,0, 0);
        this.entry.scene.add(mesh);

        // Create iframe element
        const iframe = document.createElement("iframe");
        iframe.src = IFRAME_SRC;
        iframe.style.width = "1200px";
        iframe.style.height = "900px";
        iframe.style.boxSizing = "border-box";
        iframe.style.opacity = "1";
        // Create CSS3D object and add it to the CSS3D scene
        const object = new CSS3DObject(iframe);
        object.position.copy(mesh.position);
        object.rotation.copy(mesh.rotation);
        object.scale.set(0.002, 0.002, 0.002);
        this.cssScene.add(object);
    }
}
