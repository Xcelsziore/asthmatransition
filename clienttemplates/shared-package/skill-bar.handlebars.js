(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["shared-package_skill-bar"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+="\n        ",d+='\n        <div class="fill green" style="width:100%;"></div>\n        <div class="fill gray" style="width:',e=a.start,f=c.multiply,e=f?f.call(a,e,100,{hash:{}}):h.call(a,"multiply",e,100,{hash:{}}),d+=i(e)+'%;"></div>\n        <div class="fill blue just-earned" style="width:100%;"></div>\n    ',d}function l(a,b){var d="",e,f;d+='\n        <div class="fill green" style="width:',e=a.end,f=c.multiply,e=f?f.call(a,e,100,{hash:{}}):h.call(a,"multiply",e,100,{hash:{}}),d+=i(e)+'%;"></div>\n        <div class="fill gray" style="width:',e=a.start,f=c.multiply,e=f?f.call(a,e,100,{hash:{}}):h.call(a,"multiply",e,100,{hash:{}}),d+=i(e)+'%;"></div>\n        ',e=a.reviewing,e=c["if"].call(a,e,{hash:{},inverse:j.program(6,n,b),fn:j.program(4,m,b)});if(e||e===0)d+=e;return d+="\n    ",d}function m(a,b){return'\n            <div class="fill orange" style="width:100%;"></div>\n        '}function n(a,b){var d="",e;d+="\n            ",e=a.proficient,e=c["if"].call(a,e,{hash:{},inverse:j.noop,fn:j.program(7,o,b)});if(e||e===0)d+=e;return d+="\n        ",d}function o(a,b){return'\n                <div class="fill blue" style="width:100%;"></div>\n            '}c=c||a.helpers;var f="",g,h=c.helperMissing,i=this.escapeExpression,j=this;f+='<div class="skill-bar">\n    ',g=b.justEarnedProficiency,g=c["if"].call(b,g,{hash:{},inverse:j.program(3,l,e),fn:j.program(1,k,e)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})()