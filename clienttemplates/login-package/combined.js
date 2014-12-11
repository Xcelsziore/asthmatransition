/*!
 * jQuery Birthday Picker: v1.4 - 10/16/2011
 * http://abecoffman.com/stuff/birthdaypicker
 *
 * Copyright (c) 2010 Abe Coffman
 * Dual licensed under the MIT and GPL licenses.
 *
 */

(function( $ ){

  // plugin variables
  var months = {
    "short": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "long": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
      todayDate = new Date(),
      todayYear = todayDate.getFullYear(),
      todayMonth = todayDate.getMonth() + 1,
      todayDay = todayDate.getDate();


  $.fn.birthdaypicker = function( options ) {

    var settings = {
      "maxAge"        : 120,
      "minAge"        : 0,
      "futureDates"   : false,
      "maxYear"       : todayYear,
      "dateFormat"    : "middleEndian",
      "monthFormat"   : "short",
      "placeholder"   : true,
      "legend"        : "",
      "defaultDate"   : false,
      "fieldName"     : "birthdate",
      "fieldId"       : "birthdate",
      "hiddenDate"    : true,
      "onChange"      : null,
      "tabindex"      : null,
      "classes"       : ""
    };

    return this.each(function() {

      if (options) { $.extend(settings, options); }

      // Create the html picker skeleton
      var classes = "";
      if (options["classes"]) {
        classes = " " + options["classes"];
      }
      var $fieldset = $("<fieldset class='birthday-picker'></fieldset>"),
          $year = $("<select class='birth-year"+classes+"' name='birth[year]'></select>"),
          $month = $("<select class='birth-month"+classes+"' name='birth[month]'></select>"),
          $day = $("<select class='birth-day"+classes+"' name='birth[day]'></select>");

      if (settings["legend"]) { $("<legend>" + settings["legend"] + "</legend>").appendTo($fieldset); }

      var tabindex = settings["tabindex"];

      // Deal with the various Date Formats
      if (settings["dateFormat"] == "bigEndian") {
        $fieldset.append($year).append($month).append($day);
        if (tabindex != null) {
          $year.attr('tabindex', tabindex);
          $month.attr('tabindex', tabindex++);
          $day.attr('tabindex', tabindex++);
        }
      } else if (settings["dateFormat"] == "littleEndian") {
        $fieldset.append($day).append($month).append($year);
        if (tabindex != null) {
          $day.attr('tabindex', tabindex);
          $month.attr('tabindex', tabindex++);
          $year.attr('tabindex', tabindex++);
        }
      } else {
        $fieldset.append($month).append($day).append($year);
        if (tabindex != null) {
          $month.attr('tabindex', tabindex);
          $day.attr('tabindex', tabindex++);
          $year.attr('tabindex', tabindex++);
        }
      }

      // Add the option placeholders if specified
      if (settings["placeholder"]) {
        $("<option value='0'>Year:</option>").appendTo($year);
        $("<option value='0'>Month:</option>").appendTo($month);
        $("<option value='0'>Day:</option>").appendTo($day);
      }

      var hiddenDate;
      if (settings["defaultDate"]) {
        var defDate = new Date(settings["defaultDate"]),
        defYear = defDate.getFullYear(),
        defMonth = defDate.getMonth() + 1,
        defDay = defDate.getDate();
        hiddenDate = defYear + "-" + defMonth + "-" + defDay;
      }

      // Create the hidden date markup
      if (settings["hiddenDate"]) {
        $("<input type='hidden' name='" + settings["fieldName"] + "'/>")
            .attr("id", settings["fieldId"])
            .val(hiddenDate)
            .appendTo($fieldset);
      }

      // Build the initial option sets
      var startYear = todayYear - settings["minAge"];
      var endYear = todayYear - settings["maxAge"];
      if (settings["futureDates"] && settings["maxYear"] != todayYear) {
        if (settings["maxYear"] > 1000) { startYear = settings["maxYear"]; }
        else { startYear = todayYear + settings["maxYear"]; }
      }
      while (startYear >= endYear) { $("<option></option>").attr("value", startYear).text(startYear).appendTo($year); startYear--; }
      for (var j=0; j<12; j++) { $("<option></option>").attr("value", j+1).text(months[settings["monthFormat"]][j]).appendTo($month); }
      for (var k=1; k<32; k++) { $("<option></option>").attr("value", k).text(k).appendTo($day); }
      $(this).append($fieldset);

      // Set the default date if given
      if (settings["defaultDate"]) {
        var date = new Date(settings["defaultDate"]);
        $year.val(date.getFullYear());
        $month.val(date.getMonth() + 1);
        $day.val(date.getDate());
      }

      // Update the option sets according to options and user selections
      $fieldset.change(function() {
            // todays date values
        var todayDate = new Date(),
            todayYear = todayDate.getFullYear(),
            todayMonth = todayDate.getMonth() + 1,
            todayDay = todayDate.getDate(),
            // currently selected values
            selectedYear = $year.val(),
            selectedMonth = $month.val(),
            selectedDay = $day.val(),
            // number of days in currently selected year/month
            actMaxDay = (new Date(selectedYear, selectedMonth, 0)).getDate(),
            // max values currently in the markup
            curMaxMonth = parseInt($month.children(":last").val()),
            curMaxDay = parseInt($day.children(":last").val());

        // Dealing with the number of days in a month
        // http://bugs.jquery.com/ticket/3041
        if (curMaxDay > actMaxDay) {
          while (curMaxDay > actMaxDay) {
            $day.children(":last").remove();
            curMaxDay--;
          }
        } else if (curMaxDay < actMaxDay) {
          while (curMaxDay < actMaxDay) {
            curMaxDay++;
            $day.append("<option value=" + curMaxDay + ">" + curMaxDay + "</option>");
          }
        }

        // Dealing with future months/days in current year
        if (!settings["futureDates"] && selectedYear == todayYear) {
          if (curMaxMonth > todayMonth) {
            while (curMaxMonth > todayMonth) {
              $month.children(":last").remove();
              curMaxMonth--;
            }
            // reset the day selection
            $day.children(":first").attr("selected", "selected");
          }
        }

        // Adding months back that may have been removed
        // http://bugs.jquery.com/ticket/3041
        if (selectedYear != todayYear && curMaxMonth != 12) {
          while (curMaxMonth < 12) {
            $month.append("<option value=" + (curMaxMonth+1) + ">" + months[settings["monthFormat"]][curMaxMonth] + "</option>");
            curMaxMonth++;
          }
        }

        // update the hidden date
        if ((selectedYear * selectedMonth * selectedDay) != 0) {
          hiddenDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
          $(this).find('#'+settings["fieldId"]).val(hiddenDate);
          if (settings["onChange"] != null) {
            settings["onChange"](hiddenDate);
          }
        }
      });
    });
  };
})( jQuery );
;
/**
 * Various utilities related to the login page.
 */

// TODO(benkomalo): do more on-the-fly client side validation of things like
// valid usernames or passwords

// Namespace
var Login = Login || {};

/**
 * Initializes the host login page. Note that most of the username/password
 * fields of the login page are hosted in an iframe so it can be sent
 * over https. Google/FB logins are in the outer container.
 */
Login.initLoginPage = function(options) {
    $("#login-facebook").click(function(e) {
        Login.connectWithFacebook(
            options["continueUrl"], true /* requireEmail */);
    });
};


/**
 * A base URL that represents the post login URL after a login.
 * This is needed by inner iframes that may be hosted on https
 * domains and need to forward the user to a normal http URL
 * after a successful login.
 */
Login.basePostLoginUrl;

/**
 * Initializes the inner contents (within the iframe) of the login
 * form.
 */
Login.initLoginForm = function(options) {
    Login.basePostLoginUrl = options["basePostLoginUrl"] || "";

    if ($("#identifier").val()) {
        // Email/username filled in from previous attempt.
        $("#password").focus();
    } else {
        $("#identifier").focus();
    }

    $("#submit-button").click(function(e) {
        e.preventDefault();
        Login.loginWithPassword();
    });
    $("#password").on("keypress", function(e) {
        if (e.keyCode === $.ui.keyCode.ENTER) {
            e.preventDefault();
            Login.loginWithPassword();
        }
    });
};

/**
 * Use Facebook's JS SDK to connect with Facebook.
 * @param {string} continueUrl The URL to redirect to after a successful login.
 * @param {boolean} requireEmail An optional parameter to indicate whether or
 *     not the user needs to grant extended permissions to our app so we
 *     can retrieve their e-mail address.
 */
Login.connectWithFacebook = function(continueUrl, requireEmail) {
    FacebookUtil.runOnFbReady(function() {
        // TODO(benkomalo): add some visual indicator that we're trying.
        var extendedPerms = requireEmail ? {"scope": "email"} : undefined;
        FB.login(function(response) {
            if (response) {
                FacebookUtil.fixMissingCookie(response);
            }

            if (response["status"] === "connected") {
                FacebookUtil.markUsingFbLogin();
                var url = continueUrl || "/";
                if (url.indexOf("?") > -1) {
                    url += "&fb=1";
                } else {
                    url += "?fb=1";
                }

                window.location = url;
            } else {
                // TODO(benkomalo): handle - the user didn't login properly in facebook.
            }
       }, extendedPerms);
    });
};

/**
 * Login with a username and password.
 */
Login.loginWithPassword = function() {
    // Hide any previous failed login notification after any other attempt.
    // Use "visibility" so as to avoid any jerks in the layout.
    $("#error-text").css("visiblity", "hidden");

    // Pre-validate.
    if (Login.ensureValid_("#identifier", "Email or username required") &&
            Login.ensureValid_("#password", "Password required")) {
        Login.asyncFormPost(
                $("#login-form"),
                function(data) {
                    // Server responded with 200, but login may have failed.
                    if (data["errors"]) {
                        Login.onPasswordLoginFail(data["errors"]);
                    } else {
                        Login.onPasswordLoginSuccess(data);
                        // Don't re-enable the login button as we're about
                        // to refresh the page.
                    }
                },
                function(data) {
                    // Hard failure - server is inaccessible or having issues
                    // TODO(benkomalo): handle
                });
    }
};

Login.submitDisabled_ = false;
Login.navigatingAway_ = false;

/**
 * Disables form submit on a login attempt, to prevent duplicate tries.
 */
Login.disableSubmit_ = function() {
    $("#submit-button").attr("disabled", true);
    Login.submitDisabled_ = true;
};

/**
 * Restores form submission ability, usually after a response from a server
 * from a login/signup attempt.
 */
Login.enableSubmit_ = function() {
    $("#submit-button").removeAttr("disabled");
    Login.submitDisabled_ = false;
};

/**
 * Handle a failed attempt at logging in with a username/password.
 */
Login.onPasswordLoginFail = function(errors) {
    var text;
    if (errors["badlogin"]) {
        text = "Your login or password is incorrect.";
    } else {
        // Unexpected error. This shouldn't really happen but
        // just in case...
        text = "Error logging in. Please try again.";
    }

    $("#error-text").text(text).css("visibility", "");
    $("#password").focus();
};

/**
 * Handle a successful login response, which includes auth data.
 * This will cause the page to fully reload to a /postlogin URL
 * generated by the server containing the new auth token which will be
 * set as a cookie.
 */
Login.onPasswordLoginSuccess = function(data) {
    var auth = data["auth"];
    var continueUri = data["continue"] || "/";
    window.top.location.replace(
            Login.basePostLoginUrl +
            "postlogin?continue=" + encodeURIComponent(continueUri) +
            "&auth=" + encodeURIComponent(auth));

    Login.navigatingAway_ = true;
};

/**
 * Validates a field in a login/signup form and displays an error on failure
 * on $("error-text").
 * If validation fails, the field will automatically be focused.
 */
Login.ensureValid_ = function(
        selector, errorText, checkFunc) {
    // By default - check that it's not just empty whitespace.
    checkFunc = checkFunc || function() {
        var value = $(selector).val();
        return !!$.trim(value);
    };
    if (!checkFunc()) {
        $("#error-text").text(errorText);
        $(selector).focus();
        return false;
    }

    // Include whitespace so that empty/non-empty values don't affect layout.
    $("#error-text").html("&nbsp;");
    return true;
};

/**
 * Submits a form in the background via a hidden iframe.
 * Only one form may be in flight at a time, since only a single iframe
 * is used.
 *
 * This is useful so that the page doesn't have to navigate away and we can
 * handle errors more gracefully.
 *
 * Note that this is quite crude and makes no guarantees about history
 * state (on most browsers, each request will likely create a history entry).
 */
Login.asyncFormPost = function(jelForm, success, error) {
    if (Login.submitDisabled_) {
        return;
    }

    Login.disableSubmit_();
    $.ajax({
        "type": "POST",
        "url": jelForm.prop("src"),
        "data": jelForm.serialize(),
        "dataType": "json",
        "success": success,
        "error": error,
        "complete": function() {
            if (!Login.navigatingAway_) {
                Login.enableSubmit_();
            }
        }
    });
};
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["login-package_signup-success"]=a(function(a,b,c,d,e){function l(a,b){return"re-"}function m(a,b){return"\n                Check your spam folder if the message doesn't arrive in your inbox soon.\n            "}function n(a,b){return"\n                Follow the link in that message to create your Khan Academy username and password.\n            "}function o(a,b){var d="",e,f;return d+='\n        <div class="debug">token for debugging: <a href="/completesignup?token=',f=c.token,f?e=f.call(a,{hash:{}}):(e=a.token,e=typeof e===i?e():e),d+=j(e)+'">',f=c.token,f?e=f.call(a,{hash:{}}):(e=a.token,e=typeof e===i?e():e),d+=j(e)+"</a></div>\n        ",d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="signup-success-dialog modal fade hide">\n    <div class="modal-body">\n        <h3 class="email-header">We\'ve ',g=b.resendDetected,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='sent you a message at</h3>\n        <div class="email">',h=c.email,h?g=h.call(b,{hash:{}}):(g=b.email,g=typeof g===i?g():g),f+=j(g)+'</div>\n\n        <img src="/images/hand-tree.gif" class="tree">\n        <div class="instructions">\n            ',g=b.resendDetected,g=c["if"].call(b,g,{hash:{},inverse:k.program(5,n,e),fn:k.program(3,m,e)});if(g||g===0)f+=g;f+="\n        </div>\n\n        ",g=b.token,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(7,o,e)});if(g||g===0)f+=g;return f+="\n    </div>\n</div>\n",f})})();
/**
 * Logic to handle the signup page (the page where a user may enter her e-mail
 * and get an e-mail to verify ownership of the address).
 */


/**
 * Entry point for initial signup page setup.
 */
Login.initSignupPage = function() {
    if (readCookie("u13")) {
        // User has the under-13 session cookie set - redirect.
        // This codepath will be most commonly hit if the user presses
        // the back button from the under-13 page.
        window.location.href = "/signup?under13=1";
        return;
    }

    $("#login-facebook").click(function(e) {
        Login.connectWithFacebook(
                "/postlogin?completesignup=1",
                true /* requireEmail */);
    });

    var dateData = $("#birthday-picker").data("date");
    var defaultDate;
    if (dateData) {
        var parts = dateData.split("-");
        if (parts.length === 3) {
            var year = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10) - 1;
            var date = parseInt(parts[2], 10);
            if (!isNaN(year + month + date)) {
                defaultDate = new Date(year, month, date);
            }
        }
    }
    if (!defaultDate) {
        // Jan 1, 13 years ago
        defaultDate = new Date(new Date().getFullYear() - 13, 0, 1);
    }

    $("#birthday-picker").birthdaypicker({
        placeholder: false,
        classes: "simple-input ui-corner-all login-input",
        defaultDate: defaultDate
    });

    $("#email").focus().on("keypress", function(e) {
        if (e.keyCode === $.ui.keyCode.ENTER) {
            e.preventDefault();
            Login.submitSignup();
        }
    });

    $("#submit-button").click(function(e) {
        // Prevent direct form submission since we'll POST the data manually.
        e.preventDefault();
        Login.submitSignup();
    });
};

/**
 * Submits the signup attempt if it passes pre-checks.
 */
Login.submitSignup = function() {
    if (Login.submitDisabled_) {
        return;
    }

    // TODO(benkomalo): fix this at the bday-picker level.
    // "change" events aren't entirely reliable, and the bday-picker code
    // is prone to a bug where it doesn't properly update the hidden
    // field value in some cases on blur. Force a change prior to signup
    // so that the value is correct
    $("fieldset.birthday-picker").trigger("change");

    // Success!
    if (Login.ensureValid_("#email", "Email required")) {
        var data = $("#signup-form").serialize();
        $.ajax({
            "type": "POST",
            "url": $("#signup-form").prop("action"),
            "data": data,
            "dataType": "json",
            "success": function(data) {
                Login.handleSignupResponse(data);
            },
            "error": function() {
                // TODO(benkomalo): handle
            }
        });
    }
};


/**
 * Handles a response from the server for the signup attempt.
 */
Login.handleSignupResponse = function(data) {
    if (data["under13"]) {
        window.location.href = "/signup?under13=1";
        return;
    }

    var errors = data["errors"] || {};
    if (_.isEmpty(errors)) {
        // Success!
        var template = Templates.get("login.signup-success");
        var dialogEl = $(template({
                email: data["email"],
                resendDetected: data["resendDetected"],

                // On dev servers, the token is sent back down for easy
                // debugging. This is obviously not available on prod.
                token: data["token"]
            }))
            .appendTo($(document.body))
            .modal({
                backdrop: "static",
                show: true
            });
        Login.disableSubmit_();
    } else {
        // Only the e-mail can fail on a server side response from this
        // form.
        $("#error-text").text(errors["email"]);
    }
};

;
/**
 * Logic to deal with with step 2 of the signup process, asking the user
 * for additional information like password and username (after
 * having verified her e-mail address already).
 */

/**
 * Initializes the form for completing the signup process
 */
Login.initCompleteSignupForm = function(options) {
    Login.basePostLoginUrl = options["basePostLoginUrl"] || "";

    var firstEmpty = _.find(
            [$("#nickname"), $("#gender"), $("#username"), $("#password")],
            function(jel) {
                return !jel.val() || jel.val() === "unspecified";
            });

    if (firstEmpty) {
        firstEmpty.focus();
    }

    $("#password").on("keypress", function(e) {
        if (e.keyCode === $.ui.keyCode.ENTER) {
            e.preventDefault();
            Login.submitCompleteSignup();
        }
    });

    $("#submit-button").click(function(e) {
        e.preventDefault();
        Login.submitCompleteSignup();
    });
};

/**
 * Submits the complete signup attempt if it passes pre-checks.
 */
Login.submitCompleteSignup = function() {
    var valid = Login.ensureValid_("#nickname", "Please tell us your name.") &&
            Login.ensureValid_("#username", "Please pick a username.") &&
            Login.ensureValid_("#password", "We need a password from you.");

    if (valid) {
        Login.asyncFormPost(
                $("#signup-form"),
                function(data) {
                    // 200 success, but the signup may have failed.
                    if (data["errors"]) {
                        Login.onCompleteSignupError(data["errors"]);
                    } else {
                        Login.onCompleteSignupSucess(data);
                    }
                },
                function(data) {
                    // Hard fail - can't seem to talk to server right now.
                    // TODO(benkomalo): handle.
                });
    }
};

/**
 * Handles a success response to the POST to complete the signup.
 * This will cause the page to refresh and to set the auth cookie.
 */
Login.onCompleteSignupSucess = function(data) {
    Login.onPasswordLoginSuccess(data);
};

/**
 * Handles an error from the server on an attempt to complete
 * the signup - there was probably invalid data in the forms.
 */
Login.onCompleteSignupError = function(errors) {
    var firstFailed = _.find(
            ["nickname", "username", "password"],
            function(fieldName) {
                return fieldName in errors;
            });
    if (!firstFailed) {
        // Shouldn't happen, but just in case we get unknown errors.
        $("#error-text").text("Oops. Something went wrong. Please try again.");
        return;
    }

    // Only show the first failed message and focus to it.
    $("#error-text").text(errors[firstFailed]);
    $("#" + firstFailed).focus();
};

;

/**
 * Utilities for changing a user's password.
 * This is intended to be used in a minimal form, usually in an iframe.
 */
var Settings = {

    init: function() {
        $("#password2").on(
                "keypress",
                function(e) {
                    if (e.keyCode === $.ui.keyCode.ENTER) {
                        e.preventDefault();
                        Settings.submitForm_();
                    }
                });

        // Focus on the first empty field (existing password on normal pw
        // changes, the first password on pw resets)
        if ($("#existing").get(0)) {
            $("#existing").focus();
        } else {
            $("#password1").focus();
        }

        $("#submit-settings").click(_.bind(Settings.onClickSubmit_, Settings));
    },

    onClickSubmit_: function(e) {
        e.preventDefault();
        this.submitForm_();
    },

    submitForm_: function() {
        if (!this.validate_()) {
            return;
        }

        $("#submit-settings")
            .val("Submitting...")
            .prop("disabled", true);

        // We can't use $.ajax to send - we have to actually do a form POST
        // since the requirement of sending over https means we'd
        // break same-origin policies of browser XHR's
        $("#pw-change-form")
            .find("#continue")
                .val(window.location.href)
                .end()
            .submit();
    },

    // Must be consistent with what's on the server in auth/passwords.py
    MIN_PASSWORD_LENGTH: 8,

    validate_: function() {
        var password1 = $("#password1").val();
        var password2 = $("#password2").val();

        // Check basic length.
        if (password1.length < Settings.MIN_PASSWORD_LENGTH) {
            $(".message-container").addClass("error").text("The new password is too short");
            $("#password1").focus();
            return false;

        // Check matching.
        } else if (password2 !== password1) {
            $(".message-container").addClass("error").text("The passwords don't match");
            $("#password1").focus();
            return false;
        }

        // We're good!
        $(".message-container").text("");
        return true;
    }
};
