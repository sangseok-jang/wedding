var TMAP = {};

window.TMAP = window.TMAP || TMAP;

var userAgent = navigator.userAgent.toLocaleLowerCase();
if (userAgent.search("android") > -1) {
    TMAP.os = "android";
} else if (userAgent.search("iphone") > -1 || userAgent.search("ipod") > -1 || userAgent.search("ipad") > -1) {
    TMAP.os = "ios";
} else {
    TMAP.os = "etc";
}

var app = {
    baseUrl : {
        ios : "tmap://",
        android : "tmap://A1",
        etc : "tmap://"
    },
    searchUrl : {
        ios : "tmap://?search=",
        android : "tmap://search?name=",
        etc : "tmap://"
    },
    store : {
        android : "http://m.tstore.co.kr/userpoc/mp.jsp?pid=0000163382",
        ios : "https://itunes.apple.com/app/id431589174",
        etc : "http://www.tmap.co.kr"
    }
};

TMAP.send = function(dest) {
    var _app = app;    //앱 목록
    var _os = TMAP.os; //os 종류

    var _baseUrl   = _app.baseUrl[_os]; // tmap 구동
    var _searchUrl = app.searchUrl[_os] + dest; // tmap 검색화면 구동

    var _url = (typeof dest == "undefined")? _baseUrl : _searchUrl;

    var startTime = new Date();     

    if (_os == "ios"){
        setTimeout(function() {
            window.location = _app.store[_os];
        }, 35);
        window.location = _url;

    } else if(_os == "android") {
        setTimeout(function() {
            var endTime = new Date();
            if(endTime - startTime < 2300) {
                window.location = _app.store[_os];
            }
        }, 2500);
        window.location = _url;

    } else {
        window.location = _app.store['etc']; //기타 T map 사이트 이동
    }
};


