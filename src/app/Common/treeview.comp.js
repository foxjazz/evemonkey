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
var ibg_service_1 = require('../ItemsByGroup/ibg.service');
var TreeView = (function () {
    //public itemGroups: Array<ItemGroup>;
    function TreeView(itgs) {
        this.itgs = itgs;
        this.onItemsSelect = new core_1.EventEmitter();
        this.ItemService = itgs;
        this.subgrps = this.itgs.getGroupData();
    }
    TreeView.prototype.toggle = function (it) {
        if (it.isExpanded)
            it.isExpanded = false;
        else
            it.isExpanded = true;
        this.onItemsSelect.emit(it.types.href);
    };
    TreeView.prototype.onItemsSel = function (s) {
        this.onItemsSelect.emit(s);
    };
    TreeView.prototype.getChildren = function (it) {
        return it.children;
        /* let result = new Array<ItemGroup>();
         for(let sub of this.subgroups)
         {
             if(sub.parentGroup.href === it.href)
             {
                     result.push(sub);
             }
         }
         return result;*/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TreeView.prototype, "itemGroups", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeView.prototype, "onItemsSelect", void 0);
    TreeView = __decorate([
        core_1.Component({
            selector: 'as-tree-view',
            template: "\n    <ul>\n        <li *ngFor=\"let itg of itemGroups\">\n            <span (click)=\"toggle(itg)\"> {{ itg.name }} len:{{itemGroups.length}}</span>\n            <as-tree-view *ngIf=\"itg.isExpanded\" (onItemsSelect)=\"onItemsSel($event)\" [itemGroups]=\"getChildren(itg)\" >\n            \n             </as-tree-view>\n        <li>\n    </ul>\n    ",
            styleUrls: ['app/Common/treeview.css'],
            directives: [TreeView],
            providers: [ibg_service_1.ibgService]
        }), 
        __metadata('design:paramtypes', [ibg_service_1.ibgService])
    ], TreeView);
    return TreeView;
}());
exports.TreeView = TreeView;
//# sourceMappingURL=treeview.comp.js.map