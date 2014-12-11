!function(a) {
function d() {
var a = this, c = setTimeout(function() {
a.$element.unbind(b), e.call(a);
}, 500);
this.$element.one(b, function() {
clearTimeout(c), e.call(a);
});
}
function e(a) {
this.$element.hide().trigger("hidden"), f.call(this);
}
function f(c) {
var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
if (this.isShown && this.settings.backdrop) {
var f = a.support.transition && e;
this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(document.body), this.settings.backdrop != "static" && this.$backdrop.click(a.proxy(this.hide, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), f ? this.$backdrop.one(b, c) : c();
} else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(b, a.proxy(g, this)) : g.call(this)) : c && c();
}
function g() {
this.$backdrop.remove(), this.$backdrop = null;
}
function h() {
var b = this;
this.isShown && this.settings.keyboard ? a(document).bind("keyup.modal", function(a) {
a.which == 27 && b.hide();
}) : this.isShown || a(document).unbind("keyup.modal");
}
"use strict";
var b;
a(document).ready(function() {
a.support.transition = function() {
var a = document.body || document.documentElement, b = a.style, c = b.transition !== undefined || b.WebkitTransition !== undefined || b.MozTransition !== undefined || b.MsTransition !== undefined || b.OTransition !== undefined;
return c;
}(), a.support.transition && (b = "TransitionEnd", a.browser.webkit ? b = "webkitTransitionEnd" : a.browser.mozilla ? b = "transitionend" : a.browser.opera && (b = "oTransitionEnd"));
});
var c = function(b, c) {
return this.settings = a.extend({}, a.fn.modal.defaults, c), this.$element = a(b).delegate(".close", "click.modal", a.proxy(this.hide, this)), this.settings.show && this.show(), this;
};
c.prototype = {
toggle: function() {
return this[this.isShown ? "hide" : "show"]();
},
show: function() {
var c = this;
return this.isShown = !0, this.$element.trigger("show"), h.call(this), f.call(this, function() {
var d = a.support.transition && c.$element.hasClass("fade");
c.$element.appendTo(document.body).show(), d && c.$element[0].offsetWidth, c.$element.addClass("in"), d ? c.$element.one(b, function() {
c.$element.trigger("shown");
}) : c.$element.trigger("shown");
}), this;
},
hide: function(b) {
b && b.preventDefault();
if (!this.isShown) return this;
var c = this;
return this.isShown = !1, h.call(this), this.$element.trigger("hide").removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? d.call(this) : e.call(this), this;
}
}, a.fn.modal = function(b) {
var d = this.data("modal");
return d ? b === !0 ? d : (typeof b == "string" ? d[b]() : d && d.toggle(), this) : (typeof b == "string" && (b = {
show: /show|toggle/.test(b)
}), this.each(function() {
a(this).data("modal", new c(this, b));
}));
}, a.fn.modal.Modal = c, a.fn.modal.defaults = {
backdrop: !1,
keyboard: !1,
show: !1
}, a(document).ready(function() {
a("body").delegate("[data-controls-modal]", "click", function(b) {
b.preventDefault();
var c = a(this).data("show", !0);
a("#" + c.attr("data-controls-modal")).modal(c.data());
});
});
}(window.jQuery || window.ender), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["stories-package_story"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "disabled";
}
function g(a, b) {
return "rotate";
}
function h(a, b) {
var d = "", e;
d += '\n        <div class="content-teaser">\n            ', e = a.youtube_id, e = c["if"].call(a, e, {
hash: {},
inverse: q.program(8, j, b),
fn: q.program(6, i, b)
});
if (e || e === 0) d += e;
return d += "\n        </div>\n        ", d;
}
function i(a, b) {
var d = "", e, f;
return d += '\n            <div class="youtube-thumbnail-container">\n                <img class="youtube-thumbnail" src="http://img.youtube.com/vi/', f = c.youtube_id, f ? e = f.call(a, {
hash: {}
}) : (e = a.youtube_id, e = typeof e === o ? e() : e), d += p(e) + '/hqdefault.jpg">\n                <div class="youtube-thumbnail-title">', f = c.youtube_title, f ? e = f.call(a, {
hash: {}
}) : (e = a.youtube_title, e = typeof e === o ? e() : e), d += p(e) + '</div>\n                <img class="youtube-thumbnail-play" src="/images/stories/youtube_play.png">\n            </div>\n            ', d;
}
function j(a, b) {
var d = "", e, f;
d += "\n            &ldquo;", f = c.teaser_html, f ? e = f.call(a, {
hash: {}
}) : (e = a.teaser_html, e = typeof e === o ? e() : e);
if (e || e === 0) d += e;
return d += "&hellip;&rdquo;\n            ", d;
}
function k(a, b) {
var d = "", e, f;
return d += '\n<div class="tape envelope-under">', f = c.author, f ? e = f.call(a, {
hash: {}
}) : (e = a.author, e = typeof e === o ? e() : e), d += p(e) + "<br>", f = c.date, f ? e = f.call(a, {
hash: {}
}) : (e = a.date, e = typeof e === o ? e() : e), d += p(e) + "</div>\n", d;
}
function l(a, b) {
return '\n<div class="envelope-under">\n    <a href="#" class="btn large primary share-story-btn-bottom">Share your story</a>\n</div>\n';
}
c = c || a.helpers;
var m = "", n, o = "function", p = this.escapeExpression, q = this;
m += '<div class="story ', n = b.disabled, n = c["if"].call(b, n, {
hash: {},
inverse: q.program(3, g, e),
fn: q.program(1, f, e)
});
if (n || n === 0) m += n;
m += '">\n    <div class="envelope envelope-background">\n        ', n = b.empty, n = c.unless.call(b, n, {
hash: {},
inverse: q.noop,
fn: q.program(5, h, e)
});
if (n || n === 0) m += n;
m += '\n        <div class="envelope envelope-foreground">&nbsp;</div>\n    </div>\n</div>\n\n<div class="slit-overlay">&nbsp;</div>\n<div class="slit-overlay-background">&nbsp;</div>\n\n', n = b.author, n = c["if"].call(b, n, {
hash: {},
inverse: q.program(12, l, e),
fn: q.program(10, k, e)
});
if (n || n === 0) m += n;
return m += "\n", m;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["stories-package_story-full"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n        <iframe width="100%" height="380" src="http://www.youtube.com/embed/', f = c.youtube_id, f ? e = f.call(a, {
hash: {}
}) : (e = a.youtube_id, e = typeof e === m ? e() : e), d += n(e) + '?rel=0" frameborder="0" allowfullscreen></iframe>\n        ', d;
}
function g(a, b) {
var d = "", e, f;
d += "\n        ", f = c.content_html, f ? e = f.call(a, {
hash: {}
}) : (e = a.content_html, e = typeof e === m ? e() : e);
if (e || e === 0) d += e;
return d += "\n        ", d;
}
function h(a, b) {
return "disabled";
}
function i(a, b) {
return "disabled";
}
c = c || a.helpers;
var j = "", k, l, m = "function", n = this.escapeExpression, o = this;
j += '<div id="modal-story" class="modal fade hide">\n\n    <div class="modal-header">\n        <a href="#" class="close-button close">x</a>\n        <h3>\n            <span class="tape">From ', l = c.author, l ? k = l.call(b, {
hash: {}
}) : (k = b.author, k = typeof k === m ? k() : k), j += n(k) + ", ", l = c.date, l ? k = l.call(b, {
hash: {}
}) : (k = b.date, k = typeof k === m ? k() : k), j += n(k) + '</span>\n        \n            <span class="share-container">\n                <iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?count=none&amp;related=khanacademy&amp;text=Read%20this%20story%20from%20a%20Khan%20Academy%20user" style="width:56px; height:20px;"></iframe>\n\n                <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.khanacademy.org%2Fstories%2F', l = c.name, l ? k = l.call(b, {
hash: {}
}) : (k = b.name, k = typeof k === m ? k() : k), j += n(k) + '&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=verdana&amp;height=21&amp;appId=160249463991765" scrolling="no" frameborder="0" style="border:none; position:relative; top:1px; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>\n            </span>\n\n        </h3>\n    </div>\n\n    <div class="modal-body">\n        ', k = b.youtube_id, k = c["if"].call(b, k, {
hash: {},
inverse: o.program(3, g, e),
fn: o.program(1, f, e)
});
if (k || k === 0) j += k;
j += '\n    </div>\n\n    <div class="modal-footer">\n\n        <div class="row">\n            <div class="span4">\n                <button class="btn prev-btn ', k = b.prev_story, k = c.unless.call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(5, h, e)
});
if (k || k === 0) j += k;
j += '">&larr; Previous</button>\n            </div>\n\n            <div class="span-middle center">\n                &nbsp;\n            </div>\n\n            <div class="span4 right">\n                <button class="btn next-btn ', k = b.next_story, k = c.unless.call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(7, i, e)
});
if (k || k === 0) j += k;
return j += '">Next &rarr;</button>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n', j;
});
}(), function(a, b, c, d, e, f, g) {
function h(a) {
var b, d, e = this, f = a.length, g = 0, h = e.i = e.j = e.m = 0;
e.S = [], e.c = [], f || (a = [ f++ ]);
while (g < c) e.S[g] = g++;
for (g = 0; g < c; g++) b = e.S[g], h = k(h + b + a[g % f]), d = e.S[h], e.S[g] = d, e.S[h] = b;
e.g = function(b) {
var d = e.S, f = k(e.i + 1), g = d[f], h = k(e.j + g), i = d[h];
d[f] = i, d[h] = g;
var j = d[k(g + i)];
while (--b) f = k(f + 1), g = d[f], h = k(h + g), i = d[h], d[f] = i, d[h] = g, j = j * c + d[k(g + i)];
return e.i = f, e.j = h, j;
}, e.g(c);
}
function i(a, b, c, d, e) {
c = [], e = typeof a;
if (b && e == "object") for (d in a) if (d.indexOf("S") < 5) try {
c.push(i(a[d], b - 1));
} catch (f) {}
return c.length ? c : a + (e != "string" ? "\0" : "");
}
function j(a, b, c, d) {
a += "", c = 0;
for (d = 0; d < a.length; d++) b[k(d)] = k((c ^= b[k(d)] * 19) + a.charCodeAt(d));
a = "";
for (d in b) a += String.fromCharCode(b[d]);
return a;
}
function k(a) {
return a & c - 1;
}
b.seedrandom = function(l, m) {
var n = [], o;
return l = j(i(m ? [ l, a ] : arguments.length ? l : [ (new Date).getTime(), a, window ], 3), n), o = new h(n), j(o.S, a), b.random = function() {
var b = o.g(d), h = g, i = 0;
while (b < e) b = (b + i) * c, h *= c, i = o.g(1);
while (b >= f) b /= 2, h /= 2, i >>>= 1;
return (b + i) / h;
}, l;
}, g = b.pow(c, d), e = b.pow(2, e), f = e * 2, j(b.random(), a);
}([], Math, 256, 6, 52), $(function() {
$(".share-story-btn").click(function(a) {
$(".stories-submit").slideToggle(function() {
$(".stories-submit textarea").focus();
}).find(".submit-story-btn").html("Send us your story").removeClass("disabled").removeClass("success").addClass("primary"), a.preventDefault();
}), $(".share-story-btn-bottom").click(function(a) {
$("html, body").animate({
scrollTop: 0
}, 250, function() {
$(".stories-submit").is(":visible") || $(".share-story-btn").trigger("click");
}), a.preventDefault();
}), $(".submit-story-btn").click(function(a) {
$("#story").val().length && ($(this).addClass("disabled").html("Sending&hellip;"), $.post("/stories/submit", {
story: $("#story").val(),
name: $("#name").val(),
email: $("#email").val(),
share: $("#shareAllow").is(":checked") ? "1" : "0"
}, function() {
$(".submit-story-btn").removeClass("primary").addClass("success").html("Success!"), setTimeout(function() {
$(".stories-submit").slideUp().find("textarea").val("");
}, 3e3);
})), a.preventDefault();
});
});

var Stories = Stories || {};

Stories.router = null, Stories.views = {}, Stories.cShown = 0, Stories.cRendered = 0, Stories.render = function(a) {
var b = null, c = null, d = 3;
$.each(a.content, function(e, f) {
e % d == 0 && (b = $("<div class='row'></div>"), $(a.target).append(b)), c && !f.empty && (c.next_story = f, f.prev_story = c);
var g = new Stories.SmallView({
model: f
});
b.append($(g.render(e).el)), Stories.views[f.name] = g, c = f;
}), Stories.router = new Stories.StoryRouter, Backbone.history.start({
pushState: !0,
root: "/stories/"
});
}, Stories.SmallView = Backbone.View.extend({
template: Templates.get("stories.story"),
render: function(a) {
var b = this.model;
return $(this.el).html(this.template(this.model)).addClass("span-one-third").addClass("story-container").find(".story").addClass(this.model.envelope || this.randomEnvelope()).not(".disabled").addClass(this.randomRotation()).click(function() {
Stories.navigateTo(b);
}), Stories.cRendered++, this;
},
randomRotation: function() {
return this.randomChoice([ "rotate-6", "rotate-neg-6" ]);
},
randomEnvelope: function() {
return Stories.cRendered == 0 ? "envelope-1" : Stories.cRendered == 1 ? "envelope-2" : this.randomChoice([ "envelope-1", "envelope-2", "envelope-3", "envelope-4" ]);
},
randomChoice: function(a) {
Math.seedrandom(this.model.name);
var b = Math.floor(Math.random() * a.length);
return a[b];
},
showFull: function() {
$(".content-teaser-show, .content-teaser-hide").removeClass("content-teaser-show").removeClass("content-teaser-hide");
var a = this.model, b = $(this.el).find(".story");
setTimeout(function() {
$(b).addClass("content-teaser-show"), setTimeout(function() {
$(b).addClass("content-teaser-hide");
var c = $("#modal-story"), d = new Stories.FullView({
model: a
}), e = Stories.cShown > 0 ? "fade" : "";
$(d.render().el).find("#modal-story").removeClass(Stories.cShown > 0 ? "fade" : "").appendTo(document.body).bind("show", function() {
Stories.cShown++;
}).bind("hidden", function() {
$(this).remove(), $(b).removeClass("content-teaser-show").removeClass("content-teaser-hide"), Stories.cShown--, Stories.cShown || Stories.navigateTo(null);
}).modal({
keyboard: !0,
backdrop: !0,
show: !0
}).find(".modal-body").scroll(function() {
if (!this.fixedScrollRender) {
var a = $(this).parents(".modal");
$(a).height($(a).height() + 1), $(a).height($(a).height() - 1), this.fixedScrollRender = !0;
}
}), c.removeClass("fade").modal("hide");
}, 400);
}, 1);
}
}), Stories.FullView = Backbone.View.extend({
template: Templates.get("stories.story-full"),
render: function() {
var a = this.model;
return $(this.el).html(this.template(this.model)).find(".prev-btn").not(".disabled").click(function() {
Stories.navigateTo(a.prev_story);
}).end().end().find(".next-btn").not(".disabled").click(function() {
Stories.navigateTo(a.next_story);
}), this;
}
}), Stories.navigateTo = function(a) {
a ? Stories.router.navigate(a.name, !0) : Stories.router.navigate("");
}, Stories.StoryRouter = Backbone.Router.extend({
routes: {
"": "showNone",
":story": "showStory"
},
showNone: function() {
$("#modal-story").modal("hide");
},
showStory: function(a) {
var b = Stories.views[a];
b && b.showFull();
}
});