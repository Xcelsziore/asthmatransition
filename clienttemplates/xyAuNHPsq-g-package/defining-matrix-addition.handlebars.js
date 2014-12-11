(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["xyAuNHPsq-g-package_defining-matrix-addition"]=a(function(a,b,c,d,e){c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'</h2>\n        <p>If you were the human that defined matrix addition, how would you define it?</p>\n        <p>For matrices \\(A\\) and \\(B\\), choose a result for \\(A + B\\) from the options below.</p>\n        $$\n            A =\n            \\begin{bmatrix}\n            3 & -1 \\\\\n            2 & 0\n            \\end{bmatrix}\n            \\hspace{20pt}\n            B =\n            \\begin{bmatrix}\n            -7 & 2 \\\\\n            3 & 5\n            \\end{bmatrix}\n        $$\n\n        <label class="radio inline">\n            <input type="radio" name="answer" value="0">\n            \\(\n                A\' =\n                \\begin{bmatrix}\n                -4 & 1 \\\\\n                5 & 5\n                \\end{bmatrix}\n            \\)\n        </label>\n        <label class="radio inline">\n            <input type="radio" name="answer" value="1">\n            \\(\n                B\' =\n                \\begin{bmatrix}\n                8 & 2 \\\\\n                4 & -7\n                \\end{bmatrix}\n            \\)\n        </label>\n        <label class="radio inline">\n            <input type="radio" name="answer" value="2">\n            \\(\n                C =\n                \\begin{bmatrix}\n                3 & -1 & -7 & 2 \\\\\n                2 & 0 & 3 & 5\n                \\end{bmatrix}\n            \\)\n        </label>\n        <label class="radio inline">\n            <input type="radio" name="answer" value="3">\n            \\(\n                D =\n                \\begin{bmatrix}\n                3 & -1 \\\\\n                2 & 0 \\\\\n                -7 & 2 \\\\\n                3 & 5\n                \\end{bmatrix}\n            \\)\n        </label>\n\n        ',g=b,g=k.invokePartial(d["submit-area"],"submit-area",g,c,d);if(g||g===0)f+=g;return f+="\n    </form>\n</div>\n",f})})()