var StudentLists = {

    Data: {
        students: null,
        studentsById: null,
        studentsByEmail: null,
        studentLists: null,
        studentListsById: null,
        coachRequests: null,

        init: function() {
            this.generateListIndices();
            this.generateStudentIndices();
        },

        isStudentInList: function(student_id, list_id) {
            var student = this.studentsById[student_id];
            return $.grep(student.studentLists, function(list, i) {
                return list.key==list_id;
            }).length !== 0;
        },

        addList: function(student_list) {
            this.studentLists.push(student_list);
            this.studentListsById[student_list.key] = student_list;
        },

        removeList: function(list_id) {
            $.each(this.students, function(i, s) {
                StudentLists.Data.removeStudentFromList(s, list_id);
            });

            this.studentLists = $.grep(this.studentLists, function(list) {
                return list.key != list_id;
            });

            this.generateListIndices();
        },

        removeStudent: function(student) {
            var index = this.students.indexOf(student);
            if (index != -1)
                this.students.splice(index, 1);

            this.generateStudentIndices();
        },

        removeStudentFromList: function(student, list_id) {
            student.studentLists = $.grep(student.studentLists, function(list) {
                return list.key != list_id;
            });
        },

        addStudentToList: function(student, list_id) {
            student.studentLists.push(this.studentListsById[list_id]);
        },

        generateListIndices: function() {
            this.studentListsById = _.indexBy(StudentLists.Data.studentLists, 'key');
        },

        generateStudentIndices: function() {
            this.studentsById = _.indexBy(StudentLists.Data.students, 'key');
            this.studentsByEmail = _.indexBy(StudentLists.Data.students, 'email');
        }
    },

    currentList: null,

    init: function() {
        StudentLists.Data.init();

        AddStudentTextBox.init();
        AddStudentToListTextBox.init();
        EditListsMenu.init();
        AddListTextBox.init();

        // change visible list
        $('.bullet').click(StudentLists.listClick);

        // inline delete student-list
        $('.student-row .delete-button').click(StudentLists.deleteStudentClick);

        // alerts
        $('.alert .close-button').click(function(event) {
            event.preventDefault();
            $(event.target).parents('.alert').fadeOut();
        });

        // show initial page
        // todo: remember this with a cookie!
        $('#student-list-allstudents a').click();
    },

    deleteStudentClick: function(event) {
        event.preventDefault();
        var jelRow = $(event.currentTarget).parents('.student-row');
        var student_id = jelRow.data('student_id');
        var student = StudentLists.Data.studentsById[student_id];

        if (StudentLists.currentList == 'allstudents') {
            // this deletes the student-coach relationship: be sure
            var sure = confirm('Are you sure you want to stop coaching this student?');
            if (sure) {
                $.ajax({
                    type: 'GET',
                    url: '/unregisterstudent',
                    data: {'email': student.email}
                });

                // update data model
                StudentLists.Data.removeStudent(student);

                // update view
                $('.student-row[data-student_id='+student.key+']').fadeOut(
                    400,
                    function() { $(this).remove(); }
                );
                StudentLists.redrawListView();
            }
        }
        else if (StudentLists.currentList == 'requests') {
            var email = jelRow.data('email');

            $.ajax({
                type: 'GET',
                url: '/acceptcoach',
                data: {'accept': 0, 'email': email}
            });

            // update data model
            StudentLists.Data.coachRequests =
                $.grep(StudentLists.Data.coachRequests, function(request) {
                    return request != email;
                });

            // update UI
            jelRow.remove();
            StudentLists.redrawListView();
        }
        else {
            var list_id = StudentLists.currentList;
            EditListsMenu.removeStudentFromListAjax(student, list_id);
        }
    },

    listClick: function(event) {
        event.preventDefault();
        var jelSelectedList = $(event.currentTarget);

        var list_id = jelSelectedList.closest('li').data('list_id');
        if(list_id == StudentLists.currentList) {
            return;
        }
        StudentLists.currentList = list_id;

        $('.bullet-active').removeClass('bullet-active');
        jelSelectedList.addClass('bullet-active');

        StudentLists.redrawListView();
    },

    redrawListView: function() {
        // show or hide students depending on list membership
        var nstudents = 0;
        var title;
        var titleHref;
        var countstring = 'student';

        if(StudentLists.currentList == 'requests') {
            $('#actual-students').hide();
            $('#requested-students').show();
            nstudents = $('#requested-students .student-row').length;

            $('#empty-class').show();

            title = 'Requests';
            $('.students-header h2 a').removeAttr('href');
            $('#delete-list').hide();
            countstring = 'potential student';
        }
        else {
            $('#requested-students').hide();
            $('#actual-students').show();

            if(StudentLists.currentList=='allstudents') {
                var jelAll = $('#actual-students .student-row');
                jelAll.show();

                nstudents = jelAll.length;
                title = 'All students';
                titleHref = '/class_profile';
                $('#delete-list').hide();
                if(StudentLists.Data.students.length === 0) {
                    $('#empty-class').show();
                }
                else {
                    $('#empty-class').hide();
                }
            }
            else {
                $('#actual-students .student-row').each(function() {
                    var jel = $(this);
                    var student_id = jel.data('student_id');
                    if(StudentLists.Data.isStudentInList(student_id, StudentLists.currentList)) {
                        jel.show();
                        nstudents++;
                    }
                    else {
                        jel.hide();
                    }
                    $('#empty-class').hide();
                });

                var list = StudentLists.Data.studentListsById[StudentLists.currentList];
                title = list.name;
                titleHref = '/class_profile?list_id=' + list.key;
                $('#delete-list').show();
            }
        }

        if (StudentLists.currentList == 'requests' || StudentLists.currentList == 'allstudents') {
            AddStudentTextBox.jElement.show();
            AddStudentToListTextBox.jElement.hide();
        }
        else {
            AddStudentTextBox.jElement.hide();
            AddStudentToListTextBox.jElement.show();
        }

        var nstudentsStr = nstudents.toString() + ' ' +
                                                countstring +
                                                (nstudents==1 ? '' : 's');
        $('#nstudents').text(nstudentsStr);
        $('.students-header h2 a').text(title).attr('href', titleHref);
    }
};

var AddListTextBox = {
    jElement: null,
    jNewListElement: null,

    init: function() {
        this.jElement = $('#newlist-box')
            .keypress(function(event) {
                if (event.which == '13') { // enter
                    event.preventDefault();
                    AddListTextBox.createList(event);
                }
            })
            .keyup(function(event) {
                if (event.which == '27') { // escape
                    AddListTextBox.hide();
                }
            });

        $('#newlist-ok')
            .click(function(event) {
                AddListTextBox.createList(event);
            });

        $('#newlist-cancel')
            .click(function(event) {
                AddListTextBox.hide();
            });

        $('#newlist-button').click(function(event) {
            event.stopPropagation();
            event.preventDefault();
            $('#newlist-div').show();
            $('#newlist-button').hide();
            AddListTextBox.jElement.focus();
        });

        $('#newlist-div').hide();

        $('#delete-list').click(this.deleteList);
    },

    createList: function(event) {
        var listname = this.jElement.val();

        if (!listname) {
            this.hide();
            return;
        }

        this.jElement.attr('disabled', 'disabled');
        Throbber.show(this.jElement);
        $.ajax({
            type: 'POST',
            url: '/api/v1/user/studentlists',
            data: {'list_name': listname},
            dataType: 'json',
            success: function(data, status, jqxhr) {
                var student_list = data;
                StudentLists.Data.addList(student_list);

                // add a new item to the sidebar
                var jel = $('<li data-list_id="'+student_list.key+'"><a href="students?list_id='+student_list.key+'" class="bullet">'+student_list.name+'</a></li>');
                $('#custom-lists').append(jel);
                jel.find('a').click(StudentLists.listClick);
            },
            complete: function(){
                Throbber.hide();
                AddListTextBox.hide();
            }
        });
    },

    hide: function() {
        AddListTextBox.jElement
            .val('')
            .removeAttr('disabled');
        $('#newlist-div').hide();
        $('#newlist-button').show().focus();
    },

    deleteList: function(event) {
        event.preventDefault();
        if (StudentLists.currentList != 'allstudents' &&
            StudentLists.currentList != 'requests') {
                $.ajax({
                    type: 'DELETE',
                    url: '/api/v1/user/studentlists/' + StudentLists.currentList
                });

                $('#custom-lists li[data-list_id='+StudentLists.currentList+']').remove();
                StudentLists.Data.removeList(StudentLists.currentList);
                $('#student-list-allstudents a').click();
        }
    }
};

var AddStudentTextBox = {
    jElement: null,

    init: function() {
        this.jElement = $('#request-student')
            .keypress(function(event) {
                if (event.which == '13') {
                    var email = AddStudentTextBox.jElement.val();
                    Throbber.show(AddStudentTextBox.jElement);
                    $.ajax({
                        type: 'POST',
                        url: '/requeststudent',
                        data: {'email': email},
                        success: function(data, status, jqxhr) {
                            // data model
                            StudentLists.Data.coachRequests.push(email);

                            // UI
                            AddStudentTextBox.jElement.val('');

                            $('#tmpl .student-row').clone()
                                .data('email', email)
                                .find('.student-name').text(email).end()
                                .hide().prependTo('#requested-students')
                                .find('.delete-button').click(StudentLists.deleteStudentClick).end()
                                .fadeIn();

                            $('#student-list-requests a').click();
                        },
                        error: function(jqxhr) {
                            $('#addstudent-error').slideDown();
                        },
                        complete: function() {
                            Throbber.hide();
                        }
                    });
                }
            })
            .placeholder();
    }
};

var AddStudentToListTextBox = {
    jElement: null,

    init: function() {
        this.jElement = $('#add-to-list')
            .keypress(function(event) {
                if (event.which == '13') { // enter
                    event.preventDefault();
                    AddStudentToListTextBox.addStudent(event);
                }
            })
            .placeholder()
            .autocomplete({
                source: AddStudentToListTextBox.generateSource(),
                select: function(event, selected) {
                    AddStudentToListTextBox.addStudent(event, selected);
                }
            });

        this.jElement.data("autocomplete").menu.select = function(e) {
            // jquery-ui.js's ui.autocomplete widget relies on an implementation of ui.menu
            // that is overridden by our jquery.ui.menu.js.  We need to trigger "selected"
            // here for this specific autocomplete box, not "select."
            this._trigger("selected", e, { item: this.active });
        };
    },

    generateSource: function() {
        return $.map(StudentLists.Data.students, function(student, i) {
            return { label: student.nickname + ' (' + student.email + ')',
                     value: student.email };
        });
    },

    updateSource: function() {
        this.jElement.data('autocomplete').options.source = this.generateSource();
        this.jElement.data('autocomplete')._initSource();
    },

    addStudent: function(event, selected) {
        var text;
        if (selected) {
            text = selected.item.value;
            event.preventDefault();
        }
        else {
            text = this.jElement.val();
        }

        var student = StudentLists.Data.studentsByEmail[text];
        var list_id = StudentLists.currentList;
        EditListsMenu.addStudentToListAjax(student, list_id);

        this.jElement.val('');
    }
};


var EditListsMenu = {
    init: function() {
        $('.lists-css-menu > ul > li').click(function(event){EditListsMenu.addChildrenToDropdown(event);});

        $('.lists-css-menu .list-option-newlist').click(function(event) {
            // if this is called synchronously, the css-menu doesn't disappear.
            setTimeout(function() {
                $('#newlist-button').click();
            }, 50);
        });
    },

    addChildrenToDropdown: function(event) {
        if(event.target != event.currentTarget) {
            // stopPropagation etc don't work on dynamically generated children.
            // http://api.jquery.com/event.stopPropagation/#comment-82290989
            return true;
        }
        var jelMenu = $(event.currentTarget);
        var jelUl = jelMenu.find('ul');
        if (jelUl.length === 0) {
            jelUl = $('<ul></ul>');
            jelMenu.append(jelUl);
        }
        jelUl.children('.list-option').remove();
        var jelNewList = jelUl.children('li');

        // add a line for each list
        $.each(StudentLists.Data.studentLists, function(i, studentList) {
            var jel = $('<li class="list-option"><label><input type="checkbox">' + studentList.name + '</label></li>');
            var jelInput = jel.find('input');

            // get student
            var student_id = jelMenu.closest('.student-row').data('student_id');
            if(StudentLists.Data.isStudentInList(student_id, studentList.key)) {
                jelInput.attr('checked', true);
            }

            jelNewList.before(jel);
            jelInput.click(EditListsMenu.itemClick)
                  .data('student-list', studentList);
        });

        // css menus will overlap the footer if they are at the bottom of page
        // fix by increasing the size of the .push element. Overshoot so we have
        // a bit more room to grow if they add more lists.
        var height = jelUl.height();
        if (height > $('.push').height()) {
            var overshoot = 30;
            $('.push').css('height', height + overshoot + 'px');
        }
    },

    itemClick: function(event) {
        var jelInput = $(event.currentTarget);
        var studentList = jelInput.data('student-list');
        var student_id = jelInput.closest('.student-row').data('student_id');
        var student = StudentLists.Data.studentsById[student_id];
        if (jelInput.get(0).checked)
            EditListsMenu.addStudentToListAjax(student, studentList.key);
        else
            EditListsMenu.removeStudentFromListAjax(student, studentList.key);
    },

    addStudentToListAjax: function(student, list_id) {
        $.ajax({
            type: 'POST',
            url: '/addstudenttolist',
            data: {'email': student.email, 'list_id': list_id}
        });

        StudentLists.Data.addStudentToList(student, list_id);

        // show row on screen if visible
        if (StudentLists.currentList == list_id) {
            $('.student-row[data-student_id='+student.key+']').fadeIn();
        }
    },

    removeStudentFromListAjax: function(student, list_id) {
        $.ajax({
            type: 'POST',
            url: '/removestudentfromlist',
            data: {'email': student.email, 'list_id': list_id}
        });

        StudentLists.Data.removeStudentFromList(student, list_id);

        // hide row from screen if visible
        if (StudentLists.currentList == list_id) {
            $('.student-row[data-student_id='+student.key+']').fadeOut();
        }
    }
};
;
/**
 * Code to handle the logic for the class profile page.
 */
// TODO: clean up all event listeners. This page does not remove any
// event listeners when tearing down the graphs.

var ClassProfile = {
    version: 0,
    fLoadingGraph: false,
    fLoadedGraph: false,

    init: function() {
        // Init Highcharts global options.
        Highcharts.setOptions({
            credits: {
                enabled: false
            },
            title: {
                text: ""
            },
            subtitle: {
                text: ""
            }
        });

        if ($.address){

            // this is hackish, but it prevents the change event from being fired twice on load
            if ( $.address.value() === "/" ){
                window.location = window.location + "#" + $(".graph-link:eq(0)").attr("href");
            }

            $.address.change(function( evt ){

                if ( $.address.path() !== "/"){
                    ClassProfile.historyChange( evt );
                }

            });

        }

        $(".graph-link").click(
            function(evt){
                evt.preventDefault();
                if($.address){
                    // only visit the resource described by the url, leave the params unchanged
                    var href = $( this ).attr( "href" )
                    var path = href.split("?")[0];

                    // visiting a different resource
                    if ( path !== $.address.path() ){
                        $.address.path( path );
                    }

                    // applying filters for same resource via querystring
                    else{
                        // make a dict of current qs params and merge with the link's
                        var currentParams = {};
                        _.map( $.address.parameterNames(), function(e){ currentParams[e] = $.address.parameter( e ); } );
                        var linkParams = ClassProfile.parseQueryString( href );
                        $.extend( currentParams, linkParams );

                        $.address.queryString( ClassProfile.reconstructQueryString( currentParams ) );
                    }
                }
            }
        );

        // remove goals from IE<=8
        $(".lte8 .goals-accordion-content").remove();

        $("#stats-nav #nav-accordion")
            .accordion({
                header:".header",
                active:".graph-link-selected",
                autoHeight: false,
                clearStyle: true
            });

        setTimeout(function(){
            if (!ClassProfile.fLoadingGraph && !ClassProfile.fLoadedGraph)
            {
                // If 1000 millis after document.ready fires we still haven't
                // started loading a graph, load manually.
                // The externalChange trigger may have fired before we hooked
                // up a listener.
                ClassProfile.historyChange();
            }
        }, 1000);

        ClassProfile.ProgressSummaryView = new ProgressSummaryView();

        $('#studentlists_dropdown').css('display', 'inline-block');
        var $dropdown = $('#studentlists_dropdown ol');
        if ($dropdown.length > 0) {
            var menu = $dropdown.menu();

            // Set the width explicitly before positioning it absolutely to satisfy IE7.
            menu.width(menu.width()).hide().css('position', 'absolute');

            menu.bind("menuselect", this.updateStudentList);

            $(document).bind("click focusin", function(e){
                if ($(e.target).closest("#studentlists_dropdown").length == 0) {
                    menu.hide();
                }
            });

            var button = $('#studentlists_dropdown > a').button({
                icons: {
                    secondary: 'ui-icon-triangle-1-s'
                }
            }).show().click(function(e){
                if (menu.css('display') == 'none')
                    menu.show().menu("activate", e, $('#studentlists_dropdown li[data-selected=selected]')).focus();
                else
                    menu.hide();
                e.preventDefault();
            });

            // get initially selected list
            var list_id = $dropdown.children('li[data-selected=selected]').data('list_id');
            var student_list = ClassProfile.getStudentListFromId(list_id);
            $dropdown.data('selected', student_list);
        }
    },

    collapseAccordion: function() {
        // Turn on collapsing, collapse everything, and turn off collapsing
        $("#stats-nav #nav-accordion").accordion(
                "option", "collapsible", true).accordion(
                    "activate", false).accordion(
                        "option", "collapsible", false);
    },

    baseGraphHref: function(href) {
        // regex for matching scheme:// part of uri
        // see http://tools.ietf.org/html/rfc3986#section-3.1
        var reScheme = /^\w[\w\d+-.]*:\/\//;
        var match = href.match(reScheme);
        if (match) {
            href = href.substring(match[0].length);
        }

        var ixSlash = href.indexOf("/");
        if (ixSlash > -1)
            href = href.substring(href.indexOf("/"));

        var ixQuestionMark = href.indexOf("?");
        if (ixQuestionMark > -1)
            href = href.substring(0, ixQuestionMark);

        return href;
    },

    /**
    * Expands the navigation accordion according to the link specified.
    * @return {boolean} whether or not a link was found to be a valid link.
    */
    expandAccordionForHref: function(href) {
        if (!href) {
            return false;
        }

        href = this.baseGraphHref(href).replace(/[<>']/g, "");

        href = href.replace(/[<>']/g, "");
        var selectorAccordionSection =
                ".graph-link-header[href*='" + href + "']";

        if ( $(selectorAccordionSection).length ) {
            $("#stats-nav #nav-accordion").accordion(
                "activate", selectorAccordionSection);
            return true;
        }
        this.collapseAccordion();
        return false;
    },

    styleSublinkFromHref: function(href) {

        if (!href) return;

        var reDtStart = /dt_start=[^&]+/;

        var matchStart = href.match(reDtStart);
        var sDtStart = matchStart ? matchStart[0] : "dt_start=lastweek";

        href = href.replace(/[<>']/g, "");

        $(".graph-sub-link").removeClass("graph-sub-link-selected");
        $(".graph-sub-link[href*='" + this.baseGraphHref(href) + "'][href*='" + sDtStart + "']")
            .addClass("graph-sub-link-selected");
    },

    // called whenever user clicks graph type accordion
    loadGraphFromLink: function(el) {
        if (!el) return;
        ClassProfile.loadGraphStudentListAware(el.href);
    },

    loadGraphStudentListAware: function(url) {
        var $dropdown = $('#studentlists_dropdown ol');
        if ($dropdown.length == 1) {
            var list_id = $dropdown.data('selected').key;
            var qs = this.parseQueryString(url);
            qs['list_id'] = list_id;
            qs['version'] = ClassProfile.version;
            qs['dt'] = $("#targetDatepicker").val();
            url = this.baseGraphHref(url) + '?' + this.reconstructQueryString(qs);
        }

        this.loadGraph(url);
    },

    loadFilters : function( href ){
        // fix the hrefs for each filter
        var a = $("#stats-filters a[href^=\"" + href + "\"]").parent();
        $("#stats-filters .filter:visible").not(a).slideUp("slow");
        a.slideDown();
    },

    loadGraph: function(href, fNoHistoryEntry) {
        var apiCallbacksTable = {
            '/api/v1/user/students/goals': this.renderStudentGoals,
            '/api/v1/user/students/progressreport': ClassProfile.renderStudentProgressReport,
            '/api/v1/user/students/progress/summary': this.ProgressSummaryView.render
        };
        if (!href) return;

        if (this.fLoadingGraph) {
            setTimeout(function(){ClassProfile.loadGraph(href);}, 200);
            return;
        }

        this.styleSublinkFromHref(href);
        this.fLoadingGraph = true;
        this.fLoadedGraph = true;

        var apiCallback = null;
        for (var uri in apiCallbacksTable) {
            if (href.indexOf(uri) > -1) {
                apiCallback = apiCallbacksTable[uri];
            }
        }
        $.ajax({
            type: "GET",
            url: Timezone.append_tz_offset_query_param(href),
            data: {},
            dataType: apiCallback ? 'json' : 'html',
            success: function(data){
                ClassProfile.finishLoadGraph(data, href, fNoHistoryEntry, apiCallback);
            },
            error: function() {
                ClassProfile.finishLoadGraphError();
            }
        });
        $("#graph-content").html("");
        this.showGraphThrobber(true);
    },

    finishLoadGraph: function(data, href, fNoHistoryEntry, apiCallback) {

        this.fLoadingGraph = false;

        if (!fNoHistoryEntry) {
            // Add history entry for browser
            //             if ($.address) {
            //                 $.address(href);
            // }
        }

        this.showGraphThrobber(false);
        this.styleSublinkFromHref(href);

        var start = (new Date).getTime();
        if (apiCallback) {
            apiCallback(data, href);
        } else {
            $("#graph-content").html(data);
        }
        var diff = (new Date).getTime() - start;
        KAConsole.log('API call rendered in ' + diff + ' ms.');
    },

    finishLoadGraphError: function() {
        this.fLoadingGraph = false;
        this.showGraphThrobber(false);
        $("#graph-content").html("<div class='graph-notification'>It's our fault. We ran into a problem loading this graph. Try again later, and if this continues to happen please <a href='/reportissue?type=Defect'>let us know</a>.</div>");
    },

    // TODO: move history management out to a common utility
    historyChange: function(e) {
        var href = ( $.address.value() === "/" ) ? this.initialGraphUrl : $.address.value();
        var url = ( $.address.path() === "/" ) ? this.initialGraphUrl : $.address.path();

        if ( href ) {
            if ( this.expandAccordionForHref(href) ) {
                this.loadGraph( href , true );
                this.loadFilters( url );
            } else {
                // Invalid URL - just try the first link available.
                var links = $(".graph-link");
                if ( links.length ) {
                    ClassProfile.loadGraphFromLink( links[0] );
                }
            }
        }
    },

    showGraphThrobber: function(fVisible) {
        if (fVisible) {
            $("#graph-progress-bar").progressbar({value: 100}).slideDown("fast");
        } else {
            $("#graph-progress-bar").slideUp("fast", function() {
                $(this).hide();
            });
        }
    },

    // TODO: move this out to a more generic utility file.
    parseQueryString: function(url) {
        var qs = {};
        var parts = url.split('?');
        if(parts.length == 2) {
            var querystring = parts[1].split('&');
            for(var i = 0; i<querystring.length; i++) {
                var kv = querystring[i].split('=');
                if(kv[0].length > 0) { //fix trailing &
                    key = decodeURIComponent(kv[0]);
                    value = decodeURIComponent(kv[1]);
                    qs[key] = value;
                }
            }
        }
        return qs;
    },

    // TODO: move this out to a more generic utility file.
    reconstructQueryString: function(hash, kvjoin, eljoin) {
        kvjoin = kvjoin || '=';
        eljoin = eljoin || '&';
        qs = [];
        for(var key in hash) {
            if(hash.hasOwnProperty(key))
                qs.push(key + kvjoin + hash[key]);
        }
        return qs.join(eljoin);
    },

    getStudentListFromId: function (list_id) {
        var student_list;
        jQuery.each(this.studentLists, function(i,l) {
            if (l.key == list_id) {
                student_list = l;
                return false;
            }
        });
        return student_list;
    },

    // called whenever user selects student list dropdown
    updateStudentList: function(event, ui) {
        // change which item has the selected attribute
        // weird stuff happening with .data(), just use attr for now...
        var $dropdown = $('#studentlists_dropdown ol');
        $dropdown.children('li[data-selected=selected]').removeAttr('data-selected');
        $(ui.item).attr('data-selected', 'selected');

        // store which class list is selected
        var student_list = ClassProfile.getStudentListFromId(ui.item.data('list_id'));
        $dropdown.data('selected', student_list);

        // update the address parameter
        $.address.parameter("list_id",ui.item.data('list_id'))


        // update appearance of dropdown
        $('#studentlists_dropdown .ui-button-text').text(student_list.name);
        $dropdown.hide();

        $('#count_students').html('&hellip;');
        $('#energy-points .energy-points-badge').html('&hellip;');
    },

    updateStudentInfo: function(students, energyPoints) {
        $('#count_students').text(students + '');
        if ( typeof energyPoints !== "string" ) {
            energyPoints = addCommas(energyPoints);
        }
        $('#energy-points .energy-points-badge').text(energyPoints);
    },

    renderStudentProgressReport: function(data, href) {
        ClassProfile.updateStudentInfo(data.exercise_data.length, data.c_points);

        $.each(data.exercise_names, function(idx, exercise) {
            exercise.display_name_lower = exercise.display_name.toLowerCase();
            exercise.idx = idx;
        });

        data.exercise_list = [];
        $.each(data.exercise_data, function(idx, student_row) {
            data.exercise_list.push(student_row);
        });
        data.exercise_list.sort(function(a, b) { if (a.nickname < b.nickname) return -1; else if (b.nickname < a.nickname) return 1; return 0; });

        $.each(data.exercise_list, function(idx, student_row) {
            student_row.idx = idx;
            student_row.nickname_lower = student_row.nickname.toLowerCase();

            $.each(student_row.exercises, function(idx2, exercise) {
                exercise.exercise_display = data.exercise_names[idx2].display_name;
                exercise.progress = (exercise.progress*100).toFixed(0);
                // TODO: awkward turtle, replace w normal href
                exercise.link = student_row.profile_root
                                    + "/vital-statistics/problems/"
                                    + data.exercise_names[idx2].name;
                if (exercise.last_done) {
                    exercise.seconds_since_done = ((new Date()).getTime() - Date.parse(exercise.last_done)) / 1000;
                } else {
                    exercise.seconds_since_done = 1000000;
                }

                exercise.status_css = 'transparent';
                if (exercise.status == 'Review') exercise.status_css = 'review light';
                else if (exercise.status.indexOf('Proficient') == 0) exercise.status_css = 'proficient';
                else if (exercise.status == 'Struggling') exercise.status_css = 'struggling';
                else if (exercise.status == 'Started') exercise.status_css = 'started';
                exercise.notTransparent = (exercise.status_css != 'transparent');

                exercise.idx = idx2;
            });
        });

        var template = Templates.get("studentlists.class-progress-report");

        $("#graph-content").html(template(data));
        ProgressReport.init(data);
    }
};
;
/**
 * Extends ClassProfile with goals rendering, sorting, and filtering functions
 */
_.extend(ClassProfile, {
    renderStudentGoals: function(data, href) {
        var studentGoalsViewModel = {
            rowData: [],
            sortDesc: '',
            filterDesc: '',
            colors: "goals-class"
        };

        $.each(data, function(idx1, student) {
            student.goal_count = 0;
            student.most_recent_update = null;
            student.profile_url = student.profile_root + "goals";

            if (student.goals != undefined && student.goals.length > 0) {
                $.each(student.goals, function(idx2, goal) {
                    // Sort objectives by status
                    var progress_count = 0;
                    var found_struggling = false;

                    goal.objectiveWidth = 100/goal.objectives.length;
                    goal.objectives.sort(function(a,b) { return b.progress-a.progress; });

                    $.each(goal.objectives, function(idx3, objective) {
                        Goal.calcObjectiveDependents(objective, goal.objectiveWidth);

                        if (objective.status == 'proficient')
                            progress_count += 1000;
                        else if (objective.status == 'started' || objective.status == 'struggling')
                            progress_count += 1;

                        if (objective.status == 'struggling') {
                            found_struggling = true;
                            objective.struggling = true;
                        }
                        objective.statusCSS = objective.status ? objective.status : "not-started";
                        objective.objectiveID = idx3;
                        var base = student.profile_root + "vital-statistics";
                        if (objective.type === "GoalObjectiveExerciseProficiency") {
                            objective.url = base + "/problems/" + objective.internal_id;
                        } else if (objective.type === "GoalObjectiveAnyExerciseProficiency") {
                            objective.url = base + "/skill-progress";
                        } else {
                            objective.url = base + "/activity";
                        }
                    });

                    // normalize so completed goals sort correctly
                    if (goal.objectives.length) {
                        progress_count /= goal.objectives.length;
                    }

                    if (!student.most_recent_update || goal.updated > student.most_recent_update)
                        student.most_recent_update = goal;

                    student.goal_count++;
                    row = {
                        rowID: studentGoalsViewModel.rowData.length,
                        student: student,
                        goal: goal,
                        progress_count: progress_count,
                        goal_idx: student.goal_count,
                        struggling: found_struggling
                    };

                    $.each(goal.objectives, function(idx3, objective) {
                        objective.row = row;
                    });
                    studentGoalsViewModel.rowData.push(row);
                });
            } else {
                studentGoalsViewModel.rowData.push({
                    rowID: studentGoalsViewModel.rowData.length,
                    student: student,
                    goal: {objectives: []},
                    progress_count: -1,
                    goal_idx: 0,
                    struggling: false
                });
            }
        });

        var template = Templates.get("studentlists.class-goals");
        $("#graph-content").html(template(studentGoalsViewModel));

        $("#class-student-goal .goal-row").each(function() {
            var goalViewModel = studentGoalsViewModel.rowData[$(this).attr('data-id')];
            goalViewModel.rowElement = this;
            goalViewModel.countElement = $(this).find('.goal-count');
            goalViewModel.startTimeElement = $(this).find('.goal-start-time');
            goalViewModel.updateTimeElement = $(this).find('.goal-update-time');

            Profile.hoverContent($(this).find(".objective"));

            $(this).find("a.objective").each(function() {
                var goalObjective = goalViewModel.goal.objectives[$(this).attr('data-id')];
                goalObjective.blockElement = this;

                if (goalObjective.type == 'GoalObjectiveExerciseProficiency') {
                    $(this).click(function() {
                        // TODO: awkward turtle, replace with normal href action
                        window.location = goalViewModel.student.profile_root
                                            + "/vital-statistics/problems/"
                                            + goalObjective.internal_id;
                    });
                } else {
                    // Do something here for videos?
                }
            });
        });

        $("#student-goals-sort")
            .off("change.goalsfilter")
            .on("change.goalsfilter", function() {
                ClassProfile.sortStudentGoals(studentGoalsViewModel);
            });
        $("input.student-goals-filter-check")
            .off("change.goalsfilter")
            .on("change.goalsfilter", function() {
                ClassProfile.filterStudentGoals(studentGoalsViewModel);
            });
        $("#student-goals-search")
            .off("keyup.goalsfilter")
            .on("keyup.goalsfilter", function() {
                ClassProfile.filterStudentGoals(studentGoalsViewModel);
            });

        ClassProfile.sortStudentGoals(studentGoalsViewModel);
        ClassProfile.filterStudentGoals(studentGoalsViewModel);
    },

    sortStudentGoals: function(studentGoalsViewModel) {
        var sort = $("#student-goals-sort").val();
        var show_updated = false;

        if (sort == 'name') {
            studentGoalsViewModel.rowData.sort(function(a,b) {
                if (b.student.nickname > a.student.nickname)
                    return -1;
                if (b.student.nickname < a.student.nickname)
                    return 1;
                return a.goal_idx-b.goal_idx;
            });

            studentGoalsViewModel.sortDesc = 'student name';
            show_updated = false; // started

        } else if (sort == 'progress') {
            studentGoalsViewModel.rowData.sort(function(a,b) {
                return b.progress_count - a.progress_count;
            });

            studentGoalsViewModel.sortDesc = 'goal progress';
            show_updated = true; // updated

        } else if (sort == 'created') {
            studentGoalsViewModel.rowData.sort(function(a,b) {
                if (a.goal && !b.goal)
                    return -1;
                if (b.goal && !a.goal)
                    return 1;
                if (a.goal && b.goal) {
                    if (b.goal.created > a.goal.created)
                        return 1;
                    if (b.goal.created < a.goal.created)
                        return -1;
                }
                return 0;
            });

            studentGoalsViewModel.sortDesc = 'goal creation time';
            show_updated = false; // started

        } else if (sort == 'updated') {
            studentGoalsViewModel.rowData.sort(function(a,b) {
                if (a.goal && !b.goal)
                    return -1;
                if (b.goal && !a.goal)
                    return 1;
                if (a.goal && b.goal) {
                    if (b.goal.updated > a.goal.updated)
                        return 1;
                    if (b.goal.updated < a.goal.updated)
                        return -1;
                }
                return 0;
            });

            studentGoalsViewModel.sortDesc = 'last work logged time';
            show_updated = true; // updated
        }

        var container = $('#class-student-goal').detach();
        $.each(studentGoalsViewModel.rowData, function(idx, row) {
            $(row.rowElement).detach();
            $(row.rowElement).appendTo(container);
            if (show_updated) {
                row.startTimeElement.hide();
                row.updateTimeElement.show();
            } else {
                row.startTimeElement.show();
                row.updateTimeElement.hide();
            }
        });
        container.insertAfter('#class-goal-filter-desc');

        ClassProfile.updateStudentGoalsFilterText(studentGoalsViewModel);
    },

    updateStudentGoalsFilterText: function(studentGoalsViewModel) {
        var text = 'Sorted by ' + studentGoalsViewModel.sortDesc + '. ' + studentGoalsViewModel.filterDesc + '.';
        $('#class-goal-filter-desc').html(text);
    },

    filterStudentGoals: function(studentGoalsViewModel) {
        var filter_text = $.trim($("#student-goals-search").val().toLowerCase());
        var filters = {};
        $("input.student-goals-filter-check").each(function(idx, element) {
            filters[$(element).attr('name')] = $(element).is(":checked");
        });

        studentGoalsViewModel.filterDesc = '';
        if (filters['most-recent']) {
            studentGoalsViewModel.filterDesc += 'most recently worked on goals';
        }
        if (filters['in-progress']) {
            if (studentGoalsViewModel.filterDesc != '') studentGoalsViewModel.filterDesc += ', ';
            studentGoalsViewModel.filterDesc += 'goals in progress';
        }
        if (filters['struggling']) {
            if (studentGoalsViewModel.filterDesc != '') studentGoalsViewModel.filterDesc += ', ';
            studentGoalsViewModel.filterDesc += 'students who are struggling';
        }
        if (filter_text != '') {
            if (studentGoalsViewModel.filterDesc != '') studentGoalsViewModel.filterDesc += ', ';
            studentGoalsViewModel.filterDesc += 'students/goals matching "' + filter_text + '"';
        }
        if (studentGoalsViewModel.filterDesc != '')
            studentGoalsViewModel.filterDesc = 'Showing only ' + studentGoalsViewModel.filterDesc;
        else
            studentGoalsViewModel.filterDesc = 'No filters applied';

        var container = $('#class-student-goal').detach();

        $.each(studentGoalsViewModel.rowData, function(idx, row) {
            var row_visible = true;

            if (filters['most-recent']) {
                row_visible = row_visible && (!row.goal || (row.goal == row.student.most_recent_update));
            }
            if (filters['in-progress']) {
                row_visible = row_visible && (row.goal && (row.progress_count > 0));
            }
            if (filters['struggling']) {
                row_visible = row_visible && (row.struggling);
            }
            if (row_visible) {
                if (filter_text == '' || row.student.nickname.toLowerCase().indexOf(filter_text) >= 0) {
                    if (row.goal) {
                        $.each(row.goal.objectives, function(idx, objective) {
                            $(objective.blockElement).removeClass('matches-filter');
                        });
                    }
                } else {
                    row_visible = false;
                    if (row.goal) {
                        $.each(row.goal.objectives, function(idx, objective) {
                            if ((objective.description.toLowerCase().indexOf(filter_text) >= 0)) {
                                row_visible = true;
                                $(objective.blockElement).addClass('matches-filter');
                            } else {
                                $(objective.blockElement).removeClass('matches-filter');
                            }
                        });
                    }
                }
            }

            if (row_visible)
                $(row.rowElement).show();
            else
                $(row.rowElement).hide();

            if (filters['most-recent'])
                row.countElement.hide();
            else
                row.countElement.show();
        });

        container.insertAfter('#class-goal-filter-desc');

        ClassProfile.updateStudentGoalsFilterText(studentGoalsViewModel);
    }
});
;
var ProgressReport = {

    updateFilterTimeout: null,

    studentRowView: Backbone.View.extend({
        initialize: function() {
            this.columnViews = [];
        },

        updateFilter: function(visibleColumns) {
            if (this.model.visible) {
                if (this.model.highlight && this.options.allowHighlight) {
                    $(this.el).addClass('highlight');
                } else {
                    $(this.el).removeClass('highlight');
                }

                if (this.model.hiddenCount) {
                    $(this.el).find('.hidden-students').html('(' + this.model.hiddenCount + ' hidden)');
                }

                $(this.el).show();

                $.each(this.columnViews, function(idx, columnView) {
                    columnView.updateFilter(visibleColumns, null, this.model.matchingCells);
                });
            } else {
                $(this.el).hide();
            }
        }
    }),
    studentColumnView: Backbone.View.extend({
        updateFilter: function(visibleColumns, matchingColumns, matchingCells) {
            if (visibleColumns[this.options.index]) {
                if (matchingColumns && matchingColumns[this.options.index]) {
                    $(this.el).addClass('highlight');
                } else {
                    $(this.el).removeClass('highlight');
                }

                if (matchingCells && !matchingCells[this.options.index]) {
                    $(this.el).addClass('notmatching');
                } else {
                    $(this.el).removeClass('notmatching');
                }

                $(this.el).show();
            } else {
                $(this.el).hide();
            }
        }
    }),

    init: function(model) {
        var self = this;

        this.model = model;
        this.rowViews = [];
        this.headingViews = [];
        this.hiddenStudentsModel = {
            'visible': false,
            'highlight': false,
            'hiddenCount': 10
        };

        if ($.browser.msie && parseInt($.browser.version) < 8) {
            this.showBrowserRequirements();
            return;
        }

        var adjustData = this.preAdjustTable();
        temporaryDetachElement($('#module-progress'), function() {
            this.adjustTable(adjustData);
        }, this);

        this.onResize();
        $("#module-progress td.student-module-status").hover(this.onHover, this.onUnhover);

        if (!window.fBoundProgressReport) {
            $(window).resize(ProgressReport.onResize);
            $(document).mousemove(function(e){window.mouseX = e.pageX; window.mouseY = e.pageY;});
            window.fBoundProgressReport = true;
        }

        $('#module-progress').find('th.student-exercises-col').each(function() {
            var col_idx = $(this).attr('data-id');
            self.headingViews.push(new ProgressReport.studentColumnView({
                el: this,
                model: null,
                index: col_idx
            }));
        });
        $('#module-progress').find('tr.student-email-row').each(function() {
            var row_idx = $(this).attr('data-id');
            var row = (row_idx >= 0) ? model.exercise_list[row_idx] : self.hiddenStudentsModel;
            self.rowViews.push(new ProgressReport.studentRowView({
                el: this,
                model: row,
                allowHighlight: true
            }));
        });
        $('#module-progress').find('tr.student-exercises-row').each(function() {
            var row_idx = $(this).attr('data-id');
            var row = (row_idx >= 0) ? model.exercise_list[row_idx] : self.hiddenStudentsModel;

            var rowView = new ProgressReport.studentRowView({
                el: this,
                model: row
            });
            self.rowViews.push(rowView);

            $(this).find('td.student-module-status').each(function() {
                var col_idx = $(this).attr('data-id');
                rowView.columnViews.push(new ProgressReport.studentColumnView({
                    el: this,
                    model: row,
                    index: col_idx
                }));
                $(this).click(function() {
                    // TODO: awkward turtle this should really just be a link,
                    // but I don't feel like combing through right now.
                    window.location = row.exercises[col_idx].link;
                });
            });
        });

        $("#student-progressreport-search").unbind();
        $("#student-progressreport-search").keyup(function() {
            if (ProgressReport.updateFilterTimeout == null) {
                ProgressReport.updateFilterTimeout = setTimeout(function() {
                    ProgressReport.filterRows(model);
                    ProgressReport.updateFilterTimeout = null;
                }, 250);
            }
        });

        $("input.progressreport-filter-check").unbind();
        $("input.progressreport-filter-check").change(function() { ProgressReport.filterRows(model); });
        $("#progressreport-filter-last-time").change(function() {
            $("input.progressreport-filter-check[name=\"recent\"]").attr("checked", true);
            ProgressReport.filterRows(model);
        });

        ProgressReport.filterRows(model);
    },

    filterRows: function(model) {
        var filterText = $.trim($('#student-progressreport-search').val().toLowerCase());
        var filters = {};
        $("input.progressreport-filter-check").each(function(idx, element) {
            filters[$(element).attr('name')] = $(element).is(":checked");
        });
        var filterRecentTime = $("#progressreport-filter-last-time").val();

        var visibleColumns = [];
        var matchingColumns = [];
        var hiddenCount = 0;

        // Match columns with filter text
        $.each(model.exercise_names, function(idx, exercise) {
            matchingColumns[idx] = (filterText != '' && exercise.display_name_lower.indexOf(filterText) > -1);
            visibleColumns[idx] = matchingColumns[idx] || (filterText == '');
        });

        // Match rows with filter text
        $.each(model.exercise_list, function(idx, studentRow) {
            var foundMatchingExercise = false;
            var matchesFilter = filterText == '' || studentRow.nickname_lower.indexOf(filterText) > -1;

            $.each(studentRow.exercises, function(idx2, exercise) {
                if (exercise.status != '' && matchingColumns[idx2]) {
                    foundMatchingExercise = true;
                    return false;
                }
            });

            if (foundMatchingExercise || matchesFilter) {

                studentRow.visible = true;
                studentRow.highlight = matchesFilter && (filterText != '');

                if (matchesFilter) {
                    $.each(studentRow.exercises, function(idx2, exercise) {
                        if (exercise.status != '')
                            visibleColumns[idx2] = true;
                    });
                }
            } else {
                studentRow.visible = false;
                hiddenCount++;
            }
        });

        // "Struggling" filter
        if (filters['struggling'] || filters['recent']) {
            var filteredColumns = [];

            // Hide students who are not struggling in one of the visible columns
            $.each(model.exercise_list, function(idx, studentRow) {
                if (studentRow.visible) {
                    var foundValid = false;
                    studentRow.matchingCells = [];
                    $.each(studentRow.exercises, function(idx2, exercise) {
                        var valid = visibleColumns[idx2];
                        if (filters['struggling'] && exercise.status != 'Struggling') {
                            valid = false;
                        } else if (filters['recent'] && exercise.seconds_since_done > 60*60*24*filterRecentTime) {
                            valid = false;
                        }
                        if (valid) {
                            studentRow.matchingCells[idx2] = true;
                            filteredColumns[idx2] = true;
                            foundValid = true;
                        } else {
                            studentRow.matchingCells[idx2] = (exercise.status == '');
                        }
                    });
                    if (!foundValid) {
                        studentRow.visible = false;
                        hiddenCount++;
                    }
                }
            });

            // Hide columns that don't match the filter
            $.each(model.exercise_names, function(idx, exercise) {
                if (!matchingColumns[idx] && !filteredColumns[idx])
                    visibleColumns[idx] = false;
            });
        } else {
            $.each(model.exercise_list, function(idx, studentRow) {
                studentRow.matchingCells = null;
            });
        }

        this.hiddenStudentsModel.visible = (hiddenCount > 0);
        this.hiddenStudentsModel.hiddenCount = hiddenCount;

        temporaryDetachElement($('#module-progress'), function() {
            _.each(this.rowViews, function(rowView) {
                rowView.updateFilter(visibleColumns);
            });
            _.each(this.headingViews, function(colView) {
                colView.updateFilter(visibleColumns, matchingColumns);
            });
        }, this);

        var adjustData = this.preAdjustTable();
        temporaryDetachElement($('#module-progress'), function() {
            this.adjustTable(adjustData);
        }, this);
    },

    showBrowserRequirements: function() {
        $("#module-progress").replaceWith("<div class='graph-notification'>This chart requires a newer browser such as Google Chrome, Safari, Firefox, or Internet Explorer 8+.</div>");
    },

    hoverDiv: function() {
        if (!window.elProgressReportHoverDiv)
        {
            window.elProgressReportHoverDiv = $("<div class='exercise-info-hover' style='position:absolute;display:none;'></div>");
            $(document.body).append(window.elProgressReportHoverDiv);
        }
        return window.elProgressReportHoverDiv;
    },

    onHover: function() {
        var dtLastHover = window.dtLastHover = new Date();
        var self = this;
        setTimeout(function(){
            if (dtLastHover != window.dtLastHover) return;

            var sHover = $(self).find(".hover-content");
            if (sHover.length)
            {
                var jelHover = $(ProgressReport.hoverDiv());
                jelHover.html(sHover.html());

                var left = window.mouseX + 15;
                if (left + 150 > $(window).scrollLeft() + $(window).width()) left -= 150;

                var top = window.mouseY + 5;
                if (top + 115 > $(window).scrollTop() + $(window).height()) top -= 115;

                jelHover.css('left', left).css('top', top);
                jelHover.css('cursor', 'pointer');
                jelHover.show();
            }
        }, 100);
    },

    onUnhover: function() {
        window.dtLastHover = null;
        $(ProgressReport.hoverDiv()).hide();
    },

    onScroll: function() {

        var jelTable = $("#table_div");
        var jelHeader = $("#divHeader");
        var jelColumn = $("#firstcol");

        var leftTable = jelTable.scrollLeft();
        var topTable = jelTable.scrollTop();

        var leftHeader = jelHeader.scrollLeft(leftTable).scrollLeft();
        var topColumn = jelColumn.scrollTop(topTable).scrollTop();

        if (leftHeader < leftTable)
        {
            jelHeader.children().first().css("padding-right", 20);
            jelHeader.scrollLeft(leftTable);
        }

        if (topColumn < topTable)
        {
            jelColumn.children().first().css("padding-bottom", 20);
            jelColumn.scrollTop(topTable);
        }
    },

    onResize: function() {

        var width = $("#graph-content").width() - $("#firstTd").width() - 12;
        $(".sizeOnResize").width(width);

    },

    preAdjustTable: function() {

        var adjustData = { tableHeaderWidths: [] };

        // From http://fixed-header-using-jquery.blogspot.com/2009/05/scrollable-table-with-fixed-header-and.html
        //
        var columns = $('#divHeader th:visible');
        var colCount = columns.length-1; //get total number of column

        var m = 0;
        adjustData.brow = 'mozilla';

        jQuery.each(jQuery.browser, function(i, val) {
            if(val == true){
                adjustData.brow = i.toString();
            }
        });

        adjustData.tableDiv = $("#module-progress #table_div");
        adjustData.firstTd = $('#firstTd');
        adjustData.newFirstTdWidth = $('.tableFirstCol:visible').width();
        adjustData.tableHeaderHeight = adjustData.firstTd.height();

        $('#table_div td:visible:lt(' + colCount +')').each(function(index, element) {
            var colIdx = $(this).attr('data-id');
            var cellWidth = $(this).width();
            if (adjustData.brow == 'msie'){
                cellWidth -= 2; //In IE there is difference of 2 px
            }
            adjustData.tableHeaderWidths[colIdx] = { 'width': cellWidth };
        });

        columns.each(function(index, element){
            var colIdx = $(element).attr('data-id');
            if (colIdx) {
                if (adjustData.tableHeaderWidths[colIdx]) {
                    adjustData.tableHeaderWidths[colIdx].header = $(this).find('div.tableHeader');
                    adjustData.tableHeaderWidths[colIdx].headerTh = $(this);
                }
            }
        });

        return adjustData;
    },

    adjustTable: function(adjustData) {

        if (adjustData.brow == 'chrome' || adjustData.brow == 'safari') {
            adjustData.tableDiv.css('top', '1px');
        }

        adjustData.firstTd.css("width",adjustData.newFirstTdWidth);//for adjusting first td
        $.each(adjustData.tableHeaderWidths, function(idx, headerWidth) {
            if (headerWidth)
                if (headerWidth.width >= 0) {
                    $(headerWidth.header).width(headerWidth.width);
                    $(headerWidth.headerTh).height(adjustData.tableHeaderHeight);
                } else {
                    $(headerWidth.header).attr('style','');
                }
        });
    }
};
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["studentlists-package_class-progress-column"]=a(function(a,b,c,d,e){function o(a,b){var d="",e,f;return d+='\n    <span class="exercise-color ',f=c.status,f?e=f.call(a,{hash:{}}):(e=a.status,e=typeof e===k?e():e),d+=l(e)+' segment float-off-spine" style="width: ',e=a.students,e=e==null||e===!1?e:e.length,f=c.toPixelWidth,e=f?f.call(a,e,{hash:{}}):m.call(a,"toPixelWidth",e,{hash:{}}),d+=l(e)+'px;" data-width="',e=a.students,e=e==null||e===!1?e:e.length,f=c.toPixelWidth,e=f?f.call(a,e,{hash:{}}):m.call(a,"toPixelWidth",e,{hash:{}}),d+=l(e)+'" data-status="',e=a.status,f=c.toDisplay,e=f?f.call(a,e,{hash:{}}):m.call(a,"toDisplay",e,{hash:{}}),d+=l(e)+'" data-num="',e=a.students,e=e==null||e===!1?e:e.length,e=typeof e===k?e():e,d+=l(e)+'"><span>',e=a.students,e=e==null||e===!1?e:e.length,f=c.toNumberOfStudents,e=f?f.call(a,e,{hash:{}}):m.call(a,"toNumberOfStudents",e,{hash:{}}),d+=l(e)+"</span></span>\n  ",d}function p(a,b,d){var e="",f;e+='\n    <div class="',f=a.students,f=f==null||f===!1?f:f.length,f=c["if"].call(a,f,{hash:{},inverse:n.noop,fn:n.program(4,q,b)});if(f||f===0)e+=f;e+=' student-list-container float-off-spine">\n      <table style="table-layout: fixed; width: 95px;">\n        ',f=a.students,f=c.each.call(a,f,{hash:{},inverse:n.noop,fn:n.programWithDepth(r,b,d)});if(f||f===0)e+=f;return e+="\n      </table>\n    </div>\n  ",e}function q(a,b){var d="",e,f;return d+="exercise-color ",f=c.status,f?e=f.call(a,{hash:{}}):(e=a.status,e=typeof e===k?e():e),d+=l(e)+" border-only",d}function r(a,b,d){var e="",f,g;return e+='\n        <tr><td>\n        <a class="student-link" href="',g=c.profile_root,g?f=g.call(a,{hash:{}}):(f=a.profile_root,f=typeof f===k?f():f),e+=l(f)+"vital-statistics/problems/",f=d.name,f=typeof f===k?f():f,e+=l(f)+'">',g=c.nickname,g?f=g.call(a,{hash:{}}):(f=a.nickname,f=typeof f===k?f():f),e+=l(f)+"</a>\n        </td></tr>\n        ",e}c=c||a.helpers;var f="",g,h,i,j,k="function",l=this.escapeExpression,m=c.helperMissing,n=this;f+='<div class="fake-row">\n  ',g=b.progress,h={},i=b.progressSide,h.side=i,j=c.progressIter,g=j?j.call(b,g,{hash:h,inverse:n.noop,fn:n.program(1,o,e)}):m.call(b,"progressIter",g,{hash:h,inverse:n.noop,fn:n.program(1,o,e)});if(g||g===0)f+=g;f+='\n</div>\n\n<div class="student-lists">\n  ',g=b.progress,h={},i=b.progressSide,h.side=i,j=c.progressIter,g=j?j.call(b,g,{hash:h,inverse:n.noop,fn:n.programWithDepth(p,e,b)}):m.call(b,"progressIter",g,{hash:h,inverse:n.noop,fn:n.programWithDepth(p,e,b)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["studentlists-package_class-progress-summary"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;d+='\n    <div class="exercise-row">\n      <div class="exercise-name">\n        <span>',f=c.display_name,f?e=f.call(a,{hash:{}}):(e=a.display_name,e=typeof e===i?e():e),d+=j(e)+'</span>\n      </div>\n\n      <div id="left-column">\n        ',e={},e.side="left",f=c.progressColumn,e=f?f.call(a,{hash:e,inverse:h.noop,fn:h.program(2,m,b)}):k.call(a,"progressColumn",{hash:e,inverse:h.noop,fn:h.program(2,m,b)});if(e||e===0)d+=e;d+='\n      </div>\n\n      <div id="right-column">\n        ',e={},e.side="right",f=c.progressColumn,e=f?f.call(a,{hash:e,inverse:h.noop,fn:h.program(4,n,b)}):k.call(a,"progressColumn",{hash:e,inverse:h.noop,fn:h.program(4,n,b)});if(e||e===0)d+=e;return d+='\n      </div>\n\n      <div style="clear: both;"></div>\n    </div>\n  ',d}function m(a,b){var e="",f;e+="\n          ",f=a,f=h.invokePartial(d["studentlists_class-progress-column"],"studentlists_class-progress-column",f,c,d);if(f||f===0)e+=f;return e+="\n        ",e}function n(a,b){var e="",f;e+="\n          ",f=a,f=h.invokePartial(d["studentlists_class-progress-column"],"studentlists_class-progress-column",f,c,d);if(f||f===0)e+=f;return e+="\n        ",e}c=c||a.helpers,d=d||a.partials;var f="",g,h=this,i="function",j=this.escapeExpression,k=c.helperMissing;f+='<div id="progress-summary-container">\n\n  ',g=b.exercises,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.program(1,l,e)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})();
var ProgressSummaryView = function() {
    var fInitialized = false,
        template = Templates.get("studentlists.class-progress-summary"),
        statusInfo = {
                "not-started": {
                    fShowOnLeft: true,
                    order: 0},
                struggling: {
                    fShowOnLeft: true,
                    order: 1},
                started: {
                    fShowOnLeft: false,
                    order: 2},
                proficient: {
                    fShowOnLeft: false,
                    order: 3},
                review: {
                    fShowOnLeft: false,
                    order: 4}
            },
        updateFilterTimeout = null;

    function toPixelWidth(num) {
        return Math.round(200 * num / Profile.numStudents);
    }

    function filterSummaryRows() {
        updateFilterTimeout = null;
        var filterText = $("#student-progresssummary-search").val()
                            .toLowerCase();

        $(".exercise-row").each(function(index) {
            var jel = $(this),
                exerciseName = jel.find(".exercise-name span")
                                .html().toLowerCase();
            if (filterText == "" || exerciseName.indexOf(filterText) > -1) {
                jel.show();
            } else {
                jel.hide();
            }
        });
    }

    function init() {
        fInitialized = true;

        // Register partials and helpers
        Handlebars.registerPartial("studentlists_class-progress-column", Templates.get("studentlists.class-progress-column"));

        Handlebars.registerHelper("toPixelWidth", function(num) {
            return toPixelWidth(num);
        });

        Handlebars.registerHelper("toNumberOfStudents", function(num) {
            if (toPixelWidth(num) < 20) {
                return "";
            }
            return num;
        });

        Handlebars.registerHelper("toDisplay", function(status) {
            if (status === "not-started") {
                return "unstarted";
            }
            return status;
        });

        Handlebars.registerHelper("progressColumn", function(block) {
            this.progressSide = block.hash.side;
            return block(this);
        });

        Handlebars.registerHelper("progressIter", function(progress, block) {
            var result = "",
                fOnLeft = (block.hash.side === "left");

            $.each(progress, function(index, p) {
                if (fOnLeft === statusInfo[p.status].fShowOnLeft) {
                    result += block(p);
                }
            });

            return result;
        });

        // Delegate clicks to expand rows and load student graphs
        $("#graph-content").delegate(".exercise-row", "click", function(e) {
            var jRow = $(this),
                studentLists = jRow.find(".student-lists");

            if (studentLists.is(":visible")) {
                jRow.find(".segment").each(function(index) {
                    var jel = $(this),
                        width = jel.data("width"),
                        span = width < 20 ? "" : jel.data("num");
                    jel.animate({width: width}, 350, "easeInOutCubic")
                        .find("span").html(span);
                });

                studentLists.fadeOut(100, "easeInOutCubic");
            } else {
                jRow.find(".segment").animate({width: 100}, 450, "easeInOutCubic", function() {
                    var jel = $(this),
                        status = jel.data("status");
                    jel.find("span").html(status);
                });

                studentLists.delay(150).fadeIn(650, "easeInOutCubic");
            }
        });

        $("#stats-filters").delegate("#student-progresssummary-search", "keyup", function() {
            if (updateFilterTimeout == null) {
                updateFilterTimeout = setTimeout(filterSummaryRows, 250);
            }
        });
    }

    return {
        render: function(context) {
            if (!fInitialized) {
                init();
            }

            Profile.numStudents = context.num_students;

            $.each(context.exercises, function(index, exercise) {
                exercise.progress.sort(function(first, second) {
                    return statusInfo[first.status].order - statusInfo[second.status].order;
                });
            });

            $("#graph-content").html(template(context));
        }
    };
};
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["studentlists-package_class-goals"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;d+='\n        <div class="goal-row" data-id="',f=c.rowID,f?e=f.call(a,{hash:{}}):(e=a.rowID,e=typeof e===i?e():e),d+=j(e)+'">\n            <div class="student-name">\n                <a href="',e=a.student,e=e==null||e===!1?e:e.profile_url,e=typeof e===i?e():e,d+=j(e)+'">',e=a.student,e=e==null||e===!1?e:e.nickname,e=typeof e===i?e():e,d+=j(e)+"</a>\n                ",e=a.goal,e=e==null||e===!1?e:e.objectives,e=c["if"].call(a,e,{hash:{},inverse:k.noop,fn:k.program(2,m,b)});if(e||e===0)d+=e;d+='\n            </div>\n            <div class="goal ',e=a.goal,e=e==null||e===!1?e:e.completed,e=c["if"].call(a,e,{hash:{},inverse:k.noop,fn:k.program(4,n,b)});if(e||e===0)d+=e;d+='">\n                ',e=a.goal,e=e==null||e===!1?e:e.objectives,e=c["if"].call(a,e,{hash:{},inverse:k.program(10,r,b),fn:k.program(7,p,b)});if(e||e===0)d+=e;return d+="\n            </div>\n        </div>\n    ",d}function m(a,b){var d="",e,f;return d+='\n                <span class="goal-count">(',f=c.goal_idx,f?e=f.call(a,{hash:{}}):(e=a.goal_idx,e=typeof e===i?e():e),d+=j(e)+"/",e=a.student,e=e==null||e===!1?e:e.goal_count,e=typeof e===i?e():e,d+=j(e)+')</span>\n                <div>\n                    <div class="goal-start-time">Started ',e=a.goal,e=e==null||e===!1?e:e.created_ago,e=typeof e===i?e():e,d+=j(e)+'</div>\n                    <div class="goal-update-time">Updated ',e=a.goal,e=e==null||e===!1?e:e.updated_ago,e=typeof e===i?e():e,d+=j(e)+"</div>\n                </div>\n                ",d}function n(a,b){var d;return d=a.goal,d=d==null||d===!1?d:d.abandoned,d=c.unless.call(a,d,{hash:{},inverse:k.noop,fn:k.program(5,o,b)}),d||d===0?d:""}function o(a,b){return"complete"}function p(a,b){var d="",e;d+='\n                    <ul class="inline-list objective-list">\n                    ',e=a.goal,e=e==null||e===!1?e:e.objectives,e=c.each.call(a,e,{hash:{},inverse:k.noop,fn:k.program(8,q,b)});if(e||e===0)d+=e;return d+="\n                    </ul>\n                ",d}function q(a,b){var e="",f;e+="\n                        ",f=a,f=k.invokePartial(d["shared_goal-objectives"],"shared_goal-objectives",f,c,d);if(f||f===0)e+=f;return e+="\n                    ",e}function r(a,b){var c="",d;return c+='\n                    <div class="no-goal">\n                        ',d=a.student,d=d==null||d===!1?d:d.nickname,d=typeof d===i?d():d,c+=j(d)+" is not current working on a goal\n                    </div>\n                ",c}c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div id="class-student-goals" class="',h=c.colors,h?g=h.call(b,{hash:{}}):(g=b.colors,g=typeof g===i?g():g),f+=j(g)+'">\n    <div id="class-goal-filter-desc"></div>\n    <div id="class-student-goal">\n    ',g=b.rowData,g=c.each.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;return f+="\n    </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["studentlists-package_class-progress-report"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+='\n                        <th class="student-exercises-col" data-id="',f=c.idx,f?e=f.call(a,{hash:{}}):(e=a.idx,e=typeof e===h?e():e),d+=i(e)+'"><div class="tableHeader">',f=c.display_name,f?e=f.call(a,{hash:{}}):(e=a.display_name,e=typeof e===h?e():e),d+=i(e)+"</div></th>\n                    ",d}function l(a,b){var d="",e,f;return d+='\n                <tr class="student-email-row" data-id="',f=c.idx,f?e=f.call(a,{hash:{}}):(e=a.idx,e=typeof e===h?e():e),d+=i(e)+'">\n                    <td class="tableFirstCol student-email" style="vertical-align: none;">\n                        <a style="color:#006699;" href="',f=c.profile_root,f?e=f.call(a,{hash:{}}):(e=a.profile_root,e=typeof e===h?e():e),d+=i(e)+'vital-statistics/skill-progress">\n                            <nobr>',f=c.nickname,f?e=f.call(a,{hash:{}}):(e=a.nickname,e=typeof e===h?e():e),d+=i(e)+"</nobr>\n                        </a>\n                    </td>\n                </tr>\n                ",d}function m(a,b){var d="",e,f;d+='\n                    <tr class="student-exercises-row" data-id="',f=c.idx,f?e=f.call(a,{hash:{}}):(e=a.idx,e=typeof e===h?e():e),d+=i(e)+'">\n                      ',e=a.exercises,e=c.each.call(a,e,{hash:{},inverse:j.noop,fn:j.programWithDepth(n,b,a)});if(e||e===0)d+=e;return d+="\n                    </tr>\n                    ",d}function n(a,b,d){var e="",f,g;e+='\n                        <td class="student-module-status exercise-color ',g=c.status_css,g?f=g.call(a,{hash:{}}):(f=a.status_css,f=typeof f===h?f():f),e+=i(f)+" ",f=a.notTransparent,f=c["if"].call(a,f,{hash:{},inverse:j.noop,fn:j.program(7,o,b)});if(f||f===0)e+=f;e+='" data-id="',g=c.idx,g?f=g.call(a,{hash:{}}):(f=a.idx,f=typeof f===h?f():f),e+=i(f)+'">\n                          ',f=a.status,f=c["if"].call(a,f,{hash:{},inverse:j.noop,fn:j.programWithDepth(p,b,d)});if(f||f===0)e+=f;return e+="\n                        </td>\n                      ",e}function o(a,b){return"action-gradient seethrough"}function p(a,b,d){var e="",f,g;e+='\n                          <div class="hover-content" style="display: none;">\n                            <b>',f=d.nickname,f=typeof f===h?f():f,e+=i(f)+"</b><br/>\n                            <b>",g=c.exercise_display,g?f=g.call(a,{hash:{}}):(f=a.exercise_display,f=typeof f===h?f():f),e+=i(f)+"</b><br/>\n                            <em><nobr>Status: ",g=c.status,g?f=g.call(a,{hash:{}}):(f=a.status,f=typeof f===h?f():f),e+=i(f)+"</nobr></em><br/>\n                            <em>Progress: ",g=c.progress,g?f=g.call(a,{hash:{}}):(f=a.progress,f=typeof f===h?f():f),e+=i(f)+"%</em><br/>\n                            ",f=a.last_done_ago,f=c["if"].call(a,f,{hash:{},inverse:j.noop,fn:j.program(10,q,b)});if(f||f===0)e+=f;return e+="\n                            <em>Problems attempted: ",g=c.total_done,g?f=g.call(a,{hash:{}}):(f=a.total_done,f=typeof f===h?f():f),e+=i(f)+"</em>\n                          </div>\n                          ",e}function q(a,b){var d="",e,f;return d+="<em>Last worked on: ",f=c.last_done_ago,f?e=f.call(a,{hash:{}}):(e=a.last_done_ago,e=typeof e===h?e():e),d+=i(e)+"</em></br/>",d}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<table id="module-progress" cellspacing="0" cellpadding="0" border="0">\n    <tr>\n        <th id="firstTd" class="tableHeader">Student Progress</th>\n        <td>\n            <div id="divHeader" class="sizeOnResize" style="overflow:hidden;width:450px; line-height: 15px;">\n                <table cellspacing="0" cellpadding="0" border="1" style="width: 100%">\n                  <tr>\n                    ',g=b.exercise_names,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='\n                    <th style="background: transparent; border-color: transparent; max-width:5px; min-width: 5px; width: 5px">&nbsp;</th>\n                  </tr>\n                </table>\n            </div>\n        </td>\n    </tr>\n    <tr>\n        <td style="vertical-align: top;">\n          <div id="firstcol" style="overflow:hidden;">\n            <table cellspacing="0" cellpadding="0" border="0" >\n                ',g=b.exercise_list,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(3,l,e)});if(g||g===0)f+=g;f+='\n                <tr class="student-email-row" data-id="-1" style="display: none">\n                    <td class="tableFirstCol student-email hidden-students" style="vertical-align: none;">\n                      Hidden students\n                    </td>\n                </tr>\n                <td class="tableFirstCol student-email" style="background: transparent; border-color: transparent; max-width:5px; min-width: 5px; width: 5px">&nbsp;</td>\n            </table>\n          </div>\n        </td>\n\n        <td valign="top">\n            <div id="table_div" class="sizeOnResize fancy-scrollbar" style="overflow:scroll;width:450px;position:relative;" onscroll="ProgressReport.onScroll();" >\n                <table style="width:100%;" cellspacing="0" cellpadding="0" border="0">\n                    ',g=b.exercise_list,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(5,m,e)});if(g||g===0)f+=g;return f+='\n                    <tr class="student-exercises-row" data-id="-1">\n                      <td>&nbsp;</td>\n                    </tr>\n                </table>\n            </div>\n        </td>\n\n    </tr>\n</table>\n',f})})()