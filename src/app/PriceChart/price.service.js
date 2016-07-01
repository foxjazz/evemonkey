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
var pricetypes_1 = require('../priceboard/pricetypes');
require('rxjs/add/operator/map');
var PriceService = (function () {
    function PriceService(http) {
        this.http = http;
    }
    PriceService.prototype.getSellBand = function () {
        this.DoAllSelections();
        return Observable_1.Observable.from(this.priceSellBands.bands);
    };
    PriceService.prototype.getPriceData = function (regionid, typehref) {
        this.uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/sell/?type=' + typehref;
        console.log('URI for price data' + this.uri);
        return this.http.get(this.uri)
            .map(function (res) { return res.json(); });
    };
    PriceService.prototype.DoAllSelections = function () {
        this.popItems();
        this.popSystems();
        var isys = 0;
        var iitem = 0;
        try {
            var x = this.listSystems.length + this.listItems.length;
            if (x === 0) {
                document.getElementById('noData').hidden = false;
                return;
            }
        }
        catch (error) {
            document.getElementById('noData').hidden = false;
            return;
        }
        for (isys = 0; isys < this.listSystems.length; isys++) {
            for (iitem = 0; iitem < this.listItems.length; iitem++) {
                this.callPriceData(this.listSystems[isys].regionName, this.listItems[iitem].type.name, this.listSystems[isys].systemName, this.listSystems[isys].regionid, this.listItems[iitem].id.toString());
            }
        }
    };
    PriceService.prototype.callPriceData = function (region, itemname, station, regionid, itemhref) {
        var _this = this;
        this.getPriceData(regionid, itemhref).subscribe(function (res) {
            if (res.items.length > 0)
                _this.aggItems(region, itemname, station, res.items);
        }, function (err) { return console.log('Something went wrong:' + err.message); });
    };
    PriceService.prototype.popItems = function () {
        var res;
        res = localStorage.getItem('SelEveItems');
        if (res != null && res.indexOf('marketGroup') > 0) {
            var restry = JSON.parse(res);
            this.listItems = restry;
        }
    };
    PriceService.prototype.popSystems = function () {
        var jsondata = localStorage.getItem('Systems');
        if (jsondata != null && jsondata.indexOf('systemid') > 0) {
            this.listSystems = JSON.parse(jsondata);
        }
    };
    PriceService.prototype.aggItems = function (region, itemname, station, data) {
        var filtered;
        var i = 0;
        var pp = new Array();
        var bb = new Array();
        var bbs = new Array();
        var pps = new Array();
        for (i = 0; i < data.length; i++) {
            var p = new pricetypes_1.PriceData();
            p.duration = data[i].duration;
            p.price = data[i].price;
            p.volume = data[i].volume;
            p.range = data[i].range;
            p.issued = data[i].issued;
            p.location = data[i].location.name;
            pp.push(p);
        }
        pps = pp.sort(function (left, right) { if (left.price < right.price)
            return -1; if (left.price > right.price)
            return 1;
        else
            return 0; });
        // NEW INTERFACE OBJECT
        if (pps.length > 0) {
            var npb = {
                region: region,
                itemname: itemname,
                station: station,
                priceData: pps[0]
            };
            this.priceSellBands.bands.push(npb);
        }
    };
    PriceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PriceService);
    return PriceService;
}());
exports.PriceService = PriceService;
//# sourceMappingURL=price.service.js.map