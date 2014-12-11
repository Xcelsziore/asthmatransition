(function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topic-package_content-topic-videos"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n      <li class="video-link"><a href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '" data-tag="Topic Page Subtopic Library"><span class="indent"><span class=\'vid-progress v', f = c.key_id, f ? e = f.call(a, {
hash: {}
}) : (e = a.key_id, e = typeof e === j ? e() : e), d += k(e) + "'>", f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === j ? e() : e), d += k(e) + "</span></span></a></li>\n    ", d;
}
function g(a, b) {
var d = "", e, f;
return d += '\n      <li class="video-link"><a href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === j ? e() : e), d += k(e) + '" data-tag="Topic Page Subtopic Library"><span class="indent"><span class=\'vid-progress v', f = c.key_id, f ? e = f.call(a, {
hash: {}
}) : (e = a.key_id, e = typeof e === j ? e() : e), d += k(e) + "'>", f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === j ? e() : e), d += k(e) + "</span></span></a></li>\n    ", d;
}
c = c || a.helpers;
var h = "", i, j = "function", k = this.escapeExpression, l = this;
h += '<div>\n  <div data-role="header" class="main-header">\n    <div class="topic-video thumbnail_td">\n      <a href="', i = b.topic, i = i == null || i === !1 ? i : i.thumbnail_link, i = i == null || i === !1 ? i : i.href, i = typeof i === j ? i() : i, h += k(i) + '" data-tag="Topic Page Subtopic Featured" data-youtube-id="', i = b.topic, i = i == null || i === !1 ? i : i.thumbnail_link, i = i == null || i === !1 ? i : i.youtube_id, i = typeof i === j ? i() : i, h += k(i) + '" class="thumbnail_link modal-video">\n        <div class="thumb" style="background-image:url(\'', i = b.topic, i = i == null || i === !1 ? i : i.thumbnail_link, i = i == null || i === !1 ? i : i.thumb_urls, i = i == null || i === !1 ? i : i.hq, i = typeof i === j ? i() : i, h += k(i) + '\')"></div>\n        <div class="thumbnail_label"><div class="thumbnail_desc">', i = b.topic, i = i == null || i === !1 ? i : i.thumbnail_link, i = i == null || i === !1 ? i : i.desc_html, i = typeof i === j ? i() : i;
if (i || i === 0) h += i;
h += '</div><div class="thumbnail_teaser">', i = b.topic, i = i == null || i === !1 ? i : i.thumbnail_link, i = i == null || i === !1 ? i : i.teaser_html, i = typeof i === j ? i() : i;
if (i || i === 0) h += i;
h += "</div></div>\n      </a>\n    </div>\n    <div class=\"topic-info\">\n      <div class='topic-title'>", i = b.topic, i = i == null || i === !1 ? i : i.title, i = typeof i === j ? i() : i, h += k(i) + "</div>\n      <div class='topic-desc'>", i = b.topic, i = i == null || i === !1 ? i : i.description, i = typeof i === j ? i() : i;
if (i || i === 0) h += i;
h += '</div>\n    </div>\n  </div>\n  <div class="videos-list">\n    <div class="videos-header">Videos</div>\n    <ol class="first">\n    ', i = b.childrenCol1, i = c.each.call(b, i, {
hash: {},
inverse: l.noop,
fn: l.program(1, f, e)
});
if (i || i === 0) h += i;
h += "\n    </ol>\n    <ol>\n    ", i = b.childrenCol2, i = c.each.call(b, i, {
hash: {},
inverse: l.noop,
fn: l.program(3, g, e)
});
if (i || i === 0) h += i;
return h += "\n    </ol>\n  </div>\n</div>\n", h;
});
})(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topic-package_root-topic-view"] = a(function(a, b, c, d, e) {
function f(a, b, d) {
var e = "", f, i, j;
e += '\n      <div class="subtopic thumbnail_td ', f = a.notFirst, f = c["if"].call(a, f, {
hash: {},
inverse: n.program(4, h, b),
fn: n.program(2, g, b)
});
if (f || f === 0) e += f;
e += '">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/', f = d.topic_info, f = f == null || f === !1 ? f : f.extended_slug, f = typeof f === o ? f() : f, e += p(f) + "/", j = c.id, j ? f = j.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === o ? f() : f), e += p(f) + '" data-id="', j = c.id, j ? f = j.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === o ? f() : f), e += p(f) + '">\n          <div class="thumb" style="background-image:url(\'', f = a.thumbnail_link, f = f == null || f === !1 ? f : f.thumb_urls, f = f == null || f === !1 ? f : f.hq, f = typeof f === o ? f() : f, e += p(f) + '\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">', j = c.title, j ? f = j.call(a, {
hash: {}
}) : (f = a.title, f = typeof f === o ? f() : f), e += p(f) + '</div>\n          <div class="topic-description">', f = a.description_truncate_length, i = a.description, j = c.ellipsis, f = j ? j.call(a, i, f, {
hash: {}
}) : q.call(a, "ellipsis", i, f, {
hash: {}
});
if (f || f === 0) e += f;
return e += '</div>\n          <div class="topic-video-count">Browse ', j = c.child_count, j ? f = j.call(a, {
hash: {}
}) : (f = a.child_count, f = typeof f === o ? f() : f), e += p(f) + " videos</div>\n        </div>  \n        </a>\n      </div>\n    ", e;
}
function g(a, b) {
return "not-first";
}
function h(a, b) {
return "first";
}
function i(a, b, d) {
var e = "", f, g, h;
e += '\n      <div class="subtopic thumbnail_td ', f = a.notFirst, f = c["if"].call(a, f, {
hash: {},
inverse: n.program(9, k, b),
fn: n.program(7, j, b)
});
if (f || f === 0) e += f;
e += '">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/', f = d.topic_info, f = f == null || f === !1 ? f : f.extended_slug, f = typeof f === o ? f() : f, e += p(f) + "/", h = c.id, h ? f = h.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === o ? f() : f), e += p(f) + '" data-id="', h = c.id, h ? f = h.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === o ? f() : f), e += p(f) + '">\n          <div class="thumb" style="background-image:url(\'', f = a.thumbnail_link, f = f == null || f === !1 ? f : f.thumb_urls, f = f == null || f === !1 ? f : f.hq, f = typeof f === o ? f() : f, e += p(f) + '\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">', h = c.title, h ? f = h.call(a, {
hash: {}
}) : (f = a.title, f = typeof f === o ? f() : f), e += p(f) + '</div>\n          <div class="topic-description">', f = a.description_truncate_length, g = a.description, h = c.ellipsis, f = h ? h.call(a, g, f, {
hash: {}
}) : q.call(a, "ellipsis", g, f, {
hash: {}
});
if (f || f === 0) e += f;
return e += '</div>\n          <div class="topic-video-count">Browse ', h = c.child_count, h ? f = h.call(a, {
hash: {}
}) : (f = a.child_count, f = typeof f === o ? f() : f), e += p(f) + " videos</div>\n        </div>  \n        </a>\n      </div>\n    ", e;
}
function j(a, b) {
return "not-first";
}
function k(a, b) {
return "first";
}
c = c || a.helpers;
var l = "", m, n = this, o = "function", p = this.escapeExpression, q = c.helperMissing;
l += '<div>\n  <div data-role="header" class="main-header">\n    <div class="topic-video thumbnail_td">\n      <a href="', m = b.topic_info, m = m == null || m === !1 ? m : m.marquee_video, m = m == null || m === !1 ? m : m.href, m = typeof m === o ? m() : m, l += p(m) + '" data-tag="Topic Page Root Featured" data-youtube-id="', m = b.topic_info, m = m == null || m === !1 ? m : m.marquee_video, m = m == null || m === !1 ? m : m.youtube_id, m = typeof m === o ? m() : m, l += p(m) + '" class="thumbnail_link modal-video">\n        <div class="thumb" style="background-image:url(\'', m = b.topic_info, m = m == null || m === !1 ? m : m.marquee_video, m = m == null || m === !1 ? m : m.thumb_urls, m = m == null || m === !1 ? m : m.hq, m = typeof m === o ? m() : m, l += p(m) + '\')"></div>\n        <div class="thumbnail_container">\n          <div class="thumbnail_label"><div class="thumbnail_desc">', m = b.topic_info, m = m == null || m === !1 ? m : m.marquee_video, m = m == null || m === !1 ? m : m.desc_html, m = typeof m === o ? m() : m;
if (m || m === 0) l += m;
l += '</div><div class="thumbnail_teaser">', m = b.topic_info, m = m == null || m === !1 ? m : m.marquee_video, m = m == null || m === !1 ? m : m.teaser_html, m = typeof m === o ? m() : m;
if (m || m === 0) l += m;
l += "</div></div>\n        </div>\n      </a>\n    </div>\n    <div class=\"topic-info\">\n      <div class='topic-title'>", m = b.topic_info, m = m == null || m === !1 ? m : m.topic, m = m == null || m === !1 ? m : m.title, m = typeof m === o ? m() : m, l += p(m) + "</div>\n      <div class='topic-desc'>", m = b.topic_info, m = m == null || m === !1 ? m : m.topic, m = m == null || m === !1 ? m : m.description, m = typeof m === o ? m() : m;
if (m || m === 0) l += m;
l += '</div>\n    </div>\n  </div>\n  <div class="subtopic-header">Topics</div>\n  <div class="subtopic-list-container">\n  <div class="subtopics-list first">\n    ', m = b.subtopicsA, m = c.each.call(b, m, {
hash: {},
inverse: n.noop,
fn: n.programWithDepth(f, e, b)
});
if (m || m === 0) l += m;
l += '\n  </div>\n  <div class="subtopics-list second">\n    ', m = b.subtopicsB, m = c.each.call(b, m, {
hash: {},
inverse: n.noop,
fn: n.programWithDepth(i, e, b)
});
if (m || m === 0) l += m;
return l += "\n  </div>\n  </div>\n</div>\n", l;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["topic-package_subtopic-nav"] = a(function(a, b, c, d, e) {
function f(a, b, d) {
var e = "", f;
e += '\n  <li class="subheading"><span>Topics</span></li>\n  ', f = a.topic_info, f = f == null || f === !1 ? f : f.subtopics, f = c.each.call(a, f, {
hash: {},
inverse: l.noop,
fn: l.programWithDepth(g, b, d)
});
if (f || f === 0) e += f;
return e += "\n  ", e;
}
function g(a, b, d) {
var e = "", f, g;
return e += '\n    <li data-id="', g = c.id, g ? f = g.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === j ? f() : f), e += k(f) + '">\n      <a class="subtopic-link" data-tag="Topic Page Nav Subtopic" href="/', f = d.topic_info, f = f == null || f === !1 ? f : f.extended_slug, f = typeof f === j ? f() : f, e += k(f) + "/", g = c.id, g ? f = g.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === j ? f() : f), e += k(f) + '" data-id="', g = c.id, g ? f = g.call(a, {
hash: {}
}) : (f = a.id, f = typeof f === j ? f() : f), e += k(f) + '">\n        ', g = c.title, g ? f = g.call(a, {
hash: {}
}) : (f = a.title, f = typeof f === j ? f() : f), e += k(f) + '\n        <div class="right-arrow"></div>\n      </a>\n    </li>\n  ', e;
}
c = c || a.helpers;
var h = "", i, j = "function", k = this.escapeExpression, l = this;
h += '<ul>\n  <li data-id="">\n    <a class="subtopic-link" data-tag="Topic Page Nav Root Topic" href="/', i = b.topic_info, i = i == null || i === !1 ? i : i.extended_slug, i = typeof i === j ? i() : i, h += k(i) + '" data-id="">\n      <h2 class=\'topic-heading\'>', i = b.topic_info, i = i == null || i === !1 ? i : i.topic, i = i == null || i === !1 ? i : i.standalone_title, i = typeof i === j ? i() : i, h += k(i) + '</h2>\n      <div class="right-arrow"></div>\n    </a>\n  </li>\n  ', i = b.topic_info, i = i == null || i === !1 ? i : i.subtopics, i = c["if"].call(b, i, {
hash: {},
inverse: l.noop,
fn: l.programWithDepth(f, e, b)
});
if (i || i === 0) h += i;
return h += "\n</ul>\n\n", h;
});
}(), function() {
var a = {}, b = null, c = null, d = null, e = {}, f = 0;
window.TopicPage = {
init: function(a) {
$.ajax({
url: "/api/v1/topic/" + a + "/topic-page",
dataType: "json",
success: function(a) {
rootPath = "/" + a.extended_slug + "/", TopicPage.finishInit(rootPath, a);
}
});
},
finishInit: function(b, d) {
var f = this;
c = d, Handlebars.registerPartial("youtube-player", Templates.get("shared.youtube-player")), e[d.marquee_video.youtube_id] = d.marquee_video, _.each(d.subtopics, function(b) {
a[b.id] = b, e[b.thumbnail_link.youtube_id] = b.thumbnail_link;
}), $(".topic-page-content").on("click", ".topic-page-content a.subtopic-link", function() {
return selectedID = $(this).attr("data-id"), f.router.navigate(selectedID, !0), !1;
}), $(".topic-page-content").on("click", ".topic-page-content a.subtopic-link-and-scroll", function() {
return selectedID = $(this).attr("data-id"), f.router.navigate(selectedID, !0), $("body").animate({
scrollTop: 0
}, 200, "easeInOutCubic"), !1;
}), $(".topic-page-content").on("click", "a.modal-video", function(a) {
var b = e[$(this).attr("data-youtube-id")];
if (b) {
var c = {
youtubeId: b.youtube_id,
relative_url: b.href,
title: b.title,
description: b.teaser_html
};
return ModalVideo.show(c), a.preventDefault(), !1;
}
return !0;
}), this.router = new this.SubTopicRouter, this.router.bind("all", Analytics.handleRouterNavigation), Backbone.history.start({
pushState: !0,
root: b
}), $(window).resize(function() {
TopicPage.growContent();
});
},
growContent: function() {
var a = $(".topic-page-content .content-pane"), b = a.children("div").height();
f = Math.max(f, b);
var c = $(window).height(), d = a.offset().top, e = $("#end-of-page-spacer").outerHeight(!0), g = c - (d + e), h = Math.max(f, g);
a.css("min-height", h + "px"), $(".nav-pane").css("min-height", h + "px");
},
SubTopicRouter: Backbone.Router.extend({
routes: {
"*subtopicID": "showSubtopic"
},
showSubtopic: function(e) {
var f = "";
e.charAt(0) === "/" && (e = e.substr(1)), KAConsole.log("Switching to subtopic: " + e), e === "" ? b = null : b = a[e] || null;
var g;
b ? (b.view = b.view || new TopicPage.ContentTopicView({
model: b,
viewCount: 0
}), b.view.show(), f = b.id, g = {
"Topic Title": b.title,
"Topic Type": "Subtopic",
"Topic View Count": b.view.options.viewCount
}) : (c.childVideos ? (d = d || new TopicPage.ContentTopicView({
model: c.childVideos,
viewCount: 0
}), g = {
"Topic Title": c.title,
"Topic Type": "Content topic"
}) : (d = d || new TopicPage.RootTopicView({
model: c,
viewCount: 0
}), g = {
"Topic Title": c.title,
"Topic Type": "Supertopic"
}), d.show(), g["Topic View Count"] = d.options.viewCount), Analytics.trackSingleEvent("Topic Page View", g), $(".topic-page-content .nav-pane").find("li.selected").removeClass("selected").end().find('li[data-id="' + f + '"]').addClass("selected"), TopicPage.growContent();
}
}),
ContentTopicView: Backbone.View.extend({
template: Templates.get("topic.content-topic-videos"),
initialize: function() {
this.render();
},
render: function() {
var a = $('.prerendered[data-id="' + this.model.id + '"]');
if (a.length) this.setElement(a.get(0)); else {
var b = Math.floor((this.model.children.length + 1) / 2), c = this.model.children.slice(0, b), d = this.model.children.slice(b);
$.each(c, function(a, b) {
a < 3 && (b.number = a + 1);
}), $(this.el).html(this.template({
topic: this.model,
childrenCol1: c,
childrenCol2: d
}));
}
VideoControls.initThumbnailHover($(this.el));
},
show: function() {
$(".topic-page-content .content-pane").children().detach().end().append(this.el), this.options.viewCount++;
}
}),
RootTopicView: Backbone.View.extend({
template: Templates.get("topic.root-topic-view"),
initialize: function() {
this.render();
},
render: function() {
var a = $('.prerendered[data-id="' + this.model.topic.id + '"]');
if (a.length) this.setElement(a.get(0)); else {
var b = Math.floor((this.model.subtopics.length + 1) / 2), c = this.model.subtopics.slice(0, b), d = this.model.subtopics.slice(b);
subtopicAddInfo = function(a, b) {
a > 0 && (b.notFirst = !0), a < 3 && (b.number = a + 1), b.description_truncate_length = b.title.length > 28 ? 38 : 68;
}, $.each(c, subtopicAddInfo), $.each(d, subtopicAddInfo), $(this.el).html(this.template({
topic_info: this.model,
subtopicsA: c,
subtopicsB: d
}));
}
VideoControls.initThumbnailHover($(this.el));
},
show: function() {
$(".topic-page-content .content-pane").children().detach().end().append(this.el), this.options.viewCount++;
}
})
};
}();