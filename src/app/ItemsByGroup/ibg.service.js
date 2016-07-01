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
require('rxjs/add/operator/map');
//import {ItemTypes} from './ItemTypes';
//  var systemshort: ISystemShort = <ISystemShort>{};
var ibgService = (function () {
    function ibgService(http) {
        this.http = http;
    }
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