
import { Object3D } from "three";
import Character from "./Character";
import { ON_CLICK_RAY_CAST, ON_HIDE_TOOLTIP, ON_LOAD_MODEL_FINISH, ON_LOAD_PROGRESS, ON_SHOW_TOOLTIP } from "./constant";
import { type Core, core } from "./Core"
import Css3DRenderer from "./Css3DRenderer";
import { emitter, Emitter } from "./Emitter";
import Environment from "./Environment";
import RayCasterControls from "./RayCasterControls";
import AudioPlayer from "./AudioPlayer";


export default class World {
    core: Core = core
    character: Character;
    private emitter: Emitter = emitter
    environment: Environment = new Environment()
    private css3DRenderer: Css3DRenderer;
    private rayCasterControls: RayCasterControls;
    audio: AudioPlayer;
    constructor() {
        this.emitter.on(ON_LOAD_PROGRESS, this._handleLoadProgress.bind(this));
        this.emitter.on(ON_LOAD_MODEL_FINISH, this._onLoadModelFinish.bind(this));
        this.emitter.on(ON_CLICK_RAY_CAST, this._onClickRayCast.bind(this));
        this.emitter.on(ON_SHOW_TOOLTIP, this._onShowTooltip.bind(this));
        this.emitter.on(ON_HIDE_TOOLTIP, this._onHideTooltip.bind(this));
        this.environment = new Environment();
        this.css3DRenderer = new Css3DRenderer();
        this.character = new Character({ speed: 12 });
        this.rayCasterControls = new RayCasterControls();
        this.audio = new AudioPlayer();
    }
    update(delta: number) {
        if (this.environment.collider && this.environment.isLoadFinished) {
            this.css3DRenderer.update();
            this.character.update(delta, this.environment.collider, this.environment.boundsTree);
            this.rayCasterControls.updateTooltipRayCast(this.environment.raycastObjects);
        }
    }
    /*
    * 点击进入展馆后的回调
    * */
    private _onEnterApp() {
        this.audio.playAudio();
        // 进入后才允许控制键盘
        this.core.controlManage.enabled();
    }
    private async _onLoadModelFinish() {
        // 音频加载完毕后移除加载进度UI，显示进入确认UI
        await this.audio.createAudio();
        // 场景模型加载完毕后开始加载音频
        this.core.ui.removeLoading();
        this.core.ui.showLoadingConfirm();
        // 场景模型加载完毕后将场景中需要光线投射检测的物体传入给rayCasterControls
        this.rayCasterControls.bindClickRayCastObj(this.environment.raycastObjects);
        this._onEnterApp()
    }

    private _onShowTooltip([{ msg, show_preview_tips }]: [{ msg: string, show_preview_tips: boolean }]) {
        this.core.ui.showPreviewTooltip(msg, show_preview_tips);
    }

    private _onHideTooltip() {
        this.core.ui.hidePreviewTooltip();
    }
    private _handleLoadProgress([{ url, loaded, total }]: [{ url: string, loaded: number, total: number }]) {
        const percentage = ((loaded / total) * 100).toFixed(2);
        if (/.*\.(blob|glb)$/i.test(url)) {
            this.core.ui.updateLoadingProgress(`${url.includes("collision") ? "加载碰撞场景模型" : "加载其他场景模型"}：${percentage}%`);
        }
        if (/.*\.(jpg|png|jpeg)$/i.test(url)) {
            this.core.ui.updateLoadingProgress("加载图片素材中...");
        }
        if (/.*\.(m4a|mp3)$/i.test(url)) {
            this.core.ui.updateLoadingProgress("加载声音资源中...");
        }
    }
    private _onClickRayCast([object]: [object: Object3D]) {
        this.core.ui.showBoardsBox(
            object.userData.title,
            object.userData.author,
            object.userData.describe,
            object.userData.src,
        );
    }
}