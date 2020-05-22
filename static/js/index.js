var msgData = [
    '每天看着励志的语录却过着颓废的人生',
    /* '懦弱是会传染的，并且，勇气也会', */
    '如果生活还没能改变你，那你已经失败了',
    '没时间是最无力的借口',
    /* '放下~简单两个字，寥寥十一笔', */
    /* '有勇气，有担当是好事，有能力才是前提', */
    /* '充满希望的旅途胜过终点的到达', */
    '努力到无能为力，拼搏到感动自己',
    '就怕一生碌碌无为，还安慰自己平凡可贵',
    /* '人生不能太过圆满，求而不得未必是遗憾', */
    '如果不坚强，流泪给谁看',
    '这个世界上没有天才，只有不努力的笨蛋',
    '心之所向，素履以往，生如逆旅，一苇以航',
    '何必为昨天的泪，打湿今天的阳光',
    '人生没有白走的路，每一步都算数',
    '很多时候，不怕万人阻挡，只怕自己投降',
    /* '看不透是可惜的，看透了是可悲的', */
    '不管多么痛苦，都不要逃往轻松的一边',
    '别在最能吃苦的年纪选择了安逸',
    '没有未来的未来不是我想要的未来',
    '愿你出走半生，归来仍是少年'
]

// PC端返回false
function isMobile() {
    var viewType = navigator.userAgent.toLowerCase();
    // console.log(viewType);
    return viewType.match(/(phone|pad|pod|midp|iphone|ipod|iphone os|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|rv:1.2.3.4|ucweb|fennec|wosbrowser|browserng|webos|symbian|windows ce|windows mobile|windows phone)/i);
}

if (isMobile()) {
    // 加载雪花
    html2canvas([document.body], {
        onrendered: function(e) {
            try {
                var snow = detectEdge(e);
                snow.flakeCount = 5, Snowflakes.init(snow);
            } catch (err) {
                console.log('[Error] Snow is not defined.');
            }
        }
    });
    // 隐藏wenkmPlayerc
    document.getElementById('wangPlayer').style.display = 'none';
    // 加载APlayer
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        lrcType: 3,
        order: 'random',
        theme: '#000000',
        volume: 2.0,
        audio: getLove()
    });
} else {
    // 加载雪花
    html2canvas([document.body], {
        onrendered: function(e) {
            try {
                var snow = detectEdge(e);
                snow.flakeCount = 30, Snowflakes.init(snow);
            } catch (err) {
                console.log('[Error] Snow is not defined.');
            }
        }
    });
    // 加载Live2D
    try {
        $('body').append('<style>.waifu-tool span{display:block;cursor:pointer;color:#f3f9f1;transition:.2s}</style><div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
        /* 可直接修改部分参数 */
        live2d_settings['modelId'] = 6;                  // 默认模型 ID
        live2d_settings['modelTexturesId'] = 2;         // 默认材质 ID
        live2d_settings['modelStorage'] = false;         // 不储存模型 ID
        live2d_settings['canTurnToHomePage'] = false;    // 隐藏 返回首页 按钮
        live2d_settings['waifuEdgeSide'] = 'right:30';   // 看板娘贴边方向
        live2d_settings['aboutPageUrl'] = 'https://github.com/fghrsh/live2d_demo';   // 关于页地址
        live2d_settings['hitokotoAPI'] = 'hitokoto.cn';
        /* 在 initModel 前添加 */
        initModel("https://cdn.jsdelivr.net/gh/wliduo/Mark@master/assets/live2d/waifu-tips.json?v=1.4.2");

        // 隐藏APlayer
        document.getElementById('aplayer').style.display = 'none';
        // 加载wenkmPlayerc
        $.ajax({url: 'https://cdn.jsdelivr.net/gh/wliduo/Mark@master/assets/wenkmPlayer/js/player.js?v=123', dataType:"script", cache: true, async: false});
    } catch(err) {
        console.log('[Error] JQuery is not defined.')
    } finally {
        $(window).load(function () {
            wenkmTips.show('欢迎访问我的小破站');
            $("div[class='switch-player']")[0].click();
        });
    }
}

// 加载.....显示
var i = 0;
function myTimer() {
    if (i == 0) {
        document.getElementById("load").innerHTML = "";
    } else if (i == 1) {
        document.getElementById("load").innerHTML = ".";
    } else if (i == 2) {
        document.getElementById("load").innerHTML = "..";
    } else if (i == 3) {
        document.getElementById("load").innerHTML = "...";
    } else if (i == 4) {
        document.getElementById("load").innerHTML = "....";
    } else if (i == 5) {
        document.getElementById("load").innerHTML = ".....";
    }
    i++;
    if (i > 5) {
        i = 0;
    }
}

/**
 * 取地址栏参数
 * @param {*} name 
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * 获取CSS属性
 * @param {*} element 
 * @param {*} attr 
 */
function getStyle(element, attr) {
    if(element.currentStyle) {
        return element.currentStyle[attr];
    } else {
        return getComputedStyle(element, false)[attr];
    }
}

var btnClassArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * 刷新按钮
 */
function switchBtnClass() {
    // 根据秒数显示音乐还是书签
    var secondsTemp = new Date().getSeconds();
    if (secondsTemp % 2 == 0) {
        $('#btn-7').html("书签");
        // https://dolyw.com/load?url=https://mark.dolyw.com
        $('#btn-7').parent("a").attr("href", "https://dolyw.com/go?url=https://mark.dolyw.com");
    } else {
        $('#btn-7').html("友链");
        $('#btn-7').parent("a").attr("href", "https://dolyw.com/go?url=https://friend.dolyw.com");
    }
    // 切换按钮颜色
    var btnClassIndex = 1;
    for (var btnIndex = 1; btnIndex <= 8; btnIndex++) {
        btnClassIndex = Math.floor(btnClassArray.length * Math.random());
        // console.log(btnClassArray[btnClassIndex]);
        $('#btn-' + btnIndex).removeClass().addClass("btn-" + btnClassArray[btnClassIndex]);
        // 移除当前坐标数据
        btnClassArray.splice(btnClassIndex, 1);
    }
    // 初始化
    btnClassArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}


var randomIndex = 0;
// 刷新随机数
function switchRandomIndex() {
    // 随机数不会和上一次重复，如果获取和上一次相同就重新获取，直到不同为止
    var index = Math.floor(msgData.length * Math.random());
    while (randomIndex == index) {
        index = Math.floor(msgData.length * Math.random());
        // console.log(this.randomIndex + ',' + index);
    }
    randomIndex = index
}

// API接口
var api = "https://bing.ioliu.cn/v1";
var api2 = "https://bing.ioliu.cn/v1/rand";
var api3 = "https://cn.bing.com/cnhp/coverstory";
var size = "?h=1080&w=1920";
var d = 0;

// Bing壁纸加速接口
var bingPic = {};

// 初始化后切换背景
function switchBack() {
    // d = Math.floor(1000 * Math.random());
    var temp = new Image();
    // temp.src = api + size + "&d=" + d;
    bingPic = getPic(false);
    temp.src = bingPic.url;
    temp.onload = function () {
        var mySwitchBack = setTimeout(function fn() {
            // document.getElementById('bg').style.backgroundImage = "url(" + api + size + "&d=" + d + ")";
            document.getElementById('bg').style.backgroundImage = "url(" + bingPic.url + ")";
            $("#bg").hide().fadeIn(1000);
            document.getElementById('logo').title = bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright;
            $("#photoMsg").hide();
            switchRandomIndex();
            document.getElementById('photoMsg').innerHTML = msgData[randomIndex];
            $("#photoMsg").fadeIn(1000);
            document.getElementById('photoMsg').title = bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright;
            if (!isMobile()) {
                wenkmTips.show(bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright);
            }
            clearTimeout(mySwitchBack);
            switchBtnClass();
            switchBack();
        }, 8888);
    }
}

// 初始化加载Bing每日图片，查看秒数个位为0，3，7或者地址栏有rand参数便随机获取背景图，其他获取当日图片
/* try {
    // 如果屏幕小就加载竖屏
    if(getStyle(document.getElementById("size"), "fontSize") == '12px') {
        // console.log(getStyle(document.getElementById("size"), "fontSize"));
        size = "?h=1920&w=1080";
    }
    // var url = api + size;
    var date = new Date();
    var seconds = date.getSeconds();
    String(seconds).length < 2 ? (seconds = "0" + seconds) : seconds;
    // console.log(seconds);
    seconds = seconds.toString().substring(1, 2);
    // console.log(seconds);
    if (seconds == 0 || seconds == 3 || seconds == 7 || getQueryString("rand")) {
        // url = api2 + size;
        bingPic = getPic(true);
        document.getElementById("msg").innerHTML = "背景切换中";
    } else {
        bingPic = getPic(false);
        document.getElementById("msg").innerHTML = "背景加载中";
    }
    var myVar = setInterval("myTimer()", 400);
    var img = new Image();
    // img.src = url;
    img.src = bingPic.url;
    img.onload = function () {
        // document.getElementById('bg').style.backgroundImage = "url(" + url + ")";
        document.getElementById('bg').style.backgroundImage = "url(" + bingPic.url + ")";
        $("#bg").hide().fadeIn(1000);
        document.getElementById('logo').title = bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright;
        $("#photoMsg").hide();
        switchRandomIndex();
        document.getElementById('photoMsg').innerHTML = msgData[randomIndex];
        $("#photoMsg").fadeIn(1000);
        document.getElementById('photoMsg').title = bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright;
        document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
        clearInterval(myVar);
        switchBtnClass();
        switchBack();
    }
} catch(err) {
    switchRandomIndex();
    document.getElementById('photoMsg').innerHTML = msgData[randomIndex];
    document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
    clearInterval(myVar);
    switchBack();
} finally {
    
} */

// 获取当前时间
var date = new Date();
var seconds = date.getSeconds();
// String(seconds).length < 2 ? (seconds = "0" + seconds) : seconds;

try {
    document.getElementById("msg").innerHTML = "背景加载中";
    var img = new Image();
    var imgUrl = 'https://cdn.jsdelivr.net/gh/wliduo/CDN@master/wallpaper/201911/20191101005.jpg';
    if (seconds % 2 == 0) {
        imgUrl = 'https://cdn.jsdelivr.net/gh/wliduo/CDN@master/wallpaper/201911/20191107005.jpg';
    }
    if (seconds % 5 == 0) {
        imgUrl = 'https://cdn.jsdelivr.net/gh/wliduo/CDN@master/wallpaper/201911/20191107010.jpg';
    }
    img.src = imgUrl;
    img.onload = function () {
        /* document.getElementById('bg').style.backgroundImage = "url(" + imgUrl + ")";
        $("#bg").hide().fadeIn(1000); */
        $("#bg").hide()
        document.getElementById('bg').style.backgroundImage = "url(" + imgUrl + ")";
        $("#bg").fadeIn(1000);
        $("#photoMsg").hide();
        switchRandomIndex();
        document.getElementById('photoMsg').innerHTML = msgData[randomIndex];
        $("#photoMsg").fadeIn(1000);
        document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
        switchBtnClass();
    }
} catch(err) {
    switchRandomIndex();
    document.getElementById('photoMsg').innerHTML = msgData[randomIndex];
    document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
    switchBtnClass();
} finally {
    
}

var switchFlag = false;
function switchBing() {
    if (switchFlag) {
        if (!isMobile()) {
            wenkmTips.show('正在切换请稍后');
        }
        return false;
    }
    switchFlag = true;
    if (!isMobile()) {
        wenkmTips.show('切换Bing壁纸');
    }
    $.get(bingCDN, function (data) {
        // console.log(data);
        if (data && data.url) {
            data.enddate = data.date;
            data.copyright = data.title + ' ' + data.copyright;
            picLoad(data);
        } else {
            console.log("切换Bing壁纸错误");
            switchBingTo();
        }
    }).fail(function () {
        console.log("切换Bing壁纸错误");
        switchBingTo();
    });
}

function switchBingTo() {
    $.ajax({
        url: bingApi5,
        type: 'get',
        dataType: 'jsonp'
    }).done(function (result) {
        var data = result.data;
        // console.log(data);
        if (data && data.url) {
            picLoad(data);
        } else {
            if (!isMobile()) {
                wenkmTips.show('切换Bing壁纸错误');
            }
            console.log("切换Bing壁纸错误");
            switchFlag = false;
        }
    }).fail(function () {
        if (!isMobile()) {
            wenkmTips.show('切换Bing壁纸错误');
        }
        console.log("切换Bing壁纸错误");
        switchFlag = false;
    });
}

function picLoad(data) {
    var temp = new Image();
    temp.src = data.url;
    temp.onload = function () {
        document.getElementById('bg').style.backgroundImage = "url(" + data.url + ")";
        $("#bg").hide().fadeIn(1000);
        document.getElementById('logo').title = data.enddate + ' - ' + data.copyright;
        $("#photoMsg").hide();
        switchRandomIndex();
        document.getElementById('photoMsg').innerHTML = msgData[randomIndex];
        $("#photoMsg").fadeIn(1000);
        document.getElementById('photoMsg').title = data.enddate + ' - ' + data.copyright;
        switchBtnClass();
        switchFlag = false;
        if (!isMobile()) {
            wenkmTips.show(data.enddate + ' - ' + data.copyright);
        }
    }
}

// 切换菜单
var menu = 1;
function changeMenu(btn) {
    btn.disabled = true;
    if(menu == 1) {
        document.getElementById('menu1').style.display = 'none';
        document.getElementById('menu2').style.display = 'inline';
        menu = 2;
    } else {
        document.getElementById('menu1').style.display = 'inline';
        document.getElementById('menu2').style.display = 'none';
        menu = 1;
    }
    btn.disabled = false;
}

// 切换壁纸
function changeBack() {
    window.location.href = "https://dolyw.com?rand=true";
}

// 浏览器切换事件
/* document.addEventListener('visibilitychange', function() {
    // 状态判断
    if (document.visibilityState == 'hidden') {
        // 切换窗口停止换背景
        // clearInterval(mySwitchBack);
        clearTimeout(mySwitchBack);
    } else {
        // 切换窗口回来继续换背景
        switchBack();
    }
}); */