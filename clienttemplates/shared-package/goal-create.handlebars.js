(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["shared-package_goal-create"]=a(function(a,b,c,d,e){function m(a,b){var d="",e,f;return d+='\n        <li class="objective">\n            <a class="objective simple-button action-gradient blue ',f=c.css,f?e=f.call(a,{hash:{}}):(e=a.css,e=typeof e===i?e():e),d+=j(e)+'" href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===i?e():e),d+=j(e)+'" data-progress="',f=c.progress,f?e=f.call(a,{hash:{}}):(e=a.progress,e=typeof e===i?e():e),d+=j(e)+'">\n                <span class="objective-description">',f=c.description,f?e=f.call(a,{hash:{}}):(e=a.description,e=typeof e===i?e():e),d+=j(e)+"</span>\n            </a>\n        </li>\n    ",d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+='<div class="goal pulls">\n    <p class="goal-description" class="pulled"></p>\n    <ul class="inline-list objective-list">\n    ',h=c.objectives,h?g=h.call(b,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}):(g=b.objectives,g=typeof g===i?g():g),c.objectives||(g=l.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}));if(g||g===0)f+=g;return f+='\n    </ul>\n    <div style="clear: both;"></div>\n</div>\n',f})})()