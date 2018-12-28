// PC端返回false
function isMobile() {
    var viewType = navigator.userAgent.toLowerCase();
    console.log(viewType);
    return viewType.match(/(phone|pad|pod|midp|iphone|ipod|iphone os|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|rv:1.2.3.4|ucweb|fennec|wosbrowser|browserng|webos|symbian|windows ce|windows mobile|windows phone)/i);
}

if (isMobile()) {
    // 隐藏wenkmPlayerc
    document.getElementById('wenkmPlayer').style.display = 'none';
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
    try {
        $('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
        /* 可直接修改部分参数 */
        live2d_settings['modelId'] = 6;                  // 默认模型 ID
        live2d_settings['modelTexturesId'] = 3;         // 默认材质 ID
        live2d_settings['modelStorage'] = false;         // 不储存模型 ID
        live2d_settings['canTurnToHomePage'] = false;    // 隐藏 返回首页 按钮
        live2d_settings['waifuEdgeSide'] = 'right:30';   // 看板娘贴边方向
        live2d_settings['aboutPageUrl'] = 'https://github.com/fghrsh/live2d_demo';   // 关于页地址
        /* 在 initModel 前添加 */
        initModel("https://www.fghrsh.net/zb_users/plugin/live2d/assets/waifu-tips.json?v=1.4.2");

        // 隐藏APlayer
        document.getElementById('aplayer').style.display = 'none';
        // 加载wenkmPlayerc
        $.ajax({url: 'https://mark.wang64.cn/assets/wenkmPlayer/js/player.js?v=123', dataType:"script", cache: true, async: false});
    } catch(err) {
        console.log('[Error] JQuery is not defined.')
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

// 取地址栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 获取CSS属性
function getStyle(element, attr) {
    if(element.currentStyle) {
        return element.currentStyle[attr];
    } else {
        return getComputedStyle(element, false)[attr];
    }
}

// API接口
var api = "https://bing.ioliu.cn/v1";
var api2 = "https://bing.ioliu.cn/v1/rand";
var api3 = "https://cn.bing.com/cnhp/coverstory";
var size = "?h=1080&w=1920";
var d = 0;

// Bing壁纸加速接口
var bingPic = {};

// 初始化后默认按顺序一直切换背景
function switchBack() {
    // d = Math.floor(1000 * Math.random());
    var temp = new Image();
    // temp.src = api + size + "&d=" + d;
    bingPic = getPic(true);
    temp.src = bingPic.url;
    temp.onload = function () {
        setTimeout(function fn(){
            // document.getElementById('bg').style.backgroundImage = "url(" + api + size + "&d=" + d + ")";
            document.getElementById('bg').style.backgroundImage = "url(" + bingPic.url + ")";
            $("#bg").hide().fadeIn(1000);
            document.getElementById('logo').title = bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright;
            document.getElementById('photoMsg').title = bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright;
            switchBack();
        }, 5000);
    }
}

// 初始化加载Bing每日图片，查看秒数个位为0，3，7或者地址栏有rand参数便随机获取背景图，其他获取当日图片
try {
    // 如果屏幕小就加载竖屏
    /* if(getStyle(document.getElementById("size"), "fontSize") == '12px') {
        // console.log(getStyle(document.getElementById("size"), "fontSize"));
        size = "?h=1920&w=1080";
    } */
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
        document.getElementById('photoMsg').innerHTML = '每天看着励志的语录却过着颓废的人生';
        document.getElementById('photoMsg').title = bingPic.date + ' - ' + bingPic.title + ' - ' + bingPic.copyright;
        document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
        switchBack();
    }
} catch(err) {
    document.getElementById('photoMsg').innerHTML = '每天看着励志的语录却过着颓废的人生';
    document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
    switchBack();
} finally {
    clearInterval(myVar);
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
    window.location.href = "https://wang64.cn?rand=true";
}

// 获取壁纸