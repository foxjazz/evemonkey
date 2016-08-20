import {Component, OnInit} from '@angular/core';
import {RegionComponent} from './regions/region.component';

import {PriceBoardComponent} from './PriceBoard/priceboard.component';
import {ibgComponent} from './ItemsByGroup/ibg.comp';
import {HelpComponent} from './Help/help.component';
import { UserData } from './UserData/UserData.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import 'rxjs/Rx';

@Component({
    selector: 'as-eve-app',
    template: `<h1>Eve Market Data</h1>
    <nav>
        <a [routerLink]="['help']">Help</a>
        <a [routerLink]="['UserData']">Items by groups</a>
        <a [routerLink]="['ItemsByGroup']">Items by groups</a>
        <a [routerLink]="['regions']">Region</a>
        <a [routerLink]="['PriceBoard']">Price Board</a>
        <a [routerLink]="['ibg']"> (under construction) Price Chart</a>
    </nav>
    <router-outlet></router-outlet>
    
    `,
    styleUrls: ['app/appstyle.css'],
    directives: [RegionComponent, ibgComponent, PriceBoardComponent, HelpComponent,ROUTER_DIRECTIVES],
  //  providers: [HTTP_PROVIDERS]
})

export class AppComponent  {
    constructor() { }

 }
