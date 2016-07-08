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
var ibg_service_1 = require('./ibg.service');
var stringdistance_1 = require('../algs/stringdistance');
var treeview_comp_1 = require('../common/treeview.comp');
var donkey_comp_1 = require('../common/donkey.comp');
var ibgComponent = (function () {
    function ibgComponent(itgs) {
        this.itgs = itgs;
        this.dondata = 'the data';
        this.onRemoveItem = function (item) {
            this.tempItem = this.selItemTypes;
            this.selItemTypes = new Array();
            var i = 0;
            for (i = 0; i < this.tempItem.length; i++) {
                if (item === this.tempItem[i]) {
                    continue;
                }
                this.selItemTypes.push(this.tempItem[i]);
            }
            localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
        };
        this.onSelectItem = function (it) {
            var i = 0;
            for (i = 0; i < this.selItemTypes.length; i++) {
                if (it === this.selItemTypes[i]) {
                    return;
                }
            }
            this.selItemTypes.push(it);
            localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
        };
        this.ItemService = itgs;
        this.selItemTypes = new Array();
    }
    ibgComponent.prototype.dosd = function (event) {
        var s = event.target.value;
        if (s.length < 3)
            return;
        var objh;
        objh = { prop: 'type.name', list: this.itmtypes, input: s };
        var sd = new stringdistance_1.stringdistance(objh);
        this.itmtypes = sd.result;
    };
    ibgComponent.prototype.toggle = function (it) {
        if (it.isExpanded)
            it.isExpanded = false;
        else
            it.isExpanded = true;
    };
    ibgComponent.prototype.getChildren = function (it) {
        this.selGrps = it.children;
        return it.children;
    };
    ibgComponent.prototype.getGroups = function () {
        var _this = this;
        this.itgs.getGroupHref().subscribe(function (res) {
            _this.itemGroups = res.items;
            _this.itemTopGroups = new Array();
            _this.subgrps = new Array();
            for (var _i = 0, _a = _this.itemGroups; _i < _a.length; _i++) {
                var grp = _a[_i];
                if (grp.parentGroup === undefined)
                    _this.itemTopGroups.push(grp);
                else
                    _this.subgrps.push(grp);
            }
            for (var _b = 0, _c = _this.itemTopGroups; _b < _c.length; _b++) {
                var grp = _c[_b];
                _this.doChildren(grp);
            }
        });
    };
    ibgComponent.prototype.doChildren = function (parent) {
        for (var _i = 0, _a = this.subgrps; _i < _a.length; _i++) {
            var ch = _a[_i];
            if (parent.href === ch.parentGroup.href) {
                if (parent.children === undefined) {
                    parent.children = new Array();
                }
                parent.children.push(ch);
                this.doChildren(ch);
            }
        }
    };
    /* private populateChildren(pg: Array<ItemGroup>){
         for(let ch of this.subgrps)
         {
             for(let parentGrp of pg)
             {
                     if(parentGrp.href === ch.parentGroup.href)
                     {
                         parentGrp.children.push(ch);
                     }
             }
         }
     }*/
    ibgComponent.prototype.getTypes = function () {
        var res;
        res = localStorage.getItem('SelEveItems');
        if (res != null && res.indexOf('marketGroup') > 0) {
            var restry = JSON.parse(res);
            this.selItemTypes = restry;
        }
        else {
            this.selItemTypes = new Array();
        }
    };
    ibgComponent.prototype.onItemsSelect = function (href) {
        var _this = this;
        this.ItemService.getUnderData(href).subscribe(function (res3) {
            _this.itmtypes = [];
            _this.itmtypes = res3.items;
        });
    };
    ibgComponent.prototype.onSelectItemTopGroup = function (item) {
        var _this = this;
        //this.subgrps = item.children;
        this.itgs.getUnderData(item.types.href).subscribe(function (res3) {
            _this.itmtypes = [];
            _this.itmtypes = res3.items;
        });
        for (var _i = 0, _a = this.itemTopGroups; _i < _a.length; _i++) {
            var x = _a[_i];
            x.isExpanded = false;
        }
        item.isExpanded = true;
    };
    ibgComponent.prototype.onSelectItemGroup = function (item) {
        var _this = this;
        this.itgs.getUnderData(item.types.href).subscribe(function (res3) {
            _this.itmtypes = [];
            _this.itmtypes = res3.items;
        });
    };
    ibgComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.ItemService.setGroupData();    
        this.getTypes();
        this.getGroups();
        this.itgs.getUnderData('https://crest-tq.eveonline.com/market/types/?group=https://crest-tq.eveonline.com/market/groups/4/')
            .subscribe(function (res3) {
            _this.itmtypes = res3.items;
        });
    };
    ibgComponent = __decorate([
        core_1.Component({
            selector: 'as-sel-groups',
            templateUrl: 'app/ItemsByGroup/ibg.html',
            styleUrls: ['app/itemsByGroup/ibg.css'],
            directives: [treeview_comp_1.TreeView, donkey_comp_1.Donkey],
            providers: [ibg_service_1.ibgService]
        }), 
        __metadata('design:paramtypes', [ibg_service_1.ibgService])
    ], ibgComponent);
    return ibgComponent;
}());
exports.ibgComponent = ibgComponent;
//# sourceMappingURL=ibg.comp.js.map