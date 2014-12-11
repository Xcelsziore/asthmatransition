(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["xyAuNHPsq-g-package_dimensions-of-a-matrix"]=a(function(a,b,c,d,e){c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close-button" href="javascript:void 0">x</a>\n        <h2>',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'</h2>\n        <p>What are the dimensions of this matrix?</p>\n\n        $$\n            M =\n            \\begin{bmatrix}\n            5 & 0 & 0 & 1 & 5 \\\\\n            4 & 8 & 78 & 77 & 10 \\\\\n            1 & 1 & 2 & 3 & 2 \\\\\n            1 & 5 & 10 & 65 & 98\n            \\end{bmatrix}\n        $$\n\n        <p>\n            \\(M\\) is a\n            <input type="text" name="rows" placeholder="?" style="width: 2em">\n            by\n            <input type="text" name="cols" placeholder="?" style="width: 2em">\n            matrix.\n        </p>\n\n        ',g=b,g=k.invokePartial(d["submit-area"],"submit-area",g,c,d);if(g||g===0)f+=g;return f+="\n    </form>\n</div>\n",f})})()