var StudentLists = {
Data: {
students: null,
studentsById: null,
studentsByEmail: null,
studentLists: null,
studentListsById: null,
coachRequests: null,
init: function() {
this.generateListIndices(), this.generateStudentIndices();
},
isStudentInList: function(a, b) {
var c = this.studentsById[a];
return $.grep(c.studentLists, function(a, c) {
return a.key == b;
}).length !== 0;
},
addList: function(a) {
this.studentLists.push(a), this.studentListsById[a.key] = a;
},
removeList: function(a) {
$.each(this.students, function(b, c) {
StudentLists.Data.removeStudentFromList(c, a);
}), this.studentLists = $.grep(this.studentLists, function(b) {
return b.key != a;
}), this.generateListIndices();
},
removeStudent: function(a) {
var b = this.students.indexOf(a);
b != -1 && this.students.splice(b, 1), this.generateStudentIndices();
},
removeStudentFromList: function(a, b) {
a.studentLists = $.grep(a.studentLists, function(a) {
return a.key != b;
});
},
addStudentToList: function(a, b) {
a.studentLists.push(this.studentListsById[b]);
},
generateListIndices: function() {
this.studentListsById = _.indexBy(StudentLists.Data.studentLists, "key");
},
generateStudentIndices: function() {
this.studentsById = _.indexBy(StudentLists.Data.students, "key"), this.studentsByEmail = _.indexBy(StudentLists.Data.students, "email");
}
},
currentList: null,
init: function() {
StudentLists.Data.init(), AddStudentTextBox.init(), AddStudentToListTextBox.init(), EditListsMenu.init(), AddListTextBox.init(), $(".bullet").click(StudentLists.listClick), $(".student-row .delete-button").click(StudentLists.deleteStudentClick), $(".alert .close-button").click(function(a) {
a.preventDefault(), $(a.target).parents(".alert").fadeOut();
}), $("#student-list-allstudents a").click();
},
deleteStudentClick: function(a) {
a.preventDefault();
var b = $(a.currentTarget).parents(".student-row"), c = b.data("student_id"), d = StudentLists.Data.studentsById[c];
if (StudentLists.currentList == "allstudents") {
var e = confirm("Are you sure you want to stop coaching this student?");
e && ($.ajax({
type: "GET",
url: "/unregisterstudent",
data: {
email: d.email
}
}), StudentLists.Data.removeStudent(d), $(".student-row[data-student_id=" + d.key + "]").fadeOut(400, function() {
$(this).remove();
}), StudentLists.redrawListView());
} else if (StudentLists.currentList == "requests") {
var f = b.data("email");
$.ajax({
type: "GET",
url: "/acceptcoach",
data: {
accept: 0,
email: f
}
}), StudentLists.Data.coachRequests = $.grep(StudentLists.Data.coachRequests, function(a) {
return a != f;
}), b.remove(), StudentLists.redrawListView();
} else {
var g = StudentLists.currentList;
EditListsMenu.removeStudentFromListAjax(d, g);
}
},
listClick: function(a) {
a.preventDefault();
var b = $(a.currentTarget), c = b.closest("li").data("list_id");
if (c == StudentLists.currentList) return;
StudentLists.currentList = c, $(".bullet-active").removeClass("bullet-active"), b.addClass("bullet-active"), StudentLists.redrawListView();
},
redrawListView: function() {
var a = 0, b, c, d = "student";
if (StudentLists.currentList == "requests") $("#actual-students").hide(), $("#requested-students").show(), a = $("#requested-students .student-row").length, $("#empty-class").show(), b = "Requests", $(".students-header h2 a").removeAttr("href"), $("#delete-list").hide(), d = "potential student"; else {
$("#requested-students").hide(), $("#actual-students").show();
if (StudentLists.currentList == "allstudents") {
var e = $("#actual-students .student-row");
e.show(), a = e.length, b = "All students", c = "/class_profile", $("#delete-list").hide(), StudentLists.Data.students.length === 0 ? $("#empty-class").show() : $("#empty-class").hide();
} else {
$("#actual-students .student-row").each(function() {
var b = $(this), c = b.data("student_id");
StudentLists.Data.isStudentInList(c, StudentLists.currentList) ? (b.show(), a++) : b.hide(), $("#empty-class").hide();
});
var f = StudentLists.Data.studentListsById[StudentLists.currentList];
b = f.name, c = "/class_profile?list_id=" + f.key, $("#delete-list").show();
}
}
StudentLists.currentList == "requests" || StudentLists.currentList == "allstudents" ? (AddStudentTextBox.jElement.show(), AddStudentToListTextBox.jElement.hide()) : (AddStudentTextBox.jElement.hide(), AddStudentToListTextBox.jElement.show());
var g = a.toString() + " " + d + (a == 1 ? "" : "s");
$("#nstudents").text(g), $(".students-header h2 a").text(b).attr("href", c);
}
}, AddListTextBox = {
jElement: null,
jNewListElement: null,
init: function() {
this.jElement = $("#newlist-box").keypress(function(a) {
a.which == "13" && (a.preventDefault(), AddListTextBox.createList(a));
}).keyup(function(a) {
a.which == "27" && AddListTextBox.hide();
}), $("#newlist-ok").click(function(a) {
AddListTextBox.createList(a);
}), $("#newlist-cancel").click(function(a) {
AddListTextBox.hide();
}), $("#newlist-button").click(function(a) {
a.stopPropagation(), a.preventDefault(), $("#newlist-div").show(), $("#newlist-button").hide(), AddListTextBox.jElement.focus();
}), $("#newlist-div").hide(), $("#delete-list").click(this.deleteList);
},
createList: function(a) {
var b = this.jElement.val();
if (!b) {
this.hide();
return;
}
this.jElement.attr("disabled", "disabled"), Throbber.show(this.jElement), $.ajax({
type: "POST",
url: "/api/v1/user/studentlists",
data: {
list_name: b
},
dataType: "json",
success: function(a, b, c) {
var d = a;
StudentLists.Data.addList(d);
var e = $('<li data-list_id="' + d.key + '"><a href="students?list_id=' + d.key + '" class="bullet">' + d.name + "</a></li>");
$("#custom-lists").append(e), e.find("a").click(StudentLists.listClick);
},
complete: function() {
Throbber.hide(), AddListTextBox.hide();
}
});
},
hide: function() {
AddListTextBox.jElement.val("").removeAttr("disabled"), $("#newlist-div").hide(), $("#newlist-button").show().focus();
},
deleteList: function(a) {
a.preventDefault(), StudentLists.currentList != "allstudents" && StudentLists.currentList != "requests" && ($.ajax({
type: "DELETE",
url: "/api/v1/user/studentlists/" + StudentLists.currentList
}), $("#custom-lists li[data-list_id=" + StudentLists.currentList + "]").remove(), StudentLists.Data.removeList(StudentLists.currentList), $("#student-list-allstudents a").click());
}
}, AddStudentTextBox = {
jElement: null,
init: function() {
this.jElement = $("#request-student").keypress(function(a) {
if (a.which == "13") {
var b = AddStudentTextBox.jElement.val();
Throbber.show(AddStudentTextBox.jElement), $.ajax({
type: "POST",
url: "/requeststudent",
data: {
email: b
},
success: function(a, c, d) {
StudentLists.Data.coachRequests.push(b), AddStudentTextBox.jElement.val(""), $("#tmpl .student-row").clone().data("email", b).find(".student-name").text(b).end().hide().prependTo("#requested-students").find(".delete-button").click(StudentLists.deleteStudentClick).end().fadeIn(), $("#student-list-requests a").click();
},
error: function(a) {
$("#addstudent-error").slideDown();
},
complete: function() {
Throbber.hide();
}
});
}
}).placeholder();
}
}, AddStudentToListTextBox = {
jElement: null,
init: function() {
this.jElement = $("#add-to-list").keypress(function(a) {
a.which == "13" && (a.preventDefault(), AddStudentToListTextBox.addStudent(a));
}).placeholder().autocomplete({
source: AddStudentToListTextBox.generateSource(),
select: function(a, b) {
AddStudentToListTextBox.addStudent(a, b);
}
}), this.jElement.data("autocomplete").menu.select = function(a) {
this._trigger("selected", a, {
item: this.active
});
};
},
generateSource: function() {
return $.map(StudentLists.Data.students, function(a, b) {
return {
label: a.nickname + " (" + a.email + ")",
value: a.email
};
});
},
updateSource: function() {
this.jElement.data("autocomplete").options.source = this.generateSource(), this.jElement.data("autocomplete")._initSource();
},
addStudent: function(a, b) {
var c;
b ? (c = b.item.value, a.preventDefault()) : c = this.jElement.val();
var d = StudentLists.Data.studentsByEmail[c], e = StudentLists.currentList;
EditListsMenu.addStudentToListAjax(d, e), this.jElement.val("");
}
}, EditListsMenu = {
init: function() {
$(".lists-css-menu > ul > li").click(function(a) {
EditListsMenu.addChildrenToDropdown(a);
}), $(".lists-css-menu .list-option-newlist").click(function(a) {
setTimeout(function() {
$("#newlist-button").click();
}, 50);
});
},
addChildrenToDropdown: function(a) {
if (a.target != a.currentTarget) return !0;
var b = $(a.currentTarget), c = b.find("ul");
c.length === 0 && (c = $("<ul></ul>"), b.append(c)), c.children(".list-option").remove();
var d = c.children("li");
$.each(StudentLists.Data.studentLists, function(a, c) {
var e = $('<li class="list-option"><label><input type="checkbox">' + c.name + "</label></li>"), f = e.find("input"), g = b.closest(".student-row").data("student_id");
StudentLists.Data.isStudentInList(g, c.key) && f.attr("checked", !0), d.before(e), f.click(EditListsMenu.itemClick).data("student-list", c);
});
var e = c.height();
if (e > $(".push").height()) {
var f = 30;
$(".push").css("height", e + f + "px");
}
},
itemClick: function(a) {
var b = $(a.currentTarget), c = b.data("student-list"), d = b.closest(".student-row").data("student_id"), e = StudentLists.Data.studentsById[d];
b.get(0).checked ? EditListsMenu.addStudentToListAjax(e, c.key) : EditListsMenu.removeStudentFromListAjax(e, c.key);
},
addStudentToListAjax: function(a, b) {
$.ajax({
type: "POST",
url: "/addstudenttolist",
data: {
email: a.email,
list_id: b
}
}), StudentLists.Data.addStudentToList(a, b), StudentLists.currentList == b && $(".student-row[data-student_id=" + a.key + "]").fadeIn();
},
removeStudentFromListAjax: function(a, b) {
$.ajax({
type: "POST",
url: "/removestudentfromlist",
data: {
email: a.email,
list_id: b
}
}), StudentLists.Data.removeStudentFromList(a, b), StudentLists.currentList == b && $(".student-row[data-student_id=" + a.key + "]").fadeOut();
}
}, ClassProfile = {
version: 0,
fLoadingGraph: !1,
fLoadedGraph: !1,
init: function() {
Highcharts.setOptions({
credits: {
enabled: !1
},
title: {
text: ""
},
subtitle: {
text: ""
}
}), $.address && ($.address.value() === "/" && (window.location = window.location + "#" + $(".graph-link:eq(0)").attr("href")), $.address.change(function(a) {
$.address.path() !== "/" && ClassProfile.historyChange(a);
})), $(".graph-link").click(function(a) {
a.preventDefault();
if ($.address) {
var b = $(this).attr("href"), c = b.split("?")[0];
if (c !== $.address.path()) $.address.path(c); else {
var d = {};
_.map($.address.parameterNames(), function(a) {
d[a] = $.address.parameter(a);
});
var e = ClassProfile.parseQueryString(b);
$.extend(d, e), $.address.queryString(ClassProfile.reconstructQueryString(d));
}
}
}), $(".lte8 .goals-accordion-content").remove(), $("#stats-nav #nav-accordion").accordion({
header: ".header",
active: ".graph-link-selected",
autoHeight: !1,
clearStyle: !0
}), setTimeout(function() {
!ClassProfile.fLoadingGraph && !ClassProfile.fLoadedGraph && ClassProfile.historyChange();
}, 1e3), ClassProfile.ProgressSummaryView = new ProgressSummaryView, $("#studentlists_dropdown").css("display", "inline-block");
var a = $("#studentlists_dropdown ol");
if (a.length > 0) {
var b = a.menu();
b.width(b.width()).hide().css("position", "absolute"), b.bind("menuselect", this.updateStudentList), $(document).bind("click focusin", function(a) {
$(a.target).closest("#studentlists_dropdown").length == 0 && b.hide();
});
var c = $("#studentlists_dropdown > a").button({
icons: {
secondary: "ui-icon-triangle-1-s"
}
}).show().click(function(a) {
b.css("display") == "none" ? b.show().menu("activate", a, $("#studentlists_dropdown li[data-selected=selected]")).focus() : b.hide(), a.preventDefault();
}), d = a.children("li[data-selected=selected]").data("list_id"), e = ClassProfile.getStudentListFromId(d);
a.data("selected", e);
}
},
collapseAccordion: function() {
$("#stats-nav #nav-accordion").accordion("option", "collapsible", !0).accordion("activate", !1).accordion("option", "collapsible", !1);
},
baseGraphHref: function(a) {
var b = /^\w[\w\d+-.]*:\/\//, c = a.match(b);
c && (a = a.substring(c[0].length));
var d = a.indexOf("/");
d > -1 && (a = a.substring(a.indexOf("/")));
var e = a.indexOf("?");
return e > -1 && (a = a.substring(0, e)), a;
},
expandAccordionForHref: function(a) {
if (!a) return !1;
a = this.baseGraphHref(a).replace(/[<>']/g, ""), a = a.replace(/[<>']/g, "");
var b = ".graph-link-header[href*='" + a + "']";
return $(b).length ? ($("#stats-nav #nav-accordion").accordion("activate", b), !0) : (this.collapseAccordion(), !1);
},
styleSublinkFromHref: function(a) {
if (!a) return;
var b = /dt_start=[^&]+/, c = a.match(b), d = c ? c[0] : "dt_start=lastweek";
a = a.replace(/[<>']/g, ""), $(".graph-sub-link").removeClass("graph-sub-link-selected"), $(".graph-sub-link[href*='" + this.baseGraphHref(a) + "'][href*='" + d + "']").addClass("graph-sub-link-selected");
},
loadGraphFromLink: function(a) {
if (!a) return;
ClassProfile.loadGraphStudentListAware(a.href);
},
loadGraphStudentListAware: function(a) {
var b = $("#studentlists_dropdown ol");
if (b.length == 1) {
var c = b.data("selected").key, d = this.parseQueryString(a);
d.list_id = c, d.version = ClassProfile.version, d.dt = $("#targetDatepicker").val(), a = this.baseGraphHref(a) + "?" + this.reconstructQueryString(d);
}
this.loadGraph(a);
},
loadFilters: function(a) {
var b = $('#stats-filters a[href^="' + a + '"]').parent();
$("#stats-filters .filter:visible").not(b).slideUp("slow"), b.slideDown();
},
loadGraph: function(a, b) {
var c = {
"/api/v1/user/students/goals": this.renderStudentGoals,
"/api/v1/user/students/progressreport": ClassProfile.renderStudentProgressReport,
"/api/v1/user/students/progress/summary": this.ProgressSummaryView.render
};
if (!a) return;
if (this.fLoadingGraph) {
setTimeout(function() {
ClassProfile.loadGraph(a);
}, 200);
return;
}
this.styleSublinkFromHref(a), this.fLoadingGraph = !0, this.fLoadedGraph = !0;
var d = null;
for (var e in c) a.indexOf(e) > -1 && (d = c[e]);
$.ajax({
type: "GET",
url: Timezone.append_tz_offset_query_param(a),
data: {},
dataType: d ? "json" : "html",
success: function(c) {
ClassProfile.finishLoadGraph(c, a, b, d);
},
error: function() {
ClassProfile.finishLoadGraphError();
}
}), $("#graph-content").html(""), this.showGraphThrobber(!0);
},
finishLoadGraph: function(a, b, c, d) {
this.fLoadingGraph = !1, !!c, this.showGraphThrobber(!1), this.styleSublinkFromHref(b);
var e = (new Date).getTime();
d ? d(a, b) : $("#graph-content").html(a);
var f = (new Date).getTime() - e;
KAConsole.log("API call rendered in " + f + " ms.");
},
finishLoadGraphError: function() {
this.fLoadingGraph = !1, this.showGraphThrobber(!1), $("#graph-content").html("<div class='graph-notification'>It's our fault. We ran into a problem loading this graph. Try again later, and if this continues to happen please <a href='/reportissue?type=Defect'>let us know</a>.</div>");
},
historyChange: function(a) {
var b = $.address.value() === "/" ? this.initialGraphUrl : $.address.value(), c = $.address.path() === "/" ? this.initialGraphUrl : $.address.path();
if (b) if (this.expandAccordionForHref(b)) this.loadGraph(b, !0), this.loadFilters(c); else {
var d = $(".graph-link");
d.length && ClassProfile.loadGraphFromLink(d[0]);
}
},
showGraphThrobber: function(a) {
a ? $("#graph-progress-bar").progressbar({
value: 100
}).slideDown("fast") : $("#graph-progress-bar").slideUp("fast", function() {
$(this).hide();
});
},
parseQueryString: function(a) {
var b = {}, c = a.split("?");
if (c.length == 2) {
var d = c[1].split("&");
for (var e = 0; e < d.length; e++) {
var f = d[e].split("=");
f[0].length > 0 && (key = decodeURIComponent(f[0]), value = decodeURIComponent(f[1]), b[key] = value);
}
}
return b;
},
reconstructQueryString: function(a, b, c) {
b = b || "=", c = c || "&", qs = [];
for (var d in a) a.hasOwnProperty(d) && qs.push(d + b + a[d]);
return qs.join(c);
},
getStudentListFromId: function(a) {
var b;
return jQuery.each(this.studentLists, function(c, d) {
if (d.key == a) return b = d, !1;
}), b;
},
updateStudentList: function(a, b) {
var c = $("#studentlists_dropdown ol");
c.children("li[data-selected=selected]").removeAttr("data-selected"), $(b.item).attr("data-selected", "selected");
var d = ClassProfile.getStudentListFromId(b.item.data("list_id"));
c.data("selected", d), $.address.parameter("list_id", b.item.data("list_id")), $("#studentlists_dropdown .ui-button-text").text(d.name), c.hide(), $("#count_students").html("&hellip;"), $("#energy-points .energy-points-badge").html("&hellip;");
},
updateStudentInfo: function(a, b) {
$("#count_students").text(a + ""), typeof b != "string" && (b = addCommas(b)), $("#energy-points .energy-points-badge").text(b);
},
renderStudentProgressReport: function(a, b) {
ClassProfile.updateStudentInfo(a.exercise_data.length, a.c_points), $.each(a.exercise_names, function(a, b) {
b.display_name_lower = b.display_name.toLowerCase(), b.idx = a;
}), a.exercise_list = [], $.each(a.exercise_data, function(b, c) {
a.exercise_list.push(c);
}), a.exercise_list.sort(function(a, b) {
return a.nickname < b.nickname ? -1 : b.nickname < a.nickname ? 1 : 0;
}), $.each(a.exercise_list, function(b, c) {
c.idx = b, c.nickname_lower = c.nickname.toLowerCase(), $.each(c.exercises, function(b, d) {
d.exercise_display = a.exercise_names[b].display_name, d.progress = (d.progress * 100).toFixed(0), d.link = c.profile_root + "/vital-statistics/problems/" + a.exercise_names[b].name, d.last_done ? d.seconds_since_done = ((new Date).getTime() - Date.parse(d.last_done)) / 1e3 : d.seconds_since_done = 1e6, d.status_css = "transparent", d.status == "Review" ? d.status_css = "review light" : d.status.indexOf("Proficient") == 0 ? d.status_css = "proficient" : d.status == "Struggling" ? d.status_css = "struggling" : d.status == "Started" && (d.status_css = "started"), d.notTransparent = d.status_css != "transparent", d.idx = b;
});
});
var c = Templates.get("studentlists.class-progress-report");
$("#graph-content").html(c(a)), ProgressReport.init(a);
}
};

_.extend(ClassProfile, {
renderStudentGoals: function(a, b) {
var c = {
rowData: [],
sortDesc: "",
filterDesc: "",
colors: "goals-class"
};
$.each(a, function(a, b) {
b.goal_count = 0, b.most_recent_update = null, b.profile_url = b.profile_root + "goals", b.goals != undefined && b.goals.length > 0 ? $.each(b.goals, function(a, d) {
var e = 0, f = !1;
d.objectiveWidth = 100 / d.objectives.length, d.objectives.sort(function(a, b) {
return b.progress - a.progress;
}), $.each(d.objectives, function(a, c) {
Goal.calcObjectiveDependents(c, d.objectiveWidth);
if (c.status == "proficient") e += 1e3; else if (c.status == "started" || c.status == "struggling") e += 1;
c.status == "struggling" && (f = !0, c.struggling = !0), c.statusCSS = c.status ? c.status : "not-started", c.objectiveID = a;
var g = b.profile_root + "vital-statistics";
c.type === "GoalObjectiveExerciseProficiency" ? c.url = g + "/problems/" + c.internal_id : c.type === "GoalObjectiveAnyExerciseProficiency" ? c.url = g + "/skill-progress" : c.url = g + "/activity";
}), d.objectives.length && (e /= d.objectives.length);
if (!b.most_recent_update || d.updated > b.most_recent_update) b.most_recent_update = d;
b.goal_count++, row = {
rowID: c.rowData.length,
student: b,
goal: d,
progress_count: e,
goal_idx: b.goal_count,
struggling: f
}, $.each(d.objectives, function(a, b) {
b.row = row;
}), c.rowData.push(row);
}) : c.rowData.push({
rowID: c.rowData.length,
student: b,
goal: {
objectives: []
},
progress_count: -1,
goal_idx: 0,
struggling: !1
});
});
var d = Templates.get("studentlists.class-goals");
$("#graph-content").html(d(c)), $("#class-student-goal .goal-row").each(function() {
var a = c.rowData[$(this).attr("data-id")];
a.rowElement = this, a.countElement = $(this).find(".goal-count"), a.startTimeElement = $(this).find(".goal-start-time"), a.updateTimeElement = $(this).find(".goal-update-time"), Profile.hoverContent($(this).find(".objective")), $(this).find("a.objective").each(function() {
var b = a.goal.objectives[$(this).attr("data-id")];
b.blockElement = this, b.type == "GoalObjectiveExerciseProficiency" && $(this).click(function() {
window.location = a.student.profile_root + "/vital-statistics/problems/" + b.internal_id;
});
});
}), $("#student-goals-sort").off("change.goalsfilter").on("change.goalsfilter", function() {
ClassProfile.sortStudentGoals(c);
}), $("input.student-goals-filter-check").off("change.goalsfilter").on("change.goalsfilter", function() {
ClassProfile.filterStudentGoals(c);
}), $("#student-goals-search").off("keyup.goalsfilter").on("keyup.goalsfilter", function() {
ClassProfile.filterStudentGoals(c);
}), ClassProfile.sortStudentGoals(c), ClassProfile.filterStudentGoals(c);
},
sortStudentGoals: function(a) {
var b = $("#student-goals-sort").val(), c = !1;
b == "name" ? (a.rowData.sort(function(a, b) {
return b.student.nickname > a.student.nickname ? -1 : b.student.nickname < a.student.nickname ? 1 : a.goal_idx - b.goal_idx;
}), a.sortDesc = "student name", c = !1) : b == "progress" ? (a.rowData.sort(function(a, b) {
return b.progress_count - a.progress_count;
}), a.sortDesc = "goal progress", c = !0) : b == "created" ? (a.rowData.sort(function(a, b) {
if (a.goal && !b.goal) return -1;
if (b.goal && !a.goal) return 1;
if (a.goal && b.goal) {
if (b.goal.created > a.goal.created) return 1;
if (b.goal.created < a.goal.created) return -1;
}
return 0;
}), a.sortDesc = "goal creation time", c = !1) : b == "updated" && (a.rowData.sort(function(a, b) {
if (a.goal && !b.goal) return -1;
if (b.goal && !a.goal) return 1;
if (a.goal && b.goal) {
if (b.goal.updated > a.goal.updated) return 1;
if (b.goal.updated < a.goal.updated) return -1;
}
return 0;
}), a.sortDesc = "last work logged time", c = !0);
var d = $("#class-student-goal").detach();
$.each(a.rowData, function(a, b) {
$(b.rowElement).detach(), $(b.rowElement).appendTo(d), c ? (b.startTimeElement.hide(), b.updateTimeElement.show()) : (b.startTimeElement.show(), b.updateTimeElement.hide());
}), d.insertAfter("#class-goal-filter-desc"), ClassProfile.updateStudentGoalsFilterText(a);
},
updateStudentGoalsFilterText: function(a) {
var b = "Sorted by " + a.sortDesc + ". " + a.filterDesc + ".";
$("#class-goal-filter-desc").html(b);
},
filterStudentGoals: function(a) {
var b = $.trim($("#student-goals-search").val().toLowerCase()), c = {};
$("input.student-goals-filter-check").each(function(a, b) {
c[$(b).attr("name")] = $(b).is(":checked");
}), a.filterDesc = "", c["most-recent"] && (a.filterDesc += "most recently worked on goals"), c["in-progress"] && (a.filterDesc != "" && (a.filterDesc += ", "), a.filterDesc += "goals in progress"), c.struggling && (a.filterDesc != "" && (a.filterDesc += ", "), a.filterDesc += "students who are struggling"), b != "" && (a.filterDesc != "" && (a.filterDesc += ", "), a.filterDesc += 'students/goals matching "' + b + '"'), a.filterDesc != "" ? a.filterDesc = "Showing only " + a.filterDesc : a.filterDesc = "No filters applied";
var d = $("#class-student-goal").detach();
$.each(a.rowData, function(a, d) {
var e = !0;
c["most-recent"] && (e = e && (!d.goal || d.goal == d.student.most_recent_update)), c["in-progress"] && (e = e && d.goal && d.progress_count > 0), c.struggling && (e = e && d.struggling), e && (b == "" || d.student.nickname.toLowerCase().indexOf(b) >= 0 ? d.goal && $.each(d.goal.objectives, function(a, b) {
$(b.blockElement).removeClass("matches-filter");
}) : (e = !1, d.goal && $.each(d.goal.objectives, function(a, c) {
c.description.toLowerCase().indexOf(b) >= 0 ? (e = !0, $(c.blockElement).addClass("matches-filter")) : $(c.blockElement).removeClass("matches-filter");
}))), e ? $(d.rowElement).show() : $(d.rowElement).hide(), c["most-recent"] ? d.countElement.hide() : d.countElement.show();
}), d.insertAfter("#class-goal-filter-desc"), ClassProfile.updateStudentGoalsFilterText(a);
}
});

var ProgressReport = {
updateFilterTimeout: null,
studentRowView: Backbone.View.extend({
initialize: function() {
this.columnViews = [];
},
updateFilter: function(a) {
this.model.visible ? (this.model.highlight && this.options.allowHighlight ? $(this.el).addClass("highlight") : $(this.el).removeClass("highlight"), this.model.hiddenCount && $(this.el).find(".hidden-students").html("(" + this.model.hiddenCount + " hidden)"), $(this.el).show(), $.each(this.columnViews, function(b, c) {
c.updateFilter(a, null, this.model.matchingCells);
})) : $(this.el).hide();
}
}),
studentColumnView: Backbone.View.extend({
updateFilter: function(a, b, c) {
a[this.options.index] ? (b && b[this.options.index] ? $(this.el).addClass("highlight") : $(this.el).removeClass("highlight"), c && !c[this.options.index] ? $(this.el).addClass("notmatching") : $(this.el).removeClass("notmatching"), $(this.el).show()) : $(this.el).hide();
}
}),
init: function(a) {
var b = this;
this.model = a, this.rowViews = [], this.headingViews = [], this.hiddenStudentsModel = {
visible: !1,
highlight: !1,
hiddenCount: 10
};
if ($.browser.msie && parseInt($.browser.version) < 8) {
this.showBrowserRequirements();
return;
}
var c = this.preAdjustTable();
temporaryDetachElement($("#module-progress"), function() {
this.adjustTable(c);
}, this), this.onResize(), $("#module-progress td.student-module-status").hover(this.onHover, this.onUnhover), window.fBoundProgressReport || ($(window).resize(ProgressReport.onResize), $(document).mousemove(function(a) {
window.mouseX = a.pageX, window.mouseY = a.pageY;
}), window.fBoundProgressReport = !0), $("#module-progress").find("th.student-exercises-col").each(function() {
var a = $(this).attr("data-id");
b.headingViews.push(new ProgressReport.studentColumnView({
el: this,
model: null,
index: a
}));
}), $("#module-progress").find("tr.student-email-row").each(function() {
var c = $(this).attr("data-id"), d = c >= 0 ? a.exercise_list[c] : b.hiddenStudentsModel;
b.rowViews.push(new ProgressReport.studentRowView({
el: this,
model: d,
allowHighlight: !0
}));
}), $("#module-progress").find("tr.student-exercises-row").each(function() {
var c = $(this).attr("data-id"), d = c >= 0 ? a.exercise_list[c] : b.hiddenStudentsModel, e = new ProgressReport.studentRowView({
el: this,
model: d
});
b.rowViews.push(e), $(this).find("td.student-module-status").each(function() {
var a = $(this).attr("data-id");
e.columnViews.push(new ProgressReport.studentColumnView({
el: this,
model: d,
index: a
})), $(this).click(function() {
window.location = d.exercises[a].link;
});
});
}), $("#student-progressreport-search").unbind(), $("#student-progressreport-search").keyup(function() {
ProgressReport.updateFilterTimeout == null && (ProgressReport.updateFilterTimeout = setTimeout(function() {
ProgressReport.filterRows(a), ProgressReport.updateFilterTimeout = null;
}, 250));
}), $("input.progressreport-filter-check").unbind(), $("input.progressreport-filter-check").change(function() {
ProgressReport.filterRows(a);
}), $("#progressreport-filter-last-time").change(function() {
$('input.progressreport-filter-check[name="recent"]').attr("checked", !0), ProgressReport.filterRows(a);
}), ProgressReport.filterRows(a);
},
filterRows: function(a) {
var b = $.trim($("#student-progressreport-search").val().toLowerCase()), c = {};
$("input.progressreport-filter-check").each(function(a, b) {
c[$(b).attr("name")] = $(b).is(":checked");
});
var d = $("#progressreport-filter-last-time").val(), e = [], f = [], g = 0;
$.each(a.exercise_names, function(a, c) {
f[a] = b != "" && c.display_name_lower.indexOf(b) > -1, e[a] = f[a] || b == "";
}), $.each(a.exercise_list, function(a, c) {
var d = !1, h = b == "" || c.nickname_lower.indexOf(b) > -1;
$.each(c.exercises, function(a, b) {
if (b.status != "" && f[a]) return d = !0, !1;
}), d || h ? (c.visible = !0, c.highlight = h && b != "", h && $.each(c.exercises, function(a, b) {
b.status != "" && (e[a] = !0);
})) : (c.visible = !1, g++);
});
if (c.struggling || c.recent) {
var h = [];
$.each(a.exercise_list, function(a, b) {
if (b.visible) {
var f = !1;
b.matchingCells = [], $.each(b.exercises, function(a, g) {
var i = e[a];
c.struggling && g.status != "Struggling" ? i = !1 : c.recent && g.seconds_since_done > 86400 * d && (i = !1), i ? (b.matchingCells[a] = !0, h[a] = !0, f = !0) : b.matchingCells[a] = g.status == "";
}), f || (b.visible = !1, g++);
}
}), $.each(a.exercise_names, function(a, b) {
!f[a] && !h[a] && (e[a] = !1);
});
} else $.each(a.exercise_list, function(a, b) {
b.matchingCells = null;
});
this.hiddenStudentsModel.visible = g > 0, this.hiddenStudentsModel.hiddenCount = g, temporaryDetachElement($("#module-progress"), function() {
_.each(this.rowViews, function(a) {
a.updateFilter(e);
}), _.each(this.headingViews, function(a) {
a.updateFilter(e, f);
});
}, this);
var i = this.preAdjustTable();
temporaryDetachElement($("#module-progress"), function() {
this.adjustTable(i);
}, this);
},
showBrowserRequirements: function() {
$("#module-progress").replaceWith("<div class='graph-notification'>This chart requires a newer browser such as Google Chrome, Safari, Firefox, or Internet Explorer 8+.</div>");
},
hoverDiv: function() {
return window.elProgressReportHoverDiv || (window.elProgressReportHoverDiv = $("<div class='exercise-info-hover' style='position:absolute;display:none;'></div>"), $(document.body).append(window.elProgressReportHoverDiv)), window.elProgressReportHoverDiv;
},
onHover: function() {
var a = window.dtLastHover = new Date, b = this;
setTimeout(function() {
if (a != window.dtLastHover) return;
var c = $(b).find(".hover-content");
if (c.length) {
var d = $(ProgressReport.hoverDiv());
d.html(c.html());
var e = window.mouseX + 15;
e + 150 > $(window).scrollLeft() + $(window).width() && (e -= 150);
var f = window.mouseY + 5;
f + 115 > $(window).scrollTop() + $(window).height() && (f -= 115), d.css("left", e).css("top", f), d.css("cursor", "pointer"), d.show();
}
}, 100);
},
onUnhover: function() {
window.dtLastHover = null, $(ProgressReport.hoverDiv()).hide();
},
onScroll: function() {
var a = $("#table_div"), b = $("#divHeader"), c = $("#firstcol"), d = a.scrollLeft(), e = a.scrollTop(), f = b.scrollLeft(d).scrollLeft(), g = c.scrollTop(e).scrollTop();
f < d && (b.children().first().css("padding-right", 20), b.scrollLeft(d)), g < e && (c.children().first().css("padding-bottom", 20), c.scrollTop(e));
},
onResize: function() {
var a = $("#graph-content").width() - $("#firstTd").width() - 12;
$(".sizeOnResize").width(a);
},
preAdjustTable: function() {
var a = {
tableHeaderWidths: []
}, b = $("#divHeader th:visible"), c = b.length - 1, d = 0;
return a.brow = "mozilla", jQuery.each(jQuery.browser, function(b, c) {
c == 1 && (a.brow = b.toString());
}), a.tableDiv = $("#module-progress #table_div"), a.firstTd = $("#firstTd"), a.newFirstTdWidth = $(".tableFirstCol:visible").width(), a.tableHeaderHeight = a.firstTd.height(), $("#table_div td:visible:lt(" + c + ")").each(function(b, c) {
var d = $(this).attr("data-id"), e = $(this).width();
a.brow == "msie" && (e -= 2), a.tableHeaderWidths[d] = {
width: e
};
}), b.each(function(b, c) {
var d = $(c).attr("data-id");
d && a.tableHeaderWidths[d] && (a.tableHeaderWidths[d].header = $(this).find("div.tableHeader"), a.tableHeaderWidths[d].headerTh = $(this));
}), a;
},
adjustTable: function(a) {
(a.brow == "chrome" || a.brow == "safari") && a.tableDiv.css("top", "1px"), a.firstTd.css("width", a.newFirstTdWidth), $.each(a.tableHeaderWidths, function(b, c) {
c && (c.width >= 0 ? ($(c.header).width(c.width), $(c.headerTh).height(a.tableHeaderHeight)) : $(c.header).attr("style", ""));
});
}
};

(function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["studentlists-package_class-progress-column"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n    <span class="exercise-color ', f = c.status, f ? e = f.call(a, {
hash: {}
}) : (e = a.status, e = typeof e === o ? e() : e), d += p(e) + ' segment float-off-spine" style="width: ', e = a.students, e = e == null || e === !1 ? e : e.length, f = c.toPixelWidth, e = f ? f.call(a, e, {
hash: {}
}) : q.call(a, "toPixelWidth", e, {
hash: {}
}), d += p(e) + 'px;" data-width="', e = a.students, e = e == null || e === !1 ? e : e.length, f = c.toPixelWidth, e = f ? f.call(a, e, {
hash: {}
}) : q.call(a, "toPixelWidth", e, {
hash: {}
}), d += p(e) + '" data-status="', e = a.status, f = c.toDisplay, e = f ? f.call(a, e, {
hash: {}
}) : q.call(a, "toDisplay", e, {
hash: {}
}), d += p(e) + '" data-num="', e = a.students, e = e == null || e === !1 ? e : e.length, e = typeof e === o ? e() : e, d += p(e) + '"><span>', e = a.students, e = e == null || e === !1 ? e : e.length, f = c.toNumberOfStudents, e = f ? f.call(a, e, {
hash: {}
}) : q.call(a, "toNumberOfStudents", e, {
hash: {}
}), d += p(e) + "</span></span>\n  ", d;
}
function g(a, b, d) {
var e = "", f;
e += '\n    <div class="', f = a.students, f = f == null || f === !1 ? f : f.length, f = c["if"].call(a, f, {
hash: {},
inverse: r.noop,
fn: r.program(4, h, b)
});
if (f || f === 0) e += f;
e += ' student-list-container float-off-spine">\n      <table style="table-layout: fixed; width: 95px;">\n        ', f = a.students, f = c.each.call(a, f, {
hash: {},
inverse: r.noop,
fn: r.programWithDepth(i, b, d)
});
if (f || f === 0) e += f;
return e += "\n      </table>\n    </div>\n  ", e;
}
function h(a, b) {
var d = "", e, f;
return d += "exercise-color ", f = c.status, f ? e = f.call(a, {
hash: {}
}) : (e = a.status, e = typeof e === o ? e() : e), d += p(e) + " border-only", d;
}
function i(a, b, d) {
var e = "", f, g;
return e += '\n        <tr><td>\n        <a class="student-link" href="', g = c.profile_root, g ? f = g.call(a, {
hash: {}
}) : (f = a.profile_root, f = typeof f === o ? f() : f), e += p(f) + "vital-statistics/problems/", f = d.name, f = typeof f === o ? f() : f, e += p(f) + '">', g = c.nickname, g ? f = g.call(a, {
hash: {}
}) : (f = a.nickname, f = typeof f === o ? f() : f), e += p(f) + "</a>\n        </td></tr>\n        ", e;
}
c = c || a.helpers;
var j = "", k, l, m, n, o = "function", p = this.escapeExpression, q = c.helperMissing, r = this;
j += '<div class="fake-row">\n  ', k = b.progress, l = {}, m = b.progressSide, l.side = m, n = c.progressIter, k = n ? n.call(b, k, {
hash: l,
inverse: r.noop,
fn: r.program(1, f, e)
}) : q.call(b, "progressIter", k, {
hash: l,
inverse: r.noop,
fn: r.program(1, f, e)
});
if (k || k === 0) j += k;
j += '\n</div>\n\n<div class="student-lists">\n  ', k = b.progress, l = {}, m = b.progressSide, l.side = m, n = c.progressIter, k = n ? n.call(b, k, {
hash: l,
inverse: r.noop,
fn: r.programWithDepth(g, e, b)
}) : q.call(b, "progressIter", k, {
hash: l,
inverse: r.noop,
fn: r.programWithDepth(g, e, b)
});
if (k || k === 0) j += k;
return j += "\n</div>\n", j;
});
})(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["studentlists-package_class-progress-summary"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
d += '\n    <div class="exercise-row">\n      <div class="exercise-name">\n        <span>', f = c.display_name, f ? e = f.call(a, {
hash: {}
}) : (e = a.display_name, e = typeof e === l ? e() : e), d += m(e) + '</span>\n      </div>\n\n      <div id="left-column">\n        ', e = {}, e.side = "left", f = c.progressColumn, e = f ? f.call(a, {
hash: e,
inverse: k.noop,
fn: k.program(2, g, b)
}) : n.call(a, "progressColumn", {
hash: e,
inverse: k.noop,
fn: k.program(2, g, b)
});
if (e || e === 0) d += e;
d += '\n      </div>\n\n      <div id="right-column">\n        ', e = {}, e.side = "right", f = c.progressColumn, e = f ? f.call(a, {
hash: e,
inverse: k.noop,
fn: k.program(4, h, b)
}) : n.call(a, "progressColumn", {
hash: e,
inverse: k.noop,
fn: k.program(4, h, b)
});
if (e || e === 0) d += e;
return d += '\n      </div>\n\n      <div style="clear: both;"></div>\n    </div>\n  ', d;
}
function g(a, b) {
var e = "", f;
e += "\n          ", f = a, f = k.invokePartial(d["studentlists_class-progress-column"], "studentlists_class-progress-column", f, c, d);
if (f || f === 0) e += f;
return e += "\n        ", e;
}
function h(a, b) {
var e = "", f;
e += "\n          ", f = a, f = k.invokePartial(d["studentlists_class-progress-column"], "studentlists_class-progress-column", f, c, d);
if (f || f === 0) e += f;
return e += "\n        ", e;
}
c = c || a.helpers, d = d || a.partials;
var i = "", j, k = this, l = "function", m = this.escapeExpression, n = c.helperMissing;
i += '<div id="progress-summary-container">\n\n  ', j = b.exercises, j = c.each.call(b, j, {
hash: {},
inverse: k.noop,
fn: k.program(1, f, e)
});
if (j || j === 0) i += j;
return i += "\n</div>\n", i;
});
}();

var ProgressSummaryView = function() {
function e(a) {
return Math.round(200 * a / Profile.numStudents);
}
function f() {
d = null;
var a = $("#student-progresssummary-search").val().toLowerCase();
$(".exercise-row").each(function(b) {
var c = $(this), d = c.find(".exercise-name span").html().toLowerCase();
a == "" || d.indexOf(a) > -1 ? c.show() : c.hide();
});
}
function g() {
a = !0, Handlebars.registerPartial("studentlists_class-progress-column", Templates.get("studentlists.class-progress-column")), Handlebars.registerHelper("toPixelWidth", function(a) {
return e(a);
}), Handlebars.registerHelper("toNumberOfStudents", function(a) {
return e(a) < 20 ? "" : a;
}), Handlebars.registerHelper("toDisplay", function(a) {
return a === "not-started" ? "unstarted" : a;
}), Handlebars.registerHelper("progressColumn", function(a) {
return this.progressSide = a.hash.side, a(this);
}), Handlebars.registerHelper("progressIter", function(a, b) {
var d = "", e = b.hash.side === "left";
return $.each(a, function(a, f) {
e === c[f.status].fShowOnLeft && (d += b(f));
}), d;
}), $("#graph-content").delegate(".exercise-row", "click", function(a) {
var b = $(this), c = b.find(".student-lists");
c.is(":visible") ? (b.find(".segment").each(function(a) {
var b = $(this), c = b.data("width"), d = c < 20 ? "" : b.data("num");
b.animate({
width: c
}, 350, "easeInOutCubic").find("span").html(d);
}), c.fadeOut(100, "easeInOutCubic")) : (b.find(".segment").animate({
width: 100
}, 450, "easeInOutCubic", function() {
var a = $(this), b = a.data("status");
a.find("span").html(b);
}), c.delay(150).fadeIn(650, "easeInOutCubic"));
}), $("#stats-filters").delegate("#student-progresssummary-search", "keyup", function() {
d == null && (d = setTimeout(f, 250));
});
}
var a = !1, b = Templates.get("studentlists.class-progress-summary"), c = {
"not-started": {
fShowOnLeft: !0,
order: 0
},
struggling: {
fShowOnLeft: !0,
order: 1
},
started: {
fShowOnLeft: !1,
order: 2
},
proficient: {
fShowOnLeft: !1,
order: 3
},
review: {
fShowOnLeft: !1,
order: 4
}
}, d = null;
return {
render: function(d) {
a || g(), Profile.numStudents = d.num_students, $.each(d.exercises, function(a, b) {
b.progress.sort(function(a, b) {
return c[a.status].order - c[b.status].order;
});
}), $("#graph-content").html(b(d));
}
};
};

(function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["studentlists-package_class-goals"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
d += '\n        <div class="goal-row" data-id="', f = c.rowID, f ? e = f.call(a, {
hash: {}
}) : (e = a.rowID, e = typeof e === p ? e() : e), d += q(e) + '">\n            <div class="student-name">\n                <a href="', e = a.student, e = e == null || e === !1 ? e : e.profile_url, e = typeof e === p ? e() : e, d += q(e) + '">', e = a.student, e = e == null || e === !1 ? e : e.nickname, e = typeof e === p ? e() : e, d += q(e) + "</a>\n                ", e = a.goal, e = e == null || e === !1 ? e : e.objectives, e = c["if"].call(a, e, {
hash: {},
inverse: r.noop,
fn: r.program(2, g, b)
});
if (e || e === 0) d += e;
d += '\n            </div>\n            <div class="goal ', e = a.goal, e = e == null || e === !1 ? e : e.completed, e = c["if"].call(a, e, {
hash: {},
inverse: r.noop,
fn: r.program(4, h, b)
});
if (e || e === 0) d += e;
d += '">\n                ', e = a.goal, e = e == null || e === !1 ? e : e.objectives, e = c["if"].call(a, e, {
hash: {},
inverse: r.program(10, l, b),
fn: r.program(7, j, b)
});
if (e || e === 0) d += e;
return d += "\n            </div>\n        </div>\n    ", d;
}
function g(a, b) {
var d = "", e, f;
return d += '\n                <span class="goal-count">(', f = c.goal_idx, f ? e = f.call(a, {
hash: {}
}) : (e = a.goal_idx, e = typeof e === p ? e() : e), d += q(e) + "/", e = a.student, e = e == null || e === !1 ? e : e.goal_count, e = typeof e === p ? e() : e, d += q(e) + ')</span>\n                <div>\n                    <div class="goal-start-time">Started ', e = a.goal, e = e == null || e === !1 ? e : e.created_ago, e = typeof e === p ? e() : e, d += q(e) + '</div>\n                    <div class="goal-update-time">Updated ', e = a.goal, e = e == null || e === !1 ? e : e.updated_ago, e = typeof e === p ? e() : e, d += q(e) + "</div>\n                </div>\n                ", d;
}
function h(a, b) {
var d;
return d = a.goal, d = d == null || d === !1 ? d : d.abandoned, d = c.unless.call(a, d, {
hash: {},
inverse: r.noop,
fn: r.program(5, i, b)
}), d || d === 0 ? d : "";
}
function i(a, b) {
return "complete";
}
function j(a, b) {
var d = "", e;
d += '\n                    <ul class="inline-list objective-list">\n                    ', e = a.goal, e = e == null || e === !1 ? e : e.objectives, e = c.each.call(a, e, {
hash: {},
inverse: r.noop,
fn: r.program(8, k, b)
});
if (e || e === 0) d += e;
return d += "\n                    </ul>\n                ", d;
}
function k(a, b) {
var e = "", f;
e += "\n                        ", f = a, f = r.invokePartial(d["shared_goal-objectives"], "shared_goal-objectives", f, c, d);
if (f || f === 0) e += f;
return e += "\n                    ", e;
}
function l(a, b) {
var c = "", d;
return c += '\n                    <div class="no-goal">\n                        ', d = a.student, d = d == null || d === !1 ? d : d.nickname, d = typeof d === p ? d() : d, c += q(d) + " is not current working on a goal\n                    </div>\n                ", c;
}
c = c || a.helpers, d = d || a.partials;
var m = "", n, o, p = "function", q = this.escapeExpression, r = this;
m += '<div id="class-student-goals" class="', o = c.colors, o ? n = o.call(b, {
hash: {}
}) : (n = b.colors, n = typeof n === p ? n() : n), m += q(n) + '">\n    <div id="class-goal-filter-desc"></div>\n    <div id="class-student-goal">\n    ', n = b.rowData, n = c.each.call(b, n, {
hash: {},
inverse: r.noop,
fn: r.program(1, f, e)
});
if (n || n === 0) m += n;
return m += "\n    </div>\n</div>\n", m;
});
})(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["studentlists-package_class-progress-report"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e, f;
return d += '\n                        <th class="student-exercises-col" data-id="', f = c.idx, f ? e = f.call(a, {
hash: {}
}) : (e = a.idx, e = typeof e === o ? e() : e), d += p(e) + '"><div class="tableHeader">', f = c.display_name, f ? e = f.call(a, {
hash: {}
}) : (e = a.display_name, e = typeof e === o ? e() : e), d += p(e) + "</div></th>\n                    ", d;
}
function g(a, b) {
var d = "", e, f;
return d += '\n                <tr class="student-email-row" data-id="', f = c.idx, f ? e = f.call(a, {
hash: {}
}) : (e = a.idx, e = typeof e === o ? e() : e), d += p(e) + '">\n                    <td class="tableFirstCol student-email" style="vertical-align: none;">\n                        <a style="color:#006699;" href="', f = c.profile_root, f ? e = f.call(a, {
hash: {}
}) : (e = a.profile_root, e = typeof e === o ? e() : e), d += p(e) + 'vital-statistics/skill-progress">\n                            <nobr>', f = c.nickname, f ? e = f.call(a, {
hash: {}
}) : (e = a.nickname, e = typeof e === o ? e() : e), d += p(e) + "</nobr>\n                        </a>\n                    </td>\n                </tr>\n                ", d;
}
function h(a, b) {
var d = "", e, f;
d += '\n                    <tr class="student-exercises-row" data-id="', f = c.idx, f ? e = f.call(a, {
hash: {}
}) : (e = a.idx, e = typeof e === o ? e() : e), d += p(e) + '">\n                      ', e = a.exercises, e = c.each.call(a, e, {
hash: {},
inverse: q.noop,
fn: q.programWithDepth(i, b, a)
});
if (e || e === 0) d += e;
return d += "\n                    </tr>\n                    ", d;
}
function i(a, b, d) {
var e = "", f, g;
e += '\n                        <td class="student-module-status exercise-color ', g = c.status_css, g ? f = g.call(a, {
hash: {}
}) : (f = a.status_css, f = typeof f === o ? f() : f), e += p(f) + " ", f = a.notTransparent, f = c["if"].call(a, f, {
hash: {},
inverse: q.noop,
fn: q.program(7, j, b)
});
if (f || f === 0) e += f;
e += '" data-id="', g = c.idx, g ? f = g.call(a, {
hash: {}
}) : (f = a.idx, f = typeof f === o ? f() : f), e += p(f) + '">\n                          ', f = a.status, f = c["if"].call(a, f, {
hash: {},
inverse: q.noop,
fn: q.programWithDepth(k, b, d)
});
if (f || f === 0) e += f;
return e += "\n                        </td>\n                      ", e;
}
function j(a, b) {
return "action-gradient seethrough";
}
function k(a, b, d) {
var e = "", f, g;
e += '\n                          <div class="hover-content" style="display: none;">\n                            <b>', f = d.nickname, f = typeof f === o ? f() : f, e += p(f) + "</b><br/>\n                            <b>", g = c.exercise_display, g ? f = g.call(a, {
hash: {}
}) : (f = a.exercise_display, f = typeof f === o ? f() : f), e += p(f) + "</b><br/>\n                            <em><nobr>Status: ", g = c.status, g ? f = g.call(a, {
hash: {}
}) : (f = a.status, f = typeof f === o ? f() : f), e += p(f) + "</nobr></em><br/>\n                            <em>Progress: ", g = c.progress, g ? f = g.call(a, {
hash: {}
}) : (f = a.progress, f = typeof f === o ? f() : f), e += p(f) + "%</em><br/>\n                            ", f = a.last_done_ago, f = c["if"].call(a, f, {
hash: {},
inverse: q.noop,
fn: q.program(10, l, b)
});
if (f || f === 0) e += f;
return e += "\n                            <em>Problems attempted: ", g = c.total_done, g ? f = g.call(a, {
hash: {}
}) : (f = a.total_done, f = typeof f === o ? f() : f), e += p(f) + "</em>\n                          </div>\n                          ", e;
}
function l(a, b) {
var d = "", e, f;
return d += "<em>Last worked on: ", f = c.last_done_ago, f ? e = f.call(a, {
hash: {}
}) : (e = a.last_done_ago, e = typeof e === o ? e() : e), d += p(e) + "</em></br/>", d;
}
c = c || a.helpers;
var m = "", n, o = "function", p = this.escapeExpression, q = this;
m += '<table id="module-progress" cellspacing="0" cellpadding="0" border="0">\n    <tr>\n        <th id="firstTd" class="tableHeader">Student Progress</th>\n        <td>\n            <div id="divHeader" class="sizeOnResize" style="overflow:hidden;width:450px; line-height: 15px;">\n                <table cellspacing="0" cellpadding="0" border="1" style="width: 100%">\n                  <tr>\n                    ', n = b.exercise_names, n = c.each.call(b, n, {
hash: {},
inverse: q.noop,
fn: q.program(1, f, e)
});
if (n || n === 0) m += n;
m += '\n                    <th style="background: transparent; border-color: transparent; max-width:5px; min-width: 5px; width: 5px">&nbsp;</th>\n                  </tr>\n                </table>\n            </div>\n        </td>\n    </tr>\n    <tr>\n        <td style="vertical-align: top;">\n          <div id="firstcol" style="overflow:hidden;">\n            <table cellspacing="0" cellpadding="0" border="0" >\n                ', n = b.exercise_list, n = c.each.call(b, n, {
hash: {},
inverse: q.noop,
fn: q.program(3, g, e)
});
if (n || n === 0) m += n;
m += '\n                <tr class="student-email-row" data-id="-1" style="display: none">\n                    <td class="tableFirstCol student-email hidden-students" style="vertical-align: none;">\n                      Hidden students\n                    </td>\n                </tr>\n                <td class="tableFirstCol student-email" style="background: transparent; border-color: transparent; max-width:5px; min-width: 5px; width: 5px">&nbsp;</td>\n            </table>\n          </div>\n        </td>\n\n        <td valign="top">\n            <div id="table_div" class="sizeOnResize fancy-scrollbar" style="overflow:scroll;width:450px;position:relative;" onscroll="ProgressReport.onScroll();" >\n                <table style="width:100%;" cellspacing="0" cellpadding="0" border="0">\n                    ', n = b.exercise_list, n = c.each.call(b, n, {
hash: {},
inverse: q.noop,
fn: q.program(5, h, e)
});
if (n || n === 0) m += n;
return m += '\n                    <tr class="student-exercises-row" data-id="-1">\n                      <td>&nbsp;</td>\n                    </tr>\n                </table>\n            </div>\n        </td>\n\n    </tr>\n</table>\n', m;
});
}();