// 检测是否是手机查看
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    // 跳转移动端页面
    // var csArray = document.getElementsByClassName("cs");
    // csArray[0].style.marginTop = "7%";
    document.getElementById('menu1').style.display = 'inline';
} else {
    document.getElementById('changeBtn1').style.display = 'none';
    document.getElementById('changeBtn2').style.display = 'none';
    document.getElementById('br1').innerHTML = '<br/>';
    document.getElementById('menu1').style.display = 'inline';
    document.getElementById('menu2').style.display = 'inline';
}

// 加载播放器
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    lrcType: 3,
    order: 'random',
    theme: '#000000',
    volume: 2.0,
    audio: getLove()
});

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

// 初始化后默认按顺序一直切换背景
function switchBack() {
    d = Math.floor(1000 * Math.random());
    var temp = new Image();
    temp.src = api + size + "&d=" + d;
    temp.onload = function () {
        setTimeout(function fn(){
            document.getElementById('bg').style.backgroundImage = "url(" + api + size + "&d=" + d + ")";
            $("#bg").hide().fadeIn(1000);
            switchBack();
        }, 3000);
    }
}

// 初始化加载Bing每日图片，查看秒数个位为0，3，7或者地址栏有rand参数便随机获取背景图，其他获取当日图片
try {
    // 如果屏幕小就加载竖屏
    /* if(getStyle(document.getElementById("size"), "fontSize") == '12px') {
        // console.log(getStyle(document.getElementById("size"), "fontSize"));
        size = "?h=1920&w=1080";
    } */
    var url = api + size;
    var date = new Date();
    var seconds = date.getSeconds();
    String(seconds).length < 2 ? (seconds = "0" + seconds) : seconds;
    // console.log(seconds);
    seconds = seconds.toString().substring(1, 2);
    // console.log(seconds);
    if (seconds == 0 || seconds == 3 || seconds == 7 || getQueryString("rand")) {
        url = api2 + size;
        document.getElementById("msg").innerHTML = "背景切换中";
    } else {
        document.getElementById("msg").innerHTML = "背景加载中";
    }
    var myVar = setInterval("myTimer()", 400);
    var img = new Image();
    img.src = url;
    img.onload = function () {
        document.getElementById('bg').style.backgroundImage = "url(" + url + ")";
        $("#bg").hide().fadeIn(1000);
        document.getElementById('photoMsg').innerHTML = '每天看着励志的语录却过着颓废的人生';
        document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
        clearInterval(myVar);
        switchBack();
    }
} catch(err) {
    document.getElementById('photoMsg').innerHTML = '每天看着励志的语录却过着颓废的人生';
    document.getElementById('photoMsg').style.color = 'rgb(245, 244, 239)';
    clearInterval(myVar);
    switchBack();
} finally {
    
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