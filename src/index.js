"use strict";
import store from 'store'
const _IS = { // 检查各种类型
  array: o => toString.call(o) === "[object Array]",
  function: o => toString.call(o) === "[object Function]",
  number: o => toString.call(o) === "[object Number]",
  object: o => toString.call(o) === "[object Object]",
  boolean: o => toString.call(o) === "[object Boolean]",
  string: o => toString.call(o) === "[object String]",
  undefinrd: o => o === undefined,
  null: o => o === null,
  nil: o => o === undefined || o === null,
  empty: o => o == null || !(Object.keys(o) || o).length,
  objnull: o => isObject(o) && JSON.stringify(o) == "{}" // 检测对象是否为空
}
const _TypeOf = (obj) => {
  let classtype = {
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
  if (obj === null) return null + ""
  return (typeof obj === "object" || typeof obj === "function") ?
    (classtype[toString.call(obj)] || "object") :
    typeof obj;
}

const _Url = { //参数：变量名，url为空则表从当前页面的url中取
  getQuery: (url, name) => {
    let u = arguments[1] || window.location.search,
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("?") + 1).match(reg);
    return r != null ? r[2] : "";
  },
  getParameters: (url) => {
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
  },
  getHash: (url, name) => { //# 获取 hash值
    let u = arguments[1] || location.hash;
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = u.substr(u.indexOf("#") + 1).match(reg);
    if (r != null) {
      return r[2];
    }
    return "";
  },
  parse: (url) => { //# 解析URL
    let a = document.createElement('a');
    url = url || location.href;
    a.href = url;
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      file: (a.pathname.match(/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    };
  }
}
const _Number = {
  isInteger: (num) => parseInt(num, 10) === num, // 判断是不是整数
  round: (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`), // 将数字四舍五入到指定的位数。
  randombetween: (min, max) => min + (Math.random() * (max - min + 1)), // 生成随机数
  prefixInteger: (num, n) => (Array(n).join(0) + num).slice(-n), // js 数字前面自动补零
}
const _String = {
  mid: (str, head, back) => { // js截取两个字符串之间的内容
    let reg = new RegExp(head + "(\\S*)" + back);
    return str.match(reg)[1]
  },
  start: (str, back) => { // js截取某个字符串前面的内容
    let reg = new RegExp("(\\S*)" + back);
    return str.match(reg)[1]
  },
  end: (str, head) => { // js截取某个字符串后面的内容
    let reg = new RegExp(head + "(\\S*)");
    return str.match(reg)[1]
  }
}
const _Array = {
  num: { // 纯数字
    min: arr => Math.min(...arr),
    max: arr => Math.max(...arr),
    average: arr => arr.reduce((acc, val) => acc + val, 0) / arr.length, // 返回数组的平均值
    sum: arr => arr.reduce((acc, val) => acc + val, 0), // 返回一个数字数组的总和
  },
  str: { // 字符串
    unique: arr => [...new Set(arr)], // 去重
    maxCountElement: (arr) => {
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
  },
  obj: { // 对象
    cartesianProductOf: () => { // 笛卡尔积 简单实现
      return Array.prototype.reduce.call(arguments, function(a, b) {
        let ret = [];
        a.forEach(function(a) {
          b.forEach(function(b) {
            ret.push(a.concat([b]));
          });
        });
        return ret;
      }, [
        []
      ]);
    }
  },
  combine: (arr) => { // 生成笛卡尔积数组
    let r = [];
    (function f(t, a, n) {
      if (n == 0) return r.push(t);
      for (var i = 0; i < a[n - 1].length; i++) {
        f(t.concat(a[n - 1][i]), a, n - 1);
      }
    })([], arr, arr.length);
    r = r.map(v => {
      let obj = {}
      v.map(val => {
        obj = Object.assign(obj, val)
      })
      return obj
    })
    return r;
  },
  unique: (arr, key) => { // 数组对象根据key合并
    var hash = {};
    return arr.reduce(function(item, next) {
      hash[next[key]] ? '' : hash[next[key]] = 1 && item.push(next);
      return item;
    }, []);
  },
  merge: (arr, obj, key) => arr.map(val => { // 返回新的数组
    if (val[key] === obj[key]) {
      val = obj
    }
    return val
  })
}
const _Cookie = { //# Cookie
  enable: !!navigator.cookieEnabled,
  get: (name) => { //#读取 cookie
    let reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
      val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]) : "") : '';
  },
  set: (name, value, expires, path, domain, secure) => { //# 写入 cookie
    let exp = new Date();
    var expires = arguments[2] || null,
      path = arguments[3] || "/",
      domain = arguments[4] || null,
      secure = arguments[5] || false;
    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
    document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  },
  del: (name, path, domain, secure) => { //#删除 cookie
    let value = $getCookie(name);
    if (value != null) {
      let exp = new Date();
      exp.setMinutes(exp.getMinutes() - 1000);
      path = path || "/";
      document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    }
  }
};
const _Screen = {
  enter: () => { // 进入全屏
    let elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen()
    } else if (elem.msRequestFullscreen) {
      // elem.msRequestFullscreen() 没有指定元素
      document.body.msRequestFullscreen()
    }
  },
  exit: () => { // 退出全屏
    let doc = document
    if (doc.exitFullscreen) {
      doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen()
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen()
    }
  }
}
let _RegExp = {
  exp: {
    mobile: /^1[3|5|8]\d{9}$/,
    mobile2: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
    tel: /^0\d{2,3}-?\d{7,8}$/,
    username: /^[a-zA-Z0-9_]+$/, // /^[a-zA-Z0-9_-]{4,16}$/
    password: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, // 密码强度
    pos: /^\d+$/, // 正整数
    neg: /^-\d+$/, // 负整数
    integer: /^[-+]?\d*$/, // 整数 // /^-?\d+$/;
    posn: /^\d*\.?\d+$/, //正数
    negn: /^-\d*\.?\d+$/, //负数
    number: /^-?\d*\.?\d+$/, //数字
    url: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    letter: /^[a-zA-Z]+$/, // 英文字母
    time: /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, //判断日期类型是否为hh:mm:ss格式的类型
    datetime: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, // 判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型
    date: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/, // 日期
    data1: /^\d{4}(\-)\d{1,2}\1\d{1,2}$/, // 日期
    data3: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
    chinese: /^[\u0391-\uFFE5]+$/, // 中文
    QQ: /^[1-9][0-9]{4,10}$/,
    carid: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    wx: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, // 微信
    IP: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    email2: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    email3: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    cardId: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, // 身份证
    cardId2: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/ //身份证
  },
  is: function(exp, val) {
    let role = this.exp;
    console.log(exp);
    return role[exp] && role[exp].test(val)
  }
}
let _Browser = { //#浏览器
  browsers: { //# 浏览器内核类别
    weixin: /micromessenger(\/[\d\.]+)*/, //微信内置浏览器
    mqq: /mqqbrowser(\/[\d\.]+)*/, //手机QQ浏览器
    uc: /ucbrowser(\/[\d\.]+)*/, //UC浏览器
    chrome: /(?:chrome|crios)(\/[\d\.]+)*/, //chrome浏览器
    firefox: /firefox(\/[\d\.]+)*/, //火狐浏览器
    opera: /opera(\/|\s)([\d\.]+)*/, //欧朋浏览器
    sougou: /sogoumobilebrowser(\/[\d\.]+)*/, //搜狗手机浏览器
    baidu: /baidubrowser(\/[\d\.]+)*/, //百度手机浏览器
    360: /360browser([\d\.]*)/, //360浏览器
    safari: /safari(\/[\d\.]+)*/, //苹果浏览器
    ie: /msie\s([\d\.]+)*/ // ie 浏览器
  },
  addFav: function(url, title, errCall) { //#加入收藏夹 //@errCall : 错误回调
    try {
      window.external.addFavorite(url, title);
    } catch (e) {
      try {
        window.sidebar.addPanel(title, url, '');
      } catch (e) {
        errCall();
      }
    }
  },
  coreInit: function() { //浏览器版本
    var i = null,
      browsers = this.browsers,
      ua = window.navigator.userAgent.toLowerCase(),
      brower = '',
      pos = 1;
    for (i in browsers) {
      if (brower = ua.match(browsers[i])) {
        if (i == 'opera') {
          pos = 2;
        } else {
          pos = 1;
        }
        this.version = (brower[pos] || '').replace(/[\/\s]+/, '');
        this.core = i;
        return i;
      }
    }
  },
  ie: (function() { //# 检测IE版本 ！仅支: ie5,6,7,8,9
    let v = 3,
      div = document.createElement('div'),
      all = div.getElementsByTagName('i');
    while (
      div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
      all[0]
    );
    return v > 4 ? v : false;
  })(),
  isWebkit: /webkit/i.test(navigator.userAgent)
};

Number.prototype.toFixed = function(n) {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  let number = this;
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof(n) == 'undefined' || n == 0) {
    return (Math.round(number)).toString();
  }
  let result = number.toString();
  let arr = result.split('.');
  // 整数的情况
  if (arr.length < 2) {
    result = result + '.';
    for (let i = 0; i < n; i++) {
      result = result + '0';
    }
    return result;
  }
  let integer = arr[0];
  let decimal = arr[1];
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
  let last = decimal.substr(n, 1);
  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    let x = Math.pow(10, n);
    result = (Math.round((parseFloat(result) * x)) + 1) / x;
    result = result.toFixed(n);
  }
  return result;
};
// 返回顶部
const scrollToTop = () => {
  let c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
const each = (object, callback) => {
  let type = (function() {
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
const hideMobile = (mobile) => (mobile + '').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

module.exports = {
  store: store, // localStorage 操作
  _IS: _IS, // 检测数据类型
  _TypeOf: _TypeOf, // jquery 检测数据类型
  _Url: _Url, // URL
  _Number: _Number, // 数字
  _String: _String, // 字符串
  _Array: _Array, // 数组
  _Cookie: _Cookie, // cookie
  _Screen: _Screen, // 屏幕
  _RegExp: _RegExp, // 正则
  _Browser: _Browser, // 浏览器
  scrollToTop: scrollToTop,
  each: each,
  hideMobile: hideMobile
}