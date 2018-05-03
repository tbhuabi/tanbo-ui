import {
    Component,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';

@Component({
    selector: 'ui-dropdown',
    templateUrl: './dropdown.component.html'
})

export class DropDownComponent {
    @Input()
    @HostBinding('class.open')
    open: boolean = false;
    @Output()
    escape = new EventEmitter<void>();
    @Output()
    trigger = new EventEmitter<void>();

    private isSelfClick: boolean = false;

    @HostListener('document:click')
    globalClick() {
        const b = this.isSelfClick;
        this.isSelfClick = false;
        if (b) {
            return;
        }
        this.escape.emit();
    }

    @HostListener('click')
    click() {
        this.isSelfClick = true;
        this.trigger.emit();
    }
}
