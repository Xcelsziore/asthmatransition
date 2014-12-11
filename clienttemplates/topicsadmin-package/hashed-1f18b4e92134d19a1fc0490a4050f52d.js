function _log(a, b) {
if (!_canLog) return;
var c = Array.prototype.slice.apply(arguments, [ 1 ]), d = new Date, e = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
c[0] = e + " - " + c[0];
try {
switch (a) {
case "info":
window.console.info.apply(window.console, c);
break;
case "warn":
window.console.warn.apply(window.console, c);
break;
default:
window.console.log.apply(window.console, c);
}
} catch (f) {
window.console || (_canLog = !1);
}
}

function logMsg(a) {
Array.prototype.unshift.apply(arguments, [ "debug" ]), _log.apply(this, arguments);
}

function stringArraysEqual(a, b) {
return !(a < b || a > b);
}

(function(a, b) {
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
})(jQuery), function(a, b) {
a.widget("ui.droppable", {
widgetEventPrefix: "drop",
options: {
accept: "*",
activeClass: !1,
addClasses: !0,
greedy: !1,
hoverClass: !1,
scope: "default",
tolerance: "intersect"
},
_create: function() {
var b = this.options, c = b.accept;
this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function(a) {
return a.is(c);
}, this.proportions = {
width: this.element[0].offsetWidth,
height: this.element[0].offsetHeight
}, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable");
},
destroy: function() {
var b = a.ui.ddmanager.droppables[this.options.scope];
for (var c = 0; c < b.length; c++) b[c] == this && b.splice(c, 1);
return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this;
},
_setOption: function(b, c) {
b == "accept" && (this.accept = a.isFunction(c) ? c : function(a) {
return a.is(c);
}), a.Widget.prototype._setOption.apply(this, arguments);
},
_activate: function(b) {
var c = a.ui.ddmanager.current;
this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c));
},
_deactivate: function(b) {
var c = a.ui.ddmanager.current;
this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c));
},
_over: function(b) {
var c = a.ui.ddmanager.current;
if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)));
},
_out: function(b) {
var c = a.ui.ddmanager.current;
if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)));
},
_drop: function(b, c) {
var d = c || a.ui.ddmanager.current;
if (!d || (d.currentItem || d.element)[0] == this.element[0]) return !1;
var e = !1;
return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
var b = a.data(this, "droppable");
if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
offset: b.element.offset()
}), b.options.tolerance)) return e = !0, !1;
}), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1;
},
ui: function(a) {
return {
draggable: a.currentItem || a.element,
helper: a.helper,
position: a.position,
offset: a.positionAbs
};
}
}), a.extend(a.ui.droppable, {
version: "@VERSION"
}), a.ui.intersect = function(b, c, d) {
if (!c.offset) return !1;
var e = (b.positionAbs || b.position.absolute).left, f = e + b.helperProportions.width, g = (b.positionAbs || b.position.absolute).top, h = g + b.helperProportions.height, i = c.offset.left, j = i + c.proportions.width, k = c.offset.top, l = k + c.proportions.height;
switch (d) {
case "fit":
return i <= e && f <= j && k <= g && h <= l;
case "intersect":
return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
case "pointer":
var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left, n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top, o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
return o;
case "touch":
return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
default:
return !1;
}
}, a.ui.ddmanager = {
current: null,
droppables: {
"default": []
},
prepareOffsets: function(b, c) {
var d = a.ui.ddmanager.droppables[b.options.scope] || [], e = c ? c.type : null, f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
a : for (var g = 0; g < d.length; g++) {
if (d[g].options.disabled || b && !d[g].accept.call(d[g].element[0], b.currentItem || b.element)) continue;
for (var h = 0; h < f.length; h++) if (f[h] == d[g].element[0]) {
d[g].proportions.height = 0;
continue a;
}
d[g].visible = d[g].element.css("display") != "none";
if (!d[g].visible) continue;
e == "mousedown" && d[g]._activate.call(d[g], c), d[g].offset = d[g].element.offset(), d[g].proportions = {
width: d[g].element[0].offsetWidth,
height: d[g].element[0].offsetHeight
};
}
},
drop: function(b, c) {
var d = !1;
return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
if (!this.options) return;
!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = d || this._drop.call(this, c)), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c));
}), d;
},
dragStart: function(b, c) {
b.element.parents(":not(body,html)").bind("scroll.droppable", function() {
b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
});
},
drag: function(b, c) {
b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
if (this.options.disabled || this.greedyChild || !this.visible) return;
var d = a.ui.intersect(b, this, this.options.tolerance), e = !d && this.isover == 1 ? "isout" : d && this.isover == 0 ? "isover" : null;
if (!e) return;
var f;
if (this.options.greedy) {
var g = this.element.parents(":data(droppable):eq(0)");
g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0);
}
f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == "isout" ? "isover" : "isout"] = 0, this[e == "isover" ? "_over" : "_out"].call(this, c), f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c));
});
},
dragStop: function(b, c) {
b.element.parents(":not(body,html)").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
}
};
}(jQuery), function(a, b) {
a.widget("ui.sortable", a.ui.mouse, {
widgetEventPrefix: "sort",
ready: !1,
options: {
appendTo: "parent",
axis: !1,
connectWith: !1,
containment: !1,
cursor: "auto",
cursorAt: !1,
dropOnEmpty: !0,
forcePlaceholderSize: !1,
forceHelperSize: !1,
grid: !1,
handle: !1,
helper: "original",
items: "> *",
opacity: !1,
placeholder: !1,
revert: !1,
scroll: !0,
scrollSensitivity: 20,
scrollSpeed: 20,
scope: "default",
tolerance: "intersect",
zIndex: 1e3
},
_create: function() {
var a = this.options;
this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
},
destroy: function() {
a.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
for (var b = this.items.length - 1; b >= 0; b--) this.items[b].item.removeData(this.widgetName + "-item");
return this;
},
_setOption: function(b, c) {
b === "disabled" ? (this.options[b] = c, this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")) : a.Widget.prototype._setOption.apply(this, arguments);
},
_mouseCapture: function(b, c) {
var d = this;
if (this.reverting) return !1;
if (this.options.disabled || this.options.type == "static") return !1;
this._refreshItems(b);
var e = null, f = this, g = a(b.target).parents().each(function() {
if (a.data(this, d.widgetName + "-item") == f) return e = a(this), !1;
});
a.data(b.target, d.widgetName + "-item") == f && (e = a(b.target));
if (!e) return !1;
if (this.options.handle && !c) {
var h = !1;
a(this.options.handle, e).find("*").andSelf().each(function() {
this == b.target && (h = !0);
});
if (!h) return !1;
}
return this.currentItem = e, this._removeCurrentsFromItems(), !0;
},
_mouseStart: function(b, c, d) {
var e = this.options, f = this;
this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
top: this.offset.top - this.margins.top,
left: this.offset.left - this.margins.left
}, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), a.extend(this.offset, {
click: {
left: b.pageX - this.offset.left,
top: b.pageY - this.offset.top
},
parent: this._getParentOffset(),
relative: this._getRelativeOffset()
}), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {
prev: this.currentItem.prev()[0],
parent: this.currentItem.parent()[0]
}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
if (!d) for (var g = this.containers.length - 1; g >= 0; g--) this.containers[g]._trigger("activate", b, f._uiHash(this));
return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0;
},
_mouseDrag: function(b) {
this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
if (this.options.scroll) {
var c = this.options, d = !1;
this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b);
}
this.positionAbs = this._convertPositionTo("absolute");
if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
for (var e = this.items.length - 1; e >= 0; e--) {
var f = this.items[e], g = f.item[0], h = this._intersectsWithPointer(f);
if (!h) continue;
if (g != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != g && !a.ui.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], g) : !0)) {
this.direction = h == 1 ? "down" : "up";
if (this.options.tolerance != "pointer" && !this._intersectsWithSides(f)) break;
this._rearrange(b, f), this._trigger("change", b, this._uiHash());
break;
}
}
return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
},
_mouseStop: function(b, c) {
if (!b) return;
a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
if (this.options.revert) {
var d = this, e = d.placeholder.offset();
d.reverting = !0, a(this.helper).animate({
left: e.left - this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
top: e.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
}, parseInt(this.options.revert, 10) || 500, function() {
d._clear(b);
});
} else this._clear(b, c);
return !1;
},
cancel: function() {
var b = this;
if (this.dragging) {
this._mouseUp({
target: null
}), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
for (var c = this.containers.length - 1; c >= 0; c--) this.containers[c]._trigger("deactivate", null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger("out", null, b._uiHash(this)), this.containers[c].containerCache.over = 0);
}
return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
helper: null,
dragging: !1,
reverting: !1,
_noFinalSort: null
}), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this;
},
serialize: function(b) {
var c = this._getItemsAsjQuery(b && b.connected), d = [];
return b = b || {}, a(c).each(function() {
var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]));
}), !d.length && b.key && d.push(b.key + "="), d.join("&");
},
toArray: function(b) {
var c = this._getItemsAsjQuery(b && b.connected), d = [];
return b = b || {}, c.each(function() {
d.push(a(b.item || this).attr(b.attribute || "id") || "");
}), d;
},
_intersectsWith: function(a) {
var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = d + j > h && d + j < i && b + k > f && b + k < g;
return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i;
},
_intersectsWithPointer: function(b) {
var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
return e ? this.floating ? g && g == "right" || f == "down" ? 2 : 1 : f && (f == "down" ? 2 : 1) : !1;
},
_intersectsWithSides: function(b) {
var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
return this.floating && f ? f == "right" && d || f == "left" && !d : e && (e == "down" && c || e == "up" && !c);
},
_getDragVerticalDirection: function() {
var a = this.positionAbs.top - this.lastPositionAbs.top;
return a != 0 && (a > 0 ? "down" : "up");
},
_getDragHorizontalDirection: function() {
var a = this.positionAbs.left - this.lastPositionAbs.left;
return a != 0 && (a > 0 ? "right" : "left");
},
refresh: function(a) {
return this._refreshItems(a), this.refreshPositions(), this;
},
_connectWith: function() {
var a = this.options;
return a.connectWith.constructor == String ? [ a.connectWith ] : a.connectWith;
},
_getItemsAsjQuery: function(b) {
var c = this, d = [], e = [], f = this._connectWith();
if (f && b) for (var g = f.length - 1; g >= 0; g--) {
var h = a(f[g]);
for (var i = h.length - 1; i >= 0; i--) {
var j = a.data(h[i], this.widgetName);
j && j != this && !j.options.disabled && e.push([ a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j ]);
}
}
e.push([ a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
options: this.options,
item: this.currentItem
}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]);
for (var g = e.length - 1; g >= 0; g--) e[g][0].each(function() {
d.push(this);
});
return a(d);
},
_removeCurrentsFromItems: function() {
var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
for (var b = 0; b < this.items.length; b++) for (var c = 0; c < a.length; c++) a[c] == this.items[b].item[0] && this.items.splice(b, 1);
},
_refreshItems: function(b) {
this.items = [], this.containers = [ this ];
var c = this.items, d = this, e = [ [ a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
item: this.currentItem
}) : a(this.options.items, this.element), this ] ], f = this._connectWith();
if (f && this.ready) for (var g = f.length - 1; g >= 0; g--) {
var h = a(f[g]);
for (var i = h.length - 1; i >= 0; i--) {
var j = a.data(h[i], this.widgetName);
j && j != this && !j.options.disabled && (e.push([ a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, {
item: this.currentItem
}) : a(j.options.items, j.element), j ]), this.containers.push(j));
}
}
for (var g = e.length - 1; g >= 0; g--) {
var k = e[g][1], l = e[g][0];
for (var i = 0, m = l.length; i < m; i++) {
var n = a(l[i]);
n.data(this.widgetName + "-item", k), c.push({
item: n,
instance: k,
width: 0,
height: 0,
left: 0,
top: 0
});
}
}
},
refreshPositions: function(b) {
this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
for (var c = this.items.length - 1; c >= 0; c--) {
var d = this.items[c];
if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0]) continue;
var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
b || (d.width = e.outerWidth(), d.height = e.outerHeight());
var f = e.offset();
d.left = f.left, d.top = f.top;
}
if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (var c = this.containers.length - 1; c >= 0; c--) {
var f = this.containers[c].element.offset();
this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
}
return this;
},
_createPlaceholder: function(b) {
var c = b || this, d = c.options;
if (!d.placeholder || d.placeholder.constructor == String) {
var e = d.placeholder;
d.placeholder = {
element: function() {
var b = a(document.createElement(c.currentItem[0].nodeName)).addClass(e || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper").html("&nbsp;")[0];
return e || (b.style.visibility = "hidden"), b;
},
update: function(a, b) {
if (e && !d.forcePlaceholderSize) return;
b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10));
}
};
}
c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder);
},
_contactContainers: function(b) {
var c = null, d = null;
for (var e = this.containers.length - 1; e >= 0; e--) {
if (a.ui.contains(this.currentItem[0], this.containers[e].element[0])) continue;
if (this._intersectsWith(this.containers[e].containerCache)) {
if (c && a.ui.contains(this.containers[e].element[0], c.element[0])) continue;
c = this.containers[e], d = e;
} else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0);
}
if (!c) return;
if (this.containers.length === 1) this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1; else if (this.currentContainer != this.containers[d]) {
var f = 1e4, g = null, h = this.positionAbs[this.containers[d].floating ? "left" : "top"];
for (var i = this.items.length - 1; i >= 0; i--) {
if (!a.ui.contains(this.containers[d].element[0], this.items[i].item[0])) continue;
var j = this.items[i][this.containers[d].floating ? "left" : "top"];
Math.abs(j - h) < f && (f = Math.abs(j - h), g = this.items[i]);
}
if (!g && !this.options.dropOnEmpty) return;
this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger("change", b, this._uiHash()), this.containers[d]._trigger("change", b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
}
},
_createHelper: function(b) {
var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [ b, this.currentItem ])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
return d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {
width: this.currentItem[0].style.width,
height: this.currentItem[0].style.height,
position: this.currentItem.css("position"),
top: this.currentItem.css("top"),
left: this.currentItem.css("left")
}), (d[0].style.width == "" || c.forceHelperSize) && d.width(this.currentItem.width()), (d[0].style.height == "" || c.forceHelperSize) && d.height(this.currentItem.height()), d;
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
var a = this.currentItem.position();
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
left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
top: parseInt(this.currentItem.css("marginTop"), 10) || 0
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
if (b.containment == "document" || b.containment == "window") this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ];
if (!/^(document|window|parent)$/.test(b.containment)) {
var c = a(b.containment)[0], d = a(b.containment).offset(), e = a(c).css("overflow") != "hidden";
this.containment = [ d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ];
}
},
_convertPositionTo: function(b, c) {
c || (c = this.position);
var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, g = /(html|body)/i.test(f[0].tagName);
return {
top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
};
},
_generatePosition: function(b) {
var c = this.options, d = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, e = /(html|body)/i.test(d[0].tagName);
this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
var f = b.pageX, g = b.pageY;
if (this.originalPosition) {
this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top));
if (c.grid) {
var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i;
}
}
return {
top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
};
},
_rearrange: function(a, b, c, d) {
c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
var e = this, f = this.counter;
window.setTimeout(function() {
f == e.counter && e.refreshPositions(!d);
}, 0);
},
_clear: function(b, c) {
this.reverting = !1;
var d = [], e = this;
!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
if (this.helper[0] == this.currentItem[0]) {
for (var f in this._storedCSS) if (this._storedCSS[f] == "auto" || this._storedCSS[f] == "static") this._storedCSS[f] = "";
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
} else this.currentItem.show();
this.fromOutside && !c && d.push(function(a) {
this._trigger("receive", a, this._uiHash(this.fromOutside));
}), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function(a) {
this._trigger("update", a, this._uiHash());
});
if (!a.ui.contains(this.element[0], this.currentItem[0])) {
c || d.push(function(a) {
this._trigger("remove", a, this._uiHash());
});
for (var f = this.containers.length - 1; f >= 0; f--) a.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !c && (d.push(function(a) {
return function(b) {
a._trigger("receive", b, this._uiHash(this));
};
}.call(this, this.containers[f])), d.push(function(a) {
return function(b) {
a._trigger("update", b, this._uiHash(this));
};
}.call(this, this.containers[f])));
}
for (var f = this.containers.length - 1; f >= 0; f--) c || d.push(function(a) {
return function(b) {
a._trigger("deactivate", b, this._uiHash(this));
};
}.call(this, this.containers[f])), this.containers[f].containerCache.over && (d.push(function(a) {
return function(b) {
a._trigger("out", b, this._uiHash(this));
};
}.call(this, this.containers[f])), this.containers[f].containerCache.over = 0);
this._storedCursor && a("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
if (this.cancelHelperRemoval) {
if (!c) {
this._trigger("beforeStop", b, this._uiHash());
for (var f = 0; f < d.length; f++) d[f].call(this, b);
this._trigger("stop", b, this._uiHash());
}
return !1;
}
c || this._trigger("beforeStop", b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
if (!c) {
for (var f = 0; f < d.length; f++) d[f].call(this, b);
this._trigger("stop", b, this._uiHash());
}
return this.fromOutside = !1, !0;
},
_trigger: function() {
a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
},
_uiHash: function(b) {
var c = b || this;
return {
helper: c.helper,
placeholder: c.placeholder || a([]),
position: c.position,
originalPosition: c.originalPosition,
offset: c.positionAbs,
item: c.currentItem,
sender: b ? b.element : null
};
}
}), a.extend(a.ui.sortable, {
version: "@VERSION"
});
}(jQuery);

var _canLog = !0, getDynaTreePersistData = null, DTNodeStatus_Error = -1, DTNodeStatus_Loading = 1, DTNodeStatus_Ok = 0;

(function($) {
function getDtNodeFromElement(a) {
var b = 5;
while (a && b--) {
if (a.dtnode) return a.dtnode;
a = a.parentNode;
}
return null;
}
function noop() {}
function _initDragAndDrop(a) {
var b = a.options.dnd || null;
b && (b.onDragStart || b.onDrop) && _registerDnd(), b && b.onDragStart && a.$tree.draggable({
addClasses: !1,
appendTo: "body",
containment: !1,
delay: 0,
distance: 4,
revert: !1,
connectToDynatree: !0,
helper: function(a) {
var b = getDtNodeFromElement(a.target);
return b ? b.tree._onDragEvent("helper", b, null, a, null, null) : null;
},
_last: null
}), b && b.onDrop && a.$tree.droppable({
addClasses: !1,
tolerance: "intersect",
greedy: !1,
_last: null
});
}
var Class = {
create: function() {
return function() {
this.initialize.apply(this, arguments);
};
}
}, DynaTreeNode = Class.create();
DynaTreeNode.prototype = {
initialize: function(a, b, c) {
this.parent = a, this.tree = b, typeof c == "string" && (c = {
title: c
}), c.key === undefined && (c.key = "_" + b._nodeCount++), this.data = $.extend({}, $.ui.dynatree.nodedatadefaults, c), this.li = null, this.span = null, this.ul = null, this.childList = null, this.isLoading = !1, this.hasSubSel = !1, this.bExpanded = !1, this.bSelected = !1;
},
toString: function() {
return "DynaTreeNode<" + this.data.key + ">: '" + this.data.title + "'";
},
toDict: function(a, b) {
var c = $.extend({}, this.data);
c.activate = this.tree.activeNode === this, c.focus = this.tree.focusNode === this, c.expand = this.bExpanded, c.select = this.bSelected, b && b(c);
if (a && this.childList) {
c.children = [];
for (var d = 0, e = this.childList.length; d < e; d++) c.children.push(this.childList[d].toDict(!0, b));
} else delete c.children;
return c;
},
fromDict: function(a) {
var b = a.children;
if (b === undefined) {
this.data = $.extend(this.data, a), this.render();
return;
}
a = $.extend({}, a), a.children = undefined, this.data = $.extend(this.data, a), this.removeChildren(), this.addChild(b);
},
_getInnerHtml: function() {
var a = this.tree, b = a.options, c = a.cache, d = this.getLevel(), e = this.data, f = "";
d < b.minExpandLevel ? d > 1 && (f += c.tagConnector) : this.hasChildren() !== !1 ? f += c.tagExpander : f += c.tagConnector, b.checkbox && e.hideCheckbox !== !0 && !e.isStatusNode && (f += c.tagCheckbox), e.icon ? f += "<img src='" + b.imagePath + e.icon + "' alt='' />" : e.icon === !1 ? noop() : f += c.tagNodeIcon;
var g = "";
b.onCustomRender && (g = b.onCustomRender.call(a, this) || "");
if (!g) {
var h = e.tooltip ? " title='" + e.tooltip + "'" : "";
b.noLink || e.noLink ? g = "<span style='display: inline-block;' class='" + b.classNames.title + "'" + h + ">" + e.title + "</span>" : g = "<a href='#' class='" + b.classNames.title + "'" + h + ">" + e.title + "</a>";
}
return f += g, f;
},
_fixOrder: function() {
var a = this.childList;
if (!a || !this.ul) return;
var b = this.ul.firstChild;
for (var c = 0, d = a.length - 1; c < d; c++) {
var e = a[c], f = b.dtnode;
e !== f ? (this.tree.logDebug("_fixOrder: mismatch at index " + c + ": " + e + " != " + f), this.ul.insertBefore(e.li, f.li)) : b = b.nextSibling;
}
},
render: function(a, b) {
var c = this.tree, d = this.parent, e = this.data, f = c.options, g = f.classNames, h = this.isLastSibling(), i = !1;
if (!d && !this.ul) this.li = this.span = null, this.ul = document.createElement("ul"), f.minExpandLevel > 1 ? this.ul.className = g.container + " " + g.noConnector : this.ul.className = g.container; else if (d) {
this.li || (i = !0, this.li = document.createElement("li"), this.li.dtnode = this, e.key && f.generateIds && (this.li.id = f.idPrefix + e.key), this.span = document.createElement("span"), this.span.className = g.title, this.li.appendChild(this.span), d.ul || (d.ul = document.createElement("ul"), d.ul.style.display = "none", d.li.appendChild(d.ul)), d.ul.appendChild(this.li)), this.span.innerHTML = this._getInnerHtml();
var j = [];
j.push(g.node), e.isFolder && j.push(g.folder), this.bExpanded && j.push(g.expanded), this.hasChildren() !== !1 && j.push(g.hasChildren), e.isLazy && this.childList === null && j.push(g.lazy), h && j.push(g.lastsib), this.bSelected && j.push(g.selected), this.hasSubSel && j.push(g.partsel), c.activeNode === this && j.push(g.active), e.addClass && j.push(e.addClass), j.push(g.combinedExpanderPrefix + (this.bExpanded ? "e" : "c") + (e.isLazy && this.childList === null ? "d" : "") + (h ? "l" : "")), j.push(g.combinedIconPrefix + (this.bExpanded ? "e" : "c") + (e.isFolder ? "f" : "")), this.span.className = j.join(" "), this.li.className = h ? g.lastsib : "", i && f.onCreate && f.onCreate.call(c, this, this.span), f.onRender && f.onRender.call(c, this, this.span);
}
if ((this.bExpanded || b === !0) && this.childList) {
for (var k = 0, l = this.childList.length; k < l; k++) this.childList[k].render(!1, b);
this._fixOrder();
}
if (this.ul) {
var m = this.ul.style.display === "none", n = !!this.bExpanded;
if (a && f.fx && m === n) {
var o = f.fx.duration || 200;
$(this.ul).animate(f.fx, o);
} else this.ul.style.display = this.bExpanded || !d ? "" : "none";
}
},
getKeyPath: function(a) {
var b = [];
return this.visitParents(function(a) {
a.parent && b.unshift(a.data.key);
}, !a), "/" + b.join(this.tree.options.keyPathSeparator);
},
getParent: function() {
return this.parent;
},
getChildren: function() {
return this.hasChildren() === undefined ? undefined : this.childList;
},
hasChildren: function() {
if (this.data.isLazy) return this.childList === null || this.childList === undefined ? undefined : this.childList.length === 0 ? !1 : this.childList.length === 1 && this.childList[0].isStatusNode() ? undefined : !0;
return !!this.childList;
},
isFirstSibling: function() {
var a = this.parent;
return !a || a.childList[0] === this;
},
isLastSibling: function() {
var a = this.parent;
return !a || a.childList[a.childList.length - 1] === this;
},
getPrevSibling: function() {
if (!this.parent) return null;
var a = this.parent.childList;
for (var b = 1, c = a.length; b < c; b++) if (a[b] === this) return a[b - 1];
return null;
},
getNextSibling: function() {
if (!this.parent) return null;
var a = this.parent.childList;
for (var b = 0, c = a.length - 1; b < c; b++) if (a[b] === this) return a[b + 1];
return null;
},
isStatusNode: function() {
return this.data.isStatusNode === !0;
},
isChildOf: function(a) {
return this.parent && this.parent === a;
},
isDescendantOf: function(a) {
if (!a) return !1;
var b = this.parent;
while (b) {
if (b === a) return !0;
b = b.parent;
}
return !1;
},
countChildren: function() {
var a = this.childList;
if (!a) return 0;
var b = a.length;
for (var c = 0, d = b; c < d; c++) {
var e = a[c];
b += e.countChildren();
}
return b;
},
sortChildren: function(a, b) {
var c = this.childList;
if (!c) return;
a = a || function(a, b) {
var c = a.data.title.toLowerCase(), d = b.data.title.toLowerCase();
return c === d ? 0 : c > d ? 1 : -1;
}, c.sort(a);
if (b) for (var d = 0, e = c.length; d < e; d++) c[d].childList && c[d].sortChildren(a, "$norender$");
b !== "$norender$" && this.render();
},
_setStatusNode: function(a) {
var b = this.childList ? this.childList[0] : null;
if (!a) {
if (b && b.isStatusNode()) {
try {
this.ul && (this.ul.removeChild(b.li), b.li = null);
} catch (c) {}
this.childList.length === 1 ? this.childList = [] : this.childList.shift();
}
} else b ? (a.isStatusNode = !0, a.key = "_statusNode", b.data = a, b.render()) : (a.isStatusNode = !0, a.key = "_statusNode", b = this.addChild(a));
},
setLazyNodeStatus: function(a, b) {
var c = b && b.tooltip ? b.tooltip : null, d = b && b.info ? " (" + b.info + ")" : "";
switch (a) {
case DTNodeStatus_Ok:
this._setStatusNode(null), $(this.span).removeClass(this.tree.options.classNames.nodeLoading), this.isLoading = !1, this.tree.options.autoFocus && (this === this.tree.tnRoot && this.childList && this.childList.length > 0 ? this.childList[0].focus() : this.focus());
break;
case DTNodeStatus_Loading:
this.isLoading = !0, $(this.span).addClass(this.tree.options.classNames.nodeLoading), this.parent || this._setStatusNode({
title: this.tree.options.strings.loading + d,
tooltip: c,
addClass: this.tree.options.classNames.nodeWait
});
break;
case DTNodeStatus_Error:
this.isLoading = !1, this._setStatusNode({
title: this.tree.options.strings.loadError + d,
tooltip: c,
addClass: this.tree.options.classNames.nodeError
});
break;
default:
throw "Bad LazyNodeStatus: '" + a + "'.";
}
},
_parentList: function(a, b) {
var c = [], d = b ? this : this.parent;
while (d) (a || d.parent) && c.unshift(d), d = d.parent;
return c;
},
getLevel: function() {
var a = 0, b = this.parent;
while (b) a++, b = b.parent;
return a;
},
_getTypeForOuterNodeEvent: function(a) {
var b = this.tree.options.classNames, c = a.target;
if (c.className.indexOf(b.node) < 0) return null;
var d = a.pageX - c.offsetLeft, e = a.pageY - c.offsetTop;
for (var f = 0, g = c.childNodes.length; f < g; f++) {
var h = c.childNodes[f], i = h.offsetLeft - c.offsetLeft, j = h.offsetTop - c.offsetTop, k = h.clientWidth, l = h.clientHeight;
if (d >= i && d <= i + k && e >= j && e <= j + l) {
if (h.className == b.title) return "title";
if (h.className == b.expander) return "expander";
if (h.className == b.checkbox) return "checkbox";
if (h.className == b.nodeIcon) return "icon";
}
}
return "prefix";
},
getEventTargetType: function(a) {
var b = a && a.target ? a.target.className : "", c = this.tree.options.classNames;
return b === c.title ? "title" : b === c.expander ? "expander" : b === c.checkbox ? "checkbox" : b === c.nodeIcon ? "icon" : b === c.empty || b === c.vline || b === c.connector ? "prefix" : b.indexOf(c.node) >= 0 ? this._getTypeForOuterNodeEvent(a) : null;
},
isVisible: function() {
var a = this._parentList(!0, !1);
for (var b = 0, c = a.length; b < c; b++) if (!a[b].bExpanded) return !1;
return !0;
},
makeVisible: function() {
var a = this._parentList(!0, !1);
for (var b = 0, c = a.length; b < c; b++) a[b]._expand(!0);
},
focus: function() {
this.makeVisible();
try {
$(this.span).find(">a").focus();
} catch (a) {}
},
isFocused: function() {
return this.tree.tnFocused === this;
},
_activate: function(a, b) {
this.tree.logDebug("dtnode._activate(%o, fireEvents=%o) - %o", a, b, this);
var c = this.tree.options;
if (this.data.isStatusNode) return;
if (b && c.onQueryActivate && c.onQueryActivate.call(this.tree, a, this) === !1) return;
if (a) {
if (this.tree.activeNode) {
if (this.tree.activeNode === this) return;
this.tree.activeNode.deactivate();
}
c.activeVisible && this.makeVisible(), this.tree.activeNode = this, c.persist && $.cookie(c.cookieId + "-active", this.data.key, c.cookie), this.tree.persistence.activeKey = this.data.key, $(this.span).addClass(c.classNames.active), b && c.onActivate && c.onActivate.call(this.tree, this);
} else if (this.tree.activeNode === this) {
if (c.onQueryActivate && c.onQueryActivate.call(this.tree, !1, this) === !1) return;
$(this.span).removeClass(c.classNames.active), c.persist && $.cookie(c.cookieId + "-active", "", c.cookie), this.tree.persistence.activeKey = null, this.tree.activeNode = null, b && c.onDeactivate && c.onDeactivate.call(this.tree, this);
}
},
activate: function() {
this._activate(!0, !0);
},
activateSilently: function() {
this._activate(!0, !1);
},
deactivate: function() {
this._activate(!1, !0);
},
isActive: function() {
return this.tree.activeNode === this;
},
_userActivate: function() {
var a = !0, b = !1;
if (this.data.isFolder) switch (this.tree.options.clickFolderMode) {
case 2:
a = !1, b = !0;
break;
case 3:
a = b = !0;
}
this.parent === null && (b = !1), b && (this.toggleExpand(), this.focus()), a && this.activate();
},
_setSubSel: function(a) {
a ? (this.hasSubSel = !0, $(this.span).addClass(this.tree.options.classNames.partsel)) : (this.hasSubSel = !1, $(this.span).removeClass(this.tree.options.classNames.partsel));
},
_updatePartSelectionState: function() {
var a;
if (!this.hasChildren()) return a = this.bSelected && !this.data.unselectable && !this.data.isStatusNode, this._setSubSel(!1), a;
var b, c, d = this.childList, e = !0, f = !0;
for (b = 0, c = d.length; b < c; b++) {
var g = d[b], h = g._updatePartSelectionState();
h !== !1 && (f = !1), h !== !0 && (e = !1);
}
return e ? a = !0 : f ? a = !1 : a = undefined, this._setSubSel(a === undefined), this.bSelected = a === !0, a;
},
_fixSelectionState: function() {
var a, b, c;
if (this.bSelected) {
this.visit(function(a) {
a.parent._setSubSel(!0), a.data.unselectable || a._select(!0, !1, !1);
}), a = this.parent;
while (a) {
a._setSubSel(!0);
var d = !0;
for (b = 0, c = a.childList.length; b < c; b++) {
var e = a.childList[b];
if (!e.bSelected && !e.data.isStatusNode && !e.data.unselectable) {
d = !1;
break;
}
}
d && a._select(!0, !1, !1), a = a.parent;
}
} else {
this._setSubSel(!1), this.visit(function(a) {
a._setSubSel(!1), a._select(!1, !1, !1);
}), a = this.parent;
while (a) {
a._select(!1, !1, !1);
var f = !1;
for (b = 0, c = a.childList.length; b < c; b++) if (a.childList[b].bSelected || a.childList[b].hasSubSel) {
f = !0;
break;
}
a._setSubSel(f), a = a.parent;
}
}
},
_select: function(a, b, c) {
var d = this.tree.options;
if (this.data.isStatusNode) return;
if (this.bSelected === a) return;
if (b && d.onQuerySelect && d.onQuerySelect.call(this.tree, a, this) === !1) return;
d.selectMode == 1 && a && this.tree.visit(function(a) {
if (a.bSelected) return a._select(!1, !1, !1), !1;
}), this.bSelected = a, a ? (d.persist && this.tree.persistence.addSelect(this.data.key), $(this.span).addClass(d.classNames.selected), c && d.selectMode === 3 && this._fixSelectionState(), b && d.onSelect && d.onSelect.call(this.tree, !0, this)) : (d.persist && this.tree.persistence.clearSelect(this.data.key), $(this.span).removeClass(d.classNames.selected), c && d.selectMode === 3 && this._fixSelectionState(), b && d.onSelect && d.onSelect.call(this.tree, !1, this));
},
select: function(a) {
return this.data.unselectable ? this.bSelected : this._select(a !== !1, !0, !0);
},
toggleSelect: function() {
return this.select(!this.bSelected);
},
isSelected: function() {
return this.bSelected;
},
isLazy: function() {
return !!this.data.isLazy;
},
_loadContent: function() {
try {
var a = this.tree.options;
this.tree.logDebug("_loadContent: start - %o", this), this.setLazyNodeStatus(DTNodeStatus_Loading), !0 === a.onLazyRead.call(this.tree, this) && (this.setLazyNodeStatus(DTNodeStatus_Ok), this.tree.logDebug("_loadContent: succeeded - %o", this));
} catch (b) {
this.tree.logWarning("_loadContent: failed - %o", b), this.setLazyNodeStatus(DTNodeStatus_Error, {
tooltip: "" + b
});
}
},
_expand: function(a, b) {
if (this.bExpanded === a) {
this.tree.logDebug("dtnode._expand(%o) IGNORED - %o", a, this);
return;
}
this.tree.logDebug("dtnode._expand(%o) - %o", a, this);
var c = this.tree.options;
if (!a && this.getLevel() < c.minExpandLevel) {
this.tree.logDebug("dtnode._expand(%o) prevented collapse - %o", a, this);
return;
}
if (c.onQueryExpand && c.onQueryExpand.call(this.tree, a, this) === !1) return;
this.bExpanded = a, c.persist && (a ? this.tree.persistence.addExpand(this.data.key) : this.tree.persistence.clearExpand(this.data.key));
var d = (!this.data.isLazy || this.childList !== null) && !this.isLoading && !b;
this.render(d);
if (this.bExpanded && this.parent && c.autoCollapse) {
var e = this._parentList(!1, !0);
for (var f = 0, g = e.length; f < g; f++) e[f].collapseSiblings();
}
c.activeVisible && this.tree.activeNode && !this.tree.activeNode.isVisible() && this.tree.activeNode.deactivate();
if (a && this.data.isLazy && this.childList === null && !this.isLoading) {
this._loadContent();
return;
}
c.onExpand && c.onExpand.call(this.tree, a, this);
},
isExpanded: function() {
return this.bExpanded;
},
expand: function(a) {
a = a !== !1;
if (!this.childList && !this.data.isLazy && a) return;
if (this.parent === null && !a) return;
this._expand(a);
},
scheduleAction: function(a, b) {
this.tree.timer && (clearTimeout(this.tree.timer), this.tree.logDebug("clearTimeout(%o)", this.tree.timer));
var c = this;
switch (a) {
case "cancel":
break;
case "expand":
this.tree.timer = setTimeout(function() {
c.tree.logDebug("setTimeout: trigger expand"), c.expand(!0);
}, b);
break;
case "activate":
this.tree.timer = setTimeout(function() {
c.tree.logDebug("setTimeout: trigger activate"), c.activate();
}, b);
break;
default:
throw "Invalid mode " + a;
}
this.tree.logDebug("setTimeout(%s, %s): %s", a, b, this.tree.timer);
},
toggleExpand: function() {
this.expand(!this.bExpanded);
},
collapseSiblings: function() {
if (this.parent === null) return;
var a = this.parent.childList;
for (var b = 0, c = a.length; b < c; b++) a[b] !== this && a[b].bExpanded && a[b]._expand(!1);
},
_onClick: function(a) {
var b = this.getEventTargetType(a);
if (b === "expander") this.toggleExpand(), this.focus(); else if (b === "checkbox") this.toggleSelect(), this.focus(); else {
this._userActivate();
var c = this.span.getElementsByTagName("a");
if (!c[0]) return !0;
$.browser.msie || c[0].focus();
}
a.preventDefault();
},
_onDblClick: function(a) {},
_onKeydown: function(a) {
var b = !0, c;
switch (a.which) {
case 107:
case 187:
this.bExpanded || this.toggleExpand();
break;
case 109:
case 189:
this.bExpanded && this.toggleExpand();
break;
case 32:
this._userActivate();
break;
case 8:
this.parent && this.parent.focus();
break;
case 37:
this.bExpanded ? (this.toggleExpand(), this.focus()) : this.parent && this.parent.parent && this.parent.focus();
break;
case 39:
!this.bExpanded && (this.childList || this.data.isLazy) ? (this.toggleExpand(), this.focus()) : this.childList && this.childList[0].focus();
break;
case 38:
c = this.getPrevSibling();
while (c && c.bExpanded && c.childList) c = c.childList[c.childList.length - 1];
!c && this.parent && this.parent.parent && (c = this.parent), c && c.focus();
break;
case 40:
if (this.bExpanded && this.childList) c = this.childList[0]; else {
var d = this._parentList(!1, !0);
for (var e = d.length - 1; e >= 0; e--) {
c = d[e].getNextSibling();
if (c) break;
}
}
c && c.focus();
break;
default:
b = !1;
}
b && a.preventDefault();
},
_onKeypress: function(a) {},
_onFocus: function(a) {
var b = this.tree.options;
if (a.type == "blur" || a.type == "focusout") b.onBlur && b.onBlur.call(this.tree, this), this.tree.tnFocused && $(this.tree.tnFocused.span).removeClass(b.classNames.focused), this.tree.tnFocused = null, b.persist && $.cookie(b.cookieId + "-focus", "", b.cookie); else if (a.type == "focus" || a.type == "focusin") this.tree.tnFocused && this.tree.tnFocused !== this && (this.tree.logDebug("dtnode.onFocus: out of sync: curFocus: %o", this.tree.tnFocused), $(this.tree.tnFocused.span).removeClass(b.classNames.focused)), this.tree.tnFocused = this, b.onFocus && b.onFocus.call(this.tree, this), $(this.tree.tnFocused.span).addClass(b.classNames.focused), b.persist && $.cookie(b.cookieId + "-focus", this.data.key, b.cookie);
},
visit: function(a, b) {
var c = !0;
if (b === !0) {
c = a(this);
if (c === !1 || c == "skip") return c;
}
if (this.childList) for (var d = 0, e = this.childList.length; d < e; d++) {
c = this.childList[d].visit(a, !0);
if (c === !1) break;
}
return c;
},
visitParents: function(a, b) {
if (b && a(this) === !1) return !1;
var c = this.parent;
while (c) {
if (a(c) === !1) return !1;
c = c.parent;
}
return !0;
},
remove: function() {
if (this === this.tree.root) throw "Cannot remove system root";
return this.parent.removeChild(this);
},
removeChild: function(a) {
var b = this.childList;
if (b.length == 1) {
if (a !== b[0]) throw "removeChild: invalid child";
return this.removeChildren();
}
a === this.tree.activeNode && a.deactivate(), this.tree.options.persist && (a.bSelected && this.tree.persistence.clearSelect(a.data.key), a.bExpanded && this.tree.persistence.clearExpand(a.data.key)), a.removeChildren(!0), this.ul.removeChild(a.li);
for (var c = 0, d = b.length; c < d; c++) if (b[c] === a) {
this.childList.splice(c, 1);
break;
}
},
removeChildren: function(a, b) {
this.tree.logDebug("%s.removeChildren(%o)", this, a);
var c = this.tree, d = this.childList;
if (d) {
for (var e = 0, f = d.length; e < f; e++) {
var g = d[e];
g === c.activeNode && !b && g.deactivate(), this.tree.options.persist && !b && (g.bSelected && this.tree.persistence.clearSelect(g.data.key), g.bExpanded && this.tree.persistence.clearExpand(g.data.key)), g.removeChildren(!0, b), this.ul && this.ul.removeChild(g.li);
}
this.childList = null;
}
a || (this.isLoading = !1, this.render());
},
setTitle: function(a) {
this.fromDict({
title: a
});
},
reload: function(a) {
throw "Use reloadChildren() instead";
},
reloadChildren: function(a) {
if (this.parent === null) throw "Use tree.reload() instead";
if (!this.data.isLazy) throw "node.reloadChildren() requires lazy nodes.";
if (a) {
var b = this, c = "nodeLoaded.dynatree." + this.tree.$tree.attr("id") + "." + this.data.key;
this.tree.$tree.bind(c, function(d, e, f) {
b.tree.$tree.unbind(c), b.tree.logDebug("loaded %o, %o, %o", d, e, f);
if (e !== b) throw "got invalid load event";
a.call(b.tree, e, f);
});
}
this.removeChildren(), this._loadContent();
},
_loadKeyPath: function(a, b) {
var c = this.tree;
c.logDebug("%s._loadKeyPath(%s)", this, a);
if (a === "") throw "Key path must not be empty";
var d = a.split(c.options.keyPathSeparator);
if (d[0] === "") throw "Key path must be relative (don't start with '/')";
var e = d.shift();
for (var f = 0, g = this.childList.length; f < g; f++) {
var h = this.childList[f];
if (h.data.key === e) {
if (d.length === 0) b.call(c, h, "ok"); else if (!h.data.isLazy || h.childList !== null && h.childList !== undefined) b.call(c, h, "loaded"), h._loadKeyPath(d.join(c.options.keyPathSeparator), b); else {
c.logDebug("%s._loadKeyPath(%s) -> reloading %s...", this, a, h);
var i = this;
h.reloadChildren(function(e, f) {
f ? (c.logDebug("%s._loadKeyPath(%s) -> reloaded %s.", e, a, e), b.call(c, h, "loaded"), e._loadKeyPath(d.join(c.options.keyPathSeparator), b)) : (c.logWarning("%s._loadKeyPath(%s) -> reloadChildren() failed.", i, a), b.call(c, h, "error"));
});
}
return;
}
}
c.logWarning("Node not found: " + e);
return;
},
resetLazy: function() {
if (this.parent === null) throw "Use tree.reload() instead";
if (!this.data.isLazy) throw "node.resetLazy() requires lazy nodes.";
this.expand(!1), this.removeChildren();
},
_addChildNode: function(a, b) {
var c = this.tree, d = c.options, e = c.persistence;
a.parent = this, this.childList === null ? this.childList = [] : b || this.childList.length > 0 && $(this.childList[this.childList.length - 1].span).removeClass(d.classNames.lastsib);
if (b) {
var f = $.inArray(b, this.childList);
if (f < 0) throw "<beforeNode> must be a child of <this>";
this.childList.splice(f, 0, a);
} else this.childList.push(a);
var g = c.isInitializing();
d.persist && e.cookiesFound && g ? (e.activeKey === a.data.key && (c.activeNode = a), e.focusedKey === a.data.key && (c.focusNode = a), a.bExpanded = $.inArray(a.data.key, e.expandedKeyList) >= 0, a.bSelected = $.inArray(a.data.key, e.selectedKeyList) >= 0) : (a.data.activate && (c.activeNode = a, d.persist && (e.activeKey = a.data.key)), a.data.focus && (c.focusNode = a, d.persist && (e.focusedKey = a.data.key)), a.bExpanded = a.data.expand === !0, a.bExpanded && d.persist && e.addExpand(a.data.key), a.bSelected = a.data.select === !0, a.bSelected && d.persist && e.addSelect(a.data.key)), d.minExpandLevel >= a.getLevel() && (this.bExpanded = !0);
if (a.bSelected && d.selectMode == 3) {
var h = this;
while (h) h.hasSubSel || h._setSubSel(!0), h = h.parent;
}
return c.bEnableUpdate && this.render(), a;
},
addChild: function(a, b) {
if (typeof a == "string") throw "Invalid data type for " + a;
if (!a || a.length === 0) return;
if (a instanceof DynaTreeNode) return this._addChildNode(a, b);
a.length || (a = [ a ]);
var c = this.tree.enableUpdate(!1), d = null;
for (var e = 0, f = a.length; e < f; e++) {
var g = a[e], h = this._addChildNode(new DynaTreeNode(this, this.tree, g), b);
d || (d = h), g.children && h.addChild(g.children, null);
}
return this.tree.enableUpdate(c), d;
},
append: function(a) {
return this.tree.logWarning("node.append() is deprecated (use node.addChild() instead)."), this.addChild(a, null);
},
appendAjax: function(a) {
var b = this;
this.removeChildren(!1, !0), this.setLazyNodeStatus(DTNodeStatus_Loading);
if (a.debugLazyDelay) {
var c = a.debugLazyDelay;
a.debugLazyDelay = 0, this.tree.logInfo("appendAjax: waiting for debugLazyDelay " + c), setTimeout(function() {
b.appendAjax(a);
}, c);
return;
}
var d = a.success, e = a.error, f = "nodeLoaded.dynatree." + this.tree.$tree.attr("id") + "." + this.data.key, g = $.extend({}, this.tree.options.ajaxDefaults, a, {
success: function(a, c) {
var e = b.tree.phase;
b.tree.phase = "init", g.postProcess ? a = g.postProcess.call(this, a, this.dataType) : a && a.hasOwnProperty("d") && (a = a.d), (!$.isArray(a) || a.length !== 0) && b.addChild(a, null), b.tree.phase = "postInit", d && d.call(g, b, a, c), b.tree.logDebug("trigger " + f), b.tree.$tree.trigger(f, [ b, !0 ]), b.tree.phase = e, b.setLazyNodeStatus(DTNodeStatus_Ok), $.isArray(a) && a.length === 0 && (b.childList = [], b.render());
},
error: function(a, c, d) {
b.tree.logWarning("appendAjax failed:", c, ":\n", a, "\n", d), e && e.call(g, b, a, c, d), b.tree.$tree.trigger(f, [ b, !1 ]), b.setLazyNodeStatus(DTNodeStatus_Error, {
info: c,
tooltip: "" + d
});
}
});
$.ajax(g);
},
move: function(a, b) {
var c;
if (this === a) return;
if (!this.parent) throw "Cannot move system root";
if (b === undefined || b == "over") b = "child";
var d = this.parent, e = b === "child" ? a : a.parent;
if (e.isDescendantOf(this)) throw "Cannot move a node to it's own descendant";
if (this.parent.childList.length == 1) this.parent.childList = null, this.parent.bExpanded = !1; else {
c = $.inArray(this, this.parent.childList);
if (c < 0) throw "Internal error";
this.parent.childList.splice(c, 1);
}
this.parent.ul.removeChild(this.li), this.parent = e;
if (e.hasChildren()) switch (b) {
case "child":
e.childList.push(this);
break;
case "before":
c = $.inArray(a, e.childList);
if (c < 0) throw "Internal error";
e.childList.splice(c, 0, this);
break;
case "after":
c = $.inArray(a, e.childList);
if (c < 0) throw "Internal error";
e.childList.splice(c + 1, 0, this);
break;
default:
throw "Invalid mode " + b;
} else e.childList = [ this ];
e.ul || (e.ul = document.createElement("ul"), e.ul.style.display = "none", e.li.appendChild(e.ul)), e.ul.appendChild(this.li);
if (this.tree !== a.tree) throw this.visit(function(b) {
b.tree = a.tree;
}, null, !0), "Not yet implemented.";
d.isDescendantOf(e) || d.render(), e.isDescendantOf(d) || e.render();
},
lastentry: undefined
};
var DynaTreeStatus = Class.create();
DynaTreeStatus._getTreePersistData = function(a, b) {
var c = new DynaTreeStatus(a, b);
return c.read(), c.toDict();
}, getDynaTreePersistData = DynaTreeStatus._getTreePersistData, DynaTreeStatus.prototype = {
initialize: function(a, b) {
a === undefined && (a = $.ui.dynatree.prototype.options.cookieId), b = $.extend({}, $.ui.dynatree.prototype.options.cookie, b), this.cookieId = a, this.cookieOpts = b, this.cookiesFound = undefined, this.activeKey = null, this.focusedKey = null, this.expandedKeyList = null, this.selectedKeyList = null;
},
_log: function(a) {
Array.prototype.unshift.apply(arguments, [ "debug" ]), _log.apply(this, arguments);
},
read: function() {
this.cookiesFound = !1;
var a = $.cookie(this.cookieId + "-active");
this.activeKey = a === null ? "" : a, a !== null && (this.cookiesFound = !0), a = $.cookie(this.cookieId + "-focus"), this.focusedKey = a === null ? "" : a, a !== null && (this.cookiesFound = !0), a = $.cookie(this.cookieId + "-expand"), this.expandedKeyList = a === null ? [] : a.split(","), a !== null && (this.cookiesFound = !0), a = $.cookie(this.cookieId + "-select"), this.selectedKeyList = a === null ? [] : a.split(","), a !== null && (this.cookiesFound = !0);
},
write: function() {
$.cookie(this.cookieId + "-active", this.activeKey === null ? "" : this.activeKey, this.cookieOpts), $.cookie(this.cookieId + "-focus", this.focusedKey === null ? "" : this.focusedKey, this.cookieOpts), $.cookie(this.cookieId + "-expand", this.expandedKeyList === null ? "" : this.expandedKeyList.join(","), this.cookieOpts), $.cookie(this.cookieId + "-select", this.selectedKeyList === null ? "" : this.selectedKeyList.join(","), this.cookieOpts);
},
addExpand: function(a) {
$.inArray(a, this.expandedKeyList) < 0 && (this.expandedKeyList.push(a), $.cookie(this.cookieId + "-expand", this.expandedKeyList.join(","), this.cookieOpts));
},
clearExpand: function(a) {
var b = $.inArray(a, this.expandedKeyList);
b >= 0 && (this.expandedKeyList.splice(b, 1), $.cookie(this.cookieId + "-expand", this.expandedKeyList.join(","), this.cookieOpts));
},
addSelect: function(a) {
$.inArray(a, this.selectedKeyList) < 0 && (this.selectedKeyList.push(a), $.cookie(this.cookieId + "-select", this.selectedKeyList.join(","), this.cookieOpts));
},
clearSelect: function(a) {
var b = $.inArray(a, this.selectedKeyList);
b >= 0 && (this.selectedKeyList.splice(b, 1), $.cookie(this.cookieId + "-select", this.selectedKeyList.join(","), this.cookieOpts));
},
isReloading: function() {
return this.cookiesFound === !0;
},
toDict: function() {
return {
cookiesFound: this.cookiesFound,
activeKey: this.activeKey,
focusedKey: this.activeKey,
expandedKeyList: this.expandedKeyList,
selectedKeyList: this.selectedKeyList
};
},
lastentry: undefined
};
var DynaTree = Class.create();
DynaTree.version = "$Version: 1.2.0$", DynaTree.prototype = {
initialize: function(a) {
this.phase = "init", this.$widget = a, this.options = a.options, this.$tree = a.element, this.timer = null, this.divTree = this.$tree.get(0), _initDragAndDrop(this);
},
_load: function(a) {
var b = this.$widget, c = this.options, d = this;
this.bEnableUpdate = !0, this._nodeCount = 1, this.activeNode = null, this.focusNode = null, c.rootVisible !== undefined && this.logWarning("Option 'rootVisible' is no longer supported."), c.minExpandLevel < 1 && (this.logWarning("Option 'minExpandLevel' must be >= 1."), c.minExpandLevel = 1), c.classNames !== $.ui.dynatree.prototype.options.classNames && (c.classNames = $.extend({}, $.ui.dynatree.prototype.options.classNames, c.classNames)), c.ajaxDefaults !== $.ui.dynatree.prototype.options.ajaxDefaults && (c.ajaxDefaults = $.extend({}, $.ui.dynatree.prototype.options.ajaxDefaults, c.ajaxDefaults)), c.dnd !== $.ui.dynatree.prototype.options.dnd && (c.dnd = $.extend({}, $.ui.dynatree.prototype.options.dnd, c.dnd)), c.imagePath || $("script").each(function() {
var a = /.*dynatree[^\/]*\.js$/i;
if (this.src.search(a) >= 0) return this.src.indexOf("/") >= 0 ? c.imagePath = this.src.slice(0, this.src.lastIndexOf("/")) + "/skin/" : c.imagePath = "skin/", d.logDebug("Guessing imagePath from '%s': '%s'", this.src, c.imagePath), !1;
}), this.persistence = new DynaTreeStatus(c.cookieId, c.cookie), c.persist && ($.cookie || _log("warn", "Please include jquery.cookie.js to use persistence."), this.persistence.read()), this.logDebug("DynaTree.persistence: %o", this.persistence.toDict()), this.cache = {
tagEmpty: "<span class='" + c.classNames.empty + "'></span>",
tagVline: "<span class='" + c.classNames.vline + "'></span>",
tagExpander: "<span class='" + c.classNames.expander + "'></span>",
tagConnector: "<span class='" + c.classNames.connector + "'></span>",
tagNodeIcon: "<span class='" + c.classNames.nodeIcon + "'></span>",
tagCheckbox: "<span class='" + c.classNames.checkbox + "'></span>",
lastentry: undefined
}, (c.children || c.initAjax && c.initAjax.url || c.initId) && $(this.divTree).empty();
var e = this.$tree.find(">ul:first").hide();
this.tnRoot = new DynaTreeNode(null, this, {}), this.tnRoot.bExpanded = !0, this.tnRoot.render(), this.divTree.appendChild(this.tnRoot.ul);
var f = this.tnRoot, g = c.persist && this.persistence.isReloading(), h = !1, i = this.enableUpdate(!1);
this.logDebug("Dynatree._load(): read tree structure..."), c.children ? f.addChild(c.children) : c.initAjax && c.initAjax.url ? (h = !0, f.data.isLazy = !0, this._reloadAjax(a)) : c.initId ? this._createFromTag(f, $("#" + c.initId)) : (this._createFromTag(f, e), e.remove()), this._checkConsistency(), !h && c.selectMode == 3 && f._updatePartSelectionState(), this.logDebug("Dynatree._load(): render nodes..."), this.enableUpdate(i), this.logDebug("Dynatree._load(): bind events..."), this.$widget.bind(), this.logDebug("Dynatree._load(): postInit..."), this.phase = "postInit", c.persist && this.persistence.write(), this.focusNode && this.focusNode.isVisible() && (this.logDebug("Focus on init: %o", this.focusNode), this.focusNode.focus()), h || (c.onPostInit && c.onPostInit.call(this, g, !1), a && a.call(this, "ok")), this.phase = "idle";
},
_reloadAjax: function(a) {
var b = this.options;
if (!b.initAjax || !b.initAjax.url) throw "tree.reload() requires 'initAjax' mode.";
var c = this.persistence, d = $.extend({}, b.initAjax);
d.addActiveKey && (d.data.activeKey = c.activeKey), d.addFocusedKey && (d.data.focusedKey = c.focusedKey), d.addExpandedKeyList && (d.data.expandedKeyList = c.expandedKeyList.join(",")), d.addSelectedKeyList && (d.data.selectedKeyList = c.selectedKeyList.join(",")), d.success && this.logWarning("initAjax: success callback is ignored; use onPostInit instead."), d.error && this.logWarning("initAjax: error callback is ignored; use onPostInit instead.");
var e = c.isReloading();
d.success = function(c, d, f) {
b.selectMode == 3 && c.tree.tnRoot._updatePartSelectionState(), b.onPostInit && b.onPostInit.call(c.tree, e, !1), a && a.call(c.tree, "ok");
}, d.error = function(c, d, f, g) {
b.onPostInit && b.onPostInit.call(c.tree, e, !0, d, f, g), a && a.call(c.tree, "error", d, f, g);
}, this.logDebug("Dynatree._init(): send Ajax request..."), this.tnRoot.appendAjax(d);
},
toString: function() {
return "Dynatree '" + this.$tree.attr("id") + "'";
},
toDict: function() {
return this.tnRoot.toDict(!0);
},
serializeArray: function(a) {
var b = this.getSelectedNodes(a), c = this.$tree.attr("name") || this.$tree.attr("id"), d = [];
for (var e = 0, f = b.length; e < f; e++) d.push({
name: c,
value: b[e].data.key
});
return d;
},
getPersistData: function() {
return this.persistence.toDict();
},
logDebug: function(a) {
this.options.debugLevel >= 2 && (Array.prototype.unshift.apply(arguments, [ "debug" ]), _log.apply(this, arguments));
},
logInfo: function(a) {
this.options.debugLevel >= 1 && (Array.prototype.unshift.apply(arguments, [ "info" ]), _log.apply(this, arguments));
},
logWarning: function(a) {
Array.prototype.unshift.apply(arguments, [ "warn" ]), _log.apply(this, arguments);
},
isInitializing: function() {
return this.phase == "init" || this.phase == "postInit";
},
isReloading: function() {
return (this.phase == "init" || this.phase == "postInit") && this.options.persist && this.persistence.cookiesFound;
},
isUserEvent: function() {
return this.phase == "userEvent";
},
redraw: function() {
this.tnRoot.render(!1, !1);
},
renderInvisibleNodes: function() {
this.tnRoot.render(!1, !0);
},
reload: function(a) {
this._load(a);
},
getRoot: function() {
return this.tnRoot;
},
enable: function() {
this.$widget.enable();
},
disable: function() {
this.$widget.disable();
},
getNodeByKey: function(a) {
var b = document.getElementById(this.options.idPrefix + a);
if (b) return b.dtnode ? b.dtnode : null;
var c = null;
return this.visit(function(b) {
if (b.data.key == a) return c = b, !1;
}, !0), c;
},
getActiveNode: function() {
return this.activeNode;
},
reactivate: function(a) {
var b = this.activeNode;
b && (this.activeNode = null, b.activate(), a && b.focus());
},
getSelectedNodes: function(a) {
var b = [];
return this.tnRoot.visit(function(c) {
if (c.bSelected) {
b.push(c);
if (a === !0) return "skip";
}
}), b;
},
activateKey: function(a) {
var b = a === null ? null : this.getNodeByKey(a);
return b ? (b.focus(), b.activate(), b) : (this.activeNode && this.activeNode.deactivate(), this.activeNode = null, null);
},
loadKeyPath: function(a, b) {
var c = a.split(this.options.keyPathSeparator);
return c[0] === "" && c.shift(), c[0] == this.tnRoot.data.key && (this.logDebug("Removed leading root key."), c.shift()), a = c.join(this.options.keyPathSeparator), this.tnRoot._loadKeyPath(a, b);
},
selectKey: function(a, b) {
var c = this.getNodeByKey(a);
return c ? (c.select(b), c) : null;
},
enableUpdate: function(a) {
return this.bEnableUpdate == a ? a : (this.bEnableUpdate = a, a && this.redraw(), !a);
},
count: function() {
return this.tnRoot.countChildren();
},
visit: function(a, b) {
return this.tnRoot.visit(a, b);
},
_createFromTag: function(parentTreeNode, $ulParent) {
var self = this;
$ulParent.find(">li").each(function() {
var $li = $(this), $liSpan = $li.find(">span:first"), $liA = $li.find(">a:first"), title, href = null, target = null, tooltip;
if ($liSpan.length) title = $liSpan.html(); else if ($liA.length) title = $liA.html(), href = $liA.attr("href"), target = $liA.attr("target"), tooltip = $liA.attr("title"); else {
title = $li.html();
var iPos = title.search(/<ul/i);
iPos >= 0 ? title = $.trim(title.substring(0, iPos)) : title = $.trim(title);
}
var data = {
title: title,
tooltip: tooltip,
isFolder: $li.hasClass("folder"),
isLazy: $li.hasClass("lazy"),
expand: $li.hasClass("expanded"),
select: $li.hasClass("selected"),
activate: $li.hasClass("active"),
focus: $li.hasClass("focused"),
noLink: $li.hasClass("noLink")
};
href && (data.href = href, data.target = target), $li.attr("title") && (data.tooltip = $li.attr("title")), $li.attr("id") && (data.key = $li.attr("id"));
if ($li.attr("data")) {
var dataAttr = $.trim($li.attr("data"));
if (dataAttr) {
dataAttr.charAt(0) != "{" && (dataAttr = "{" + dataAttr + "}");
try {
$.extend(data, eval("(" + dataAttr + ")"));
} catch (e) {
throw "Error parsing node data: " + e + "\ndata:\n'" + dataAttr + "'";
}
}
}
var childNode = parentTreeNode.addChild(data), $ul = $li.find(">ul:first");
$ul.length && self._createFromTag(childNode, $ul);
});
},
_checkConsistency: function() {},
_setDndStatus: function(a, b, c, d, e) {
var f = a ? $(a.span) : null, g = $(b.span);
this.$dndMarker || (this.$dndMarker = $("<div id='dynatree-drop-marker'></div>").hide().prependTo($(this.divTree).parent()));
if (d === "after" || d === "before" || d === "over") {
var h = g.offset();
switch (d) {
case "before":
this.$dndMarker.removeClass("dynatree-drop-after dynatree-drop-over"), this.$dndMarker.addClass("dynatree-drop-before"), h.top -= 8;
break;
case "after":
this.$dndMarker.removeClass("dynatree-drop-before dynatree-drop-over"), this.$dndMarker.addClass("dynatree-drop-after"), h.top += 8;
break;
default:
this.$dndMarker.removeClass("dynatree-drop-after dynatree-drop-before"), this.$dndMarker.addClass("dynatree-drop-over"), g.addClass("dynatree-drop-target"), h.left += 8;
}
this.$dndMarker.offset({
left: h.left,
top: h.top
}).css({
"z-index": 1e3
}).show();
} else g.removeClass("dynatree-drop-target"), this.$dndMarker.hide();
d === "after" ? g.addClass("dynatree-drop-after") : g.removeClass("dynatree-drop-after"), d === "before" ? g.addClass("dynatree-drop-before") : g.removeClass("dynatree-drop-before"), e === !0 ? (f && f.addClass("dynatree-drop-accept"), g.addClass("dynatree-drop-accept"), c.addClass("dynatree-drop-accept")) : (f && f.removeClass("dynatree-drop-accept"), g.removeClass("dynatree-drop-accept"), c.removeClass("dynatree-drop-accept")), e === !1 ? (f && f.addClass("dynatree-drop-reject"), g.addClass("dynatree-drop-reject"), c.addClass("dynatree-drop-reject")) : (f && f.removeClass("dynatree-drop-reject"), g.removeClass("dynatree-drop-reject"), c.removeClass("dynatree-drop-reject"));
},
_onDragEvent: function(a, b, c, d, e, f) {
var g = this.options, h = this.options.dnd, i = null, j = $(b.span), k;
switch (a) {
case "helper":
var l = $("<div class='dynatree-drag-helper'><span class='dynatree-drag-helper-img' /></div>").append($(d.target).closest("a").clone());
l.data("dtSourceNode", b), i = l;
break;
case "start":
b.isStatusNode() ? i = !1 : h.onDragStart && (i = h.onDragStart(b)), i === !1 ? (this.logDebug("tree.onDragStart() cancelled"), e.helper.trigger("mouseup"), e.helper.hide()) : j.addClass("dynatree-drag-source");
break;
case "enter":
i = h.onDragEnter ? h.onDragEnter(b, c) : null, i = {
over: i !== !1 && (i === !0 || i === "over" || $.inArray("over", i) >= 0),
before: i !== !1 && (i === !0 || i === "before" || $.inArray("before", i) >= 0),
after: i !== !1 && (i === !0 || i === "after" || $.inArray("after", i) >= 0)
}, e.helper.data("enterResponse", i);
break;
case "over":
var m = e.helper.data("enterResponse");
k = null;
if (m === !1) break;
if (typeof m == "string") k = m; else {
var n = j.offset(), o = {
x: d.pageX - n.left,
y: d.pageY - n.top
}, p = {
x: o.x / j.width(),
y: o.y / j.height()
};
m.after && p.y > .75 ? k = "after" : !m.over && m.after && p.y > .5 ? k = "after" : m.before && p.y <= .25 ? k = "before" : !m.over && m.before && p.y <= .5 ? k = "before" : m.over && (k = "over"), h.preventVoidMoves && (b === c ? k = null : k === "before" && c && b === c.getNextSibling() ? k = null : k === "after" && c && b === c.getPrevSibling() ? k = null : k === "over" && c && c.parent === b && c.isLastSibling() && (k = null)), e.helper.data("hitMode", k);
}
k === "over" && h.autoExpandMS && b.hasChildren() !== !1 && !b.bExpanded && b.scheduleAction("expand", h.autoExpandMS), k && h.onDragOver && (i = h.onDragOver(b, c, k)), this._setDndStatus(c, b, e.helper, k, i !== !1);
break;
case "drop":
k = e.helper.data("hitMode"), k && h.onDrop && h.onDrop(b, c, k, e, f);
break;
case "leave":
b.scheduleAction("cancel"), e.helper.data("enterResponse", null), e.helper.data("hitMode", null), this._setDndStatus(c, b, e.helper, "out", undefined), h.onDragLeave && h.onDragLeave(b, c);
break;
case "stop":
j.removeClass("dynatree-drag-source"), h.onDragStop && h.onDragStop(b);
break;
default:
throw "Unsupported drag event: " + a;
}
return i;
},
cancelDrag: function() {
var a = $.ui.ddmanager.current;
a && a.cancel();
},
lastentry: undefined
}, $.widget("ui.dynatree", {
_init: function() {
if (parseFloat($.ui.version) < 1.8) return this.options.debugLevel >= 0 && _log("warn", "ui.dynatree._init() was called; you should upgrade to jquery.ui.core.js v1.8 or higher."), this._create();
this.options.debugLevel >= 2 && _log("debug", "ui.dynatree._init() was called; no current default functionality.");
},
_create: function() {
var a = this.options;
a.debugLevel >= 1 && logMsg("Dynatree._create(): version='%s', debugLevel=%o.", $.ui.dynatree.version, this.options.debugLevel), this.options.event += ".dynatree";
var b = this.element.get(0);
this.tree = new DynaTree(this), this.tree._load(), this.tree.logDebug("Dynatree._init(): done.");
},
bind: function() {
function b(a) {
a = $.event.fix(a || window.event);
var b = getDtNodeFromElement(a.target);
return b ? b._onFocus(a) : !1;
}
this.unbind();
var a = "click.dynatree dblclick.dynatree";
this.options.keyboard && (a += " keypress.dynatree keydown.dynatree"), this.element.bind(a, function(a) {
var b = getDtNodeFromElement(a.target);
if (!b) return !0;
var c = b.tree, d = c.options;
c.logDebug("event(%s): dtnode: %s", a.type, b);
var e = c.phase;
c.phase = "userEvent";
try {
switch (a.type) {
case "click":
return d.onClick && d.onClick.call(c, b, a) === !1 ? !1 : b._onClick(a);
case "dblclick":
return d.onDblClick && d.onDblClick.call(c, b, a) === !1 ? !1 : b._onDblClick(a);
case "keydown":
return d.onKeydown && d.onKeydown.call(c, b, a) === !1 ? !1 : b._onKeydown(a);
case "keypress":
return d.onKeypress && d.onKeypress.call(c, b, a) === !1 ? !1 : b._onKeypress(a);
}
} catch (f) {
var g = null;
c.logWarning("bind(%o): dtnode: %o, error: %o", a, b, f);
} finally {
c.phase = e;
}
});
var c = this.tree.divTree;
c.addEventListener ? (c.addEventListener("focus", b, !0), c.addEventListener("blur", b, !0)) : c.onfocusin = c.onfocusout = b;
},
unbind: function() {
this.element.unbind(".dynatree");
},
enable: function() {
this.bind(), $.Widget.prototype.enable.apply(this, arguments);
},
disable: function() {
this.unbind(), $.Widget.prototype.disable.apply(this, arguments);
},
getTree: function() {
return this.tree;
},
getRoot: function() {
return this.tree.getRoot();
},
getActiveNode: function() {
return this.tree.getActiveNode();
},
getSelectedNodes: function() {
return this.tree.getSelectedNodes();
},
lastentry: undefined
}), parseFloat($.ui.version) < 1.8 && ($.ui.dynatree.getter = "getTree getRoot getActiveNode getSelectedNodes"), $.ui.dynatree.version = "$Version: 1.2.0$", $.ui.dynatree.getNode = function(a) {
if (a instanceof DynaTreeNode) return a;
var b = a.selector === undefined ? $(a) : a, c = b.parents("[dtnode]").first(), d;
return typeof c.prop == "function" ? d = c.prop("dtnode") : d = c.attr("dtnode"), d;
}, $.ui.dynatree.getPersistData = DynaTreeStatus._getTreePersistData, $.ui.dynatree.prototype.options = {
title: "Dynatree",
minExpandLevel: 1,
imagePath: null,
children: null,
initId: null,
initAjax: null,
autoFocus: !0,
keyboard: !0,
persist: !1,
autoCollapse: !1,
clickFolderMode: 3,
activeVisible: !0,
checkbox: !1,
selectMode: 2,
fx: null,
noLink: !1,
onClick: null,
onDblClick: null,
onKeydown: null,
onKeypress: null,
onFocus: null,
onBlur: null,
onQueryActivate: null,
onQuerySelect: null,
onQueryExpand: null,
onPostInit: null,
onActivate: null,
onDeactivate: null,
onSelect: null,
onExpand: null,
onLazyRead: null,
onCustomRender: null,
onCreate: null,
onRender: null,
dnd: {
onDragStart: null,
onDragStop: null,
autoExpandMS: 1e3,
preventVoidMoves: !0,
onDragEnter: null,
onDragOver: null,
onDrop: null,
onDragLeave: null
},
ajaxDefaults: {
cache: !1,
dataType: "json"
},
strings: {
loading: "Loading&#8230;",
loadError: "Load error!"
},
generateIds: !1,
idPrefix: "dynatree-id-",
keyPathSeparator: "/",
cookieId: "dynatree",
cookie: {
expires: null
},
classNames: {
container: "dynatree-container",
node: "dynatree-node",
folder: "dynatree-folder",
empty: "dynatree-empty",
vline: "dynatree-vline",
expander: "dynatree-expander",
connector: "dynatree-connector",
checkbox: "dynatree-checkbox",
nodeIcon: "dynatree-icon",
title: "dynatree-title",
noConnector: "dynatree-no-connector",
nodeError: "dynatree-statusnode-error",
nodeWait: "dynatree-statusnode-wait",
hidden: "dynatree-hidden",
combinedExpanderPrefix: "dynatree-exp-",
combinedIconPrefix: "dynatree-ico-",
nodeLoading: "dynatree-loading",
hasChildren: "dynatree-has-children",
active: "dynatree-active",
selected: "dynatree-selected",
expanded: "dynatree-expanded",
lazy: "dynatree-lazy",
focused: "dynatree-focused",
partsel: "dynatree-partsel",
lastsib: "dynatree-lastsib"
},
debugLevel: 1,
lastentry: undefined
}, parseFloat($.ui.version) < 1.8 && ($.ui.dynatree.defaults = $.ui.dynatree.prototype.options), $.ui.dynatree.nodedatadefaults = {
title: null,
key: null,
isFolder: !1,
isLazy: !1,
tooltip: null,
icon: null,
addClass: null,
noLink: !1,
activate: !1,
focus: !1,
expand: !1,
select: !1,
hideCheckbox: !1,
unselectable: !1,
children: null,
lastentry: undefined
};
var didRegisterDnd = !1, _registerDnd = function() {
if (didRegisterDnd) return;
$.ui.plugin.add("draggable", "connectToDynatree", {
start: function(a, b) {
var c = $(this).data("draggable"), d = b.helper.data("dtSourceNode") || null;
if (d) return c.offset.click.top = -2, c.offset.click.left = 16, d.tree._onDragEvent("start", d, null, a, b, c);
},
drag: function(a, b) {
var c = $(this).data("draggable"), d = b.helper.data("dtSourceNode") || null, e = b.helper.data("dtTargetNode") || null, f = getDtNodeFromElement(a.target);
if (a.target && !f) {
var g = $(a.target).closest("div.dynatree-drag-helper,#dynatree-drop-marker").length > 0;
if (g) return;
}
b.helper.data("dtTargetNode", f), e && e !== f && e.tree._onDragEvent("leave", e, d, a, b, c), f && (f.tree.options.dnd.onDrop ? f === e ? f.tree._onDragEvent("over", f, d, a, b, c) : f.tree._onDragEvent("enter", f, d, a, b, c) : noop());
},
stop: function(a, b) {
var c = $(this).data("draggable"), d = b.helper.data("dtSourceNode") || null, e = b.helper.data("dtTargetNode") || null, f = c._mouseDownEvent, g = a.type, h = g == "mouseup" && a.which == 1;
h || logMsg("Drag was cancelled"), e && (h && e.tree._onDragEvent("drop", e, d, a, b, c), e.tree._onDragEvent("leave", e, d, a, b, c)), d && d.tree._onDragEvent("stop", d, null, a, b, c);
}
}), didRegisterDnd = !0;
};
})(jQuery), jQuery && function() {
$.extend($.fn, {
contextMenu: function(a, b) {
return a.menu == undefined ? !1 : (a.inSpeed == undefined && (a.inSpeed = 150), a.outSpeed == undefined && (a.outSpeed = 75), a.inSpeed == 0 && (a.inSpeed = -1), a.outSpeed == 0 && (a.outSpeed = -1), $(this).each(function() {
var c = $(this), d = $(c).offset();
$("#" + a.menu).addClass("contextMenu"), $(this).mousedown(function(e) {
var f = e;
f.button == 2 && (f.stopPropagation(), $(this).mouseup(function(e) {
e.stopPropagation();
var f = $(this);
$(this).unbind("mouseup"), $(".contextMenu").hide();
var g = $("#" + a.menu);
if ($(c).hasClass("disabled")) return !1;
var h = {}, i, j;
self.innerHeight ? (h.pageYOffset = self.pageYOffset, h.pageXOffset = self.pageXOffset, h.innerHeight = self.innerHeight, h.innerWidth = self.innerWidth) : document.documentElement && document.documentElement.clientHeight ? (h.pageYOffset = document.documentElement.scrollTop, h.pageXOffset = document.documentElement.scrollLeft, h.innerHeight = document.documentElement.clientHeight, h.innerWidth = document.documentElement.clientWidth) : document.body && (h.pageYOffset = document.body.scrollTop, h.pageXOffset = document.body.scrollLeft, h.innerHeight = document.body.clientHeight, h.innerWidth = document.body.clientWidth), e.pageX ? i = e.pageX : i = e.clientX + h.scrollLeft, e.pageY ? j = e.pageY : j = e.clientY + h.scrollTop, $(document).unbind("click"), $(g).css({
top: j,
left: i
}).fadeIn(a.inSpeed), $(g).find("A").mouseover(function() {
$(g).find("LI.hover").removeClass("hover"), $(this).parent().addClass("hover");
}).mouseout(function() {
$(g).find("LI.hover").removeClass("hover");
}), $(document).keypress(function(a) {
switch (a.keyCode) {
case 38:
$(g).find("LI.hover").size() == 0 ? $(g).find("LI:last").addClass("hover") : ($(g).find("LI.hover").removeClass("hover").prevAll("LI:not(.disabled)").eq(0).addClass("hover"), $(g).find("LI.hover").size() == 0 && $(g).find("LI:last").addClass("hover"));
break;
case 40:
$(g).find("LI.hover").size() == 0 ? $(g).find("LI:first").addClass("hover") : ($(g).find("LI.hover").removeClass("hover").nextAll("LI:not(.disabled)").eq(0).addClass("hover"), $(g).find("LI.hover").size() == 0 && $(g).find("LI:first").addClass("hover"));
break;
case 13:
$(g).find("LI.hover A").trigger("click");
break;
case 27:
$(document).trigger("click");
}
}), $("#" + a.menu).find("A").unbind("click"), $("#" + a.menu).find("LI:not(.disabled) A").click(function() {
return $(document).unbind("click").unbind("keypress"), $(".contextMenu").hide(), b && b($(this).attr("href").substr(1), $(f), {
x: i - d.left,
y: j - d.top,
docX: i,
docY: j
}), !1;
}), setTimeout(function() {
$(document).click(function() {
return $(document).unbind("click").unbind("keypress"), $(g).fadeOut(a.outSpeed), !1;
});
}, 0);
}));
}), $.browser.mozilla ? $("#" + a.menu).each(function() {
$(this).css({
MozUserSelect: "none"
});
}) : $.browser.msie ? $("#" + a.menu).each(function() {
$(this).bind("selectstart.disableTextSelect", function() {
return !1;
});
}) : $("#" + a.menu).each(function() {
$(this).bind("mousedown.disableTextSelect", function() {
return !1;
});
}), $(c).add($("UL.contextMenu")).bind("contextmenu", function() {
return !1;
});
}), $(this));
},
disableContextMenuItems: function(a) {
return a == undefined ? ($(this).find("LI").addClass("disabled"), $(this)) : ($(this).each(function() {
if (a != undefined) {
var b = a.split(",");
for (var c = 0; c < b.length; c++) $(this).find('A[href="' + b[c] + '"]').parent().addClass("disabled");
}
}), $(this));
},
enableContextMenuItems: function(a) {
return a == undefined ? ($(this).find("LI.disabled").removeClass("disabled"), $(this)) : ($(this).each(function() {
if (a != undefined) {
var b = a.split(",");
for (var c = 0; c < b.length; c++) $(this).find('A[href="' + b[c] + '"]').parent().removeClass("disabled");
}
}), $(this));
},
disableContextMenu: function() {
return $(this).each(function() {
$(this).addClass("disabled");
}), $(this);
},
enableContextMenu: function() {
return $(this).each(function() {
$(this).removeClass("disabled");
}), $(this);
},
destroyContextMenu: function() {
return $(this).each(function() {
$(this).unbind("mousedown").unbind("mouseup");
}), $(this);
}
});
}(jQuery), jQuery.ajaxq = function(a, b) {
typeof document.ajaxq == "undefined" && (document.ajaxq = {
q: {},
r: null
}), typeof document.ajaxq.q[a] == "undefined" && (document.ajaxq.q[a] = []);
if (typeof b != "undefined") {
var c = {};
for (var d in b) c[d] = b[d];
b = c;
var e = b.complete;
b.complete = function(b, c) {
document.ajaxq.q[a].shift(), document.ajaxq.r = null, e && e(b, c), document.ajaxq.q[a].length > 0 && (document.ajaxq.r = jQuery.ajax(document.ajaxq.q[a][0]));
}, document.ajaxq.q[a].push(b), document.ajaxq.q[a].length == 1 && (document.ajaxq.r = jQuery.ajax(b));
} else document.ajaxq.r && (document.ajaxq.r.abort(), document.ajaxq.r = null), document.ajaxq.q[a] = [];
}, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_edit-version"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
d += '\n    <b>[Editing version]</b>\n    <a href="javascript:" class="set-default simple-button ', e = a.IS_DEV, e = c["if"].call(a, e, {
hash: {},
inverse: q.program(4, h, b),
fn: q.program(2, g, b)
});
if (e || e === 0) d += e;
d += ' action-gradient">\n      ', e = a.IS_DEV, e = c["if"].call(a, e, {
hash: {},
inverse: q.program(8, j, b),
fn: q.program(6, i, b)
});
if (e || e === 0) d += e;
return d += "\n    </a>\n  ", d;
}
function g(a, b) {
return "green";
}
function h(a, b) {
return "orange";
}
function i(a, b) {
return "\n        Commit local changes\n      ";
}
function j(a, b) {
return "\n        Publish to website\n      ";
}
function k(a, b) {
return "<b>[Currently live version]</b>";
}
function l(a, b) {
return "disabled";
}
function m(a, b) {
return "disabled";
}
c = c || a.helpers;
var n = "", o, p, q = this, r = "function", s = this.escapeExpression, t = c.blockHelperMissing;
n += '<div style="padding-bottom: 5px; font-size: 120%;">\n  <b><a href="/?version=', p = c.number, p ? o = p.call(b, {
hash: {}
}) : (o = b.number, o = typeof o === r ? o() : o), n += s(o) + '">Version #', p = c.number, p ? o = p.call(b, {
hash: {}
}) : (o = b.number, o = typeof o === r ? o() : o), n += s(o) + "</a>:</b>\n  ", p = c.edit, p ? o = p.call(b, {
hash: {},
inverse: q.noop,
fn: q.program(1, f, e)
}) : (o = b.edit, o = typeof o === r ? o() : o), c.edit || (o = t.call(b, o, {
hash: {},
inverse: q.noop,
fn: q.program(1, f, e)
}));
if (o || o === 0) n += o;
n += "\n  ", p = c["default"], p ? o = p.call(b, {
hash: {},
inverse: q.noop,
fn: q.program(10, k, e)
}) : (o = b["default"], o = typeof o === r ? o() : o), c["default"] || (o = t.call(b, o, {
hash: {},
inverse: q.noop,
fn: q.program(10, k, e)
}));
if (o || o === 0) n += o;
n += '\n  <div id="topictree-queue-progress-wrapper"><div id="topictree-queue-progress-bar"></div><div id="topictree-queue-progress-text"></div></div>\n  <a href="/api/v1/topicversion/edit/topictree" class="simple-button green action-gradient">Export to file</a>\n  <a href="javascript:" class="show-versions simple-button green action-gradient">View all versions</a>\n</div>\n<div>\n  <b>Title:</b> <input type="text" name="title" value="', p = c.title, p ? o = p.call(b, {
hash: {}
}) : (o = b.title, o = typeof o === r ? o() : o), n += s(o) + '" ', o = b.edit, o = c.unless.call(b, o, {
hash: {},
inverse: q.noop,
fn: q.program(12, l, e)
});
if (o || o === 0) n += o;
n += '></input>\n  <b>Description:</b> <input type="text" name="description" value="', p = c.description, p ? o = p.call(b, {
hash: {}
}) : (o = b.description, o = typeof o === r ? o() : o), n += s(o) + '" ', o = b.edit, o = c.unless.call(b, o, {
hash: {},
inverse: q.noop,
fn: q.program(14, m, e)
});
if (o || o === 0) n += o;
return n += "></input>\n  <b>Created:</b> ", p = c.created_on, p ? o = p.call(b, {
hash: {}
}) : (o = b.created_on, o = typeof o === r ? o() : o), n += s(o) + "\n  <b>Updated:</b> ", p = c.updated_on, p ? o = p.call(b, {
hash: {}
}) : (o = b.updated_on, o = typeof o === r ? o() : o), n += s(o) + " by ", p = c.last_edited_by, p ? o = p.call(b, {
hash: {}
}) : (o = b.last_edited_by, o = typeof o === r ? o() : o), n += s(o) + "\n</div>\n", n;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_edit-topic"] = a(function(a, b, c, d, e) {
function f(a, b) {
return '\n          <td colspan="2">Changes are saved to the <strong>editing version</strong> of the site when you click the Save button above.</td>\n        ';
}
function g(a, b) {
return '\n          <td colspan="2">Changes cannot be made to this version. Only the editing version can be changed.</td>\n        ';
}
function h(a, b) {
return "checked";
}
c = c || a.helpers;
var i = "", j, k = "function", l = this.escapeExpression, m = this;
i += '<div>\n  <img src="/images/leaf.png" width="49" height="43" style="vertical-align: middle">\n  <input type="text" name="title" class="node-title simple-input ui-corner-all blur-on-esc" value="', j = b.model, j = j == null || j === !1 ? j : j.title, j = typeof j === k ? j() : j, i += l(j) + '">\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n<div>\n  <a href="javascript:" data-id="add_new_topic" class="item-action left-align simple-button blue action-gradient">Add subtopic</a>\n\n  <a href="javascript:" data-id="add_new_video" class="item-action left-align separated simple-button blue action-gradient">Add new video</a>\n  <a href="javascript:" data-id="add_existing_video" class="item-action left-align simple-button blue action-gradient">Add existing video</a>\n\n  <a href="javascript:" data-id="add_new_exercise" class="item-action left-align separated simple-button blue action-gradient">Add new exercise</a>\n  <a href="javascript:" data-id="add_existing_exercise" class="item-action left-align simple-button blue action-gradient">Add existing exercise</a>\n\n  <a href="javascript:" data-id="add_new_url" class="item-action left-align separated simple-button blue action-gradient">Add new URL</a>\n\n  <a href="javascript:" data-id="delete_topic" class="item-action left-align separated simple-button blue action-gradient">Delete topic</a>\n  <a href="javascript:" data-id="ungroup_topic" class="item-action left-align separated simple-button blue action-gradient">Ungroup topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n  <div>\n    <table class="node-properties">\n\n      <tr>\n        ', j = b.version, j = j == null || j === !1 ? j : j.edit, j = c["if"].call(b, j, {
hash: {},
inverse: m.program(3, g, e),
fn: m.program(1, f, e)
});
if (j || j === 0) i += j;
i += '\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">View</td>\n        <td style="padding-bottom:9px;">\n          <a href="', j = b.model, j = j == null || j === !1 ? j : j.ka_url, j = typeof j === k ? j() : j, i += l(j) + '" target="_blank">Open ', j = b.model, j = j == null || j === !1 ? j : j.title, j = typeof j === k ? j() : j, i += l(j) + ' in new tab</a>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Standalone Title</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="standalone_title" value="', j = b.model, j = j == null || j === !1 ? j : j.standalone_title, j = typeof j === k ? j() : j, i += l(j) + '" maxlength="128"/><br/>\n          <em>Title that is displayed when this topic is displayed on its own, not in the context of the topic tree.</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Slug</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="id" value="', j = b.model, j = j == null || j === !1 ? j : j.id, j = typeof j === k ? j() : j, i += l(j) + '" class="short" maxlength="32"/><br/>\n          <em>Short identifier used as a key for the API and in URLs linking to this topic</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Hidden</td>\n        <td style="padding-bottom:9px;">\n          <input type="checkbox" name="hide" ', j = b.model, j = j == null || j === !1 ? j : j.hide, j = c["if"].call(b, j, {
hash: {},
inverse: m.noop,
fn: m.program(5, h, e)
});
if (j || j === 0) i += j;
return i += ' /><br/>\n          <em>If checked, this topic will not be visible on the site.</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Description</td>\n        <td style="padding-bottom:9px;">\n          <textarea name="description" rows = 5 cols=60>', j = b.model, j = j == null || j === !1 ? j : j.description, j = typeof j === k ? j() : j, i += l(j) + '</textarea><br/>\n          <em>Description text visible in topic listings</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Tags</td>\n        <td style="padding-bottom:9px;">\n          <div class="tags-list"></div>\n\n          <input class="add-tag" type="text" value="" maxlength="32" placeholder="- Add tag" class="placeholder short" /> \n          <a href="javascript:" data-id="add-tag" class="item-action simple-button action-gradient">Add</a>\n        </td>\n      </tr>\n\n    </table>\n  </div>\n</div>\n', i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_create-video"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div class="create-video modal fade hide">\n    <div class="modal-header">\n        <span class="title">Add video</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n\n      <div>\n        <label for="youtube_id" style="font-weight: bold;">Youtube ID</label>\n        <input type="text" name="youtube_id" size="40" />\n      </div>\n\n      <div class="create-video-preview">\n        Enter a YouTube ID to look up a video.\n      </div>\n\n      <a class="ok-button simple-button disabled action-gradient" href="javascript:void(0)" style="float: right">Add video</a>\n\n    </div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_create-video-preview"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "\n<div>\n  <em>Video already exists in library. A new reference will be created.</em>\n</div>\n";
}
c = c || a.helpers;
var g = "", h, i, j = "function", k = this.escapeExpression, l = this;
g += '<object id="idOVideo" name="idOVideo" width="400" height="240" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">\n    <param name="movie" value="http://www.youtube.com/v/', i = c.youtube_id, i ? h = i.call(b, {
hash: {}
}) : (h = b.youtube_id, h = typeof h === j ? h() : h), g += k(h) + '&hl=en_US&fs=1&rel=0&hd=1&border=0&enablejsapi=1">\n    <param name="allowFullScreen" value="true">\n    <param name="allowScriptAccess" value="always">\n    <param name="wmode" value="transparent">\n    <embed id="idPlayer" name="idPlayer" wmode="transparent" src="http://www.youtube.com/v/', i = c.youtube_id, i ? h = i.call(b, {
hash: {}
}) : (h = b.youtube_id, h = typeof h === j ? h() : h), g += k(h) + '&hl=en_US&fs=1&rel=0&hd=1&border=0&enablejsapi=1" type="application/x-shockwave-flash" allowScriptAccess="always" allowfullscreen="true" width="400" height="240">\n</object>\n\n', h = b.existing, h = c["if"].call(b, h, {
hash: {},
inverse: l.noop,
fn: l.program(1, f, e)
});
if (h || h === 0) g += h;
return g += "\n\n<div>\n  <b>Title:</b> ", i = c.title, i ? h = i.call(b, {
hash: {}
}) : (h = b.title, h = typeof h === j ? h() : h), g += k(h) + "\n</div>\n\n<div>\n  <b>Slug:</b> ", i = c.readable_id, i ? h = i.call(b, {
hash: {}
}) : (h = b.readable_id, h = typeof h === j ? h() : h), g += k(h) + "\n</div>\n\n<div>\n  <b>Description:</b> ", i = c.description, i ? h = i.call(b, {
hash: {}
}) : (h = b.description, h = typeof h === j ? h() : h), g += k(h) + "\n</div>\n\n<div>\n  <b>Keywords:</b> ", i = c.keywords, i ? h = i.call(b, {
hash: {}
}) : (h = b.keywords, h = typeof h === j ? h() : h), g += k(h) + "\n</div>\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_edit-video"] = a(function(a, b, c, d, e) {
function f(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.title, d = typeof d === m ? d() : d, c += n(d) + '" maxlength="32"/></span><br/>', c;
}
function g(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.readable_id, d = typeof d === m ? d() : d, c += n(d) + '" maxlength="64"/></span><br/>', c;
}
function h(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.youtube_id, d = typeof d === m ? d() : d, c += n(d) + '" maxlength="11" class="short"/></span><br/>', c;
}
function i(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.description, d = typeof d === m ? d() : d, c += n(d) + '" maxlength="256"/></span><br/>', c;
}
function j(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.keywords, d = typeof d === m ? d() : d, c += n(d) + '" maxlength="256"/></span><br/>', c;
}
c = c || a.helpers;
var k = "", l, m = "function", n = this.escapeExpression, o = this;
k += '<div>\n  <img src="/images/video-camera-icon-shadow.png" width="48" height="48" style="vertical-align: middle">\n  <input type="text" name="title" class="node-title simple-input ui-corner-all blur-on-esc" value="', l = b.model, l = l == null || l === !1 ? l : l.title, l = typeof l === m ? l() : l, k += n(l) + '">\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n', l = b.oldValues, l = l == null || l === !1 ? l : l.title, l = c["if"].call(b, l, {
hash: {},
inverse: o.noop,
fn: o.program(1, f, e)
});
if (l || l === 0) k += l;
k += '\n    \n<div>\n  <a href="javascript:" data-id="remove_item" class="item-action left-align simple-button blue action-gradient">Remove from topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n  <div>\n    <table class="node-properties">\n\n      <tr>\n        <td colspan="2">Changes are saved to the <strong>editing version</strong> of the site when you click the Save button above.</td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">View</td>\n        <td style="padding-bottom:9px;">\n          <a href="', l = b.model, l = l == null || l === !1 ? l : l.ka_url, l = typeof l === m ? l() : l, k += n(l) + '" target="_blank">Open ', l = b.model, l = l == null || l === !1 ? l : l.title, l = typeof l === m ? l() : l, k += n(l) + ' in new tab</a>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Slug</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="readable_id" value="', l = b.model, l = l == null || l === !1 ? l : l.readable_id, l = typeof l === m ? l() : l, k += n(l) + '" maxlength="64"/><br/>\n          ', l = b.oldValues, l = l == null || l === !1 ? l : l.readable_id, l = c["if"].call(b, l, {
hash: {},
inverse: o.noop,
fn: o.program(3, g, e)
});
if (l || l === 0) k += l;
k += '\n          <em>Short identifier used as a key for the API and in URLs linking to this video</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">YouTube ID</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="youtube_id" value="', l = b.model, l = l == null || l === !1 ? l : l.youtube_id, l = typeof l === m ? l() : l, k += n(l) + '" maxlength="11" class="short" /><br/>\n          ', l = b.oldValues, l = l == null || l === !1 ? l : l.youtube_id, l = c["if"].call(b, l, {
hash: {},
inverse: o.noop,
fn: o.program(5, h, e)
});
if (l || l === 0) k += l;
k += '\n          <em>ID of this video on YouTube</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Description</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="description" value="', l = b.model, l = l == null || l === !1 ? l : l.description, l = typeof l === m ? l() : l, k += n(l) + '" maxlength="256"/><br/>\n          ', l = b.oldValues, l = l == null || l === !1 ? l : l.description, l = c["if"].call(b, l, {
hash: {},
inverse: o.noop,
fn: o.program(7, i, e)
});
if (l || l === 0) k += l;
k += '\n          <em>Description text visible in topic listings</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Keywords</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="keywords" value="', l = b.model, l = l == null || l === !1 ? l : l.keywords, l = typeof l === m ? l() : l, k += n(l) + '" maxlength="256"/><br/>\n          ', l = b.oldValues, l = l == null || l === !1 ? l : l.keywords, l = c["if"].call(b, l, {
hash: {},
inverse: o.noop,
fn: o.program(9, j, e)
});
if (l || l === 0) k += l;
return k += "\n          <em>Terms to include when indexing this video for searching</em>\n        </td>\n      </tr>\n\n    </table>\n  </div>\n</div>\n", k;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_create-exercise"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div class="create-exercise modal fade hide">\n    <div class="modal-header">\n        <span class="title">Add exercise</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n\n      <div>\n        <label for="name" style="font-weight: bold;">Name (file name without .html)</label>\n        <input type="text" name="name" size="40" />\n      </div>\n\n      <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">Add exercise</a>\n\n    </div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_edit-exercise"] = a(function(a, b, c, d, e) {
function f(a, b) {
return 'checked="checked"';
}
function g(a, b) {
return 'checked="checked"';
}
function h(a, b) {
var d = "", e;
d += '<span class="old-value">Old value: <input type="text" disabled value="', e = a.oldValues, e = e == null || e === !1 ? e : e.live, e = c["if"].call(a, e, {
hash: {},
inverse: y.program(8, j, b),
fn: y.program(6, i, b)
});
if (e || e === 0) d += e;
return d += '"/></span><br/>', d;
}
function i(a, b) {
return "Live";
}
function j(a, b) {
return "Developers Only";
}
function k(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.short_display_name, d = typeof d === z ? d() : d, c += A(d) + '" maxlength="11"/></span><br/>', c;
}
function l(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.v_position, d = typeof d === z ? d() : d, c += A(d) + '" class="short"/></span><br/>', c;
}
function m(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.h_position, d = typeof d === z ? d() : d, c += A(d) + '" class="short"/></span><br/>', c;
}
function n(a, b) {
var d = "", e;
d += "\n                    ", e = a.oldValues, e = e == null || e === !1 ? e : e.prerequisites, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(17, o, b)
});
if (e || e === 0) d += e;
return d += "\n                  ", d;
}
function o(a, b) {
var c = "";
return c += '\n                      <span class="old-value">Old value: <input type="text" disabled value="', a = typeof a === z ? a() : a, c += A(a) + '" maxlength="256"/></span><br/>\n                    ', c;
}
function p(a, b) {
var d = "", e;
d += "\n                    ", e = a.oldValues, e = e == null || e === !1 ? e : e.covers, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(20, q, b)
});
if (e || e === 0) d += e;
return d += "\n                  ", d;
}
function q(a, b) {
var c = "";
return c += '\n                      <span class="old-value">Old value: <input type="text" disabled value="', a = typeof a === z ? a() : a, c += A(a) + '" maxlength="256"/></span><br/>\n                    ', c;
}
function r(a, b) {
var d = "", e;
d += "\n                    ", e = a.oldValues, e = e == null || e === !1 ? e : e.related_video_readable_ids, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(23, s, b)
});
if (e || e === 0) d += e;
return d += "\n                  ", d;
}
function s(a, b) {
var c = "";
return c += '\n                      <span class="old-value">Old value: <input type="text" disabled value="', a = typeof a === z ? a() : a, c += A(a) + '" maxlength="256"/></span><br/>\n                    ', c;
}
function t(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.description, d = typeof d === z ? d() : d, c += A(d) + '" maxlength="256"/></span><br/>', c;
}
function u(a, b) {
var d = "", e;
d += "\n                    ", e = a.oldValues, e = e == null || e === !1 ? e : e.tags, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(28, v, b)
});
if (e || e === 0) d += e;
return d += "\n                  ", d;
}
function v(a, b) {
var c = "";
return c += '\n                      <span class="old-value">Old value: <input type="text" disabled value="', a = typeof a === z ? a() : a, c += A(a) + '" maxlength="256"/></span><br/>\n                    ', c;
}
c = c || a.helpers;
var w = "", x, y = this, z = "function", A = this.escapeExpression;
w += '<div>\n  <img src="/images/generic-exercise-icon-shadow.png" width="48" height="48" style="vertical-align: middle">\n  <span class="node-title">', x = b.model, x = x == null || x === !1 ? x : x.display_name, x = typeof x === z ? x() : x, w += A(x) + '</span>\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n<div>\n  <a href="javascript:" data-id="remove_item" class="item-action left-align simple-button blue action-gradient">Remove from topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n    <div>\n        <table class="node-properties">\n\n          <tr>\n            <td colspan="2">Changes are saved to the <strong>editing version</strong> of the site when you click the Save button above.</td>\n          </tr>\n\n            <tr>\n                <td style="font-weight:bold;">View</td>\n                <td style="padding-bottom:9px;">\n                    <a href="', x = b.model, x = x == null || x === !1 ? x : x.relative_url, x = typeof x === z ? x() : x, w += A(x) + '" target="_blank">Open ', x = b.model, x = x == null || x === !1 ? x : x.display_name, x = typeof x === z ? x() : x, w += A(x) + ' in new tab</a>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Status</td>\n                <td style="padding-bottom:9px;">\n                    <label for="live_yes">Live&nbsp;</label><input type="radio" id="live_yes" name="live" value="true" ', x = b.model, x = x == null || x === !1 ? x : x.live, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(1, f, e)
});
if (x || x === 0) w += x;
w += '/>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                    <label for="live_no">Developers only&nbsp;</label><input type="radio" id="live_no" name="live" value="false" ', x = b.model, x = x == null || x === !1 ? x : x.live, x = c.unless.call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(3, g, e)
});
if (x || x === 0) w += x;
w += "/>\n                    <br/>\n                    ", x = b.oldValues, x = x == null || x === !1 ? x : x.live, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(5, h, e)
});
if (x || x === 0) w += x;
w += '\n                    <em>Non-live exercises are completely hidden from normal users.</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Short name</td>\n                <td style="padding-bottom:9px;">\n                    <input type="text" name="short_display_name" value="', x = b.model, x = x == null || x === !1 ? x : x.short_display_name, x = typeof x === z ? x() : x, w += A(x) + '" maxlength="11"/><br/>\n                    ', x = b.oldValues, x = x == null || x === !1 ? x : x.short_display_name, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(10, k, e)
});
if (x || x === 0) w += x;
w += '\n                    <em>Short name is used in some UI elements that are too small to display the full exercise name (11 chars max).</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Horizontal position</td>\n                <td style="padding-bottom:9px;">\n                    <input type="text" name="v_position" value="', x = b.model, x = x == null || x === !1 ? x : x.v_position, x = typeof x === z ? x() : x, w += A(x) + '" class="short" /></br>\n                    ', x = b.oldValues, x = x == null || x === !1 ? x : x.v_position, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(12, l, e)
});
if (x || x === 0) w += x;
w += '\n                    <em>Bigger numbers move this exercise to the right on the knowledge map.</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Vertical position</td>\n                <td style="padding-bottom:9px;">\n                    <input type="text" name="h_position" value="', x = b.model, x = x == null || x === !1 ? x : x.h_position, x = typeof x === z ? x() : x, w += A(x) + '" class="short" /></br>\n                    ', x = b.oldValues, x = x == null || x === !1 ? x : x.h_position, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(14, m, e)
});
if (x || x === 0) w += x;
w += '\n                    <em>Bigger numbers move this exercise down the knowledge map.</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Prerequisites</td>\n                <td style="padding-bottom:9px;">\n                    <div class="exercise-prereqs-list"></div>\n\n                    <a href="javascript:" data-id="add-prereq" class="item-action simple-button action-gradient">Add prerequisite exercise</a>\n                    <br/>\n\n                    <em>This exercise will be suggested once these prereqs are completed.</em><br/>\n                  ', x = b.oldValues, x = x == null || x === !1 ? x : x.prerequisites, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(16, n, e)
});
if (x || x === 0) w += x;
w += '\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Covered exercises</td>\n                <td style="padding-bottom:9px;">\n                    <div class="exercise-covers-list"></div>\n\n                    <a href="javascript:" data-id="add-cover" class="item-action simple-button action-gradient">Add a covered exercise</a>\n                    <br/>\n\n                    <em>Achieving proficiency in this exercise will give proficiency in all covered exercises.</em>\n                  ', x = b.oldValues, x = x == null || x === !1 ? x : x.covers, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(19, p, e)
});
if (x || x === 0) w += x;
w += '\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Related Videos</td>\n                <td style="padding-bottom:9px;">\n                    <div class="exercise-videos-list"></div>\n\n                    <div><a href="javascript:" data-id="add-video" class="item-action simple-button action-gradient">Add a related video</a></div>\n\n                    <em>If the student is struggling on this exercise, we refer them to these related videos.</em>\n                  ', x = b.oldValues, x = x == null || x === !1 ? x : x.related_video_readable_ids, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(22, r, e)
});
if (x || x === 0) w += x;
w += '\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Description</td>\n                <td style="padding-bottom:9px;">\n                <input type="text" name="description" value="', x = b.model, x = x == null || x === !1 ? x : x.description, x = typeof x === z ? x() : x, w += A(x) + '" maxlength="256"/><br/>\n                ', x = b.oldValues, x = x == null || x === !1 ? x : x.description, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(25, t, e)
});
if (x || x === 0) w += x;
w += '\n                <em>Description text visible in topic listings</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Tags</td>\n                <td style="padding-bottom:9px;">\n                    <div class="tags-list"></div>\n\n                    <input class="add-tag" type="text" value="" maxlength="32" placeholder="- Add tag" class="placeholder short" /> \n                    <a href="javascript:" data-id="add-tag" class="item-action simple-button action-gradient">Add</a>\n                  ', x = b.oldValues, x = x == null || x === !1 ? x : x.tags, x = c["if"].call(b, x, {
hash: {},
inverse: y.noop,
fn: y.program(27, u, e)
});
if (x || x === 0) w += x;
return w += "\n                </td>\n            </tr>\n\n\n            </table>\n\n    </div>\n</div>\n", w;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_add-existing-item"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div class="add-existing-item modal fade hide">\n    <div class="modal-header">\n        <span class="title"></span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        <a class="show-recent simple-button action-gradient" href="javascript:void(0)">Show Recent</a>\n        <input name="item-search" type="text" /> <a class="do-search simple-button action-gradient" href="javascript:void(0)">Search</a>\n<br />\n        <span class="search-description"></span> <br />\n        <select class="search-results" size="20"></select> <br />\n        <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">Select</a>\n        <div style="clear: both"></div>\n    </div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_create-url"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div class="create-url modal fade hide">\n    <div class="modal-header">\n        <span class="title">Add external URL</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n\n      <div>\n        <label for="title" style="font-weight: bold;">Title</label>\n        <input type="text" name="title" size="256" style="width: 300px;" />\n      </div>\n\n      <div>\n        <label for="url" style="font-weight: bold;">URL</label>\n        <input type="text" name="url" size="256" style="width: 500px;" />\n      </div>\n\n      <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">Add URL</a>\n\n    </div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_edit-url"] = a(function(a, b, c, d, e) {
function f(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.title, d = typeof d === l ? d() : d, c += m(d) + '" maxlength="32"/></span><br/>', c;
}
function g(a, b) {
var c = "", d;
return c += '<span class="old-value">Old value: <input type="text" disabled value="', d = a.oldValues, d = d == null || d === !1 ? d : d.url, d = typeof d === l ? d() : d, c += m(d) + '" maxlength="256"/></span><br/>', c;
}
function h(a, b) {
var d = "", e;
d += "\n            ", e = a.oldValues, e = e == null || e === !1 ? e : e.tags, e = c.each.call(a, e, {
hash: {},
inverse: n.noop,
fn: n.program(6, i, b)
});
if (e || e === 0) d += e;
return d += "\n          ", d;
}
function i(a, b) {
var c = "";
return c += '\n              <span class="old-value">Old value: <input type="text" disabled value="', a = typeof a === l ? a() : a, c += m(a) + '" maxlength="256"/></span><br/>\n            ', c;
}
c = c || a.helpers;
var j = "", k, l = "function", m = this.escapeExpression, n = this;
j += '<div>\n  <img src="/images/link-icon.png" width="75" height="64" style="vertical-align: middle">\n  <input type="text" name="title" class="node-title simple-input ui-corner-all blur-on-esc" value="', k = b.model, k = k == null || k === !1 ? k : k.title, k = typeof k === l ? k() : k, j += m(k) + '">\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n', k = b.oldValues, k = k == null || k === !1 ? k : k.title, k = c["if"].call(b, k, {
hash: {},
inverse: n.noop,
fn: n.program(1, f, e)
});
if (k || k === 0) j += k;
j += '\n\n<div>\n  <a href="javascript:" data-id="remove_item" class="item-action left-align simple-button blue action-gradient">Remove from topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n  <div>\n    <table class="node-properties">\n\n      <tr>\n        <td colspan="2">Changes are saved to the <b>live version</b> of the site when you click the Save button above.</td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">View</td>\n        <td style="padding-bottom:9px;">\n          <a href="', k = b.model, k = k == null || k === !1 ? k : k.url, k = typeof k === l ? k() : k, j += m(k) + '" target="_blank">Open ', k = b.model, k = k == null || k === !1 ? k : k.title, k = typeof k === l ? k() : k, j += m(k) + ' in new tab</a>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">URL</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="url" value="', k = b.model, k = k == null || k === !1 ? k : k.url, k = typeof k === l ? k() : k, j += m(k) + '" maxlength="256"/><br/>\n          ', k = b.oldValues, k = k == null || k === !1 ? k : k.url, k = c["if"].call(b, k, {
hash: {},
inverse: n.noop,
fn: n.program(3, g, e)
});
if (k || k === 0) j += k;
j += '\n          <em>URL to link to</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Tags</td>\n        <td style="padding-bottom:9px;">\n          <div class="tags-list"></div>\n\n          <input class="add-tag" type="text" value="" maxlength="32" placeholder="- Add tag" class="placeholder short" /> \n          <a href="javascript:" data-id="add-tag" class="item-action simple-button action-gradient">Add</a>\n          <br/>\n\n          ', k = b.oldValues, k = k == null || k === !1 ? k : k.tags, k = c["if"].call(b, k, {
hash: {},
inverse: n.noop,
fn: n.program(5, h, e)
});
if (k || k === 0) j += k;
return j += "\n\n          <em>Terms to include when indexing this video for searching</em>\n        </td>\n      </tr>\n\n    </table>\n  </div>\n</div>\n", j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_list-versions"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div class="list-versions modal fade hide">\n    <div class="modal-header">\n        <span class="title">View topic tree versions</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        <div class="version-list">\n            Loading...\n        </div>\n        <div style="clear: both"></div>\n    </div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_list-versions-item"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "\n      <strong>[Editing version]</strong>\n    ";
}
function g(a, b) {
return "<strong>[Currently live version]</strong>";
}
c = c || a.helpers;
var h = "", i, j, k = "function", l = this.escapeExpression, m = this, n = c.blockHelperMissing;
h += '<div>\n  <a href="javascript:" class="edit-version simple-button green action-gradient" style="float: right">View this version</a>\n  <div><strong>Version #', j = c.number, j ? i = j.call(b, {
hash: {}
}) : (i = b.number, i = typeof i === k ? i() : i), h += l(i) + ':</strong> "', j = c.title, j ? i = j.call(b, {
hash: {}
}) : (i = b.title, i = typeof i === k ? i() : i), h += l(i) + '"\n    ', j = c.edit, j ? i = j.call(b, {
hash: {},
inverse: m.noop,
fn: m.program(1, f, e)
}) : (i = b.edit, i = typeof i === k ? i() : i), c.edit || (i = n.call(b, i, {
hash: {},
inverse: m.noop,
fn: m.program(1, f, e)
}));
if (i || i === 0) h += i;
h += "\n    ", j = c["default"], j ? i = j.call(b, {
hash: {},
inverse: m.noop,
fn: m.program(3, g, e)
}) : (i = b["default"], i = typeof i === k ? i() : i), c["default"] || (i = n.call(b, i, {
hash: {},
inverse: m.noop,
fn: m.program(3, g, e)
}));
if (i || i === 0) h += i;
return h += '\n  </div>\n  <div style="margin-left: 20px;"><strong>Description:</strong> ', j = c.description, j ? i = j.call(b, {
hash: {}
}) : (i = b.description, i = typeof i === k ? i() : i), h += l(i) + '</div>\n  <div style="margin-left: 20px;"><strong>Created:</strong> ', j = c.created_on, j ? i = j.call(b, {
hash: {}
}) : (i = b.created_on, i = typeof i === k ? i() : i), h += l(i) + '</div>\n  <div style="margin-left: 20px;"><strong>Updated:</strong> ', j = c.updated_on, j ? i = j.call(b, {
hash: {}
}) : (i = b.updated_on, i = typeof i === k ? i() : i), h += l(i) + " by ", j = c.last_edited_by, j ? i = j.call(b, {
hash: {}
}) : (i = b.last_edited_by, i = typeof i === k ? i() : i), h += l(i) + "</div>\n</div>\n", h;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_search-topics"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div style="width: 500px" id="topic-search-bar">\n  <img class="search-button" src="/images/jquery-mobile/icon-search-black.png" width="16" height="16">\n  <div class="search-panel" style="display: none;">\n    <input value="" style="width: 150px; height: 14px; margin-top: 2px;"></input>\n    <img class="next-button" src="/images/vote-down-gray.png" width="18" height="13" style="float: right; margin-top: 5px;">\n    <img class="prev-button" src="/images/vote-up-gray.png" width="18" height="13" style="float: right; margin-top: 5px;">\n  </div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topicsadmin-package_import-export"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "Import topic into tree";
}
function g(a, b) {
return "Export topic";
}
function h(a, b) {
return "Paste exported topic data here:<br />";
}
function i(a, b) {
return "Import";
}
function j(a, b) {
return "Close";
}
c = c || a.helpers;
var k = "", l, m = this;
k += '<div class="import-export modal fade hide">\n    <div class="modal-header">\n        <span class="title">', l = b["import"], l = c["if"].call(b, l, {
hash: {},
inverse: m.program(3, g, e),
fn: m.program(1, f, e)
});
if (l || l === 0) k += l;
k += '</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        ', l = b["import"], l = c["if"].call(b, l, {
hash: {},
inverse: m.noop,
fn: m.program(5, h, e)
});
if (l || l === 0) k += l;
k += '\n        <textarea class="topic-data" cols="80" rows="30" /><br />\n        <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">', l = b["import"], l = c["if"].call(b, l, {
hash: {},
inverse: m.program(9, j, e),
fn: m.program(7, i, e)
});
if (l || l === 0) k += l;
return k += '</a>\n        <div style="clear: both"></div>\n    </div>\n</div>\n', k;
});
}();

var debugNodeIDs = !1, TopicTreeEditor = {
dynatree: null,
topicTree: null,
boundList: [],
maxProgressLength: 0,
currentVersion: null,
versionEditTemplate: Templates.get("topicsadmin.edit-version"),
searchView: null,
currentEditor: null,
itemCopyBuffer: null,
createEditor: function(a) {
return a == "Topic" ? new TopicTreeEditor.TopicEditor : a == "Video" ? new TopicTreeEditor.VideoEditor : a == "Exercise" ? new TopicTreeEditor.ExerciseEditor : a == "Url" ? new TopicTreeEditor.UrlEditor : null;
},
init: function(a) {
this.topicTree = a.getTopicTree(), this.currentVersion = a, $("#topic_tree").dynatree({
imagePath: "/images/",
onActivate: function(a) {
KAConsole.log("Activated: ", a), TopicTreeEditor.currentEditor && (TopicTreeEditor.currentEditor.hide(), TopicTreeEditor.currentEditor = null);
if (a.data.kind != "Topic" || a.data.id != "root") TopicTreeEditor.currentEditor = TopicTreeEditor.createEditor(a.data.kind);
TopicTreeEditor.currentEditor ? (TopicTreeEditor.currentEditor.init(a), TopicTreeEditor.currentEditor.show()) : $("#details-view").html("");
},
onCreate: function(a, b) {
a.data.kind == "Topic" && $(b).contextMenu({
menu: "topic_context_menu"
}, function(b, c, d) {
TopicTreeEditor.topicTree.fetchByID(a.data.id, function() {
TopicTreeEditor.createEditor(a.data.kind).init(a).handleAction(b);
});
});
if (_.include([ "Video", "Exercise", "Url" ], a.data.kind)) {
if (a.parent.data.key == "ChangedContent") var c = "content_change_context_menu"; else var c = "item_context_menu";
$(b).contextMenu({
menu: c
}, function(b, c, d) {
TopicTreeEditor.createEditor(a.data.kind).init(a).setParentModel(TopicTreeEditor.topicTree.get(a.parent.data.id)).handleAction(b);
});
}
},
onExpand: function(a, b) {
a && b.activate();
},
onLazyRead: function(a) {
a.data.key == "UnrefContent" ? $.ajaxq("topics-admin", {
url: "/api/v1/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/unused_content",
success: function(b) {
a.removeChildren(), childNodes = [], _.each(b, function(a) {
var b = new TopicChild(a);
childNodes.push(TopicTreeEditor.createChild(b));
}), a.addChild(childNodes);
},
error: TopicTreeEditor.handleError
}) : a.data.key == "ChangedContent" ? $.ajaxq("topics-admin", {
url: "/api/v1/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/changelist",
success: function(b) {
a.removeChildren(), childNodes = [], _.each(b, function(a) {
var b = new TopicChild(a.content), c = {};
_.each(a.content_changes, function(b, d) {
_.isArray(a.content[d]) || _.isArray(b) ? a.content[d] && a.content[d].length > 0 ? c[d] = a.content[d] : c[d] = [ "(No old values)" ] : a.content[d] ? c[d] = a.content[d] : c[d] = "NULL";
}), b.model.oldValues = c, b.model.changeUser = a.last_edited_by, childNodes.push(TopicTreeEditor.createChild(b));
}), a.addChild(childNodes);
},
error: TopicTreeEditor.handleError
}) : TopicTreeEditor.topicTree.fetchByID(a.data.id, TopicTreeEditor.refreshTreeNode);
},
dnd: {
onDragStart: function(a) {
return TopicTreeEditor.currentVersion.get("edit");
},
onDragEnter: function(a, b) {
return a.data.key == "UnrefContent" || a.parent.data.key == "UnrefContent" || a.data.key == "ChangedContent" || a.parent.data.key == "ChangedContent" ? [] : a.data.kind != "Topic" ? [ "before", "after" ] : [ "over", "before", "after" ];
},
onDragLeave: function(a, b) {},
onDragOver: function(a, b, c) {},
onDrop: function(a, b, c, d, e) {
var f = b.parent;
b.move(a, c);
var g = b.parent;
if (f.data.key == "UnrefContent" || f.data.key == "ChangedContent") TopicTreeEditor.addItemToTopic(b.data.kind, b.data.id, b.data.title, g, TopicTreeEditor.topicTree.get(g.data.id), _.indexOf(g.childList, b)); else {
var h = {
kind: b.data.kind,
id: b.data.id,
new_parent_id: g.data.id,
new_parent_pos: _.indexOf(g.childList, b)
};
TopicTreeEditor.moveItem(f.data.id, h);
}
}
},
children: [ {
title: "Loading...",
key: "Topic/root",
id: "root",
kind: "Topic",
isFolder: !0,
isLazy: !0,
icon: "topictree-icon-small.png"
}, {
title: "Unreferenced Content",
key: "UnrefContent",
id: "",
kind: "",
isFolder: !0,
isLazy: !0,
icon: "topictree-icon-small.png"
}, {
title: "Changed Content",
key: "ChangedContent",
id: "",
kind: "",
isFolder: !0,
isLazy: !0,
icon: "topictree-icon-small.png"
} ]
}), TopicTreeEditor.dynatree = $("#topic_tree").dynatree("getTree"), $("#topic_tree").bind("mousedown", function(a) {
a.preventDefault();
}), $("#details-view").html(""), $("#topicversion-editor").html(TopicTreeEditor.versionEditTemplate(_.extend({
IS_DEV: !1
}, a.toJSON()))).delegate("a.set-default", "click", TopicTreeEditor.setTreeDefault).delegate("a.show-versions", "click", TopicTreeEditor.showVersionList), $("#topicversion-editor").delegate('input[type="text"]', "change", function() {
if (TopicTreeEditor.currentVersion.get("edit")) {
var b = $(this).attr("name");
if (b) {
var c = $(this).val(), d = {};
d[b] = c, a.save(d);
}
}
}), $("#topictree-queue-progress-bar").progressbar({
value: 0,
disable: !0
}), $("#topictree-queue-progress-text").html(""), this.searchView || (this.searchView = new TopicTreeEditor.SearchView, $(this.searchView.el).appendTo(document.body));
var b = this;
$(window).resize(function() {
b.resize();
}), this.resize(), TopicTreeEditor.topicTree.bind("add", this.treeUpdate, TopicTreeEditor.topicTree), TopicTreeEditor.topicTree.bind("remove", this.treeUpdate, TopicTreeEditor.topicTree), TopicTreeEditor.topicTree.bind("clear", this.treeUpdate, TopicTreeEditor.topicTree);
var c = TopicTreeEditor.topicTree.getRoot();
c.bind("change", this.refreshTreeNode), c.__inited && this.refreshTreeNode.call(null, c), this.updateProgressBar();
},
updateProgressBar: function() {
if (document.ajaxq && document.ajaxq.q["topics-admin"] && document.ajaxq.q["topics-admin"].length > 0) {
$("#topictree-queue-progress-bar").progressbar("enable");
var a = document.ajaxq.q["topics-admin"].length;
TopicTreeEditor.maxProgressLength < a && (TopicTreeEditor.maxProgressLength = a);
var b = (1 - a / TopicTreeEditor.maxProgressLength) * 100, c = TopicTreeEditor.maxProgressLength - a + 1;
$("#topictree-queue-progress-bar").progressbar("value", b), $("#topictree-queue-progress-text").html("Updating (" + c + " / " + TopicTreeEditor.maxProgressLength + ")");
} else TopicTreeEditor.maxProgressLength > 0 ? ($("#topictree-queue-progress-text").html("Done updating."), $("#topictree-queue-progress-bar").progressbar("value", 100), TopicTreeEditor.maxProgressLength = 0) : $("#topictree-queue-progress-bar").progressbar({
value: 0,
disable: !0
});
setTimeout(TopicTreeEditor.updateProgressBar, 1e3);
},
resize: function() {
var a = $(window).height(), b = $("#topic_tree").offset().top, c = a - (b + 42);
$("#topic_tree").height(c), $("#details-view").height(c), $(this.searchView.el).offset($("#topic_tree").offset());
},
createChild: function(a) {
var b = {
Topic: "leaf-icon-small.png",
Video: "video-camera-icon-full-small.png",
Exercise: "exercise-icon-small.png",
Url: "link-icon-small.png"
}, c = {
title: a.title,
key: a.kind + "/" + a.id,
id: a.id,
kind: a.kind,
icon: b[a.kind],
oldValues: a.model ? a.model.oldValues : null
};
return debugNodeIDs && (c.title += " [(" + a.id + ")]"), a.model && a.model.changeUser && (c.title += " (by " + a.model.changeUser + ")"), a.kind === "Topic" && (c.isFolder = !0, c.isLazy = !0, a.hide && (c.addClass = "hidden-topic", c.title = a.title + " [Hidden]")), c.original = a, c;
},
refreshTreeNode: function(a) {
node = TopicTreeEditor.dynatree.getNodeByKey(a.get("kind") + "/" + a.id);
if (!node) return;
var b = a.toJSON();
if (_.isEqual(b, node.data.original)) {
KAConsole.log("Model " + a.id + " has not changed. Not refreshing.");
return;
}
KAConsole.log("Refreshing " + a.id), node.data = TopicTreeEditor.createChild(b), node.render();
if (a.id != "root") {
var c = _.find(node.parent.data.original.children, function(b) {
return b.id == a.id ? b : null;
});
c.title = a.get("title"), c.hide = a.get("hide");
}
node.removeChildren(), a.get("children") && (childNodes = [], _.each(a.get("children"), function(a) {
childNodes.push(TopicTreeEditor.createChild(a));
}), node.addChild(childNodes)), a.id == "root" && node.expand();
},
handleChange: function(a, b) {
var c = new TopicChild(a);
KAConsole.log("Model of type " + c.kind + " changed ID: " + b + " -> " + a.id), TopicTreeEditor.topicTree.each(function(d) {
var e = !1, f = _.map(d.get("children"), function(d) {
if (d.kind == c.kind && d.id == b) {
var f = {
id: a.id,
kind: c.kind,
title: c.title,
hide: d.hide
};
return e = !0, f;
}
return d;
});
e && d.set({
children: f
});
});
},
treeUpdate: function() {
this.each(function(a) {
var b = !1;
_.each(TopicTreeEditor.boundList, function(c) {
c == a.id && (b = !0);
}), b || (a.bind("change", TopicTreeEditor.refreshTreeNode), TopicTreeEditor.boundList.push(a.id));
});
},
setTreeDefault: function() {
var a = {
buttons: [ {
title: "Yes",
action: TopicTreeEditor.doSetTreeDefault
}, {
title: "No",
action: hideGenericMessageBox
} ]
};
$.extend(a, {
title: "Publish this Topic Tree?",
message: "Marking this version of the topic tree default will publish all changes to the live version of the website. Are you sure?"
}), popupGenericMessageBox(a);
},
doSetTreeDefault: function() {
hideGenericMessageBox(), popupGenericMessageBox({
title: "Publishing topic tree",
message: "Publishing topic tree. Please wait...",
buttons: []
}), $.ajaxq("topics-admin", {
url: "/api/v1/topicversion/edit/setdefault",
success: function() {
hideGenericMessageBox(), popupGenericMessageBox({
title: "Topic tree publish begun",
message: "Topic tree publish is now in progress. This may take a few minutes...",
buttons: []
}), setTimeout(TopicTreeEditor.waitForTreeDefault, 15e3);
},
error: TopicTreeEditor.handleError
});
},
waitForTreeDefault: function() {
$.ajax({
url: "/api/v1/dev/task_message",
success: function(a) {
a != "Publish: finished successfully" ? (hideGenericMessageBox(), popupGenericMessageBox({
title: "Topic tree publish begun",
message: "Topic tree publish is now in progress. This may take a few minutes...<br/>Current Status - " + a,
buttons: []
}), setTimeout(TopicTreeEditor.waitForTreeDefault, 15e3)) : (hideGenericMessageBox(), popupGenericMessageBox({
title: "Topic tree publish complete",
message: "Topic tree has been published to the live site. The page will now refresh.",
buttons: [ {
title: "OK",
action: function() {
location.reload(!0);
}
} ]
}));
},
error: function() {
setTimeout(TopicTreeEditor.waitForTreeDefault, 15e3);
}
});
},
showVersionList: function() {
TopicTreeEditor.versionListView = (new TopicTreeEditor.VersionListView).show();
},
editVersion: function(a) {
TopicTreeEditor.versionListView && TopicTreeEditor.versionListView.hide(), version = getTopicVersionList().get(a), version && (version.getTopicTree().reset(), TopicTreeEditor.init(version));
},
handleError: function(a, b) {
popupGenericMessageBox({
title: "Server error",
message: 'There has been a server error:<br /><span style="color: #900;">' + (b.responseText ? b.responseText : a.responseText) + "</span><br />The topic tree will now refresh.",
buttons: [ {
title: "OK",
action: function() {
hideGenericMessageBox(), TopicTreeEditor.editVersion(TopicTreeEditor.currentVersion.get("number"));
}
} ]
});
},
addItemToTopic: function(a, b, c, d, e, f) {
f < 0 && (f = e.get("children").length), KAConsole.log("Adding " + a + " " + b + " to Topic " + e.get("title"));
var g = {
kind: a,
id: b,
title: c
};
children = e.get("children").slice(0), children.splice(f, 0, g), e.set({
children: children
}), d.reloadChildren(), d.getChildren()[f].activate();
var h = {
kind: a,
id: b,
pos: f
};
$.ajaxq("topics-admin", {
url: "/api/v1/topicversion/edit/topic/" + e.id + "/addchild",
type: "POST",
data: h,
success: function(a) {
KAConsole.log("Added item successfully.");
},
error: TopicTreeEditor.handleError
});
},
moveItem: function(a, b) {
var c = TopicTreeEditor.topicTree.get(a), d = c.removeChild(b.kind, b.id);
TopicTreeEditor.refreshTreeNode(c);
var e = TopicTreeEditor.topicTree.fetchByID(b.new_parent_id, function(c) {
c.addChild(d, b.new_parent_pos);
var e = TopicTreeEditor.dynatree.getNodeByKey("Topic/" + b.new_parent_id);
e.expand(), e.reloadChildren(), e.getChildren()[b.new_parent_pos].activate(), $.ajaxq("topics-admin", {
url: "/api/v1/topic/" + a + "/movechild",
type: "POST",
data: b,
success: function() {},
error: TopicTreeEditor.handleError
});
});
},
ungroupTopic: function(a, b) {
var c = b.get("children"), d = TopicTreeEditor.topicTree.fetchByID(a.parent.data.id, function(a) {
var d = a.get("children").slice(0), e = _.indexOf(d, _.find(d, function(a) {
return a.id === b.id;
}));
splice_args = [ e, 1 ].concat(c), [].splice.apply(d, splice_args), a.set({
children: d
}), $.ajaxq("topics-admin", {
url: "/api/v1/topic/" + b.id + "/ungroup",
type: "POST",
success: function() {},
error: TopicTreeEditor.handleError
});
});
}
};

(function(a) {
a.NodeEditor = function(a) {
this.node = null, this.model = null, this.parentModel = null, this.modelKind = null, this.template = null, this.visible = !1, this.el = null;
}, a.NodeEditor.prototype.init = function(a) {
return this.node = a, _.bindAll(this, "modelLoaded", "handleChange", "render", "deleteTag"), this;
}, a.NodeEditor.prototype.setParentModel = function(a) {
return this.parentModel = a, this;
}, a.NodeEditor.prototype.show = function() {
this.visible || (this.visible = !0, this.render(), this.model && this.model.bind("change", this.render));
}, a.NodeEditor.prototype.hide = function() {
this.model && this.model.unbind("change", this.render), this.visible = !1;
}, a.NodeEditor.prototype.modelLoaded = function(b) {
return this.modelKind = b.get("kind"), this.model = b, this.parentModel = a.topicTree.get(this.node.parent.data.id), this.template = Templates.get("topicsadmin.edit-" + b.get("kind").toLowerCase()), this.visible && (this.render(), this.model.bind("change", this.render)), this;
}, a.NodeEditor.prototype.render = function() {
var b = this;
this.model ? (js = this.model.toJSON(), oldValues = this.node.data.oldValues || {}, html = this.template({
version: a.currentVersion.toJSON(),
model: js,
oldValues: oldValues
}), this.el = $("#details-view").html(html).find("input, textarea").change(this.handleChange).end().find("a.item-action").click(function() {
b.handleAction($(this).attr("data-id"));
}).end().find(".character-count").each(function() {
var a = this, b = $(a).html(), c = $(a).attr("data-id").split(" "), d = -1;
c.length > 1 && (d = c[1]);
var e = function() {
var c = $(this).val().length;
$(a).html(c + b), $(a).toggleClass("character-count-over", c > d);
};
$("#details-view").find(c[0]).bind("keyup", e).each(e);
}).end()) : this.el = $("#details-view").html('<div style="left: 350px; position: relative; width: 10px;"><div class="dialog-progress-bar"></div></div>').find(".dialog-progress-bar").progressbar({
enable: !0,
value: 100
}).end();
}, a.NodeEditor.prototype.handleChange = function() {
var a = this;
unsavedChanges = this.hasUnsavedChanges(), $('input[type="text"]', this.el).add('input[type="radio"]:checked', this.el).add('input[type="checkbox"]', this.el).add("textarea", this.el).each(function() {
var b = $(this).attr("name");
if (b) {
var c = this.type == "checkbox" ? $(this).is(":checked") : $(this).val();
String(a.model.get(b)) != String(c) && (unsavedChanges = !0);
}
}), unsavedChanges ? $(".save-button", this.el).removeClass("disabled").addClass("green") : $(".save-button", this.el).addClass("disabled").removeClass("green");
}, a.NodeEditor.prototype.hasUnsavedChanges = function() {
return this.tags && !stringArraysEqual(this.tags, this.model.get("tags"));
}, a.NodeEditor.prototype.serializeChanges = function(a) {
this.tags && !stringArraysEqual(this.tags, this.model.get("tags")) && (a.tags = this.tags);
}, a.NodeEditor.prototype.updateTags = function() {
var a = this, b = [];
_.each(this.tags, function(c) {
b.push($("<div>" + c + ' <a href="javascript:">(remove)</a></div>').delegate("a", "click", function() {
a.deleteTag(c);
}));
}), $(".tags-list", this.el).children().remove(), _.each(b, function(a) {
a.appendTo(".tags-list", this.el);
});
}, a.NodeEditor.prototype.deleteTag = function(a) {
var b = _.indexOf(this.tags, a);
b >= 0 && (this.tags.splice(b, 1), this.updateTags(), this.handleChange());
}, a.NodeEditor.prototype.handleAction = function(b) {
var c = this;
if (b == "save") {
var d = {};
$('input[type="text"]', this.el).add('input[type="radio"]:checked', this.el).add('input[type="checkbox"]', this.el).add("textarea").each(function() {
var a = $(this).attr("name");
if (a) {
var b = this.type == "checkbox" ? $(this).is(":checked") : $(this).val();
String(c.model.get(a)) != String(b) && (d[a] = b);
}
}), this.serializeChanges(d);
if (d != {}) {
Throbber.show($(".save-button", this.el), !0);
var e = this.model.id;
this.model.save(d, {
url: c.model.url(),
success: function() {
a.handleChange(c.model, e), Throbber.hide();
},
error: TopicTreeEditor.handleError
});
}
} else if (b == "add-tag") {
var f = escape($(".add-tag", this.el).val()), g = _.indexOf(this.tags, f);
f && g < 0 && (this.tags.push(f), this.updateTags(), this.handleChange()), $(".add-tag", this.el).val("");
}
};
})(TopicTreeEditor), function(a) {
a.TopicEditor = function() {
this.existingItemView = null, this.newExerciseView = null, this.newVideoView = null, this.newUrlView = null, this.importView = null, this.exportView = null, this.contextNode = null, this.contextModel = null, this.itemCopyBuffer = null;
}, a.TopicEditor.prototype = new TopicTreeEditor.NodeEditor, a.TopicEditor.prototype.init = function(b) {
return a.NodeEditor.prototype.init.call(this, b), a.topicTree.fetchByID(this.node.data.id, this.modelLoaded), this;
}, a.TopicEditor.prototype.render = function() {
a.NodeEditor.prototype.render.call(this), this.model && (this.tags = this.model.get("tags").slice(0), this.updateTags()), TopicTreeEditor.currentVersion.get("edit") || $("input", this.el).attr("disabled", "disabled");
}, a.TopicEditor.prototype.handleAction = function(b) {
var c = this;
if (!TopicTreeEditor.currentVersion.get("edit")) return;
if (b == "add_new_topic") {
var d = new Topic;
KAConsole.log("Creating new topic..."), d.save({}, {
success: function() {
KAConsole.log("Created new topic:", d.id);
var a = {
kind: "Topic",
id: d.id,
pos: c.model.get("children").length
};
$.ajaxq("topics-admin", {
url: "/api/v1/topicversion/edit/topic/" + c.model.id + "/addchild",
type: "POST",
data: a,
success: function(b) {
KAConsole.log("Added topic successfully."), c.model.set(b), c.node.expand(), c.node.reloadChildren(), c.node.getChildren()[a.pos].activate();
},
error: TopicTreeEditor.handleError
});
}
});
} else if (b == "add_new_video") this.newVideoView = this.newVideoView || new TopicTreeEditor.CreateVideoView, this.newVideoView.show(this.node, this.model); else if (b == "add_existing_video") this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView, this.existingItemView.show("video", a.addItemToTopic, this.node, this.model); else if (b == "add_new_exercise") this.newExerciseView = this.newExerciseView || new TopicTreeEditor.CreateExerciseView, this.newExerciseView.show(this.node, this.model); else if (b == "add_existing_exercise") this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView, this.existingItemView.show("exercise", a.addItemToTopic, this.node, this.model); else if (b == "add_new_url") this.newUrlView = this.newUrlView || new TopicTreeEditor.CreateUrlView, this.newUrlView.show(this.node, this.model); else if (b == "export_topic") this.exportView = this.exportView || new TopicTreeEditor.ImportExportView({
"import": !1
}), this.exportView.show(this.model.id); else if (b == "import_topic") this.importView = this.importView || new TopicTreeEditor.ImportExportView({
"import": !0
}), this.importView.show(this.model.id); else if (b == "ungroup_topic") {
var c = this;
popupGenericMessageBox({
title: "Confirm ungroup topic",
message: "Ungrouping this topic will delete it and move all its children to the parent topic. Are you sure?",
buttons: [ {
title: "Yes",
action: function() {
TopicTreeEditor.ungroupTopic(c.node, c.model), hideGenericMessageBox();
}
}, {
title: "No",
action: hideGenericMessageBox
} ]
});
} else if (b == "paste_item") {
if (!a.itemCopyBuffer) return;
if (a.itemCopyBuffer.type == "copy") a.addItemToTopic(a.itemCopyBuffer.kind, a.itemCopyBuffer.id, a.itemCopyBuffer.title, this.node, this.model, -1); else if (a.itemCopyBuffer.type == "cut") {
var e = {
kind: a.itemCopyBuffer.kind,
id: a.itemCopyBuffer.id,
new_parent_id: c.model.id,
new_parent_pos: c.model.get("children").length
};
TopicTreeEditor.moveItem(a.itemCopyBuffer.originalParent, e);
}
} else if (b == "delete_topic") {
var f = {
kind: "Topic",
id: c.model.id
};
$.ajaxq("topics-admin", {
url: "/api/v1/topic/" + c.parentModel.id + "/deletechild",
type: "POST",
data: f,
success: function(a) {
c.parentModel.removeChild("Topic", c.model.id), TopicTreeEditor.refreshTreeNode(c.parentModel);
},
error: TopicTreeEditor.handleError
});
} else a.NodeEditor.prototype.handleAction.call(this, b);
};
}(TopicTreeEditor), function(a) {
a.ItemEditor = function() {}, a.ItemEditor.prototype = new TopicTreeEditor.NodeEditor, a.ItemEditor.prototype.handleAction = function(b) {
var c = this;
if (!TopicTreeEditor.currentVersion.get("edit")) {
a.NodeEditor.prototype.handleAction.call(this, b);
return;
}
if (b == "copy_item") a.itemCopyBuffer = {
type: "copy",
kind: this.node.data.kind,
id: this.node.data.id,
title: this.node.data.title,
originalParent: this.parentModel.id
}; else if (b == "cut_item") a.itemCopyBuffer = {
type: "cut",
kind: this.node.data.kind,
id: this.node.data.id,
title: this.node.data.title,
originalParent: this.parentModel.id,
originalPosition: _.indexOf(this.node.parent.childList, this.node)
}; else if (b == "paste_after_item") {
var d = _.indexOf(this.node.parent.childList, this.node) + 1;
if (!a.itemCopyBuffer) return;
if (a.itemCopyBuffer.type == "copy") {
if (this.parentModel.id == a.itemCopyBuffer.originalParent) return;
a.addItemToTopic(a.itemCopyBuffer.kind, a.itemCopyBuffer.id, a.itemCopyBuffer.title, this.node.parent, this.parentModel, d);
} else if (a.itemCopyBuffer.type == "cut") {
this.parentModel.id == a.itemCopyBuffer.originalParent && d > a.itemCopyBuffer.originalPosition && d--;
var e = {
kind: a.itemCopyBuffer.kind,
id: a.itemCopyBuffer.id,
new_parent_id: this.parentModel.id,
new_parent_pos: d
};
a.moveItem(a.itemCopyBuffer.originalParent, e);
}
} else if (b == "remove_item") {
var f = {
kind: this.node.data.kind,
id: this.node.data.id
};
$.ajaxq("topics-admin", {
url: "/api/v1/topic/" + this.parentModel.id + "/deletechild",
type: "POST",
data: f,
success: function(a) {
c.parentModel.removeChild(c.node.data.kind, c.node.data.id), TopicTreeEditor.refreshTreeNode(c.parentModel);
},
error: TopicTreeEditor.handleError
});
} else if (b == "undo_changes") {
var f = {
kind: this.node.data.kind,
id: this.node.data.id
};
$.ajaxq("topics-admin", {
url: "/api/v1/topicversion/edit/deletechange",
type: "POST",
data: f,
success: function(a) {
c.node.parent.removeChild(c.node);
},
error: TopicTreeEditor.handleError
});
} else a.NodeEditor.prototype.handleAction.call(this, b);
};
}(TopicTreeEditor), function(a) {
a.ExerciseEditor = function() {
this.existingItemView = null, this.covers = null, this.prereqs = null, this.videos = null;
}, a.ExerciseEditor.prototype = new TopicTreeEditor.ItemEditor, a.ExerciseEditor.prototype.init = function(b) {
return a.ItemEditor.prototype.init.call(this, b), _.bindAll(this, "addCover", "deleteCover", "addPrereq", "deletePrereq", "addVideo", "deleteVideo"), getExerciseList().fetchByID(b.data.id, this.modelLoaded), this;
}, a.ExerciseEditor.prototype.render = function() {
a.ItemEditor.prototype.render.call(this), this.model && (this.tags = this.model.get("tags").slice(0), this.updateTags(), this.prereqs = this.model.get("prerequisites").slice(0), this.updatePrereqs(), this.covers = this.model.get("covers").slice(0), this.updateCovers(), this.videos = (this.model.get("related_video_readable_ids") || []).slice(0), this.updateVideos());
}, a.ExerciseEditor.prototype.hasUnsavedChanges = function() {
var b = a.ItemEditor.prototype.hasUnsavedChanges.call(this);
return b || !(stringArraysEqual(this.prereqs, this.model.get("prerequisites")) && stringArraysEqual(this.covers, this.model.get("covers")) && stringArraysEqual(this.videos, this.model.get("related_video_readable_ids")));
}, a.ExerciseEditor.prototype.serializeChanges = function(b) {
a.ItemEditor.prototype.serializeChanges.call(this, b), this.prereqs && !stringArraysEqual(this.prereqs, this.model.get("prerequisites")) && (b.prerequisites = this.prereqs), this.covers && !stringArraysEqual(this.covers, this.model.get("covers")) && (b.covers = this.covers), this.videos && !stringArraysEqual(this.videos, this.model.get("related_video_readable_ids")) && (b.related_video_readable_ids = this.videos);
}, a.ExerciseEditor.prototype.updateCovers = function() {
var a = this, b = [];
_.each(this.covers, function(c) {
b.push($("<div>" + c + ' <a href="javascript:">(remove)</a></div>').delegate("a", "click", function() {
a.deleteCover(c);
}));
}), $(".exercise-covers-list", this.el).children().remove(), _.each(b, function(a) {
a.appendTo(".exercise-covers-list", this.el);
});
}, a.ExerciseEditor.prototype.addCover = function(a, b, c) {
b && (this.covers.push(b), this.updateCovers(), this.handleChange());
}, a.ExerciseEditor.prototype.deleteCover = function(a) {
var b = _.indexOf(this.covers, a);
b >= 0 && (this.covers.splice(b, 1), this.updateCovers(), this.handleChange());
}, a.ExerciseEditor.prototype.updatePrereqs = function() {
var a = this, b = [];
_.each(this.prereqs, function(c) {
b.push($("<div>" + c + ' <a href="javascript:">(remove)</a></div>').delegate("a", "click", function() {
a.deletePrereq(c);
}));
}), $(".exercise-prereqs-list", this.el).children().remove(), _.each(b, function(a) {
a.appendTo(".exercise-prereqs-list", this.el);
});
}, a.ExerciseEditor.prototype.addPrereq = function(a, b, c) {
b && (this.prereqs.push(b), this.updatePrereqs(), this.handleChange());
}, a.ExerciseEditor.prototype.deletePrereq = function(a) {
var b = _.indexOf(this.prereqs, a);
b >= 0 && (this.prereqs.splice(b, 1), this.updatePrereqs(), this.handleChange());
}, a.ExerciseEditor.prototype.updateVideos = function() {
var a = this, b = [];
_.each(this.videos, function(c) {
b.push($("<div id='related-video-" + c + "'>" + c + ' <a href="javascript:">(remove)</a></div>').delegate("a", "click", function() {
a.deleteVideo(c);
}));
}), $(".exercise-videos-list", this.el).children().remove(), _.each(b, function(a) {
a.appendTo(".exercise-videos-list", this.el);
}), $(".exercise-videos-list", this.el).sortable({
update: $.proxy(function(a, b) {
this.videos = $(".exercise-videos-list", this.el).sortable("toArray").map(function(a) {
return a.substring(14);
});
}, this)
});
}, a.ExerciseEditor.prototype.addVideo = function(a, b, c) {
b && (this.videos.push(b), this.updateVideos(), this.handleChange());
}, a.ExerciseEditor.prototype.deleteVideo = function(a) {
var b = _.indexOf(this.videos, a);
b >= 0 && (this.videos.splice(b, 1), this.updateVideos(), this.handleChange());
}, a.ExerciseEditor.prototype.handleAction = function(b) {
b == "add-prereq" ? (this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView, this.existingItemView.show("exercise", this.addPrereq)) : b == "add-cover" ? (this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView, this.existingItemView.show("exercise", this.addCover)) : b == "add-video" ? (this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView, this.existingItemView.show("video", this.addVideo)) : a.ItemEditor.prototype.handleAction.call(this, b);
};
}(TopicTreeEditor), function(a) {
a.VideoEditor = function() {}, a.VideoEditor.prototype = new TopicTreeEditor.ItemEditor, a.VideoEditor.prototype.init = function(b) {
return a.ItemEditor.prototype.init.call(this, b), getVideoList().fetchByID(b.data.id, this.modelLoaded), this;
};
}(TopicTreeEditor), function(a) {
a.UrlEditor = function() {}, a.UrlEditor.prototype = new TopicTreeEditor.ItemEditor, a.UrlEditor.prototype.init = function(b) {
return a.ItemEditor.prototype.init.call(this, b), getUrlList().fetchByID(b.data.id, this.modelLoaded), this;
}, a.UrlEditor.prototype.render = function() {
a.ItemEditor.prototype.render.call(this), this.model && (this.tags = this.model.get("tags").slice(0), this.updateTags());
};
}(TopicTreeEditor), TopicTreeEditor.AddExistingItemView = Backbone.View.extend({
template: Templates.get("topicsadmin.add-existing-item"),
loaded: !1,
type: "",
results: {},
callback: null,
contextNode: null,
contextModel: null,
initialize: function() {
_.bindAll(this, "showResults"), this.render();
},
events: {
"click .do-search": "doSearch",
"click .show-recent": "showRecent",
"click .ok-button": "selectItem"
},
render: function() {
var a = $(this.template({
type: this.type
})).appendTo(document.body).get(0);
return this.setElement(a), this.delegateEvents(), this;
},
show: function(a, b, c, d) {
$(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
}), a != this.type && (this.loaded = !1), this.type = a, this.callback = b, this.contextNode = c, this.contextModel = d, $(this.el).find(".title").html("Choose " + a + ":"), this.loaded || this.showRecent();
},
showResults: function(a) {
var b = [], c = this;
this.results = {}, _.each(a, function(a) {
c.type == "video" ? (b.push($('<option value="' + a.id + '">' + a.title + "</option>")), c.results[a.id] = a.title) : (b.push($('<option value="' + a.name + '">' + a.display_name + "</option>")), c.results[a.name] = a.display_name);
});
var d = $("select.search-results", this.el);
d.html(""), _.each(b, function(a) {
a.appendTo(d.get(0));
});
},
showRecent: function() {
var a = this;
this.type == "video" ? $(this.el).find(".search-description").html("Most recent videos:") : $(this.el).find(".search-description").html("Most recent exercises:"), a.showResults([ {
readable_id: "_",
name: "_",
title: "Loading...",
display_name: "Loading..."
} ]);
var b;
this.type == "video" ? b = "/api/v1/videos/recent" : b = "/api/v1/exercises/recent", $.ajax({
url: b,
success: function(b) {
a.loaded = !0, a.showResults(b);
}
});
},
doSearch: function() {
var a = $(this.el).find('input[name="item-search"]').val(), b = this;
this.type == "video" ? $(this.el).find(".search-description").html('Videos matching "' + a + '":') : $(this.el).find(".search-description").html('Exercises matching "' + a + '":'), b.showResults([ {
readable_id: "",
name: "",
title: "Loading...",
display_name: "Loading..."
} ]), $.ajax({
url: "/api/v1/autocomplete?q=" + encodeURIComponent(a),
success: function(a) {
b.loaded = !0, b.type == "video" ? b.showResults(a.videos) : b.showResults(a.exercises);
}
});
},
selectItem: function() {
var a = $(this.el).find("select.search-results option:selected").val();
if (!a || a === "_") return;
this.hide();
var b;
this.type == "video" ? b = "Video" : b = "Exercise", this.callback(b, a, this.results[a], this.contextNode, this.contextModel, -1);
},
hide: function() {
return $(this.el).modal("hide");
}
}), TopicTreeEditor.CreateExerciseView = Backbone.View.extend({
template: Templates.get("topicsadmin.create-exercise"),
contextNode: null,
contextModel: null,
initialize: function() {
this.render();
},
events: {
"click .ok-button": "createExercise"
},
render: function() {
var a = $(this.template({
type: this.type
})).appendTo(document.body).get(0);
return this.setElement(a), this.delegateEvents(), this;
},
show: function(a, b) {
$(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
}), this.contextNode = a, this.contextModel = b;
},
createExercise: function() {
var a = this, b = $(this.el).find('input[name="name"]').val(), c = new Exercise({
name: b
});
c.save({}, {
success: function() {
TopicTreeEditor.addItemToTopic("Exercise", b, c.get("display_name"), a.contextNode, a.contextModel, -1);
}
}), this.hide();
},
hide: function() {
return $(this.el).modal("hide");
}
}), TopicTreeEditor.CreateVideoView = Backbone.View.extend({
template: Templates.get("topicsadmin.create-video"),
previewTemplate: Templates.get("topicsadmin.create-video-preview"),
contextNode: null,
contextModel: null,
youtubeID: null,
readableID: null,
title: null,
initialize: function() {
_.bindAll(this, "doVideoSearch", "queueVideoSearch"), this.render();
},
events: {
"click .ok-button": "createVideo",
'change input[name="youtube_id"]': "doVideoSearch",
'keydown input[name="youtube_id"]': "queueVideoSearch"
},
render: function() {
var a = $(this.template({
type: this.type
})).appendTo(document.body).get(0);
return this.setElement(a), this.delegateEvents(), this;
},
show: function(a, b) {
this.contextNode = a, this.contextModel = b, $(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
}), this.youtubeID = null, $(this.el).find('input[name="youtube_id"]').val(""), $(this.el).find(".create-video-preview").html("Enter a YouTube ID to look up a video."), $(self.el).find(".ok-button").addClass("disabled").removeClass("green");
},
createVideo: function() {
var a = this;
if (this.readableID) TopicTreeEditor.addItemToTopic("Video", this.readableID, this.title, this.contextNode, this.contextModel, -1); else {
if (!this.youtubeID) return;
var b = new Video({
youtube_id: this.youtubeID
});
b.save({}, {
success: function(b) {
TopicTreeEditor.addItemToTopic("Video", b.get("readable_id"), b.get("title"), a.contextNode, a.contextModel, -1);
}
});
}
this.hide();
},
doVideoSearch: function() {
var a = $(this.el).find('input[name="youtube_id"]').val(), b = this;
$.ajax({
url: "/api/v1/videos/" + a + "/youtubeinfo",
success: function(c) {
b.youtubeID = a, c.existing ? (b.readableID = c.readable_id, b.title = c.title) : b.readableID = null, $(b.el).find(".create-video-preview").html(b.previewTemplate(c)), $(b.el).find(".ok-button").removeClass("disabled").addClass("green");
},
error: function(a) {
b.youtubeID = null, b.readableID = null, $(b.el).find(".create-video-preview").html("Video not found."), $(b.el).find(".ok-button").addClass("disabled").removeClass("green");
}
});
},
queueVideoSearch: function() {
this.queueVideoSearchFn = this.queueVideoSearchFn || _.debounce(this.doVideoSearch, 1e3), this.queueVideoSearchFn();
},
hide: function() {
return $(this.el).modal("hide");
}
}), TopicTreeEditor.CreateUrlView = Backbone.View.extend({
template: Templates.get("topicsadmin.create-url"),
contextNode: null,
contextModel: null,
initialize: function() {
this.render();
},
events: {
"click .ok-button": "createUrl"
},
render: function() {
var a = $(this.template({
type: this.type
})).appendTo(document.body).get(0);
return this.setElement(a), this.delegateEvents(), this;
},
show: function(a, b) {
this.contextNode = a, this.contextModel = b, $(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
}), $(this.el).find('input[name="url"]').val("");
},
createUrl: function() {
var a = this, b = $(this.el).find('input[name="url"]').val(), c = $(this.el).find('input[name="title"]').val(), d = new ExternalURL({
url: b,
title: c
});
d.save({}, {
success: function(b) {
TopicTreeEditor.addItemToTopic("Url", b.id, b.get("title"), a.contextNode, a.contextModel, -1);
}
}), this.hide();
},
hide: function() {
return $(this.el).modal("hide");
}
}), TopicTreeEditor.VersionListView = Backbone.View.extend({
template: Templates.get("topicsadmin.list-versions"),
templateItem: Templates.get("topicsadmin.list-versions-item"),
initialize: function() {
this.render();
},
render: function() {
var a = $(this.template({})).appendTo(document.body).get(0);
return this.setElement(a), this.delegateEvents(), this;
},
show: function(a) {
$(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
});
var b = this;
return getTopicVersionList().fetch({
success: function() {
var a = [];
_.each(getTopicVersionList().models, function(c) {
a.push($(b.templateItem(c.toJSON())).find("a.edit-version").click(function() {
TopicTreeEditor.editVersion(c.get("number"));
}).end());
}), _.each(a, function(a) {
a.appendTo($(".version-list", b.el).get(0));
});
}
}), this;
},
hide: function() {
return $(this.el).modal("hide");
}
}), TopicTreeEditor.SearchView = Backbone.View.extend({
template: Templates.get("topicsadmin.search-topics"),
visible: !1,
matchingPaths: null,
currentIndex: 0,
events: {
"click .search-button": "toggle",
"change input": "doSearch",
"click .prev-button": "goToPrev",
"click .next-button": "goToNext"
},
initialize: function() {
this.render();
},
render: function() {
var a = $(this.template({})).get(0);
return this.setElement(a), this.delegateEvents(), this;
},
toggle: function() {
this.visible = !this.visible, this.visible ? this.show() : this.hide();
},
show: function() {
$(".search-button", this.el).attr("src", "/images/circled_cross.png"), $(".search-panel", this.el).slideDown(100);
},
hide: function() {
$(".search-button", this.el).attr("src", "/images/jquery-mobile/icon-search-black.png"), $(".search-panel", this.el).slideUp(100);
},
doSearch: function() {
this.clearResults(), el = $("input", this.el), query = el.val();
if (query !== "") {
var a = this;
Throbber.show(el), $.ajax({
url: "/api/v1/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/search/" + query,
success: function(b) {
Throbber.hide();
var c = {};
_.each(b.nodes, function(a) {
c[a.kind] = c[a.kind] || [], c[a.kind].push(a);
}), TopicTreeEditor.topicTree.addInited(c.Topic), getExerciseList().addInited(c.Exercise), getVideoList().addInited(c.Video), getUrlList().addInited(c.URL), a.matchingPaths = b.paths, a.matchingPaths.length > 0 && (a.currentIndex = 0, a.goToResult(0));
}
});
}
},
clearResults: function() {
this.matchingPaths = [], $(".prev-button", this.el).attr("src", "/images/vote-up-gray.png"), $(".next-button", this.el).attr("src", "/images/vote-down-gray.png");
},
goToResult: function(a) {
var b = this.matchingPaths[a], c = TopicTreeEditor.dynatree.getNodeByKey("Topic/root"), d = b[b.length - 1] + "/" + b[b.length - 2];
_.each(b, function(a) {
if (c) {
var b = null;
c.expand(!0), KAConsole.log("Opening " + a + "..."), _.each(c.childList, function(c) {
c.data.key == d ? c.activate() : c.data.key == "Topic/" + a ? (c.expand(!0), b = c) : c.expand(!1);
}), c = b;
}
}), this.currentIndex = a, $(".prev-button", this.el).attr("src", this.currentIndex === 0 ? "/images/vote-up-gray.png" : "/images/vote-up.png"), $(".next-button", this.el).attr("src", this.currentIndex < this.matchingPaths.length - 1 ? "/images/vote-down.png" : "/images/vote-down-gray.png");
},
goToPrev: function() {
this.currentIndex > 0 && this.goToResult(this.currentIndex - 1);
},
goToNext: function() {
this.currentIndex < this.matchingPaths.length - 1 && this.goToResult(this.currentIndex + 1);
}
}), TopicTreeEditor.ImportExportView = Backbone.View.extend({
template: Templates.get("topicsadmin.import-export"),
events: {
"click .ok-button": "close"
},
initialize: function() {
this.render();
},
render: function() {
var a = $(this.template({
"import": this.options.import
})).appendTo(document.body).get(0);
return this.setElement(a), this.delegateEvents(), this;
},
show: function(a) {
var b = this;
return $(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
}), this.topicID = a, this.options.import || ($(this.el).find(".topic-data").html("Exporting topic data. Please wait."), $.ajax({
url: "/api/v1/dev/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/topic/" + a + "/topictree",
dataType: "html",
success: function(a) {
$(b.el).find(".topic-data").html(a);
}
})), this;
},
hide: function() {
return $(this.el).modal("hide");
},
close: function() {
var a = this;
this.options.import ? (this.hide(), hideGenericMessageBox(), popupGenericMessageBox({
title: "Importing topic...",
message: "Importing topic. Please wait...",
buttons: []
}), $.ajax({
url: "/api/v1/dev/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/topic/" + a.topicID + "/topictree",
type: "PUT",
contentType: "application/json",
data: $(a.el).find(".topic-data").val(),
success: function() {
hideGenericMessageBox();
}
})) : this.hide();
}
});