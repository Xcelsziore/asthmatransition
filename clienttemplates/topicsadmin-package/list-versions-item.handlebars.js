(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_list-versions-item"]=a(function(a,b,c,d,e){function m(a,b){return"\n      <strong>[Editing version]</strong>\n    "}function n(a,b){return"<strong>[Currently live version]</strong>"}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+='<div>\n  <a href="javascript:" class="edit-version simple-button green action-gradient" style="float: right">View this version</a>\n  <div><strong>Version #',h=c.number,h?g=h.call(b,{hash:{}}):(g=b.number,g=typeof g===i?g():g),f+=j(g)+':</strong> "',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'"\n    ',h=c.edit,h?g=h.call(b,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}):(g=b.edit,g=typeof g===i?g():g),c.edit||(g=l.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}));if(g||g===0)f+=g;f+="\n    ",h=c["default"],h?g=h.call(b,{hash:{},inverse:k.noop,fn:k.program(3,n,e)}):(g=b["default"],g=typeof g===i?g():g),c["default"]||(g=l.call(b,g,{hash:{},inverse:k.noop,fn:k.program(3,n,e)}));if(g||g===0)f+=g;return f+='\n  </div>\n  <div style="margin-left: 20px;"><strong>Description:</strong> ',h=c.description,h?g=h.call(b,{hash:{}}):(g=b.description,g=typeof g===i?g():g),f+=j(g)+'</div>\n  <div style="margin-left: 20px;"><strong>Created:</strong> ',h=c.created_on,h?g=h.call(b,{hash:{}}):(g=b.created_on,g=typeof g===i?g():g),f+=j(g)+'</div>\n  <div style="margin-left: 20px;"><strong>Updated:</strong> ',h=c.updated_on,h?g=h.call(b,{hash:{}}):(g=b.updated_on,g=typeof g===i?g():g),f+=j(g)+" by ",h=c.last_edited_by,h?g=h.call(b,{hash:{}}):(g=b.last_edited_by,g=typeof g===i?g():g),f+=j(g)+"</div>\n</div>\n",f})})()