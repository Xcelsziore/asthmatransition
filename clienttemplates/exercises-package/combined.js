(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_exercise"]=a(function(a,b,c,d,e){c=c||a.helpers,d=d||a.partials;var f="",g,h=this;f+='<article class="exercises-content clearfix">\n\n    <div class="exercises-header">',g=b,g=h.invokePartial(d["exercise-header"],"exercise-header",g,c,d);if(g||g===0)f+=g;return f+='</div>\n\n    <div class="exercises-body">\n        <div class="exercises-stack incomplete-stack"></div>\n        <div class="exercises-card current-card"></div>\n        <div class="exercises-stack complete-stack"></div>\n        <div class="stack-spacer clearfix"></div>\n    </div>\n\n</article>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_exercise-header"]=a(function(a,b,c,d,e){function k(a,b){return'\n<div class="topic-exercise-badge">\n	<span class="topic-exercise-image">&nbsp;<!-- Review doesn\'t have a badge image, just a placeholder --></span>\n</div>\nReview\n'}function l(a,b){var d="",e;d+="\n    ",e=a.practiceMode,e=c["if"].call(a,e,{hash:{},inverse:j.program(6,n,b),fn:j.program(4,m,b)});if(e||e===0)d+=e;return d+="\n",d}function m(a,b){var c="",d;return c+='\n	<div class="topic-exercise-badge">\n        <span class="topic-exercise-badge">\n            &nbsp;<!-- Practice exercises don\'t have badge images, just a placeholder -->\n        </span>\n    </div>\n    <span class="practice-exercise-topic-context">Practicing</span> ',d=a.practiceExercise,d=d==null||d===!1?d:d.displayName,d=typeof d===h?d():d,c+=i(d)+'\n    <span class="practice-exercise-topic-context">in </span>\n    <span class="practice-exercise-topic-context solid-hover">\n        <img class="topic-exercise-image inline" src="',d=a.topicExerciseBadge,d=d==null||d===!1?d:d.icons,d=d==null||d===!1?d:d.compact,d=typeof d===h?d():d,c+=i(d)+'">\n        <a href=".">',d=a.topic,d=d==null||d===!1?d:d.standaloneTitle,d=typeof d===h?d():d,c+=i(d)+"</a>\n    </span>\n    ",c}function n(a,b){var c="",d;return c+='\n    <div class="topic-exercise-badge">\n	    <img class="topic-exercise-image" src="',d=a.topicExerciseBadge,d=d==null||d===!1?d:d.icons,d=d==null||d===!1?d:d.compact,d=typeof d===h?d():d,c+=i(d)+'">\n    </div>\n	',d=a.topic,d=d==null||d===!1?d:d.standaloneTitle,d=typeof d===h?d():d,c+=i(d)+"\n\n    ",c}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<h2 class="section-headline" style="display:block;">\n',g=b.reviewMode,g=c["if"].call(b,g,{hash:{},inverse:j.program(3,l,e),fn:j.program(1,k,e)});if(g||g===0)f+=g;return f+='\n<div class="streak-transition">\n    <span class="hover-disclosure">What happened to the streak bar?</span>\n    <div class="expl-image vertical-shadow">\n        <img src="/images/power-mode/streak-transition.png?4" />\n    </div>\n</div>\n</h2>',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_stack"]=a(function(a,b,c,d,e){function i(a,b){var e="",f;e+="\n    ",f=a,f=h.invokePartial(d.card,"card",f,c,d);if(f||f===0)e+=f;return e+="\n",e}c=c||a.helpers,d=d||a.partials;var f="",g,h=this;f+='<div class="stack">\n',g=b.cards,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.program(1,i,e)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_card"]=a(function(a,b,c,d,e){function l(a,b){var d="",e;d+='\n            <div class="card-front card-face">\n                <span>\n                    ',e=a.leavesAvailable,e=c["if"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(2,m,b)});if(e||e===0)d+=e;return d+="\n                </span>\n            </div>\n            ",d}function m(a,b){var e="",f;e+="\n                        ",f=a,f=i.invokePartial(d["card-leaves"],"card-leaves",f,c,d);if(f||f===0)e+=f;return e+="\n                    ",e}function n(a,b){return'\n            <div class="card-back card-face">\n                &nbsp;\n            </div>\n            '}c=c||a.helpers,d=d||a.partials;var f="",g,h,i=this,j="function",k=this.escapeExpression;f+='<div id="card-cid-',h=c.cid,h?g=h.call(b,{hash:{}}):(g=b.cid,g=typeof g===j?g():g),f+=k(g)+'" class="card-container">\n    <div class="card-container-inner">\n        <div class="card">\n            ',g=b.frontVisible,g=c["if"].call(b,g,{hash:{},inverse:i.program(4,n,e),fn:i.program(1,l,e)});if(g||g===0)f+=g;return f+="\n        </div>\n    </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_current-card"]=a(function(a,b,c,d,e){c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="current-card-container card-type-',h=c.cardType,h?g=h.call(b,{hash:{}}):(g=b.cardType,g=typeof g===i?g():g),f+=j(g)+'">\n    <div class="current-card-container-inner vertical-shadow">\n    	<div class="leaves-container">\n            ',g=b,g=k.invokePartial(d["card-leaves"],"card-leaves",g,c,d);if(g||g===0)f+=g;return f+='\n        </div>\n        <div class="current-card-contents"></div>\n    </div>\n    <div id="extras" class="single-exercise">\n		<!-- TODO: Toggle scratchpad display -->\n		<ul>\n			<li>\n				<a id="scratchpad-show" href="">Show scratchpad</a>\n				<span id="scratchpad-not-available">Scratchpad not available</span>\n			</li>\n		</ul>\n	</div>\n</div>\n\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_card-leaves"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression;return f+='<div class="leaves clearfix">\n    <div class="leaf ',g=b.leaves,g=g==null||g===!1?g:g[0],g=g==null||g===!1?g:g.state,g=typeof g===h?g():g,f+=i(g)+'" data-desc="Earn this leaf for completing this card.">\n        <div class="full-leaf">\n        </div>\n    </div>\n    <div class="leaf ',g=b.leaves,g=g==null||g===!1?g:g[1],g=g==null||g===!1?g:g.state,g=typeof g===h?g():g,f+=i(g)+'" data-desc="Earn this leaf for completing this card without using all of the hints.">\n    	<div class="full-leaf">\n        </div>\n    </div>\n    <div class="leaf ',g=b.leaves,g=g==null||g===!1?g:g[2],g=g==null||g===!1?g:g.state,g=typeof g===h?g():g,f+=i(g)+'" data-desc="Earn this leaf for answering correctly on your first try without any hints.">\n    	<div class="full-leaf">\n        </div>\n    </div>\n</div>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_problem-template"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<!--\n    TODO: eventually, this template can replace khan-exercises/exercises/khan-exercise.html,\n    which is used in exercise test mode\n-->\n\n<div id="exercise-message-container" style="display: none;">\n	<div class="exercise_message"></div>\n</div>\n<div id="warning-bar">\n	<span id="warning-bar-content"></span>\n	<span id="warning-bar-close">(<a href="">close</a>)</span>\n</div>\n<div id="problem-and-answer">\n	<div id=\'problemarea\'>\n		<div id=\'scratchpad\'><div></div></div>\n		<div id=\'workarea\'></div>\n		<div id=\'hintsarea\'></div>\n	</div>\n	<div id="answer_area_wrap"><div id="answer_area">\n		<form id="answerform" action="/exercisedashboard" method="get" name="answerform">\n			<div id="answercontent" class="info-box">\n				<span id="examples-show">Acceptable formats</span>\n				<span class="info-box-header">Answer</span>\n				<div id="solutionarea" class="fancy-scrollbar"></div>\n				<ul id="examples" style="display: none"></ul>\n				<div class="answer-buttons">\n				<input type="button" class="simple-button action-gradient green" id="check-answer-button" tabindex="10" value="Check Answer"/>\n				<input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px">\n				<input type="button" class="simple-button action-gradient green" id="next-question-button" style="display:none;" name="correctnextbutton" value="Correct! Next Question..."/>\n				<div id="positive-reinforcement"><img src="/images/face-smiley.gif" /></div>\n				<span id="show-solution-button-container"></span>\n				<div id="check-answer-results"><p class="check-answer-message info-box-sub-description"></p></div>\n				</div>\n			</div>\n			<div id="readonly" class="info-box">\n				<span id="readonly-problem" class="info-box-header"></span>\n				<span id="readonly-title" class="info-box-subheader">You are viewing a problem.</span>\n				<span class="info-box-sub-description">To work on problems like this, <a id="readonly-start" href="">start this exercise</a>.</span>\n			</div>\n			<div class="info-box hint-box">\n				<span class="info-box-header">Need help?</span>\n				<div id="get-hint-button-container">\n					<input id="hint" type="button" class="simple-button action-gradient orange full-width" value="I\'d like a hint" name="hint"/>\n				</div>\n				<span id="hint-remainder"></span>\n			</div>\n			<div class="info-box related-video-box" style="display:none;">\n				<div id="related-video-content">\n					<span class="info-box-header">Stuck? Watch a video.</span>\n\n					<div id="related-video-list">\n						<span class="related-content-title">Related videos:</span>\n						<ul class="related-video-list"></ul>\n					</div>\n					<div class="clear"></div>\n				</div>\n			</div>\n		</form>\n		<div id="issue" class="info-box" style="display:none;">\n			<span class="info-box-header">Report a Problem</span>\n			<span id="issue-status" class="info-box-sub-description"></span>\n			<form>\n				<fieldset>\n					<legend>Issue Type</legend>\n					<ul>\n						<li>\n							<input type="radio" name="issue-type" id="issue-wrong-or-unclear">\n							<label for="issue-wrong-or-unclear">Answer is wrong or question is unclear</label>\n						</li>\n						<li>\n							<input type="radio" name="issue-type" id="issue-hard">\n							<label for="issue-hard">I\'m frustrated (tell us why) or this is too hard</label>\n						</li>\n						<li>\n							<input type="radio" name="issue-type" id="issue-not-showing">\n							<label for="issue-not-showing">I can\'t see the problem or website is stuck</label>\n						</li>\n						<li>\n							<input type="radio" name="issue-type" id="issue-other">\n							<label for="issue-other">Other (please describe below)</label>\n						</li>\n					</ul>\n				</fieldset>\n				<label for="issue-title">Issue Title:<input type="text" name="issue-title" id="issue-title" /></label>\n				<label for="issue-email">Your Email (optional):<input type="text" name="issue-email" id="issue-email" /></label>\n				<label for="issue-body">Description of Issue:<textarea name="issue-body" id="issue-body"></textarea></label>\n				<input type="submit" class="simple-button action-gradient" value="Submit Issue">\n				<a href="/#" id="issue-cancel">Cancel</a>\n				<img id="issue-throbber" style="display:none;" name="issue-throbber">\n			</form>\n		</div>\n	</div></div>\n	<div style="clear: both;"></div>\n</div>\n'})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_end-of-stack-card"]=a(function(a,b,c,d,e){function m(a,b){var d="",e,f,g,h;d+='\n	    	<div class="skill-status">\n                <h2 class="skill-bar-title">\n                    ',e=a.exerciseStates,e=c["with"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(2,n,b)});if(e||e===0)d+=e;d+='\n                    <a href="',e=a.userExercise,e=e==null||e===!1?e:e.exerciseModel,e=e==null||e===!1?e:e.relativeUrl,e=typeof e===j?e():e,d+=k(e)+'">',h=c.displayName,h?e=h.call(a,{hash:{}}):(e=a.displayName,e=typeof e===j?e():e),d+=k(e)+"</a>\n                </h2>\n                ",e=a.exerciseStates,f=a.start,g=a.end,h=c["skill-bar"],e=h?h.call(a,g,f,e,{hash:{}}):l.call(a,"skill-bar",g,f,e,{hash:{}});if(e||e===0)d+=e;return d+="\n		    </div>\n	    ",d}function n(a,b){var e;return e=a,e=i.invokePartial(d["shared_small-exercise-icon"],"shared_small-exercise-icon",e,c,d),e||e===0?e:""}function o(a,b){var d="",e,f;d+='\n    <div>\n        <h2 style="display: inline-block;">Overall Progress</h2>\n        <a href="javascript:void(0);" class="simple-button action-gradient" id="show-topic-details">\n            ',f=c.proficient,f?e=f.call(a,{hash:{}}):(e=a.proficient,e=typeof e===j?e():e),d+=k(e)+"/",f=c.total,f?e=f.call(a,{hash:{}}):(e=a.total,e=typeof e===j?e():e),d+=k(e)+' Skills\n        </a>\n    </div>\n    <div class="progress-graph current-topic clearfix visited-no-recolor">\n        <div class="three-col col-one">\n            <h3>Upcoming Skills</h3>\n            ',e=a.unstartedExercises,e=c.each.call(a,e,{hash:{},inverse:i.noop,fn:i.program(5,p,b)});if(e||e===0)d+=e;d+='\n        </div>\n        <div class="three-col col-two">\n            <h3>Skills In-Progress</h3>\n            ',e=a.startedExercises,e=c.each.call(a,e,{hash:{},inverse:i.noop,fn:i.program(8,r,b)});if(e||e===0)d+=e;d+='\n        </div>\n        <div class="three-col col-three">\n            <h3>Proficient Skills</h3>\n            ',e=a.proficientExercises,e=c.each.call(a,e,{hash:{},inverse:i.noop,fn:i.program(11,t,b)});if(e||e===0)d+=e;return d+="\n        </div>\n    </div>\n    ",d}function p(a,b){var d="",e,f,g;d+='\n            <div class="skill-status">\n                <h4 class="skill-bar-title">\n                    ',e=a.exerciseStates,e=c["with"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(6,q,b)});if(e||e===0)d+=e;d+='\n                    <a href="',e=a.exerciseModel,e=e==null||e===!1?e:e.relativeUrl,e=typeof e===j?e():e,d+=k(e)+'">',e=a.exerciseModel,e=e==null||e===!1?e:e.displayName,e=typeof e===j?e():e,d+=k(e)+"</a>\n                </h4>\n                ",e=a.progress,f=a.progress,g=c["skill-bar"],e=g?g.call(a,f,e,{hash:{}}):l.call(a,"skill-bar",f,e,{hash:{}});if(e||e===0)d+=e;return d+="\n            </div>\n            ",d}function q(a,b){var e;return e=a,e=i.invokePartial(d["shared_small-exercise-icon"],"shared_small-exercise-icon",e,c,d),e||e===0?e:""}function r(a,b){var d="",e,f,g;d+='\n            <div class="skill-status">\n                <h4 class="skill-bar-title">\n                    ',e=a.exerciseStates,e=c["with"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(9,s,b)});if(e||e===0)d+=e;d+='\n                    <a href="',e=a.exerciseModel,e=e==null||e===!1?e:e.relativeUrl,e=typeof e===j?e():e,d+=k(e)+'">',e=a.exerciseModel,e=e==null||e===!1?e:e.displayName,e=typeof e===j?e():e,d+=k(e)+"</a>\n                </h4>\n                ",e=a.progress,f=a.progress,g=c["skill-bar"],e=g?g.call(a,f,e,{hash:{}}):l.call(a,"skill-bar",f,e,{hash:{}});if(e||e===0)d+=e;return d+="\n            </div>\n            ",d}function s(a,b){var e;return e=a,e=i.invokePartial(d["shared_small-exercise-icon"],"shared_small-exercise-icon",e,c,d),e||e===0?e:""}function t(a,b){var d="",e,f,g,h;d+='\n        	<div class="skill-status">\n    	    	<h4 class="skill-bar-title">\n    	    		',e=a.exerciseStates,e=c["with"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(12,u,b)});if(e||e===0)d+=e;d+='\n                    <a href="',e=a.exerciseModel,e=e==null||e===!1?e:e.relativeUrl,e=typeof e===j?e():e,d+=k(e)+'">',e=a.exerciseModel,e=e==null||e===!1?e:e.displayName,e=typeof e===j?e():e,d+=k(e)+"</a>\n    	    	</h4>\n                ",e=a.exerciseStates,f=a.progress,g=a.progress,h=c["skill-bar"],e=h?h.call(a,g,f,e,{hash:{}}):l.call(a,"skill-bar",g,f,e,{hash:{}});if(e||e===0)d+=e;return d+="\n            </div>\n            ",d}function u(a,b){var e;return e=a,e=i.invokePartial(d["shared_small-exercise-icon"],"shared_small-exercise-icon",e,c,d),e||e===0?e:""}function v(a,b){var d="",e;d+="\n        ",e=a.progress,e=c.each.call(a,e,{hash:{},inverse:i.noop,fn:i.program(15,w,b)});if(e||e===0)d+=e;return d+="\n    ",d}function w(a,b){var d="",e;d+="\n        ",e=a.exerciseStates,e=e==null||e===!1?e:e.proficient,e=c["if"].call(a,e,{hash:{},inverse:i.program(20,A,b),fn:i.program(16,x,b)});if(e||e===0)d+=e;return d+="\n        ",d}function x(a,b){var d="",e;d+="\n            <h2>\n                Nice work! You're ready to move on. \n                ",e=a.exerciseStates,e=e==null||e===!1?e:e.reviewing,e=c["if"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(17,y,b)});if(e||e===0)d+=e;return d+='\n            </h2>\n            <div class="stack-controls practice-mode proficient">\n                <input type="button" class="more-stacks simple-button action-gradient left" value="Give me another stack like this"><input type="button" class="skill-proficient to-dashboard default-action simple-button action-gradient green right" value="Pick a new skill to work on" style="margin:0">\n            </div>\n        ',d}function y(a,b){var d="",e;d+="\n                ",e=a.exerciseStates,e=e==null||e===!1?e:e.justEarnedProficiency,e=c.unless.call(a,e,{hash:{},inverse:i.noop,fn:i.program(18,z,b)});if(e||e===0)d+=e;return d+="\n                ",d}function z(a,b){return'\n                <span class="hover-disclosure review-explain" data-desc="You\'ve earned proficiency in this skill, but we think you might want to review it because you had some trouble in this last stack.">\n                    Why is the bar orange?\n                </span>\n                '}function A(a,b){return'\n            <div class="stack-controls practice-mode">\n                <input type="button" class="take-a-break to-dashboard simple-button action-gradient left" value="Work on something else"><input type="button" class="more-stacks default-action simple-button action-gradient green right" value="Give me another stack like this!">\n            </div>\n        '}function B(a,b){return'\n        <div class="stack-controls">\n            <input type="button" class="take-a-break to-dashboard simple-button action-gradient left" value="Work on something else"><input type="button" class="more-stacks default-action simple-button action-gradient green right" value="Give me another stack like this!">\n        </div>\n    '}c=c||a.helpers,d=d||a.partials;var f="",g,h,i=this,j="function",k=this.escapeExpression,l=c.helperMissing;f+='<div class="end-of-stack-info">\n    <div class="title clearfix">\n        <div class="stack-stats">\n            <p data-desc="Your longest streak of cards with 3 or more leaves in this stack.">\n            	<img src="/images/power-mode/streak.png?2" /><span class="times">&times;</span>',h=c.longestStreak,h?g=h.call(b,{hash:{}}):(g=b.longestStreak,g=typeof g===j?g():g),f+=k(g)+'\n           	</p>\n            <p data-desc="Your quickly answered cards for this stack.">\n            	<img src="/images/power-mode/speed-answer.png?1" /><span class="times">&times;</span>',h=c.speedyCards,h?g=h.call(b,{hash:{}}):(g=b.speedyCards,g=typeof g===j?g():g),f+=k(g)+'\n            </p>\n            <p data-desc="Your total leaves for this stack of cards.">\n            	<img src="/images/power-mode/card-leaf-full-large.png" /><span class="times">&times;</span>',h=c.totalLeaves,h?g=h.call(b,{hash:{}}):(g=b.totalLeaves,g=typeof g===j?g():g),f+=k(g)+'\n            </p>\n        </div>\n        <h2>Stack Progress</h2>\n    </div>\n    <div class="progress-graph current-stack visited-no-recolor">\n	    ',g=b.progress,g=c.each.call(b,g,{hash:{},inverse:i.noop,fn:i.program(1,m,e)});if(g||g===0)f+=g;f+="\n    </div>\n\n    ",g=b.practiceMode,g=c.unless.call(b,g,{hash:{},inverse:i.noop,fn:i.program(4,o,e)});if(g||g===0)f+=g;f+="\n\n    ",g=b.practiceMode,g=c["if"].call(b,g,{hash:{},inverse:i.program(22,B,e),fn:i.program(14,v,e)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_end-of-review-card"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+="\n        <h2>You have ",e=a.reviewsLeft,f=c.pluralize,e=f?f.call(a,e,"skill",{hash:{}}):h.call(a,"pluralize",e,"skill",{hash:{}}),d+=i(e)+" left to review...</h2>\n        ",d}function l(a,b){return"\n        <h2>You're done reviewing!</h2>\n        "}function m(a,b){return'\n        <input type="button" class="take-a-break to-dashboard simple-button action-gradient left" value="Pick something else to work on"><input type="button" class="more-stacks default-action simple-button action-gradient green right" value="Keep reviewing!">\n        '}function n(a,b){return'\n        <input type="button" class="take-a-break to-dashboard default-action simple-button action-gradient left" value="Head back to your exercise dashboard">\n        '}c=c||a.helpers;var f="",g,h=c.helperMissing,i=this.escapeExpression,j=this;f+='<div class="end-of-stack-info">\n    <div class="title clearfix">\n        ',g=b.reviewsLeft,g=c["if"].call(b,g,{hash:{},inverse:j.program(3,l,e),fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='\n    </div>\n    <div class="stack-controls">\n        ',g=b.reviewsLeft,g=c["if"].call(b,g,{hash:{},inverse:j.program(7,n,e),fn:j.program(5,m,e)});if(g||g===0)f+=g;return f+="\n    </div>\n</div>\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_happy-picture-card"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+='<div class="happy-picture">\n    <h4 class="caption">',h=c.caption,h?g=h.call(b,{hash:{}}):(g=b.caption,g=typeof g===i?g():g),f+=j(g)+'</h4>\n\n	<input type="button" class="simple-button action-gradient green" id="next-question-button" value="Next Question..."/><br>\n\n    <div class="img-container"><img class="vertical-shadow" src="',h=c.src,h?g=h.call(b,{hash:{}}):(g=b.src,g=typeof g===i?g():g),f+=j(g)+'"></div>\n</div>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["exercises-package_calculating-card"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div class="calculating-end-of-stack">\n    <div class="card-pocket">\n        <div class="slit">&nbsp;</div>\n        <div class="slit-overlay">&nbsp;</div>\n    </div>\n\n    <h2 class="calc-text-spin">\n        <span>Counting hard-earned leaves...</span>\n        <span>Crunching hard numbers...</span>\n        <span>Calculating streaks...</span>\n        <span>Updating proficiency...</span>\n\n        <!-- silly spin messages -->\n        <span class="egg" data-prob=".07">Reticulating splines...</span>\n        <span class="egg" data-prob=".03">Doublechecking with Toby...</span>\n        <span class="egg" data-prob=".005">Consulting with Sal...</span>\n    </h2>\n\n    <img class="throbber" src="/images/throbber.gif">\n</div>\n'})})();
Handlebars.registerPartial("exercise-header", Templates.get("exercises.exercise-header"));
Handlebars.registerPartial("card", Templates.get("exercises.card"));
Handlebars.registerPartial("card-leaves", Templates.get("exercises.card-leaves"));
;
/**
 * Views and logic for exercise/stack/card interactions
 *
 * Catalog of events triggered on Exercises:
 *
 *   * problemTemplateRendered -- when a problem template that is ready for
 *   khan-exercises targetting is rendered
 *
 *   * readyForNextProblem -- when a card is ready for the next problem to
 *   be rendered by khan-exercises
 *
 *   * upcomingExercise -- when a new exercise is approaching in the upcoming
 *   queue, this is triggered to give listeners a chance to preload any
 *   requirements
 *
 *   * newUserExerciseData -- when an updated userExercise has been received
 *   and cached in Exercises.BottomlessQueue
 *
 *   * warning -- when a warning about issues like disabled sessionStorage
 *   has been fired
 *
 */
var Exercises = {

    // practice mode uses a single exercise, not an entire topic
    practiceMode: false,
    reviewMode: false,

    // topic and topicExerciseBadge will be populated if we're not in
    // review or practice (single-exercise) mode
    topic: null,
    topicExerciseBadge: null,

    userData: null,

    // practice exercise will be populated if we're in practice mode
    practiceExercise: null,

    // readOnlyUserExercise will only be populated if we're in readOnly mode
    readOnlyUserExercise: null,

    currentCard: null,
    currentCardView: null,

    completeStack: null,
    completeStackView: null,

    incompleteStack: null,
    incompleteStackView: null,

    sessionStats: null,

    // Keeps track of # of pending API requests
    pendingAPIRequests: 0,

    /**
     * Called to initialize the exercise page. Passed in with JSON information
     * rendered from the server.
     */
    init: function(json) {

        this.topic = new Topic(json.topic);
        this.topicExerciseBadge = json.topicExerciseBadge;

        this.practiceExercise = new Exercise(json.practiceExercise);
        this.practiceMode = json.practiceMode;

        this.userData = json.userData;
        this.reviewMode = json.reviewMode;
        this.readOnly = json.readOnly;

        // sessionStats and completeStack will be loaded from local cache if available
        this.sessionStats = new Exercises.SessionStats(/* attrs */ null, {sessionId: this.sessionId()});
        this.completeStack = new Exercises.CachedStackCollection(/* models */ null, {sessionId: this.sessionId()});

        // If we loaded a partially complete stack from cache, reduce
        // the size of the incomplete stack accordingly.
        this.incompleteStack = new Exercises.StackCollection(json.incompleteStack);
        this.incompleteStack.shrinkBy(this.completeStack.length);

        // Start w/ the first card ready to go
        this.currentCard = this.incompleteStack.pop();

        if (!this.readOnly) {

            // Prepare our never-ending queue of upcoming user exercises
            Exercises.BottomlessQueue.init(
                    this.topic,
                    json.userExercises,
                    /* refillEnabled */ !this.reviewMode && !this.practiceMode
            );

        } else {

            // readOnly only shows a single historical problem from a single
            // user exercise.
            this.readOnlyUserExercise = json.userExercises[0];

        }

    },

    /**
     * Send off an api request using supplied options and keep track of its
     * incomplete/complete status so we know how many exercise requests are
     * pending.
     */
    apiRequest: function(options) {

        if (!options.data) options.data = {};

        // Ensure camel casing and json
        options.data.casing = "camel";
        options.data.dataType = "json";

        $.ajax(options).done($.proxy(function() {
            this.pendingAPIRequests--;
        }, this));

        this.pendingAPIRequests++;

    },

    /**
     * Returns an identifier for the current user's session that can be
     * used for various cache keys. This sessionId isn't meant to be globally
     * unique, just an identifier for the current user and topic/exercise
     * being tackled.
     */
    sessionId: function() {

        if (this.userData.isPrePhantom) {
            // Don't cache results for pre phantom users
            return null;
        }

        if (this.readOnly) {
            // Read only mode stores and uses no cached session state
            return null;
        }

        if (this.reviewMode) {
            // Review mode, currently, doesn't track stack or session state.
            // It just gets you through the review. If you reload the page,
            // your right-hand stack will go away.
            // TODO: improve this. We didn't love the alternative of having
            // review stacks stick around even when you ignore review for
            // a long time.
            return null;
        }

        var contextId = null;

        if (this.practiceMode && !!this.practiceExercise) {
            contextId = "practice:" + this.practiceExercise.get("name");
        } else if (!!this.topic) {
            contextId = "topic:" + this.topic.get("id");
        }

        if (!contextId) {
            throw "Missing exercise or topic for current session";
        }

        return [
            this.userData.keyEmail,
            contextId
        ].join(":");
    },

    render: function() {

        var exerciseTemplate = Templates.get("exercises.exercise");

        $(".exercises-content-container").html(exerciseTemplate({
            topic: this.topic.toJSON(),
            topicExerciseBadge: this.topicExerciseBadge,
            practiceExercise: this.practiceExercise.toJSON(),
            practiceMode: this.practiceMode,
            reviewMode: this.reviewMode
        }));

        this.incompleteStackView = new Exercises.StackView({
            collection: this.incompleteStack,
            el: $(".incomplete-stack"),
            frontVisible: false
        });

        this.completeStackView = new Exercises.StackView({
            collection: this.completeStack,
            el: $(".complete-stack"),
            frontVisible: true
        });

        this.currentCardView = new Exercises.CurrentCardView({
            model: this.currentCard,
            el: $(".current-card") }
        );

        this.currentCardView.render();
        this.incompleteStackView.render();
        this.completeStackView.render();

        this.bindEvents();

    },

    bindEvents: function() {

        // Triggered when Next Question has been clicked.
        //
        // Flip to the next card every time a new problem is generated by
        // khan-exercises
        //
        // TODO: eventually this event trigger should be owned by this object
        // instead of khan-exercises so we have better control of when to
        // render the results of khan-exercises or, alternatively, other
        // content inside of each card.
        $(Khan).bind("gotoNextProblem", function() {

            // Hide any badges that were just awarded.
            Badges.hide();

            // Start the next card process
            Exercises.nextCard();

            // Return false so we take control of when nextProblem is triggered
            return false;

        });

        // Triggered when a problem is done (correct answer received,
        // regardless of hints/attempts) but before Next Question
        // has been clicked
        $(Khan).bind("problemDone", function() {

            Exercises.currentCard.set({
                done: true,
                leavesEarned: Exercises.currentCard.get("leavesAvailable")
            }, {
                updateLeaves: true
            });

        });

        // Triggered when a user attempts an answer
        $(Khan).bind("checkAnswer", function(ev, data) {

            // Iff data.pass is true, give 3 or 4 leaves.
            // data.pass is sent from khan-exercises's validator() function,
            // which can return true, false, or a string that describes a
            // specific mistake the user made. In this latter case, the attempt
            // is still considered incorrect.
            if (data.pass === true) {

                if (data.fast === true) {
                    // Speed completion earns 4 leaves right now
                    Exercises.currentCard.decreaseLeavesAvailable(4);
                } else {
                    // Ordinary problem completion earns 3
                    Exercises.currentCard.decreaseLeavesAvailable(3);
                }

            } else {
                // Incorrect answer drops leaves possibility to 2
                Exercises.currentCard.decreaseLeavesAvailable(2);
            }

        });

        $(Khan).bind("hintUsed", function() {
            if (!Exercises.currentCard.get("done")) {
                // Using a hint drops leaves possibility to 2.
                Exercises.currentCard.decreaseLeavesAvailable(2);
            }
        });

        $(Khan).bind("allHintsUsed", function() {
            if (!Exercises.currentCard.get("done")) {
                // Using all hints drops leaves possibility to 1.
                Exercises.currentCard.decreaseLeavesAvailable(1);
            }
        });

        $(Khan)
            .bind("apiRequestStarted", function() { Exercises.pendingAPIRequests++; })
            .bind("apiRequestEnded", function() { Exercises.pendingAPIRequests--; });

    },

    nextUserExercise: function() {

        if (this.readOnly) {
            return this.readOnlyUserExercise;
        } else {
            return this.BottomlessQueue.next();
        }
    },

    nextCard: function() {

        // animationOptions.deferreds stores all pending animations
        // that each subsequent step can wait on via $.when if needed
        var animationOptions = { deferreds: [] };

        if (this.currentCard) {

            // Move current to front of complete stack
            this.completeStack.add(this.currentCard, _.extend(animationOptions, {at: 0}));

            // Empty current card
            this.currentCard = null;

            animationOptions.deferreds.push(this.currentCardView.animateToRight());

        }

        // Wait for push-to-right animations to finish
        $.when.apply(null, animationOptions.deferreds).done(function() {

            // Detach events from old view
            Exercises.currentCardView.detachEvents();

            // Pop from left
            Exercises.currentCard = Exercises.incompleteStack.pop(animationOptions);

            // If this is the last card in the stack, clear
            // our right-hand-stack cache
            if (!Exercises.incompleteStack.length) {
                Exercises.completeStack.clearCache();
                Exercises.sessionStats.clearAndDisableCache();
            }

            // Render next card
            Exercises.currentCardView = new Exercises.CurrentCardView({
                model: Exercises.currentCard,
                el: $(".current-card") }
            );
            Exercises.currentCardView.render();

            // Finish animating from left
            $.when(Exercises.currentCardView.moveLeft()).done(function() {

                setTimeout(function() {
                    Exercises.currentCardView.animateFromLeft();
                }, 1);

            });

        });

    }

};
;
/**
 * Model of any (current or in-stack) card
 */
Exercises.Card = Backbone.Model.extend({

    leaves: function(card) {

        return _.map(_.range(4), function(index) {

            return {
                index: index,
                state: (this.get("leavesEarned") > index ? "earned" :
                            this.get("leavesAvailable") > index ? "available" :
                                "unavailable")
            };

        }, this);

    },

    /**
     * Decreases leaves available -- if leaves available is already at this
     * level or lower, noop
     */
    decreaseLeavesAvailable: function(leavesAvailable) {

        var currentLeaves = this.get("leavesAvailable");
        if (currentLeaves) {
            leavesAvailable = Math.min(currentLeaves, leavesAvailable);
        }

        return this.set({ leavesAvailable: leavesAvailable });

    }

});

/**
 * Collection model of a stack of cards
 */
Exercises.StackCollection = Backbone.Collection.extend({

    model: Exercises.Card,

    peek: function() {
        return _.head(this.models);
    },

    pop: function(animationOptions) {
        var head = this.peek();
        this.remove(head, animationOptions);
        return head;
    },

    /**
     * Shrink this stack by removing N cards up to but not including
     * the first card in the stack and the last (end of stack) card.
     */
    shrinkBy: function(n) {

        // Never shrink to less than two cards (first card, end of stack card).
        var targetLength = Math.max(2, this.length - n);

        while (this.length > targetLength) {
            // Remove the second-to-last card until we're done.
            this.remove(this.models[this.length - 2]);
        }

    },

    /**
     * Return the longest streak of cards in this stack
     * that satisfies the truth test fxn.
     * If fxnSkip is supplied, the card won't count towards
     * or break a streak.
     */
    longestStreak: function(fxn, fxnSkip) {

        var current = 0,
            longest = 0;
        fxnSkip = fxnSkip || function() { return false; };

        this.each(function(card) {

            if (!fxnSkip(card)) {

                if (fxn(card)) {
                    current += 1;
                } else {
                    current = 0;
                }

                longest = Math.max(current, longest);

            }

        });

        return longest;

    },

    /**
     * Return a dictionary of interesting, positive stats about this stack.
     */
    stats: function() {

        var totalLeaves = this.reduce(function(sum, card) {
            // Don't count the fourth leaf for now. We're showing it in a different
            // way at the end of the stack. TODO (jasonrr/kamens) remove 4th leaf
            // altogether if we keep this implementation
            return Math.min(3, card.get("leavesEarned")) + sum;
        }, 0);

        var longestStreak = this.longestStreak(
            function(card) {
                return card.get("leavesEarned") >= 3;
            },
            function(card) {
                // Skip any cards w/ 0 leaves available --
                // those don't count.
                return card.get("leavesAvailable") === 0;
            }
        );

        var speedyCards = this.filter(function(card) {
            return card.get("leavesEarned") >= 4;
        }).length;

        return {
            "longestStreak": longestStreak,
            "speedyCards": speedyCards,
            "totalLeaves": totalLeaves
        };
    }

});

/**
 * StackCollection that is automatically cached in localStorage when modified
 * and loads itself from cache on initialization.
 */
Exercises.CachedStackCollection = Exercises.StackCollection.extend({

    sessionId: null,

    initialize: function(models, options) {

        this.sessionId = options ? options.sessionId : null;

        // Try to load models from cache
        if (!models) {
            this.loadFromCache();
        }

        this
            .bind("add", this.cache, this)
            .bind("remove", this.cache, this);

        return Exercises.StackCollection.prototype.initialize.call(this, models, options);

    },

    cacheKey: function() {
        if (!this.sessionId) {
            throw "Missing session id for cache key";
        }

        return [
            "cachedstack",
            this.sessionId
        ].join(":");
    },

    loadFromCache: function() {

        if (!this.sessionId) {
            // Don't cache session-less pages (such as when viewing historical
            // problems)
            return;
        }

        var modelAttrs = LocalStore.get(this.cacheKey());
        if (modelAttrs) {

            _.each(modelAttrs, function(attrs) {
                this.add(new Exercises.Card(attrs));
            }, this);

        }

    },

    cache: function() {

        if (!this.sessionId) {
            // Don't cache session-less pages (such as when viewing historical
            // problems)
            return;
        }

        LocalStore.set(this.cacheKey(), this.models);
    },

    /**
     * Delete this stack from localStorage
     */
    clearCache: function() {

        if (!this.sessionId) {
            // Don't cache session-less pages (such as when viewing historical
            // problems)
            return;
        }

        LocalStore.del(this.cacheKey());
    }

});

/**
 * View of a stack of cards
 */
Exercises.StackView = Backbone.View.extend({

    template: Templates.get("exercises.stack"),

    initialize: function(options) {

        // deferAnimation is a wrapper function used to insert
        // any animations returned by fxn onto animationOption's
        // list of deferreds. This lets you chain complex
        // animations (see Exercises.nextCard).
        var deferAnimation = function(fxn) {
            return function(model, collection, options) {
                var result = fxn.call(this, model, collection, options);

                if (options && options.deferreds) {
                    options.deferreds.push(result);
                }

                return result;
            };
        };

        this.collection
            .bind("add", deferAnimation(function(card) {
                return this.animatePush(card);
            }), this)
            .bind("remove", deferAnimation(function() {
                return this.animatePop();
            }), this);

        return Backbone.View.prototype.initialize.call(this, options);
    },

    render: function() {

        var collectionContext = _.map(this.collection.models, function(card, index) {
            return this.viewContext(card, index);
        }, this);

        this.$el.html(this.template({cards: collectionContext}));

        return this;

    },

    viewContext: function(card, index) {
        return _.extend(card.toJSON(), {
            index: index,
            frontVisible: this.options.frontVisible,
            cid: card.cid,
            leaves: card.leaves()
        });
    },

    /**
     * Animate popping card off of stack
     */
    animatePop: function() {

        return this.$el
            .find(".card-container")
                .first()
                    .slideUp(360, function() { $(this).remove(); });

    },

    /**
     * Animate pushing card onto head of stack
     */
    animatePush: function(card) {

        var context = this.viewContext(card, this.collection.length);

        return this.$el
            .find(".stack")
                .prepend(
                    $(Templates.get("exercises.card")(context))
                        .css("display", "none")
                        .css("opacity", 0)
                )
                .find(".card-container")
                    .first()
                        .delay(50)
                        .slideDown(200)
                        .animate(
                            { opacity: 1 },
                            { queue: false, duration: 140 }
                        );

    }

});

/**
 * View of the single, currently-visible card
 */
Exercises.CurrentCardView = Backbone.View.extend({

    template: Templates.get("exercises.current-card"),

    model: null,

    events: {
        "click .to-dashboard": "toDashboard",
        "click .more-stacks": "toMoreStacks",
        "click #show-topic-details": "showTopicDetails"
    },

    initialize: function(options) {
        this.attachEvents();
        return Backbone.View.prototype.initialize.call(this, options);
    },

    onModelChange: function( info, options ) {
        if ( options.updateLeaves ) {
            this.updateLeaves();
        }
    },

    attachEvents: function() {
        this.model.bind("change", this.onModelChange, this);
    },

    detachEvents: function() {
        this.model.unbind("change", this.onModelChange);
    },

    /**
     * Renders the current card appropriately by card type.
     */
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

    /**
     * Renders the base card's structure, including leaves
     */
    renderCardContainer: function() {
        this.$el.html(this.template(this.viewContext()));
    },

    /**
     * Renders the card's type-specific contents into contents container
     */
    renderCardContents: function(templateName, optionalContext) {

        var context = _.extend({}, this.viewContext(), optionalContext);

        this.$el
            .find(".current-card-contents")
                .html(
                    $(Templates.get(templateName)(context))
                );

        this.delegateEvents();

    },

    /**
     * Waits for API requests to finish, then runs target fxn
     */
    runAfterAPIRequests: function(fxn) {

        function tryRun() {
            if (Exercises.pendingAPIRequests > 0) {

                // Wait for any outbound API requests to finish.
                setTimeout(tryRun, 500);

            } else {

                // All API calls done, run target fxn
                fxn();

            }
        }

        tryRun();

    },

    renderCalculationInProgressCard: function() {

        if ($(".calculating-end-of-stack").is(":visible")) {
            // If the calculation in progress card is already visible,
            // bail.
            return;
        }

        this.renderCardContainer();
        this.renderCardContents("exercises.calculating-card");

        // Animate the first 8 cards into place -- others just go away
        setTimeout(function() {
/*Ais */
            $(".complete-stack .card-container").each(function(ix, el) {
                if (ix < 4) {
                    $(el).addClass("into-pocket").addClass("into-pocket-" + ix);
                } else {
                    $(el).css("display", "none");
                }
            });

        }, 500);

        // Fade in/out our various pieces of "calculating progress" text
        var fadeInNextText = function(jel, egg) {

            // allows the loop to recycle when the nextMessage === []
            var messages = $(".calc-text-spin span")
            if (!jel || !jel.length) {
                jel = messages;
            }

            // display either jel or the egg if it was passed in
            var thisMessage = (egg == null) ? jel.first() : $(egg);
            var nextMessage = jel.next("span:not(.egg)");

            // send egg as second parameter if a tiny die lands just so
            var r = Math.random();
            var nextEgg = _.find(jel.filter(".egg"), function(elt){
                var p = $(elt).data("prob");
                return (r >= p[0]) && (r < p[1]);
            });

            // fade out thisMessage and display egg || nextMessage
            thisMessage.fadeIn(600, function() {
                thisMessage.delay(1000).fadeOut(600, function() {
                    fadeInNextText(nextMessage, nextEgg);
                });
            });
        };

        // recalculate cumulative probabilities for each egg
        var eggs = $(".calc-text-spin span.egg");
        for (var i = 0, head = 0; i < eggs.length; i+=1){
            tail = head + $(eggs[i]).data("prob");
            $(eggs[i]).data("prob", [head, tail]);
            head = tail;
        }

        fadeInNextText();

   },

    /**
     * Renders a "calculations in progress" card, waits for API requests
     * to finish, and then renders the requested card template.
     */
    renderCardAfterAPIRequests: function(templateName, optionalContextFxn, optionalCallbackFxn) {

        // Start off by showing the "calculations in progress" card...
        this.renderCalculationInProgressCard();

        // ...and wait a bit for dramatic effect before trying to show the
        // requested card.
        setTimeout(function() {
            Exercises.currentCardView.runAfterAPIRequests(function() {

                optionalContextFxn = optionalContextFxn || function() {};
                Exercises.currentCardView.renderCardContents(templateName, optionalContextFxn());

                if (optionalCallbackFxn) {
                    optionalCallbackFxn();
                }

            });
        }, 2200);

    },

    /**
     * Renders a new card showing an exercise problem via khan-exercises
     */
    renderProblemCard: function() {

        // khan-exercises currently both generates content and hooks up
        // events to the exercise interface. This means, for now, we don't want
        // to regenerate a brand new card when transitioning between exercise
        // problems.

        // TODO: in the future, if khan-exercises's problem generation is
        // separated from its UI events a little more, we can just rerender
        // the whole card for every problem.

        if (!$("#problemarea").length) {

            this.renderCardContainer();
            this.renderCardContents("exercises.problem-template");

            // Tell khan-exercises to setup its DOM and event listeners
            $(Exercises).trigger("problemTemplateRendered");

            //TODO (jasonrr): remove this when we remove the what happened UI
            $(".streak-transition").hoverIntent(
                function () {
                    $(this).addClass("hover");
                },
                function () {
                    $(this).removeClass("hover");
                }
            );

        }

        this.renderExerciseInProblemCard();

        // Update leaves since we may have not generated a brand new card
        this.updateLeaves();

    },

    renderExerciseInProblemCard: function() {

        var nextUserExercise = Exercises.nextUserExercise();
        if (nextUserExercise) {
            // khan-exercises is listening and will fill the card w/ new problem contents
            $(Exercises).trigger("readyForNextProblem", {userExercise: nextUserExercise});
        }

    },

    /**
     * Renders a new card showing end-of-stack statistics
     */
    renderEndOfStackCard: function() {

        this.renderCalculationInProgressCard();

        // First wait for all API requests to finish
        this.runAfterAPIRequests($.proxy(function() {

            var topicUserExercises = [];

            if (!Exercises.practiceMode && !Exercises.reviewMode) {
                Exercises.apiRequest({
                    url: "/api/v1/user/topic/" + encodeURIComponent(Exercises.topic.get("id")) + "/exercises",
                    type: "GET",
                    success: function(data) {
                        _.each(data, function(userExercise) {
                            topicUserExercises[topicUserExercises.length] = userExercise;
                        });
                    }
                });
            }

            this.renderCardAfterAPIRequests(
                "exercises.end-of-stack-card",
                function() {

                    // Collect various progress stats about both the current stack
                    // and the current topic -- will be rendered by end of
                    // stack card.
                    var unstartedExercises = _.filter(topicUserExercises, function(userExercise) {
                            return !userExercise.exerciseStates.proficient && userExercise.totalDone === 0;
                        }),
                        proficientExercises = _.filter(topicUserExercises, function(userExercise) {
                            return userExercise.exerciseStates.proficient;
                        }),
                        startedExercises = _.filter(topicUserExercises, function(userExercise) {
                            return !userExercise.exerciseStates.proficient && userExercise.totalDone > 0;
                        }),
                        progressStats = Exercises.sessionStats.progressStats();

                    // Proficient exercises in which proficiency was just
                    // earned in this current stack need to be marked as such.
                    //
                    // TODO: if we stick with this everywhere, we probably want
                    // to change the actual review model algorithm to stop
                    // setting recently-earned exercises into review state so
                    // quickly.
                    _.each(proficientExercises, function(userExercise) {
                        userExercise.exerciseStates.justEarnedProficiency = _.any(progressStats.progress, function(stat) {
                            return stat.exerciseStates.justEarnedProficiency && stat.name == userExercise.exercise;
                        });
                    });

                    return _.extend(
                        {
                            "practiceMode": Exercises.practiceMode,
                            "proficient": proficientExercises.length,
                            "total": topicUserExercises.length,
                            startedExercises: startedExercises,
                            unstartedExercises: unstartedExercises,
                            proficientExercises: proficientExercises
                        },
                        progressStats,
                        Exercises.completeStack.stats()
                    );

                },
                function() {

                    Exercises.completeStackView.$el.hide();
                    Exercises.currentCardView.$el
                        .find(".stack-stats p, .small-exercise-icon, .review-explain")
                            .each(Exercises.currentCardView.attachTooltip)
                            .end()
                        .find(".default-action")
                            .focus();

                }
            );

        }, this));
    },

    /**
     * Renders a new card showing end-of-review statistics
     */
    renderEndOfReviewCard: function() {

        this.renderCalculationInProgressCard();

        // First wait for all API requests to finish
        this.runAfterAPIRequests(function() {

            var reviewsLeft = 0;

            // Then send another API request to see how many reviews are left --
            // and we'll change the end of review card's UI accordingly.
            Exercises.apiRequest({
                url: "/api/v1/user/exercises/reviews/count",
                type: "GET",
                success: function(data) { reviewsLeft = data; }
            });

            // And finally wait for the previous API call to finish before
            // rendering end of review card.
            Exercises.currentCardView.renderCardAfterAPIRequests(
                "exercises.end-of-review-card",
                function() {
                    // Pass reviews left info into end of review card
                    return _.extend({}, Exercises.completeStack.stats(), {reviewsLeft: reviewsLeft});
                },
                function() {
                    Exercises.completeStackView.$el.hide();
                    Exercises.currentCardView.$el
                        .find(".default-action")
                            .focus();
                }
            );

        });

    },

    /**
     * Renders a new card showing a leeeeeetle surprise
     */
    renderHappyPictureCard: function() {
        this.renderCardContainer();
        this.renderCardContents("exercises.happy-picture-card");

        this.$el
            .find("#next-question-button")
                .click(function() {
                    Exercises.nextCard();
                })
                .focus();
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
                show: function(e, api) {

                    var target = $(api.elements.target);
                    if (target.is(".leaf")) {
                        // If we're hovering a leaf and the full leaf icon
                        // is currently being animated, don't show the tooltip.
                        if (parseInt(target.find(".full-leaf").css("opacity"), 10) != 1) {
                            e.preventDefault();
                        }
                    }

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

    /**
     * Show full details about the current topic
     * (starts out hidden to highlight stack-only details.
     */
    showTopicDetails: function() {
        $(".current-topic").slideDown();
        $("#show-topic-details").hide();
    },

    /**
     * Navigate to exercise dashboard
     */
    toDashboard: function() {
        window.location = "/exercisedashboard";
    },

    /**
     * Navigate to more stacks of the current type.
     * TODO: in the future, this can be done quick'n'javascript-y.
     */
    toMoreStacks: function() {
        window.location.assign(window.location.href);
    },

    /**
     * Update the currently available or earned leaves in current card's view
     */
    updateLeaves: function() {
        this.$el
            .find(".leaves-container")
                .html(
                    $(Templates.get("exercises.card-leaves")(this.viewContext()))
                )
                .find(".leaf")
                    .each(this.attachTooltip);

        if (this.model.get("done")) {

            $(".leaves-container").show();
            //TODO: This probably doesn't belong here
            $(".current-card").addClass("done");

            setTimeout(function() {
                $(".leaves-container .earned .full-leaf").addClass("animated");
            }, 1);

        } else {

            $(".current-card").removeClass("done");

        }
    },

    /**
     * Animate current card to right-hand completed stack
     */
    animateToRight: function() {
        this.$el.addClass("shrinkRight");

        // These animation fxns explicitly return null as they are used in deferreds
        // and may one day have deferrable animations (CSS3 animations aren't
        // deferred-friendly).
        return null;
    },

    /**
     * Animate card from left-hand completed stack to current card
     */
    animateFromLeft: function() {
        this.$el
            .removeClass("notransition")
            .removeClass("shrinkLeft");

        // These animation fxns explicitly return null as they are used in deferreds
        // and may one day have deferrable animations (CSS3 animations aren't
        // deferred-friendly).
        return null;
    },

    /**
     * Move (unanimated) current card from right-hand stack to left-hand stack between
     * toRight/fromLeft animations
     */
    moveLeft: function() {
        this.$el
            .addClass("notransition")
            .removeClass("shrinkRight")
            .addClass("shrinkLeft");

        // These animation fxns explicitly return null as they are used in deferreds
        // and may one day have deferrable animations (CSS3 animations aren't
        // deferred-friendly).
        return null;
    }

});

/**
 * SessionStats stores and caches a list of interesting statistics
 * about each individual stack session.
 */
Exercises.SessionStats = Backbone.Model.extend({

    cacheEnabled: false,
    sessionId: null,

    initialize: function(attributes, options) {

        this.cacheEnabled = true;
        this.sessionId = options ? options.sessionId : null;

        // Try to load stats from cache
        this.loadFromCache();

        // Update exercise stats any time new exercise data is cached locally
        $(Exercises).bind("newUserExerciseData", $.proxy(function(ev, data) {
            this.updateProgressStats(data.exerciseName);
        }, this));

        return Backbone.Model.prototype.initialize.call(this, attributes, options);
    },

    cacheKey: function() {
        if (!this.sessionId) {
            throw "Missing session id for cache key";
        }

        return [
            "cachedsessionstats",
            this.sessionId
        ].join(":");
    },

    loadFromCache: function() {
        if (!this.sessionId) {
            // Don't cache session-less pages (such as when viewing historical
            // problems)
            return;
        }

        var attrs = LocalStore.get(this.cacheKey());
        if (attrs) {
            this.set(attrs);
        }
    },

    cache: function() {
        if (!this.sessionId) {
            // Don't cache session-less pages (such as when viewing historical
            // problems)
            return;
        }

        if (!this.cacheEnabled) {
            return;
        }

        LocalStore.set(this.cacheKey(), this.attributes);
    },

    clearCache: function() {

        if (!this.sessionId) {
            // Don't cache session-less pages (such as when viewing historical
            // problems)
            return;
        }

        LocalStore.del(this.cacheKey());
    },

    /**
     * Clears cache and disables sessionStats from being accumulated
     * if any more events are fired.
     */
    clearAndDisableCache: function() {
        this.cacheEnabled = false;
        this.clearCache();
    },

    /**
     * Update the start/end/change progress for this specific exercise so we
     * can summarize the user's session progress at the end of a stack.
     */
    updateProgressStats: function(exerciseName) {

        var userExercise = Exercises.BottomlessQueue.userExerciseCache[exerciseName];

        if (userExercise) {

            /**
             * For now, we're just keeping track of the change in progress per
             * exercise
             */
            var progressStats = this.get("progress") || {},

                stat = progressStats[exerciseName] || {
                    name: userExercise.exercise,
                    displayName: userExercise.exerciseModel.displayName,
                    startProficient: userExercise.exerciseStates.proficient,
                    startTotalDone: userExercise.totalDone,
                    start: userExercise.progress
                };

            // Add all current proficiency/review/struggling states
            stat.exerciseStates = userExercise.exerciseStates;

            // Add an extra state to be used when proficiency was just earned
            // during the current stack.
            stat.exerciseStates.justEarnedProficiency = stat.exerciseStates.proficient && !stat.startProficient;

            stat.endTotalDone = userExercise.totalDone;
            stat.end = userExercise.progress;

            // Keep start set at the minimum of starting and current progress.
            // We do this b/c we never want to animate backwards progress --
            // if the user lost ground, just show their ending position.
            stat.start = Math.min(stat.start, stat.end);

            // Set and cache the latest
            progressStats[exerciseName] = stat;
            this.set({"progress": progressStats});
            this.cache();

        }

    },

    /**
     * Return list of stat objects for only those exercises which had at least
     * one problem done during this session, with latest userExercise state
     * from server attached.
     */
    progressStats: function() {

        var stats = _.filter(
                        _.values(this.get("progress") || {}),
                        function(stat) {
                            return stat.endTotalDone && stat.endTotalDone > stat.startTotalDone;
                        }
                    );

        // Attach relevant userExercise object to each stat
        _.each(stats, function(stat) {
            stat.userExercise = Exercises.BottomlessQueue.userExerciseCache[stat.name];
        });

        return { progress: stats };
    }

});

;
/**
 * BottomlessQueue returns a never-ending sequence of
 * UserExercise objects once primed with
 * some initial exercises.
 *
 * It'll talk to our API to try to find the best next
 * exercises in the queue when possible.
 *
 * BottomlessQueue is responsible for holding onto
 * and updating all userExercise objects, and it
 * passes them on to khan-exercises when khan-exercises
 * needs 'em.
 */
Exercises.BottomlessQueue = {

    topic: null,

    // # of exercises we keep around as "recycled"
    // in case we need to re-use them if ajax requests
    // have failed to refill our queue.
    recycleQueueLength: 5,

    // # of exercises in queue below which we will
    // send off an ajax request for a refill
    queueRefillSize: 2,

    // # of exercises in upcoming queue for which we
    // trigger upcomingExercise events to give
    // listeners a chance to preload resources
    preloadUpcoming: 2,

    // true if this queue can talk to the server to refill itself with new
    // exercises, otherwise it'll keep recycling its original exercises.
    refillEnabled: true,

    // true if there's a refill request currently pending
    refilling: false,

    initDeferred: $.Deferred(),

    sessionStorageEnabled: null,

    currentQueue: [],
    recycleQueue: [],

    // current item that was most recently popped off the queue
    current: null,

    // Cache of userExercise objects for
    // each exercise we encounter
    userExerciseCache: {},

    init: function(topic, userExercises, refillEnabled) {

        this.sessionStorageEnabled = this.testSessionStorage();

        this.topic = topic;
        this.refillEnabled = (refillEnabled !== false); /* default is true */

        // Delay some initialization until after khan-exercises
        // is all set up
        this.initDeferred.done(function() {

            if (!Exercises.BottomlessQueue.sessionStorageEnabled) {
                Exercises.BottomlessQueue.warnSessionStorageDisabled();
                return;
            }

            // Fill up our queue and cache with initial exercises sent
            // on first pageload
            _.each(userExercises, function(userExercise) {
                this.enqueue(this.checkCacheForLatest(userExercise));
            }, Exercises.BottomlessQueue);

        });

        // Any time khan-exercises tells us it has new updateUserExercise
        // data, update cache if it's more recent
        $(Khan)
            .bind("updateUserExercise", function(ev, userExercise) {
                Exercises.BottomlessQueue.cacheLocally(userExercise);
            })
            .bind("attemptError", function(ev, userExercise) {
                // Something went wrong w/ the /attempt API request.
                // Clear the cache so we get a fresh userExercise on reload.
                Exercises.BottomlessQueue.clearCache(userExercise);
            })
            .bind("problemDone", function() {

                // Whenever a problem is completed, we may be waiting for
                // a while for the /attempt callback to finish and send us the
                // server's updated userExercise data. So we cheat a bit and
                // bump up the just-finished userExercises's totalDone count
                // here in case we run into it again before the ajax call
                // returns.
                var currentExercise = Exercises.BottomlessQueue.current.exercise,
                    userExercise = Exercises.BottomlessQueue.userExerciseCache[currentExercise];

                if (userExercise) {
                    userExercise.totalDone += 1;
                }

            });

    },

    testSessionStorage: function() {
        // Adapted from a comment on http://mathiasbynens.be/notes/localstorage-pattern
        var enabled, uid = +(new Date);
        try {
            sessionStorage[uid] = uid;
            enabled = (sessionStorage[uid] == uid);
            sessionStorage.removeItem(uid);
            return enabled;
        } catch (e) {
            return false;
        }
    },

    warnSessionStorageDisabled: function() {
        $(Exercises).trigger("warning", {
            text: "You must enable DOM storage in your browser; see <a href='https://sites.google.com/a/khanacademy.org/forge/for-developers/how-to-enable-dom-storage'>here</a> for instructions.",
            showClose: false
        });
    },

    enqueue: function(userExercise) {

        // Push onto current queue
        this.currentQueue.push({
            "exercise": userExercise.exercise,
            // true if we've triggered an upcomingExercise event for this queue entry
            "upcomingTriggered": false
        });

        // Cache userExercise
        this.cacheLocally(userExercise);

        // Possibly new upcoming exercises
        this.triggerUpcoming();

    },

    /**
     * Make sure an upcomingExercise event has been triggered for the
     * first this.preloadUpcoming events in currentQueue.
     */
    triggerUpcoming: function() {

        _.each(this.currentQueue, function(item, ix) {

            if (!item.upcomingTriggered && ix < this.preloadUpcoming) {

                // Tell khan-exercises to preload this upcoming exercise if it hasn't
                // already
                $(Exercises).trigger("upcomingExercise", {exerciseName: item.exercise});

                item.upcomingTriggered = true;

            }

        }, this);

    },

    cacheKey: function(userExercise) {
        return "userexercise:" + userExercise.user + ":" + userExercise.exercise;
    },

    /**
     * checkCacheForLatest returns the userExercise passed in
     * unless there is a locally cached version in sessionStorage
     * that looks to be more up-to-date than userExercise.
     * It's used to maintain nice back-button behavior
     * when navigating around exercises so you don't lose your place.
     */
    checkCacheForLatest: function(userExercise) {

        if (!userExercise) {
            return null;
        }

        // Parse the JSON if it exists
        var data = window.sessionStorage[this.cacheKey(userExercise)],
            cachedUserExercise = data ? JSON.parse(data) : null;

        if (cachedUserExercise && cachedUserExercise.totalDone > userExercise.totalDone) {
            // sessionStorage-cached data is newer than userExercise. Probably
            // got here via browser history.
            return cachedUserExercise;
        } else {
            return userExercise;
        }

    },

    cacheLocally: function(userExercise) {

        if (!userExercise) {
            return;
        }

        var cachedUserExercise = this.userExerciseCache[userExercise.exercise];

        // Update cache, if new data is more recent
        if (!cachedUserExercise || (userExercise.totalDone >= cachedUserExercise.totalDone)) {

            this.userExerciseCache[userExercise.exercise] = userExercise;

            // Persist to session storage so we get nice back button behavior
            window.sessionStorage[this.cacheKey(userExercise)] = JSON.stringify(userExercise);

            $(Exercises).trigger("newUserExerciseData", {exerciseName: userExercise.exercise});
        }

    },

    clearCache: function(userExercise) {

        if (!userExercise) {
            return;
        }

        // Before we reload after an error, clear out sessionStorage.
        // If there' a discrepancy between server and sessionStorage such that
        // problem numbers are out of order or anything else, we want
        // to restart with whatever the server sends back on reload.
        delete this.userExerciseCache[userExercise.exercise];
        delete window.sessionStorage[this.cacheKey(userExercise)];

    },

    next: function() {

        if (!this.initDeferred.isResolved()) {
            this.initDeferred.resolve();
        }

        if (!this.sessionStorageEnabled) {
            return null;
        }

        // If the queue is empty, use the recycle queue
        // to fill up w/ old problems while we wait for
        // an ajax request for more exercises to complete.
        if (!this.currentQueue.length) {
            this.currentQueue = this.recycleQueue;
            this.recycleQueue = [];
        }

        // We don't ever expect to find an empty queue at
        // this point. If we do, we've got a problem.
        if (!this.currentQueue.length) {
            throw "No exercises are in the queue";
        }

        // Pull off the next exercise
        this.current = _.head(this.currentQueue);

        // If we don't have a userExercise object for the next
        // exercise, we've got a problem.
        if (!this.userExerciseCache[this.current.exercise]) {
            throw "Missing user exercise cache for next exercise";
        }

        // Remove it from current queue...
        this.currentQueue = _.rest(this.currentQueue);

        // ...but put it on the end of our recycle queue
        this.recycleQueue.push(this.current);

        // ...and then chop the recycle queue down so it
        // doesn't just constantly grow.
        this.recycleQueue = _.last(this.recycleQueue, Math.min(5, this.recycleQueue.length));

        // Refill if we're running low
        if (this.currentQueue.length < this.queueRefillSize) {
            this.refill();
        }

        // Possibly new upcoming exercises
        this.triggerUpcoming();

        return this.userExerciseCache[this.current.exercise];

    },

    refill: function() {

        if (!this.refillEnabled) {
            // We don't refill in reviewMode or practiceMode, all stack
            // data was sent down originally
            return;
        }

        if (this.refilling) {
            // Only one refill request at a time
            return;
        }

        $.ajax({
            url: "/api/v1/user/topic/" + encodeURIComponent(this.topic.get("id")) + "/exercises/next",
            type: "GET",
            dataType: "json",
            data: {
                // Return a list of upcoming exercises so the server can decide
                // whether or not to re-suggest them.
                queued: _.pluck(this.currentQueue, "exercise"),
                casing: "camel"
            },
            complete: function() {
                Exercises.BottomlessQueue.refilling = false;
            },
            success: function(data) {
                _.each(data, function(userExercise) {
                    Exercises.BottomlessQueue.enqueue(userExercise);
                });
            }
        });

        this.refilling = true;

    }

};
