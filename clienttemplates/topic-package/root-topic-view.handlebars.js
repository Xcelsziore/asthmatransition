(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topic-package_root-topic-view"]=a(function(a,b,c,d,e){function l(a,b,d){var e="",f,g,l;e+='\n      <div class="subtopic thumbnail_td ',f=a.notFirst,f=c["if"].call(a,f,{hash:{},inverse:h.program(4,n,b),fn:h.program(2,m,b)});if(f||f===0)e+=f;e+='">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/',f=d.topic_info,f=f==null||f===!1?f:f.extended_slug,f=typeof f===i?f():f,e+=j(f)+"/",l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'" data-id="',l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'">\n          <div class="thumb" style="background-image:url(\'',f=a.thumbnail_link,f=f==null||f===!1?f:f.thumb_urls,f=f==null||f===!1?f:f.hq,f=typeof f===i?f():f,e+=j(f)+'\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">',l=c.title,l?f=l.call(a,{hash:{}}):(f=a.title,f=typeof f===i?f():f),e+=j(f)+'</div>\n          <div class="topic-description">',f=a.description_truncate_length,g=a.description,l=c.ellipsis,f=l?l.call(a,g,f,{hash:{}}):k.call(a,"ellipsis",g,f,{hash:{}});if(f||f===0)e+=f;return e+='</div>\n          <div class="topic-video-count">Browse ',l=c.child_count,l?f=l.call(a,{hash:{}}):(f=a.child_count,f=typeof f===i?f():f),e+=j(f)+" videos</div>\n        </div>  \n        </a>\n      </div>\n    ",e}function m(a,b){return"not-first"}function n(a,b){return"first"}function o(a,b,d){var e="",f,g,l;e+='\n      <div class="subtopic thumbnail_td ',f=a.notFirst,f=c["if"].call(a,f,{hash:{},inverse:h.program(9,q,b),fn:h.program(7,p,b)});if(f||f===0)e+=f;e+='">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/',f=d.topic_info,f=f==null||f===!1?f:f.extended_slug,f=typeof f===i?f():f,e+=j(f)+"/",l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'" data-id="',l=c.id,l?f=l.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'">\n          <div class="thumb" style="background-image:url(\'',f=a.thumbnail_link,f=f==null||f===!1?f:f.thumb_urls,f=f==null||f===!1?f:f.hq,f=typeof f===i?f():f,e+=j(f)+'\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">',l=c.title,l?f=l.call(a,{hash:{}}):(f=a.title,f=typeof f===i?f():f),e+=j(f)+'</div>\n          <div class="topic-description">',f=a.description_truncate_length,g=a.description,l=c.ellipsis,f=l?l.call(a,g,f,{hash:{}}):k.call(a,"ellipsis",g,f,{hash:{}});if(f||f===0)e+=f;return e+='</div>\n          <div class="topic-video-count">Browse ',l=c.child_count,l?f=l.call(a,{hash:{}}):(f=a.child_count,f=typeof f===i?f():f),e+=j(f)+" videos</div>\n        </div>  \n        </a>\n      </div>\n    ",e}function p(a,b){return"not-first"}function q(a,b){return"first"}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression,k=c.helperMissing;f+='<div>\n  <div data-role="header" class="main-header">\n    <div class="topic-video thumbnail_td">\n      <a href="',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.href,g=typeof g===i?g():g,f+=j(g)+'" data-tag="Topic Page Root Featured" data-youtube-id="',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.youtube_id,g=typeof g===i?g():g,f+=j(g)+'" class="thumbnail_link modal-video">\n        <div class="thumb" style="background-image:url(\'',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.thumb_urls,g=g==null||g===!1?g:g.hq,g=typeof g===i?g():g,f+=j(g)+'\')"></div>\n        <div class="thumbnail_container">\n          <div class="thumbnail_label"><div class="thumbnail_desc">',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.desc_html,g=typeof g===i?g():g;if(g||g===0)f+=g;f+='</div><div class="thumbnail_teaser">',g=b.topic_info,g=g==null||g===!1?g:g.marquee_video,g=g==null||g===!1?g:g.teaser_html,g=typeof g===i?g():g;if(g||g===0)f+=g;f+="</div></div>\n        </div>\n      </a>\n    </div>\n    <div class=\"topic-info\">\n      <div class='topic-title'>",g=b.topic_info,g=g==null||g===!1?g:g.topic,g=g==null||g===!1?g:g.title,g=typeof g===i?g():g,f+=j(g)+"</div>\n      <div class='topic-desc'>",g=b.topic_info,g=g==null||g===!1?g:g.topic,g=g==null||g===!1?g:g.description,g=typeof g===i?g():g;if(g||g===0)f+=g;f+='</div>\n    </div>\n  </div>\n  <div class="subtopic-header">Topics</div>\n  <div class="subtopic-list-container">\n  <div class="subtopics-list first">\n    ',g=b.subtopicsA,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.programWithDepth(l,e,b)});if(g||g===0)f+=g;f+='\n  </div>\n  <div class="subtopics-list second">\n    ',g=b.subtopicsB,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.programWithDepth(o,e,b)});if(g||g===0)f+=g;return f+="\n  </div>\n  </div>\n</div>\n",f})})()