import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
    selector: 'ui-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
    @Input()
    ngModel: any = '';
    @Output()
    ngModelChange = new EventEmitter<any>();
    text: string = '';
    open: boolean = false;

    private sub: Subscription;

    ngOnInit() {
        this.sub = this.ngModelChange.subscribe(() => {
            this.open = false;
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}