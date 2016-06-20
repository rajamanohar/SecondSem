var globalBizXUrl = "";
var isLoadedBizxTheme = false;
var cacheKey = "";

function appendCss(filename, filetype, id) {
    if (filetype == "css") {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("id", id);
        fileref.setAttribute("href", filename);
    } else if (filetype == "js") {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

function loadThemeInfo(data) {
    if (supports_html5_storage() && cacheKey != "") {
        var cache = window.localStorage.getItem(cacheKey);
        if (cache) {
            cache = JSON.parse(cache);
            if (cache.lastModifiedDate == data.lastModifiedDate && cache.id == data.id) {
                if (isLoadedBizxTheme) {
                    return;
                }
            }
        }
        window.localStorage.setItem(cacheKey, JSON.stringify(data));
    }
    appendCss(globalBizXUrl + data.urls.css, "css", "bizxThemeCss");
    isLoadedBizxTheme = true;

}

function addBizxCss(bizxUrl, account, theme, id) {
    if (bizxUrl && account && theme == "BizX") {
        if (document.getElementById('bizxXHRPage') == null && document.getElementById('bizx') == null) {
            if (typeof jQuery == 'undefined') {
                appendCss("/XpressHR/scripts/jquery-1.5.2.min.js", "js", "s");
            }
            globalBizXUrl = bizxUrl;
            if (!isLoadedBizxTheme) {
                if (supports_html5_storage()) {
                    cacheKey = "bizx_theme_api_" + account;
                    var cache = window.localStorage.getItem(cacheKey);
                    if (cache) {
                        loadThemeInfo(JSON.parse(cache), true);
                    }
                }
                appendCss(bizxUrl + '/public/theme-api/info/' + account + ';jsonp=loadThemeInfo', 'js', 'bizxThemeJs');
            }
        }
    }
}

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}