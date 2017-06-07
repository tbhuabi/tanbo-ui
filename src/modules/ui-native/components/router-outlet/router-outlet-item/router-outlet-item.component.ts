import {
    Component,
    Input,
    ComponentFactoryResolver,
    ViewChild,
    AfterContentInit,
    ReflectiveInjector
} from '@angular/core';

import { RouterOutLetComponent } from '../router-outlet.component';
import { ComponentHostDirective } from '../../../directives/component-host.directive';
import { NavController } from '../../../providers/navigation-controller';
import { NavTest } from '../../../providers/nav-test';

@Component({
    selector: 'ui-router-outlet-item',
    templateUrl: './router-outlet-item.component.html'
})
export class RouterOutLetItemComponent implements AfterContentInit {
    @Input()
    component: any;
    @Input()
    host: RouterOutLetComponent;
    @ViewChild(ComponentHostDirective)
    componentHost: ComponentHostDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterContentInit() {
        const componentProviders = ReflectiveInjector.resolveAndCreate([{
            provide: NavController,
            useValue: new NavTest(this.host, this.host.navigationService)
        }], this.componentHost.viewContainerRef.injector);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.componentHost.viewContainerRef.createComponent(componentFactory, 0, componentProviders);
    }
}