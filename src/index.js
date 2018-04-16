"use strict";
// 检查各种类型
import store from 'store'
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
const isNull = o => o === null;
const isNil = o => o === undefined || o === null;
const isEmpty = o => o == null || !(Object.keys(o) || o).length;
// 检测是否是 Email
const isEmail = str =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
// 检查身份证  
// 可输入字符串活数字 因最后一个字母可能是数字或是x
const chechCHNCardId = cardId => {
  return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(cardId)
}
// 计算最小值 最大值
const arrayMin = arr => Math.min(...arr);
const arrayMax = arr => Math.max(...arr); // 获取url参数
const getURLParameters = () => {
  let reg_url = /^[^\?]+\?([\w\W]+)+\#([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(location.href),
    ret = {};
  if (arr_url && arr_url[1]) {
    let str_para = arr_url[1],
      result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
}
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
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
//判断输入的字符是否为中文 
const IsChinese = str => /^[\u0391-\uFFE5]+$/.test(str)
//判断日期类型是否为YYYY-MM-DD格式的类型 
const IsDate = data => /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/.test(data);
//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 
const IsDateTime = datatime => /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(datatime)
//判断日期类型是否为hh:mm:ss格式的类型 
const IsTime = time => /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/.test(time);
//判断输入的字符是否为英文字母 
const IsLetter = letter => /^[a-zA-Z]+$/.test(letter)
//判断输入的字符是否为整数 
const IsInteger = integer => isNumber(integer) && /^[-+]?\d*$/.test(integer)
//判断输入的字符是否为:a-z,A-Z,0-9  Username
const IsUsername = name => /^[a-zA-Z0-9_]+$/.test(name)
//生成随机数
const randombetween = (min, max) => min + (Math.random() * (max - min + 1));
// 数组去重
const unique = array => [...new Set(array)]
// 检测IP
const isIP = ip => {
  let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return exp.test(ip)
}
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
  store: store,
  IsChinese: IsChinese,
  IsDate: IsDate,
  IsDateTime: IsDateTime,
  IsTime: IsTime,
  IsLetter: IsLetter,
  IsInteger: IsInteger
  IsUsername: IsUsername,
  randombetween: randombetween,
  unique: unique,
  isIP: isIP
}