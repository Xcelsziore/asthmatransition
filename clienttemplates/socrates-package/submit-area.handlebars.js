(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["socrates-package_submit-area"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+='\n    <a class="explain simple-button action-gradient" href="',f=c.explainUrl,f?e=f.call(a,{hash:{}}):(e=a.explainUrl,e=typeof e===h?e():e),d+=i(e)+'">&laquo; Explain again</a>\n    ',d}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div class="submit-area">\n    ',g=b.explainUrl,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;return f+='\n    <button type="submit" class="submit simple-button action-gradient green">Submit</button>\n    <span class="alert alert-success">\n        <img class="face" src="/khan-exercises/css/images/face-smiley.gif">\n        Correct!\n    </span>\n    <span class="alert alert-error">\n        <img class="face" src="/khan-exercises/css/images/face-sad.gif">\n        Incorrect\n        <a class="see-answer" href="javascript: void 0">See Answer</a>\n    </span>\n    <a class="skip simple-button action-gradient" href="javascript:void 0">Skip &raquo;</a>\n</div>\n',f})})()