
import { Entry } from "./entry";

type Keys = "KeyW" | "KeyS" | "KeyA" | "KeyD"


type KeyStatus = {
    [key in Keys]: boolean;
};
export class Control {
    entry: Entry
    moveSpeed = 6
    keyStatus: KeyStatus = { // 存储按下的键状态
        "KeyW": false,
        "KeyS": false,
        "KeyA": false,
        "KeyD": false,
    };
    constructor() {
        this.entry = new Entry()
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
        document.addEventListener("keyup", this._handleKeyUp.bind(this));
    }
    private _handleKeyDown(event: KeyboardEvent) {
        this.keyStatus[event.code as Keys] = true;
    }

    private _handleKeyUp(event: KeyboardEvent) {
        this.keyStatus[event.code as Keys] = false;
    }

}