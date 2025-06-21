import { InternalModel, Live2DModel } from 'pixi-live2d-display';
import { Events } from './events.js';
import { DefaultOptions, ModelOptions } from '../types/index.js';

export declare class Models {
    private options;
    private events;
    model?: Live2DModel<InternalModel>;
    private currentModelIndex;
    private currentClothesIndex;
    private hitAreaFrames;
    constructor(options: DefaultOptions, events: Events);
    get modelIndex(): number;
    set modelIndex(index: number);
    get modelClothesIndex(): number;
    set modelClothesIndex(index: number);
    get currentModelOptions(): ModelOptions;
    create(): Promise<void>;
    settingModel(): void;
    /**
     * 添加点击区域
     */
    addHitAreaFrames(): void;
    /**
     * 移除点击区域
     */
    removeHitAreaFrames(): void;
    get modelSize(): {
        width: number;
        height: number;
    };
    /**
     * 设置缩放比例
     * @param x
     * @param y
     */
    setScale(value?: number): void;
    /**
     * 设置位置
     * @param x
     * @param y
     */
    setPosition(x?: number, y?: number): void;
    /**
     * 设置模型旋转角度
     */
    setRotation(value?: number): void;
    /**
     * 设置模型在舞台中的锚点位置
     */
    setAnchor(x?: number, y?: number): void;
    /**
     * 播放动作
     */
    playMotion(motionGroupName: string, index?: number): void;
    /**
     * 播放随机动作
     */
    playRandomMotion(areaName: string[]): void;
}
