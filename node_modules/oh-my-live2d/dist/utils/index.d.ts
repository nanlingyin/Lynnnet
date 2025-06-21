import { WindowSizeType } from '../constants/index.js';
import { CommonStyleType, WordTheDayData } from '../types/common.js';
import { CSSProperties, DefaultOptions, ElementConfig, Options } from '../types/index.js';

export * from './tips.js';
/**
 * 打印项目信息
 */
export declare const printProjectInfo: () => void;
export declare const handleCommonStyle: (value: CommonStyleType) => CSSProperties;
/**
 * 根据元素设置内联样式
 *
 * @param style
 * @param el
 */
export declare const setStyleForElement: (style: CSSProperties, el: HTMLElement) => void;
export declare const sleep: (time: number) => Promise<void>;
export declare const createElement: (elConfig: ElementConfig) => HTMLElement;
/**
 * 加载脚本
 * @param sdkInfo
 * @returns
 */
export declare const loadScript: (sdkInfo: {
    url: string;
    id: string;
}) => Promise<void>;
export declare const checkVersion: () => Promise<void>;
export declare const getWordTheDay: (format?: ((wordTheDayData: WordTheDayData) => string) | undefined) => Promise<string>;
export declare const mediaQuery: MediaQueryList;
export declare const getWindowSizeType: () => WindowSizeType;
export declare const onChangeWindowSize: (fn: (windowSizeType: WindowSizeType) => void) => void;
export declare const destroyElement: (id: string) => void;
export declare const mergeOptions: (defaultOptions: DefaultOptions, options: Options) => DefaultOptions;
export declare const handleDockedPosition: (position: 'left' | 'right', value?: number, reverse?: boolean) => CSSProperties;
export declare const getRandomIndex: (length: number, currentIndex: number) => number;
