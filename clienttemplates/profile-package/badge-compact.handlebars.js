(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_badge-compact"]=a(function(a,b,c,d,e){function l(a,b){return'\n\n<div class="achievement-badge compact empty">\n  <div id="outline-box">\n  <div class="selected-indicator"> </div>\n  </div>\n</div>\n\n'}function m(a,b){var d="",e,f;d+='\n\n<div class="achievement-badge compact achievement-badge-owned',e=a.used,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(4,n,b)});if(e||e===0)d+=e;d+='"\n    id="',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===i?e():e),d+=j(e)+'" title="',f=c.safeExtendedDescription,f?e=f.call(a,{hash:{}}):(e=a.safeExtendedDescription,e=typeof e===i?e():e),d+=j(e)+'">\n  <div id="outline-box">\n    <div class="achievement-title">',e=a.description,f=c.toBadgeDescriptionWithBreaks,e=f?f.call(a,e,{hash:{}}):k.call(a,"toBadgeDescriptionWithBreaks",e,{hash:{}});if(e||e===0)d+=e;return d+='</div>\n    <img class="badge-icon" src="',e=a.icons,e=e==null||e===!1?e:e.compact,e=typeof e===i?e():e,d+=j(e)+'">\n    <div class="delete-icon">X</div>\n    <div class="selected-indicator"> </div>\n  </div>\n</div>\n\n',d}function n(a,b){return" used"}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression,k=c.helperMissing;g=b.isEmpty,g=c["if"].call(b,g,{hash:{},inverse:h.program(3,m,e),fn:h.program(1,l,e)});if(g||g===0)f+=g;return f+="\n",f})})()