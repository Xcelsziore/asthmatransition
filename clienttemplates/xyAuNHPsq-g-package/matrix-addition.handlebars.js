(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["xyAuNHPsq-g-package_matrix-addition"]=a(function(a,b,c,d,e){c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'</h2>\n        <p>Let\'s see if you can add matrices. What is \\(C + D\\)?</p>\n\n        $$\n            C =\n            \\begin{bmatrix}\n            32 & 11 \\\\\n            12 & 25\n            \\end{bmatrix}\n            \\hspace{20pt}\n            D =\n            \\begin{bmatrix}\n            48 & 12 \\\\\n            1 & 0\n            \\end{bmatrix}\n        $$\n\n        <div style="text-align: center">\n            \\( C + D = \\)\n\n            <table class="matrix-input" name="answer">\n                <tbody>\n                    <tr>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                    </tr>\n                    <tr>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                    </tr>\n                </tbody>\n            </table>\n\n        </div>\n\n        ',g=b,g=k.invokePartial(d["submit-area"],"submit-area",g,c,d);if(g||g===0)f+=g;return f+="\n    </form>\n</div>\n",f})})()