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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var EvePricingService = (function () {
    //public regionid: string;
    //public typehref: string;
    function EvePricingService(http) {
        this.http = http;
    }
    EvePricingService.prototype.getPriceData = function (regionid, typeid) {
        this.uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        console.log('URI for price data' + this.uri);
        return this.http.get(this.uri)
            .map(function (res) { return res.json(); });
        /* let newresult: Observable<ItemTypesA> = new Observable<ItemTypesA>();
         let i: number = 0;
         
         return newresult;*/
    };
    EvePricingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EvePricingService);
    return EvePricingService;
}());
exports.EvePricingService = EvePricingService;
//# sourceMappingURL=evepricing.service.js.map