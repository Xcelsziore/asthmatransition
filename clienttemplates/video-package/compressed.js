var Video = {
SHOW_SUBTITLES_COOKIE: "show_subtitles",
waitingForVideo: null,
currentVideoPath: null,
currentVideoData: null,
rendered: !1,
youtubeBlocked: !1,
pushStateDisabled: !1,
needsUserVideoCSSReload: !1,
init: function(a) {
var b = this;
this.videoLibrary = a.videoLibrary || {}, this.loginURL = a.loginURL, a.videoTopLevelTopic ? (this.videoTopLevelTopic = a.videoTopLevelTopic, this.rootLength = 1 + a.videoTopLevelTopic.length, window.history && window.history.pushState && a.videoTopLevelTopic ? (this.router = new VideoRouter, this.router.bind("all", Analytics.handleRouterNavigation), Backbone.history.start({
pushState: !0,
root: "/" + a.videoTopLevelTopic + "/"
})) : (this.pushStateDisabled = !0, Video.navigateToVideo(window.location.pathname))) : this.initEventHandlers(), VideoControls.onYouTubeBlocked(function() {
var a = Templates.get("video.video-flv-player");
$("#youtube_blocked").css("visibility", "visible").css("left", "0px").css("position", "relative").html(a({
video_path: b.currentVideoPath
})), $("#idOVideo").hide(), $(".subtitles-link").hide(), $(".transcript-link").hide(), Video.hideSubtitles(), VideoStats.prepareAlternativePlayer(), b.youtubeBlocked = !0;
});
},
renderTemplates: function(a, b) {
var c = Templates.get("video.video-nav"), d = Templates.get("video.video-description"), e = Templates.get("video.video-header"), f = Templates.get("video.video-footer");
$("span.video-nav").html(c({
topic: a.topic,
video: b
})), $(".video-title").html(b.title), $("div.video-description").html(d({
topic: a.topic,
video: b
})), $("div.video-header").html(e({
topic: a.topic,
video: b
})), $("span.video-footer").html(f({
topic: a.topic,
video: b
}));
},
renderPage: function(a, b) {
var c = this;
b.related_exercises && b.related_exercises.length && (b.related_exercises[b.related_exercises.length - 1].last = !0);
if (!this.rendered) this.rendered = !0; else {
window._gaq && _gaq.push([ "_trackPageview", window.location.pathname ]);
if (this.needsUserVideoCSSReload) {
var d = "?reload=" + (new Date).getTime();
$('link[rel="stylesheet"]').each(function() {
this.href.indexOf("user_video_css") > -1 && (this.href = this.href.replace(/\?.*|$/, d));
}), this.needsUserVideoCSSReload = !1;
}
this.renderTemplates(a, b);
}
gae_bingo.bingo([ "videos_landing", "struggling_videos_landing" ]), document.title = b.title + " | " + a.topic.title + " | Khan Academy", this.currentVideoData = b, this.currentVideoPath = b.video_path;
var e = $("#video_dropdown");
if (e.length) {
e.css("display", "inline-block");
var f = $("#video_dropdown ol").menu();
f.width(f.width()).hide().css("position", "absolute"), f.bind("menuselect", function(a, b) {
if (c.pushStateDisabled) window.location.replace(b.item.children("a").attr("href")); else {
var d = b.item.children("a").attr("href").substr(c.rootLength);
Video.router.navigate(d, {
trigger: !0
});
}
}), $(document).bind("click focusin", function(a) {
$(a.target).closest("#video_dropdown").length === 0 && f.hide();
});
var g = $("#video_dropdown > a").button({
icons: {
secondary: "ui-icon-triangle-1-s"
}
}).show().click(function(a) {
f.css("display") === "none" ? f.show().menu("activate", a, $("#video_dropdown li[data-selected=selected]")).focus() : f.hide(), a.preventDefault();
});
}
$("span.video-footer").on("focus keydown", "input,textarea", function(a) {
VideoControls.setAutoPlayEnabled(!1);
});
if (this.youtubeBlocked) {
var h = Templates.get("video.video-flv-player");
$("#youtube_blocked").html(h({
video_path: this.currentVideoPath
})), VideoStats.prepareAlternativePlayer();
} else VideoControls.playVideo(b.youtube_id, b.key, !1);
Discussion.init(), Moderation.init(), Voting.init(), Comments.init(), QA.init(), this.initEventHandlers(), VideoStats.updatePointsSaved(b.videoPoints);
if (!this.pushStateDisabled) {
$("a.previous-video,a.next-video").click(function(a) {
if (c.pushStateDisabled) return !0;
var b = $(this).attr("href").substr(c.rootLength);
return Video.router.navigate(b, {
trigger: !0
}), a.stopPropagation(), !1;
});
if (b.next_video) {
var i = $("a.next-video").attr("href").substr(c.rootLength);
VideoControls.setAutoPlayCallback(function() {
Video.router.navigate(i, {
trigger: !0
});
});
} else VideoControls.setAutoPlayCallback(null);
} else VideoControls.setAutoPlayCallback(null);
VideoControls.initContinuousPlayLinks($("span.video-footer")), setTimeout(function() {
b.previous_video && Video.loadVideo(a.topic.id, b.previous_video.readable_id), b.next_video && Video.loadVideo(a.topic.id, b.next_video.readable_id);
}, 15e3), this.waitingForVideo = null;
},
updateVideoPoints: function(a) {
this.currentVideoData && (this.currentVideoData.videoPoints = a), VideoStats.updatePointsSaved(a), this.needsUserVideoCSSReload = !0;
},
initEventHandlers: function() {
$(".and-more").click(function() {
return $(this).hide(), $(".more-content").show(), !1;
}), $(".subtitles-link").click(function() {
return Video.toggleSubtitles(), !1;
}), readCookie(this.SHOW_SUBTITLES_COOKIE) && this.showSubtitles();
var a = $(".subtitles-container"), b = $(".transcript-link");
a.length && b.length && (InteractiveTranscript.init(a), b.click($.proxy(this._ontranscriptclick, this, a, b)));
var c = $(".video-energy-points");
c.data("title", c.attr("title").replace(/Sign in/, '<a href="' + this.loginURL + '">Sign in</a>')).removeAttr("title"), VideoStats.tooltip("#points-badge-hover", c.data("title"));
},
navigateToVideo: function(a) {
var b = a.indexOf("?");
b > -1 && (a = a.substr(0, b)), a.charAt(0) == "/" && (a = a.substr(1)), pathList = [ this.videoTopLevelTopic ].concat(a.split("/"));
if (pathList.length >= 3) {
var c = pathList[pathList.length - 1], d = pathList[pathList.length - 3];
this.waitingForVideo = {
topic: d,
video: c,
url: "/" + this.videoTopLevelTopic + "/" + a
}, this.loadVideo(d, c);
}
},
loadVideo: function(a, b) {
var c = this, d = Templates.get("video.video-description"), e = Video.waitingForVideo && Video.waitingForVideo.topic == a && Video.waitingForVideo.video == b;
if (this.videoLibrary[a] && this.videoLibrary[a].videos[b]) {
if (!e) return;
if (this.videoLibrary[a].videos[b] !== "LOADING") {
KAConsole.log("Switching to video: " + b + " in topic " + a), Video.renderPage(this.videoLibrary[a], this.videoLibrary[a].videos[b]);
return;
}
} else KAConsole.log("Loading video: " + b + " in topic " + a), url = "/api/v1/videos/" + a + "/" + b + "/play" + (this.videoLibrary[a] ? "" : "?topic=1"), this.videoLibrary[a] = this.videoLibrary[a] || {
videos: []
}, this.videoLibrary[a].videos[b] = "LOADING", $.ajax({
url: url,
success: function(d) {
var e = Video.waitingForVideo && Video.waitingForVideo.topic == a && Video.waitingForVideo.video == b;
d.topic && (c.videoLibrary[a].topic = d.topic), c.videoLibrary[a].videos[b] = d.video, e && (KAConsole.log("Switching to video: " + b + " in topic " + a), Video.renderPage(c.videoLibrary[a], d.video));
},
error: function() {
var c = Video.waitingForVideo && Video.waitingForVideo.topic == a && Video.waitingForVideo.video == b;
c && window.location.assign(Video.waitingForVideo.url);
}
});
e && ($("span.video-nav").html(""), $("div.video-description").html(d({
video: {
title: "Loading..."
},
loading: !0
})), $("div.video-header").html(""), $("span.video-footer").html(""));
},
_ontranscriptclick: function(a, b, c) {
a.is(":visible") ? (b.removeClass("toggled"), InteractiveTranscript.stop(), a.slideUp("fast")) : (b.addClass("toggled"), a.slideDown("fast", function() {
InteractiveTranscript.start(), window.gae_bingo && gae_bingo.bingo([ "interactive_transcript_shown", "interactive_transcript_shown_binary" ]);
}));
},
toggleSubtitles: function() {
$(".subtitles-warning").is(":visible") ? this.hideSubtitles() : this.showSubtitles();
},
hideSubtitles: function() {
eraseCookie(this.SHOW_SUBTITLES_COOKIE), Video.hideSubtitleElements();
},
hideSubtitleElements: function() {
$(".subtitles-link").removeClass("toggled"), $(".unisubs-videoTab").css("display", "none !important"), $(".subtitles-warning").hide(), $(".youtube-video").css("marginBottom", "0px"), Throbber.hide();
},
showSubtitleElements: function() {
$(".subtitles-link").addClass("toggled"), $(".youtube-video").css("marginBottom", "32px"), $(".subtitles-warning").show(), $(".unisubs-videoTab").css("display", "block !important");
},
showSubtitles: function() {
this.pushStateDisabled || (this.pushStateDisabled = !0), createCookie(this.SHOW_SUBTITLES_COOKIE, !0, 365), Video.showSubtitleElements(), $(".unisubs-videoTab").length === 0 && (window.setTimeout(function() {
Throbber.show($(".subtitles-warning"), !0);
}, 1), $.getScript("http://s3.www.universalsubtitles.org/js/mirosubs-widgetizer.js", function() {
window.setTimeout(function() {
VideoControls.player && VideoControls.player.getPlayerState() === 1 && (VideoControls.pause(), VideoControls.play());
}, 3e3);
}));
}
};

window.VideoRouter = Backbone.Router.extend({
routes: {
"*path": "video"
},
video: function(a) {
Video.navigateToVideo(a);
}
});

var InteractiveTranscript = {
POLL_MILLIS: 333,
autoscroll: !0,
pollIntervalId: null,
viewport: null,
init: function(a) {
var b = a.find(".subtitles");
b.delegate("a", "click", $.proxy(this._onsubtitleclick, this)), b.hover($.proxy(this._onhover, this)), this.viewport = b;
},
start: function() {
this.stop(), this._pollPlayer(), this.pollIntervalId = setInterval($.proxy(this._pollPlayer, this), this.POLL_MILLIS);
},
stop: function() {
clearInterval(this.pollIntervalId), this.pollIntervalId = null;
},
_onhover: function(a) {
this.autoscroll = a.type === "mouseleave";
},
_onsubtitleclick: function(a) {
if (!VideoStats.player) return;
var b = parseFloat($(a.target).parent().data("time"));
isNaN(b) || (VideoStats.player.seekTo(b, !0), VideoStats.player.playVideo()), window.gae_bingo && gae_bingo.bingo([ "interactive_transcript_subtitle_click", "interactive_transcript_subtitle_click_binary" ]);
},
_pollPlayer: function() {
if (!VideoStats.player) return;
var a = VideoStats.player.getCurrentTime(), b, c, d = this.viewport.find("li"), e = d.length, f;
for (f = 0; f < e; f++) {
b = parseFloat($(d[f]).data("time"));
if (!isNaN(b) && b > a) {
c = f === 0 ? d[0] : d[f - 1];
break;
}
}
$(c).is(".active") || this._setActiveSubtitle(c || d[e - 1]);
},
_setActiveSubtitle: function(a) {
var b, c;
this.viewport.find(".active").removeClass("active"), $(a).addClass("active"), this.autoscroll && (b = a.offsetTop, c = $(a).height(), this.viewport.stop().animate({
scrollTop: b - c * 3
}));
}
}, Discussion = {
init: function() {
VideoControls.initJumpLinks();
},
updateRemaining: function(a, b, c, d, e) {
setTimeout(function() {
var f = 0;
try {
f = a - parseInt($(b, e).val().length);
} catch (g) {
return;
}
f <= 0 ? $(c, e).addClass("chars_remaining_none") : $(c, e).removeClass("chars_remaining_none");
var h = $(b, e).parents("form");
h.length && (f < 0 ? $("input[type=button]", h).addClass("buttonDisabled").attr("disabled", "disabled") : $("input[type=button]", h).removeClass("buttonDisabled").removeAttr("disabled")), $(d, e).html(f);
}, 1);
}
}, Voting = {
init: function() {
$(".vote_for").live("click", Voting.voteEntity);
},
voteEntity: function(a) {
if (QA.showNeedsLoginNote(this, "to vote.")) return !1;
var b = $(this), c = parseInt(b.attr("data-vote_type"));
if (!c) return;
var d = b.attr("data-key");
if (!d) return !1;
var e = b.is(".voted"), f = b.parents(".comment, .answer, .question").first(), g = f.find(".sum_votes"), h = parseInt($.trim(g.attr("data-sum_original")));
$.post("/discussion/voteentity", {
entity_key: d,
vote_type: e ? 0 : c
}, function(a) {
Voting.finishVoteEntity(a, b, f, g, h);
}), Voting.clearVote(b, f, g, h);
var i = h + (e ? 0 : c);
return f.is(".comment") ? g.html(i + " vote" + (i == 1 ? "" : "s") + ", ") : g.html(i), g.addClass("sum_votes_changed"), e || b.addClass("voted"), !1;
},
clearVote: function(a, b, c, d) {
b.find("a.vote_for").removeClass("voted"), c.removeClass("sum_votes_changed").html(d);
},
finishVoteEntity: function(a, b, c, d, e) {
a && a.error && (this.clearVote(b, c, d, e), QA.showInfoNote(b.get(0), a.error));
}
}, Moderation = {
init: function() {
$(".mod_show").live("click", Moderation.showTools), $(".mod_tools .mod_edit").live("click", Moderation.editEntity), $(".mod_tools .mod_delete").live("click", Moderation.deleteEntity), $(".mod_tools .mod_change").live("click", Moderation.changeEntityType), $(".flag_show").live("click", Moderation.showFlagTools), $(".flag_tools .flag_as").live("click", Moderation.flagEntity);
},
showTools: function() {
var a = $(this).parents(".mod_tools");
if (!a.length) return;
return $(".mod_tools_show", a).css("display", "none"), $(".mod_tools_hidden", a).css("display", ""), !1;
},
showFlagTools: function() {
if (QA.showNeedsLoginNote(this, "to flag this item.")) return !1;
var a = $(this).parents(".flag_tools");
return a.length ? ($(".flag_tools_show", a).css("display", "none"), $(".flag_tools_hidden", a).css("display", ""), !1) : !1;
},
flagEntity: function() {
var a = $(this).attr("data-flag");
if (!a) return;
return Moderation.actionWithoutConfirmation(this, "/discussion/flagentity", {
flag: a
}, "flagged!");
},
deleteEntity: function() {
return Moderation.actionWithConfirmation(this, "/discussion/deleteentity", null, "Are you sure you want to delete this?", "deleted!");
},
editEntity: function() {
return QA.edit(this), !1;
},
changeEntityType: function() {
var a = $(this).attr("data-target_type");
if (!a) return;
return Moderation.actionWithConfirmation(this, "/discussion/changeentitytype", {
target_type: a
}, "Are you sure you want to change this to a " + a + "?", "changed to " + a + "!");
},
actionWithConfirmation: function(a, b, c, d, e) {
return confirm(d) ? (this.actionWithoutConfirmation(a, b, c, e), !1) : !1;
},
actionWithoutConfirmation: function(a, b, c, d) {
var e = $(a).attr("data-key");
return e ? (c || (c = {}), c.entity_key = e, $.post(b, c), Moderation.finishedAction(a, d), !1) : !1;
},
finishedAction: function(a, b) {
var c = $(a).parents(".tools_hidden");
if (!c.length) return;
c.text(b), Throbber.hide();
}
}, QA = {
page: 0,
init: function() {
var a = $(".question_text");
a.focus(QA.focusQuestion), a.change(QA.updateRemainingQuestion).keyup(QA.updateRemainingQuestion), a.placeholder(), $("form.questions").submit(function() {
return !1;
}), $("input.question_submit, input.answer_submit").live("click", QA.submit), $(".question_cancel, .answer_cancel").live("click", QA.cancel), $(".questions_container .question_container").live("mouseover", QA.hover).live("mouseout", QA.unhover).live("click", QA.expand), $(".close_note").live("click", QA.closeNote), $(window).resize(QA.repositionStickyNote), QA.loadPage($("#qa_page").val() || 0, !0, $("#qa_expand_key").val()), QA.enable(), $(".video-footer").on("mouseenter", ".author-nickname", function() {
HoverCard.createHoverCardQtip($(this));
});
},
initPagesAndQuestions: function() {
$("form.answers").submit(function() {
return !1;
}), $("a.questions_page").click(function() {
return QA.loadPage($(this).attr("page")), !1;
}), $(".add_yours").click(QA.expandAndFocus), $(".answer_text").focus(QA.focusAnswer).placeholder();
},
submit: function() {
var a = QA.getQAParent(this);
if (!a.length) return;
var b = $(a).is(".answer_container") ? "answer" : "question", c = $("." + b + "_text", a);
if (!$.trim(c.val()).length) return;
if (c.val() == c.attr("placeholder")) return;
var d = "&page=" + QA.page, e = "/discussion/add" + b, f = $("form." + b, a), g = b == "question" ? QA.finishSubmitQuestion : QA.finishSubmitAnswer;
if (QA.isInsideExistingQA(this)) {
e = "/discussion/editentity", f = $("textarea:first, input[name=entity_key]:first", a);
var h = $("#topic_key:first");
f = f.add(h);
}
$.post(e, f.serialize() + d, function(a) {
g(a, c[0]);
}), QA.disable(), Throbber.show($("." + b + "_cancel", a));
},
finishSubmitQuestion: function(a, b) {
setTimeout(function() {
QA.cancel.apply(b);
}, 1), QA.finishLoadPage(a), QA.enable();
},
finishSubmitAnswer: function(a, b) {
var c = QA.getQuestionParent(b);
if (!c.length) return;
setTimeout(function() {
QA.cancel.apply(b);
}, 1), $(".answers_container", c).html(a.html), VideoControls.initJumpLinks(), Throbber.hide(), QA.enable();
},
loadPage: function(a, b, c) {
try {
a = parseInt(a);
} catch (d) {
return;
}
if (a < 0) return;
$.get("/discussion/pagequestions", {
video_key: $("#video_key").val(),
topic_key: $("#topic_key").val(),
sort: $("#sort").val(),
qa_expand_key: c,
page: a
}, function(a) {
QA.finishLoadPage(a, b);
}), b || Throbber.show($(".questions_page_controls span"));
},
finishLoadPage: function(a, b) {
$(".questions_container").html(a.html), QA.page = a.page, QA.initPagesAndQuestions(), b || Throbber.hide(), VideoControls.initJumpLinks();
if (b && a.qa_expand_key) {
var c = $("#" + a.qa_expand_key);
c.length !== 0 && $("html, body").animate({
scrollTop: c.offset().top
}), a.count_notifications ? $("#top-header .notification-bubble").text(a.count_notifications) : $("#top-header .user-notification").hide();
}
},
getQAParent: function(a) {
var b = $(a).parents("div.answer_container");
return b.length ? b : QA.getQuestionParent(a);
},
getQuestionParent: function(a) {
return $(a).parents("div.question_container");
},
isInsideExistingQA: function(a) {
var b = QA.getQAParent(a);
return b.length ? $(".sig", b).length > 0 : !1;
},
updateRemainingQuestion: function() {
Discussion.updateRemaining(500, ".question_text", ".question_add_controls .chars_remaining", ".question_add_controls .chars_remaining_count");
},
disable: function() {
$(".question_text, .answer_text").attr("disabled", "disabled"), $(".question_submit, .answer_submit").addClass("buttonDisabled").attr("disabled", "disabled");
},
enable: function() {
$(".question_text, .answer_text").removeAttr("disabled"), $(".question_submit, .answer_submit").removeClass("buttonDisabled").removeAttr("disabled");
},
showNeedsLoginNote: function(a, b) {
return this.showNote($(".login_note"), a, b, function() {
$(".login_link").focus();
});
},
showInfoNote: function(a, b) {
return this.showNote($(".info_note"), a, b);
},
closeNote: function() {
return $(".note").hide(), !1;
},
showNote: function(a, b, c, d) {
if (a.length && b) {
$(".note_desc", a).text(c);
var e = $(b), f = e.offset(), g = $("#video-page").offset();
a.css("visibility", "hidden").css("display", "");
var h = f.top - g.top + e.height() / 2 - a.height() / 2, i = f.left - g.left + e.width() / 2 - a.width() / 2;
return a.css("top", h).css("left", i).css("visibility", "visible").css("display", ""), d && setTimeout(d, 50), !0;
}
return !1;
},
edit: function(a) {
var b = QA.getQAParent(a);
if (!b.length) return;
var c = $(b).is(".answer_container") ? "answer" : "question", d = $("." + c, b), e = $("." + c + "_controls_container", b), f = $("." + c + "_sig", b);
if (!d.length || !e.length || !f.length) return;
d.addClass(c + "_placeholder").removeClass(c), f.css("display", "none"), e.slideDown();
var g = $("<textarea name='" + c + "_text' class='" + c + "_text' rows=2 cols=40></textarea>"), h = /<br>/gi, i = /{newline}/g, j = $("span", d).first(), k = $.browser.msie ? j.html().replace(h, "{newline}") : j.html(), l = $("<div>").html(k);
$(".ellipsisExpand", l).remove();
var m = $.browser.msie ? l.text().replace(i, "\n") : l.text();
g.val($.trim(m)), j.css("display", "none").after(g), setTimeout(function() {
g.focus();
}, 1);
},
focusQuestion: function() {
if (QA.showNeedsLoginNote(this, "to ask your question.")) return !1;
var a = QA.getQAParent(this);
if (!a.length) return;
$(".question_controls_container", a).slideDown("fast"), QA.updateRemainingQuestion(), QA.showStickyNote();
},
cancel: function() {
var a = QA.getQAParent(this);
if (!a.length) return;
var b = $(a).is(".answer_container") ? "answer" : "question";
return $("." + b + "_text", a).val("").placeholder(), b == "question" && QA.hideStickyNote(), $("." + b + "_controls_container", a).slideUp("fast"), QA.isInsideExistingQA(this) && ($("textarea", a).first().remove(), $("span", a).first().css("display", ""), $("." + b + "_placeholder", a).addClass(b).removeClass(b + "_placeholder"), $("." + b + "_sig", a).slideDown("fast")), !1;
},
focusAnswer: function() {
if (QA.showNeedsLoginNote(this, "to answer this question.")) return !1;
var a = QA.getQAParent(this);
if (!a.length) return;
$(".answer_controls_container", a).slideDown("fast");
},
hover: function() {
if ($(this).is(".question_container_expanded")) return;
$(this).addClass("question_container_hover");
},
unhover: function() {
if ($(this).is(".question_container_expanded")) return;
$(this).removeClass("question_container_hover");
},
repositionStickyNote: function() {
$(".sticky_note").is(":visible") && QA.showStickyNote();
},
showStickyNote: function() {
$(".sticky_note").slideDown("fast");
},
hideStickyNote: function() {
$(".sticky_note").slideUp("fast");
},
expandAndFocus: function(a) {
var b = QA.getQAParent(this);
if (!b.length) return;
return QA.expand.apply(b[0], [ a, function() {
$(".answer_text", b).focus();
} ]), !1;
},
expand: function(a, b) {
if ($(this).is(".question_container_expanded")) return;
var c = $(".question span.question_content_urlized", this);
$(".question a.question_link", this).replaceWith(c), c.css("display", ""), $(".question_answer_count", this).css("display", "none"), $(".answers_and_form_container", this).slideDown("fast", b), QA.unhover.apply(this), $(this).addClass("question_container_expanded");
var d = $(".question", this).attr("data-question_key");
$.post("/discussion/expandquestion", {
qa_expand_key: d
}, function() {}), a && a.preventDefault();
}
}, Comments = {
page: 0,
init: function() {
$("a.comment_add").click(Comments.add), $("a.comment_show").click(Comments.show), $("a.comment_cancel").click(Comments.cancel), $("input.comment_submit").click(Comments.submit), $("form.comments").submit(function() {
return !1;
}), $(".comment_text").change(Comments.updateRemaining).keyup(Comments.updateRemaining), Comments.loadPage(0, !0), Comments.enable();
},
initPages: function() {
$("a.comments_page").click(function() {
return Comments.loadPage($(this).attr("page")), !1;
}), $("span.ellipsisExpand").click(Comments.expand);
},
expand: function() {
var a = $(this).parents("div.comment");
if (!a.length) return;
$(this).css("display", "none"), $("span.hiddenExpand", a).removeClass("hiddenExpand");
},
loadPage: function(a, b) {
try {
a = parseInt(a);
} catch (c) {
return;
}
if (a < 0) return;
$.get("/discussion/pagecomments", {
video_key: $("#video_key").val(),
topic_key: $("#topic_key").val(),
page: a
}, function(a) {
Comments.finishLoadPage(a, b);
}), b || Throbber.show($(".comments_page_controls span"));
},
finishLoadPage: function(a, b) {
$(".comments_container").html(a.html), Comments.page = a.page, Comments.initPages(), b || Throbber.hide(), VideoControls.initJumpLinks(), b || (document.location = "#comments");
},
add: function() {
return $(this).css("display", "none"), $("div.comment_form").slideDown("fast", function() {
$(".comment_text").focus();
}), Comments.updateRemaining(), !1;
},
cancel: function() {
return $("a.comment_add").css("display", ""), $("div.comment_form").slideUp("fast"), $(".comment_text").val(""), !1;
},
show: function() {
return $("div.comments_hidden").slideDown("fast"), $(".comments_show_more").css("display", "none"), !1;
},
submit: function() {
if (!$.trim($(".comment_text").val()).length) return;
var a = $("div.comments_hidden").length && !$("div.comments_hidden").is(":visible"), b = "&comments_hidden=" + (a ? "1" : "0");
$.post("/discussion/addcomment", $("form.comments").serialize() + b, Comments.finishSubmit), Comments.disable(), Throbber.show($(".comment_cancel"));
},
finishSubmit: function(a) {
Comments.finishLoadPage(a), $(".comment_text").val(""), Comments.updateRemaining(), Comments.enable(), Comments.cancel();
},
disable: function() {
$(".comment_text, .comment_submit").attr("disabled", "disabled"), $(".comment_submit").addClass("buttonDisabled");
},
enable: function() {
$(".comment_text, .comment_submit").removeAttr("disabled"), $(".comment_submit").removeClass("buttonDisabled");
},
updateRemaining: function() {
Discussion.updateRemaining(300, ".comment_text", ".comment_add_controls .chars_remaining", ".comment_add_controls .chars_remaining_count");
}
};

$(window).unload(function() {
(function(a) {
a(function() {
typeof __flash__removeCallback != "undefined" && (__flash__removeCallback = function(a, b) {
a != null && b != null && (a[b] = null);
});
});
})(jQuery);
}), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_thumbnail"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n        <div class="thumb" style="background-image: url(http://img.youtube.com/vi/', f = c.youtubeId, f ? e = f.call(a, {
hash: {}
}) : (e = a.youtubeId, e = typeof e === j ? e() : e), d += k(e) + '/hqdefault.jpg); ">\n            <div class="thumbnail_label">\n                <div class="thumbnail_desc">\n                    <span class="vid-progress v', f = c.id, f ? e = f.call(a, {
hash: {}
}) : (e = a.id, e = typeof e === j ? e() : e), d += k(e) + '">', f = c.title, f ? e = f.call(a, {
hash: {}
}) : (e = a.title, e = typeof e === j ? e() : e), d += k(e) + '</span>\n                </div>\n                <div class="thumbnail_teaser">', f = c.description, f ? e = f.call(a, {
hash: {}
}) : (e = a.description, e = typeof e === j ? e() : e), d += k(e) + "</div>\n            </div>\n        </div>\n        ", d;
}
c = c || a.helpers;
var g = "", h, i, j = "function", k = this.escapeExpression, l = this;
g += '<div class="thumbnail">\n    <a class="related-video" href="', i = c.href, i ? h = i.call(b, {
hash: {}
}) : (h = b.href, h = typeof h === j ? h() : h), g += k(h) + '" title="', h = b.video, h = h == null || h === !1 ? h : h.title, h = typeof h === j ? h() : h, g += k(h) + '">\n        ', h = b.video, h = c["with"].call(b, h, {
hash: {},
inverse: l.noop,
fn: l.program(1, f, e)
});
if (h || h === 0) g += h;
return g += "\n    </a>\n</div>\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_related-video-link"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "<span class='separator'>, </span>";
}
c = c || a.helpers;
var g = "", h, i, j = "function", k = this.escapeExpression, l = this;
g += '<a class="related-video" href="', i = c.href, i ? h = i.call(b, {
hash: {}
}) : (h = b.href, h = typeof h === j ? h() : h), g += k(h) + '" title="', h = b.video, h = h == null || h === !1 ? h : h.title, h = typeof h === j ? h() : h, g += k(h) + '">\n    <span class="video-title vid-progress v', h = b.video, h = h == null || h === !1 ? h : h.id, h = typeof h === j ? h() : h, g += k(h) + '">\n        ', h = b.video, h = h == null || h === !1 ? h : h.title, h = typeof h === j ? h() : h, g += k(h), h = b.separator, h = c["if"].call(b, h, {
hash: {},
inverse: l.noop,
fn: l.program(1, f, e)
});
if (h || h === 0) g += h;
return g += "\n    </span>\n</a>\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_modal-video"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n                <a href="', f = c.downloadUrl, f ? e = f.call(a, {
hash: {}
}) : (e = a.downloadUrl, e = typeof e === l ? e() : e), d += m(e) + '" title="Download this lesson" style="z-index:101;" class="simple-button action-gradient with-icon download-icon download-link">\n                <img src="/images/download-icon-small.png" />\n                         Download\n                </a>\n                ', d;
}
function g(a, b) {
var d = "", e, f;
return d += 'title="', f = c.points, f ? e = f.call(a, {
hash: {}
}) : (e = a.points, e = typeof e === l ? e() : e), d += m(e) + ' Energy Points earned for watching this video"', d;
}
function h(a, b) {
return 'title="You\'re earning points for watching this video. Sign in to keep them"';
}
c = c || a.helpers, d = d || a.partials;
var i = "", j, k, l = "function", m = this.escapeExpression, n = this;
i += '<div id="modal-video" class="video modal fade hide">\n    <div class="modal-header">\n        <a href="#" class="close-button close">x</a>\n        <div id="description">\n            <h3 class="title-header">\n                <span class="title">', j = b.video, j = j == null || j === !1 ? j : j.title, j = typeof j === l ? j() : j, i += m(j) + '</span>\n                <span class="long-description">: <span>', j = b.video, j = j == null || j === !1 ? j : j.description, j = typeof j === l ? j() : j, i += m(j) + '</span></span>\n            </h3>\n        </div>\n    </div>\n    <div class="modal-body">\n        <div class="youtube-video">\n            ', j = b, j = n.invokePartial(d["youtube-player"], "youtube-player", j, c, d);
if (j || j === 0) i += j;
i += '\n            <div class="subtitles-warning">\n                &lArr; Use this menu to view and help create subtitles for this video in many different languages.\n                You\'ll probably want to hide YouTube\'s captions if using these subtitles.\n            </div>\n        </div>\n        <span class="video_extra_links">\n            <nobr>\n            <div class="extra-link-bar">\n                <a href="#" title="Toggle subtitles and translations" style="z-index:101;" class="simple-button action-gradient with-icon subtitles-link">\n                    <img src="/images/subtitles-icon-small.png" />\n                    Subtitles\n                </a>\n\n                ', j = b.downloadUrl, j = c["if"].call(b, j, {
hash: {},
inverse: n.noop,
fn: n.program(1, f, e)
});
if (j || j === 0) i += j;
i += '\n            </div>\n            <span style="float:right;" id="points-badge-hover">\n                <div class="video-energy-points" ', j = b.logged_in, j = c["if"].call(b, j, {
hash: {},
inverse: n.program(5, h, e),
fn: n.program(3, g, e)
});
if (j || j === 0) i += j;
return i += ' >\n                    <span class="video-energy-points-current">', k = c.points, k ? j = k.call(b, {
hash: {}
}) : (j = b.points, j = typeof j === l ? j() : j), i += m(j) + "</span>\n                    of ", k = c.possible_points, k ? j = k.call(b, {
hash: {}
}) : (j = b.possible_points, j = typeof j === l ? j() : j), i += m(j) + '\n                </div>\n            </span>\n            </nobr>\n         </span>\n    </div>\n    <div class="modal-footer">\n        <a href="', k = c.video_url, k ? j = k.call(b, {
hash: {}
}) : (j = b.video_url, j = typeof j === l ? j() : j), i += m(j) + '" class="simple-button action-gradient green">Watch on video page</a>\n    </div>\n</div>\n', i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_video-nav"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
d += "\n", e = a.url, e = c["if"].call(a, e, {
hash: {},
inverse: n.program(4, h, b),
fn: n.program(2, g, b)
});
if (e || e === 0) d += e;
return d += "\n", d;
}
function g(a, b) {
var c = "", d;
return c += '\n<a href="', d = a.url, d = typeof d === l ? d() : d, c += m(d) + '">', d = a.title, d = typeof d === l ? d() : d, c += m(d) + '</a>\n<span class="breadcrumb-separator">&#187;</span>\n', c;
}
function h(a, b) {
var c = "", d;
return c += "\n<span>", d = a.title, d = typeof d === l ? d() : d, c += m(d) + '</span>\n<span class="breadcrumb-separator">&#187;</span>\n', c;
}
function i(a, b, d) {
var e = "", f, g;
return e += "\n      <li data-selected='", g = c.selected, g ? f = g.call(a, {
hash: {}
}) : (f = a.selected, f = typeof f === l ? f() : f), e += m(f) + "'><a href=\"/", f = d.topic, f = f == null || f === !1 ? f : f.extended_slug, f = typeof f === l ? f() : f, e += m(f) + "/v/", g = c.readable_id, g ? f = g.call(a, {
hash: {}
}) : (f = a.readable_id, f = typeof f === l ? f() : f), e += m(f) + "\"><span class='vid-progress v", g = c.key_id, g ? f = g.call(a, {
hash: {}
}) : (f = a.key_id, f = typeof f === l ? f() : f), e += m(f) + "'>", g = c.title, g ? f = g.call(a, {
hash: {}
}) : (f = a.title, f = typeof f === l ? f() : f), e += m(f) + "</span></a></li>\n      ", e;
}
c = c || a.helpers;
var j = "", k, l = "function", m = this.escapeExpression, n = this;
k = b.topic, k = k == null || k === !1 ? k : k.ancestor_topics, k = c.each.call(b, k, {
hash: {},
inverse: n.noop,
fn: n.program(1, f, e)
});
if (k || k === 0) j += k;
j += '\n<a href="', k = b.topic, k = k == null || k === !1 ? k : k.url, k = typeof k === l ? k() : k, j += m(k) + '">', k = b.topic, k = k == null || k === !1 ? k : k.title, k = typeof k === l ? k() : k, j += m(k) + '</a>\n<span class="breadcrumb-separator">&#187;</span>\n<span id="video_dropdown" style="display:none;" class="selected">\n  <a href="/', k = b.topic, k = k == null || k === !1 ? k : k.extended_slug, k = typeof k === l ? k() : k, j += m(k) + "/v/", k = b.video, k = k == null || k === !1 ? k : k.readable_id, k = typeof k === l ? k() : k, j += m(k) + '">', k = b.video, k = k == null || k === !1 ? k : k.title, k = typeof k === l ? k() : k, j += m(k) + '</a>\n  <div id="video_menu">\n    <ol>\n      ', k = b.topic, k = k == null || k === !1 ? k : k.videos, k = c.each.call(b, k, {
hash: {},
inverse: n.noop,
fn: n.programWithDepth(i, e, b)
});
if (k || k === 0) j += k;
return j += "\n    </ol>\n  </div>\n</span>\n\n", j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_video-description"] = a(function(a, b, c, d, e) {
function f(a, b) {
var c = "", d;
return c += '\n<link itemprop="url" href="', d = a.topic, d = d == null || d === !1 ? d : d.extended_slug, d = typeof d === q ? d() : d, c += r(d) + "/v/", d = a.video, d = d == null || d === !1 ? d : d.readable_id, d = typeof d === q ? d() : d, c += r(d) + '">\n', c;
}
function g(a, b) {
var c = "", d;
return c += '\n<a href="', d = a.video, d = d == null || d === !1 ? d : d.button_top_exercise, d = d == null || d === !1 ? d : d.url, d = typeof d === q ? d() : d, c += r(d) + '" class="practice simple-button action-gradient green desktop-only" title="Test your understanding with an exercise">Practice this concept</a>\n', c;
}
function h(a, b) {
var d = "", e;
d += "\n", e = a.video, e = e == null || e === !1 ? e : e.extra_properties, e = e == null || e === !1 ? e : e.explore_url, e = c["if"].call(a, e, {
hash: {},
inverse: s.noop,
fn: s.program(6, i, b)
});
if (e || e === 0) d += e;
return d += "\n", d;
}
function i(a, b) {
var c = "", d;
return c += '\n<a href="', d = a.video, d = d == null || d === !1 ? d : d.extra_properties, d = d == null || d === !1 ? d : d.explore_url, d = typeof d === q ? d() : d, c += r(d) + '" class="practice simple-button action-gradient green desktop-only" title="Extend your understanding with an exploration">Explore this concept</a>\n', c;
}
function j(a, b) {
return "<img src='/images/throbber.gif' />";
}
function k(a, b) {
var c = "", d;
return c += '\n    <span class="long-description"><span class="desktop-only">: </span><span itemprop="description">', d = a.video, d = d == null || d === !1 ? d : d.description, d = typeof d === q ? d() : d, c += r(d) + "</span></span>\n", c;
}
function l(a, b) {
var d = "", e;
d += '\n<div class="related-content visited-no-recolor">\n  <span class="related-content-title">Related exercises:</span>\n  <ul class="related-exercise-list">\n    ', e = a.video, e = e == null || e === !1 ? e : e.related_exercises, e = c.each.call(a, e, {
hash: {},
inverse: s.noop,
fn: s.program(13, m, b)
});
if (e || e === 0) d += e;
return d += "\n  </ul>\n</div>\n", d;
}
function m(a, b) {
var d = "", e, f;
d += '\n    <li>\n      <a href="', f = c.url, f ? e = f.call(a, {
hash: {}
}) : (e = a.url, e = typeof e === q ? e() : e), d += r(e) + '" title="', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === q ? e() : e), d += r(e) + '">', f = c.name, f ? e = f.call(a, {
hash: {}
}) : (e = a.name, e = typeof e === q ? e() : e), d += r(e) + "</a>\n      ", e = a.last, e = c.unless.call(a, e, {
hash: {},
inverse: s.noop,
fn: s.program(14, n, b)
});
if (e || e === 0) d += e;
return d += "\n    </li>\n    ", d;
}
function n(a, b) {
return '\n      <span class="separator">, </span>\n      ';
}
c = c || a.helpers;
var o = "", p, q = "function", r = this.escapeExpression, s = this;
p = b.topic, p = c["if"].call(b, p, {
hash: {},
inverse: s.noop,
fn: s.program(1, f, e)
});
if (p || p === 0) o += p;
o += "\n", p = b.video, p = p == null || p === !1 ? p : p.button_top_exercise, p = c["if"].call(b, p, {
hash: {},
inverse: s.noop,
fn: s.program(3, g, e)
});
if (p || p === 0) o += p;
o += "\n", p = b.video, p = p == null || p === !1 ? p : p.extra_properties, p = c["if"].call(b, p, {
hash: {},
inverse: s.noop,
fn: s.program(5, h, e)
});
if (p || p === 0) o += p;
o += '\n<h1 class="title-header">\n    ', p = b.loading, p = c["if"].call(b, p, {
hash: {},
inverse: s.noop,
fn: s.program(8, j, e)
});
if (p || p === 0) o += p;
o += '\n    <span itemprop="name" class="title desktop-only">', p = b.video, p = p == null || p === !1 ? p : p.title, p = typeof p === q ? p() : p, o += r(p) + "</span>\n", p = b.video, p = p == null || p === !1 ? p : p.description, p = c["if"].call(b, p, {
hash: {},
inverse: s.noop,
fn: s.program(10, k, e)
});
if (p || p === 0) o += p;
o += "\n</h1>\n\n", p = b.video, p = p == null || p === !1 ? p : p.related_exercises, p = c["if"].call(b, p, {
hash: {},
inverse: s.noop,
fn: s.program(12, l, e)
});
if (p || p === 0) o += p;
return o += "\n\n", o;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_video-header"] = a(function(a, b, c, d, e) {
function f(a, b) {
var c = "", d;
return c += '\n    <label id="prev_video">\n      <a rel=prev class="previous-video" href="/', d = a.topic, d = d == null || d === !1 ? d : d.extended_slug, d = typeof d === n ? d() : d, c += o(d) + "/v/", d = a.video, d = d == null || d === !1 ? d : d.previous_video, d = d == null || d === !1 ? d : d.readable_id, d = typeof d === n ? d() : d, c += o(d) + "\"><b>Previous Video:</b> <span class='vid-progress v", d = a.video, d = d == null || d === !1 ? d : d.previous_video, d = d == null || d === !1 ? d : d.key_id, d = typeof d === n ? d() : d, c += o(d) + "'>", d = a.video, d = d == null || d === !1 ? d : d.previous_video, d = d == null || d === !1 ? d : d.title, d = typeof d === n ? d() : d, c += o(d) + "</span> </a>\n    </label>\n    ", c;
}
function g(a, b) {
var d = "", e;
d += "\n      ", e = a.topic, e = e == null || e === !1 ? e : e.previous_topic_video, e = c["if"].call(a, e, {
hash: {},
inverse: p.noop,
fn: p.program(4, h, b)
});
if (e || e === 0) d += e;
return d += "\n    ", d;
}
function h(a, b) {
var c = "", d;
return c += '\n        <label id="prev_video">\n          <a rel=prev class="previous-video" href="/', d = a.topic, d = d == null || d === !1 ? d : d.previous_topic_subtopic_slug, d = typeof d === n ? d() : d, c += o(d) + "/v/", d = a.topic, d = d == null || d === !1 ? d : d.previous_topic_video, d = typeof d === n ? d() : d, c += o(d) + '"><b>Previous Topic:</b> ', d = a.topic, d = d == null || d === !1 ? d : d.previous_topic_title, d = typeof d === n ? d() : d, c += o(d) + "</a>\n        </label>\n      ", c;
}
function i(a, b) {
var c = "", d;
return c += '\n    <label id="next_video">\n      <a rel=next class="next-video" href="/', d = a.topic, d = d == null || d === !1 ? d : d.extended_slug, d = typeof d === n ? d() : d, c += o(d) + "/v/", d = a.video, d = d == null || d === !1 ? d : d.next_video, d = d == null || d === !1 ? d : d.readable_id, d = typeof d === n ? d() : d, c += o(d) + "\"><b>Next Video:</b>  <span class='vid-progress v", d = a.video, d = d == null || d === !1 ? d : d.next_video, d = d == null || d === !1 ? d : d.key_id, d = typeof d === n ? d() : d, c += o(d) + "'>", d = a.video, d = d == null || d === !1 ? d : d.next_video, d = d == null || d === !1 ? d : d.title, d = typeof d === n ? d() : d, c += o(d) + "</span> </a>\n    </label>\n    ", c;
}
function j(a, b) {
var d = "", e;
d += "\n      ", e = a.topic, e = e == null || e === !1 ? e : e.next_topic_video, e = c["if"].call(a, e, {
hash: {},
inverse: p.noop,
fn: p.program(9, k, b)
});
if (e || e === 0) d += e;
return d += "\n    ", d;
}
function k(a, b) {
var c = "", d;
return c += '\n        <label id="next_video">\n          <a rel=next class="next-video" href="/', d = a.topic, d = d == null || d === !1 ? d : d.next_topic_subtopic_slug, d = typeof d === n ? d() : d, c += o(d) + "/v/", d = a.topic, d = d == null || d === !1 ? d : d.next_topic_video, d = typeof d === n ? d() : d, c += o(d) + '"><b>Next Topic:</b> ', d = a.topic, d = d == null || d === !1 ? d : d.next_topic_title, d = typeof d === n ? d() : d, c += o(d) + "</a>\n        </label>\n      ", c;
}
c = c || a.helpers;
var l = "", m, n = "function", o = this.escapeExpression, p = this;
l += '<nav class="prev_next_nav desktop-only">\n    ', m = b.video, m = m == null || m === !1 ? m : m.previous_video, m = c["if"].call(b, m, {
hash: {},
inverse: p.program(3, g, e),
fn: p.program(1, f, e)
});
if (m || m === 0) l += m;
l += "\n    ", m = b.video, m = m == null || m === !1 ? m : m.next_video, m = c["if"].call(b, m, {
hash: {},
inverse: p.program(8, j, e),
fn: p.program(6, i, e)
});
if (m || m === 0) l += m;
return l += '\n    <div class="clear"></div>\n</nav>\n', l;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_video-footer"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
d += "\n", e = a.video, e = e == null || e === !1 ? e : e.extra_properties, e = e == null || e === !1 ? e : e.original_url, e = c["if"].call(a, e, {
hash: {},
inverse: k.noop,
fn: k.program(2, g, b)
});
if (e || e === 0) d += e;
return d += "\n", d;
}
function g(a, b) {
var c = "", d;
c += '\n<span>\nLearn more about this work of art in context at <a href="', d = a.video, d = d == null || d === !1 ? d : d.extra_properties, d = d == null || d === !1 ? d : d.original_url, d = typeof d === j ? d() : d;
if (d || d === 0) c += d;
return c += '">smarthistory.khanacademy.org</a>\n</span>\n', c;
}
c = c || a.helpers;
var h = "", i, j = "function", k = this;
i = b.video, i = i == null || i === !1 ? i : i.player_html, i = typeof i === j ? i() : i;
if (i || i === 0) h += i;
h += "\n", i = b.video, i = i == null || i === !1 ? i : i.subtitles_html, i = typeof i === j ? i() : i;
if (i || i === 0) h += i;
h += "\n", i = b.video, i = i == null || i === !1 ? i : i.extra_properties, i = c["if"].call(b, i, {
hash: {},
inverse: k.noop,
fn: k.program(1, f, e)
});
if (i || i === 0) h += i;
h += "\n", i = b.video, i = i == null || i === !1 ? i : i.discussion_html, i = typeof i === j ? i() : i;
if (i || i === 0) h += i;
return h += "\n\n", h;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["video-package_video-flv-player"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i = "function", j = this.escapeExpression;
return f += '<object id="flvPlayer" type="application/x-shockwave-flash" data="/flvplayer/player_flv_maxi.swf" width="800" height="600">\n    <param name="movie" value="/flvplayer/player_flv_maxi.swf" />\n    <param name="allowFullScreen" value="true" />\n    <param name="allowScriptAccess" value="always" />\n    <param name="FlashVars" value="flv=', h = c.video_path, h ? g = h.call(b, {
hash: {}
}) : (g = b.video_path, g = typeof g === i ? g() : g), f += j(g) + '&amp;showstop=1&amp;showvolume=1&amp;showfullscreen=1&amp;showiconplay=1&amp;bgcolor=FFFFFF&amp;bgcolor1=80C65A&amp;bgcolor2=80C65A&amp;iconplaybgcolor=80C65A&amp;width=800&amp;height=600" />\n    <div>\n            <p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>\n    </div>                \n</object>\n\n', f;
});
}();

var ModalVideo = {
template: Templates.get("video.modal-video"),
modal: null,
linkifyTooltip: function() {
var a = $(".video-energy-points"), b = $("#top-header-links a").filter(function(a, b) {
return $(b).text() == "Login";
}).attr("href"), c = (a.attr("title") || a.data("title")).replace(/Sign in/, '<a href="' + b + '">Sign in</a>');
a.data("title", c).removeAttr("title"), VideoStats.tooltip("#points-badge-hover", a.data("title"));
},
hookup: function() {
var a = 0;
jQuery(document).delegate("a.related-video", {
mouseup: function(b) {
return a = b.button, !0;
},
click: function(b) {
b.which = b.which || a, a = 0;
if (b.which == 1) {
var c = $(b.currentTarget).data("video");
if (!c) {
var d = $(b.currentTarget).data("youtube-id");
d && (c = _.find(Khan.relatedVideos.videos, function(a) {
return a.youtubeId == d;
}));
}
if (c) return ModalVideo.show(c), b.preventDefault(), !1;
}
return !0;
}
});
},
init: function(a) {
var b = {
video: a,
downloadUrl: a.downloadUrls && a.downloadUrls.mp4 || null,
height: 480,
width: 800,
youtubeId: a.youtubeId,
points: 0,
possible_points: 750,
logged_in: !!USERNAME,
video_url: window.Khan && Khan.relatedVideos && Khan.relatedVideos.makeHref(a) || a.relative_url
};
return this.modal = $(this.template(b)).appendTo("body").modal({
keyboard: !0,
backdrop: !0,
show: !1
}).bind("hide", $.proxy(this.hide, this)).bind("hidden", $.proxy(this.hidden, this)).bind("shown", $.proxy(function() {
this.modal.removeClass("fade");
}, this)), Video.init({}), ModalVideo.linkifyTooltip(), this.modal;
},
show: function(a) {
this.modal = this.init(a), this.modal.modal("show"), VideoStats.startLoggingProgress(null, a.youtubeId);
var b = "/api/v1/user/videos/" + a.youtubeId;
$.ajax(b, {
success: $.proxy(function(a) {
var b = a ? a.points : 0;
VideoStats.updatePointsSaved(b), VideoStats.updatePointsDisplay(b);
}, this)
});
},
hide: function() {
VideoStats.stopLoggingProgress(), Video.hideSubtitleElements(), this.modal.addClass("fade");
},
hidden: function() {
$(".unisubs-videoTab").remove(), $(".unisubs-dropdown").remove(), window.UnisubsWidgetizerLoaded = !1, this.modal.remove(), this.modal = null;
}
};

Handlebars.registerPartial("youtube-player", Templates.get("shared.youtube-player"));