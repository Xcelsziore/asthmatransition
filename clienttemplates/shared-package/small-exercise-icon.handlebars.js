(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["shared-package_small-exercise-icon"]=a(function(a,b,c,d,e){function i(a,b){return'\n\n<span class="small-exercise-icon node-complete" data-desc="You just earned proficiency in this skill"></span>\n\n'}function j(a,b){var d="",e;d+="\n\n",e=a.reviewing,e=c["if"].call(a,e,{hash:{},inverse:h.program(6,l,b),fn:h.program(4,k,b)});if(e||e===0)d+=e;return d+="\n",d}function k(a,b){return'\n\n<span class="small-exercise-icon node-review" data-desc="You\'ve earned proficiency in this skill. We think it\'s time for you to review it, because either it\'s been a while or you recently had some trouble."></span>\n\n'}function l(a,b){var d="",e;d+="\n\n",e=a.proficient,e=c["if"].call(a,e,{hash:{},inverse:h.program(9,n,b),fn:h.program(7,m,b)});if(e||e===0)d+=e;return d+="\n",d}function m(a,b){return'\n\n<span class="small-exercise-icon node-complete" data-desc="You\'ve earned proficiency in this skill"></span>\n\n'}function n(a,b){var d="",e;d+="\n\n",e=a.suggested,e=c["if"].call(a,e,{hash:{},inverse:h.program(12,p,b),fn:h.program(10,o,b)});if(e||e===0)d+=e;return d+="\n",d}function o(a,b){return'\n\n<span class="small-exercise-icon node-suggested" data-desc="You\'ve completed all the pre-requisites for this skill, so we think you\'re ready for it"></span>\n\n'}function p(a,b){return'\n\n<span class="small-exercise-icon node-not-started" data-desc="This is a skill you can practice"></span>\n\n'}c=c||a.helpers;var f="",g,h=this;g=b.justEarnedProficiency,g=c["if"].call(b,g,{hash:{},inverse:h.program(3,j,e),fn:h.program(1,i,e)});if(g||g===0)f+=g;return f+="\n",f})})()