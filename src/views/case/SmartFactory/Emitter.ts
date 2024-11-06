import mitt from "mitt";

class EeventBus {
	/**
 * 全局唯一的入口操作实例
 */
	private static instance: EeventBus;
	private emitter_instance: ReturnType<typeof mitt> = mitt();

	constructor() {}

	on(name: string, handler: (...args: any[]) => void) {
		this.emitter_instance.on(name, handler);
	}

	emit(name: string, ...args: any[]) {
		this.emitter_instance.emit(name, args);
	}

	off(name: string, handler?: (...args: any[]) => void) {
		this.emitter_instance.off(name, handler);
	}
	/**
	 * 实现单例模式
	 * @returns 返回 Entry 类的单例实例
	 */
	public static getInstance(): Emitter {
		// 检查是否已经存在实例，如果不存在则创建一个新的实例
		if (!EeventBus.instance) {
			EeventBus.instance = new EeventBus();
		}
		// 返回现有的或新创建的实例
		return EeventBus.instance;
	}
}
export const emitter = EeventBus.getInstance();
export type Emitter = EeventBus