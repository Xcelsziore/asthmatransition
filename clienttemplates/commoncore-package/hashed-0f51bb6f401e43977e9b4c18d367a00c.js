(function(a) {
var b = {
topSpacing: 0,
bottomSpacing: 0,
className: "is-sticky",
center: !1
}, c = a(window), d = a(document), e = [], f = c.height(), g = function() {
var a = c.scrollTop(), b = d.height(), g = b - f, h = a > g ? g - a : 0;
for (var i = 0; i < e.length; i++) {
var j = e[i], k = j.stickyWrapper.offset().top, l = k - j.topSpacing - h;
if (a <= l) j.currentTop !== null && (j.stickyElement.css("position", "").css("top", "").removeClass(j.className), j.currentTop = null); else {
var m = b - j.elementHeight - j.topSpacing - j.bottomSpacing - a - h;
m < 0 ? m += j.topSpacing : m = j.topSpacing, j.currentTop != m && (j.stickyElement.css("position", "fixed").css("top", m).addClass(j.className), j.currentTop = m);
}
}
}, h = function() {
f = c.height();
};
window.addEventListener ? (window.addEventListener("scroll", g, !1), window.addEventListener("resize", h, !1)) : window.attachEvent && (window.attachEvent("onscroll", g), window.attachEvent("onresize", h)), a.fn.sticky = function(c) {
var d = a.extend(b, c);
return this.each(function() {
var b = a(this);
if (d.center) var c = "margin-left:auto;margin-right:auto;";
stickyId = b.attr("id"), b.wrapAll('<div id="' + stickyId + 'StickyWrapper" style="' + c + '"></div>').css("width", b.width());
var f = b.outerHeight(), g = b.parent();
g.css("width", b.outerWidth()).css("height", f).css("clear", b.css("clear")), e.push({
topSpacing: d.topSpacing,
bottomSpacing: d.bottomSpacing,
stickyElement: b,
currentTop: null,
stickyWrapper: g,
elementHeight: f,
className: d.className
});
});
};
})(jQuery);