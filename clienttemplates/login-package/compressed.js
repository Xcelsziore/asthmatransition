(function(a) {
var b = {
"short": [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
"long": [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
}, c = new Date, d = c.getFullYear(), e = c.getMonth() + 1, f = c.getDate();
a.fn.birthdaypicker = function(c) {
var e = {
maxAge: 120,
minAge: 0,
futureDates: !1,
maxYear: d,
dateFormat: "middleEndian",
monthFormat: "short",
placeholder: !0,
legend: "",
defaultDate: !1,
fieldName: "birthdate",
fieldId: "birthdate",
hiddenDate: !0,
onChange: null,
tabindex: null,
classes: ""
};
return this.each(function() {
c && a.extend(e, c);
var f = "";
c.classes && (f = " " + c.classes);
var g = a("<fieldset class='birthday-picker'></fieldset>"), h = a("<select class='birth-year" + f + "' name='birth[year]'></select>"), i = a("<select class='birth-month" + f + "' name='birth[month]'></select>"), j = a("<select class='birth-day" + f + "' name='birth[day]'></select>");
e.legend && a("<legend>" + e.legend + "</legend>").appendTo(g);
var k = e.tabindex;
e["dateFormat"] == "bigEndian" ? (g.append(h).append(i).append(j), k != null && (h.attr("tabindex", k), i.attr("tabindex", k++), j.attr("tabindex", k++))) : e["dateFormat"] == "littleEndian" ? (g.append(j).append(i).append(h), k != null && (j.attr("tabindex", k), i.attr("tabindex", k++), h.attr("tabindex", k++))) : (g.append(i).append(j).append(h), k != null && (i.attr("tabindex", k), j.attr("tabindex", k++), h.attr("tabindex", k++))), e.placeholder && (a("<option value='0'>Year:</option>").appendTo(h), a("<option value='0'>Month:</option>").appendTo(i), a("<option value='0'>Day:</option>").appendTo(j));
var l;
if (e.defaultDate) {
var m = new Date(e.defaultDate), n = m.getFullYear(), o = m.getMonth() + 1, p = m.getDate();
l = n + "-" + o + "-" + p;
}
e.hiddenDate && a("<input type='hidden' name='" + e.fieldName + "'/>").attr("id", e.fieldId).val(l).appendTo(g);
var q = d - e.minAge, r = d - e.maxAge;
e.futureDates && e["maxYear"] != d && (e.maxYear > 1e3 ? q = e.maxYear : q = d + e.maxYear);
while (q >= r) a("<option></option>").attr("value", q).text(q).appendTo(h), q--;
for (var s = 0; s < 12; s++) a("<option></option>").attr("value", s + 1).text(b[e.monthFormat][s]).appendTo(i);
for (var t = 1; t < 32; t++) a("<option></option>").attr("value", t).text(t).appendTo(j);
a(this).append(g);
if (e.defaultDate) {
var u = new Date(e.defaultDate);
h.val(u.getFullYear()), i.val(u.getMonth() + 1), j.val(u.getDate());
}
g.change(function() {
var c = new Date, d = c.getFullYear(), f = c.getMonth() + 1, g = c.getDate(), k = h.val(), m = i.val(), n = j.val(), o = (new Date(k, m, 0)).getDate(), p = parseInt(i.children(":last").val()), q = parseInt(j.children(":last").val());
if (q > o) while (q > o) j.children(":last").remove(), q--; else if (q < o) while (q < o) q++, j.append("<option value=" + q + ">" + q + "</option>");
if (!e.futureDates && k == d && p > f) {
while (p > f) i.children(":last").remove(), p--;
j.children(":first").attr("selected", "selected");
}
if (k != d && p != 12) while (p < 12) i.append("<option value=" + (p + 1) + ">" + b[e.monthFormat][p] + "</option>"), p++;
k * m * n != 0 && (l = k + "-" + m + "-" + n, a(this).find("#" + e.fieldId).val(l), e["onChange"] != null && e.onChange(l));
});
});
};
})(jQuery);

var Login = Login || {};

Login.initLoginPage = function(a) {
$("#login-facebook").click(function(b) {
Login.connectWithFacebook(a.continueUrl, !0);
});
}, Login.basePostLoginUrl, Login.initLoginForm = function(a) {
Login.basePostLoginUrl = a.basePostLoginUrl || "", $("#identifier").val() ? $("#password").focus() : $("#identifier").focus(), $("#submit-button").click(function(a) {
a.preventDefault(), Login.loginWithPassword();
}), $("#password").on("keypress", function(a) {
a.keyCode === $.ui.keyCode.ENTER && (a.preventDefault(), Login.loginWithPassword());
});
}, Login.connectWithFacebook = function(a, b) {
FacebookUtil.runOnFbReady(function() {
var c = b ? {
scope: "email"
} : undefined;
FB.login(function(b) {
b && FacebookUtil.fixMissingCookie(b);
if (b.status === "connected") {
FacebookUtil.markUsingFbLogin();
var c = a || "/";
c.indexOf("?") > -1 ? c += "&fb=1" : c += "?fb=1", window.location = c;
}
}, c);
});
}, Login.loginWithPassword = function() {
$("#error-text").css("visiblity", "hidden"), Login.ensureValid_("#identifier", "Email or username required") && Login.ensureValid_("#password", "Password required") && Login.asyncFormPost($("#login-form"), function(a) {
a.errors ? Login.onPasswordLoginFail(a.errors) : Login.onPasswordLoginSuccess(a);
}, function(a) {});
}, Login.submitDisabled_ = !1, Login.navigatingAway_ = !1, Login.disableSubmit_ = function() {
$("#submit-button").attr("disabled", !0), Login.submitDisabled_ = !0;
}, Login.enableSubmit_ = function() {
$("#submit-button").removeAttr("disabled"), Login.submitDisabled_ = !1;
}, Login.onPasswordLoginFail = function(a) {
var b;
a.badlogin ? b = "Your login or password is incorrect." : b = "Error logging in. Please try again.", $("#error-text").text(b).css("visibility", ""), $("#password").focus();
}, Login.onPasswordLoginSuccess = function(a) {
var b = a.auth, c = a["continue"] || "/";
window.top.location.replace(Login.basePostLoginUrl + "postlogin?continue=" + encodeURIComponent(c) + "&auth=" + encodeURIComponent(b)), Login.navigatingAway_ = !0;
}, Login.ensureValid_ = function(a, b, c) {
return c = c || function() {
var b = $(a).val();
return !!$.trim(b);
}, c() ? ($("#error-text").html("&nbsp;"), !0) : ($("#error-text").text(b), $(a).focus(), !1);
}, Login.asyncFormPost = function(a, b, c) {
if (Login.submitDisabled_) return;
Login.disableSubmit_(), $.ajax({
type: "POST",
url: a.prop("src"),
data: a.serialize(),
dataType: "json",
success: b,
error: c,
complete: function() {
Login.navigatingAway_ || Login.enableSubmit_();
}
});
}, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["login-package_signup-success"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "re-";
}
function g(a, b) {
return "\n                Check your spam folder if the message doesn't arrive in your inbox soon.\n            ";
}
function h(a, b) {
return "\n                Follow the link in that message to create your Khan Academy username and password.\n            ";
}
function i(a, b) {
var d = "", e, f;
return d += '\n        <div class="debug">token for debugging: <a href="/completesignup?token=', f = c.token, f ? e = f.call(a, {
hash: {}
}) : (e = a.token, e = typeof e === m ? e() : e), d += n(e) + '">', f = c.token, f ? e = f.call(a, {
hash: {}
}) : (e = a.token, e = typeof e === m ? e() : e), d += n(e) + "</a></div>\n        ", d;
}
c = c || a.helpers;
var j = "", k, l, m = "function", n = this.escapeExpression, o = this;
j += '<div class="signup-success-dialog modal fade hide">\n    <div class="modal-body">\n        <h3 class="email-header">We\'ve ', k = b.resendDetected, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(1, f, e)
});
if (k || k === 0) j += k;
j += 'sent you a message at</h3>\n        <div class="email">', l = c.email, l ? k = l.call(b, {
hash: {}
}) : (k = b.email, k = typeof k === m ? k() : k), j += n(k) + '</div>\n\n        <img src="/images/hand-tree.gif" class="tree">\n        <div class="instructions">\n            ', k = b.resendDetected, k = c["if"].call(b, k, {
hash: {},
inverse: o.program(5, h, e),
fn: o.program(3, g, e)
});
if (k || k === 0) j += k;
j += "\n        </div>\n\n        ", k = b.token, k = c["if"].call(b, k, {
hash: {},
inverse: o.noop,
fn: o.program(7, i, e)
});
if (k || k === 0) j += k;
return j += "\n    </div>\n</div>\n", j;
});
}(), Login.initSignupPage = function() {
if (readCookie("u13")) {
window.location.href = "/signup?under13=1";
return;
}
$("#login-facebook").click(function(a) {
Login.connectWithFacebook("/postlogin?completesignup=1", !0);
});
var a = $("#birthday-picker").data("date"), b;
if (a) {
var c = a.split("-");
if (c.length === 3) {
var d = parseInt(c[0], 10), e = parseInt(c[1], 10) - 1, f = parseInt(c[2], 10);
isNaN(d + e + f) || (b = new Date(d, e, f));
}
}
b || (b = new Date((new Date).getFullYear() - 13, 0, 1)), $("#birthday-picker").birthdaypicker({
placeholder: !1,
classes: "simple-input ui-corner-all login-input",
defaultDate: b
}), $("#email").focus().on("keypress", function(a) {
a.keyCode === $.ui.keyCode.ENTER && (a.preventDefault(), Login.submitSignup());
}), $("#submit-button").click(function(a) {
a.preventDefault(), Login.submitSignup();
});
}, Login.submitSignup = function() {
if (Login.submitDisabled_) return;
$("fieldset.birthday-picker").trigger("change");
if (Login.ensureValid_("#email", "Email required")) {
var a = $("#signup-form").serialize();
$.ajax({
type: "POST",
url: $("#signup-form").prop("action"),
data: a,
dataType: "json",
success: function(a) {
Login.handleSignupResponse(a);
},
error: function() {}
});
}
}, Login.handleSignupResponse = function(a) {
if (a.under13) {
window.location.href = "/signup?under13=1";
return;
}
var b = a.errors || {};
if (_.isEmpty(b)) {
var c = Templates.get("login.signup-success"), d = $(c({
email: a.email,
resendDetected: a.resendDetected,
token: a.token
})).appendTo($(document.body)).modal({
backdrop: "static",
show: !0
});
Login.disableSubmit_();
} else $("#error-text").text(b.email);
}, Login.initCompleteSignupForm = function(a) {
Login.basePostLoginUrl = a.basePostLoginUrl || "";
var b = _.find([ $("#nickname"), $("#gender"), $("#username"), $("#password") ], function(a) {
return !a.val() || a.val() === "unspecified";
});
b && b.focus(), $("#password").on("keypress", function(a) {
a.keyCode === $.ui.keyCode.ENTER && (a.preventDefault(), Login.submitCompleteSignup());
}), $("#submit-button").click(function(a) {
a.preventDefault(), Login.submitCompleteSignup();
});
}, Login.submitCompleteSignup = function() {
var a = Login.ensureValid_("#nickname", "Please tell us your name.") && Login.ensureValid_("#username", "Please pick a username.") && Login.ensureValid_("#password", "We need a password from you.");
a && Login.asyncFormPost($("#signup-form"), function(a) {
a.errors ? Login.onCompleteSignupError(a.errors) : Login.onCompleteSignupSucess(a);
}, function(a) {});
}, Login.onCompleteSignupSucess = function(a) {
Login.onPasswordLoginSuccess(a);
}, Login.onCompleteSignupError = function(a) {
var b = _.find([ "nickname", "username", "password" ], function(b) {
return b in a;
});
if (!b) {
$("#error-text").text("Oops. Something went wrong. Please try again.");
return;
}
$("#error-text").text(a[b]), $("#" + b).focus();
};

var Settings = {
init: function() {
$("#password2").on("keypress", function(a) {
a.keyCode === $.ui.keyCode.ENTER && (a.preventDefault(), Settings.submitForm_());
}), $("#existing").get(0) ? $("#existing").focus() : $("#password1").focus(), $("#submit-settings").click(_.bind(Settings.onClickSubmit_, Settings));
},
onClickSubmit_: function(a) {
a.preventDefault(), this.submitForm_();
},
submitForm_: function() {
if (!this.validate_()) return;
$("#submit-settings").val("Submitting...").prop("disabled", !0), $("#pw-change-form").find("#continue").val(window.location.href).end().submit();
},
MIN_PASSWORD_LENGTH: 8,
validate_: function() {
var a = $("#password1").val(), b = $("#password2").val();
return a.length < Settings.MIN_PASSWORD_LENGTH ? ($(".message-container").addClass("error").text("The new password is too short"), $("#password1").focus(), !1) : b !== a ? ($(".message-container").addClass("error").text("The passwords don't match"), $("#password1").focus(), !1) : ($(".message-container").text(""), !0);
}
};