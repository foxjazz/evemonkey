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
var price_service_1 = require('./price.service');
var PriceChartComponent = (function () {
    function PriceChartComponent(ps) {
    }
    PriceChartComponent.prototype.ngOnInit = function () {
        var x = d3.scale.linear().domain([0, 512]).range([0, window.innerWidth]), y = d3.scale.linear().domain([0, 255]).range([this.height, 0]), line = d3.svg.line()
            .interpolate('basis')
            .x(function (d, i) { return x(i); })
            .y(function (d, i) { return y(d); });
        this.shape = this.elem.nativeElement.getElementsByClassName('levels')[0];
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PriceChartComponent.prototype, "path", void 0);
    PriceChartComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/pricechart/testchart.html',
            styleUrls: ['app/pricechart/pricechart.css'],
            providers: [price_service_1.PriceService]
        }), 
        __metadata('design:paramtypes', [price_service_1.PriceService])
    ], PriceChartComponent);
    return PriceChartComponent;
}());
exports.PriceChartComponent = PriceChartComponent;
//# sourceMappingURL=pricechart.component.js.map