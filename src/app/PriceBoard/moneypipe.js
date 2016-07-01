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
var moneyPipe = (function () {
    function moneyPipe() {
    }
    moneyPipe.prototype.transform = function (value) {
        var nn = 0;
        if (value === undefined)
            return '';
        var str = value.toString();
        if (str.indexOf('.') === -1)
            str += '.00';
        if (str.indexOf('.') === (str.length - 2))
            str += '0';
        if (str.indexOf('.') !== -1)
            nn = 3;
        if (str.length < 7)
            return str + ' (isk)';
        str = str.split('').reverse().join('');
        var apnd = '';
        var adj = 0;
        var l = str.length / 3 - 1;
        var i = 0;
        for (i = 0; i < l; i++) {
            if (str.length > (3 * i + 6)) {
                apnd += str.substr(3 * i + adj, 3 + nn) + ',';
            }
            else {
                apnd += str.substr(3 * i + adj, 3 + nn);
            }
            nn = 0;
            adj = 3;
        }
        if (str.length > (3 * i + 3)) {
            var xi = str.length - (3 * i + 3);
            apnd += str.substr(3 * i + 3, xi);
        }
        return apnd.split('').reverse().join('') + ' (isk)';
        //return value.toString().replace(/(\d)(?=(\d{3})+\.)/g, '1,');
    };
    moneyPipe = __decorate([
        core_1.Pipe({ name: 'moneyPipe' }), 
        __metadata('design:paramtypes', [])
    ], moneyPipe);
    return moneyPipe;
}());
exports.moneyPipe = moneyPipe;
var volPipe = (function () {
    function volPipe() {
    }
    volPipe.prototype.transform = function (value) {
        var nn = 0;
        if (value === undefined)
            return '';
        var str = value.toString();
        nn = 0;
        if (str.length < 4)
            return str;
        str = str.split('').reverse().join('');
        var apnd = '';
        var adj = 0;
        var l = str.length / 3 - 1;
        var i = 0;
        for (i = 0; i < l; i++) {
            if (str.length > (3 * i + 3)) {
                apnd += str.substr(3 * i, 3) + ',';
            }
            else {
                apnd += str.substr(3 * i, 3);
            }
        }
        if (str.length > (3 * i)) {
            var xi = str.length - (3 * i);
            apnd += str.substr(3 * i, xi);
        }
        return apnd.split('').reverse().join('');
        //return value.toString().replace(/(\d)(?=(\d{3})+\.)/g, '1,');
    };
    volPipe = __decorate([
        core_1.Pipe({ name: 'volPipe' }), 
        __metadata('design:paramtypes', [])
    ], volPipe);
    return volPipe;
}());
exports.volPipe = volPipe;
//# sourceMappingURL=moneypipe.js.map