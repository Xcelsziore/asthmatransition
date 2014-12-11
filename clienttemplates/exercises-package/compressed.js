(function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_exercise"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h = this;
f += '<article class="exercises-content clearfix">\n\n    <div class="exercises-header">', g = b, g = h.invokePartial(d["exercise-header"], "exercise-header", g, c, d);
if (g || g === 0) f += g;
return f += '</div>\n\n    <div class="exercises-body">\n        <div class="exercises-stack incomplete-stack"></div>\n        <div class="exercises-card current-card"></div>\n        <div class="exercises-stack complete-stack"></div>\n        <div class="stack-spacer clearfix"></div>\n    </div>\n\n</article>\n', f;
});
})(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_exercise-header"] = a(function(a, b, c, d, e) {
function f(a, b) {
return '\n<div class="topic-exercise-badge">\n	<span class="topic-exercise-image">&nbsp;<!-- Review doesn\'t have a badge image, just a placeholder --></span>\n</div>\nReview\n';
}
function g(a, b) {
var d = "", e;
d += "\n    ", e = a.practiceMode, e = c["if"].call(a, e, {
hash: {},
inverse: n.program(6, i, b),
fn: n.program(4, h, b)
});
if (e || e === 0) d += e;
return d += "\n", d;
}
function h(a, b) {
var c = "", d;
return c += '\n	<div class="topic-exercise-badge">\n        <span class="topic-exercise-badge">\n            &nbsp;<!-- Practice exercises don\'t have badge images, just a placeholder -->\n        </span>\n    </div>\n    <span class="practice-exercise-topic-context">Practicing</span> ', d = a.practiceExercise, d = d == null || d === !1 ? d : d.displayName, d = typeof d === l ? d() : d, c += m(d) + '\n    <span class="practice-exercise-topic-context">in </span>\n    <span class="practice-exercise-topic-context solid-hover">\n        <img class="topic-exercise-image inline" src="', d = a.topicExerciseBadge, d = d == null || d === !1 ? d : d.icons, d = d == null || d === !1 ? d : d.compact, d = typeof d === l ? d() : d, c += m(d) + '">\n        <a href=".">', d = a.topic, d = d == null || d === !1 ? d : d.standaloneTitle, d = typeof d === l ? d() : d, c += m(d) + "</a>\n    </span>\n    ", c;
}
function i(a, b) {
var c = "", d;
return c += '\n    <div class="topic-exercise-badge">\n	    <img class="topic-exercise-image" src="', d = a.topicExerciseBadge, d = d == null || d === !1 ? d : d.icons, d = d == null || d === !1 ? d : d.compact, d = typeof d === l ? d() : d, c += m(d) + '">\n    </div>\n	', d = a.topic, d = d == null || d === !1 ? d : d.standaloneTitle, d = typeof d === l ? d() : d, c += m(d) + "\n\n    ", c;
}
c = c || a.helpers;
var j = "", k, l = "function", m = this.escapeExpression, n = this;
j += '<h2 class="section-headline" style="display:block;">\n', k = b.reviewMode, k = c["if"].call(b, k, {
hash: {},
inverse: n.program(3, g, e),
fn: n.program(1, f, e)
});
if (k || k === 0) j += k;
return j += '\n<div class="streak-transition">\n    <span class="hover-disclosure">What happened to the streak bar?</span>\n    <div class="expl-image vertical-shadow">\n        <img src="/images/power-mode/streak-transition.png?4" />\n    </div>\n</div>\n</h2>', j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_stack"] = a(function(a, b, c, d, e) {
function f(a, b) {
var e = "", f;
e += "\n    ", f = a, f = i.invokePartial(d.card, "card", f, c, d);
if (f || f === 0) e += f;
return e += "\n", e;
}
c = c || a.helpers, d = d || a.partials;
var g = "", h, i = this;
g += '<div class="stack">\n', h = b.cards, h = c.each.call(b, h, {
hash: {},
inverse: i.noop,
fn: i.program(1, f, e)
});
if (h || h === 0) g += h;
return g += "\n</div>\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_card"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
d += '\n            <div class="card-front card-face">\n                <span>\n                    ', e = a.leavesAvailable, e = c["if"].call(a, e, {
hash: {},
inverse: l.noop,
fn: l.program(2, g, b)
});
if (e || e === 0) d += e;
return d += "\n                </span>\n            </div>\n            ", d;
}
function g(a, b) {
var e = "", f;
e += "\n                        ", f = a, f = l.invokePartial(d["card-leaves"], "card-leaves", f, c, d);
if (f || f === 0) e += f;
return e += "\n                    ", e;
}
function h(a, b) {
return '\n            <div class="card-back card-face">\n                &nbsp;\n            </div>\n            ';
}
c = c || a.helpers, d = d || a.partials;
var i = "", j, k, l = this, m = "function", n = this.escapeExpression;
i += '<div id="card-cid-', k = c.cid, k ? j = k.call(b, {
hash: {}
}) : (j = b.cid, j = typeof j === m ? j() : j), i += n(j) + '" class="card-container">\n    <div class="card-container-inner">\n        <div class="card">\n            ', j = b.frontVisible, j = c["if"].call(b, j, {
hash: {},
inverse: l.program(4, h, e),
fn: l.program(1, f, e)
});
if (j || j === 0) i += j;
return i += "\n        </div>\n    </div>\n</div>\n", i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_current-card"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="current-card-container card-type-', h = c.cardType, h ? g = h.call(b, {
hash: {}
}) : (g = b.cardType, g = typeof g === i ? g() : g), f += j(g) + '">\n    <div class="current-card-container-inner vertical-shadow">\n    	<div class="leaves-container">\n            ', g = b, g = k.invokePartial(d["card-leaves"], "card-leaves", g, c, d);
if (g || g === 0) f += g;
return f += '\n        </div>\n        <div class="current-card-contents"></div>\n    </div>\n    <div id="extras" class="single-exercise">\n		<!-- TODO: Toggle scratchpad display -->\n		<ul>\n			<li>\n				<a id="scratchpad-show" href="">Show scratchpad</a>\n				<span id="scratchpad-not-available">Scratchpad not available</span>\n			</li>\n		</ul>\n	</div>\n</div>\n\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_card-leaves"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h = "function", i = this.escapeExpression;
return f += '<div class="leaves clearfix">\n    <div class="leaf ', g = b.leaves, g = g == null || g === !1 ? g : g[0], g = g == null || g === !1 ? g : g.state, g = typeof g === h ? g() : g, f += i(g) + '" data-desc="Earn this leaf for completing this card.">\n        <div class="full-leaf">\n        </div>\n    </div>\n    <div class="leaf ', g = b.leaves, g = g == null || g === !1 ? g : g[1], g = g == null || g === !1 ? g : g.state, g = typeof g === h ? g() : g, f += i(g) + '" data-desc="Earn this leaf for completing this card without using all of the hints.">\n    	<div class="full-leaf">\n        </div>\n    </div>\n    <div class="leaf ', g = b.leaves, g = g == null || g === !1 ? g : g[2], g = g == null || g === !1 ? g : g.state, g = typeof g === h ? g() : g, f += i(g) + '" data-desc="Earn this leaf for answering correctly on your first try without any hints.">\n    	<div class="full-leaf">\n        </div>\n    </div>\n</div>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_problem-template"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<!--\n    TODO: eventually, this template can replace khan-exercises/exercises/khan-exercise.html,\n    which is used in exercise test mode\n-->\n\n<div id="exercise-message-container" style="display: none;">\n	<div class="exercise_message"></div>\n</div>\n<div id="warning-bar">\n	<span id="warning-bar-content"></span>\n	<span id="warning-bar-close">(<a href="">close</a>)</span>\n</div>\n<div id="problem-and-answer">\n	<div id=\'problemarea\'>\n		<div id=\'scratchpad\'><div></div></div>\n		<div id=\'workarea\'></div>\n		<div id=\'hintsarea\'></div>\n	</div>\n	<div id="answer_area_wrap"><div id="answer_area">\n		<form id="answerform" action="/exercisedashboard" method="get" name="answerform">\n			<div id="answercontent" class="info-box">\n				<span id="examples-show">Acceptable formats</span>\n				<span class="info-box-header">Answer</span>\n				<div id="solutionarea" class="fancy-scrollbar"></div>\n				<ul id="examples" style="display: none"></ul>\n				<div class="answer-buttons">\n				<input type="button" class="simple-button action-gradient green" id="check-answer-button" tabindex="10" value="Check Answer"/>\n				<input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px">\n				<input type="button" class="simple-button action-gradient green" id="next-question-button" style="display:none;" name="correctnextbutton" value="Correct! Next Question..."/>\n				<div id="positive-reinforcement"><img src="/images/face-smiley.gif" /></div>\n				<span id="show-solution-button-container"></span>\n				<div id="check-answer-results"><p class="check-answer-message info-box-sub-description"></p></div>\n				</div>\n			</div>\n			<div id="readonly" class="info-box">\n				<span id="readonly-problem" class="info-box-header"></span>\n				<span id="readonly-title" class="info-box-subheader">You are viewing a problem.</span>\n				<span class="info-box-sub-description">To work on problems like this, <a id="readonly-start" href="">start this exercise</a>.</span>\n			</div>\n			<div class="info-box hint-box">\n				<span class="info-box-header">Need help?</span>\n				<div id="get-hint-button-container">\n					<input id="hint" type="button" class="simple-button action-gradient orange full-width" value="I\'d like a hint" name="hint"/>\n				</div>\n				<span id="hint-remainder"></span>\n			</div>\n			<div class="info-box related-video-box" style="display:none;">\n				<div id="related-video-content">\n					<span class="info-box-header">Stuck? Watch a video.</span>\n\n					<div id="related-video-list">\n						<span class="related-content-title">Related videos:</span>\n						<ul class="related-video-list"></ul>\n					</div>\n					<div class="clear"></div>\n				</div>\n			</div>\n		</form>\n		<div id="issue" class="info-box" style="display:none;">\n			<span class="info-box-header">Report a Problem</span>\n			<span id="issue-status" class="info-box-sub-description"></span>\n			<form>\n				<fieldset>\n					<legend>Issue Type</legend>\n					<ul>\n						<li>\n							<input type="radio" name="issue-type" id="issue-wrong-or-unclear">\n							<label for="issue-wrong-or-unclear">Answer is wrong or question is unclear</label>\n						</li>\n						<li>\n							<input type="radio" name="issue-type" id="issue-hard">\n							<label for="issue-hard">I\'m frustrated (tell us why) or this is too hard</label>\n						</li>\n						<li>\n							<input type="radio" name="issue-type" id="issue-not-showing">\n							<label for="issue-not-showing">I can\'t see the problem or website is stuck</label>\n						</li>\n						<li>\n							<input type="radio" name="issue-type" id="issue-other">\n							<label for="issue-other">Other (please describe below)</label>\n						</li>\n					</ul>\n				</fieldset>\n				<label for="issue-title">Issue Title:<input type="text" name="issue-title" id="issue-title" /></label>\n				<label for="issue-email">Your Email (optional):<input type="text" name="issue-email" id="issue-email" /></label>\n				<label for="issue-body">Description of Issue:<textarea name="issue-body" id="issue-body"></textarea></label>\n				<input type="submit" class="simple-button action-gradient" value="Submit Issue">\n				<a href="/#" id="issue-cancel">Cancel</a>\n				<img id="issue-throbber" style="display:none;" name="issue-throbber">\n			</form>\n		</div>\n	</div></div>\n	<div style="clear: both;"></div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_end-of-stack-card"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f, h, i;
d += '\n	    	<div class="skill-status">\n                <h2 class="skill-bar-title">\n                    ', e = a.exerciseStates, e = c["with"].call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(2, g, b)
});
if (e || e === 0) d += e;
d += '\n                    <a href="', e = a.userExercise, e = e == null || e === !1 ? e : e.exerciseModel, e = e == null || e === !1 ? e : e.relativeUrl, e = typeof e === z ? e() : e, d += A(e) + '">', i = c.displayName, i ? e = i.call(a, {
hash: {}
}) : (e = a.displayName, e = typeof e === z ? e() : e), d += A(e) + "</a>\n                </h2>\n                ", e = a.exerciseStates, f = a.start, h = a.end, i = c["skill-bar"], e = i ? i.call(a, h, f, e, {
hash: {}
}) : B.call(a, "skill-bar", h, f, e, {
hash: {}
});
if (e || e === 0) d += e;
return d += "\n		    </div>\n	    ", d;
}
function g(a, b) {
var e;
return e = a, e = y.invokePartial(d["shared_small-exercise-icon"], "shared_small-exercise-icon", e, c, d), e || e === 0 ? e : "";
}
function h(a, b) {
var d = "", e, f;
d += '\n    <div>\n        <h2 style="display: inline-block;">Overall Progress</h2>\n        <a href="javascript:void(0);" class="simple-button action-gradient" id="show-topic-details">\n            ', f = c.proficient, f ? e = f.call(a, {
hash: {}
}) : (e = a.proficient, e = typeof e === z ? e() : e), d += A(e) + "/", f = c.total, f ? e = f.call(a, {
hash: {}
}) : (e = a.total, e = typeof e === z ? e() : e), d += A(e) + ' Skills\n        </a>\n    </div>\n    <div class="progress-graph current-topic clearfix visited-no-recolor">\n        <div class="three-col col-one">\n            <h3>Upcoming Skills</h3>\n            ', e = a.unstartedExercises, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(5, i, b)
});
if (e || e === 0) d += e;
d += '\n        </div>\n        <div class="three-col col-two">\n            <h3>Skills In-Progress</h3>\n            ', e = a.startedExercises, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(8, k, b)
});
if (e || e === 0) d += e;
d += '\n        </div>\n        <div class="three-col col-three">\n            <h3>Proficient Skills</h3>\n            ', e = a.proficientExercises, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(11, m, b)
});
if (e || e === 0) d += e;
return d += "\n        </div>\n    </div>\n    ", d;
}
function i(a, b) {
var d = "", e, f, g;
d += '\n            <div class="skill-status">\n                <h4 class="skill-bar-title">\n                    ', e = a.exerciseStates, e = c["with"].call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(6, j, b)
});
if (e || e === 0) d += e;
d += '\n                    <a href="', e = a.exerciseModel, e = e == null || e === !1 ? e : e.relativeUrl, e = typeof e === z ? e() : e, d += A(e) + '">', e = a.exerciseModel, e = e == null || e === !1 ? e : e.displayName, e = typeof e === z ? e() : e, d += A(e) + "</a>\n                </h4>\n                ", e = a.progress, f = a.progress, g = c["skill-bar"], e = g ? g.call(a, f, e, {
hash: {}
}) : B.call(a, "skill-bar", f, e, {
hash: {}
});
if (e || e === 0) d += e;
return d += "\n            </div>\n            ", d;
}
function j(a, b) {
var e;
return e = a, e = y.invokePartial(d["shared_small-exercise-icon"], "shared_small-exercise-icon", e, c, d), e || e === 0 ? e : "";
}
function k(a, b) {
var d = "", e, f, g;
d += '\n            <div class="skill-status">\n                <h4 class="skill-bar-title">\n                    ', e = a.exerciseStates, e = c["with"].call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(9, l, b)
});
if (e || e === 0) d += e;
d += '\n                    <a href="', e = a.exerciseModel, e = e == null || e === !1 ? e : e.relativeUrl, e = typeof e === z ? e() : e, d += A(e) + '">', e = a.exerciseModel, e = e == null || e === !1 ? e : e.displayName, e = typeof e === z ? e() : e, d += A(e) + "</a>\n                </h4>\n                ", e = a.progress, f = a.progress, g = c["skill-bar"], e = g ? g.call(a, f, e, {
hash: {}
}) : B.call(a, "skill-bar", f, e, {
hash: {}
});
if (e || e === 0) d += e;
return d += "\n            </div>\n            ", d;
}
function l(a, b) {
var e;
return e = a, e = y.invokePartial(d["shared_small-exercise-icon"], "shared_small-exercise-icon", e, c, d), e || e === 0 ? e : "";
}
function m(a, b) {
var d = "", e, f, g, h;
d += '\n        	<div class="skill-status">\n    	    	<h4 class="skill-bar-title">\n    	    		', e = a.exerciseStates, e = c["with"].call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(12, n, b)
});
if (e || e === 0) d += e;
d += '\n                    <a href="', e = a.exerciseModel, e = e == null || e === !1 ? e : e.relativeUrl, e = typeof e === z ? e() : e, d += A(e) + '">', e = a.exerciseModel, e = e == null || e === !1 ? e : e.displayName, e = typeof e === z ? e() : e, d += A(e) + "</a>\n    	    	</h4>\n                ", e = a.exerciseStates, f = a.progress, g = a.progress, h = c["skill-bar"], e = h ? h.call(a, g, f, e, {
hash: {}
}) : B.call(a, "skill-bar", g, f, e, {
hash: {}
});
if (e || e === 0) d += e;
return d += "\n            </div>\n            ", d;
}
function n(a, b) {
var e;
return e = a, e = y.invokePartial(d["shared_small-exercise-icon"], "shared_small-exercise-icon", e, c, d), e || e === 0 ? e : "";
}
function o(a, b) {
var d = "", e;
d += "\n        ", e = a.progress, e = c.each.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(15, p, b)
});
if (e || e === 0) d += e;
return d += "\n    ", d;
}
function p(a, b) {
var d = "", e;
d += "\n        ", e = a.exerciseStates, e = e == null || e === !1 ? e : e.proficient, e = c["if"].call(a, e, {
hash: {},
inverse: y.program(20, t, b),
fn: y.program(16, q, b)
});
if (e || e === 0) d += e;
return d += "\n        ", d;
}
function q(a, b) {
var d = "", e;
d += "\n            <h2>\n                Nice work! You're ready to move on. \n                ", e = a.exerciseStates, e = e == null || e === !1 ? e : e.reviewing, e = c["if"].call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(17, r, b)
});
if (e || e === 0) d += e;
return d += '\n            </h2>\n            <div class="stack-controls practice-mode proficient">\n                <input type="button" class="more-stacks simple-button action-gradient left" value="Give me another stack like this"><input type="button" class="skill-proficient to-dashboard default-action simple-button action-gradient green right" value="Pick a new skill to work on" style="margin:0">\n            </div>\n        ', d;
}
function r(a, b) {
var d = "", e;
d += "\n                ", e = a.exerciseStates, e = e == null || e === !1 ? e : e.justEarnedProficiency, e = c.unless.call(a, e, {
hash: {},
inverse: y.noop,
fn: y.program(18, s, b)
});
if (e || e === 0) d += e;
return d += "\n                ", d;
}
function s(a, b) {
return '\n                <span class="hover-disclosure review-explain" data-desc="You\'ve earned proficiency in this skill, but we think you might want to review it because you had some trouble in this last stack.">\n                    Why is the bar orange?\n                </span>\n                ';
}
function t(a, b) {
return '\n            <div class="stack-controls practice-mode">\n                <input type="button" class="take-a-break to-dashboard simple-button action-gradient left" value="Work on something else"><input type="button" class="more-stacks default-action simple-button action-gradient green right" value="Give me another stack like this!">\n            </div>\n        ';
}
function u(a, b) {
return '\n        <div class="stack-controls">\n            <input type="button" class="take-a-break to-dashboard simple-button action-gradient left" value="Work on something else"><input type="button" class="more-stacks default-action simple-button action-gradient green right" value="Give me another stack like this!">\n        </div>\n    ';
}
c = c || a.helpers, d = d || a.partials;
var v = "", w, x, y = this, z = "function", A = this.escapeExpression, B = c.helperMissing;
v += '<div class="end-of-stack-info">\n    <div class="title clearfix">\n        <div class="stack-stats">\n            <p data-desc="Your longest streak of cards with 3 or more leaves in this stack.">\n            	<img src="/images/power-mode/streak.png?2" /><span class="times">&times;</span>', x = c.longestStreak, x ? w = x.call(b, {
hash: {}
}) : (w = b.longestStreak, w = typeof w === z ? w() : w), v += A(w) + '\n           	</p>\n            <p data-desc="Your quickly answered cards for this stack.">\n            	<img src="/images/power-mode/speed-answer.png?1" /><span class="times">&times;</span>', x = c.speedyCards, x ? w = x.call(b, {
hash: {}
}) : (w = b.speedyCards, w = typeof w === z ? w() : w), v += A(w) + '\n            </p>\n            <p data-desc="Your total leaves for this stack of cards.">\n            	<img src="/images/power-mode/card-leaf-full-large.png" /><span class="times">&times;</span>', x = c.totalLeaves, x ? w = x.call(b, {
hash: {}
}) : (w = b.totalLeaves, w = typeof w === z ? w() : w), v += A(w) + '\n            </p>\n        </div>\n        <h2>Stack Progress</h2>\n    </div>\n    <div class="progress-graph current-stack visited-no-recolor">\n	    ', w = b.progress, w = c.each.call(b, w, {
hash: {},
inverse: y.noop,
fn: y.program(1, f, e)
});
if (w || w === 0) v += w;
v += "\n    </div>\n\n    ", w = b.practiceMode, w = c.unless.call(b, w, {
hash: {},
inverse: y.noop,
fn: y.program(4, h, e)
});
if (w || w === 0) v += w;
v += "\n\n    ", w = b.practiceMode, w = c["if"].call(b, w, {
hash: {},
inverse: y.program(22, u, e),
fn: y.program(14, o, e)
});
if (w || w === 0) v += w;
return v += "\n</div>\n", v;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_end-of-review-card"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += "\n        <h2>You have ", e = a.reviewsLeft, f = c.pluralize, e = f ? f.call(a, e, "skill", {
hash: {}
}) : l.call(a, "pluralize", e, "skill", {
hash: {}
}), d += m(e) + " left to review...</h2>\n        ", d;
}
function g(a, b) {
return "\n        <h2>You're done reviewing!</h2>\n        ";
}
function h(a, b) {
return '\n        <input type="button" class="take-a-break to-dashboard simple-button action-gradient left" value="Pick something else to work on"><input type="button" class="more-stacks default-action simple-button action-gradient green right" value="Keep reviewing!">\n        ';
}
function i(a, b) {
return '\n        <input type="button" class="take-a-break to-dashboard default-action simple-button action-gradient left" value="Head back to your exercise dashboard">\n        ';
}
c = c || a.helpers;
var j = "", k, l = c.helperMissing, m = this.escapeExpression, n = this;
j += '<div class="end-of-stack-info">\n    <div class="title clearfix">\n        ', k = b.reviewsLeft, k = c["if"].call(b, k, {
hash: {},
inverse: n.program(3, g, e),
fn: n.program(1, f, e)
});
if (k || k === 0) j += k;
j += '\n    </div>\n    <div class="stack-controls">\n        ', k = b.reviewsLeft, k = c["if"].call(b, k, {
hash: {},
inverse: n.program(7, i, e),
fn: n.program(5, h, e)
});
if (k || k === 0) j += k;
return j += "\n    </div>\n</div>\n\n", j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_happy-picture-card"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i = "function", j = this.escapeExpression;
return f += '<div class="happy-picture">\n    <h4 class="caption">', h = c.caption, h ? g = h.call(b, {
hash: {}
}) : (g = b.caption, g = typeof g === i ? g() : g), f += j(g) + '</h4>\n\n	<input type="button" class="simple-button action-gradient green" id="next-question-button" value="Next Question..."/><br>\n\n    <div class="img-container"><img class="vertical-shadow" src="', h = c.src, h ? g = h.call(b, {
hash: {}
}) : (g = b.src, g = typeof g === i ? g() : g), f += j(g) + '"></div>\n</div>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["exercises-package_calculating-card"] = a(function(a, b, c, d, e) {
return c = c || a.helpers, '<div class="calculating-end-of-stack">\n    <div class="card-pocket">\n        <div class="slit">&nbsp;</div>\n        <div class="slit-overlay">&nbsp;</div>\n    </div>\n\n    <h2 class="calc-text-spin">\n        <span>Counting hard-earned leaves...</span>\n        <span>Crunching hard numbers...</span>\n        <span>Calculating streaks...</span>\n        <span>Updating proficiency...</span>\n\n        <!-- silly spin messages -->\n        <span class="egg" data-prob=".07">Reticulating splines...</span>\n        <span class="egg" data-prob=".03">Doublechecking with Toby...</span>\n        <span class="egg" data-prob=".005">Consulting with Sal...</span>\n    </h2>\n\n    <img class="throbber" src="/images/throbber.gif">\n</div>\n';
});
}(), Handlebars.registerPartial("exercise-header", Templates.get("exercises.exercise-header")), Handlebars.registerPartial("card", Templates.get("exercises.card")), Handlebars.registerPartial("card-leaves", Templates.get("exercises.card-leaves"));

var Exercises = {
practiceMode: !1,
reviewMode: !1,
topic: null,
topicExerciseBadge: null,
userData: null,
practiceExercise: null,
readOnlyUserExercise: null,
currentCard: null,
currentCardView: null,
completeStack: null,
completeStackView: null,
incompleteStack: null,
incompleteStackView: null,
sessionStats: null,
pendingAPIRequests: 0,
init: function(a) {
this.topic = new Topic(a.topic), this.topicExerciseBadge = a.topicExerciseBadge, this.practiceExercise = new Exercise(a.practiceExercise), this.practiceMode = a.practiceMode, this.userData = a.userData, this.reviewMode = a.reviewMode, this.readOnly = a.readOnly, this.sessionStats = new Exercises.SessionStats(null, {
sessionId: this.sessionId()
}), this.completeStack = new Exercises.CachedStackCollection(null, {
sessionId: this.sessionId()
}), this.incompleteStack = new Exercises.StackCollection(a.incompleteStack), this.incompleteStack.shrinkBy(this.completeStack.length), this.currentCard = this.incompleteStack.pop(), this.readOnly ? this.readOnlyUserExercise = a.userExercises[0] : Exercises.BottomlessQueue.init(this.topic, a.userExercises, !this.reviewMode && !this.practiceMode);
},
apiRequest: function(a) {
a.data || (a.data = {}), a.data.casing = "camel", a.data.dataType = "json", $.ajax(a).done($.proxy(function() {
this.pendingAPIRequests--;
}, this)), this.pendingAPIRequests++;
},
sessionId: function() {
if (this.userData.isPrePhantom) return null;
if (this.readOnly) return null;
if (this.reviewMode) return null;
var a = null;
this.practiceMode && !!this.practiceExercise ? a = "practice:" + this.practiceExercise.get("name") : !this.topic || (a = "topic:" + this.topic.get("id"));
if (!a) throw "Missing exercise or topic for current session";
return [ this.userData.keyEmail, a ].join(":");
},
render: function() {
var a = Templates.get("exercises.exercise");
$(".exercises-content-container").html(a({
topic: this.topic.toJSON(),
topicExerciseBadge: this.topicExerciseBadge,
practiceExercise: this.practiceExercise.toJSON(),
practiceMode: this.practiceMode,
reviewMode: this.reviewMode
})), this.incompleteStackView = new Exercises.StackView({
collection: this.incompleteStack,
el: $(".incomplete-stack"),
frontVisible: !1
}), this.completeStackView = new Exercises.StackView({
collection: this.completeStack,
el: $(".complete-stack"),
frontVisible: !0
}), this.currentCardView = new Exercises.CurrentCardView({
model: this.currentCard,
el: $(".current-card")
}), this.currentCardView.render(), this.incompleteStackView.render(), this.completeStackView.render(), this.bindEvents();
},
bindEvents: function() {
$(Khan).bind("gotoNextProblem", function() {
return Badges.hide(), Exercises.nextCard(), !1;
}), $(Khan).bind("problemDone", function() {
Exercises.currentCard.set({
done: !0,
leavesEarned: Exercises.currentCard.get("leavesAvailable")
}, {
updateLeaves: !0
});
}), $(Khan).bind("checkAnswer", function(a, b) {
b.pass === !0 ? b.fast === !0 ? Exercises.currentCard.decreaseLeavesAvailable(4) : Exercises.currentCard.decreaseLeavesAvailable(3) : Exercises.currentCard.decreaseLeavesAvailable(2);
}), $(Khan).bind("hintUsed", function() {
Exercises.currentCard.get("done") || Exercises.currentCard.decreaseLeavesAvailable(2);
}), $(Khan).bind("allHintsUsed", function() {
Exercises.currentCard.get("done") || Exercises.currentCard.decreaseLeavesAvailable(1);
}), $(Khan).bind("apiRequestStarted", function() {
Exercises.pendingAPIRequests++;
}).bind("apiRequestEnded", function() {
Exercises.pendingAPIRequests--;
});
},
nextUserExercise: function() {
return this.readOnly ? this.readOnlyUserExercise : this.BottomlessQueue.next();
},
nextCard: function() {
var a = {
deferreds: []
};
this.currentCard && (this.completeStack.add(this.currentCard, _.extend(a, {
at: 0
})), this.currentCard = null, a.deferreds.push(this.currentCardView.animateToRight())), $.when.apply(null, a.deferreds).done(function() {
Exercises.currentCardView.detachEvents(), Exercises.currentCard = Exercises.incompleteStack.pop(a), Exercises.incompleteStack.length || (Exercises.completeStack.clearCache(), Exercises.sessionStats.clearAndDisableCache()), Exercises.currentCardView = new Exercises.CurrentCardView({
model: Exercises.currentCard,
el: $(".current-card")
}), Exercises.currentCardView.render(), $.when(Exercises.currentCardView.moveLeft()).done(function() {
setTimeout(function() {
Exercises.currentCardView.animateFromLeft();
}, 1);
});
});
}
};

Exercises.Card = Backbone.Model.extend({
leaves: function(a) {
return _.map(_.range(4), function(a) {
return {
index: a,
state: this.get("leavesEarned") > a ? "earned" : this.get("leavesAvailable") > a ? "available" : "unavailable"
};
}, this);
},
decreaseLeavesAvailable: function(a) {
var b = this.get("leavesAvailable");
return b && (a = Math.min(b, a)), this.set({
leavesAvailable: a
});
}
}), Exercises.StackCollection = Backbone.Collection.extend({
model: Exercises.Card,
peek: function() {
return _.head(this.models);
},
pop: function(a) {
var b = this.peek();
return this.remove(b, a), b;
},
shrinkBy: function(a) {
var b = Math.max(2, this.length - a);
while (this.length > b) this.remove(this.models[this.length - 2]);
},
longestStreak: function(a, b) {
var c = 0, d = 0;
return b = b || function() {
return !1;
}, this.each(function(e) {
b(e) || (a(e) ? c += 1 : c = 0, d = Math.max(c, d));
}), d;
},
stats: function() {
var a = this.reduce(function(a, b) {
return Math.min(3, b.get("leavesEarned")) + a;
}, 0), b = this.longestStreak(function(a) {
return a.get("leavesEarned") >= 3;
}, function(a) {
return a.get("leavesAvailable") === 0;
}), c = this.filter(function(a) {
return a.get("leavesEarned") >= 4;
}).length;
return {
longestStreak: b,
speedyCards: c,
totalLeaves: a
};
}
}), Exercises.CachedStackCollection = Exercises.StackCollection.extend({
sessionId: null,
initialize: function(a, b) {
return this.sessionId = b ? b.sessionId : null, a || this.loadFromCache(), this.bind("add", this.cache, this).bind("remove", this.cache, this), Exercises.StackCollection.prototype.initialize.call(this, a, b);
},
cacheKey: function() {
if (!this.sessionId) throw "Missing session id for cache key";
return [ "cachedstack", this.sessionId ].join(":");
},
loadFromCache: function() {
if (!this.sessionId) return;
var a = LocalStore.get(this.cacheKey());
a && _.each(a, function(a) {
this.add(new Exercises.Card(a));
}, this);
},
cache: function() {
if (!this.sessionId) return;
LocalStore.set(this.cacheKey(), this.models);
},
clearCache: function() {
if (!this.sessionId) return;
LocalStore.del(this.cacheKey());
}
}), Exercises.StackView = Backbone.View.extend({
template: Templates.get("exercises.stack"),
initialize: function(a) {
var b = function(a) {
return function(b, c, d) {
var e = a.call(this, b, c, d);
return d && d.deferreds && d.deferreds.push(e), e;
};
};
return this.collection.bind("add", b(function(a) {
return this.animatePush(a);
}), this).bind("remove", b(function() {
return this.animatePop();
}), this), Backbone.View.prototype.initialize.call(this, a);
},
render: function() {
var a = _.map(this.collection.models, function(a, b) {
return this.viewContext(a, b);
}, this);
return this.$el.html(this.template({
cards: a
})), this;
},
viewContext: function(a, b) {
return _.extend(a.toJSON(), {
index: b,
frontVisible: this.options.frontVisible,
cid: a.cid,
leaves: a.leaves()
});
},
animatePop: function() {
return this.$el.find(".card-container").first().slideUp(360, function() {
$(this).remove();
});
},
animatePush: function(a) {
var b = this.viewContext(a, this.collection.length);
return this.$el.find(".stack").prepend($(Templates.get("exercises.card")(b)).css("display", "none").css("opacity", 0)).find(".card-container").first().delay(50).slideDown(200).animate({
opacity: 1
}, {
queue: !1,
duration: 140
});
}
}), Exercises.CurrentCardView = Backbone.View.extend({
template: Templates.get("exercises.current-card"),
model: null,
events: {
"click .to-dashboard": "toDashboard",
"click .more-stacks": "toMoreStacks",
"click #show-topic-details": "showTopicDetails"
},
initialize: function(a) {
return this.attachEvents(), Backbone.View.prototype.initialize.call(this, a);
},
onModelChange: function(a, b) {
b.updateLeaves && this.updateLeaves();
},
attachEvents: function() {
this.model.bind("change", this.onModelChange, this);
},
detachEvents: function() {
this.model.unbind("change", this.onModelChange);
},
render: function() {
switch (this.model.get("cardType")) {
case "problem":
this.renderProblemCard();
break;
case "endofstack":
this.renderEndOfStackCard();
break;
case "endofreview":
this.renderEndOfReviewCard();
break;
case "happypicture":
this.renderHappyPictureCard();
break;
default:
throw "Trying to render unknown card type";
}
return this;
},
viewContext: function() {
return _.extend(this.model.toJSON(), {
leaves: this.model.leaves()
});
},
renderCardContainer: function() {
this.$el.html(this.template(this.viewContext()));
},
renderCardContents: function(a, b) {
var c = _.extend({}, this.viewContext(), b);
this.$el.find(".current-card-contents").html($(Templates.get(a)(c))), this.delegateEvents();
},
runAfterAPIRequests: function(a) {
function b() {
Exercises.pendingAPIRequests > 0 ? setTimeout(b, 500) : a();
}
b();
},
renderCalculationInProgressCard: function() {
if ($(".calculating-end-of-stack").is(":visible")) return;
this.renderCardContainer(), this.renderCardContents("exercises.calculating-card"), setTimeout(function() {
$(".complete-stack .card-container").each(function(a, b) {
a < 4 ? $(b).addClass("into-pocket").addClass("into-pocket-" + a) : $(b).css("display", "none");
}); /*Ais */
}, 500);
var a = function(b, c) {
var d = $(".calc-text-spin span");
if (!b || !b.length) b = d;
var e = c == null ? b.first() : $(c), f = b.next("span:not(.egg)"), g = Math.random(), h = _.find(b.filter(".egg"), function(a) {
var b = $(a).data("prob");
return g >= b[0] && g < b[1];
});
e.fadeIn(600, function() {
e.delay(1e3).fadeOut(600, function() {
a(f, h);
});
});
}, b = $(".calc-text-spin span.egg");
for (var c = 0, d = 0; c < b.length; c += 1) tail = d + $(b[c]).data("prob"), $(b[c]).data("prob", [ d, tail ]), d = tail;
a();
},
renderCardAfterAPIRequests: function(a, b, c) {
this.renderCalculationInProgressCard(), setTimeout(function() {
Exercises.currentCardView.runAfterAPIRequests(function() {
b = b || function() {}, Exercises.currentCardView.renderCardContents(a, b()), c && c();
});
}, 2200);
},
renderProblemCard: function() {
$("#problemarea").length || (this.renderCardContainer(), this.renderCardContents("exercises.problem-template"), $(Exercises).trigger("problemTemplateRendered"), $(".streak-transition").hoverIntent(function() {
$(this).addClass("hover");
}, function() {
$(this).removeClass("hover");
})), this.renderExerciseInProblemCard(), this.updateLeaves();
},
renderExerciseInProblemCard: function() {
var a = Exercises.nextUserExercise();
a && $(Exercises).trigger("readyForNextProblem", {
userExercise: a
});
},
renderEndOfStackCard: function() {
this.renderCalculationInProgressCard(), this.runAfterAPIRequests($.proxy(function() {
var a = [];
!Exercises.practiceMode && !Exercises.reviewMode && Exercises.apiRequest({
url: "/api/v1/user/topic/" + encodeURIComponent(Exercises.topic.get("id")) + "/exercises",
type: "GET",
success: function(b) {
_.each(b, function(b) {
a[a.length] = b;
});
}
}), this.renderCardAfterAPIRequests("exercises.end-of-stack-card", function() {
var b = _.filter(a, function(a) {
return !a.exerciseStates.proficient && a.totalDone === 0;
}), c = _.filter(a, function(a) {
return a.exerciseStates.proficient;
}), d = _.filter(a, function(a) {
return !a.exerciseStates.proficient && a.totalDone > 0;
}), e = Exercises.sessionStats.progressStats();
return _.each(c, function(a) {
a.exerciseStates.justEarnedProficiency = _.any(e.progress, function(b) {
return b.exerciseStates.justEarnedProficiency && b.name == a.exercise;
});
}), _.extend({
practiceMode: Exercises.practiceMode,
proficient: c.length,
total: a.length,
startedExercises: d,
unstartedExercises: b,
proficientExercises: c
}, e, Exercises.completeStack.stats());
}, function() {
Exercises.completeStackView.$el.hide(), Exercises.currentCardView.$el.find(".stack-stats p, .small-exercise-icon, .review-explain").each(Exercises.currentCardView.attachTooltip).end().find(".default-action").focus();
});
}, this));
},
renderEndOfReviewCard: function() {
this.renderCalculationInProgressCard(), this.runAfterAPIRequests(function() {
var a = 0;
Exercises.apiRequest({
url: "/api/v1/user/exercises/reviews/count",
type: "GET",
success: function(b) {
a = b;
}
}), Exercises.currentCardView.renderCardAfterAPIRequests("exercises.end-of-review-card", function() {
return _.extend({}, Exercises.completeStack.stats(), {
reviewsLeft: a
});
}, function() {
Exercises.completeStackView.$el.hide(), Exercises.currentCardView.$el.find(".default-action").focus();
});
});
},
renderHappyPictureCard: function() {
this.renderCardContainer(), this.renderCardContents("exercises.happy-picture-card"), this.$el.find("#next-question-button").click(function() {
Exercises.nextCard();
}).focus();
},
attachTooltip: function() {
$(this).qtip({
content: {
text: $(this).data("desc")
},
style: {
classes: "ui-tooltip-light leaf-tooltip"
},
position: {
my: "bottom center",
at: "top center"
},
events: {
show: function(a, b) {
var c = $(b.elements.target);
c.is(".leaf") && parseInt(c.find(".full-leaf").css("opacity"), 10) != 1 && a.preventDefault();
}
},
show: {
delay: 200,
effect: {
length: 0
}
},
hide: {
delay: 0
}
});
},
showTopicDetails: function() {
$(".current-topic").slideDown(), $("#show-topic-details").hide();
},
toDashboard: function() {
window.location = "/exercisedashboard";
},
toMoreStacks: function() {
window.location.assign(window.location.href);
},
updateLeaves: function() {
this.$el.find(".leaves-container").html($(Templates.get("exercises.card-leaves")(this.viewContext()))).find(".leaf").each(this.attachTooltip), this.model.get("done") ? ($(".leaves-container").show(), $(".current-card").addClass("done"), setTimeout(function() {
$(".leaves-container .earned .full-leaf").addClass("animated");
}, 1)) : $(".current-card").removeClass("done");
},
animateToRight: function() {
return this.$el.addClass("shrinkRight"), null;
},
animateFromLeft: function() {
return this.$el.removeClass("notransition").removeClass("shrinkLeft"), null;
},
moveLeft: function() {
return this.$el.addClass("notransition").removeClass("shrinkRight").addClass("shrinkLeft"), null;
}
}), Exercises.SessionStats = Backbone.Model.extend({
cacheEnabled: !1,
sessionId: null,
initialize: function(a, b) {
return this.cacheEnabled = !0, this.sessionId = b ? b.sessionId : null, this.loadFromCache(), $(Exercises).bind("newUserExerciseData", $.proxy(function(a, b) {
this.updateProgressStats(b.exerciseName);
}, this)), Backbone.Model.prototype.initialize.call(this, a, b);
},
cacheKey: function() {
if (!this.sessionId) throw "Missing session id for cache key";
return [ "cachedsessionstats", this.sessionId ].join(":");
},
loadFromCache: function() {
if (!this.sessionId) return;
var a = LocalStore.get(this.cacheKey());
a && this.set(a);
},
cache: function() {
if (!this.sessionId) return;
if (!this.cacheEnabled) return;
LocalStore.set(this.cacheKey(), this.attributes);
},
clearCache: function() {
if (!this.sessionId) return;
LocalStore.del(this.cacheKey());
},
clearAndDisableCache: function() {
this.cacheEnabled = !1, this.clearCache();
},
updateProgressStats: function(a) {
var b = Exercises.BottomlessQueue.userExerciseCache[a];
if (b) {
var c = this.get("progress") || {}, d = c[a] || {
name: b.exercise,
displayName: b.exerciseModel.displayName,
startProficient: b.exerciseStates.proficient,
startTotalDone: b.totalDone,
start: b.progress
};
d.exerciseStates = b.exerciseStates, d.exerciseStates.justEarnedProficiency = d.exerciseStates.proficient && !d.startProficient, d.endTotalDone = b.totalDone, d.end = b.progress, d.start = Math.min(d.start, d.end), c[a] = d, this.set({
progress: c
}), this.cache();
}
},
progressStats: function() {
var a = _.filter(_.values(this.get("progress") || {}), function(a) {
return a.endTotalDone && a.endTotalDone > a.startTotalDone;
});
return _.each(a, function(a) {
a.userExercise = Exercises.BottomlessQueue.userExerciseCache[a.name];
}), {
progress: a
};
}
}), Exercises.BottomlessQueue = {
topic: null,
recycleQueueLength: 5,
queueRefillSize: 2,
preloadUpcoming: 2,
refillEnabled: !0,
refilling: !1,
initDeferred: $.Deferred(),
sessionStorageEnabled: null,
currentQueue: [],
recycleQueue: [],
current: null,
userExerciseCache: {},
init: function(a, b, c) {
this.sessionStorageEnabled = this.testSessionStorage(), this.topic = a, this.refillEnabled = c !== !1, this.initDeferred.done(function() {
if (!Exercises.BottomlessQueue.sessionStorageEnabled) {
Exercises.BottomlessQueue.warnSessionStorageDisabled();
return;
}
_.each(b, function(a) {
this.enqueue(this.checkCacheForLatest(a));
}, Exercises.BottomlessQueue);
}), $(Khan).bind("updateUserExercise", function(a, b) {
Exercises.BottomlessQueue.cacheLocally(b);
}).bind("attemptError", function(a, b) {
Exercises.BottomlessQueue.clearCache(b);
}).bind("problemDone", function() {
var a = Exercises.BottomlessQueue.current.exercise, b = Exercises.BottomlessQueue.userExerciseCache[a];
b && (b.totalDone += 1);
});
},
testSessionStorage: function() {
var a, b = +(new Date);
try {
return sessionStorage[b] = b, a = sessionStorage[b] == b, sessionStorage.removeItem(b), a;
} catch (c) {
return !1;
}
},
warnSessionStorageDisabled: function() {
$(Exercises).trigger("warning", {
text: "You must enable DOM storage in your browser; see <a href='https://sites.google.com/a/khanacademy.org/forge/for-developers/how-to-enable-dom-storage'>here</a> for instructions.",
showClose: !1
});
},
enqueue: function(a) {
this.currentQueue.push({
exercise: a.exercise,
upcomingTriggered: !1
}), this.cacheLocally(a), this.triggerUpcoming();
},
triggerUpcoming: function() {
_.each(this.currentQueue, function(a, b) {
!a.upcomingTriggered && b < this.preloadUpcoming && ($(Exercises).trigger("upcomingExercise", {
exerciseName: a.exercise
}), a.upcomingTriggered = !0);
}, this);
},
cacheKey: function(a) {
return "userexercise:" + a.user + ":" + a.exercise;
},
checkCacheForLatest: function(a) {
if (!a) return null;
var b = window.sessionStorage[this.cacheKey(a)], c = b ? JSON.parse(b) : null;
return c && c.totalDone > a.totalDone ? c : a;
},
cacheLocally: function(a) {
if (!a) return;
var b = this.userExerciseCache[a.exercise];
if (!b || a.totalDone >= b.totalDone) this.userExerciseCache[a.exercise] = a, window.sessionStorage[this.cacheKey(a)] = JSON.stringify(a), $(Exercises).trigger("newUserExerciseData", {
exerciseName: a.exercise
});
},
clearCache: function(a) {
if (!a) return;
delete this.userExerciseCache[a.exercise], delete window.sessionStorage[this.cacheKey(a)];
},
next: function() {
this.initDeferred.isResolved() || this.initDeferred.resolve();
if (!this.sessionStorageEnabled) return null;
this.currentQueue.length || (this.currentQueue = this.recycleQueue, this.recycleQueue = []);
if (!this.currentQueue.length) throw "No exercises are in the queue";
this.current = _.head(this.currentQueue);
if (!this.userExerciseCache[this.current.exercise]) throw "Missing user exercise cache for next exercise";
return this.currentQueue = _.rest(this.currentQueue), this.recycleQueue.push(this.current), this.recycleQueue = _.last(this.recycleQueue, Math.min(5, this.recycleQueue.length)), this.currentQueue.length < this.queueRefillSize && this.refill(), this.triggerUpcoming(), this.userExerciseCache[this.current.exercise];
},
refill: function() {
if (!this.refillEnabled) return;
if (this.refilling) return;
$.ajax({
url: "/api/v1/user/topic/" + encodeURIComponent(this.topic.get("id")) + "/exercises/next",
type: "GET",
dataType: "json",
data: {
queued: _.pluck(this.currentQueue, "exercise"),
casing: "camel"
},
complete: function() {
Exercises.BottomlessQueue.refilling = !1;
},
success: function(a) {
_.each(a, function(a) {
Exercises.BottomlessQueue.enqueue(a);
});
}
}), this.refilling = !0;
}
};