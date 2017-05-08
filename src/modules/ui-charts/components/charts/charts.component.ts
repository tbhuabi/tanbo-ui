import { Component, ViewChild, Input, OnChanges, OnInit, ElementRef } from '@angular/core';
import { ECharts, init } from 'echarts';

@Component({
    selector: 'ui-charts',
    templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit, OnChanges {
    @ViewChild('chart')
    private chart: ElementRef;
    @Input()
    options: any = {};
    eChartsInstance: ECharts;

    ngOnInit() {
        this.eChartsInstance = init(this.chart.nativeElement);
        this.update();
    }

    ngOnChanges() {
        this.update();
    }

    update() {
        if (this.eChartsInstance) {
            this.eChartsInstance.setOption(this.options)
        }
    }
}