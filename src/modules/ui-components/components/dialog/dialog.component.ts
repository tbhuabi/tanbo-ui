import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogService, DialogConfig } from '../../services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ui-dialog',
    templateUrl: './dialog.component.html',
    animations: [trigger('dialogContentAnimate', [state('*', style({
        opacity: 0,
        transform: 'translateY(-100%)'
    })), state('in', style({
        opacity: 1,
        transform: 'translateY(100%)'
    })), state('out', style({
        opacity: 0,
        transform: 'translateY(-100%)'
    })), transition('in <=> out', animate('2s linear'))]), trigger('dialogBgAnimate', [state('*', style({
        opacity: 0
    })), state('in', style({
        opacity: 1
    })), state('out', style({
        opacity: 0
    })), transition('in <=> out', animate('2s linear'))])]
})

export class DialogComponent implements OnInit, OnDestroy {
    @HostBinding('class.show')
    isShow: boolean = false;

    @HostBinding('@dialogBgAnimate')
    get dialogBgState() {
        return this.animateState ? 'in' : 'out';
    }

    animateState: boolean = false;
    title: string = '';
    content: string = '';
    result: boolean = false;

    private sub: Subscription;

    constructor(private dialogService: DialogService) {
    }

    ngOnInit() {
        this.sub = this.dialogService.dialogConfig$.subscribe((params: DialogConfig) => {
            this.isShow = true;
            this.animateState = true;

            this.title = params.title;
            this.content = params.content;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    publishAction(result: boolean) {
        this.animateState = false;
        this.result = result;
    }

    done() {
        if (!this.animateState) {
            this.isShow = false;
            this.dialogService.dialogActionSource.next(this.result);
        }
    }
}