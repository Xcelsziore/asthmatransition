function FastMarkerOverlayInit() {
com = {
redfin: {}
}, com.redfin.FastMarkerOverlay = function(a, b) {
this.setMap(a), this._markers = b;
}, com.redfin.FastMarkerOverlay.prototype = new google.maps.OverlayView, com.redfin.FastMarkerOverlay.prototype.onAdd = function() {
this._div = document.createElement("div");
var a = this.getPanes();
a.overlayMouseTarget.appendChild(this._div);
}, com.redfin.FastMarkerOverlay.prototype.copy = function(a) {
var b = this._markers, c = b.length, d = new Array(c);
while (c--) d[c] = b[c].copy();
return new com.redfin.FastMarkerOverlay(a, b);
}, com.redfin.FastMarkerOverlay.prototype.draw = function() {
if (!this._div) return;
var a = this.getProjection(), b = this._markers.length, c = [];
while (b--) {
var d = this._markers[b], e = a.fromLatLngToDivPixel(d._latLng);
c.push("<div style='position:absolute; left:"), c.push(e.x + d._leftOffset), c.push("px; top:"), c.push(e.y + d._topOffset), c.push("px;"), d._zIndex && (c.push(" z-index:"), c.push(d._zIndex), c.push(";")), c.push("'"), d._divClassName && (c.push(" class='"), c.push(d._divClassName), c.push("'")), c.push(" id='"), c.push(d._id), c.push("' >");
var f = d._htmlTextArray, g = f.length, h = c.length;
while (g--) c[g + h] = f[g];
c.push("</div>");
}
this._div.innerHTML = c.join("");
}, com.redfin.FastMarkerOverlay.prototype.hide = function() {
if (!this._div) return;
this._div.style.display = "none";
}, com.redfin.FastMarkerOverlay.prototype.unhide = function() {
if (!this._div) return;
this._div.style.display = "block";
}, com.redfin.FastMarkerOverlay.prototype.onRemove = function() {
this._div.parentNode.removeChild(this._div), this._div = null;
}, com.redfin.FastMarker = function(a, b, c, d, e, f, g) {
this._id = a, this._latLng = b, this._htmlTextArray = c, this._divClassName = d, this._zIndex = e, this._leftOffset = f || 0, this._topOffset = g || 0;
}, com.redfin.FastMarker.prototype.copy = function() {
var a = this._htmlTextArray, b = a.length, c = new Array(b);
while (b--) c[b] = a[b];
return new com.redfin.FastMarker(this._id, latLng, c, this._divClassName, this._zIndex, this._leftOffset, this._topOffset);
};
}

function KnowledgeMapInitGlobals() {
window.KnowledgeMapGlobals = {
colors: {
blue: "#0080C9",
green: "#8EBE4F",
red: "#E35D04",
gray: "#FFFFFF"
},
iconClasses: {
exercise: {
Proficient: "node-complete",
Review: "node-review",
Suggested: "node-suggested",
Normal: "node-not-started"
}
},
coordsHome: {
lat: -2.064844,
lng: .736268,
zoom: 6,
when: 0
},
latMin: 90,
latMax: -90,
lngMin: 180,
lngMax: -180,
nodeSpacing: {
lat: .392,
lng: .35
},
options: {
getTileUrl: function(a, b) {
return "/images/map-tiles/field_" + Math.floor(Math.random() * 4 + 1) + ".jpg";
},
tileSize: new google.maps.Size(256, 256),
maxZoom: 9,
minZoom: 6,
isPng: !1
},
xyToLatLng: function(a, b) {
return new google.maps.LatLng(-1 * (b - 1) * KnowledgeMapGlobals.nodeSpacing.lat, a * KnowledgeMapGlobals.nodeSpacing.lng);
}
};
}

function KnowledgeMapDrawer(a, b) {
var c = this;
this.container = a, this.knowledgeMap = b, this.init = function() {
$("#" + this.container + " .toggle-drawer").click(function() {
return c.toggle(), !1;
}), $(window).resize(function() {
c.resize();
}), this.resize();
}, this.isExpanded = function() {
var a = $("#" + this.container + " .dashboard-drawer").css("left").toLowerCase();
return a === "0px" || a === "auto" || a === "";
}, this.toggle = function() {
if (this.fToggling) return;
var a = this.isExpanded(), b = $("#" + this.container + " .dashboard-drawer"), d = a ? -1 * (b.width() + 20) : 0, e = $("#" + this.container + " .dashboard-title"), f = a ? -1 * (e.width() + 10) : 5;
e.animate({
left: f
}, 500), this.fToggling = !0, b.animate({
left: d
}, 500, function() {
c.fToggling = !1;
});
if (c.knowledgeMap) {
var g = a ? 0 : 340;
$("#" + this.container + " .map-canvas").animate({
marginRight: g + "px",
left: g + "px"
}, 500, _.bind(c.triggerResize, c));
}
}, this.resize = function() {
var a = $("#" + this.container), b = $(".dashboard-drawer", a).add(".dashboard-drawer-inner", a).add(".dashboard-map", a), d = $(window).height(), e = b.offset().top, f = $("#end-of-page-spacer").outerHeight(!0), g = d - (e + f);
b.height(g);
var h = 20 + $("#dashboard-review-exercises").height(), i = $(".dashboard-drawer-inner", a);
i.height(i.height() - h), c.triggerResize();
}, this.triggerResize = function() {
c.knowledgeMap && c.knowledgeMap.map && google.maps.event.trigger(c.knowledgeMap.map, "resize");
}, this.init();
}

function KnowledgeMap(a) {
if (typeof google == "undefined") {
alert("Please make sure you're not using any browser extensions or addons that may be blocking google.com,\nwhich is needed to display the Khan Academy exercises.\n\nOnce you've done that, restart your browser and reload this page.");
return;
}
window.KnowledgeMapGlobals || KnowledgeMapInitGlobals(), (!window.com || !window.com.redfin) && FastMarkerOverlayInit();
var b = this;
this.nodeClickHandler = function(a, b) {
return !0;
}, this.updateFilterTimout = null, this.modelsByName = {}, this.topicPolylineModels = [], this.filterSettings = new Backbone.Model({
filterText: "---",
userShowAll: !1
}), this.numSuggestedExercises = 0, this.nodeRowViews = [], this.nodeMarkerViews = {}, this.map = null, this.overlay = null, this.dictNodes = {}, this.dictEdges = {}, this.markers = [], this.topicPolylines = [], this.latLngBounds = null, this.fFirstDraw = !0, this.fCenterChanged = !1, this.fZoomChanged = !1, this.fDragging = !1, this.admin = !!a.admin, this.newGoal = !!a.newGoal, this.init = function(a) {
this.containerID = a.container ? "#" + a.container : null, this.elementTable = {}, a.hideDrawer || (this.drawer = new KnowledgeMapDrawer(a.container, this)), this.admin || b.getElement("exercise-all-exercises").click(function() {
b.toggleShowAll();
}), this.filterSettings.set({
userShowAll: this.admin
}), Handlebars.registerPartial("knowledgemap-exercise", Templates.get("shared.knowledgemap-exercise")), a.topic_graph_json && (_.map(a.topic_graph_json.topics, function(a) {
a.admin = this.admin;
var b = new KnowledgeMapModels.Topic(a);
return this.modelsByName[b.get("name")] = b, b;
}, this), this.topicPolylineModels = _.map(a.topic_graph_json.polylines, function(a) {
return new KnowledgeMapModels.Polyline(a);
})), _.map(a.graph_dict_data, function(a) {
var c = a.goal_req || a.status === "Proficient" || a.status === "Review";
b.newGoal && c && (a.invalidForGoal = !0), a.admin = this.admin;
var d = new KnowledgeMapModels.Exercise(a);
return this.modelsByName[d.get("name")] = d, d;
}, this), this.initSidebar(), this.initMap(), this.initFilter();
}, this.initSidebar = function() {
var a = this.admin ? null : this.getElement("suggested-exercises-content"), b = this.getElement("all-exercises-content"), c = function() {
return $("<div>", {
"class": "exercise-badge"
});
};
_.each(this.modelsByName, function(d) {
var e, f = d.viewType();
d.get("isSuggested") && (e = c(), e.appendTo(a), this.nodeRowViews.push(new f({
model: d,
el: e,
type: "suggested",
admin: this.admin,
parent: this
})), this.numSuggestedExercises++), e = c(), e.appendTo(b), this.nodeRowViews.push(new f({
model: d,
el: e,
type: "all",
admin: this.admin,
parent: this
}));
}, this), this.filterSettings.get("userShowAll") || this.getElement(".dashboard-drawer-inner.fancy-scrollbar").on("scroll.inflateVisible", $.proxy(this.inflateVisible, this));
var d = function(a) {
var b = _.find(this.nodeRowViews, function(a) {
return a.visible;
}), c;
b ? c = b.$el.outerHeight(!0) : c = 86;
var d = this.getElement(".dashboard-drawer-inner.fancy-scrollbar").height();
temporaryDetachElement(this.getElement("exercise-list"), function() {
this.doFilter(a, c, d);
}, this);
};
this.filterSettings.bind("change", d, this);
}, this.queryRowsRendered = !1, this.inflateVisible = function(a) {
if (this.queryRowsRendered) return;
_.each(this.nodeRowViews, function(a) {
a.visible && !a.inflated && a.inflate();
}), this.queryRowsRendered = !0;
var b = this.filterSettings.get("userShowAll") && this.filterSettings.get("filterText");
b && $(".dashboard-drawer-inner.fancy-scrollbar").off("scroll.inflateVisible");
}, this.doFilter = function(a, b, c) {
b = b || 0, c = c || $(".dashboard-drawer-inner.fancy-scrollbar").height(), c *= 1.3;
var d = 0, e = this.filterSettings.get("userShowAll"), f = this.filterSettings.get("filterText"), g = this.map.getBounds();
g && (g = KnowledgeMapViews.NodeMarker.extendBounds(g)), _.each(this.nodeRowViews, function(a) {
var h = a.model.get("lowercaseName"), i;
f.length == 1 ? i = h[0] == f : i = h.indexOf(f) >= 0;
var j = f || e || a.options.type != "all";
a.visible = j && i;
if (a.visible) {
if (d < c || this.admin) a.inflated || a.inflate();
a.$el.css("display", "block"), b === 0 && (b = a.$el.outerHeight(!0)), d += b;
} else a.$el.css("display", "none");
a.options.type == "all" && this.nodeMarkerViews[a.nodeName] && this.nodeMarkerViews[a.nodeName].setFiltered(!i, g);
}, this), this.queryRowsRendered = !1, this.queryNodesRendered = !1;
}, this.initMap = function() {
_.each(this.modelsByName, function(a) {
this.addNode(a.toJSON()), _.each(a.get("prereqs"), function(b) {
this.addEdge(a.get("name"), b);
}, this);
}, this);
var b = this.getElement("map-canvas");
this.map = new google.maps.Map(b.get(0), {
mapTypeControl: !1,
streetViewControl: !1,
scrollwheel: !1
});
var c = new google.maps.ImageMapType(KnowledgeMapGlobals.options);
this.map.mapTypes.set("knowledge", c), this.map.setMapTypeId("knowledge");
var d = $.extend({}, KnowledgeMapGlobals.coordsHome), e = $.parseJSON(window.localStorage["map_coords:" + USERNAME] || "{}");
$.extend(d, e), a.mapCoords && a.mapCoords.when > d.when && (d = a.mapCoords);
if (this.newGoal || this.admin) d.zoom = KnowledgeMapGlobals.options.maxZoom - 1;
this.map.setCenter(new google.maps.LatLng(d.lat, d.lng)), this.map.setZoom(d.zoom), this.layoutGraph(), this.drawOverlay(), this.latLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(KnowledgeMapGlobals.latMin, KnowledgeMapGlobals.lngMin), new google.maps.LatLng(KnowledgeMapGlobals.latMax, KnowledgeMapGlobals.lngMax)), _.bindAll(this, "onCenterChange", "onIdle", "finishRenderingNodes", "onDragStart", "onDragEnd"), google.maps.event.addListener(this.map, "center_changed", this.onCenterChange), google.maps.event.addListener(this.map, "idle", this.onIdle), google.maps.event.addListener(this.map, "center_changed", this.finishRenderingNodes), google.maps.event.addListener(this.map, "dragstart", this.onDragStart), google.maps.event.addListener(this.map, "dragend", this.onDragEnd), this.delegateNodeEvents(), this.giveNasaCredit(), $(window).on("beforeunload", $.proxy(this.saveMapCoords, this));
}, this.setNodeClickHandler = function(a) {
this.nodeClickHandler = a;
}, this.delegateNodeEvents = function() {
var a = function(a) {
return function(c) {
var d = b.nodeMarkerViews[$(this).attr("data-id")];
d && d[a](c);
};
};
$(".dashboard-map").delegate(".nodeLabel", {
click: a("click"),
mouseenter: a("mouseenter"),
mouseleave: a("mouseleave")
});
}, this.panToNode = function(a) {
var b = this.dictNodes[a];
this.map.getZoom() != b.preferredZoom && this.map.setZoom(b.preferredZoom), this.map.panTo(b.latLng);
}, this.escapeSelector = function(a) {
return a.replace(/(:|\.)/g, "\\$1");
}, this.giveNasaCredit = function() {
var a = $("<div class='creditLabel'>Image Credit: SDSS, DSS Consortium, NASA/ESA/STScI</div>");
a[0].index = 0, this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(a[0]);
}, this.layoutGraph = function() {
var a = this.map.getZoom(), b = this;
$.each(this.dictNodes, function(c, d) {
b.drawMarker(d, a);
}), $.each(this.dictEdges, function(c, d) {
for (var e = 0; e < d.length; e++) b.drawEdge(b.dictNodes[c], d[e], a);
}), this.drawTopicPolylines();
}, this.getMapClass = function() {
return "dashboard-map zoom" + this.map.getZoom();
}, this.drawOverlay = function() {
var a = this;
this.overlay = new com.redfin.FastMarkerOverlay(this.map, this.markers), this.overlay.drawOriginal = this.overlay.draw, this.overlay.draw = function() {
this.drawOriginal(), a.fFirstDraw || a.onZoomChange(), $(a.containerID).find(".dashboard-map").attr("class", a.getMapClass()).end().find(".nodeLabel").each(function() {
var b = $(this), c = b.attr("data-id"), d = a.nodeMarkerViews[c];
d ? d.setElement(b) : (d = new KnowledgeMapViews.NodeMarker({
model: a.modelsByName[c],
el: $(this),
parent: a
}), a.nodeMarkerViews[c] = d);
}), a.fFirstDraw = !1;
};
}, this.addNode = function(a) {
this.dictNodes[a.name] = a;
}, this.addEdge = function(a, b) {
this.dictEdges[a] || (this.dictEdges[a] = []);
var c = this.dictEdges[a];
c[c.length] = {
target: b
};
}, this.nodeStatusCount = function(a) {
var b = 0;
for (var c = 1; c < arguments.length; c++) arguments[c].status == a && b++;
return b;
}, this.drawTopicPolylines = function() {
var a = this.map.getZoom() == KnowledgeMapGlobals.options.minZoom;
this.topicPolylines = _.map(this.topicPolylineModels, function(b) {
return new google.maps.Polyline({
path: b.get("latLngPath"),
strokeColor: KnowledgeMapGlobals.colors.gray,
strokeOpacity: .48,
strokeWeight: 1,
clickable: !1,
map: a ? this.map : null
});
}, this);
}, this.drawEdge = function(a, b, c) {
var d = this.dictNodes[b.target];
if (!a || !d) return;
var e = [ a.latLng, d.latLng ], f = this.nodeStatusCount("Proficient", a, d), g = this.nodeStatusCount("Suggested", a, d), h = this.nodeStatusCount("Review", a, d), i = KnowledgeMapGlobals.colors.gray, j = .48;
f == 2 ? (i = KnowledgeMapGlobals.colors.blue, j = 1) : f == 1 && g == 1 && (i = KnowledgeMapGlobals.colors.green, j = 1), b.line = new google.maps.Polyline({
path: e,
strokeColor: i,
strokeOpacity: j,
strokeWeight: 1,
clickable: !1,
map: this.getMapForEdge(b, c)
});
}, this.drawMarker = function(a, b) {
a.latLng = KnowledgeMapGlobals.xyToLatLng(a.x, a.y);
var c = a.latLng.lat(), d = a.latLng.lng();
c < KnowledgeMapGlobals.latMin && (KnowledgeMapGlobals.latMin = c), c > KnowledgeMapGlobals.latMax && (KnowledgeMapGlobals.latMax = c), d < KnowledgeMapGlobals.lngMin && (KnowledgeMapGlobals.lngMin = d), d > KnowledgeMapGlobals.lngMax && (KnowledgeMapGlobals.lngMax = d);
var e = [];
e.push("<a href='", a.url, "' data-id='", a.name, "' class='", a.className, "'>");
if (a.nodeType === "exercise") {
var f = KnowledgeMapGlobals.iconClasses.exercise, g = f[a.status] || f.Normal;
e.push("<div class='node-icon ", g, "'></div>");
} else e.push("<img class='node-icon' src='", a.iconUrl, "'>");
e.push("<div class='node-text'>", a.display_name, "</div></a>");
var h = new com.redfin.FastMarker("marker-" + a.name, a.latLng, e, "", 1, 0, 0);
this.markers[this.markers.length] = h;
}, this.getMapForEdge = function(a, b) {
return b != KnowledgeMapGlobals.options.minZoom ? this.map : null;
}, this.highlightNode = function(a, b) {
var c = this.nodeMarkerViews[a];
c && c.setHighlight(b);
}, this.onZoomChange = function() {
var a = this.map.getZoom();
if (a < KnowledgeMapGlobals.options.minZoom) return;
if (a > KnowledgeMapGlobals.options.maxZoom) return;
this.fZoomChanged = !0;
var b = this;
$.each(this.dictEdges, function(c, d) {
for (var e = 0; e < d.length; e++) {
var f = d[e].line;
if (f == null) return;
var g = b.getMapForEdge(d[e], a);
f.getMap() != g && f.setMap(g);
}
}), _.each(this.topicPolylines, function(b) {
var c = a === KnowledgeMapGlobals.options.minZoom;
c !== !!b.getMap() && b.setMap(c ? this.map : null);
}, this);
}, this.getMapCoords = function() {
var a = this.map.getCenter(), b = {
lat: a.lat(),
lng: a.lng(),
zoom: this.map.getZoom(),
when: +(new Date)
};
return b;
}, this.saveMapCoords = function() {
if (this.newGoal) return;
$.post("/savemapcoords", this.getMapCoords());
}, this.onDragStart = function() {
this.fDragging = !0;
}, this.onDragEnd = function() {
setTimeout($.proxy(function() {
this.fDragging = !1;
}, this), 1);
}, this.onIdle = function() {
if (!this.fCenterChanged && !this.fZoomChanged) return;
if (this.newGoal) return;
this.map.panBy(0, 0);
if (window.localStorage && window.JSON) {
var a = this.getMapCoords();
window.localStorage["map_coords:" + USERNAME] = JSON.stringify(a);
}
}, this.queryNodesRendered = !0, this.finishRenderingNodes = function(a) {
if (this.queryNodesRendered) return;
this.queryNodesRendered = !0, _.each(this.nodeRowViews, function(a) {
a.options.type == "all" && this.nodeMarkerViews[a.nodeName] && this.nodeMarkerViews[a.nodeName].updateAppearance();
}, this);
}, this.onCenterChange = function() {
this.fCenterChanged = !0;
var a = this.map.getCenter();
if (this.latLngBounds.contains(a)) return;
var b = a, c = b.lng(), d = b.lat(), e = this.latLngBounds.getNorthEast().lng(), f = this.latLngBounds.getNorthEast().lat(), g = this.latLngBounds.getSouthWest().lng(), h = this.latLngBounds.getSouthWest().lat();
c < g && (c = g), c > e && (c = e), d < h && (d = h), d > f && (d = f), this.map.setCenter(new google.maps.LatLng(d, c));
}, this.initFilter = function() {
b.getElement("dashboard-filter-text").keyup(function() {
b.updateFilterTimeout == null && (b.updateFilterTimeout = setTimeout(function() {
b.updateFilter(), b.updateFilterTimeout = null;
}, 250));
}).placeholder(), b.getElement("dashboard-filter-clear").click(function() {
b.clearFilter();
}), this.clearFilter();
}, this.clearFilter = function() {
b.getElement("dashboard-filter-text").val(""), this.updateFilter();
}, this.updateFilter = function() {
var a = $.trim(b.getElement("dashboard-filter-text").val().toLowerCase());
b.filterSettings.set({
filterText: a
}), this.postUpdateFilter();
}, this.toggleShowAll = function() {
this.filterSettings.set({
userShowAll: !b.filterSettings.get("userShowAll")
}), this.postUpdateFilter();
}, this.postUpdateFilter = function() {
var a = {
suggested: 0,
all: 0
}, c = b.filterSettings.get("filterText");
$.each(b.nodeRowViews, function(b, c) {
c.visible && a[c.options.type]++;
}), c && a.all === 0 ? b.getElement("exercise-no-results").show() : b.getElement("exercise-no-results").hide(), c ? (b.getElement("dashboard-filter-clear").show(), b.admin || (b.getElement("hide-on-dashboard-filter").hide(), b.getElement("exercise-all-exercises").hide()), b.getElement("dashboard-all-exercises").find(".exercise-filter-count").html("(Showing " + a.all + " of " + b.nodeRowViews.length + ")").show()) : (b.getElement("dashboard-filter-clear").hide(), b.getElement("dashboard-all-exercises").find(".exercise-filter-count").hide(), b.admin || (b.getElement("hide-on-dashboard-filter").show(), b.getElement("exercise-all-exercises").show(), b.getElement("exercise-all-exercises-text").html(b.filterSettings.get("userShowAll") ? "Hide All" : "Show All")));
}, this.getElement = function(a) {
if (this.elementTable[a]) return this.elementTable[a];
var b = null;
this.containerID ? b = $(this.containerID + " ." + a) : b = $("." + a), this.elementTable[a] = b;
if (b.length === 0) throw new Error('Missing element: "' + a + '" in container "' + this.containerID + '"');
return b;
}, this.init(a);
}

(function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["maps-package_knowledgemap-topic"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i = "function", j = this.escapeExpression;
return f += '<div class="exercise-badge">\n	<span class="pan-to simple-button action-gradient" data-id="name" style="display:none;"><img src="/images/map-target.png" title="Show in map" alt="Show in map"></span>\n    <h4>\n        <div class="topic-exercise-badge">\n            <img class="topic-exercise-image" src="', h = c.icon_url, h ? g = h.call(b, {
hash: {}
}) : (g = b.icon_url, g = typeof g === i ? g() : g), f += j(g) + '">\n        </div>\n\n        <a href="', h = c.url, h ? g = h.call(b, {
hash: {}
}) : (g = b.url, g = typeof g === i ? g() : g), f += j(g) + '">', h = c.standalone_title, h ? g = h.call(b, {
hash: {}
}) : (g = b.standalone_title, g = typeof g === i ? g() : g), f += j(g) + "</a>\n\n        (", h = c.count_proficient, h ? g = h.call(b, {
hash: {}
}) : (g = b.count_proficient, g = typeof g === i ? g() : g), f += j(g) + "/", h = c.total, h ? g = h.call(b, {
hash: {}
}) : (g = b.total, g = typeof g === i ? g() : g), f += j(g) + " skills)\n    </h4>\n</div>\n", f;
});
})();

var KnowledgeMapModels = {};

KnowledgeMapModels.Node = Backbone.Model.extend({
setNodeAttrs: function(a, b, c, d, e, f, g) {
var h = "nodeLabel";
this.customClass && (h += " " + this.customClass), this.get("invalidForGoal") && (h += " goalNodeInvalid"), this.set({
name: a,
x: c,
y: d,
display_name: b,
lowercaseName: b.toLowerCase(),
iconUrl: e,
isSuggested: f,
className: h,
url: this.url(),
preferredZoom: this.preferredZoom,
nodeType: g
});
},
isClickableAtZoom: function(a) {
return !0;
}
}), KnowledgeMapModels.Topic = KnowledgeMapModels.Node.extend({
customClass: "topic",
preferredZoom: 6,
initialize: function(a) {
return this.setNodeAttrs(this.get("id"), this.get("standalone_title"), this.get("x"), this.get("y"), this.get("icon_url"), this.get("suggested"), "topic"), KnowledgeMapModels.Node.prototype.initialize.call(this, a);
},
viewType: function() {
return KnowledgeMapViews.TopicRow;
},
url: function() {
return "/topicexercise/" + this.get("id");
}
}), KnowledgeMapModels.Exercise = KnowledgeMapModels.Node.extend({
customClass: "exercise",
preferredZoom: 8,
initialize: function(a) {
return this.setNodeAttrs(this.get("name"), this.get("display_name"), this.get("v_position"), this.get("h_position"), null, this.get("states").suggested && !this.get("states").reviewing, "exercise"), KnowledgeMapModels.Node.prototype.initialize.call(this, a);
},
viewType: function() {
return KnowledgeMapViews.ExerciseRow;
},
url: function() {
return this.get("admin") ? "/editexercise?name=" + this.get("name") : "/exercise/" + this.get("name");
},
isClickableAtZoom: function(a) {
return a > 7;
}
}), KnowledgeMapModels.Polyline = Backbone.Model.extend({
initialize: function(a) {
return this.set({
latLngPath: _.map(this.get("path"), function(a) {
return KnowledgeMapGlobals.xyToLatLng(a.x, a.y);
})
}), Backbone.Model.prototype.initialize.call(this, a);
}
});

var KnowledgeMapViews = {};

KnowledgeMapViews.NodeRow = Backbone.View.extend({
initialize: function() {
this.visible = !1, this.nodeName = this.model.get("name"), this.parent = this.options.parent;
},
events: {
"click .skill-bar-title a": "onTitleClick",
"click .pan-to": "onPanToClick"
},
inflate: function() {
if (this.inflated) return;
var a = this.getTemplate(), b = this.model.toJSON();
b.disabled = this.model.get("invalidForGoal") || !1;
var c = $(a(b)), d = this;
c.hover(function() {
d.onBadgeMouseover(d.nodeName, c);
}, function() {
d.onBadgeMouseout(d.nodeName, c);
}), this.$el.replaceWith(c), this.setElement(c), this.inflated = !0;
},
onTitleClick: function(a) {
return this.parent.nodeClickHandler(this.model, a);
},
onBadgeMouseover: function(a, b) {
this.parent.highlightNode(a, !0), b.find(".pan-to").show();
},
onBadgeMouseout: function(a, b) {
this.parent.highlightNode(a, !1), b.find(".pan-to").hide();
},
onPanToClick: function() {
this.parent.panToNode(this.nodeName), this.parent.highlightNode(this.nodeName, !0);
}
}), KnowledgeMapViews.ExerciseRow = KnowledgeMapViews.NodeRow.extend({
getTemplate: function() {
return Templates.get(this.options.admin ? "shared.knowledgemap-admin-exercise" : "shared.knowledgemap-exercise");
},
showGoalIcon: function(a) {
a ? this.$(".exercise-goal-icon").show() : this.$(".exercise-goal-icon").hide();
}
}), KnowledgeMapViews.TopicRow = KnowledgeMapViews.NodeRow.extend({
getTemplate: function() {
return Templates.get("maps.knowledgemap-topic");
}
}), KnowledgeMapViews.NodeMarker = Backbone.View.extend({
initialize: function(a) {
this.nodeName = this.model.get("name"), this.filtered = !1, this.parent = this.options.parent;
},
setFiltered: function(a, b) {
a != this.filtered && (this.filtered = a);
var c;
if (b) {
var d = this.parent.dictNodes[this.nodeName];
c = b.contains(d.latLng);
} else c = !0;
c && this.updateAppearance();
},
updateAppearance: function() {
this.filtered ? this.$el.addClass("nodeLabelFiltered") : this.$el.removeClass("nodeLabelFiltered");
},
setHighlight: function(a) {
a ? this.$el.addClass("nodeLabelHighlight") : this.$el.removeClass("nodeLabelHighlight");
},
click: function(a) {
if (this.parent.fDragging) {
a.preventDefault();
return;
}
if (!this.model.isClickableAtZoom(this.parent.map.getZoom())) {
a.preventDefault();
return;
}
return this.parent.nodeClickHandler(this.model, a);
},
mouseenter: function() {
this.parent.highlightNode(this.nodeName, !0);
},
mouseleave: function() {
this.parent.highlightNode(this.nodeName, !1);
}
}, {
extendBounds: function(a, b, c) {
b = b || KnowledgeMapGlobals.nodeSpacing.lat, c = b || KnowledgeMapGlobals.nodeSpacing.lng;
var d = a.getNorthEast(), e = new google.maps.LatLng(d.lat() + b, d.lng() + c), f = a.getSouthWest(), g = new google.maps.LatLng(f.lat() - b, f.lng() - c);
return new google.maps.LatLngBounds(g, e);
}
});