import { InternalModel, Live2DModel } from 'pixi-live2d-display';
import { Stage } from './stage.js';

import * as PIXI from 'pixi.js';
export declare class PixiApp {
    private stage;
    app: PIXI.Application;
    constructor(stage: Stage);
    mount(model?: Live2DModel<InternalModel>): void;
    unMount(): void;
    clearAppStage(): void;
    resize(): void;
}
