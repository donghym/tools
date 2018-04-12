"use strict";
// 检查各种类型
const isArray = o =>
  Object.prototype.toString.call(o) === "[object Array]";
const isFunction = o =>
  Object.prototype.toString.call(o) === "[object Function]";
const isNumber = o =>
  Object.prototype.toString.call(o) === "[object Number]";
const isObject = o =>
  Object.prototype.toString.call(o) === "[object Object]";
const isBoolean = o =>
  Object.prototype.toString.call(o) === "[object Boolean]";
const isString = o =>
  Object.prototype.toString.call(o) === "[object String]";
const isUndefined = o => o === undefined;
//   Object.prototype.toString.call(o) === "[object Undefined]";
const isNull = o => o === null;
//   Object.prototype.toString.call(o) === "[object Null]";
const isNil = o => o === undefined || o === null;
const isEmpty = o => o == null || !(Object.keys(o) || o).length;
// 检测是否是 Email
const isEmail = str =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
  
// 计算最小值 最大值
const arrayMin = arr => Math.min(...arr);
const arrayMax = arr => Math.max(...arr);
// 检查身份证
const chechCHNCardId = sNo => {
  if (!this.regExpTest(sNo, /^[0-9]{17}[X0-9]$/)) {
    return false;
  }
  sNo = sNo.toString();
  var a, b, c;
  a =
    parseInt(sNo.substr(0, 1)) * 7 +
    parseInt(sNo.substr(1, 1)) * 9 +
    parseInt(sNo.substr(2, 1)) * 10;

  a =
    a +
    parseInt(sNo.substr(3, 1)) * 5 +
    parseInt(sNo.substr(4, 1)) * 8 +
    parseInt(sNo.substr(5, 1)) * 4;
  a =
    a +
    parseInt(sNo.substr(6, 1)) * 2 +
    parseInt(sNo.substr(7, 1)) * 1 +
    parseInt(sNo.substr(8, 1)) * 6;
  a =
    a +
    parseInt(sNo.substr(9, 1)) * 3 +
    parseInt(sNo.substr(10, 1)) * 7 +
    parseInt(sNo.substr(11, 1)) * 9;
  a =
    a +
    parseInt(sNo.substr(12, 1)) * 10 +
    parseInt(sNo.substr(13, 1)) * 5 +
    parseInt(sNo.substr(14, 1)) * 8;
  a = a + parseInt(sNo.substr(15, 1)) * 4 + parseInt(sNo.substr(16, 1)) * 2;
  b = a % 11;
  if (b == 2) {
    c = sNo.substr(17, 1).toUppercase();
  } else {
    c = parseInt(sNo.substr(17, 1));
  }
  switch (b) {
    case 0:
      if (c != 1) {
        return false;
      }
      break;
    case 1:
      if (c != 0) {
        return false;
      }
      break;
    case 2:
      if (c != "X") {
        return false;
      }
      break;
    case 3:
      if (c != 9) {
        return false;
      }
      break;
    case 4:
      if (c != 8) {
        return false;
      }
      break;
    case 5:
      if (c != 7) {
        return false;
      }
      break;
    case 6:
      if (c != 6) {
        return false;
      }
      break;
    case 7:
      if (c != 5) {
        return false;
      }
      break;
    case 8:
      if (c != 4) {
        return false;
      }
      break;
    case 9:
      if (c != 3) {
        return false;
      }
      break;
    case 10:
      if (c != 2) {
        return false;
      }
  }
  return true;
};
// 返回URL中的paramer 
const getURLParameters = url =>
    url.match(/([^?=&]+)(=([^&]*))/g).reduce(
        (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
    );
// 返回顶部
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};
// 返回数组的平均值
const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// 返回一个数字数组的总和
const arraySum = arr => arr.reduce((acc, val) => acc + val, 0);
// 将数字四舍五入到指定的位数。
const round = (n, decimals=0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
exports.isArray = isArray
exports.isFunction = isFunction
exports.isNumber = isNumber
exports.isObject = isObject
exports.isBoolean = isBoolean
exports.isString = isString
exports.isUndefined = isUndefined
exports.isNull = isNull
exports.isNil = isNil
exports.isEmpty = isEmpty
exports.isEmail = isEmail
exports.arrayMin = arrayMin
exports.arrayMax = arrayMax
exports.chechCHNCardId = chechCHNCardId
exports.getURLParameters = getURLParameters
exports.scrollToTop = scrollToTop
exports.arrayAverage = arrayAverage
exports.arraySum = arraySum
exports.round = round