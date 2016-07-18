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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var pricetypes_1 = require('./pricetypes');
var EvePricingService = (function () {
    function EvePricingService(http) {
        this.http = http;
    }
    EvePricingService.prototype.getPriceData = function (regionid, typeid) {
        var uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        console.log('URI for price data' + uri);
        return this.http.get(uri).map(function (res) { return res.json(); });
    };
    EvePricingService.prototype.getPriceDataUri = function (uri, qx) {
        var today = new Date();
        var sec = today.getSeconds();
        var ms = today.getMilliseconds();
        console.log(sec + ':' + ms + ' URI for price data' + uri);
        return this.http.get(uri).map(function (res) {
            var p1;
            p1 = res.json();
            p1.region = qx.regionName;
            p1.typeName = qx.typeName;
            p1.station = qx.stationName;
            return p1;
        });
    };
    EvePricingService.prototype.getPriceData2 = function () {
        var _this = this;
        var pt = new Array(); //we should want q2 to only contain region id's and filter the stations as needed
        return Observable_1.Observable.from(this.q2)
            .flatMap(function (t) { return _this.getPriceDataUri(t.uri, t); })
            .toArray()
            .do(function (result) {
            pt = pt.concat(result);
            // console.log(`Received ${result.length} price types`);
        });
        //this.pt = new Array<PriceTypes>();
        //this.q2.map(t => getPriceDataUri(t.uri))
        //    .reduce((acc, curr) => [this.pt, curr], [])
        //    .subscribe((result: PriceTypes[]) => console.log(`Received ${result.length} price types`));
    };
    EvePricingService.prototype.setReady = function (regionName, typeName, stationName, regionid, typeid) {
        if (this.q2 == null)
            this.q2 = new Array();
        var q1 = new pricetypes_1.qarray();
        q1.regionName = regionName;
        q1.stationName = stationName;
        q1.typeName = typeName;
        q1.uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        for (var _i = 0, _a = this.q2; _i < _a.length; _i++) {
            var q3 = _a[_i];
            if (q1.regionName === q3.regionName && q1.typeName === q3.typeName)
                return;
        }
        this.q2.push(q1);
    };
    EvePricingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EvePricingService);
    return EvePricingService;
}());
exports.EvePricingService = EvePricingService;
//# sourceMappingURL=evepricing.service.js.map