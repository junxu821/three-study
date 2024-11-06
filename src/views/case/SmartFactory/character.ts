import { Group, Tween } from "@tweenjs/tween.js"
import { Camera } from "three"

interface CharacterParams {
    camera: Camera
}
export class Character {
    camera: Camera
    group = new Group()
    tween: Tween
    constructor({
        camera
    }: CharacterParams) {
        this.camera = camera
        this.tween = new Tween(this.camera.position)
            .to({ x: 5, y: 1, z: 5 }, 1000)
        this.group.add(this.tween)
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            console.log(e.code);
            if (e.code === 'KeyD') {
                this.tween.start()
            }
            // else {
            //     this.group.remove(this.tween)
            // }


        });
    }
    update() {
        this.group.update();
    }
}