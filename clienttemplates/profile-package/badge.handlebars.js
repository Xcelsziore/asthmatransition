(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_badge"]=a(function(a,b,c,d,e){function l(a,b){return"achievement-badge-owned"}function m(a,b){var d="",e,f;return d+="data-objectives='",f=c.objectives,f?e=f.call(a,{hash:{}}):(e=a.objectives,e=typeof e===i?e():e),d+=j(e)+"'",d}function n(a,b){return'<div class="add-goal">+ &emsp; Goal</div>'}function o(a,b){var d="",e,f;return d+='<div class="energy-points-badge">',f=c.points,f?e=f.call(a,{hash:{}}):(e=a.points,e=typeof e===i?e():e),d+=j(e)+"</div>",d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="achievement-badge category-',h=c.badgeCategory,h?g=h.call(b,{hash:{}}):(g=b.badgeCategory,g=typeof g===i?g():g),f+=j(g)+" ",g=b.isOwned,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='" title="',h=c.safeExtendedDescription,h?g=h.call(b,{hash:{}}):(g=b.safeExtendedDescription,g=typeof g===i?g():g),f+=j(g)+'" ',g=b.canBecomeGoal,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(3,m,e)});if(g||g===0)f+=g;f+='>\n  <div id="outline-box">\n  <img src="',h=c.iconSrc,h?g=h.call(b,{hash:{}}):(g=b.iconSrc,g=typeof g===i?g():g),f+=j(g)+'" id="badge-icon"/>\n  <div class="achievement-text">\n  <div class="achievement-title">',h=c.description,h?g=h.call(b,{hash:{}}):(g=b.description,g=typeof g===i?g():g),f+=j(g)+'</div>\n  <div class="achievement-desc achievement-desc-no-count">\n    ',h=c.safeExtendedDescription,h?g=h.call(b,{hash:{}}):(g=b.safeExtendedDescription,g=typeof g===i?g():g),f+=j(g)+"\n  </div>\n  </div>\n  ",g=b.canBecomeGoal,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(5,n,e)});if(g||g===0)f+=g;f+="\n  ",g=b.points,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(7,o,e)});if(g||g===0)f+=g;return f+="\n  </div>\n</div>\n",f})})()