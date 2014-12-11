(function(a) {
a.address = function() {
var b = function(b) {
a(a.address).trigger(a.extend(a.Event(b), function() {
for (var b = {}, d = a.address.parameterNames(), e = 0, f = d.length; e < f; e++) b[d[e]] = a.address.parameter(d[e]);
return {
value: a.address.value(),
path: a.address.path(),
pathNames: a.address.pathNames(),
parameterNames: d,
parameters: b,
queryString: a.address.queryString()
};
}.call(a.address)));
}, d = function() {
return a().bind.apply(a(a.address), Array.prototype.slice.call(arguments)), a.address;
}, e = function() {
return Q.pushState && G.state !== y;
}, f = function() {
return ("/" + R.pathname.replace(new RegExp(G.state), "") + R.search + (g() ? "#" + g() : "")).replace(U, "/");
}, g = function() {
var a = R.href.indexOf("#");
return a != -1 ? l(R.href.substr(a + 1), F) : "";
}, h = function() {
return e() ? f() : g();
}, j = function() {
return "javascript";
}, k = function(a) {
return a = a.toString(), (G.strict && a.substr(0, 1) != "/" ? "/" : "") + a;
}, l = function(a, b) {
return G.crawlable && b ? (a !== "" ? "!" : "") + a : a.replace(/^\!/, "");
}, m = function(a, b) {
return parseInt(a.css(b), 10);
}, n = function(a) {
for (var b, c, d = 0, e = a.childNodes.length; d < e; d++) {
try {
"src" in a.childNodes[d] && a.childNodes[d].src && (b = String(a.childNodes[d].src));
} catch (f) {}
if (c = n(a.childNodes[d])) b = c;
}
return b;
}, o = function() {
if (!Z) {
var a = h();
cb != a && (K && I < 7 ? R.reload() : (K && I < 8 && G.history && T(r, 50), cb = a, p(F)));
}
}, p = function(a) {
b(B), b(a ? C : D), T(q, 10);
}, q = function() {
if (G.tracker !== "null" && G.tracker !== null) {
var b = a.isFunction(G.tracker) ? G.tracker : O[G.tracker], d = (R.pathname + R.search + (a.address && !e() ? a.address.value() : "")).replace(/\/\//, "/").replace(/^\/$/, "");
a.isFunction(b) ? b(d) : a.isFunction(O.urchinTracker) ? O.urchinTracker(d) : O.pageTracker !== y && a.isFunction(O.pageTracker._trackPageview) ? O.pageTracker._trackPageview(d) : O._gaq !== y && a.isFunction(O._gaq.push) && O._gaq.push([ "_trackPageview", decodeURI(d) ]);
}
}, r = function() {
var a = j() + ":" + F + ";document.open();document.writeln('<html><head><title>" + P.title.replace("'", "\\'") + "</title><script>var " + z + ' = "' + encodeURIComponent(h()) + (P.domain != R.hostname ? '";document.domain="' + P.domain : "") + "\";</script></head></html>');document.close();";
I < 7 ? V.src = a : V.contentWindow.location.replace(a);
}, s = function() {
if (W && X != -1) {
var a, b = W.substr(X + 1).split("&");
for (i = 0; i < b.length; i++) a = b[i].split("="), /^(autoUpdate|crawlable|history|strict|wrap)$/.test(a[0]) && (G[a[0]] = isNaN(a[1]) ? /^(true|yes)$/i.test(a[1]) : parseInt(a[1], 10) !== 0), /^(state|tracker)$/.test(a[0]) && (G[a[0]] = a[1]);
W = null;
}
cb = h();
}, t = function() {
if (!$) {
$ = E, s();
var d = function() {
u.call(this), x.call(this);
}, f = a("body").ajaxComplete(d);
d(), G.wrap && (a("body > *").wrapAll('<div style="padding:' + (m(f, "marginTop") + m(f, "paddingTop")) + "px " + (m(f, "marginRight") + m(f, "paddingRight")) + "px " + (m(f, "marginBottom") + m(f, "paddingBottom")) + "px " + (m(f, "marginLeft") + m(f, "paddingLeft")) + 'px;" />').parent().wrap('<div id="' + z + '" style="height:100%;overflow:auto;position:relative;' + (M && !window.statusbar.visible ? "resize:both;" : "") + '" />'), a("html, body").css({
height: "100%",
margin: 0,
padding: 0,
overflow: "hidden"
}), M && a('<style type="text/css" />').appendTo("head").text("#" + z + "::-webkit-resizer { background-color: #fff; }")), K && I < 8 && (d = P.getElementsByTagName("frameset")[0], V = P.createElement((d ? "" : "i") + "frame"), d ? (d.insertAdjacentElement("beforeEnd", V), d[d.cols ? "cols" : "rows"] += ",0", V.noResize = E, V.frameBorder = V.frameSpacing = 0) : (V.style.display = "none", V.style.width = V.style.height = 0, V.tabIndex = -1, P.body.insertAdjacentElement("afterBegin", V)), T(function() {
a(V).bind("load", function() {
var a = V.contentWindow;
cb = a[z] !== y ? a[z] : "", cb != h() && (p(F), R.hash = l(cb, E));
}), V.contentWindow[z] === y && r();
}, 50)), T(function() {
b("init"), p(F);
}, 1), e() || (K && I > 7 || !K && "on" + A in O ? O.addEventListener ? O.addEventListener(A, o, F) : O.attachEvent && O.attachEvent("on" + A, o) : S(o, 50));
}
}, u = function() {
var b, d = a("a"), e = d.size(), f = -1, g = function() {
++f != e && (b = a(d.get(f)), b.is('[rel*="address:"]') && b.address(), T(g, 1));
};
T(g, 1);
}, v = function() {
cb != h() && (cb = h(), p(F));
}, w = function() {
O.removeEventListener ? O.removeEventListener(A, o, F) : O.detachEvent && O.detachEvent("on" + A, o);
}, x = function() {
if (G.crawlable) {
var b = R.pathname.replace(/\/$/, "");
a("body").html().indexOf("_escaped_fragment_") != -1 && a('a[href]:not([href^=http]), a[href*="' + document.domain + '"]').each(function() {
var d = a(this).attr("href").replace(/^http:/, "").replace(new RegExp(b + "/?$"), "");
(d === "" || d.indexOf("_escaped_fragment_") != -1) && a(this).attr("href", "#" + d.replace(/\/(.*)\?_escaped_fragment_=(.*)$/, "!$2"));
});
}
}, y, z = "jQueryAddress", A = "hashchange", B = "change", C = "internalChange", D = "externalChange", E = !0, F = !1, G = {
autoUpdate: E,
crawlable: F,
history: E,
strict: E,
wrap: F
}, H = a.browser, I = parseFloat(a.browser.version), J = H.mozilla, K = H.msie, L = H.opera, M = H.webkit || H.safari, N = F, O = function() {
try {
return top.document !== y ? top : window;
} catch (a) {
return window;
}
}(), P = O.document, Q = O.history, R = O.location, S = setInterval, T = setTimeout, U = /\/{2,9}/g;
H = navigator.userAgent;
var V, W = n(document), X = W ? W.indexOf("?") : -1, Y = P.title, Z = F, $ = F, _ = E, ab = E, bb = F, cb = h();
if (K) {
I = parseFloat(H.substr(H.indexOf("MSIE") + 4)), P.documentMode && P.documentMode != I && (I = P.documentMode != 8 ? 7 : 8);
var db = P.onpropertychange;
P.onpropertychange = function() {
db && db.call(P), P.title != Y && P.title.indexOf("#" + h()) != -1 && (P.title = Y);
};
}
if (N = J && I >= 1 || K && I >= 6 || L && I >= 9.5 || M && I >= 523) {
L && (history.navigationMode = "compatible");
if (document.readyState == "complete") var eb = setInterval(function() {
a.address && (t(), clearInterval(eb));
}, 50); else s(), a(t);
a(window).bind("popstate", v).bind("unload", w);
} else !N && g() !== "" ? R.replace(R.href.substr(0, R.href.indexOf("#"))) : q();
return {
bind: function(a, b, c) {
return d(a, b, c);
},
init: function(a) {
return d("init", a);
},
change: function(a) {
return d(B, a);
},
internalChange: function(a) {
return d(C, a);
},
externalChange: function(a) {
return d(D, a);
},
baseURL: function() {
var a = R.href;
return a.indexOf("#") != -1 && (a = a.substr(0, a.indexOf("#"))), /\/$/.test(a) && (a = a.substr(0, a.length - 1)), a;
},
autoUpdate: function(a) {
return a !== y ? (G.autoUpdate = a, this) : G.autoUpdate;
},
crawlable: function(a) {
return a !== y ? (G.crawlable = a, this) : G.crawlable;
},
history: function(a) {
return a !== y ? (G.history = a, this) : G.history;
},
state: function(a) {
if (a !== y) {
G.state = a;
var b = f();
return G.state !== y && (Q.pushState ? b.substr(0, 3) == "/#/" && R.replace(G.state.replace(/^\/$/, "") + b.substr(2)) : b != "/" && b.replace(/^\/#/, "") != g() && T(function() {
R.replace(G.state.replace(/^\/$/, "") + "/#" + b);
}, 1)), this;
}
return G.state;
},
strict: function(a) {
return a !== y ? (G.strict = a, this) : G.strict;
},
tracker: function(a) {
return a !== y ? (G.tracker = a, this) : G.tracker;
},
wrap: function(a) {
return a !== y ? (G.wrap = a, this) : G.wrap;
},
update: function() {
return bb = E, this.value(cb), bb = F, this;
},
title: function(a) {
return a !== y ? (T(function() {
Y = P.title = a, ab && V && V.contentWindow && V.contentWindow.document && (V.contentWindow.document.title = a, ab = F), !_ && J && R.replace(R.href.indexOf("#") != -1 ? R.href : R.href + "#"), _ = F;
}, 50), this) : P.title;
},
value: function(a) {
if (a !== y) {
a = k(a), a == "/" && (a = "");
if (cb == a && !bb) return;
_ = E, cb = a;
if (G.autoUpdate || bb) p(E), e() ? Q[G.history ? "pushState" : "replaceState"]({}, "", G.state.replace(/\/$/, "") + (cb === "" ? "/" : cb)) : (Z = E, M ? G.history ? R.hash = "#" + l(cb, E) : R.replace("#" + l(cb, E)) : cb != h() && (G.history ? R.hash = "#" + l(cb, E) : R.replace("#" + l(cb, E))), K && I < 8 && G.history && T(r, 50), M ? T(function() {
Z = F;
}, 1) : Z = F);
return this;
}
return N ? k(cb) : null;
},
path: function(a) {
if (a !== y) {
var b = this.queryString(), c = this.hash();
return this.value(a + (b ? "?" + b : "") + (c ? "#" + c : "")), this;
}
return k(cb).split("#")[0].split("?")[0];
},
pathNames: function() {
var a = this.path(), b = a.replace(U, "/").split("/");
return (a.substr(0, 1) == "/" || a.length === 0) && b.splice(0, 1), a.substr(a.length - 1, 1) == "/" && b.splice(b.length - 1, 1), b;
},
queryString: function(a) {
if (a !== y) {
var b = this.hash();
return this.value(this.path() + (a ? "?" + a : "") + (b ? "#" + b : "")), this;
}
return a = cb.split("?"), a.slice(1, a.length).join("?").split("#")[0];
},
parameter: function(b, d, e) {
var f, g;
if (d !== y) {
var h = this.parameterNames();
g = [], d = d ? d.toString() : "";
for (f = 0; f < h.length; f++) {
var i = h[f], j = this.parameter(i);
typeof j == "string" && (j = [ j ]), i == b && (j = d === null || d === "" ? [] : e ? j.concat([ d ]) : [ d ]);
for (var k = 0; k < j.length; k++) g.push(i + "=" + j[k]);
}
return a.inArray(b, h) == -1 && d !== null && d !== "" && g.push(b + "=" + d), this.queryString(g.join("&")), this;
}
if (d = this.queryString()) {
e = [], g = d.split("&");
for (f = 0; f < g.length; f++) d = g[f].split("="), d[0] == b && e.push(d.slice(1).join("="));
if (e.length !== 0) return e.length != 1 ? e : e[0];
}
},
parameterNames: function() {
var b = this.queryString(), d = [];
if (b && b.indexOf("=") != -1) {
b = b.split("&");
for (var e = 0; e < b.length; e++) {
var f = b[e].split("=")[0];
a.inArray(f, d) == -1 && d.push(f);
}
}
return d;
},
hash: function(a) {
return a !== y ? (this.value(cb.split("#")[0] + (a ? "#" + a : "")), this) : (a = cb.split("#"), a.slice(1, a.length).join("#"));
}
};
}(), a.fn.address = function(b) {
if (!a(this).attr("address")) {
var d = function(d) {
if (d.shiftKey || d.ctrlKey || d.metaKey) return !0;
if (a(this).is("a")) {
var e = b ? b.call(this) : /address:/.test(a(this).attr("rel")) ? a(this).attr("rel").split("address:")[1].split(" ")[0] : a.address.state() !== undefined && a.address.state() != "/" ? a(this).attr("href").replace(new RegExp("^(.*" + a.address.state() + "|\\.)"), "") : a(this).attr("href").replace(/^(#\!?|\.)/, "");
a.address.value(e), d.preventDefault();
}
};
a(this).click(d).live("click", d).live("submit", function(d) {
if (a(this).is("form")) {
var e = a(this).attr("action");
e = b ? b.call(this) : (e.indexOf("?") != -1 ? e.replace(/&$/, "") : e + "?") + a(this).serialize(), a.address.value(e), d.preventDefault();
}
}).attr("address", !0);
}
return this;
};
})(jQuery), function() {
function a(a, b) {
var c;
a || (a = {});
for (c in b) a[c] = b[c];
return a;
}
function b(a, b) {
return parseInt(a, b || 10);
}
function c(a) {
return typeof a == "string";
}
function d(a) {
return typeof a == "object";
}
function e(a) {
return typeof a == "number";
}
function f(a) {
return B.log(a) / B.LN10;
}
function g(a, b) {
for (var c = a.length; c--; ) if (a[c] === b) {
a.splice(c, 1);
break;
}
}
function h(a) {
return a !== bb && a !== null;
}
function i(a, b, e) {
var f, g;
if (c(b)) h(e) ? a.setAttribute(b, e) : a && a.getAttribute && (g = a.getAttribute(b)); else if (h(b) && d(b)) for (f in b) a.setAttribute(f, b[f]);
return g;
}
function j(a) {
return Object.prototype.toString.call(a) === "[object Array]" ? a : [ a ];
}
function k() {
var a = arguments, b, c, d = a.length;
for (b = 0; b < d; b++) {
c = a[b];
if (typeof c != "undefined" && c !== null) return c;
}
}
function l(b, c) {
N && c && c.opacity !== bb && (c.filter = "alpha(opacity=" + c.opacity * 100 + ")"), a(b.style, c);
}
function m(b, c, d, e, f) {
return b = z.createElement(b), c && a(b, c), f && l(b, {
padding: 0,
border: jb,
margin: 0
}), d && l(b, d), e && e.appendChild(b), b;
}
function n(b, c) {
var d = function() {};
return d.prototype = new b, a(d.prototype, c), d;
}
function o(a, c, d, e) {
var f = Z.lang;
a = a;
var g = isNaN(c = H(c)) ? 2 : c;
c = d === undefined ? f.decimalPoint : d, e = e === undefined ? f.thousandsSep : e, f = a < 0 ? "-" : "", d = String(b(a = H(+a || 0).toFixed(g)));
var h = d.length > 3 ? d.length % 3 : 0;
return f + (h ? d.substr(0, h) + e : "") + d.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + e) + (g ? c + H(a - d).toFixed(g).slice(2) : "");
}
function p(a) {
var b = {
left: a.offsetLeft,
top: a.offsetTop
};
for (a = a.offsetParent; a; ) b.left += a.offsetLeft, b.top += a.offsetTop, a !== z.body && a !== z.documentElement && (b.left -= a.scrollLeft, b.top -= a.scrollTop), a = a.offsetParent;
return b;
}
function q() {
this.symbol = this.color = 0;
}
function r(a, b, c, d, e, f, g) {
var h = g.x;
g = g.y;
var i = h - a + c - 25, j = g - b + d + 10, k;
return i < 7 && (i = c + h + 15), i + a > c + e && (i -= i + a - (c + e), j -= b, k = !0), j < 5 ? (j = 5, k && g >= j && g <= j + b && (j = g + b - 5)) : j + b > d + f && (j = d + f - b - 5), {
x: i,
y: j
};
}
function s(a, b) {
var c = a.length, d;
for (d = 0; d < c; d++) a[d].ss_i = d;
a.sort(function(a, c) {
var d = b(a, c);
return d === 0 ? a.ss_i - c.ss_i : d;
});
for (d = 0; d < c; d++) delete a[d].ss_i;
}
function t(a) {
for (var b in a) a[b] && a[b].destroy && a[b].destroy(), delete a[b];
}
function u(a, b) {
_ = k(a, b.animation);
}
function v() {
var a = Z.global.useUTC;
pb = a ? Date.UTC : function(a, b, c, d, e, f) {
return (new Date(a, b, k(c, 1), k(d, 0), k(e, 0), k(f, 0))).getTime();
}, qb = a ? "getUTCMinutes" : "getMinutes", rb = a ? "getUTCHours" : "getHours", sb = a ? "getUTCDay" : "getDay", tb = a ? "getUTCDate" : "getDate", ub = a ? "getUTCMonth" : "getMonth", vb = a ? "getUTCFullYear" : "getFullYear", wb = a ? "setUTCMinutes" : "setMinutes", xb = a ? "setUTCHours" : "setHours", yb = a ? "setUTCDate" : "setDate", zb = a ? "setUTCMonth" : "setMonth", Ab = a ? "setUTCFullYear" : "setFullYear";
}
function w(a) {
Y || (Y = m(cb)), a && Y.appendChild(a), Y.innerHTML = "";
}
function x() {}
function y(e, n) {
function v(c) {
function d(a, b) {
this.pos = a, this.minor = b, this.isNew = !0, b || this.addLabel();
}
function e(a) {
return a && (this.options = a, this.id = a.id), this;
}
function i(a, b, c, d) {
this.isNegative = b, this.options = a, this.x = c, this.stack = d, this.alignOptions = {
align: a.align || (ud ? b ? "left" : "right" : "center"),
verticalAlign: a.verticalAlign || (ud ? "middle" : b ? "bottom" : "top"),
y: k(a.y, ud ? 4 : b ? 14 : -6),
x: k(a.x, ud ? b ? -6 : 6 : 0)
}, this.textAlign = a.textAlign || (ud ? b ? "right" : "left" : "center");
}
function j() {
var a = [], b = [], c;
Y = _ = null, ab = [], Db(td, function(d) {
c = !1, Db([ "xAxis", "yAxis" ], function(a) {
d.isCartesian && (a === "xAxis" && u || a === "yAxis" && !u) && (d.options[a] === z.index || d.options[a] === bb && z.index === 0) && (d[a] = A, ab.push(d), c = !0);
}), !d.visible && Cb.ignoreHiddenSeries && (c = !1);
if (c) {
var e, f, g, j, l, m;
u || (e = d.options.stacking, Kb = e === "percent", e && (l = d.options.stack, j = d.type + k(l, ""), m = "-" + j, d.stackKey = j, f = a[j] || [], a[j] = f, g = b[m] || [], b[m] = g), Kb && (Y = 0, _ = 99)), d.isCartesian && (Db(d.data, function(a) {
var b = a.x, c = a.y, d = c < 0, n = d ? g : f, o = d ? m : j;
Y === null && (Y = _ = a[N]), u ? b > _ ? _ = b : b < Y && (Y = b) : h(c) && (e && (n[b] = h(n[b]) ? n[b] + c : c), c = n ? n[b] : c, a = k(a.low, c), Kb || (c > _ ? _ = c : a < Y && (Y = a)), e && (y[o] || (y[o] = {}), y[o][b] || (y[o][b] = new i(z.stackLabels, d, b, l)), y[o][b].setTotal(c)));
}), /(area|column|bar)/.test(d.type) && !u && (Y >= 0 ? (Y = 0, Eb = !0) : _ < 0 && (_ = 0, Fb = !0)));
}
});
}
function l(a, b) {
var c, d;
Pb = b ? 1 : B.pow(10, D(B.log(a) / B.LN10)), c = a / Pb;
if (!b) {
b = [ 1, 2, 2.5, 5, 10 ];
if (z.allowDecimals === !1 || L) Pb === 1 ? b = [ 1, 2, 5, 10 ] : Pb <= .1 && (b = [ 1 / Pb ]);
}
for (d = 0; d < b.length; d++) {
a = b[d];
if (c <= (b[d] + (b[d + 1] || b[d])) / 2) break;
}
return a *= Pb, a;
}
function m(a) {
var b;
return b = a, Pb = k(Pb, B.pow(10, D(B.log(Nb) / B.LN10))), Pb < 1 && (b = C(1 / Pb) * 10, b = C(a * b) / b), b;
}
function n() {
var a, b, c, d, e = z.tickInterval, g = z.tickPixelInterval;
a = z.maxZoom || (u && !h(z.min) && !h(z.max) ? G(Jc.smallestInterval * 5, _ - Y) : null), O = w ? $c : Xc, Bb ? (c = Jc[u ? "xAxis" : "yAxis"][z.linkedTo], d = c.getExtremes(), gb = k(d.min, d.dataMin), eb = k(d.max, d.dataMax)) : (gb = k(cb, z.min, Y), eb = k(db, z.max, _)), L && (gb = f(gb), eb = f(eb)), eb - gb < a && (d = (a - eb + gb) / 2, gb = F(gb - d, k(z.min, gb - d), Y), eb = G(gb + a, k(z.max, gb + a), _)), !cc && !Kb && !Bb && h(gb) && h(eb) && (a = eb - gb || 1, !h(z.min) && !h(cb) && nb && (Y < 0 || !Eb) && (gb -= a * nb), !h(z.max) && !h(db) && ob && (_ > 0 || !Fb) && (eb += a * ob)), Nb = gb === eb ? 1 : Bb && !e && g === c.options.tickPixelInterval ? c.tickInterval : k(e, cc ? 1 : (eb - gb) * g / O), !K && !h(z.tickInterval) && (Nb = l(Nb)), A.tickInterval = Nb, Ob = z.minorTickInterval === "auto" && Nb ? Nb / 5 : z.minorTickInterval;
if (K) {
Wb = [], e = Z.global.useUTC;
var i = 1e3 / X, j = 6e4 / X, n = 36e5 / X;
g = 864e5 / X, a = 6048e5 / X, d = 2592e6 / X;
var o = 31556952e3 / X, p = [ [ "second", i, [ 1, 2, 5, 10, 15, 30 ] ], [ "minute", j, [ 1, 2, 5, 10, 15, 30 ] ], [ "hour", n, [ 1, 2, 3, 4, 6, 8, 12 ] ], [ "day", g, [ 1, 2 ] ], [ "week", a, [ 1, 2 ] ], [ "month", d, [ 1, 2, 3, 4, 6 ] ], [ "year", o, null ] ], q = p[6], r = q[1], s = q[2];
for (c = 0; c < p.length; c++) {
q = p[c], r = q[1], s = q[2];
if (p[c + 1] && Nb <= (r * s[s.length - 1] + p[c + 1][1]) / 2) break;
}
r === o && Nb < 5 * r && (s = [ 1, 2, 5 ]), p = l(Nb / r, s), s = new Date(gb * X), s.setMilliseconds(0), r >= i && s.setSeconds(r >= j ? 0 : p * D(s.getSeconds() / p)), r >= j && s[wb](r >= n ? 0 : p * D(s[qb]() / p)), r >= n && s[xb](r >= g ? 0 : p * D(s[rb]() / p)), r >= g && s[yb](r >= d ? 1 : p * D(s[tb]() / p)), r >= d && (s[zb](r >= o ? 0 : p * D(s[ub]() / p)), b = s[vb]()), r >= o && (b -= b % p, s[Ab](b)), r === a && s[yb](s[tb]() - s[sb]() + z.startOfWeek), c = 1, b = s[vb](), i = s.getTime() / X, j = s[ub]();
for (n = s[tb](); i < eb && c < $c; ) Wb.push(i), r === o ? i = pb(b + c * p, 0) / X : r === d ? i = pb(b, j + c * p) / X : !!e || r !== g && r !== a ? i += r * p : i = pb(b, j, n + c * p * (r === g ? 1 : 7)), c++;
Wb.push(i), bc = z.dateTimeLabelFormats[q[0]];
} else {
c = m(D(gb / Nb) * Nb), b = m(E(eb / Nb) * Nb), Wb = [];
for (c = m(c); c <= b; ) Wb.push(c), c = m(c + Nb);
}
if (!Bb) {
if (cc || u && Jc.hasColumn) {
b = (cc ? 1 : Nb) * .5;
if (cc || !h(k(z.min, cb))) gb -= b;
if (cc || !h(k(z.max, db))) eb += b;
}
b = Wb[0], c = Wb[Wb.length - 1], z.startOnTick ? gb = b : gb > b && Wb.shift(), z.endOnTick ? eb = c : eb < c && Wb.pop(), sd || (sd = {
x: 0,
y: 0
}), !K && Wb.length > sd[N] && (sd[N] = Wb.length);
}
}
function p() {
var a, b;
jb = gb, mb = eb, j(), n(), Q = P, P = O / (eb - gb || 1);
if (!u) for (a in y) for (b in y[a]) y[a][b].cum = y[a][b].total;
A.isDirty || (A.isDirty = gb !== jb || eb !== mb);
}
function q(a) {
return a = (new e(a)).render(), Mb.push(a), a;
}
function r() {
var a = z.title, c = z.stackLabels, f = z.alternateGridColor, g = z.lineWidth, i, j, k = (i = Jc.hasRendered) && h(jb) && !isNaN(jb);
j = ab.length && h(gb) && h(eb), O = w ? $c : Xc, P = O / (eb - gb || 1), R = w ? hc : gc;
if (j || Bb) {
if (Ob && !cc) for (j = gb + (Wb[0] - gb) % Ob; j <= eb; j += Ob) Yb[j] || (Yb[j] = new d(j, !0)), k && Yb[j].isNew && Yb[j].render(null, !0), Yb[j].isActive = !0, Yb[j].render();
Db(Wb, function(a, b) {
if (!Bb || a >= gb && a <= eb) k && Xb[a].isNew && Xb[a].render(b, !0), Xb[a].isActive = !0, Xb[a].render(b);
}), f && Db(Wb, function(a, b) {
b % 2 === 0 && a < eb && (Zb[a] || (Zb[a] = new e), Zb[a].options = {
from: a,
to: Wb[b + 1] !== bb ? Wb[b + 1] : eb,
color: f
}, Zb[a].render(), Zb[a].isActive = !0);
}), i || Db((z.plotLines || []).concat(z.plotBands || []), function(a) {
Mb.push((new e(a)).render());
});
}
Db([ Xb, Yb, Zb ], function(a) {
for (var b in a) a[b].isActive ? a[b].isActive = !1 : (a[b].destroy(), delete a[b]);
}), g && (i = hc + (v ? $c : 0) + M, j = xc - gc - (v ? Xc : 0) + M, i = vd.crispLine([ kb, w ? hc : i, w ? j : ec, lb, w ? wc - fc : i, w ? j : xc - gc ], g), W ? W.animate({
d: i
}) : W = vd.path(i).attr({
stroke: z.lineColor,
"stroke-width": g,
zIndex: 7
}).add()), I && (i = w ? hc : ec, g = b(a.style.fontSize || 12), i = {
low: i + (w ? 0 : O),
middle: i + O / 2,
high: i + (w ? O : 0)
}[a.align], g = (w ? ec + Xc : hc) + (w ? 1 : -1) * (v ? -1 : 1) * ac + (x === 2 ? g : 0), I[I.isNew ? "attr" : "animate"]({
x: w ? i : g + (v ? $c : 0) + M + (a.x || 0),
y: w ? g - (v ? Xc : 0) + M : i + (a.y || 0)
}), I.isNew = !1);
if (c && c.enabled) {
var l, m;
c = A.stackTotalGroup, c || (A.stackTotalGroup = c = vd.g("stack-labels").attr({
visibility: hb,
zIndex: 6
}).translate(hc, ec).add());
for (l in y) {
a = y[l];
for (m in a) a[m].render(c);
}
}
A.isDirty = !1;
}
function s(a) {
for (var b = Mb.length; b--; ) Mb[b].id === a && Mb[b].destroy();
}
var u = c.isX, v = c.opposite, w = ud ? !u : u, x = w ? v ? 0 : 2 : v ? 1 : 3, y = {}, z = Gb(u ? Qb : Rb, [ Vb, Tb, Ub, Sb ][x], c), A = this, I, J = z.type, K = J === "datetime", L = J === "logarithmic", M = z.offset || 0, N = u ? "x" : "y", O, P, Q, R = w ? hc : gc, S, T, U, V, W, Y, _, ab, cb, db, eb = null, gb = null, jb, mb, nb = z.minPadding, ob = z.maxPadding, Bb = h(z.linkedTo), Eb, Fb, Kb;
J = z.events;
var Lb, Mb = [], Nb, Ob, Pb, Wb, Xb = {}, Yb = {}, Zb = {}, $b, _b, ac, bc, cc = z.categories, dc = z.labels.formatter || function() {
var a = this.value;
return bc ? $(bc, a) : Nb % 1e6 === 0 ? a / 1e6 + "M" : Nb % 1e3 === 0 ? a / 1e3 + "k" : !cc && a >= 1e3 ? o(a, 0) : a;
}, ic = w && z.labels.staggerLines, kc = z.reversed, lc = cc && z.tickmarkPlacement === "between" ? .5 : 0;
d.prototype = {
addLabel: function() {
var b = this.pos, c = z.labels, d = !(b === gb && !k(z.showFirstLabel, 1) || b === eb && !k(z.showLastLabel, 0)), e = cc && w && cc.length && !c.step && !c.staggerLines && !c.rotation && $c / cc.length || !w && $c / 2, f = cc && h(cc[b]) ? cc[b] : b, g = this.label;
b = dc.call({
isFirst: b === Wb[0],
isLast: b === Wb[Wb.length - 1],
dateTimeLabelFormat: bc,
value: L ? B.pow(10, f) : f
}), e = e && {
width: F(1, C(e - 2 * (c.padding || 10))) + ib
}, e = a(e, c.style), g === bb ? this.label = h(b) && d && c.enabled ? vd.text(b, 0, 0, c.useHTML).attr({
align: c.align,
rotation: c.rotation
}).css(e).add(U) : null : g && g.attr({
text: b
}).css(e);
},
getLabelSize: function() {
var a = this.label;
return a ? (this.labelBBox = a.getBBox())[w ? "height" : "width"] : 0;
},
render: function(a, c) {
var d = !this.minor, e = this.label, f = this.pos, g = z.labels, i = this.gridLine, j = d ? z.gridLineWidth : z.minorGridLineWidth, k = d ? z.gridLineColor : z.minorGridLineColor, l = d ? z.gridLineDashStyle : z.minorGridLineDashStyle, m = this.mark, n = d ? z.tickLength : z.minorTickLength, o = d ? z.tickWidth : z.minorTickWidth || 0, p = d ? z.tickColor : z.minorTickColor, q = d ? z.tickPosition : z.minorTickPosition, r = g.step, s = c && Dc || xc, t;
t = w ? S(f + lc, null, null, c) + R : hc + M + (v ? (c && yc || wc) - fc - hc : 0), s = w ? s - gc + M - (v ? Xc : 0) : s - S(f + lc, null, null, c) - R, j && (f = T(f + lc, j, c), i === bb && (i = {
stroke: k,
"stroke-width": j
}, l && (i.dashstyle = l), d && (i.zIndex = 1), this.gridLine = i = j ? vd.path(f).attr(i).add(V) : null), !c && i && f && i.animate({
d: f
})), o && (q === "inside" && (n = -n), v && (n = -n), d = vd.crispLine([ kb, t, s, lb, t + (w ? 0 : -n), s + (w ? n : 0) ], o), m ? m.animate({
d: d
}) : this.mark = vd.path(d).attr({
stroke: p,
"stroke-width": o
}).add(U)), e && !isNaN(t) && (t = t + g.x - (lc && w ? lc * P * (kc ? -1 : 1) : 0), s = s + g.y - (lc && !w ? lc * P * (kc ? 1 : -1) : 0), h(g.y) || (s += b(e.styles.lineHeight) * .9 - e.getBBox().height / 2), ic && (s += a / (r || 1) % ic * 16), r && e[a % r ? "hide" : "show"](), e[this.isNew ? "attr" : "animate"]({
x: t,
y: s
})), this.isNew = !1;
},
destroy: function() {
t(this);
}
}, e.prototype = {
render: function() {
var a = this, b = a.options, c = b.label, d = a.label, e = b.width, g = b.to, i = b.from, j = b.value, l, m = b.dashStyle, n = a.svgElem, o = [], p, q, r = b.color;
q = b.zIndex;
var s = b.events;
L && (i = f(i), g = f(g), j = f(j));
if (e) o = T(j, e), b = {
stroke: r,
"stroke-width": e
}, m && (b.dashstyle = m); else {
if (!h(i) || !h(g)) return;
i = F(i, gb), g = G(g, eb), l = T(g), (o = T(i)) && l ? o.push(l[4], l[5], l[1], l[2]) : o = null, b = {
fill: r
};
}
h(q) && (b.zIndex = q);
if (n) o ? n.animate({
d: o
}, null, n.onGetPath) : (n.hide(), n.onGetPath = function() {
n.show();
}); else if (o && o.length) {
a.svgElem = n = vd.path(o).attr(b).add();
if (s) {
m = function(b) {
n.on(b, function(c) {
s[b].apply(a, [ c ]);
});
};
for (p in s) m(p);
}
}
return c && h(c.text) && o && o.length && $c > 0 && Xc > 0 ? (c = Gb({
align: w && l && "center",
x: w ? !l && 4 : 10,
verticalAlign: !w && l && "middle",
y: w ? l ? 16 : 10 : l ? 6 : -4,
rotation: w && !l && 90
}, c), d || (a.label = d = vd.text(c.text, 0, 0).attr({
align: c.textAlign || c.align,
rotation: c.rotation,
zIndex: q
}).css(c.style).add()), l = [ o[1], o[4], k(o[6], o[1]) ], o = [ o[2], o[5], k(o[7], o[2]) ], p = G.apply(B, l), q = G.apply(B, o), d.align(c, !1, {
x: p,
y: q,
width: F.apply(B, l) - p,
height: F.apply(B, o) - q
}), d.show()) : d && d.hide(), a;
},
destroy: function() {
t(this), g(Mb, this);
}
}, i.prototype = {
destroy: function() {
t(this);
},
setTotal: function(a) {
this.cum = this.total = a;
},
render: function(a) {
var b = this.options.formatter.call(this);
this.label ? this.label.attr({
text: b,
visibility: fb
}) : this.label = Jc.renderer.text(b, 0, 0).css(this.options.style).attr({
align: this.textAlign,
rotation: this.options.rotation,
visibility: fb
}).add(a);
},
setOffset: function(a, b) {
var c = this.isNegative, d = A.translate(this.total), e = A.translate(0);
e = H(d - e);
var f = Jc.xAxis[0].translate(this.x) + a, g = Jc.plotHeight;
c = {
x: ud ? c ? d : d - e : f,
y: ud ? g - f - b : c ? g - d - e : g - d,
width: ud ? e : b,
height: ud ? b : e
}, this.label && this.label.align(this.alignOptions, null, c).attr({
visibility: hb
});
}
}, S = function(a, b, c, d, e) {
var g = 1, h = 0, i = d ? Q : P;
return d = d ? jb : gb, i || (i = P), c && (g *= -1, h = O), kc && (g *= -1, h -= g * O), b ? (kc && (a = O - a), a = a / i + d, L && e && (a = B.pow(10, a))) : (L && e && (a = f(a)), a = g * (a - d) * i + h), a;
}, T = function(a, b, c) {
var d, e, f;
a = S(a, null, null, c);
var g = c && Dc || xc, h = c && yc || wc, i;
c = e = C(a + R), d = f = C(g - a - R);
if (isNaN(a)) i = !0; else if (w) {
d = ec, f = g - gc;
if (c < hc || c > hc + $c) i = !0;
} else {
c = hc, e = h - fc;
if (d < ec || d > ec + Xc) i = !0;
}
return i ? null : vd.crispLine([ kb, c, d, lb, e, f ], b || 0);
}, ud && u && kc === bb && (kc = !0), a(A, {
addPlotBand: q,
addPlotLine: q,
adjustTickAmount: function() {
if (sd && !K && !cc && !Bb) {
var a = $b, b = Wb.length;
$b = sd[N];
if (b < $b) {
for (; Wb.length < $b; ) Wb.push(m(Wb[Wb.length - 1] + Nb));
P *= (b - 1) / ($b - 1), eb = Wb[Wb.length - 1];
}
h(a) && $b !== a && (A.isDirty = !0);
}
},
categories: cc,
getExtremes: function() {
return {
min: gb,
max: eb,
dataMin: Y,
dataMax: _,
userMin: cb,
userMax: db
};
},
getPlotLinePath: T,
getThreshold: function(a) {
return gb > a ? a = gb : eb < a && (a = eb), S(a, 0, 1);
},
isXAxis: u,
options: z,
plotLinesAndBands: Mb,
getOffset: function() {
var a = ab.length && h(gb) && h(eb), b = 0, c = 0, e = z.title, f = z.labels, g = [ -1, 1, 1, -1 ][x], i;
U || (U = vd.g("axis").attr({
zIndex: 7
}).add(), V = vd.g("grid").attr({
zIndex: 1
}).add()), _b = 0;
if (a || Bb) Db(Wb, function(a) {
Xb[a] ? Xb[a].addLabel() : Xb[a] = new d(a);
if (x === 0 || x === 2 || {
1: "left",
3: "right"
}[x] === f.align) _b = F(Xb[a].getLabelSize(), _b);
}), ic && (_b += (ic - 1) * 16); else for (i in Xb) Xb[i].destroy(), delete Xb[i];
e && e.text && (I || (I = A.axisTitle = vd.text(e.text, 0, 0, e.useHTML).attr({
zIndex: 7,
rotation: e.rotation || 0,
align: e.textAlign || {
low: "left",
middle: "center",
high: "right"
}[e.align]
}).css(e.style).add(), I.isNew = !0), b = I.getBBox()[w ? "height" : "width"], c = k(e.margin, w ? 5 : 10)), M = g * (z.offset || jc[x]), ac = _b + (x !== 2 && _b && g * z.labels[w ? "y" : "x"]) + c, jc[x] = F(jc[x], ac + b + g * M);
},
render: r,
setCategories: function(a, b) {
A.categories = c.categories = cc = a, Db(ab, function(a) {
a.translate(), a.setTooltipPoints(!0);
}), A.isDirty = !0, k(b, !0) && Jc.redraw();
},
setExtremes: function(a, b, c, d) {
c = k(c, !0), Jb(A, "setExtremes", {
min: a,
max: b
}, function() {
cb = a, db = b, c && Jc.redraw(d);
});
},
setScale: p,
setTickPositions: n,
translate: S,
redraw: function() {
_c.resetTracker && _c.resetTracker(), r(), Db(Mb, function(a) {
a.render();
}), Db(ab, function(a) {
a.isDirty = !0;
});
},
removePlotBand: s,
removePlotLine: s,
reversed: kc,
stacks: y,
destroy: function() {
var a;
Ib(A);
for (a in y) t(y[a]), y[a] = null;
A.stackTotalGroup && (A.stackTotalGroup = A.stackTotalGroup.destroy()), Db([ Xb, Yb, Zb, Mb ], function(a) {
t(a);
}), Db([ W, U, V, I ], function(a) {
a && a.destroy();
}), W = U = V = I = null;
}
});
for (Lb in J) Hb(A, Lb, J[Lb]);
p();
}
function x() {
var a = {};
return {
add: function(b, c, d, f) {
a[b] || (c = vd.text(c, 0, 0).css(e.toolbar.itemStyle).align({
align: "right",
x: -fc - 20,
y: ec + 30
}).on("click", f).attr({
align: "right",
zIndex: 20
}).add(), a[b] = c);
},
remove: function(b) {
w(a[b].element), a[b] = null;
}
};
}
function y(a) {
function d() {
var a = this.points || j(this), b = a[0].series.xAxis, d = this.x;
b = b && b.options.type === "datetime";
var e = c(d) || b, f;
return f = e ? [ '<span style="font-size: 10px">' + (b ? $("%A, %b %e, %Y", d) : d) + "</span>" ] : [], Db(a, function(a) {
f.push(a.point.tooltipFormatter(e));
}), f.join("<br/>");
}
function e(a, b) {
t = p ? a : (2 * t + a) / 3, u = p ? b : (u + b) / 2, v.translate(t, u), xd = H(a - t) > 1 || H(b - u) > 1 ? function() {
e(a, b);
} : null;
}
function f() {
if (!p) {
var a = Jc.hoverPoints;
v.hide(), Db(k, function(a) {
a && a.hide();
}), a && Db(a, function(a) {
a.setState();
}), Jc.hoverPoints = null, p = !0;
}
}
var g, h = a.borderWidth, i = a.crosshairs, k = [], l = a.style, m = a.shared, n = b(l.padding), o = h + n, p = !0, q, s, t = 0, u = 0;
l.padding = 0;
var v = vd.g("tooltip").attr({
zIndex: 8
}).add(), w = vd.rect(o, o, 0, 0, a.borderRadius, h).attr({
fill: a.backgroundColor,
"stroke-width": h
}).add(v).shadow(a.shadow), x = vd.text("", n + o, b(l.fontSize) + n + o, a.useHTML).attr({
zIndex: 1
}).css(l).add(v);
return v.hide(), {
shared: m,
refresh: function(b) {
var c, h, l, t = 0, u = {}, y = [];
l = b.tooltipPos, c = a.formatter || d, u = Jc.hoverPoints, m ? (u && Db(u, function(a) {
a.setState();
}), Jc.hoverPoints = b, Db(b, function(a) {
a.setState(ob), t += a.plotY, y.push(a.getLabelConfig());
}), h = b[0].plotX, t = C(t) / b.length, u = {
x: b[0].category
}, u.points = y, b = b[0]) : u = b.getLabelConfig(), u = c.call(u), g = b.series, h = m ? h : b.plotX, t = m ? t : b.plotY, c = C(l ? l[0] : ud ? $c - t : h), h = C(l ? l[1] : ud ? Xc - h : t), l = m || !b.series.isCartesian || Nc(c, h), u === !1 || !l ? f() : (p && (v.show(), p = !1), x.attr({
text: u
}), l = x.getBBox(), q = l.width + 2 * n, s = l.height + 2 * n, w.attr({
width: q,
height: s,
stroke: a.borderColor || b.color || g.color || "#606060"
}), c = r(q, s, hc, ec, $c, Xc, {
x: c,
y: h
}), e(C(c.x - o), C(c.y - o)));
if (i) {
i = j(i);
for (c = i.length; c--; ) h = b.series[c ? "yAxis" : "xAxis"], i[c] && h && (h = h.getPlotLinePath(b[c ? "y" : "x"], 1), k[c] ? k[c].attr({
d: h,
visibility: hb
}) : (l = {
"stroke-width": i[c].width || 1,
stroke: i[c].color || "#C0C0C0",
zIndex: 2
}, i[c].dashStyle && (l.dashstyle = i[c].dashStyle), k[c] = vd.path(h).attr(l).add()));
}
},
hide: f,
destroy: function() {
Db(k, function(a) {
a && a.destroy();
}), Db([ w, x, v ], function(a) {
a && a.destroy();
}), w = x = v = null;
}
};
}
function I(b) {
function c(b) {
var c, d = P && z.width / z.body.scrollWidth - 1, e, f, g;
b = b || A.event, b.target || (b.target = b.srcElement), c = b.touches ? b.touches.item(0) : b;
if (b.type !== "mousemove" || A.opera || d) nd = p(qc), e = nd.left, f = nd.top;
return N ? (g = b.x, c = b.y) : c.layerX === bb ? (g = c.pageX - e, c = c.pageY - f) : (g = b.layerX, c = b.layerY), d && (g += C((d + 1) * e - e), c += C((d + 1) * f - f)), a(b, {
chartX: g,
chartY: c
});
}
function d(a) {
var b = {
xAxis: [],
yAxis: []
};
return Db(rd, function(c) {
var d = c.translate, e = c.isXAxis;
b[e ? "xAxis" : "yAxis"].push({
axis: c,
value: d((ud ? !e : e) ? a.chartX - hc : Xc - a.chartY + ec, !0)
});
}), b;
}
function e() {
var a = Jc.hoverSeries, b = Jc.hoverPoint;
b && b.onMouseOut(), a && a.onMouseOut(), Oc && Oc.hide(), zd = null;
}
function f() {
if (m) {
var a = {
xAxis: [],
yAxis: []
}, b = m.getBBox(), c = b.x - hc, d = b.y - ec;
l && (Db(rd, function(e) {
var f = e.translate, g = e.isXAxis, h = ud ? !g : g, i = f(h ? c : Xc - d - b.height, !0, 0, 0, 1);
f = f(h ? c + b.width : Xc - d, !0, 0, 0, 1), a[g ? "xAxis" : "yAxis"].push({
axis: e,
min: G(i, f),
max: F(i, f)
});
}), Jb(Jc, "selection", a, Od)), m = m.destroy();
}
Jc.mouseIsDown = Tc = l = !1, Ib(z, U ? "touchend" : "mouseup", f);
}
function g(a) {
var b = h(a.pageX) ? a.pageX : a.page.x;
a = h(a.pageX) ? a.pageY : a.page.y, nd && !Nc(b - nd.left - hc, a - nd.top - ec) && e();
}
var j, k, l, m, n = Cb.zoomType, o = /x/.test(n), q = /y/.test(n), r = o && !ud || q && ud, s = q && !ud || o && ud;
bd = function() {
ad ? (ad.translate(hc, ec), ud && ad.attr({
width: Jc.plotWidth,
height: Jc.plotHeight
}).invert()) : Jc.trackerGroup = ad = vd.g("tracker").attr({
zIndex: 9
}).add();
}, bd(), b.enabled && (Jc.tooltip = Oc = y(b)), function() {
qc.onmousedown = function(a) {
a = c(a), !U && a.preventDefault && a.preventDefault(), Jc.mouseIsDown = Tc = !0, j = a.chartX, k = a.chartY, Hb(z, U ? "touchend" : "mouseup", f);
};
var h = function(a) {
if (!(a && a.touches && a.touches.length > 1)) {
a = c(a), U || (a.returnValue = !1);
var d = a.chartX, e = a.chartY, f = !Nc(d - hc, e - ec);
nd || (nd = p(qc)), U && a.type === "touchstart" && (i(a.target, "isTracker") ? Jc.runTrackerClick || a.preventDefault() : !Kc && !f && a.preventDefault()), f && (d < hc ? d = hc : d > hc + $c && (d = hc + $c), e < ec ? e = ec : e > ec + Xc && (e = ec + Xc));
if (Tc && a.type !== "touchstart") l = Math.sqrt(Math.pow(j - d, 2) + Math.pow(k - e, 2)), l > 10 && (pd && (o || q) && Nc(j - hc, k - ec) && (m || (m = vd.rect(hc, ec, r ? 1 : $c, s ? 1 : Xc, 0).attr({
fill: Cb.selectionMarkerFill || "rgba(69,114,167,0.25)",
zIndex: 7
}).add())), m && r && (d -= j, m.attr({
width: H(d),
x: (d > 0 ? 0 : d) + j
})), m && s && (e -= k, m.attr({
height: H(e),
y: (e > 0 ? 0 : e) + k
}))); else if (!f) {
var g;
e = Jc.hoverPoint, d = Jc.hoverSeries;
var h, n, t = wc, u = ud ? a.chartY : a.chartX - hc;
if (Oc && b.shared) {
g = [], h = td.length;
for (n = 0; n < h; n++) td[n].visible && td[n].tooltipPoints.length && (a = td[n].tooltipPoints[u], a._dist = H(u - a.plotX), t = G(t, a._dist), g.push(a));
for (h = g.length; h--; ) g[h]._dist > t && g.splice(h, 1);
g.length && g[0].plotX !== zd && (Oc.refresh(g), zd = g[0].plotX);
}
d && d.tracker && (a = d.tooltipPoints[u]) && a !== e && a.onMouseOver();
}
return f || !pd;
}
};
qc.onmousemove = h, Hb(qc, "mouseleave", e), Hb(z, "mousemove", g), qc.ontouchstart = function(a) {
(o || q) && qc.onmousedown(a), h(a);
}, qc.ontouchmove = h, qc.ontouchend = function() {
l && e();
}, qc.onclick = function(b) {
var e = Jc.hoverPoint;
b = c(b), b.cancelBubble = !0;
if (!l) if (e && i(b.target, "isTracker")) {
var f = e.plotX, g = e.plotY;
a(e, {
pageX: nd.left + hc + (ud ? $c - g : f),
pageY: nd.top + ec + (ud ? Xc - f : g)
}), Jb(e.series, "click", a(b, {
point: e
})), e.firePointEvent("click", b);
} else a(b, d(b)), Nc(b.chartX - hc, b.chartY - ec) && Jb(Jc, "click", b);
l = !1;
};
}(), yd = setInterval(function() {
xd && xd();
}, 32), a(this, {
zoomX: o,
zoomY: q,
resetTracker: e,
destroy: function() {
Jc.trackerGroup && (Jc.trackerGroup = ad = Jc.trackerGroup.destroy()), Ib(z, "mousemove", g), qc.onclick = qc.onmousedown = qc.onmousemove = qc.ontouchstart = qc.ontouchend = qc.ontouchmove = null;
}
});
}
function J(a) {
var b = a.type || Cb.type || Cb.defaultSeriesType, c = Mb[b], d = Jc.hasRendered;
return d && (ud && b === "column" ? c = Mb.bar : !ud && b === "bar" && (c = Mb.column)), b = new c, b.init(Jc, a), !d && b.inverted && (ud = !0), b.isCartesian && (pd = b.isCartesian), td.push(b), b;
}
function K() {
Cb.alignTicks !== !1 && Db(rd, function(a) {
a.adjustTickAmount();
}), sd = null;
}
function L(a) {
var b = Jc.isDirtyLegend, c, d = Jc.isDirtyBox, e = td.length, f = e, g = Jc.clipRect;
for (u(a, Jc); f--; ) {
a = td[f];
if (a.isDirty && a.options.stacking) {
c = !0;
break;
}
}
if (c) for (f = e; f--; ) a = td[f], a.options.stacking && (a.isDirty = !0);
Db(td, function(a) {
a.isDirty && (a.cleanData(), a.getSegments(), a.options.legendType === "point" && (b = !0));
}), b && cd.renderLegend && (cd.renderLegend(), Jc.isDirtyLegend = !1), pd && (qd || (sd = null, Db(rd, function(a) {
a.setScale();
})), K(), Bd(), Db(rd, function(a) {
if (a.isDirty || d) a.redraw(), d = !0;
})), d && (Ad(), bd(), g && (Lb(g), g.animate({
width: Jc.plotSizeX,
height: Jc.plotSizeY
}))), Db(td, function(a) {
a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
}), _c && _c.resetTracker && _c.resetTracker(), Jb(Jc, "redraw");
}
function M() {
var a = e.xAxis || {}, b = e.yAxis || {}, c;
a = j(a), Db(a, function(a, b) {
a.index = b, a.isX = !0;
}), b = j(b), Db(b, function(a, b) {
a.index = b;
}), rd = a.concat(b), Jc.xAxis = [], Jc.yAxis = [], rd = Fb(rd, function(a) {
return c = new v(a), Jc[c.isXAxis ? "xAxis" : "yAxis"].push(c), c;
}), K();
}
function O(a, b) {
cc = Gb(e.title, a), dc = Gb(e.subtitle, b), Db([ [ "title", a, cc ], [ "subtitle", b, dc ] ], function(a) {
var b = a[0], c = Jc[b], d = a[1];
a = a[2], c && d && (c = c.destroy()), a && a.text && !c && (Jc[b] = vd.text(a.text, 0, 0, a.useHTML).attr({
align: a.align,
"class": "highcharts-" + b,
zIndex: 1
}).css(a.style).add().align(a, !1, bc));
});
}
function S() {
kc = Cb.renderTo, rc = gb + W++, c(kc) && (kc = z.getElementById(kc)), kc.innerHTML = "", kc.offsetWidth || (lc = kc.cloneNode(0), l(lc, {
position: db,
top: "-9999px",
display: ""
}), z.body.appendChild(lc)), sc = (lc || kc).offsetWidth, uc = (lc || kc).offsetHeight, Jc.chartWidth = wc = Cb.width || sc || 600, Jc.chartHeight = xc = Cb.height || (uc > 19 ? uc : 400), Jc.container = qc = m(cb, {
className: "highcharts-container" + (Cb.className ? " " + Cb.className : ""),
id: rc
}, a({
position: eb,
overflow: fb,
width: wc + ib,
height: xc + ib,
textAlign: "left"
}, Cb.style), lc || kc), Jc.renderer = vd = Cb.forExport ? new Yb(qc, wc, xc, !0) : new T(qc, wc, xc);
var d, e;
Q && qc.getBoundingClientRect && (d = function() {
l(qc, {
left: 0,
top: 0
}), e = qc.getBoundingClientRect(), l(qc, {
left: -(e.left - b(e.left)) + ib,
top: -(e.top - b(e.top)) + ib
});
}, d(), Hb(A, "resize", d), Hb(Jc, "destroy", function() {
Ib(A, "resize", d);
}));
}
function V() {
function a() {
var a = Cb.width || kc.offsetWidth, c = Cb.height || kc.offsetHeight;
if (a && c) {
if (a !== sc || c !== uc) clearTimeout(b), b = setTimeout(function() {
Nd(a, c, !1);
}, 100);
sc = a, uc = c;
}
}
var b;
Hb(A, "resize", a), Hb(Jc, "destroy", function() {
Ib(A, "resize", a);
});
}
function Y() {
Jb(Jc, "endResize", null, function() {
qd -= 1;
});
}
function ab() {
var c = e.labels, d = e.credits, f;
O(), cd = Jc.legend = new Qd, Bd(), Db(rd, function(a) {
a.setTickPositions(!0);
}), K(), Bd(), Ad(), pd && Db(rd, function(a) {
a.render();
}), Jc.seriesGroup || (Jc.seriesGroup = vd.g("series-group").attr({
zIndex: 3
}).add()), Db(td, function(a) {
a.translate(), a.setTooltipPoints(), a.render();
}), c.items && Db(c.items, function() {
var d = a(c.style, this.style), e = b(d.left) + hc, f = b(d.top) + ec + 12;
delete d.left, delete d.top, vd.text(this.html, e, f).attr({
zIndex: 2
}).css(d).add();
}), Jc.toolbar || (Jc.toolbar = x()), d.enabled && !Jc.credits && (f = d.href, Jc.credits = vd.text(d.text, 0, 0).on("click", function() {
f && (location.href = f);
}).attr({
align: d.position.align,
zIndex: 8
}).css(d.style).add().align(d.position)), bd(), Jc.hasRendered = !0, lc && (kc.appendChild(qc), w(lc));
}
function mb() {
var a, b = qc && qc.parentNode;
if (Jc !== null) {
Jb(Jc, "destroy"), Ib(A, "unload", mb), Ib(Jc);
for (a = rd.length; a--; ) rd[a] = rd[a].destroy();
for (a = td.length; a--; ) td[a] = td[a].destroy();
Db([ "title", "subtitle", "seriesGroup", "clipRect", "credits", "tracker" ], function(a) {
var b = Jc[a];
b && (Jc[a] = b.destroy());
}), Db([ Ec, Ic, Fc, cd, Oc, vd, _c ], function(a) {
a && a.destroy && a.destroy();
}), Ec = Ic = Fc = cd = Oc = vd = _c = null, qc && (qc.innerHTML = "", Ib(qc), b && w(qc), qc = null), clearInterval(yd);
for (a in Jc) delete Jc[a];
Jc = null;
}
}
function Bb() {
!R && A == A.top && z.readyState !== "complete" ? z.attachEvent("onreadystatechange", function() {
z.detachEvent("onreadystatechange", Bb), z.readyState === "complete" && Bb();
}) : (S(), Cd(), Id(), Db(e.series || [], function(a) {
J(a);
}), Jc.inverted = ud = k(ud, e.chart.inverted), M(), Jc.render = ab, Jc.tracker = _c = new I(e.tooltip), ab(), Jb(Jc, "load"), n && n.apply(Jc, [ Jc ]), Db(Jc.callbacks, function(a) {
a.apply(Jc, [ Jc ]);
}));
}
Qb = Gb(Qb, Z.xAxis), Rb = Gb(Rb, Z.yAxis), Z.xAxis = Z.yAxis = null, e = Gb(Z, e);
var Cb = e.chart, Nb = Cb.margin;
Nb = d(Nb) ? Nb : [ Nb, Nb, Nb, Nb ];
var Ob = k(Cb.marginTop, Nb[0]), Pb = k(Cb.marginRight, Nb[1]), Wb = k(Cb.marginBottom, Nb[2]), Xb = k(Cb.marginLeft, Nb[3]), Zb = Cb.spacingTop, $b = Cb.spacingRight, _b = Cb.spacingBottom, ac = Cb.spacingLeft, bc, cc, dc, ec, fc, gc, hc, jc, kc, lc, qc, rc, sc, uc, wc, xc, yc, Dc, Ec, Fc, Gc, Ic, Jc = this, Kc = (Nb = Cb.events) && !!Nb.click, Mc, Nc, Oc, Tc, Uc, Vc, Wc, Xc, $c, _c, ad, bd, cd, dd, hd, nd, pd = Cb.showAxes, qd = 0, rd = [], sd, td = [], ud, vd, xd, yd, zd, Ad, Bd, Cd, Id, Nd, Od, Pd, Qd = function() {
function c(a, b) {
var c = a.legendItem, d = a.legendLine, e = a.legendSymbol, f = r.color, g = b ? h.itemStyle.color : f, i = b ? a.color : f;
f = b ? a.pointAttr[nb] : {
stroke: f,
fill: f
}, c && c.css({
fill: g
}), d && d.attr({
stroke: i
}), e && e.attr(f);
}
function d(a, b, c) {
var d = a.legendItem, e = a.legendLine, f = a.legendSymbol;
a = a.checkbox, d && d.attr({
x: b,
y: c
}), e && e.translate(b, c - 4), f && f.attr({
x: b + f.xOff,
y: c + f.yOff
}), a && (a.x = b, a.y = c);
}
function e() {
Db(n, function(a) {
var b = a.checkbox, c = E.alignAttr;
b && l(b, {
left: c.translateX + a.legendItemWidth + b.x - 40 + ib,
top: c.translateY + b.y - 11 + ib
});
});
}
function f(a) {
var b, e, f, g, l = a.legendItem;
g = a.series || a;
var n = g.options, o = n && n.borderWidth || 0;
if (!l) {
g = /^(bar|pie|area|column)$/.test(g.type), a.legendItem = l = vd.text(h.labelFormatter.call(a), 0, 0).css(a.visible ? p : r).on("mouseover", function() {
a.setState(ob), l.css(q);
}).on("mouseout", function() {
l.css(a.visible ? p : r), a.setState();
}).on("click", function() {
var b = function() {
a.setVisible();
};
a.firePointEvent ? a.firePointEvent("legendItemClick", null, b) : Jb(a, "legendItemClick", null, b);
}).attr({
zIndex: 2
}).add(E);
if (!g && n && n.lineWidth) {
var s = {
"stroke-width": n.lineWidth,
zIndex: 2
};
n.dashStyle && (s.dashstyle = n.dashStyle), a.legendLine = vd.path([ kb, -j - k, 0, lb, -k, 0 ]).attr(s).add(E);
}
g ? b = vd.rect(e = -j - k, f = -11, j, 12, 2).attr({
zIndex: 3
}).add(E) : n && n.marker && n.marker.enabled && (b = vd.symbol(a.symbol, e = -j / 2 - k, f = -4, n.marker.radius).attr({
zIndex: 3
}).add(E)), b && (b.xOff = e + o % 2 / 2, b.yOff = f + o % 2 / 2), a.legendSymbol = b, c(a, a.visible), n && n.showCheckbox && (a.checkbox = m("input", {
type: "checkbox",
checked: a.selected,
defaultChecked: a.selected
}, h.itemCheckboxStyle, qc), Hb(a.checkbox, "click", function(b) {
Jb(a, "checkboxClick", {
checked: b.target.checked
}, function() {
a.select();
});
}));
}
b = l.getBBox(), e = a.legendItemWidth = h.itemWidth || j + k + b.width + t, A = b.height, i && x - v + e > (H || wc - 2 * t - v) && (x = v, y += A), z = y, d(a, x, y), i ? x += e : y += A, G = H || F(i ? x - v : e, G);
}
function g() {
x = v, y = u, z = G = 0, E || (E = vd.g("legend").attr({
zIndex: 7
}).add()), n = [], Db(I, function(a) {
var b = a.options;
b.showInLegend && (n = n.concat(b.legendType === "point" ? a.data : a));
}), s(n, function(a, b) {
return (a.options.legendIndex || 0) - (b.options.legendIndex || 0);
}), J && n.reverse(), Db(n, f), dd = H || G, hd = z - u + A;
if (C || D) dd += 2 * t, hd += 2 * t, B ? dd > 0 && hd > 0 && (B[B.isNew ? "attr" : "animate"](B.crisp(null, null, null, dd, hd)), B.isNew = !1) : (B = vd.rect(0, 0, dd, hd, h.borderRadius, C || 0).attr({
stroke: h.borderColor,
"stroke-width": C || 0,
fill: D || jb
}).add(E).shadow(h.shadow), B.isNew = !0), B[n.length ? "show" : "hide"]();
for (var c = [ "left", "right", "top", "bottom" ], d, g = 4; g--; ) d = c[g], o[d] && o[d] !== "auto" && (h[g < 2 ? "align" : "verticalAlign"] = d, h[g < 2 ? "x" : "y"] = b(o[d]) * (g % 2 ? -1 : 1));
n.length && E.align(a(h, {
width: dd,
height: hd
}), !0, bc), qd || e();
}
var h = Jc.options.legend;
if (h.enabled) {
var i = h.layout === "horizontal", j = h.symbolWidth, k = h.symbolPadding, n, o = h.style, p = h.itemStyle, q = h.itemHoverStyle, r = h.itemHiddenStyle, t = b(o.padding), u = 18, v = 4 + t + j + k, x, y, z, A = 0, B, C = h.borderWidth, D = h.backgroundColor, E, G, H = h.width, I = Jc.series, J = h.reversed;
return g(), Hb(Jc, "endResize", e), {
colorizeItem: c,
destroyItem: function(a) {
var b = a.checkbox;
Db([ "legendItem", "legendLine", "legendSymbol" ], function(b) {
a[b] && a[b].destroy();
}), b && w(a.checkbox);
},
renderLegend: g,
destroy: function() {
B && (B = B.destroy()), E && (E = E.destroy());
}
};
}
};
Nc = function(a, b) {
return a >= 0 && a <= $c && b >= 0 && b <= Xc;
}, Pd = function() {
Jb(Jc, "selection", {
resetSelection: !0
}, Od), Jc.toolbar.remove("zoom");
}, Od = function(a) {
var b = Z.lang, c = Jc.pointCount < 100;
Jc.toolbar.add("zoom", b.resetZoom, b.resetZoomTitle, Pd), !a || a.resetSelection ? Db(rd, function(a) {
a.setExtremes(null, null, !1, c);
}) : Db(a.xAxis.concat(a.yAxis), function(a) {
var b = a.axis;
Jc.tracker[b.isXAxis ? "zoomX" : "zoomY"] && b.setExtremes(a.min, a.max, !1, c);
}), L();
}, Bd = function() {
var a = e.legend, b = k(a.margin, 10), c = a.x, d = a.y, f = a.align, g = a.verticalAlign, i;
Cd(), (Jc.title || Jc.subtitle) && !h(Ob) && (i = F(Jc.title && !cc.floating && !cc.verticalAlign && cc.y || 0, Jc.subtitle && !dc.floating && !dc.verticalAlign && dc.y || 0)) && (ec = F(ec, i + k(cc.margin, 15) + Zb)), a.enabled && !a.floating && (f === "right" ? h(Pb) || (fc = F(fc, dd - c + b + $b)) : f === "left" ? h(Xb) || (hc = F(hc, dd + c + b + ac)) : g === "top" ? h(Ob) || (ec = F(ec, hd + d + b + Zb)) : g === "bottom" && (h(Wb) || (gc = F(gc, hd - d + b + _b)))), pd && Db(rd, function(a) {
a.getOffset();
}), h(Xb) || (hc += jc[3]), h(Ob) || (ec += jc[0]), h(Wb) || (gc += jc[2]), h(Pb) || (fc += jc[1]), Id();
}, Nd = function(a, b, c) {
var d = Jc.title, e = Jc.subtitle;
qd += 1, u(c, Jc), Dc = xc, yc = wc, Jc.chartWidth = wc = C(a), Jc.chartHeight = xc = C(b), l(qc, {
width: wc + ib,
height: xc + ib
}), vd.setSize(wc, xc, c), $c = wc - hc - fc, Xc = xc - ec - gc, sd = null, Db(rd, function(a) {
a.isDirty = !0, a.setScale();
}), Db(td, function(a) {
a.isDirty = !0;
}), Jc.isDirtyLegend = !0, Jc.isDirtyBox = !0, Bd(), d && d.align(null, null, bc), e && e.align(null, null, bc), L(c), Dc = null, Jb(Jc, "resize"), _ === !1 ? Y() : setTimeout(Y, _ && _.duration || 500);
}, Id = function() {
Jc.plotLeft = hc = C(hc), Jc.plotTop = ec = C(ec), Jc.plotWidth = $c = C(wc - hc - fc), Jc.plotHeight = Xc = C(xc - ec - gc), Jc.plotSizeX = ud ? Xc : $c, Jc.plotSizeY = ud ? $c : Xc, bc = {
x: ac,
y: Zb,
width: wc - ac - $b,
height: xc - Zb - _b
};
}, Cd = function() {
ec = k(Ob, Zb), fc = k(Pb, $b), gc = k(Wb, _b), hc = k(Xb, ac), jc = [ 0, 0, 0, 0 ];
}, Ad = function() {
var a = Cb.borderWidth || 0, b = Cb.backgroundColor, c = Cb.plotBackgroundColor, d = Cb.plotBackgroundImage, e, f = {
x: hc,
y: ec,
width: $c,
height: Xc
};
e = a + (Cb.shadow ? 8 : 0);
if (a || b) Ec ? Ec.animate(Ec.crisp(null, null, null, wc - e, xc - e)) : Ec = vd.rect(e / 2, e / 2, wc - e, xc - e, Cb.borderRadius, a).attr({
stroke: Cb.borderColor,
"stroke-width": a,
fill: b || jb
}).add().shadow(Cb.shadow);
c && (Fc ? Fc.animate(f) : Fc = vd.rect(hc, ec, $c, Xc, 0).attr({
fill: c
}).add().shadow(Cb.plotShadow)), d && (Gc ? Gc.animate(f) : Gc = vd.image(d, hc, ec, $c, Xc).add()), Cb.plotBorderWidth && (Ic ? Ic.animate(Ic.crisp(null, hc, ec, $c, Xc)) : Ic = vd.rect(hc, ec, $c, Xc, 0, Cb.plotBorderWidth).attr({
stroke: Cb.plotBorderColor,
"stroke-width": Cb.plotBorderWidth,
zIndex: 4
}).add()), Jc.isDirtyBox = !1;
}, Hb(A, "unload", mb), Cb.reflow !== !1 && Hb(Jc, "load", V);
if (Nb) for (Mc in Nb) Hb(Jc, Mc, Nb[Mc]);
Jc.options = e, Jc.series = td, Jc.addSeries = function(a, b, c) {
var d;
return a && (u(c, Jc), b = k(b, !0), Jb(Jc, "addSeries", {
options: a
}, function() {
d = J(a), d.isDirty = !0, Jc.isDirtyLegend = !0, b && Jc.redraw();
})), d;
}, Jc.animation = k(Cb.animation, !0), Jc.destroy = mb, Jc.get = function(a) {
var b, c, d;
for (b = 0; b < rd.length; b++) if (rd[b].options.id === a) return rd[b];
for (b = 0; b < td.length; b++) if (td[b].options.id === a) return td[b];
for (b = 0; b < td.length; b++) {
d = td[b].data;
for (c = 0; c < d.length; c++) if (d[c].id === a) return d[c];
}
return null;
}, Jc.getSelectedPoints = function() {
var a = [];
return Db(td, function(b) {
a = a.concat(Eb(b.data, function(a) {
return a.selected;
}));
}), a;
}, Jc.getSelectedSeries = function() {
return Eb(td, function(a) {
return a.selected;
});
}, Jc.hideLoading = function() {
Kb(Uc, {
opacity: 0
}, {
duration: e.loading.hideDuration,
complete: function() {
l(Uc, {
display: jb
});
}
}), Wc = !1;
}, Jc.isInsidePlot = Nc, Jc.redraw = L, Jc.setSize = Nd, Jc.setTitle = O, Jc.showLoading = function(b) {
var c = e.loading;
Uc || (Uc = m(cb, {
className: "highcharts-loading"
}, a(c.style, {
left: hc + ib,
top: ec + ib,
width: $c + ib,
height: Xc + ib,
zIndex: 10,
display: jb
}), qc), Vc = m("span", null, c.labelStyle, Uc)), Vc.innerHTML = b || e.lang.loading, Wc || (l(Uc, {
opacity: 0,
display: ""
}), Kb(Uc, {
opacity: c.style.opacity
}, {
duration: c.showDuration
}), Wc = !0);
}, Jc.pointCount = 0, Jc.counters = new q, Bb();
}
var z = document, A = window, B = Math, C = B.round, D = B.floor, E = B.ceil, F = B.max, G = B.min, H = B.abs, I = B.cos, J = B.sin, K = B.PI, L = K * 2 / 360, M = navigator.userAgent, N = /msie/i.test(M) && !A.opera, O = z.documentMode === 8, P = /AppleWebKit/.test(M), Q = /Firefox/.test(M), R = !!z.createElementNS && !!z.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, S = Q && parseInt(M.split("Firefox/")[1], 10) < 4, T, U = z.documentElement.ontouchstart !== undefined, V = {}, W = 0, X = 1, Y, Z, $, _, ab, bb, cb = "div", db = "absolute", eb = "relative", fb = "hidden", gb = "highcharts-", hb = "visible", ib = "px", jb = "none", kb = "M", lb = "L", mb = "rgba(192,192,192," + (R ? 1e-6 : .002) + ")", nb = "", ob = "hover", pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb = A.HighchartsAdapter, Cb = Bb || {}, Db = Cb.each, Eb = Cb.grep, Fb = Cb.map, Gb = Cb.merge, Hb = Cb.addEvent, Ib = Cb.removeEvent, Jb = Cb.fireEvent, Kb = Cb.animate, Lb = Cb.stop, Mb = {};
$ = function(a, b, c) {
function d(a) {
return a.toString().replace(/^([0-9])$/, "0$1");
}
if (!h(b) || isNaN(b)) return "Invalid date";
a = k(a, "%Y-%m-%d %H:%M:%S"), b = new Date(b * X);
var e, f = b[rb](), g = b[sb](), i = b[tb](), j = b[ub](), l = b[vb](), m = Z.lang, n = m.weekdays;
b = {
a: n[g].substr(0, 3),
A: n[g],
d: d(i),
e: i,
b: m.shortMonths[j],
B: m.months[j],
m: d(j + 1),
y: l.toString().substr(2, 2),
Y: l,
H: d(f),
I: d(f % 12 || 12),
l: f % 12 || 12,
M: d(b[qb]()),
p: f < 12 ? "AM" : "PM",
P: f < 12 ? "am" : "pm",
S: d(b.getSeconds())
};
for (e in b) a = a.replace("%" + e, b[e]);
return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
}, q.prototype = {
wrapColor: function(a) {
this.color >= a && (this.color = 0);
},
wrapSymbol: function(a) {
this.symbol >= a && (this.symbol = 0);
}
}, ab = {
init: function(a, b, c) {
b = b || "";
var d = a.shift, e = b.indexOf("C") > -1, f = e ? 7 : 3, g;
b = b.split(" "), c = [].concat(c);
var h, i, j = function(a) {
for (g = a.length; g--; ) a[g] === kb && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2]);
};
e && (j(b), j(c)), a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6)), d && (c = [].concat(c).splice(0, f).concat(c), a.shift = !1);
if (b.length) for (a = c.length; b.length < a; ) d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
return h && (b = b.concat(h), c = c.concat(i)), [ b, c ];
},
step: function(a, b, c, d) {
var e = [], f = a.length;
if (c === 1) e = d; else if (f === b.length && c < 1) for (; f--; ) d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d; else e = b;
return e;
}
}, Bb && Bb.init && Bb.init(ab);
if (!Bb && A.jQuery) {
var Nb = jQuery;
Db = function(a, b) {
for (var c = 0, d = a.length; c < d; c++) if (b.call(a[c], a[c], c, a) === !1) return c;
}, Eb = Nb.grep, Fb = function(a, b) {
for (var c = [], d = 0, e = a.length; d < e; d++) c[d] = b.call(a[d], a[d], d, a);
return c;
}, Gb = function() {
var a = arguments;
return Nb.extend(!0, null, a[0], a[1], a[2], a[3]);
}, Hb = function(a, b, c) {
Nb(a).bind(b, c);
}, Ib = function(a, b, c) {
var d = z.removeEventListener ? "removeEventListener" : "detachEvent";
z[d] && !a[d] && (a[d] = function() {}), Nb(a).unbind(b, c);
}, Jb = function(b, c, d, e) {
var f = Nb.Event(c), g = "detached" + c;
a(f, d), b[c] && (b[g] = b[c], b[c] = null), Nb(b).trigger(f), b[g] && (b[c] = b[g], b[g] = null), e && !f.isDefaultPrevented() && e(f);
}, Kb = function(a, b, c) {
var d = Nb(a);
b.d && (a.toD = b.d, b.d = 1), d.stop(), d.animate(b, c);
}, Lb = function(a) {
Nb(a).stop();
}, Nb.extend(Nb.easing, {
easeOutQuad: function(a, b, c, d, e) {
return -d * (b /= e) * (b - 2) + c;
}
});
var Ob = jQuery.fx, Pb = Ob.step;
Db([ "cur", "_default", "width", "height" ], function(a, b) {
var c = b ? Pb : Ob.prototype, d = c[a], e;
d && (c[a] = function(a) {
return a = b ? a : this, e = a.elem, e.attr ? e.attr(a.prop, a.now) : d.apply(this, arguments);
});
}), Pb.d = function(a) {
var b = a.elem;
if (!a.started) {
var c = ab.init(b, b.d, b.toD);
a.start = c[0], a.end = c[1], a.started = !0;
}
b.attr("d", ab.step(a.start, a.end, a.pos, b.toD));
};
}
Bb = {
enabled: !0,
align: "center",
x: 0,
y: 15,
style: {
color: "#666",
fontSize: "11px",
lineHeight: "14px"
}
}, Z = {
colors: [ "#4572A7", "#AA4643", "#89A54E", "#80699B", "#3D96AE", "#DB843D", "#92A8CD", "#A47D7C", "#B5CA92" ],
symbols: [ "circle", "diamond", "square", "triangle", "triangle-down" ],
lang: {
loading: "Loading...",
months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
weekdays: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
decimalPoint: ".",
resetZoom: "Reset zoom",
resetZoomTitle: "Reset zoom level 1:1",
thousandsSep: ","
},
global: {
useUTC: !0
},
chart: {
borderColor: "#4572A7",
borderRadius: 5,
defaultSeriesType: "line",
ignoreHiddenSeries: !0,
spacingTop: 10,
spacingRight: 10,
spacingBottom: 15,
spacingLeft: 10,
style: {
fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
fontSize: "12px"
},
backgroundColor: "#FFFFFF",
plotBorderColor: "#C0C0C0"
},
title: {
text: "Chart title",
align: "center",
y: 15,
style: {
color: "#3E576F",
fontSize: "16px"
}
},
subtitle: {
text: "",
align: "center",
y: 30,
style: {
color: "#6D869F"
}
},
plotOptions: {
line: {
allowPointSelect: !1,
showCheckbox: !1,
animation: {
duration: 1e3
},
events: {},
lineWidth: 2,
shadow: !0,
marker: {
enabled: !0,
lineWidth: 0,
radius: 4,
lineColor: "#FFFFFF",
states: {
hover: {},
select: {
fillColor: "#FFFFFF",
lineColor: "#000000",
lineWidth: 2
}
}
},
point: {
events: {}
},
dataLabels: Gb(Bb, {
enabled: !1,
y: -6,
formatter: function() {
return this.y;
}
}),
showInLegend: !0,
states: {
hover: {
marker: {}
},
select: {
marker: {}
}
},
stickyTracking: !0
}
},
labels: {
style: {
position: db,
color: "#3E576F"
}
},
legend: {
enabled: !0,
align: "center",
layout: "horizontal",
labelFormatter: function() {
return this.name;
},
borderWidth: 1,
borderColor: "#909090",
borderRadius: 5,
shadow: !1,
style: {
padding: "5px"
},
itemStyle: {
cursor: "pointer",
color: "#3E576F"
},
itemHoverStyle: {
cursor: "pointer",
color: "#000000"
},
itemHiddenStyle: {
color: "#C0C0C0"
},
itemCheckboxStyle: {
position: db,
width: "13px",
height: "13px"
},
symbolWidth: 16,
symbolPadding: 5,
verticalAlign: "bottom",
x: 0,
y: 0
},
loading: {
hideDuration: 100,
labelStyle: {
fontWeight: "bold",
position: eb,
top: "1em"
},
showDuration: 100,
style: {
position: db,
backgroundColor: "white",
opacity: .5,
textAlign: "center"
}
},
tooltip: {
enabled: !0,
backgroundColor: "rgba(255, 255, 255, .85)",
borderWidth: 2,
borderRadius: 5,
shadow: !0,
snap: U ? 25 : 10,
style: {
color: "#333333",
fontSize: "12px",
padding: "5px",
whiteSpace: "nowrap"
}
},
toolbar: {
itemStyle: {
color: "#4572A7",
cursor: "pointer"
}
},
credits: {
enabled: !0,
text: "Highcharts.com",
href: "http://www.highcharts.com",
position: {
align: "right",
x: -10,
verticalAlign: "bottom",
y: -5
},
style: {
cursor: "pointer",
color: "#909090",
fontSize: "10px"
}
}
};
var Qb = {
dateTimeLabelFormats: {
second: "%H:%M:%S",
minute: "%H:%M",
hour: "%H:%M",
day: "%e. %b",
week: "%e. %b",
month: "%b '%y",
year: "%Y"
},
endOnTick: !1,
gridLineColor: "#C0C0C0",
labels: Bb,
lineColor: "#C0D0E0",
lineWidth: 1,
max: null,
min: null,
minPadding: .01,
maxPadding: .01,
minorGridLineColor: "#E0E0E0",
minorGridLineWidth: 1,
minorTickColor: "#A0A0A0",
minorTickLength: 2,
minorTickPosition: "outside",
startOfWeek: 1,
startOnTick: !1,
tickColor: "#C0D0E0",
tickLength: 5,
tickmarkPlacement: "between",
tickPixelInterval: 100,
tickPosition: "outside",
tickWidth: 1,
title: {
align: "middle",
style: {
color: "#6D869F",
fontWeight: "bold"
}
},
type: "linear"
}, Rb = Gb(Qb, {
endOnTick: !0,
gridLineWidth: 1,
tickPixelInterval: 72,
showLastLabel: !0,
labels: {
align: "right",
x: -8,
y: 3
},
lineWidth: 0,
maxPadding: .05,
minPadding: .05,
startOnTick: !0,
tickWidth: 0,
title: {
rotation: 270,
text: "Y-values"
},
stackLabels: {
enabled: !1,
formatter: function() {
return this.total;
},
style: Bb.style
}
}), Sb = {
labels: {
align: "right",
x: -8,
y: null
},
title: {
rotation: 270
}
}, Tb = {
labels: {
align: "left",
x: 8,
y: null
},
title: {
rotation: 90
}
}, Ub = {
labels: {
align: "center",
x: 0,
y: 14
},
title: {
rotation: 0
}
}, Vb = Gb(Ub, {
labels: {
y: -5
}
}), Wb = Z.plotOptions;
Bb = Wb.line, Wb.spline = Gb(Bb), Wb.scatter = Gb(Bb, {
lineWidth: 0,
states: {
hover: {
lineWidth: 0
}
}
}), Wb.area = Gb(Bb, {}), Wb.areaspline = Gb(Wb.area), Wb.column = Gb(Bb, {
borderColor: "#FFFFFF",
borderWidth: 1,
borderRadius: 0,
groupPadding: .2,
marker: null,
pointPadding: .1,
minPointLength: 0,
states: {
hover: {
brightness: .1,
shadow: !1
},
select: {
color: "#C0C0C0",
borderColor: "#000000",
shadow: !1
}
},
dataLabels: {
y: null,
verticalAlign: null
}
}), Wb.bar = Gb(Wb.column, {
dataLabels: {
align: "left",
x: 5,
y: 0
}
}), Wb.pie = Gb(Bb, {
borderColor: "#FFFFFF",
borderWidth: 1,
center: [ "50%", "50%" ],
colorByPoint: !0,
dataLabels: {
distance: 30,
enabled: !0,
formatter: function() {
return this.point.name;
},
y: 5
},
legendType: "point",
marker: null,
size: "75%",
showInLegend: !1,
slicedOffset: 10,
states: {
hover: {
brightness: .1,
shadow: !1
}
}
}), v();
var Xb = function(a) {
var c = [], d;
return function(a) {
if (d = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a)) c = [ b(d[1]), b(d[2]), b(d[3]), parseFloat(d[4], 10) ]; else if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) c = [ b(d[1], 16), b(d[2], 16), b(d[3], 16), 1 ];
}(a), {
get: function(b) {
return c && !isNaN(c[0]) ? b === "rgb" ? "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")" : b === "a" ? c[3] : "rgba(" + c.join(",") + ")" : a;
},
brighten: function(a) {
if (e(a) && a !== 0) {
var d;
for (d = 0; d < 3; d++) c[d] += b(a * 255), c[d] < 0 && (c[d] = 0), c[d] > 255 && (c[d] = 255);
}
return this;
},
setOpacity: function(a) {
return c[3] = a, this;
}
};
};
x.prototype = {
init: function(a, b) {
this.element = z.createElementNS("http://www.w3.org/2000/svg", b), this.renderer = a;
},
animate: function(a, b, c) {
(b = k(b, _, !0)) ? (b = Gb(b), c && (b.complete = c), Kb(this, a, b)) : (this.attr(a), c && c());
},
attr: function(d, e) {
var f, g, j, k, m = this.element, n = m.nodeName, o = this.renderer, p, q = this.shadows, r = this.htmlNode, s, t = this;
c(d) && h(e) && (f = d, d = {}, d[f] = e);
if (c(d)) f = d, n === "circle" ? f = {
x: "cx",
y: "cy"
}[f] || f : f === "strokeWidth" && (f = "stroke-width"), t = i(m, f) || this[f] || 0, f !== "d" && f !== "visibility" && (t = parseFloat(t)); else for (f in d) {
p = !1, g = d[f];
if (f === "d") g && g.join && (g = g.join(" ")), /(NaN| {2}|^$)/.test(g) && (g = "M 0 0"), this.d = g; else if (f === "x" && n === "text") {
for (j = 0; j < m.childNodes.length; j++) k = m.childNodes[j], i(k, "x") === i(m, "x") && i(k, "x", g);
this.rotation && i(m, "transform", "rotate(" + this.rotation + " " + g + " " + b(d.y || i(m, "y")) + ")");
} else if (f === "fill") g = o.color(g, m, f); else if (n !== "circle" || f !== "x" && f !== "y") if (f === "translateX" || f === "translateY" || f === "rotation" || f === "verticalAlign") this[f] = g, this.updateTransform(), p = !0; else if (f === "stroke") g = o.color(g, m, f); else if (f === "dashstyle") {
f = "stroke-dasharray", g = g && g.toLowerCase();
if (g === "solid") g = jb; else if (g) {
g = g.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
for (j = g.length; j--; ) g[j] = b(g[j]) * d["stroke-width"];
g = g.join(",");
}
} else f === "isTracker" ? this[f] = g : f === "width" ? g = b(g) : f === "align" ? (f = "text-anchor", g = {
left: "start",
center: "middle",
right: "end"
}[g]) : f === "title" && (j = z.createElementNS("http://www.w3.org/2000/svg", "title"), j.appendChild(z.createTextNode(g)), m.appendChild(j)); else f = {
x: "cx",
y: "cy"
}[f] || f;
f === "strokeWidth" && (f = "stroke-width"), P && f === "stroke-width" && g === 0 && (g = 1e-6), this.symbolName && /^(x|y|r|start|end|innerR)/.test(f) && (s || (this.symbolAttr(d), s = !0), p = !0);
if (q && /^(width|height|visibility|x|y|d)$/.test(f)) for (j = q.length; j--; ) i(q[j], f, g);
(f === "width" || f === "height") && n === "rect" && g < 0 && (g = 0), f === "text" ? (this.textStr = g, this.added && o.buildText(this)) : p || i(m, f, g);
if (r && (f === "x" || f === "y" || f === "translateX" || f === "translateY" || f === "visibility")) {
j = r.length ? r : [ this ], k = j.length;
var u;
for (u = 0; u < k; u++) r = j[u], p = r.getBBox(), r = r.htmlNode, l(r, a(this.styles, {
left: p.x + (this.translateX || 0) + ib,
top: p.y + (this.translateY || 0) + ib
})), f === "visibility" && l(r, {
visibility: g
});
}
}
return t;
},
symbolAttr: function(a) {
var b = this;
Db([ "x", "y", "r", "start", "end", "width", "height", "innerR" ], function(c) {
b[c] = k(a[c], b[c]);
}), b.attr({
d: b.renderer.symbols[b.symbolName](C(b.x * 2) / 2, C(b.y * 2) / 2, b.r, {
start: b.start,
end: b.end,
width: b.width,
height: b.height,
innerR: b.innerR
})
});
},
clip: function(a) {
return this.attr("clip-path", "url(" + this.renderer.url + "#" + a.id + ")");
},
crisp: function(a, b, c, d, e) {
var f, g = {}, h = {}, i;
a = a || this.strokeWidth || 0, i = a % 2 / 2, h.x = D(b || this.x || 0) + i, h.y = D(c || this.y || 0) + i, h.width = D((d || this.width || 0) - 2 * i), h.height = D((e || this.height || 0) - 2 * i), h.strokeWidth = a;
for (f in h) this[f] !== h[f] && (this[f] = g[f] = h[f]);
return g;
},
css: function(b) {
var c = this.element;
c = b && b.width && c.nodeName === "text";
var d, e = "", f = function(a, b) {
return "-" + b.toLowerCase();
};
b && b.color && (b.fill = b.color), this.styles = b = a(this.styles, b);
if (N && !R) c && delete b.width, l(this.element, b); else {
for (d in b) e += d.replace(/([A-Z])/g, f) + ":" + b[d] + ";";
this.attr({
style: e
});
}
return c && this.added && this.renderer.buildText(this), this;
},
on: function(a, b) {
var c = b;
return U && a === "click" && (a = "touchstart", c = function(a) {
a.preventDefault(), b();
}), this.element["on" + a] = c, this;
},
translate: function(a, b) {
return this.attr({
translateX: a,
translateY: b
});
},
invert: function() {
return this.inverted = !0, this.updateTransform(), this;
},
updateTransform: function() {
var a = this.translateX || 0, b = this.translateY || 0, c = this.inverted, d = this.rotation, e = [];
c && (a += this.attr("width"), b += this.attr("height")), (a || b) && e.push("translate(" + a + "," + b + ")"), c ? e.push("rotate(90) scale(-1,1)") : d && e.push("rotate(" + d + " " + this.x + " " + this.y + ")"), e.length && i(this.element, "transform", e.join(" "));
},
toFront: function() {
var a = this.element;
return a.parentNode.appendChild(a), this;
},
align: function(a, b, c) {
a ? (this.alignOptions = a, this.alignByTranslate = b, c || this.renderer.alignedObjects.push(this)) : (a = this.alignOptions, b = this.alignByTranslate), c = k(c, this.renderer);
var d = a.align, e = a.verticalAlign, f = (c.x || 0) + (a.x || 0), g = (c.y || 0) + (a.y || 0), h = {};
return /^(right|center)$/.test(d) && (f += (c.width - (a.width || 0)) / {
right: 1,
center: 2
}[d]), h[b ? "translateX" : "x"] = C(f), /^(bottom|middle)$/.test(e) && (g += (c.height - (a.height || 0)) / ({
bottom: 1,
middle: 2
}[e] || 1)), h[b ? "translateY" : "y"] = C(g), this[this.placed ? "animate" : "attr"](h), this.placed = !0, this.alignAttr = h, this;
},
getBBox: function() {
var b, c, d, e = this.rotation, f = e * L;
try {
b = a({}, this.element.getBBox());
} catch (g) {
b = {
width: 0,
height: 0
};
}
return c = b.width, d = b.height, e && (b.width = H(d * J(f)) + H(c * I(f)), b.height = H(d * I(f)) + H(c * J(f))), b;
},
show: function() {
return this.attr({
visibility: hb
});
},
hide: function() {
return this.attr({
visibility: fb
});
},
add: function(a) {
var c = this.renderer, d = a || c, e = d.element || c.box, f = e.childNodes, g = this.element, j = i(g, "zIndex");
this.parentInverted = a && a.inverted, this.textStr !== undefined && c.buildText(this), a && this.htmlNode && (a.htmlNode || (a.htmlNode = []), a.htmlNode.push(this)), j && (d.handleZ = !0, j = b(j));
if (d.handleZ) for (d = 0; d < f.length; d++) {
a = f[d], c = i(a, "zIndex");
if (a !== g && (b(c) > j || !h(j) && h(c))) return e.insertBefore(g, a), this;
}
return e.appendChild(g), this.added = !0, this;
},
safeRemoveChild: function(a) {
var b = a.parentNode;
b && b.removeChild(a);
},
destroy: function() {
var a = this, b = a.element || {}, c = a.shadows, d, e;
b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = null, Lb(a), a.clipPath && (a.clipPath = a.clipPath.destroy());
if (a.stops) {
for (e = 0; e < a.stops.length; e++) a.stops[e] = a.stops[e].destroy();
a.stops = null;
}
a.safeRemoveChild(b), c && Db(c, function(b) {
a.safeRemoveChild(b);
}), g(a.renderer.alignedObjects, a);
for (d in a) delete a[d];
return null;
},
empty: function() {
for (var a = this.element, b = a.childNodes, c = b.length; c--; ) a.removeChild(b[c]);
},
shadow: function(a, b) {
var c = [], d, e, f = this.element, g = this.parentInverted ? "(-1,-1)" : "(1,1)";
if (a) {
for (d = 1; d <= 3; d++) e = f.cloneNode(0), i(e, {
isShadow: "true",
stroke: "rgb(0, 0, 0)",
"stroke-opacity": .05 * d,
"stroke-width": 7 - 2 * d,
transform: "translate" + g,
fill: jb
}), b ? b.element.appendChild(e) : f.parentNode.insertBefore(e, f), c.push(e);
this.shadows = c;
}
return this;
}
};
var Yb = function() {
this.init.apply(this, arguments);
};
Yb.prototype = {
Element: x,
init: function(a, b, c, d) {
var e = location, f;
f = this.createElement("svg").attr({
xmlns: "http://www.w3.org/2000/svg",
version: "1.1"
}), a.appendChild(f.element), this.box = f.element, this.boxWrapper = f, this.alignedObjects = [], this.url = N ? "" : e.href.replace(/#.*?$/, ""), this.defs = this.createElement("defs").add(), this.forExport = d, this.gradients = [], this.setSize(b, c, !1);
},
destroy: function() {
var a, b = this.gradients, c = this.defs;
this.box = null, this.boxWrapper = this.boxWrapper.destroy();
if (b) {
for (a = 0; a < b.length; a++) this.gradients[a] = b[a].destroy();
this.gradients = null;
}
return c && (this.defs = c.destroy()), this.alignedObjects = null;
},
createElement: function(a) {
var b = new this.Element;
return b.init(this, a), b;
},
buildText: function(c) {
for (var d = c.element, e = k(c.textStr, "").toString().replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g), f = d.childNodes, g = /style="([^"]+)"/, h = /href="([^"]+)"/, j = i(d, "x"), n = c.styles, o = n && c.useHTML && !this.forExport, p = c.htmlNode, q = n && b(n.width), r = n && n.lineHeight, s, t = f.length; t--; ) d.removeChild(f[t]);
q && !c.added && this.box.appendChild(d), Db(e, function(a, e) {
var f, k = 0, m;
a = a.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"), f = a.split("|||"), Db(f, function(a) {
if (a !== "" || f.length === 1) {
var n = {}, o = z.createElementNS("http://www.w3.org/2000/svg", "tspan");
g.test(a) && i(o, "style", a.match(g)[1].replace(/(;| |^)color([ :])/, "$1fill$2")), h.test(a) && (i(o, "onclick", 'location.href="' + a.match(h)[1] + '"'), l(o, {
cursor: "pointer"
})), a = (a.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), o.appendChild(z.createTextNode(a)), k ? n.dx = 3 : n.x = j;
if (!k) {
if (e) {
!R && c.renderer.forExport && l(o, {
display: "block"
}), m = A.getComputedStyle && b(A.getComputedStyle(s, null).getPropertyValue("line-height"));
if (!m || isNaN(m)) m = r || s.offsetHeight || 18;
i(o, "dy", m);
}
s = o;
}
i(o, n), d.appendChild(o), k++;
if (q) {
a = a.replace(/-/g, "- ").split(" ");
for (var p, t = []; a.length || t.length; ) p = d.getBBox().width, n = p > q, !n || a.length === 1 ? (a = t, t = [], a.length && (o = z.createElementNS("http://www.w3.org/2000/svg", "tspan"), i(o, {
dy: r || 16,
x: j
}), d.appendChild(o), p > q && (q = p))) : (o.removeChild(o.firstChild), t.unshift(a.pop())), a.length && o.appendChild(z.createTextNode(a.join(" ").replace(/- /g, "-")));
}
}
});
});
if (o) {
p || (p = c.htmlNode = m("span", null, a(n, {
position: db,
top: 0,
left: 0
}), this.box.parentNode)), p.innerHTML = c.textStr;
for (t = f.length; t--; ) f[t].style.visibility = fb;
}
},
crispLine: function(a, b) {
return a[1] === a[4] && (a[1] = a[4] = C(a[1]) + b % 2 / 2), a[2] === a[5] && (a[2] = a[5] = C(a[2]) + b % 2 / 2), a;
},
path: function(a) {
return this.createElement("path").attr({
d: a,
fill: jb
});
},
circle: function(a, b, c) {
return a = d(a) ? a : {
x: a,
y: b,
r: c
}, this.createElement("circle").attr(a);
},
arc: function(a, b, c, e, f, g) {
return d(a) && (b = a.y, c = a.r, e = a.innerR, f = a.start, g = a.end, a = a.x), this.symbol("arc", a || 0, b || 0, c || 0, {
innerR: e || 0,
start: f || 0,
end: g || 0
});
},
rect: function(a, b, c, e, f, g) {
return d(a) && (b = a.y, c = a.width, e = a.height, f = a.r, g = a.strokeWidth, a = a.x), f = this.createElement("rect").attr({
rx: f,
ry: f,
fill: jb
}), f.attr(f.crisp(g, a, b, F(c, 0), F(e, 0)));
},
setSize: function(a, b, c) {
var d = this.alignedObjects, e = d.length;
this.width = a, this.height = b;
for (this.boxWrapper[k(c, !0) ? "animate" : "attr"]({
width: a,
height: b
}); e--; ) d[e].align();
},
g: function(a) {
var b = this.createElement("g");
return h(a) ? b.attr({
"class": gb + a
}) : b;
},
image: function(b, c, d, e, f) {
var g = {
preserveAspectRatio: jb
};
return arguments.length > 1 && a(g, {
x: c,
y: d,
width: e,
height: f
}), g = this.createElement("image").attr(g), g.element.setAttributeNS ? g.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : g.element.setAttribute("hc-svg-href", b), g;
},
symbol: function(b, c, d, e, f) {
var g, h = this.symbols[b];
h = h && h(C(c), C(d), e, f);
var i = /^url\((.*?)\)$/, j;
if (h) g = this.path(h), a(g, {
symbolName: b,
x: c,
y: d,
r: e
}), f && a(g, f); else if (i.test(b)) {
var k = function(a, b) {
a.attr({
width: b[0],
height: b[1]
}).translate(-C(b[0] / 2), -C(b[1] / 2));
};
j = b.match(i)[1], b = V[j], g = this.image(j).attr({
x: c,
y: d
}), b ? k(g, b) : (g.attr({
width: 0,
height: 0
}), m("img", {
onload: function() {
k(g, V[j] = [ this.width, this.height ]);
},
src: j
}));
} else g = this.circle(c, d, e);
return g;
},
symbols: {
square: function(a, b, c) {
return c = .707 * c, [ kb, a - c, b - c, lb, a + c, b - c, a + c, b + c, a - c, b + c, "Z" ];
},
triangle: function(a, b, c) {
return [ kb, a, b - 1.33 * c, lb, a + c, b + .67 * c, a - c, b + .67 * c, "Z" ];
},
"triangle-down": function(a, b, c) {
return [ kb, a, b + 1.33 * c, lb, a - c, b - .67 * c, a + c, b - .67 * c, "Z" ];
},
diamond: function(a, b, c) {
return [ kb, a, b - c, lb, a + c, b, a, b + c, a - c, b, "Z" ];
},
arc: function(a, b, c, d) {
var e = d.start, f = d.end - 1e-6, g = d.innerR, h = I(e), i = J(e), j = I(f);
return f = J(f), d = d.end - e < K ? 0 : 1, [ kb, a + c * h, b + c * i, "A", c, c, 0, d, 1, a + c * j, b + c * f, lb, a + g * j, b + g * f, "A", g, g, 0, d, 0, a + g * h, b + g * i, "Z" ];
}
},
clipRect: function(a, b, c, d) {
var e = gb + W++, f = this.createElement("clipPath").attr({
id: e
}).add(this.defs);
return a = this.rect(a, b, c, d, 0).add(f), a.id = e, a.clipPath = f, a;
},
color: function(a, b, c) {
var d, e = /^rgba/;
if (a && a.linearGradient) {
var f = this;
b = a.linearGradient, c = gb + W++;
var g, h, j;
return g = f.createElement("linearGradient").attr({
id: c,
gradientUnits: "userSpaceOnUse",
x1: b[0],
y1: b[1],
x2: b[2],
y2: b[3]
}).add(f.defs), f.gradients.push(g), g.stops = [], Db(a.stops, function(a) {
e.test(a[1]) ? (d = Xb(a[1]), h = d.get("rgb"), j = d.get("a")) : (h = a[1], j = 1), a = f.createElement("stop").attr({
offset: a[0],
"stop-color": h,
"stop-opacity": j
}).add(g), g.stops.push(a);
}), "url(" + this.url + "#" + c + ")";
}
return e.test(a) ? (d = Xb(a), i(b, c + "-opacity", d.get("a")), d.get("rgb")) : (b.removeAttribute(c + "-opacity"), a);
},
text: function(a, b, c, d) {
var e = Z.chart.style;
return b = C(k(b, 0)), c = C(k(c, 0)), a = this.createElement("text").attr({
x: b,
y: c,
text: a
}).css({
fontFamily: e.fontFamily,
fontSize: e.fontSize
}), a.x = b, a.y = c, a.useHTML = d, a;
}
}, T = Yb, R || (Cb = n(x, {
init: function(a, b) {
var c = [ "<", b, ' filled="f" stroked="f"' ], d = [ "position: ", db, ";" ];
(b === "shape" || b === cb) && d.push("left:0;top:0;width:10px;height:10px;"), O && d.push("visibility: ", b === cb ? fb : hb), c.push(' style="', d.join(""), '"/>'), b && (c = b === cb || b === "span" || b === "img" ? c.join("") : a.prepVML(c), this.element = m(c)), this.renderer = a;
},
add: function(a) {
var b = this.renderer, c = this.element, d = b.box;
return d = a ? a.element || a : d, a && a.inverted && b.invertChild(c, d), O && d.gVis === fb && l(c, {
visibility: fb
}), d.appendChild(c), this.added = !0, this.alignOnAdd && this.updateTransform(), this;
},
attr: function(a, b) {
var d, f, g, j = this.element || {}, k = j.style, n = j.nodeName, o = this.renderer, p = this.symbolName, q, r, s = this.shadows, t = this;
c(a) && h(b) && (d = a, a = {}, a[d] = b);
if (c(a)) d = a, t = d === "strokeWidth" || d === "stroke-width" ? this.strokeweight : this[d]; else for (d in a) {
f = a[d], q = !1;
if (p && /^(x|y|r|start|end|width|height|innerR)/.test(d)) r || (this.symbolAttr(a), r = !0), q = !0; else if (d === "d") {
f = f || [], this.d = f.join(" "), g = f.length;
for (q = []; g--; ) q[g] = e(f[g]) ? C(f[g] * 10) - 5 : f[g] === "Z" ? "x" : f[g];
f = q.join(" ") || "x", j.path = f;
if (s) for (g = s.length; g--; ) s[g].path = f;
q = !0;
} else if (d === "zIndex" || d === "visibility") {
if (O && d === "visibility" && n === "DIV") {
j.gVis = f, q = j.childNodes;
for (g = q.length; g--; ) l(q[g], {
visibility: f
});
f === hb && (f = null);
}
f && (k[d] = f), q = !0;
} else /^(width|height)$/.test(d) ? (this[d] = f, this.updateClipping ? (this[d] = f, this.updateClipping()) : k[d] = f, q = !0) : /^(x|y)$/.test(d) ? (this[d] = f, j.tagName === "SPAN" ? this.updateTransform() : k[{
x: "left",
y: "top"
}[d]] = f) : d === "class" ? j.className = f : d === "stroke" ? (f = o.color(f, j, d), d = "strokecolor") : d === "stroke-width" || d === "strokeWidth" ? (j.stroked = f ? !0 : !1, d = "strokeweight", this[d] = f, e(f) && (f += ib)) : d === "dashstyle" ? ((j.getElementsByTagName("stroke")[0] || m(o.prepVML([ "<stroke/>" ]), null, null, j))[d] = f || "solid", this.dashstyle = f, q = !0) : d === "fill" ? n === "SPAN" ? k.color = f : (j.filled = f !== jb ? !0 : !1, f = o.color(f, j, d), d = "fillcolor") : d === "translateX" || d === "translateY" || d === "rotation" || d === "align" ? (d === "align" && (d = "textAlign"), this[d] = f, this.updateTransform(), q = !0) : d === "text" && (this.bBox = null, j.innerHTML = f, q = !0);
if (s && d === "visibility") for (g = s.length; g--; ) s[g].style[d] = f;
q || (O ? j[d] = f : i(j, d, f));
}
return t;
},
clip: function(a) {
var b = this, c = a.members;
return c.push(b), b.destroyClip = function() {
g(c, b);
}, b.css(a.getCSS(b.inverted));
},
css: function(b) {
var c = this.element;
if (c = b && c.tagName === "SPAN" && b.width) delete b.width, this.textWidth = c, this.updateTransform();
return this.styles = a(this.styles, b), l(this.element, b), this;
},
safeRemoveChild: function(a) {
a.parentNode && w(a);
},
destroy: function() {
return this.destroyClip && this.destroyClip(), x.prototype.destroy.apply(this);
},
empty: function() {
for (var a = this.element.childNodes, b = a.length, c; b--; ) c = a[b], c.parentNode.removeChild(c);
},
getBBox: function() {
var a = this.element, b = this.bBox;
return b || (a.nodeName === "text" && (a.style.position = db), b = this.bBox = {
x: a.offsetLeft,
y: a.offsetTop,
width: a.offsetWidth,
height: a.offsetHeight
}), b;
},
on: function(a, b) {
return this.element["on" + a] = function() {
var a = A.event;
a.target = a.srcElement, b(a);
}, this;
},
updateTransform: function() {
if (this.added) {
var a = this, c = a.element, d = a.translateX || 0, e = a.translateY || 0, f = a.x || 0, g = a.y || 0, i = a.textAlign || "left", j = {
left: 0,
center: .5,
right: 1
}[i], k = i && i !== "left";
(d || e) && a.css({
marginLeft: d,
marginTop: e
}), a.inverted && Db(c.childNodes, function(b) {
a.renderer.invertChild(b, c);
});
if (c.tagName === "SPAN") {
var m, n;
d = a.rotation;
var o;
m = 0, e = 1;
var p = 0, q;
o = b(a.textWidth);
var r = a.xCorr || 0, s = a.yCorr || 0, t = [ d, i, c.innerHTML, a.textWidth ].join(",");
t !== a.cTT && (h(d) && (m = d * L, e = I(m), p = J(m), l(c, {
filter: d ? [ "progid:DXImageTransform.Microsoft.Matrix(M11=", e, ", M12=", -p, ", M21=", p, ", M22=", e, ", sizingMethod='auto expand')" ].join("") : jb
})), m = c.offsetWidth, n = c.offsetHeight, m > o && (l(c, {
width: o + ib,
display: "block",
whiteSpace: "normal"
}), m = o), o = C((b(c.style.fontSize) || 12) * 1.2), r = e < 0 && -m, s = p < 0 && -n, q = e * p < 0, r += p * o * (q ? 1 - j : j), s -= e * o * (d ? q ? j : 1 - j : 1), k && (r -= m * j * (e < 0 ? -1 : 1), d && (s -= n * j * (p < 0 ? -1 : 1)), l(c, {
textAlign: i
})), a.xCorr = r, a.yCorr = s), l(c, {
left: f + r,
top: g + s
}), a.cTT = t;
}
} else this.alignOnAdd = !0;
},
shadow: function(a, c) {
var d = [], e, f = this.element, g = this.renderer, h, i = f.style, j, k = f.path;
k && typeof k.value != "string" && (k = "x");
if (a) {
for (e = 1; e <= 3; e++) j = [ '<shape isShadow="true" strokeweight="', 7 - 2 * e, '" filled="false" path="', k, '" coordsize="100,100" style="', f.style.cssText, '" />' ], h = m(g.prepVML(j), null, {
left: b(i.left) + 1,
top: b(i.top) + 1
}), j = [ '<stroke color="black" opacity="', .05 * e, '"/>' ], m(g.prepVML(j), null, null, h), c ? c.element.appendChild(h) : f.parentNode.insertBefore(h, f), d.push(h);
this.shadows = d;
}
return this;
}
}), Bb = function() {
this.init.apply(this, arguments);
}, Bb.prototype = Gb(Yb.prototype, {
Element: Cb,
isIE8: M.indexOf("MSIE 8.0") > -1,
init: function(a, b, c) {
var d;
this.alignedObjects = [], d = this.createElement(cb), a.appendChild(d.element), this.box = d.element, this.boxWrapper = d, this.setSize(b, c, !1), z.namespaces.hcv || (z.namespaces.add("hcv", "urn:schemas-microsoft-com:vml"), z.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ");
},
clipRect: function(b, c, d, e) {
var f = this.createElement();
return a(f, {
members: [],
left: b,
top: c,
width: d,
height: e,
getCSS: function(b) {
var c = this.top, d = this.left, e = d + this.width, f = c + this.height;
return c = {
clip: "rect(" + C(b ? d : c) + "px," + C(b ? f : e) + "px," + C(b ? e : f) + "px," + C(b ? c : d) + "px)"
}, !b && O && a(c, {
width: e + ib,
height: f + ib
}), c;
},
updateClipping: function() {
Db(f.members, function(a) {
a.css(f.getCSS(a.inverted));
});
}
});
},
color: function(a, b, c) {
var d, e = /^rgba/;
if (!a || !a.linearGradient) return e.test(a) && b.tagName !== "IMG" ? (d = Xb(a), a = [ "<", c, ' opacity="', d.get("a"), '"/>' ], m(this.prepVML(a), null, null, b), d.get("rgb")) : (b = b.getElementsByTagName(c), b.length && (b[0].opacity = 1), a);
var f, g, h = a.linearGradient, i, j, k, l;
Db(a.stops, function(a, b) {
e.test(a[1]) ? (d = Xb(a[1]), f = d.get("rgb"), g = d.get("a")) : (f = a[1], g = 1), b ? (k = f, l = g) : (i = f, j = g);
}), a = 90 - B.atan((h[3] - h[1]) / (h[2] - h[0])) * 180 / K, a = [ "<", c, ' colors="0% ', i, ",100% ", k, '" angle="', a, '" opacity="', l, '" o:opacity2="', j, '" type="gradient" focus="100%" />' ], m(this.prepVML(a), null, null, b);
},
prepVML: function(a) {
var b = this.isIE8;
return a = a.join(""), b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:"), a;
},
text: function(a, b, c) {
var d = Z.chart.style;
return this.createElement("span").attr({
text: a,
x: C(b),
y: C(c)
}).css({
whiteSpace: "nowrap",
fontFamily: d.fontFamily,
fontSize: d.fontSize
});
},
path: function(a) {
return this.createElement("shape").attr({
coordsize: "100 100",
d: a
});
},
circle: function(a, b, c) {
return this.symbol("circle").attr({
x: a,
y: b,
r: c
});
},
g: function(a) {
var b;
return a && (b = {
className: gb + a,
"class": gb + a
}), this.createElement(cb).attr(b);
},
image: function(a, b, c, d, e) {
var f = this.createElement("img").attr({
src: a
});
return arguments.length > 1 && f.css({
left: b,
top: c,
width: d,
height: e
}), f;
},
rect: function(a, b, c, e, f, g) {
d(a) && (b = a.y, c = a.width, e = a.height, f = a.r, g = a.strokeWidth, a = a.x);
var h = this.symbol("rect");
return h.r = f, h.attr(h.crisp(g, a, b, F(c, 0), F(e, 0)));
},
invertChild: function(a, c) {
var d = c.style;
l(a, {
flip: "x",
left: b(d.width) - 10,
top: b(d.height) - 10,
rotation: -90
});
},
symbols: {
arc: function(a, b, c, d) {
var e = d.start, f = d.end, g = I(e), h = J(e), i = I(f), j = J(f);
d = d.innerR;
var k = .07 / c, l = d && .1 / d || 0;
return f - e === 0 ? [ "x" ] : (2 * K - f + e < k ? i = -k : f - e < l && (i = I(e + l)), [ "wa", a - c, b - c, a + c, b + c, a + c * g, b + c * h, a + c * i, b + c * j, "at", a - d, b - d, a + d, b + d, a + d * i, b + d * j, a + d * g, b + d * h, "x", "e" ]);
},
circle: function(a, b, c) {
return [ "wa", a - c, b - c, a + c, b + c, a + c, b, a + c, b, "e" ];
},
rect: function(a, b, c, d) {
if (!h(d)) return [];
var e = d.width;
d = d.height;
var f = a + e, g = b + d;
return c = G(c, e, d), [ kb, a + c, b, lb, f - c, b, "wa", f - 2 * c, b, f, b + 2 * c, f - c, b, f, b + c, lb, f, g - c, "wa", f - 2 * c, g - 2 * c, f, g, f, g - c, f - c, g, lb, a + c, g, "wa", a, g - 2 * c, a + 2 * c, g, a + c, g, a, g - c, lb, a, b + c, "wa", a, b, a + 2 * c, b + 2 * c, a, b + c, a + c, b, "x", "e" ];
}
}
}), T = Bb), y.prototype.callbacks = [];
var Zb = function() {};
Zb.prototype = {
init: function(a, b) {
var c = a.chart.counters, d;
return this.series = a, this.applyOptions(b), this.pointAttr = {}, a.options.colorByPoint && (d = a.chart.options.colors, this.options || (this.options = {}), this.color = this.options.color = this.color || d[c.color++], c.wrapColor(d.length)), a.chart.pointCount++, this;
},
applyOptions: function(b) {
var f = this.series;
this.config = b, e(b) || b === null ? this.y = b : d(b) && !e(b.length) ? (a(this, b), this.options = b) : c(b[0]) ? (this.name = b[0], this.y = b[1]) : e(b[0]) && (this.x = b[0], this.y = b[1]), this.x === bb && (this.x = f.autoIncrement());
},
destroy: function() {
var a = this, b = a.series, c = b.chart.hoverPoints, d;
b.chart.pointCount--, c && (a.setState(), g(c, a)), a === b.chart.hoverPoint && a.onMouseOut(), Ib(a), Db([ "graphic", "tracker", "group", "dataLabel", "connector", "shadowGroup" ], function(b) {
a[b] && a[b].destroy();
}), a.legendItem && a.series.chart.legend.destroyItem(a);
for (d in a) a[d] = null;
},
getLabelConfig: function() {
return {
x: this.category,
y: this.y,
series: this.series,
point: this,
percentage: this.percentage,
total: this.total || this.stackTotal
};
},
select: function(a, b) {
var c = this, d = c.series.chart;
a = k(a, !c.selected), c.firePointEvent(a ? "select" : "unselect", {
accumulate: b
}, function() {
c.selected = a, c.setState(a && "select"), b || Db(d.getSelectedPoints(), function(a) {
a.selected && a !== c && (a.selected = !1, a.setState(nb), a.firePointEvent("unselect"));
});
});
},
onMouseOver: function() {
var a = this.series.chart, b = a.tooltip, c = a.hoverPoint;
c && c !== this && c.onMouseOut(), this.firePointEvent("mouseOver"), b && !b.shared && b.refresh(this), this.setState(ob), a.hoverPoint = this;
},
onMouseOut: function() {
this.firePointEvent("mouseOut"), this.setState(), this.series.chart.hoverPoint = null;
},
tooltipFormatter: function(a) {
var b = this.series;
return [ '<span style="color:' + b.color + '">', this.name || b.name, "</span>: ", a ? "" : "<b>x = " + (this.name || this.x) + ",</b> ", "<b>", a ? "" : "y = ", this.y, "</b>" ].join("");
},
update: function(a, b, c) {
var e = this, f = e.series, g = e.graphic, h = f.chart;
b = k(b, !0), e.firePointEvent("update", {
options: a
}, function() {
e.applyOptions(a), d(a) && (f.getAttribs(), g && g.attr(e.pointAttr[f.state])), f.isDirty = !0, b && h.redraw(c);
});
},
remove: function(a, b) {
var c = this, d = c.series, e = d.chart, f = d.data;
u(b, e), a = k(a, !0), c.firePointEvent("remove", null, function() {
g(f, c), c.destroy(), d.isDirty = !0, a && e.redraw();
});
},
firePointEvent: function(a, b, c) {
var d = this, e = this.series.options;
(e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(), a === "click" && e.allowPointSelect && (c = function(a) {
d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
}), Jb(this, a, b, c);
},
importEvents: function() {
if (!this.hasImportedEvents) {
var a = Gb(this.series.options.point, this.options).events, b;
this.events = a;
for (b in a) Hb(this, b, a[b]);
this.hasImportedEvents = !0;
}
},
setState: function(a) {
var b = this.series, c = b.options.states, d = Wb[b.type].marker && b.options.marker, e = d && !d.enabled, f = (d = d && d.states[a]) && d.enabled === !1, g = b.stateMarkerGraphic, h = b.chart, i = this.pointAttr;
a = a || nb, a === this.state || this.selected && a !== "select" || c[a] && c[a].enabled === !1 || a && (f || e && !d.enabled) || (this.graphic ? this.graphic.attr(i[a]) : (a && (g || (b.stateMarkerGraphic = g = h.renderer.circle(0, 0, i[a].r).attr(i[a]).add(b.group)), g.translate(this.plotX, this.plotY)), g && g[a ? "show" : "hide"]()), this.state = a);
}
};
var $b = function() {};
$b.prototype = {
isCartesian: !0,
type: "line",
pointClass: Zb,
pointAttrToOptions: {
stroke: "lineColor",
"stroke-width": "lineWidth",
fill: "fillColor",
r: "radius"
},
init: function(b, c) {
var d, e;
e = b.series.length, this.chart = b, c = this.setOptions(c), a(this, {
index: e,
options: c,
name: c.name || "Series " + (e + 1),
state: nb,
pointAttr: {},
visible: c.visible !== !1,
selected: c.selected === !0
}), e = c.events;
for (d in e) Hb(this, d, e[d]);
if (e && e.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) b.runTrackerClick = !0;
this.getColor(), this.getSymbol(), this.setData(c.data, !1);
},
autoIncrement: function() {
var a = this.options, b = this.xIncrement;
return b = k(b, a.pointStart, 0), this.pointInterval = k(this.pointInterval, a.pointInterval, 1), this.xIncrement = b + this.pointInterval, b;
},
cleanData: function() {
var a = this.chart, b = this.data, c, d, e = a.smallestInterval, f, g;
s(b, function(a, b) {
return a.x - b.x;
});
if (this.options.connectNulls) for (g = b.length - 1; g >= 0; g--) b[g].y === null && b[g - 1] && b[g + 1] && b.splice(g, 1);
for (g = b.length - 1; g >= 0; g--) b[g - 1] && (f = b[g].x - b[g - 1].x, f > 0 && (d === bb || f < d) && (d = f, c = g));
if (e === bb || d < e) a.smallestInterval = d;
this.closestPoints = c;
},
getSegments: function() {
var a = -1, b = [], c = this.data;
Db(c, function(d, e) {
d.y === null ? (e > a + 1 && b.push(c.slice(a + 1, e)), a = e) : e === c.length - 1 && b.push(c.slice(a + 1, e + 1));
}), this.segments = b;
},
setOptions: function(a) {
var b = this.chart.options.plotOptions;
return Gb(b[this.type], b.series, a);
},
getColor: function() {
var a = this.chart.options.colors, b = this.chart.counters;
this.color = this.options.color || a[b.color++] || "#0000ff", b.wrapColor(a.length);
},
getSymbol: function() {
var a = this.chart.options.symbols, b = this.chart.counters;
this.symbol = this.options.marker.symbol || a[b.symbol++], b.wrapSymbol(a.length);
},
addPoint: function(a, b, c, d) {
var e = this.data, f = this.graph, g = this.area, h = this.chart;
a = (new this.pointClass).init(this, a), u(d, h), f && c && (f.shift = c), g && (g.shift = c, g.isArea = !0), b = k(b, !0), e.push(a), c && e[0].remove(!1), this.getAttribs(), this.isDirty = !0, b && h.redraw();
},
setData: function(a, b) {
var c = this, d = c.data, e = c.initialColor, f = c.chart, g = d && d.length || 0;
c.xIncrement = null, h(e) && (f.counters.color = e);
for (a = Fb(j(a || []), function(a) {
return (new c.pointClass).init(c, a);
}); g--; ) d[g].destroy();
c.data = a, c.cleanData(), c.getSegments(), c.getAttribs(), c.isDirty = !0, f.isDirtyBox = !0, k(b, !0) && f.redraw(!1);
},
remove: function(a, b) {
var c = this, d = c.chart;
a = k(a, !0), c.isRemoving || (c.isRemoving = !0, Jb(c, "remove", null, function() {
c.destroy(), d.isDirtyLegend = d.isDirtyBox = !0, a && d.redraw(b);
})), c.isRemoving = !1;
},
translate: function() {
for (var a = this.chart, b = this.options.stacking, c = this.xAxis.categories, d = this.yAxis, e = this.data, f = e.length; f--; ) {
var g = e[f], i = g.x, j = g.y, k = g.low, l = d.stacks[(j < 0 ? "-" : "") + this.stackKey];
g.plotX = this.xAxis.translate(i), b && this.visible && l && l[i] && (k = l[i], i = k.total, k.cum = k = k.cum - j, j = k + j, b === "percent" && (k = i ? k * 100 / i : 0, j = i ? j * 100 / i : 0), g.percentage = i ? g.y * 100 / i : 0, g.stackTotal = i), h(k) && (g.yBottom = d.translate(k, 0, 1, 0, 1)), j !== null && (g.plotY = d.translate(j, 0, 1, 0, 1)), g.clientX = a.inverted ? a.plotHeight - g.plotX : g.plotX, g.category = c && c[g.x] !== bb ? c[g.x] : g.x;
}
},
setTooltipPoints: function(a) {
var b = this.chart, c = b.inverted, d = [], e = C((c ? b.plotTop : b.plotLeft) + b.plotSizeX), f, g, h = [];
a && (this.tooltipPoints = null), Db(this.segments, function(a) {
d = d.concat(a);
}), this.xAxis && this.xAxis.reversed && (d = d.reverse()), Db(d, function(a, b) {
f = d[b - 1] ? d[b - 1]._high + 1 : 0;
for (g = a._high = d[b + 1] ? D((a.plotX + (d[b + 1] ? d[b + 1].plotX : e)) / 2) : e; f <= g; ) h[c ? e - f++ : f++] = a;
}), this.tooltipPoints = h;
},
onMouseOver: function() {
var a = this.chart, b = a.hoverSeries;
if (!!U || !a.mouseIsDown) b && b !== this && b.onMouseOut(), this.options.events.mouseOver && Jb(this, "mouseOver"), this.tracker && this.tracker.toFront(), this.setState(ob), a.hoverSeries = this;
},
onMouseOut: function() {
var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
d && d.onMouseOut(), this && a.events.mouseOut && Jb(this, "mouseOut"), c && !a.stickyTracking && c.hide(), this.setState(), b.hoverSeries = null;
},
animate: function(a) {
var b = this.chart, c = this.clipRect, e = this.options.animation;
e && !d(e) && (e = {}), a ? c.isAnimating || (c.attr("width", 0), c.isAnimating = !0) : (c.animate({
width: b.plotSizeX
}, e), this.animate = null);
},
drawPoints: function() {
var a, b = this.data, c = this.chart, d, e, f, g, h, i;
if (this.options.marker.enabled) for (f = b.length; f--; ) g = b[f], d = g.plotX, e = g.plotY, i = g.graphic, e !== bb && !isNaN(e) && (a = g.pointAttr[g.selected ? "select" : nb], h = a.r, i ? i.animate({
x: d,
y: e,
r: h
}) : g.graphic = c.renderer.symbol(k(g.marker && g.marker.symbol, this.symbol), d, e, h).attr(a).add(this.group));
},
convertAttribs: function(a, b, c, d) {
var e = this.pointAttrToOptions, f, g, h = {};
a = a || {}, b = b || {}, c = c || {}, d = d || {};
for (f in e) g = e[f], h[f] = k(a[g], b[f], c[f], d[f]);
return h;
},
getAttribs: function() {
var a = this, b = Wb[a.type].marker ? a.options.marker : a.options, c = b.states, d = c[ob], e, f = a.color, g = {
stroke: f,
fill: f
}, i = a.data, j = [], k, l = a.pointAttrToOptions, m;
a.options.marker ? (d.radius = d.radius || b.radius + 2, d.lineWidth = d.lineWidth || b.lineWidth + 1) : d.color = d.color || Xb(d.color || f).brighten(d.brightness).get(), j[nb] = a.convertAttribs(b, g), Db([ ob, "select" ], function(b) {
j[b] = a.convertAttribs(c[b], j[nb]);
}), a.pointAttr = j;
for (f = i.length; f--; ) {
g = i[f], (b = g.options && g.options.marker || g.options) && b.enabled === !1 && (b.radius = 0), e = !1;
if (g.options) for (m in l) h(b[l[m]]) && (e = !0);
e ? (k = [], c = b.states || {}, e = c[ob] = c[ob] || {}, a.options.marker || (e.color = Xb(e.color || g.options.color).brighten(e.brightness || d.brightness).get()), k[nb] = a.convertAttribs(b, j[nb]), k[ob] = a.convertAttribs(c[ob], j[ob], k[nb]), k.select = a.convertAttribs(c.select, j.select, k[nb])) : k = j, g.pointAttr = k;
}
},
destroy: function() {
var a = this, b = a.chart, c = a.clipRect, d = /\/5[0-9\.]+ (Safari|Mobile)\//.test(M), e, f;
Jb(a, "destroy"), Ib(a), a.legendItem && a.chart.legend.destroyItem(a), Db(a.data, function(a) {
a.destroy();
}), c && c !== b.clipRect && (a.clipRect = c.destroy()), Db([ "area", "graph", "dataLabelsGroup", "group", "tracker" ], function(b) {
a[b] && (e = d && b === "group" ? "hide" : "destroy", a[b][e]());
}), b.hoverSeries === a && (b.hoverSeries = null), g(b.series, a);
for (f in a) delete a[f];
},
drawDataLabels: function() {
if (this.options.dataLabels.enabled) {
var a, c, d = this.data, e = this.options, f = e.dataLabels, g, i = this.dataLabelsGroup, j = this.chart, l = j.renderer, m = j.inverted, n = this.type, o;
o = e.stacking;
var p = n === "column" || n === "bar", q = f.verticalAlign === null, r = f.y === null;
p && (o ? (q && (f = Gb(f, {
verticalAlign: "middle"
})), r && (f = Gb(f, {
y: {
top: 14,
middle: 4,
bottom: -6
}[f.verticalAlign]
}))) : q && (f = Gb(f, {
verticalAlign: "top"
}))), i ? i.translate(j.plotLeft, j.plotTop) : i = this.dataLabelsGroup = l.g("data-labels").attr({
visibility: this.visible ? hb : fb,
zIndex: 6
}).translate(j.plotLeft, j.plotTop).add(), o = f.color, o === "auto" && (o = null), f.style.color = k(o, this.color, "black"), Db(d, function(d) {
var o = d.barX, q = o && o + d.barW / 2 || d.plotX || -999, s = k(d.plotY, -999), t = d.dataLabel, u = f.align, v = r ? d.y >= 0 ? -6 : 12 : f.y;
g = f.formatter.call(d.getLabelConfig()), a = (m ? j.plotWidth - s : q) + f.x, c = (m ? j.plotHeight - q : s) + v, n === "column" && (a += {
left: -1,
right: 1
}[u] * d.barW / 2 || 0), m && d.y < 0 && (u = "right", a -= 10), t ? (m && !f.y && (c = c + b(t.styles.lineHeight) * .9 - t.getBBox().height / 2), t.attr({
text: g
}).animate({
x: a,
y: c
})) : h(g) && (t = d.dataLabel = l.text(g, a, c).attr({
align: u,
rotation: f.rotation,
zIndex: 1
}).css(f.style).add(i), m && !f.y && t.attr({
y: c + b(t.styles.lineHeight) * .9 - t.getBBox().height / 2
})), p && e.stacking && t && (q = d.barY, s = d.barW, d = d.barH, t.align(f, null, {
x: m ? j.plotWidth - q - d : o,
y: m ? j.plotHeight - o - s : q,
width: m ? d : s,
height: m ? s : d
}));
});
}
},
drawGraph: function() {
var a = this, b = a.options, c = a.graph, d = [], e, f = a.area, g = a.group, h = b.lineColor || a.color, i = b.lineWidth, j = b.dashStyle, l, m = a.chart.renderer, n = a.yAxis.getThreshold(b.threshold || 0), o = /^area/.test(a.type), p = [], q = [];
Db(a.segments, function(c) {
l = [], Db(c, function(d, e) {
a.getPointSpline ? l.push.apply(l, a.getPointSpline(c, d, e)) : (l.push(e ? lb : kb), e && b.step && l.push(d.plotX, c[e - 1].plotY), l.push(d.plotX, d.plotY));
}), c.length > 1 ? d = d.concat(l) : p.push(c[0]);
if (o) {
var e = [], f, g = l.length;
for (f = 0; f < g; f++) e.push(l[f]);
g === 3 && e.push(lb, l[1], l[2]);
if (b.stacking && a.type !== "areaspline") for (f = c.length - 1; f >= 0; f--) e.push(c[f].plotX, c[f].yBottom); else e.push(lb, c[c.length - 1].plotX, n, lb, c[0].plotX, n);
q = q.concat(e);
}
}), a.graphPath = d, a.singlePoints = p, o && (e = k(b.fillColor, Xb(a.color).setOpacity(b.fillOpacity || .75).get()), f ? f.animate({
d: q
}) : a.area = a.chart.renderer.path(q).attr({
fill: e
}).add(g)), c ? (Lb(c), c.animate({
d: d
})) : i && (c = {
stroke: h,
"stroke-width": i
}, j && (c.dashstyle = j), a.graph = m.path(d).attr(c).add(g).shadow(b.shadow));
},
render: function() {
var a = this, b = a.chart, c, d, e = a.options, f = e.animation, g = f && a.animate;
f = g ? f && f.duration || 500 : 0;
var h = a.clipRect, i = b.renderer;
h || (h = a.clipRect = !b.hasRendered && b.clipRect ? b.clipRect : i.clipRect(0, 0, b.plotSizeX, b.plotSizeY), b.clipRect || (b.clipRect = h)), a.group || (c = a.group = i.g("series"), b.inverted && (d = function() {
c.attr({
width: b.plotWidth,
height: b.plotHeight
}).invert();
}, d(), Hb(b, "resize", d), Hb(a, "destroy", function() {
Ib(b, "resize", d);
})), c.clip(a.clipRect).attr({
visibility: a.visible ? hb : fb,
zIndex: e.zIndex
}).translate(b.plotLeft, b.plotTop).add(b.seriesGroup)), a.drawDataLabels(), g && a.animate(!0), a.drawGraph && a.drawGraph(), a.drawPoints(), a.options.enableMouseTracking !== !1 && a.drawTracker(), g && a.animate(), setTimeout(function() {
h.isAnimating = !1, (c = a.group) && h !== b.clipRect && h.renderer && (c.clip(a.clipRect = b.clipRect), h.destroy());
}, f), a.isDirty = !1;
},
redraw: function() {
var a = this.chart, b = this.group;
b && (a.inverted && b.attr({
width: a.plotWidth,
height: a.plotHeight
}), b.animate({
translateX: a.plotLeft,
translateY: a.plotTop
})), this.translate(), this.setTooltipPoints(!0), this.render();
},
setState: function(a) {
var b = this.options, c = this.graph, d = b.states;
b = b.lineWidth, a = a || nb;
if (this.state !== a) {
this.state = a;
if (!d[a] || d[a].enabled !== !1) a && (b = d[a].lineWidth || b + 1), c && !c.dashstyle && c.attr({
"stroke-width": b
}, a ? 0 : 500);
}
},
setVisible: function(a, b) {
var c = this.chart, d = this.legendItem, e = this.group, f = this.tracker, g = this.dataLabelsGroup, h, i = this.data, j = c.options.chart.ignoreHiddenSeries;
h = this.visible, h = (this.visible = a = a === bb ? !h : a) ? "show" : "hide", e && e[h]();
if (f) f[h](); else for (e = i.length; e--; ) f = i[e], f.tracker && f.tracker[h]();
g && g[h](), d && c.legend.colorizeItem(this, a), this.isDirty = !0, this.options.stacking && Db(c.series, function(a) {
a.options.stacking && a.visible && (a.isDirty = !0);
}), j && (c.isDirtyBox = !0), b !== !1 && c.redraw(), Jb(this, h);
},
show: function() {
this.setVisible(!0);
},
hide: function() {
this.setVisible(!1);
},
select: function(a) {
this.selected = a = a === bb ? !this.selected : a, this.checkbox && (this.checkbox.checked = a), Jb(this, a ? "select" : "unselect");
},
drawTracker: function() {
var a = this, b = a.options, c = [].concat(a.graphPath), d = c.length, e = a.chart, f = e.options.tooltip.snap, g = a.tracker, h = b.cursor;
h = h && {
cursor: h
};
var i = a.singlePoints, j;
if (d) for (j = d + 1; j--; ) c[j] === kb && c.splice(j + 1, 0, c[j + 1] - f, c[j + 2], lb), (j && c[j] === kb || j === d) && c.splice(j, 0, lb, c[j - 2] + f, c[j - 1]);
for (j = 0; j < i.length; j++) d = i[j], c.push(kb, d.plotX - f, d.plotY, lb, d.plotX + f, d.plotY);
g ? g.attr({
d: c
}) : a.tracker = e.renderer.path(c).attr({
isTracker: !0,
stroke: mb,
fill: jb,
"stroke-width": b.lineWidth + 2 * f,
visibility: a.visible ? hb : fb,
zIndex: b.zIndex || 1
}).on(U ? "touchstart" : "mouseover", function() {
e.hoverSeries !== a && a.onMouseOver();
}).on("mouseout", function() {
b.stickyTracking || a.onMouseOut();
}).css(h).add(e.trackerGroup);
}
}, Bb = n($b), Mb.line = Bb, Bb = n($b, {
type: "area"
}), Mb.area = Bb, Bb = n($b, {
type: "spline",
getPointSpline: function(a, b, c) {
var d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1], h, i, j, k;
if (c && c < a.length - 1) {
a = f.plotY, j = g.plotX, g = g.plotY;
var l;
h = (1.5 * d + f.plotX) / 2.5, i = (1.5 * e + a) / 2.5, j = (1.5 * d + j) / 2.5, k = (1.5 * e + g) / 2.5, l = (k - i) * (j - d) / (j - h) + e - k, i += l, k += l, i > a && i > e ? (i = F(a, e), k = 2 * e - i) : i < a && i < e && (i = G(a, e), k = 2 * e - i), k > g && k > e ? (k = F(g, e), i = 2 * e - k) : k < g && k < e && (k = G(g, e), i = 2 * e - k), b.rightContX = j, b.rightContY = k;
}
return c ? (b = [ "C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e ], f.rightContX = f.rightContY = null) : b = [ kb, d, e ], b;
}
}), Mb.spline = Bb, Bb = n(Bb, {
type: "areaspline"
}), Mb.areaspline = Bb;
var _b = n($b, {
type: "column",
pointAttrToOptions: {
stroke: "borderColor",
"stroke-width": "borderWidth",
fill: "color",
r: "borderRadius"
},
init: function() {
$b.prototype.init.apply(this, arguments);
var a = this, b = a.chart;
b.hasColumn = !0, b.hasRendered && Db(b.series, function(b) {
b.type === a.type && (b.isDirty = !0);
});
},
translate: function() {
var b = this, c = b.chart, d = b.options, e = d.stacking, f = d.borderWidth, g = 0, i = b.xAxis.reversed, j = b.xAxis.categories, l = {}, m, n;
$b.prototype.translate.apply(b), Db(c.series, function(a) {
a.type === b.type && a.visible && (a.options.stacking ? (m = a.stackKey, l[m] === bb && (l[m] = g++), n = l[m]) : n = g++, a.columnIndex = n);
});
var o = b.data, p = b.closestPoints;
j = H(o[1] ? o[p].plotX - o[p - 1].plotX : c.plotSizeX / (j && j.length || 1)), p = j * d.groupPadding;
var q = (j - 2 * p) / g, r = d.pointWidth, s = h(r) ? (q - r) / 2 : q * d.pointPadding, t = F(k(r, q - 2 * s), 1), u = s + (p + ((i ? g - b.columnIndex : b.columnIndex) || 0) * q - j / 2) * (i ? -1 : 1), v = b.yAxis.getThreshold(d.threshold || 0), w = k(d.minPointLength, 5);
Db(o, function(g) {
var i = g.plotY, j = g.yBottom || v, k = g.plotX + u, l = E(G(i, j)), m = E(F(i, j) - l), n = b.yAxis.stacks[(g.y < 0 ? "-" : "") + b.stackKey], o;
e && b.visible && n && n[g.x] && n[g.x].setOffset(u, t), H(m) < w && (w && (m = w, l = H(l - v) > w ? j - w : v - (i <= v ? w : 0)), o = l - 3), a(g, {
barX: k,
barY: l,
barW: t,
barH: m
}), g.shapeType = "rect", i = a(c.renderer.Element.prototype.crisp.apply({}, [ f, k, l, t, m ]), {
r: d.borderRadius
}), f % 2 && (i.y -= 1, i.height += 1), g.shapeArgs = i, g.trackerArgs = h(o) && Gb(g.shapeArgs, {
height: F(6, m + 3),
y: o
});
});
},
getSymbol: function() {},
drawGraph: function() {},
drawPoints: function() {
var a = this, b = a.options, c = a.chart.renderer, d, e;
Db(a.data, function(f) {
var g = f.plotY;
g !== bb && !isNaN(g) && f.y !== null && (d = f.graphic, e = f.shapeArgs, d ? (Lb(d), d.animate(e)) : f.graphic = c[f.shapeType](e).attr(f.pointAttr[f.selected ? "select" : nb]).add(a.group).shadow(b.shadow));
});
},
drawTracker: function() {
var a = this, b = a.chart, c = b.renderer, d, e, f = +(new Date), g = a.options, h = g.cursor, j = h && {
cursor: h
}, k;
Db(a.data, function(h) {
e = h.tracker, d = h.trackerArgs || h.shapeArgs, delete d.strokeWidth, h.y !== null && (e ? e.attr(d) : h.tracker = c[h.shapeType](d).attr({
isTracker: f,
fill: mb,
visibility: a.visible ? hb : fb,
zIndex: g.zIndex || 1
}).on(U ? "touchstart" : "mouseover", function(c) {
k = c.relatedTarget || c.fromElement, b.hoverSeries !== a && i(k, "isTracker") !== f && a.onMouseOver(), h.onMouseOver();
}).on("mouseout", function(b) {
g.stickyTracking || (k = b.relatedTarget || b.toElement, i(k, "isTracker") !== f && a.onMouseOut());
}).css(j).add(h.group || b.trackerGroup));
});
},
animate: function(a) {
var b = this, c = b.data;
a || (Db(c, function(a) {
var c = a.graphic;
a = a.shapeArgs, c && (c.attr({
height: 0,
y: b.yAxis.translate(0, 0, 1)
}), c.animate({
height: a.height,
y: a.y
}, b.options.animation));
}), b.animate = null);
},
remove: function() {
var a = this, b = a.chart;
b.hasRendered && Db(b.series, function(b) {
b.type === a.type && (b.isDirty = !0);
}), $b.prototype.remove.apply(a, arguments);
}
});
Mb.column = _b, Bb = n(_b, {
type: "bar",
init: function(a) {
a.inverted = this.inverted = !0, _b.prototype.init.apply(this, arguments);
}
}), Mb.bar = Bb, Bb = n($b, {
type: "scatter",
translate: function() {
var a = this;
$b.prototype.translate.apply(a), Db(a.data, function(b) {
b.shapeType = "circle", b.shapeArgs = {
x: b.plotX,
y: b.plotY,
r: a.chart.options.tooltip.snap
};
});
},
drawTracker: function() {
var a = this, b = a.options.cursor, c = b && {
cursor: b
}, d;
Db(a.data, function(b) {
(d = b.graphic) && d.attr({
isTracker: !0
}).on("mouseover", function() {
a.onMouseOver(), b.onMouseOver();
}).on("mouseout", function() {
a.options.stickyTracking || a.onMouseOut();
}).css(c);
});
},
cleanData: function() {}
}), Mb.scatter = Bb, Bb = n(Zb, {
init: function() {
Zb.prototype.init.apply(this, arguments);
var b = this, c;
return a(b, {
visible: b.visible !== !1,
name: k(b.name, "Slice")
}), c = function() {
b.slice();
}, Hb(b, "select", c), Hb(b, "unselect", c), b;
},
setVisible: function(a) {
var b = this.series.chart, c = this.tracker, d = this.dataLabel, e = this.connector, f = this.shadowGroup, g;
g = (this.visible = a = a === bb ? !this.visible : a) ? "show" : "hide", this.group[g](), c && c[g](), d && d[g](), e && e[g](), f && f[g](), this.legendItem && b.legend.colorizeItem(this, a);
},
slice: function(a, b, c) {
var d = this.series.chart, e = this.slicedTranslation;
u(c, d), k(b, !0), a = this.sliced = h(a) ? a : !this.sliced, a = {
translateX: a ? e[0] : d.plotLeft,
translateY: a ? e[1] : d.plotTop
}, this.group.animate(a), this.shadowGroup && this.shadowGroup.animate(a);
}
}), Bb = n($b, {
type: "pie",
isCartesian: !1,
pointClass: Bb,
pointAttrToOptions: {
stroke: "borderColor",
"stroke-width": "borderWidth",
fill: "color"
},
getColor: function() {
this.initialColor = this.chart.counters.color;
},
animate: function() {
var a = this;
Db(a.data, function(b) {
var c = b.graphic;
b = b.shapeArgs;
var d = -K / 2;
c && (c.attr({
r: 0,
start: d,
end: d
}), c.animate({
r: b.r,
start: b.start,
end: b.end
}, a.options.animation));
}), a.animate = null;
},
translate: function() {
var a = 0, c = -0.25, d = this.options, e = d.slicedOffset, f = e + d.borderWidth, g = d.center.concat([ d.size, d.innerSize || 0 ]), h = this.chart, i = h.plotWidth, j = h.plotHeight, k, l, m, n = this.data, o = 2 * K, p, q = G(i, j), r, s, t, u = d.dataLabels.distance;
g = Fb(g, function(a, c) {
return (r = /%$/.test(a)) ? [ i, j, q, q ][c] * b(a) / 100 : a;
}), this.getX = function(a, b) {
return m = B.asin((a - g[1]) / (g[2] / 2 + u)), g[0] + (b ? -1 : 1) * I(m) * (g[2] / 2 + u);
}, this.center = g, Db(n, function(b) {
a += b.y;
}), Db(n, function(b) {
p = a ? b.y / a : 0, k = C(c * o * 1e3) / 1e3, c += p, l = C(c * o * 1e3) / 1e3, b.shapeType = "arc", b.shapeArgs = {
x: g[0],
y: g[1],
r: g[2] / 2,
innerR: g[3] / 2,
start: k,
end: l
}, m = (l + k) / 2, b.slicedTranslation = Fb([ I(m) * e + h.plotLeft, J(m) * e + h.plotTop ], C), s = I(m) * g[2] / 2, t = J(m) * g[2] / 2, b.tooltipPos = [ g[0] + s * .7, g[1] + t * .7 ], b.labelPos = [ g[0] + s + I(m) * u, g[1] + t + J(m) * u, g[0] + s + I(m) * f, g[1] + t + J(m) * f, g[0] + s, g[1] + t, u < 0 ? "center" : m < o / 4 ? "left" : "right", m ], b.percentage = p * 100, b.total = a;
}), this.setTooltipPoints();
},
render: function() {
this.drawPoints(), this.options.enableMouseTracking !== !1 && this.drawTracker(), this.drawDataLabels(), this.options.animation && this.animate && this.animate(), this.isDirty = !1;
},
drawPoints: function() {
var b = this.chart, c = b.renderer, d, e, f, g = this.options.shadow, h, i;
Db(this.data, function(j) {
e = j.graphic, i = j.shapeArgs, f = j.group, h = j.shadowGroup, g && !h && (h = j.shadowGroup = c.g("shadow").attr({
zIndex: 4
}).add()), f || (f = j.group = c.g("point").attr({
zIndex: 5
}).add()), d = j.sliced ? j.slicedTranslation : [ b.plotLeft, b.plotTop ], f.translate(d[0], d[1]), h && h.translate(d[0], d[1]), e ? e.animate(i) : j.graphic = c.arc(i).attr(a(j.pointAttr[nb], {
"stroke-linejoin": "round"
})).add(j.group).shadow(g, h), j.visible === !1 && j.setVisible(!1);
});
},
drawDataLabels: function() {
var a = this.data, c, d = this.chart, e = this.options.dataLabels, f = k(e.connectorPadding, 10), g = k(e.connectorWidth, 1), h, i, j = k(e.softConnector, !0), l = e.distance, m = this.center, n = m[2] / 2;
m = m[1];
var o = l > 0, p = [ [], [] ], q, r, s, t, u = 2, v;
if (e.enabled) {
$b.prototype.drawDataLabels.apply(this), Db(a, function(a) {
a.dataLabel && p[a.labelPos[7] < K / 2 ? 0 : 1].push(a);
}), p[1].reverse(), t = function(a, b) {
return b.y - a.y;
};
for (a = p[0][0] && p[0][0].dataLabel && b(p[0][0].dataLabel.styles.lineHeight); u--; ) {
var w = [], x = [], y = p[u], z = y.length, A;
for (v = m - n - l; v <= m + n + l; v += a) w.push(v);
s = w.length;
if (z > s) {
i = [].concat(y), i.sort(t);
for (v = z; v--; ) i[v].rank = v;
for (v = z; v--; ) y[v].rank >= s && y.splice(v, 1);
z = y.length;
}
for (v = 0; v < z; v++) {
c = y[v], i = c.labelPos, c = 9999;
for (r = 0; r < s; r++) h = H(w[r] - i[1]), h < c && (c = h, A = r);
if (A < v && w[v] !== null) A = v; else {
s < z - v + A && w[v] !== null && (A = s - z + v);
for (; w[A] === null; ) A++;
}
x.push({
i: A,
y: w[A]
}), w[A] = null;
}
x.sort(t);
for (v = 0; v < z; v++) {
c = y[v], i = c.labelPos, h = c.dataLabel, r = x.pop(), q = i[1], s = c.visible === !1 ? fb : hb, A = r.i, r = r.y;
if (q > r && w[A + 1] !== null || q < r && w[A - 1] !== null) r = q;
q = this.getX(A === 0 || A === w.length - 1 ? q : r, u), h.attr({
visibility: s,
align: i[6]
})[h.moved ? "animate" : "attr"]({
x: q + e.x + ({
left: f,
right: -f
}[i[6]] || 0),
y: r + e.y
}), h.moved = !0, o && g && (h = c.connector, i = j ? [ kb, q + (i[6] === "left" ? 5 : -5), r, "C", q, r, 2 * i[2] - i[4], 2 * i[3] - i[5], i[2], i[3], lb, i[4], i[5] ] : [ kb, q + (i[6] === "left" ? 5 : -5), r, lb, i[2], i[3], lb, i[4], i[5] ], h ? (h.animate({
d: i
}), h.attr("visibility", s)) : c.connector = h = this.chart.renderer.path(i).attr({
"stroke-width": g,
stroke: e.connectorColor || c.color || "#606060",
visibility: s,
zIndex: 3
}).translate(d.plotLeft, d.plotTop).add());
}
}
}
},
drawTracker: _b.prototype.drawTracker,
getSymbol: function() {}
}), Mb.pie = Bb, A.Highcharts = {
Chart: y,
dateFormat: $,
pathAnim: ab,
getOptions: function() {
return Z;
},
hasRtlBug: S,
numberFormat: o,
Point: Zb,
Color: Xb,
Renderer: T,
seriesTypes: Mb,
setOptions: function(a) {
return Z = Gb(Z, a), v(), Z;
},
Series: $b,
addEvent: Hb,
removeEvent: Ib,
createElement: m,
discardElement: w,
css: l,
each: Db,
extend: a,
map: Fb,
merge: Gb,
pick: k,
extendClass: n,
product: "Highcharts",
version: "2.1.9"
};
}();

var ActivityGraph = {
chart: null,
videoMinutes: {
type: "column",
name: "Video Minutes",
color: "#0080C9",
data: [],
defaultPoint: {
y: 0
}
},
exerciseMinutes: {
type: "column",
name: "Skill Minutes",
color: "#00C9AF",
data: [],
defaultPoint: {
y: 0
}
},
energyPoints: {
type: "spline",
name: "Energy Points",
yAxis: 1,
marker: {
enabled: !1
},
color: "#C9001B",
data: [],
defaultPoint: {
fEnergyPoints: !0
}
},
badges: {
type: "scatter",
name: "Badges",
showInLegend: !1,
data: [],
defaultPoint: {
y: 0,
enabled: !1
}
},
proficientExercises: {
type: "scatter",
name: "Proficient Skills",
showInLegend: !1,
data: [],
defaultPoint: {
y: 0,
enabled: !1
}
},
options: {
title: "",
credits: {
enabled: !1
},
chart: {
renderTo: "highchart",
events: {
click: function(a) {
ActivityGraph.bucketData.enableDrillDown && a && a.xAxis && a.xAxis[0] && ActivityGraph.drillIntoBucket_(Math.round(a.xAxis[0].value || 0));
}
}
},
plotOptions: {
column: {
stacking: "normal"
},
scatter: {
marker: {
states: {
hover: {
fillColor: "transparent",
lineColor: "transparent"
}
}
}
}
},
yAxis: [ {
title: {
text: "Time Spent (Minutes)",
style: {
color: "#0080C9"
}
},
labels: {
style: {
color: "#0080C9"
}
},
min: 0,
maxPadding: .15,
plotLines: [ {
value: 0,
width: 1,
color: "#808080"
} ]
}, {
title: {
text: "Energy Points Earned",
style: {
color: "#C9001B"
}
},
labels: {
style: {
color: "#C9001B"
}
},
plotLines: [ {
value: 0,
width: 1,
color: "#808080"
} ],
min: 0,
opposite: !0
} ],
legend: {
layout: "vertical",
align: "left",
verticalAlign: "top",
floating: !0,
backgroundColor: "white",
shadow: !0,
x: 70,
y: 5,
itemHoverStyle: {
cursor: "default",
color: "#3E576F"
}
}
},
generateBar_: function(a, b) {
if (this.bucketData.isGraphEmpty) {
var c = Math.floor(Math.random() * 20);
return {
y: c
};
}
return a ? {
y: a.minutes,
desc: "<strong>" + b + "</strong> (" + a.timeSpent + ")<br/>" + a.htmlSummary
} : {};
},
generateSpline_: function(a) {
if (this.bucketData.isGraphEmpty) {
var b = this.videoMinutes.data.length - 1, c = this.videoMinutes.data[b].y + this.exerciseMinutes.data[b].y, d = c * 1e3;
return {
y: d
};
}
return a ? {
y: a
} : {
y: 0
};
},
generateScatter_: function(a, b) {
if (this.bucketData.isGraphEmpty) {
if (Math.random() > .3) return {};
var c = this.videoMinutes.data.length - 1, d = this.videoMinutes.data[c].y + this.exerciseMinutes.data[c].y, e = b === "Achievements" ? "url(/images/badges/meteorite-small-chart.png)" : "url(/images/node-complete-chart.png)";
return {
y: d,
marker: {
symbol: e
}
};
}
if (!a) return {};
var e = "url(/images/node-complete-chart.png)";
return b === "Achievements" && (e = "url(" + a.badgeUrl + ")"), {
y: a.y,
desc: "<strong>" + b + "</strong><br/>" + a.htmlSummary,
marker: {
symbol: e
},
enabled: !0
};
},
generateAllMarks_: function(a, b) {
var c = {
x: a
}, d = {};
d = this.generateBar_(this.bucketData.dictTopicBuckets[b], "Videos"), this.videoMinutes.data.push(_.extend({}, this.videoMinutes.defaultPoint, c, d)), d = this.generateBar_(this.bucketData.dictExerciseBuckets[b], "Skills"), this.exerciseMinutes.data.push(_.extend({}, this.exerciseMinutes.defaultPoint, c, d)), d = this.generateSpline_(this.bucketData.dictPointsBuckets[b]), this.energyPoints.data.push(_.extend({}, this.energyPoints.defaultPoint, c, d)), d = this.generateScatter_(this.bucketData.dictBadgeBuckets[b], "Achievements"), this.badges.data.push(_.extend({}, this.badges.defaultPoint, c, d)), d = this.generateScatter_(this.bucketData.dictProficiencyBuckets[b], "Proficiencies"), this.proficientExercises.data.push(_.extend({}, this.proficientExercises.defaultPoint, c, d));
},
generateSeries_: function() {
return this.videoMinutes.data = [], this.exerciseMinutes.data = [], this.energyPoints.data = [], this.badges.data = [], this.proficientExercises.data = [], $.each(this.bucketData.bucketList, _.bind(this.generateAllMarks_, this)), [ this.videoMinutes, this.exerciseMinutes, this.energyPoints, this.badges, this.proficientExercises ];
},
generateOptions_: function() {
this.options.xAxis = {
categories: this.bucketData.bucketList,
labels: {
align: "left",
x: -5,
y: 10,
rotation: 45
},
min: 0
}, this.options.tooltip = {
shared: !0,
crosshairs: !0,
formatter: function() {
var a = "<b>" + this.x + "</b>";
s = "";
for (var b = 0; b < this.points.length; b++) this.points[b].point.desc ? s += "<br/><br/>" + this.points[b].point.desc : this.points[b].point.fEnergyPoints && (a += "<br/>" + this.points[b].point.y + " energy points");
return a + s;
},
enabled: !this.bucketData.isGraphEmpty
}, this.bucketData.graphTitle && (this.options.subtitle = {
text: this.bucketData.graphTitle,
x: -10
}), this.bucketData.enableDrillDown && (this.options.plotOptions.series = {
cursor: "pointer",
events: {
legendItemClick: function() {
return !1;
},
click: function(a) {
a && a.point && ActivityGraph.drillIntoBucket_(a.point.x);
}
}
}), this.options.series = this.generateSeries_();
},
drillIntoBucket_: function(a) {
if (a == null) return;
var b = this.chart.options.xAxis.categories[a];
b && Profile.loadGraph("/profile/graph/activity?email=" + this.bucketData.studentEmail + "&dt_start=" + b);
},
timePeriodTable_: {
today: {
bucket: "hour",
num: 24
},
yesterday: {
bucket: "hour",
num: 24
},
"last-week": {
bucket: "day",
num: 7
},
"last-month": {
bucket: "day",
num: 30
}
},
toTimeString_: function(a) {
var b = a.getHours(), c = a.getMinutes(), d = "AM", e = "", f = "";
return b === 0 ? b = 12 : b > 12 && (b -= 12, d = "PM"), e += b, c < 10 && (f = "0"), f += c, e + ":" + f + " " + d;
},
toDateString_: function(a) {
return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
},
generateFakeBuckets_: function(a) {
var b = {
bucketList: [],
dictBadgeBuckets: {},
dictExerciseBuckets: {},
dictTopicBuckets: {},
dictPointsBuckets: {},
dictProficiencyBuckets: {},
enableDrillDown: !1,
isGraphEmpty: !0
}, c = this.timePeriodTable_[a], d = c.num, e = c.bucket, f = e === "hour" ? (new Date).setHours(0, 0) : new Date;
return b.bucketList = _.map(_.range(d), _.bind(function(a) {
if (e === "hour") {
var b = new Date(f);
b.setHours(a);
var c = this.toTimeString_(b);
return c;
}
var b = new Date(f);
b.setDate(f.getDate() - d + a + 1);
var c = this.toDateString_(b);
return c;
}, this)), b;
},
render: function(a, b) {
if (a) this.bucketData = a; else {
this.bucketData = this.generateFakeBuckets_(b);
if (!$("#highchart-container").length) {
$("#graph-content").empty();
var c = $('<div id="highchart-container" class="empty-chart"></div>'), d = $('<div id="highchart"></div>');
$("#graph-content").append(c.append(d));
}
}
this.generateOptions_(), this.chart = new Highcharts.Chart(this.options), a && a.isGraphEmpty && Profile.showNotification("empty-graph");
}
}, FocusGraph = {
star: $.browser.msie ? "*" : "★",
generateSeries_: function() {
var a = [];
if (this.segmentData.totalExerciseSeconds) {
var b = {
type: "pie",
name: "Skills",
cursor: "",
size: "20%",
innerSize: "13%",
center: [ "11%", "14%" ],
dataLabels: {
connectorColor: "silver",
connectorWidth: 2,
color: "#898989"
},
data: [ {
name: "Skills",
fLegend: !0,
y: 100,
color: "silver"
} ]
};
a.push(b);
var c = {
type: "pie",
name: "Skill Focus",
innerSize: "55%",
size: "85%"
};
this.segmentData.isGraphEmpty || (c.point = {
events: {
click: function() {
Profile.router.navigate("/vital-statistics/problems/" + this.exid, !0);
}
}
}), c.data = _.map(this.segmentData.dictExerciseSeconds, function(a, b) {
var c = a.proficient ? ", <b>" + this.star + "Proficient</b>" : "", d = "<b>" + a.exerciseTitle + "</b> (skill" + c + ")";
return {
name: "<b>" + a.exerciseTitle + (a.proficient ? " " + this.star : "") + "</b>",
exid: a.exid,
y: a.percentage,
tooltip_title: d,
time_spent: a.timeSpent,
tooltip_more: a.sProblems + "<br/>" + a.sCorrectProblems + "<br/>"
};
}, this), a.push(c);
}
if (this.segmentData.totalTopicSeconds) {
var d = {
type: "pie",
name: "Videos",
cursor: "",
size: "9.4%",
innerSize: "3%",
center: [ "11%", "14%" ],
dataLabels: {
connectorColor: "silver",
connectorWidth: 2,
color: "#898989"
},
data: [ {
name: "",
fLegend: !0,
y: 25,
visible: !1,
color: "silver"
}, {
name: "Videos",
fLegend: !0,
y: 75,
color: "silver"
} ]
};
a.push(d);
var e = {
type: "pie",
cursor: "",
name: "Video Focus",
innerSize: "55%",
size: "85%"
};
this.segmentData.totalExerciseSeconds && _.extend(e, {
size: "40%",
innerSize: "10%",
dataLabels: {
enabled: !1
}
}), e.data = _.map(this.segmentData.dictTopicSeconds, function(a, b) {
return {
name: a.playlistTitle,
y: a.percentage,
tooltip_title: "<b>" + a.playlistTitle + "</b> (videos)",
time_spent: a.timeSpent,
tooltip_more: a.tooltipMore
};
}), a.push(e);
}
return a;
},
options: {
title: "",
credits: {
enabled: !1
},
chart: {
renderTo: "highchart"
},
plotOptions: {
pie: {
cursor: "pointer",
dataLabels: {
enabled: !0,
color: "black",
connectorColor: "black"
}
}
},
tooltip: {
enabled: !0,
formatter: function() {
return this.point.fLegend ? !1 : this.point.tooltip_title + "<br/> - " + this.point.time_spent + " total<br><br>" + this.point.tooltip_more;
}
}
},
generateFakeSegments_: function() {
var a = {
dictExerciseSeconds: {
unused1: {
exerciseTitle: "Addition 1",
proficient: !0,
percentage: 3
},
unused2: {
exerciseTitle: "Addition 2",
proficient: !0,
percentage: 4
},
unused3: {
exerciseTitle: "Multiplication 1",
proficient: !0,
percentage: 10
},
unused4: {
exerciseTitle: "Equation of a line",
proficient: !0,
percentage: 10
},
unused5: {
exerciseTitle: "Equation of a circle",
proficient: !1,
percentage: 33
},
unused6: {
exerciseTitle: "Derivative intuition",
proficient: !0,
percentage: 20
},
unused7: {
exerciseTitle: "Unit circle intuition",
proficient: !1,
percentage: 10
}
},
dictTopicSeconds: {
unused1: {
percentage: 32
},
unused2: {
percentage: 10
},
unused3: {
percentage: 46
},
unused4: {
percentage: 12
}
},
isGraphEmpty: !0,
totalExerciseSeconds: 100,
totalTopicSeconds: 100
};
return a;
},
render: function(a) {
if (a && !a.isGraphEmpty) this.segmentData = a; else {
this.segmentData = this.generateFakeSegments_();
if (!$("#highchart-container").length) {
$("#graph-content").empty();
var b = $('<div id="highchart-container" class="empty-chart"></div>'), c = $('<div id="highchart"></div>');
$("#graph-content").append(b.append(c));
}
}
this.options.series = this.generateSeries_(), this.chart = new Highcharts.Chart(this.options), a && a.isGraphEmpty && Profile.showNotification("empty-graph");
}
}, ExerciseGraphOverTime = {
options: {
title: "",
credits: {
enabled: !1
},
chart: {
renderTo: "highchart",
defaultSeriesType: "scatter"
},
plotOptions: {
scatter: {
cursor: "pointer",
dashStyle: "Solid",
lineWidth: 1
},
series: {
showInLegend: !1,
marker: {
radius: 6
},
point: {
events: {
click: function() {
Profile.router.navigate("/vital-statistics/problems/" + this.name, !0);
}
}
}
}
},
xAxis: {
title: {
text: "Days working on the site"
},
min: 0,
plotLines: [ {
value: 0,
width: 1,
color: "#808080"
} ]
},
yAxis: {
title: {
text: "Skills Completed"
},
plotLines: [ {
value: 0,
width: 1,
color: "#808080"
} ]
},
tooltip: {
formatter: function() {
return "<b>" + this.point.display_name + "</b><br/>" + this.point.dt;
}
},
legend: {
layout: "vertical",
align: "right",
verticalAlign: "top",
x: -10,
y: 100,
borderWidth: 0
}
},
generateSeries_: function(a) {
if (!a || a.length === 0) {
a = [];
for (var b = 1; b < 10; b++) {
var c = Math.floor(Math.random() * 5);
for (var d = 0; d < c; d++) a.push({
daysUntilProficient: b
});
}
}
return [ {
data: _.map(a, function(a, b) {
return {
dt: a.proficientDate,
name: a.name,
display_name: a.displayName,
x: a.daysUntilProficient,
y: b + 1
};
})
} ];
},
render: function(a) {
if (!a && !$("#highchart-container").length) {
$("#graph-content").empty();
var b = $('<div id="highchart-container" class="empty-chart"></div>'), c = $('<div id="highchart"></div>');
$("#graph-content").append(b.append(c));
}
this.options.series = this.generateSeries_(a), this.chart = new Highcharts.Chart(this.options), a && a.length === 0 && Profile.showNotification("empty-graph");
}
};

Handlebars.registerHelper("encodeURIComponent", function(a) {
return encodeURIComponent(a);
}), Handlebars.registerHelper("commafy", function(a) {
return a.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}), Handlebars.registerHelper("secondsToTime", function(a) {
var b = Math.floor(a / 31536e3);
a -= b * 31536e3;
var c = Math.floor(a / 86400);
a -= c * 86400;
var d = Math.floor(c / 30.5), e = Math.floor(c / 7), f = Math.floor(a / 3600);
a -= f * 3600, minutes = Math.floor(a / 60), a -= minutes * 60;
if (b) return b + " year" + (b > 1 ? "s" : "");
if (d) return d + " month" + (d > 1 ? "s" : "");
if (e) return e + " week" + (e > 1 ? "s" : "");
if (c) {
var g = c + " day" + (c > 1 ? "s" : "");
return f && (g += " " + f + " hour" + (f > 1 ? "s" : "")), g;
}
if (!f) return !minutes && a ? a + " second" + (a > 1 ? "s" : "") : minutes + " minute" + (minutes > 1 ? "s" : "");
var g = f + " hour" + (f > 1 ? "s" : "");
minutes && (g += minutes + " minute" + (minutes > 1 ? "s" : ""));
}), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_avatar-picker"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
d += "\n\n    ", e = a.categories, e = c.each.call(a, e, {
hash: {},
inverse: n.noop,
fn: n.program(2, g, b)
});
if (e || e === 0) d += e;
return d += '\n\n    <div class="category-title"><em>Coming Soon</em></div>\n    <div class="category-section">\n        <div class="category-avatars">\n            <div class="avatar locked">\n                <img src="/images/avatars/questionmark.png" class="avatar-preview">\n                <div class="name">???</div>\n            </div>\n        </div>\n        <div class="clear"></div>\n    </div>\n\n    ', d;
}
function g(a, b) {
var d = "", e;
d += "\n    ", e = a.avatars, e = c["if"].call(a, e, {
hash: {},
inverse: n.noop,
fn: n.program(3, h, b)
});
if (e || e === 0) d += e;
return d += "\n    ", d;
}
function h(a, b) {
var d = "", e, f;
d += '\n    <div class="category-title">', f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === o ? e() : e), d += p(e) + '</div>\n    <div class="category-section">\n        <div class="category-avatars">\n        ', e = a.avatars, e = c.each.call(a, e, {
hash: {},
inverse: n.noop,
fn: n.program(4, i, b)
});
if (e || e === 0) d += e;
return d += '\n        </div>\n        <div class="clear"></div>\n    </div>\n    ', d;
}
function i(a, b) {
var d = "", e, f;
d += '\n            <div class="avatar', e = a.isAvailable, e = c.unless.call(a, e, {
hash: {},
inverse: n.noop,
fn: n.program(5, j, b)
});
if (e || e === 0) d += e;
return d += '" data="', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === o ? e() : e), d += p(e) + '">\n                <img src="', f = c.imageSrc, f ? e = f.call(a, {
hash: {}
}) : (e = a.imageSrc, e = typeof e === o ? e() : e), d += p(e) + '" class="avatar-preview">\n                <div class="name">', f = c.displayName, f ? e = f.call(a, {
hash: {}
}) : (e = a.displayName, e = typeof e === o ? e() : e), d += p(e) + "</div>\n            </div>\n        ", d;
}
function j(a, b) {
return " locked";
}
function k(a, b) {
return "\n    Loading...\n    ";
}
c = c || a.helpers;
var l = "", m, n = this, o = "function", p = this.escapeExpression;
l += '<div class="modal-header">\n    <a href="#" class="close-button close">x</a><h3>Choose Your Avatar</h3>\n</div>\n<div class="modal-body avatar-picker-contents">\n\n    ', m = b.categories, m = c["if"].call(b, m, {
hash: {},
inverse: n.program(7, k, e),
fn: n.program(1, f, e)
});
if (m || m === 0) l += m;
return l += '\n\n</div>\n<div class="modal-footer"></div>\n', l;
});
}();

var Avatar = Avatar || {};

Avatar.Picker = function(a) {
this.el = null, this.contentEl = null, this.userModel = a, this.avatarData_ = [];
}, Avatar.Picker.template = Templates.get("profile.avatar-picker"), Avatar.Picker.prototype.getTemplateContext_ = function() {
return {
selectedSrc: this.userModel.get("avatarSrc"),
categories: this.avatarData_
};
}, Avatar.Picker.prototype.bindEvents_ = function() {
$(this.el).delegate(".category-avatars .avatar", "click", _.bind(this.onAvatarSelected_, this)).delegate(".category-avatars .avatar", "mouseenter", function(a) {
$(a.currentTarget).not(".locked").addClass("hover");
}).delegate(".category-avatars .avatar", "mouseleave", function(a) {
$(a.currentTarget).removeClass("hover");
}), this.userModel.bind("change:avatarSrc", _.bind(this.onAvatarChanged_, this));
}, Avatar.Picker.prototype.onAvatarSelected_ = function(a) {
if ($(a.currentTarget).hasClass("locked")) return;
var b = $(a.currentTarget).find("img.avatar-preview").attr("src"), c = $(a.currentTarget).attr("data");
b && c && this.userModel.set({
avatarName: c,
avatarSrc: b
});
}, Avatar.Picker.prototype.onAvatarChanged_ = function() {
var a = this.userModel.get("avatarSrc");
$(this.contentEl).find(".avatar").removeClass("selected").end().find("img.avatar-preview[src='" + a + "']").parent(".avatar").addClass("selected");
}, Avatar.Picker.prototype.fetchData_ = function() {
$.ajax({
method: "GET",
url: "/api/v1/avatars",
data: {
casing: "camel"
},
success: _.bind(this.onDataLoaded_, this),
error: function() {}
});
}, Avatar.Picker.prototype.onDataLoaded_ = function(a) {
this.avatarData_ = a, $(this.contentEl).html(Avatar.Picker.template(this.getTemplateContext_())), this.onAvatarChanged_();
}, Avatar.Picker.prototype.show = function() {
if (!this.el) {
var a = $("<div class='avatar-picker modal fade hide'></div>"), b = a;
this.el = a.get(0), this.contentEl = b.get(0), this.bindEvents_(), this.fetchData_();
}
$(this.contentEl).html(Avatar.Picker.template(this.getTemplateContext_())), this.onAvatarChanged_(), $(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
}).on("hidden", _.bind(this.onHide_, this));
}, Avatar.Picker.prototype.onHide_ = function() {
this.userModel.save();
}, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_username-picker"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i = "function", j = this.escapeExpression;
return f += '<div class="modal-header">\n    <a href="#" class="close-button close">x</a><h3>Edit basic info</h3>\n</div>\n<div class="modal-body">\n    <div class="notification info" style="display: none;">\n        In order to make your profile public, we need you to pick a username.\n    </div>\n    <div class="notification error" style="display: none;">\n        If you change your username, you cannot get your old one back for 120 days.\n    </div>\n    <div class="username-picker">\n        <div class="row nickname-row">\n            <div class="labels">\n                <label for="nickname">Real Name:</label>\n            </div>\n            <div class="inputs">\n                <input type="text" value="', h = c.nickname, h ? g = h.call(b, {
hash: {}
}) : (g = b.nickname, g = typeof g === i ? g() : g), f += j(g) + '" class="nickname" id="nickname"><span class="sidenote"></span>\n                <p class="input-description">\n                    This is how your name will appear around Khan Academy, and how your friends and coaches will recognize you.\n                </p>\n            </div>\n        </div>\n        <div class="row username-row">\n            <div class="labels">\n                <label for="username">Username:</label>\n            </div>\n            <div class="inputs">\n                <input type="text" value="', h = c.username, h ? g = h.call(b, {
hash: {}
}) : (g = b.username, g = typeof g === i ? g() : g), f += j(g) + '" class="username" id="username"><span class="sidenote"></span>\n                <p class="input-description">\n                    Your username will appear in your Khan Academy address.\n                </p>\n                <p class="input-description">\n                    http://www.khanacademy.org/profile/<span class="example-username">', h = c.username, h ? g = h.call(b, {
hash: {}
}) : (g = b.username, g = typeof g === i ? g() : g), f += j(g) + '</span>\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="modal-footer" style="text-align: right;">\n    <input id="cancel-profile-info" type="button" class="simple-button action-gradient" value="Cancel">\n    <input id="save-profile-info" type="button" class="simple-button action-gradient green" value="Save">\n</div>', f;
});
}(), UsernamePickerView = Backbone.View.extend({
id: "username-picker-container",
setPublicAfterSave_: !1,
savePending_: !1,
nicknameFieldAcceptable_: !0,
usernameFieldAcceptable_: !0,
events: {
"keypress .nickname": "onNicknameKeypress_",
"keypress .username": "onUsernameKeypress_",
"click :input": "onInputClick_",
"click #save-profile-info": "onSaveClick_",
"click #cancel-profile-info": "onCancelClicked_"
},
delegateEvents: function(a) {
$(this.el).on(Keys.textChangeEvents, ".nickname", Keys.wrapTextChangeHandler(this.onNicknameInput_, this)).on(Keys.textChangeEvents, ".username", Keys.wrapTextChangeHandler(this.onUsernameInput_, this)), UsernamePickerView.__super__.delegateEvents.call(this, a);
},
onInputClick_: function(a) {
$(a.target).focus();
},
initialize: function() {
this.template = Templates.get("profile.username-picker"), this.shouldShowUsernameWarning_ = !1, this.model.bind("validate:nickname", this.onValidateNickname_, this), this.model.bind("validate:username", this.onValidateUsername_, this), this.model.bind("savesuccess", this.onSaveSuccess_, this), this.model.bind("error", this.onSaveRejected_, this);
},
render: function() {
var a = {
username: this.model.get("username"),
nickname: this.model.get("nickname")
}, b = this.template(a);
return $(this.el).html(b).addClass("modal fade hide").modal({
keyboard: !0,
backdrop: !0
}).bind("hidden", _.bind(this.resetFields_, this)).bind("shown", _.bind(this.onPickerShown_, this)), this;
},
onCancelClicked_: function() {
this.toggle();
},
toggle: function(a) {
$(this.el).modal("toggle"), this.setPublicAfterSave_ = a, a && ($(".notification.info").show(), $("#save-profile-info").val("Save and make profile public"));
},
resetFields_: function() {
var a = this.model.get("nickname"), b = this.model.get("username");
this.nicknameFieldAcceptable_ = !0, this.usernameFieldAcceptable_ = !0, this.$(".notification").hide(), this.$(".nickname").val(a), this.$(".username").val(b), this.$(".example-username").text(b), this.$(".sidenote").text("").removeClass("success").removeClass("error"), this.$("#save-profile-info").prop("disabled", !1).val("Save");
},
onPickerShown_: function() {
Promos.hasUserSeen("Username change warning", function(a) {
this.shouldShowUsernameWarning_ = !a;
}, this);
},
onNicknameInput_: function(a) {
this.model.validateNickname(this.getFormValue_(".nickname"));
},
onNicknameKeypress_: function(a) {
a.keyCode === $.ui.keyCode.ENTER && this.$(".username").focus();
},
onUsernameKeypress_: function(a) {
a.keyCode === $.ui.keyCode.ENTER && (this.$("#save-profile-info").prop("disabled") || this.$("#save-profile-info").click(), this.model.validateUsername(this.getFormValue_(".username")));
},
onUsernameInput_: function(a) {
this.$("#save-profile-info").prop("disabled", !0), this.shouldShowUsernameWarning_ && this.model.get("username") && ($(".notification.error").show(), Promos.markAsSeen("Username change warning"), this.shouldShowUsernameWarning_ = !1), this.$(".example-username").text(this.getFormValue_(".username")), this.showSidenote_(".username-row", "Checking..."), this.debouncedValidateUsername_();
},
debouncedValidateUsername_: _.debounce(function() {
this.model.validateUsername(this.getFormValue_(".username"));
}, 1e3),
syncSaveButtonState_: function() {
this.$("#save-profile-info").prop("disabled", !this.usernameFieldAcceptable_ || !this.nicknameFieldAcceptable_);
},
onValidateNickname_: function(a) {
a ? this.showSidenote_(".nickname-row", "") : this.showSidenote_(".nickname-row", "Can't leave empty.", !1), this.usernameFieldAcceptable_ = a, this.syncSaveButtonState_();
},
onValidateUsername_: function(a, b) {
this.showSidenote_(".username-row", a, b), this.usernameFieldAcceptable_ = this.getFormValue_(".username") === this.model.get("username") || b, this.syncSaveButtonState_();
},
getFormValue_: function(a) {
return $.trim(this.$(a).val());
},
showSidenote_: function(a, b, c) {
var d = this.$(a).find(".sidenote"), b = b || "";
d.toggleClass("success", c === !0), d.toggleClass("error", c === !1), d.text(b);
},
onSaveClick_: function() {
var a = this.getFormValue_(".nickname"), b = this.getFormValue_(".username"), c = {
nickname: a,
username: b
};
this.setPublicAfterSave_ && (c.isPublic = !0);
var d = b != this.model.get("username");
this.model.save(c), $("#save-profile-info").prop("disabled", !0), d ? ($("#save-profile-info").val("Saving..."), this.savePending_ = !0) : this.toggle();
},
onSaveSuccess_: function() {
this.savePending_ && ($(this.el).modal("hide"), this.savePending_ = !1);
},
onSaveRejected_: function() {
this.onSaveSuccess_();
}
}), UserCardView = Backbone.View.extend({
className: "user-card",
events: {
"click .add-remove-coach": "onAddRemoveCoachClicked_"
},
editEvents: {
"click .avatar-pic-container": "onAvatarClick_",
"mouseenter .avatar-pic-container": "onAvatarHover_",
"mouseleave .avatar-pic-container": "onAvatarLeave_",
"click .edit-basic-info": "onEditBasicInfoClicked_",
"click .edit-display-case": "onEditDisplayCaseClicked_",
"click .edit-avatar": "onAvatarClick_",
"click .edit-visibility": "onEditVisibilityClicked_"
},
initialize: function() {
this.template = Templates.get("profile.user-card"), this.model.bind("change:avatarSrc", _.bind(this.onAvatarChanged_, this)), this.model.bind("change:isCoachingLoggedInUser", _.bind(this.onIsCoachingLoggedInUserChanged_, this)), this.model.bind("change:nickname", function(a) {
$(".nickname").text(a.get("nickname"));
}), this.model.bind("change:isPublic", this.onIsPublicChanged_), this.avatarPicker_ = null, this.usernamePicker_ = null;
},
onAvatarChanged_: function() {
this.$("#avatar-pic").attr("src", this.model.get("avatarSrc"));
},
render: function() {
var a = this.model.toJSON();
return a.countExercises = UserCardView.countExercises, a.countVideos = UserCardView.countVideos, $(this.el).html(this.template(a)).find("abbr.timeago").timeago(), this.delegateEditEvents_(), this;
},
onDropdownOpen_: function() {
this.$(".dropdown-toggle").addClass("toggled");
},
onDropdownClose_: function() {
this.$(".dropdown-toggle").removeClass("toggled");
},
delegateEditEvents_: function() {
this.model.isEditable() && (this.bindQtip_(), this.delegateEvents(this.editEvents), this.$(".dropdown-toggle").dropdown().bind("open", _.bind(this.onDropdownOpen_, this)).bind("close", _.bind(this.onDropdownClose_, this)));
},
bindQtip_: function() {
this.$(".edit-visibility").qtip({
content: {
text: "Making your profile public will make the information in this user card visible to anyone who visits your profile page. It will also allow your user card to show up when your friends search for you.",
title: {
text: "Profile Privacy Setting"
}
},
style: {
classes: "ui-tooltip-light ui-tooltip-shadow",
width: "250px"
},
position: {
my: "top right",
at: "bottom center"
},
show: {
delay: 500
},
hide: {
fixed: !0,
delay: 150
}
});
},
onAvatarHover_: function(a) {
this.$(".avatar-change-overlay").show();
},
onAvatarLeave_: function(a) {
this.$(".avatar-change-overlay").hide();
},
onAvatarClick_: function(a) {
this.avatarPicker_ || (this.avatarPicker_ = new Avatar.Picker(this.model)), this.avatarPicker_.show();
},
onAddRemoveCoachClicked_: function(a) {
var b = {
success: _.bind(this.onAddRemoveCoachSuccess_, this),
error: _.bind(this.onAddRemoveCoachError_, this)
};
this.model.toggleIsCoachingLoggedInUser(b);
},
onAddRemoveCoachSuccess_: function(a) {},
onAddRemoveCoachError_: function(a) {
this.model.toggleIsCoachingLoggedInUser();
},
onIsCoachingLoggedInUserChanged_: function() {
this.$(".add-remove-coach").toggle();
},
onEditBasicInfoClicked_: function(a, b) {
this.usernamePicker_ || (this.usernamePicker_ = new UsernamePickerView({
model: this.model
}), $("body").append(this.usernamePicker_.render().el)), this.usernamePicker_.toggle(b);
},
onEditDisplayCaseClicked_: function(a) {
a.stopPropagation(), $(".display-case-cover").click();
},
onEditVisibilityClicked_: function(a) {
if (!this.model.get("username")) {
this.onEditBasicInfoClicked_(null, !0);
return;
}
var b = this.model.get("isPublic");
this.model.save({
isPublic: !b
});
},
onIsPublicChanged_: function(a, b) {
var c = $(".visibility-toggler");
b ? c.removeClass("private").addClass("public").text("Profile is public") : c.removeClass("public").addClass("private").text("Profile is private"), c.effect("bounce");
}
}), UserCardView.countVideos = 0, UserCardView.countExercises = 0, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_user-card"] = a(function(a, b, c, d, e) {
function f(a, b) {
return " editable";
}
function g(a, b) {
var d = "", e, f;
return d += '\n             <a href="', f = c.toLoginRedirectHref, e = f ? f.call(a, "/profile", {
hash: {}
}) : x.call(a, "toLoginRedirectHref", "/profile", {
hash: {}
}), d += y(e) + '" class="simple-button action-gradient green">Log in to claim your profile</a>\n          ', d;
}
function h(a, b) {
var d = "", e, f;
return d += '\n          <div>\n              <span class="nickname">', f = c.nickname, f ? e = f.call(a, {
hash: {}
}) : (e = a.nickname, e = typeof e === z ? e() : e), d += y(e) + "</span>\n          </div>\n          ", d;
}
function i(a, b) {
var d = "", e;
d += '\n            <span class="dropdown">\n              <span class="dropdown-toggle simple-button">\n                Edit profile\n                <span class="caret"></span>\n              </span>\n              <ul class="dropdown-menu vertical-shadow-strong">\n                  ', e = a.isFullyEditable, e = c["if"].call(a, e, {
hash: {},
inverse: A.noop,
fn: A.program(8, j, b)
});
if (e || e === 0) d += e;
d += '\n                  <li><a class="edit-display-case" href="javascript:void(0)">Edit display case</a></li>\n                  <li><a class="edit-avatar" href="javascript:void(0)">Edit avatar</a></li>\n                  ', e = a.isFullyEditable, e = c["if"].call(a, e, {
hash: {},
inverse: A.noop,
fn: A.program(10, k, b)
});
if (e || e === 0) d += e;
return d += "\n              </ul>\n            </span>\n          ", d;
}
function j(a, b) {
return '\n                  <li><a class="edit-basic-info" href="javascript:void(0)">Edit basic info</a></li>\n                  ';
}
function k(a, b) {
return '\n                  <li><a class="edit-visibility" href="javascript:void(0)">Toggle privacy setting</a></li>\n                  ';
}
function l(a, b) {
var d = "", e;
d += "\n            <!--\n              ", e = a.isSelf, e = c.unless.call(a, e, {
hash: {},
inverse: A.noop,
fn: A.program(13, m, b)
});
if (e || e === 0) d += e;
d += '\n              <a href="javascript:void(0)" class="add-remove-coach simple-button action-gradient" style="', e = a.isCoachingLoggedInUser, e = c.unless.call(a, e, {
hash: {},
inverse: A.noop,
fn: A.program(16, o, b)
});
if (e || e === 0) d += e;
return d += '">Remove as a coach</a>\n              -->\n          ', d;
}
function m(a, b) {
var d = "", e;
d += '<a href="javascript:void(0)" class="add-remove-coach simple-button action-gradient" style="', e = a.isCoachingLoggedInUser, e = c["if"].call(a, e, {
hash: {},
inverse: A.noop,
fn: A.program(14, n, b)
});
if (e || e === 0) d += e;
return d += '">Add as a coach</a>', d;
}
function n(a, b) {
return " display: none;";
}
function o(a, b) {
return " display: none;";
}
function p(a, b) {
var d = "", e;
d += '\n<a href="javascript:void(0)"\n    class="edit-visibility visibility-toggler ', e = a.isPublic, e = c["if"].call(a, e, {
hash: {},
inverse: A.program(21, r, b),
fn: A.program(19, q, b)
});
if (e || e === 0) d += e;
d += '">Profile is ', e = a.isPublic, e = c["if"].call(a, e, {
hash: {},
inverse: A.program(25, t, b),
fn: A.program(23, s, b)
});
if (e || e === 0) d += e;
return d += '</a>\n<div id="username-picker-container" class="modal fade hide" style="display: none;">\n</div>\n', d;
}
function q(a, b) {
return "public";
}
function r(a, b) {
return "private";
}
function s(a, b) {
return "public";
}
function t(a, b) {
return "private";
}
c = c || a.helpers;
var u = "", v, w, x = c.helperMissing, y = this.escapeExpression, z = "function", A = this;
u += '<div class="user-info vertical-shadow clearfix">\n    <div class="basic-user-info" style="float: left;">\n      <div class="avatar-pic-container', v = b.isEditable, v = c["if"].call(b, v, {
hash: {},
inverse: A.noop,
fn: A.program(1, f, e)
});
if (v || v === 0) u += v;
u += '" style="float:left;" >\n        <img src="', w = c.avatarSrc, w ? v = w.call(b, {
hash: {}
}) : (v = b.avatarSrc, v = typeof v === z ? v() : v), u += y(v) + '" id="avatar-pic" class="avatar-pic" >\n        <div class="avatar-change-overlay" style="display: none">Change avatar</div>\n      </div>\n      <div class="user-deets">\n          ', v = b.isPhantom, v = c["if"].call(b, v, {
hash: {},
inverse: A.program(5, h, e),
fn: A.program(3, g, e)
});
if (v || v === 0) u += v;
u += '\n          <div>\n              <span>Joined <abbr class="timeago" title="', w = c.dateJoined, w ? v = w.call(b, {
hash: {}
}) : (v = b.dateJoined, v = typeof v === z ? v() : v), u += y(v) + '">', w = c.dateJoined, w ? v = w.call(b, {
hash: {}
}) : (v = b.dateJoined, v = typeof v === z ? v() : v), u += y(v) + '</abbr></span>\n          </div>\n          <div class="basic-stats clearfix">\n              <div class="simple-stat">\n                  <img class="summary-icon star" src="/images/profile-icons/inset-star.png">\n                  <div class="stat-text">', w = c.countExercisesProficient, w ? v = w.call(b, {
hash: {}
}) : (v = b.countExercisesProficient, v = typeof v === z ? v() : v), u += y(v) + '<span class="stat-divider">/</span>', w = c.countExercises, w ? v = w.call(b, {
hash: {}
}) : (v = b.countExercises, v = typeof v === z ? v() : v), u += y(v) + '</div>\n              </div>\n              <div class="simple-stat">\n                  <img class="summary-icon" src="/images/profile-icons/inset-camera.png">\n                  <div class="stat-text">', w = c.countVideosCompleted, w ? v = w.call(b, {
hash: {}
}) : (v = b.countVideosCompleted, v = typeof v === z ? v() : v), u += y(v) + '<span class="stat-divider">/</span>', w = c.countVideos, w ? v = w.call(b, {
hash: {}
}) : (v = b.countVideos, v = typeof v === z ? v() : v), u += y(v) + '</div>\n              </div>\n              <div class="simple-stat"><span title="', v = b.points, w = c.commafy, v = w ? w.call(b, v, {
hash: {}
}) : x.call(b, "commafy", v, {
hash: {}
}), u += y(v) + ' energy points" class="energy-points-badge" style="float:none; display:block; margin-bottom: 1px; margin-top: 2px; padding:0; line-height: 20px;">', v = b.points, w = c.commafy, v = w ? w.call(b, v, {
hash: {}
}) : x.call(b, "commafy", v, {
hash: {}
}), u += y(v) + '</span> Energy Points</div>\n          </div>\n          <div class="user-profile-controls clearfix">\n          ', v = b.isEditable, v = c["if"].call(b, v, {
hash: {},
inverse: A.program(12, l, e),
fn: A.program(7, i, e)
});
if (v || v === 0) u += v;
u += '\n          </div>\n      </div>\n    </div>\n    <div class="sticker-book">\n    </div>\n\n</div>\n', v = b.isFullyEditable, v = c["if"].call(b, v, {
hash: {},
inverse: A.noop,
fn: A.program(18, p, e)
});
if (v || v === 0) u += v;
return u += "\n", u;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_profile"] = a(function(a, b, c, d, e) {
function f(a, b) {
var c;
return c = a.profileData, c = c == null || c === !1 ? c : c.nickname, c = typeof c === p ? c() : c, q(c);
}
function g(a, b) {
return "Profile";
}
function h(a, b) {
var d = "", e, f;
return d += '\n                <li><a href="', f = c.profileRoot, f ? e = f.call(a, {
hash: {}
}) : (e = a.profileRoot, e = typeof e === p ? e() : e), d += q(e) + 'coaches" class="tab-link has-icon no-recolor" rel="community coaches">Coaches</a></li>\n                ', d;
}
function i(a, b) {
var d = "", e, f;
return d += "\n            <div class=\"empty-graph\">\n                <h2><a href='/#browse'>Watch a video</a> or <a href='/exercisedashboard'>try a skill</a>!</h2>\n                <p>Once you do, real data will show up here.</p>\n            </div>\n            <div class=\"error-graph\">\n                <h2>It's our fault.</h2>\n                <p>Try again later, and please <a href='/reportissue?type=Defect'>let us know</a> if it continues.</p>\n            </div>\n            <div class=\"no-coaches-for-phantoms\">\n                <h2><a href=\"", f = c.toLoginRedirectHref, e = f ? f.call(a, "/profile", {
hash: {}
}) : r.call(a, "toLoginRedirectHref", "/profile", {
hash: {}
}), d += q(e) + '">Log in</a> to add a coach!</h2>\n            </div>\n            <div class="no-discussion">\n                <h2><a href=\'/#browse\'>Watch a video</a> and join the discussion!</h2>\n                <p>Once you do, your questions will show up here.</p>\n            </div>\n        ', d;
}
function j(a, b) {
return '\n            <div class="public">\n                <h2>Oops, you\'re not allowed!</h2>\n                <p>To view real data, you must be a coach.</p>\n            </div>\n        ';
}
function k(a, b) {
return '\n            <div class="activity-column">\n                <div id="activity-loading-placeholder">\n                    <h2>Loading activity...</h2>\n                    <div id="recent-activity-progress-bar"></div>\n                </div>\n                <div id="activity-contents" style="display:none">\n                    <div id="suggested-activity">\n                        <h2>Suggested Activity</h2>\n                    </div>\n                    <div id="recent-activity">\n                        <h2>Recently Completed Activity</h2>\n                    </div>\n                </div>\n            </div>\n            <div class="mini-stats-column">\n            </div>\n            ';
}
function l(a, b) {
return ' class="empty-chart"';
}
c = c || a.helpers, d = d || a.partials;
var m = "", n, o, p = "function", q = this.escapeExpression, r = c.helperMissing, s = this;
m += '<style>\n  #page_sub_nav {\n    display: none;\n  }\n</style>\n\n<!-- If you drastically change the below nav, try to update the screenshots in coach.html. -->\n<menu class="profile-navigation">\n    <ul class="vertical-tab-list">\n        <li class="profile-tab"><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + '" class="tab-link no-recolor active-tab" rel="profile">\n            <img src="', n = b.profileData, n = n == null || n === !1 ? n : n.avatarSrc, n = typeof n === p ? n() : n, m += q(n) + '" class="profile-tab-avatar">\n            <span id="profile-tab-link" class="profile-tab-text">', n = b.profileData, n = n == null || n === !1 ? n : n.nickname, n = c["if"].call(b, n, {
hash: {},
inverse: s.program(3, g, e),
fn: s.program(1, f, e)
});
if (n || n === 0) m += n;
m += '</span>\n        </a></li>\n        <li>\n            <span class="inactive link-section-header">Accomplishments</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'achievements" class="tab-link has-icon no-recolor" rel="achievements">Achievements</a></li>\n                <li><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'goals" class="tab-link has-icon no-recolor" rel="goals">Goals (beta)</a></li>\n            </ul>\n        </li>\n        <li>\n            <span class="inactive link-section-header">Vital statistics</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'vital-statistics/activity" class="tab-link has-icon no-recolor" rel="vital-statistics activity">Activity</a></li>\n                <li><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'vital-statistics/focus" class="tab-link has-icon no-recolor" rel="vital-statistics focus">Focus</a></li>\n                <li><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'vital-statistics/skill-progress" class="tab-link has-icon no-recolor" rel="vital-statistics skill-progress">Skill Progress</a></li>\n                <li><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'vital-statistics/skill-progress-over-time" class="tab-link has-icon no-recolor" rel="vital-statistics skill-progress-over-time">Progress Over Time</a></li>\n            </ul>\n        </li>\n        <li>\n            <span class="inactive link-section-header">Community</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'discussion" class="tab-link has-icon no-recolor" rel="community discussion">Discussion</a></li>\n                ', n = b.profileData, n = n == null || n === !1 ? n : n.isSelf, n = c["if"].call(b, n, {
hash: {},
inverse: s.noop,
fn: s.program(5, h, e)
});
if (n || n === 0) m += n;
m += '\n            </ul>\n        </li>\n    </ul>\n</menu>\n\n<section class="tab-content">\n    <h2 class="profile-sheet-title"></h2>\n    <div class="profile-notification">\n        ', n = b.profileData, n = n == null || n === !1 ? n : n.isFullyAccessible, n = c["if"].call(b, n, {
hash: {},
inverse: s.program(9, j, e),
fn: s.program(7, i, e)
});
if (n || n === 0) m += n;
m += '\n    </div>\n    <div class="clearfix">\n        <div id="tab-content-user-profile" rel="profile">\n            <div class="user-info-container"></div>\n            <div style="clear: both; margin-bottom: 20px;"></div>\n            ', n = b.profileData, n = n == null || n === !1 ? n : n.isFullyAccessible, n = c["if"].call(b, n, {
hash: {},
inverse: s.noop,
fn: s.program(11, k, e)
});
if (n || n === 0) m += n;
m += '\n        </div>\n\n        <div id="tab-content-vital-statistics" rel="vital-statistics">\n            ', n = b, n = s.invokePartial(d["profile_vital-statistics"], "profile_vital-statistics", n, c, d);
if (n || n === 0) m += n;
m += '\n        </div>\n\n        <div id="tab-content-achievements" rel="achievements"', n = b.profileData, n = n == null || n === !1 ? n : n.email, n = c.unless.call(b, n, {
hash: {},
inverse: s.noop,
fn: s.program(13, l, e)
});
if (n || n === 0) m += n;
return m += '>\n        </div>\n\n        <div id="tab-content-goals" rel="goals">\n            <div class="graph-picker">\n                Shows your current, completed and abandoned goals.\n                <ul class="tabrow">\n                    <li class="type current">\n                        <a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'goals/current" class="graph-link no-recolor">Current</a>\n                    </li>\n                    <li class="type completed">\n                        <a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'goals/completed" class="graph-link no-recolor">Completed</a>\n                    </li>\n                    <li class="type abandoned">\n                        <a href="', o = c.profileRoot, o ? n = o.call(b, {
hash: {}
}) : (n = b.profileRoot, n = typeof n === p ? n() : n), m += q(n) + 'goals/abandoned" class="graph-link no-recolor">Abandoned</a>\n                    </li>\n                    <li>\n                        <a class="new-goal simple-button action-gradient disabled" href="javascript:void(0);">Create a new goal</a>\n                    </li>\n                </ul>\n            </div>\n            <div id="profile-goals-content"></div>\n        </div>\n        <div id="tab-content-coaches" rel="coaches">\n        </div>\n        <div id="tab-content-discussion" rel="discussion" style="width: 60%">\n            <div class="graph-picker">\n                Shows the questions that you\'ve asked.\n            </div>\n        </div>\n        <div id="tab-content-settings" rel="settings">\n        </div>\n    </div>\n</section>\n', m;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_suggested-activity"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
d += '\n        <li class="activity-exercise clearfix">\n            <div class="ach-text">\n                <span class="activity-image"></span>\n                <a class="covering-link"  href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '">\n                    <span></span>\n                </a>\n                <a class="ellipsis foreground-link" title="', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === j ? e() : e), d += k(e) + '" href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '">\n                    ', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === j ? e() : e), d += k(e) + '\n                </a>\n                <div class="skill-bar-container">', e = a.progress, f = c["skill-bar"], e = f ? f.call(a, e, {
hash: {}
}) : l.call(a, "skill-bar", e, {
hash: {}
});
if (e || e === 0) d += e;
return d += '</div>\n                <div class="suggested-activity-controls">\n                    <a class="foreground-link" href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '">\n                        <span class="simple-button action-gradient">Rock out</span>\n                    </a>\n                </div>\n            </div>\n        </li>\n    ', d;
}
function g(a, b) {
var d = "", e, f;
d += '\n        <li class="activity-video clearfix">\n            <div class="ach-text">\n                <span class="activity-image"></span>\n                <a class="covering-link" href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '">\n                    <span></span>\n                </a>\n                <a class="ellipsis foreground-link" title="', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === j ? e() : e), d += k(e) + '" href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '">\n                    ', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === j ? e() : e), d += k(e) + '\n                </a>\n                <div class="skill-bar-container">', e = a.progress, f = c["skill-bar"], e = f ? f.call(a, e, {
hash: {}
}) : l.call(a, "skill-bar", e, {
hash: {}
});
if (e || e === 0) d += e;
return d += '</div>\n                <div class="suggested-activity-controls">\n                    <a class="foreground-link" href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '">\n                        <span class="simple-button action-gradient">Watch on</span>\n                    </a>\n                 </div>\n            </div>\n        </li>\n    ', d;
}
c = c || a.helpers;
var h = "", i, j = "function", k = this.escapeExpression, l = c.helperMissing, m = this;
h += '<!-- TODO(marcia): Clean up to involve less copy paste action, also ach-text\'s is more of a container and not achievement text.-->\n<div class="activity-list">\n    <ul>\n    ', i = b.exercises, i = c.each.call(b, i, {
hash: {},
inverse: m.noop,
fn: m.program(1, f, e)
});
if (i || i === 0) h += i;
h += "\n\n    ", i = b.videos, i = c.each.call(b, i, {
hash: {},
inverse: m.noop,
fn: m.program(3, g, e)
});
if (i || i === 0) h += i;
return h += "\n    </ul>\n</div>\n", h;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_recent-activity-list"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
d += '\n    <div class="activity-list">\n        <ul>\n            ', e = c.each.call(a, a, {
hash: {},
inverse: l.noop,
fn: l.program(2, g, b)
});
if (e || e === 0) d += e;
return d += "\n        </ul>\n    </div>\n", d;
}
function g(a, b) {
var d = "", e, f;
d += "\n            ", f = c.renderActivity, e = f ? f.call(a, a, {
hash: {},
inverse: l.noop,
fn: l.program(3, h, b)
}) : m.call(a, "renderActivity", a, {
hash: {},
inverse: l.noop,
fn: l.program(3, h, b)
});
if (e || e === 0) d += e;
return d += "\n            ", d;
}
function h(a, b) {
var c = "";
return c;
}
function i(a, b) {
return '\n    Recent <a href="/#browse">video</a>, <a href="/exercisedashboard">exercise</a>, and <a href="#achievements">badge</a> activity will show up here.\n';
}
c = c || a.helpers;
var j = "", k, l = this, m = c.helperMissing;
k = c["if"].call(b, b, {
hash: {},
inverse: l.program(5, i, e),
fn: l.program(1, f, e)
});
if (k || k === 0) j += k;
return j += "\n\n", j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_recent-activity-exercise"] = a(function(a, b, c, d, e) {
function f(a, b) {
return " proficient";
}
function g(a, b) {
var d = "", e, f;
return d += '<a href="', f = c.profileRoot, f ? e = f.call(a, {
hash: {}
}) : (e = a.profileRoot, e = typeof e === m ? e() : e), d += n(e) + "vital-statistics/problems/", f = c.exercise, f ? e = f.call(a, {
hash: {}
}) : (e = a.exercise, e = typeof e === m ? e() : e), d += n(e) + '">', d;
}
function h(a, b) {
return "</a>";
}
function i(a, b) {
return " to achieve proficiency";
}
c = c || a.helpers;
var j = "", k, l, m = "function", n = this.escapeExpression, o = this, p = c.helperMissing;
j += '<li class="activity-exercise clearfix', k = b.earnedProficiency, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(1, f, e)
});
if (k || k === 0) j += k;
j += '">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Answered <span class="problem-count">', k = b.mobileView, k = c.unless.call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(3, g, e)
});
if (k || k === 0) j += k;
k = b.cProblems, l = c.pluralize, k = l ? l.call(b, k, "problem", {
hash: {}
}) : p.call(b, "pluralize", k, "problem", {
hash: {}
}), j += n(k), k = b.mobileView, k = c.unless.call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(5, h, e)
});
if (k || k === 0) j += k;
j += "</span>", k = b.earnedProficiency, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(7, i, e)
});
if (k || k === 0) j += k;
return j += " in ", l = c.exerciseDisplayName, l ? k = l.call(b, {
hash: {}
}) : (k = b.exerciseDisplayName, k = typeof k === m ? k() : k), j += n(k) + '\n            </div>\n        </div>\n        <div class="activity-controls">\n            <span class="time timeago" title="', l = c.dt, l ? k = l.call(b, {
hash: {}
}) : (k = b.dt, k = typeof k === m ? k() : k), j += n(k) + '">', l = c.dt, l ? k = l.call(b, {
hash: {}
}) : (k = b.dt, k = typeof k === m ? k() : k), j += n(k) + "</span>\n        </div>\n    </div>\n</li>\n\n", j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_recent-activity-badge"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d;
return d = a.userBadge, d = d == null || d === !1 ? d : d.targetContextName, d = c["if"].call(a, d, {
hash: {},
inverse: m.noop,
fn: m.program(2, g, b)
}), d || d === 0 ? d : "";
}
function g(a, b) {
var c = "", d;
return c += "for ", d = a.userBadge, d = d == null || d === !1 ? d : d.targetContextName, d = typeof d === k ? d() : d, c += l(d), c;
}
c = c || a.helpers;
var h = "", i, j, k = "function", l = this.escapeExpression, m = this;
h += '<li class="activity-badge clearfix">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Earned <a href="', j = c.profileRoot, j ? i = j.call(b, {
hash: {}
}) : (i = b.profileRoot, i = typeof i === k ? i() : i), h += l(i) + 'achievements" data-category="', i = b.badge, i = i == null || i === !1 ? i : i.badgeCategory, i = typeof i === k ? i() : i, h += l(i) + '" class="badge-link category-', i = b.badge, i = i == null || i === !1 ? i : i.badgeCategory, i = typeof i === k ? i() : i, h += l(i) + '">', i = b.badge, i = i == null || i === !1 ? i : i.description, i = typeof i === k ? i() : i, h += l(i) + "</a> ", i = b.badge, i = i == null || i === !1 ? i : i.hideContext, i = c.unless.call(b, i, {
hash: {},
inverse: m.noop,
fn: m.program(1, f, e)
});
if (i || i === 0) h += i;
return h += '\n            </div>\n        </div>\n        <div class="activity-controls clearfix">\n            <span class="time timeago" title="', j = c.dt, j ? i = j.call(b, {
hash: {}
}) : (i = b.dt, i = typeof i === k ? i() : i), h += l(i) + '">', j = c.dt, j ? i = j.call(b, {
hash: {}
}) : (i = b.dt, i = typeof i === k ? i() : i), h += l(i) + "</span>\n        </div>\n    </div>\n\n</li>\n", h;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_recent-activity-video"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "completed";
}
c = c || a.helpers;
var g = "", h, i, j = this, k = c.helperMissing, l = this.escapeExpression, m = "function";
g += '<li class="activity-video clearfix ', h = b.isVideoCompleted, h = c["if"].call(b, h, {
hash: {},
inverse: j.noop,
fn: j.program(1, f, e)
});
if (h || h === 0) g += h;
return g += '">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Watched <span class="video-minutes">', h = b.secondsWatched, i = c.secondsToTime, h = i ? i.call(b, h, {
hash: {}
}) : k.call(b, "secondsToTime", h, {
hash: {}
}), g += l(h) + '</span> of <a href="', i = c.relativeUrl, i ? h = i.call(b, {
hash: {}
}) : (h = b.relativeUrl, h = typeof h === m ? h() : h), g += l(h) + '">', i = c.videoTitle, i ? h = i.call(b, {
hash: {}
}) : (h = b.videoTitle, h = typeof h === m ? h() : h), g += l(h) + '</a>\n            </div>\n        </div>\n        <div class="activity-controls clearfix">\n	        <span class="time timeago" title="', i = c.dt, i ? h = i.call(b, {
hash: {}
}) : (h = b.dt, h = typeof h === m ? h() : h), g += l(h) + '">', i = c.dt, i ? h = i.call(b, {
hash: {}
}) : (h = b.dt, h = typeof h === m ? h() : h), g += l(h) + "</span>\n	    </div>\n    </div>\n</li>\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_recent-activity-goal"] = a(function(a, b, c, d, e) {
function f(a, b) {
return " completed";
}
c = c || a.helpers;
var g = "", h, i, j = this, k = "function", l = this.escapeExpression;
g += '<li class="activity-goal clearfix', h = b.goal, h = h == null || h === !1 ? h : h.completedTime, h = c["if"].call(b, h, {
hash: {},
inverse: j.noop,
fn: j.program(1, f, e)
});
if (h || h === 0) g += h;
return g += '">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Completed the goal <a href="', i = c.profileRoot, i ? h = i.call(b, {
hash: {}
}) : (h = b.profileRoot, h = typeof h === k ? h() : h), g += l(h) + 'goals/completed">', h = b.goal, h = h == null || h === !1 ? h : h.title, h = typeof h === k ? h() : h, g += l(h) + "</a> after working toward it for ", h = b.goal, h = h == null || h === !1 ? h : h.completedTime, h = typeof h === k ? h() : h, g += l(h) + '\n            </div>\n        </div>\n        <div class="activity-controls clearfix">\n	        <span class="time timeago" title="', i = c.dt, i ? h = i.call(b, {
hash: {}
}) : (h = b.dt, h = typeof h === k ? h() : h), g += l(h) + '">', i = c.dt, i ? h = i.call(b, {
hash: {}
}) : (h = b.dt, h = typeof h === k ? h() : h), g += l(h) + "</span>\n	    </div>\n    </div>\n</li>\n\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_graph-date-picker"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i = "function", j = this.escapeExpression;
return f += '<div class="graph-date-picker">\n    <ul class="tabrow">\n        <li class="today">\n            <a href="', h = c.profileRoot, h ? g = h.call(b, {
hash: {}
}) : (g = b.profileRoot, g = typeof g === i ? g() : g), f += j(g) + "vital-statistics/", h = c.graph, h ? g = h.call(b, {
hash: {}
}) : (g = b.graph, g = typeof g === i ? g() : g), f += j(g) + '/today" class="no-recolor graph-link">Today</a>\n        </li>\n        <li class="yesterday">\n            <a href="', h = c.profileRoot, h ? g = h.call(b, {
hash: {}
}) : (g = b.profileRoot, g = typeof g === i ? g() : g), f += j(g) + "vital-statistics/", h = c.graph, h ? g = h.call(b, {
hash: {}
}) : (g = b.graph, g = typeof g === i ? g() : g), f += j(g) + '/yesterday" class="no-recolor graph-link">Yesterday</a>\n        </li>\n        <li class="selected last-week">\n            <a href="', h = c.profileRoot, h ? g = h.call(b, {
hash: {}
}) : (g = b.profileRoot, g = typeof g === i ? g() : g), f += j(g) + "vital-statistics/", h = c.graph, h ? g = h.call(b, {
hash: {}
}) : (g = b.graph, g = typeof g === i ? g() : g), f += j(g) + '/last-week" class="no-recolor graph-link">Last 7 Days</a>\n        </li>\n        <li class="last-month">\n            <a href="', h = c.profileRoot, h ? g = h.call(b, {
hash: {}
}) : (g = b.profileRoot, g = typeof g === i ? g() : g), f += j(g) + "vital-statistics/", h = c.graph, h ? g = h.call(b, {
hash: {}
}) : (g = b.graph, g = typeof g === i ? g() : g), f += j(g) + '/last-month" class="no-recolor graph-link">Last 30 Days</a>\n        </li>\n    </ul>\n</div>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_vital-statistics"] = a(function(a, b, c, d, e) {
function f(a, b) {
var e = "", f;
e += "\n                            ", f = a, f = k.invokePartial(d["profile_graph-date-picker"], "profile_graph-date-picker", f, c, d);
if (f || f === 0) e += f;
return e += "\n                        ", e;
}
function g(a, b) {
var e = "", f;
e += "\n                            ", f = a, f = k.invokePartial(d["profile_graph-date-picker"], "profile_graph-date-picker", f, c, d);
if (f || f === 0) e += f;
return e += "\n                        ", e;
}
c = c || a.helpers, d = d || a.partials;
var h = "", i, j, k = this, l = c.helperMissing;
h += '<div id="vital-statistics">\n    <div id="stats-charts" class="fancy-scrollbar -ce-capture">\n        <div id="graph-control-container">\n            <div id="graph-container">\n                <div class="vital-statistics-description">\n                    <div class="activity">\n                        Shows how much work you\'re doing each day.\n                        ', i = {}, i.graph = "activity", j = c["graph-date-picker-wrapper"], i = j ? j.call(b, {
hash: i,
inverse: k.noop,
fn: k.program(1, f, e)
}) : l.call(b, "graph-date-picker-wrapper", {
hash: i,
inverse: k.noop,
fn: k.program(1, f, e)
});
if (i || i === 0) h += i;
h += '\n                    </div>\n                    <div class="focus">\n                        Shows how well you\'ve focused on skills and topic areas.\n                        ', i = {}, i.graph = "focus", j = c["graph-date-picker-wrapper"], i = j ? j.call(b, {
hash: i,
inverse: k.noop,
fn: k.program(3, g, e)
}) : l.call(b, "graph-date-picker-wrapper", {
hash: i,
inverse: k.noop,
fn: k.program(3, g, e)
});
if (i || i === 0) h += i;
return h += '\n                    </div>\n                    <div class="skill-progress">\n                        Shows which skills you\'ve worked on and completed.\n                        <span class="graph-options">\n                            <span class="progress-legend exercise-color started">Started</span>\n                            <span class="progress-legend exercise-color proficient">Proficient</span>\n                            <span class="progress-legend exercise-color review light">Review</span>\n                            <span class="progress-legend exercise-color struggling">Struggling</span>\n                        </span>\n                    </div>\n                    <div class="skill-progress-over-time">\n                        Shows how many skills you\'ve completed over time.\n                    </div>\n                    <div class="problems">\n                        Click a bar to view more detailed problem information.\n                    </div>\n                </div>\n                <div id="graph-progress-bar"></div>\n                <div id="graph-content"></div>\n            </div>\n        </div>\n    </div>\n</div>\n', h;
});
}();

var Coaches = {
coachCollection: null,
requestCollection: null,
url: "/api/v1/user/coaches",
init: function() {
var a = Profile.profile.get("isSelf"), b = Profile.profile.get("isPhantom"), c;
if (a && !b) {
var d = Templates.get("profile.coaches");
$("#tab-content-coaches").html(d(Profile.profile.toJSON())), this.delegateEvents_(), c = $.ajax({
type: "GET",
url: this.url,
data: {
casing: "camel"
},
dataType: "json",
success: _.bind(this.onDataLoaded_, this)
});
} else c = (new $.Deferred).resolve();
return c;
},
onDataLoaded_: function(a) {
this.coachCollection = new Coaches.CoachCollection(a), this.coachCollection.markCoachesAsSaved(), (new Coaches.CoachCollectionView({
collection: Coaches.coachCollection,
el: "#coach-list-container"
})).render();
},
delegateEvents_: function() {
$("#tab-content-coaches").on("keyup", "#coach-email", _.bind(this.onCoachEmailKeyup_, this)), $("#tab-content-coaches").on("click", "#add-coach", _.bind(this.onAddCoach_, this));
},
onCoachEmailKeyup_: function(a) {
a.keyCode === $.ui.keyCode.ENTER && this.onAddCoach_();
},
onAddCoach_: function() {
var a = $.trim($("#coach-email").val());
a && (Coaches.disableInput(), this.coachCollection.addByEmail(a));
},
disableInput: function() {
$("#add-coach").addClass("disabled").prop("disabled", !0), $("#coach-email").prop("disabled", !0), $(".coach-throbber").show();
},
enableInput: function() {
$("#add-coach").removeClass("disabled").prop("disabled", !1), $("#coach-email").prop("disabled", !1).focus(), $(".coach-throbber").hide();
}
};

Coaches.CoachView = Backbone.View.extend({
className: "coach-row",
collection_: null,
template_: null,
events: {
"click .controls .remove": "onRemoveCoach_",
"click .controls .accept": "onAcceptCoach_",
"click .controls .deny": "onDenyCoach_",
"mouseenter .controls .remove": "onMouseEnterRemove_",
"mouseleave .controls .remove": "onMouseLeaveRemove_"
},
initialize: function(a) {
this.model.bind("change", this.render, this), this.collection_ = a.collection, this.template_ = Templates.get("profile.coach");
},
render: function() {
var a = this.model.toJSON();
return $(this.el).html(this.template_(a)), this.delegateEvents(), this;
},
onRemoveCoach_: function() {
this.collection_.remove(this.model);
},
onAcceptCoach_: function() {
this.model.set({
isCoachingLoggedInUser: !0,
isRequestingToCoachLoggedInUser: !1
});
},
onDenyCoach_: function() {
this.collection_.remove(this.model);
},
onMouseEnterRemove_: function(a) {
this.$(".controls .remove").addClass("orange");
},
onMouseLeaveRemove_: function(a) {
this.$(".controls .remove").removeClass("orange");
}
}), Coaches.Coach = ProfileModel.extend({
toJSON: function() {
var a = Coaches.Coach.__super__.toJSON.call(this);
return delete a.id, a;
}
}), Coaches.CoachCollection = Backbone.Collection.extend({
model: Coaches.Coach,
initialize: function() {
this.bind("add", this.save, this), this.bind("remove", this.save, this), this.bind("change", this.save, this);
},
comparator: function(a) {
var b = a.get("isCoachingLoggedInUser"), c = a.get("email").toLowerCase();
return (b ? "b" : "a") + " " + c;
},
findByEmail: function(a) {
return this.find(function(b) {
return b.get("email") === a;
});
},
addByEmail: function(a) {
var b = {
email: a,
isCoachingLoggedInUser: !0
}, c = this.findByEmail(a);
if (c) if (c.get("isCoachingLoggedInUser")) {
var d = a + " is already your coach.";
this.trigger("showError", d);
} else c.set({
isCoachingLoggedInUser: !0
}); else this.add(b);
},
save: function() {
this.debouncedSave_();
},
debouncedSave_: _.debounce(function() {
var a = {
url: Coaches.url,
contentType: "application/json",
success: _.bind(this.onSaveSuccess_, this),
error: _.bind(this.onSaveError_, this)
};
a.data = JSON.stringify(this.toJSON()), Backbone.sync("update", null, a);
}, 750),
onSaveSuccess_: function() {
this.markCoachesAsSaved(), this.trigger("saveSuccess"), Coaches.enableInput();
},
onSaveError_: function() {
this.removeUnsavedCoaches_(), this.trigger("saveError");
},
increasingId: 0,
markCoachesAsSaved: function() {
this.each(function(a) {
a.set({
id: "marks-model-as-saved-on-server" + this.increasingId++
}, {
silent: !0
});
}, this);
},
removeUnsavedCoaches_: function() {
var a = this.filter(function(a) {
return a.isNew();
});
this.remove(a, {
silent: !0
}), _.each(a, _.bind(function(a) {
this.trigger("removeFromView", a);
}, this));
}
}), Coaches.CoachCollectionView = Backbone.View.extend({
rendered_: !1,
onlyAddingCoaches_: !0,
initialize: function(a) {
this.coachViews_ = [], this.collection.each(this.onAdd_, this), this.collection.bind("add", this.onAdd_, this).bind("remove", this.onRemove_, this).bind("removeFromView", this.onRemove_, this), this.collection.bind("add", this.handleEmptyNotification_, this).bind("remove", this.handleEmptyNotification_, this).bind("removeFromView", this.handleEmptyNotification_, this), this.collection.bind("saveSuccess", this.onSaveSuccess_, this).bind("saveError", this.onSaveError_, this).bind("showError", this.showError_, this);
},
onSaveSuccess_: function() {
this.onlyAddingCoaches_ && $("#coach-email").val(""), this.onlyAddingCoaches_ = !0;
},
onSaveError_: function() {
this.showError_("We couldn't find anyone with that email.");
},
onAdd_: function(a) {
var b = new Coaches.CoachView({
model: a,
collection: this.collection
});
this.coachViews_.push(b), this.rendered_ && $(this.el).prepend(b.render().el);
},
onRemove_: function(a) {
var b = _.find(this.coachViews_, function(b) {
return b.model === a;
});
b && (this.onlyAddingCoaches_ = !1, this.coachViews_ = _.without(this.coachViews_, b), this.rendered_ && $(b.el).fadeOut(function() {
b.remove();
}));
},
showEmptyNotification_: function() {
if (!this.emptyNotification_) {
var a = Templates.get("profile.no-coaches");
this.emptyNotification_ = $("<div>").addClass("empty-notification").html(a()), $(this.el).append(this.emptyNotification_);
}
this.$(".empty-notification").show();
},
handleEmptyNotification_: function() {
this.collection.isEmpty() ? this.showEmptyNotification_() : this.$(".empty-notification").hide();
},
showError_: function(a) {
$(".coaches-section .notification.error").text(a).show().delay(2e3).fadeOut(function() {
$(this).text("");
}), Coaches.enableInput();
},
render: function() {
return this.rendered_ = !0, $(this.el).empty(), this.handleEmptyNotification_(), _.each(this.coachViews_, function(a) {
$(this.el).append(a.render().el);
}, this), this;
}
}), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_coach"] = a(function(a, b, c, d, e) {
function f(a, b) {
return ' <span class="pending">(pending)';
}
function g(a, b) {
return '\n    <span class="remove simple-button action-gradient">Remove</span>\n';
}
function h(a, b) {
return '\n    <span class="accept simple-button action-gradient green">Accept</span>\n    <span class="deny simple-button action-gradient">Ignore</span>\n';
}
c = c || a.helpers;
var i = "", j, k, l = "function", m = this.escapeExpression, n = this;
i += '<span class="email">', k = c.email, k ? j = k.call(b, {
hash: {}
}) : (j = b.email, j = typeof j === l ? j() : j), i += m(j), j = b.isCoachingLoggedInUser, j = c.unless.call(b, j, {
hash: {},
inverse: n.noop,
fn: n.program(1, f, e)
});
if (j || j === 0) i += j;
i += '</span></span>\n<span class="controls">\n', j = b.isCoachingLoggedInUser, j = c["if"].call(b, j, {
hash: {},
inverse: n.program(5, h, e),
fn: n.program(3, g, e)
});
if (j || j === 0) i += j;
return i += "\n</span>\n", i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_no-coaches"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, "<p>You have no coaches! Why not try adding one?</p>\n";
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_coaches"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i = "function", j = this.escapeExpression;
return f += '<div class="graph-picker">\n    Coaches have access to all of your Khan Academy data.\n    <ul class="tabrow">\n        <li>\n            Your student id is ', h = c.email, h ? g = h.call(b, {
hash: {}
}) : (g = b.email, g = typeof g === i ? g() : g), f += j(g) + '\n        </li>\n    </ul>\n</div>\n<div class="col1">\n    <div class="coaches-section">\n        <h2>Add a coach</h2>\n        <input id="coach-email" class="blur-on-esc" placeholder="Coach id" type="text">\n        <span id="add-coach" class="simple-button action-gradient">Add coach</span>\n        <img class="coach-throbber" style="display: none" src="/images/throbber.gif">\n\n        <div class="notification error" style="display: none;"></div>\n    </div>\n</div>\n\n<div class="col2">\n    <div class="coaches-section">\n        <h2>Your coaches</h2>\n        <div id="coach-list-container"></div>\n    </div>\n</div>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_questions-list"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
d += "\n    ", e = c.each.call(a, a, {
hash: {},
inverse: k.noop,
fn: k.program(2, g, b)
});
if (e || e === 0) d += e;
return d += "\n", d;
}
function g(a, b) {
var d = "", e, f;
d += '\n    <div style="margin-left: -10px;">\n        <ul>\n        <li>\n            <div class="question clearfix ', e = a.hasUnread, e = c["if"].call(a, e, {
hash: {},
inverse: k.noop,
fn: k.program(3, h, b)
});
if (e || e === 0) d += e;
return d += ' visited-no-recolor">\n                <div class="ellipsis">\n                    <a class="discussion-link" href="/v/', e = a.video, e = e == null || e === !1 ? e : e.readableId, e = typeof e === l ? e() : e, d += m(e) + "?qa_expand_key=", f = c.qaExpandKey, f ? e = f.call(a, {
hash: {}
}) : (e = a.qaExpandKey, e = typeof e === l ? e() : e), d += m(e) + '">', e = a.answererCount, f = c.pluralize, e = f ? f.call(a, e, "person", {
hash: {}
}) : n.call(a, "pluralize", e, "person", {
hash: {}
}), d += m(e) + ' answered your question</a>:\n                    <span class="content">', f = c.content, f ? e = f.call(a, {
hash: {}
}) : (e = a.content, e = typeof e === l ? e() : e), d += m(e) + '</span>\n                </div>\n                on "<a href="/v/', e = a.video, e = e == null || e === !1 ? e : e.readableId, e = typeof e === l ? e() : e, d += m(e) + '" style="color: #777">', e = a.video, e = e == null || e === !1 ? e : e.title, e = typeof e === l ? e() : e, d += m(e) + '</a>."\n                <div class="timeago" title="', f = c.lastDate, f ? e = f.call(a, {
hash: {}
}) : (e = a.lastDate, e = typeof e === l ? e() : e), d += m(e) + '">', f = c.lastDate, f ? e = f.call(a, {
hash: {}
}) : (e = a.lastDate, e = typeof e === l ? e() : e), d += m(e) + "</div>\n            </div>\n        </li>\n        </ul>\n    </div>\n    ", d;
}
function h(a, b) {
return "unread";
}
c = c || a.helpers;
var i = "", j, k = this, l = "function", m = this.escapeExpression, n = c.helperMissing;
i += '<div style="font-size: 14px;">\n', j = b.length, j = c["if"].call(b, j, {
hash: {},
inverse: k.noop,
fn: k.program(1, f, e)
});
if (j || j === 0) i += j;
return i += "\n</div>\n", i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_achievements"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "standard-view";
}
function g(a, b) {
return "mobile-view";
}
function h(a, b, d) {
var e = "", f, g, h;
e += '\n      <li id="category-', h = c.category, h ? f = h.call(a, {
hash: {}
}) : (f = a.category, f = typeof f === n ? f() : f), e += o(f) + '" class="', f = a.category, h = c.toBadgeClassName, f = h ? h.call(a, f, {
hash: {}
}) : p.call(a, "toBadgeClassName", f, {
hash: {}
}), e += o(f) + " ", f = a.userBadges, f = f == null || f === !1 ? f : f.length, f = c["if"].call(a, f, {
hash: {},
inverse: q.noop,
fn: q.program(6, i, b)
});
if (f || f === 0) e += f;
e += '">\n        <img src="', f = a.category, h = c.toMediumIconSrc, f = h ? h.call(a, f, {
hash: {}
}) : p.call(a, "toMediumIconSrc", f, {
hash: {}
}), e += o(f) + '" />\n        <div class="label">', f = d.fStandardView, g = a.category, h = c.toBadgeLabel, f = h ? h.call(a, g, f, {
hash: {}
}) : p.call(a, "toBadgeLabel", g, f, {
hash: {}
}), e += o(f), f = a.userBadges, f = f == null || f === !1 ? f : f.length, f = c["if"].call(a, f, {
hash: {},
inverse: q.noop,
fn: q.program(8, j, b)
});
if (f || f === 0) e += f;
return e += "</div>\n      </li>\n      ", e;
}
function i(a, b) {
return "owned";
}
function j(a, b) {
var c = "", d;
return c += " x ", d = a.userBadges, d = d == null || d === !1 ? d : d.length, d = typeof d === n ? d() : d, c += o(d), c;
}
c = c || a.helpers, d = d || a.partials;
var k = "", l, m, n = "function", o = this.escapeExpression, p = c.helperMissing, q = this;
k += '<div id="achievements" class="', l = b.fStandardView, l = c["if"].call(b, l, {
hash: {},
inverse: q.program(3, g, e),
fn: q.program(1, f, e)
});
if (l || l === 0) k += l;
k += '">\n  <div id="achievement-list">\n    <ul>\n      ', l = b.badgeCollections, m = c.reverseEach, l = m ? m.call(b, l, {
hash: {},
inverse: q.noop,
fn: q.programWithDepth(h, e, b)
}) : p.call(b, "reverseEach", l, {
hash: {},
inverse: q.noop,
fn: q.programWithDepth(h, e, b)
});
if (l || l === 0) k += l;
k += '\n    </ul>\n    <div class="clear"></div>\n    <div id="badge-container" class="inset-container" style="display: none;">\n      ', l = b, l = q.invokePartial(d["profile_badge-container"], "profile_badge-container", l, c, d);
if (l || l === 0) k += l;
return k += "\n    </div>\n  </div>\n</div>\n", k;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_badge-container"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
d += '\n    <div id="category-', f = c.category, f ? e = f.call(a, {
hash: {}
}) : (e = a.category, e = typeof e === n ? e() : e), d += o(e) + '" style="display: none;">\n      <div class="badge-description-container">\n        <div class="badge-description-content">\n            ', f = c.categoryDescription, f ? e = f.call(a, {
hash: {}
}) : (e = a.categoryDescription, e = typeof e === n ? e() : e), d += o(e) + "\n        </div>\n      </div>\n      ", e = a.userBadges, e = e == null || e === !1 ? e : e.length, e = c["if"].call(a, e, {
hash: {},
inverse: m.noop,
fn: m.program(2, g, b)
});
if (e || e === 0) d += e;
d += '\n      <div id="all-badges">\n        <h2 style="display: block; margin-left: 10px;">Possible Badges</h2>\n        ', e = a.badges, e = c.each.call(a, e, {
hash: {},
inverse: m.noop,
fn: m.program(5, i, b)
});
if (e || e === 0) d += e;
return d += '\n      </div>\n      <div class="clear"></div>\n    </div>\n', d;
}
function g(a, b) {
var d = "", e;
d += '\n      <div id="user-owned">\n      <h2 style="display: block; margin-left: 10px;">Badges Earned</h2>\n        ', e = a.userBadges, e = c.each.call(a, e, {
hash: {},
inverse: m.noop,
fn: m.program(3, h, b)
});
if (e || e === 0) d += e;
return d += '\n        <div class="clear"></div>\n      </div>\n      ', d;
}
function h(a, b) {
var e = "", f;
e += "\n          ", f = a, f = m.invokePartial(d["profile_user-badge"], "profile_user-badge", f, c, d);
if (f || f === 0) e += f;
return e += "\n        ", e;
}
function i(a, b) {
var d = "", e;
d += "\n          ", e = a.isRetired, e = c.unless.call(a, e, {
hash: {},
inverse: m.noop,
fn: m.program(6, j, b)
});
if (e || e === 0) d += e;
return d += "\n        ", d;
}
function j(a, b) {
var e = "", f;
e += "\n            ", f = a, f = m.invokePartial(d.profile_badge, "profile_badge", f, c, d);
if (f || f === 0) e += f;
return e += "\n          ", e;
}
c = c || a.helpers, d = d || a.partials;
var k = "", l, m = this, n = "function", o = this.escapeExpression;
l = b.badgeCollections, l = c.each.call(b, l, {
hash: {},
inverse: m.noop,
fn: m.program(1, f, e)
});
if (l || l === 0) k += l;
return k += "\n", k;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_user-badge"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n    <div class="achievement-count">x', f = c.count, f ? e = f.call(a, {
hash: {}
}) : (e = a.count, e = typeof e === q ? e() : e), d += r(e) + "</div>\n  ", d;
}
function g(a, b) {
return '\n        This badge has been <span class="badge-context-retired">retired</span>!\n        You get to keep it forever, but nobody else can earn it.\n      ';
}
function h(a, b) {
var d = "", e, f;
d += '\n        Last achieved <abbr class="timeago" title="', f = c.lastEarnedDate, f ? e = f.call(a, {
hash: {}
}) : (e = a.lastEarnedDate, e = typeof e === q ? e() : e), d += r(e) + '">', f = c.lastEarnedDate, f ? e = f.call(a, {
hash: {}
}) : (e = a.lastEarnedDate, e = typeof e === q ? e() : e), d += r(e) + "</abbr>\n        ", e = a.visibleContextName, e = c["if"].call(a, e, {
hash: {},
inverse: s.noop,
fn: s.program(6, i, b)
});
if (e || e === 0) d += e;
return d += "\n      ", d;
}
function i(a, b) {
var d = "", e, f;
d += "\n          in <strong>", f = c.visibleContextName, f ? e = f.call(a, {
hash: {}
}) : (e = a.visibleContextName, e = typeof e === q ? e() : e), d += r(e) + "</strong>\n          ", e = a.hasMultiple, e = c["if"].call(a, e, {
hash: {},
inverse: s.noop,
fn: s.program(7, j, b)
});
if (e || e === 0) d += e;
return d += "\n        ", d;
}
function j(a, b) {
var d = "", e;
d += '\n            <span class="badge-context-hidden-link"><a href="#" onclick="Badges.showMoreContext(this);return false;">and also in<span class="ellipsis">...</span></a></span>\n            <span class="badge-context-hidden" style="display:none;">\n            ', e = a.listContextNamesHidden, e = c.each.call(a, e, {
hash: {},
inverse: s.noop,
fn: s.program(8, k, b)
});
if (e || e === 0) d += e;
return d += "\n            </span>\n          ", d;
}
function k(a, b) {
var d = "", e, f;
d += "\n               <strong>", f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === q ? e() : e), d += r(e), e = a.isLast, e = c.unless.call(a, e, {
hash: {},
inverse: s.noop,
fn: s.program(9, l, b)
});
if (e || e === 0) d += e;
return d += "</strong>\n            ", d;
}
function l(a, b) {
return ", ";
}
function m(a, b) {
var c = "", d;
return c += '<div class="energy-points-badge">', d = a.badge, d = d == null || d === !1 ? d : d.points, d = typeof d === q ? d() : d, c += r(d) + "</div>", c;
}
c = c || a.helpers;
var n = "", o, p, q = "function", r = this.escapeExpression, s = this;
n += '<div class="achievement-badge category-', p = c.category, p ? o = p.call(b, {
hash: {}
}) : (o = b.category, o = typeof o === q ? o() : o), n += r(o) + ' achievement-badge-owned" title="', o = b.badge, o = o == null || o === !1 ? o : o.safeExtendedDescription, o = typeof o === q ? o() : o, n += r(o) + '">\n  <div id="outline-box">\n  <img src="', o = b.badge, o = o == null || o === !1 ? o : o.iconSrc, o = typeof o === q ? o() : o, n += r(o) + '" id="badge-icon"/>\n  ', o = b.hasMultiple, o = c["if"].call(b, o, {
hash: {},
inverse: s.noop,
fn: s.program(1, f, e)
});
if (o || o === 0) n += o;
n += '\n  <div class="achievement-text">\n  <div class="achievement-title">', o = b.badge, o = o == null || o === !1 ? o : o.description, o = typeof o === q ? o() : o, n += r(o) + '</div>\n  <div class="achievement-desc">\n      ', o = b.badge, o = o == null || o === !1 ? o : o.isRetired, o = c["if"].call(b, o, {
hash: {},
inverse: s.program(5, h, e),
fn: s.program(3, g, e)
});
if (o || o === 0) n += o;
n += "\n  </div>\n  </div>\n  ", o = b.badge, o = o == null || o === !1 ? o : o.points, o = c["if"].call(b, o, {
hash: {},
inverse: s.noop,
fn: s.program(11, m, e)
});
if (o || o === 0) n += o;
return n += "\n  </div>\n</div>\n\n", n;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_badge"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "achievement-badge-owned";
}
function g(a, b) {
var d = "", e, f;
return d += "data-objectives='", f = c.objectives, f ? e = f.call(a, {
hash: {}
}) : (e = a.objectives, e = typeof e === m ? e() : e), d += n(e) + "'", d;
}
function h(a, b) {
return '<div class="add-goal">+ &emsp; Goal</div>';
}
function i(a, b) {
var d = "", e, f;
return d += '<div class="energy-points-badge">', f = c.points, f ? e = f.call(a, {
hash: {}
}) : (e = a.points, e = typeof e === m ? e() : e), d += n(e) + "</div>", d;
}
c = c || a.helpers;
var j = "", k, l, m = "function", n = this.escapeExpression, o = this;
j += '<div class="achievement-badge category-', l = c.badgeCategory, l ? k = l.call(b, {
hash: {}
}) : (k = b.badgeCategory, k = typeof k === m ? k() : k), j += n(k) + " ", k = b.isOwned, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(1, f, e)
});
if (k || k === 0) j += k;
j += '" title="', l = c.safeExtendedDescription, l ? k = l.call(b, {
hash: {}
}) : (k = b.safeExtendedDescription, k = typeof k === m ? k() : k), j += n(k) + '" ', k = b.canBecomeGoal, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(3, g, e)
});
if (k || k === 0) j += k;
j += '>\n  <div id="outline-box">\n  <img src="', l = c.iconSrc, l ? k = l.call(b, {
hash: {}
}) : (k = b.iconSrc, k = typeof k === m ? k() : k), j += n(k) + '" id="badge-icon"/>\n  <div class="achievement-text">\n  <div class="achievement-title">', l = c.description, l ? k = l.call(b, {
hash: {}
}) : (k = b.description, k = typeof k === m ? k() : k), j += n(k) + '</div>\n  <div class="achievement-desc achievement-desc-no-count">\n    ', l = c.safeExtendedDescription, l ? k = l.call(b, {
hash: {}
}) : (k = b.safeExtendedDescription, k = typeof k === m ? k() : k), j += n(k) + "\n  </div>\n  </div>\n  ", k = b.canBecomeGoal, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(5, h, e)
});
if (k || k === 0) j += k;
j += "\n  ", k = b.points, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(7, i, e)
});
if (k || k === 0) j += k;
return j += "\n  </div>\n</div>\n", j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_badge-compact"] = a(function(a, b, c, d, e) {
function f(a, b) {
return '\n\n<div class="achievement-badge compact empty">\n  <div id="outline-box">\n  <div class="selected-indicator"> </div>\n  </div>\n</div>\n\n';
}
function g(a, b) {
var d = "", e, f;
d += '\n\n<div class="achievement-badge compact achievement-badge-owned', e = a.used, e = c["if"].call(a, e, {
hash: {},
inverse: k.noop,
fn: k.program(4, h, b)
});
if (e || e === 0) d += e;
d += '"\n    id="', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === l ? e() : e), d += m(e) + '" title="', f = c.safeExtendedDescription, f ? e = f.call(a, {
hash: {}
}) : (e = a.safeExtendedDescription, e = typeof e === l ? e() : e), d += m(e) + '">\n  <div id="outline-box">\n    <div class="achievement-title">', e = a.description, f = c.toBadgeDescriptionWithBreaks, e = f ? f.call(a, e, {
hash: {}
}) : n.call(a, "toBadgeDescriptionWithBreaks", e, {
hash: {}
});
if (e || e === 0) d += e;
return d += '</div>\n    <img class="badge-icon" src="', e = a.icons, e = e == null || e === !1 ? e : e.compact, e = typeof e === l ? e() : e, d += m(e) + '">\n    <div class="delete-icon">X</div>\n    <div class="selected-indicator"> </div>\n  </div>\n</div>\n\n', d;
}
function h(a, b) {
return " used";
}
c = c || a.helpers;
var i = "", j, k = this, l = "function", m = this.escapeExpression, n = c.helperMissing;
j = b.isEmpty, j = c["if"].call(b, j, {
hash: {},
inverse: k.program(3, g, e),
fn: k.program(1, f, e)
});
if (j || j === 0) i += j;
return i += "\n", i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_badge-display-case"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "";
return f += '<a class="display-case-cover" href="javascript:void(0)">\n', f += '\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n</a>\n<div class="main-case fancy-scrollbar"></div>\n<div class="badge-picker fancy-scrollbar"></div>\n\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_empty-badge-picker"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div class="empty-badge-picker">\n<div style="font-size:180%">No badges...yet!</div>\n<a href="/#browse">Watch a video</a> or <a href="/exercisedashboard">try an exercise</a> to earn your first badge.\n</div>\n';
});
}();

var Badges = window.Badges || {};

Badges.ContextType = {
NONE: 0,
EXERCISE: 1,
PLAYLIST: 2
}, Badges.Category = {
BRONZE: 0,
SILVER: 1,
GOLD: 2,
PLATINUM: 3,
DIAMOND: 4,
MASTER: 5
}, Badges.Badge = Backbone.Model.extend({
defaults: {
badgeCategory: Badges.Category.BRONZE,
name: "__empty__",
description: "",
icons: {},
isOwned: !1,
points: 0,
safeExtendedDescription: ""
},
isEmpty: function() {
return this.get("name") === "__empty__";
},
toJSON: function() {
var a = Badges.Badge.__super__.toJSON.call(this);
return a.isEmpty = this.isEmpty(), a;
}
}), Badges.Badge.EMPTY_BADGE = new Badges.Badge({}), Badges.UserBadge = Backbone.Model.extend({
defaults: {
badge: null,
count: 1,
lastEarnedDate: "2011-11-22T00:00:00Z",
targetContextNames: [],
isOwned: !0
},
initialize: function(a, b) {
if (!this.get("badge")) throw "A UserBadge object needs a reference badge object";
var c = new Badges.Badge(this.get("badge"));
this.set({
badge: c
}, {
silent: !0
}), c.bind("change", function(a) {
this.trigger("change:badge");
}, this);
}
}), Badges.BadgeList = Backbone.Collection.extend({
model: Badges.Badge,
saveUrl: null,
dirty_: !1,
setSaveUrl: function(a) {
this.saveUrl = a;
},
toJSON: function() {
return this.map(function(a) {
return a.get("name");
});
},
add: function(a, b) {
Badges.BadgeList.__super__.add.apply(this, arguments), this.dirty_ = !0;
},
remove: function(a, b) {
Badges.BadgeList.__super__.remove.apply(this, arguments), this.dirty_ = !0;
},
save: function(a) {
if (!this.dirty_) return;
a = a || {}, a.url = this.saveUrl, a.contentType = "application/json", a.data = JSON.stringify(this.map(function(a) {
return a.get("name");
})), Backbone.sync.call(this, "update", this, a), this.dirty_ = !1;
},
parse: function(a, b) {
"apiActionResults" in a && "payload" in a && (a = a.payload), Backbone.Model.prototype.parse.call(this, a, b);
}
}), Badges.UserBadgeList = Backbone.Collection.extend({
model: Badges.UserBadge
}), Badges.DisplayCase = Backbone.View.extend({
className: "badge-display-case",
editing: !1,
fullBadgeList: null,
maxVisible: 5,
selectedIndex: -1,
mainCaseEl: null,
badgePickerEl: null,
editControlEl: null,
animatingBadgeEl: null,
initialize: function() {
this.model.bind("add", this.render, this), this.model.bind("remove", this.render, this), this.model.bind("change", this.render, this), this.template = Templates.get("profile.badge-display-case"), Handlebars.registerHelper("toBadgeDescriptionWithBreaks", function(a) {
var b = [], c = "";
_.each(a.split(" "), function(a) {
c.length > 0 && (c.length + a.length > 12 && b.length == 0 ? (b[b.length] = c, c = "") : c += " "), c += a;
}), c && (b[b.length] = c);
while (b.length < 2) b[b.length] = "&nbsp;";
return b.join("\n");
});
},
events: {
"click .main-case .achievement-badge .delete-icon": "onDeleteBadgeClicked_",
"click .main-case .achievement-badge": "onBadgeClicked_",
"click .badge-picker .achievement-badge": "onBadgeInPickerClicked_",
"click .display-case-cover": "onCoverClicked_"
},
isEditable: function() {
return !!this.fullBadgeList;
},
setFullBadgeList: function(a) {
this.fullBadgeList = a, $(this.editControlEl).toggleClass("editable", this.isEditable());
},
edit: function(a) {
return !this.isEditable() || this.editing ? this : (this.setEditing_(!0), this.updateEditSelection_(a), this.showBadgePicker_(), this.editControlEl.slideUp(350), this.mainCaseEl.addClass("enable-scrolling"), $(document).bind("mousedown", this.getBoundStopEditFn_()), this);
},
updateEditSelection_: function(a) {
if (a === undefined) for (var b = 0, c = this.model.length; b < c; b++) if (this.model.at(b).isEmpty()) {
a = b;
break;
}
a = a === undefined ? this.model.length : a, this.selectedIndex = Math.min(a, this.maxVisible - 1), this.updateSelectionHighlight();
},
showBadgePicker_: function() {
this.renderBadgePicker();
var a = $(this.el), b = $(this.badgePickerEl);
return b.slideDown("fast", function() {
b.show();
}).css("margin-left", "300px").animate({
"margin-left": "0"
}, {
duration: "fast",
step: $.easing.easeInOutCubic,
complete: function() {
a.addClass("editing");
}
}), this;
},
onBadgeClicked_: function(a) {
if (!this.editing) return;
var b = $(this.mainCaseEl).find(".achievement-badge").index(a.currentTarget);
this.updateEditSelection_(b), a.stopPropagation();
},
onDeleteBadgeClicked_: function(a) {
a.stopPropagation();
if (!this.editing) return;
var b = a.currentTarget;
while (b && !$(b).hasClass("achievement-badge")) b = b.parentNode;
var c = $(this.mainCaseEl).find(".achievement-badge").index(b), d = $(b).offset(), e = c == this.model.length - 1, f = this.model.at(c);
this.model.remove(f), e || this.model.add(Badges.Badge.EMPTY_BADGE.clone(), {
at: c
}), this.updateEditSelection_(c), this.ensureAnimatingBadgeEl();
var g = Templates.get("profile.badge-compact");
this.animatingBadgeEl.html(g(f.toJSON())), this.animatingBadgeEl.css({
left: d.left,
top: d.top,
opacity: 1
}), this.animatingBadgeEl.show(), this.animatingBadgeEl.animate({
left: d.left + 5,
top: d.top + 10,
opacity: 0
}, {
duration: 250,
step: $.easing.easeInOutCubic,
complete: _.bind(function() {
this.animatingBadgeEl.hide(), this.animatingBadgeEl.css({
opacity: 1
});
}, this)
});
},
onBadgeInPickerClicked_: function(a) {
a.stopPropagation();
if ($(a.currentTarget).hasClass("used")) return;
var b = a.currentTarget.id, c = _.find(this.fullBadgeList.models, function(a) {
return a.get("badge").get("name") == b;
});
if (!c) return;
var d = c.get("badge").clone();
this.beginSelectionAnimation_(d, $(a.currentTarget), this.selectedIndex);
},
ensureAnimatingBadgeEl: function() {
this.animatingBadgeEl || (this.animatingBadgeEl = $("<div id='animating-badge'></div>").appendTo("body"));
},
beginSelectionAnimation_: function(a, b, c) {
this.ensureAnimatingBadgeEl();
var d = $(this.mainCaseEl).find(".achievement-badge").eq(c), e = Templates.get("profile.badge-compact");
this.animatingBadgeEl.html(e(a.toJSON()));
var f = b.offset();
this.animatingBadgeEl.css({
left: f.left,
top: f.top
}), this.animatingBadgeEl.show();
var g = d.offset();
this.animatingBadgeEl.animate({
left: g.left,
top: g.top
}, {
duration: 250,
step: $.easing.easeInOutCubic,
complete: _.bind(function() {
this.finishSelection_(a, c);
}, this)
});
},
finishSelection_: function(a, b) {
if (!this.animatingBadgeEl) return;
this.animatingBadgeEl.hide(), this.animatingBadgeEl.html("");
var c = this.model.at(b);
c && this.model.remove(c);
for (var d = this.model.length; d < b; d++) this.model.add(Badges.Badge.EMPTY_BADGE.clone());
this.model.add(a, {
at: b
}), this.updateEditSelection_();
},
stopEdit: function() {
if (this.editing) {
this.setEditing_(!1), this.updateEditSelection_(-1);
var a = $(this.el), b = $(this.badgePickerEl);
b.slideUp("fast", function() {
a.removeClass("editing");
}), b.undelegate(), this.editControlEl.slideDown(250), this.mainCaseEl.removeClass("enable-scrolling"), $(document).unbind("click", this.getBoundStopEditFn_()), this.save();
}
return this;
},
getBoundStopEditFn_: function() {
if (this.boundStopEditFn_) return this.boundStopEditFn_;
var a = this;
return this.boundStopEditFn_ = function(b) {
for (var c = b.target; c; c = c.parentNode) if (c === a.el) return;
a.stopEdit();
};
},
save: function() {
this.model.save();
},
setEditing_: function(a) {
this.editing = a;
},
getUserBadgeJsonContext_: function(a) {
var b = a.get("badge").toJSON();
return b.count = a.get("count"), b;
},
renderMainCaseContents_: function() {
var a, b = Templates.get("profile.badge-compact"), c = [], d = Math.min(this.maxVisible, this.model.length), e = this.editControlEl.find(".achievement-badge");
for (a = 0; a < d; a++) {
var f = this.model.at(a);
c.push(b(f.toJSON())), e[a].setAttribute("title", f.get("safeExtendedDescription"));
}
for (; a < this.maxVisible; a++) c.push(b(Badges.Badge.EMPTY_BADGE.toJSON())), e[a].setAttribute("title", "");
this.mainCaseEl.html(c.join(""));
},
updateSelectionHighlight: function() {
var a = $(".achievement-badge", this.mainCaseEl);
a.removeClass("selected"), this.selectedIndex > -1 && $(a[this.selectedIndex]).addClass("selected");
},
onCoverClicked_: function(a) {
this.isEditable() && this.edit(), a.stopPropagation();
},
renderBadgePicker: function() {
if (this.fullBadgeList.isEmpty()) {
$(this.badgePickerEl).html(Templates.get("profile.empty-badge-picker")());
return;
}
var a = [], b = Templates.get("profile.badge-compact");
this.fullBadgeList.each(function(c) {
var d = this.model.find(function(a) {
return a.get("name") === c.get("badge").get("name");
}), e = this.getUserBadgeJsonContext_(c);
d && (e.used = !0), a.push(b(e));
}, this), $(this.badgePickerEl).html(a.join(""));
},
render: function() {
return this.mainCaseEl || ($(this.el).html(Templates.get("profile.badge-display-case")()), this.mainCaseEl = this.$(".main-case"), this.badgePickerEl = this.$(".badge-picker"), this.editControlEl = this.$(".display-case-cover"), $(this.editControlEl).toggleClass("editable", this.isEditable())), this.renderMainCaseContents_(), this.fullBadgeList && this.renderBadgePicker(), this.updateSelectionHighlight(), this;
}
}), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_profile-goals"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
d += '\n    <div class="student-goals goals-personal ', f = c.colors, f ? e = f.call(a, {
hash: {}
}) : (e = a.colors, e = typeof e === w ? e() : e), d += x(e) + '">\n    ', e = a.goals, e = c.each.call(a, e, {
hash: {},
inverse: v.noop,
fn: v.programWithDepth(g, b, a)
});
if (e || e === 0) d += e;
return d += "\n    </div>\n", d;
}
function g(a, b, d) {
var e = "", f, g;
e += "\n        ", e += '\n        <div class="goal pulls ', f = a.completed, f = c["if"].call(a, f, {
hash: {},
inverse: v.noop,
fn: v.program(3, h, b)
});
if (f || f === 0) e += f;
e += '" data-id="', g = c.id, g ? f = g.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === w ? f() : f), e += x(f) + '">\n            <p class="goal-description">\n                ', f = d.readonly, f = c["if"].call(a, f, {
hash: {},
inverse: v.program(8, k, b),
fn: v.program(6, j, b)
});
if (f || f === 0) e += f;
e += "\n                ", f = d.isCurrent, f = c["if"].call(a, f, {
hash: {},
inverse: v.noop,
fn: v.program(10, l, b)
});
if (f || f === 0) e += f;
e += "\n                ", f = d.isCompleted, f = c["if"].call(a, f, {
hash: {},
inverse: v.noop,
fn: v.program(12, m, b)
});
if (f || f === 0) e += f;
e += "\n                ", f = d.isAbandoned, f = c["if"].call(a, f, {
hash: {},
inverse: v.noop,
fn: v.program(14, n, b)
});
if (f || f === 0) e += f;
e += "\n                ", f = d.readonly, f = c.unless.call(a, f, {
hash: {},
inverse: v.noop,
fn: v.program(16, o, b)
});
if (f || f === 0) e += f;
e += '\n            </p>\n            <ul class="inline-list objective-list">\n            ', f = a.objectives, f = c.each.call(a, f, {
hash: {},
inverse: v.noop,
fn: v.program(18, p, b)
});
if (f || f === 0) e += f;
return e += '\n            </ul>\n            <div class="clear"></div>\n        </div>\n    ', e;
}
function h(a, b) {
var d;
return d = a.abandoned, d = c.unless.call(a, d, {
hash: {},
inverse: v.noop,
fn: v.program(4, i, b)
}), d || d === 0 ? d : "";
}
function i(a, b) {
return "complete";
}
function j(a, b) {
var d = "", e, f;
return d += '\n                <span class="goal-title">', f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === w ? e() : e), d += x(e) + "</span>\n                ", d;
}
function k(a, b) {
var d = "", e, f;
return d += '\n                <input type="text" name="title" class="goal-title simple-input ui-corner-all blur-on-esc" placeholder="', f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === w ? e() : e), d += x(e) + '" value="', f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === w ? e() : e), d += x(e) + '"></input>\n                ', d;
}
function l(a, b) {
var d = "", e, f;
return d += '<span class="summary-light">(started ', f = c.created_ago, f ? e = f.call(a, {
hash: {}
}) : (e = a.created_ago, e = typeof e === w ? e() : e), d += x(e) + ")</span>", d;
}
function m(a, b) {
var d = "", e, f;
return d += '<span class="summary-light">(completed ', f = c.completed_ago, f ? e = f.call(a, {
hash: {}
}) : (e = a.completed_ago, e = typeof e === w ? e() : e), d += x(e) + " in ", f = c.completed_time, f ? e = f.call(a, {
hash: {}
}) : (e = a.completed_time, e = typeof e === w ? e() : e), d += x(e) + ")</span>", d;
}
function n(a, b) {
var d = "", e, f;
return d += '<span class="summary-light">(abandoned ', f = c.completed_ago, f ? e = f.call(a, {
hash: {}
}) : (e = a.completed_ago, e = typeof e === w ? e() : e), d += x(e) + ")</span>", d;
}
function o(a, b) {
var d = "", e, f;
return d += '\n                <span class="goal-controls">\n                    <a class="abandon simple-button action-gradient" href="javascript:void(0)" id="goal-abandon-', f = c.id, f ? e = f.call(a, {
hash: {}
}) : (e = a.id, e = typeof e === w ? e() : e), d += x(e) + '">Abandon</a>\n                </span>\n                ', d;
}
function p(a, b) {
var e = "", f;
e += "\n                ", f = a, f = v.invokePartial(d["shared_goal-objectives"], "shared_goal-objectives", f, c, d);
if (f || f === 0) e += f;
return e += "\n            ", e;
}
function q(a, b) {
var d = "", e;
d += "\n    ", e = a.readonly, e = c["if"].call(a, e, {
hash: {},
inverse: v.program(23, s, b),
fn: v.program(21, r, b)
});
if (e || e === 0) d += e;
return d += "\n", d;
}
function r(a, b) {
return "\n        Nothing to show here!\n    ";
}
function s(a, b) {
var e = "", f;
e += "\n        ", f = a, f = v.invokePartial(d["shared_goal-new"], "shared_goal-new", f, c, d);
if (f || f === 0) e += f;
return e += "\n    ", e;
}
c = c || a.helpers, d = d || a.partials;
var t = "", u, v = this, w = "function", x = this.escapeExpression;
u = b.goals, u = c["if"].call(b, u, {
hash: {},
inverse: v.program(20, q, e),
fn: v.program(1, f, e)
});
if (u || u === 0) t += u;
return t += "\n", t;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["profile-package_exercise_progress"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n  <div class="student-module-status exercise-progress-block exercise-color ', f = c.color, f ? e = f.call(a, {
hash: {}
}) : (e = a.color, e = typeof e === j ? e() : e), d += k(e) + '"\n       id="exercise-', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === j ? e() : e), d += k(e) + '">\n	  <span class="exercise-display-name"><nobr>', f = c.shortName, f ? e = f.call(a, {
hash: {}
}) : (e = a.shortName, e = typeof e === j ? e() : e), d += k(e) + '</nobr></span>\n    <div class="hover-data" style="display: none;">\n      <div class=exercise-display-name>', f = c.displayName, f ? e = f.call(a, {
hash: {}
}) : (e = a.displayName, e = typeof e === j ? e() : e), d += k(e) + "</div>\n      <div class=exercise-status>Status: ", f = c.status, f ? e = f.call(a, {
hash: {}
}) : (e = a.status, e = typeof e === j ? e() : e), d += k(e) + "</div>\n      <div class=exercise-progress>Progress: ", f = c.progress, f ? e = f.call(a, {
hash: {}
}) : (e = a.progress, e = typeof e === j ? e() : e), d += k(e) + "</div>\n      <div class=exercise-done>Problems attempted: ", f = c.totalDone, f ? e = f.call(a, {
hash: {}
}) : (e = a.totalDone, e = typeof e === j ? e() : e), d += k(e) + '</div>\n    </div>\n		<div style="clear:both"></div>\n  </div>\n  ', d;
}
c = c || a.helpers;
var g = "", h, i, j = "function", k = this.escapeExpression, l = this, m = c.blockHelperMissing;
g += '<div id="module-progress" class="clearfix">\n  ', i = c.exercises, i ? h = i.call(b, {
hash: {},
inverse: l.noop,
fn: l.program(1, f, e)
}) : (h = b.exercises, h = typeof h === j ? h() : h), c.exercises || (h = m.call(b, h, {
hash: {},
inverse: l.noop,
fn: l.program(1, f, e)
}));
if (h || h === 0) g += h;
return g += "\n</div>\n", g;
});
}();

var GoalProfileView = Backbone.View.extend({
template: Templates.get("profile.profile-goals"),
needsRerender: !0,
initialize: function() {
this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this), this.model.bind("remove", this.render, this), this.model.bind("add", this.render, this);
if (this.options.readonly) return;
$(this.el).delegate("input.goal-title", "focusout", $.proxy(this.changeTitle, this)).delegate("input.goal-title", "keypress", $.proxy(function(a) {
a.which == "13" && (a.preventDefault(), this.changeTitle(a), $(a.target).blur());
}, this)).delegate("input.goal-title", "keyup", $.proxy(function(a) {
if (a.which == "27") {
a.preventDefault();
var b = $(a.target), c = this.model.get(b.closest(".goal").data("id"));
b.val(c.get("title")), b.blur();
}
}, this)).delegate(".goal", "mouseenter mouseleave", function(a) {
var b = $(a.currentTarget);
a.type == "mouseenter" ? (b.find(".goal-description .summary-light").hide(), b.find(".goal-description .goal-controls").show()) : (b.find(".goal-description .goal-controls").hide(), b.find(".goal-description .summary-light").show());
}).delegate(".abandon", "click", $.proxy(this.abandon, this));
},
changeTitle: function(a, b) {
var c = $(a.target), d = this.model.get(c.closest(".goal").data("id")), e = c.val();
e !== d.get("title") && d.save({
title: e
});
},
show: function() {
return this.needsRerender && this.render(), $(this.el).show();
},
hide: function() {
$(this.el).hide();
},
render: function() {
var a = $(this.el);
this.needsRerender = !1;
var b = _.pluck(this.model.models, "attributes");
a.html(this.template({
goals: b,
isCurrent: this.options.type == "current",
isCompleted: this.options.type == "completed",
isAbandoned: this.options.type == "abandoned",
readonly: this.options.readonly,
colors: this.options.colors
}));
var c = this.$(".goalpicker");
return c.length > 0 && (this.newGoalsView = new NewGoalView({
el: c,
model: this.model
})), Profile.hoverContent(a.find(".objective"), "#profile-goals-content"), a;
},
abandon: function(a) {
var b = $(a.target).closest(".goal"), c = this.model.get(b.data("id"));
if (!c) {
alert("Please wait a few seconds and try again. If this is the second time you've seen this message, reload the page");
return;
}
confirm("Abandoning a goal is permanent and cannot be undone. Do you really want to abandon this goal?") && (this.model.remove(c), c.set({
abandoned: !0
}), AbandonedGoalBook.add(c), c.save().fail(function() {
KAConsole.log("Warning: failed to abandon goal", c), AbandonedGoalBook.remove(c), this.model.add(c);
}));
}
}), GoalProfileViewsCollection = {
views: {},
render: function(a) {
var b = Profile.profile.get("isSelf"), c = [], d = [], e = [];
$.each(a, function(a, b) {
b.completed ? b.abandoned ? e.push(b) : d.push(b) : c.push(b);
}), b ? GoalBook.reset(c) : CurrentGoalBook = new GoalCollection(c), CompletedGoalBook = new GoalCollection(d), AbandonedGoalBook = new GoalCollection(e), $("#profile-goals-content").html('<div id="current-goals-list"></div><div id="completed-goals-list"></div><div id="abandoned-goals-list"></div>'), this.views.current = new GoalProfileView({
el: "#current-goals-list",
model: b ? GoalBook : CurrentGoalBook,
type: "current",
readonly: !b
}), this.views.completed = new GoalProfileView({
el: "#completed-goals-list",
model: CompletedGoalBook,
type: "completed",
readonly: !0
}), this.views.abandoned = new GoalProfileView({
el: "#abandoned-goals-list",
model: AbandonedGoalBook,
type: "abandoned",
readonly: !0
}), b && $(".new-goal").addClass("green").removeClass("disabled").click(function(a) {
a.preventDefault(), window.newGoalDialog.show();
});
var f = $("#tab-content-goals .graph-picker .type"), g = "current";
$.each(this.views, function(a, b) {
if (f.filter("." + b.options.type).hasClass("selected")) return g = b.options.type, !1;
}), this.showGoalType(g);
},
showGoalType: function(a) {
var b = this.views[a];
b && b.show().siblings().hide(), $(".graph-picker").find("." + a).addClass("selected").siblings().removeClass("selected");
}
}, Profile = {
version: 0,
email: null,
fLoadingGraph: !1,
fLoadedGraph: !1,
profile: null,
profileRoot: "",
isDataCollectible: !1,
showIntro_: function() {},
init: function(a) {
this.profile = new ProfileModel(a.profileData), this.profile.bind("savesuccess", this.onProfileUpdated_, this);
var b = a.profileRoot;
window.location.pathname.indexOf("@") > -1 && (b = decodeURIComponent(b)), this.profileRoot = b, this.isDataCollectible = a.isDataCollectible, this.secureUrlBase = a.secureUrlBase, UserCardView.countVideos = a.countVideos, UserCardView.countExercises = a.countExercises, Profile.render(), Profile.router = new Profile.TabRouter({
routes: this.buildRoutes_()
}), Profile.router.bind("all", Analytics.handleRouterNavigation), Backbone.history.start({
pushState: !0,
root: this.profileRoot
}), Profile.showIntro_(), $(".lte8 .goals-accordion-content").remove(), Highcharts.setOptions({
credits: {
enabled: !1
},
title: {
text: ""
},
subtitle: {
text: ""
}
});
var c = _.bind(this.onNavigationElementClicked_, this);
$(".profile-navigation .vertical-tab-list").delegate("a", "click", c), $("#tab-content-vital-statistics").delegate(".graph-date-picker a", "click", c), $("#tab-content-goals").delegate(".graph-picker .type a", "click", c), $(".achievement .ach-text").delegate("a", "click", function(a) {
a.metaKey || (a.preventDefault(), Profile.router.navigate("achievements", !0), $("#achievement-list ul li#category-" + $(this).data("category")).click());
});
},
subRoutes: {
achievements: "showAchievements",
"goals/:type": "showGoals",
goals: "showGoals",
"vital-statistics": "showVitalStatistics",
"vital-statistics/problems/:exercise": "showExerciseProblems",
"vital-statistics/:graph/:timePeriod": "showVitalStatisticsForTimePeriod",
"vital-statistics/:graph": "showVitalStatistics",
coaches: "showCoaches",
discussion: "showDiscussion",
settings: "showSettings",
"": "showDefault",
"/": "showDefault",
"vital-statistics/*path": "showVitalStatistics",
profile: "showDefault",
"profile/": "showDefault",
"profile?view=mobile": "showDefault"
},
buildRoutes_: function() {
var a = this.subRoutes, b = this.profileRoot.length;
if (this.profileRoot.lastIndexOf("/") === b - 1) {
var c = this.profileRoot.substr(1, b - 2);
a[c] = "showDefault";
}
return a;
},
onProfileUpdated_: function() {
var a = this.profile.get("username");
a && Profile.profileRoot != "/profile/" + a + "/" && window.location.replace("/profile/" + a + "/");
},
TabRouter: Backbone.Router.extend({
showDefault: function() {
Profile.populateActivity().then(function() {
Profile.profile.isEditable() && Profile.populateAchievements();
}), $("#tab-content-user-profile").show().siblings().hide(), this.activateRelatedTab($("#tab-content-user-profile").attr("rel")), this.updateTitleBreadcrumbs();
},
showVitalStatistics: function(a, b, c) {
var b = b || "addition_1", d = "";
Profile.profile.get("email") ? d = "email=" + encodeURIComponent(Profile.profile.get("email")) : Profile.profile.get("username") && (d = "username=" + Profile.profile.get("username"));
var e = {
activity: "/profile/graph/activity?" + d,
focus: "/profile/graph/focus?" + d,
"skill-progress-over-time": "/profile/graph/exercisesovertime?" + d,
"skill-progress": "/api/v1/user/exercises?" + d,
problems: "/profile/graph/exerciseproblems?exercise_name=" + b + "&" + d
}, f = {
today: "&dt_start=today",
yesterday: "&dt_start=yesterday",
"last-week": "&dt_start=lastweek&dt_end=today",
"last-month": "&dt_start=lastmonth&dt_end=today"
}, a = e[a] ? a : "activity", c = f[c] ? c : "last-week", g = f[c], h = e[a] + g;
$("#tab-content-vital-statistics").show().find(".vital-statistics-description ." + a).show().find(".graph-date-picker .tabrow .last-week").addClass("selected").siblings().removeClass("selected").end().end().siblings().hide().end().end().siblings().hide(), this.activateRelatedTab($("#tab-content-vital-statistics").attr("rel") + " " + a);
var i = a.replace(/-/gi, " ");
if (a == "problems") {
var j = b.replace(/_/gi, " ");
this.updateTitleBreadcrumbs([ i, j ]);
} else this.updateTitleBreadcrumbs([ i ]);
Profile.profile.isFullyAccessible() ? Profile.loadGraph(h) : Profile.renderFakeGraph(a, c);
},
showExerciseProblems: function(a) {
this.showVitalStatistics("problems", a);
},
showVitalStatisticsForTimePeriod: function(a, b) {
this.showVitalStatistics(a, null, b), $(".vital-statistics-description ." + a + " ." + b).addClass("selected").siblings().removeClass("selected");
},
showAchievements: function() {
Profile.populateAchievements(), $("#tab-content-achievements").show().siblings().hide(), this.activateRelatedTab($("#tab-content-achievements").attr("rel")), this.updateTitleBreadcrumbs([ "Achievements" ]);
},
showGoals: function(a) {
a = a || "current", Profile.populateGoals(), GoalProfileViewsCollection.showGoalType(a), $("#tab-content-goals").show().siblings().hide(), this.activateRelatedTab($("#tab-content-goals").attr("rel")), this.updateTitleBreadcrumbs([ "Goals" ]);
},
showCoaches: function() {
Profile.populateCoaches(), $("#tab-content-coaches").show().siblings().hide(), this.activateRelatedTab("community coaches"), this.updateTitleBreadcrumbs([ "Coaches" ]), Profile.profile.get("isPhantom") && Profile.showNotification("no-coaches-for-phantoms");
},
showDiscussion: function() {
$("#tab-content-discussion").show().siblings().hide(), this.activateRelatedTab("community discussion"), this.updateTitleBreadcrumbs([ "Discussion" ]), Profile.populateDiscussion();
},
settingsIframe_: null,
showSettings: function() {
Profile.settingsIframe_ || (Profile.settingsIframe_ = $("<iframe></iframe>").attr("src", "/pwchange").attr("frameborder", "0").attr("scrolling", "no").attr("allowtransparency", "yes").attr("id", "settings-iframe").attr("class", "settings-iframe").appendTo($("#tab-content-settings"))), $("#tab-content-settings").show().siblings().hide(), this.activateRelatedTab(""), this.updateTitleBreadcrumbs([ "Settings" ]);
},
activateRelatedTab: function(a) {
$(".profile-navigation .vertical-tab-list a").removeClass("active-tab"), $("a[rel='" + a + "']").addClass("active-tab");
},
updateTitleBreadcrumbs: function(a) {
$(".profile-notification").hide();
var b = $(".profile-sheet-title");
if (a && a.length) {
var c = Profile.profile.get("nickname") || "Profile";
a.unshift(c), b.text(a.join(" » ")).show(), Profile.profile.isFullyAccessible() || $(".profile-notification").show();
} else b.text("").hide();
}
}),
onNavigationElementClicked_: function(a) {
if (!a.metaKey) {
a.preventDefault();
var b = $(a.currentTarget).attr("href");
b.indexOf(this.profileRoot) === 0 && (b = b.substring(this.profileRoot.length)), Profile.router.navigate(b, !0);
}
},
loadGraph: function(a) {
var b = {
"/api/v1/user/exercises": this.renderExercisesTable,
"/api/v1/exercises": this.renderFakeExercisesTable_
};
if (!a) return;
if (this.fLoadingGraph) {
setTimeout(function() {
Profile.loadGraph(a);
}, 200);
return;
}
this.fLoadingGraph = !0, this.fLoadedGraph = !1;
var c = null;
for (var d in b) a.indexOf(d) > -1 && (c = b[d]);
$.ajax({
type: "GET",
url: Timezone.append_tz_offset_query_param(a),
data: {},
dataType: c ? "json" : "html",
success: function(a) {
Profile.finishLoadGraph(a, c);
},
error: function() {
Profile.finishLoadGraphError();
}
}), $("#graph-content").html(""), this.showGraphThrobber(!0);
},
finishLoadGraph: function(a, b) {
this.fLoadingGraph = !1, this.showGraphThrobber(!1);
var c = (new Date).getTime();
b ? b(a) : $("#graph-content").html(a);
var d = (new Date).getTime() - c;
KAConsole.log("API call rendered in " + d + " ms."), this.fLoadedGraph = !0;
},
finishLoadGraphError: function() {
this.fLoadingGraph = !1, this.showGraphThrobber(!1), Profile.showNotification("error-graph");
},
renderFakeGraph: function(a, b) {
a === "activity" ? (ActivityGraph.render(null, b), Profile.fLoadedGraph = !0) : a === "focus" ? (FocusGraph.render(), Profile.fLoadedGraph = !0) : a === "skill-progress" ? Profile.loadGraph("/api/v1/exercises") : (ExerciseGraphOverTime.render(), Profile.fLoadedGraph = !0);
},
generateFakeExerciseTableData_: function(a) {
return _.map(a, function(a) {
var b = a.h_position, c = 0, d = {}, e = Math.random();
return b < 10 ? Math.random() < .9 && (c = 1, e < .5 ? d.proficient = !0 : e < .7 && (d.reviewing = !0)) : b < 17 ? Math.random() < .6 && (c = 1, e < .4 ? d.proficient = !0 : e < .7 ? d.reviewing = !0 : e < .75 && (d.struggling = !0)) : Math.random() < .1 && (c = 1, e < .2 ? d.proficient = !0 : e < .5 && (d.struggling = !0)), {
exercise_model: a,
total_done: c,
exercise_states: d
};
});
},
renderFakeExercisesTable_: function(a) {
if (Profile.fLoadedGraph) return;
var b = Profile.generateFakeExerciseTableData_(a);
Profile.renderExercisesTable(b, !1), $("#module-progress").addClass("empty-chart");
},
renderExercisesTable: function(a, b) {
var c = [], b = b === undefined ? !0 : b, d = !0, e = [];
for (var f = 0, g; g = a[f]; f++) {
var h = "Not started", i = "", j = g.exercise_states, k = g.total_done;
k > 0 && (d = !1), j.reviewing ? (h = "Review", i = "review light") : j.proficient ? (h = "Proficient", i = "proficient") : j.struggling ? (h = "Struggling", i = "struggling") : k > 0 && (h = "Started", i = "started"), i ? i += " action-gradient seethrough" : i = "transparent";
var l = g.exercise_model;
e.push(l), c.push({
name: l.name,
color: i,
status: h,
shortName: l.short_display_name || l.display_name,
displayName: l.display_name,
progress: Math.floor(g.progress * 100) + "%",
totalDone: k
});
}
if (d) {
Profile.renderFakeExercisesTable_(e), Profile.showNotification("empty-graph");
return;
}
var m = Templates.get("profile.exercise_progress");
$("#graph-content").html(m({
exercises: c
})), b && (Profile.hoverContent($("#module-progress .student-module-status")), $("#module-progress .student-module-status").click(function(a) {
$("#info-hover-container").hide();
var b = this.id.substring("exercise-".length);
Profile.router.navigate("vital-statistics/problems/" + b, !0);
}));
},
showGraphThrobber: function(a) {
a ? $("#graph-progress-bar").progressbar({
value: 100
}).slideDown("fast") : $("#graph-progress-bar").slideUp("fast", function() {
$(this).hide();
});
},
showNotification: function(a) {
var b = $(".profile-notification").removeClass("uncover-nav");
(a === "empty-graph" || a === "no-discussion") && b.addClass("uncover-nav"), b.show().find("." + a).show().siblings().hide();
},
hoverContent: function(a, b) {
var c, d, e;
b = b || "#graph-content", a.hover(function(a) {
var f = +(new Date), g = this;
c = f, d = a.pageX, e = a.pageY, setTimeout(function() {
if (f !== c) return;
var a = $(g).children(".hover-data"), h = $.trim(a.html());
if (h) {
var i = $(b), j = i.offset().left + i.width() - 150, k = Math.min(d + 15, j), l = $("#info-hover-container");
l.length === 0 && (l = $('<div id="info-hover-container"></div>').appendTo("body")), l.html(h).css({
left: k,
top: e + 5
}).show();
}
}, 100);
}, function(a) {
c = null, $("#info-hover-container").hide();
});
},
render: function() {
var a = Templates.get("profile.profile");
Handlebars.registerHelper("graph-date-picker-wrapper", function(a) {
return this.graph = a.hash.graph, a(this);
}), Handlebars.registerPartial("profile_graph-date-picker", Templates.get("profile.graph-date-picker")), Handlebars.registerPartial("profile_vital-statistics", Templates.get("profile.vital-statistics")), $("#profile-content").html(a({
profileRoot: this.profileRoot,
profileData: this.profile.toJSON(),
countVideos: UserCardView.countVideos,
countExercises: UserCardView.countExercises
})), $("#tab-content-user-profile").show().siblings().hide(), Profile.populateUserCard(), this.profile.bind("change:nickname", function(a) {
var b = a.get("nickname") || "Profile";
$("#profile-tab-link").text(b), $("#top-header-links .user-name a").text(b);
}), this.profile.bind("change:avatarSrc", function(a) {
var b = a.get("avatarSrc");
$(".profile-tab-avatar").attr("src", b), $("#top-header #user-info .user-avatar").attr("src", b);
});
},
userCardPopulated_: !1,
populateUserCard: function() {
if (Profile.userCardPopulated_) return;
var a = new UserCardView({
model: this.profile
});
$(".user-info-container").html(a.render().el);
var b = new Badges.BadgeList(this.profile.get("publicBadges"));
b.setSaveUrl("/api/v1/user/badges/public");
var c = new Badges.DisplayCase({
model: b
});
$(".sticker-book").append(c.render().el), Profile.displayCase = c, Profile.userCardPopulated_ = !0;
},
achievementsDeferred_: null,
populateAchievements: function() {
return Profile.achievementsDeferred_ ? Profile.achievementsDeferred_ : Profile.achievementsDeferred_ = $.ajax({
type: "GET",
url: "/api/v1/user/badges",
data: {
casing: "camel",
email: USER_EMAIL
},
dataType: "json",
success: function(a) {
if (Profile.profile.isEditable()) {
var b = new Badges.UserBadgeList, c = a.badgeCollections;
$.each(c, function(a, c) {
$.each(c.userBadges, function(a, c) {
b.add(new Badges.UserBadge(c));
});
}), Profile.displayCase.setFullBadgeList(b);
}
var d = [ {
icon: "/images/badges/meteorite-medium.png",
className: "bronze",
label: "Meteorite"
}, {
icon: "/images/badges/moon-medium.png",
className: "silver",
label: "Moon"
}, {
icon: "/images/badges/earth-medium.png",
className: "gold",
label: "Earth"
}, {
icon: "/images/badges/sun-medium.png",
className: "diamond",
label: "Sun"
}, {
icon: "/images/badges/eclipse-medium.png",
className: "platinum",
label: "Black Hole"
}, {
icon: "/images/badges/master-challenge-blue.png",
className: "master",
label: "Challenge"
} ];
Handlebars.registerHelper("toMediumIconSrc", function(a) {
return d[a].icon;
}), Handlebars.registerHelper("toBadgeClassName", function(a) {
return d[a].className;
}), Handlebars.registerHelper("toBadgeLabel", function(a, b) {
var c = d[a].label;
return b && (c === "Challenge" ? c += " Patches" : c += " Badges"), c;
}), Handlebars.registerPartial("profile_badge-container", Templates.get("profile.badge-container")), Handlebars.registerPartial("profile_badge", Templates.get("profile.badge")), Handlebars.registerPartial("profile_user-badge", Templates.get("profile.user-badge")), $.each(a.badgeCollections, function(a, b) {
$.each(b.userBadges, function(a, b) {
var c = b.targetContextNames, d = c.length - 1;
b.visibleContextName = c[0] || "", b.listContextNamesHidden = $.map(c.slice(1), function(a, b) {
return {
name: a,
isLast: b === d - 1
};
}), b.hasMultiple = b.count > 1;
});
}), a.fStandardView = !0;
var e = Templates.get("profile.achievements");
$("#tab-content-achievements").html(e(a)), $("#achievements #achievement-list > ul li").click(function() {
var a = $(this).attr("id"), b = $(this);
$("#badge-container").css("display", ""), b.siblings().removeClass("selected");
if ($("#badge-container > #" + a).is(":visible")) b.parents().hasClass("standard-view") ? $("#badge-container > #" + a).slideUp(300, function() {
$("#badge-container").css("display", "none"), b.removeClass("selected");
}) : ($("#badge-container > #" + a).hide(), $("#badge-container").css("display", "none"), b.removeClass("selected")); else {
var c = $("#badge-container"), d = c.height();
$(c).children().hide(), b.parents().hasClass("standard-view") ? ($(c).css("min-height", d), $("#" + a, c).slideDown(300, function() {
$(c).animate({
"min-height": 0
}, 200);
})) : $("#" + a, c).show(), b.addClass("selected");
}
}), $("abbr.timeago").timeago(), $("#category-0").click();
var f = window.GoalBook.map(function(a) {
return a.get("title");
});
_($(".add-goal")).map(function(a) {
var b = $(a), c = b.closest(".achievement-badge"), d = c.find(".achievement-title").text();
_.indexOf(f, d) > -1 ? b.remove() : b.one("click", function() {
var a = _(c.data("objectives")).map(function(a) {
return {
type: "GoalObjectiveExerciseProficiency",
internal_id: a
};
}), e = new Goal({
title: d,
objectives: a
});
window.GoalBook.add(e), e.save().fail(function(a) {
var c = a.responseText;
b.addClass("failure").text("oh no!").attr("title", "This goal could not be saved."), KAConsole.log("Error while saving new badge goal", e), window.GoalBook.remove(e);
}).success(function() {
b.text("Goal Added!").addClass("success"), c.find(".energy-points-badge").addClass("goal-added");
});
});
});
}
});
},
goalsDeferred_: null,
populateGoals: function() {
return Profile.goalsDeferred_ ? Profile.goalsDeferred_ : (Profile.profile.isFullyAccessible() ? Profile.goalsDeferred_ = $.ajax({
type: "GET",
url: "/api/v1/user/goals",
data: Profile.getBaseRequestParams_(),
dataType: "json",
success: function(a) {
GoalProfileViewsCollection.render(a);
}
}) : (Profile.renderFakeGoals_(), Profile.goalsDeferred_ = new $.Deferred, Profile.goalsDeferred_.resolve()), Profile.goalsDeferred_);
},
renderFakeGoals_: function() {
var a = new Goal(Goal.defaultExerciseProcessGoalAttrs_), b = new Goal(Goal.defaultVideoProcessGoalAttrs_), c = new GoalCollection([ a, b ]), d = new GoalProfileView({
model: c
});
$("#profile-goals-content").append(d.show().addClass("empty-chart"));
},
coachesDeferred_: null,
populateCoaches: function() {
return Profile.coachesDeferred_ ? Profile.coachesDeferred_ : (Profile.coachesDeferred_ = Coaches.init(), Profile.coachesDeferred_);
},
discussionDeferred_: null,
noDiscussion_: !1,
populateDiscussion: function() {
return Profile.noDiscussion_ && Profile.showNotification("no-discussion"), Profile.discussionDeferred_ ? Profile.discussionDeferred_ : (Profile.profile.isFullyAccessible() ? Profile.discussionDeferred_ = $.ajax({
type: "GET",
url: "/api/v1/user/questions",
data: Profile.getBaseRequestParams_(),
dataType: "json",
success: function(a) {
if (a.length === 0) {
Profile.noDiscussion_ = !0, Profile.showNotification("no-discussion");
return;
}
var b = Templates.get("profile.questions-list");
a = _.sortBy(a, function(a) {
return a.lastDate;
}), a.reverse(), $("#tab-content-discussion").append(b(a)).find("div.timeago").timeago();
if (Profile.profile.get("isSelf")) {
var c = 500, d = 500, e = 300, f = 300;
$("#tab-content-discussion .unread").delay(c).animate({
"background-color": "#dcf2fa"
}, d).delay(e).animate({
"background-color": "#ebf7fb"
}, f);
}
}
}) : (Profile.discussionDeferred_ = new $.Deferred, Profile.discussionDeferred_.resolve()), Profile.discussionDeferred_);
},
populateSuggestedActivity: function(a) {
var b = Templates.get("profile.suggested-activity"), c = function(a) {
a.progress = a.progress || 0;
};
_.each(a.exercises || [], c), _.each(a.videos || [], c), $("#suggested-activity").append(b(a));
},
populateRecentActivity: function(a) {
var b = Templates.get("profile.recent-activity-list"), c = Templates.get("profile.recent-activity-exercise"), d = Templates.get("profile.recent-activity-badge"), e = Templates.get("profile.recent-activity-video"), f = Templates.get("profile.recent-activity-goal");
Handlebars.registerHelper("renderActivity", function(a) {
return _.extend(a, {
profileRoot: Profile.profileRoot
}), a.sType === "Exercise" ? c(a) : a.sType === "Badge" ? d(a) : a.sType === "Video" ? e(a) : a.sType === "Goal" ? f(a) : "";
}), $("#recent-activity").append(b(a)).find("span.timeago").timeago();
},
activityDeferred_: null,
populateActivity: function() {
return Profile.activityDeferred_ ? Profile.activityDeferred_ : ($("#recent-activity-progress-bar").progressbar({
value: 100
}), Profile.profile.isFullyAccessible() ? Profile.activityDeferred_ = $.ajax({
type: "GET",
url: "/api/v1/user/activity",
data: Profile.getBaseRequestParams_(),
dataType: "json",
success: function(a) {
$("#activity-loading-placeholder").fadeOut("slow", function() {
$(this).hide();
}), Profile.populateSuggestedActivity(a.suggested), Profile.populateRecentActivity(a.recent), $("#activity-contents").show();
}
}) : (Profile.activityDeferred_ = new $.Deferred, Profile.activityDeferred_.resolve()), Profile.activityDeferred_);
},
getBaseRequestParams_: function() {
var a = {
casing: "camel"
};
return Profile.profile.get("email") ? a.email = Profile.profile.get("email") : Profile.profile.get("username") && (a.username = Profile.profile.get("username")), a;
}
};