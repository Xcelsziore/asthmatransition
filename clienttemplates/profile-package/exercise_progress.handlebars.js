(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_exercise_progress"]=a(function(a,b,c,d,e){function m(a,b){var d="",e,f;return d+='\n  <div class="student-module-status exercise-progress-block exercise-color ',f=c.color,f?e=f.call(a,{hash:{}}):(e=a.color,e=typeof e===i?e():e),d+=j(e)+'"\n       id="exercise-',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===i?e():e),d+=j(e)+'">\n	  <span class="exercise-display-name"><nobr>',f=c.shortName,f?e=f.call(a,{hash:{}}):(e=a.shortName,e=typeof e===i?e():e),d+=j(e)+'</nobr></span>\n    <div class="hover-data" style="display: none;">\n      <div class=exercise-display-name>',f=c.displayName,f?e=f.call(a,{hash:{}}):(e=a.displayName,e=typeof e===i?e():e),d+=j(e)+"</div>\n      <div class=exercise-status>Status: ",f=c.status,f?e=f.call(a,{hash:{}}):(e=a.status,e=typeof e===i?e():e),d+=j(e)+"</div>\n      <div class=exercise-progress>Progress: ",f=c.progress,f?e=f.call(a,{hash:{}}):(e=a.progress,e=typeof e===i?e():e),d+=j(e)+"</div>\n      <div class=exercise-done>Problems attempted: ",f=c.totalDone,f?e=f.call(a,{hash:{}}):(e=a.totalDone,e=typeof e===i?e():e),d+=j(e)+'</div>\n    </div>\n		<div style="clear:both"></div>\n  </div>\n  ',d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+='<div id="module-progress" class="clearfix">\n  ',h=c.exercises,h?g=h.call(b,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}):(g=b.exercises,g=typeof g===i?g():g),c.exercises||(g=l.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}));if(g||g===0)f+=g;return f+="\n</div>\n",f})})()