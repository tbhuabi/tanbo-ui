import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ui-view-loading-bar',
    templateUrl: './view-loading-bar.component.html'
})
export class ViewLoadingBarComponent implements OnInit, OnDestroy {
    loadingState: number = 0;
    private sub: Subscription;
    private progress: Array<number> = [30, 60, 80, 85, 88, 90, 91, 92, 93];
    private timer: any = null;
    private stateIndex: number = 0;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.sub = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.stepStart();
            } else if (event instanceof NavigationEnd) {
                clearInterval(this.timer);
                this.loadingState = 100;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    stepStart() {
        clearInterval(this.timer);
        this.loadingState = this.progress[this.stateIndex];
        this.timer = setInterval(() => {
            this.stateIndex++;
            if (this.stateIndex === this.progress.length) {
                clearInterval(this.timer);
                return;
            }
            this.loadingState = this.progress[this.stateIndex];
        }, 500);
    }
}