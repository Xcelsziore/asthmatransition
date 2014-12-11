(function() {
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
})();