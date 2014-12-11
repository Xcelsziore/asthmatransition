(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topic-package_content-topic-videos"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+='\n      <li class="video-link"><a href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'" data-tag="Topic Page Subtopic Library"><span class="indent"><span class=\'vid-progress v',f=c.key_id,f?e=f.call(a,{hash:{}}):(e=a.key_id,e=typeof e===h?e():e),d+=i(e)+"'>",f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===h?e():e),d+=i(e)+"</span></span></a></li>\n    ",d}function l(a,b){var d="",e,f;return d+='\n      <li class="video-link"><a href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'" data-tag="Topic Page Subtopic Library"><span class="indent"><span class=\'vid-progress v',f=c.key_id,f?e=f.call(a,{hash:{}}):(e=a.key_id,e=typeof e===h?e():e),d+=i(e)+"'>",f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===h?e():e),d+=i(e)+"</span></span></a></li>\n    ",d}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div>\n  <div data-role="header" class="main-header">\n    <div class="topic-video thumbnail_td">\n      <a href="',g=b.topic,g=g==null||g===!1?g:g.thumbnail_link,g=g==null||g===!1?g:g.href,g=typeof g===h?g():g,f+=i(g)+'" data-tag="Topic Page Subtopic Featured" data-youtube-id="',g=b.topic,g=g==null||g===!1?g:g.thumbnail_link,g=g==null||g===!1?g:g.youtube_id,g=typeof g===h?g():g,f+=i(g)+'" class="thumbnail_link modal-video">\n        <div class="thumb" style="background-image:url(\'',g=b.topic,g=g==null||g===!1?g:g.thumbnail_link,g=g==null||g===!1?g:g.thumb_urls,g=g==null||g===!1?g:g.hq,g=typeof g===h?g():g,f+=i(g)+'\')"></div>\n        <div class="thumbnail_label"><div class="thumbnail_desc">',g=b.topic,g=g==null||g===!1?g:g.thumbnail_link,g=g==null||g===!1?g:g.desc_html,g=typeof g===h?g():g;if(g||g===0)f+=g;f+='</div><div class="thumbnail_teaser">',g=b.topic,g=g==null||g===!1?g:g.thumbnail_link,g=g==null||g===!1?g:g.teaser_html,g=typeof g===h?g():g;if(g||g===0)f+=g;f+="</div></div>\n      </a>\n    </div>\n    <div class=\"topic-info\">\n      <div class='topic-title'>",g=b.topic,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+"</div>\n      <div class='topic-desc'>",g=b.topic,g=g==null||g===!1?g:g.description,g=typeof g===h?g():g;if(g||g===0)f+=g;f+='</div>\n    </div>\n  </div>\n  <div class="videos-list">\n    <div class="videos-header">Videos</div>\n    <ol class="first">\n    ',g=b.childrenCol1,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;f+="\n    </ol>\n    <ol>\n    ",g=b.childrenCol2,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(3,l,e)});if(g||g===0)f+=g;return f+="\n    </ol>\n  </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topic-package_root-topic-view"]=a(function(a,b,c,d,e){function l(a,b,d){var e="",f,g,l;e+='\n      <div class="subtopic thumbnail_td ',f=a.notFirst,f=c["if"].call(a,f,{hash:{},inverse:h.program(4,n,b),fn:h.program(2,m,b)});if(f||f===0)e+=f;e+='">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/',f=d.topic_info,f=f==null||f===!1?f:f.extended_slug,f=typeof f===i?f():f,e+=j(f)+"/",l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'" data-id="',l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'">\n          <div class="thumb" style="background-image:url(\'',f=a.thumbnail_link,f=f==null||f===!1?f:f.thumb_urls,f=f==null||f===!1?f:f.hq,f=typeof f===i?f():f,e+=j(f)+'\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">',l=c.title,l?f=l.call(a,{hash:{}}):(f=a.title,f=typeof f===i?f():f),e+=j(f)+'</div>\n          <div class="topic-description">',f=a.description_truncate_length,g=a.description,l=c.ellipsis,f=l?l.call(a,g,f,{hash:{}}):k.call(a,"ellipsis",g,f,{hash:{}});if(f||f===0)e+=f;return e+='</div>\n          <div class="topic-video-count">Browse ',l=c.child_count,l?f=l.call(a,{hash:{}}):(f=a.child_count,f=typeof f===i?f():f),e+=j(f)+" videos</div>\n        </div>  \n        </a>\n      </div>\n    ",e}function m(a,b){return"not-first"}function n(a,b){return"first"}function o(a,b,d){var e="",f,g,l;e+='\n      <div class="subtopic thumbnail_td ',f=a.notFirst,f=c["if"].call(a,f,{hash:{},inverse:h.program(9,q,b),fn:h.program(7,p,b)});if(f||f===0)e+=f;e+='">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/',f=d.topic_info,f=f==null||f===!1?f:f.extended_slug,f=typeof f===i?f():f,e+=j(f)+"/",l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'" data-id="',l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'">\n          <div class="thumb" style="background-image:url(\'',f=a.thumbnail_link,f=f==null||f===!1?f:f.thumb_urls,f=f==null||f===!1?f:f.hq,f=typeof f===i?f():f,e+=j(f)+'\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">',l=c.title,l?f=l.call(a,{hash:{}}):(f=a.title,f=typeof f===i?f():f),e+=j(f)+'</div>\n          <div class="topic-description">',f=a.description_truncate_length,g=a.description,l=c.ellipsis,f=l?l.call(a,g,f,{hash:{}}):k.call(a,"ellipsis",g,f,{hash:{}});if(f||f===0)e+=f;return e+='</div>\n          <div class="topic-video-count">Browse ',l=c.child_count,l?f=l.call(a,{hash:{}}):(f=a.child_count,f=typeof f===i?f():f),e+=j(f)+" videos</div>\n        </div>  \n        </a>\n      </div>\n    ",e}function p(a,b){return"not-first"}function q(a,b){return"first"}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression,k=c.helperMissing;f+='<div>\n  <div data-role="header" class="main-header">\n    <div class="topic-video thumbnail_td">\n      <a href="',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.href,g=typeof g===i?g():g,f+=j(g)+'" data-tag="Topic Page Root Featured" data-youtube-id="',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.youtube_id,g=typeof g===i?g():g,f+=j(g)+'" class="thumbnail_link modal-video">\n        <div class="thumb" style="background-image:url(\'',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.thumb_urls,g=g==null||g===!1?g:g.hq,g=typeof g===i?g():g,f+=j(g)+'\')"></div>\n        <div class="thumbnail_container">\n          <div class="thumbnail_label"><div class="thumbnail_desc">',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.desc_html,g=typeof g===i?g():g;if(g||g===0)f+=g;f+='</div><div class="thumbnail_teaser">',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.teaser_html,g=typeof g===i?g():g;if(g||g===0)f+=g;f+="</div></div>\n        </div>\n      </a>\n    </div>\n    <div class=\"topic-info\">\n      <div class='topic-title'>",g=b.topic_info,g=g==null||g===!1?g:g.topic,g=g==null||g===!1?g:g.title,g=typeof g===i?g():g,f+=j(g)+"</div>\n      <div class='topic-desc'>",g=b.topic_info,g=g==null||g===!1?g:g.topic,g=g==null||g===!1?g:g.description,g=typeof g===i?g():g;if(g||g===0)f+=g;f+='</div>\n    </div>\n  </div>\n  <div class="subtopic-header">Topics</div>\n  <div class="subtopic-list-container">\n  <div class="subtopics-list first">\n    ',g=b.subtopicsA,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.programWithDepth(l,e,b)});if(g||g===0)f+=g;f+='\n  </div>\n  <div class="subtopics-list second">\n    ',g=b.subtopicsB,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.programWithDepth(o,e,b)});if(g||g===0)f+=g;return f+="\n  </div>\n  </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topic-package_subtopic-nav"]=a(function(a,b,c,d,e){function k(a,b,d){var e="",f;e+='\n  <li class="subheading"><span>Topics</span></li>\n  ',f=a.topic_info,f=f==null||f===!1?f:f.subtopics,f=c.each.call(a,f,{hash:{},inverse:j.noop,fn:j.programWithDepth(l,b,d)});if(f||f===0)e+=f;return e+="\n  ",e}function l(a,b,d){var e="",f,g;return e+='\n    <li data-id="',g=c.id,g?f=g.call(a,{hash:{}}):(f=a.id,f=typeof f===h?f():f),e+=i(f)+'">\n      <a class="subtopic-link" data-tag="Topic Page Nav Subtopic" href="/',f=d.topic_info,f=f==null||f===!1?f:f.extended_slug,f=typeof f===h?f():f,e+=i(f)+"/",g=c.id,g?f=g.call(a,{hash:{}}):(f=a.id,f=typeof f===h?f():f),e+=i(f)+'" data-id="',g=c.id,g?f=g.call(a,{hash:{}}):(f=a.id,f=typeof f===h?f():f),e+=i(f)+'">\n        ',g=c.title,g?f=g.call(a,{hash:{}}):(f=a.title,f=typeof f===h?f():f),e+=i(f)+'\n        <div class="right-arrow"></div>\n      </a>\n    </li>\n  ',e}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<ul>\n  <li data-id="">\n    <a class="subtopic-link" data-tag="Topic Page Nav Root Topic" href="/',g=b.topic_info,g=g==null||g===!1?g:g.extended_slug,g=typeof g===h?g():g,f+=i(g)+'" data-id="">\n      <h2 class=\'topic-heading\'>',g=b.topic_info,g=g==null||g===!1?g:g.topic,g=g==null||g===!1?g:g.standalone_title,g=typeof g===h?g():g,f+=i(g)+'</h2>\n      <div class="right-arrow"></div>\n    </a>\n  </li>\n  ',g=b.topic_info,g=g==null||g===!1?g:g.subtopics,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.programWithDepth(k,e,b)});if(g||g===0)f+=g;return f+="\n</ul>\n\n",f})})();
(function() {
    // The video data for the subtopics of this topic
    var videosByTopic = {};

    // The currently selected subtopic in the content pane
    var selectedTopic = null;

    // The topic information for the current page's topic
    var rootPageTopic = null;

    // View for the root topic in the content pane
    var rootTopicView = null;

    // All the video information sorted by YouTube ID
    var videosDict = {};

    // Maximum content height
    var maxContentHeight = 0;

    window.TopicPage = {
        init: function(topicID) {
            // TODO(tom): figure out how to invalidate this if we need to change
            // the schema of a topic.
            $.ajax({
                url: "/api/v1/topic/" + topicID + "/topic-page",
                dataType: "json",
                success: function(rootTopic) {
                    rootPath = "/" + rootTopic.extended_slug + "/";
                    TopicPage.finishInit(rootPath, rootTopic);
                }
            });
        },
        finishInit: function(rootPath, rootTopic) {
            var self = this;

            rootPageTopic = rootTopic;

            // TODO(tomyedwab): Temporary, should move this to a shared lib 
            Handlebars.registerPartial("youtube-player", Templates.get("shared.youtube-player"));

            videosDict[rootTopic.marquee_video.youtube_id] = rootTopic.marquee_video;
            _.each(rootTopic.subtopics, function(topic) {
                videosByTopic[topic.id] = topic;
                videosDict[topic.thumbnail_link.youtube_id] = topic.thumbnail_link;
            });

            $(".topic-page-content").on("click", ".topic-page-content a.subtopic-link", function() {
                selectedID = $(this).attr("data-id");
                self.router.navigate(selectedID, true);
                return false;
            });
            $(".topic-page-content").on("click", ".topic-page-content a.subtopic-link-and-scroll", function() {
                selectedID = $(this).attr("data-id");
                self.router.navigate(selectedID, true);
                $("body").animate( {scrollTop:0}, 200, "easeInOutCubic");
                return false;
            });

            $(".topic-page-content").on("click", "a.modal-video", function(ev) {
                var videoDesc = videosDict[$(this).attr("data-youtube-id")];
                if (videoDesc) {
                    var video = {
                        youtubeId: videoDesc.youtube_id,
                        relative_url: videoDesc.href,
                        title: videoDesc.title,
                        description: videoDesc.teaser_html
                    };
                    ModalVideo.show(video);
                    ev.preventDefault();
                    return false;
                }
                return true;
            });

            this.router = new this.SubTopicRouter();
            this.router.bind("all", Analytics.handleRouterNavigation);
            Backbone.history.start({pushState: true, root: rootPath});

            $(window).resize(function() {
                TopicPage.growContent();
            });
        },
        growContent: function() {
            var containerEl = $(".topic-page-content .content-pane");

            var curHeight = containerEl.children("div").height();
            maxContentHeight = Math.max(maxContentHeight, curHeight);

            var containerHeight = $(window).height();
            var yTopPadding = containerEl.offset().top;
            var yBottomPadding = $("#end-of-page-spacer").outerHeight(true);
            var minContentHeight = containerHeight - (yTopPadding + yBottomPadding);

            var targetHeight = Math.max(maxContentHeight, minContentHeight);

            containerEl.css("min-height", targetHeight + "px");
            $(".nav-pane").css("min-height", targetHeight + "px");
        },

        SubTopicRouter: Backbone.Router.extend({
            routes: {
                "*subtopicID": "showSubtopic"
            },

            showSubtopic: function(subtopicID) {
                var selectedTopicID = '';
                if (subtopicID.charAt(0) === '/') {
                    subtopicID = subtopicID.substr(1);
                }

                KAConsole.log("Switching to subtopic: " + subtopicID);
                if (subtopicID === "") {
                    selectedTopic = null;
                } else {
                    selectedTopic = videosByTopic[subtopicID] || null;
                }

                var analyticsParams;

                if (selectedTopic) {
                    selectedTopic.view = selectedTopic.view || new TopicPage.ContentTopicView({ model: selectedTopic, viewCount: 0 });
                    selectedTopic.view.show();
                    selectedTopicID = selectedTopic.id;

                    analyticsParams = {
                        "Topic Title": selectedTopic.title,
                        "Topic Type": "Subtopic",
                        "Topic View Count": selectedTopic.view.options.viewCount
                    };
                } else {
                    if (rootPageTopic.childVideos) {
                        rootTopicView = rootTopicView || new TopicPage.ContentTopicView({ model: rootPageTopic.childVideos, viewCount: 0 });
                        analyticsParams = {
                            "Topic Title": rootPageTopic.title,
                            "Topic Type": "Content topic",
                        };
                    } else {
                        rootTopicView = rootTopicView || new TopicPage.RootTopicView({ model: rootPageTopic, viewCount: 0 });
                        analyticsParams = {
                            "Topic Title": rootPageTopic.title,
                            "Topic Type": "Supertopic",
                        };
                    }
                    rootTopicView.show();
                    analyticsParams["Topic View Count"] = rootTopicView.options.viewCount;
                }

                Analytics.trackSingleEvent("Topic Page View", analyticsParams);

                $(".topic-page-content .nav-pane")
                    .find("li.selected")
                        .removeClass("selected")
                        .end()
                    .find("li[data-id=\"" + selectedTopicID + "\"]")
                        .addClass("selected");

                // Try to retain maximum content pane height
                TopicPage.growContent();
            }
        }),

        ContentTopicView: Backbone.View.extend({
            template: Templates.get("topic.content-topic-videos"),
            initialize: function() {
                this.render();
            },

            render: function() {
                var prerendered = $(".prerendered[data-id=\"" + this.model.id + "\"]");
                if (prerendered.length) {
                    this.setElement(prerendered.get(0));
                } else {
                    // Split topic children into two equal lists
                    var listLength = Math.floor((this.model.children.length+1)/2);
                    var childrenCol1 = this.model.children.slice(0, listLength);
                    var childrenCol2 = this.model.children.slice(listLength);

                    $.each(childrenCol1, function(idx, video) {
                        if (idx < 3) {
                            video.number = idx+1;
                        }
                    });

                    $(this.el).html(this.template({
                        topic: this.model,
                        childrenCol1: childrenCol1,
                        childrenCol2: childrenCol2
                    }));
                }
                VideoControls.initThumbnailHover($(this.el));
            },

            show: function() {
                $(".topic-page-content .content-pane")
                    .children()
                        .detach()
                        .end()
                    .append(this.el);

                this.options.viewCount++;
            }
        }),

        RootTopicView: Backbone.View.extend({
            template: Templates.get("topic.root-topic-view"),
            initialize: function() {
                this.render();
            },

            render: function() {
                var prerendered = $(".prerendered[data-id=\"" + this.model.topic.id + "\"]");
                if (prerendered.length) {
                    this.setElement(prerendered.get(0));
                } else {
                    // Split subtopics into two equal lists
                    var listLength = Math.floor((this.model.subtopics.length+1)/2);
                    var childrenCol1 = this.model.subtopics.slice(0, listLength);
                    var childrenCol2 = this.model.subtopics.slice(listLength);

                    subtopicAddInfo = function(idx, subtopic) {
                        if (idx > 0) {
                            subtopic.notFirst = true;
                        }
                        if (idx < 3) {
                            subtopic.number = idx+1;
                        }
                        subtopic.description_truncate_length = (subtopic.title.length > 28) ? 38 : 68;
                    };
                    $.each(childrenCol1, subtopicAddInfo);
                    $.each(childrenCol2, subtopicAddInfo);
                    $(this.el).html(this.template({topic_info: this.model, subtopicsA : childrenCol1, subtopicsB: childrenCol2 }));
                }
                VideoControls.initThumbnailHover($(this.el));
            },

            show: function() {
                $(".topic-page-content .content-pane")
                    .children()
                        .detach()
                        .end()
                    .append(this.el);

                this.options.viewCount++;
            }
        })
    };
})();
