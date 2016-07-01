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
var ItemTypes_service_1 = require('./ItemTypes.service');
var stringdistance_1 = require('../algs/stringdistance');
var ItemComponent = (function () {
    function ItemComponent(eveTypeService) {
        this.eveTypeService = eveTypeService;
        this.getTypes = function () {
            var res;
            this.allItemTypes = this.eveTypeService.getItemTypes();
            res = localStorage.getItem('SelEveItems');
            if (res != null && res.indexOf('marketGroup') > 0) {
                var restry = JSON.parse(res);
                this.selItemTypes = restry;
            }
            else {
                this.selItemTypes = new Array();
            }
        };
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
        this.selItemTypes = new Array();
    }
    ItemComponent.prototype.dosd = function (event) {
        var s = event.target.value;
        if (s.length < 3)
            return;
        var objh;
        objh = { prop: 'type.name', list: this.allItemTypes, input: s };
        var sd = new stringdistance_1.stringdistance(objh);
        this.allItemTypes = sd.result;
    };
    ItemComponent.prototype.onClearItems = function () {
        this.selItemTypes = new Array();
    };
    ItemComponent.prototype.onGetTypes = function () { this.getTypes(); };
    ItemComponent.prototype.ngOnInit = function () {
        this.getTypes();
    };
    ItemComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/EveItems/item.component.html',
            styleUrls: ['app/appstyle.css'],
            providers: [ItemTypes_service_1.ItemTypesService]
        }), 
        __metadata('design:paramtypes', [ItemTypes_service_1.ItemTypesService])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map