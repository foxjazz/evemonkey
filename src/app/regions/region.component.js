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
var http_eve_service_1 = require('./http-eve.service');
require('rxjs/Rx');
// package.json has the dependency list
var RegionComponent = (function () {
    function RegionComponent(eveService) {
        this.eveService = eveService;
        this.title = 'Regions List';
        this.errorMessage = '';
        this.loaded = false;
    }
    RegionComponent.prototype.notfound = function (sys, s) {
        for (var _i = 0, sys_1 = sys; _i < sys_1.length; _i++) {
            var t = sys_1[_i];
            if (t.location.name.indexOf(s) >= 0)
                return false;
        }
        return true;
    };
    RegionComponent.prototype.dedupe = function (sys) {
        var res;
        res = new Array();
        for (var _i = 0, sys_2 = sys; _i < sys_2.length; _i++) {
            var t = sys_2[_i];
            if (this.notfound(res, t.location.name))
                res.push(t);
        }
        return res.sort(function (left, right) { if (left.location.name < right.location.name)
            return -1; if (left.location.name > right.location.name)
            return 1;
        else
            return 0; });
    };
    ;
    RegionComponent.prototype.onRemoveStation = function (systemshort) {
        this.tempSys = this.selSystems;
        this.selSystems = new Array();
        var i = 0;
        for (i = 0; i < this.tempSys.length; i++) {
            if (systemshort === this.tempSys[i]) {
                continue;
            }
            this.selSystems.push(this.tempSys[i]);
        }
        localStorage.setItem('Systems', JSON.stringify(this.selSystems));
    };
    RegionComponent.prototype.onSelectStation = function (system) {
        if (this.selSystems == null) {
            this.selSystems = new Array();
        }
        var systemshort = {};
        systemshort.regionName = this.lastSelRegion;
        systemshort.regionid = this.lastSelRegionId;
        systemshort.stationName = system.location.name;
        systemshort.systemid = system.location.id_str;
        var i = 0;
        for (i = 0; i < this.selSystems.length; i++) {
            if (systemshort === this.selSystems[i]) {
                return;
            }
        }
        this.selSystems.push(systemshort);
        //JSON.stringify(this.selSystems);
        localStorage.setItem('Systems', JSON.stringify(this.selSystems));
        /*let res: string;
       res = localStorage.getItem('Systems');
       var restry = JSON.parse(res);
       console.log('res string from localstorage');
       console.log(res);
       console.log('object restry from localstorage');
       console.log (restry);
       this.selSystems = restry;*/
    };
    RegionComponent.prototype.onSelectRegion = function (region) {
        var _this = this;
        this.selRegion = region;
        this.lastSelRegion = region.name;
        this.lastSelRegionId = region.id_str;
        this.eveService.getSystems(this.selRegion.id_str).subscribe(function (res) {
            _this.avSystems = _this.dedupe(res.items);
            //this.avSystems = this.avSystems.sort((left, right): number => {if(left.location.name < right.location.name) return -1; if(left.location.name > right.location.name) return 1; else return 0;})
        });
    };
    RegionComponent.prototype.getRegions = function () {
        var _this = this;
        var restry = JSON.parse(localStorage.getItem('Systems'));
        /*console.log('res string from localstorage');
        console.log(res);
        console.log('object restry from localstorage');
        console.log (restry);*/
        var jsondata = localStorage.getItem('Systems');
        if (jsondata != null && jsondata.indexOf('stationName') > 0) {
            this.selSystems = JSON.parse(jsondata);
        }
        // first I  need to know if data is compantible with res
        // data = JSON.parse(res);
        this.eveService.getRegions().subscribe(function (res2) {
            _this.Regs = res2.items.filter(function (el) {
                if (isNaN(+el.name.slice(-1))) {
                    return true;
                }
            });
            if (_this.Regs.length > 0) {
                _this.loaded = true;
            }
        }, function (err) { return console.log('Something went wrong: ' + err.message); });
    };
    RegionComponent.prototype.ngOnInit = function () {
        this.getRegions();
    };
    RegionComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/regions/region.component.html',
            styleUrls: ['app/regions/region.css'],
            providers: [http_eve_service_1.HTTPEveService]
        }), 
        __metadata('design:paramtypes', [http_eve_service_1.HTTPEveService])
    ], RegionComponent);
    return RegionComponent;
}());
exports.RegionComponent = RegionComponent;
//# sourceMappingURL=region.component.js.map