"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var region_component_1 = require('./regions/region.component');
var priceboard_component_1 = require('./PriceBoard/priceboard.component');
var ibg_comp_1 = require('./ItemsByGroup/ibg.comp');
var help_component_1 = require('./Help/help.component');
var router_1 = require('@angular/router');
require('rxjs/Rx');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'as-eve-app',
            template: "<h1>Eve Market Data</h1>\n    <nav>\n        <a [routerLink]=\"['/help']\">Help</a>\n        <a [routerLink]=\"['/regions']\">Region</a>\n        <a [routerLink]=\"['/items']\">Items by groups</a>\n        <a [routerLink]=\"['/priceboard']\">Price Board</a>\n        <a [routerLink]=\"['/ibg']\"> (under construction) Price Chart</a>\n    </nav>\n    <router-outlet></router-outlet>\n    \n    ",
            styleUrls: ['app/appstyle.css'],
            directives: [region_component_1.RegionComponent, ibg_comp_1.ibgComponent, priceboard_component_1.PriceBoardComponent, help_component_1.HelpComponent, router_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map