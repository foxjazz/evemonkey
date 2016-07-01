import {Component, OnInit} from '@angular/core';
import {RegionComponent} from './regions/region.component';
import {ItemComponent} from './EveItems/item.component';
import {PriceBoardComponent} from './PriceBoard/priceboard.component';
import {ibgComponent} from './ItemsByGroup/ibg.comp';
import {HelpComponent} from './Help/help.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import 'rxjs/Rx';

@Component({
    selector: 'as-eve-app',
    template: `<h1>Eve Market Data</h1>
    <nav>
        <a [routerLink]="['help']">Help</a>
        <a [routerLink]="['regions']">Region</a>
        <a [routerLink]="['ItemsByGroup']">Items by groups</a>
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
    /*public menuitem(itm: string){
                document.getElementById('items').hidden = true;
                document.getElementById('pb').hidden = true;
                document.getElementById('region').hidden = true;
                  document.getElementById('help').hidden = true;
                  document.getElementById('pc').hidden = true;
        switch (itm) {
            case 'help': {
                document.getElementById('help').hidden = false;
            }
            break;
            case 'region': {
                document.getElementById('region').hidden = false;
            }
            break;
            case 'items': {
                 document.getElementById('items').hidden = false;
            }
            break;
            case 'pb': {
                 document.getElementById('pb').hidden = false;
            }
            break;
            case 'pc': {
                 document.getElementById('pc').hidden = false;
            }
            break;
        }
    }*/
 }
