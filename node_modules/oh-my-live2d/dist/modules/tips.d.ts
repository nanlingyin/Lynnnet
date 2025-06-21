import { OhMyLive2D } from './oml2d.js';
import { IdleTimer } from '../types/common.js';
import { CSSProperties, DefaultOptions } from '../types/index.js';

export declare class Tips {
    private options;
    private oml2d;
    idlePlayer?: IdleTimer;
    private element?;
    private contentElement?;
    private closeTimer;
    private transitionTime;
    private style;
    private priority;
    private contentStyle;
    private _tipsOptions;
    constructor(options: DefaultOptions, oml2d: OhMyLive2D);
    reload(stageElement: HTMLElement): void;
    private get tipsOptions();
    private set tipsOptions(value);
    create(): void;
    mount(stageElement: HTMLElement): void;
    unmount(): void;
    get primaryColor(): string;
    reloadStyle(): void;
    /**
     * 设置提示框样式
     * @param style
     */
    setStyle(style?: CSSProperties): void;
    setContentStyle(style: CSSProperties): void;
    private setContent;
    showMessage(message: string, duration?: number, priority?: number): void;
    /**
     * 清除提示框所有状态
     */
    clear(): void;
    /**
     * 公开暴露的通知方法, 所有地方可调用, 调用时会先暂停闲置消息的循环播放
     */
    notification(message: string, duration?: number, priority?: number): void;
    /**
     * 欢迎提示
     */
    welcome(): void;
    /**
     * 复制时提示
     */
    copy(): void;
    /**
     * 创建闲置消息播放器
     * @returns
     */
    private createIdleMessagePlayer;
}
