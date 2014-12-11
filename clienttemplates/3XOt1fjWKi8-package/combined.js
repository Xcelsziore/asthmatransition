Socrates.Data["3XOt1fjWKi8"] = {
    Events: [
        new Socrates.Bookmark({
            time: "0s",
            title: "Introduction"
        }),
        new Socrates.Question({
            time: "24s",
            title: "Numerator and Denominator of a Fraction",
            youtubeId: "3XOt1fjWKi8",
            id: 1,
            correctData: {answer: "bottom"},
            "qtip-position": {
                my: "left center",
                adjust: { x: 230, y: 165 }
            }
        }),
        new Socrates.Bookmark({
            time: "47s",
            title: "What this fraction represents"
        })
        // todo(dmnd) Bring in questions from related exercise for the end
        // What fraction of this circle is shaded red? (recognizing fractions 0.5?)
        // Given 3/6, what is the fraction's denominator? (recognizing fractions)
    ],
    Skips: []
};
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["3XOt1fjWKi8-package_numerator-and-denominator-of-a-fraction"]=a(function(a,b,c,d,e){c=c||a.helpers,d=d||a.partials;var f="",g,h=this;f+='<div class="layer backdrop videoframe"></div>\n<div class="layer controls">\n    <form class="qtip-question" style="width: 480px">\n        <p>Let\'s see if you already know this.</p>\n        <p>Is the denominator on the top or bottom?</p>\n        <p>\n            <label class="radio inline"><input type="radio" name="answer" value="top"> Top</label>\n            <label class="radio inline"><input type="radio" name="answer" value="bottom"> Bottom</label>\n        </p>\n        <p class="mem">\n            Here\'s a good way to remember:<br>\n            The <strong>N</strong>umerator is to the <strong>N</strong>orth. The <strong>D</strong>enominator is <strong>d</strong>own below.\n        </p>\n        ',g=b,g=h.invokePartial(d["submit-area"],"submit-area",g,c,d);if(g||g===0)f+=g;return f+='\n    </form>\n    <div class="watermark-blocker"></div>\n</div>\n',f})})()