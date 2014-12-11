jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
def: "easeOutQuad",
swing: function(a, b, c, d, e) {
return jQuery.easing[jQuery.easing.def](a, b, c, d, e);
},
easeInQuad: function(a, b, c, d, e) {
return d * (b /= e) * b + c;
},
easeOutQuad: function(a, b, c, d, e) {
return -d * (b /= e) * (b - 2) + c;
},
easeInOutQuad: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c;
},
easeInCubic: function(a, b, c, d, e) {
return d * (b /= e) * b * b + c;
},
easeOutCubic: function(a, b, c, d, e) {
return d * ((b = b / e - 1) * b * b + 1) + c;
},
easeInOutCubic: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c;
},
easeInQuart: function(a, b, c, d, e) {
return d * (b /= e) * b * b * b + c;
},
easeOutQuart: function(a, b, c, d, e) {
return -d * ((b = b / e - 1) * b * b * b - 1) + c;
},
easeInOutQuart: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c;
},
easeInQuint: function(a, b, c, d, e) {
return d * (b /= e) * b * b * b * b + c;
},
easeOutQuint: function(a, b, c, d, e) {
return d * ((b = b / e - 1) * b * b * b * b + 1) + c;
},
easeInOutQuint: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c;
},
easeInSine: function(a, b, c, d, e) {
return -d * Math.cos(b / e * (Math.PI / 2)) + d + c;
},
easeOutSine: function(a, b, c, d, e) {
return d * Math.sin(b / e * (Math.PI / 2)) + c;
},
easeInOutSine: function(a, b, c, d, e) {
return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c;
},
easeInExpo: function(a, b, c, d, e) {
return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c;
},
easeOutExpo: function(a, b, c, d, e) {
return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c;
},
easeInOutExpo: function(a, b, c, d, e) {
return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
},
easeInCirc: function(a, b, c, d, e) {
return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c;
},
easeOutCirc: function(a, b, c, d, e) {
return d * Math.sqrt(1 - (b = b / e - 1) * b) + c;
},
easeInOutCirc: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
},
easeInElastic: function(a, b, c, d, e) {
var f = 1.70158, g = 0, h = d;
if (b == 0) return c;
if ((b /= e) == 1) return c + d;
g || (g = e * .3);
if (h < Math.abs(d)) {
h = d;
var f = g / 4;
} else var f = g / (2 * Math.PI) * Math.asin(d / h);
return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c;
},
easeOutElastic: function(a, b, c, d, e) {
var f = 1.70158, g = 0, h = d;
if (b == 0) return c;
if ((b /= e) == 1) return c + d;
g || (g = e * .3);
if (h < Math.abs(d)) {
h = d;
var f = g / 4;
} else var f = g / (2 * Math.PI) * Math.asin(d / h);
return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c;
},
easeInOutElastic: function(a, b, c, d, e) {
var f = 1.70158, g = 0, h = d;
if (b == 0) return c;
if ((b /= e / 2) == 2) return c + d;
g || (g = e * .3 * 1.5);
if (h < Math.abs(d)) {
h = d;
var f = g / 4;
} else var f = g / (2 * Math.PI) * Math.asin(d / h);
return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c;
},
easeInBack: function(a, b, c, d, e, f) {
return f == undefined && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c;
},
easeOutBack: function(a, b, c, d, e, f) {
return f == undefined && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c;
},
easeInOutBack: function(a, b, c, d, e, f) {
return f == undefined && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c;
},
easeInBounce: function(a, b, c, d, e) {
return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c;
},
easeOutBounce: function(a, b, c, d, e) {
return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c;
},
easeInOutBounce: function(a, b, c, d, e) {
return b < e / 2 ? jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c : jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c;
}
}), function(a) {
function c(b) {
a.fn.cycle.debug && d(b);
}
function d() {
window.console && window.console.log && window.console.log("[cycle] " + Array.prototype.join.call(arguments, " "));
}
function e(b, c, e) {
function i(b, c, e) {
if (!b && c === !0) {
var f = a(e).data("cycle.opts");
if (!f) return d("options not found, can not resume"), !1;
e.cycleTimeout && (clearTimeout(e.cycleTimeout), e.cycleTimeout = 0), l(f.elements, f, 1, !f.backwards);
}
}
b.cycleStop == undefined && (b.cycleStop = 0);
if (c === undefined || c === null) c = {};
if (c.constructor == String) {
switch (c) {
case "destroy":
case "stop":
var f = a(b).data("cycle.opts");
if (!f) return !1;
return b.cycleStop++, b.cycleTimeout && clearTimeout(b.cycleTimeout), b.cycleTimeout = 0, a(b).removeData("cycle.opts"), c == "destroy" && g(f), !1;
case "toggle":
return b.cyclePause = b.cyclePause === 1 ? 0 : 1, i(b.cyclePause, e, b), !1;
case "pause":
return b.cyclePause = 1, !1;
case "resume":
return b.cyclePause = 0, i(!1, e, b), !1;
case "prev":
case "next":
var f = a(b).data("cycle.opts");
if (!f) return d('options not found, "prev/next" ignored'), !1;
return a.fn.cycle[c](f), !1;
default:
c = {
fx: c
};
}
return c;
}
if (c.constructor == Number) {
var h = c;
return c = a(b).data("cycle.opts"), c ? h < 0 || h >= c.elements.length ? (d("invalid slide index: " + h), !1) : (c.nextSlide = h, b.cycleTimeout && (clearTimeout(b.cycleTimeout), b.cycleTimeout = 0), typeof e == "string" && (c.oneTimeFx = e), l(c.elements, c, 1, h >= c.currSlide), !1) : (d("options not found, can not advance slide"), !1);
}
return c;
}
function f(b, c) {
if (!a.support.opacity && c.cleartype && b.style.filter) try {
b.style.removeAttribute("filter");
} catch (d) {}
}
function g(b) {
b.next && a(b.next).unbind(b.prevNextEvent), b.prev && a(b.prev).unbind(b.prevNextEvent), (b.pager || b.pagerAnchorBuilder) && a.each(b.pagerAnchors || [], function() {
this.unbind().remove();
}), b.pagerAnchors = null, b.destroy && b.destroy(b);
}
function h(b, c, e, g, h) {
var m = a.extend({}, a.fn.cycle.defaults, g || {}, a.metadata ? b.metadata() : a.meta ? b.data() : {});
m.autostop && (m.countdown = m.autostopCount || e.length);
var p = b[0];
b.data("cycle.opts", m), m.$cont = b, m.stopCount = p.cycleStop, m.elements = e, m.before = m.before ? [ m.before ] : [], m.after = m.after ? [ m.after ] : [], m.after.unshift(function() {
m.busy = 0;
}), !a.support.opacity && m.cleartype && m.after.push(function() {
f(this, m);
}), m.continuous && m.after.push(function() {
l(e, m, 0, !m.backwards);
}), i(m), !a.support.opacity && m.cleartype && !m.cleartypeNoBg && q(c), b.css("position") == "static" && b.css("position", "relative"), m.width && b.width(m.width), m.height && m.height != "auto" && b.height(m.height), m.startingSlide ? m.startingSlide = parseInt(m.startingSlide) : m.backwards && (m.startingSlide = e.length - 1);
if (m.random) {
m.randomMap = [];
for (var r = 0; r < e.length; r++) m.randomMap.push(r);
m.randomMap.sort(function(a, b) {
return Math.random() - .5;
}), m.randomIndex = 1, m.startingSlide = m.randomMap[1];
} else m.startingSlide >= e.length && (m.startingSlide = 0);
m.currSlide = m.startingSlide || 0;
var s = m.startingSlide;
c.css({
position: "absolute",
top: 0,
left: 0
}).hide().each(function(b) {
var c;
m.backwards ? c = s ? b <= s ? e.length + (b - s) : s - b : e.length - b : c = s ? b >= s ? e.length - (b - s) : s - b : e.length - b, a(this).css("z-index", c);
}), a(e[s]).css("opacity", 1).show(), f(e[s], m), m.fit && m.width && c.width(m.width), m.fit && m.height && m.height != "auto" && c.height(m.height);
var t = m.containerResize && !b.innerHeight();
if (t) {
var u = 0, v = 0;
for (var w = 0; w < e.length; w++) {
var x = a(e[w]), y = x[0], z = x.outerWidth(), A = x.outerHeight();
z || (z = y.offsetWidth || y.width || x.attr("width")), A || (A = y.offsetHeight || y.height || x.attr("height")), u = z > u ? z : u, v = A > v ? A : v;
}
u > 0 && v > 0 && b.css({
width: u + "px",
height: v + "px"
});
}
m.pause && b.hover(function() {
this.cyclePause++;
}, function() {
this.cyclePause--;
});
if (j(m) === !1) return !1;
var B = !1;
g.requeueAttempts = g.requeueAttempts || 0, c.each(function() {
var b = a(this);
this.cycleH = m.fit && m.height ? m.height : b.height() || this.offsetHeight || this.height || b.attr("height") || 0, this.cycleW = m.fit && m.width ? m.width : b.width() || this.offsetWidth || this.width || b.attr("width") || 0;
if (b.is("img")) {
var c = a.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete, e = a.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete, f = a.browser.opera && (this.cycleW == 42 && this.cycleH == 19 || this.cycleW == 37 && this.cycleH == 17) && !this.complete, i = this.cycleH == 0 && this.cycleW == 0 && !this.complete;
if (c || e || f || i) {
if (h.s && m.requeueOnImageNotLoaded && ++g.requeueAttempts < 100) return d(g.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH), setTimeout(function() {
a(h.s, h.c).cycle(g);
}, m.requeueTimeout), B = !0, !1;
d("could not determine size of image: " + this.src, this.cycleW, this.cycleH);
}
}
return !0;
});
if (B) return !1;
m.cssBefore = m.cssBefore || {}, m.animIn = m.animIn || {}, m.animOut = m.animOut || {}, c.not(":eq(" + s + ")").css(m.cssBefore), m.cssFirst && a(c[s]).css(m.cssFirst);
if (m.timeout) {
m.timeout = parseInt(m.timeout), m.speed.constructor == String && (m.speed = a.fx.speeds[m.speed] || parseInt(m.speed)), m.sync || (m.speed = m.speed / 2);
var C = m.fx == "shuffle" ? 500 : 250;
while (m.timeout - m.speed < C) m.timeout += m.speed;
}
m.easing && (m.easeIn = m.easeOut = m.easing), m.speedIn || (m.speedIn = m.speed), m.speedOut || (m.speedOut = m.speed), m.slideCount = e.length, m.currSlide = m.lastSlide = s, m.random ? (++m.randomIndex == e.length && (m.randomIndex = 0), m.nextSlide = m.randomMap[m.randomIndex]) : m.backwards ? m.nextSlide = m.startingSlide == 0 ? e.length - 1 : m.startingSlide - 1 : m.nextSlide = m.startingSlide >= e.length - 1 ? 0 : m.startingSlide + 1;
if (!m.multiFx) {
var D = a.fn.cycle.transitions[m.fx];
if (a.isFunction(D)) D(b, c, m); else if (m.fx != "custom" && !m.multiFx) return d("unknown transition: " + m.fx, "; slideshow terminating"), !1;
}
var E = c[s];
return m.before.length && m.before[0].apply(E, [ E, E, m, !0 ]), m.after.length > 1 && m.after[1].apply(E, [ E, E, m, !0 ]), m.next && a(m.next).bind(m.prevNextEvent, function() {
return n(m, 1);
}), m.prev && a(m.prev).bind(m.prevNextEvent, function() {
return n(m, 0);
}), (m.pager || m.pagerAnchorBuilder) && o(e, m), k(m, e), m;
}
function i(b) {
b.original = {
before: [],
after: []
}, b.original.cssBefore = a.extend({}, b.cssBefore), b.original.cssAfter = a.extend({}, b.cssAfter), b.original.animIn = a.extend({}, b.animIn), b.original.animOut = a.extend({}, b.animOut), a.each(b.before, function() {
b.original.before.push(this);
}), a.each(b.after, function() {
b.original.after.push(this);
});
}
function j(b) {
var e, f, g = a.fn.cycle.transitions;
if (b.fx.indexOf(",") > 0) {
b.multiFx = !0, b.fxs = b.fx.replace(/\s*/g, "").split(",");
for (e = 0; e < b.fxs.length; e++) {
var h = b.fxs[e];
f = g[h];
if (!f || !g.hasOwnProperty(h) || !a.isFunction(f)) d("discarding unknown transition: ", h), b.fxs.splice(e, 1), e--;
}
if (!b.fxs.length) return d("No valid transitions named; slideshow terminating."), !1;
} else if (b.fx == "all") {
b.multiFx = !0, b.fxs = [];
for (p in g) f = g[p], g.hasOwnProperty(p) && a.isFunction(f) && b.fxs.push(p);
}
if (b.multiFx && b.randomizeEffects) {
var i = Math.floor(Math.random() * 20) + 30;
for (e = 0; e < i; e++) {
var j = Math.floor(Math.random() * b.fxs.length);
b.fxs.push(b.fxs.splice(j, 1)[0]);
}
c("randomized fx sequence: ", b.fxs);
}
return !0;
}
function k(b, c) {
b.addSlide = function(d, e) {
var f = a(d), g = f[0];
b.autostopCount || b.countdown++, c[e ? "unshift" : "push"](g), b.els && b.els[e ? "unshift" : "push"](g), b.slideCount = c.length, f.css("position", "absolute"), f[e ? "prependTo" : "appendTo"](b.$cont), e && (b.currSlide++, b.nextSlide++), !a.support.opacity && b.cleartype && !b.cleartypeNoBg && q(f), b.fit && b.width && f.width(b.width), b.fit && b.height && b.height != "auto" && f.height(b.height), g.cycleH = b.fit && b.height ? b.height : f.height(), g.cycleW = b.fit && b.width ? b.width : f.width(), f.css(b.cssBefore), (b.pager || b.pagerAnchorBuilder) && a.fn.cycle.createPagerAnchor(c.length - 1, g, a(b.pager), c, b), a.isFunction(b.onAddSlide) ? b.onAddSlide(f) : f.hide();
};
}
function l(b, d, e, f) {
e && d.busy && d.manualTrump && (c("manualTrump in go(), stopping active transition"), a(b).stop(!0, !0), d.busy = !1);
if (d.busy) {
c("transition active, ignoring new tx request");
return;
}
var g = d.$cont[0], h = b[d.currSlide], i = b[d.nextSlide];
if (g.cycleStop != d.stopCount || g.cycleTimeout === 0 && !e) return;
if (!e && !g.cyclePause && !d.bounce && (d.autostop && --d.countdown <= 0 || d.nowrap && !d.random && d.nextSlide < d.currSlide)) {
d.end && d.end(d);
return;
}
var j = !1;
if ((e || !g.cyclePause) && d.nextSlide != d.currSlide) {
j = !0;
var k = d.fx;
h.cycleH = h.cycleH || a(h).height(), h.cycleW = h.cycleW || a(h).width(), i.cycleH = i.cycleH || a(i).height(), i.cycleW = i.cycleW || a(i).width();
if (d.multiFx) {
if (d.lastFx == undefined || ++d.lastFx >= d.fxs.length) d.lastFx = 0;
k = d.fxs[d.lastFx], d.currFx = k;
}
d.oneTimeFx && (k = d.oneTimeFx, d.oneTimeFx = null), a.fn.cycle.resetState(d, k), d.before.length && a.each(d.before, function(a, b) {
if (g.cycleStop != d.stopCount) return;
b.apply(i, [ h, i, d, f ]);
});
var n = function() {
a.each(d.after, function(a, b) {
if (g.cycleStop != d.stopCount) return;
b.apply(i, [ h, i, d, f ]);
});
};
c("tx firing; currSlide: " + d.currSlide + "; nextSlide: " + d.nextSlide), d.busy = 1, d.fxFn ? d.fxFn(h, i, d, n, f, e && d.fastOnEvent) : a.isFunction(a.fn.cycle[d.fx]) ? a.fn.cycle[d.fx](h, i, d, n, f, e && d.fastOnEvent) : a.fn.cycle.custom(h, i, d, n, f, e && d.fastOnEvent);
}
if (j || d.nextSlide == d.currSlide) {
d.lastSlide = d.currSlide;
if (d.random) d.currSlide = d.nextSlide, ++d.randomIndex == b.length && (d.randomIndex = 0), d.nextSlide = d.randomMap[d.randomIndex], d.nextSlide == d.currSlide && (d.nextSlide = d.currSlide == d.slideCount - 1 ? 0 : d.currSlide + 1); else if (d.backwards) {
var o = d.nextSlide - 1 < 0;
o && d.bounce ? (d.backwards = !d.backwards, d.nextSlide = 1, d.currSlide = 0) : (d.nextSlide = o ? b.length - 1 : d.nextSlide - 1, d.currSlide = o ? 0 : d.nextSlide + 1);
} else {
var o = d.nextSlide + 1 == b.length;
o && d.bounce ? (d.backwards = !d.backwards, d.nextSlide = b.length - 2, d.currSlide = b.length - 1) : (d.nextSlide = o ? 0 : d.nextSlide + 1, d.currSlide = o ? b.length - 1 : d.nextSlide - 1);
}
}
j && d.pager && d.updateActivePagerLink(d.pager, d.currSlide, d.activePagerClass);
var p = 0;
d.timeout && !d.continuous ? p = m(b[d.currSlide], b[d.nextSlide], d, f) : d.continuous && g.cyclePause && (p = 10), p > 0 && (g.cycleTimeout = setTimeout(function() {
l(b, d, 0, !d.backwards);
}, p));
}
function m(a, b, d, e) {
if (d.timeoutFn) {
var f = d.timeoutFn.call(a, a, b, d, e);
while (f - d.speed < 250) f += d.speed;
c("calculated timeout: " + f + "; speed: " + d.speed);
if (f !== !1) return f;
}
return d.timeout;
}
function n(b, c) {
var d = c ? 1 : -1, e = b.elements, f = b.$cont[0], g = f.cycleTimeout;
g && (clearTimeout(g), f.cycleTimeout = 0);
if (b.random && d < 0) b.randomIndex--, --b.randomIndex == -2 ? b.randomIndex = e.length - 2 : b.randomIndex == -1 && (b.randomIndex = e.length - 1), b.nextSlide = b.randomMap[b.randomIndex]; else if (b.random) b.nextSlide = b.randomMap[b.randomIndex]; else {
b.nextSlide = b.currSlide + d;
if (b.nextSlide < 0) {
if (b.nowrap) return !1;
b.nextSlide = e.length - 1;
} else if (b.nextSlide >= e.length) {
if (b.nowrap) return !1;
b.nextSlide = 0;
}
}
var h = b.onPrevNextEvent || b.prevNextClick;
return a.isFunction(h) && h(d > 0, b.nextSlide, e[b.nextSlide]), l(e, b, 1, c), !1;
}
function o(b, c) {
var d = a(c.pager);
a.each(b, function(e, f) {
a.fn.cycle.createPagerAnchor(e, f, d, b, c);
}), c.updateActivePagerLink(c.pager, c.startingSlide, c.activePagerClass);
}
function q(b) {
function d(a) {
return a = parseInt(a).toString(16), a.length < 2 ? "0" + a : a;
}
function e(b) {
for (; b && b.nodeName.toLowerCase() != "html"; b = b.parentNode) {
var c = a.css(b, "background-color");
if (c.indexOf("rgb") >= 0) {
var e = c.match(/\d+/g);
return "#" + d(e[0]) + d(e[1]) + d(e[2]);
}
if (c && c != "transparent") return c;
}
return "#ffffff";
}
c("applying clearType background-color hack"), b.each(function() {
a(this).css("background-color", e(this));
});
}
var b = "2.94";
a.support == undefined && (a.support = {
opacity: !a.browser.msie
}), a.fn.cycle = function(b, f) {
var g = {
s: this.selector,
c: this.context
};
return this.length === 0 && b != "stop" ? !a.isReady && g.s ? (d("DOM not ready, queuing slideshow"), a(function() {
a(g.s, g.c).cycle(b, f);
}), this) : (d("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)")), this) : this.each(function() {
var i = e(this, b, f);
if (i === !1) return;
i.updateActivePagerLink = i.updateActivePagerLink || a.fn.cycle.updateActivePagerLink, this.cycleTimeout && clearTimeout(this.cycleTimeout), this.cycleTimeout = this.cyclePause = 0;
var j = a(this), k = i.slideExpr ? a(i.slideExpr, this) : j.children(), n = k.get();
if (n.length < 2) {
d("terminating; too few slides: " + n.length);
return;
}
var o = h(j, k, n, i, g);
if (o === !1) return;
var p = o.continuous ? 10 : m(n[o.currSlide], n[o.nextSlide], o, !o.backwards);
p && (p += o.delay || 0, p < 10 && (p = 10), c("first timeout: " + p), this.cycleTimeout = setTimeout(function() {
l(n, o, 0, !i.backwards);
}, p));
});
}, a.fn.cycle.resetState = function(b, c) {
c = c || b.fx, b.before = [], b.after = [], b.cssBefore = a.extend({}, b.original.cssBefore), b.cssAfter = a.extend({}, b.original.cssAfter), b.animIn = a.extend({}, b.original.animIn), b.animOut = a.extend({}, b.original.animOut), b.fxFn = null, a.each(b.original.before, function() {
b.before.push(this);
}), a.each(b.original.after, function() {
b.after.push(this);
});
var d = a.fn.cycle.transitions[c];
a.isFunction(d) && d(b.$cont, a(b.elements), b);
}, a.fn.cycle.updateActivePagerLink = function(b, c, d) {
a(b).each(function() {
a(this).children().removeClass(d).eq(c).addClass(d);
});
}, a.fn.cycle.next = function(a) {
n(a, 1);
}, a.fn.cycle.prev = function(a) {
n(a, 0);
}, a.fn.cycle.createPagerAnchor = function(b, d, e, f, g) {
var h;
a.isFunction(g.pagerAnchorBuilder) ? (h = g.pagerAnchorBuilder(b, d), c("pagerAnchorBuilder(" + b + ", el) returned: " + h)) : h = '<a href="#">' + (b + 1) + "</a>";
if (!h) return;
var i = a(h);
if (i.parents("body").length === 0) {
var j = [];
e.length > 1 ? (e.each(function() {
var b = i.clone(!0);
a(this).append(b), j.push(b[0]);
}), i = a(j)) : i.appendTo(e);
}
g.pagerAnchors = g.pagerAnchors || [], g.pagerAnchors.push(i), i.bind(g.pagerEvent, function(c) {
c.preventDefault(), g.nextSlide = b;
var d = g.$cont[0], e = d.cycleTimeout;
e && (clearTimeout(e), d.cycleTimeout = 0);
var h = g.onPagerEvent || g.pagerClick;
a.isFunction(h) && h(g.nextSlide, f[g.nextSlide]), l(f, g, 1, g.currSlide < b);
}), !/^click/.test(g.pagerEvent) && !g.allowPagerClickBubble && i.bind("click.cycle", function() {
return !1;
}), g.pauseOnPagerHover && i.hover(function() {
g.$cont[0].cyclePause++;
}, function() {
g.$cont[0].cyclePause--;
});
}, a.fn.cycle.hopsFromLast = function(a, b) {
var c, d = a.lastSlide, e = a.currSlide;
return b ? c = e > d ? e - d : a.slideCount - d : c = e < d ? d - e : d + a.slideCount - e, c;
}, a.fn.cycle.commonReset = function(b, c, d, e, f, g) {
a(d.elements).not(b).hide(), d.cssBefore.opacity = 1, d.cssBefore.display = "block", d.slideResize && e !== !1 && c.cycleW > 0 && (d.cssBefore.width = c.cycleW), d.slideResize && f !== !1 && c.cycleH > 0 && (d.cssBefore.height = c.cycleH), d.cssAfter = d.cssAfter || {}, d.cssAfter.display = "none", a(b).css("zIndex", d.slideCount + (g === !0 ? 1 : 0)), a(c).css("zIndex", d.slideCount + (g === !0 ? 0 : 1));
}, a.fn.cycle.custom = function(b, c, d, e, f, g) {
var h = a(b), i = a(c), j = d.speedIn, k = d.speedOut, l = d.easeIn, m = d.easeOut;
i.css(d.cssBefore), g && (typeof g == "number" ? j = k = g : j = k = 1, l = m = null);
var n = function() {
i.animate(d.animIn, j, l, e);
};
h.animate(d.animOut, k, m, function() {
d.cssAfter && h.css(d.cssAfter), d.sync || n();
}), d.sync && n();
}, a.fn.cycle.transitions = {
fade: function(b, c, d) {
c.not(":eq(" + d.currSlide + ")").css("opacity", 0), d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d), d.cssBefore.opacity = 0;
}), d.animIn = {
opacity: 1
}, d.animOut = {
opacity: 0
}, d.cssBefore = {
top: 0,
left: 0
};
}
}, a.fn.cycle.ver = function() {
return b;
}, a.fn.cycle.defaults = {
fx: "fade",
timeout: 4e3,
timeoutFn: null,
continuous: 0,
speed: 1e3,
speedIn: null,
speedOut: null,
next: null,
prev: null,
onPrevNextEvent: null,
prevNextEvent: "click.cycle",
pager: null,
onPagerEvent: null,
pagerEvent: "click.cycle",
allowPagerClickBubble: !1,
pagerAnchorBuilder: null,
before: null,
after: null,
end: null,
easing: null,
easeIn: null,
easeOut: null,
shuffle: null,
animIn: null,
animOut: null,
cssBefore: null,
cssAfter: null,
fxFn: null,
height: "auto",
startingSlide: 0,
sync: 1,
random: 0,
fit: 0,
containerResize: 1,
slideResize: 1,
pause: 0,
pauseOnPagerHover: 0,
autostop: 0,
autostopCount: 0,
delay: 0,
slideExpr: null,
cleartype: !a.support.opacity,
cleartypeNoBg: !1,
nowrap: 0,
fastOnEvent: 0,
randomizeEffects: 1,
rev: 0,
manualTrump: !0,
requeueOnImageNotLoaded: !0,
requeueTimeout: 250,
activePagerClass: "activeSlide",
updateActivePagerLink: null,
backwards: !1
};
}(jQuery), function(a) {
a.fn.cycle.transitions.none = function(b, c, d) {
d.fxFn = function(b, c, d, e) {
a(c).show(), a(b).hide(), e();
};
}, a.fn.cycle.transitions.fadeout = function(b, c, d) {
c.not(":eq(" + d.currSlide + ")").css({
display: "block",
opacity: 1
}), d.before.push(function(b, c, d, e, f, g) {
a(b).css("zIndex", d.slideCount + (!g == 1 ? 1 : 0)), a(c).css("zIndex", d.slideCount + (!g == 1 ? 0 : 1));
}), d.animIn = {
opacity: 1
}, d.animOut = {
opacity: 0
}, d.cssBefore = {
opacity: 1,
display: "block"
}, d.cssAfter = {
zIndex: 0
};
}, a.fn.cycle.transitions.scrollUp = function(b, c, d) {
b.css("overflow", "hidden"), d.before.push(a.fn.cycle.commonReset);
var e = b.height();
d.cssBefore = {
top: e,
left: 0
}, d.cssFirst = {
top: 0
}, d.animIn = {
top: 0
}, d.animOut = {
top: -e
};
}, a.fn.cycle.transitions.scrollDown = function(b, c, d) {
b.css("overflow", "hidden"), d.before.push(a.fn.cycle.commonReset);
var e = b.height();
d.cssFirst = {
top: 0
}, d.cssBefore = {
top: -e,
left: 0
}, d.animIn = {
top: 0
}, d.animOut = {
top: e
};
}, a.fn.cycle.transitions.scrollLeft = function(b, c, d) {
b.css("overflow", "hidden"), d.before.push(a.fn.cycle.commonReset);
var e = b.width();
d.cssFirst = {
left: 0
}, d.cssBefore = {
left: e,
top: 0
}, d.animIn = {
left: 0
}, d.animOut = {
left: 0 - e
};
}, a.fn.cycle.transitions.scrollRight = function(b, c, d) {
b.css("overflow", "hidden"), d.before.push(a.fn.cycle.commonReset);
var e = b.width();
d.cssFirst = {
left: 0
}, d.cssBefore = {
left: -e,
top: 0
}, d.animIn = {
left: 0
}, d.animOut = {
left: e
};
}, a.fn.cycle.transitions.scrollHorz = function(b, c, d) {
b.css("overflow", "hidden").width(), d.before.push(function(b, c, d, e) {
d.rev && (e = !e), a.fn.cycle.commonReset(b, c, d), d.cssBefore.left = e ? c.cycleW - 1 : 1 - c.cycleW, d.animOut.left = e ? -b.cycleW : b.cycleW;
}), d.cssFirst = {
left: 0
}, d.cssBefore = {
top: 0
}, d.animIn = {
left: 0
}, d.animOut = {
top: 0
};
}, a.fn.cycle.transitions.scrollVert = function(b, c, d) {
b.css("overflow", "hidden"), d.before.push(function(b, c, d, e) {
d.rev && (e = !e), a.fn.cycle.commonReset(b, c, d), d.cssBefore.top = e ? 1 - c.cycleH : c.cycleH - 1, d.animOut.top = e ? b.cycleH : -b.cycleH;
}), d.cssFirst = {
top: 0
}, d.cssBefore = {
left: 0
}, d.animIn = {
top: 0
}, d.animOut = {
left: 0
};
}, a.fn.cycle.transitions.slideX = function(b, c, d) {
d.before.push(function(b, c, d) {
a(d.elements).not(b).hide(), a.fn.cycle.commonReset(b, c, d, !1, !0), d.animIn.width = c.cycleW;
}), d.cssBefore = {
left: 0,
top: 0,
width: 0
}, d.animIn = {
width: "show"
}, d.animOut = {
width: 0
};
}, a.fn.cycle.transitions.slideY = function(b, c, d) {
d.before.push(function(b, c, d) {
a(d.elements).not(b).hide(), a.fn.cycle.commonReset(b, c, d, !0, !1), d.animIn.height = c.cycleH;
}), d.cssBefore = {
left: 0,
top: 0,
height: 0
}, d.animIn = {
height: "show"
}, d.animOut = {
height: 0
};
}, a.fn.cycle.transitions.shuffle = function(b, c, d) {
var e, f = b.css("overflow", "visible").width();
c.css({
left: 0,
top: 0
}), d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !0, !0, !0);
}), d.speedAdjusted || (d.speed = d.speed / 2, d.speedAdjusted = !0), d.random = 0, d.shuffle = d.shuffle || {
left: -f,
top: 15
}, d.els = [];
for (e = 0; e < c.length; e++) d.els.push(c[e]);
for (e = 0; e < d.currSlide; e++) d.els.push(d.els.shift());
d.fxFn = function(b, c, d, e, f) {
d.rev && (f = !f);
var g = f ? a(b) : a(c);
a(c).css(d.cssBefore);
var h = d.slideCount;
g.animate(d.shuffle, d.speedIn, d.easeIn, function() {
var c = a.fn.cycle.hopsFromLast(d, f);
for (var i = 0; i < c; i++) f ? d.els.push(d.els.shift()) : d.els.unshift(d.els.pop());
if (f) for (var j = 0, k = d.els.length; j < k; j++) a(d.els[j]).css("z-index", k - j + h); else {
var l = a(b).css("z-index");
g.css("z-index", parseInt(l) + 1 + h);
}
g.animate({
left: 0,
top: 0
}, d.speedOut, d.easeOut, function() {
a(f ? this : b).hide(), e && e();
});
});
}, d.cssBefore = {
display: "block",
opacity: 1,
top: 0,
left: 0
};
}, a.fn.cycle.transitions.turnUp = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !0, !1), d.cssBefore.top = c.cycleH, d.animIn.height = c.cycleH, d.animOut.width = c.cycleW;
}), d.cssFirst = {
top: 0
}, d.cssBefore = {
left: 0,
height: 0
}, d.animIn = {
top: 0
}, d.animOut = {
height: 0
};
}, a.fn.cycle.transitions.turnDown = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !0, !1), d.animIn.height = c.cycleH, d.animOut.top = b.cycleH;
}), d.cssFirst = {
top: 0
}, d.cssBefore = {
left: 0,
top: 0,
height: 0
}, d.animOut = {
height: 0
};
}, a.fn.cycle.transitions.turnLeft = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !1, !0), d.cssBefore.left = c.cycleW, d.animIn.width = c.cycleW;
}), d.cssBefore = {
top: 0,
width: 0
}, d.animIn = {
left: 0
}, d.animOut = {
width: 0
};
}, a.fn.cycle.transitions.turnRight = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !1, !0), d.animIn.width = c.cycleW, d.animOut.left = b.cycleW;
}), d.cssBefore = {
top: 0,
left: 0,
width: 0
}, d.animIn = {
left: 0
}, d.animOut = {
width: 0
};
}, a.fn.cycle.transitions.zoom = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !1, !1, !0), d.cssBefore.top = c.cycleH / 2, d.cssBefore.left = c.cycleW / 2, d.animIn = {
top: 0,
left: 0,
width: c.cycleW,
height: c.cycleH
}, d.animOut = {
width: 0,
height: 0,
top: b.cycleH / 2,
left: b.cycleW / 2
};
}), d.cssFirst = {
top: 0,
left: 0
}, d.cssBefore = {
width: 0,
height: 0
};
}, a.fn.cycle.transitions.fadeZoom = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !1, !1), d.cssBefore.left = c.cycleW / 2, d.cssBefore.top = c.cycleH / 2, d.animIn = {
top: 0,
left: 0,
width: c.cycleW,
height: c.cycleH
};
}), d.cssBefore = {
width: 0,
height: 0
}, d.animOut = {
opacity: 0
};
}, a.fn.cycle.transitions.blindX = function(b, c, d) {
var e = b.css("overflow", "hidden").width();
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d), d.animIn.width = c.cycleW, d.animOut.left = b.cycleW;
}), d.cssBefore = {
left: e,
top: 0
}, d.animIn = {
left: 0
}, d.animOut = {
left: e
};
}, a.fn.cycle.transitions.blindY = function(b, c, d) {
var e = b.css("overflow", "hidden").height();
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d), d.animIn.height = c.cycleH, d.animOut.top = b.cycleH;
}), d.cssBefore = {
top: e,
left: 0
}, d.animIn = {
top: 0
}, d.animOut = {
top: e
};
}, a.fn.cycle.transitions.blindZ = function(b, c, d) {
var e = b.css("overflow", "hidden").height(), f = b.width();
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d), d.animIn.height = c.cycleH, d.animOut.top = b.cycleH;
}), d.cssBefore = {
top: e,
left: f
}, d.animIn = {
top: 0,
left: 0
}, d.animOut = {
top: e,
left: f
};
}, a.fn.cycle.transitions.growX = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !1, !0), d.cssBefore.left = this.cycleW / 2, d.animIn = {
left: 0,
width: this.cycleW
}, d.animOut = {
left: 0
};
}), d.cssBefore = {
width: 0,
top: 0
};
}, a.fn.cycle.transitions.growY = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !0, !1), d.cssBefore.top = this.cycleH / 2, d.animIn = {
top: 0,
height: this.cycleH
}, d.animOut = {
top: 0
};
}), d.cssBefore = {
height: 0,
left: 0
};
}, a.fn.cycle.transitions.curtainX = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !1, !0, !0), d.cssBefore.left = c.cycleW / 2, d.animIn = {
left: 0,
width: this.cycleW
}, d.animOut = {
left: b.cycleW / 2,
width: 0
};
}), d.cssBefore = {
top: 0,
width: 0
};
}, a.fn.cycle.transitions.curtainY = function(b, c, d) {
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !0, !1, !0), d.cssBefore.top = c.cycleH / 2, d.animIn = {
top: 0,
height: c.cycleH
}, d.animOut = {
top: b.cycleH / 2,
height: 0
};
}), d.cssBefore = {
left: 0,
height: 0
};
}, a.fn.cycle.transitions.cover = function(b, c, d) {
var e = d.direction || "left", f = b.css("overflow", "hidden").width(), g = b.height();
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d), e == "right" ? d.cssBefore.left = -f : e == "up" ? d.cssBefore.top = g : e == "down" ? d.cssBefore.top = -g : d.cssBefore.left = f;
}), d.animIn = {
left: 0,
top: 0
}, d.animOut = {
opacity: 1
}, d.cssBefore = {
top: 0,
left: 0
};
}, a.fn.cycle.transitions.uncover = function(b, c, d) {
var e = d.direction || "left", f = b.css("overflow", "hidden").width(), g = b.height();
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !0, !0, !0), e == "right" ? d.animOut.left = f : e == "up" ? d.animOut.top = -g : e == "down" ? d.animOut.top = g : d.animOut.left = -f;
}), d.animIn = {
left: 0,
top: 0
}, d.animOut = {
opacity: 1
}, d.cssBefore = {
top: 0,
left: 0
};
}, a.fn.cycle.transitions.toss = function(b, c, d) {
var e = b.css("overflow", "visible").width(), f = b.height();
d.before.push(function(b, c, d) {
a.fn.cycle.commonReset(b, c, d, !0, !0, !0), !d.animOut.left && !d.animOut.top ? d.animOut = {
left: e * 2,
top: -f / 2,
opacity: 0
} : d.animOut.opacity = 0;
}), d.cssBefore = {
left: 0,
top: 0
}, d.animIn = {
left: 0
};
}, a.fn.cycle.transitions.wipe = function(b, c, d) {
var e = b.css("overflow", "hidden").width(), f = b.height();
d.cssBefore = d.cssBefore || {};
var g;
if (d.clip) if (/l2r/.test(d.clip)) g = "rect(0px 0px " + f + "px 0px)"; else if (/r2l/.test(d.clip)) g = "rect(0px " + e + "px " + f + "px " + e + "px)"; else if (/t2b/.test(d.clip)) g = "rect(0px " + e + "px 0px 0px)"; else if (/b2t/.test(d.clip)) g = "rect(" + f + "px " + e + "px " + f + "px 0px)"; else if (/zoom/.test(d.clip)) {
var h = parseInt(f / 2), i = parseInt(e / 2);
g = "rect(" + h + "px " + i + "px " + h + "px " + i + "px)";
}
d.cssBefore.clip = d.cssBefore.clip || g || "rect(0px 0px 0px 0px)";
var j = d.cssBefore.clip.match(/(\d+)/g), k = parseInt(j[0]), l = parseInt(j[1]), m = parseInt(j[2]), n = parseInt(j[3]);
d.before.push(function(b, c, d) {
if (b == c) return;
var g = a(b), h = a(c);
a.fn.cycle.commonReset(b, c, d, !0, !0, !1), d.cssAfter.display = "block";
var i = 1, j = parseInt(d.speedIn / 13) - 1;
(function o() {
var a = k ? k - parseInt(i * (k / j)) : 0, b = n ? n - parseInt(i * (n / j)) : 0, c = m < f ? m + parseInt(i * ((f - m) / j || 1)) : f, d = l < e ? l + parseInt(i * ((e - l) / j || 1)) : e;
h.css({
clip: "rect(" + a + "px " + d + "px " + c + "px " + b + "px)"
}), i++ <= j ? setTimeout(o, 13) : g.css("display", "none");
})();
}), d.cssBefore = {
display: "block",
opacity: 1,
top: 0,
left: 0
}, d.animIn = {
left: 0
}, d.animOut = {
left: 0
};
};
}(jQuery), function(a, b, c, d, e) {
function m(a) {
var b = g.length - 1;
while (b >= 0 && g[b].element[0] !== a[0]) b -= 1;
return b;
}
function n(a, b) {
a.element.trigger(k, b), a.options.triggerOnce && a.element.waypoint("destroy");
}
function o() {
var b = f.scrollTop(), d = b > h, e = a.grep(g, function(a, c) {
return d ? a.offset > h && a.offset <= b : a.offset <= h && a.offset > b;
});
if (!e.length) return;
a[c].settings.continuous ? a.each(d ? e : e.reverse(), function(a, b) {
n(b, [ d ? "down" : "up" ]);
}) : n(e[d ? e.length - 1 : 0], [ d ? "down" : "up" ]), h = b;
}
var f = a(d), g = [], h = -99999, i = !1, j = !1, k = "waypoint.reached", l = {
init: function(d, e) {
return this.each(function() {
var c = a(this), f = m(c), h = f < 0 ? a.fn[b].defaults : g[f].options, i = a.extend({}, h, e);
f < 0 ? g.push({
element: c,
offset: c.offset().top,
options: i
}) : g[f].options = i, d && c.bind(k, d);
}), a[c]("refresh"), this;
},
remove: function() {
return this.each(function() {
var b = m(a(this));
b >= 0 && g.splice(b, 1);
});
},
destroy: function() {
return this.unbind(k).waypoint("remove");
}
};
a.fn[b] = function(c) {
if (l[c]) return l[c].apply(this, Array.prototype.slice.call(arguments, 1));
if (typeof c == "function" || !c) return l.init.apply(this, arguments);
if (typeof c == "object") return l.init.apply(this, [ null, c ]);
a.error("Method " + c + " does not exist on jQuery" + b);
}, a.fn[b].defaults = {
offset: 0,
triggerOnce: !1
};
var p = {
refresh: function() {
a.each(g, function(a, b) {
var c = 0, d = b.offset;
if (typeof b.options.offset == "function") c = b.options.offset.apply(b.element); else if (typeof b.options.offset == "string") {
var e = parseFloat(b.options.offset);
c = b.options.offset.indexOf("%") ? f.height() * (e / 100) : e;
} else c = b.options.offset;
b.offset = b.element.offset().top - c, h > d && h <= b.offset ? n(b, [ "up" ]) : h < d && h >= b.offset && n(b, [ "down" ]);
}), g.sort(function(a, b) {
return a.offset - b.offset;
});
},
aggregate: function() {
var b = a();
return a.each(g, function(a, c) {
b = b.add(c.element);
}), b;
}
};
a[c] = function(a) {
return p[a] ? p[a].apply(this) : p.aggregate();
}, a[c].settings = {
continuous: !0,
resizeThrottle: 200,
scrollThrottle: 100
}, f.load(function() {
f.scroll(function() {
i || (i = !0, d.setTimeout(function() {
o(), i = !1;
}, a[c].settings.scrollThrottle));
}), f.resize(function() {
j || (j = !0, d.setTimeout(function() {
a.waypoints("refresh"), j = !1;
}, a[c].settings.resizeThrottle));
}), a[c]("refresh"), o();
});
}(jQuery, "waypoint", "waypoints", this), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["homepage-package_videolist"] = a(function(a, b, c, d, e) {
function f(a, b, d) {
var e = "", f, i;
e += '\n<li class="m', i = c.col, i ? f = i.call(a, {
hash: {}
}) : (f = a.col, f = typeof f === k ? f() : f), e += l(f) + '"', f = a.firstInCol, f = c["if"].call(a, f, {
hash: {},
inverse: m.noop,
fn: m.programWithDepth(g, b, d)
});
if (f || f === 0) e += f;
e += '>\n<a href="', i = c.url, i ? f = i.call(a, {
hash: {}
}) : (f = a.url, f = typeof f === k ? f() : f), e += l(f) + '" data-tag="Homepage Library" class="vl">\n<span class="vid-progress', f = a.key_id, f = c["if"].call(a, f, {
hash: {},
inverse: m.noop,
fn: m.program(4, h, b)
});
if (f || f === 0) e += f;
return e += '">', i = c.title, i ? f = i.call(a, {
hash: {}
}) : (f = a.title, f = typeof f === k ? f() : f), e += l(f) + "</span>\n</a>\n</li>\n", e;
}
function g(a, b, c) {
var d = "", e;
return d += ' style="margin-top:-', e = c.colHeight, e = typeof e === k ? e() : e, d += l(e) + 'px"', d;
}
function h(a, b) {
var d = "", e, f;
return d += " v", f = c.key_id, f ? e = f.call(a, {
hash: {}
}) : (e = a.key_id, e = typeof e === k ? e() : e), d += l(e), d;
}
c = c || a.helpers;
var i = "", j, k = "function", l = this.escapeExpression, m = this;
j = b.children, j = c.each.call(b, j, {
hash: {},
inverse: m.noop,
fn: m.programWithDepth(f, e, b)
});
if (j || j === 0) i += j;
return i += "\n", i;
});
}();

var Homepage = {
init: function() {
VideoControls.initThumbnails(), Homepage.initWaypoints(), Homepage.loadData();
},
initPlaceholder: function(a) {
var b = $("#main-video-placeholder");
VideoControls.initPlaceholder(b, {
youtubeId: a
});
},
initWaypoints: function() {
if ($.browser.msie && parseInt($.browser.version, 10) < 8) return;
$.waypoints.settings.scrollThrottle = 50, $("#browse").waypoint(function(a, b) {
var c = $(this), d = $("#browse-fixed"), e = $("#back-to-top");
e.click(function() {
Homepage.waypointTop(c, d, e);
}), b == "down" ? Homepage.waypointVideos(c, d, e) : Homepage.waypointTop(c, d, e);
});
},
waypointTop: function(a, b, c) {
b.css("display", "none"), $.browser.msie || c.css("display", "none");
},
waypointVideos: function(a, b, c) {
b.css("width", a.width()).css("display", "block"), $.browser.msie || c.css("display", "block"), CSSMenus.active_menu && CSSMenus.active_menu.removeClass("css-menu-js-hover");
},
loadData: function() {
var a = window.Homepage_cacheToken;
if (!a) return;
$.ajax({
type: "GET",
url: "/api/v1/topics/library/compact",
dataType: "jsonp",
data: {
v: a
},
jsonpCallback: "__dataCb",
success: function(a) {
Homepage.renderLibraryContent(a);
},
error: function() {
KAConsole.log("Error loading initial library data.");
},
cache: !0
});
},
renderLibraryContent: function(a) {
var b = Templates.get("homepage.videolist");
$.each(a, function(a, c) {
var d = c.children, e = Math.ceil(d.length / 3), f = e * 18;
c.colHeight = f, c.titleEncoded = encodeURIComponent(c.title);
for (var g = 0, h; h = d[g]; g++) {
var i = g / e | 0;
h.col = i, g % e === 0 && i > 0 && (h.firstInCol = !0);
}
$("#" + c.id + "-container ol").html(b(c));
}), a = null;
}
};

$(function() {
Homepage.init();
});

var _ga = _ga || {}, _gaq = _gaq || [];

_ga.trackSocial = function(a, b) {
_ga.trackFacebook(a, b), _ga.trackTwitter(a, b);
}, _ga.trackFacebook = function(a, b) {
var c = _ga.buildTrackerName_(b);
try {
FB && FB.Event && FB.Event.subscribe && (FB.Event.subscribe("edge.create", function(b) {
_gaq.push([ c + "_trackSocial", "facebook", "like", b, a ]);
}), FB.Event.subscribe("edge.remove", function(b) {
_gaq.push([ c + "_trackSocial", "facebook", "unlike", b, a ]);
}), FB.Event.subscribe("message.send", function(b) {
_gaq.push([ c + "_trackSocial", "facebook", "send", b, a ]);
}));
} catch (d) {}
}, _ga.buildTrackerName_ = function(a) {
return a ? a + "." : "";
}, _ga.trackTwitter = function(a, b) {
var c = _ga.buildTrackerName_(b);
try {
twttr && twttr.events && twttr.events.bind && twttr.events.bind("tweet", function(b) {
if (b) {
var d;
b.target && b.target.nodeName == "IFRAME" && (d = _ga.extractParamFromUri_(b.target.src, "url")), _gaq.push([ c + "_trackSocial", "twitter", "tweet", d, a ]);
}
});
} catch (d) {}
}, _ga.extractParamFromUri_ = function(a, b) {
if (!a) return;
var a = a.split("#")[0], c = a.split("?");
if (c.length == 1) return;
var d = decodeURI(c[1]);
b += "=";
var e = d.split("&");
for (var f = 0, g; g = e[f]; ++f) if (g.indexOf(b) === 0) return unescape(g.split("=")[1]);
return;
};