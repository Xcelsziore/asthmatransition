(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["xyAuNHPsq-g-package_matrices-that-can-be-added"]=a(function(a,b,c,d,e){c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'</h2>\n        $$\n            A =\n            \\begin{bmatrix}\n            3 & -1 & 9 \\\\\n            2 & 0 & 0\n            \\end{bmatrix}\n\n            \\hspace{20pt}\n\n            B =\n            \\begin{bmatrix}\n            -7 & 2 \\\\\n            3 & 5\n            \\end{bmatrix}\n\n            \\hspace{20pt}\n\n            C =\n            \\begin{bmatrix}\n            -7 & 2 & 4\\\\\n            3 & 5 & 8\n            \\end{bmatrix}\n\n            \\hspace{20pt}\n\n            D =\n            \\begin{bmatrix}\n            -7 & 2 \\\\\n            3 & 5\n\n            \\end{bmatrix}\n\n        $$\n        <p>Given the above matrices, which of the following expressions are valid examples of matrix addition? Check the box if it\'s possible to add the two matrices.</p>\n\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(A+B\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(D+A\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(A+C\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(B+D\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(C+D\\)</label>\n\n        ',g=b,g=k.invokePartial(d["submit-area"],"submit-area",g,c,d);if(g||g===0)f+=g;return f+="\n    </form>\n</div>\n",f})})()