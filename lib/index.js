"use strict";
// 检查各种类型

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _store = require("store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = function isArray(o) {
    return toString.call(o) === "[object Array]";
};
var isFunction = function isFunction(o) {
    return toString.call(o) === "[object Function]";
};
var isNumber = function isNumber(o) {
    return toString.call(o) === "[object Number]";
};
var isObject = function isObject(o) {
    return toString.call(o) === "[object Object]";
};
var isBoolean = function isBoolean(o) {
    return toString.call(o) === "[object Boolean]";
};
var isString = function isString(o) {
    return toString.call(o) === "[object String]";
};
var isUndefined = function isUndefined(o) {
    return o === undefined;
};
var isNull = function isNull(o) {
    return o === null;
};

var isNil = function isNil(o) {
    return o === undefined || o === null;
};
var isEmpty = function isEmpty(o) {
    return o == null || !(Object.keys(o) || o).length;
};
var isObjectNull = function isObjectNull(o) {
    return isObject(o) && JSON.stringify(o) == "{}";
}; // 检测对象是否为空
var classtype = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Object]': 'object',
    '[object Error]': 'error'
};
var typeOf = function typeOf(obj) {
    if (obj === null) {
        return null + "";
    }
    return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? classtype[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
// 检测邮箱
var isZip = function isZip(str) {
    return (/^[1-9][0-9]{5}$/.test(str)
    );
};

// 检测是否是 Email
//  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/  另一种方法
var isEmail = function isEmail(str) {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)
    );
};
// 检查身份证  
// 可输入字符串活数字 因最后一个字母可能是数字或是x
var chechCHNCardId = function chechCHNCardId(cardId) {
    return (/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(cardId)
    );
};
// 计算最小值 最大值
var arrayMin = function arrayMin(arr) {
    return Math.min.apply(Math, _toConsumableArray(arr));
};
var arrayMax = function arrayMax(arr) {
    return Math.max.apply(Math, _toConsumableArray(arr));
}; // 获取url参数
var getURLParameters = function getURLParameters() {
    var reg_url = /^[^\?]+\?([\w\W]+)+\#([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arr_url = reg_url.exec(location.href),
        ret = {};
    if (arr_url && arr_url[1]) {
        var str_para = arr_url[1],
            result = void 0;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
};
// 返回顶部
var scrollToTop = function scrollToTop() {
    var c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};
// 返回数组的平均值
var arrayAverage = function arrayAverage(arr) {
    return arr.reduce(function (acc, val) {
        return acc + val;
    }, 0) / arr.length;
};
// 返回一个数字数组的总和
var arraySum = function arraySum(arr) {
    return arr.reduce(function (acc, val) {
        return acc + val;
    }, 0);
};
// 将数字四舍五入到指定的位数。
var round = function round(n) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Number(Math.round(n + "e" + decimals) + "e-" + decimals);
};
//判断输入的字符是否为中文 
var isChinese = function isChinese(str) {
    return (/^[\u0391-\uFFE5]+$/.test(str)
    );
};
//判断日期类型是否为YYYY-MM-DD格式的类型 
var isDate = function isDate(data) {
    return (/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/.test(data)
    );
};
//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 
var isDateTime = function isDateTime(datatime) {
    return (/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(datatime)
    );
};
//判断日期类型是否为hh:mm:ss格式的类型 
var isTime = function isTime(time) {
    return (/^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/.test(time)
    );
};
//判断输入的字符是否为英文字母 
var isLetter = function isLetter(letter) {
    return (/^[a-zA-Z]+$/.test(letter)
    );
};
//判断输入的字符是否为整数 
var isInteger = function isInteger(integer) {
    return isNumber(integer) && /^[-+]?\d*$/.test(integer);
};
//判断输入的字符是否为:a-z,A-Z,0-9  Username
var isUsername = function isUsername(name) {
    return (/^[a-zA-Z0-9_]+$/.test(name)
    );
};
//生成随机数
var randombetween = function randombetween(min, max) {
    return min + Math.random() * (max - min + 1);
};
// 数组去重
var unique = function unique(array) {
    return [].concat(_toConsumableArray(new Set(array)));
};
// 检测IP
var isIP = function isIP(ip) {
    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return exp.test(ip);
};
// 设置 cookie 值的函数
var setCookie = function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + encodeURIComponent(cvalue) + '; ' + expires;
};
// 获取 cookie 值的函数
var getCookie = function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length, c.length));
    }
    return '';
};
var isMobile = function isMobile(num) {
    return isNumber(num) && /^1[3|5|8]\d{9}$/.test(num);
};
var isTel = function isTel(num) {
    return isString(num) && /^0\d{2,3}-?\d{7,8}$/.test(num);
};
var hideMobile = function hideMobile(mobilenum) {
    return (mobilenum + '').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};
// 返回新的数组
var mergeArray = function mergeArray(array, obj, key) {
    return array.map(function (val) {
        if (val[key] === obj[key]) {
            val = obj;
        }
        return val;
    });
};
var each = function each(object, callback) {
    var type = function () {
        switch (object.constructor) {
            case Object:
                return 'Object';
                break;
            case Array:
                return 'Array';
                break;
            case NodeList:
                return 'NodeList';
                break;
            default:
                return 'null';
                break;
        }
    }();
    // 为数组或类数组时, 返回: index, value
    if (type === 'Array' || type === 'NodeList') {
        // 由于存在类数组NodeList, 所以不能直接调用every方法
        [].every.call(object, function (v, i) {
            return callback.call(v, v, i) === false ? false : true;
        });
    } else if (type === 'Object') {
        // 为对象格式时,返回:key, value
        for (var i in object) {
            if (callback.call(object[i], i, object[i]) === false) {
                break;
            }
        }
    }
};
var maxCountElement = function maxCountElement(arr) {
    var obj = {};
    arr.forEach(function (v) {
        obj[v] ? obj[v]++ : obj[v] = 1;
    });
    var maxCount = 0;
    var maxElement = arr[0];
    var eq = [];
    for (var key in obj) {
        if (maxCount < obj[key]) {
            maxCount = obj[key];
            maxElement = key;
            eq.length = 0;
        } else if (maxCount === obj[key]) {
            eq.push(key);
        }
    }
    if (eq.length > 0) {
        for (var j = 0; j < eq.length; j++) {
            maxElement = maxElement + '，' + eq[j];
        }
    }
    return {
        value: maxElement,
        index: maxCount
    };
};
// js截取两个字符串之间的内容：
var midstr = function midstr(str, head, back) {
    var reg = new RegExp(head + "(\\S*)" + back);
    return str.match(reg)[1];
};
// js截取某个字符串前面的内容：
var substartstr = function substartstr(str, back) {
    var reg = new RegExp("(\\S*)" + back);
    return str.match(reg)[1];
};
// js截取某个字符串后面的内容：
var subendstr = function subendstr(str, head, back) {
    var reg = new RegExp(head + "(\\S*)");
    return str.match(reg)[1];
};

Number.prototype.toFixed = function (n) {
    if (n > 20 || n < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    var number = this;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }
    if (typeof n == 'undefined' || n == 0) {
        return Math.round(number).toString();
    }
    var result = number.toString();
    var arr = result.split('.');
    // 整数的情况
    if (arr.length < 2) {
        result = result + '.';
        for (var i = 0; i < n; i++) {
            result = result + '0';
        }
        return result;
    }
    var integer = arr[0];
    var decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (var _i = 0; _i < n - decimal.length; _i++) {
            result = result + '0';
        }
        return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    var last = decimal.substr(n, 1);
    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
        var x = Math.pow(10, n);
        result = (Math.round(parseFloat(result) * x) + 1) / x;
        result = result.toFixed(n);
    }
    return result;
};

module.exports = {
    typeOf: typeOf,
    isArray: isArray,
    isFunction: isFunction,
    isNumber: isNumber,
    isObject: isObject,
    isBoolean: isBoolean,
    isString: isString,
    isUndefined: isUndefined,
    isNull: isNull,
    isNil: isNil,
    isEmpty: isEmpty,
    isEmail: isEmail,
    chechCHNCardId: chechCHNCardId,
    arrayMin: arrayMin,
    arrayMax: arrayMax,
    getURLParameters: getURLParameters,
    scrollToTop: scrollToTop,
    arrayAverage: arrayAverage,
    arraySum: arraySum,
    round: round,
    store: _store2.default,
    isChinese: isChinese,
    isDate: isDate,
    isDateTime: isDateTime,
    isTime: isTime,
    isLetter: isLetter,
    isInteger: isInteger,
    isUsername: isUsername,
    randombetween: randombetween,
    unique: unique,
    isIP: isIP,
    setCookie: setCookie,
    getCookie: getCookie,
    isMobile: isMobile,
    isTel: isTel,
    hideMobile: hideMobile,
    mergeArray: mergeArray,
    each: each,
    midstr: midstr,
    substartstr: substartstr,
    subendstr: subendstr
};