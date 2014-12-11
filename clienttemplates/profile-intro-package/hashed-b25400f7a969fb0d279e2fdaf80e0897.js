var guiders = function(a) {
var b = {};
return b.ButtonAction = {
NEXT: 0,
CLOSE: 1
}, b._defaultSettings = {
attachTo: null,
buttons: [ {
action: b.ButtonAction.CLOSE,
text: "Close"
} ],
buttonCustomHTML: "",
classString: null,
description: "",
highlight: null,
isHashable: !0,
offset: {
top: null,
left: null
},
onShow: null,
overlay: !1,
position: 0,
title: "Sample title goes here",
width: 400,
xButton: !1
}, b._htmlSkeleton = [ "<div class='guider'>", "  <div class='guider_content'>", "    <h1 class='guider_title'></h1>", "    <div class='guider_close'></div>", "    <p class='guider_description'></p>", "    <div class='guider_buttons'>", "    </div>", "  </div>", "  <div class='guider_arrow'>", "  </div>", "</div>" ].join(""), b._arrowSize = 42, b._currentGuiderID = null, b._guiders = {}, b._lastCreatedGuiderID = null, b._zIndexForHighlight = 10001, b._addButtons = function(c) {
var d = c.elem.find(".guider_buttons");
if (c.buttons === null || c.buttons.length === 0) {
d.remove();
return;
}
for (var e = c.buttons.length - 1; e >= 0; e--) {
var f = c.buttons[e], g = a("<a></a>", {
"class": "ka_guider_button",
text: f.text
});
typeof f.classString != "undefined" && f.classString !== null && g.addClass(f.classString), d.append(g), f.onclick ? g.bind("click", f.onclick) : !f.onclick && f.action === b.ButtonAction.CLOSE ? g.bind("click", function() {
b.hideAll();
}) : !f.onclick && f.action === b.ButtonAction.NEXT && g.bind("click", function() {
b.next();
});
}
if (c.buttonCustomHTML !== "") {
var h = a(c.buttonCustomHTML);
c.elem.find(".guider_buttons").append(h);
}
c.buttons.length == 0 && d.remove();
}, b._addXButton = function(c) {
var d = c.elem.find(".guider_close"), e = a("<div></div>", {
"class": "x_button",
role: "button"
});
d.append(e), e.click(function() {
b.hideAll();
});
}, b._attach = function(c) {
if (c === null) return;
var d = c.elem.innerHeight(), e = c.elem.innerWidth();
if (c.position === 0 || c.attachTo === null) {
c.elem.css("position", "absolute"), c.elem.css("top", (a(window).height() - d) / 3 + a(window).scrollTop() + "px"), c.elem.css("left", (a(window).width() - e) / 2 + a(window).scrollLeft() + "px");
return;
}
c.attachTo = a(c.attachTo);
var f = c.attachTo.offset(), g = c.attachTo.innerHeight(), h = c.attachTo.innerWidth(), i = f.top, j = f.left, k = .9 * b._arrowSize, l = {
1: [ -k - d, h - e ],
2: [ 0, k + h ],
3: [ g / 2 - d / 2, k + h ],
4: [ g - d, k + h ],
5: [ k + g, h - e ],
6: [ k + g, h / 2 - e / 2 ],
7: [ k + g, 0 ],
8: [ g - d, -e - k ],
9: [ g / 2 - d / 2, -e - k ],
10: [ 0, -e - k ],
11: [ -k - d, 0 ],
12: [ -k - d, h / 2 - e / 2 ]
};
offset = l[c.position], i += offset[0], j += offset[1], c.offset.top !== null && (i += c.offset.top), c.offset.left !== null && (j += c.offset.left), c.elem.css({
position: "absolute",
top: i,
left: j
});
}, b._guiderById = function(a) {
if (typeof b._guiders[a] == "undefined") throw "Cannot find guider with id " + a;
return b._guiders[a];
}, b._showOverlay = function() {
a("#guider_overlay").fadeIn("fast", function() {
this.style.removeAttribute && this.style.removeAttribute("filter"), a("#guider_click_mask").show();
});
}, b._highlightElement = function(c) {
a(c).css({
"z-index": b._zIndexForHighlight
});
}, b._dehighlightElement = function(b) {
a(b).css({
"z-index": ""
});
}, b._hideOverlay = function() {
a("#guider_overlay").fadeOut("fast"), a("#guider_click_mask").hide();
}, b._initializeOverlay = function() {
a("#guider_overlay").length === 0 && (a('<div id="guider_overlay"></div>').hide().appendTo("body"), a('<div id="guider_click_mask"></div>').hide().click(function(a) {
a.preventDefault(), a.stopPropagation();
}).appendTo("body"));
}, b._styleArrow = function(c) {
var d = c.position || 0;
if (!d) return;
var e = a(c.elem.find(".guider_arrow")), f = {
1: "guider_arrow_down",
2: "guider_arrow_left",
3: "guider_arrow_left",
4: "guider_arrow_left",
5: "guider_arrow_up",
6: "guider_arrow_up",
7: "guider_arrow_up",
8: "guider_arrow_right",
9: "guider_arrow_right",
10: "guider_arrow_right",
11: "guider_arrow_down",
12: "guider_arrow_down"
};
e.addClass(f[d]);
var g = c.elem.innerHeight(), h = c.elem.innerWidth(), i = b._arrowSize / 2, j = {
1: [ "right", i ],
2: [ "top", i ],
3: [ "top", g / 2 - i ],
4: [ "bottom", i ],
5: [ "right", i ],
6: [ "left", h / 2 - i ],
7: [ "left", i ],
8: [ "bottom", i ],
9: [ "top", g / 2 - i ],
10: [ "top", i ],
11: [ "left", i ],
12: [ "left", h / 2 - i ]
}, d = j[c.position];
e.css(d[0], d[1] + "px");
}, b._showIfHashed = function(a) {
var c = "guider=", d = window.location.hash.indexOf(c);
if (d !== -1) {
var e = window.location.hash.substr(d + c.length);
a.id.toLowerCase() === e.toLowerCase() && b.show(a.id);
}
}, b.next = function() {
var a = b._guiders[b._currentGuiderID];
if (typeof a == "undefined") return;
var c = a.next || null;
if (c !== null && c !== "") {
var d = b._guiderById(c), e = d.overlay ? !0 : !1;
b.hideAll(e), b.show(c);
}
}, b.createGuider = function(c) {
if (c === null || c === undefined) c = {};
myGuider = a.extend({}, b._defaultSettings, c), myGuider.id = myGuider.id || String(Math.floor(Math.random() * 1e3));
var d = a(b._htmlSkeleton);
myGuider.elem = d, typeof myGuider.classString != "undefined" && myGuider.classString !== null && myGuider.elem.addClass(myGuider.classString), myGuider.elem.css("width", myGuider.width + "px");
var e = d.find(".guider_title");
return e.html(myGuider.title), d.find(".guider_description").html(myGuider.description), b._addButtons(myGuider), myGuider.xButton && b._addXButton(myGuider), d.hide(), d.appendTo("body"), d.attr("id", myGuider.id), typeof myGuider.attachTo != "undefined" && myGuider !== null && (b._attach(myGuider), b._styleArrow(myGuider)), b._initializeOverlay(), b._guiders[myGuider.id] = myGuider, b._lastCreatedGuiderID = myGuider.id, myGuider.isHashable && b._showIfHashed(myGuider), b;
}, b.hideAll = function(c) {
var d = b._guiders[b._currentGuiderID];
return d && d.highlight && b._dehighlightElement(d.highlight), a(".guider").fadeOut("fast"), (typeof c == "undefined" || c !== !0) && b._hideOverlay(), b;
}, b.show = function(c) {
!c && b._lastCreatedGuiderID && (c = b._lastCreatedGuiderID);
var d = b._guiderById(c);
d.overlay && (b._showOverlay(), d.highlight && b._highlightElement(d.highlight)), b._attach(d), d.onShow && d.onShow(d), d.elem.fadeIn("fast");
var e = a(window).height(), f = a(window).scrollTop(), g = d.elem.offset(), h = d.elem.height();
return (g.top - f < 0 || g.top + h + 40 > f + e) && window.scrollTo(0, Math.max(g.top + h / 2 - e / 2, 0)), b._currentGuiderID = c, b;
}, b;
}.call(this, jQuery);

typeof Profile != "undefined" && (Profile.showIntro_ = function() {
if (Profile.profile.isPhantom()) {
guiders.createGuider({
buttons: [ {
action: guiders.ButtonAction.CLOSE,
text: "No thanks",
classString: "simple-button action-gradient"
}, {
action: guiders.ButtonAction.CLOSE,
text: "Cool. Let me login now!",
onclick: function() {
var a = "/postlogin?continue=" + encodeURIComponent(window.location.href);
window.location.href = "/login?continue=" + encodeURIComponent(a);
},
classString: "simple-button action-gradient green"
} ],
title: "Log in to save and customize your profile!",
description: "Your profile page shows you all the great progress you've made on Khan Academy. If you login, you can even customize and share your profile with your friends!",
overlay: !0
}).show();
return;
}
var a = Profile.profile.get("isDataCollectible");
guiders.createGuider({
id: "welcome",
next: "basic-profile",
buttons: [ {
action: guiders.ButtonAction.CLOSE,
text: "No thanks. I know what I'm doing.",
classString: "simple-button action-gradient"
}, {
action: guiders.ButtonAction.NEXT,
text: "Cool. Show me around!",
classString: "simple-button action-gradient green"
} ],
title: "Welcome to your new profile!",
description: "All of the stuff you liked is still here, and we've added some new things you can customize!",
overlay: !0
}).show(), guiders.createGuider({
id: "basic-profile",
next: "display-case",
attachTo: ".basic-user-info",
highlight: ".basic-user-info",
overlay: !0,
position: 3,
buttons: [ {
action: guiders.ButtonAction.CLOSE,
text: "Close",
classString: "simple-button action-gradient"
}, {
action: guiders.ButtonAction.NEXT,
text: "Next",
classString: "simple-button action-gradient green"
} ],
title: "It's all about you.",
description: a ? "This is your basic profile information, which you can now edit! You can change your name and pick a cool avatar just by clicking on it over there on the left." : "This is your basic profile information, which you can now customize with a cool avatar! Just click on it over there on the left."
}), guiders.createGuider({
id: "display-case",
next: "more-info",
attachTo: ".display-case-cover",
highlight: ".sticker-book",
overlay: !0,
position: 6,
buttons: [ {
action: guiders.ButtonAction.CLOSE,
text: "Close",
classString: "simple-button action-gradient"
}, {
action: guiders.ButtonAction.NEXT,
text: "More! Show me more.",
classString: "simple-button action-gradient green"
} ],
title: "Show off your accomplishments.",
description: "You can select up to five badges to show off in your very own shiny display case!"
}), guiders.createGuider({
id: "more-info",
next: "privacy-settings",
attachTo: ".vertical-tab-list",
highlight: ".vertical-tab-list",
overlay: !0,
position: 3,
buttons: a ? [ {
action: guiders.ButtonAction.CLOSE,
text: "Close",
classString: "simple-button action-gradient"
}, {
action: guiders.ButtonAction.NEXT,
text: "Next",
classString: "simple-button action-gradient green"
} ] : [ {
action: guiders.ButtonAction.CLOSE,
text: "OK! Let me play with the page!",
classString: "simple-button action-gradient green"
} ],
title: "Checking Your Vitals",
description: "The statistics about your progress on Khan Academy are just a click away in the navigation menu. Don't worry, though, only you and your coaches can see this and nobody else."
}), a && guiders.createGuider({
id: "privacy-settings",
attachTo: ".edit-visibility.visibility-toggler",
highlight: ".user-info, .edit-visibility.visibility-toggler",
overlay: !0,
position: 9,
buttons: [ {
action: guiders.ButtonAction.CLOSE,
text: "OK! Let me play with the page!",
classString: "simple-button action-gradient green"
} ],
title: "Share With The World <span style='font-size:65%'>(but only if you want to)</span>",
description: "The information in the box above can be made public. If you make your profile public, you'll get your own special space on Khan Academy. Other users will be able to visit your page. Don't worry! You can make your profile private at any time, in which case only you and your coaches can see your info."
});
});