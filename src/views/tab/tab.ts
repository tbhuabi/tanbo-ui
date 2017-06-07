import { Component, OnInit } from '@angular/core';

import { ChildComponent } from './tab1/child/child';
import { Child3Component } from './tab2/child/child';
import { PageTransferStationService, ViewConfig } from '../../services/page-transfer-station';
import { NavController } from '../../modules/index';

@Component({
    templateUrl: './tab.html'
})
export class TabComponent implements OnInit {
    page =  ChildComponent;
    page2 =  Child3Component;


    constructor(private pageTransferStationService: PageTransferStationService, private nav: NavController) {
    }

    ngOnInit() {
        this.pageTransferStationService.component$.subscribe((params: ViewConfig) => {
            this.nav.push(params.component);
        });
    }
}