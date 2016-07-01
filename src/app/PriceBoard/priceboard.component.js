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
var pricetypes_1 = require('./pricetypes');
var evepricing_service_1 = require('./evepricing.service');
var moneypipe_1 = require('./moneypipe');
require('rxjs/Rx');
var PriceBoardComponent = (function () {
    //public priceBandB: Array<PriceBand>;
    function PriceBoardComponent(evePricingService) {
        this.evePricingService = evePricingService;
    }
    PriceBoardComponent.prototype.ngOnInit = function () {
        this.priceBandA = new Array();
        this.priceBandA = new Array();
        this.loadLocalData();
        this.DoAllSelections();
    };
    PriceBoardComponent.prototype.pushlvl2 = function (sell, buy) {
        var i = 0;
        var l2;
        var len;
        var short;
        var sellIsLong = false;
        var l2a = new Array();
        if (sell.length > buy.length) {
            sellIsLong = true;
            len = sell.length;
            short = buy.length;
        }
        else {
            len = buy.length;
            short = sell.length;
        }
        for (i = 0; i < len; i++) {
            l2 = new pricetypes_1.Level2();
            if (sellIsLong) {
                l2.priceSell = sell[i].price;
                l2.volSell = sell[i].volume;
            }
            else {
                l2.priceBuy = buy[i].price;
                l2.volBuy = buy[i].volume;
                l2.Buyrange = buy[i].range;
            }
            if (i < short && !sellIsLong) {
                l2.priceSell = sell[i].price;
                l2.volSell = sell[i].volume;
            }
            if (i < short && sellIsLong) {
                l2.priceBuy = buy[i].price;
                l2.volBuy = buy[i].volume;
                l2.Buyrange = buy[i].range;
            }
            l2a.push(l2);
        }
        return l2a;
    };
    PriceBoardComponent.prototype.loadLocalData = function () {
        document.getElementById('noData').hidden = true;
        this.selSystems = new Array();
        var jsondata = localStorage.getItem('Systems');
        if (jsondata != null && jsondata.indexOf('stationName') > 0) {
            this.selSystems = JSON.parse(jsondata);
        }
        else {
            document.getElementById('noData').hidden = false;
            return;
        }
        jsondata = localStorage.getItem('SelEveItems');
        if (jsondata != null && jsondata.indexOf('marketGroup') > 0) {
            var restry = JSON.parse(jsondata);
            this.selEveItems = restry;
        }
        else {
            this.selEveItems = new Array();
        }
    };
    PriceBoardComponent.prototype.refreshData = function () {
        this.priceBandA = new Array();
        this.loadLocalData();
        this.DoAllSelections();
    };
    PriceBoardComponent.prototype.aggItems = function (region, itemname, station, data) {
        var filtered;
        var i = 0;
        var pp = new Array();
        var bb = new Array();
        var bbs = new Array();
        var pps = new Array();
        for (i = 0; i < data.length; i++) {
            if (data[i].buy === false) {
                var p = new pricetypes_1.PriceData();
                p.duration = data[i].duration;
                p.price = data[i].price;
                p.volume = data[i].volume;
                p.range = data[i].range;
                p.issued = data[i].issued;
                p.location = data[i].location.name;
                pp.push(p);
            }
            else {
                var p = new pricetypes_1.PriceData();
                p.duration = data[i].duration;
                p.price = data[i].price;
                p.volume = data[i].volume;
                p.range = data[i].range;
                p.issued = data[i].issued;
                p.location = data[i].location.name;
                bb.push(p);
            }
        }
        pps = pp.sort(function (left, right) { if (left.price < right.price)
            return -1; if (left.price > right.price)
            return 1;
        else
            return 0; });
        bbs = bb.sort(function (left, right) { if (left.price < right.price)
            return 1; if (left.price > right.price)
            return -1;
        else
            return 0; });
        // NEW INTERFACE OBJECT
        var l2ao = this.pushlvl2(pps, bbs);
        var npb = {
            region: region,
            itemname: itemname,
            station: station,
            l2pricedata: l2ao
        };
        this.priceBandA.push(npb);
    };
    PriceBoardComponent.prototype.callPriceData = function (region, itemname, station, regionid, typeid) {
        var _this = this;
        this.evePricingService.getPriceData(regionid, typeid).subscribe(function (res) {
            if (res.items.length > 0)
                _this.aggItems(region, itemname, station, res.items);
        }, function (err) { return console.log('Something went wrong:' + err.message); });
    };
    PriceBoardComponent.prototype.DoAllSelections = function () {
        var isys = 0;
        var iitem = 0;
        try {
            var x = this.selSystems.length + this.selEveItems.length;
            if (x === 0) {
                document.getElementById('noData').hidden = false;
                return;
            }
        }
        catch (error) {
            document.getElementById('noData').hidden = false;
            return;
        }
        for (isys = 0; isys < this.selSystems.length; isys++) {
            for (iitem = 0; iitem < this.selEveItems.length; iitem++) {
                this.callPriceData(this.selSystems[isys].regionName, this.selEveItems[iitem].type.name, this.selSystems[isys].systemName, this.selSystems[isys].regionid, this.selEveItems[iitem].id);
            }
        }
    };
    PriceBoardComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/PriceBoard/priceboard.component.html',
            styleUrls: ['app/PriceBoard/priceboard.css'],
            providers: [evepricing_service_1.EvePricingService],
            pipes: [moneypipe_1.moneyPipe, moneypipe_1.volPipe]
        }), 
        __metadata('design:paramtypes', [evepricing_service_1.EvePricingService])
    ], PriceBoardComponent);
    return PriceBoardComponent;
}());
exports.PriceBoardComponent = PriceBoardComponent;
//# sourceMappingURL=priceboard.component.js.map