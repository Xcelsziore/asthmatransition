
var Video = {

    SHOW_SUBTITLES_COOKIE: "show_subtitles",

    waitingForVideo: null,
    currentVideoPath: null,
    currentVideoData: null,
    rendered: false,
    youtubeBlocked: false,
    pushStateDisabled: false,
    needsUserVideoCSSReload: false,

    init: function(params) {
        var self = this;

        this.videoLibrary = params.videoLibrary || {};
        this.loginURL = params.loginURL;

        if (params.videoTopLevelTopic) {
            this.videoTopLevelTopic = params.videoTopLevelTopic;
            this.rootLength = 1 + params.videoTopLevelTopic.length;

            if (window.history && window.history.pushState && params.videoTopLevelTopic) {
                this.router = new VideoRouter();
                this.router.bind("all", Analytics.handleRouterNavigation);
                Backbone.history.start({
                    pushState: true,
                    root: "/" + params.videoTopLevelTopic + "/"
                });
            } else {
                this.pushStateDisabled = true;
                Video.navigateToVideo(window.location.pathname);
            }
        } else {
            // Used for modal video player
            this.initEventHandlers();
        }

        VideoControls.onYouTubeBlocked(function() {

           var flvPlayerTemplate = Templates.get("video.video-flv-player");
           $("#youtube_blocked")
                .css("visibility", "visible")
                .css("left", "0px")
                .css("position", "relative")
                .html(flvPlayerTemplate({ video_path: self.currentVideoPath }));
           $("#idOVideo").hide();
           $(".subtitles-link").hide();
           $(".transcript-link").hide();
           Video.hideSubtitles();
           VideoStats.prepareAlternativePlayer(); // If YouTube is hidden, use the flv player for statistics

           self.youtubeBlocked = true;
        });

    },

    renderTemplates: function(topicData, videoData) {
        var navTemplate = Templates.get("video.video-nav");
        var descTemplate = Templates.get("video.video-description");
        var headerTemplate = Templates.get("video.video-header");
        var footerTemplate = Templates.get("video.video-footer");

        $("span.video-nav").html(navTemplate({topic: topicData.topic, video: videoData}));
        $(".video-title").html(videoData.title);
        $("div.video-description").html(descTemplate({topic: topicData.topic, video: videoData}));
        $("div.video-header").html(headerTemplate({topic: topicData.topic, video: videoData}));
        $("span.video-footer").html(footerTemplate({topic: topicData.topic, video: videoData}));
    },

    renderPage: function(topicData, videoData) {
        var self = this;

        // Fix up data for templating
        if (videoData.related_exercises &&
            videoData.related_exercises.length) {
            videoData.related_exercises[videoData.related_exercises.length - 1].last = true;
        }

        if (!this.rendered) {
            // Initial page load
            this.rendered = true;
        } else {
            // Subsequent page load; send Google Analytics data
            if (window._gaq) {
                _gaq.push(['_trackPageview', window.location.pathname]);
            }

            // Reload user video CSS
            if (this.needsUserVideoCSSReload) {
                var queryString = '?reload=' + new Date().getTime();
                $('link[rel="stylesheet"]').each(function () {
                    if (this.href.indexOf("user_video_css") > -1) {
                        this.href = this.href.replace(/\?.*|$/, queryString);
                    }
                });
                this.needsUserVideoCSSReload = false;
            }

            // Re-render templates
            this.renderTemplates(topicData, videoData);
        }

        // Bingo conversions for reaching a video page
        gae_bingo.bingo(["videos_landing",
            "struggling_videos_landing"]);

        document.title = videoData.title + " | " + topicData.topic.title + " | Khan Academy";

        this.currentVideoData = videoData;
        this.currentVideoPath = videoData.video_path;

        var jVideoDropdown = $('#video_dropdown');
        if ( jVideoDropdown.length ) {
            jVideoDropdown.css('display', 'inline-block');

            var menu = $("#video_dropdown ol").menu();
            // Set the width explicitly before positioning it absolutely to satisfy IE7.
            menu.width(menu.width()).hide().css('position', 'absolute');
            menu.bind("menuselect", function(e, ui){
                if (self.pushStateDisabled) {
                    window.location.replace(ui.item.children("a").attr("href"));
                } else {
                    var fragment = ui.item.children("a").attr("href").substr(self.rootLength);
                    Video.router.navigate(fragment, {trigger: true});
                }
            });
            $(document).bind("click focusin", function(e) {
                if ($(e.target).closest("#video_dropdown").length === 0) {
                    menu.hide();
                }
            });

            var button = $("#video_dropdown > a").button({
                icons: {
                    secondary: "ui-icon-triangle-1-s"
                }
            }).show().click(function(e) {
                if (menu.css("display") === "none") {
                    menu.show().menu(
                        "activate", e,
                        $("#video_dropdown li[data-selected=selected]")
                    ).focus();
                } else {
                    menu.hide();
                }
                e.preventDefault();
            });
        }

        // If the user starts writing feedback, disable autoplay.
        $("span.video-footer").on("focus keydown", "input,textarea", function(event) {
            VideoControls.setAutoPlayEnabled(false);
        });

        if (this.youtubeBlocked) {
           var flvPlayerTemplate = Templates.get("video.video-flv-player");
           $("#youtube_blocked").html(flvPlayerTemplate({ video_path: this.currentVideoPath }));
           VideoStats.prepareAlternativePlayer(); // If YouTube is hidden, use the flv player for statistics
        } else {
            VideoControls.playVideo(videoData.youtube_id, videoData.key, false);
        }

        // Start up various scripts
        Discussion.init();
        Moderation.init();
        Voting.init();
        Comments.init();
        QA.init();

        this.initEventHandlers();
        VideoStats.updatePointsSaved(videoData.videoPoints);

        // Set up next/previous links
        if (!this.pushStateDisabled) {
            $("a.previous-video,a.next-video").click(function(event) {
                if (self.pushStateDisabled) {
                    return true;
                }
                var fragment = $(this).attr("href").substr(self.rootLength);
                Video.router.navigate(fragment, {trigger: true});
                event.stopPropagation();
                return false;
            });

            if (videoData.next_video) {
                // Autoplay to the next video
                var nextVideoFragment = $("a.next-video").attr("href").substr(self.rootLength);
                VideoControls.setAutoPlayCallback(function() {
                    Video.router.navigate(nextVideoFragment, {trigger: true});
                });
            } else {
                // Don't autoplay to next video
                VideoControls.setAutoPlayCallback(null);
            }
        } else {
            // Autoplay is disabled if there is no pushState support
            VideoControls.setAutoPlayCallback(null);
        }

        VideoControls.initContinuousPlayLinks($("span.video-footer"));

        // Preload adjacent videos after 15 seconds
        setTimeout(function() {
            if (videoData.previous_video) {
                Video.loadVideo(topicData.topic.id, videoData.previous_video.readable_id);
            }
            if (videoData.next_video) {
                Video.loadVideo(topicData.topic.id, videoData.next_video.readable_id);
            }
        }, 15000);

        this.waitingForVideo = null;
    },

    updateVideoPoints: function(points) {
        if (this.currentVideoData) {
            this.currentVideoData.videoPoints = points;
        }
        VideoStats.updatePointsSaved(points);
        this.needsUserVideoCSSReload = true;
    },

    initEventHandlers: function() {

        $(".and-more").click(function() {
            $(this).hide();
            $(".more-content").show();
            return false;
        });

        $(".subtitles-link").click(function() { Video.toggleSubtitles(); return false; });
        if (readCookie(this.SHOW_SUBTITLES_COOKIE)) {
            this.showSubtitles();
        }

        var transcript = $(".subtitles-container");
        var transcriptLink = $(".transcript-link");
        if (transcript.length && transcriptLink.length) {
            InteractiveTranscript.init(transcript);
            transcriptLink.click($.proxy(this._ontranscriptclick, this,
                transcript, transcriptLink));
        }

        // We take the message in the title of the energy points box and place it
        // in a tooltip, and if it's the message with a link to the login we
        // replace it with a nicer link (we don't want to have to pass the url to
        // the templatetag).
        var $points = $(".video-energy-points");
        $points.data("title", $points.attr("title").replace(/Sign in/,
                   "<a href=\"" + this.loginURL + "\">Sign in</a>"))
               .removeAttr("title");

        VideoStats.tooltip("#points-badge-hover", $points.data("title"));
    },

    navigateToVideo: function(path) {
        // Strip out any query string
        var queryIndex = path.indexOf("?");
        if (queryIndex > -1) {
            path = path.substr(0, queryIndex);
        }

        // Strip out leading slash
        if (path.charAt(0) == "/") {
            path = path.substr(1);
        }

        pathList = [this.videoTopLevelTopic].concat(path.split("/"));
        if (pathList.length >= 3) {
            var video = pathList[pathList.length-1];
            var topic = pathList[pathList.length-3];

            this.waitingForVideo = { topic: topic, video: video, url: "/" + this.videoTopLevelTopic + "/" + path };
            this.loadVideo(topic, video);
        }
    },

    loadVideo: function(topic, video) {
        var self = this;
        var descTemplate = Templates.get("video.video-description");
        var waitingForVideo = (Video.waitingForVideo && 
            Video.waitingForVideo.topic == topic &&
            Video.waitingForVideo.video == video);

        if (this.videoLibrary[topic] && this.videoLibrary[topic].videos[video]) {
            if (waitingForVideo) {
                if (this.videoLibrary[topic].videos[video] !== "LOADING") {
                    KAConsole.log("Switching to video: " + video + " in topic " + topic);
                    Video.renderPage(this.videoLibrary[topic], this.videoLibrary[topic].videos[video]);
                    return; // No longer waiting
                }
            } else {
                return; // Nothing to do
            }
        } else {
            KAConsole.log("Loading video: " + video + " in topic " + topic);
            url = "/api/v1/videos/" + topic + "/" + video + "/play" + (this.videoLibrary[topic] ? "" : "?topic=1");

            this.videoLibrary[topic] = this.videoLibrary[topic] || { videos: [] };
            this.videoLibrary[topic].videos[video] = "LOADING";

            $.ajax({
                url: url,
                success: function(json) {
                    var waitingForVideo = (Video.waitingForVideo && 
                        Video.waitingForVideo.topic == topic &&
                        Video.waitingForVideo.video == video);
                    if (json.topic)
                        self.videoLibrary[topic].topic = json.topic;
                    self.videoLibrary[topic].videos[video] = json.video;
                    if (waitingForVideo) {
                        KAConsole.log("Switching to video: " + video + " in topic " + topic);
                        Video.renderPage(self.videoLibrary[topic], json.video);
                    }
                },
                error: function() {
                    var waitingForVideo = (Video.waitingForVideo && 
                        Video.waitingForVideo.topic == topic &&
                        Video.waitingForVideo.video == video);
                    if (waitingForVideo) {
                        window.location.assign(Video.waitingForVideo.url);
                    }
                }
            });
        }
        
        if (waitingForVideo) {
            $("span.video-nav").html("");
            $("div.video-description").html(descTemplate({video: { title: "Loading..." }, loading: true }));
            $("div.video-header").html("");
            $("span.video-footer").html("");
        }
    },

    _ontranscriptclick: function(transcript, transcriptLink, e) {
        if (transcript.is(":visible")) {
            transcriptLink.removeClass("toggled");
            InteractiveTranscript.stop();
            transcript.slideUp("fast");
        } else {
            transcriptLink.addClass("toggled");
            transcript.slideDown("fast", function() {
                InteractiveTranscript.start();
                if (window.gae_bingo) {
                    gae_bingo.bingo(["interactive_transcript_shown",
                        "interactive_transcript_shown_binary"]);
                }
            });
        }
    },

    toggleSubtitles: function() {
        if ($(".subtitles-warning").is(":visible")) {
            this.hideSubtitles();
        } else {
            this.showSubtitles();
        }
    },


    hideSubtitles: function() {
        eraseCookie(this.SHOW_SUBTITLES_COOKIE);
        Video.hideSubtitleElements();
    },

    hideSubtitleElements: function() {
        $(".subtitles-link").removeClass("toggled");
        $(".unisubs-videoTab").css("display", "none !important");
        $(".subtitles-warning").hide();
        $(".youtube-video").css("marginBottom", "0px");
        Throbber.hide();
    },

    showSubtitleElements: function() {
        $(".subtitles-link").addClass("toggled");
        $(".youtube-video").css("marginBottom", "32px");
        $(".subtitles-warning").show();
        // 2012-02-23: unisubs uses !important in their styles, forcing us to
        // follow along when showing and hiding their tab.
        $(".unisubs-videoTab").css("display", "block !important");
    },

    showSubtitles: function() {
        if (!this.pushStateDisabled) {
            this.pushStateDisabled = true;
        }

        createCookie(this.SHOW_SUBTITLES_COOKIE, true, 365);
        Video.showSubtitleElements();

        if ($(".unisubs-videoTab").length === 0) {
            window.setTimeout(function() {
                Throbber.show($(".subtitles-warning"), true);
            }, 1);

            $.getScript("http://s3.www.universalsubtitles.org/js/mirosubs-widgetizer.js", function() {
                // Workaround bug where subtitles are not displayed if video was already playing until
                // video is paused and restarted.  We wait 3 secs to give subtitles a chance to load.
                window.setTimeout(function() {
                    if (VideoControls.player &&
                            VideoControls.player.getPlayerState() === 1 /* playing */) {
                        VideoControls.pause();
                        VideoControls.play();
                    }
                }, 3000);
            });
        }
    }
};

window.VideoRouter = Backbone.Router.extend({
    routes: {
        "*path": "video"
    },

    video: function(path) {
        Video.navigateToVideo(path);
    }
});


/*
 * Widget for interactive video subtitles.
 *
 * The video transcript is displayed with the current subtitle "active".
 * Clicking a subtitle jumps to that place in the video. The transcript
 * viewport is scrolled to keep the current subtitle in view.
 */
var InteractiveTranscript = {

    /*
     * The frequency in milliseconds at which to check the visible subtitle.
     */
    POLL_MILLIS: 333,

    /*
     * Whether automatic scrolling is enabled. Turned off when the user is
     * interacting with the transcript.
     */
    autoscroll: true,

    /*
     * The polling interval ID returned by window.setInterval().
     */
    pollIntervalId: null,

    /*
     * The scrollable area containing subtitles.
     */
    viewport: null,

    /*
     * Initialize with the interactive transcript root element. Call only once.
     */
    init: function(root) {
        //TODO: convert to some type of logging that allows for leaving the log
        //lines in for development and auto-stripping them for production.
        //console.log("InteractiveTranscript.init()");
        var viewport = root.find(".subtitles");
        viewport.delegate("a", "click", $.proxy(this._onsubtitleclick, this));
        viewport.hover($.proxy(this._onhover, this));
        this.viewport = viewport;
    },

    /*
     * Begin tracking the active subtitle in the video player.
     */
    start: function() {
        //console.log("InteractiveTranscript.start()");
        this.stop();
        this._pollPlayer();
        this.pollIntervalId = setInterval(
            $.proxy(this._pollPlayer, this), this.POLL_MILLIS);
    },

    /*
     * Stop tracking the active subtitle in the video player.
     */
    stop: function() {
        //console.log("InteractiveTranscript.stop()");
        clearInterval(this.pollIntervalId);
        this.pollIntervalId = null;
    },

    /*
     * Handle mouseenter and mouseleave on the transcript.
     */
    _onhover: function(e) {
        //console.log("InteractiveTranscript._onhover(): type="+e.type);
        this.autoscroll = (e.type === "mouseleave");
    },

    /*
     * Handle click event on a subtitle.
     */
    _onsubtitleclick: function(e) {
        //console.log("InteractiveTranscript._onsubtitleclick()");
        if (!VideoStats.player) {
            return;
        }

        var time = parseFloat($(e.target).parent().data("time"));

        if (!isNaN(time)) {
            VideoStats.player.seekTo(time, true);
            VideoStats.player.playVideo();
        }

        if (window.gae_bingo) {
            gae_bingo.bingo(["interactive_transcript_subtitle_click",
                "interactive_transcript_subtitle_click_binary"])
        }
    },

    /*
     * Activate the subtitle corresponding to the current video position.
     */
    _pollPlayer: function() {
        //console.log("InteractiveTranscript._pollPlayer()");
        if (!VideoStats.player) {
            return;
        }

        var currTime = VideoStats.player.getCurrentTime(),
            lineTime,
            currSub,
            lines = this.viewport.find("li"),
            len = lines.length,
            i;

        for (i = 0; i < len; i++) {
            lineTime = parseFloat($(lines[i]).data("time"));

            // find the next highest element before stepping back by 1
            if (!isNaN(lineTime) && lineTime > currTime) {
                currSub = (i === 0) ? lines[0] : lines[i - 1];
                break;
            }
        }

        if (!$(currSub).is(".active")) {
            this._setActiveSubtitle(currSub || lines[len - 1]);
        }
    },

    /*
     * Activate the given subtitle.
     */
    _setActiveSubtitle: function(subtitle) {
        //console.log("InteractiveTranscript._setActiveSubtitle()");

        var offsetTop,
            height;

        this.viewport.find(".active").removeClass("active");
        $(subtitle).addClass("active");

        if (this.autoscroll) {
            offsetTop = subtitle.offsetTop;
            height = $(subtitle).height();

            // show three lines above the active line
            this.viewport.stop().animate({
                scrollTop: offsetTop - (height * 3)
            });
        }
    }
};

;

var Discussion = {

    init: function() {
        VideoControls.initJumpLinks();
    },

    updateRemaining: function(max, textSelector, charsSelector, charCountSelector, parent) {
        setTimeout(function(){
            var c = 0;
            try {
                c = max - parseInt($(textSelector, parent).val().length);
            }
            catch(e) {
                return;
            };

            if (c <= 0)
                $(charsSelector, parent).addClass("chars_remaining_none");
            else
                $(charsSelector, parent).removeClass("chars_remaining_none");

            // Disable submit buttons within form so user can't submit and lose clipped content.
            var jForm = $(textSelector, parent).parents("form");
            if (jForm.length)
            {
                if (c < 0)
                    $("input[type=button]", jForm).addClass("buttonDisabled").attr("disabled", "disabled");
                else
                    $("input[type=button]", jForm).removeClass("buttonDisabled").removeAttr("disabled");
            }

            $(charCountSelector, parent).html(c);
        }, 1);
    }
};

var Voting = {

    init: function() {
        $(".vote_for").live("click", Voting.voteEntity);
    },

    voteEntity: function(e) {

        if (QA.showNeedsLoginNote(this, "to vote.")) return false;

        var jel = $(this);

        var vote_type = parseInt(jel.attr("data-vote_type"));
        if (!vote_type) return;

        var key = jel.attr("data-key");
        if (!key) return false;

        var fAbstain = jel.is(".voted");

        var jelParent = jel.parents(".comment, .answer, .question").first();
        var jelVotes = jelParent.find(".sum_votes");
        var votes = parseInt($.trim(jelVotes.attr("data-sum_original")));

        $.post("/discussion/voteentity", {
            entity_key: key,
            vote_type: fAbstain ? 0 : vote_type
            },
            function(data) { Voting.finishVoteEntity(data, jel, jelParent, jelVotes, votes); }
        );

        Voting.clearVote(jel, jelParent, jelVotes, votes);

        var votesNext = votes + (fAbstain ? 0 : vote_type);

        if (jelParent.is(".comment"))
            jelVotes.html(votesNext + " vote" + (votesNext == 1 ? "" : "s") + ", ");
        else
            jelVotes.html(votesNext);

        jelVotes.addClass("sum_votes_changed");
        if (!fAbstain) jel.addClass("voted");

        return false;
    },

    clearVote: function(jel, jelParent, jelVotes, votes) {
        jelParent.find("a.vote_for").removeClass("voted");
        jelVotes.removeClass("sum_votes_changed").html(votes);
    },

    finishVoteEntity: function(data, jel, jelParent, jelVotes, votes) {
        if (data && data.error) {
            this.clearVote(jel, jelParent, jelVotes, votes);
            QA.showInfoNote(jel.get(0), data.error);
        }
    }

};

var Moderation = {

    init: function() {
        $(".mod_show").live("click", Moderation.showTools);
        $(".mod_tools .mod_edit").live("click", Moderation.editEntity);
        $(".mod_tools .mod_delete").live("click", Moderation.deleteEntity);
        $(".mod_tools .mod_change").live("click", Moderation.changeEntityType);

        $(".flag_show").live("click", Moderation.showFlagTools);
        $(".flag_tools .flag_as").live("click", Moderation.flagEntity);
    },

    showTools: function() {

        var parent = $(this).parents(".mod_tools");
        if (!parent.length) return;

        $(".mod_tools_show", parent).css("display", "none");
        $(".mod_tools_hidden", parent).css("display", "");

        return false;
    },

    showFlagTools: function() {

        if (QA.showNeedsLoginNote(this, "to flag this item.")) return false;

        var parent = $(this).parents(".flag_tools");
        if (!parent.length) return false;

        $(".flag_tools_show", parent).css("display", "none");
        $(".flag_tools_hidden", parent).css("display", "");

        return false;
    },

    flagEntity: function() {

        var flag = $(this).attr("data-flag");
        if (!flag) return;

        return Moderation.actionWithoutConfirmation(this,
                "/discussion/flagentity",
                {flag: flag},
                "flagged!");
    },

    deleteEntity: function() {
        return Moderation.actionWithConfirmation(this,
                "/discussion/deleteentity",
                null,
                "Are you sure you want to delete this?",
                "deleted!");
    },

    editEntity: function() {
        QA.edit(this);
        return false;
    },

    changeEntityType: function() {
        var target_type = $(this).attr("data-target_type");
        if (!target_type) return;

        return Moderation.actionWithConfirmation(this,
                "/discussion/changeentitytype",
                {target_type: target_type},
                "Are you sure you want to change this to a " + target_type + "?",
                "changed to " + target_type + "!");
    },

    actionWithConfirmation: function(el, sUrl, data, sConfirm, sCompleted) {

        if (!confirm(sConfirm)) return false;

        this.actionWithoutConfirmation(el, sUrl, data, sCompleted);

        return false;
    },

    actionWithoutConfirmation: function(el, sUrl, data, sCompleted) {

        var key = $(el).attr("data-key");
        if (!key) return false;

        if (!data) data = {};
        data["entity_key"] = key;

        $.post(sUrl, data);
        Moderation.finishedAction(el, sCompleted);

        return false;
    },

    finishedAction: function(el, sMsg) {
        var parent = $(el).parents(".tools_hidden");
        if (!parent.length) return;

        parent.text(sMsg);
        Throbber.hide();
    }

};

var QA = {

    page: 0,

    init: function() {

        var jQuestionText = $(".question_text");
        jQuestionText.focus(QA.focusQuestion);
        jQuestionText.change(QA.updateRemainingQuestion).keyup(QA.updateRemainingQuestion);
        jQuestionText.placeholder();

        $("form.questions").submit(function(){return false;});

        $("input.question_submit, input.answer_submit").live("click", QA.submit);
        $(".question_cancel, .answer_cancel").live("click", QA.cancel);
        $(".questions_container .question_container")
            .live("mouseover", QA.hover)
            .live("mouseout", QA.unhover)
            .live("click", QA.expand);
        $(".close_note").live("click", QA.closeNote);

        $(window).resize(QA.repositionStickyNote);

        QA.loadPage($("#qa_page").val() || 0, true, $("#qa_expand_key").val());
        QA.enable();

        $(".video-footer").on("mouseenter", ".author-nickname", function() {
            HoverCard.createHoverCardQtip($(this));
        });
    },

    initPagesAndQuestions: function() {
        $("form.answers").submit(function(){return false;});
        $("a.questions_page").click(function(){ QA.loadPage($(this).attr("page")); return false; });
        $(".add_yours").click(QA.expandAndFocus);
        $(".answer_text").focus(QA.focusAnswer).placeholder();
    },

   submit: function() {

        var parent = QA.getQAParent(this);
        if (!parent.length) return;

        var type = $(parent).is(".answer_container") ? "answer" : "question";

        var jText = $("." + type + "_text", parent);

        if (!$.trim(jText.val()).length) return;
        if (jText.val() == jText.attr("placeholder")) return;

        var data_suffix = "&page=" + QA.page;

        var sUrl = "/discussion/add" + type;
        var jData = $("form." + type, parent);

        var fxnCallback = type == "question" ? QA.finishSubmitQuestion : QA.finishSubmitAnswer;

        if (QA.isInsideExistingQA(this))
        {
            sUrl = "/discussion/editentity";
            jData = $("textarea:first, input[name=entity_key]:first", parent);
            var jPlaylist = $("#topic_key:first");
            jData = jData.add(jPlaylist);
        }

        $.post(sUrl,
                jData.serialize() + data_suffix,
                function(data) {fxnCallback(data, jText[0]);});

        QA.disable();
        Throbber.show($("." + type + "_cancel", parent));
    },

    finishSubmitQuestion: function(data, el) {
        setTimeout(function(){QA.cancel.apply(el)}, 1);
        QA.finishLoadPage(data);
        QA.enable();
    },

    finishSubmitAnswer: function(data, el) {

        var parent = QA.getQuestionParent(el);
        if (!parent.length) return;

        setTimeout(function(){QA.cancel.apply(el)}, 1);
        $(".answers_container", parent).html(data.html);
        VideoControls.initJumpLinks();
        Throbber.hide();
        QA.enable();
    },

    loadPage: function(page, fInitialLoad, qa_expand_key) {

        try { page = parseInt(page); }
        catch(e) { return; }

        if (page < 0) return;

        $.get("/discussion/pagequestions",
                {
                    video_key: $("#video_key").val(),
                    topic_key: $("#topic_key").val(),
                    sort: $("#sort").val(),
                    qa_expand_key: qa_expand_key,
                    page: page
                },
                function(data) { QA.finishLoadPage(data, fInitialLoad); });

        if (!fInitialLoad) Throbber.show($(".questions_page_controls span"));
    },

    finishLoadPage: function(data, fInitialLoad) {
        $(".questions_container").html(data.html);
        QA.page = data.page;
        QA.initPagesAndQuestions();
        if (!fInitialLoad) Throbber.hide();
        VideoControls.initJumpLinks();

        if (fInitialLoad && data.qa_expand_key) {
            // Scroll to expanded question if specified
            var jelQuestion = $("#" + data.qa_expand_key);

            if (jelQuestion.length !== 0) {
                $("html, body").animate({
                    scrollTop: jelQuestion.offset().top
                });
            }

            if (data.count_notifications) {
                $("#top-header .notification-bubble")
                    .text(data.count_notifications);
            } else {
                $("#top-header .user-notification").hide();
            }
        }
    },

    getQAParent: function(el) {
        var parentAnswer = $(el).parents("div.answer_container");
        if (parentAnswer.length) return parentAnswer;
        return QA.getQuestionParent(el);
    },

    getQuestionParent: function(el) {
        return $(el).parents("div.question_container");
    },

    isInsideExistingQA: function(el) {
        var parent = QA.getQAParent(el);
        if (!parent.length) return false;
        return $(".sig", parent).length > 0;
    },

    updateRemainingQuestion: function() {
        Discussion.updateRemaining(500, ".question_text",
                                        ".question_add_controls .chars_remaining",
                                        ".question_add_controls .chars_remaining_count");
    },

    disable: function() {
        $(".question_text, .answer_text").attr("disabled", "disabled");
        $(".question_submit, .answer_submit").addClass("buttonDisabled").attr("disabled", "disabled");
    },

    enable: function() {
        $(".question_text, .answer_text").removeAttr("disabled");
        $(".question_submit, .answer_submit").removeClass("buttonDisabled").removeAttr("disabled");
    },

    showNeedsLoginNote: function(el, sMsg) {
        return this.showNote($(".login_note"), el, sMsg, function(){$(".login_link").focus();});
    },

    showInfoNote: function(el, sMsg) {
        return this.showNote($(".info_note"), el, sMsg);
    },

    closeNote: function() {
        $(".note").hide();
        return false;
    },

    showNote: function(jNote, el, sMsg, fxnCallback) {
        if (jNote.length && el)
        {
            $(".note_desc", jNote).text(sMsg);

            var jTarget = $(el);
            var offset = jTarget.offset();
            var offsetContainer = $("#video-page").offset();

            jNote.css("visibility", "hidden").css("display", "");
            var top = offset.top - offsetContainer.top + (jTarget.height() / 2) - (jNote.height() / 2);
            var left = offset.left - offsetContainer.left + (jTarget.width() / 2) - (jNote.width() / 2);
            jNote.css("top", top).css("left", left).css("visibility", "visible").css("display", "");

            if (fxnCallback) setTimeout(fxnCallback, 50);

            return true;
        }
        return false;
    },

    edit: function(el) {
        var parent = QA.getQAParent(el);

        if (!parent.length) return;

        var type = $(parent).is(".answer_container") ? "answer" : "question";

        var jEntity = $("." + type, parent);
        var jControls = $("." + type + "_controls_container", parent);
        var jSignature = $("." + type + "_sig", parent);

        if (!jEntity.length || !jControls.length || !jSignature.length) return;

        jEntity.addClass(type + "_placeholder").removeClass(type);
        jSignature.css("display", "none");
        jControls.slideDown();

        // Build up a textarea with plaintext content
        var jTextarea = $("<textarea name='" + type + "_text' class='" + type + "_text' rows=2 cols=40></textarea>");

        // Replace BRs with newlines.  Must use {newline} placeholder instead of \n b/c IE
        // doesn't preserve newline content when asking for .text() content below.
        var reBR = /<br>/gi;
        var reBRReverse = /{newline}/g;
        var jSpan = $("span", jEntity).first();
        var htmlEntity = $.browser.msie ? jSpan.html().replace(reBR, "{newline}") : jSpan.html();

        var jContent = $("<div>").html(htmlEntity);

        // Remove any artificially inserted ellipsis
        $(".ellipsisExpand", jContent).remove();

        // Fill, insert, then focus textarea
        var textEntity = $.browser.msie ? jContent.text().replace(reBRReverse, "\n") : jContent.text();
        jTextarea.val($.trim(textEntity));
        jSpan.css("display", "none").after(jTextarea);

        setTimeout(function(){jTextarea.focus();}, 1);
    },

    focusQuestion: function() {

        if (QA.showNeedsLoginNote(this, "to ask your question.")) return false;

        var parent = QA.getQAParent(this);
        if (!parent.length) return;

        $(".question_controls_container", parent).slideDown("fast");
        QA.updateRemainingQuestion();
        QA.showStickyNote();
    },

    cancel: function() {
        var parent = QA.getQAParent(this);
        if (!parent.length) return;

        var type = $(parent).is(".answer_container") ? "answer" : "question";

        $("." + type + "_text", parent).val("").placeholder();

        if (type == "question") QA.hideStickyNote();

        $("." + type + "_controls_container", parent).slideUp("fast");

        if (QA.isInsideExistingQA(this))
        {
            $("textarea", parent).first().remove();
            $("span", parent).first().css("display", "");
            $("." + type + "_placeholder", parent).addClass(type).removeClass(type + "_placeholder");
            $("." + type + "_sig", parent).slideDown("fast");
        }

        return false;
    },

    focusAnswer: function() {

        if (QA.showNeedsLoginNote(this, "to answer this question.")) return false;

        var parent = QA.getQAParent(this);
        if (!parent.length) return;

        $(".answer_controls_container", parent).slideDown("fast");
    },

    hover: function() {
        if ($(this).is(".question_container_expanded")) return;

        $(this).addClass("question_container_hover");
    },

    unhover: function() {
        if ($(this).is(".question_container_expanded")) return;

        $(this).removeClass("question_container_hover");
    },

    repositionStickyNote: function() {
        if ($(".sticky_note").is(":visible")) QA.showStickyNote();
    },

    showStickyNote: function() {
        $(".sticky_note").slideDown("fast");
    },

    hideStickyNote: function() {
        $(".sticky_note").slideUp("fast");
    },

    expandAndFocus: function(e) {

        var parent = QA.getQAParent(this);
        if (!parent.length) return;

        QA.expand.apply(parent[0], [e, function(){$(".answer_text", parent).focus();}]);
        return false;
    },

    expand: function(e, fxnCallback) {
        if ($(this).is(".question_container_expanded")) return;

        var jContentUrlized = $(".question span.question_content_urlized", this);
        $(".question a.question_link", this).replaceWith(jContentUrlized);
        jContentUrlized.css("display", "");
        $(".question_answer_count", this).css("display", "none");
        $(".answers_and_form_container", this).slideDown("fast", fxnCallback);

        QA.unhover.apply(this);

        $(this).addClass("question_container_expanded");

        var key = $(".question", this).attr("data-question_key");
        $.post("/discussion/expandquestion",
                {qa_expand_key: key},
                function(){ /* Fire and forget */ });

        // If user clicks on a link inside of a question during the expand, don't follow the link.
        // YouTube API "5:42"-style links will still control the player in this circumstance.
        if (e) e.preventDefault();
    }

};

var Comments = {

    page: 0,

    init: function() {
        $("a.comment_add").click(Comments.add);
        $("a.comment_show").click(Comments.show);
        $("a.comment_cancel").click(Comments.cancel);
        $("input.comment_submit").click(Comments.submit);
        $("form.comments").submit(function(){return false;});
        $(".comment_text").change(Comments.updateRemaining).keyup(Comments.updateRemaining);

        Comments.loadPage(0, true);
        Comments.enable();
    },

    initPages: function() {
        $("a.comments_page").click(function(){ Comments.loadPage($(this).attr("page")); return false; });
        $("span.ellipsisExpand").click(Comments.expand);
    },

    expand: function() {
        var parent = $(this).parents("div.comment");
        if (!parent.length) return;

        $(this).css("display", "none");
        $("span.hiddenExpand", parent).removeClass("hiddenExpand");
    },

    loadPage: function(page, fInitialLoad) {

        try { page = parseInt(page); }
        catch(e) { return; }

        if (page < 0) return;

        $.get("/discussion/pagecomments",
                {
                    video_key: $("#video_key").val(),
                    topic_key: $("#topic_key").val(),
                    page: page
                },
                function(data) { Comments.finishLoadPage(data, fInitialLoad); });

        if (!fInitialLoad) Throbber.show($(".comments_page_controls span"));
    },

    finishLoadPage: function(data, fInitialLoad) {
        $(".comments_container").html(data.html);
        Comments.page = data.page;
        Comments.initPages();
        if (!fInitialLoad) Throbber.hide();
        VideoControls.initJumpLinks();

        if (!fInitialLoad) {
            document.location = "#comments";
        }
    },

    add: function() {
        $(this).css("display", "none");
        $("div.comment_form").slideDown("fast", function(){$(".comment_text").focus();});
        Comments.updateRemaining();
        return false;
    },

    cancel: function() {
        $("a.comment_add").css("display", "");
        $("div.comment_form").slideUp("fast");
        $(".comment_text").val("");
        return false;
    },

    show: function() {
        $("div.comments_hidden").slideDown("fast");
        $(".comments_show_more").css("display", "none");
        return false;
    },

    submit: function() {

        if (!$.trim($(".comment_text").val()).length) return;

        var fCommentsHidden = $("div.comments_hidden").length && !$("div.comments_hidden").is(":visible");
        var data_suffix = "&comments_hidden=" + (fCommentsHidden ? "1" : "0");
        $.post("/discussion/addcomment",
                $("form.comments").serialize() + data_suffix,
                Comments.finishSubmit);

        Comments.disable();
        Throbber.show($(".comment_cancel"));
    },

    finishSubmit: function(data) {
        Comments.finishLoadPage(data);
        $(".comment_text").val("");
        Comments.updateRemaining();
        Comments.enable();
        Comments.cancel();
    },

    disable: function() {
        $(".comment_text, .comment_submit").attr("disabled", "disabled");
        $(".comment_submit").addClass("buttonDisabled");
    },

    enable: function() {
        $(".comment_text, .comment_submit").removeAttr("disabled");
        $(".comment_submit").removeClass("buttonDisabled");
    },

    updateRemaining: function() {
        Discussion.updateRemaining(300, ".comment_text",
                                        ".comment_add_controls .chars_remaining",
                                        ".comment_add_controls .chars_remaining_count");
    }

};

// Now that we enable YouTube's JS api so we can control the player w/ "{minute}:{second}"-style links,
// we are vulnerable to a bug in IE's flash player's removeCallback implementation.  This wouldn't harm
// most users b/c it only manifests itself during page unload, but for anybody with IE's "show all errors"
// enabled, it becomes an annoying source of "Javascript error occurred" popups on unload.
// So we manually fix up the removeCallback function to be a little more forgiving.
// See http://www.fusioncharts.com/forum/Topic12189-6-1.aspx#bm12281, http://swfupload.org/forum/generaldiscussion/809,
// and http://www.longtailvideo.com/support/forums/jw-player/bug-reports/10374/javascript-error-with-embed.
$(window).unload(
function() {
    (function($){
        $(function(){
            if (typeof __flash__removeCallback != 'undefined'){
                __flash__removeCallback = function(instance, name){
                    if (instance != null && name != null)
                        instance[name] = null;
                };
            }
        });
    })(jQuery);
});
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_thumbnail"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;return d+='\n        <div class="thumb" style="background-image: url(http://img.youtube.com/vi/',f=c.youtubeId,f?e=f.call(a,{hash:{}}):(e=a.youtubeId,e=typeof e===i?e():e),d+=j(e)+'/hqdefault.jpg); ">\n            <div class="thumbnail_label">\n                <div class="thumbnail_desc">\n                    <span class="vid-progress v',f=c.id,f?e=f.call(a,{hash:{}}):(e=a.id,e=typeof e===i?e():e),d+=j(e)+'">',f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===i?e():e),d+=j(e)+'</span>\n                </div>\n                <div class="thumbnail_teaser">',f=c.description,f?e=f.call(a,{hash:{}}):(e=a.description,e=typeof e===i?e():e),d+=j(e)+"</div>\n            </div>\n        </div>\n        ",d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="thumbnail">\n    <a class="related-video" href="',h=c.href,h?g=h.call(b,{hash:{}}):(g=b.href,g=typeof g===i?g():g),f+=j(g)+'" title="',g=b.video,g=g==null||g===!1?g:g.title,g=typeof g===i?g():g,f+=j(g)+'">\n        ',g=b.video,g=c["with"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;return f+="\n    </a>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_related-video-link"]=a(function(a,b,c,d,e){function l(a,b){return"<span class='separator'>, </span>"}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<a class="related-video" href="',h=c.href,h?g=h.call(b,{hash:{}}):(g=b.href,g=typeof g===i?g():g),f+=j(g)+'" title="',g=b.video,g=g==null||g===!1?g:g.title,g=typeof g===i?g():g,f+=j(g)+'">\n    <span class="video-title vid-progress v',g=b.video,g=g==null||g===!1?g:g.id,g=typeof g===i?g():g,f+=j(g)+'">\n        ',g=b.video,g=g==null||g===!1?g:g.title,g=typeof g===i?g():g,f+=j(g),g=b.separator,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;return f+="\n    </span>\n</a>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_modal-video"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;return d+='\n                <a href="',f=c.downloadUrl,f?e=f.call(a,{hash:{}}):(e=a.downloadUrl,e=typeof e===i?e():e),d+=j(e)+'" title="Download this lesson" style="z-index:101;" class="simple-button action-gradient with-icon download-icon download-link">\n                <img src="/images/download-icon-small.png" />\n                         Download\n                </a>\n                ',d}function m(a,b){var d="",e,f;return d+='title="',f=c.points,f?e=f.call(a,{hash:{}}):(e=a.points,e=typeof e===i?e():e),d+=j(e)+' Energy Points earned for watching this video"',d}function n(a,b){return'title="You\'re earning points for watching this video. Sign in to keep them"'}c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div id="modal-video" class="video modal fade hide">\n    <div class="modal-header">\n        <a href="#" class="close-button close">x</a>\n        <div id="description">\n            <h3 class="title-header">\n                <span class="title">',g=b.video,g=g==null||g===!1?g:g.title,g=typeof g===i?g():g,f+=j(g)+'</span>\n                <span class="long-description">: <span>',g=b.video,g=g==null||g===!1?g:g.description,g=typeof g===i?g():g,f+=j(g)+'</span></span>\n            </h3>\n        </div>\n    </div>\n    <div class="modal-body">\n        <div class="youtube-video">\n            ',g=b,g=k.invokePartial(d["youtube-player"],"youtube-player",g,c,d);if(g||g===0)f+=g;f+='\n            <div class="subtitles-warning">\n                &lArr; Use this menu to view and help create subtitles for this video in many different languages.\n                You\'ll probably want to hide YouTube\'s captions if using these subtitles.\n            </div>\n        </div>\n        <span class="video_extra_links">\n            <nobr>\n            <div class="extra-link-bar">\n                <a href="#" title="Toggle subtitles and translations" style="z-index:101;" class="simple-button action-gradient with-icon subtitles-link">\n                    <img src="/images/subtitles-icon-small.png" />\n                    Subtitles\n                </a>\n\n                ',g=b.downloadUrl,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='\n            </div>\n            <span style="float:right;" id="points-badge-hover">\n                <div class="video-energy-points" ',g=b.logged_in,g=c["if"].call(b,g,{hash:{},inverse:k.program(5,n,e),fn:k.program(3,m,e)});if(g||g===0)f+=g;return f+=' >\n                    <span class="video-energy-points-current">',h=c.points,h?g=h.call(b,{hash:{}}):(g=b.points,g=typeof g===i?g():g),f+=j(g)+"</span>\n                    of ",h=c.possible_points,h?g=h.call(b,{hash:{}}):(g=b.possible_points,g=typeof g===i?g():g),f+=j(g)+'\n                </div>\n            </span>\n            </nobr>\n         </span>\n    </div>\n    <div class="modal-footer">\n        <a href="',h=c.video_url,h?g=h.call(b,{hash:{}}):(g=b.video_url,g=typeof g===i?g():g),f+=j(g)+'" class="simple-button action-gradient green">Watch on video page</a>\n    </div>\n</div>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_video-nav"]=a(function(a,b,c,d,e){function k(a,b){var d="",e;d+="\n",e=a.url,e=c["if"].call(a,e,{hash:{},inverse:j.program(4,m,b),fn:j.program(2,l,b)});if(e||e===0)d+=e;return d+="\n",d}function l(a,b){var c="",d;return c+='\n<a href="',d=a.url,d=typeof d===h?d():d,c+=i(d)+'">',d=a.title,d=typeof d===h?d():d,c+=i(d)+'</a>\n<span class="breadcrumb-separator">&#187;</span>\n',c}function m(a,b){var c="",d;return c+="\n<span>",d=a.title,d=typeof d===h?d():d,c+=i(d)+'</span>\n<span class="breadcrumb-separator">&#187;</span>\n',c}function n(a,b,d){var e="",f,g;return e+="\n      <li data-selected='",g=c.selected,g?f=g.call(a,{hash:{}}):(f=a.selected,f=typeof f===h?f():f),e+=i(f)+"'><a href=\"/",f=d.topic,f=f==null||f===!1?f:f.extended_slug,f=typeof f===h?f():f,e+=i(f)+"/v/",g=c.readable_id,g?f=g.call(a,{hash:{}}):(f=a.readable_id,f=typeof f===h?f():f),e+=i(f)+"\"><span class='vid-progress v",g=c.key_id,g?f=g.call(a,{hash:{}}):(f=a.key_id,f=typeof f===h?f():f),e+=i(f)+"'>",g=c.title,g?f=g.call(a,{hash:{}}):(f=a.title,f=typeof f===h?f():f),e+=i(f)+"</span></a></li>\n      ",e}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;g=b.topic,g=g==null||g===!1?g:g.ancestor_topics,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='\n<a href="',g=b.topic,g=g==null||g===!1?g:g.url,g=typeof g===h?g():g,f+=i(g)+'">',g=b.topic,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+'</a>\n<span class="breadcrumb-separator">&#187;</span>\n<span id="video_dropdown" style="display:none;" class="selected">\n  <a href="/',g=b.topic,g=g==null||g===!1?g:g.extended_slug,g=typeof g===h?g():g,f+=i(g)+"/v/",g=b.video,g=g==null||g===!1?g:g.readable_id,g=typeof g===h?g():g,f+=i(g)+'">',g=b.video,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+'</a>\n  <div id="video_menu">\n    <ol>\n      ',g=b.topic,g=g==null||g===!1?g:g.videos,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.programWithDepth(n,e,b)});if(g||g===0)f+=g;return f+="\n    </ol>\n  </div>\n</span>\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_video-description"]=a(function(a,b,c,d,e){function k(a,b){var c="",d;return c+='\n<link itemprop="url" href="',d=a.topic,d=d==null||d===!1?d:d.extended_slug,d=typeof d===h?d():d,c+=i(d)+"/v/",d=a.video,d=d==null||d===!1?d:d.readable_id,d=typeof d===h?d():d,c+=i(d)+'">\n',c}function l(a,b){var c="",d;return c+='\n<a href="',d=a.video,d=d==null||d===!1?d:d.button_top_exercise,d=d==null||d===!1?d:d.url,d=typeof d===h?d():d,c+=i(d)+'" class="practice simple-button action-gradient green desktop-only" title="Test your understanding with an exercise">Practice this concept</a>\n',c}function m(a,b){var d="",e;d+="\n",e=a.video,e=e==null||e===!1?e:e.extra_properties,e=e==null||e===!1?e:e.explore_url,e=c["if"].call(a,e,{hash:{},inverse:j.noop,fn:j.program(6,n,b)});if(e||e===0)d+=e;return d+="\n",d}function n(a,b){var c="",d;return c+='\n<a href="',d=a.video,d=d==null||d===!1?d:d.extra_properties,d=d==null||d===!1?d:d.explore_url,d=typeof d===h?d():d,c+=i(d)+'" class="practice simple-button action-gradient green desktop-only" title="Extend your understanding with an exploration">Explore this concept</a>\n',c}function o(a,b){return"<img src='/images/throbber.gif' />"}function p(a,b){var c="",d;return c+='\n    <span class="long-description"><span class="desktop-only">: </span><span itemprop="description">',d=a.video,d=d==null||d===!1?d:d.description,d=typeof d===h?d():d,c+=i(d)+"</span></span>\n",c}function q(a,b){var d="",e;d+='\n<div class="related-content visited-no-recolor">\n  <span class="related-content-title">Related exercises:</span>\n  <ul class="related-exercise-list">\n    ',e=a.video,e=e==null||e===!1?e:e.related_exercises,e=c.each.call(a,e,{hash:{},inverse:j.noop,fn:j.program(13,r,b)});if(e||e===0)d+=e;return d+="\n  </ul>\n</div>\n",d}function r(a,b){var d="",e,f;d+='\n    <li>\n      <a href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'" title="',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===h?e():e),d+=i(e)+'">',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===h?e():e),d+=i(e)+"</a>\n      ",e=a.last,e=c.unless.call(a,e,{hash:{},inverse:j.noop,fn:j.program(14,s,b)});if(e||e===0)d+=e;return d+="\n    </li>\n    ",d}function s(a,b){return'\n      <span class="separator">, </span>\n      '}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;g=b.topic,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;f+="\n",g=b.video,g=g==null||g===!1?g:g.button_top_exercise,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(3,l,e)});if(g||g===0)f+=g;f+="\n",g=b.video,g=g==null||g===!1?g:g.extra_properties,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(5,m,e)});if(g||g===0)f+=g;f+='\n<h1 class="title-header">\n    ',g=b.loading,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(8,o,e)});if(g||g===0)f+=g;f+='\n    <span itemprop="name" class="title desktop-only">',g=b.video,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+"</span>\n",g=b.video,g=g==null||g===!1?g:g.description,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(10,p,e)});if(g||g===0)f+=g;f+="\n</h1>\n\n",g=b.video,g=g==null||g===!1?g:g.related_exercises,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(12,q,e)});if(g||g===0)f+=g;return f+="\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_video-header"]=a(function(a,b,c,d,e){function k(a,b){var c="",d;return c+='\n    <label id="prev_video">\n      <a rel=prev class="previous-video" href="/',d=a.topic,d=d==null||d===!1?d:d.extended_slug,d=typeof d===h?d():d,c+=i(d)+"/v/",d=a.video,d=d==null||d===!1?d:d.previous_video,d=d==null||d===!1?d:d.readable_id,d=typeof d===h?d():d,c+=i(d)+"\"><b>Previous Video:</b> <span class='vid-progress v",d=a.video,d=d==null||d===!1?d:d.previous_video,d=d==null||d===!1?d:d.key_id,d=typeof d===h?d():d,c+=i(d)+"'>",d=a.video,d=d==null||d===!1?d:d.previous_video,d=d==null||d===!1?d:d.title,d=typeof d===h?d():d,c+=i(d)+"</span> </a>\n    </label>\n    ",c}function l(a,b){var d="",e;d+="\n      ",e=a.topic,e=e==null||e===!1?e:e.previous_topic_video,e=c["if"].call(a,e,{hash:{},inverse:j.noop,fn:j.program(4,m,b)});if(e||e===0)d+=e;return d+="\n    ",d}function m(a,b){var c="",d;return c+='\n        <label id="prev_video">\n          <a rel=prev class="previous-video" href="/',d=a.topic,d=d==null||d===!1?d:d.previous_topic_subtopic_slug,d=typeof d===h?d():d,c+=i(d)+"/v/",d=a.topic,d=d==null||d===!1?d:d.previous_topic_video,d=typeof d===h?d():d,c+=i(d)+'"><b>Previous Topic:</b> ',d=a.topic,d=d==null||d===!1?d:d.previous_topic_title,d=typeof d===h?d():d,c+=i(d)+"</a>\n        </label>\n      ",c}function n(a,b){var c="",d;return c+='\n    <label id="next_video">\n      <a rel=next class="next-video" href="/',d=a.topic,d=d==null||d===!1?d:d.extended_slug,d=typeof d===h?d():d,c+=i(d)+"/v/",d=a.video,d=d==null||d===!1?d:d.next_video,d=d==null||d===!1?d:d.readable_id,d=typeof d===h?d():d,c+=i(d)+"\"><b>Next Video:</b>  <span class='vid-progress v",d=a.video,d=d==null||d===!1?d:d.next_video,d=d==null||d===!1?d:d.key_id,d=typeof d===h?d():d,c+=i(d)+"'>",d=a.video,d=d==null||d===!1?d:d.next_video,d=d==null||d===!1?d:d.title,d=typeof d===h?d():d,c+=i(d)+"</span> </a>\n    </label>\n    ",c}function o(a,b){var d="",e;d+="\n      ",e=a.topic,e=e==null||e===!1?e:e.next_topic_video,e=c["if"].call(a,e,{hash:{},inverse:j.noop,fn:j.program(9,p,b)});if(e||e===0)d+=e;return d+="\n    ",d}function p(a,b){var c="",d;return c+='\n        <label id="next_video">\n          <a rel=next class="next-video" href="/',d=a.topic,d=d==null||d===!1?d:d.next_topic_subtopic_slug,d=typeof d===h?d():d,c+=i(d)+"/v/",d=a.topic,d=d==null||d===!1?d:d.next_topic_video,d=typeof d===h?d():d,c+=i(d)+'"><b>Next Topic:</b> ',d=a.topic,d=d==null||d===!1?d:d.next_topic_title,d=typeof d===h?d():d,c+=i(d)+"</a>\n        </label>\n      ",c}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<nav class="prev_next_nav desktop-only">\n    ',g=b.video,g=g==null||g===!1?g:g.previous_video,g=c["if"].call(b,g,{hash:{},inverse:j.program(3,l,e),fn:j.program(1,k,e)});if(g||g===0)f+=g;f+="\n    ",g=b.video,g=g==null||g===!1?g:g.next_video,g=c["if"].call(b,g,{hash:{},inverse:j.program(8,o,e),fn:j.program(6,n,e)});if(g||g===0)f+=g;return f+='\n    <div class="clear"></div>\n</nav>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_video-footer"]=a(function(a,b,c,d,e){function j(a,b){var d="",e;d+="\n",e=a.video,e=e==null||e===!1?e:e.extra_properties,e=e==null||e===!1?e:e.original_url,e=c["if"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(2,k,b)});if(e||e===0)d+=e;return d+="\n",d}function k(a,b){var c="",d;c+='\n<span>\nLearn more about this work of art in context at <a href="',d=a.video,d=d==null||d===!1?d:d.extra_properties,d=d==null||d===!1?d:d.original_url,d=typeof d===h?d():d;if(d||d===0)c+=d;return c+='">smarthistory.khanacademy.org</a>\n</span>\n',c}c=c||a.helpers;var f="",g,h="function",i=this;g=b.video,g=g==null||g===!1?g:g.player_html,g=typeof g===h?g():g;if(g||g===0)f+=g;f+="\n",g=b.video,g=g==null||g===!1?g:g.subtitles_html,g=typeof g===h?g():g;if(g||g===0)f+=g;f+="\n",g=b.video,g=g==null||g===!1?g:g.extra_properties,g=c["if"].call(b,g,{hash:{},inverse:i.noop,fn:i.program(1,j,e)});if(g||g===0)f+=g;f+="\n",g=b.video,g=g==null||g===!1?g:g.discussion_html,g=typeof g===h?g():g;if(g||g===0)f+=g;return f+="\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["video-package_video-flv-player"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+='<object id="flvPlayer" type="application/x-shockwave-flash" data="/flvplayer/player_flv_maxi.swf" width="800" height="600">\n    <param name="movie" value="/flvplayer/player_flv_maxi.swf" />\n    <param name="allowFullScreen" value="true" />\n    <param name="allowScriptAccess" value="always" />\n    <param name="FlashVars" value="flv=',h=c.video_path,h?g=h.call(b,{hash:{}}):(g=b.video_path,g=typeof g===i?g():g),f+=j(g)+'&amp;showstop=1&amp;showvolume=1&amp;showfullscreen=1&amp;showiconplay=1&amp;bgcolor=FFFFFF&amp;bgcolor1=80C65A&amp;bgcolor2=80C65A&amp;iconplaybgcolor=80C65A&amp;width=800&amp;height=600" />\n    <div>\n            <p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>\n    </div>                \n</object>\n\n',f})})();
var ModalVideo = {
    template: Templates.get("video.modal-video"),
    modal: null,

    linkifyTooltip: function() {
        // We take the message in the title of the energy points box and place it
        // in a tooltip, and if it's the message with a link to the login we
        // replace it with a nicer link (we don't want to have to pass the url to
        // the templatetag).
        var $points = $(".video-energy-points");
        var loginUrl = $("#top-header-links a").filter(function(i, el) {
            return $(el).text() == "Login";
        }).attr("href");
        var title = ($points.attr("title") || $points.data("title"))
            .replace(/Sign in/, '<a href="' + loginUrl + '">Sign in</a>');
        $points.data("title", title).removeAttr("title");

        VideoStats.tooltip("#points-badge-hover", $points.data("title"));
    },

    hookup: function() {
        // ev.which doesn't work in IE<9 on click events, so get it from
        // ev.button on a mouseup event (which comes first)
        var mouseupButton = 0;

        // add click handlers to all related video links for lightbox
        jQuery(document).delegate("a.related-video", {
            mouseup: function(ev) {
                mouseupButton = ev.button;
                return true;
            },
            click: function(ev) {
                // workaround for IE<=8
                ev.which = ev.which || mouseupButton;
                mouseupButton = 0;

                if (ev.which == 1) {
                    // left mouse button: show modal video

                    var videoModel = $(ev.currentTarget).data("video");
                    if (!videoModel) {
                        // no video has been associated, this is probably an
                        // inline link from the exercise itself.
                        var youtubeId = $(ev.currentTarget).data("youtube-id");
                        if (youtubeId) {
                            videoModel = _.find(Khan.relatedVideos.videos, function(v) {
                                return v.youtubeId == youtubeId;
                            });
                        }
                    }

                    if (videoModel) {
                        ModalVideo.show(videoModel);
                        ev.preventDefault();
                        return false;
                    }
                }

                // anything else, probably middle mouse: follow the link
                return true;
            }
        });
    },

    init: function(video) {
        var context = {
            video: video,
            downloadUrl: video.downloadUrls && video.downloadUrls.mp4 || null,
            height: 480,
            width: 800,
            youtubeId: video.youtubeId,
            points: 0, // will be updated at end of .show()'s ajax request
            possible_points: 750, // VIDEO_POINTS_BASE in consts.py
            logged_in: !!USERNAME, // phantom users have empty string usernames
            video_url: window.Khan && Khan.relatedVideos && Khan.relatedVideos.makeHref(video) || video.relative_url
        };

        this.modal = $(this.template(context))
            .appendTo("body")
            .modal({
                keyboard: true,
                backdrop: true,
                show: false
            })
            .bind("hide", $.proxy(this.hide, this))
            .bind("hidden", $.proxy(this.hidden, this))
            .bind("shown", $.proxy(function() {
                // remove fade so that draggable is fast.
                this.modal.removeClass("fade");
            }, this));

        Video.init({});
        ModalVideo.linkifyTooltip();
        return this.modal;
    },

    show: function(video) {
        this.modal = this.init(video);
        this.modal.modal("show");
        VideoStats.startLoggingProgress(null, video.youtubeId);

        var apiUrl = "/api/v1/user/videos/" + video.youtubeId;
        $.ajax(apiUrl, {
            success: $.proxy(function(data) {
                var points = data ? data.points : 0;
                VideoStats.updatePointsSaved(points);
                VideoStats.updatePointsDisplay(points);
            }, this)
        });
    },

    // when the modal is hidden, we actually just destroy everything. This is
    // the simplest way to deal with external stuff like the youtube player and
    // subtitles scripts maintaining state when we don't want them to.
    hide: function() {
        VideoStats.stopLoggingProgress();
        Video.hideSubtitleElements();
        this.modal.addClass("fade");
    },

    hidden: function() {
        // destroy the subtitles elements
        $(".unisubs-videoTab").remove();
        $(".unisubs-dropdown").remove();
        // needed to allow the subtitle script to be reloaded
        window.UnisubsWidgetizerLoaded = false;

        this.modal.remove();
        this.modal = null;
    }
};

Handlebars.registerPartial("youtube-player", Templates.get("shared.youtube-player"));
