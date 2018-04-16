"use strict";
// 检查各种类型

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = exports.setCookie = undefined;

var _store = require("store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = function isArray(o) {
  return Object.prototype.toString.call(o) === "[object Array]";
};
var isFunction = function isFunction(o) {
  return Object.prototype.toString.call(o) === "[object Function]";
};
var isNumber = function isNumber(o) {
  return Object.prototype.toString.call(o) === "[object Number]";
};
var isObject = function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
};
var isBoolean = function isBoolean(o) {
  return Object.prototype.toString.call(o) === "[object Boolean]";
};
var isString = function isString(o) {
  return Object.prototype.toString.call(o) === "[object String]";
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
// 检测是否是 Email
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
var setCookie = exports.setCookie = function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + encodeURIComponent(cvalue) + '; ' + expires;
};
// 获取 cookie 值的函数
var getCookie = exports.getCookie = function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length, c.length));
  }
  return '';
};

module.exports = {
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
  getCookie: getCookie
};