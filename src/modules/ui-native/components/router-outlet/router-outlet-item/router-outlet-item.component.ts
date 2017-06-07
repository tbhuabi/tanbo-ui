import { Component, Input, ComponentFactoryResolver, ViewChild, AfterContentInit } from '@angular/core';

import { ComponentHostDirective } from '../../../directives/component-host.directive';

@Component({
    selector: 'ui-router-outlet-item',
    templateUrl: './router-outlet-item.component.html'
})
export class RouterOutLetItemComponent implements AfterContentInit {
    @Input()
    component: any;
    @ViewChild(ComponentHostDirective)
    componentHost: ComponentHostDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterContentInit() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        let i = this.componentHost.viewContainerRef.createComponent(componentFactory);
        console.log(i);
    }
}