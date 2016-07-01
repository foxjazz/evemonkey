"use strict";
var tobeOrderedList = (function () {
    function tobeOrderedList() {
        this.olist = new Array();
    }
    return tobeOrderedList;
}());
var orderedList = (function () {
    function orderedList() {
    }
    return orderedList;
}());
var stringdistance = (function () {
    function stringdistance(sdinput) {
        this.orderList(sdinput);
    }
    stringdistance.prototype.getNewList = function () { return this.result; };
    stringdistance.prototype.indexPropByPath = function (object, path) {
        var result;
        var obj = object;
        var ii = 0;
        for (var _i = 0, _a = path.split("."); _i < _a.length; _i++) {
            var portion = _a[_i];
            obj = obj[portion];
        }
        result = obj;
        return result;
    };
    stringdistance.prototype.orderList = function (data) {
        var arr;
        arr = data.list;
        if (arr == null || arr.length === 0) {
            throw ('invalid data');
        }
        var n;
        var tobeo = new tobeOrderedList();
        var olst = new Array();
        var i;
        var sresult;
        for (i = 0; i < arr.length; i++) {
            var sresult_1 = this.indexPropByPath(arr[i], data.prop);
            var nd = { distance: this.distance(data.input, sresult_1), o: arr[i] };
            olst.push(nd);
        }
        this.presult = olst.sort(function (a, b) {
            if (a.distance < b.distance)
                return -1;
            if (a.distance > b.distance)
                return 1;
            return 0;
        });
        this.result = new Array();
        for (var _i = 0, _a = this.presult; _i < _a.length; _i++) {
            var obj = _a[_i];
            this.result.push(obj.o);
        }
        //Here we need to order the list and assign it to result.
    };
    stringdistance.prototype.distance = function (s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        var s1a = s1.split(' ');
        /* return max value of data type Number on error */
        if (!s1 || !s2) {
            return Number.MAX_VALUE;
        }
        var m = s1.length;
        var n = s2.length;
        var i;
        var j;
        var cost = 0;
        var matrix = new Array();
        var result;
        /*
         * for all i and j, matrix[i][j] holds the edit distance between the
         * first i characters of s and the first j characters of t.
         *
         * @note
         * Array has (m + 1) * (n + 1) values
         */
        for (i = 0; i <= m; i++) {
            matrix[i] = new Array();
            matrix[i][0] = i;
        }
        for (j = 0; j <= n; j++) {
            matrix[0][j] = j;
        }
        /* determine longest common substring sequence */
        for (j = 1; j <= n; j++) {
            for (i = 1; i <= m; i++) {
                /* subtract one to start, at zero index */
                cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;
                /* insert, delete, substitute */
                matrix[i][j] = Math.min(matrix[i][j - 1] + 1, Math.min(matrix[i - 1][j] + 1, matrix[i - 1][j - 1] + cost));
            }
        }
        /* return edit distance */
        var diff = s2.length - s1.length;
        result = matrix[m][n] + 100;
        var found = 0;
        for (var _i = 0, s1a_1 = s1a; _i < s1a_1.length; _i++) {
            var ss = s1a_1[_i];
            if (s2.indexOf(ss) !== -1) {
                found++;
            }
        }
        if (found > 0) {
            result = 90 - found * 10 + diff;
        }
        return result;
    };
    stringdistance.prototype.sift = function (s1, s2) {
        // sift3: http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html
        if (s1 == null || s1.length === 0) {
            if (s2 == null || s2.length === 0) {
                return 0;
            }
            else {
                return s2.length;
            }
        }
        if (s2 == null || s2.length === 0) {
            return s1.length;
        }
        var c = 0;
        var offset1 = 0;
        var offset2 = 0;
        var lcs = 0;
        var maxOffset = 5;
        while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
            if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) {
                lcs++;
            }
            else {
                offset1 = 0;
                offset2 = 0;
                for (var i = 0; i < maxOffset; i++) {
                    if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))) {
                        offset1 = i;
                        break;
                    }
                    if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))) {
                        offset2 = i;
                        break;
                    }
                }
            }
            c++;
        }
        return (s1.length + s2.length) / 2 - lcs;
    };
    return stringdistance;
}());
exports.stringdistance = stringdistance;
//# sourceMappingURL=stringdistance.js.map