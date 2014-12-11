(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["studentlists-package_class-progress-report"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+='\n                        <th class="student-exercises-col" data-id="',f=c.idx,f?e=f.call(a,{hash:{}}):(e=a.idx,e=typeof e===h?e():e),d+=i(e)+'"><div class="tableHeader">',f=c.display_name,f?e=f.call(a,{hash:{}}):(e=a.display_name,e=typeof e===h?e():e),d+=i(e)+"</div></th>\n                    ",d}function l(a,b){var d="",e,f;return d+='\n                <tr class="student-email-row" data-id="',f=c.idx,f?e=f.call(a,{hash:{}}):(e=a.idx,e=typeof e===h?e():e),d+=i(e)+'">\n                    <td class="tableFirstCol student-email" style="vertical-align: none;">\n                        <a style="color:#006699;" href="',f=c.profile_root,f?e=f.call(a,{hash:{}}):(e=a.profile_root,e=typeof e===h?e():e),d+=i(e)+'vital-statistics/skill-progress">\n                            <nobr>',f=c.nickname,f?e=f.call(a,{hash:{}}):(e=a.nickname,e=typeof e===h?e():e),d+=i(e)+"</nobr>\n                        </a>\n                    </td>\n                </tr>\n                ",d}function m(a,b){var d="",e,f;d+='\n                    <tr class="student-exercises-row" data-id="',f=c.idx,f?e=f.call(a,{hash:{}}):(e=a.idx,e=typeof e===h?e():e),d+=i(e)+'">\n                      ',e=a.exercises,e=c.each.call(a,e,{hash:{},inverse:j.noop,fn:j.programWithDepth(n,b,a)});if(e||e===0)d+=e;return d+="\n                    </tr>\n                    ",d}function n(a,b,d){var e="",f,g;e+='\n                        <td class="student-module-status exercise-color ',g=c.status_css,g?f=g.call(a,{hash:{}}):(f=a.status_css,f=typeof f===h?f():f),e+=i(f)+" ",f=a.notTransparent,f=c["if"].call(a,f,{hash:{},inverse:j.noop,fn:j.program(7,o,b)});if(f||f===0)e+=f;e+='" data-id="',g=c.idx,g?f=g.call(a,{hash:{}}):(f=a.idx,f=typeof f===h?f():f),e+=i(f)+'">\n                          ',f=a.status,f=c["if"].call(a,f,{hash:{},inverse:j.noop,fn:j.programWithDepth(p,b,d)});if(f||f===0)e+=f;return e+="\n                        </td>\n                      ",e}function o(a,b){return"action-gradient seethrough"}function p(a,b,d){var e="",f,g;e+='\n                          <div class="hover-content" style="display: none;">\n                            <b>',f=d.nickname,f=typeof f===h?f():f,e+=i(f)+"</b><br/>\n                            <b>",g=c.exercise_display,g?f=g.call(a,{hash:{}}):(f=a.exercise_display,f=typeof f===h?f():f),e+=i(f)+"</b><br/>\n                            <em><nobr>Status: ",g=c.status,g?f=g.call(a,{hash:{}}):(f=a.status,f=typeof f===h?f():f),e+=i(f)+"</nobr></em><br/>\n                            <em>Progress: ",g=c.progress,g?f=g.call(a,{hash:{}}):(f=a.progress,f=typeof f===h?f():f),e+=i(f)+"%</em><br/>\n                            ",f=a.last_done_ago,f=c["if"].call(a,f,{hash:{},inverse:j.noop,fn:j.program(10,q,b)});if(f||f===0)e+=f;return e+="\n                            <em>Problems attempted: ",g=c.total_done,g?f=g.call(a,{hash:{}}):(f=a.total_done,f=typeof f===h?f():f),e+=i(f)+"</em>\n                          </div>\n                          ",e}function q(a,b){var d="",e,f;return d+="<em>Last worked on: ",f=c.last_done_ago,f?e=f.call(a,{hash:{}}):(e=a.last_done_ago,e=typeof e===h?e():e),d+=i(e)+"</em></br/>",d}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<table id="module-progress" cellspacing="0" cellpadding="0" border="0">\n    <tr>\n        <th id="firstTd" class="tableHeader">Student Progress</th>\n        <td>\n            <div id="divHeader" class="sizeOnResize" style="overflow:hidden;width:450px; line-height: 15px;">\n                <table cellspacing="0" cellpadding="0" border="1" style="width: 100%">\n                  <tr>\n                    ',g=b.exercise_names,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='\n                    <th style="background: transparent; border-color: transparent; max-width:5px; min-width: 5px; width: 5px">&nbsp;</th>\n                  </tr>\n                </table>\n            </div>\n        </td>\n    </tr>\n    <tr>\n        <td style="vertical-align: top;">\n          <div id="firstcol" style="overflow:hidden;">\n            <table cellspacing="0" cellpadding="0" border="0" >\n                ',g=b.exercise_list,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(3,l,e)});if(g||g===0)f+=g;f+='\n                <tr class="student-email-row" data-id="-1" style="display: none">\n                    <td class="tableFirstCol student-email hidden-students" style="vertical-align: none;">\n                      Hidden students\n                    </td>\n                </tr>\n                <td class="tableFirstCol student-email" style="background: transparent; border-color: transparent; max-width:5px; min-width: 5px; width: 5px">&nbsp;</td>\n            </table>\n          </div>\n        </td>\n\n        <td valign="top">\n            <div id="table_div" class="sizeOnResize fancy-scrollbar" style="overflow:scroll;width:450px;position:relative;" onscroll="ProgressReport.onScroll();" >\n                <table style="width:100%;" cellspacing="0" cellpadding="0" border="0">\n                    ',g=b.exercise_list,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(5,m,e)});if(g||g===0)f+=g;return f+='\n                    <tr class="student-exercises-row" data-id="-1">\n                      <td>&nbsp;</td>\n                    </tr>\n                </table>\n            </div>\n        </td>\n\n    </tr>\n</table>\n',f})})()