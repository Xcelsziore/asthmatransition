(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_badge-container"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;d+='\n    <div id="category-',f=c.category,f?e=f.call(a,{hash:{}}):(e=a.category,e=typeof e===i?e():e),d+=j(e)+'" style="display: none;">\n      <div class="badge-description-container">\n        <div class="badge-description-content">\n            ',f=c.categoryDescription,f?e=f.call(a,{hash:{}}):(e=a.categoryDescription,e=typeof e===i?e():e),d+=j(e)+"\n        </div>\n      </div>\n      ",e=a.userBadges,e=e==null||e===!1?e:e.length,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(2,l,b)});if(e||e===0)d+=e;d+='\n      <div id="all-badges">\n        <h2 style="display: block; margin-left: 10px;">Possible Badges</h2>\n        ',e=a.badges,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(5,n,b)});if(e||e===0)d+=e;return d+='\n      </div>\n      <div class="clear"></div>\n    </div>\n',d}function l(a,b){var d="",e;d+='\n      <div id="user-owned">\n      <h2 style="display: block; margin-left: 10px;">Badges Earned</h2>\n        ',e=a.userBadges,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(3,m,b)});if(e||e===0)d+=e;return d+='\n        <div class="clear"></div>\n      </div>\n      ',d}function m(a,b){var e="",f;e+="\n          ",f=a,f=h.invokePartial(d["profile_user-badge"],"profile_user-badge",f,c,d);if(f||f===0)e+=f;return e+="\n        ",e}function n(a,b){var d="",e;d+="\n          ",e=a.isRetired,e=c.unless.call(a,e,{hash:{},inverse:h.noop,fn:h.program(6,o,b)});if(e||e===0)d+=e;return d+="\n        ",d}function o(a,b){var e="",f;e+="\n            ",f=a,f=h.invokePartial(d.profile_badge,"profile_badge",f,c,d);if(f||f===0)e+=f;return e+="\n          ",e}c=c||a.helpers,d=d||a.partials;var f="",g,h=this,i="function",j=this.escapeExpression;g=b.badgeCollections,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.program(1,k,e)});if(g||g===0)f+=g;return f+="\n",f})})()