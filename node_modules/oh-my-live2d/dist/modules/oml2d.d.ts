import { CommonStyleType } from '../types/common.js';
import { EventFn, LoadEventFn } from '../types/events/index.js';
import { DefaultOptions } from '../types/index.js';
import { Oml2dEvents, Oml2dMethods, Oml2dProperties } from '../types/oml2d/index.js';
import { Options } from '../types/options/index.js';

export declare class OhMyLive2D implements Oml2dProperties, Oml2dMethods, Oml2dEvents {
    private globalStyle;
    private stage;
    private statusBar;
    private tips;
    private menus;
    private models;
    private pixiApp?;
    private _modelIndex;
    private _modelClothesIndex;
    version: string;
    options: DefaultOptions;
    private events;
    constructor(options: Options);
    private set modelIndex(value);
    get modelIndex(): number;
    private set modelClothesIndex(value);
    get modelClothesIndex(): number;
    /**
     * 显示模型的 hit area 区域
     */
    showModelHitAreaFrames(): void;
    /**
     * 隐藏模型的 hit area 区域
     */
    hideModelHitAreaFrames(): void;
    /**
     * 设置模型缩放比例
     */
    setModelScale(scale: number): void;
    stopTipsIdle(): void;
    startTipsIdle(): void;
    statusBarPopup(content?: string | undefined, delay?: number | undefined, color?: string | undefined): void;
    setStatusBarHoverEvent(events?: {
        onIn?: () => void | Promise<void>;
        onOut?: () => void | Promise<void>;
    }): void;
    tipsMessage(message: string, duration: number, priority: number): void;
    setStageStyle(style: CommonStyleType): void;
    setModelPosition(position: {
        x?: number | undefined;
        y?: number | undefined;
    }): void;
    /**
     * 移动端是否隐藏
     */
    private get mobileHidden();
    /**
     * 创建
     */
    private create;
    /**
     * 挂载
     */
    private mount;
    /**
     * 加载模型
     */
    private loadModel;
    /**
     * 重新加载
     */
    reloadModel(): Promise<void>;
    /**
     * 随机加载模型
     */
    loadRandomModel(): Promise<void>;
    /**
     * 加载下个角色模型
     */
    loadNextModel(): Promise<void>;
    /**
     * 通过模型索引值加载模型
     */
    loadModelByIndex(index: number, clothesIndex?: number): Promise<void>;
    /**
     * 通过模型名称加载模型
     */
    loadModelByName(name: string, clothesIndex?: number): Promise<void>;
    loadNextModelClothes(): Promise<void>;
    /**
     * 设置当前模型的旋转角度
     * @param rotation
     */
    setModelRotation(rotation: number): void;
    /**
     * 设置当前模型的锚点位置
     * @param anchor
     */
    setModelAnchor(anchor: {
        x?: number;
        y?: number;
    }): void;
    private initialize;
    /**
     * 舞台滑入
     */
    stageSlideIn(): Promise<void>;
    /**
     * 舞台滑出
     */
    stageSlideOut(): Promise<void>;
    /**
     * 弹出状态条并保持打开状态
     * @param content
     * @param color
     */
    statusBarOpen(content?: string, color?: string): void;
    /**
     * 清除当前提示框内容并关闭空闲消息播放器
     */
    clearTips(): void;
    /**
     * 设置状态条点击事件
     * @param fn
     */
    setStatusBarClickEvent(fn: EventFn): void;
    /**
     * 收起状态条
     * @param content
     * @param color
     * @param delay
     */
    statusBarClose(content?: string, delay?: number, color?: string): void;
    /**
     * 清除状态条所有绑定事件
     */
    statusBarClearEvents(): void;
    /**
     * 舞台滑入动画执行完毕后的事件监听
     * @param fn
     */
    onStageSlideIn(fn: EventFn): void;
    /**
     * 舞台滑出动画执行完毕后的事件监听
     * @param fn
     */
    onStageSlideOut(fn: EventFn): void;
    /**
     * 模型在每次加载状态发生变化时的事件监听
     * @param fn
     */
    onLoad(fn: LoadEventFn): void;
    /**
     * 注册全局事件
     */
    private registerGlobalEvent;
}
