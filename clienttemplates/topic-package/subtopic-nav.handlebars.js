(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topic-package_subtopic-nav"]=a(function(a,b,c,d,e){function k(a,b,d){var e="",f;e+='\n  <li class="subheading"><span>Topics</span></li>\n  ',f=a.topic_info,f=f==null||f===!1?f:f.subtopics,f=c.each.call(a,f,{hash:{},inverse:j.noop,fn:j.programWithDepth(l,b,d)});if(f||f===0)e+=f;return e+="\n  ",e}function l(a,b,d){var e="",f,g;return e+='\n    <li data-id="',g=c.id,g?f=g.call(a,{hash:{}}):(f=a.id,f=typeof f===h?f():f),e+=i(f)+'">\n      <a class="subtopic-link" data-tag="Topic Page Nav Subtopic" href="/',f=d.topic_info,f=f==null||f===!1?f:f.extended_slug,f=typeof f===h?f():f,e+=i(f)+"/",g=c.id,g?f=g.call(a,{hash:{}}):(f=a.id,f=typeof f===h?f():f),e+=i(f)+'" data-id="',g=c.id,g?f=g.call(a,{hash:{}}):(f=a.id,f=typeof f===h?f():f),e+=i(f)+'">\n        ',g=c.title,g?f=g.call(a,{hash:{}}):(f=a.title,f=typeof f===h?f():f),e+=i(f)+'\n        <div class="right-arrow"></div>\n      </a>\n    </li>\n  ',e}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<ul>\n  <li data-id="">\n    <a class="subtopic-link" data-tag="Topic Page Nav Root Topic" href="/',g=b.topic_info,g=g==null||g===!1?g:g.extended_slug,g=typeof g===h?g():g,f+=i(g)+'" data-id="">\n      <h2 class=\'topic-heading\'>',g=b.topic_info,g=g==null||g===!1?g:g.topic,g=g==null||g===!1?g:g.standalone_title,g=typeof g===h?g():g,f+=i(g)+'</h2>\n      <div class="right-arrow"></div>\n    </a>\n  </li>\n  ',g=b.topic_info,g=g==null||g===!1?g:g.subtopics,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.programWithDepth(k,e,b)});if(g||g===0)f+=g;return f+="\n</ul>\n\n",f})})()