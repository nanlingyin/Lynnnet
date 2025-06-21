import { CSSProperties, DefaultOptions, DefaultStatusBarOptions } from '../types/index.js';

export type HoverActionParams = {
    content: string;
};
/**
 * 状态条
 */
export declare class StatusBar {
    private options;
    element?: HTMLElement;
    private style;
    private timer;
    private status;
    constructor(options: DefaultOptions);
    get statusBarOptions(): DefaultStatusBarOptions;
    create(): void;
    mount(): void;
    reloadStyle(): void;
    initializeStyle(): void;
    unMount(): void;
    reMounte(): void;
    /**
     * 设置样式
     * @param style
     */
    setStyle(style: CSSProperties): void;
    private slideIn;
    private slideOut;
    showLoading(): void;
    hideLoading(): void;
    setHoverEvent(events?: {
        onIn?: () => void | Promise<void>;
        onOut?: () => void | Promise<void>;
    }): void;
    setClickEvent(onClick: (() => void) | (() => Promise<void>)): void;
    clearHoverEvent(): void;
    clearClickEvent(): void;
    rest(): void;
    /**
     * 专门处理加载失败, 需要传入一个重新加载的方法
     * @param reloadFn
     */
    loadingError(reloadFn: () => void): void;
    get stateColor(): {
        info: string;
        error: string;
    };
    setColor(color: string): void;
    open(content?: string, color?: string): void;
    close(content?: string, color?: string, delay?: number): void;
    /**
     * 状态条弹出, 自动收起, delay为false时不收起
     * @param message
     * @param state
     * @param delay
     */
    popup(message?: string, delay?: number | false, color?: string): void;
    setContent(content: string): void;
}
