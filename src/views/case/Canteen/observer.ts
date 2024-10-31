import { Mesh, MeshBasicMaterial, Vector3 } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Entry } from "./entry";

type CharacterParams = {
    reset_position?: Vector3,
    reset_y?: number,
    speed?: number,
    jump_height?: number,
    gravity?: number
}

export default class Observer {
    private entry: Entry;
    private observer!: Mesh<RoundedBoxGeometry, MeshBasicMaterial>;

    private reset_position: Vector3; // 重生点
    private speed: number; // 速度
    private velocity = new Vector3();

    private up_vector = new Vector3(0, 1, 0);
    private temp_vector = new Vector3();

    constructor({
        reset_position = new Vector3(0, 2, 0),
        speed = 6,
    }: CharacterParams) {
        this.entry = new Entry()
        this.reset_position = reset_position;
        this.speed = speed;

        this._createCharacter();
    }

    update(delta_time: number) {
        // this._updateOrbitControls();
        this._updateCharacter(delta_time);
        // this._checkCollision(delta_time, collider,boundsTree);
        // 调整相机视角
        this.entry.camera.position.sub(this.entry.orbitControls.target);
        this.entry.orbitControls.target.copy(this.observer.position);
        this.entry.camera.position.add(this.observer.position);
    }

    private _createCharacter() {
        this.observer = new Mesh(
            new RoundedBoxGeometry(0.5, 2.5, 0.5, 10, 1),
            new MeshBasicMaterial({ color: 0x0000ff })
        );
        this.observer.geometry.translate(0, -0.25, 0);
        this.observer.position.copy(this.reset_position);
        this.observer.visible = false;
        this.entry.scene.add(this.observer);
    }


    private _updateCharacter(delta_time: number) {
        this.observer.position.addScaledVector(this.velocity, delta_time);
        const angle = this.entry.orbitControls.getAzimuthalAngle();
        if (this.entry.control.keyStatus["KeyW"]) {
            this.temp_vector.set(0, 0, -1).applyAxisAngle(this.up_vector, angle);
            this.observer.position.addScaledVector(this.temp_vector, this.speed * delta_time);
        }

        if (this.entry.control.keyStatus["KeyS"]) {
            this.temp_vector.set(0, 0, 1).applyAxisAngle(this.up_vector, angle);
            this.observer.position.addScaledVector(this.temp_vector, this.speed * delta_time);
        }

        if (this.entry.control.keyStatus["KeyA"]) {
            this.temp_vector.set(-1, 0, 0).applyAxisAngle(this.up_vector, angle);
            this.observer.position.addScaledVector(this.temp_vector, this.speed * delta_time);
        }

        if (this.entry.control.keyStatus["KeyD"]) {
            this.temp_vector.set(1, 0, 0).applyAxisAngle(this.up_vector, angle);
            this.observer.position.addScaledVector(this.temp_vector, this.speed * delta_time);
        }
        this.observer.updateMatrixWorld();
    }
}
