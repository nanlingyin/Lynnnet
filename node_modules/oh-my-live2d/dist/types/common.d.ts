import { Oml2dEvents, Oml2dMethods, Oml2dProperties } from './oml2d/index.js';
import { CSSProperties, ImportType, LibraryUrls, PixiLive2dDisplayModule, PixiModule } from './index.js';

export type IdleTimer = {
    start: () => Promise<void>;
    stop: () => void;
};
export type WordTheDayData = {
    id: number;
    uuid: string;
    hitokoto: string;
    type: string;
    from: string;
    from_who: string;
    creator: string;
    creator_uid: number;
    reviewer: number;
    commit_from: string;
    created_at: string;
    length: number;
};
export type CommonStyleType = Omit<CSSProperties, 'width' | 'height'> & {
    width?: number | string;
    height?: number | string;
};
export type LoadOml2dSDK = (importType: ImportType, libraryUrls: LibraryUrls) => Promise<{
    PIXI: PixiModule;
    PixiLive2dDisplay: PixiLive2dDisplayModule;
}>;
export type StoreModelInfo = (string | string[])[];
export type Item = {
    id: string;
    icon: string;
    title: string;
    onClick?: (oml2d: Oml2dProperties & Oml2dMethods & Oml2dEvents) => Promise<void> | void;
};
