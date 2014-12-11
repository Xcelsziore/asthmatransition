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

var KMapEditor = {
ZOOM_EXERCISES: 8,
ZOOM_HYBRID: 7,
ZOOM_TOPICS: 6,
defaultVersion: [],
editVersion: [],
candidateVersion: [],
defaultMap: {},
editMap: {},
candidateMap: {},
exercises: null,
maplayout: null,
readonly: !0,
selected: [],
raphael: {},
minH: 0,
minV: 0,
zoomLevel: 0,
init: function(a, b, c, d) {
$(window).resize(function() {
KMapEditor.resize();
}), KMapEditor.resize(), window.location.hash === "#default" ? ($("span.breadcrumbs_nav>a").removeClass("selected"), $("span.breadcrumbs_nav>a#select-view-mode").addClass("selected")) : window.location.hash === "#viewedit" ? $("span.breadcrumbs_nav>a").removeClass("selected") : ($("span.breadcrumbs_nav>a").removeClass("selected"), $("span.breadcrumbs_nav>a#select-edit-mode").addClass("selected")), KMapEditor.enableMapPanning(), KMapEditor.enableMarqueeSelect(), a.get = function(a) {
var b = this, c = _.memoize(function(a) {
var c = $.map(b, function(b, c) {
if (b.name === a) return c;
});
return c[0];
})(a);
return this[c];
}, KMapEditor.defaultVersion = a, KMapEditor.defaultMap = c, $.extend(!0, KMapEditor.editVersion, a), $.each(b, function(a, b) {
if (b.content.kind === "Exercise") {
var c = KMapEditor.editVersion.get(b.content.name);
$.each(b.content_changes, function(a, b) {
c[a] = b;
});
}
}), d == null ? $.extend(!0, KMapEditor.editMap, c) : KMapEditor.editMap = d, $.extend(!0, KMapEditor.candidateVersion, KMapEditor.editVersion), $.extend(!0, KMapEditor.candidateMap, KMapEditor.editMap), KMapEditor.populateExerciseLists(), $("span.breadcrumbs_nav>a").click(function(a) {
$("span.breadcrumbs_nav>a").removeClass("selected"), $(this).addClass("selected"), this.id === "select-view-mode" ? KMapEditor.viewDefaultVersion() : this.id === "select-edit-mode" && KMapEditor.editCandidateVersion();
}), $("div.zoom-button").click(function(a) {
var b = KMapEditor.zoomLevel;
this.id === "zoom-exercise" ? b = KMapEditor.ZOOM_EXERCISES : this.id === "zoom-hybrid" ? b = KMapEditor.ZOOM_HYBRID : this.id === "zoom-topic" && (b = KMapEditor.ZOOM_TOPICS, KMapEditor.updateForm(null)), KMapEditor.zoomLevel !== b && (KMapEditor.setZoom(b), KMapEditor.drawMap());
}), $("#live_yes").click(function(a) {
KMapEditor.exercises.get(KMapEditor.selected[0]).live = !0, $("img[src='" + KMapEditor.IMG_SELECTED_DEV + "']").removeClass("ex-dev").addClass("ex-live").attr({
src: KMapEditor.IMG_SELECTED
});
}), $("#live_no").click(function(a) {
KMapEditor.exercises.get(KMapEditor.selected[0]).live = !1, $("img[src='" + KMapEditor.IMG_SELECTED + "']").removeClass("ex-live").addClass("ex-dev").attr({
src: KMapEditor.IMG_SELECTED_DEV
});
}), $("input[name='short_display_name']").bind("keyup", function(a) {
KMapEditor.selected.length === 1 && (KMapEditor.exercises.get(KMapEditor.selected[0]).short_display_name = $(a.target).val());
}), $("input[name='seconds_per_fast_problem']").bind("keyup", function(a) {
KMapEditor.selected.length === 1 && (KMapEditor.exercises.get(KMapEditor.selected[0]).seconds_per_fast_problem = $(a.target).val());
}), $("#add-prereq").change(function(a) {
KMapEditor.addPrereq();
}), $("#add-cover").change(function(a) {
KMapEditor.addCover();
}), $("#add-video-input").placeholder(), initAutocomplete("#add-video-input", !1, KMapEditor.addVideo, !0, {
includeVideos: !0,
includeExercises: !1,
addTypePrefix: !1
}), $("#find-exercise").placeholder(), initAutocomplete("#find-exercise", !1, KMapEditor.findExercise, !0, {
includeVideos: !1,
includeExercises: !0,
addTypePrefix: !1
}), $("#save-button").click(function() {
$(".exercise-properties input").prop("disabled", !0), $(".exercise-properties select").prop("disabled", !0), $("#save-button").removeClass("green"), $("#save-button").addClass("disabled"), $("#map-edit-message").text("Saving changes").show();
var a = [];
$.each(KMapEditor.candidateVersion, function(b, c) {
KMapEditor.isDirty(c) && a.push(c);
});
if (a.length === 0) $("#map-edit-message").text("No changes").delay(1e3).fadeOut(400), $(".exercise-properties input").prop("disabled", !1), $(".exercise-properties select").prop("disabled", !1), $("#save-button").addClass("green"), $("#save-button").removeClass("disabled"); else {
var b = 0;
$.each(a, function(c, d) {
var e = {
name: d.name,
live: d.live,
h_position: d.h_position,
v_position: d.v_position,
seconds_per_fast_problem: d.seconds_per_fast_problem,
short_display_name: d.short_display_name,
covers: d.covers,
prerequisites: d.prerequisites,
related_video_readable_ids: d.related_video_readable_ids
};
$.ajax({
url: "/api/v1/topicversion/edit/exercises/" + d.name,
type: "PUT",
data: JSON.stringify(e),
contentType: "application/json; charset=utf-8",
success: function(c) {
b += 1, $("#map-edit-message").text("Saving changes to exercises (" + b + "/" + a.length + ")"), b >= a.length && location.reload();
}
});
});
}
return !1;
}), window.location.hash === "#default" ? KMapEditor.viewDefaultVersion() : window.location.hash === "#viewedit" ? KMapEditor.viewEditVersion() : KMapEditor.editCandidateVersion();
},
resize: function() {
var a = $(window).height(), b = $("#map-edit-container").offset().top, c = a - (b + 39);
$("#map-edit-container").height(c);
},
enableMapPanning: function() {
var a, b, c, d = !1;
$("#map").bind("mousedown", function(e) {
if ($(e.target).hasClass("exercise")) return;
if (!e.shiftKey) return b = e.pageX - parseInt($("#map").css("margin-left")), c = e.pageY - parseInt($("#map").css("margin-top")), a = !1, d = !0, !1;
}), $(document).bind("mousemove mouseup", function(e) {
if (d) return $("#map").css({
"margin-top": e.pageY - c,
"margin-left": e.pageX - b
}), e.type === "mouseup" ? (d = !1, a ? KMapEditor.saveMapCoords() : (KMapEditor.updateForm(null), $(".exercise-label").removeClass("exercise-selected"), $("img.ex-live").attr({
src: KMapEditor.IMG_LIVE
}), $("img.ex-dev").attr({
src: KMapEditor.IMG_DEV
}), KMapEditor.selected = [])) : a = !0, !1;
});
},
enableMarqueeSelect: function() {
var a, b, c = !1, d = $("<div>").zIndex(1001).css({
position: "absolute",
border: "1px red dashed"
}).hide().appendTo($("#map-container"));
$("#map").bind("mousedown", function(e) {
if ($(e.target).hasClass("exercise")) return;
if (e.shiftKey) return a = e.pageX - parseInt($("#map").css("margin-left")), b = e.pageY - parseInt($("#map").css("margin-top")), c = !0, d.css({
left: e.pageX - $("#map-container").offset().left + "px",
top: e.pageY - $("#map-container").offset().top + "px",
width: "0",
height: "0"
}).show(), !1;
}), $(document).bind("mousemove mouseup", function(e) {
if (c) {
var f = Math.min(a + parseInt($("#map").css("margin-left")), e.pageX), g = Math.max(a + parseInt($("#map").css("margin-left")), e.pageX), h = Math.min(b + parseInt($("#map").css("margin-top")), e.pageY), i = Math.max(b + parseInt($("#map").css("margin-top")), e.pageY);
d.css({
left: f - $("#map-container").offset().left + "px",
top: h - $("#map-container").offset().top + "px",
width: g - f + "px",
height: i - h + "px"
});
if (e.type === "mouseup") {
c = !1, d.hide();
var j = $("div.ui-draggable").map(function(a, b) {
if ($(b).offset().left > f && $(b).offset().left < g && $(b).offset().top > h && $(b).offset().top < i) return b;
});
KMapEditor.selected = [], $(".exercise-label").removeClass("exercise-selected"), $("img.ex-live").attr({
src: KMapEditor.IMG_LIVE
}), $("img.ex-dev").attr({
src: KMapEditor.IMG_DEV
}), $(j).each(function(a, b) {
var c = $(b).data("exercise");
c !== undefined && (KMapEditor.selected.push(c.name), $(b).find(".exercise-label").addClass("exercise-selected"), $(b).find("img").attr({
src: c.live ? KMapEditor.IMG_SELECTED : KMapEditor.IMG_SELECTED_DEV
}));
}), KMapEditor.selected.length === 1 ? KMapEditor.updateForm(KMapEditor.selected[0]) : KMapEditor.updateForm(null);
}
}
});
},
viewDefaultVersion: function() {
this.exercises = this.defaultVersion, this.maplayout = this.defaultMap, this.readonly = !0, $(".exercise-properties input").prop("disabled", !0), $(".exercise-properties select").prop("disabled", !0), $("#save-button").removeClass("green"), $("#save-button").addClass("disabled"), this.drawMap(), this.selected.length === 1 && this.updateForm(this.selected[0]);
},
viewEditVersion: function() {
this.exercises = this.editVersion, this.maplayout = this.editMap, this.readonly = !0, $(".exercise-properties input").prop("disabled", !0), $(".exercise-properties select").prop("disabled", !0), $("#save-button").removeClass("green"), $("#save-button").addClass("disabled"), this.drawMap(), this.selected.length === 1 && this.updateForm(this.selected[0]);
},
editCandidateVersion: function() {
this.exercises = this.candidateVersion, this.maplayout = this.candidateMap, this.readonly = !1, $(".exercise-properties input").prop("disabled", !1), $(".exercise-properties select").prop("disabled", !1), $("#save-button").addClass("green"), $("#save-button").removeClass("disabled"), this.drawMap(), this.selected.length === 1 && this.updateForm(this.selected[0]);
},
saveMapCoords: function() {
var a = parseInt($("#map").css("margin-top")), b = parseInt($("#map").css("margin-left")), c = $("#map-container").height(), d = $("#map-container").width() - parseInt($("#map-container").css("left")), e = {
lat: .392 / KMapEditor.Y_SPACING * (a - KMapEditor.Y_SPACING * KMapEditor.minH - (c / 2 - KMapEditor.Y_SPACING)),
lng: -0.35 / KMapEditor.X_SPACING * (b - KMapEditor.X_SPACING * KMapEditor.minV - (d - KMapEditor.LABEL_WIDTH) / 2),
when: (new Date).getTime(),
zoom: KMapEditor.zoomLevel
};
window.localStorage["map_coords:" + USERNAME] = JSON.stringify(e);
},
createCanvas: function() {
var a = $.parseJSON(window.localStorage["map_coords:" + USERNAME] || "{}");
if (a.lat === undefined || a.lng === undefined) a = {
lat: -1.1,
lng: 1.2,
zoom: 8
};
this.setZoom(a.zoom), this.raphael = Raphael($("#map")[0]), this.minV = Math.min.apply(Math, $.map(this.exercises, function(a) {
return a.v_position;
})) - 50, this.minH = Math.min.apply(Math, $.map(this.exercises, function(a) {
return a.h_position;
})) - 50;
var b = Math.max.apply(Math, $.map(this.exercises, function(a) {
return a.v_position;
})) + 50, c = Math.max.apply(Math, $.map(this.exercises, function(a) {
return a.h_position;
})) + 50;
this.raphael.setSize((c - this.minH + 2) * this.X_SPACING, (b - this.minV + 2) * this.Y_SPACING);
var d = $("#map-container").height(), e = $("#map-container").width() - parseInt($("#map-container").css("left")), f = a.lng / .35, g = a.lat / .392;
$("#map").css({
"margin-top": (g + this.minH) * this.Y_SPACING + (d / 2 - this.Y_SPACING),
"margin-left": (-f + this.minV) * this.X_SPACING + (e - this.LABEL_WIDTH) / 2
});
},
X_SPACING: null,
Y_SPACING: null,
ICON_SIZE: null,
LABEL_WIDTH: null,
IMG_LIVE: null,
IMG_DEV: null,
IMG_SELECTED: null,
IMG_SELECTED_DEV: null,
setZoom: function(a) {
this.zoomLevel = Math.min(Math.max(a, this.ZOOM_TOPICS), this.ZOOM_EXERCISES), $("div.zoom-button").removeClass("zoom-select"), this.zoomLevel === this.ZOOM_EXERCISES ? (this.X_SPACING = 64, this.Y_SPACING = 74, this.ICON_SIZE = 26, this.LABEL_WIDTH = 60, $("div#zoom-exercise").addClass("zoom-select")) : this.zoomLevel === this.ZOOM_HYBRID ? (this.X_SPACING = 32, this.Y_SPACING = 36, this.ICON_SIZE = 10, this.LABEL_WIDTH = 10, $("div#zoom-hybrid").addClass("zoom-select")) : (this.X_SPACING = 16, this.Y_SPACING = 18, this.ICON_SIZE = 40, this.LABEL_WIDTH = 80, $("div#zoom-topic").addClass("zoom-select")), this.IMG_LIVE = "/images/node-not-started-" + this.ICON_SIZE + ".png", this.IMG_DEV = "/images/node-not-started-" + this.ICON_SIZE + "-faded.png", this.IMG_SELECTED = "/images/node-complete-" + this.ICON_SIZE + ".png", this.IMG_SELECTED_DEV = "/images/node-complete-" + this.ICON_SIZE + "-faded.png";
var b = $.parseJSON(window.localStorage["map_coords:" + USERNAME] || "{}");
b.zoom = this.zoomLevel, window.localStorage["map_coords:" + USERNAME] = JSON.stringify(b);
},
drawMap: function() {
$("#map").empty(), this.createCanvas(), $.each(this.exercises, function(a, b) {
b.incoming = [], b.outgoing = [];
}), (this.zoomLevel === this.ZOOM_TOPICS || this.zoomLevel === this.ZOOM_HYBRID) && $.each(this.maplayout.topics, function(a, b) {
var c = $("<div>").appendTo($("#map"));
c.addClass("exercise"), c.css({
left: Math.round((b.x - KMapEditor.minV) * KMapEditor.X_SPACING) + "px",
top: Math.round((b.y - KMapEditor.minH) * KMapEditor.Y_SPACING - 20) + "px",
width: KMapEditor.LABEL_WIDTH + "px",
display: "none"
}), $("<img>").attr({
src: b.icon_url + "?4"
}).appendTo(c), $("<div>").addClass("exercise exercise-label").css({
"font-size": "12px",
width: "80px",
display: "none"
}).text(b.standalone_title).appendTo(c), KMapEditor.zoomLevel === KMapEditor.ZOOM_HYBRID && c.css({
width: "80px",
opacity: .5
});
}), this.zoomLevel === this.ZOOM_TOPICS && $.each(this.maplayout.polylines, function(a, b) {
var c = "";
$.each(b.path, function(a, b) {
c += Raphael.format("L{0},{1}", (b.x - KMapEditor.minV) * KMapEditor.X_SPACING + KMapEditor.LABEL_WIDTH / 2, (b.y - KMapEditor.minH) * KMapEditor.Y_SPACING);
}), c = "M" + c.substr(1), KMapEditor.raphael.path(c).attr({
"stroke-width": 1,
stroke: "#999"
});
}), (this.zoomLevel === this.ZOOM_EXERCISES || this.zoomLevel === this.ZOOM_HYBRID) && $.each(this.exercises, function(a, b) {
var c = $("<div>").appendTo($("#map"));
c.addClass("exercise"), c.css({
left: (b.v_position - KMapEditor.minV) * KMapEditor.X_SPACING + "px",
top: (b.h_position - KMapEditor.minH) * KMapEditor.Y_SPACING - KMapEditor.ICON_SIZE / 2 + "px",
width: KMapEditor.LABEL_WIDTH + "px",
cursor: KMapEditor.readonly ? "pointer" : "move"
}), $("<img>").attr({
src: b.live ? KMapEditor.IMG_LIVE : KMapEditor.IMG_DEV,
width: KMapEditor.ICON_SIZE,
height: KMapEditor.ICON_SIZE
}).addClass("exercise").addClass(b.live ? "ex-live" : "ex-dev").bind("dragstart", function(a) {
a.preventDefault();
}).appendTo(c), KMapEditor.zoomLevel === KMapEditor.ZOOM_EXERCISES && $("<div>").addClass("exercise exercise-label").text(b.display_name).css({
width: KMapEditor.LABEL_WIDTH + "px", display: "none"
}).appendTo(c), c.data("exercise", b), b.div = c, $.each(b.prerequisites, function(a, c) {
KMapEditor.addPath(c, b.name);
}), KMapEditor.selected.indexOf(b.name) !== -1 && (c.find(".exercise-label").addClass("exercise-selected"), c.find("img").attr({
src: b.live ? KMapEditor.IMG_SELECTED : KMapEditor.IMG_SELECTED_DEV
})), c.bind("mousedown", function(a) {
$(".exercise").zIndex(2), c.zIndex(3), a.shiftKey ? (KMapEditor.updateForm(null), KMapEditor.selected.push(b.name), c.find(".exercise-label").addClass("exercise-selected"), c.find("img").attr({
src: b.live ? KMapEditor.IMG_SELECTED : KMapEditor.IMG_SELECTED_DEV
})) : KMapEditor.selected.length <= 1 && ($(".exercise-label").removeClass("exercise-selected"), c.find(".exercise-label").addClass("exercise-selected"), $("img.ex-live").attr({
src: KMapEditor.IMG_LIVE
}), $("img.ex-dev").attr({
src: KMapEditor.IMG_DEV
}), c.find("img").attr({
src: b.live ? KMapEditor.IMG_SELECTED : KMapEditor.IMG_SELECTED_DEV
}), KMapEditor.updateForm(b.name));
});
if (!KMapEditor.readonly) {
var d, e;
c.draggable({
start: function(a, c) {
d = b.h_position, e = b.v_position;
},
drag: function(a, c) {
b.h_position = (c.position.top + KMapEditor.ICON_SIZE / 2) / KMapEditor.Y_SPACING + KMapEditor.minH, b.v_position = c.position.left / KMapEditor.X_SPACING + KMapEditor.minV, $.each(b.incoming, function(a, c) {
KMapEditor.delPath(c[0], b.name), KMapEditor.addPath(c[0], b.name);
}), $.each(b.outgoing, function(a, c) {
KMapEditor.delPath(b.name, c[0]), KMapEditor.addPath(b.name, c[0]);
});
},
stop: function(a, c) {
b.h_position = Math.round(c.position.top / KMapEditor.Y_SPACING + KMapEditor.minH), b.v_position = Math.round(c.position.left / KMapEditor.X_SPACING + KMapEditor.minV);
var f = b.h_position - d, g = b.v_position - e;
$.each(KMapEditor.selected, function(a, c) {
c !== b.name && (KMapEditor.exercises.get(c).h_position += f, KMapEditor.exercises.get(c).v_position += g);
}), $.each(KMapEditor.selected, function(a, b) {
$.each(KMapEditor.exercises.get(b).incoming, function(a, c) {
KMapEditor.delPath(c[0], b), KMapEditor.addPath(c[0], b);
}), $.each(KMapEditor.exercises.get(b).outgoing, function(a, c) {
KMapEditor.delPath(b, c[0]), KMapEditor.addPath(b, c[0]);
}), KMapEditor.exercises.get(b).div.css({
left: (KMapEditor.exercises.get(b).v_position - KMapEditor.minV) * KMapEditor.X_SPACING + "px",
top: (KMapEditor.exercises.get(b).h_position - KMapEditor.minH) * KMapEditor.Y_SPACING - KMapEditor.ICON_SIZE / 2 + "px"
});
}), $("#h_position").text(b.v_position), $("#v_position").text(b.h_position);
}
});
}
});
},
updateForm: function(a) {
if (a !== null) {
this.selected = [ a ], $(".exercise-properties").show(), $("#ex-title").html(this.exercises.get(a).display_name), this.exercises.get(a).live ? $("#live_yes").attr("checked", !0) : $("#live_no").attr("checked", !0), $("input[name=short_display_name]").val(this.exercises.get(a).short_display_name), $("#h_position").text(this.exercises.get(a).v_position), $("#v_position").text(this.exercises.get(a).h_position), $("input[name=seconds_per_fast_problem]").val(this.exercises.get(a).seconds_per_fast_problem), $("#prereqs-container").empty(), $.each(this.exercises.get(a).incoming, function(a, b) {
KMapEditor.readonly ? $("<div>").html(b[0]).appendTo($("#prereqs-container")) : $("<div>").html(b[0] + ' (<a href="#" onclick="KMapEditor.deletePrereq(&quot;' + b[0] + '&quot;);return false;">remove</a>)').appendTo($("#prereqs-container"));
}), $("#covers-container").empty(), $.each(this.exercises.get(a).covers, function(a, b) {
KMapEditor.readonly ? $("<div>").html(b).appendTo($("#covers-container")) : $("<div>").html(b + ' (<a href="#" onclick="KMapEditor.deleteCover(&quot;' + b + '&quot;);return false;">remove</a>)').appendTo($("#covers-container"));
}), $("#related-video-wait").show(), $("#related-video-control").hide();
var b = function() {
$("#video-container").empty(), $.each(KMapEditor.exercises.get(a).related_video_readable_ids, function(a, b) {
KMapEditor.readonly ? $("div").html(b).appendTo($("#video-container")) : $("<div id='related-video-" + b + "'>").html(b + ' (<a href="#" onclick="KMapEditor.deleteVideo(&quot;' + b + '&quot;);return false;">remove</a>)').appendTo($("#video-container"));
}), $("#video-container").sortable({
update: function(b, c) {
KMapEditor.exercises.get(a).related_video_readable_ids = $("#video-container").sortable("toArray").map(function(a) {
return a.substring(14);
});
}
}), $("#related-video-wait").hide(), $("#related-video-control").show();
};
this.exercises.get(a).related_video_readable_ids === undefined ? $.ajax({
url: "/api/v1/exercises/" + a,
type: "GET",
dataType: "json",
contentType: "application/json; charset=utf-8",
success: function(c) {
KMapEditor.defaultVersion.get(a).related_video_readable_ids = c.related_video_readable_ids.slice(), KMapEditor.editVersion.get(a).related_video_readable_ids = c.related_video_readable_ids.slice(), KMapEditor.candidateVersion.get(a).related_video_readable_ids = c.related_video_readable_ids.slice(), b();
}
}) : b();
} else $("#ex-title").html(""), $(".exercise-properties").hide();
},
isDirty: function(a) {
var b = KMapEditor.editVersion.get(a.name);
return a.live !== b.live || a.h_position !== b.h_position || a.v_position !== b.v_position || a.seconds_per_fast_problem !== b.seconds_per_fast_problem || a.short_display_name !== b.short_display_name || JSON.stringify(a.covers) !== JSON.stringify(b.covers) || JSON.stringify(a.prerequisites) !== JSON.stringify(b.prerequisites) || JSON.stringify(a.related_video_readable_ids) !== JSON.stringify(b.related_video_readable_ids);
},
addPath: function(a, b) {
var c = this.raphael.set();
c.push(this.raphael.path(Raphael.format("M{0},{1}L{2},{3}", (this.exercises.get(a).v_position - this.minV) * this.X_SPACING + this.LABEL_WIDTH / 2, (this.exercises.get(a).h_position - this.minH) * this.Y_SPACING, (this.exercises.get(b).v_position - this.minV) * this.X_SPACING + this.LABEL_WIDTH / 2, (this.exercises.get(b).h_position - this.minH) * this.Y_SPACING)).attr({
"stroke-width": 1,
stroke: "#999"
})), this.exercises.get(b).incoming.push([ a, c ]), this.exercises.get(a).outgoing.push([ b, c ]);
},
delPath: function(a, b) {
var c = $.map(this.exercises.get(a).outgoing, function(a) {
if (a[0] !== b) return [ a ];
}), d = $.map(this.exercises.get(b).incoming, function(b) {
if (b[0] !== a) return [ b ];
}), e = $.map(this.exercises.get(a).outgoing, function(a) {
if (a[0] === b) return a[1];
}), f = $.map(this.exercises.get(b).incoming, function(b) {
if (b[0] === a) return b[1];
});
e[0].remove(), f[0].remove(), this.exercises.get(a).outgoing = c, this.exercises.get(b).incoming = d;
},
populateExerciseLists: function() {
var a = $.map(this.editVersion, function(a) {
return a.name;
});
a.sort(), $.each(a, function(a, b) {
$("<option>").attr("value", b).text(b).appendTo($("#add-prereq")), $("<option>").attr("value", b).text(b).appendTo($("#add-cover"));
});
},
addPrereq: function() {
this.exercises.get(this.selected[0]).prerequisites.push($("#add-prereq").val()), this.addPath($("#add-prereq").val(), this.selected[0]), this.updateForm(this.selected[0]), $("#add-prereq").val(0);
},
deletePrereq: function(a) {
this.exercises.get(this.selected[0]).prerequisites = $.map(this.exercises.get(this.selected[0]).prerequisites, function(b) {
if (b !== a) return b;
}), this.delPath(a, this.selected[0]), this.updateForm(this.selected[0]);
},
addCover: function() {
this.exercises.get(this.selected[0]).covers.push($("#add-cover").val()), this.updateForm(this.selected[0]), $("#add-cover").val(0);
},
deleteCover: function(a) {
this.exercises.get(this.selected[0]).covers = $.map(this.exercises.get(this.selected[0]).covers, function(b) {
if (b !== a) return b;
}), this.updateForm(this.selected[0]);
},
addVideo: function(a) {
KMapEditor.exercises.get(KMapEditor.selected[0]).related_video_readable_ids.push(a.value.slice(7)), KMapEditor.updateForm(KMapEditor.selected[0]), $("#add-video-input").val("");
},
deleteVideo: function(a) {
this.exercises.get(this.selected[0]).related_video_readable_ids = $.map(this.exercises.get(this.selected[0]).related_video_readable_ids, function(b) {
if (b !== a) return b;
}), this.updateForm(this.selected[0]);
},
findExercise: function(a) {
ex = KMapEditor.exercises.get(a.value.slice(10));
var b = $("#map-container").height(), c = $("#map-container").width() - parseInt($("#map-container").css("left"));
$("#map").css({
"margin-top": (-ex.h_position + KMapEditor.minH) * KMapEditor.Y_SPACING + (b / 2 - KMapEditor.Y_SPACING),
"margin-left": (-ex.v_position + KMapEditor.minV) * KMapEditor.X_SPACING + (c - KMapEditor.LABEL_WIDTH) / 2
}), KMapEditor.saveMapCoords(), KMapEditor.selected = [ ex.name ], KMapEditor.updateForm(ex.name), $(".exercise-label").removeClass("exercise-selected"), $("img.ex-live").attr({
src: KMapEditor.IMG_LIVE
}), $("img.ex-dev").attr({
src: KMapEditor.IMG_DEV
}), ex.div.find(".exercise-label").addClass("exercise-selected"), ex.div.find("img").attr({
src: ex.live ? KMapEditor.IMG_SELECTED : KMapEditor.IMG_SELECTED_DEV
}), $("#find-exercise").val("");
}
};

$(document).ready(function() {
$("#map-edit-message").text("Getting exercise data").show(), $.getJSON("/api/v1/exercises", function(a) {
$("#map-edit-message").text("Getting unpublished changes"), $.getJSON("/api/v1/topicversion/edit/changelist", function(b) {
$("#map-edit-message").text("Getting default map layout"), $.getJSON("/api/v1/topicversion/default/maplayout", function(c) {
$("#map-edit-message").text("Getting map layout changes"), $.getJSON("/api/v1/topicversion/edit/maplayout", function(d) {
$("#map-edit-message").hide(), KMapEditor.init(a, b, c, d);
});
});
});
});
});