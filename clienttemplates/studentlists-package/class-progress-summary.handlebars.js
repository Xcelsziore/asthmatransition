(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["studentlists-package_class-progress-summary"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;d+='\n    <div class="exercise-row">\n      <div class="exercise-name">\n        <span>',f=c.display_name,f?e=f.call(a,{hash:{}}):(e=a.display_name,e=typeof e===i?e():e),d+=j(e)+'</span>\n      </div>\n\n      <div id="left-column">\n        ',e={},e.side="left",f=c.progressColumn,e=f?f.call(a,{hash:e,inverse:h.noop,fn:h.program(2,m,b)}):k.call(a,"progressColumn",{hash:e,inverse:h.noop,fn:h.program(2,m,b)});if(e||e===0)d+=e;d+='\n      </div>\n\n      <div id="right-column">\n        ',e={},e.side="right",f=c.progressColumn,e=f?f.call(a,{hash:e,inverse:h.noop,fn:h.program(4,n,b)}):k.call(a,"progressColumn",{hash:e,inverse:h.noop,fn:h.program(4,n,b)});if(e||e===0)d+=e;return d+='\n      </div>\n\n      <div style="clear: both;"></div>\n    </div>\n  ',d}function m(a,b){var e="",f;e+="\n          ",f=a,f=h.invokePartial(d["studentlists_class-progress-column"],"studentlists_class-progress-column",f,c,d);if(f||f===0)e+=f;return e+="\n        ",e}function n(a,b){var e="",f;e+="\n          ",f=a,f=h.invokePartial(d["studentlists_class-progress-column"],"studentlists_class-progress-column",f,c,d);if(f||f===0)e+=f;return e+="\n        ",e}c=c||a.helpers,d=d||a.partials;var f="",g,h=this,i="function",j=this.escapeExpression,k=c.helperMissing;f+='<div id="progress-summary-container">\n\n  ',g=b.exercises,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.program(1,l,e)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})()