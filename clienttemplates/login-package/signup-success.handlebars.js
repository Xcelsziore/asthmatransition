(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["login-package_signup-success"]=a(function(a,b,c,d,e){function l(a,b){return"re-"}function m(a,b){return"\n                Check your spam folder if the message doesn't arrive in your inbox soon.\n            "}function n(a,b){return"\n                Follow the link in that message to create your Khan Academy username and password.\n            "}function o(a,b){var d="",e,f;return d+='\n        <div class="debug">token for debugging: <a href="/completesignup?token=',f=c.token,f?e=f.call(a,{hash:{}}):(e=a.token,e=typeof e===i?e():e),d+=j(e)+'">',f=c.token,f?e=f.call(a,{hash:{}}):(e=a.token,e=typeof e===i?e():e),d+=j(e)+"</a></div>\n        ",d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="signup-success-dialog modal fade hide">\n    <div class="modal-body">\n        <h3 class="email-header">We\'ve ',g=b.resendDetected,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='sent you a message at</h3>\n        <div class="email">',h=c.email,h?g=h.call(b,{hash:{}}):(g=b.email,g=typeof g===i?g():g),f+=j(g)+'</div>\n\n        <img src="/images/hand-tree.gif" class="tree">\n        <div class="instructions">\n            ',g=b.resendDetected,g=c["if"].call(b,g,{hash:{},inverse:k.program(5,n,e),fn:k.program(3,m,e)});if(g||g===0)f+=g;f+="\n        </div>\n\n        ",g=b.token,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(7,o,e)});if(g||g===0)f+=g;return f+="\n    </div>\n</div>\n",f})})()