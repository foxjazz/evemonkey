"use strict";
var DataGroups = (function () {
    function DataGroups(subs) {
        this.subgrps = subs;
    }
    DataGroups.prototype.getChilderen = function (it) {
        var result = new Array();
        for (var _i = 0, _a = this.subgrps; _i < _a.length; _i++) {
            var sub = _a[_i];
            if (sub.parentGroup.href === it.href) {
                result.push(sub);
            }
        }
        return result;
    };
    return DataGroups;
}());
exports.DataGroups = DataGroups;
//# sourceMappingURL=datagroups.js.map