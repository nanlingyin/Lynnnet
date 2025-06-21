import { Events } from './events.js';
import { CommonStyleType } from '../types/common.js';
import { CSSProperties, DefaultOptions } from '../types/index.js';

export declare class Stage {
    private options;
    private events;
    element?: HTMLElement;
    canvasElement?: HTMLCanvasElement;
    status: boolean;
    private style;
    private canvasStyle;
    private currentModelIndex;
    constructor(options: DefaultOptions, events: Events);
    create(): void;
    set modelIndex(index: number);
    get modelIndex(): number;
    mount(): void;
    reloadStyle(style?: CommonStyleType): void;
    unMount(): void;
    reMount(): void;
    setStyle(style: CSSProperties, callback?: () => void): void;
    setCanvasStyle(style: CSSProperties): void;
    get transitionTime(): number;
    /**
     * 滑入
     */
    slideIn(): Promise<void>;
    /**
     * 滑出
     */
    slideOut(): Promise<void>;
}
