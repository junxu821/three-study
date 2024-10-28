import { Box3, Line3, Matrix4, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Entry } from "./entry";
import { MeshBVH } from "three-mesh-bvh";

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
    private character!: Mesh<RoundedBoxGeometry, MeshBasicMaterial>;
    private capsule_info = { // 胶囊体数据
        radius: 1,
        segment: new Line3(
            new Vector3(),
            new Vector3(0, -5, 0.0)
        )
    };

    private reset_position: Vector3; // 重生点
    private speed: number; // 速度
    private player_is_on_ground = false; // 是否在地面
    private velocity = new Vector3();

    private up_vector = new Vector3(0, 1, 0);
    private temp_vector = new Vector3();
    private temp_vector2 = new Vector3();
    private temp_box = new Box3();
    private temp_mat = new Matrix4();
    private temp_segment = new Line3();

    constructor({
        reset_position = new Vector3(0, 2, 0),
        speed = 6,
    }: CharacterParams) {
        this.entry = new Entry()
        this.reset_position = reset_position;
        this.speed = speed;

        this._createCharacter();
    }

    update(delta_time: number,collider: Mesh,boundsTree?:MeshBVH) {
        this._updateOrbitControls();
        this._updateCharacter(delta_time);
        this._checkCollision(delta_time, collider,boundsTree);
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

    private _updateOrbitControls() {
        this.entry.orbitControls.maxPolarAngle = Math.PI;
        this.entry.orbitControls.minDistance = 1e-4;
        this.entry.orbitControls.maxDistance = 1e-4;
    }



    private _checkCollision(delta_time: number, collider: Mesh, boundsTree?: MeshBVH) {
        // 根据碰撞来调整player位置
        const capsule_info = this.capsule_info;
        this.temp_box.makeEmpty();
        this.temp_mat.copy(collider.matrixWorld).invert();
        this.temp_segment.copy(capsule_info.segment);

        // 获取胶囊体在对撞机局部空间中的位置
        this.temp_segment.start.applyMatrix4(this.character.matrixWorld).applyMatrix4(this.temp_mat);
        this.temp_segment.end.applyMatrix4(this.character.matrixWorld).applyMatrix4(this.temp_mat);

        // 获取胶囊体的轴对齐边界框
        this.temp_box.expandByPoint(this.temp_segment.start);
        this.temp_box.expandByPoint(this.temp_segment.end);

        this.temp_box.min.addScalar(-capsule_info.radius);
        this.temp_box.max.addScalar(capsule_info.radius);

        boundsTree?.shapecast({
            intersectsBounds: box => box.intersectsBox(this.temp_box),
            intersectsTriangle: tri => {
                // 检查场景是否与胶囊相交，并调整
                const tri_point = this.temp_vector;
                const capsule_point = this.temp_vector2;

                const distance = tri.closestPointToSegment(this.temp_segment, tri_point, capsule_point);
                if (distance < capsule_info.radius) {
                    const depth = capsule_info.radius - distance;
                    const direction = capsule_point.sub(tri_point).normalize();

                    this.temp_segment.start.addScaledVector(direction, depth);
                    this.temp_segment.end.addScaledVector(direction, depth);
                }
            }
        });

        // 检查后得到胶囊体对撞机的调整位置
        // 场景碰撞并移动它. capsule_info.segment.start被假定为玩家模型的原点。
        const new_position = this.temp_vector;
        new_position.copy(this.temp_segment.start).applyMatrix4(collider.matrixWorld);

        // 检查对撞机移动了多少
        const delta_vector = this.temp_vector2;
        delta_vector.subVectors(new_position, this.character.position);

        this.player_is_on_ground = delta_vector.y > Math.abs(delta_time * this.velocity.y * 0.25);

        const offset = Math.max(0.0, delta_vector.length() - 1e-5);
        delta_vector.normalize().multiplyScalar(offset);

        // 调整player模型位置
        this.character.position.add(delta_vector);

        if (!this.player_is_on_ground) {
            delta_vector.normalize();
            this.velocity.addScaledVector(delta_vector, -delta_vector.dot(this.velocity));
        } else {
            this.velocity.set(0, 0, 0);
        }
    }
}
