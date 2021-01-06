//write n get cookies n show flash
//work around to delete cookies
var flash = function () { }
var style = {}
var mainDivs = {};
style.default = "opacity: 1;float:left;padding: .3em .4em;margin:0 auto .5em;display:inline-block;clear:both;position:relative;min-width:120px; /* 610/13 */ *max-width:45.750em; /* 610/13.3333 - for IE */";
style.tl = "top:0;left:0;";
style.t = "right:45%;top:0;";
style.tr = "top:0;right:0;";
style.r = "right:0;top:45%;";
style.br = "roght:0;bottom:0;";
style.b = "right:45%;bottom:0;";
style.bl = "bottom:0;left:0;";
style.l = "left:0;top:45%;";
style.success = "color:green;background-color: rgba(9, 129, 0, 0.42);border-radius: 5px;border: 1px green solid;";
style.info = "color:blue;background-color: rgba(26, 22, 242, 0.42);border-radius: 5px;border: 1px blue solid;";
style.warn = "color:coral;background-color: rgba(255, 250, 80, 0.87);border-radius: 5px;border: 1px coral solid;";
style.error = "color:red;background-color: rgba(255, 0, 0, 0.42);border-radius: 5px;border: 1px red solid;";
flash.prototype.clearFlash = function (cname) {
    var d = new Date();
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + "; " + expires;
}
flash.prototype.getFlash = function () {
    var name = "flash-";
    var flash = [];
    var ca = document.cookie.split(';');
    //console.log(ca);
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var str = c.substring(name.length + 5, c.length);
            var str = JSON.parse(unescape(str));
            flash.push(str);
            this.show(str);
            this.clearFlash(c.substring(name.length + 5, 0));
        }
    }
    return flash;
}
flash.prototype.show = function (flash) {
    var flashDiv = document.createElement('div');
    flashDiv.innerHTML = flash.msg;
    flashDiv.setAttribute("style", this.getFlashStyle(flash));
    this.getMainDiv(flash.option).appendChild(flashDiv);
    setTimeout(this.fadeOut, flash.option.duration, flashDiv);
    return flashDiv;
}
flash.prototype.getFlashStyle = function (flash) {
    return style.default + style[flash.type];
}
flash.prototype.getMainDiv = function (option) {
    var div;
    if (mainDivs[option.position]) {
        return mainDivs[option.position];
    } else {
        div = document.createElement("div");
        div.setAttribute('style', style[option.position]);
        div.style.position = "fixed";
        mainDivs[option.position] = div;
        document.body.appendChild(div);
    }
    return div;
}
flash.prototype.fadeOut = function (div) {
    //div.style.opacity=1;
    var i = 100;
    var fn = setInterval(function () {
        console.log(i)
        if (i == 0) {
            clearInterval(fn);
            div.parentNode.removeChild(div);
        } else {
            div.style.opacity = (i - 5) * .01;
            i = i - 5;
        }
    }, 5);

}

var f = new flash();
var d = f.getFlash();

