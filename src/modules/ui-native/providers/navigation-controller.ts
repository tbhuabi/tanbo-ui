export abstract class NavController {
    abstract push(component: any, params?: { [key: string]: any }): void;

    abstract pop(): void;

    abstract getParam(key: string): any;
}