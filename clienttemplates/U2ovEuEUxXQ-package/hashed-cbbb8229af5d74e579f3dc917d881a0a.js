Socrates.Data.U2ovEuEUxXQ = {
Events: [ new Socrates.Bookmark({
time: "0s",
title: "Equivalent pies"
}), new Socrates.Question({
time: "1m58s",
nested: "equivalent-pies",
title: "Equivalent pies",
youtubeId: "U2ovEuEUxXQ",
id: 1,
correctData: {
answer: "yes"
},
"qtip-position": {
my: "bottom right",
adjust: {
x: 605,
y: 185
}
}
}), new Socrates.Bookmark({
time: "2m10s",
title: "Multiplication by unity"
}), new Socrates.Question({
time: "3m41s",
title: "Multiplication by unity",
nested: "multiplication-by-unity",
youtubeId: "U2ovEuEUxXQ",
id: 2,
correctData: {
numerator: "21",
denominator: "35"
},
"qtip-position": {
my: "left top",
adjust: {
x: 330,
y: 70
}
}
}), new Socrates.Question({
time: "5m09s",
title: "Solving for the numerator",
youtubeId: "U2ovEuEUxXQ",
id: 3,
correctData: {
answer: "15"
},
"qtip-position": {
my: "left top",
adjust: {
x: 420,
y: 50
}
}
}), new Socrates.Question({
time: "5m50s",
title: "Equivalent fractions summary",
youtubeId: "U2ovEuEUxXQ",
id: 4,
correctData: {
answer: [ !0, !1, !0, !1, !1 ]
}
}) ],
Skips: [ {
span: [ "2m59", "3m18s" ]
} ]
}, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["U2ovEuEUxXQ-package_solving-for-the-numerator"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h = this;
f += '<div class="layer backdrop videoframe"></div>\n<div class="layer controls">\n    <form class="qtip-question" style="width: 480px">\n        <p>What value for the numerator will make these fractions equivalent?</p>\n        numerator =\n        <input type="text" name="answer" placeholder="?">\n        ', g = b, g = h.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += '\n    </form>\n    <div class="watermark-blocker"></div>\n</div>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["U2ovEuEUxXQ-package_equivalent-pies"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h = this;
f += '<div class="layer backdrop videoframe"></div>\n<div class="layer controls">\n    <form class="qtip-question" style="width: 480px">\n        <p>Based on Sal\'s drawing of the pie, do you think 4/8 of a pie is equivalent to a half a pie?</p>\n        <label class="radio inline"><input type="radio" name="answer" value="yes"> Yes</label>\n        <label class="radio inline"><input type="radio" name="answer" value="no"> No</label>\n        ', g = b, g = h.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += '\n    </form>\n    <div class="watermark-blocker"></div>\n</div>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["U2ovEuEUxXQ-package_equivalent-fractions-summary"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h, i = "function", j = this.escapeExpression, k = this;
f += '<div class="layer backdrop whiteout"></div>\n<div class="layer controls">\n    <form class="popout">\n        <a class="close" href="javascript: void 0">&times;</a>\n        <h2>', h = c.title, h ? g = h.call(b, {
hash: {}
}) : (g = b.title, g = typeof g === i ? g() : g), f += j(g) + '</h2>\n        $$\n            A = \\frac{3}{9}\n            \\hspace{20pt}\n            B = \\frac{15}{45}\n            \\hspace{20pt}\n            C = \\frac{2}{6}\n            \\hspace{20pt}\n            D = \\frac{1}{4}\n        $$\n        <p>Which of the above fractions are equivalent?</p>\n        <p>Check all that apply.</p>\n\n        <label class="checkbox inline"><input type="checkbox" name="answer"> A and B</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> A and D</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> A and C</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> C and D</label>\n        <label class="checkbox inline"><input type="checkbox" name="answer"> All are equivalent</label>\n\n        ', g = b, g = k.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += "\n    </form>\n</div>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["U2ovEuEUxXQ-package_multiplication-by-unity"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h = this;
f += '<div class="layer backdrop videoframe"></div>\n<div class="layer controls">\n    <form class="qtip-question" style="width: 480px">\n        <p>Let\'s practice this before Sal does it.</p>\n        <p>Write your answer below.</p>\n        answer =\n        <span class="fraction-input" style="width: 60px">\n            <input type="text" name="numerator" placeholder="?">\n            <hr>\n            <input type="text" name="denominator" placeholder="?">\n        </span>\n        ', g = b, g = h.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += '\n    </form>\n    <div class="watermark-blocker"></div>\n</div>\n', f;
});
}();