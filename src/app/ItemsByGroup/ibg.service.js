//https://crest-tq.eveonline.com/market/groups
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
var PriceTypes_1 = require('../PriceBoard/PriceTypes');
require('rxjs/add/operator/map');
//import {ItemTypes} from './ItemTypes';
//  var systemshort: ISystemShort = <ISystemShort>{};
var ibgService = (function () {
    function ibgService(http) {
        this.http = http;
    }
    //http://evecore.azurewebsites.net/api/blueprint/11183
    ibgService.prototype.getBuildPrice = function (thisbom) {
        var _this = this;
        this.tbom = thisbom;
        var pt = new Array();
        return Observable_1.Observable.from(this.tbom)
            .flatMap(function (t) { return _this.getPriceDataUri(t.typeid); })
            .toArray()
            .do(function (result) {
            pt = pt.concat(result);
        });
    };
    ibgService.prototype.getBOM = function (typeid) {
        var uri = 'http://evecore.azurewebsites.net/api/blueprint/' + typeid;
        return this.http.get(uri)
            .map(function (res) { return res.json(); });
    };
    /*
                   for(let bomitem of thisbom)
                   {
                        for(let pt of result)
                        {
                           if(pt.typeid == bomitem.typeid)
                           {
                               let prc: number;
                               prc = this.getPriceTotal(bomitem.quantity,pt.items);
                               let ibitem: BItem = {typeid: bomitem.typeid, description: pt.typeName, price: prc};
                               data.items.push(ibitem);
                           }
                        }
                   }
    */
    ibgService.prototype.getPriceTotal = function (q, itms) {
        var ps = new Array();
        for (var _i = 0, itms_1 = itms; _i < itms_1.length; _i++) {
            var oo = itms_1[_i];
            if (oo.buy === false) {
                var pd = new PriceTypes_1.PriceData();
                pd.price = oo.price;
                pd.volume = oo.volume;
                ps.push(pd);
            }
        }
        var pps = ps.sort(function (left, right) { if (left.price < right.price)
            return -1; if (left.price > right.price)
            return 1;
        else
            return 0; });
        if (pps.length > 0) {
            //if (q <= pps[0].volume)
                return q * pps[0].price;
        }
    };
    ibgService.prototype.setGroupData = function () {
        var _this = this;
        //let dlast = localStorage.getItem('lastsaved');
        //if ( dlast===null || (Number(dlast) + 1) < Number(this.ymd()))
        //{
        this.uri = 'https://crest-tq.eveonline.com/market/groups/';
        this.http.get(this.uri)
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.itmGrps = [];
            _this.itmGrps = res.items;
            localStorage.setItem('SelEveGroups', JSON.stringify(_this.itmGrps));
        });
        //}   
        //let rrr = localStorage.getItem('SelEveItems');
        //return Observable.of(localStorage.getItem('whatever')).map(raw => JSON.parse(rrr));
        //return Observable.of(localStorage.getItem('SelEveItems')).map(raw => JSON.parse(raw));
    };
    ibgService.prototype.getGroupData = function () {
        var res = localStorage.getItem('SelEveGroups');
        if (res != null) {
            return JSON.parse(res);
        }
        else {
            return new Array();
        }
    };
    ibgService.prototype.getGroupHref = function () {
        this.uri = 'https://crest-tq.eveonline.com/market/groups/';
        return this.http.get(this.uri)
            .map(function (res) { return res.json(); });
    };
    ibgService.prototype.getPriceDataUri = function (typeid) {
        var uri = 'https://crest-tq.eveonline.com/market/10000002/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        return this.http.get(uri).map(function (res) {
            var p1;
            p1 = res.json();
            p1.typeid = typeid;
            return p1;
        });
    };
    ibgService.prototype.ymd = function () {
        var dateObj = new Date();
        var month = (dateObj.getUTCMonth() + 1).toString(); //months from 1-12
        if (month.length === 1)
            month = '0' + month;
        var day = dateObj.getUTCDate().toString();
        if (day.length === 1)
            day = '0' + day;
        var year = dateObj.getUTCFullYear();
        return year.toString() + month + day;
    };
    ibgService.prototype.getUnderData = function (urip) {
        //    this.uri = 'https://crest-tq.eveonline.com/market/groups/';
        return this.http.get(urip)
            .map(function (res) { return res.json(); });
    };
    ibgService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ibgService);
    return ibgService;
}());
exports.ibgService = ibgService;
//# sourceMappingURL=ibg.service.js.map