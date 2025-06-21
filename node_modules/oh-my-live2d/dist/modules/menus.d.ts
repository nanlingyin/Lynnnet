import { OhMyLive2D } from './oml2d.js';
import { Item } from '../types/common.js';
import { CSSProperties, DefaultOptions } from '../types/index.js';

export declare class Menus {
    private options;
    private oml2d;
    element?: HTMLElement;
    private style;
    private itemStyle;
    private menuItemList;
    private _menuOptions;
    constructor(options: DefaultOptions, oml2d: OhMyLive2D);
    reload(stageElement: HTMLElement): void;
    private get menuOptions();
    private set menuOptions(value);
    createMenuItemElements(items: Item[]): void;
    createMenuItem(): void;
    /**
     * 创建
     */
    create(): void;
    unmountItems(): void;
    unmount(): void;
    mountItems(): void;
    /**
     * 挂载
     * @param stageElement
     */
    mount(stageElement: HTMLElement): void;
    /**
     * 重载样式
     */
    reloadStyle(): void;
    update(options: DefaultOptions): void;
    setStyle(style: CSSProperties): void;
    setItemStyle(style: CSSProperties): void;
}
