/*
    global settings
*/
if (!console) {
    console = {
        log: function () { }
    }
}
Array.prototype.removeAt=function(index){ 
	this.splice(index,1); 
}

Array.prototype.shuffle = function () {
    for (var rnd, tmp, i = this.length; i; rnd = parseInt(Math.random() * i), tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp)
        ;
    return this;
}
String.prototype.overflow = function (num) {
    if (this.length > num) {
        return this.substring(0, num) + '...';
    } else {
        return this.toString();
    }
}

String.prototype.overflowNoPoint = function (num) {
    if (this.length > num) {
        return this.substring(0, num);
    } else {
        return this.toString();
    }
}

if (!global_config) {
    var global_config = {};
}

var global = $.extend(global_config, {
	"version" : "v1.04.06",
    "ajaxstate":true,
    "counting": 0,
    "getToken": function () {
        return global.getUser().token;
    },
    "defaultIfBlack" : function(str, value){
    	if(str === undefined || str == null){
    		if(value){
    			return value;
    		} else {
    			return "";
    		}
    	} else {
    		return str;
    	}
    },
    "getUserId": function () {
        return global.getUser().userId;
    },
    "login": function (data, remember) {
        var opt = {};
        if (remember) {
            opt.expires = 365;
            data.remember = remember;
        } else {
            opt.expires = 1;
        }
        $.cookie("user", JSON.stringify(data), opt);
    },
    "logout":function(){
        $.cookie("user","");
    },
    "getUser": function () {
        if ($.cookie("user")) {
            return JSON.parse($.cookie("user"));
        } else {
            return {};
        }
    },
    "isLogin": function () {
        return global.getUserId() !== undefined;
    },
    "getContextPath" : function(){
   	 var pathName = document.location.pathname;
     var index = pathName.substr(1).indexOf("/");
     var result = pathName.substr(0,index+1);
     return result;
    },
    "status": {
       "success": 200
    },
    "isChinese" : function(txt){
		var reg = /^[\u4E00-\u9FA5]+$/;
		return reg.test(txt);
	},
    "imgsrc": function (id, opt) {
    	var url = global.server+'/api/image/'+id + "?";
    	for(var p in opt){
    		var param = p + "=" + opt[p] +"&";
    		url += param;
    	}
        return url.substring(0, url.length-1);
    },
    "clen": function (str) {
        str = str + "";
        return str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length;
    },
    "encode": function (unencoded) {
        return encodeURIComponent(unencoded).replace(/'/g, "%27").replace(/"/g, "%22");
    },
    "decode": function (encoded) {
        return decodeURIComponent(encoded.replace(/\+/g, " "));
    },
    "htmlEncode": function (html) {
        if (html && html.length > 0)
            return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/\n/g, "<br>");
        else
            return "";
    },
    "htmlDecode": function (text) {
        if (text && text.length > 0)
            return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace("<br>", "\n");
        else
            return "";
    },
    "fromNow": function (aTime) {
        var pattern = /^[1-9]\d*|0$/; //匹配非负整数
        var timeObj = "";
        // console.log(moment.locale())
        if (pattern.test(aTime)) {
//            timeObj = moment().subtract(aTime, 'seconds').toNow();
        	if(aTime < 60){
//        		console.log(aTime)
        		timeObj = '1分钟后';
        	} else if(aTime < 60*60){
//        		console.log((aTime/60))
        		timeObj = parseInt((aTime/60)) + '分钟后';
        	} else if(aTime < 24*60*60){
//        		console.log((aTime/60/60))
        		timeObj = parseInt((aTime/60/60)) + '小时后';
        	} else {
//        		console.log((aTime/24/60/60))
        		timeObj = parseInt((aTime/24/60/60)) + '天后';
        	}
        }
        return timeObj;
    },
    "uuid4": function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },
    "uuid": function () {
        return global.uuid4() + global.uuid4() + '-' + global.uuid4() + '-' + global.uuid4() + '-' +
            global.uuid4() + '-' + global.uuid4() + global.uuid4() + global.uuid4();
    },
    "uuid8": function () {
        return global.uuid4() + global.uuid4();
    },
    "uuid16": function () {
        return global.uuid4() + global.uuid4() + global.uuid4() + global.uuid4();
    },
    Base64: {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = global.Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },

        // public method for decoding
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = global.Base64._utf8_decode(output);

            return output;

        },

        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }
    }

});

global.changeHead = function (imageId) {
    var user = global.getUser();
    user.userHead = imageId;
    global.login(user, user.remember);
}

global.remindLogin = function () {
    var currentPage = window.location.href.split("/").pop();
    if (!global.isLogin() && currentPage!="index.htm") {
        location.href =global.getContextPath() + '/login.htm';
    }
}

global.uploadStart = function () {
    var src = global.getContextPath() +'/img/loading.gif';
    $('<div class="uploading-overlay"><img src='+src+'></div>').appendTo('body');
    $('.uploading-overlay').css({
        'display': 'block',
        'opacity': '0.5'
    });
};

global.uploadEnd = function () {
    $('.uploading-overlay').css({
        'display': 'none',
        'opacity': '0'
    }).remove();
};

global.trimkeywords = function (keywords) {
    keywords = keywords.replace(/(^\s+)|(\s+$)/g, "");
    return keywords;
};
global.QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();

//bind onclick,change...action function
global.coffee = function(obj){
    for( i in obj){
        var obj_s = obj[i];
        for( j in obj_s){
            if(typeof obj_s[j] === "function"){
                $(document).on(i,j,obj_s[j]);
            }
        }
    }
};

//filter 省市自治区等后缀
global.filterWord = function(name){
    if(name.indexOf("省")>0){
        return name.replace("省","");
    }else if(name.indexOf("市")>0){
        return name.replace("市","");
    }else if(name.indexOf("壮族自治区")>0){
        return name.replace("壮族自治区","");
    }else if(name.indexOf("回族自治区")>0){
        return name.replace("回族自治区","");
    }else if(name.indexOf("维吾尔自治区")>0){
        return name.replace("维吾尔自治区","");
    }else if(name.indexOf("自治区")>0){
        return name.replace("自治区","");
    }
}

global.doLogin = function(username,password,callback){
	// password = $.md5_32(password);
    var url = "/api/account/login";
    if (username!='' && password!='') {
        var data = {};
        data.telphone = username;
        data.password = password;
        data.deviceType = '01';//web端
        data.source = '02';//运势界
        $.ajax({
            type: "post",
            url: global.server + url,
            data: data,
            async: true,
            success: function(msg) {
            	if (msg && msg.status && msg.status.statusCode == global.status.success) {
    				var user = msg.data;
    				user.userId = user.accountId;
					global.login(user, true);
                    var url = global.getContextPath() + "/index.htm";
					setTimeout('location.href="'+ url+'"' , 50);
                } else if(msg.status.statusCode != global.status.success){
                	callback(msg.status);
                }
            }
        });
    }
};

global.Logout = function(){
    var url = "/api/account/logout",data={};
    data.deviceType ="01";
    $.post(global.server + url,data,function(msg){
        if (msg && msg.status && msg.status.statusCode == global.status.success) {
            global.logout();
            var url = global.getContextPath() + "/index.htm";
            setTimeout('location.href="'+ url+'"', 50);
        }
    })
};


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


if(global.getUserId()){
	$.ajaxSetup({
	    headers: {
	        'Authorization': global.getUserId() + ':' + global.getToken()
	    },
	    cache: false,
	});
}

$.ajaxSetup({
	timeout : 20000,
	error : function(xhr, status, e) {
		if (xhr.status == 403) {
			$.removeCookie("user");
			global.remindLogin();
		} else {

		}
	},
	beforeSend: function () {
        if(global.ajaxstate){
            global.uploadStart();
        }
        return global.ajaxstate; 
    },
    complete: function (obj,status) {
        if(status == 'error'){
            if(obj.statusText == "Forbidden" && window.location.href.split("/").pop()!="index.htm"){
                global.uploadEnd();
                global.counting++;
                if (global.counting == 1) {
                    alert("您的帐号已经被登出");
                }
                global.ajaxstate = false;
                return false;
            }
            global.uploadEnd();
            global.ajaxstate = false;
        }else if(status == 'timeout'){
            global.uploadEnd();
            global.counting++;
            if (global.counting == 1) {
                alert("网络超时");
            }
            global.ajaxstate = false;
        }
        global.uploadEnd();
    }
});

if(typeof Datepicker === "function"){
	Datepicker.language['zh-cn'] = {
	    days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    daysMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    today: '今天',
	    clear: '清除',
	    dateFormat: 'yyyy-mm-dd',
	    firstDay: 0
	};
}


$("<input type='hidden' id='_temp_location'/>").val(location.href).appendTo($("body"));

$(function(){
	console.log("current versoin : "+global.version);
});