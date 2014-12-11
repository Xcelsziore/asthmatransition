$("input[name=t3]:radio").click(function() {
var a = $("#paypal-cmd"), b = $("input:radio[name=t3]:checked").val();
b == "O" ? ($("#recurring-frequency-months").css("visibility", "hidden"), $("#recurring-frequency-months").css("display", "inline"), $("#recurring-frequency-years").css("display", "none")) : b == "M" ? ($("#recurring-frequency-months").css("visibility", "visible"), $("#recurring-frequency-months").css("display", "inline"), $("#recurring-frequency-years").css("display", "none")) : ($("#recurring-frequency-months").css("display", "none"), $("#recurring-frequency-years").css("display", "inline"));
}), $("input:radio[name=t3]:checked").click();

var submitPaypal = function() {
$("#paypal-form").submit();
};

$("#donation-submit").click(function(a) {
a.preventDefault();
var b = $("input:radio[name=t3]:checked").val(), c = $("#donate-amount").val(), d = "One-Time";
if (b === "O") $("#paypal-cmd").val("_donations"), $("#paypal-item-name").val("One-time donation to Khan Academy"); else {
$("#paypal-cmd").val("_xclick-subscriptions"), $("#paypal-item-name").val("Recurring donation to Khan Academy"), $("#paypal-recurring-amount").val(c);
var e = b === "M" ? $("#months-repeating").val() : $("#years-repeating").val();
d = (e !== "0" ? e : "ongoing") + " " + (b === "M" ? "months" : "years"), $("input[name=srt]").val(e);
}
Analytics.trackSingleEvent("Donate-Link-Paypal", {
Amount: c,
Duration: d
}), gae_bingo.bingo("hp_donate_button_paypal", submitPaypal, submitPaypal);
}), $(document).ready(function() {
$("#accordion").accordion({
autoHeight: !1,
collapsible: !0,
active: !1
});
});