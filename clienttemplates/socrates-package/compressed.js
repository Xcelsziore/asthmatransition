(function(a) {
"use strict";
var b = String.prototype.trim, c = function(a) {
return a * 1 || 0;
}, d = function(a, b) {
for (var c = []; b > 0; c[--b] = a) ;
return c.join("");
}, e = function(a) {
return Array.prototype.slice.call(a);
}, f = function(a) {
return a != null ? "[" + h.escapeRegExp("" + a) + "]" : "\\s";
}, g = function() {
function a(a) {
return Object.prototype.toString.call(a).slice(8, -1).toLowerCase();
}
var b = d, c = function() {
return c.cache.hasOwnProperty(arguments[0]) || (c.cache[arguments[0]] = c.parse(arguments[0])), c.format.call(null, c.cache[arguments[0]], arguments);
};
return c.format = function(c, d) {
var e = 1, f = c.length, h = "", i, j = [], k, l, m, n, o, p;
for (k = 0; k < f; k++) {
h = a(c[k]);
if (h === "string") j.push(c[k]); else if (h === "array") {
m = c[k];
if (m[2]) {
i = d[e];
for (l = 0; l < m[2].length; l++) {
if (!i.hasOwnProperty(m[2][l])) throw new Error(g('[_.sprintf] property "%s" does not exist', m[2][l]));
i = i[m[2][l]];
}
} else m[1] ? i = d[m[1]] : i = d[e++];
if (/[^s]/.test(m[8]) && a(i) != "number") throw new Error(g("[_.sprintf] expecting number but found %s", a(i)));
switch (m[8]) {
case "b":
i = i.toString(2);
break;
case "c":
i = String.fromCharCode(i);
break;
case "d":
i = parseInt(i, 10);
break;
case "e":
i = m[7] ? i.toExponential(m[7]) : i.toExponential();
break;
case "f":
i = m[7] ? parseFloat(i).toFixed(m[7]) : parseFloat(i);
break;
case "o":
i = i.toString(8);
break;
case "s":
i = (i = String(i)) && m[7] ? i.substring(0, m[7]) : i;
break;
case "u":
i = Math.abs(i);
break;
case "x":
i = i.toString(16);
break;
case "X":
i = i.toString(16).toUpperCase();
}
i = /[def]/.test(m[8]) && m[3] && i >= 0 ? "+" + i : i, o = m[4] ? m[4] == "0" ? "0" : m[4].charAt(1) : " ", p = m[6] - String(i).length, n = m[6] ? b(o, p) : "", j.push(m[5] ? i + n : n + i);
}
}
return j.join("");
}, c.cache = {}, c.parse = function(a) {
var b = a, c = [], d = [], e = 0;
while (b) {
if ((c = /^[^\x25]+/.exec(b)) !== null) d.push(c[0]); else if ((c = /^\x25{2}/.exec(b)) !== null) d.push("%"); else {
if ((c = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(b)) === null) throw new Error("[_.sprintf] huh?");
if (c[2]) {
e |= 1;
var f = [], g = c[2], h = [];
if ((h = /^([a-z_][a-z_\d]*)/i.exec(g)) === null) throw new Error("[_.sprintf] huh?");
f.push(h[1]);
while ((g = g.substring(h[0].length)) !== "") if ((h = /^\.([a-z_][a-z_\d]*)/i.exec(g)) !== null) f.push(h[1]); else {
if ((h = /^\[(\d+)\]/.exec(g)) === null) throw new Error("[_.sprintf] huh?");
f.push(h[1]);
}
c[2] = f;
} else e |= 2;
if (e === 3) throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
d.push(c);
}
b = b.substring(c[0].length);
}
return d;
}, c;
}(), h = {
VERSION: "2.0.0",
isBlank: function(a) {
return /^\s*$/.test(a);
},
stripTags: function(a) {
return ("" + a).replace(/<\/?[^>]+>/ig, "");
},
capitalize: function(a) {
return a = "" + a, a.charAt(0).toUpperCase() + a.substring(1).toLowerCase();
},
chop: function(a, b) {
a += "", b = ~~b || a.length;
var c = [];
for (var d = 0; d < a.length; ) c.push(a.slice(d, d + b)), d += b;
return c;
},
clean: function(a) {
return h.strip(("" + a).replace(/\s+/g, " "));
},
count: function(a, b) {
a = "" + a, b = "" + b;
var c = 0, d;
for (var e = 0; e < a.length; ) d = a.indexOf(b, e), d >= 0 && c++, e = e + (d >= 0 ? d : 0) + b.length;
return c;
},
chars: function(a) {
return ("" + a).split("");
},
escapeHTML: function(a) {
return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
},
unescapeHTML: function(a) {
return ("" + a).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
},
escapeRegExp: function(a) {
return a.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
},
insert: function(a, b, c) {
var d = ("" + a).split("");
return d.splice(~~b, 0, "" + c), d.join("");
},
include: function(a, b) {
return ("" + a).indexOf(b) !== -1;
},
join: function(a) {
var b = e(arguments);
return b.join(b.shift());
},
lines: function(a) {
return ("" + a).split("\n");
},
reverse: function(a) {
return Array.prototype.reverse.apply(String(a).split("")).join("");
},
splice: function(a, b, c, d) {
var e = ("" + a).split("");
return e.splice(~~b, ~~c, d), e.join("");
},
startsWith: function(a, b) {
return a = "" + a, b = "" + b, a.length >= b.length && a.substring(0, b.length) === b;
},
endsWith: function(a, b) {
return a = "" + a, b = "" + b, a.length >= b.length && a.substring(a.length - b.length) === b;
},
succ: function(a) {
a = "" + a;
var b = a.split("");
return b.splice(a.length - 1, 1, String.fromCharCode(a.charCodeAt(a.length - 1) + 1)), b.join("");
},
titleize: function(a) {
var b = ("" + a).split(" "), c;
for (var d = 0; d < b.length; d++) c = b[d].split(""), typeof c[0] != "undefined" && (c[0] = c[0].toUpperCase()), d + 1 === b.length ? b[d] = c.join("") : b[d] = c.join("") + " ";
return b.join("");
},
camelize: function(a) {
return h.trim(a).replace(/(\-|_|\s)+(.)?/g, function(a, b, c) {
return c ? c.toUpperCase() : "";
});
},
underscored: function(a) {
return h.trim(a).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/\-|\s+/g, "_").toLowerCase();
},
dasherize: function(a) {
return h.trim(a).replace(/([a-z\d])([A-Z]+)/g, "$1-$2").replace(/^([A-Z]+)/, "-$1").replace(/\_|\s+/g, "-").toLowerCase();
},
humanize: function(a) {
return h.capitalize(this.underscored(a).replace(/_id$/, "").replace(/_/g, " "));
},
trim: function(a, c) {
return a = "" + a, !c && b ? b.call(a) : (c = f(c), a.replace(new RegExp("^" + c + "+|" + c + "+$", "g"), ""));
},
ltrim: function(a, b) {
return b = f(b), ("" + a).replace(new RegExp("^" + b + "+", "g"), "");
},
rtrim: function(a, b) {
return b = f(b), ("" + a).replace(new RegExp(b + "+$", "g"), "");
},
truncate: function(a, b, c) {
return a = "" + a, c = c || "...", b = ~~b, a.length > b ? a.slice(0, b) + c : a;
},
prune: function(a, b, c) {
a = "" + a, b = ~~b, c = c != null ? "" + c : "...";
var d, e, f = a.replace(/\W/g, function(a) {
return a.toUpperCase() != a.toLowerCase() ? "A" : " ";
});
return e = f[b], d = f.slice(0, b), e && e.match(/\S/) && (d = d.replace(/\s\S+$/, "")), d = h.rtrim(d), (d + c).length > a.length ? a : a.substring(0, d.length) + c;
},
words: function(a, b) {
return ("" + a).split(b || " ");
},
pad: function(a, b, c, e) {
a = "" + a;
var f = "", g = 0;
b = ~~b, c ? c.length > 1 && (c = c.charAt(0)) : c = " ";
switch (e) {
case "right":
g = b - a.length, f = d(c, g), a += f;
break;
case "both":
g = b - a.length, f = {
left: d(c, Math.ceil(g / 2)),
right: d(c, Math.floor(g / 2))
}, a = f.left + a + f.right;
break;
default:
g = b - a.length, f = d(c, g), a = f + a;
}
return a;
},
lpad: function(a, b, c) {
return h.pad(a, b, c);
},
rpad: function(a, b, c) {
return h.pad(a, b, c, "right");
},
lrpad: function(a, b, c) {
return h.pad(a, b, c, "both");
},
sprintf: g,
vsprintf: function(a, b) {
return b.unshift(a), g.apply(null, b);
},
toNumber: function(a, b) {
var d = c(c(a).toFixed(c(b)));
return d !== 0 || a === "0" || a === 0 ? d : Number.NaN;
},
strRight: function(a, b) {
a = "" + a, b = b != null ? "" + b : b;
var c = b ? a.indexOf(b) : -1;
return c != -1 ? a.slice(c + b.length, a.length) : a;
},
strRightBack: function(a, b) {
a = "" + a, b = b != null ? "" + b : b;
var c = b ? a.lastIndexOf(b) : -1;
return c != -1 ? a.slice(c + b.length, a.length) : a;
},
strLeft: function(a, b) {
a = "" + a, b = b != null ? "" + b : b;
var c = b ? a.indexOf(b) : -1;
return c != -1 ? a.slice(0, c) : a;
},
strLeftBack: function(a, b) {
a = "" + a, b = b != null ? "" + b : b;
var c = a.lastIndexOf(b);
return c != -1 ? a.slice(0, c) : a;
},
toSentence: function(a, b, c) {
b || (b = ", "), c || (c = " and ");
var d = a.length, e = "";
for (var f = 0; f < d; f++) e += a[f], f === d - 2 ? e += c : f < d - 1 && (e += b);
return e;
},
slugify: function(a) {
var b = "àáäâèéëêìíïîòóöôùúüûñç·/_:;", c = "aaaaeeeeiiiioooouuuunc", d = new RegExp(f(b), "g");
return a = ("" + a).toLowerCase(), a = a.replace(d, function(a) {
return c[b.indexOf(a)] || "-";
}), h.trim(a.replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-"), "-");
},
exports: function() {
var a = {};
for (var b in this) {
if (!this.hasOwnProperty(b) || b == "include" || b == "contains" || b == "reverse") continue;
a[b] = this[b];
}
return a;
}
};
h.strip = h.trim, h.lstrip = h.ltrim, h.rstrip = h.rtrim, h.center = h.lrpad, h.rjust = h.lpad, h.ljust = h.rpad, h.contains = h.include, typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (module.exports = h), exports._s = h) : typeof define == "function" && define.amd ? define("underscore.string", function() {
return h;
}) : typeof a._ != "undefined" ? (a._.string = h, a._.str = a._.string) : a._ = {
string: h,
str: h
};
})(this || window), function(a, b) {
a.widget("ui.draggable", a.ui.mouse, {
widgetEventPrefix: "drag",
options: {
addClasses: !0,
appendTo: "parent",
axis: !1,
connectToSortable: !1,
containment: !1,
cursor: "auto",
cursorAt: !1,
grid: !1,
handle: !1,
helper: "original",
iframeFix: !1,
opacity: !1,
refreshPositions: !1,
revert: !1,
revertDuration: 500,
scope: "default",
scroll: !0,
scrollSensitivity: 20,
scrollSpeed: 20,
snap: !1,
snapMode: "both",
snapTolerance: 20,
stack: !1,
zIndex: !1
},
_create: function() {
this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit();
},
destroy: function() {
if (!this.element.data("draggable")) return;
return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this;
},
_mouseCapture: function(b) {
var c = this.options;
return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
width: this.offsetWidth + "px",
height: this.offsetHeight + "px",
position: "absolute",
opacity: "0.001",
zIndex: 1e3
}).css(a(this).offset()).appendTo("body");
}), !0) : !1);
},
_mouseStart: function(b) {
var c = this.options;
return this.helper = this._createHelper(b), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
top: this.offset.top - this.margins.top,
left: this.offset.left - this.margins.left
}, a.extend(this.offset, {
click: {
left: b.pageX - this.offset.left,
top: b.pageY - this.offset.top
},
parent: this._getParentOffset(),
relative: this._getRelativeOffset()
}), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0);
},
_mouseDrag: function(b, c) {
this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
if (!c) {
var d = this._uiHash();
if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
this.position = d.position;
}
if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1;
},
_mouseStop: function(b) {
var c = !1;
a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return !1;
if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
var d = this;
a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
d._trigger("stop", b) !== !1 && d._clear();
});
} else this._trigger("stop", b) !== !1 && this._clear();
return !1;
},
_mouseUp: function(b) {
return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
this.parentNode.removeChild(this);
}), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b);
},
cancel: function() {
return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this;
},
_getHandle: function(b) {
var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
return a(this.options.handle, this.element).find("*").andSelf().each(function() {
this == b.target && (c = !0);
}), c;
},
_createHelper: function(b) {
var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [ b ])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"), d;
},
_adjustOffsetFromHelper: function(b) {
typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
left: +b[0],
top: +b[1] || 0
}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
},
_getParentOffset: function() {
this.offsetParent = this.helper.offsetParent();
var b = this.offsetParent.offset();
this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
top: 0,
left: 0
};
return {
top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
};
},
_getRelativeOffset: function() {
if (this.cssPosition == "relative") {
var a = this.element.position();
return {
top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
};
}
return {
top: 0,
left: 0
};
},
_cacheMargins: function() {
this.margins = {
left: parseInt(this.element.css("marginLeft"), 10) || 0,
top: parseInt(this.element.css("marginTop"), 10) || 0,
right: parseInt(this.element.css("marginRight"), 10) || 0,
bottom: parseInt(this.element.css("marginBottom"), 10) || 0
};
},
_cacheHelperProportions: function() {
this.helperProportions = {
width: this.helper.outerWidth(),
height: this.helper.outerHeight()
};
},
_setContainment: function() {
var b = this.options;
b.containment == "parent" && (b.containment = this.helper[0].parentNode);
if (b.containment == "document" || b.containment == "window") this.containment = [ b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ];
if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
var c = a(b.containment), d = c[0];
if (!d) return;
var e = c.offset(), f = a(d).css("overflow") != "hidden";
this.containment = [ (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], this.relative_container = c;
} else b.containment.constructor == Array && (this.containment = b.containment);
},
_convertPositionTo: function(b, c) {
c || (c = this.position);
var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, g = /(html|body)/i.test(f[0].tagName);
return {
top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
};
},
_generatePosition: function(b) {
var c = this.options, d = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, e = /(html|body)/i.test(d[0].tagName), f = b.pageX, g = b.pageY;
if (this.originalPosition) {
var h;
if (this.containment) {
if (this.relative_container) {
var i = this.relative_container.offset();
h = [ this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top ];
} else h = this.containment;
b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top);
}
if (c.grid) {
var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k;
}
}
return {
top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
};
},
_clear: function() {
this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1;
},
_trigger: function(b, c, d) {
return d = d || this._uiHash(), a.ui.plugin.call(this, b, [ c, d ]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d);
},
plugins: {},
_uiHash: function(a) {
return {
helper: this.helper,
position: this.position,
originalPosition: this.originalPosition,
offset: this.positionAbs
};
}
}), a.extend(a.ui.draggable, {
version: "1.8.17"
}), a.ui.plugin.add("draggable", "connectToSortable", {
start: function(b, c) {
var d = a(this).data("draggable"), e = d.options, f = a.extend({}, c, {
item: d.element
});
d.sortables = [], a(e.connectToSortable).each(function() {
var c = a.data(this, "sortable");
c && !c.options.disabled && (d.sortables.push({
instance: c,
shouldRevert: c.options.revert
}), c.refreshPositions(), c._trigger("activate", b, f));
});
},
stop: function(b, c) {
var d = a(this).data("draggable"), e = a.extend({}, c, {
item: d.element
});
a.each(d.sortables, function() {
this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
top: "auto",
left: "auto"
})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e));
});
},
drag: function(b, c) {
var d = a(this).data("draggable"), e = this, f = function(b) {
var c = this.offset.click.top, d = this.offset.click.left, e = this.positionAbs.top, f = this.positionAbs.left, g = b.height, h = b.width, i = b.top, j = b.left;
return a.ui.isOver(e + c, f + d, i, j, g, h);
};
a.each(d.sortables, function(f) {
this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
return c.helper[0];
}, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1);
});
}
}), a.ui.plugin.add("draggable", "cursor", {
start: function(b, c) {
var d = a("body"), e = a(this).data("draggable").options;
d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor);
},
stop: function(b, c) {
var d = a(this).data("draggable").options;
d._cursor && a("body").css("cursor", d._cursor);
}
}), a.ui.plugin.add("draggable", "opacity", {
start: function(b, c) {
var d = a(c.helper), e = a(this).data("draggable").options;
d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity);
},
stop: function(b, c) {
var d = a(this).data("draggable").options;
d._opacity && a(c.helper).css("opacity", d._opacity);
}
}), a.ui.plugin.add("draggable", "scroll", {
start: function(b, c) {
var d = a(this).data("draggable");
d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset());
},
drag: function(b, c) {
var d = a(this).data("draggable"), e = d.options, f = !1;
if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed);
} else {
if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed));
}
f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b);
}
}), a.ui.plugin.add("draggable", "snap", {
start: function(b, c) {
var d = a(this).data("draggable"), e = d.options;
d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function() {
var b = a(this), c = b.offset();
this != d.element[0] && d.snapElements.push({
item: this,
width: b.outerWidth(),
height: b.outerHeight(),
top: c.top,
left: c.left
});
});
},
drag: function(b, c) {
var d = a(this).data("draggable"), e = d.options, f = e.snapTolerance, g = c.offset.left, h = g + d.helperProportions.width, i = c.offset.top, j = i + d.helperProportions.height;
for (var k = d.snapElements.length - 1; k >= 0; k--) {
var l = d.snapElements[k].left, m = l + d.snapElements[k].width, n = d.snapElements[k].top, o = n + d.snapElements[k].height;
if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
snapItem: d.snapElements[k].item
})), d.snapElements[k].snapping = !1;
continue;
}
if (e.snapMode != "inner") {
var p = Math.abs(n - j) <= f, q = Math.abs(o - i) <= f, r = Math.abs(l - h) <= f, s = Math.abs(m - g) <= f;
p && (c.position.top = d._convertPositionTo("relative", {
top: n - d.helperProportions.height,
left: 0
}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
top: o,
left: 0
}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
top: 0,
left: l - d.helperProportions.width
}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
top: 0,
left: m
}).left - d.margins.left);
}
var t = p || q || r || s;
if (e.snapMode != "outer") {
var p = Math.abs(n - i) <= f, q = Math.abs(o - j) <= f, r = Math.abs(l - g) <= f, s = Math.abs(m - h) <= f;
p && (c.position.top = d._convertPositionTo("relative", {
top: n,
left: 0
}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
top: o - d.helperProportions.height,
left: 0
}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
top: 0,
left: l
}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
top: 0,
left: m - d.helperProportions.width
}).left - d.margins.left);
}
!d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
snapItem: d.snapElements[k].item
})), d.snapElements[k].snapping = p || q || r || s || t;
}
}
}), a.ui.plugin.add("draggable", "stack", {
start: function(b, c) {
var d = a(this).data("draggable").options, e = a.makeArray(a(d.stack)).sort(function(b, c) {
return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0);
});
if (!e.length) return;
var f = parseInt(e[0].style.zIndex) || 0;
a(e).each(function(a) {
this.style.zIndex = f + a;
}), this[0].style.zIndex = f + e.length;
}
}), a.ui.plugin.add("draggable", "zIndex", {
start: function(b, c) {
var d = a(c.helper), e = a(this).data("draggable").options;
d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex);
},
stop: function(b, c) {
var d = a(this).data("draggable").options;
d._zIndex && a(c.helper).css("zIndex", d._zIndex);
}
});
}(jQuery), function(a, b) {
a.widget("ui.resizable", a.ui.mouse, {
widgetEventPrefix: "resize",
options: {
alsoResize: !1,
animate: !1,
animateDuration: "slow",
animateEasing: "swing",
aspectRatio: !1,
autoHide: !1,
containment: !1,
ghost: !1,
grid: !1,
handles: "e,s,se",
helper: !1,
maxHeight: null,
maxWidth: null,
minHeight: 10,
minWidth: 10,
zIndex: 1e3
},
_create: function() {
var b = this, c = this.options;
this.element.addClass("ui-resizable"), a.extend(this, {
_aspectRatio: !!c.aspectRatio,
aspectRatio: c.aspectRatio,
originalElement: this.element,
_proportionallyResizeElements: [],
_helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null
}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (/relative/.test(this.element.css("position")) && a.browser.opera && this.element.css({
position: "relative",
top: "auto",
left: "auto"
}), this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
position: this.element.css("position"),
width: this.element.outerWidth(),
height: this.element.outerHeight(),
top: this.element.css("top"),
left: this.element.css("left")
})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
marginLeft: this.originalElement.css("marginLeft"),
marginTop: this.originalElement.css("marginTop"),
marginRight: this.originalElement.css("marginRight"),
marginBottom: this.originalElement.css("marginBottom")
}), this.originalElement.css({
marginLeft: 0,
marginTop: 0,
marginRight: 0,
marginBottom: 0
}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
position: "static",
zoom: 1,
display: "block"
})), this.originalElement.css({
margin: this.originalElement.css("margin")
}), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {
n: ".ui-resizable-n",
e: ".ui-resizable-e",
s: ".ui-resizable-s",
w: ".ui-resizable-w",
se: ".ui-resizable-se",
sw: ".ui-resizable-sw",
ne: ".ui-resizable-ne",
nw: ".ui-resizable-nw"
} : "e,s,se");
if (this.handles.constructor == String) {
this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
var d = this.handles.split(",");
this.handles = {};
for (var e = 0; e < d.length; e++) {
var f = a.trim(d[e]), g = "ui-resizable-" + f, h = a('<div class="ui-resizable-handle ' + g + '"></div>');
/sw|se|ne|nw/.test(f) && h.css({
zIndex: ++c.zIndex
}), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h);
}
}
this._renderAxis = function(b) {
b = b || this.element;
for (var c in this.handles) {
this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
var d = a(this.handles[c], this.element), e = 0;
e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
var f = [ "padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left" ].join("");
b.css(f, e), this._proportionallyResize();
}
if (!a(this.handles[c]).length) continue;
}
}, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
if (!b.resizing) {
if (this.className) var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
b.axis = a && a[1] ? a[1] : "se";
}
}), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function() {
if (c.disabled) return;
a(this).removeClass("ui-resizable-autohide"), b._handles.show();
}, function() {
if (c.disabled) return;
b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide());
})), this._mouseInit();
},
destroy: function() {
this._mouseDestroy();
var b = function(b) {
a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
};
if (this.elementIsWrapper) {
b(this.element);
var c = this.element;
c.after(this.originalElement.css({
position: c.css("position"),
width: c.outerWidth(),
height: c.outerHeight(),
top: c.css("top"),
left: c.css("left")
})).remove();
}
return this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement), this;
},
_mouseCapture: function(b) {
var c = !1;
for (var d in this.handles) a(this.handles[d])[0] == b.target && (c = !0);
return !this.options.disabled && c;
},
_mouseStart: function(b) {
var d = this.options, e = this.element.position(), f = this.element;
this.resizing = !0, this.documentScroll = {
top: a(document).scrollTop(),
left: a(document).scrollLeft()
}, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({
position: "absolute",
top: e.top,
left: e.left
}), a.browser.opera && /relative/.test(f.css("position")) && f.css({
position: "relative",
top: "auto",
left: "auto"
}), this._renderProxy();
var g = c(this.helper.css("left")), h = c(this.helper.css("top"));
d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
left: g,
top: h
}, this.size = this._helper ? {
width: f.outerWidth(),
height: f.outerHeight()
} : {
width: f.width(),
height: f.height()
}, this.originalSize = this._helper ? {
width: f.outerWidth(),
height: f.outerHeight()
} : {
width: f.width(),
height: f.height()
}, this.originalPosition = {
left: g,
top: h
}, this.sizeDiff = {
width: f.outerWidth() - f.width(),
height: f.outerHeight() - f.height()
}, this.originalMousePosition = {
left: b.pageX,
top: b.pageY
}, this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
var i = a(".ui-resizable-" + this.axis).css("cursor");
return a("body").css("cursor", i == "auto" ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", b), !0;
},
_mouseDrag: function(b) {
var c = this.helper, d = this.options, e = {}, f = this, g = this.originalMousePosition, h = this.axis, i = b.pageX - g.left || 0, j = b.pageY - g.top || 0, k = this._change[h];
if (!k) return !1;
var l = k.apply(this, [ b, i, j ]), m = a.browser.msie && a.browser.version < 7, n = this.sizeDiff;
this._updateVirtualBoundaries(b.shiftKey);
if (this._aspectRatio || b.shiftKey) l = this._updateRatio(l, b);
return l = this._respectSize(l, b), this._propagate("resize", b), c.css({
top: this.position.top + "px",
left: this.position.left + "px",
width: this.size.width + "px",
height: this.size.height + "px"
}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger("resize", b, this.ui()), !1;
},
_mouseStop: function(b) {
this.resizing = !1;
var c = this.options, d = this;
if (this._helper) {
var e = this._proportionallyResizeElements, f = e.length && /textarea/i.test(e[0].nodeName), g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height, h = f ? 0 : d.sizeDiff.width, i = {
width: d.helper.width() - h,
height: d.helper.height() - g
}, j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null, k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
c.animate || this.element.css(a.extend(i, {
top: k,
left: j
})), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize();
}
return a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1;
},
_updateVirtualBoundaries: function(a) {
var b = this.options, c, e, f, g, h;
h = {
minWidth: d(b.minWidth) ? b.minWidth : 0,
maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity,
minHeight: d(b.minHeight) ? b.minHeight : 0,
maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity
};
if (this._aspectRatio || a) c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
this._vBoundaries = h;
},
_updateCache: function(a) {
var b = this.options;
this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width);
},
_updateRatio: function(a, b) {
var c = this.options, e = this.position, f = this.size, g = this.axis;
return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null), g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)), a;
},
_respectSize: function(a, b) {
var c = this.helper, e = this._vBoundaries, f = this._aspectRatio || b.shiftKey, g = this.axis, h = d(a.width) && e.maxWidth && e.maxWidth < a.width, i = d(a.height) && e.maxHeight && e.maxHeight < a.height, j = d(a.width) && e.minWidth && e.minWidth > a.width, k = d(a.height) && e.minHeight && e.minHeight > a.height;
j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
var l = this.originalPosition.left + this.originalSize.width, m = this.position.top + this.size.height, n = /sw|nw|w/.test(g), o = /nw|ne|n/.test(g);
j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
var p = !a.width && !a.height;
return p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null), a;
},
_proportionallyResize: function() {
var b = this.options;
if (!this._proportionallyResizeElements.length) return;
var c = this.helper || this.element;
for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
var e = this._proportionallyResizeElements[d];
if (!this.borderDif) {
var f = [ e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth") ], g = [ e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft") ];
this.borderDif = a.map(f, function(a, b) {
var c = parseInt(a, 10) || 0, d = parseInt(g[b], 10) || 0;
return c + d;
});
}
if (!(!a.browser.msie || !a(c).is(":hidden") && !a(c).parents(":hidden").length)) continue;
e.css({
height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
});
}
},
_renderProxy: function() {
var b = this.element, c = this.options;
this.elementOffset = b.offset();
if (this._helper) {
this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
var d = a.browser.msie && a.browser.version < 7, e = d ? 1 : 0, f = d ? 2 : -1;
this.helper.addClass(this._helper).css({
width: this.element.outerWidth() + f,
height: this.element.outerHeight() + f,
position: "absolute",
left: this.elementOffset.left - e + "px",
top: this.elementOffset.top - e + "px",
zIndex: ++c.zIndex
}), this.helper.appendTo("body").disableSelection();
} else this.helper = this.element;
},
_change: {
e: function(a, b, c) {
return {
width: this.originalSize.width + b
};
},
w: function(a, b, c) {
var d = this.options, e = this.originalSize, f = this.originalPosition;
return {
left: f.left + b,
width: e.width - b
};
},
n: function(a, b, c) {
var d = this.options, e = this.originalSize, f = this.originalPosition;
return {
top: f.top + c,
height: e.height - c
};
},
s: function(a, b, c) {
return {
height: this.originalSize.height + c
};
},
se: function(b, c, d) {
return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ b, c, d ]));
},
sw: function(b, c, d) {
return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ b, c, d ]));
},
ne: function(b, c, d) {
return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ b, c, d ]));
},
nw: function(b, c, d) {
return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ b, c, d ]));
}
},
_propagate: function(b, c) {
a.ui.plugin.call(this, b, [ c, this.ui() ]), b != "resize" && this._trigger(b, c, this.ui());
},
plugins: {},
ui: function() {
return {
originalElement: this.originalElement,
element: this.element,
helper: this.helper,
position: this.position,
size: this.size,
originalSize: this.originalSize,
originalPosition: this.originalPosition
};
}
}), a.extend(a.ui.resizable, {
version: "1.8.17"
}), a.ui.plugin.add("resizable", "alsoResize", {
start: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = function(b) {
a(b).each(function() {
var b = a(this);
b.data("resizable-alsoresize", {
width: parseInt(b.width(), 10),
height: parseInt(b.height(), 10),
left: parseInt(b.css("left"), 10),
top: parseInt(b.css("top"), 10),
position: b.css("position")
});
});
};
typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function(a) {
f(a);
}) : f(e.alsoResize);
},
resize: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = d.originalSize, g = d.originalPosition, h = {
height: d.size.height - f.height || 0,
width: d.size.width - f.width || 0,
top: d.position.top - g.top || 0,
left: d.position.left - g.left || 0
}, i = function(b, e) {
a(b).each(function() {
var b = a(this), f = a(this).data("resizable-alsoresize"), g = {}, i = e && e.length ? e : b.parents(c.originalElement[0]).length ? [ "width", "height" ] : [ "width", "height", "top", "left" ];
a.each(i, function(a, b) {
var c = (f[b] || 0) + (h[b] || 0);
c && c >= 0 && (g[b] = c || null);
}), a.browser.opera && /relative/.test(b.css("position")) && (d._revertToRelativePosition = !0, b.css({
position: "absolute",
top: "auto",
left: "auto"
})), b.css(g);
});
};
typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(a, b) {
i(a, b);
}) : i(e.alsoResize);
},
stop: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = function(b) {
a(b).each(function() {
var b = a(this);
b.css({
position: b.data("resizable-alsoresize").position
});
});
};
d._revertToRelativePosition && (d._revertToRelativePosition = !1, typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(a) {
f(a);
}) : f(e.alsoResize)), a(this).removeData("resizable-alsoresize");
}
}), a.ui.plugin.add("resizable", "animate", {
stop: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = d._proportionallyResizeElements, g = f.length && /textarea/i.test(f[0].nodeName), h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height, i = g ? 0 : d.sizeDiff.width, j = {
width: d.size.width - i,
height: d.size.height - h
}, k = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null, l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
d.element.animate(a.extend(j, l && k ? {
top: l,
left: k
} : {}), {
duration: e.animateDuration,
easing: e.animateEasing,
step: function() {
var c = {
width: parseInt(d.element.css("width"), 10),
height: parseInt(d.element.css("height"), 10),
top: parseInt(d.element.css("top"), 10),
left: parseInt(d.element.css("left"), 10)
};
f && f.length && a(f[0]).css({
width: c.width,
height: c.height
}), d._updateCache(c), d._propagate("resize", b);
}
});
}
}), a.ui.plugin.add("resizable", "containment", {
start: function(b, d) {
var e = a(this).data("resizable"), f = e.options, g = e.element, h = f.containment, i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
if (!i) return;
e.containerElement = a(i);
if (/document/.test(h) || h == document) e.containerOffset = {
left: 0,
top: 0
}, e.containerPosition = {
left: 0,
top: 0
}, e.parentData = {
element: a(document),
left: 0,
top: 0,
width: a(document).width(),
height: a(document).height() || document.body.parentNode.scrollHeight
}; else {
var j = a(i), k = [];
a([ "Top", "Right", "Left", "Bottom" ]).each(function(a, b) {
k[a] = c(j.css("padding" + b));
}), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {
height: j.innerHeight() - k[3],
width: j.innerWidth() - k[1]
};
var l = e.containerOffset, m = e.containerSize.height, n = e.containerSize.width, o = a.ui.hasScroll(i, "left") ? i.scrollWidth : n, p = a.ui.hasScroll(i) ? i.scrollHeight : m;
e.parentData = {
element: i,
left: l.left,
top: l.top,
width: o,
height: p
};
}
},
resize: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = d.containerSize, g = d.containerOffset, h = d.size, i = d.position, j = d._aspectRatio || b.shiftKey, k = {
top: 0,
left: 0
}, l = d.containerElement;
l[0] != document && /static/.test(l.css("position")) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / e.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * e.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width), n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height), o = d.containerElement.get(0) == d.element.parent().get(0), p = /relative|absolute/.test(d.containerElement.css("position"));
o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio));
},
stop: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = d.position, g = d.containerOffset, h = d.containerPosition, i = d.containerElement, j = a(d.helper), k = j.offset(), l = j.outerWidth() - d.sizeDiff.width, m = j.outerHeight() - d.sizeDiff.height;
d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({
left: k.left - h.left - g.left,
width: l,
height: m
}), d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({
left: k.left - h.left - g.left,
width: l,
height: m
});
}
}), a.ui.plugin.add("resizable", "ghost", {
start: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = d.size;
d.ghost = d.originalElement.clone(), d.ghost.css({
opacity: .25,
display: "block",
position: "relative",
height: f.height,
width: f.width,
margin: 0,
left: 0,
top: 0
}).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost : ""), d.ghost.appendTo(d.helper);
},
resize: function(b, c) {
var d = a(this).data("resizable"), e = d.options;
d.ghost && d.ghost.css({
position: "relative",
height: d.size.height,
width: d.size.width
});
},
stop: function(b, c) {
var d = a(this).data("resizable"), e = d.options;
d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0));
}
}), a.ui.plugin.add("resizable", "grid", {
resize: function(b, c) {
var d = a(this).data("resizable"), e = d.options, f = d.size, g = d.originalSize, h = d.originalPosition, i = d.axis, j = e._aspectRatio || b.shiftKey;
e.grid = typeof e.grid == "number" ? [ e.grid, e.grid ] : e.grid;
var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1), l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
/^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k);
}
});
var c = function(a) {
return parseInt(a, 10) || 0;
}, d = function(a) {
return !isNaN(parseInt(a, 10));
};
}(jQuery), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["socrates-package_inputtext"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i = "function", j = this.escapeExpression;
return f += '<input type="text" placeholder="', h = c.placeholder, h ? g = h.call(b, {
hash: {}
}) : (g = b.placeholder, g = typeof g === i ? g() : g), f += j(g) + '" disabled="disabled"></input>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["socrates-package_socrates-nav"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n	<span class="event ', f = c.complete, f ? e = f.call(a, {
hash: {}
}) : (e = a.complete, e = typeof e === i ? e() : e), d += j(e) + '" style="left: ', f = c.percentage, f ? e = f.call(a, {
hash: {}
}) : (e = a.percentage, e = typeof e === i ? e() : e), d += j(e) + '%">\n		<div class="stem"></div>\n		<a href="#', f = c.slug, f ? e = f.call(a, {
hash: {}
}) : (e = a.slug, e = typeof e === i ? e() : e), d += j(e) + '" class="icon" title="', f = c.time, f ? e = f.call(a, {
hash: {}
}) : (e = a.time, e = typeof e === i ? e() : e), d += j(e) + ": ", f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === i ? e() : e), d += j(e) + '"></a>\n	</span>\n	', d;
}
c = c || a.helpers;
var g = "", h, i = "function", j = this.escapeExpression, k = this;
g += '<div class="timebar">\n	', h = b.questions, h = c.each.call(b, h, {
hash: {},
inverse: k.noop,
fn: k.program(1, f, e)
});
if (h || h === 0) g += h;
return g += "\n</div>\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["socrates-package_submit-area"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n    <a class="explain simple-button action-gradient" href="', f = c.explainUrl, f ? e = f.call(a, {
hash: {}
}) : (e = a.explainUrl, e = typeof e === i ? e() : e), d += j(e) + '">&laquo; Explain again</a>\n    ', d;
}
c = c || a.helpers;
var g = "", h, i = "function", j = this.escapeExpression, k = this;
g += '<div class="submit-area">\n    ', h = b.explainUrl, h = c["if"].call(b, h, {
hash: {},
inverse: k.noop,
fn: k.program(1, f, e)
});
if (h || h === 0) g += h;
return g += '\n    <button type="submit" class="submit simple-button action-gradient green">Submit</button>\n    <span class="alert alert-success">\n        <img class="face" src="/khan-exercises/css/images/face-smiley.gif">\n        Correct!\n    </span>\n    <span class="alert alert-error">\n        <img class="face" src="/khan-exercises/css/images/face-sad.gif">\n        Incorrect\n        <a class="see-answer" href="javascript: void 0">See Answer</a>\n    </span>\n    <a class="skip simple-button action-gradient" href="javascript:void 0">Skip &raquo;</a>\n</div>\n', g;
});
}();

var Poppler = function() {
function a() {
this.events = [], this.duration = -1, this.eventIndex = 0, _.bindAll(this);
}
return a.timeFn = function(a) {
return a.time;
}, a.nextPeriod = function(a, b) {
return Math.round(Math.floor(a / b + 1)) * b;
}, a.prototype.add = function(b, c) {
c.time = b;
var d = _.sortedIndex(this.events, c, a.timeFn);
while (this.events[d] && this.events[d].time == b) d++;
this.events.splice(d, 0, c);
}, a.prototype.trigger = function(b) {
if (this.blocked) return;
var c = b - this.duration, d = .001;
if (Math.abs(c) < d) return;
var e = 1;
if (Math.abs(c) > e) return;
this.duration = b, this.triggerEvents();
}, a.prototype.triggerEvents = function() {
while (this.events[this.eventIndex] && this.events[this.eventIndex].time <= this.duration) {
var a = this.events[this.eventIndex]();
this.eventIndex++;
if (a) {
this.blocked = !0;
break;
}
}
}, a.prototype.resumeEvents = function() {
this.blocked = !1, this.triggerEvents();
}, a.prototype.seek = function(b) {
this.duration = b, this.eventIndex = _.sortedIndex(this.events, {
time: this.duration
}, a.timeFn);
}, a;
}();

Socrates = {}, Socrates.ControlPanel = Backbone.View.extend({
el: ".interactive-video-controls",
controls: [],
events: {
"click button#label": "addLabel",
"click button#inputtext": "addInputText"
},
addLabel: function() {
this.addView(new Socrates.Label);
},
addInputText: function() {
this.addView(new Socrates.InputText);
},
addView: function(a) {
this.controls.push(a), this.$controlEl.append(a.el), a.render();
},
serializeHtml: function() {
return _.each(this.controls, function(a) {
a.moveable(!1);
}), this.$controlEl.html();
}
}, {
onReady: function() {
window.ControlPanel = new Socrates.ControlPanel;
}
}), Socrates.Label = Backbone.View.extend({
tagName: "div",
className: "label",
events: {
dblclick: "promptForContents"
},
render: function() {
return this.$el.text("Default label contents"), this.moveable(!0), this;
},
isMoveable: !1,
moveable: function(a) {
return a === this.isMoveable ? this : (a == null && (a = !this.isMoveable), this.isMoveable = a, this.isMoveable ? this.$el.addClass("moveable").resizable().draggable() : this.$el.removeClass("moveable").resizable("destroy").draggable("destroy"), this);
},
promptForContents: function(a) {
var b = prompt("Enter label contents", this.$el.text());
this.$el.text(b), this.isMoveable && (this.moveable(!1), this.moveable(!0));
},
serializedForm: function() {}
}), Socrates.InputText = Backbone.View.extend({
className: "inputtext",
template: Templates.get("socrates.inputtext"),
events: {
dblclick: "promptForContents"
},
render: function() {
var a = this.template({
placeholder: "?"
});
return this.$el.html(a), this.moveable(!0), this;
},
isMoveable: !1,
moveable: function(a) {
return a === this.isMoveable ? this : (a == null && (a = !this.isMoveable), this.isMoveable = a, this.isMoveable ? this.$el.addClass("moveable").resizable().draggable() : this.$el.removeClass("moveable").resizable("destroy").draggable("destroy"), this);
},
promptForContents: function(a) {
var b = this.$("input"), c = prompt("Enter placeholder contents", b.attr("placeholder"));
b.attr("placeholder", c);
},
serializedForm: function() {
this.$("input").prop("disabled", !1);
}
}), Socrates.Bookmark = Backbone.Model.extend({
defaults: {
complete: !1
},
seconds: function() {
return Socrates.Question.timeToSeconds(this.get("time"));
},
slug: function() {
return _.str.slugify(this.get("title"));
},
toJSON: function() {
var a = Backbone.Model.prototype.toJSON.call(this);
return a.slug = this.slug(), a;
}
}, {
timeToSeconds: function(a) {
if (a == null || a.length === 0) throw "Invalid argument";
result = 0;
var b = 0;
while (a[b]) {
var c = b;
while (a[b] && /[\d\.,]/.test(a[b])) b++;
var d = parseFloat(a.slice(c, b)), e = a[b] || "s";
if (e == "m") result += d * 60; else {
if (e != "s") throw "Unimplemented unit, only ISO8601 durations with mins and secs";
result += d;
}
b++;
}
return result;
}
}), Socrates.Question = Socrates.Bookmark.extend({
baseSlug: Socrates.Bookmark.prototype.slug,
slug: function() {
return this.baseSlug() + "/q";
},
imageUrl: function() {
return this.get("youtubeId") + "-" + this.get("time");
},
templateName: function() {
return this.get("youtubeId") + "." + this.baseSlug();
}
}), Socrates.QuestionCollection = Backbone.Collection.extend({
model: Socrates.Question
}), Socrates.QuestionView = Backbone.View.extend({
className: "question",
events: {
"submit form": "submit",
"click .submit-area a.skip": "skip",
"click .close": "skip",
"click .submit-area a.see-answer": "seeAnswerClicked"
},
timeDisplayed: 0,
startTime: null,
initialize: function() {
_.extend(this, this.options), this.version = 1, this.loaded = !1, this.template = Templates.get(this.model.templateName()), this.render();
},
render: function() {
this.$el.html(this.template({
title: this.model.get("title"),
explainUrl: this.model.get("nested")
}));
var a = this.$(".layer.backdrop.videoframe");
a.length > 0 && a.append($("<img>", {
src: this.imageUrl()
}));
var b = this.model.get("nested");
return b && this.$(".simple-button.explain").attr("href", "#" + b), this.loaded = !0, this;
},
qtip: function() {
var a = this.$(".qtip-question");
if (a.length > 0) {
var b = this.$(".controls");
b.qtip({
content: {
text: a,
title: this.model.get("title")
},
position: $.extend({
container: b,
at: [ 0, 0 ]
}, this.model.get("qtip-position")),
style: {
classes: "ui-tooltip ui-tooltip-rounded ui-tooltip-shadow"
},
show: {
event: !1,
ready: !0
},
hide: !1
});
}
},
hide: function() {
return this.finishRecordingTime(), this.$el.removeClass("visible"), this;
},
finishRecordingTime: function() {
return this.startTime ? (this.timeDisplayed += +(new Date) - this.startTime, this.startTime = null) : this.timeDisplayed = 0, this.timeDisplayed;
},
show: function() {
return this.startTime = +(new Date), this.$el.addClass("visible"), this.qtip(), this;
},
imageUrl: function() {
return "/images/videoframes/" + this.model.imageUrl() + ".jpeg";
},
isCorrect: function(a) {
var b = this.model.get("correctData");
return b == null ? !0 : _.isEqual(a, b);
},
getData: function() {
data = {};
var a = this.$("table.matrix-input");
data = _.extend(data, this.matrixInputToAnswer(a));
var b = this.$("table.checkbox-grid");
data = _.extend(data, this.checkBoxGridToAnswer(b));
var c = this.$("input").not(a.find("input")).not(b.find("input"));
return data = _.extend(data, this.freeInputsToAnswer(c)), data;
},
matrixInputToAnswer: function(a) {
var b = {};
return _.each(a, function(a) {
var c = _.map($(a).find("tr"), function(a) {
return _.map($(a).find("input"), function(a) {
return parseFloat($(a).val());
});
}), d = $(a).attr("name") || "answer";
b[d] = c;
}), b;
},
checkBoxGridToAnswer: function(a) {
var b = {};
return _.each(a, function(a) {
var c = _.map($(a).find("thead th"), function(a) {
return $(a).attr("name");
});
c = _.rest(c, 1);
var d = {};
_.each($(a).find("tbody tr"), function(a) {
var b = {};
_.each($(a).find("input"), function(a, d) {
b[c[d]] = $(a).prop("checked");
}), d[$(a).attr("name")] = b;
});
var e = $(a).attr("name") || "answer";
b[e] = d;
}), b;
},
freeInputsToAnswer: function(a) {
var b = {};
return a.each(function(a, c) {
var d = $(c), e = d.attr("name"), f;
if (d.attr("type") === "checkbox") f = d.prop("checked"); else if (d.attr("type") === "radio") {
if (!d.prop("checked")) return !0;
f = d.val();
} else f = d.val();
var g = !1;
b[e] != null && (_.isArray(b[e]) || (b[e] = [ b[e] ]), g = !0), g ? b[e].push(f) : b[e] = f;
}), b;
},
seeAnswerClicked: function() {
this.$(".submit-area .submit").prop("disabled", !0), this.showMem(), this.loadAnswer();
},
loadAnswer: function() {
var a = $.extend(!0, {}, this.model.get("correctData")), b = this.$("table.matrix-input");
a = this.answerToMatrixInputs(b, a);
var c = this.$("table.checkbox-grid");
a = this.answerToCheckboxGrids(c, a);
var d = this.$("input").not(b.find("input")).not(c.find("input"));
a = this.answerToFreeInputs(d, a), _.isEmpty(a) || console.log("failed to load answer correctly");
},
answerToMatrixInputs: function(a, b) {
return _.each(a, function(a) {
var c = $(a).attr("name") || "answer", d = b[c];
_.each($(a).find("tr"), function(a, b) {
return _.each($(a).find("input"), function(a, c) {
$(a).val(d[b][c]);
});
}), delete b[c];
}), b;
},
answerToCheckboxGrids: function(a, b) {
return _.each(a, function(a) {
var c = $(a).attr("name") || "answer", d = b[c], e = _.map($(a).find("thead th"), function(a) {
return $(a).attr("name");
});
e = _.rest(e, 1), _.each($(a).find("tbody tr"), function(a) {
var b = $(a).attr("name");
_.each($(a).find("input"), function(a, c) {
$(a).prop("checked", d[b][e[c]]);
});
});
}), b;
},
answerToFreeInputs: function(a, b) {
return a.each(function(a, c) {
var d = $(c), e = d.attr("name"), f = b[e], g = _.isArray(b[e]);
g && (f = b[e].pop()), (!g || !!_.isEmpty(b[e])) && delete b[e], d.attr("type") === "checkbox" && d.prop("checked", f);
if (d.attr("type") === "radio") {
if (d.val() !== f) return b[e] = f, !0;
d.prop("checked", !0);
} else d.val(f);
}), b;
},
getResponse: function() {
var a = this.getData(), b = this.finishRecordingTime();
return this.timeDisplayed = 0, {
time: this.model.get("time"),
youtubeId: this.model.get("youtubeId"),
id: this.model.get("id"),
version: this.version,
correct: this.isCorrect(a),
data: a,
timeDisplayed: b
};
},
validateResponse: function(a) {
requiredProps = [ "id", "version", "correct", "data", "youtubeId", "time" ];
var b = _.all(requiredProps, function(b) {
return a[b] != null;
});
if (!b) throw console.log(a), "Invalid response from question";
return !0;
},
alreadyFiredAnswered: !1,
fireAnswered: function() {
this.alreadyFiredAnswered || (this.alreadyFiredAnswered = !0, this.trigger("answered"));
},
submit: function(a) {
a.preventDefault();
var b = $(a.currentTarget), c = b.find(".submit");
if (c.text() === "Continue") {
this.fireAnswered();
return;
}
var d = this.getResponse();
this.validateResponse(d), this.log("submit", d), d.correct ? (this.model.set({
complete: !0
}), this.$(".submit-area .alert-error").hide(), this.$(".submit-area .alert-success").show(), c && c.html("Continue"), this.hasMem() ? this.showMem() : _.delay(_.bind(this.fireAnswered, this), 3e3)) : (this.$(".submit-area .alert-success").hide(), this.$(".submit-area .alert-error").show());
},
hasMem: function() {
return this.$(".mem").length > 0;
},
showMem: function() {
this.$(".mem").slideDown(350, "easeInOutCubic");
},
skip: function() {
var a = this.getResponse();
this.validateResponse(a), this.log("skip", a), this.trigger("skipped");
},
log: function(a, b) {
console.log("POSTing response", a, b);
}
}), Socrates.MasterView = Backbone.View.extend({
initialize: function(a) {
this.views = a.views;
},
render: function() {
this.$el.append(_.pluck(this.views, "el"));
}
}), Socrates.Nav = Backbone.View.extend({
template: Templates.get("socrates.socrates-nav"),
initialize: function() {
this.model.bind("change", this.render, this);
},
questionsJson: function() {
return this.model.filter(function(a) {
return a.constructor == Socrates.Question;
}).map(function(a) {
var b = a.seconds() / this.options.videoDuration * 100;
return {
title: a.get("title"),
time: a.get("time"),
slug: a.slug(),
percentage: b,
complete: a.get("complete") ? "complete" : ""
};
}, this);
},
render: function() {
return this.$el.html(this.template({
questions: this.questionsJson()
})), this;
}
});

var recursiveTrigger = function a(b) {
var c = window.VideoStats.getSecondsWatched();
b(c), c = window.VideoStats.getSecondsWatched();
var d = (Poppler.nextPeriod(c, .1) - c) * 1e3;
_.delay(a, d, b);
};

Socrates.QuestionRouter = Backbone.Router.extend({
routes: {
":segment": "reactToNewFragment",
":segment/:qid": "reactToNewFragment"
},
initialize: function(a) {
_.defaults(a, this.constructor.defaults), this.beep = new Audio("");
var b = {
ogg: "audio/ogg",
mp3: "audio/mpeg",
wav: "audio/x-wav"
}, c, d = _.find(b, function(a, d) {
return this.beep.canPlayType(b[d]) !== "" ? (c = d, !0) : !1;
}, this);
d ? (this.beep.src = a.beepUrl + "." + c, this.beep.volume = a.beepVolume) : this.beep = null, this.videoControls = a.videoControls, $(this.videoControls).on("playerStateChange", _.bind(this.playerStateChange, this)), this.bookmarks = a.bookmarks, this.questions = this.bookmarks.filter(function(a) {
return a.constructor.prototype === Socrates.Question.prototype;
}), this.questionViews = this.questions.map(function(a) {
return new Socrates.QuestionView({
model: a
});
}), _.each(this.questionViews, function(a) {
a.bind("skipped", this.skipped, this), a.bind("answered", this.submitted, this);
}, this), this.poppler = new Poppler, _.each(this.questions, function(a) {
this.poppler.add(a.seconds(), _.bind(this.videoTriggeredQuestion, this, a));
}, this), recursiveTrigger(_.bind(this.poppler.trigger, this.poppler));
},
playerStateChange: function(a, b) {
if (b === 1) if (this.ignoreNextPlay) this.ignoreNextPlay = !1; else {
var c = VideoStats.getSecondsWatched();
this.poppler.seek(c);
} else b === 2 ? this.ignoreNextPlay = !1 : b === 3 && (this.ignoreNextPlay = !0);
},
questionToView: function(a) {
return a.constructor.prototype == Socrates.Question.prototype && (a = _.find(this.questionViews, function(b) {
return b.model == a;
})), a;
},
reactToNewFragment: function(a, b) {
b && (a = a + "/" + b), a === "" && this.leaveCurrentState();
var c = this.bookmarks.find(function(b) {
return b.slug() === a;
});
if (c) {
if (c.constructor.prototype === Socrates.Question.prototype) {
this.linkTriggeredQuestion(c);
return;
}
var d = c.seconds();
this.fragmentTriggeredSeek(d);
return;
}
try {
var d = Socrates.Question.timeToSeconds(slug);
this.fragmentTriggeredSeek(d);
return;
} catch (e) {}
this.navigate("playing", {
replace: !0,
trigger: !0
});
},
videoTriggeredQuestion: function(a) {
return this.videoControls.pause(), this.beep != null && this.beep.play(), this.navigate(a.slug()), this.enterState(a), !0;
},
linkTriggeredQuestion: function(a) {
this.videoControls.invokeWhenReady(_.bind(function() {
this.poppler.blocked = !0, this.poppler.seek(a.seconds()), this.poppler.eventIndex++, this.videoControls.pause(), this.videoControls.player.getPlayerState() === 2 && this.videoControls.player.seekTo(a.seconds(), !0), this.enterState(a);
}, this));
},
fragmentTriggeredSeek: function(a) {
this.leaveCurrentState(), this.videoControls.invokeWhenReady(_.bind(function() {
this.poppler.blocked = !0, this.poppler.seek(a), this.videoControls.player.seekTo(a, !0), this.videoControls.player.getPlayerState() === 2 && this.videoControls.play(), this.poppler.blocked = !1;
}, this));
},
enterState: function(a) {
this.leaveCurrentState();
var b = this.questionToView(a);
return b ? (this.currentView = b, this.currentView.show()) : console.log("no view, wtf"), this;
},
leaveCurrentState: function() {
return this.currentView && (this.currentView.hide && this.currentView.hide(), this.currentView = null), this;
},
skipped: function() {
var a = this.currentView.model.seconds();
this.currentView.hide(), this.navigate("playing"), this.poppler.resumeEvents(), this.poppler.blocked || (this.ignoreNextPlay = !0, this.videoControls.player.getPlayerState() == 2 ? this.videoControls.play() : this.videoControls.player.seekTo(a));
},
submitted: function() {
this.skipped();
}
}, {
defaults: {
beepUrl: "/sounds/72126__kizilsungur__sweetalertsound2",
beepVolume: .3
}
}), Socrates.Skippable = function() {
var a = function(a) {
_.extend(this, a);
};
return a.prototype.seconds = function() {
return _.map(this.span, Socrates.Question.timeToSeconds);
}, a.prototype.trigger = function() {
var a = this.seconds()[1];
this.videoControls.player.seekTo(a, !0);
}, a;
}(), Socrates.init = function(a) {
window.Bookmarks = new Backbone.Collection(Socrates.Data[a].Events), window.Router = new Socrates.QuestionRouter({
bookmarks: window.Bookmarks,
videoControls: window.VideoControls
}), Video.videoLibrary = {}, Video.pushStateDisabled = !0, Video.navigateToVideo(window.location.pathname), Backbone.history.start({
pushState: !1,
root: window.location.pathname
}), VideoControls.invokeWhenReady(function() {
var a = VideoControls.player.getDuration();
window.nav = new Socrates.Nav({
el: ".socrates-nav",
model: Bookmarks,
videoDuration: a
}), nav.render();
}), window.masterView = new Socrates.MasterView({
el: ".video-overlay",
views: Router.questionViews
}), masterView.render();
}, Socrates.initSkips = function(a) {
window.skippable = _.map(Socrates.Data[a].Skips, function(a) {
return new Socrates.Skippable(_.extend(a, {
videoControls: window.VideoControls
}));
}), _.each(skippable, function(a) {
poppler.add(a.seconds()[0], _.bind(a.trigger, a));
});
}, Socrates.Data = {}, Handlebars.registerPartial("submit-area", Templates.get("socrates.submit-area")), $(Socrates.ControlPanel.onReady);