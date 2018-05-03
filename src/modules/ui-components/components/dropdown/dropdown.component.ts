import {
    Component,
    HostBinding,
    Input,
    OnInit,
    QueryList,
    AfterContentInit,
    EventEmitter,
    Output,
    OnDestroy,
    Renderer2,
    ContentChildren
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DropdownFixedComponent } from '../dropdown-fixed/dropdown-fixed.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
    selector: 'ui-dropdown',
    templateUrl: './dropdown.component.html'
})

export class DropDownComponent implements AfterContentInit, OnInit, OnDestroy {
    @ContentChildren(DropdownFixedComponent)
    fixed: QueryList<DropdownFixedComponent>;
    @ContentChildren(DropdownMenuComponent)
    menu: QueryList<DropdownMenuComponent>;
    @Input()
    @HostBinding('class.open')
    open: boolean = false;
    @Output()
    escape = new EventEmitter();
    @Output()
    trigger = new EventEmitter();

    private subs: Array<Subscription> = [];
    private isTriggerEvent: boolean = false;

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.listen('document', 'click', () => {
            if (this.isTriggerEvent) {
                this.isTriggerEvent = false;
                return;
            }
            this.escape.emit();
        });
    }

    ngAfterContentInit() {
        this.fixed.forEach(item => {
            let sub = item.trigger.subscribe(() => {
                this.isTriggerEvent = true;
                this.trigger.emit();
            });
            this.subs.push(sub);
        });
    }

    ngOnDestroy() {
        this.subs.forEach(item => {
            item.unsubscribe();
        });
    }
}
