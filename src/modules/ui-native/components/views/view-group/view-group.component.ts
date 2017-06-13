import {
    Component,
    Input,
    ComponentFactoryResolver,
    ViewChild,
    AfterContentInit,
    ReflectiveInjector,
    OnInit
} from '@angular/core';

import { LifeCycleService } from '../../../services/life-cycle.service';
import { Event, EventType } from '../../../utils/event';
import { ViewsComponent } from '../views.component';
import { ComponentHostDirective } from '../../../directives/component-host.directive';
import { NavController } from '../../../providers/navigation-controller';
import { NavControllerBase } from '../../../providers/navigation-controller-base';

@Component({
    selector: 'ui-view-group',
    templateUrl: './view-group.component.html'
})
export class ViewGroupComponent implements AfterContentInit, OnInit {
    @Input()
    component: any;
    @Input()
    host: ViewsComponent;
    @ViewChild(ComponentHostDirective)
    componentHost: ComponentHostDirective;

    private childInstance: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private lifeCycleService: LifeCycleService) {
    }

    ngOnInit() {
        this.lifeCycleService.event$.subscribe((event: Event) => {
            if (event.component !== this.component) {
                return;
            }
            switch (event.type) {
                case EventType.Enter:
                    if (typeof this.childInstance['uiOnViewEnter'] === 'function') {
                        this.childInstance['uiOnViewEnter']();
                    }
                    break;
                case EventType.Leave:
                    if (typeof this.childInstance['uiOnViewLeave'] === 'function') {
                        this.childInstance['uiOnViewLeave']();
                    }
                    break;
            }
        });
    }

    ngAfterContentInit() {
        const viewContainerRef = this.componentHost.viewContainerRef;
        const componentProviders = ReflectiveInjector.resolveAndCreate([{
            provide: NavController,
            useValue: new NavControllerBase(this.host, this.host.navigationService)
        }], viewContainerRef.injector);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.childInstance = viewContainerRef.createComponent(componentFactory, 0, componentProviders).instance;
    }

}