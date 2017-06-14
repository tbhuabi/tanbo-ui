import { PageTransition } from './view-transition-animate';

export abstract class NavController {
    abstract push(component: any, params?: { [key: string]: any }, transition?: PageTransition): void;

    abstract pop(): void;

    abstract getParam(key: string): any;
}