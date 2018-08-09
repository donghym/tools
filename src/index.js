"use strict";
// 检查各种类型
import store from 'store'
const isArray = o =>
    toString.call(o) === "[object Array]";
const isFunction = o =>
    toString.call(o) === "[object Function]";
const isNumber = o =>
    toString.call(o) === "[object Number]";
const isObject = o =>
    toString.call(o) === "[object Object]";
const isBoolean = o =>
    toString.call(o) === "[object Boolean]";
const isString = o =>
    toString.call(o) === "[object String]";
const isUndefined = o => o === undefined;
const isNull = o => o === null;

const isNil = o => o === undefined || o === null;
const isEmpty = o => o == null || !(Object.keys(o) || o).length;
const isObjectNull = o=> isObject(o) && JSON.stringify(o) == "{}" // 检测对象是否为空
const classtype = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Object]': 'object',
    '[object Error]': 'error'
}
const typeOf = (obj) => {
    if (obj === null) {
        return null + "";
    }
    return (typeof obj === "object" || typeof obj === "function") ?
        (classtype[toString.call(obj)] || "object") :
        typeof obj;
}
// 检测邮箱
const isZip = str => /^[1-9][0-9]{5}$/.test(str)

// 检测是否是 Email
//  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/  另一种方法
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
const isChinese = str => /^[\u0391-\uFFE5]+$/.test(str)
//判断日期类型是否为YYYY-MM-DD格式的类型 
const isDate = data => /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/.test(data);
//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 
const isDateTime = datatime => /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(datatime)
//判断日期类型是否为hh:mm:ss格式的类型 
const isTime = time => /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/.test(time);
//判断输入的字符是否为英文字母 
const isLetter = letter => /^[a-zA-Z]+$/.test(letter)
//判断输入的字符是否为整数 
const isInteger = integer => isNumber(integer) && /^[-+]?\d*$/.test(integer)
//判断输入的字符是否为:a-z,A-Z,0-9  Username
const isUsername = name => /^[a-zA-Z0-9_]+$/.test(name)
//生成随机数
const randombetween = (min, max) => min + (Math.random() * (max - min + 1));
// 数组去重
const unique = array => [...new Set(array)]
// 检测IP
const isIP = ip => {
    let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return exp.test(ip)
}
// 设置 cookie 值的函数
const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + encodeURIComponent(cvalue) + '; ' + expires;
}
// 获取 cookie 值的函数
const getCookie = (cname) => {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length, c.length));
    }
    return '';
}
const isMobile = (num) => isNumber(num) && /^1[3|5|8]\d{9}$/.test(num)
const isTel = (num) => isString(num) && /^0\d{2,3}-?\d{7,8}$/.test(num)
const hideMobile = (mobilenum) => (mobilenum + '').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
// 返回新的数组
const mergeArray = (array, obj, key) => array.map(val => {
    if (val[key] === obj[key]) {
        val = obj
    }
    return val
})
const each = (object, callback) => {
    const type = (function() {
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
    })();
    // 为数组或类数组时, 返回: index, value
    if (type === 'Array' || type === 'NodeList') { // 由于存在类数组NodeList, 所以不能直接调用every方法
        [].every.call(object, function(v, i) {
            return callback.call(v, v, i) === false ? false : true;
        });
    } else if (type === 'Object') { // 为对象格式时,返回:key, value
        for (var i in object) {
            if (callback.call(object[i], i, object[i]) === false) {
                break;
            }
        }
    }
}
const maxCountElement = (arr) => {
    let obj = {};
    arr.forEach(v => {
        obj[v] ? obj[v]++ : obj[v] = 1
    })
    let maxCount = 0;
    let maxElement = arr[0];
    let eq = [];
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
        for (let j = 0; j < eq.length; j++) {
            maxElement = maxElement + '，' + eq[j];
        }
    }
    return {
        value: maxElement,
        index: maxCount
    }
}
// js截取两个字符串之间的内容：
const midstr = (str, head, back) => {
    let reg = new RegExp(head + "(\\S*)" + back);
    return str.match(reg)[1]
}
// js截取某个字符串前面的内容：
const substartstr = (str, back) => {
    let reg = new RegExp("(\\S*)" + back);
    return str.match(reg)[1]
}
// js截取某个字符串后面的内容：
const subendstr = (str, head, back) => {
    let reg = new RegExp(head + "(\\S*)");
    return str.match(reg)[1]
}

Number.prototype.toFixed = function(n) {
    if (n > 20 || n < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    const number = this;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }
    if (typeof(n) == 'undefined' || n == 0) {
        return (Math.round(number)).toString();
    }
    let result = number.toString();
    const arr = result.split('.');
    // 整数的情况
    if (arr.length < 2) {
        result = result + '.';
        for (let i = 0; i < n; i++) {
            result = result + '0';
        }
        return result;
    }
    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (let i = 0; i < n - decimal.length; i++) {
            result = result + '0';
        }
        return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);
    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
        const x = Math.pow(10, n);
        result = (Math.round((parseFloat(result) * x)) + 1) / x;
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
    store: store,
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
}