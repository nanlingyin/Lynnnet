import { DefaultOptions } from '../types/index.js';

export declare class GlobalStyle {
    private options;
    styleSheet?: HTMLElement;
    constructor(options: DefaultOptions);
    /**
     * 创建
     */
    create(): void;
    /**
     * 挂载
     */
    mount(): void;
    initialize(): void;
    initializeStyle(): void;
    reloadStyleSheet(): void;
}
