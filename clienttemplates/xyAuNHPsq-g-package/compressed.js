(function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_commutativity-of-matrix-addition"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        <p>When you defined matrix addition in the <a href="#defining-matrix-addition">previous question</a>, did A + B turn out to be the same thing as B + A? In other words, was your definition of matrix addition commutative?</p>\n        $$\n            A =\n            \\begin{bmatrix}\n            3 & -1 \\\\\n            2 & 0\n            \\end{bmatrix}\n            \\hspace{20pt}\n            B =\n            \\begin{bmatrix}\n            -7 & 2 \\\\\n            3 & 5\n            \\end{bmatrix}\n        $$\n\n        <label class="radio inline"><input type="radio" name="answer" value="yes"> Yes</label>\n        <label class="radio inline"><input type="radio" name="answer" value="no"> No</label>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
})(), Socrates.Data["xyAuNHPsq-g"] = {
Events: [ new Socrates.Bookmark({
time: "0m0s",
title: "What is a matrix?"
}), new Socrates.Bookmark({
time: "0m59s",
title: "Dimensions of a matrix"
}), new Socrates.Question({
time: "2m5.7s",
title: "Dimensions of a matrix",
nested: "dimensions-of-a-matrix",
youtubeId: "xyAuNHPsq-g",
id: 1,
correctData: {
rows: "4",
cols: "5"
}
}), new Socrates.Bookmark({
time: "2m6s",
title: "Referencing elements in a matrix"
}), new Socrates.Question({
time: "3m20s",
title: "Referencing elements in a matrix",
nested: "referencing-elements-in-a-matrix",
youtubeId: "xyAuNHPsq-g",
id: 2,
correctData: {
answer: "2"
}
}), new Socrates.Bookmark({
time: "3m28s",
title: "What are matrices used for?"
}), new Socrates.Question({
time: "4m23.9s",
title: "What are matrices used for?",
nested: "what-are-matrices-used-for",
youtubeId: "xyAuNHPsq-g",
id: 3,
correctData: {
answer: [ !0, !0, !0, !0, !0, !0 ]
}
}), new Socrates.Bookmark({
time: "4m42s",
title: "Defining matrix addition"
}), new Socrates.Question({
time: "6m31s",
title: "Defining matrix addition",
nested: "defining-matrix-addition",
youtubeId: "xyAuNHPsq-g",
id: 4
}), new Socrates.Bookmark({
time: "6m31s",
title: "Matrix addition"
}), new Socrates.Bookmark({
time: "7m39s",
title: "Commutativity of matrix addition"
}), new Socrates.Question({
time: "8m11s",
title: "Commutativity of matrix addition",
nested: "commutativity-of-matrix-addition",
youtubeId: "xyAuNHPsq-g",
id: 5
}), new Socrates.Question({
time: "8m11s",
title: "Matrix addition",
youtubeId: "xyAuNHPsq-g",
id: 6,
correctData: {
answer: [ [ 80, 23 ], [ 13, 25 ] ]
}
}), new Socrates.Bookmark({
time: "8m11s",
title: "Matrix subtraction"
}), new Socrates.Bookmark({
time: "9m44s",
title: "Matrices that can be added"
}), new Socrates.Question({
time: "11m17s",
title: "Matrices that can be added",
nested: "matrices-that-can-be-added",
youtubeId: "xyAuNHPsq-g",
id: 8,
correctData: {
answer: [ !1, !1, !0, !0, !1 ]
}
}), new Socrates.Bookmark({
time: "11m17s",
title: "Matrix terminology"
}), new Socrates.Question({
time: "11m50s",
title: "Matrix terminology",
nested: "matrix-terminology",
youtubeId: "xyAuNHPsq-g",
id: 9,
correctData: {
answer: {
scalar: {
scalar: !0,
"row-vector": !1,
"column-vector": !1,
matrix: !1
},
"column-vector": {
scalar: !1,
"row-vector": !1,
"column-vector": !0,
matrix: !0
},
"row-vector": {
scalar: !1,
"row-vector": !0,
"column-vector": !1,
matrix: !0
},
matrix: {
scalar: !1,
"row-vector": !1,
"column-vector": !1,
matrix: !0
}
}
}
}) ],
Skips: [ {
span: [ "25.5s", "42s" ]
}, {
span: [ "1m40s", "2m2s" ]
} ]
}, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_dimensions-of-a-matrix"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close-button" href="javascript:void 0">x</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        <p>What are the dimensions of this matrix?</p>\n\n        $$\n            M =\n            \\begin{bmatrix}\n            5 & 0 & 0 & 1 & 5 \\\\\n            4 & 8 & 78 & 77 & 10 \\\\\n            1 & 1 & 2 & 3 & 2 \\\\\n            1 & 5 & 10 & 65 & 98\n            \\end{bmatrix}\n        $$\n\n        <p>\n            \\(M\\) is a\n            <input type="text" name="rows" placeholder="?" style="width: 2em">\n            by\n            <input type="text" name="cols" placeholder="?" style="width: 2em">\n            matrix.\n        </p>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_defining-matrix-addition"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        <p>If you were the human that defined matrix addition, how would you define it?</p>\n        <p>For matrices \\(A\\) and \\(B\\), choose a result for \\(A + B\\) from the options below.</p>\n        $$\n            A =\n            \\begin{bmatrix}\n            3 & -1 \\\\\n            2 & 0\n            \\end{bmatrix}\n            \\hspace{20pt}\n            B =\n            \\begin{bmatrix}\n            -7 & 2 \\\\\n            3 & 5\n            \\end{bmatrix}\n        $$\n\n        <label class="radio inline">\n            <input type="radio" name="answer" value="0">\n            \\(\n                A\' =\n                \\begin{bmatrix}\n                -4 & 1 \\\\\n                5 & 5\n                \\end{bmatrix}\n            \\)\n        </label>\n        <label class="radio inline">\n            <input type="radio" name="answer" value="1">\n            \\(\n                B\' =\n                \\begin{bmatrix}\n                8 & 2 \\\\\n                4 & -7\n                \\end{bmatrix}\n            \\)\n        </label>\n        <label class="radio inline">\n            <input type="radio" name="answer" value="2">\n            \\(\n                C =\n                \\begin{bmatrix}\n                3 & -1 & -7 & 2 \\\\\n                2 & 0 & 3 & 5\n                \\end{bmatrix}\n            \\)\n        </label>\n        <label class="radio inline">\n            <input type="radio" name="answer" value="3">\n            \\(\n                D =\n                \\begin{bmatrix}\n                3 & -1 \\\\\n                2 & 0 \\\\\n                -7 & 2 \\\\\n                3 & 5\n                \\end{bmatrix}\n            \\)\n        </label>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_matrices-that-can-be-added"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        $$\n            A =\n            \\begin{bmatrix}\n            3 & -1 & 9 \\\\\n            2 & 0 & 0\n            \\end{bmatrix}\n\n            \\hspace{20pt}\n\n            B =\n            \\begin{bmatrix}\n            -7 & 2 \\\\\n            3 & 5\n            \\end{bmatrix}\n\n            \\hspace{20pt}\n\n            C =\n            \\begin{bmatrix}\n            -7 & 2 & 4\\\\\n            3 & 5 & 8\n            \\end{bmatrix}\n\n            \\hspace{20pt}\n\n            D =\n            \\begin{bmatrix}\n            -7 & 2 \\\\\n            3 & 5\n\n            \\end{bmatrix}\n\n        $$\n        <p>Given the above matrices, which of the following expressions are valid examples of matrix addition? Check the box if it\'s possible to add the two matrices.</p>\n\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(A+B\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(D+A\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(A+C\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(B+D\\)</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> \\(C+D\\)</label>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_matrix-terminology"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout" style="margin-top: 5px">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        <p>Sal introduced us to some new terms during this video. Let\'s see if you can remember them!</p>\n        <p>Fill in the grid below. Check the box if the object in the first row matches the term in the column header.</p>\n\n        <table class="table centered checkbox-grid">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th name="scalar">Scalar</th>\n                    <th name="row-vector">Row vector</th>\n                    <th name="column-vector">Column vector</th>\n                    <th name="matrix">Matrix</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr name="column-vector">\n                    <td>\n                        \\(\n                            \\begin{bmatrix}\n                            1 \\\\ 2 \\\\ 3 \\\\ 4\n                            \\end{bmatrix}\n                        \\)\n                    </td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                </tr>\n                <tr name="scalar">\n                    <td>\n                        \\(1\\)\n                    </td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                </tr>\n                <tr name="row-vector">\n                    <td>\n                        \\(\n                            \\begin{bmatrix}\n                            1 & 2 & 3 & 4\n                            \\end{bmatrix}\n                        \\)\n                    </td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                </tr>\n                <tr name="matrix">\n                    <td>\n                        \\(\n                            \\begin{bmatrix}\n                            1 & 2 \\\\\n                            3 & 4\n                            \\end{bmatrix}\n                        \\)\n                    </td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                    <td><input type="checkbox"></td>\n                </tr>\n            </tbody>\n        </table>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_matrix-addition"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        <p>Let\'s see if you can add matrices. What is \\(C + D\\)?</p>\n\n        $$\n            C =\n            \\begin{bmatrix}\n            32 & 11 \\\\\n            12 & 25\n            \\end{bmatrix}\n            \\hspace{20pt}\n            D =\n            \\begin{bmatrix}\n            48 & 12 \\\\\n            1 & 0\n            \\end{bmatrix}\n        $$\n\n        <div style="text-align: center">\n            \\( C + D = \\)\n\n            <table class="matrix-input" name="answer">\n                <tbody>\n                    <tr>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                    </tr>\n                    <tr>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                        <td><input type="text" placeholder="?" style="width: 2em"></td>\n                    </tr>\n                </tbody>\n            </table>\n\n        </div>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_referencing-elements-in-a-matrix"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h = this;
f += '<div class="layer backdrop videoframe"></div>\n<div class="layer controls">\n    <form>\n        <div class="label" style="left: 484px; top: 228px; ">Enter the value at A[1,3] above.</div>\n        <div class="inputtext" style="position: absolute; width: 25px; height: 25px; left: 639px; top: 147px; ">\n        <input type="text" name="answer" placeholder="?">\n        </div>\n        <div class="label" style="left: 599px; top: 151px; ">=</div>\n        <div class="watermark-blocker">\n        ', g = b, g = h.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n        </div>\n    </form>\n</div>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["xyAuNHPsq-g-package_what-are-matrices-used-for"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        <p>Sal gave us some examples of what matrices are used for. Let\'s see if we can think of some other uses.</p>\n        <p>Check the items below if you think matrices were used to help create them.</p>\n\n        <label class="checkbox"><input type="checkbox" name="answer"> Google\'s search engine</label>\n        <label class="checkbox"><input type="checkbox" name="answer"> Calculating a satellite\'s orbit</label>\n        <label class="checkbox"><input type="checkbox" name="answer"> Recording music to mp3 format</label>\n        <label class="checkbox"><input type="checkbox" name="answer"> Making a Pixar movie like Finding Nemo</label>\n        <label class="checkbox"><input type="checkbox" name="answer"> Moving a robot arm</label>\n        <label class="checkbox"><input type="checkbox" name="answer"> This website!</label>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
}();