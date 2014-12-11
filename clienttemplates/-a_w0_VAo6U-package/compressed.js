Socrates.Data["-a_w0_VAo6U"] = {
Events: [ new Socrates.Question({
time: "15s",
title: "Identifying fraction parts",
youtubeId: "-a_w0_VAo6U",
id: 1,
correctData: {
numerator: "3",
denominator: "5"
},
"qtip-position": {
my: "top left",
adjust: {
x: 280,
y: 95
}
}
}) ],
Skips: [ {
span: [ "29s", "42s" ]
} ]
}, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["-a_w0_VAo6U-package_identifying-fraction-parts"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h = this;
f += '<div class="layer backdrop videoframe"></div>\n<div class="layer controls">\n    <form class="qtip-question" style="width: 480px">\n        <p>Let\'s see if you already know this.</p>\n        <p>Write your answer below.</p>\n        answer =\n        <span class="fraction-input" style="width: 60px">\n            <input type="text" name="numerator" placeholder="?">\n            <hr>\n            <input type="text" name="denominator" placeholder="?">\n        </span>\n        ', g = b, g = h.invokePartial(d["submit-area"], "submit-area", g, c, d);
if (g || g === 0) f += g;
return f += '\n    </form>\n    <div class="watermark-blocker"></div>\n</div>\n', f;
});
}();