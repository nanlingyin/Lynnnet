import { EventFn, EventType } from '../types/events/index.js';

export declare class Events {
    private eventMap;
    add(name: EventType, fn?: EventFn): void;
    emit(name: EventType, ...arg: unknown[]): void;
}
