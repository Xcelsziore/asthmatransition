/*
 * jQuery Address Plugin v1.4
 * http://www.asual.com/jquery/address/
 *
 * Copyright (c) 2009-2010 Rostislav Hristov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2011-05-04 14:22:12 +0300 (Wed, 04 May 2011)
 */
(function(c){c.address=function(){var v=function(a){c(c.address).trigger(c.extend(c.Event(a),function(){for(var b={},e=c.address.parameterNames(),f=0,p=e.length;f<p;f++)b[e[f]]=c.address.parameter(e[f]);return{value:c.address.value(),path:c.address.path(),pathNames:c.address.pathNames(),parameterNames:e,parameters:b,queryString:c.address.queryString()}}.call(c.address)))},w=function(){c().bind.apply(c(c.address),Array.prototype.slice.call(arguments));return c.address},r=function(){return M.pushState&&
d.state!==k},s=function(){return("/"+g.pathname.replace(new RegExp(d.state),"")+g.search+(D()?"#"+D():"")).replace(U,"/")},D=function(){var a=g.href.indexOf("#");return a!=-1?B(g.href.substr(a+1),l):""},u=function(){return r()?s():D()},ha=function(){return"javascript"},N=function(a){a=a.toString();return(d.strict&&a.substr(0,1)!="/"?"/":"")+a},B=function(a,b){if(d.crawlable&&b)return(a!==""?"!":"")+a;return a.replace(/^\!/,"")},x=function(a,b){return parseInt(a.css(b),10)},V=function(a){for(var b,
e,f=0,p=a.childNodes.length;f<p;f++){try{if("src"in a.childNodes[f]&&a.childNodes[f].src)b=String(a.childNodes[f].src)}catch(J){}if(e=V(a.childNodes[f]))b=e}return b},F=function(){if(!K){var a=u();if(h!=a)if(y&&q<7)g.reload();else{y&&q<8&&d.history&&t(O,50);h=a;E(l)}}},E=function(a){v(W);v(a?X:Y);t(Z,10)},Z=function(){if(d.tracker!=="null"&&d.tracker!==null){var a=c.isFunction(d.tracker)?d.tracker:j[d.tracker],b=(g.pathname+g.search+(c.address&&!r()?c.address.value():"")).replace(/\/\//,"/").replace(/^\/$/,
"");if(c.isFunction(a))a(b);else if(c.isFunction(j.urchinTracker))j.urchinTracker(b);else if(j.pageTracker!==k&&c.isFunction(j.pageTracker._trackPageview))j.pageTracker._trackPageview(b);else j._gaq!==k&&c.isFunction(j._gaq.push)&&j._gaq.push(["_trackPageview",decodeURI(b)])}},O=function(){var a=ha()+":"+l+";document.open();document.writeln('<html><head><title>"+n.title.replace("'","\\'")+"</title><script>var "+C+' = "'+encodeURIComponent(u())+(n.domain!=g.hostname?'";document.domain="'+n.domain:
"")+"\";<\/script></head></html>');document.close();";if(q<7)m.src=a;else m.contentWindow.location.replace(a)},aa=function(){if(G&&$!=-1){var a,b=G.substr($+1).split("&");for(i=0;i<b.length;i++){a=b[i].split("=");if(/^(autoUpdate|crawlable|history|strict|wrap)$/.test(a[0]))d[a[0]]=isNaN(a[1])?/^(true|yes)$/i.test(a[1]):parseInt(a[1],10)!==0;if(/^(state|tracker)$/.test(a[0]))d[a[0]]=a[1]}G=null}h=u()},ca=function(){if(!ba){ba=o;aa();var a=function(){ia.call(this);ja.call(this)},b=c("body").ajaxComplete(a);
a();if(d.wrap){c("body > *").wrapAll('<div style="padding:'+(x(b,"marginTop")+x(b,"paddingTop"))+"px "+(x(b,"marginRight")+x(b,"paddingRight"))+"px "+(x(b,"marginBottom")+x(b,"paddingBottom"))+"px "+(x(b,"marginLeft")+x(b,"paddingLeft"))+'px;" />').parent().wrap('<div id="'+C+'" style="height:100%;overflow:auto;position:relative;'+(H&&!window.statusbar.visible?"resize:both;":"")+'" />');c("html, body").css({height:"100%",margin:0,padding:0,overflow:"hidden"});H&&c('<style type="text/css" />').appendTo("head").text("#"+
C+"::-webkit-resizer { background-color: #fff; }")}if(y&&q<8){a=n.getElementsByTagName("frameset")[0];m=n.createElement((a?"":"i")+"frame");if(a){a.insertAdjacentElement("beforeEnd",m);a[a.cols?"cols":"rows"]+=",0";m.noResize=o;m.frameBorder=m.frameSpacing=0}else{m.style.display="none";m.style.width=m.style.height=0;m.tabIndex=-1;n.body.insertAdjacentElement("afterBegin",m)}t(function(){c(m).bind("load",function(){var e=m.contentWindow;h=e[C]!==k?e[C]:"";if(h!=u()){E(l);g.hash=B(h,o)}});m.contentWindow[C]===
k&&O()},50)}t(function(){v("init");E(l)},1);if(!r())if(y&&q>7||!y&&"on"+I in j)if(j.addEventListener)j.addEventListener(I,F,l);else j.attachEvent&&j.attachEvent("on"+I,F);else ka(F,50)}},ia=function(){var a,b=c("a"),e=b.size(),f=-1,p=function(){if(++f!=e){a=c(b.get(f));a.is('[rel*="address:"]')&&a.address();t(p,1)}};t(p,1)},la=function(){if(h!=u()){h=u();E(l)}},ma=function(){if(j.removeEventListener)j.removeEventListener(I,F,l);else j.detachEvent&&j.detachEvent("on"+I,F)},ja=function(){if(d.crawlable){var a=
g.pathname.replace(/\/$/,"");c("body").html().indexOf("_escaped_fragment_")!=-1&&c('a[href]:not([href^=http]), a[href*="'+document.domain+'"]').each(function(){var b=c(this).attr("href").replace(/^http:/,"").replace(new RegExp(a+"/?$"),"");if(b===""||b.indexOf("_escaped_fragment_")!=-1)c(this).attr("href","#"+b.replace(/\/(.*)\?_escaped_fragment_=(.*)$/,"!$2"))})}},k,C="jQueryAddress",I="hashchange",W="change",X="internalChange",Y="externalChange",o=true,l=false,d={autoUpdate:o,crawlable:l,history:o,
strict:o,wrap:l},z=c.browser,q=parseFloat(c.browser.version),da=z.mozilla,y=z.msie,ea=z.opera,H=z.webkit||z.safari,P=l,j=function(){try{return top.document!==k?top:window}catch(a){return window}}(),n=j.document,M=j.history,g=j.location,ka=setInterval,t=setTimeout,U=/\/{2,9}/g;z=navigator.userAgent;var m,G=V(document),$=G?G.indexOf("?"):-1,Q=n.title,K=l,ba=l,R=o,fa=o,L=l,h=u();if(y){q=parseFloat(z.substr(z.indexOf("MSIE")+4));if(n.documentMode&&n.documentMode!=q)q=n.documentMode!=8?7:8;var ga=n.onpropertychange;
n.onpropertychange=function(){ga&&ga.call(n);if(n.title!=Q&&n.title.indexOf("#"+u())!=-1)n.title=Q}}if(P=da&&q>=1||y&&q>=6||ea&&q>=9.5||H&&q>=523){if(ea)history.navigationMode="compatible";if(document.readyState=="complete")var na=setInterval(function(){if(c.address){ca();clearInterval(na)}},50);else{aa();c(ca)}c(window).bind("popstate",la).bind("unload",ma)}else!P&&D()!==""?g.replace(g.href.substr(0,g.href.indexOf("#"))):Z();return{bind:function(a,b,e){return w(a,b,e)},init:function(a){return w("init",
a)},change:function(a){return w(W,a)},internalChange:function(a){return w(X,a)},externalChange:function(a){return w(Y,a)},baseURL:function(){var a=g.href;if(a.indexOf("#")!=-1)a=a.substr(0,a.indexOf("#"));if(/\/$/.test(a))a=a.substr(0,a.length-1);return a},autoUpdate:function(a){if(a!==k){d.autoUpdate=a;return this}return d.autoUpdate},crawlable:function(a){if(a!==k){d.crawlable=a;return this}return d.crawlable},history:function(a){if(a!==k){d.history=a;return this}return d.history},state:function(a){if(a!==
k){d.state=a;var b=s();if(d.state!==k)if(M.pushState)b.substr(0,3)=="/#/"&&g.replace(d.state.replace(/^\/$/,"")+b.substr(2));else b!="/"&&b.replace(/^\/#/,"")!=D()&&t(function(){g.replace(d.state.replace(/^\/$/,"")+"/#"+b)},1);return this}return d.state},strict:function(a){if(a!==k){d.strict=a;return this}return d.strict},tracker:function(a){if(a!==k){d.tracker=a;return this}return d.tracker},wrap:function(a){if(a!==k){d.wrap=a;return this}return d.wrap},update:function(){L=o;this.value(h);L=l;return this},
title:function(a){if(a!==k){t(function(){Q=n.title=a;if(fa&&m&&m.contentWindow&&m.contentWindow.document){m.contentWindow.document.title=a;fa=l}if(!R&&da)g.replace(g.href.indexOf("#")!=-1?g.href:g.href+"#");R=l},50);return this}return n.title},value:function(a){if(a!==k){a=N(a);if(a=="/")a="";if(h==a&&!L)return;R=o;h=a;if(d.autoUpdate||L){E(o);if(r())M[d.history?"pushState":"replaceState"]({},"",d.state.replace(/\/$/,"")+(h===""?"/":h));else{K=o;if(H)if(d.history)g.hash="#"+B(h,o);else g.replace("#"+
B(h,o));else if(h!=u())if(d.history)g.hash="#"+B(h,o);else g.replace("#"+B(h,o));y&&q<8&&d.history&&t(O,50);if(H)t(function(){K=l},1);else K=l}}return this}if(!P)return null;return N(h)},path:function(a){if(a!==k){var b=this.queryString(),e=this.hash();this.value(a+(b?"?"+b:"")+(e?"#"+e:""));return this}return N(h).split("#")[0].split("?")[0]},pathNames:function(){var a=this.path(),b=a.replace(U,"/").split("/");if(a.substr(0,1)=="/"||a.length===0)b.splice(0,1);a.substr(a.length-1,1)=="/"&&b.splice(b.length-
1,1);return b},queryString:function(a){if(a!==k){var b=this.hash();this.value(this.path()+(a?"?"+a:"")+(b?"#"+b:""));return this}a=h.split("?");return a.slice(1,a.length).join("?").split("#")[0]},parameter:function(a,b,e){var f,p;if(b!==k){var J=this.parameterNames();p=[];b=b?b.toString():"";for(f=0;f<J.length;f++){var S=J[f],A=this.parameter(S);if(typeof A=="string")A=[A];if(S==a)A=b===null||b===""?[]:e?A.concat([b]):[b];for(var T=0;T<A.length;T++)p.push(S+"="+A[T])}c.inArray(a,J)==-1&&b!==null&&
b!==""&&p.push(a+"="+b);this.queryString(p.join("&"));return this}if(b=this.queryString()){e=[];p=b.split("&");for(f=0;f<p.length;f++){b=p[f].split("=");b[0]==a&&e.push(b.slice(1).join("="))}if(e.length!==0)return e.length!=1?e:e[0]}},parameterNames:function(){var a=this.queryString(),b=[];if(a&&a.indexOf("=")!=-1){a=a.split("&");for(var e=0;e<a.length;e++){var f=a[e].split("=")[0];c.inArray(f,b)==-1&&b.push(f)}}return b},hash:function(a){if(a!==k){this.value(h.split("#")[0]+(a?"#"+a:""));return this}a=
h.split("#");return a.slice(1,a.length).join("#")}}}();c.fn.address=function(v){if(!c(this).attr("address")){var w=function(r){if(r.shiftKey||r.ctrlKey||r.metaKey)return true;if(c(this).is("a")){var s=v?v.call(this):/address:/.test(c(this).attr("rel"))?c(this).attr("rel").split("address:")[1].split(" ")[0]:c.address.state()!==undefined&&c.address.state()!="/"?c(this).attr("href").replace(new RegExp("^(.*"+c.address.state()+"|\\.)"),""):c(this).attr("href").replace(/^(#\!?|\.)/,"");c.address.value(s);
r.preventDefault()}};c(this).click(w).live("click",w).live("submit",function(r){if(c(this).is("form")){var s=c(this).attr("action");s=v?v.call(this):(s.indexOf("?")!=-1?s.replace(/&$/,""):s+"?")+c(this).serialize();c.address.value(s);r.preventDefault()}}).attr("address",true)}return this}})(jQuery);
;
/*
 Highcharts JS v2.1.9 (2011-11-11)

 (c) 2009-2011 Torstein H?nsi

 License: www.highcharts.com/license
*/
(function(){function sa(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function ja(a,b){return parseInt(a,b||10)}function Sb(a){return typeof a==="string"}function Nb(a){return typeof a==="object"}function lc(a){return typeof a==="number"}function mc(a){return Fa.log(a)/Fa.LN10}function nc(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function K(a){return a!==Wa&&a!==null}function Ga(a,b,c){var d,e;if(Sb(b))if(K(c))a.setAttribute(b,c);else{if(a&&a.getAttribute)e=a.getAttribute(b)}else if(K(b)&&
Nb(b))for(d in b)a.setAttribute(d,b[d]);return e}function zc(a){return Object.prototype.toString.call(a)==="[object Array]"?a:[a]}function A(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++){c=a[b];if(typeof c!=="undefined"&&c!==null)return c}}function Ja(a,b){if(Pc)if(b&&b.opacity!==Wa)b.filter="alpha(opacity="+b.opacity*100+")";sa(a.style,b)}function hb(a,b,c,d,e){a=ua.createElement(a);b&&sa(a,b);e&&Ja(a,{padding:0,border:jb,margin:0});c&&Ja(a,c);d&&d.appendChild(a);return a}function yb(a,b){var c=
function(){};c.prototype=new a;sa(c.prototype,b);return c}function Ed(a,b,c,d){var e=Xa.lang;a=a;var f=isNaN(b=bb(b))?2:b;b=c===undefined?e.decimalPoint:c;d=d===undefined?e.thousandsSep:d;e=a<0?"-":"";c=String(ja(a=bb(+a||0).toFixed(f)));var g=c.length>3?c.length%3:0;return e+(g?c.substr(0,g)+d:"")+c.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+bb(a-c).toFixed(f).slice(2):"")}function Fd(a){var b={left:a.offsetLeft,top:a.offsetTop};for(a=a.offsetParent;a;){b.left+=a.offsetLeft;b.top+=a.offsetTop;
if(a!==ua.body&&a!==ua.documentElement){b.left-=a.scrollLeft;b.top-=a.scrollTop}a=a.offsetParent}return b}function Gd(){this.symbol=this.color=0}function fe(a,b,c,d,e,f,g){var h=g.x;g=g.y;var i=h-a+c-25,j=g-b+d+10,m;if(i<7)i=c+h+15;if(i+a>c+e){i-=i+a-(c+e);j-=b;m=true}if(j<5){j=5;if(m&&g>=j&&g<=j+b)j=g+b-5}else if(j+b>d+f)j=d+f-b-5;return{x:i,y:j}}function Hd(a,b){var c=a.length,d;for(d=0;d<c;d++)a[d].ss_i=d;a.sort(function(e,f){var g=b(e,f);return g===0?e.ss_i-f.ss_i:g});for(d=0;d<c;d++)delete a[d].ss_i}
function Ac(a){for(var b in a){a[b]&&a[b].destroy&&a[b].destroy();delete a[b]}}function oc(a,b){Bc=A(a,b.animation)}function Id(){var a=Xa.global.useUTC;Qc=a?Date.UTC:function(b,c,d,e,f,g){return(new Date(b,c,A(d,1),A(e,0),A(f,0),A(g,0))).getTime()};id=a?"getUTCMinutes":"getMinutes";jd=a?"getUTCHours":"getHours";kd=a?"getUTCDay":"getDay";Cc=a?"getUTCDate":"getDate";Rc=a?"getUTCMonth":"getMonth";Sc=a?"getUTCFullYear":"getFullYear";Jd=a?"setUTCMinutes":"setMinutes";Kd=a?"setUTCHours":"setHours";ld=
a?"setUTCDate":"setDate";Ld=a?"setUTCMonth":"setMonth";Md=a?"setUTCFullYear":"setFullYear"}function pc(a){Tc||(Tc=hb(Tb));a&&Tc.appendChild(a);Tc.innerHTML=""}function Uc(){}function Nd(a,b){function c(p){function q(k,n){this.pos=k;this.minor=n;this.isNew=true;n||this.addLabel()}function w(k){if(k){this.options=k;this.id=k.id}return this}function x(k,n,t,r){this.isNegative=n;this.options=k;this.x=t;this.stack=r;this.alignOptions={align:k.align||(va?n?"left":"right":"center"),verticalAlign:k.verticalAlign||
(va?"middle":n?"bottom":"top"),y:A(k.y,va?4:n?14:-6),x:A(k.x,va?n?-6:6:0)};this.textAlign=k.textAlign||(va?n?"right":"left":"center")}function V(){var k=[],n=[],t;pa=wa=null;zb=[];u(Ha,function(r){t=false;u(["xAxis","yAxis"],function(F){if(r.isCartesian&&(F==="xAxis"&&xa||F==="yAxis"&&!xa)&&(r.options[F]===o.index||r.options[F]===Wa&&o.index===0)){r[F]=I;zb.push(r);t=true}});if(!r.visible&&z.ignoreHiddenSeries)t=false;if(t){var J,E,Q,fa,ka,$;if(!xa){J=r.options.stacking;Vc=J==="percent";if(J){ka=
r.options.stack;fa=r.type+A(ka,"");$="-"+fa;r.stackKey=fa;E=k[fa]||[];k[fa]=E;Q=n[$]||[];n[$]=Q}if(Vc){pa=0;wa=99}}if(r.isCartesian){u(r.data,function(F){var O=F.x,S=F.y,aa=S<0,Eb=aa?Q:E,kb=aa?$:fa;if(pa===null)pa=wa=F[qa];if(xa)if(O>wa)wa=O;else{if(O<pa)pa=O}else if(K(S)){if(J)Eb[O]=K(Eb[O])?Eb[O]+S:S;S=Eb?Eb[O]:S;F=A(F.low,S);if(!Vc)if(S>wa)wa=S;else if(F<pa)pa=F;if(J){s[kb]||(s[kb]={});s[kb][O]||(s[kb][O]=new x(o.stackLabels,aa,O,ka));s[kb][O].setTotal(S)}}});if(/(area|column|bar)/.test(r.type)&&
!xa)if(pa>=0){pa=0;Od=true}else if(wa<0){wa=0;Pd=true}}}})}function N(k,n){var t,r;Fb=n?1:Fa.pow(10,lb(Fa.log(k)/Fa.LN10));t=k/Fb;if(!n){n=[1,2,2.5,5,10];if(o.allowDecimals===false||ca)if(Fb===1)n=[1,2,5,10];else if(Fb<=0.1)n=[1/Fb]}for(r=0;r<n.length;r++){k=n[r];if(t<=(n[r]+(n[r+1]||n[r]))/2)break}k*=Fb;return k}function ta(k){var n;n=k;Fb=A(Fb,Fa.pow(10,lb(Fa.log(Ta)/Fa.LN10)));if(Fb<1){n=W(1/Fb)*10;n=W(k*n)/n}return n}function da(){var k,n,t,r,J=o.tickInterval,E=o.tickPixelInterval;k=o.maxZoom||
(xa&&!K(o.min)&&!K(o.max)?tb(l.smallestInterval*5,wa-pa):null);ya=R?Da:Aa;if(Ub){t=l[xa?"xAxis":"yAxis"][o.linkedTo];r=t.getExtremes();ia=A(r.min,r.dataMin);ra=A(r.max,r.dataMax)}else{ia=A(Vb,o.min,pa);ra=A(Gb,o.max,wa)}if(ca){ia=mc(ia);ra=mc(ra)}if(ra-ia<k){r=(k-ra+ia)/2;ia=Ia(ia-r,A(o.min,ia-r),pa);ra=tb(ia+k,A(o.max,ia+k),wa)}if(!Ya&&!Vc&&!Ub&&K(ia)&&K(ra)){k=ra-ia||1;if(!K(o.min)&&!K(Vb)&&Qd&&(pa<0||!Od))ia-=k*Qd;if(!K(o.max)&&!K(Gb)&&Rd&&(wa>0||!Pd))ra+=k*Rd}Ta=ia===ra?1:Ub&&!J&&E===t.options.tickPixelInterval?
t.tickInterval:A(J,Ya?1:(ra-ia)*E/ya);if(!D&&!K(o.tickInterval))Ta=N(Ta);I.tickInterval=Ta;Wc=o.minorTickInterval==="auto"&&Ta?Ta/5:o.minorTickInterval;if(D){Ba=[];J=Xa.global.useUTC;var Q=1E3/ub,fa=6E4/ub,ka=36E5/ub;E=864E5/ub;k=6048E5/ub;r=2592E6/ub;var $=31556952E3/ub,F=[["second",Q,[1,2,5,10,15,30]],["minute",fa,[1,2,5,10,15,30]],["hour",ka,[1,2,3,4,6,8,12]],["day",E,[1,2]],["week",k,[1,2]],["month",r,[1,2,3,4,6]],["year",$,null]],O=F[6],S=O[1],aa=O[2];for(t=0;t<F.length;t++){O=F[t];S=O[1];aa=
O[2];if(F[t+1])if(Ta<=(S*aa[aa.length-1]+F[t+1][1])/2)break}if(S===$&&Ta<5*S)aa=[1,2,5];F=N(Ta/S,aa);aa=new Date(ia*ub);aa.setMilliseconds(0);if(S>=Q)aa.setSeconds(S>=fa?0:F*lb(aa.getSeconds()/F));if(S>=fa)aa[Jd](S>=ka?0:F*lb(aa[id]()/F));if(S>=ka)aa[Kd](S>=E?0:F*lb(aa[jd]()/F));if(S>=E)aa[ld](S>=r?1:F*lb(aa[Cc]()/F));if(S>=r){aa[Ld](S>=$?0:F*lb(aa[Rc]()/F));n=aa[Sc]()}if(S>=$){n-=n%F;aa[Md](n)}S===k&&aa[ld](aa[Cc]()-aa[kd]()+o.startOfWeek);t=1;n=aa[Sc]();Q=aa.getTime()/ub;fa=aa[Rc]();for(ka=aa[Cc]();Q<
ra&&t<Da;){Ba.push(Q);if(S===$)Q=Qc(n+t*F,0)/ub;else if(S===r)Q=Qc(n,fa+t*F)/ub;else if(!J&&(S===E||S===k))Q=Qc(n,fa,ka+t*F*(S===E?1:7));else Q+=S*F;t++}Ba.push(Q);Xc=o.dateTimeLabelFormats[O[0]]}else{t=ta(lb(ia/Ta)*Ta);n=ta(md(ra/Ta)*Ta);Ba=[];for(t=ta(t);t<=n;){Ba.push(t);t=ta(t+Ta)}}if(!Ub){if(Ya||xa&&l.hasColumn){n=(Ya?1:Ta)*0.5;if(Ya||!K(A(o.min,Vb)))ia-=n;if(Ya||!K(A(o.max,Gb)))ra+=n}n=Ba[0];t=Ba[Ba.length-1];if(o.startOnTick)ia=n;else ia>n&&Ba.shift();if(o.endOnTick)ra=t;else ra<t&&Ba.pop();
Ob||(Ob={x:0,y:0});if(!D&&Ba.length>Ob[qa])Ob[qa]=Ba.length}}function Ma(){var k,n;Dc=ia;Sd=ra;V();da();Hb=fb;fb=ya/(ra-ia||1);if(!xa)for(k in s)for(n in s[k])s[k][n].cum=s[k][n].total;if(!I.isDirty)I.isDirty=ia!==Dc||ra!==Sd}function za(k){k=(new w(k)).render();Pb.push(k);return k}function eb(){var k=o.title,n=o.stackLabels,t=o.alternateGridColor,r=o.lineWidth,J,E,Q=(J=l.hasRendered)&&K(Dc)&&!isNaN(Dc);E=zb.length&&K(ia)&&K(ra);ya=R?Da:Aa;fb=ya/(ra-ia||1);cc=R?X:vb;if(E||Ub){if(Wc&&!Ya)for(E=ia+
(Ba[0]-ia)%Wc;E<=ra;E+=Wc){Wb[E]||(Wb[E]=new q(E,true));Q&&Wb[E].isNew&&Wb[E].render(null,true);Wb[E].isActive=true;Wb[E].render()}u(Ba,function($,F){if(!Ub||$>=ia&&$<=ra){Q&&mb[$].isNew&&mb[$].render(F,true);mb[$].isActive=true;mb[$].render(F)}});t&&u(Ba,function($,F){if(F%2===0&&$<ra){dc[$]||(dc[$]=new w);dc[$].options={from:$,to:Ba[F+1]!==Wa?Ba[F+1]:ra,color:t};dc[$].render();dc[$].isActive=true}});J||u((o.plotLines||[]).concat(o.plotBands||[]),function($){Pb.push((new w($)).render())})}u([mb,
Wb,dc],function($){for(var F in $)if($[F].isActive)$[F].isActive=false;else{$[F].destroy();delete $[F]}});if(r){J=X+(Oa?Da:0)+la;E=cb-vb-(Oa?Aa:0)+la;J=ga.crispLine([Za,R?X:J,R?E:ea,Ka,R?$a-Ib:J,R?E:cb-vb],r);if(La)La.animate({d:J});else La=ga.path(J).attr({stroke:o.lineColor,"stroke-width":r,zIndex:7}).add()}if(ba){J=R?X:ea;r=ja(k.style.fontSize||12);J={low:J+(R?0:ya),middle:J+ya/2,high:J+(R?ya:0)}[k.align];r=(R?ea+Aa:X)+(R?1:-1)*(Oa?-1:1)*nd+(L===2?r:0);ba[ba.isNew?"attr":"animate"]({x:R?J:r+(Oa?
Da:0)+la+(k.x||0),y:R?r-(Oa?Aa:0)+la:J+(k.y||0)});ba.isNew=false}if(n&&n.enabled){var fa,ka;n=I.stackTotalGroup;if(!n)I.stackTotalGroup=n=ga.g("stack-labels").attr({visibility:Ab,zIndex:6}).translate(X,ea).add();for(fa in s){k=s[fa];for(ka in k)k[ka].render(n)}}I.isDirty=false}function ab(k){for(var n=Pb.length;n--;)Pb[n].id===k&&Pb[n].destroy()}var xa=p.isX,Oa=p.opposite,R=va?!xa:xa,L=R?Oa?0:2:Oa?1:3,s={},o=Ca(xa?Yc:od,[ge,he,Td,ie][L],p),I=this,ba,B=o.type,D=B==="datetime",ca=B==="logarithmic",
la=o.offset||0,qa=xa?"x":"y",ya,fb,Hb,cc=R?X:vb,G,ha,na,Ra,La,pa,wa,zb,Vb,Gb,ra=null,ia=null,Dc,Sd,Qd=o.minPadding,Rd=o.maxPadding,Ub=K(o.linkedTo),Od,Pd,Vc;B=o.events;var pd,Pb=[],Ta,Wc,Fb,Ba,mb={},Wb={},dc={},qc,rc,nd,Xc,Ya=o.categories,je=o.labels.formatter||function(){var k=this.value;return Xc?Zc(Xc,k):Ta%1E6===0?k/1E6+"M":Ta%1E3===0?k/1E3+"k":!Ya&&k>=1E3?Ed(k,0):k},$c=R&&o.labels.staggerLines,ec=o.reversed,fc=Ya&&o.tickmarkPlacement==="between"?0.5:0;q.prototype={addLabel:function(){var k=this.pos,
n=o.labels,t=!(k===ia&&!A(o.showFirstLabel,1)||k===ra&&!A(o.showLastLabel,0)),r=Ya&&R&&Ya.length&&!n.step&&!n.staggerLines&&!n.rotation&&Da/Ya.length||!R&&Da/2,J=Ya&&K(Ya[k])?Ya[k]:k,E=this.label;k=je.call({isFirst:k===Ba[0],isLast:k===Ba[Ba.length-1],dateTimeLabelFormat:Xc,value:ca?Fa.pow(10,J):J});r=r&&{width:Ia(1,W(r-2*(n.padding||10)))+Ua};r=sa(r,n.style);if(E===Wa)this.label=K(k)&&t&&n.enabled?ga.text(k,0,0,n.useHTML).attr({align:n.align,rotation:n.rotation}).css(r).add(na):null;else E&&E.attr({text:k}).css(r)},
getLabelSize:function(){var k=this.label;return k?(this.labelBBox=k.getBBox())[R?"height":"width"]:0},render:function(k,n){var t=!this.minor,r=this.label,J=this.pos,E=o.labels,Q=this.gridLine,fa=t?o.gridLineWidth:o.minorGridLineWidth,ka=t?o.gridLineColor:o.minorGridLineColor,$=t?o.gridLineDashStyle:o.minorGridLineDashStyle,F=this.mark,O=t?o.tickLength:o.minorTickLength,S=t?o.tickWidth:o.minorTickWidth||0,aa=t?o.tickColor:o.minorTickColor,Eb=t?o.tickPosition:o.minorTickPosition,kb=E.step,nb=n&&ad||
cb,Qb;Qb=R?G(J+fc,null,null,n)+cc:X+la+(Oa?(n&&qd||$a)-Ib-X:0);nb=R?nb-vb+la-(Oa?Aa:0):nb-G(J+fc,null,null,n)-cc;if(fa){J=ha(J+fc,fa,n);if(Q===Wa){Q={stroke:ka,"stroke-width":fa};if($)Q.dashstyle=$;if(t)Q.zIndex=1;this.gridLine=Q=fa?ga.path(J).attr(Q).add(Ra):null}!n&&Q&&J&&Q.animate({d:J})}if(S){if(Eb==="inside")O=-O;if(Oa)O=-O;t=ga.crispLine([Za,Qb,nb,Ka,Qb+(R?0:-O),nb+(R?O:0)],S);if(F)F.animate({d:t});else this.mark=ga.path(t).attr({stroke:aa,"stroke-width":S}).add(na)}if(r&&!isNaN(Qb)){Qb=Qb+
E.x-(fc&&R?fc*fb*(ec?-1:1):0);nb=nb+E.y-(fc&&!R?fc*fb*(ec?1:-1):0);K(E.y)||(nb+=ja(r.styles.lineHeight)*0.9-r.getBBox().height/2);if($c)nb+=k/(kb||1)%$c*16;if(kb)r[k%kb?"hide":"show"]();r[this.isNew?"attr":"animate"]({x:Qb,y:nb})}this.isNew=false},destroy:function(){Ac(this)}};w.prototype={render:function(){var k=this,n=k.options,t=n.label,r=k.label,J=n.width,E=n.to,Q=n.from,fa=n.value,ka,$=n.dashStyle,F=k.svgElem,O=[],S,aa,Eb=n.color;aa=n.zIndex;var kb=n.events;if(ca){Q=mc(Q);E=mc(E);fa=mc(fa)}if(J){O=
ha(fa,J);n={stroke:Eb,"stroke-width":J};if($)n.dashstyle=$}else if(K(Q)&&K(E)){Q=Ia(Q,ia);E=tb(E,ra);ka=ha(E);if((O=ha(Q))&&ka)O.push(ka[4],ka[5],ka[1],ka[2]);else O=null;n={fill:Eb}}else return;if(K(aa))n.zIndex=aa;if(F)if(O)F.animate({d:O},null,F.onGetPath);else{F.hide();F.onGetPath=function(){F.show()}}else if(O&&O.length){k.svgElem=F=ga.path(O).attr(n).add();if(kb){$=function(nb){F.on(nb,function(Qb){kb[nb].apply(k,[Qb])})};for(S in kb)$(S)}}if(t&&K(t.text)&&O&&O.length&&Da>0&&Aa>0){t=Ca({align:R&&
ka&&"center",x:R?!ka&&4:10,verticalAlign:!R&&ka&&"middle",y:R?ka?16:10:ka?6:-4,rotation:R&&!ka&&90},t);if(!r)k.label=r=ga.text(t.text,0,0).attr({align:t.textAlign||t.align,rotation:t.rotation,zIndex:aa}).css(t.style).add();ka=[O[1],O[4],A(O[6],O[1])];O=[O[2],O[5],A(O[7],O[2])];S=tb.apply(Fa,ka);aa=tb.apply(Fa,O);r.align(t,false,{x:S,y:aa,width:Ia.apply(Fa,ka)-S,height:Ia.apply(Fa,O)-aa});r.show()}else r&&r.hide();return k},destroy:function(){Ac(this);nc(Pb,this)}};x.prototype={destroy:function(){Ac(this)},
setTotal:function(k){this.cum=this.total=k},render:function(k){var n=this.options.formatter.call(this);if(this.label)this.label.attr({text:n,visibility:ob});else this.label=l.renderer.text(n,0,0).css(this.options.style).attr({align:this.textAlign,rotation:this.options.rotation,visibility:ob}).add(k)},setOffset:function(k,n){var t=this.isNegative,r=I.translate(this.total),J=I.translate(0);J=bb(r-J);var E=l.xAxis[0].translate(this.x)+k,Q=l.plotHeight;t={x:va?t?r:r-J:E,y:va?Q-E-n:t?Q-r-J:Q-r,width:va?
J:n,height:va?n:J};this.label&&this.label.align(this.alignOptions,null,t).attr({visibility:Ab})}};G=function(k,n,t,r,J){var E=1,Q=0,fa=r?Hb:fb;r=r?Dc:ia;fa||(fa=fb);if(t){E*=-1;Q=ya}if(ec){E*=-1;Q-=E*ya}if(n){if(ec)k=ya-k;k=k/fa+r;if(ca&&J)k=Fa.pow(10,k)}else{if(ca&&J)k=mc(k);k=E*(k-r)*fa+Q}return k};ha=function(k,n,t){var r,J,E;k=G(k,null,null,t);var Q=t&&ad||cb,fa=t&&qd||$a,ka;t=J=W(k+cc);r=E=W(Q-k-cc);if(isNaN(k))ka=true;else if(R){r=ea;E=Q-vb;if(t<X||t>X+Da)ka=true}else{t=X;J=fa-Ib;if(r<ea||r>
ea+Aa)ka=true}return ka?null:ga.crispLine([Za,t,r,Ka,J,E],n||0)};if(va&&xa&&ec===Wa)ec=true;sa(I,{addPlotBand:za,addPlotLine:za,adjustTickAmount:function(){if(Ob&&!D&&!Ya&&!Ub){var k=qc,n=Ba.length;qc=Ob[qa];if(n<qc){for(;Ba.length<qc;)Ba.push(ta(Ba[Ba.length-1]+Ta));fb*=(n-1)/(qc-1);ra=Ba[Ba.length-1]}if(K(k)&&qc!==k)I.isDirty=true}},categories:Ya,getExtremes:function(){return{min:ia,max:ra,dataMin:pa,dataMax:wa,userMin:Vb,userMax:Gb}},getPlotLinePath:ha,getThreshold:function(k){if(ia>k)k=ia;else if(ra<
k)k=ra;return G(k,0,1)},isXAxis:xa,options:o,plotLinesAndBands:Pb,getOffset:function(){var k=zb.length&&K(ia)&&K(ra),n=0,t=0,r=o.title,J=o.labels,E=[-1,1,1,-1][L],Q;if(!na){na=ga.g("axis").attr({zIndex:7}).add();Ra=ga.g("grid").attr({zIndex:1}).add()}rc=0;if(k||Ub){u(Ba,function(fa){if(mb[fa])mb[fa].addLabel();else mb[fa]=new q(fa);if(L===0||L===2||{1:"left",3:"right"}[L]===J.align)rc=Ia(mb[fa].getLabelSize(),rc)});if($c)rc+=($c-1)*16}else for(Q in mb){mb[Q].destroy();delete mb[Q]}if(r&&r.text){if(!ba){ba=
I.axisTitle=ga.text(r.text,0,0,r.useHTML).attr({zIndex:7,rotation:r.rotation||0,align:r.textAlign||{low:"left",middle:"center",high:"right"}[r.align]}).css(r.style).add();ba.isNew=true}n=ba.getBBox()[R?"height":"width"];t=A(r.margin,R?5:10)}la=E*(o.offset||Xb[L]);nd=rc+(L!==2&&rc&&E*o.labels[R?"y":"x"])+t;Xb[L]=Ia(Xb[L],nd+n+E*la)},render:eb,setCategories:function(k,n){I.categories=p.categories=Ya=k;u(zb,function(t){t.translate();t.setTooltipPoints(true)});I.isDirty=true;A(n,true)&&l.redraw()},setExtremes:function(k,
n,t,r){t=A(t,true);Pa(I,"setExtremes",{min:k,max:n},function(){Vb=k;Gb=n;t&&l.redraw(r)})},setScale:Ma,setTickPositions:da,translate:G,redraw:function(){Yb.resetTracker&&Yb.resetTracker();eb();u(Pb,function(k){k.render()});u(zb,function(k){k.isDirty=true})},removePlotBand:ab,removePlotLine:ab,reversed:ec,stacks:s,destroy:function(){var k;pb(I);for(k in s){Ac(s[k]);s[k]=null}if(I.stackTotalGroup)I.stackTotalGroup=I.stackTotalGroup.destroy();u([mb,Wb,dc,Pb],function(n){Ac(n)});u([La,na,Ra,ba],function(n){n&&
n.destroy()});La=na=Ra=ba=null}});for(pd in B)Qa(I,pd,B[pd]);Ma()}function d(){var p={};return{add:function(q,w,x,V){if(!p[q]){w=ga.text(w,0,0).css(a.toolbar.itemStyle).align({align:"right",x:-Ib-20,y:ea+30}).on("click",V).attr({align:"right",zIndex:20}).add();p[q]=w}},remove:function(q){pc(p[q].element);p[q]=null}}}function e(p){function q(){var B=this.points||zc(this),D=B[0].series.xAxis,ca=this.x;D=D&&D.options.type==="datetime";var la=Sb(ca)||D,qa;qa=la?['<span style="font-size: 10px">'+(D?Zc("%A, %b %e, %Y",
ca):ca)+"</span>"]:[];u(B,function(ya){qa.push(ya.point.tooltipFormatter(la))});return qa.join("<br/>")}function w(B,D){L=xa?B:(2*L+B)/3;s=xa?D:(s+D)/2;o.translate(L,s);rd=bb(B-L)>1||bb(D-s)>1?function(){w(B,D)}:null}function x(){if(!xa){var B=l.hoverPoints;o.hide();u(da,function(D){D&&D.hide()});B&&u(B,function(D){D.setState()});l.hoverPoints=null;xa=true}}var V,N=p.borderWidth,ta=p.crosshairs,da=[],Ma=p.style,za=p.shared,eb=ja(Ma.padding),ab=N+eb,xa=true,Oa,R,L=0,s=0;Ma.padding=0;var o=ga.g("tooltip").attr({zIndex:8}).add(),
I=ga.rect(ab,ab,0,0,p.borderRadius,N).attr({fill:p.backgroundColor,"stroke-width":N}).add(o).shadow(p.shadow),ba=ga.text("",eb+ab,ja(Ma.fontSize)+eb+ab,p.useHTML).attr({zIndex:1}).css(Ma).add(o);o.hide();return{shared:za,refresh:function(B){var D,ca,la,qa=0,ya={},fb=[];la=B.tooltipPos;D=p.formatter||q;ya=l.hoverPoints;if(za){ya&&u(ya,function(Hb){Hb.setState()});l.hoverPoints=B;u(B,function(Hb){Hb.setState(Bb);qa+=Hb.plotY;fb.push(Hb.getLabelConfig())});ca=B[0].plotX;qa=W(qa)/B.length;ya={x:B[0].category};
ya.points=fb;B=B[0]}else ya=B.getLabelConfig();ya=D.call(ya);V=B.series;ca=za?ca:B.plotX;qa=za?qa:B.plotY;D=W(la?la[0]:va?Da-qa:ca);ca=W(la?la[1]:va?Aa-ca:qa);la=za||!B.series.isCartesian||gc(D,ca);if(ya===false||!la)x();else{if(xa){o.show();xa=false}ba.attr({text:ya});la=ba.getBBox();Oa=la.width+2*eb;R=la.height+2*eb;I.attr({width:Oa,height:R,stroke:p.borderColor||B.color||V.color||"#606060"});D=fe(Oa,R,X,ea,Da,Aa,{x:D,y:ca});w(W(D.x-ab),W(D.y-ab))}if(ta){ta=zc(ta);for(D=ta.length;D--;){ca=B.series[D?
"yAxis":"xAxis"];if(ta[D]&&ca){ca=ca.getPlotLinePath(B[D?"y":"x"],1);if(da[D])da[D].attr({d:ca,visibility:Ab});else{la={"stroke-width":ta[D].width||1,stroke:ta[D].color||"#C0C0C0",zIndex:2};if(ta[D].dashStyle)la.dashstyle=ta[D].dashStyle;da[D]=ga.path(ca).attr(la).add()}}}}},hide:x,destroy:function(){u(da,function(B){B&&B.destroy()});u([I,ba,o],function(B){B&&B.destroy()});I=ba=o=null}}}function f(p){function q(L){var s,o=Ud&&ua.width/ua.body.scrollWidth-1,I,ba,B;L=L||db.event;if(!L.target)L.target=
L.srcElement;s=L.touches?L.touches.item(0):L;if(L.type!=="mousemove"||db.opera||o){Jb=Fd(oa);I=Jb.left;ba=Jb.top}if(Pc){B=L.x;s=L.y}else if(s.layerX===Wa){B=s.pageX-I;s=s.pageY-ba}else{B=L.layerX;s=L.layerY}if(o){B+=W((o+1)*I-I);s+=W((o+1)*ba-ba)}return sa(L,{chartX:B,chartY:s})}function w(L){var s={xAxis:[],yAxis:[]};u(Va,function(o){var I=o.translate,ba=o.isXAxis;s[ba?"xAxis":"yAxis"].push({axis:o,value:I((va?!ba:ba)?L.chartX-X:Aa-L.chartY+ea,true)})});return s}function x(){var L=l.hoverSeries,
s=l.hoverPoint;s&&s.onMouseOut();L&&L.onMouseOut();hc&&hc.hide();sd=null}function V(){if(za){var L={xAxis:[],yAxis:[]},s=za.getBBox(),o=s.x-X,I=s.y-ea;if(Ma){u(Va,function(ba){var B=ba.translate,D=ba.isXAxis,ca=va?!D:D,la=B(ca?o:Aa-I-s.height,true,0,0,1);B=B(ca?o+s.width:Aa-I,true,0,0,1);L[D?"xAxis":"yAxis"].push({axis:ba,min:tb(la,B),max:Ia(la,B)})});Pa(l,"selection",L,td)}za=za.destroy()}l.mouseIsDown=ud=Ma=false;pb(ua,Kb?"touchend":"mouseup",V)}function N(L){var s=K(L.pageX)?L.pageX:L.page.x;L=
K(L.pageX)?L.pageY:L.page.y;Jb&&!gc(s-Jb.left-X,L-Jb.top-ea)&&x()}var ta,da,Ma,za,eb=z.zoomType,ab=/x/.test(eb),xa=/y/.test(eb),Oa=ab&&!va||xa&&va,R=xa&&!va||ab&&va;bd=function(){if(Ec){Ec.translate(X,ea);va&&Ec.attr({width:l.plotWidth,height:l.plotHeight}).invert()}else l.trackerGroup=Ec=ga.g("tracker").attr({zIndex:9}).add()};bd();if(p.enabled)l.tooltip=hc=e(p);(function(){oa.onmousedown=function(s){s=q(s);!Kb&&s.preventDefault&&s.preventDefault();l.mouseIsDown=ud=true;ta=s.chartX;da=s.chartY;Qa(ua,
Kb?"touchend":"mouseup",V)};var L=function(s){if(!(s&&s.touches&&s.touches.length>1)){s=q(s);if(!Kb)s.returnValue=false;var o=s.chartX,I=s.chartY,ba=!gc(o-X,I-ea);Jb||(Jb=Fd(oa));if(Kb&&s.type==="touchstart")if(Ga(s.target,"isTracker"))l.runTrackerClick||s.preventDefault();else!ke&&!ba&&s.preventDefault();if(ba){if(o<X)o=X;else if(o>X+Da)o=X+Da;if(I<ea)I=ea;else if(I>ea+Aa)I=ea+Aa}if(ud&&s.type!=="touchstart"){Ma=Math.sqrt(Math.pow(ta-o,2)+Math.pow(da-I,2));if(Ma>10){if(sc&&(ab||xa)&&gc(ta-X,da-ea))za||
(za=ga.rect(X,ea,Oa?1:Da,R?1:Aa,0).attr({fill:z.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add());if(za&&Oa){o=o-ta;za.attr({width:bb(o),x:(o>0?0:o)+ta})}if(za&&R){I=I-da;za.attr({height:bb(I),y:(I>0?0:I)+da})}}}else if(!ba){var B;I=l.hoverPoint;o=l.hoverSeries;var D,ca,la=$a,qa=va?s.chartY:s.chartX-X;if(hc&&p.shared){B=[];D=Ha.length;for(ca=0;ca<D;ca++)if(Ha[ca].visible&&Ha[ca].tooltipPoints.length){s=Ha[ca].tooltipPoints[qa];s._dist=bb(qa-s.plotX);la=tb(la,s._dist);B.push(s)}for(D=
B.length;D--;)B[D]._dist>la&&B.splice(D,1);if(B.length&&B[0].plotX!==sd){hc.refresh(B);sd=B[0].plotX}}if(o&&o.tracker)(s=o.tooltipPoints[qa])&&s!==I&&s.onMouseOver()}return ba||!sc}};oa.onmousemove=L;Qa(oa,"mouseleave",x);Qa(ua,"mousemove",N);oa.ontouchstart=function(s){if(ab||xa)oa.onmousedown(s);L(s)};oa.ontouchmove=L;oa.ontouchend=function(){Ma&&x()};oa.onclick=function(s){var o=l.hoverPoint;s=q(s);s.cancelBubble=true;if(!Ma)if(o&&Ga(s.target,"isTracker")){var I=o.plotX,ba=o.plotY;sa(o,{pageX:Jb.left+
X+(va?Da-ba:I),pageY:Jb.top+ea+(va?Aa-I:ba)});Pa(o.series,"click",sa(s,{point:o}));o.firePointEvent("click",s)}else{sa(s,w(s));gc(s.chartX-X,s.chartY-ea)&&Pa(l,"click",s)}Ma=false}})();Vd=setInterval(function(){rd&&rd()},32);sa(this,{zoomX:ab,zoomY:xa,resetTracker:x,destroy:function(){if(l.trackerGroup)l.trackerGroup=Ec=l.trackerGroup.destroy();pb(ua,"mousemove",N);oa.onclick=oa.onmousedown=oa.onmousemove=oa.ontouchstart=oa.ontouchend=oa.ontouchmove=null}})}function g(p){var q=p.type||z.type||z.defaultSeriesType,
w=wb[q],x=l.hasRendered;if(x)if(va&&q==="column")w=wb.bar;else if(!va&&q==="bar")w=wb.column;q=new w;q.init(l,p);if(!x&&q.inverted)va=true;if(q.isCartesian)sc=q.isCartesian;Ha.push(q);return q}function h(){z.alignTicks!==false&&u(Va,function(p){p.adjustTickAmount()});Ob=null}function i(p){var q=l.isDirtyLegend,w,x=l.isDirtyBox,V=Ha.length,N=V,ta=l.clipRect;for(oc(p,l);N--;){p=Ha[N];if(p.isDirty&&p.options.stacking){w=true;break}}if(w)for(N=V;N--;){p=Ha[N];if(p.options.stacking)p.isDirty=true}u(Ha,
function(da){if(da.isDirty){da.cleanData();da.getSegments();if(da.options.legendType==="point")q=true}});if(q&&Fc.renderLegend){Fc.renderLegend();l.isDirtyLegend=false}if(sc){if(!cd){Ob=null;u(Va,function(da){da.setScale()})}h();Gc();u(Va,function(da){if(da.isDirty||x){da.redraw();x=true}})}if(x){vd();bd();if(ta){Hc(ta);ta.animate({width:l.plotSizeX,height:l.plotSizeY})}}u(Ha,function(da){if(da.isDirty&&da.visible&&(!da.isCartesian||da.xAxis))da.redraw()});Yb&&Yb.resetTracker&&Yb.resetTracker();Pa(l,
"redraw")}function j(){var p=a.xAxis||{},q=a.yAxis||{},w;p=zc(p);u(p,function(x,V){x.index=V;x.isX=true});q=zc(q);u(q,function(x,V){x.index=V});Va=p.concat(q);l.xAxis=[];l.yAxis=[];Va=tc(Va,function(x){w=new c(x);l[w.isXAxis?"xAxis":"yAxis"].push(w);return w});h()}function m(p,q){uc=Ca(a.title,p);Ic=Ca(a.subtitle,q);u([["title",p,uc],["subtitle",q,Ic]],function(w){var x=w[0],V=l[x],N=w[1];w=w[2];if(V&&N)V=V.destroy();if(w&&w.text&&!V)l[x]=ga.text(w.text,0,0,w.useHTML).attr({align:w.align,"class":"highcharts-"+
x,zIndex:1}).css(w.style).add().align(w,false,Rb)})}function v(){qb=z.renderTo;Wd=vc+wd++;if(Sb(qb))qb=ua.getElementById(qb);qb.innerHTML="";if(!qb.offsetWidth){Zb=qb.cloneNode(0);Ja(Zb,{position:ic,top:"-9999px",display:""});ua.body.appendChild(Zb)}dd=(Zb||qb).offsetWidth;Jc=(Zb||qb).offsetHeight;l.chartWidth=$a=z.width||dd||600;l.chartHeight=cb=z.height||(Jc>19?Jc:400);l.container=oa=hb(Tb,{className:"highcharts-container"+(z.className?" "+z.className:""),id:Wd},sa({position:Xd,overflow:ob,width:$a+
Ua,height:cb+Ua,textAlign:"left"},z.style),Zb||qb);l.renderer=ga=z.forExport?new ed(oa,$a,cb,true):new fd(oa,$a,cb);var p,q;if(Yd&&oa.getBoundingClientRect){p=function(){Ja(oa,{left:0,top:0});q=oa.getBoundingClientRect();Ja(oa,{left:-(q.left-ja(q.left))+Ua,top:-(q.top-ja(q.top))+Ua})};p();Qa(db,"resize",p);Qa(l,"destroy",function(){pb(db,"resize",p)})}}function P(){function p(){var w=z.width||qb.offsetWidth,x=z.height||qb.offsetHeight;if(w&&x){if(w!==dd||x!==Jc){clearTimeout(q);q=setTimeout(function(){xd(w,
x,false)},100)}dd=w;Jc=x}}var q;Qa(db,"resize",p);Qa(l,"destroy",function(){pb(db,"resize",p)})}function T(){Pa(l,"endResize",null,function(){cd-=1})}function Y(){var p=a.labels,q=a.credits,w;m();Fc=l.legend=new le;Gc();u(Va,function(x){x.setTickPositions(true)});h();Gc();vd();sc&&u(Va,function(x){x.render()});if(!l.seriesGroup)l.seriesGroup=ga.g("series-group").attr({zIndex:3}).add();u(Ha,function(x){x.translate();x.setTooltipPoints();x.render()});p.items&&u(p.items,function(){var x=sa(p.style,this.style),
V=ja(x.left)+X,N=ja(x.top)+ea+12;delete x.left;delete x.top;ga.text(this.html,V,N).attr({zIndex:2}).css(x).add()});if(!l.toolbar)l.toolbar=d();if(q.enabled&&!l.credits){w=q.href;l.credits=ga.text(q.text,0,0).on("click",function(){if(w)location.href=w}).attr({align:q.position.align,zIndex:8}).css(q.style).add().align(q.position)}bd();l.hasRendered=true;if(Zb){qb.appendChild(oa);pc(Zb)}}function H(){var p,q=oa&&oa.parentNode;if(l!==null){Pa(l,"destroy");pb(db,"unload",H);pb(l);for(p=Va.length;p--;)Va[p]=
Va[p].destroy();for(p=Ha.length;p--;)Ha[p]=Ha[p].destroy();u(["title","subtitle","seriesGroup","clipRect","credits","tracker"],function(w){var x=l[w];if(x)l[w]=x.destroy()});u([wc,xc,Kc,Fc,hc,ga,Yb],function(w){w&&w.destroy&&w.destroy()});wc=xc=Kc=Fc=hc=ga=Yb=null;if(oa){oa.innerHTML="";pb(oa);q&&pc(oa);oa=null}clearInterval(Vd);for(p in l)delete l[p];l=null}}function U(){if(!Lc&&db==db.top&&ua.readyState!=="complete")ua.attachEvent("onreadystatechange",function(){ua.detachEvent("onreadystatechange",
U);ua.readyState==="complete"&&U()});else{v();yd();zd();u(a.series||[],function(p){g(p)});l.inverted=va=A(va,a.chart.inverted);j();l.render=Y;l.tracker=Yb=new f(a.tooltip);Y();Pa(l,"load");b&&b.apply(l,[l]);u(l.callbacks,function(p){p.apply(l,[l])})}}Yc=Ca(Yc,Xa.xAxis);od=Ca(od,Xa.yAxis);Xa.xAxis=Xa.yAxis=null;a=Ca(Xa,a);var z=a.chart,M=z.margin;M=Nb(M)?M:[M,M,M,M];var y=A(z.marginTop,M[0]),C=A(z.marginRight,M[1]),Z=A(z.marginBottom,M[2]),Sa=A(z.marginLeft,M[3]),Na=z.spacingTop,Ea=z.spacingRight,
gb=z.spacingBottom,Lb=z.spacingLeft,Rb,uc,Ic,ea,Ib,vb,X,Xb,qb,Zb,oa,Wd,dd,Jc,$a,cb,qd,ad,wc,Kc,Ad,xc,l=this,ke=(M=z.events)&&!!M.click,Bd,gc,hc,ud,jc,Zd,Cd,Aa,Da,Yb,Ec,bd,Fc,$b,ac,Jb,sc=z.showAxes,cd=0,Va=[],Ob,Ha=[],va,ga,rd,Vd,sd,vd,Gc,yd,zd,xd,td,$d,le=function(){function p(G,ha){var na=G.legendItem,Ra=G.legendLine,La=G.legendSymbol,pa=Oa.color,wa=ha?N.itemStyle.color:pa,zb=ha?G.color:pa;pa=ha?G.pointAttr[ib]:{stroke:pa,fill:pa};na&&na.css({fill:wa});Ra&&Ra.attr({stroke:zb});La&&La.attr(pa)}function q(G,
ha,na){var Ra=G.legendItem,La=G.legendLine,pa=G.legendSymbol;G=G.checkbox;Ra&&Ra.attr({x:ha,y:na});La&&La.translate(ha,na-4);pa&&pa.attr({x:ha+pa.xOff,y:na+pa.yOff});if(G){G.x=ha;G.y=na}}function w(){u(za,function(G){var ha=G.checkbox,na=qa.alignAttr;ha&&Ja(ha,{left:na.translateX+G.legendItemWidth+ha.x-40+Ua,top:na.translateY+ha.y-11+Ua})})}function x(G){var ha,na,Ra,La,pa=G.legendItem;La=G.series||G;var wa=La.options,zb=wa&&wa.borderWidth||0;if(!pa){La=/^(bar|pie|area|column)$/.test(La.type);G.legendItem=
pa=ga.text(N.labelFormatter.call(G),0,0).css(G.visible?ab:Oa).on("mouseover",function(){G.setState(Bb);pa.css(xa)}).on("mouseout",function(){pa.css(G.visible?ab:Oa);G.setState()}).on("click",function(){var Gb=function(){G.setVisible()};G.firePointEvent?G.firePointEvent("legendItemClick",null,Gb):Pa(G,"legendItemClick",null,Gb)}).attr({zIndex:2}).add(qa);if(!La&&wa&&wa.lineWidth){var Vb={"stroke-width":wa.lineWidth,zIndex:2};if(wa.dashStyle)Vb.dashstyle=wa.dashStyle;G.legendLine=ga.path([Za,-da-Ma,
0,Ka,-Ma,0]).attr(Vb).add(qa)}if(La)ha=ga.rect(na=-da-Ma,Ra=-11,da,12,2).attr({zIndex:3}).add(qa);else if(wa&&wa.marker&&wa.marker.enabled)ha=ga.symbol(G.symbol,na=-da/2-Ma,Ra=-4,wa.marker.radius).attr({zIndex:3}).add(qa);if(ha){ha.xOff=na+zb%2/2;ha.yOff=Ra+zb%2/2}G.legendSymbol=ha;p(G,G.visible);if(wa&&wa.showCheckbox){G.checkbox=hb("input",{type:"checkbox",checked:G.selected,defaultChecked:G.selected},N.itemCheckboxStyle,oa);Qa(G.checkbox,"click",function(Gb){Pa(G,"checkboxClick",{checked:Gb.target.checked},
function(){G.select()})})}}ha=pa.getBBox();na=G.legendItemWidth=N.itemWidth||da+Ma+ha.width+R;B=ha.height;if(ta&&o-s+na>(fb||$a-2*R-s)){o=s;I+=B}ba=I;q(G,o,I);if(ta)o+=na;else I+=B;ya=fb||Ia(ta?o-s:na,ya)}function V(){o=s;I=L;ba=ya=0;qa||(qa=ga.g("legend").attr({zIndex:7}).add());za=[];u(Hb,function(Ra){var La=Ra.options;if(La.showInLegend)za=za.concat(La.legendType==="point"?Ra.data:Ra)});Hd(za,function(Ra,La){return(Ra.options.legendIndex||0)-(La.options.legendIndex||0)});cc&&za.reverse();u(za,
x);$b=fb||ya;ac=ba-L+B;if(ca||la){$b+=2*R;ac+=2*R;if(D){if($b>0&&ac>0){D[D.isNew?"attr":"animate"](D.crisp(null,null,null,$b,ac));D.isNew=false}}else{D=ga.rect(0,0,$b,ac,N.borderRadius,ca||0).attr({stroke:N.borderColor,"stroke-width":ca||0,fill:la||jb}).add(qa).shadow(N.shadow);D.isNew=true}D[za.length?"show":"hide"]()}for(var G=["left","right","top","bottom"],ha,na=4;na--;){ha=G[na];if(eb[ha]&&eb[ha]!=="auto"){N[na<2?"align":"verticalAlign"]=ha;N[na<2?"x":"y"]=ja(eb[ha])*(na%2?-1:1)}}za.length&&
qa.align(sa(N,{width:$b,height:ac}),true,Rb);cd||w()}var N=l.options.legend;if(N.enabled){var ta=N.layout==="horizontal",da=N.symbolWidth,Ma=N.symbolPadding,za,eb=N.style,ab=N.itemStyle,xa=N.itemHoverStyle,Oa=N.itemHiddenStyle,R=ja(eb.padding),L=18,s=4+R+da+Ma,o,I,ba,B=0,D,ca=N.borderWidth,la=N.backgroundColor,qa,ya,fb=N.width,Hb=l.series,cc=N.reversed;V();Qa(l,"endResize",w);return{colorizeItem:p,destroyItem:function(G){var ha=G.checkbox;u(["legendItem","legendLine","legendSymbol"],function(na){G[na]&&
G[na].destroy()});ha&&pc(G.checkbox)},renderLegend:V,destroy:function(){if(D)D=D.destroy();if(qa)qa=qa.destroy()}}}};gc=function(p,q){return p>=0&&p<=Da&&q>=0&&q<=Aa};$d=function(){Pa(l,"selection",{resetSelection:true},td);l.toolbar.remove("zoom")};td=function(p){var q=Xa.lang,w=l.pointCount<100;l.toolbar.add("zoom",q.resetZoom,q.resetZoomTitle,$d);!p||p.resetSelection?u(Va,function(x){x.setExtremes(null,null,false,w)}):u(p.xAxis.concat(p.yAxis),function(x){var V=x.axis;if(l.tracker[V.isXAxis?"zoomX":
"zoomY"])V.setExtremes(x.min,x.max,false,w)});i()};Gc=function(){var p=a.legend,q=A(p.margin,10),w=p.x,x=p.y,V=p.align,N=p.verticalAlign,ta;yd();if((l.title||l.subtitle)&&!K(y))if(ta=Ia(l.title&&!uc.floating&&!uc.verticalAlign&&uc.y||0,l.subtitle&&!Ic.floating&&!Ic.verticalAlign&&Ic.y||0))ea=Ia(ea,ta+A(uc.margin,15)+Na);if(p.enabled&&!p.floating)if(V==="right")K(C)||(Ib=Ia(Ib,$b-w+q+Ea));else if(V==="left")K(Sa)||(X=Ia(X,$b+w+q+Lb));else if(N==="top")K(y)||(ea=Ia(ea,ac+x+q+Na));else if(N==="bottom")K(Z)||
(vb=Ia(vb,ac-x+q+gb));sc&&u(Va,function(da){da.getOffset()});K(Sa)||(X+=Xb[3]);K(y)||(ea+=Xb[0]);K(Z)||(vb+=Xb[2]);K(C)||(Ib+=Xb[1]);zd()};xd=function(p,q,w){var x=l.title,V=l.subtitle;cd+=1;oc(w,l);ad=cb;qd=$a;l.chartWidth=$a=W(p);l.chartHeight=cb=W(q);Ja(oa,{width:$a+Ua,height:cb+Ua});ga.setSize($a,cb,w);Da=$a-X-Ib;Aa=cb-ea-vb;Ob=null;u(Va,function(N){N.isDirty=true;N.setScale()});u(Ha,function(N){N.isDirty=true});l.isDirtyLegend=true;l.isDirtyBox=true;Gc();x&&x.align(null,null,Rb);V&&V.align(null,
null,Rb);i(w);ad=null;Pa(l,"resize");Bc===false?T():setTimeout(T,Bc&&Bc.duration||500)};zd=function(){l.plotLeft=X=W(X);l.plotTop=ea=W(ea);l.plotWidth=Da=W($a-X-Ib);l.plotHeight=Aa=W(cb-ea-vb);l.plotSizeX=va?Aa:Da;l.plotSizeY=va?Da:Aa;Rb={x:Lb,y:Na,width:$a-Lb-Ea,height:cb-Na-gb}};yd=function(){ea=A(y,Na);Ib=A(C,Ea);vb=A(Z,gb);X=A(Sa,Lb);Xb=[0,0,0,0]};vd=function(){var p=z.borderWidth||0,q=z.backgroundColor,w=z.plotBackgroundColor,x=z.plotBackgroundImage,V,N={x:X,y:ea,width:Da,height:Aa};V=p+(z.shadow?
8:0);if(p||q)if(wc)wc.animate(wc.crisp(null,null,null,$a-V,cb-V));else wc=ga.rect(V/2,V/2,$a-V,cb-V,z.borderRadius,p).attr({stroke:z.borderColor,"stroke-width":p,fill:q||jb}).add().shadow(z.shadow);if(w)if(Kc)Kc.animate(N);else Kc=ga.rect(X,ea,Da,Aa,0).attr({fill:w}).add().shadow(z.plotShadow);if(x)if(Ad)Ad.animate(N);else Ad=ga.image(x,X,ea,Da,Aa).add();if(z.plotBorderWidth)if(xc)xc.animate(xc.crisp(null,X,ea,Da,Aa));else xc=ga.rect(X,ea,Da,Aa,0,z.plotBorderWidth).attr({stroke:z.plotBorderColor,
"stroke-width":z.plotBorderWidth,zIndex:4}).add();l.isDirtyBox=false};Qa(db,"unload",H);z.reflow!==false&&Qa(l,"load",P);if(M)for(Bd in M)Qa(l,Bd,M[Bd]);l.options=a;l.series=Ha;l.addSeries=function(p,q,w){var x;if(p){oc(w,l);q=A(q,true);Pa(l,"addSeries",{options:p},function(){x=g(p);x.isDirty=true;l.isDirtyLegend=true;q&&l.redraw()})}return x};l.animation=A(z.animation,true);l.destroy=H;l.get=function(p){var q,w,x;for(q=0;q<Va.length;q++)if(Va[q].options.id===p)return Va[q];for(q=0;q<Ha.length;q++)if(Ha[q].options.id===
p)return Ha[q];for(q=0;q<Ha.length;q++){x=Ha[q].data;for(w=0;w<x.length;w++)if(x[w].id===p)return x[w]}return null};l.getSelectedPoints=function(){var p=[];u(Ha,function(q){p=p.concat(Dd(q.data,function(w){return w.selected}))});return p};l.getSelectedSeries=function(){return Dd(Ha,function(p){return p.selected})};l.hideLoading=function(){gd(jc,{opacity:0},{duration:a.loading.hideDuration,complete:function(){Ja(jc,{display:jb})}});Cd=false};l.isInsidePlot=gc;l.redraw=i;l.setSize=xd;l.setTitle=m;l.showLoading=
function(p){var q=a.loading;if(!jc){jc=hb(Tb,{className:"highcharts-loading"},sa(q.style,{left:X+Ua,top:ea+Ua,width:Da+Ua,height:Aa+Ua,zIndex:10,display:jb}),oa);Zd=hb("span",null,q.labelStyle,jc)}Zd.innerHTML=p||a.lang.loading;if(!Cd){Ja(jc,{opacity:0,display:""});gd(jc,{opacity:q.style.opacity},{duration:q.showDuration});Cd=true}};l.pointCount=0;l.counters=new Gd;U()}var ua=document,db=window,Fa=Math,W=Fa.round,lb=Fa.floor,md=Fa.ceil,Ia=Fa.max,tb=Fa.min,bb=Fa.abs,rb=Fa.cos,Cb=Fa.sin,kc=Fa.PI,ae=
kc*2/360,yc=navigator.userAgent,Pc=/msie/i.test(yc)&&!db.opera,Mc=ua.documentMode===8,Ud=/AppleWebKit/.test(yc),Yd=/Firefox/.test(yc),Lc=!!ua.createElementNS&&!!ua.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,me=Yd&&parseInt(yc.split("Firefox/")[1],10)<4,fd,Kb=ua.documentElement.ontouchstart!==undefined,be={},wd=0,ub=1,Tc,Xa,Zc,Bc,Nc,Wa,Tb="div",ic="absolute",Xd="relative",ob="hidden",vc="highcharts-",Ab="visible",Ua="px",jb="none",Za="M",Ka="L",ce="rgba(192,192,192,"+(Lc?1.0E-6:
0.0020)+")",ib="",Bb="hover",Qc,id,jd,kd,Cc,Rc,Sc,Jd,Kd,ld,Ld,Md,ma=db.HighchartsAdapter,Db=ma||{},u=Db.each,Dd=Db.grep,tc=Db.map,Ca=Db.merge,Qa=Db.addEvent,pb=Db.removeEvent,Pa=Db.fireEvent,gd=Db.animate,Hc=Db.stop,wb={};Zc=function(a,b,c){function d(P){return P.toString().replace(/^([0-9])$/,"0$1")}if(!K(b)||isNaN(b))return"Invalid date";a=A(a,"%Y-%m-%d %H:%M:%S");b=new Date(b*ub);var e,f=b[jd](),g=b[kd](),h=b[Cc](),i=b[Rc](),j=b[Sc](),m=Xa.lang,v=m.weekdays;b={a:v[g].substr(0,3),A:v[g],d:d(h),
e:h,b:m.shortMonths[i],B:m.months[i],m:d(i+1),y:j.toString().substr(2,2),Y:j,H:d(f),I:d(f%12||12),l:f%12||12,M:d(b[id]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:d(b.getSeconds())};for(e in b)a=a.replace("%"+e,b[e]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a};Gd.prototype={wrapColor:function(a){if(this.color>=a)this.color=0},wrapSymbol:function(a){if(this.symbol>=a)this.symbol=0}};Nc={init:function(a,b,c){b=b||"";var d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g;b=b.split(" ");c=[].concat(c);var h,
i,j=function(m){for(g=m.length;g--;)m[g]===Za&&m.splice(g+1,0,m[g+1],m[g+2],m[g+1],m[g+2])};if(e){j(b);j(c)}if(a.isArea){h=b.splice(b.length-6,6);i=c.splice(c.length-6,6)}if(d){c=[].concat(c).splice(0,f).concat(c);a.shift=false}if(b.length)for(a=c.length;b.length<a;){d=[].concat(b).splice(b.length-f,f);if(e){d[f-6]=d[f-2];d[f-5]=d[f-1]}b=b.concat(d)}if(h){b=b.concat(h);c=c.concat(i)}return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(c===1)e=d;else if(f===b.length&&c<1)for(;f--;){d=parseFloat(a[f]);
e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d}else e=b;return e}};ma&&ma.init&&ma.init(Nc);if(!ma&&db.jQuery){var Mb=jQuery;u=function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===false)return c};Dd=Mb.grep;tc=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)c[d]=b.call(a[d],a[d],d,a);return c};Ca=function(){var a=arguments;return Mb.extend(true,null,a[0],a[1],a[2],a[3])};Qa=function(a,b,c){Mb(a).bind(b,c)};pb=function(a,b,c){var d=ua.removeEventListener?"removeEventListener":"detachEvent";
if(ua[d]&&!a[d])a[d]=function(){};Mb(a).unbind(b,c)};Pa=function(a,b,c,d){var e=Mb.Event(b),f="detached"+b;sa(e,c);if(a[b]){a[f]=a[b];a[b]=null}Mb(a).trigger(e);if(a[f]){a[b]=a[f];a[f]=null}d&&!e.isDefaultPrevented()&&d(e)};gd=function(a,b,c){var d=Mb(a);if(b.d){a.toD=b.d;b.d=1}d.stop();d.animate(b,c)};Hc=function(a){Mb(a).stop()};Mb.extend(Mb.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});var de=jQuery.fx,ee=de.step;u(["cur","_default","width","height"],function(a,b){var c=b?
ee:de.prototype,d=c[a],e;if(d)c[a]=function(f){f=b?f:this;e=f.elem;return e.attr?e.attr(f.prop,f.now):d.apply(this,arguments)}});ee.d=function(a){var b=a.elem;if(!a.started){var c=Nc.init(b,b.d,b.toD);a.start=c[0];a.end=c[1];a.started=true}b.attr("d",Nc.step(a.start,a.end,a.pos,b.toD))}}ma={enabled:true,align:"center",x:0,y:15,style:{color:"#666",fontSize:"11px",lineHeight:"14px"}};Xa={colors:["#4572A7","#AA4643","#89A54E","#80699B","#3D96AE","#DB843D","#92A8CD","#A47D7C","#B5CA92"],symbols:["circle",
"diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],decimalPoint:".",resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:true},chart:{borderColor:"#4572A7",
borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:true,spacingTop:10,spacingRight:10,spacingBottom:15,spacingLeft:10,style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0"},title:{text:"Chart title",align:"center",y:15,style:{color:"#3E576F",fontSize:"16px"}},subtitle:{text:"",align:"center",y:30,style:{color:"#6D869F"}},plotOptions:{line:{allowPointSelect:false,showCheckbox:false,
animation:{duration:1E3},events:{},lineWidth:2,shadow:true,marker:{enabled:true,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:Ca(ma,{enabled:false,y:-6,formatter:function(){return this.y}}),showInLegend:true,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:true}},labels:{style:{position:ic,color:"#3E576F"}},legend:{enabled:true,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},
borderWidth:1,borderColor:"#909090",borderRadius:5,shadow:false,style:{padding:"5px"},itemStyle:{cursor:"pointer",color:"#3E576F"},itemHoverStyle:{cursor:"pointer",color:"#000000"},itemHiddenStyle:{color:"#C0C0C0"},itemCheckboxStyle:{position:ic,width:"13px",height:"13px"},symbolWidth:16,symbolPadding:5,verticalAlign:"bottom",x:0,y:0},loading:{hideDuration:100,labelStyle:{fontWeight:"bold",position:Xd,top:"1em"},showDuration:100,style:{position:ic,backgroundColor:"white",opacity:0.5,textAlign:"center"}},
tooltip:{enabled:true,backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:2,borderRadius:5,shadow:true,snap:Kb?25:10,style:{color:"#333333",fontSize:"12px",padding:"5px",whiteSpace:"nowrap"}},toolbar:{itemStyle:{color:"#4572A7",cursor:"pointer"}},credits:{enabled:true,text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"10px"}}};var Yc={dateTimeLabelFormats:{second:"%H:%M:%S",minute:"%H:%M",
hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:false,gridLineColor:"#C0C0C0",labels:ma,lineColor:"#C0D0E0",lineWidth:1,max:null,min:null,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:false,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#6D869F",
fontWeight:"bold"}},type:"linear"},od=Ca(Yc,{endOnTick:true,gridLineWidth:1,tickPixelInterval:72,showLastLabel:true,labels:{align:"right",x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:true,tickWidth:0,title:{rotation:270,text:"Y-values"},stackLabels:{enabled:false,formatter:function(){return this.total},style:ma.style}}),ie={labels:{align:"right",x:-8,y:null},title:{rotation:270}},he={labels:{align:"left",x:8,y:null},title:{rotation:90}},Td={labels:{align:"center",x:0,y:14},title:{rotation:0}},
ge=Ca(Td,{labels:{y:-5}}),xb=Xa.plotOptions;ma=xb.line;xb.spline=Ca(ma);xb.scatter=Ca(ma,{lineWidth:0,states:{hover:{lineWidth:0}}});xb.area=Ca(ma,{});xb.areaspline=Ca(xb.area);xb.column=Ca(ma,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,states:{hover:{brightness:0.1,shadow:false},select:{color:"#C0C0C0",borderColor:"#000000",shadow:false}},dataLabels:{y:null,verticalAlign:null}});xb.bar=Ca(xb.column,{dataLabels:{align:"left",x:5,
y:0}});xb.pie=Ca(ma,{borderColor:"#FFFFFF",borderWidth:1,center:["50%","50%"],colorByPoint:true,dataLabels:{distance:30,enabled:true,formatter:function(){return this.point.name},y:5},legendType:"point",marker:null,size:"75%",showInLegend:false,slicedOffset:10,states:{hover:{brightness:0.1,shadow:false}}});Id();var bc=function(a){var b=[],c;(function(d){if(c=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(d))b=[ja(c[1]),ja(c[2]),ja(c[3]),parseFloat(c[4],
10)];else if(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(d))b=[ja(c[1],16),ja(c[2],16),ja(c[3],16),1]})(a);return{get:function(d){return b&&!isNaN(b[0])?d==="rgb"?"rgb("+b[0]+","+b[1]+","+b[2]+")":d==="a"?b[3]:"rgba("+b.join(",")+")":a},brighten:function(d){if(lc(d)&&d!==0){var e;for(e=0;e<3;e++){b[e]+=ja(d*255);if(b[e]<0)b[e]=0;if(b[e]>255)b[e]=255}}return this},setOpacity:function(d){b[3]=d;return this}}};Uc.prototype={init:function(a,b){this.element=ua.createElementNS("http://www.w3.org/2000/svg",
b);this.renderer=a},animate:function(a,b,c){if(b=A(b,Bc,true)){b=Ca(b);if(c)b.complete=c;gd(this,a,b)}else{this.attr(a);c&&c()}},attr:function(a,b){var c,d,e,f,g=this.element,h=g.nodeName,i=this.renderer,j,m=this.shadows,v=this.htmlNode,P,T=this;if(Sb(a)&&K(b)){c=a;a={};a[c]=b}if(Sb(a)){c=a;if(h==="circle")c={x:"cx",y:"cy"}[c]||c;else if(c==="strokeWidth")c="stroke-width";T=Ga(g,c)||this[c]||0;if(c!=="d"&&c!=="visibility")T=parseFloat(T)}else for(c in a){j=false;d=a[c];if(c==="d"){if(d&&d.join)d=
d.join(" ");if(/(NaN| {2}|^$)/.test(d))d="M 0 0";this.d=d}else if(c==="x"&&h==="text"){for(e=0;e<g.childNodes.length;e++){f=g.childNodes[e];Ga(f,"x")===Ga(g,"x")&&Ga(f,"x",d)}if(this.rotation)Ga(g,"transform","rotate("+this.rotation+" "+d+" "+ja(a.y||Ga(g,"y"))+")")}else if(c==="fill")d=i.color(d,g,c);else if(h==="circle"&&(c==="x"||c==="y"))c={x:"cx",y:"cy"}[c]||c;else if(c==="translateX"||c==="translateY"||c==="rotation"||c==="verticalAlign"){this[c]=d;this.updateTransform();j=true}else if(c===
"stroke")d=i.color(d,g,c);else if(c==="dashstyle"){c="stroke-dasharray";d=d&&d.toLowerCase();if(d==="solid")d=jb;else if(d){d=d.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(e=d.length;e--;)d[e]=ja(d[e])*a["stroke-width"];d=d.join(",")}}else if(c==="isTracker")this[c]=d;else if(c==="width")d=ja(d);else if(c===
"align"){c="text-anchor";d={left:"start",center:"middle",right:"end"}[d]}else if(c==="title"){e=ua.createElementNS("http://www.w3.org/2000/svg","title");e.appendChild(ua.createTextNode(d));g.appendChild(e)}if(c==="strokeWidth")c="stroke-width";if(Ud&&c==="stroke-width"&&d===0)d=1.0E-6;if(this.symbolName&&/^(x|y|r|start|end|innerR)/.test(c)){if(!P){this.symbolAttr(a);P=true}j=true}if(m&&/^(width|height|visibility|x|y|d)$/.test(c))for(e=m.length;e--;)Ga(m[e],c,d);if((c==="width"||c==="height")&&h===
"rect"&&d<0)d=0;if(c==="text"){this.textStr=d;this.added&&i.buildText(this)}else j||Ga(g,c,d);if(v&&(c==="x"||c==="y"||c==="translateX"||c==="translateY"||c==="visibility")){e=v.length?v:[this];f=e.length;var Y;for(Y=0;Y<f;Y++){v=e[Y];j=v.getBBox();v=v.htmlNode;Ja(v,sa(this.styles,{left:j.x+(this.translateX||0)+Ua,top:j.y+(this.translateY||0)+Ua}));c==="visibility"&&Ja(v,{visibility:d})}}}return T},symbolAttr:function(a){var b=this;u(["x","y","r","start","end","width","height","innerR"],function(c){b[c]=
A(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](W(b.x*2)/2,W(b.y*2)/2,b.r,{start:b.start,end:b.end,width:b.width,height:b.height,innerR:b.innerR})})},clip:function(a){return this.attr("clip-path","url("+this.renderer.url+"#"+a.id+")")},crisp:function(a,b,c,d,e){var f,g={},h={},i;a=a||this.strokeWidth||0;i=a%2/2;h.x=lb(b||this.x||0)+i;h.y=lb(c||this.y||0)+i;h.width=lb((d||this.width||0)-2*i);h.height=lb((e||this.height||0)-2*i);h.strokeWidth=a;for(f in h)if(this[f]!==h[f])this[f]=g[f]=h[f];
return g},css:function(a){var b=this.element;b=a&&a.width&&b.nodeName==="text";var c,d="",e=function(f,g){return"-"+g.toLowerCase()};if(a&&a.color)a.fill=a.color;this.styles=a=sa(this.styles,a);if(Pc&&!Lc){b&&delete a.width;Ja(this.element,a)}else{for(c in a)d+=c.replace(/([A-Z])/g,e)+":"+a[c]+";";this.attr({style:d})}b&&this.added&&this.renderer.buildText(this);return this},on:function(a,b){var c=b;if(Kb&&a==="click"){a="touchstart";c=function(d){d.preventDefault();b()}}this.element["on"+a]=c;return this},
translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=true;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.inverted,d=this.rotation,e=[];if(c){a+=this.attr("width");b+=this.attr("height")}if(a||b)e.push("translate("+a+","+b+")");if(c)e.push("rotate(90) scale(-1,1)");else d&&e.push("rotate("+d+" "+this.x+" "+this.y+")");e.length&&Ga(this.element,"transform",e.join(" "))},toFront:function(){var a=
this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){if(a){this.alignOptions=a;this.alignByTranslate=b;c||this.renderer.alignedObjects.push(this)}else{a=this.alignOptions;b=this.alignByTranslate}c=A(c,this.renderer);var d=a.align,e=a.verticalAlign,f=(c.x||0)+(a.x||0),g=(c.y||0)+(a.y||0),h={};if(/^(right|center)$/.test(d))f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=W(f);if(/^(bottom|middle)$/.test(e))g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||
1);h[b?"translateY":"y"]=W(g);this[this.placed?"animate":"attr"](h);this.placed=true;this.alignAttr=h;return this},getBBox:function(){var a,b,c,d=this.rotation,e=d*ae;try{a=sa({},this.element.getBBox())}catch(f){a={width:0,height:0}}b=a.width;c=a.height;if(d){a.width=bb(c*Cb(e))+bb(b*rb(e));a.height=bb(c*rb(e))+bb(b*Cb(e))}return a},show:function(){return this.attr({visibility:Ab})},hide:function(){return this.attr({visibility:ob})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=
d.childNodes,f=this.element,g=Ga(f,"zIndex");this.parentInverted=a&&a.inverted;this.textStr!==undefined&&b.buildText(this);if(a&&this.htmlNode){if(!a.htmlNode)a.htmlNode=[];a.htmlNode.push(this)}if(g){c.handleZ=true;g=ja(g)}if(c.handleZ)for(c=0;c<e.length;c++){a=e[c];b=Ga(a,"zIndex");if(a!==f&&(ja(b)>g||!K(g)&&K(b))){d.insertBefore(f,a);return this}}d.appendChild(f);this.added=true;return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||
{},c=a.shadows,d,e;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=null;Hc(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(e=0;e<a.stops.length;e++)a.stops[e]=a.stops[e].destroy();a.stops=null}a.safeRemoveChild(b);c&&u(c,function(f){a.safeRemoveChild(f)});nc(a.renderer.alignedObjects,a);for(d in a)delete a[d];return null},empty:function(){for(var a=this.element,b=a.childNodes,c=b.length;c--;)a.removeChild(b[c])},shadow:function(a,b){var c=[],d,e,f=this.element,g=this.parentInverted?
"(-1,-1)":"(1,1)";if(a){for(d=1;d<=3;d++){e=f.cloneNode(0);Ga(e,{isShadow:"true",stroke:"rgb(0, 0, 0)","stroke-opacity":0.05*d,"stroke-width":7-2*d,transform:"translate"+g,fill:jb});b?b.element.appendChild(e):f.parentNode.insertBefore(e,f);c.push(e)}this.shadows=c}return this}};var ed=function(){this.init.apply(this,arguments)};ed.prototype={Element:Uc,init:function(a,b,c,d){var e=location,f;f=this.createElement("svg").attr({xmlns:"http://www.w3.org/2000/svg",version:"1.1"});a.appendChild(f.element);
this.box=f.element;this.boxWrapper=f;this.alignedObjects=[];this.url=Pc?"":e.href.replace(/#.*?$/,"");this.defs=this.createElement("defs").add();this.forExport=d;this.gradients=[];this.setSize(b,c,false)},destroy:function(){var a,b=this.gradients,c=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();if(b){for(a=0;a<b.length;a++)this.gradients[a]=b[a].destroy();this.gradients=null}if(c)this.defs=c.destroy();return this.alignedObjects=null},createElement:function(a){var b=new this.Element;
b.init(this,a);return b},buildText:function(a){for(var b=a.element,c=A(a.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),d=b.childNodes,e=/style="([^"]+)"/,f=/href="([^"]+)"/,g=Ga(b,"x"),h=a.styles,i=h&&a.useHTML&&!this.forExport,j=a.htmlNode,m=h&&ja(h.width),v=h&&h.lineHeight,P,T=d.length;T--;)b.removeChild(d[T]);m&&!a.added&&
this.box.appendChild(b);u(c,function(Y,H){var U,z=0,M;Y=Y.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");U=Y.split("|||");u(U,function(y){if(y!==""||U.length===1){var C={},Z=ua.createElementNS("http://www.w3.org/2000/svg","tspan");e.test(y)&&Ga(Z,"style",y.match(e)[1].replace(/(;| |^)color([ :])/,"$1fill$2"));if(f.test(y)){Ga(Z,"onclick",'location.href="'+y.match(f)[1]+'"');Ja(Z,{cursor:"pointer"})}y=(y.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");Z.appendChild(ua.createTextNode(y));
if(z)C.dx=3;else C.x=g;if(!z){if(H){!Lc&&a.renderer.forExport&&Ja(Z,{display:"block"});M=db.getComputedStyle&&ja(db.getComputedStyle(P,null).getPropertyValue("line-height"));if(!M||isNaN(M))M=v||P.offsetHeight||18;Ga(Z,"dy",M)}P=Z}Ga(Z,C);b.appendChild(Z);z++;if(m){y=y.replace(/-/g,"- ").split(" ");for(var Sa,Na=[];y.length||Na.length;){Sa=b.getBBox().width;C=Sa>m;if(!C||y.length===1){y=Na;Na=[];if(y.length){Z=ua.createElementNS("http://www.w3.org/2000/svg","tspan");Ga(Z,{dy:v||16,x:g});b.appendChild(Z);
if(Sa>m)m=Sa}}else{Z.removeChild(Z.firstChild);Na.unshift(y.pop())}y.length&&Z.appendChild(ua.createTextNode(y.join(" ").replace(/- /g,"-")))}}}})});if(i){if(!j)j=a.htmlNode=hb("span",null,sa(h,{position:ic,top:0,left:0}),this.box.parentNode);j.innerHTML=a.textStr;for(T=d.length;T--;)d[T].style.visibility=ob}},crispLine:function(a,b){if(a[1]===a[4])a[1]=a[4]=W(a[1])+b%2/2;if(a[2]===a[5])a[2]=a[5]=W(a[2])+b%2/2;return a},path:function(a){return this.createElement("path").attr({d:a,fill:jb})},circle:function(a,
b,c){a=Nb(a)?a:{x:a,y:b,r:c};return this.createElement("circle").attr(a)},arc:function(a,b,c,d,e,f){if(Nb(a)){b=a.y;c=a.r;d=a.innerR;e=a.start;f=a.end;a=a.x}return this.symbol("arc",a||0,b||0,c||0,{innerR:d||0,start:e||0,end:f||0})},rect:function(a,b,c,d,e,f){if(Nb(a)){b=a.y;c=a.width;d=a.height;e=a.r;f=a.strokeWidth;a=a.x}e=this.createElement("rect").attr({rx:e,ry:e,fill:jb});return e.attr(e.crisp(f,a,b,Ia(c,0),Ia(d,0)))},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;
this.height=b;for(this.boxWrapper[A(c,true)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return K(a)?b.attr({"class":vc+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:jb};arguments.length>1&&sa(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e){var f,
g=this.symbols[a];g=g&&g(W(b),W(c),d,e);var h=/^url\((.*?)\)$/,i;if(g){f=this.path(g);sa(f,{symbolName:a,x:b,y:c,r:d});e&&sa(f,e)}else if(h.test(a)){var j=function(m,v){m.attr({width:v[0],height:v[1]}).translate(-W(v[0]/2),-W(v[1]/2))};i=a.match(h)[1];a=be[i];f=this.image(i).attr({x:b,y:c});if(a)j(f,a);else{f.attr({width:0,height:0});hb("img",{onload:function(){j(f,be[i]=[this.width,this.height])},src:i})}}else f=this.circle(b,c,d);return f},symbols:{square:function(a,b,c){c=0.707*c;return[Za,a-c,
b-c,Ka,a+c,b-c,a+c,b+c,a-c,b+c,"Z"]},triangle:function(a,b,c){return[Za,a,b-1.33*c,Ka,a+c,b+0.67*c,a-c,b+0.67*c,"Z"]},"triangle-down":function(a,b,c){return[Za,a,b+1.33*c,Ka,a-c,b-0.67*c,a+c,b-0.67*c,"Z"]},diamond:function(a,b,c){return[Za,a,b-c,Ka,a+c,b,a,b+c,a-c,b,"Z"]},arc:function(a,b,c,d){var e=d.start,f=d.end-1.0E-6,g=d.innerR,h=rb(e),i=Cb(e),j=rb(f);f=Cb(f);d=d.end-e<kc?0:1;return[Za,a+c*h,b+c*i,"A",c,c,0,d,1,a+c*j,b+c*f,Ka,a+g*j,b+g*f,"A",g,g,0,d,0,a+g*h,b+g*i,"Z"]}},clipRect:function(a,b,
c,d){var e=vc+wd++,f=this.createElement("clipPath").attr({id:e}).add(this.defs);a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},color:function(a,b,c){var d,e=/^rgba/;if(a&&a.linearGradient){var f=this;b=a.linearGradient;c=vc+wd++;var g,h,i;g=f.createElement("linearGradient").attr({id:c,gradientUnits:"userSpaceOnUse",x1:b[0],y1:b[1],x2:b[2],y2:b[3]}).add(f.defs);f.gradients.push(g);g.stops=[];u(a.stops,function(j){if(e.test(j[1])){d=bc(j[1]);h=d.get("rgb");i=d.get("a")}else{h=j[1];i=1}j=
f.createElement("stop").attr({offset:j[0],"stop-color":h,"stop-opacity":i}).add(g);g.stops.push(j)});return"url("+this.url+"#"+c+")"}else if(e.test(a)){d=bc(a);Ga(b,c+"-opacity",d.get("a"));return d.get("rgb")}else{b.removeAttribute(c+"-opacity");return a}},text:function(a,b,c,d){var e=Xa.chart.style;b=W(A(b,0));c=W(A(c,0));a=this.createElement("text").attr({x:b,y:c,text:a}).css({fontFamily:e.fontFamily,fontSize:e.fontSize});a.x=b;a.y=c;a.useHTML=d;return a}};fd=ed;if(!Lc){Db=yb(Uc,{init:function(a,
b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ",ic,";"];if(b==="shape"||b===Tb)d.push("left:0;top:0;width:10px;height:10px;");if(Mc)d.push("visibility: ",b===Tb?ob:Ab);c.push(' style="',d.join(""),'"/>');if(b){c=b===Tb||b==="span"||b==="img"?c.join(""):a.prepVML(c);this.element=hb(c)}this.renderer=a},add:function(a){var b=this.renderer,c=this.element,d=b.box;d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);Mc&&d.gVis===ob&&Ja(c,{visibility:ob});d.appendChild(c);this.added=true;this.alignOnAdd&&
this.updateTransform();return this},attr:function(a,b){var c,d,e,f=this.element||{},g=f.style,h=f.nodeName,i=this.renderer,j=this.symbolName,m,v,P=this.shadows,T=this;if(Sb(a)&&K(b)){c=a;a={};a[c]=b}if(Sb(a)){c=a;T=c==="strokeWidth"||c==="stroke-width"?this.strokeweight:this[c]}else for(c in a){d=a[c];m=false;if(j&&/^(x|y|r|start|end|width|height|innerR)/.test(c)){if(!v){this.symbolAttr(a);v=true}m=true}else if(c==="d"){d=d||[];this.d=d.join(" ");e=d.length;for(m=[];e--;)m[e]=lc(d[e])?W(d[e]*10)-
5:d[e]==="Z"?"x":d[e];d=m.join(" ")||"x";f.path=d;if(P)for(e=P.length;e--;)P[e].path=d;m=true}else if(c==="zIndex"||c==="visibility"){if(Mc&&c==="visibility"&&h==="DIV"){f.gVis=d;m=f.childNodes;for(e=m.length;e--;)Ja(m[e],{visibility:d});if(d===Ab)d=null}if(d)g[c]=d;m=true}else if(/^(width|height)$/.test(c)){this[c]=d;if(this.updateClipping){this[c]=d;this.updateClipping()}else g[c]=d;m=true}else if(/^(x|y)$/.test(c)){this[c]=d;if(f.tagName==="SPAN")this.updateTransform();else g[{x:"left",y:"top"}[c]]=
d}else if(c==="class")f.className=d;else if(c==="stroke"){d=i.color(d,f,c);c="strokecolor"}else if(c==="stroke-width"||c==="strokeWidth"){f.stroked=d?true:false;c="strokeweight";this[c]=d;if(lc(d))d+=Ua}else if(c==="dashstyle"){(f.getElementsByTagName("stroke")[0]||hb(i.prepVML(["<stroke/>"]),null,null,f))[c]=d||"solid";this.dashstyle=d;m=true}else if(c==="fill")if(h==="SPAN")g.color=d;else{f.filled=d!==jb?true:false;d=i.color(d,f,c);c="fillcolor"}else if(c==="translateX"||c==="translateY"||c==="rotation"||
c==="align"){if(c==="align")c="textAlign";this[c]=d;this.updateTransform();m=true}else if(c==="text"){this.bBox=null;f.innerHTML=d;m=true}if(P&&c==="visibility")for(e=P.length;e--;)P[e].style[c]=d;if(!m)if(Mc)f[c]=d;else Ga(f,c,d)}return T},clip:function(a){var b=this,c=a.members;c.push(b);b.destroyClip=function(){nc(c,b)};return b.css(a.getCSS(b.inverted))},css:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width){delete a.width;this.textWidth=b;this.updateTransform()}this.styles=sa(this.styles,
a);Ja(this.element,a);return this},safeRemoveChild:function(a){a.parentNode&&pc(a)},destroy:function(){this.destroyClip&&this.destroyClip();return Uc.prototype.destroy.apply(this)},empty:function(){for(var a=this.element.childNodes,b=a.length,c;b--;){c=a[b];c.parentNode.removeChild(c)}},getBBox:function(){var a=this.element,b=this.bBox;if(!b){if(a.nodeName==="text")a.style.position=ic;b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}}return b},on:function(a,b){this.element["on"+
a]=function(){var c=db.event;c.target=c.srcElement;b(c)};return this},updateTransform:function(){if(this.added){var a=this,b=a.element,c=a.translateX||0,d=a.translateY||0,e=a.x||0,f=a.y||0,g=a.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=g&&g!=="left";if(c||d)a.css({marginLeft:c,marginTop:d});a.inverted&&u(b.childNodes,function(z){a.renderer.invertChild(z,b)});if(b.tagName==="SPAN"){var j,m;c=a.rotation;var v;j=0;d=1;var P=0,T;v=ja(a.textWidth);var Y=a.xCorr||0,H=a.yCorr||0,U=[c,g,b.innerHTML,
a.textWidth].join(",");if(U!==a.cTT){if(K(c)){j=c*ae;d=rb(j);P=Cb(j);Ja(b,{filter:c?["progid:DXImageTransform.Microsoft.Matrix(M11=",d,", M12=",-P,", M21=",P,", M22=",d,", sizingMethod='auto expand')"].join(""):jb})}j=b.offsetWidth;m=b.offsetHeight;if(j>v){Ja(b,{width:v+Ua,display:"block",whiteSpace:"normal"});j=v}v=W((ja(b.style.fontSize)||12)*1.2);Y=d<0&&-j;H=P<0&&-m;T=d*P<0;Y+=P*v*(T?1-h:h);H-=d*v*(c?T?h:1-h:1);if(i){Y-=j*h*(d<0?-1:1);if(c)H-=m*h*(P<0?-1:1);Ja(b,{textAlign:g})}a.xCorr=Y;a.yCorr=
H}Ja(b,{left:e+Y,top:f+H});a.cTT=U}}else this.alignOnAdd=true},shadow:function(a,b){var c=[],d,e=this.element,f=this.renderer,g,h=e.style,i,j=e.path;if(j&&typeof j.value!=="string")j="x";if(a){for(d=1;d<=3;d++){i=['<shape isShadow="true" strokeweight="',7-2*d,'" filled="false" path="',j,'" coordsize="100,100" style="',e.style.cssText,'" />'];g=hb(f.prepVML(i),null,{left:ja(h.left)+1,top:ja(h.top)+1});i=['<stroke color="black" opacity="',0.05*d,'"/>'];hb(f.prepVML(i),null,null,g);b?b.element.appendChild(g):
e.parentNode.insertBefore(g,e);c.push(g)}this.shadows=c}return this}});ma=function(){this.init.apply(this,arguments)};ma.prototype=Ca(ed.prototype,{Element:Db,isIE8:yc.indexOf("MSIE 8.0")>-1,init:function(a,b,c){var d;this.alignedObjects=[];d=this.createElement(Tb);a.appendChild(d.element);this.box=d.element;this.boxWrapper=d;this.setSize(b,c,false);if(!ua.namespaces.hcv){ua.namespaces.add("hcv","urn:schemas-microsoft-com:vml");ua.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}},
clipRect:function(a,b,c,d){var e=this.createElement();return sa(e,{members:[],left:a,top:b,width:c,height:d,getCSS:function(f){var g=this.top,h=this.left,i=h+this.width,j=g+this.height;g={clip:"rect("+W(f?h:g)+"px,"+W(f?j:i)+"px,"+W(f?i:j)+"px,"+W(f?g:h)+"px)"};!f&&Mc&&sa(g,{width:i+Ua,height:j+Ua});return g},updateClipping:function(){u(e.members,function(f){f.css(e.getCSS(f.inverted))})}})},color:function(a,b,c){var d,e=/^rgba/;if(a&&a.linearGradient){var f,g,h=a.linearGradient,i,j,m,v;u(a.stops,
function(P,T){if(e.test(P[1])){d=bc(P[1]);f=d.get("rgb");g=d.get("a")}else{f=P[1];g=1}if(T){m=f;v=g}else{i=f;j=g}});a=90-Fa.atan((h[3]-h[1])/(h[2]-h[0]))*180/kc;a=["<",c,' colors="0% ',i,",100% ",m,'" angle="',a,'" opacity="',v,'" o:opacity2="',j,'" type="gradient" focus="100%" />'];hb(this.prepVML(a),null,null,b)}else if(e.test(a)&&b.tagName!=="IMG"){d=bc(a);a=["<",c,' opacity="',d.get("a"),'"/>'];hb(this.prepVML(a),null,null,b);return d.get("rgb")}else{b=b.getElementsByTagName(c);if(b.length)b[0].opacity=
1;return a}},prepVML:function(a){var b=this.isIE8;a=a.join("");if(b){a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />');a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')}else a=a.replace("<","<hcv:");return a},text:function(a,b,c){var d=Xa.chart.style;return this.createElement("span").attr({text:a,x:W(b),y:W(c)}).css({whiteSpace:"nowrap",fontFamily:d.fontFamily,
fontSize:d.fontSize})},path:function(a){return this.createElement("shape").attr({coordsize:"100 100",d:a})},circle:function(a,b,c){return this.symbol("circle").attr({x:a,y:b,r:c})},g:function(a){var b;if(a)b={className:vc+a,"class":vc+a};return this.createElement(Tb).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.css({left:b,top:c,width:d,height:e});return f},rect:function(a,b,c,d,e,f){if(Nb(a)){b=a.y;c=a.width;d=a.height;e=a.r;f=a.strokeWidth;
a=a.x}var g=this.symbol("rect");g.r=e;return g.attr(g.crisp(f,a,b,Ia(c,0),Ia(d,0)))},invertChild:function(a,b){var c=b.style;Ja(a,{flip:"x",left:ja(c.width)-10,top:ja(c.height)-10,rotation:-90})},symbols:{arc:function(a,b,c,d){var e=d.start,f=d.end,g=rb(e),h=Cb(e),i=rb(f),j=Cb(f);d=d.innerR;var m=0.07/c,v=d&&0.1/d||0;if(f-e===0)return["x"];else if(2*kc-f+e<m)i=-m;else if(f-e<v)i=rb(e+v);return["wa",a-c,b-c,a+c,b+c,a+c*g,b+c*h,a+c*i,b+c*j,"at",a-d,b-d,a+d,b+d,a+d*i,b+d*j,a+d*g,b+d*h,"x","e"]},circle:function(a,
b,c){return["wa",a-c,b-c,a+c,b+c,a+c,b,a+c,b,"e"]},rect:function(a,b,c,d){if(!K(d))return[];var e=d.width;d=d.height;var f=a+e,g=b+d;c=tb(c,e,d);return[Za,a+c,b,Ka,f-c,b,"wa",f-2*c,b,f,b+2*c,f-c,b,f,b+c,Ka,f,g-c,"wa",f-2*c,g-2*c,f,g,f,g-c,f-c,g,Ka,a+c,g,"wa",a,g-2*c,a+2*c,g,a+c,g,a,g-c,Ka,a,b+c,"wa",a,b,a+2*c,b+2*c,a,b+c,a+c,b,"x","e"]}}});fd=ma}Nd.prototype.callbacks=[];var Oc=function(){};Oc.prototype={init:function(a,b){var c=a.chart.counters,d;this.series=a;this.applyOptions(b);this.pointAttr=
{};if(a.options.colorByPoint){d=a.chart.options.colors;if(!this.options)this.options={};this.color=this.options.color=this.color||d[c.color++];c.wrapColor(d.length)}a.chart.pointCount++;return this},applyOptions:function(a){var b=this.series;this.config=a;if(lc(a)||a===null)this.y=a;else if(Nb(a)&&!lc(a.length)){sa(this,a);this.options=a}else if(Sb(a[0])){this.name=a[0];this.y=a[1]}else if(lc(a[0])){this.x=a[0];this.y=a[1]}if(this.x===Wa)this.x=b.autoIncrement()},destroy:function(){var a=this,b=a.series,
c=b.chart.hoverPoints,d;b.chart.pointCount--;if(c){a.setState();nc(c,a)}a===b.chart.hoverPoint&&a.onMouseOut();pb(a);u(["graphic","tracker","group","dataLabel","connector","shadowGroup"],function(e){a[e]&&a[e].destroy()});a.legendItem&&a.series.chart.legend.destroyItem(a);for(d in a)a[d]=null},getLabelConfig:function(){return{x:this.category,y:this.y,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},select:function(a,b){var c=this,d=c.series.chart;a=A(a,
!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=a;c.setState(a&&"select");b||u(d.getSelectedPoints(),function(e){if(e.selected&&e!==c){e.selected=false;e.setState(ib);e.firePointEvent("unselect")}})})},onMouseOver:function(){var a=this.series.chart,b=a.tooltip,c=a.hoverPoint;c&&c!==this&&c.onMouseOut();this.firePointEvent("mouseOver");b&&!b.shared&&b.refresh(this);this.setState(Bb);a.hoverPoint=this},onMouseOut:function(){this.firePointEvent("mouseOut");this.setState();
this.series.chart.hoverPoint=null},tooltipFormatter:function(a){var b=this.series;return['<span style="color:'+b.color+'">',this.name||b.name,"</span>: ",!a?"<b>x = "+(this.name||this.x)+",</b> ":"","<b>",!a?"y = ":"",this.y,"</b>"].join("")},update:function(a,b,c){var d=this,e=d.series,f=d.graphic,g=e.chart;b=A(b,true);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);if(Nb(a)){e.getAttribs();f&&f.attr(d.pointAttr[e.state])}e.isDirty=true;b&&g.redraw(c)})},remove:function(a,b){var c=
this,d=c.series,e=d.chart,f=d.data;oc(b,e);a=A(a,true);c.firePointEvent("remove",null,function(){nc(f,c);c.destroy();d.isDirty=true;a&&e.redraw()})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;if(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])this.importEvents();if(a==="click"&&e.allowPointSelect)c=function(f){d.select(null,f.ctrlKey||f.metaKey||f.shiftKey)};Pa(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=Ca(this.series.options.point,
this.options).events,b;this.events=a;for(b in a)Qa(this,b,a[b]);this.hasImportedEvents=true}},setState:function(a){var b=this.series,c=b.options.states,d=xb[b.type].marker&&b.options.marker,e=d&&!d.enabled,f=(d=d&&d.states[a])&&d.enabled===false,g=b.stateMarkerGraphic,h=b.chart,i=this.pointAttr;a=a||ib;if(!(a===this.state||this.selected&&a!=="select"||c[a]&&c[a].enabled===false||a&&(f||e&&!d.enabled))){if(this.graphic)this.graphic.attr(i[a]);else{if(a){if(!g)b.stateMarkerGraphic=g=h.renderer.circle(0,
0,i[a].r).attr(i[a]).add(b.group);g.translate(this.plotX,this.plotY)}if(g)g[a?"show":"hide"]()}this.state=a}}};var sb=function(){};sb.prototype={isCartesian:true,type:"line",pointClass:Oc,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},init:function(a,b){var c,d;d=a.series.length;this.chart=a;b=this.setOptions(b);sa(this,{index:d,options:b,name:b.name||"Series "+(d+1),state:ib,pointAttr:{},visible:b.visible!==false,selected:b.selected===true});d=b.events;
for(c in d)Qa(this,c,d[c]);if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=true;this.getColor();this.getSymbol();this.setData(b.data,false)},autoIncrement:function(){var a=this.options,b=this.xIncrement;b=A(b,a.pointStart,0);this.pointInterval=A(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},cleanData:function(){var a=this.chart,b=this.data,c,d,e=a.smallestInterval,f,g;Hd(b,function(h,i){return h.x-i.x});if(this.options.connectNulls)for(g=
b.length-1;g>=0;g--)b[g].y===null&&b[g-1]&&b[g+1]&&b.splice(g,1);for(g=b.length-1;g>=0;g--)if(b[g-1]){f=b[g].x-b[g-1].x;if(f>0&&(d===Wa||f<d)){d=f;c=g}}if(e===Wa||d<e)a.smallestInterval=d;this.closestPoints=c},getSegments:function(){var a=-1,b=[],c=this.data;u(c,function(d,e){if(d.y===null){e>a+1&&b.push(c.slice(a+1,e));a=e}else e===c.length-1&&b.push(c.slice(a+1,e+1))});this.segments=b},setOptions:function(a){var b=this.chart.options.plotOptions;return Ca(b[this.type],b.series,a)},getColor:function(){var a=
this.chart.options.colors,b=this.chart.counters;this.color=this.options.color||a[b.color++]||"#0000ff";b.wrapColor(a.length)},getSymbol:function(){var a=this.chart.options.symbols,b=this.chart.counters;this.symbol=this.options.marker.symbol||a[b.symbol++];b.wrapSymbol(a.length)},addPoint:function(a,b,c,d){var e=this.data,f=this.graph,g=this.area,h=this.chart;a=(new this.pointClass).init(this,a);oc(d,h);if(f&&c)f.shift=c;if(g){g.shift=c;g.isArea=true}b=A(b,true);e.push(a);c&&e[0].remove(false);this.getAttribs();
this.isDirty=true;b&&h.redraw()},setData:function(a,b){var c=this,d=c.data,e=c.initialColor,f=c.chart,g=d&&d.length||0;c.xIncrement=null;if(K(e))f.counters.color=e;for(a=tc(zc(a||[]),function(h){return(new c.pointClass).init(c,h)});g--;)d[g].destroy();c.data=a;c.cleanData();c.getSegments();c.getAttribs();c.isDirty=true;f.isDirtyBox=true;A(b,true)&&f.redraw(false)},remove:function(a,b){var c=this,d=c.chart;a=A(a,true);if(!c.isRemoving){c.isRemoving=true;Pa(c,"remove",null,function(){c.destroy();d.isDirtyLegend=
d.isDirtyBox=true;a&&d.redraw(b)})}c.isRemoving=false},translate:function(){for(var a=this.chart,b=this.options.stacking,c=this.xAxis.categories,d=this.yAxis,e=this.data,f=e.length;f--;){var g=e[f],h=g.x,i=g.y,j=g.low,m=d.stacks[(i<0?"-":"")+this.stackKey];g.plotX=this.xAxis.translate(h);if(b&&this.visible&&m&&m[h]){j=m[h];h=j.total;j.cum=j=j.cum-i;i=j+i;if(b==="percent"){j=h?j*100/h:0;i=h?i*100/h:0}g.percentage=h?g.y*100/h:0;g.stackTotal=h}if(K(j))g.yBottom=d.translate(j,0,1,0,1);if(i!==null)g.plotY=
d.translate(i,0,1,0,1);g.clientX=a.inverted?a.plotHeight-g.plotX:g.plotX;g.category=c&&c[g.x]!==Wa?c[g.x]:g.x}},setTooltipPoints:function(a){var b=this.chart,c=b.inverted,d=[],e=W((c?b.plotTop:b.plotLeft)+b.plotSizeX),f,g,h=[];if(a)this.tooltipPoints=null;u(this.segments,function(i){d=d.concat(i)});if(this.xAxis&&this.xAxis.reversed)d=d.reverse();u(d,function(i,j){f=d[j-1]?d[j-1]._high+1:0;for(g=i._high=d[j+1]?lb((i.plotX+(d[j+1]?d[j+1].plotX:e))/2):e;f<=g;)h[c?e-f++:f++]=i});this.tooltipPoints=h},
onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(!(!Kb&&a.mouseIsDown)){b&&b!==this&&b.onMouseOut();this.options.events.mouseOver&&Pa(this,"mouseOver");this.tracker&&this.tracker.toFront();this.setState(Bb);a.hoverSeries=this}},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;d&&d.onMouseOut();this&&a.events.mouseOut&&Pa(this,"mouseOut");c&&!a.stickyTracking&&c.hide();this.setState();b.hoverSeries=null},animate:function(a){var b=this.chart,c=this.clipRect,
d=this.options.animation;if(d&&!Nb(d))d={};if(a){if(!c.isAnimating){c.attr("width",0);c.isAnimating=true}}else{c.animate({width:b.plotSizeX},d);this.animate=null}},drawPoints:function(){var a,b=this.data,c=this.chart,d,e,f,g,h,i;if(this.options.marker.enabled)for(f=b.length;f--;){g=b[f];d=g.plotX;e=g.plotY;i=g.graphic;if(e!==Wa&&!isNaN(e)){a=g.pointAttr[g.selected?"select":ib];h=a.r;if(i)i.animate({x:d,y:e,r:h});else g.graphic=c.renderer.symbol(A(g.marker&&g.marker.symbol,this.symbol),d,e,h).attr(a).add(this.group)}}},
convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={};a=a||{};b=b||{};c=c||{};d=d||{};for(f in e){g=e[f];h[f]=A(a[g],b[f],c[f],d[f])}return h},getAttribs:function(){var a=this,b=xb[a.type].marker?a.options.marker:a.options,c=b.states,d=c[Bb],e,f=a.color,g={stroke:f,fill:f},h=a.data,i=[],j,m=a.pointAttrToOptions,v;if(a.options.marker){d.radius=d.radius||b.radius+2;d.lineWidth=d.lineWidth||b.lineWidth+1}else d.color=d.color||bc(d.color||f).brighten(d.brightness).get();i[ib]=a.convertAttribs(b,
g);u([Bb,"select"],function(P){i[P]=a.convertAttribs(c[P],i[ib])});a.pointAttr=i;for(f=h.length;f--;){g=h[f];if((b=g.options&&g.options.marker||g.options)&&b.enabled===false)b.radius=0;e=false;if(g.options)for(v in m)if(K(b[m[v]]))e=true;if(e){j=[];c=b.states||{};e=c[Bb]=c[Bb]||{};if(!a.options.marker)e.color=bc(e.color||g.options.color).brighten(e.brightness||d.brightness).get();j[ib]=a.convertAttribs(b,i[ib]);j[Bb]=a.convertAttribs(c[Bb],i[Bb],j[ib]);j.select=a.convertAttribs(c.select,i.select,
j[ib])}else j=i;g.pointAttr=j}},destroy:function(){var a=this,b=a.chart,c=a.clipRect,d=/\/5[0-9\.]+ (Safari|Mobile)\//.test(yc),e,f;Pa(a,"destroy");pb(a);a.legendItem&&a.chart.legend.destroyItem(a);u(a.data,function(g){g.destroy()});if(c&&c!==b.clipRect)a.clipRect=c.destroy();u(["area","graph","dataLabelsGroup","group","tracker"],function(g){if(a[g]){e=d&&g==="group"?"hide":"destroy";a[g][e]()}});if(b.hoverSeries===a)b.hoverSeries=null;nc(b.series,a);for(f in a)delete a[f]},drawDataLabels:function(){if(this.options.dataLabels.enabled){var a,
b,c=this.data,d=this.options,e=d.dataLabels,f,g=this.dataLabelsGroup,h=this.chart,i=h.renderer,j=h.inverted,m=this.type,v;v=d.stacking;var P=m==="column"||m==="bar",T=e.verticalAlign===null,Y=e.y===null;if(P)if(v){if(T)e=Ca(e,{verticalAlign:"middle"});if(Y)e=Ca(e,{y:{top:14,middle:4,bottom:-6}[e.verticalAlign]})}else if(T)e=Ca(e,{verticalAlign:"top"});if(g)g.translate(h.plotLeft,h.plotTop);else g=this.dataLabelsGroup=i.g("data-labels").attr({visibility:this.visible?Ab:ob,zIndex:6}).translate(h.plotLeft,
h.plotTop).add();v=e.color;if(v==="auto")v=null;e.style.color=A(v,this.color,"black");u(c,function(H){var U=H.barX,z=U&&U+H.barW/2||H.plotX||-999,M=A(H.plotY,-999),y=H.dataLabel,C=e.align,Z=Y?H.y>=0?-6:12:e.y;f=e.formatter.call(H.getLabelConfig());a=(j?h.plotWidth-M:z)+e.x;b=(j?h.plotHeight-z:M)+Z;if(m==="column")a+={left:-1,right:1}[C]*H.barW/2||0;if(j&&H.y<0){C="right";a-=10}if(y){if(j&&!e.y)b=b+ja(y.styles.lineHeight)*0.9-y.getBBox().height/2;y.attr({text:f}).animate({x:a,y:b})}else if(K(f)){y=
H.dataLabel=i.text(f,a,b).attr({align:C,rotation:e.rotation,zIndex:1}).css(e.style).add(g);j&&!e.y&&y.attr({y:b+ja(y.styles.lineHeight)*0.9-y.getBBox().height/2})}if(P&&d.stacking&&y){z=H.barY;M=H.barW;H=H.barH;y.align(e,null,{x:j?h.plotWidth-z-H:U,y:j?h.plotHeight-U-M:z,width:j?H:M,height:j?M:H})}})}},drawGraph:function(){var a=this,b=a.options,c=a.graph,d=[],e,f=a.area,g=a.group,h=b.lineColor||a.color,i=b.lineWidth,j=b.dashStyle,m,v=a.chart.renderer,P=a.yAxis.getThreshold(b.threshold||0),T=/^area/.test(a.type),
Y=[],H=[];u(a.segments,function(U){m=[];u(U,function(C,Z){if(a.getPointSpline)m.push.apply(m,a.getPointSpline(U,C,Z));else{m.push(Z?Ka:Za);Z&&b.step&&m.push(C.plotX,U[Z-1].plotY);m.push(C.plotX,C.plotY)}});if(U.length>1)d=d.concat(m);else Y.push(U[0]);if(T){var z=[],M,y=m.length;for(M=0;M<y;M++)z.push(m[M]);y===3&&z.push(Ka,m[1],m[2]);if(b.stacking&&a.type!=="areaspline")for(M=U.length-1;M>=0;M--)z.push(U[M].plotX,U[M].yBottom);else z.push(Ka,U[U.length-1].plotX,P,Ka,U[0].plotX,P);H=H.concat(z)}});
a.graphPath=d;a.singlePoints=Y;if(T){e=A(b.fillColor,bc(a.color).setOpacity(b.fillOpacity||0.75).get());if(f)f.animate({d:H});else a.area=a.chart.renderer.path(H).attr({fill:e}).add(g)}if(c){Hc(c);c.animate({d:d})}else if(i){c={stroke:h,"stroke-width":i};if(j)c.dashstyle=j;a.graph=v.path(d).attr(c).add(g).shadow(b.shadow)}},render:function(){var a=this,b=a.chart,c,d,e=a.options,f=e.animation,g=f&&a.animate;f=g?f&&f.duration||500:0;var h=a.clipRect,i=b.renderer;if(!h){h=a.clipRect=!b.hasRendered&&
b.clipRect?b.clipRect:i.clipRect(0,0,b.plotSizeX,b.plotSizeY);if(!b.clipRect)b.clipRect=h}if(!a.group){c=a.group=i.g("series");if(b.inverted){d=function(){c.attr({width:b.plotWidth,height:b.plotHeight}).invert()};d();Qa(b,"resize",d);Qa(a,"destroy",function(){pb(b,"resize",d)})}c.clip(a.clipRect).attr({visibility:a.visible?Ab:ob,zIndex:e.zIndex}).translate(b.plotLeft,b.plotTop).add(b.seriesGroup)}a.drawDataLabels();g&&a.animate(true);a.drawGraph&&a.drawGraph();a.drawPoints();a.options.enableMouseTracking!==
false&&a.drawTracker();g&&a.animate();setTimeout(function(){h.isAnimating=false;if((c=a.group)&&h!==b.clipRect&&h.renderer){c.clip(a.clipRect=b.clipRect);h.destroy()}},f);a.isDirty=false},redraw:function(){var a=this.chart,b=this.group;if(b){a.inverted&&b.attr({width:a.plotWidth,height:a.plotHeight});b.animate({translateX:a.plotLeft,translateY:a.plotTop})}this.translate();this.setTooltipPoints(true);this.render()},setState:function(a){var b=this.options,c=this.graph,d=b.states;b=b.lineWidth;a=a||
ib;if(this.state!==a){this.state=a;if(!(d[a]&&d[a].enabled===false)){if(a)b=d[a].lineWidth||b+1;if(c&&!c.dashstyle)c.attr({"stroke-width":b},a?0:500)}}},setVisible:function(a,b){var c=this.chart,d=this.legendItem,e=this.group,f=this.tracker,g=this.dataLabelsGroup,h,i=this.data,j=c.options.chart.ignoreHiddenSeries;h=this.visible;h=(this.visible=a=a===Wa?!h:a)?"show":"hide";e&&e[h]();if(f)f[h]();else for(e=i.length;e--;){f=i[e];f.tracker&&f.tracker[h]()}g&&g[h]();d&&c.legend.colorizeItem(this,a);this.isDirty=
true;this.options.stacking&&u(c.series,function(m){if(m.options.stacking&&m.visible)m.isDirty=true});if(j)c.isDirtyBox=true;b!==false&&c.redraw();Pa(this,h)},show:function(){this.setVisible(true)},hide:function(){this.setVisible(false)},select:function(a){this.selected=a=a===Wa?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;Pa(this,a?"select":"unselect")},drawTracker:function(){var a=this,b=a.options,c=[].concat(a.graphPath),d=c.length,e=a.chart,f=e.options.tooltip.snap,g=a.tracker,h=b.cursor;
h=h&&{cursor:h};var i=a.singlePoints,j;if(d)for(j=d+1;j--;){c[j]===Za&&c.splice(j+1,0,c[j+1]-f,c[j+2],Ka);if(j&&c[j]===Za||j===d)c.splice(j,0,Ka,c[j-2]+f,c[j-1])}for(j=0;j<i.length;j++){d=i[j];c.push(Za,d.plotX-f,d.plotY,Ka,d.plotX+f,d.plotY)}if(g)g.attr({d:c});else a.tracker=e.renderer.path(c).attr({isTracker:true,stroke:ce,fill:jb,"stroke-width":b.lineWidth+2*f,visibility:a.visible?Ab:ob,zIndex:b.zIndex||1}).on(Kb?"touchstart":"mouseover",function(){e.hoverSeries!==a&&a.onMouseOver()}).on("mouseout",
function(){b.stickyTracking||a.onMouseOut()}).css(h).add(e.trackerGroup)}};ma=yb(sb);wb.line=ma;ma=yb(sb,{type:"area"});wb.area=ma;ma=yb(sb,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],g=a[c+1],h,i,j,m;if(c&&c<a.length-1){a=f.plotY;j=g.plotX;g=g.plotY;var v;h=(1.5*d+f.plotX)/2.5;i=(1.5*e+a)/2.5;j=(1.5*d+j)/2.5;m=(1.5*e+g)/2.5;v=(m-i)*(j-d)/(j-h)+e-m;i+=v;m+=v;if(i>a&&i>e){i=Ia(a,e);m=2*e-i}else if(i<a&&i<e){i=tb(a,e);m=2*e-i}if(m>g&&m>e){m=Ia(g,e);i=2*e-m}else if(m<
g&&m<e){m=tb(g,e);i=2*e-m}b.rightContX=j;b.rightContY=m}if(c){b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,h||d,i||e,d,e];f.rightContX=f.rightContY=null}else b=[Za,d,e];return b}});wb.spline=ma;ma=yb(ma,{type:"areaspline"});wb.areaspline=ma;var hd=yb(sb,{type:"column",pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",r:"borderRadius"},init:function(){sb.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasColumn=true;b.hasRendered&&u(b.series,function(c){if(c.type===
a.type)c.isDirty=true})},translate:function(){var a=this,b=a.chart,c=a.options,d=c.stacking,e=c.borderWidth,f=0,g=a.xAxis.reversed,h=a.xAxis.categories,i={},j,m;sb.prototype.translate.apply(a);u(b.series,function(C){if(C.type===a.type&&C.visible){if(C.options.stacking){j=C.stackKey;if(i[j]===Wa)i[j]=f++;m=i[j]}else m=f++;C.columnIndex=m}});var v=a.data,P=a.closestPoints;h=bb(v[1]?v[P].plotX-v[P-1].plotX:b.plotSizeX/(h&&h.length||1));P=h*c.groupPadding;var T=(h-2*P)/f,Y=c.pointWidth,H=K(Y)?(T-Y)/2:
T*c.pointPadding,U=Ia(A(Y,T-2*H),1),z=H+(P+((g?f-a.columnIndex:a.columnIndex)||0)*T-h/2)*(g?-1:1),M=a.yAxis.getThreshold(c.threshold||0),y=A(c.minPointLength,5);u(v,function(C){var Z=C.plotY,Sa=C.yBottom||M,Na=C.plotX+z,Ea=md(tb(Z,Sa)),gb=md(Ia(Z,Sa)-Ea),Lb=a.yAxis.stacks[(C.y<0?"-":"")+a.stackKey],Rb;d&&a.visible&&Lb&&Lb[C.x]&&Lb[C.x].setOffset(z,U);if(bb(gb)<y){if(y){gb=y;Ea=bb(Ea-M)>y?Sa-y:M-(Z<=M?y:0)}Rb=Ea-3}sa(C,{barX:Na,barY:Ea,barW:U,barH:gb});C.shapeType="rect";Z=sa(b.renderer.Element.prototype.crisp.apply({},
[e,Na,Ea,U,gb]),{r:c.borderRadius});if(e%2){Z.y-=1;Z.height+=1}C.shapeArgs=Z;C.trackerArgs=K(Rb)&&Ca(C.shapeArgs,{height:Ia(6,gb+3),y:Rb})})},getSymbol:function(){},drawGraph:function(){},drawPoints:function(){var a=this,b=a.options,c=a.chart.renderer,d,e;u(a.data,function(f){var g=f.plotY;if(g!==Wa&&!isNaN(g)&&f.y!==null){d=f.graphic;e=f.shapeArgs;if(d){Hc(d);d.animate(e)}else f.graphic=c[f.shapeType](e).attr(f.pointAttr[f.selected?"select":ib]).add(a.group).shadow(b.shadow)}})},drawTracker:function(){var a=
this,b=a.chart,c=b.renderer,d,e,f=+new Date,g=a.options,h=g.cursor,i=h&&{cursor:h},j;u(a.data,function(m){e=m.tracker;d=m.trackerArgs||m.shapeArgs;delete d.strokeWidth;if(m.y!==null)if(e)e.attr(d);else m.tracker=c[m.shapeType](d).attr({isTracker:f,fill:ce,visibility:a.visible?Ab:ob,zIndex:g.zIndex||1}).on(Kb?"touchstart":"mouseover",function(v){j=v.relatedTarget||v.fromElement;b.hoverSeries!==a&&Ga(j,"isTracker")!==f&&a.onMouseOver();m.onMouseOver()}).on("mouseout",function(v){if(!g.stickyTracking){j=
v.relatedTarget||v.toElement;Ga(j,"isTracker")!==f&&a.onMouseOut()}}).css(i).add(m.group||b.trackerGroup)})},animate:function(a){var b=this,c=b.data;if(!a){u(c,function(d){var e=d.graphic;d=d.shapeArgs;if(e){e.attr({height:0,y:b.yAxis.translate(0,0,1)});e.animate({height:d.height,y:d.y},b.options.animation)}});b.animate=null}},remove:function(){var a=this,b=a.chart;b.hasRendered&&u(b.series,function(c){if(c.type===a.type)c.isDirty=true});sb.prototype.remove.apply(a,arguments)}});wb.column=hd;ma=yb(hd,
{type:"bar",init:function(a){a.inverted=this.inverted=true;hd.prototype.init.apply(this,arguments)}});wb.bar=ma;ma=yb(sb,{type:"scatter",translate:function(){var a=this;sb.prototype.translate.apply(a);u(a.data,function(b){b.shapeType="circle";b.shapeArgs={x:b.plotX,y:b.plotY,r:a.chart.options.tooltip.snap}})},drawTracker:function(){var a=this,b=a.options.cursor,c=b&&{cursor:b},d;u(a.data,function(e){(d=e.graphic)&&d.attr({isTracker:true}).on("mouseover",function(){a.onMouseOver();e.onMouseOver()}).on("mouseout",
function(){a.options.stickyTracking||a.onMouseOut()}).css(c)})},cleanData:function(){}});wb.scatter=ma;ma=yb(Oc,{init:function(){Oc.prototype.init.apply(this,arguments);var a=this,b;sa(a,{visible:a.visible!==false,name:A(a.name,"Slice")});b=function(){a.slice()};Qa(a,"select",b);Qa(a,"unselect",b);return a},setVisible:function(a){var b=this.series.chart,c=this.tracker,d=this.dataLabel,e=this.connector,f=this.shadowGroup,g;g=(this.visible=a=a===Wa?!this.visible:a)?"show":"hide";this.group[g]();c&&
c[g]();d&&d[g]();e&&e[g]();f&&f[g]();this.legendItem&&b.legend.colorizeItem(this,a)},slice:function(a,b,c){var d=this.series.chart,e=this.slicedTranslation;oc(c,d);A(b,true);a=this.sliced=K(a)?a:!this.sliced;a={translateX:a?e[0]:d.plotLeft,translateY:a?e[1]:d.plotTop};this.group.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)}});ma=yb(sb,{type:"pie",isCartesian:false,pointClass:ma,pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},getColor:function(){this.initialColor=
this.chart.counters.color},animate:function(){var a=this;u(a.data,function(b){var c=b.graphic;b=b.shapeArgs;var d=-kc/2;if(c){c.attr({r:0,start:d,end:d});c.animate({r:b.r,start:b.start,end:b.end},a.options.animation)}});a.animate=null},translate:function(){var a=0,b=-0.25,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f=c.center.concat([c.size,c.innerSize||0]),g=this.chart,h=g.plotWidth,i=g.plotHeight,j,m,v,P=this.data,T=2*kc,Y,H=tb(h,i),U,z,M,y=c.dataLabels.distance;f=tc(f,function(C,Z){return(U=
/%$/.test(C))?[h,i,H,H][Z]*ja(C)/100:C});this.getX=function(C,Z){v=Fa.asin((C-f[1])/(f[2]/2+y));return f[0]+(Z?-1:1)*rb(v)*(f[2]/2+y)};this.center=f;u(P,function(C){a+=C.y});u(P,function(C){Y=a?C.y/a:0;j=W(b*T*1E3)/1E3;b+=Y;m=W(b*T*1E3)/1E3;C.shapeType="arc";C.shapeArgs={x:f[0],y:f[1],r:f[2]/2,innerR:f[3]/2,start:j,end:m};v=(m+j)/2;C.slicedTranslation=tc([rb(v)*d+g.plotLeft,Cb(v)*d+g.plotTop],W);z=rb(v)*f[2]/2;M=Cb(v)*f[2]/2;C.tooltipPos=[f[0]+z*0.7,f[1]+M*0.7];C.labelPos=[f[0]+z+rb(v)*y,f[1]+M+Cb(v)*
y,f[0]+z+rb(v)*e,f[1]+M+Cb(v)*e,f[0]+z,f[1]+M,y<0?"center":v<T/4?"left":"right",v];C.percentage=Y*100;C.total=a});this.setTooltipPoints()},render:function(){this.drawPoints();this.options.enableMouseTracking!==false&&this.drawTracker();this.drawDataLabels();this.options.animation&&this.animate&&this.animate();this.isDirty=false},drawPoints:function(){var a=this.chart,b=a.renderer,c,d,e,f=this.options.shadow,g,h;u(this.data,function(i){d=i.graphic;h=i.shapeArgs;e=i.group;g=i.shadowGroup;if(f&&!g)g=
i.shadowGroup=b.g("shadow").attr({zIndex:4}).add();if(!e)e=i.group=b.g("point").attr({zIndex:5}).add();c=i.sliced?i.slicedTranslation:[a.plotLeft,a.plotTop];e.translate(c[0],c[1]);g&&g.translate(c[0],c[1]);if(d)d.animate(h);else i.graphic=b.arc(h).attr(sa(i.pointAttr[ib],{"stroke-linejoin":"round"})).add(i.group).shadow(f,g);i.visible===false&&i.setVisible(false)})},drawDataLabels:function(){var a=this.data,b,c=this.chart,d=this.options.dataLabels,e=A(d.connectorPadding,10),f=A(d.connectorWidth,1),
g,h,i=A(d.softConnector,true),j=d.distance,m=this.center,v=m[2]/2;m=m[1];var P=j>0,T=[[],[]],Y,H,U,z,M=2,y;if(d.enabled){sb.prototype.drawDataLabels.apply(this);u(a,function(gb){if(gb.dataLabel)T[gb.labelPos[7]<kc/2?0:1].push(gb)});T[1].reverse();z=function(gb,Lb){return Lb.y-gb.y};for(a=T[0][0]&&T[0][0].dataLabel&&ja(T[0][0].dataLabel.styles.lineHeight);M--;){var C=[],Z=[],Sa=T[M],Na=Sa.length,Ea;for(y=m-v-j;y<=m+v+j;y+=a)C.push(y);U=C.length;if(Na>U){h=[].concat(Sa);h.sort(z);for(y=Na;y--;)h[y].rank=
y;for(y=Na;y--;)Sa[y].rank>=U&&Sa.splice(y,1);Na=Sa.length}for(y=0;y<Na;y++){b=Sa[y];h=b.labelPos;b=9999;for(H=0;H<U;H++){g=bb(C[H]-h[1]);if(g<b){b=g;Ea=H}}if(Ea<y&&C[y]!==null)Ea=y;else{if(U<Na-y+Ea&&C[y]!==null)Ea=U-Na+y;for(;C[Ea]===null;)Ea++}Z.push({i:Ea,y:C[Ea]});C[Ea]=null}Z.sort(z);for(y=0;y<Na;y++){b=Sa[y];h=b.labelPos;g=b.dataLabel;H=Z.pop();Y=h[1];U=b.visible===false?ob:Ab;Ea=H.i;H=H.y;if(Y>H&&C[Ea+1]!==null||Y<H&&C[Ea-1]!==null)H=Y;Y=this.getX(Ea===0||Ea===C.length-1?Y:H,M);g.attr({visibility:U,
align:h[6]})[g.moved?"animate":"attr"]({x:Y+d.x+({left:e,right:-e}[h[6]]||0),y:H+d.y});g.moved=true;if(P&&f){g=b.connector;h=i?[Za,Y+(h[6]==="left"?5:-5),H,"C",Y,H,2*h[2]-h[4],2*h[3]-h[5],h[2],h[3],Ka,h[4],h[5]]:[Za,Y+(h[6]==="left"?5:-5),H,Ka,h[2],h[3],Ka,h[4],h[5]];if(g){g.animate({d:h});g.attr("visibility",U)}else b.connector=g=this.chart.renderer.path(h).attr({"stroke-width":f,stroke:d.connectorColor||b.color||"#606060",visibility:U,zIndex:3}).translate(c.plotLeft,c.plotTop).add()}}}}},drawTracker:hd.prototype.drawTracker,
getSymbol:function(){}});wb.pie=ma;db.Highcharts={Chart:Nd,dateFormat:Zc,pathAnim:Nc,getOptions:function(){return Xa},hasRtlBug:me,numberFormat:Ed,Point:Oc,Color:bc,Renderer:fd,seriesTypes:wb,setOptions:function(a){Xa=Ca(Xa,a);Id();return Xa},Series:sb,addEvent:Qa,removeEvent:pb,createElement:hb,discardElement:pc,css:Ja,each:u,extend:sa,map:tc,merge:Ca,pick:A,extendClass:yb,product:"Highcharts",version:"2.1.9"}})();
;
var ActivityGraph = {
    chart: null,
    videoMinutes: {
        type: "column",
        name: "Video Minutes",
        color: "#0080C9",
        data: [],
        defaultPoint: {
            y: 0
        }
    },
    exerciseMinutes: {
        type: "column",
        name: "Skill Minutes",
        color: "#00C9AF",
        data: [],
        defaultPoint: {
            y: 0
        }
    },
    energyPoints: {
        type: "spline",
        name: "Energy Points",
        yAxis: 1,
        marker: {enabled: false},
        color: "#C9001B",
        data: [],
        defaultPoint: {
            fEnergyPoints: true
        }
    },
    badges: {
        type: "scatter",
        name: "Badges",
        showInLegend: false,
        data: [],
        defaultPoint: {
            y: 0,
            enabled: false
        }
    },
    proficientExercises: {
        type: "scatter",
        name: "Proficient Skills",
        showInLegend: false,
        data: [],
        defaultPoint: {
            y: 0,
            enabled: false
        }
    },
    options: {
        title: "",
        credits: {
            enabled: false
        },
        chart: {
            renderTo: "highchart",
            events: {
                click: function(e) {
                    if (ActivityGraph.bucketData.enableDrillDown) {
                        if (e && e.xAxis && e.xAxis[0]) {
                            ActivityGraph.drillIntoBucket_(Math.round(e.xAxis[0].value || 0));
                        }
                    }
                }
            }
        },
        plotOptions: {
            column: {
                stacking: "normal"
            },
            scatter: {
                marker: {
                    states: {
                        hover: {
                            fillColor: "transparent",
                            lineColor: "transparent"
                        }
                    }
                }
            }
        },
        yAxis: [
            {
                title: {
                    text: "Time Spent (Minutes)",
                    style: {
                        color: "#0080C9"
                    }
                },
                labels: {
                    style: {
                        color: "#0080C9"
                    }
                },
                min: 0,
                maxPadding: 0.15,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: "#808080"
                }]
            },
            {
                title: {
                    text: "Energy Points Earned",
                    style: {
                        color: "#C9001B"
                    }
                },
                labels: {
                    style: {
                        color: "#C9001B"
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: "#808080"
                }],
                min: 0,
                opposite: true
            }
        ],
        legend: {
            layout: "vertical",
            align: "left",
            verticalAlign: "top",
            floating: true,
            backgroundColor: "white",
            shadow: true,
            x: 70,
            y: 5,
            itemHoverStyle: {
                cursor: "default",
                color: "#3E576F"
            }
        }
    },
    /**
     * Generate extra Highcharts fields for bars
     * Used for exercise and video minutes
     */
    generateBar_: function(info, tag) {
        if (this.bucketData.isGraphEmpty) {
            var y = Math.floor(Math.random() * 20);
            return {y: y};
        }

        if (!info) {
            return {};
        }
        return {
            y: info["minutes"],
            desc: "<strong>" + tag + "</strong> (" + info["timeSpent"] + ")<br/>" +
                info["htmlSummary"]
        };
    },

    /**
     * Generate extra Highcharts fields for splines
     * Used for energy points
     */
    generateSpline_: function(info) {
        if (this.bucketData.isGraphEmpty) {
            var lastIndex = this.videoMinutes.data.length - 1,
                minutes = this.videoMinutes.data[lastIndex].y + this.exerciseMinutes.data[lastIndex].y,
                y = minutes * 1000;
            return {y: y};
        }

        if (!info) {
            return {y: 0};
        }

        return {y: info};
    },

    /**
     * Generate extra Highcharts fields for scatter plots
     * Used for badges and proficiencies
     */
    generateScatter_: function(info, tag) {
        if (this.bucketData.isGraphEmpty) {
            if (Math.random() > 0.3) {
                return {};
            }

            var lastIndex = this.videoMinutes.data.length - 1,
                y = this.videoMinutes.data[lastIndex].y + this.exerciseMinutes.data[lastIndex].y,
                symbol = (tag === "Achievements" ?
                        "url(/images/badges/meteorite-small-chart.png)" :
                        "url(/images/node-complete-chart.png)"
                        );
            return {
                y: y,
                marker: {
                    symbol: symbol
                }
            };
        }

        if (!info) {
            return {};
        }
        var symbol = "url(/images/node-complete-chart.png)";

        if (tag === "Achievements") {
            symbol = "url(" + info["badgeUrl"] + ")";
        }

        return {
                y: info["y"],
                desc: "<strong>" + tag + "</strong><br/>" + info["htmlSummary"],
                marker: {
                    symbol: symbol
                },
                enabled: true
            };
    },

    generateAllMarks_: function(index, bucket) {
        var x = {x: index},
            extra = {};

        extra = this.generateBar_(this.bucketData.dictTopicBuckets[bucket], "Videos");
        this.videoMinutes.data.push(_.extend({}, this.videoMinutes.defaultPoint, x, extra));

        extra = this.generateBar_(this.bucketData.dictExerciseBuckets[bucket], "Skills");
        this.exerciseMinutes.data.push(_.extend({}, this.exerciseMinutes.defaultPoint, x, extra));

        extra = this.generateSpline_(this.bucketData.dictPointsBuckets[bucket]);
        this.energyPoints.data.push(_.extend({}, this.energyPoints.defaultPoint, x, extra));

        extra = this.generateScatter_(this.bucketData.dictBadgeBuckets[bucket], "Achievements");
        this.badges.data.push(_.extend({}, this.badges.defaultPoint, x, extra));

        extra = this.generateScatter_(this.bucketData.dictProficiencyBuckets[bucket], "Proficiencies");
        this.proficientExercises.data.push(_.extend({}, this.proficientExercises.defaultPoint, x, extra));
    },

    generateSeries_: function() {
        this.videoMinutes.data = [];
        this.exerciseMinutes.data = [];
        this.energyPoints.data = [];
        this.badges.data = [];
        this.proficientExercises.data = [];

        $.each(this.bucketData.bucketList, _.bind(this.generateAllMarks_, this));

        return [
                this.videoMinutes,
                this.exerciseMinutes,
                this.energyPoints,
                this.badges,
                this.proficientExercises
        ];
    },

    generateOptions_: function() {
        this.options.xAxis = {
            categories: this.bucketData.bucketList,
            labels: {
                align: "left",
                x: -5,
                y: 10,
                rotation: 45
            },
            min: 0
        };
        this.options.tooltip = {
            shared: true,
            crosshairs: true,
            formatter: function() {
                var sTitle = "<b>" + this.x + "</b>";
                s = "";
                for (var ix = 0; ix < this.points.length; ix++)
                {
                    if (this.points[ix].point.desc)
                    {
                        s += "<br/><br/>" + this.points[ix].point.desc;
                    }
                    else if (this.points[ix].point.fEnergyPoints)
                    {
                        sTitle += "<br/>" + this.points[ix].point.y + " energy points";
                    }
                }
                return sTitle + s;
            },
            enabled: !this.bucketData.isGraphEmpty
        };

        if (this.bucketData.graphTitle) {
            this.options.subtitle = {
                text: this.bucketData.graphTitle,
                x: -10
            };
        }

        if (this.bucketData.enableDrillDown) {
            this.options.plotOptions.series = {
                cursor: "pointer",
                events: {
                    legendItemClick: function() { return false; },
                    click: function(e) {
                        if (e && e.point) {
                            ActivityGraph.drillIntoBucket_(e.point.x);
                        }
                    }
                }
            };
        }
        this.options.series = this.generateSeries_();
    },

    drillIntoBucket_: function(ix) {
        if (ix == null) {
            return;
        }
        var bucket = this.chart.options.xAxis.categories[ix];
        if (bucket) {
            // TODO(benkomalo): should this use username if possible?
            Profile.loadGraph("/profile/graph/activity?email=" +
                    this.bucketData.studentEmail + "&dt_start=" + bucket);
        }
    },

    timePeriodTable_: {
        "today": {
            bucket: "hour",
            num: 24
        },
        "yesterday": {
            bucket: "hour",
            num: 24
        },
        "last-week": {
            bucket: "day",
            num: 7
        },
        "last-month": {
            bucket: "day",
            num: 30
        }
    },

    toTimeString_: function(date) {
        var hour = date.getHours(),
            minute = date.getMinutes(),
            ampm = "AM",
            hourStr = "",
            minuteStr = "";

        if (hour === 0) {
            hour = 12;
        } else if (hour > 12) {
            hour -= 12;
            ampm = "PM";
        }
        hourStr += hour;

        if (minute < 10) {
            minuteStr = "0";
        }
        minuteStr += minute;
        return hourStr + ":" + minuteStr + " " + ampm;
    },

    toDateString_: function(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    },

    generateFakeBuckets_: function(timePeriod) {
        var bucketData = {
                bucketList: [],
                dictBadgeBuckets: {},
                dictExerciseBuckets: {},
                dictTopicBuckets: {},
                dictPointsBuckets: {},
                dictProficiencyBuckets: {},
                enableDrillDown: false,
                isGraphEmpty: true
        }, bucketParams = this.timePeriodTable_[timePeriod],
        num = bucketParams.num,
        bucket = bucketParams.bucket,
        today = bucket === "hour" ? new Date().setHours(0, 0) : new Date();

        bucketData.bucketList = _.map(_.range(num), _.bind(function(index) {
            if (bucket === "hour") {
                var date = new Date(today);
                date.setHours(index);
                var str = this.toTimeString_(date);
                return str;
            } else {
                var date = new Date(today);
                date.setDate(today.getDate() - num + index + 1);
                var str = this.toDateString_(date);

                return str;
            }
        }, this));

        return bucketData;
    },

    render: function(bucketDataFromServer, timePeriodToFake) {
        if (bucketDataFromServer) {
            this.bucketData = bucketDataFromServer;
        } else {
            this.bucketData = this.generateFakeBuckets_(timePeriodToFake);
            if (!$("#highchart-container").length) {
                $("#graph-content").empty();
                var jelHighchartContainer = $('<div id="highchart-container" class="empty-chart"></div>'),
                    jelHighchart = $('<div id="highchart"></div>');

                $("#graph-content").append(jelHighchartContainer.append(jelHighchart));
            }
        }

        this.generateOptions_();
        this.chart = new Highcharts.Chart(this.options);

        if (bucketDataFromServer && bucketDataFromServer.isGraphEmpty) {
            Profile.showNotification("empty-graph");
        }
    }
};
;
var FocusGraph = {
    star: $.browser.msie ? "*" : "★",

    generateSeries_: function() {
        var series = [];

        if (this.segmentData.totalExerciseSeconds) {
            // Exercise legend in the upper left
            var exerciseLegend = {
                type: "pie",
                name: "Skills",
                cursor: "",
                size: "20%",
                innerSize: "13%",
                center: ["11%", "14%"],
                dataLabels: {
                    connectorColor: "silver",
                    connectorWidth: 2,
                    color: "#898989"
                },
                data: [
                        {
                            name: "Skills",
                            fLegend: true,
                            y: 100,
                            color: "silver"
                        }
                ]
            };

            series.push(exerciseLegend);

            // Exercise graph in the center
            var exerciseFocus = {
                type: "pie",
                name: "Skill Focus",
                innerSize: "55%",
                size: "85%"
            };
            if (!this.segmentData.isGraphEmpty) {
                exerciseFocus.point = {
                    events: {
                        click: function() {
                            Profile.router.navigate(
                                    "/vital-statistics/problems/" + this.exid,
                                    true);
                        }
                    }
                };
            }
            exerciseFocus.data = _.map(this.segmentData.dictExerciseSeconds, function(segment, key) {
                var proficientText = segment["proficient"] ? (", <b>" + this.star + "Proficient</b>") : "",
                    tooltip = "<b>" + segment["exerciseTitle"] + "</b> (skill" + proficientText + ")";

                return {
                    name: "<b>" + segment["exerciseTitle"] + (segment["proficient"] ? " " + this.star : "") + "</b>",
                    exid: segment["exid"],
                    y: segment["percentage"],
                    tooltip_title: tooltip,
                    time_spent: segment["timeSpent"],
                    tooltip_more: segment["sProblems"] + "<br/>" + segment["sCorrectProblems"] + "<br/>"
                };
            }, this);

            series.push(exerciseFocus);
        }

        if (this.segmentData.totalTopicSeconds) {
            // Video legend in the upper left
            var videoLegend = {
                type: "pie",
                name: "Videos",
                cursor: "",
                size: "9.4%",
                innerSize: "3%",
                center: ["11%", "14%"],
                dataLabels: {
                    connectorColor: "silver",
                    connectorWidth: 2,
                    color: "#898989"
                },
                data: [
                        {
                            name: "",
                            fLegend: true,
                            y: 25,
                            visible: false,
                            color: "silver"
                        },
                        {
                            name: "Videos",
                            fLegend: true,
                            y: 75,
                            color: "silver"
                        }
                ]
            };

            series.push(videoLegend);

            // Video graph in the center
            var videoFocus = {
                type: "pie",
                cursor: "",
                name: "Video Focus",
                innerSize: "55%",
                size: "85%"
            };

            if (this.segmentData.totalExerciseSeconds) {
                // Fit the video graph inside the exercise graph
                _.extend(videoFocus, {
                    size: "40%",
                    innerSize: "10%",
                    dataLabels: {enabled: false}
                });
            }

            videoFocus.data = _.map(this.segmentData.dictTopicSeconds, function(segment, key) {
                return {
                    name: segment["playlistTitle"],
                    y: segment["percentage"],
                    tooltip_title: "<b>" + segment["playlistTitle"] + "</b> (videos)",
                    time_spent: segment["timeSpent"],
                    tooltip_more: segment["tooltipMore"]
                };
            });

            series.push(videoFocus);
        }

        return series;
    },

    options: {
        title: "",
        credits: {
            enabled: false
        },
        chart: {
            renderTo: "highchart"
        },
        plotOptions: {
            pie: {
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    color: "black",
                    connectorColor: "black"
                }
            }
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                if (this.point.fLegend) {
                    return false;
                }
                return this.point.tooltip_title + "<br/> - " + this.point.time_spent + " total<br><br>" + this.point.tooltip_more;
            }
        }
    },

    generateFakeSegments_: function() {
        var segmentData = {
            dictExerciseSeconds: {
                "unused1": {
                    exerciseTitle: "Addition 1",
                    proficient: true,
                    percentage: 3
                },
                "unused2": {
                    exerciseTitle: "Addition 2",
                    proficient: true,
                    percentage: 4
                },
                "unused3": {
                    exerciseTitle: "Multiplication 1",
                    proficient: true,
                    percentage: 10
                },
                "unused4": {
                    exerciseTitle: "Equation of a line",
                    proficient: true,
                    percentage: 10
                },
                "unused5": {
                    exerciseTitle: "Equation of a circle",
                    proficient: false,
                    percentage: 33
                },
                "unused6": {
                    exerciseTitle: "Derivative intuition",
                    proficient: true,
                    percentage: 20
                },
                "unused7": {
                    exerciseTitle: "Unit circle intuition",
                    proficient: false,
                    percentage: 10
                }
            },
            dictTopicSeconds: {
                "unused1": {
                    percentage: 32
                },
                "unused2": {
                    percentage: 10
                },
                "unused3": {
                    percentage: 46
                },
                "unused4": {
                    percentage: 12
                }
            },
            isGraphEmpty: true,
            totalExerciseSeconds: 100,
            totalTopicSeconds: 100
        };

        return segmentData;
    },

    render: function(segmentDataFromServer) {
        if (segmentDataFromServer && !segmentDataFromServer.isGraphEmpty) {
            this.segmentData = segmentDataFromServer;
        } else {
            this.segmentData = this.generateFakeSegments_();
            if (!$("#highchart-container").length) {
                $("#graph-content").empty();
                var jelHighchartContainer = $('<div id="highchart-container" class="empty-chart"></div>'),
                    jelHighchart = $('<div id="highchart"></div>');

                $("#graph-content").append(jelHighchartContainer.append(jelHighchart));
            }
        }

        this.options.series = this.generateSeries_();
        this.chart = new Highcharts.Chart(this.options);

        if (segmentDataFromServer && segmentDataFromServer.isGraphEmpty) {
            Profile.showNotification("empty-graph");
        }
    }
};
;
var ExerciseGraphOverTime = {
    options: {
        title: "",
        credits: {
            enabled: false
        },
        chart: {
            renderTo: "highchart",
            defaultSeriesType: "scatter"
        },
        plotOptions: {
            scatter: {
                cursor: "pointer",
                dashStyle: "Solid",
                lineWidth: 1
            },
            series: {
                showInLegend: false,
                marker: {
                    radius: 6
                },
                point: {
                    events: {
                        click: function() {
                            Profile.router.navigate(
                                    "/vital-statistics/problems/" + this.name,
                                    true);
                        }
                    }
                }
            }
        },
        xAxis: {
            title: {
                text: "Days working on the site"
            },
            min: 0,
            plotLines: [{
                value: 0,
                width: 1,
                color: "#808080"
            }]
        },
        yAxis: {
            title: {
                text: "Skills Completed"
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: "#808080"
            }]
        },
        tooltip: {
            formatter: function() {
                    return "<b>" + this.point.display_name + "</b><br/>" + this.point.dt;
            }
        },
        legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "top",
            x: -10,
            y: 100,
            borderWidth: 0
        }
    },

    generateSeries_: function(userExercises) {
        if (!userExercises || (userExercises.length === 0)) {
            userExercises = [];
            for (var day = 1; day < 10; day++) {
                var numExercises = Math.floor(Math.random() * 5);
                for (var i = 0; i < numExercises; i++) {
                    userExercises.push({
                        daysUntilProficient: day
                    });
                }
            }
        }
        return [{
                data: _.map(userExercises, function(userExercise, index) {
                        return {
                            dt: userExercise["proficientDate"],
                            name: userExercise["name"],
                            display_name: userExercise["displayName"],
                            x: userExercise["daysUntilProficient"],
                            y: index + 1
                        };
                    })
            }];
    },

    render: function(userExercisesFromServer) {
        if (!userExercisesFromServer) {
            if (!$("#highchart-container").length) {
                $("#graph-content").empty();
                var jelHighchartContainer = $('<div id="highchart-container" class="empty-chart"></div>'),
                    jelHighchart = $('<div id="highchart"></div>');

                $("#graph-content").append(jelHighchartContainer.append(jelHighchart));
            }
        }

        this.options.series = this.generateSeries_(userExercisesFromServer);
        this.chart = new Highcharts.Chart(this.options);

        if (userExercisesFromServer && userExercisesFromServer.length === 0) {
            Profile.showNotification("empty-graph");
        }
    }
};
;
Handlebars.registerHelper("encodeURIComponent", function(str) {
    return encodeURIComponent(str);
});

Handlebars.registerHelper("commafy", function(numPoints) {
    // From KhanUtil.commafy in math-format.js
    return numPoints.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
});

/**
 * Convert number of seconds to a time phrase for recent activity video entries.
 * Stolen from templatefilters.py
 */
Handlebars.registerHelper("secondsToTime", function(seconds) {
    // TODO: bring out KhanUtil's plural function
    // or somehow clean up the > 1 ? "s" : "" mess
    var years = Math.floor(seconds / (86400 * 365));
    seconds -= years * (86400 * 365);

    var days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    var months = Math.floor(days / 30.5);
    var weeks = Math.floor(days / 7);

    var hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    if (years) {
        return years + " year" + (years > 1 ? "s" : "");
    } else if (months) {
        return months + " month" + (months > 1 ? "s" : "");
    } else if (weeks) {
        return weeks + " week" + (weeks > 1 ? "s" : "");
    } else if (days) {
        var result = days + " day" + (days > 1 ? "s" : "");
        if (hours) {
            result += " " + hours + " hour" + (hours > 1 ? "s" : "");
        }
        return result;
    } else if (hours) {
        var result = hours + " hour" + (hours > 1 ? "s" : "");
        if (minutes) {
            result += minutes + " minute" + (minutes > 1 ? "s" : "");
        }
    } else if (!minutes && seconds) {
        return seconds + " second" + (seconds > 1 ? "s" : "");
    } else {
        return minutes + " minute" + (minutes > 1 ? "s" : "");
    }
});
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_avatar-picker"]=a(function(a,b,c,d,e){function k(a,b){var d="",e;d+="\n\n    ",e=a.categories,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(2,l,b)});if(e||e===0)d+=e;return d+='\n\n    <div class="category-title"><em>Coming Soon</em></div>\n    <div class="category-section">\n        <div class="category-avatars">\n            <div class="avatar locked">\n                <img src="/images/avatars/questionmark.png" class="avatar-preview">\n                <div class="name">???</div>\n            </div>\n        </div>\n        <div class="clear"></div>\n    </div>\n\n    ',d}function l(a,b){var d="",e;d+="\n    ",e=a.avatars,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(3,m,b)});if(e||e===0)d+=e;return d+="\n    ",d}function m(a,b){var d="",e,f;d+='\n    <div class="category-title">',f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===i?e():e),d+=j(e)+'</div>\n    <div class="category-section">\n        <div class="category-avatars">\n        ',e=a.avatars,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(4,n,b)});if(e||e===0)d+=e;return d+='\n        </div>\n        <div class="clear"></div>\n    </div>\n    ',d}function n(a,b){var d="",e,f;d+='\n            <div class="avatar',e=a.isAvailable,e=c.unless.call(a,e,{hash:{},inverse:h.noop,fn:h.program(5,o,b)});if(e||e===0)d+=e;return d+='" data="',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===i?e():e),d+=j(e)+'">\n                <img src="',f=c.imageSrc,f?e=f.call(a,{hash:{}}):(e=a.imageSrc,e=typeof e===i?e():e),d+=j(e)+'" class="avatar-preview">\n                <div class="name">',f=c.displayName,f?e=f.call(a,{hash:{}}):(e=a.displayName,e=typeof e===i?e():e),d+=j(e)+"</div>\n            </div>\n        ",d}function o(a,b){return" locked"}function p(a,b){return"\n    Loading...\n    "}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression;f+='<div class="modal-header">\n    <a href="#" class="close-button close">x</a><h3>Choose Your Avatar</h3>\n</div>\n<div class="modal-body avatar-picker-contents">\n\n    ',g=b.categories,g=c["if"].call(b,g,{hash:{},inverse:h.program(7,p,e),fn:h.program(1,k,e)});if(g||g===0)f+=g;return f+='\n\n</div>\n<div class="modal-footer"></div>\n',f})})();
/**
 * A component to display a list of avatars and select one for
 * the current user.
 *
 * Avatars are pre-defined from a list that a user has access to.
 * The mechanics of which avatars are accessable are externalized
 * and not specific to this implementation.
 */

/** Namespace. */
var Avatar = Avatar || {};


/**
 * The main UI component which displays a modal dialog to select
 * a list of avatars for an image.
 * @constructor
 */
Avatar.Picker = function(userModel) {
    /**
     * The container element of the dialog.
     */
    this.el = null;

    /**
     * The root element of the dialog contents.
     */
    this.contentEl = null;

    /**
     * The underlying model for the user profile that gets modified
     * when an avatar is selected.
     */
    this.userModel = userModel;

    /**
     * The list of avatars bucketed by category. This corresponds
     * directly to the JSON returned by the server (see fetchData_)
     */
    this.avatarData_ = [];
};

Avatar.Picker.template = Templates.get("profile.avatar-picker");

/**
 * Renders the contents of the picker and displays it.
 */
Avatar.Picker.prototype.getTemplateContext_ = function() {
    // Dummy data for now. Replace with the real thing.
    return {
        selectedSrc: this.userModel.get("avatarSrc"),
        categories: this.avatarData_
    };
};

/**
 * Binds event handlers necessary to make this interactive.
 */
Avatar.Picker.prototype.bindEvents_ = function() {
    $(this.el).delegate(
            ".category-avatars .avatar",
            "click",
            _.bind(this.onAvatarSelected_, this))
        .delegate(
            ".category-avatars .avatar",
            "mouseenter",
            function(ev) { $(ev.currentTarget).not(".locked").addClass("hover"); })
        .delegate(
            ".category-avatars .avatar",
            "mouseleave",
            function(ev) { $(ev.currentTarget).removeClass("hover"); });

    this.userModel.bind("change:avatarSrc",
            _.bind(this.onAvatarChanged_, this));
};

/**
 * Handles a selection to an avatar in the list.
 */
Avatar.Picker.prototype.onAvatarSelected_ = function(ev) {
    if ($(ev.currentTarget).hasClass("locked")) {
        return;
    }

    var src = $(ev.currentTarget).find("img.avatar-preview").attr("src");
    var name = $(ev.currentTarget).attr("data");
    if (src && name) {
        this.userModel.set({
            "avatarName": name,
            "avatarSrc": src
        });
    }
};

/**
 * Handles a change to the selected avatar.
 */
Avatar.Picker.prototype.onAvatarChanged_ = function() {
    var newSrc = this.userModel.get("avatarSrc");
    $(this.contentEl)
            .find(".avatar")
                .removeClass("selected")
            .end()
            .find("img.avatar-preview[src='" + newSrc + "']")
                .parent(".avatar").addClass("selected");
};

/**
 * Fetches the list of avatars from the server.
 */
Avatar.Picker.prototype.fetchData_ = function() {
    $.ajax({
        method: "GET",
        url: "/api/v1/avatars",
        data: { casing: "camel" },
        success: _.bind(this.onDataLoaded_, this),
        error: function() {
            // TODO: handle
        }
    });
};

/**
 * Handles a successful response from the server for the list of avatars.
 */
Avatar.Picker.prototype.onDataLoaded_ = function(data) {
    this.avatarData_ = data;

    // Note that this will just render hidden if the dialog is
    // not visible. That's OK.
    $(this.contentEl).html(
            Avatar.Picker.template(this.getTemplateContext_()));

    // Sync UI to initial state.
    this.onAvatarChanged_();

};

/**
 * Renders the contents of the picker and displays it.
 */
Avatar.Picker.prototype.show = function() {
    if (!this.el) {
        var rootJel = $("<div class='avatar-picker modal fade hide'></div>");
        var contentJel = rootJel;
        this.el = rootJel.get(0);
        this.contentEl = contentJel.get(0);
        this.bindEvents_();
        this.fetchData_();
    }

    $(this.contentEl).html(
            Avatar.Picker.template(this.getTemplateContext_()));

    // Sync UI to initial state.
    this.onAvatarChanged_();

    $(this.el).modal({
        keyboard: true,
        backdrop: true,
        show: true
    }).on("hidden", _.bind(this.onHide_, this));
};

/**
 * Handles a hiding of the picker, and saves the data.
 */
Avatar.Picker.prototype.onHide_ = function() {
    this.userModel.save();
};

;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_username-picker"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+='<div class="modal-header">\n    <a href="#" class="close-button close">x</a><h3>Edit basic info</h3>\n</div>\n<div class="modal-body">\n    <div class="notification info" style="display: none;">\n        In order to make your profile public, we need you to pick a username.\n    </div>\n    <div class="notification error" style="display: none;">\n        If you change your username, you cannot get your old one back for 120 days.\n    </div>\n    <div class="username-picker">\n        <div class="row nickname-row">\n            <div class="labels">\n                <label for="nickname">Real Name:</label>\n            </div>\n            <div class="inputs">\n                <input type="text" value="',h=c.nickname,h?g=h.call(b,{hash:{}}):(g=b.nickname,g=typeof g===i?g():g),f+=j(g)+'" class="nickname" id="nickname"><span class="sidenote"></span>\n                <p class="input-description">\n                    This is how your name will appear around Khan Academy, and how your friends and coaches will recognize you.\n                </p>\n            </div>\n        </div>\n        <div class="row username-row">\n            <div class="labels">\n                <label for="username">Username:</label>\n            </div>\n            <div class="inputs">\n                <input type="text" value="',h=c.username,h?g=h.call(b,{hash:{}}):(g=b.username,g=typeof g===i?g():g),f+=j(g)+'" class="username" id="username"><span class="sidenote"></span>\n                <p class="input-description">\n                    Your username will appear in your Khan Academy address.\n                </p>\n                <p class="input-description">\n                    http://www.khanacademy.org/profile/<span class="example-username">',h=c.username,h?g=h.call(b,{hash:{}}):(g=b.username,g=typeof g===i?g():g),f+=j(g)+'</span>\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="modal-footer" style="text-align: right;">\n    <input id="cancel-profile-info" type="button" class="simple-button action-gradient" value="Cancel">\n    <input id="save-profile-info" type="button" class="simple-button action-gradient green" value="Save">\n</div>',f})})();
/**
 * Code to handle the profile info changer.
 */
UsernamePickerView = Backbone.View.extend({
    id: "username-picker-container",
    setPublicAfterSave_: false,
    savePending_: false,

    /**
     * Whether or not the nickname is acceptable/valid to try and save.
     */
    nicknameFieldAcceptable_: true,

    /**
     * Whether or not the username field is acceptable. Note that an empty
     * username, while invalid, is acceptable in the field if the user
     * had not selected one prior to opening this view.
     */
    usernameFieldAcceptable_: true,

    events: {
        "keypress .nickname": "onNicknameKeypress_",
        "keypress .username": "onUsernameKeypress_",
        "click :input": "onInputClick_",
        "click #save-profile-info": "onSaveClick_",
        "click #cancel-profile-info": "onCancelClicked_"
    },

    delegateEvents: function(events) {
        $(this.el)
                .on(Keys.textChangeEvents,
                    ".nickname",
                    Keys.wrapTextChangeHandler(this.onNicknameInput_, this))
                .on(Keys.textChangeEvents,
                    ".username",
                    Keys.wrapTextChangeHandler(this.onUsernameInput_, this));
        UsernamePickerView.__super__.delegateEvents.call(this, events);
    },

    onInputClick_: function(e) {
        // Force focus on the input after a click. This is to work around
        // the fact that in IE, the input can sometimes not get focus,
        // even though the user is properly typing in it. Since only
        // events with focus fire keyup events, we would otherwise miss them.
        $(e.target).focus();
    },

    initialize: function() {
        this.template = Templates.get("profile.username-picker");
        this.shouldShowUsernameWarning_ = false;
        this.model.bind("validate:nickname", this.onValidateNickname_, this);
        this.model.bind("validate:username", this.onValidateUsername_, this);
        this.model.bind("savesuccess", this.onSaveSuccess_, this);
        this.model.bind("error", this.onSaveRejected_, this);
    },

    render: function() {
        // TODO: Make idempotent
        // maybe making the resetFields_ function obsolete
        var context = {
                username: this.model.get("username"),
                nickname: this.model.get("nickname")
            },
            html = this.template(context);

        $(this.el).html(html)
            .addClass("modal fade hide")
            .modal({
                keyboard: true,
                backdrop: true
            })
            .bind("hidden", _.bind(this.resetFields_, this))
            .bind("shown", _.bind(this.onPickerShown_, this));
        return this;
    },

    onCancelClicked_: function() {
        this.toggle();
    },

    toggle: function(setPublic) {
        $(this.el).modal("toggle");
        this.setPublicAfterSave_ = setPublic;
        if (setPublic) {
            $(".notification.info").show();
            $("#save-profile-info").val("Save and make profile public");
        }
    },

    resetFields_: function() {
        var nickname = this.model.get("nickname"),
            username = this.model.get("username");

        this.nicknameFieldAcceptable_ = true;
        this.usernameFieldAcceptable_ = true;
        this.$(".notification").hide();
        this.$(".nickname").val(nickname);
        this.$(".username").val(username);
        this.$(".example-username").text(username);
        this.$(".sidenote").text("").removeClass("success").removeClass("error");
        this.$("#save-profile-info").prop("disabled", false).val("Save");
    },

    onPickerShown_: function() {
        // If the user already has a username, be sure that we warn them about
        // the holding period that happens if they change it.
        Promos.hasUserSeen("Username change warning", function(hasSeen) {
            this.shouldShowUsernameWarning_ = !hasSeen;
        }, this);
    },

    onNicknameInput_: function(e) {
        this.model.validateNickname(this.getFormValue_(".nickname"));
    },

    onNicknameKeypress_: function(e) {
        if (e.keyCode === $.ui.keyCode.ENTER) {
            // Treat enter as "tab" to the next field.
            this.$(".username").focus();
        }
    },

    onUsernameKeypress_: function(e) {
        if (e.keyCode === $.ui.keyCode.ENTER) {
            if (!this.$("#save-profile-info").prop("disabled")) {
                this.$("#save-profile-info").click();
            }
            this.model.validateUsername(this.getFormValue_(".username"));
        }
    },

    onUsernameInput_: function(e) {
        this.$("#save-profile-info").prop("disabled", true);
        if (this.shouldShowUsernameWarning_ && this.model.get("username")) {
            $(".notification.error").show();
            Promos.markAsSeen("Username change warning");
            this.shouldShowUsernameWarning_ = false;
        }
        this.$(".example-username").text(this.getFormValue_(".username"));

        this.showSidenote_(".username-row", "Checking...");
        this.debouncedValidateUsername_();
    },

    debouncedValidateUsername_: _.debounce(function() {
        this.model.validateUsername(this.getFormValue_(".username"));
    }, 1000),

    syncSaveButtonState_: function() {
        this.$("#save-profile-info").prop(
                "disabled",
                !this.usernameFieldAcceptable_ || !this.nicknameFieldAcceptable_);
    },

    onValidateNickname_: function(isValid) {
        if (isValid) {
            this.showSidenote_(".nickname-row", "");
        } else {
            this.showSidenote_(".nickname-row", "Can't leave empty.", false);
        }

        this.usernameFieldAcceptable_ = isValid;
        this.syncSaveButtonState_();
    },

    onValidateUsername_: function(message, isValid) {
        this.showSidenote_(".username-row", message, isValid);

        // Accept the username if it's unchanged or if it's changed to
        // a valid value. Note that users may start with no username, which
        // is itself an "invalid" value (empty), but it's acceptable here
        // since we don't require they select a new username.
        this.usernameFieldAcceptable_ =
                this.getFormValue_(".username") === this.model.get("username") ||
                isValid;
        this.syncSaveButtonState_();
    },

    getFormValue_: function(selector) {
        return $.trim(this.$(selector).val());
    },

    /**
     * Show the message in the specified row's sidenote.
     * If isValid === true, show a green checkmark (success),
     * if isValid === false, show a red x (error),
     * otherwise, don't show any such indicator.
     */
    showSidenote_: function(rowSelector, message, isValid) {
        var jelSidenote = this.$(rowSelector).find(".sidenote"),
            message = message || "";

        // Note that isValid may be undefined, in which case neither class
        // is enabled.
        jelSidenote.toggleClass("success", isValid === true);
        jelSidenote.toggleClass("error", isValid === false);
        jelSidenote.text(message);
    },

    onSaveClick_: function() {
        var nickname = this.getFormValue_(".nickname"),
            username = this.getFormValue_(".username"),
            attrs = {
                nickname: nickname,
                username: username
            };

        if (this.setPublicAfterSave_) {
            attrs.isPublic = true;
        }

        var usernameChange = username != this.model.get("username");
        this.model.save(attrs);

        $("#save-profile-info").prop("disabled", true);
        if (usernameChange) {
            // Keep the modal open and wait for a save success, since this
            // is an important, ocean-boiling operation.
            $("#save-profile-info").val("Saving...");
            this.savePending_ = true;
        } else {
            this.toggle();
        }
    },

    onSaveSuccess_: function() {
        if (this.savePending_) {
            $(this.el).modal("hide");
            this.savePending_ = false;
        }
    },
    onSaveRejected_: function() {
        // No difference in behavior right now.
        this.onSaveSuccess_();
    }
});
;
UserCardView = Backbone.View.extend({
    className: "user-card",

    events: {
        "click .add-remove-coach": "onAddRemoveCoachClicked_"
     },

     editEvents: {
         "click .avatar-pic-container": "onAvatarClick_",
         "mouseenter .avatar-pic-container": "onAvatarHover_",
         "mouseleave .avatar-pic-container": "onAvatarLeave_",
         "click .edit-basic-info": "onEditBasicInfoClicked_",
         "click .edit-display-case": "onEditDisplayCaseClicked_",
         "click .edit-avatar": "onAvatarClick_",
         "click .edit-visibility": "onEditVisibilityClicked_"
     },

    initialize: function() {
        this.template = Templates.get("profile.user-card");

        this.model.bind("change:avatarSrc", _.bind(this.onAvatarChanged_, this));
        this.model.bind("change:isCoachingLoggedInUser",
                _.bind(this.onIsCoachingLoggedInUserChanged_, this));
        this.model.bind("change:nickname", function(model) {
                $(".nickname").text(model.get("nickname"));
        });
        this.model.bind("change:isPublic", this.onIsPublicChanged_);

        /**
         * The picker UI component which shows a dialog to change the avatar.
         * @type {Avatar.Picker}
         */
        this.avatarPicker_ = null;
        this.usernamePicker_ = null;
    },

    /**
     * Updates the source preview of the avatar. This does not affect the model.
     */
    onAvatarChanged_: function() {
        this.$("#avatar-pic").attr("src", this.model.get("avatarSrc"));
    },

    render: function() {
        var json = this.model.toJSON();
        // TODO: this data isn't specific to any profile and is more about the library.
        // It should probably be moved out eventially.
        json["countExercises"] = UserCardView.countExercises;
        json["countVideos"] = UserCardView.countVideos;
        $(this.el).html(this.template(json)).find("abbr.timeago").timeago();

        this.delegateEditEvents_();

        return this;
    },

    onDropdownOpen_: function() {
        this.$(".dropdown-toggle").addClass("toggled");
    },

    onDropdownClose_: function() {
        this.$(".dropdown-toggle").removeClass("toggled");
    },

    delegateEditEvents_: function() {
        if (this.model.isEditable()) {
            this.bindQtip_();
            this.delegateEvents(this.editEvents);
            this.$(".dropdown-toggle").dropdown()
                .bind("open", _.bind(this.onDropdownOpen_, this))
                .bind("close", _.bind(this.onDropdownClose_, this));
        }
    },

    bindQtip_: function() {
        this.$(".edit-visibility").qtip({
            content: {
                text: "Making your profile public will make the information in this user card visible to anyone who visits your profile page. It will also allow your user card to show up when your friends search for you.",
                title: {
                    text: "Profile Privacy Setting"
                }
            },
            style: {
                classes: "ui-tooltip-light ui-tooltip-shadow",
                width: "250px"
            },
            position: {
                my: "top right",
                at: "bottom center"
            },
            show: {
                delay: 500
            },
            hide: {
                fixed: true,
                delay: 150
            }
        });
    },

    onAvatarHover_: function(e) {
        this.$(".avatar-change-overlay").show();
    },

    onAvatarLeave_: function(e) {
        this.$(".avatar-change-overlay").hide();
    },

    onAvatarClick_: function(e) {
        if (!this.avatarPicker_) {
            this.avatarPicker_ = new Avatar.Picker(this.model);
        }
        this.avatarPicker_.show();
    },

    onAddRemoveCoachClicked_: function(e) {
        var options = {
            success: _.bind(this.onAddRemoveCoachSuccess_, this),
            error: _.bind(this.onAddRemoveCoachError_, this)
        };

        this.model.toggleIsCoachingLoggedInUser(options);
    },

    onAddRemoveCoachSuccess_: function(data) {
        // TODO: message to user
    },

    onAddRemoveCoachError_: function(data) {
        // TODO: message to user

        // Because the add/remove action failed,
        // toggle back to original client-side state.
        this.model.toggleIsCoachingLoggedInUser();
    },

    /**
     * Toggles the display of the add/remove coach buttons.
     * Note that only one is showing at any time.
     */
    onIsCoachingLoggedInUserChanged_: function() {
        this.$(".add-remove-coach").toggle();
    },

    onEditBasicInfoClicked_: function(evt, setPublic) {
        if (!this.usernamePicker_) {
            this.usernamePicker_ = new UsernamePickerView({model: this.model});
            $("body").append(this.usernamePicker_.render().el);
        }
        this.usernamePicker_.toggle(setPublic);
    },

    onEditDisplayCaseClicked_: function(e) {
        // TODO: Consider handling outside-the-widget dismissal clicks differently
        e.stopPropagation();
        $(".display-case-cover").click();
    },

    onEditVisibilityClicked_: function(e) {
        if (!this.model.get("username")) {
            // Profiles can't be made public until the user acquires a
            // username first. Pop up the dialog to do that.
            this.onEditBasicInfoClicked_(null, true);
            return;
        }
        var isPublic = this.model.get("isPublic");
        this.model.save({ isPublic: !isPublic });
    },

    onIsPublicChanged_: function(model, isPublic) {
        var jel = $(".visibility-toggler");
        if (isPublic) {
            jel.removeClass("private")
                .addClass("public")
                .text("Profile is public");
        } else {
            jel.removeClass("public")
                .addClass("private")
                .text("Profile is private");
        }
        jel.effect("bounce");
    }

});

// TODO: these should probably go into some other place about the library.
/**
 * The total number of videos in the Khan Academy library.
 */
UserCardView.countVideos = 0;

/**
 * The total number of exercises in the Khan Academy library.
 */
UserCardView.countExercises = 0;
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_user-card"]=a(function(a,b,c,d,e){function m(a,b){return" editable"}function n(a,b){var d="",e,f;return d+='\n             <a href="',f=c.toLoginRedirectHref,e=f?f.call(a,"/profile",{hash:{}}):i.call(a,"toLoginRedirectHref","/profile",{hash:{}}),d+=j(e)+'" class="simple-button action-gradient green">Log in to claim your profile</a>\n          ',d}function o(a,b){var d="",e,f;return d+='\n          <div>\n              <span class="nickname">',f=c.nickname,f?e=f.call(a,{hash:{}}):(e=a.nickname,e=typeof e===k?e():e),d+=j(e)+"</span>\n          </div>\n          ",d}function p(a,b){var d="",e;d+='\n            <span class="dropdown">\n              <span class="dropdown-toggle simple-button">\n                Edit profile\n                <span class="caret"></span>\n              </span>\n              <ul class="dropdown-menu vertical-shadow-strong">\n                  ',e=a.isFullyEditable,e=c["if"].call(a,e,{hash:{},inverse:l.noop,fn:l.program(8,q,b)});if(e||e===0)d+=e;d+='\n                  <li><a class="edit-display-case" href="javascript:void(0)">Edit display case</a></li>\n                  <li><a class="edit-avatar" href="javascript:void(0)">Edit avatar</a></li>\n                  ',e=a.isFullyEditable,e=c["if"].call(a,e,{hash:{},inverse:l.noop,fn:l.program(10,r,b)});if(e||e===0)d+=e;return d+="\n              </ul>\n            </span>\n          ",d}function q(a,b){return'\n                  <li><a class="edit-basic-info" href="javascript:void(0)">Edit basic info</a></li>\n                  '}function r(a,b){return'\n                  <li><a class="edit-visibility" href="javascript:void(0)">Toggle privacy setting</a></li>\n                  '}function s(a,b){var d="",e;d+="\n            <!--\n              ",e=a.isSelf,e=c.unless.call(a,e,{hash:{},inverse:l.noop,fn:l.program(13,t,b)});if(e||e===0)d+=e;d+='\n              <a href="javascript:void(0)" class="add-remove-coach simple-button action-gradient" style="',e=a.isCoachingLoggedInUser,e=c.unless.call(a,e,{hash:{},inverse:l.noop,fn:l.program(16,v,b)});if(e||e===0)d+=e;return d+='">Remove as a coach</a>\n              -->\n          ',d}function t(a,b){var d="",e;d+='<a href="javascript:void(0)" class="add-remove-coach simple-button action-gradient" style="',e=a.isCoachingLoggedInUser,e=c["if"].call(a,e,{hash:{},inverse:l.noop,fn:l.program(14,u,b)});if(e||e===0)d+=e;return d+='">Add as a coach</a>',d}function u(a,b){return" display: none;"}function v(a,b){return" display: none;"}function w(a,b){var d="",e;d+='\n<a href="javascript:void(0)"\n    class="edit-visibility visibility-toggler ',e=a.isPublic,e=c["if"].call(a,e,{hash:{},inverse:l.program(21,y,b),fn:l.program(19,x,b)});if(e||e===0)d+=e;d+='">Profile is ',e=a.isPublic,e=c["if"].call(a,e,{hash:{},inverse:l.program(25,A,b),fn:l.program(23,z,b)});if(e||e===0)d+=e;return d+='</a>\n<div id="username-picker-container" class="modal fade hide" style="display: none;">\n</div>\n',d}function x(a,b){return"public"}function y(a,b){return"private"}function z(a,b){return"public"}function A(a,b){return"private"}c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression,k="function",l=this;f+='<div class="user-info vertical-shadow clearfix">\n    <div class="basic-user-info" style="float: left;">\n      <div class="avatar-pic-container',g=b.isEditable,g=c["if"].call(b,g,{hash:{},inverse:l.noop,fn:l.program(1,m,e)});if(g||g===0)f+=g;f+='" style="float:left;" >\n        <img src="',h=c.avatarSrc,h?g=h.call(b,{hash:{}}):(g=b.avatarSrc,g=typeof g===k?g():g),f+=j(g)+'" id="avatar-pic" class="avatar-pic" >\n        <div class="avatar-change-overlay" style="display: none">Change avatar</div>\n      </div>\n      <div class="user-deets">\n          ',g=b.isPhantom,g=c["if"].call(b,g,{hash:{},inverse:l.program(5,o,e),fn:l.program(3,n,e)});if(g||g===0)f+=g;f+='\n          <div>\n              <span>Joined <abbr class="timeago" title="',h=c.dateJoined,h?g=h.call(b,{hash:{}}):(g=b.dateJoined,g=typeof g===k?g():g),f+=j(g)+'">',h=c.dateJoined,h?g=h.call(b,{hash:{}}):(g=b.dateJoined,g=typeof g===k?g():g),f+=j(g)+'</abbr></span>\n          </div>\n          <div class="basic-stats clearfix">\n              <div class="simple-stat">\n                  <img class="summary-icon star" src="/images/profile-icons/inset-star.png">\n                  <div class="stat-text">',h=c.countExercisesProficient,h?g=h.call(b,{hash:{}}):(g=b.countExercisesProficient,g=typeof g===k?g():g),f+=j(g)+'<span class="stat-divider">/</span>',h=c.countExercises,h?g=h.call(b,{hash:{}}):(g=b.countExercises,g=typeof g===k?g():g),f+=j(g)+'</div>\n              </div>\n              <div class="simple-stat">\n                  <img class="summary-icon" src="/images/profile-icons/inset-camera.png">\n                  <div class="stat-text">',h=c.countVideosCompleted,h?g=h.call(b,{hash:{}}):(g=b.countVideosCompleted,g=typeof g===k?g():g),f+=j(g)+'<span class="stat-divider">/</span>',h=c.countVideos,h?g=h.call(b,{hash:{}}):(g=b.countVideos,g=typeof g===k?g():g),f+=j(g)+'</div>\n              </div>\n              <div class="simple-stat"><span title="',g=b.points,h=c.commafy,g=h?h.call(b,g,{hash:{}}):i.call(b,"commafy",g,{hash:{}}),f+=j(g)+' energy points" class="energy-points-badge" style="float:none; display:block; margin-bottom: 1px; margin-top: 2px; padding:0; line-height: 20px;">',g=b.points,h=c.commafy,g=h?h.call(b,g,{hash:{}}):i.call(b,"commafy",g,{hash:{}}),f+=j(g)+'</span> Energy Points</div>\n          </div>\n          <div class="user-profile-controls clearfix">\n          ',g=b.isEditable,g=c["if"].call(b,g,{hash:{},inverse:l.program(12,s,e),fn:l.program(7,p,e)});if(g||g===0)f+=g;f+='\n          </div>\n      </div>\n    </div>\n    <div class="sticker-book">\n    </div>\n\n</div>\n',g=b.isFullyEditable,g=c["if"].call(b,g,{hash:{},inverse:l.noop,fn:l.program(18,w,e)});if(g||g===0)f+=g;return f+="\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_profile"]=a(function(a,b,c,d,e){function m(a,b){var c;return c=a.profileData,c=c==null||c===!1?c:c.nickname,c=typeof c===i?c():c,j(c)}function n(a,b){return"Profile"}function o(a,b){var d="",e,f;return d+='\n                <li><a href="',f=c.profileRoot,f?e=f.call(a,{hash:{}}):(e=a.profileRoot,e=typeof e===i?e():e),d+=j(e)+'coaches" class="tab-link has-icon no-recolor" rel="community coaches">Coaches</a></li>\n                ',d}function p(a,b){var d="",e,f;return d+="\n            <div class=\"empty-graph\">\n                <h2><a href='/#browse'>Watch a video</a> or <a href='/exercisedashboard'>try a skill</a>!</h2>\n                <p>Once you do, real data will show up here.</p>\n            </div>\n            <div class=\"error-graph\">\n                <h2>It's our fault.</h2>\n                <p>Try again later, and please <a href='/reportissue?type=Defect'>let us know</a> if it continues.</p>\n            </div>\n            <div class=\"no-coaches-for-phantoms\">\n                <h2><a href=\"",f=c.toLoginRedirectHref,e=f?f.call(a,"/profile",{hash:{}}):k.call(a,"toLoginRedirectHref","/profile",{hash:{}}),d+=j(e)+'">Log in</a> to add a coach!</h2>\n            </div>\n            <div class="no-discussion">\n                <h2><a href=\'/#browse\'>Watch a video</a> and join the discussion!</h2>\n                <p>Once you do, your questions will show up here.</p>\n            </div>\n        ',d}function q(a,b){return'\n            <div class="public">\n                <h2>Oops, you\'re not allowed!</h2>\n                <p>To view real data, you must be a coach.</p>\n            </div>\n        '}function r(a,b){return'\n            <div class="activity-column">\n                <div id="activity-loading-placeholder">\n                    <h2>Loading activity...</h2>\n                    <div id="recent-activity-progress-bar"></div>\n                </div>\n                <div id="activity-contents" style="display:none">\n                    <div id="suggested-activity">\n                        <h2>Suggested Activity</h2>\n                    </div>\n                    <div id="recent-activity">\n                        <h2>Recently Completed Activity</h2>\n                    </div>\n                </div>\n            </div>\n            <div class="mini-stats-column">\n            </div>\n            '}function s(a,b){return' class="empty-chart"'}c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=c.helperMissing,l=this;f+='<style>\n  #page_sub_nav {\n    display: none;\n  }\n</style>\n\n<!-- If you drastically change the below nav, try to update the screenshots in coach.html. -->\n<menu class="profile-navigation">\n    <ul class="vertical-tab-list">\n        <li class="profile-tab"><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'" class="tab-link no-recolor active-tab" rel="profile">\n            <img src="',g=b.profileData,g=g==null||g===!1?g:g.avatarSrc,g=typeof g===i?g():g,f+=j(g)+'" class="profile-tab-avatar">\n            <span id="profile-tab-link" class="profile-tab-text">',g=b.profileData,g=g==null||g===!1?g:g.nickname,g=c["if"].call(b,g,{hash:{},inverse:l.program(3,n,e),fn:l.program(1,m,e)});if(g||g===0)f+=g;f+='</span>\n        </a></li>\n        <li>\n            <span class="inactive link-section-header">Accomplishments</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'achievements" class="tab-link has-icon no-recolor" rel="achievements">Achievements</a></li>\n                <li><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'goals" class="tab-link has-icon no-recolor" rel="goals">Goals (beta)</a></li>\n            </ul>\n        </li>\n        <li>\n            <span class="inactive link-section-header">Vital statistics</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'vital-statistics/activity" class="tab-link has-icon no-recolor" rel="vital-statistics activity">Activity</a></li>\n                <li><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'vital-statistics/focus" class="tab-link has-icon no-recolor" rel="vital-statistics focus">Focus</a></li>\n                <li><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'vital-statistics/skill-progress" class="tab-link has-icon no-recolor" rel="vital-statistics skill-progress">Skill Progress</a></li>\n                <li><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'vital-statistics/skill-progress-over-time" class="tab-link has-icon no-recolor" rel="vital-statistics skill-progress-over-time">Progress Over Time</a></li>\n            </ul>\n        </li>\n        <li>\n            <span class="inactive link-section-header">Community</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'discussion" class="tab-link has-icon no-recolor" rel="community discussion">Discussion</a></li>\n                ',g=b.profileData,g=g==null||g===!1?g:g.isSelf,g=c["if"].call(b,g,{hash:{},inverse:l.noop,fn:l.program(5,o,e)});if(g||g===0)f+=g;f+='\n            </ul>\n        </li>\n    </ul>\n</menu>\n\n<section class="tab-content">\n    <h2 class="profile-sheet-title"></h2>\n    <div class="profile-notification">\n        ',g=b.profileData,g=g==null||g===!1?g:g.isFullyAccessible,g=c["if"].call(b,g,{hash:{},inverse:l.program(9,q,e),fn:l.program(7,p,e)});if(g||g===0)f+=g;f+='\n    </div>\n    <div class="clearfix">\n        <div id="tab-content-user-profile" rel="profile">\n            <div class="user-info-container"></div>\n            <div style="clear: both; margin-bottom: 20px;"></div>\n            ',g=b.profileData,g=g==null||g===!1?g:g.isFullyAccessible,g=c["if"].call(b,g,{hash:{},inverse:l.noop,fn:l.program(11,r,e)});if(g||g===0)f+=g;f+='\n        </div>\n\n        <div id="tab-content-vital-statistics" rel="vital-statistics">\n            ',g=b,g=l.invokePartial(d["profile_vital-statistics"],"profile_vital-statistics",g,c,d);if(g||g===0)f+=g;f+='\n        </div>\n\n        <div id="tab-content-achievements" rel="achievements"',g=b.profileData,g=g==null||g===!1?g:g.email,g=c.unless.call(b,g,{hash:{},inverse:l.noop,fn:l.program(13,s,e)});if(g||g===0)f+=g;return f+='>\n        </div>\n\n        <div id="tab-content-goals" rel="goals">\n            <div class="graph-picker">\n                Shows your current, completed and abandoned goals.\n                <ul class="tabrow">\n                    <li class="type current">\n                        <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'goals/current" class="graph-link no-recolor">Current</a>\n                    </li>\n                    <li class="type completed">\n                        <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'goals/completed" class="graph-link no-recolor">Completed</a>\n                    </li>\n                    <li class="type abandoned">\n                        <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'goals/abandoned" class="graph-link no-recolor">Abandoned</a>\n                    </li>\n                    <li>\n                        <a class="new-goal simple-button action-gradient disabled" href="javascript:void(0);">Create a new goal</a>\n                    </li>\n                </ul>\n            </div>\n            <div id="profile-goals-content"></div>\n        </div>\n        <div id="tab-content-coaches" rel="coaches">\n        </div>\n        <div id="tab-content-discussion" rel="discussion" style="width: 60%">\n            <div class="graph-picker">\n                Shows the questions that you\'ve asked.\n            </div>\n        </div>\n        <div id="tab-content-settings" rel="settings">\n        </div>\n    </div>\n</section>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_suggested-activity"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;d+='\n        <li class="activity-exercise clearfix">\n            <div class="ach-text">\n                <span class="activity-image"></span>\n                <a class="covering-link"  href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'">\n                    <span></span>\n                </a>\n                <a class="ellipsis foreground-link" title="',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===h?e():e),d+=i(e)+'" href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'">\n                    ',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===h?e():e),d+=i(e)+'\n                </a>\n                <div class="skill-bar-container">',e=a.progress,f=c["skill-bar"],e=f?f.call(a,e,{hash:{}}):j.call(a,"skill-bar",e,{hash:{}});if(e||e===0)d+=e;return d+='</div>\n                <div class="suggested-activity-controls">\n                    <a class="foreground-link" href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'">\n                        <span class="simple-button action-gradient">Rock out</span>\n                    </a>\n                </div>\n            </div>\n        </li>\n    ',d}function m(a,b){var d="",e,f;d+='\n        <li class="activity-video clearfix">\n            <div class="ach-text">\n                <span class="activity-image"></span>\n                <a class="covering-link" href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'">\n                    <span></span>\n                </a>\n                <a class="ellipsis foreground-link" title="',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===h?e():e),d+=i(e)+'" href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'">\n                    ',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===h?e():e),d+=i(e)+'\n                </a>\n                <div class="skill-bar-container">',e=a.progress,f=c["skill-bar"],e=f?f.call(a,e,{hash:{}}):j.call(a,"skill-bar",e,{hash:{}});if(e||e===0)d+=e;return d+='</div>\n                <div class="suggested-activity-controls">\n                    <a class="foreground-link" href="',f=c.url,f?e=f.call(a,{hash:{}}):(e=a.url,e=typeof e===h?e():e),d+=i(e)+'">\n                        <span class="simple-button action-gradient">Watch on</span>\n                    </a>\n                 </div>\n            </div>\n        </li>\n    ',d}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=c.helperMissing,k=this;f+='<!-- TODO(marcia): Clean up to involve less copy paste action, also ach-text\'s is more of a container and not achievement text.-->\n<div class="activity-list">\n    <ul>\n    ',g=b.exercises,g=c.each.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+="\n\n    ",g=b.videos,g=c.each.call(b,g,{hash:{},inverse:k.noop,fn:k.program(3,m,e)});if(g||g===0)f+=g;return f+="\n    </ul>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_recent-activity-list"]=a(function(a,b,c,d,e){function j(a,b){var d="",e;d+='\n    <div class="activity-list">\n        <ul>\n            ',e=c.each.call(a,a,{hash:{},inverse:h.noop,fn:h.program(2,k,b)});if(e||e===0)d+=e;return d+="\n        </ul>\n    </div>\n",d}function k(a,b){var d="",e,f;d+="\n            ",f=c.renderActivity,e=f?f.call(a,a,{hash:{},inverse:h.noop,fn:h.program(3,l,b)}):i.call(a,"renderActivity",a,{hash:{},inverse:h.noop,fn:h.program(3,l,b)});if(e||e===0)d+=e;return d+="\n            ",d}function l(a,b){var c="";return c}function m(a,b){return'\n    Recent <a href="/#browse">video</a>, <a href="/exercisedashboard">exercise</a>, and <a href="#achievements">badge</a> activity will show up here.\n'}c=c||a.helpers;var f="",g,h=this,i=c.helperMissing;g=c["if"].call(b,b,{hash:{},inverse:h.program(5,m,e),fn:h.program(1,j,e)});if(g||g===0)f+=g;return f+="\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_recent-activity-exercise"]=a(function(a,b,c,d,e){function m(a,b){return" proficient"}function n(a,b){var d="",e,f;return d+='<a href="',f=c.profileRoot,f?e=f.call(a,{hash:{}}):(e=a.profileRoot,e=typeof e===i?e():e),d+=j(e)+"vital-statistics/problems/",f=c.exercise,f?e=f.call(a,{hash:{}}):(e=a.exercise,e=typeof e===i?e():e),d+=j(e)+'">',d}function o(a,b){return"</a>"}function p(a,b){return" to achieve proficiency"}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.helperMissing;f+='<li class="activity-exercise clearfix',g=b.earnedProficiency,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,m,e)});if(g||g===0)f+=g;f+='">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Answered <span class="problem-count">',g=b.mobileView,g=c.unless.call(b,g,{hash:{},inverse:k.noop,fn:k.program(3,n,e)});if(g||g===0)f+=g;g=b.cProblems,h=c.pluralize,g=h?h.call(b,g,"problem",{hash:{}}):l.call(b,"pluralize",g,"problem",{hash:{}}),f+=j(g),g=b.mobileView,g=c.unless.call(b,g,{hash:{},inverse:k.noop,fn:k.program(5,o,e)});if(g||g===0)f+=g;f+="</span>",g=b.earnedProficiency,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(7,p,e)});if(g||g===0)f+=g;return f+=" in ",h=c.exerciseDisplayName,h?g=h.call(b,{hash:{}}):(g=b.exerciseDisplayName,g=typeof g===i?g():g),f+=j(g)+'\n            </div>\n        </div>\n        <div class="activity-controls">\n            <span class="time timeago" title="',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===i?g():g),f+=j(g)+'">',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===i?g():g),f+=j(g)+"</span>\n        </div>\n    </div>\n</li>\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_recent-activity-badge"]=a(function(a,b,c,d,e){function l(a,b){var d;return d=a.userBadge,d=d==null||d===!1?d:d.targetContextName,d=c["if"].call(a,d,{hash:{},inverse:k.noop,fn:k.program(2,m,b)}),d||d===0?d:""}function m(a,b){var c="",d;return c+="for ",d=a.userBadge,d=d==null||d===!1?d:d.targetContextName,d=typeof d===i?d():d,c+=j(d),c}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<li class="activity-badge clearfix">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Earned <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+'achievements" data-category="',g=b.badge,g=g==null||g===!1?g:g.badgeCategory,g=typeof g===i?g():g,f+=j(g)+'" class="badge-link category-',g=b.badge,g=g==null||g===!1?g:g.badgeCategory,g=typeof g===i?g():g,f+=j(g)+'">',g=b.badge,g=g==null||g===!1?g:g.description,g=typeof g===i?g():g,f+=j(g)+"</a> ",g=b.badge,g=g==null||g===!1?g:g.hideContext,g=c.unless.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;return f+='\n            </div>\n        </div>\n        <div class="activity-controls clearfix">\n            <span class="time timeago" title="',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===i?g():g),f+=j(g)+'">',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===i?g():g),f+=j(g)+"</span>\n        </div>\n    </div>\n\n</li>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_recent-activity-video"]=a(function(a,b,c,d,e){function m(a,b){return"completed"}c=c||a.helpers;var f="",g,h,i=this,j=c.helperMissing,k=this.escapeExpression,l="function";f+='<li class="activity-video clearfix ',g=b.isVideoCompleted,g=c["if"].call(b,g,{hash:{},inverse:i.noop,fn:i.program(1,m,e)});if(g||g===0)f+=g;return f+='">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Watched <span class="video-minutes">',g=b.secondsWatched,h=c.secondsToTime,g=h?h.call(b,g,{hash:{}}):j.call(b,"secondsToTime",g,{hash:{}}),f+=k(g)+'</span> of <a href="',h=c.relativeUrl,h?g=h.call(b,{hash:{}}):(g=b.relativeUrl,g=typeof g===l?g():g),f+=k(g)+'">',h=c.videoTitle,h?g=h.call(b,{hash:{}}):(g=b.videoTitle,g=typeof g===l?g():g),f+=k(g)+'</a>\n            </div>\n        </div>\n        <div class="activity-controls clearfix">\n	        <span class="time timeago" title="',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===l?g():g),f+=k(g)+'">',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===l?g():g),f+=k(g)+"</span>\n	    </div>\n    </div>\n</li>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_recent-activity-goal"]=a(function(a,b,c,d,e){function l(a,b){return" completed"}c=c||a.helpers;var f="",g,h,i=this,j="function",k=this.escapeExpression;f+='<li class="activity-goal clearfix',g=b.goal,g=g==null||g===!1?g:g.completedTime,g=c["if"].call(b,g,{hash:{},inverse:i.noop,fn:i.program(1,l,e)});if(g||g===0)f+=g;return f+='">\n    <div class="ach-text">\n        <div class="clearfix">\n            <span class="activity-image"></span>\n            <div class="description">\n                Completed the goal <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===j?g():g),f+=k(g)+'goals/completed">',g=b.goal,g=g==null||g===!1?g:g.title,g=typeof g===j?g():g,f+=k(g)+"</a> after working toward it for ",g=b.goal,g=g==null||g===!1?g:g.completedTime,g=typeof g===j?g():g,f+=k(g)+'\n            </div>\n        </div>\n        <div class="activity-controls clearfix">\n	        <span class="time timeago" title="',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===j?g():g),f+=k(g)+'">',h=c.dt,h?g=h.call(b,{hash:{}}):(g=b.dt,g=typeof g===j?g():g),f+=k(g)+"</span>\n	    </div>\n    </div>\n</li>\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_graph-date-picker"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+='<div class="graph-date-picker">\n    <ul class="tabrow">\n        <li class="today">\n            <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+"vital-statistics/",h=c.graph,h?g=h.call(b,{hash:{}}):(g=b.graph,g=typeof g===i?g():g),f+=j(g)+'/today" class="no-recolor graph-link">Today</a>\n        </li>\n        <li class="yesterday">\n            <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+"vital-statistics/",h=c.graph,h?g=h.call(b,{hash:{}}):(g=b.graph,g=typeof g===i?g():g),f+=j(g)+'/yesterday" class="no-recolor graph-link">Yesterday</a>\n        </li>\n        <li class="selected last-week">\n            <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+"vital-statistics/",h=c.graph,h?g=h.call(b,{hash:{}}):(g=b.graph,g=typeof g===i?g():g),f+=j(g)+'/last-week" class="no-recolor graph-link">Last 7 Days</a>\n        </li>\n        <li class="last-month">\n            <a href="',h=c.profileRoot,h?g=h.call(b,{hash:{}}):(g=b.profileRoot,g=typeof g===i?g():g),f+=j(g)+"vital-statistics/",h=c.graph,h?g=h.call(b,{hash:{}}):(g=b.graph,g=typeof g===i?g():g),f+=j(g)+'/last-month" class="no-recolor graph-link">Last 30 Days</a>\n        </li>\n    </ul>\n</div>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_vital-statistics"]=a(function(a,b,c,d,e){function k(a,b){var e="",f;e+="\n                            ",f=a,f=i.invokePartial(d["profile_graph-date-picker"],"profile_graph-date-picker",f,c,d);if(f||f===0)e+=f;return e+="\n                        ",e}function l(a,b){var e="",f;e+="\n                            ",f=a,f=i.invokePartial(d["profile_graph-date-picker"],"profile_graph-date-picker",f,c,d);if(f||f===0)e+=f;return e+="\n                        ",e}c=c||a.helpers,d=d||a.partials;var f="",g,h,i=this,j=c.helperMissing;f+='<div id="vital-statistics">\n    <div id="stats-charts" class="fancy-scrollbar -ce-capture">\n        <div id="graph-control-container">\n            <div id="graph-container">\n                <div class="vital-statistics-description">\n                    <div class="activity">\n                        Shows how much work you\'re doing each day.\n                        ',g={},g.graph="activity",h=c["graph-date-picker-wrapper"],g=h?h.call(b,{hash:g,inverse:i.noop,fn:i.program(1,k,e)}):j.call(b,"graph-date-picker-wrapper",{hash:g,inverse:i.noop,fn:i.program(1,k,e)});if(g||g===0)f+=g;f+='\n                    </div>\n                    <div class="focus">\n                        Shows how well you\'ve focused on skills and topic areas.\n                        ',g={},g.graph="focus",h=c["graph-date-picker-wrapper"],g=h?h.call(b,{hash:g,inverse:i.noop,fn:i.program(3,l,e)}):j.call(b,"graph-date-picker-wrapper",{hash:g,inverse:i.noop,fn:i.program(3,l,e)});if(g||g===0)f+=g;return f+='\n                    </div>\n                    <div class="skill-progress">\n                        Shows which skills you\'ve worked on and completed.\n                        <span class="graph-options">\n                            <span class="progress-legend exercise-color started">Started</span>\n                            <span class="progress-legend exercise-color proficient">Proficient</span>\n                            <span class="progress-legend exercise-color review light">Review</span>\n                            <span class="progress-legend exercise-color struggling">Struggling</span>\n                        </span>\n                    </div>\n                    <div class="skill-progress-over-time">\n                        Shows how many skills you\'ve completed over time.\n                    </div>\n                    <div class="problems">\n                        Click a bar to view more detailed problem information.\n                    </div>\n                </div>\n                <div id="graph-progress-bar"></div>\n                <div id="graph-content"></div>\n            </div>\n        </div>\n    </div>\n</div>\n',f})})();
var Coaches = {
    coachCollection: null,
    requestCollection: null,
    url: "/api/v1/user/coaches",

    init: function() {
        var isSelf = Profile.profile.get("isSelf"),
            isPhantom = Profile.profile.get("isPhantom"),
            deferred;

        if (isSelf && !isPhantom) {
            var template = Templates.get("profile.coaches");
            $("#tab-content-coaches").html(template(Profile.profile.toJSON()));

            this.delegateEvents_();

            deferred = $.ajax({
                type: "GET",
                url: this.url,
                data: {
                    casing: "camel"
                },
                dataType: "json",
                success: _.bind(this.onDataLoaded_, this)
            });
        } else {
            deferred = new $.Deferred().resolve();
        }

        return deferred;
    },

    onDataLoaded_: function(users) {
        this.coachCollection = new Coaches.CoachCollection(users);
        // See https://github.com/documentcloud/backbone/issues/814
        // for why markCoachesAsSaved cannot be called in inititialize
        this.coachCollection.markCoachesAsSaved();

        new Coaches.CoachCollectionView({
            collection: Coaches.coachCollection,
            el: "#coach-list-container"
        }).render();
    },

    delegateEvents_: function() {
        $("#tab-content-coaches").on("keyup", "#coach-email",
            _.bind(this.onCoachEmailKeyup_, this));
        $("#tab-content-coaches").on("click", "#add-coach",
            _.bind(this.onAddCoach_, this));
    },

    // TODO(marcia): Check out the utility in benkomalo2
    onCoachEmailKeyup_: function(e) {
        if (e.keyCode === $.ui.keyCode.ENTER) {
            this.onAddCoach_();
        }
    },

    onAddCoach_: function() {
        var email = $.trim($("#coach-email").val());
        if (email) {
            Coaches.disableInput();
            this.coachCollection.addByEmail(email);
        }
    },

    disableInput: function() {
        $("#add-coach").addClass("disabled")
            .prop("disabled", true);

        $("#coach-email").prop("disabled", true);

        $(".coach-throbber").show();
    },

    enableInput: function() {
        $("#add-coach").removeClass("disabled")
            .prop("disabled", false);

        $("#coach-email").prop("disabled", false)
            .focus();

        $(".coach-throbber").hide();
    }
};

Coaches.CoachView = Backbone.View.extend({
    className: "coach-row",
    collection_: null,
    template_: null,

    events: {
        "click .controls .remove": "onRemoveCoach_",
        "click .controls .accept": "onAcceptCoach_",
        "click .controls .deny": "onDenyCoach_",
        "mouseenter .controls .remove": "onMouseEnterRemove_",
        "mouseleave .controls .remove": "onMouseLeaveRemove_"
    },

    initialize: function(options) {
        this.model.bind("change", this.render, this);
        this.collection_ = options.collection;
        this.template_ = Templates.get("profile.coach");
    },

    render: function() {
        var context = this.model.toJSON();
        $(this.el).html(this.template_(context));

        // TODO(marcia): Figure out why I need to call this..
        this.delegateEvents();

        return this;
    },

    onRemoveCoach_: function() {
        this.collection_.remove(this.model);
    },

    onAcceptCoach_: function() {
        this.model.set({
            isCoachingLoggedInUser: true,
            isRequestingToCoachLoggedInUser: false
        });
    },

    onDenyCoach_: function() {
        this.collection_.remove(this.model);
    },

    onMouseEnterRemove_: function(evt) {
        this.$(".controls .remove").addClass("orange");
    },

    onMouseLeaveRemove_: function(evt) {
        this.$(".controls .remove").removeClass("orange");
    }

});

Coaches.Coach = ProfileModel.extend({
    /**
     * Override toJSON to delete the id attribute since it is only used for
     * client-side bookkeeping.
     */
    toJSON: function() {
        var json = Coaches.Coach.__super__.toJSON.call(this);
        delete json["id"];
        return json;
    }
});

Coaches.CoachCollection = Backbone.Collection.extend({
    model: Coaches.Coach,

    initialize: function() {
        this.bind("add", this.save, this);
        this.bind("remove", this.save, this);
        this.bind("change", this.save, this);
    },

    comparator: function(model) {
        // TODO(marcia): Once we upgrade to Backbone 0.9,
        // we could define this as a sort instead of a sortBy
        // http://documentcloud.github.com/backbone/#Collection-comparator
        var isCoaching = model.get("isCoachingLoggedInUser"),
            email = model.get("email").toLowerCase();

        // Show pending requests before coaches,
        // then order alphabetically
        return (isCoaching ? "b" : "a") + " " + email;
    },

    findByEmail: function(email) {
        return this.find(function(model) {
            return model.get("email") === email;
        });
    },

    addByEmail: function(email) {
        var attrs = {
                email: email,
                isCoachingLoggedInUser: true
            };

        var model = this.findByEmail(email);

        if (model) {
            if (model.get("isCoachingLoggedInUser")) {
                // Already a coach
                var message = email + " is already your coach.";
                this.trigger("showError", message);
            } else {
                // Åccept the pending coach request
                model.set({isCoachingLoggedInUser: true});
            }
        } else {
            // Add the coach to the collection
            this.add(attrs);
        }
    },

    save: function() {
        this.debouncedSave_();
    },

    debouncedSave_: _.debounce(function() {
        var options = {
            url: Coaches.url,
            contentType: "application/json",
            success: _.bind(this.onSaveSuccess_, this),
            error: _.bind(this.onSaveError_, this)
        };

        options["data"] = JSON.stringify(this.toJSON());

        Backbone.sync("update", null, options);
    }, 750),

    onSaveSuccess_: function() {
        this.markCoachesAsSaved();
        this.trigger("saveSuccess");
        Coaches.enableInput();
    },

    onSaveError_: function() {
        this.removeUnsavedCoaches_();
        this.trigger("saveError");
    },

    increasingId: 0,

    /**
     * Mark which coach models have been saved to server,
     * which lets us remove un-saved / invalid coaches on error.
     */
    markCoachesAsSaved: function() {
        this.each(function(model) {
            // Backbone models without an id are considered
            // to be new, as in not yet saved to server.
            // Append an increasing number since collections cannot have
            // models with the same id, as of Backbone 0.9
            model.set({id: "marks-model-as-saved-on-server" + this.increasingId++},
                    {silent: true});
        }, this);
    },

    removeUnsavedCoaches_: function() {
        var modelsToRemove = this.filter(function(model) {
            return model.isNew();
        });

        // Don't trigger saves when removing invalid coaches
        this.remove(modelsToRemove, {silent: true});

        // Trigger removal from view
        _.each(modelsToRemove, _.bind(function(model) {
                this.trigger("removeFromView", model);
            }, this));
    }
});

Coaches.CoachCollectionView = Backbone.View.extend({
    rendered_: false,
    onlyAddingCoaches_: true,

    initialize: function(options) {
        this.coachViews_ = [];

        this.collection.each(this.onAdd_, this);

        this.collection.bind("add", this.onAdd_, this)
            .bind("remove", this.onRemove_, this)
            .bind("removeFromView", this.onRemove_, this);

        this.collection.bind("add", this.handleEmptyNotification_, this)
            .bind("remove", this.handleEmptyNotification_, this)
            .bind("removeFromView", this.handleEmptyNotification_, this);

        this.collection.bind("saveSuccess", this.onSaveSuccess_, this)
            .bind("saveError", this.onSaveError_, this)
            .bind("showError", this.showError_, this);
    },

    onSaveSuccess_: function() {
        // Clear textfield only if we successfully added a coach,
        // as opposed to removing a coach.
        if (this.onlyAddingCoaches_) {
            $("#coach-email").val("");
        }
        this.onlyAddingCoaches_ = true;
    },

    onSaveError_: function() {
        this.showError_("We couldn't find anyone with that email.");
    },

    onAdd_: function(model) {
        var coachView = new Coaches.CoachView({
            model: model,
            collection: this.collection
        });
        this.coachViews_.push(coachView);
        if (this.rendered_) {
            $(this.el).prepend(coachView.render().el);
        }
    },

    onRemove_: function(model) {
        var viewToRemove = _.find(this.coachViews_, function(view) {
                return view.model === model;
            });

        if (viewToRemove) {
            this.onlyAddingCoaches_ = false;

            this.coachViews_ = _.without(this.coachViews_, viewToRemove);

            if (this.rendered_) {
                $(viewToRemove.el).fadeOut(function() {
                    viewToRemove.remove();
                });
            }
        }
    },

    showEmptyNotification_: function() {
        if (!this.emptyNotification_) {
            var template = Templates.get("profile.no-coaches");
            this.emptyNotification_ = $("<div>").addClass("empty-notification").html(template());
            $(this.el).append(this.emptyNotification_);
        }
        this.$(".empty-notification").show();
    },

    handleEmptyNotification_: function() {
        if (this.collection.isEmpty()) {
            this.showEmptyNotification_();
        } else {
            this.$(".empty-notification").hide();
        }
    },

    showError_: function(message) {
        $(".coaches-section .notification.error").text(message)
            .show()
            .delay(2000)
            .fadeOut(function() {
                $(this).text("");
            });

        Coaches.enableInput();
    },

    render: function() {
        this.rendered_ = true;
        $(this.el).empty();

        this.handleEmptyNotification_();

        _.each(this.coachViews_, function(view) {
            $(this.el).append(view.render().el);
        }, this);

        return this;
    }
});
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_coach"]=a(function(a,b,c,d,e){function l(a,b){return' <span class="pending">(pending)'}function m(a,b){return'\n    <span class="remove simple-button action-gradient">Remove</span>\n'}function n(a,b){return'\n    <span class="accept simple-button action-gradient green">Accept</span>\n    <span class="deny simple-button action-gradient">Ignore</span>\n'}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<span class="email">',h=c.email,h?g=h.call(b,{hash:{}}):(g=b.email,g=typeof g===i?g():g),f+=j(g),g=b.isCoachingLoggedInUser,g=c.unless.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='</span></span>\n<span class="controls">\n',g=b.isCoachingLoggedInUser,g=c["if"].call(b,g,{hash:{},inverse:k.program(5,n,e),fn:k.program(3,m,e)});if(g||g===0)f+=g;return f+="\n</span>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_no-coaches"]=a(function(a,b,c,d,e){return c=c||a.helpers,"<p>You have no coaches! Why not try adding one?</p>\n"})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_coaches"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+='<div class="graph-picker">\n    Coaches have access to all of your Khan Academy data.\n    <ul class="tabrow">\n        <li>\n            Your student id is ',h=c.email,h?g=h.call(b,{hash:{}}):(g=b.email,g=typeof g===i?g():g),f+=j(g)+'\n        </li>\n    </ul>\n</div>\n<div class="col1">\n    <div class="coaches-section">\n        <h2>Add a coach</h2>\n        <input id="coach-email" class="blur-on-esc" placeholder="Coach id" type="text">\n        <span id="add-coach" class="simple-button action-gradient">Add coach</span>\n        <img class="coach-throbber" style="display: none" src="/images/throbber.gif">\n\n        <div class="notification error" style="display: none;"></div>\n    </div>\n</div>\n\n<div class="col2">\n    <div class="coaches-section">\n        <h2>Your coaches</h2>\n        <div id="coach-list-container"></div>\n    </div>\n</div>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_questions-list"]=a(function(a,b,c,d,e){function l(a,b){var d="",e;d+="\n    ",e=c.each.call(a,a,{hash:{},inverse:h.noop,fn:h.program(2,m,b)});if(e||e===0)d+=e;return d+="\n",d}function m(a,b){var d="",e,f;d+='\n    <div style="margin-left: -10px;">\n        <ul>\n        <li>\n            <div class="question clearfix ',e=a.hasUnread,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(3,n,b)});if(e||e===0)d+=e;return d+=' visited-no-recolor">\n                <div class="ellipsis">\n                    <a class="discussion-link" href="/v/',e=a.video,e=e==null||e===!1?e:e.readableId,e=typeof e===i?e():e,d+=j(e)+"?qa_expand_key=",f=c.qaExpandKey,f?e=f.call(a,{hash:{}}):(e=a.qaExpandKey,e=typeof e===i?e():e),d+=j(e)+'">',e=a.answererCount,f=c.pluralize,e=f?f.call(a,e,"person",{hash:{}}):k.call(a,"pluralize",e,"person",{hash:{}}),d+=j(e)+' answered your question</a>:\n                    <span class="content">',f=c.content,f?e=f.call(a,{hash:{}}):(e=a.content,e=typeof e===i?e():e),d+=j(e)+'</span>\n                </div>\n                on "<a href="/v/',e=a.video,e=e==null||e===!1?e:e.readableId,e=typeof e===i?e():e,d+=j(e)+'" style="color: #777">',e=a.video,e=e==null||e===!1?e:e.title,e=typeof e===i?e():e,d+=j(e)+'</a>."\n                <div class="timeago" title="',f=c.lastDate,f?e=f.call(a,{hash:{}}):(e=a.lastDate,e=typeof e===i?e():e),d+=j(e)+'">',f=c.lastDate,f?e=f.call(a,{hash:{}}):(e=a.lastDate,e=typeof e===i?e():e),d+=j(e)+"</div>\n            </div>\n        </li>\n        </ul>\n    </div>\n    ",d}function n(a,b){return"unread"}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression,k=c.helperMissing;f+='<div style="font-size: 14px;">\n',g=b.length,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(1,l,e)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_achievements"]=a(function(a,b,c,d,e){function m(a,b){return"standard-view"}function n(a,b){return"mobile-view"}function o(a,b,d){var e="",f,g,h;e+='\n      <li id="category-',h=c.category,h?f=h.call(a,{hash:{}}):(f=a.category,f=typeof f===i?f():f),e+=j(f)+'" class="',f=a.category,h=c.toBadgeClassName,f=h?h.call(a,f,{hash:{}}):k.call(a,"toBadgeClassName",f,{hash:{}}),e+=j(f)+" ",f=a.userBadges,f=f==null||f===!1?f:f.length,f=c["if"].call(a,f,{hash:{},inverse:l.noop,fn:l.program(6,p,b)});if(f||f===0)e+=f;e+='">\n        <img src="',f=a.category,h=c.toMediumIconSrc,f=h?h.call(a,f,{hash:{}}):k.call(a,"toMediumIconSrc",f,{hash:{}}),e+=j(f)+'" />\n        <div class="label">',f=d.fStandardView,g=a.category,h=c.toBadgeLabel,f=h?h.call(a,g,f,{hash:{}}):k.call(a,"toBadgeLabel",g,f,{hash:{}}),e+=j(f),f=a.userBadges,f=f==null||f===!1?f:f.length,f=c["if"].call(a,f,{hash:{},inverse:l.noop,fn:l.program(8,q,b)});if(f||f===0)e+=f;return e+="</div>\n      </li>\n      ",e}function p(a,b){return"owned"}function q(a,b){var c="",d;return c+=" x ",d=a.userBadges,d=d==null||d===!1?d:d.length,d=typeof d===i?d():d,c+=j(d),c}c=c||a.helpers,d=d||a.partials;var f="",g,h,i="function",j=this.escapeExpression,k=c.helperMissing,l=this;f+='<div id="achievements" class="',g=b.fStandardView,g=c["if"].call(b,g,{hash:{},inverse:l.program(3,n,e),fn:l.program(1,m,e)});if(g||g===0)f+=g;f+='">\n  <div id="achievement-list">\n    <ul>\n      ',g=b.badgeCollections,h=c.reverseEach,g=h?h.call(b,g,{hash:{},inverse:l.noop,fn:l.programWithDepth(o,e,b)}):k.call(b,"reverseEach",g,{hash:{},inverse:l.noop,fn:l.programWithDepth(o,e,b)});if(g||g===0)f+=g;f+='\n    </ul>\n    <div class="clear"></div>\n    <div id="badge-container" class="inset-container" style="display: none;">\n      ',g=b,g=l.invokePartial(d["profile_badge-container"],"profile_badge-container",g,c,d);if(g||g===0)f+=g;return f+="\n    </div>\n  </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_badge-container"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;d+='\n    <div id="category-',f=c.category,f?e=f.call(a,{hash:{}}):(e=a.category,e=typeof e===i?e():e),d+=j(e)+'" style="display: none;">\n      <div class="badge-description-container">\n        <div class="badge-description-content">\n            ',f=c.categoryDescription,f?e=f.call(a,{hash:{}}):(e=a.categoryDescription,e=typeof e===i?e():e),d+=j(e)+"\n        </div>\n      </div>\n      ",e=a.userBadges,e=e==null||e===!1?e:e.length,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(2,l,b)});if(e||e===0)d+=e;d+='\n      <div id="all-badges">\n        <h2 style="display: block; margin-left: 10px;">Possible Badges</h2>\n        ',e=a.badges,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(5,n,b)});if(e||e===0)d+=e;return d+='\n      </div>\n      <div class="clear"></div>\n    </div>\n',d}function l(a,b){var d="",e;d+='\n      <div id="user-owned">\n      <h2 style="display: block; margin-left: 10px;">Badges Earned</h2>\n        ',e=a.userBadges,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(3,m,b)});if(e||e===0)d+=e;return d+='\n        <div class="clear"></div>\n      </div>\n      ',d}function m(a,b){var e="",f;e+="\n          ",f=a,f=h.invokePartial(d["profile_user-badge"],"profile_user-badge",f,c,d);if(f||f===0)e+=f;return e+="\n        ",e}function n(a,b){var d="",e;d+="\n          ",e=a.isRetired,e=c.unless.call(a,e,{hash:{},inverse:h.noop,fn:h.program(6,o,b)});if(e||e===0)d+=e;return d+="\n        ",d}function o(a,b){var e="",f;e+="\n            ",f=a,f=h.invokePartial(d.profile_badge,"profile_badge",f,c,d);if(f||f===0)e+=f;return e+="\n          ",e}c=c||a.helpers,d=d||a.partials;var f="",g,h=this,i="function",j=this.escapeExpression;g=b.badgeCollections,g=c.each.call(b,g,{hash:{},inverse:h.noop,fn:h.program(1,k,e)});if(g||g===0)f+=g;return f+="\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_user-badge"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;return d+='\n    <div class="achievement-count">x',f=c.count,f?e=f.call(a,{hash:{}}):(e=a.count,e=typeof e===i?e():e),d+=j(e)+"</div>\n  ",d}function m(a,b){return'\n        This badge has been <span class="badge-context-retired">retired</span>!\n        You get to keep it forever, but nobody else can earn it.\n      '}function n(a,b){var d="",e,f;d+='\n        Last achieved <abbr class="timeago" title="',f=c.lastEarnedDate,f?e=f.call(a,{hash:{}}):(e=a.lastEarnedDate,e=typeof e===i?e():e),d+=j(e)+'">',f=c.lastEarnedDate,f?e=f.call(a,{hash:{}}):(e=a.lastEarnedDate,e=typeof e===i?e():e),d+=j(e)+"</abbr>\n        ",e=a.visibleContextName,e=c["if"].call(a,e,{hash:{},inverse:k.noop,fn:k.program(6,o,b)});if(e||e===0)d+=e;return d+="\n      ",d}function o(a,b){var d="",e,f;d+="\n          in <strong>",f=c.visibleContextName,f?e=f.call(a,{hash:{}}):(e=a.visibleContextName,e=typeof e===i?e():e),d+=j(e)+"</strong>\n          ",e=a.hasMultiple,e=c["if"].call(a,e,{hash:{},inverse:k.noop,fn:k.program(7,p,b)});if(e||e===0)d+=e;return d+="\n        ",d}function p(a,b){var d="",e;d+='\n            <span class="badge-context-hidden-link"><a href="#" onclick="Badges.showMoreContext(this);return false;">and also in<span class="ellipsis">...</span></a></span>\n            <span class="badge-context-hidden" style="display:none;">\n            ',e=a.listContextNamesHidden,e=c.each.call(a,e,{hash:{},inverse:k.noop,fn:k.program(8,q,b)});if(e||e===0)d+=e;return d+="\n            </span>\n          ",d}function q(a,b){var d="",e,f;d+="\n               <strong>",f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===i?e():e),d+=j(e),e=a.isLast,e=c.unless.call(a,e,{hash:{},inverse:k.noop,fn:k.program(9,r,b)});if(e||e===0)d+=e;return d+="</strong>\n            ",d}function r(a,b){return", "}function s(a,b){var c="",d;return c+='<div class="energy-points-badge">',d=a.badge,d=d==null||d===!1?d:d.points,d=typeof d===i?d():d,c+=j(d)+"</div>",c}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="achievement-badge category-',h=c.category,h?g=h.call(b,{hash:{}}):(g=b.category,g=typeof g===i?g():g),f+=j(g)+' achievement-badge-owned" title="',g=b.badge,g=g==null||g===!1?g:g.safeExtendedDescription,g=typeof g===i?g():g,f+=j(g)+'">\n  <div id="outline-box">\n  <img src="',g=b.badge,g=g==null||g===!1?g:g.iconSrc,g=typeof g===i?g():g,f+=j(g)+'" id="badge-icon"/>\n  ',g=b.hasMultiple,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='\n  <div class="achievement-text">\n  <div class="achievement-title">',g=b.badge,g=g==null||g===!1?g:g.description,g=typeof g===i?g():g,f+=j(g)+'</div>\n  <div class="achievement-desc">\n      ',g=b.badge,g=g==null||g===!1?g:g.isRetired,g=c["if"].call(b,g,{hash:{},inverse:k.program(5,n,e),fn:k.program(3,m,e)});if(g||g===0)f+=g;f+="\n  </div>\n  </div>\n  ",g=b.badge,g=g==null||g===!1?g:g.points,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(11,s,e)});if(g||g===0)f+=g;return f+="\n  </div>\n</div>\n\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_badge"]=a(function(a,b,c,d,e){function l(a,b){return"achievement-badge-owned"}function m(a,b){var d="",e,f;return d+="data-objectives='",f=c.objectives,f?e=f.call(a,{hash:{}}):(e=a.objectives,e=typeof e===i?e():e),d+=j(e)+"'",d}function n(a,b){return'<div class="add-goal">+ &emsp; Goal</div>'}function o(a,b){var d="",e,f;return d+='<div class="energy-points-badge">',f=c.points,f?e=f.call(a,{hash:{}}):(e=a.points,e=typeof e===i?e():e),d+=j(e)+"</div>",d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div class="achievement-badge category-',h=c.badgeCategory,h?g=h.call(b,{hash:{}}):(g=b.badgeCategory,g=typeof g===i?g():g),f+=j(g)+" ",g=b.isOwned,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='" title="',h=c.safeExtendedDescription,h?g=h.call(b,{hash:{}}):(g=b.safeExtendedDescription,g=typeof g===i?g():g),f+=j(g)+'" ',g=b.canBecomeGoal,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(3,m,e)});if(g||g===0)f+=g;f+='>\n  <div id="outline-box">\n  <img src="',h=c.iconSrc,h?g=h.call(b,{hash:{}}):(g=b.iconSrc,g=typeof g===i?g():g),f+=j(g)+'" id="badge-icon"/>\n  <div class="achievement-text">\n  <div class="achievement-title">',h=c.description,h?g=h.call(b,{hash:{}}):(g=b.description,g=typeof g===i?g():g),f+=j(g)+'</div>\n  <div class="achievement-desc achievement-desc-no-count">\n    ',h=c.safeExtendedDescription,h?g=h.call(b,{hash:{}}):(g=b.safeExtendedDescription,g=typeof g===i?g():g),f+=j(g)+"\n  </div>\n  </div>\n  ",g=b.canBecomeGoal,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(5,n,e)});if(g||g===0)f+=g;f+="\n  ",g=b.points,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(7,o,e)});if(g||g===0)f+=g;return f+="\n  </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_badge-compact"]=a(function(a,b,c,d,e){function l(a,b){return'\n\n<div class="achievement-badge compact empty">\n  <div id="outline-box">\n  <div class="selected-indicator"> </div>\n  </div>\n</div>\n\n'}function m(a,b){var d="",e,f;d+='\n\n<div class="achievement-badge compact achievement-badge-owned',e=a.used,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(4,n,b)});if(e||e===0)d+=e;d+='"\n    id="',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===i?e():e),d+=j(e)+'" title="',f=c.safeExtendedDescription,f?e=f.call(a,{hash:{}}):(e=a.safeExtendedDescription,e=typeof e===i?e():e),d+=j(e)+'">\n  <div id="outline-box">\n    <div class="achievement-title">',e=a.description,f=c.toBadgeDescriptionWithBreaks,e=f?f.call(a,e,{hash:{}}):k.call(a,"toBadgeDescriptionWithBreaks",e,{hash:{}});if(e||e===0)d+=e;return d+='</div>\n    <img class="badge-icon" src="',e=a.icons,e=e==null||e===!1?e:e.compact,e=typeof e===i?e():e,d+=j(e)+'">\n    <div class="delete-icon">X</div>\n    <div class="selected-indicator"> </div>\n  </div>\n</div>\n\n',d}function n(a,b){return" used"}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression,k=c.helperMissing;g=b.isEmpty,g=c["if"].call(b,g,{hash:{},inverse:h.program(3,m,e),fn:h.program(1,l,e)});if(g||g===0)f+=g;return f+="\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_badge-display-case"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="";return f+='<a class="display-case-cover" href="javascript:void(0)">\n',f+='\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n</a>\n<div class="main-case fancy-scrollbar"></div>\n<div class="badge-picker fancy-scrollbar"></div>\n\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_empty-badge-picker"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div class="empty-badge-picker">\n<div style="font-size:180%">No badges...yet!</div>\n<a href="/#browse">Watch a video</a> or <a href="/exercisedashboard">try an exercise</a> to earn your first badge.\n</div>\n'})})();
/**
 * Code to handle badge-related UI components.
 */

// TODO: stop clobering the stuff in pageutil.js
var Badges = window.Badges || {};

/**
 * @enum {number}
 */
Badges.ContextType = {
    NONE: 0,
    EXERCISE: 1,
    PLAYLIST: 2
};

/**
 * @enum {number}
 */
Badges.Category = {
    BRONZE: 0, // Meteorite, "Common"
    SILVER: 1, // Moon, "Uncommon"
    GOLD: 2, // Earth, "Rare"
    PLATINUM: 3, // Sun, "Epic"
    DIAMOND: 4, // Black Hole, "Legendary"
    MASTER: 5 // Topic/Academic Achievement
};

/**
 * A single badge that a user can earn.
 * Parallel to the JSON serialized formats of badges.Badge
 */
Badges.Badge = Backbone.Model.extend({
    defaults: {
        "badgeCategory": Badges.Category.BRONZE,
        "name": "__empty__",
        "description": "",
        "icons": {},
        "isOwned": false,
        "points": 0,
        "safeExtendedDescription": ""
    },

    isEmpty: function() {
        // Specially reserved name for empty badge slots.
        // Used in display case - must be synced with what the server
        // understands in util_badges.py
        return this.get("name") === "__empty__";
    },

    toJSON: function() {
        var json = Badges.Badge.__super__.toJSON.call(this);
        json["isEmpty"] = this.isEmpty();
        return json;
    }
});

/**
 * A re-usable instance of an empty badge.
 */
Badges.Badge.EMPTY_BADGE = new Badges.Badge({});

/**
 * Badge information about a badge, or a set of badges that a user has earned
 * grouped by their badge type.
 * Parallel to the JSON serialized formats of badges.GroupedUserBadge
 */
Badges.UserBadge = Backbone.Model.extend({
    defaults: {
        "badge": null,
        "count": 1,
        "lastEarnedDate": "2011-11-22T00:00:00Z",
        "targetContextNames": [],
        "isOwned": true
    },

    initialize: function(attributes, options) {
        if (!this.get("badge")) {
            throw "A UserBadge object needs a reference badge object";
        }

        // Wrap the underlying badge info in a Model object and forward
        // change events.
        var badgeModel = new Badges.Badge(this.get("badge"));
        this.set({ "badge": badgeModel }, { "silent": true });
        badgeModel.bind(
            "change",
            function(ev) { this.trigger("change:badge"); },
            this);
    }
});

/**
 * A list of badges that can be listened to.
 * This list can be edited by adding or removing from the collection,
 * and saved up to a server.
 */
Badges.BadgeList = Backbone.Collection.extend({
    model: Badges.Badge,

    saveUrl: null,

    /**
     * Whether or not this badge list has been modified since the last
     * save to the server.
     */
    dirty_: false,

    setSaveUrl: function(url) {
        this.saveUrl = url;
    },

    toJSON: function() {
        return this.map(function(badge) {
            return badge.get("name");
        });
    },

    add: function(models, options) {
        Badges.BadgeList.__super__.add.apply(this, arguments);
        this.dirty_ = true;
    },

    remove: function(models, options) {
        Badges.BadgeList.__super__.remove.apply(this, arguments);
        this.dirty_ = true;
    },

    /**
     * Saves the collection to the server via Backbone.sync.
     * This does *not* save any individual edits to Badges within this list;
     * it simply posts the information about what belongs in the set.
     * @param {Object} options Options similar to what Backbone.sync accepts.
     */
    save: function(options) {
        if (!this.dirty_) {
            return;
        }
        options = options || {};
        options["url"] = this.saveUrl;
        options["contentType"] = "application/json";
        options["data"] = JSON.stringify(this.map(function(badge) {
            return badge.get("name");
        }));
        Backbone.sync.call(this, "update", this, options);
        this.dirty_ = false;
    },

    // TODO: figure out how to do this in a more systematic way!
    // Override base Backbone.parse since badge modifications can result in
    // api_action_results to be sent back.
    parse: function(resp, xhr) {
        if ("apiActionResults" in resp && "payload" in resp) {
            resp = resp["payload"];
        }
        Backbone.Model.prototype.parse.call(this, resp, xhr);
    }
});

/**
 * A list of user badges that can be listened to.
 */
Badges.UserBadgeList = Backbone.Collection.extend({
    model: Badges.UserBadge
});

/**
 * A UI component that displays a list of badges to show off.
 * Typically used in a public profile page, but can be re-used
 * in the context of a hovercard, or any other context.
 *
 * Expects a Badges.BadgeList model to back it.
 */
Badges.DisplayCase = Backbone.View.extend({
    className: "badge-display-case",

    /**
     * Whether or not this is currently in edit mode.
     */
    editing: false,

    /**
     * The full user badge list available to pick from when in edit mode.
     * @type {Badges.UserBadgeList}
     */
    fullBadgeList: null,

    /**
     * The number of slots available in the display case.
     */
    maxVisible: 5,

    /**
     * The slot number being edited. Any selection from the badge picker
     * will replace the badge in this slot number.
     * -1 if not currently editing.
     */
    selectedIndex: -1,

    mainCaseEl: null,
    badgePickerEl: null,
    editControlEl: null,

    /**
     * Ephemeral element used in animating a selection.
     */
    animatingBadgeEl: null,

    initialize: function() {
        this.model.bind("add", this.render, this);
        this.model.bind("remove", this.render, this);
        this.model.bind("change", this.render, this);
        this.template = Templates.get("profile.badge-display-case");

        Handlebars.registerHelper("toBadgeDescriptionWithBreaks", function(description) {
            var lines = [];
            var line = "";

            _.each(description.split(" "), function(word) {

                if (line.length > 0) {
                // Split description into up to two lines

                    if (line.length + word.length > 12 && lines.length == 0) {
                        // Insert newline, break it up
                        lines[lines.length] = line;
                        line = "";
                    }
                    else {
                        line += " ";
                    }

                }

                line += word;
            });

            if (line) {
                lines[lines.length] = line;
            }

            // Guarantee 2 lines for consistent height
            while (lines.length < 2) {
                lines[lines.length] = "&nbsp;";
            }

            return lines.join("\n");
        });
    },

    events: {
        "click .main-case .achievement-badge .delete-icon": "onDeleteBadgeClicked_",
        "click .main-case .achievement-badge": "onBadgeClicked_",
        "click .badge-picker .achievement-badge": "onBadgeInPickerClicked_",
        "click .display-case-cover": "onCoverClicked_"
    },

    /**
     * @return {boolean} Whether or not this display case can go into "edit" mode
     *        to allow a user to select which badges go inside.
     */
    isEditable: function() {
        return !!this.fullBadgeList;
    },

    /**
     * Sets the full badge list for the display case so it can go into edit
     * mode and pick badges from this badge list.
     * @param {Badges.UserBadgeList} The full list of badges that can be added
     *        to this display case.
     * @return {Badges.DisplayCase} This same instance so calls can be chained.
     */
    setFullBadgeList: function(fullBadgeList) {
        // TODO: do we want to listen to events on the full badge list?
        this.fullBadgeList = fullBadgeList;
        $(this.editControlEl).toggleClass("editable", this.isEditable());
    },

    /**
     * Enters "edit mode" where badges can be added/removed, if possible.
     * @param {number=} index Optional index of the slot in the display-case
     *        to be edited. Defaults to the first available slot, or if none
     *        are available, the last used slot.
     * @return {Badges.DisplayCase} This same instance so calls can be chained.
     */
    edit: function(index) {
        if (!this.isEditable() || this.editing) {
            return this;
        }

        this.setEditing_(true);

        this.updateEditSelection_(index);

        this.showBadgePicker_();
        this.editControlEl.slideUp(350);
        this.mainCaseEl.addClass("enable-scrolling");
        $(document).bind("mousedown", this.getBoundStopEditFn_());
        return this;
    },

    /**
     * Updates the editor so that the badge at the specified index is
     * being edited. If no index is specified, the last possible spot
     * is selected by default.
     * @param {number=} index Optional index of the slot in the display-case
     *        to be edited. -1 to indicate that none should be selected (i.e.
     *        we're exiting edit mode.
     */
    updateEditSelection_: function(index) {
        // By default, select the first empty slot, or the last non-empty
        // slot if completely full.
        if (index === undefined) {
            for (var i = 0, len = this.model.length; i < len; i++) {
                if (this.model.at(i).isEmpty()) {
                    index = i;
                    break;
                }
            }
        }
        index = (index === undefined) ? this.model.length : index;
        this.selectedIndex = Math.min(index, this.maxVisible - 1);
        this.updateSelectionHighlight();
    },

    /**
     * Shows the badge picker for edit mode, if not already visible.
     * This view must have already have been rendered once.
     */
    showBadgePicker_: function() {
        this.renderBadgePicker();
        var jel = $(this.el);
        var jelPicker = $(this.badgePickerEl);
        jelPicker.slideDown("fast", function() { jelPicker.show(); })
            .css("margin-left", "300px")
            .animate({ "margin-left": "0" }, {
                duration: "fast",
                step: $.easing.easeInOutCubic,
                complete: function() {
                    jel.addClass("editing");
                }
            });

        return this;
    },

    /**
     * Handles a click to a badge in the main display case.
     */
    onBadgeClicked_: function(e) {
        if (!this.editing) {
            // Noop when not editing.
            return;
        }

        var index = $(this.mainCaseEl)
                .find(".achievement-badge")
                .index(e.currentTarget);
        this.updateEditSelection_(index);
        e.stopPropagation();
    },

    /**
     * Handles a click to a delete button for a badge in the main display case.
     */
    onDeleteBadgeClicked_: function(e) {
        // Prevent the badge click from being processed, since
        // the X is a child of the badge.
        e.stopPropagation();

        if (!this.editing) {
            // Noop when not editing.
            return;
        }

        var badgeNode = e.currentTarget;
        while (badgeNode && !$(badgeNode).hasClass("achievement-badge")) {
            badgeNode = badgeNode.parentNode;
        }
        var index = $(this.mainCaseEl)
                .find(".achievement-badge")
                .index(badgeNode);

        // Store position before it's removed.
        var fromOffset = $(badgeNode).offset();
        var isLast = index == (this.model.length - 1);
        var removedBadge = this.model.at(index);
        this.model.remove(removedBadge);

        if (!isLast) {
            // Insert an empty badge, since we don't want things shifting
            this.model.add(Badges.Badge.EMPTY_BADGE.clone(), { at: index });
        }
        this.updateEditSelection_(index);

        // Animate-out the deleted badge
        this.ensureAnimatingBadgeEl();
        var badgeTemplate = Templates.get("profile.badge-compact");
        this.animatingBadgeEl.html(badgeTemplate(removedBadge.toJSON()));
        this.animatingBadgeEl.css({
            left: fromOffset.left,
            top: fromOffset.top,
            opacity: 1.0
        });
        this.animatingBadgeEl.show();

        this.animatingBadgeEl.animate({
            left: fromOffset.left + 5,
            top: fromOffset.top + 10,
            opacity: 0
        }, {
            duration: 250,
            step: $.easing.easeInOutCubic,
            complete: _.bind(function() {
                this.animatingBadgeEl.hide();
                this.animatingBadgeEl.css({ opacity: 1.0 });
            }, this)
        });
    },

    /**
     * Handles a click to a badge in the badge picker in edit mode.
     */
    onBadgeInPickerClicked_: function(e) {
        e.stopPropagation();

        if ($(e.currentTarget).hasClass("used")) {
            // Ignore badges already in the main case.
            return;
        }

        var name = e.currentTarget.id;
        var matchedBadge = _.find(
                this.fullBadgeList.models,
                function(userBadge) {
                    return userBadge.get("badge").get("name") == name;
                });
        if (!matchedBadge) {
            // Shouldn't happen!
            return;
        }

        var badgeToAdd = matchedBadge.get("badge").clone();
        this.beginSelectionAnimation_(
                badgeToAdd, $(e.currentTarget), this.selectedIndex);
    },

    ensureAnimatingBadgeEl: function() {
        if (!this.animatingBadgeEl) {
            this.animatingBadgeEl = $("<div id='animating-badge'></div>")
                    .appendTo("body");
        }
    },

    /**
     * Begin an animation to select a badge from the picker so that
     * it may be added to the main display case.
     *
     * @param {Badges.Badge} badgeSelected The badge to add
     * @param {jQuery} jelBadgeSelected The jQuery element of the badge
     *     element that was selected in the picker.
     * @param {number} index The slot in the display case to add to.
     */
    beginSelectionAnimation_: function(
            badgeSelected, jelBadgeSelected, index) {
        this.ensureAnimatingBadgeEl();

        var jelTargetSlot = $(this.mainCaseEl)
                .find(".achievement-badge").eq(index);
        var badgeTemplate = Templates.get("profile.badge-compact");
        this.animatingBadgeEl.html(badgeTemplate(badgeSelected.toJSON()));

        var fromOffset = jelBadgeSelected.offset();
        this.animatingBadgeEl.css({
            left: fromOffset.left,
            top: fromOffset.top
        });
        this.animatingBadgeEl.show();

        var toOffset = jelTargetSlot.offset();
        this.animatingBadgeEl.animate({
            left: toOffset.left,
            top: toOffset.top
        }, {
            duration: 250,
            step: $.easing.easeInOutCubic,
            complete: _.bind(function() {
                this.finishSelection_(badgeSelected, index);
            }, this)
        });
    },

    finishSelection_: function(badgeToAdd, index) {
        if (!this.animatingBadgeEl) {
            return;
        }
        this.animatingBadgeEl.hide();
        this.animatingBadgeEl.html("");

        // Do the actual selection!
        // Backbone.Collection doesn't have a .replace method - do it ourselves
        var existing = this.model.at(index);
        if (existing) {
            this.model.remove(existing);
        }

        for (var i = this.model.length; i < index; i++) {
            // Ensure we pad the list with empty badges if the user is
            // inserting after some holes.
            this.model.add(Badges.Badge.EMPTY_BADGE.clone());
        }
        this.model.add(badgeToAdd, { at: index });

        // Pick the next empty slot.
        this.updateEditSelection_();
    },

    /**
     * Exits edit mode.
     */
    stopEdit: function() {
        if (this.editing) {
            this.setEditing_(false);
            this.updateEditSelection_(-1);
            var jelRootEl = $(this.el);
            var jelPicker = $(this.badgePickerEl);
            jelPicker.slideUp("fast", function() {
                jelRootEl.removeClass("editing");
            });
            jelPicker.undelegate();
            this.editControlEl.slideDown(250);
            this.mainCaseEl.removeClass("enable-scrolling");
            $(document).unbind("click", this.getBoundStopEditFn_());

            // TODO: avoid saving if not dirty.
            this.save();
        }
        return this;
    },

    getBoundStopEditFn_: function() {
        if (this.boundStopEditFn_) {
            return this.boundStopEditFn_;
        }
        var self = this;
        return this.boundStopEditFn_ = function(e) {
            for (var node = e.target; node; node = node.parentNode) {
                if (node === self.el) {
                    // Click inside the display-case somewhere - ignore.
                    return;
                }
            }
            self.stopEdit();
        };
    },

    save: function() {
        this.model.save();
    },

    setEditing_: function(editing) {
        this.editing = editing;
    },

    /**
     * Builds a context object to render a single badge.
     */
    getUserBadgeJsonContext_: function(badge) {
        var json = badge.get("badge").toJSON();
        json["count"] = badge.get("count");
        return json;
    },

    /**
     * Renders the contents of the main case.
     */
    renderMainCaseContents_: function() {
        var i,
            template = Templates.get("profile.badge-compact"),
            html = [],
            numRendered = Math.min(this.maxVisible, this.model.length);

        // While creating the JSON context, also update the badge overlays in
        // the display case cover.
        var overlays = this.editControlEl.find(".achievement-badge");
        for (i = 0; i < numRendered; i++) {
            var badge = this.model.at(i);
            html.push(template(badge.toJSON()));
            overlays[i].setAttribute(
                    "title",
                    badge.get("safeExtendedDescription"));
        }
        for (; i < this.maxVisible; i++) {
            html.push(template(Badges.Badge.EMPTY_BADGE.toJSON()));
            overlays[i].setAttribute("title", "");
        }
        this.mainCaseEl.html(html.join(""));
    },

    /**
     * Updates the appropriate badge being highlighted for edit mode.
     * See {@link #selectedIndex} for more details.
     */
    updateSelectionHighlight: function() {
        var badgeSlots = $(".achievement-badge", this.mainCaseEl);
        badgeSlots.removeClass("selected");
        if (this.selectedIndex > -1) {
            $(badgeSlots[this.selectedIndex]).addClass("selected");
        }
    },

    onCoverClicked_: function(e) {
        if (this.isEditable()) {
            this.edit();
        }
        e.stopPropagation();
    },

    /**
     * Renders the contents of the badge picker.
     * Idempotent - simply blows away and repopulates the contents if called
     * multiple times.
     */
    renderBadgePicker: function() {
        if (this.fullBadgeList.isEmpty()) {
            $(this.badgePickerEl).html(
                    Templates.get("profile.empty-badge-picker")());
            return;
        }

        var html = [],
            badgeTemplate = Templates.get("profile.badge-compact");
        this.fullBadgeList.each(function(userBadge) {
            var alreadyInCase = this.model.find(function(b) {
                return b.get("name") === userBadge.get("badge").get("name");
            });

            // Mark badges that are already used in the display case
            var jsonContext = this.getUserBadgeJsonContext_(userBadge);
            if (alreadyInCase) {
                jsonContext["used"] = true;
            }
            html.push(badgeTemplate(jsonContext));
        }, this);
        $(this.badgePickerEl).html(html.join(""));
    },

    render: function() {
        if (!this.mainCaseEl) {
            // First render - build the chrome.
            $(this.el).html(Templates.get("profile.badge-display-case")());
            this.mainCaseEl = this.$(".main-case");
            this.badgePickerEl = this.$(".badge-picker");
            this.editControlEl = this.$(".display-case-cover");

            $(this.editControlEl).toggleClass("editable", this.isEditable());
        }
        this.renderMainCaseContents_();
        if (this.fullBadgeList) {
            this.renderBadgePicker();
        }
        this.updateSelectionHighlight();
        return this;
    }
});
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_profile-goals"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;d+='\n    <div class="student-goals goals-personal ',f=c.colors,f?e=f.call(a,{hash:{}}):(e=a.colors,e=typeof e===i?e():e),d+=j(e)+'">\n    ',e=a.goals,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.programWithDepth(l,b,a)});if(e||e===0)d+=e;return d+="\n    </div>\n",d}function l(a,b,d){var e="",f,g;e+="\n        ",e+='\n        <div class="goal pulls ',f=a.completed,f=c["if"].call(a,f,{hash:{},inverse:h.noop,fn:h.program(3,m,b)});if(f||f===0)e+=f;e+='" data-id="',g=c.id,g?f=g.call(a,{hash:{}}):(f=a.id,f=typeof f===i?f():f),e+=j(f)+'">\n            <p class="goal-description">\n                ',f=d.readonly,f=c["if"].call(a,f,{hash:{},inverse:h.program(8,p,b),fn:h.program(6,o,b)});if(f||f===0)e+=f;e+="\n                ",f=d.isCurrent,f=c["if"].call(a,f,{hash:{},inverse:h.noop,fn:h.program(10,q,b)});if(f||f===0)e+=f;e+="\n                ",f=d.isCompleted,f=c["if"].call(a,f,{hash:{},inverse:h.noop,fn:h.program(12,r,b)});if(f||f===0)e+=f;e+="\n                ",f=d.isAbandoned,f=c["if"].call(a,f,{hash:{},inverse:h.noop,fn:h.program(14,s,b)});if(f||f===0)e+=f;e+="\n                ",f=d.readonly,f=c.unless.call(a,f,{hash:{},inverse:h.noop,fn:h.program(16,t,b)});if(f||f===0)e+=f;e+='\n            </p>\n            <ul class="inline-list objective-list">\n            ',f=a.objectives,f=c.each.call(a,f,{hash:{},inverse:h.noop,fn:h.program(18,u,b)});if(f||f===0)e+=f;return e+='\n            </ul>\n            <div class="clear"></div>\n        </div>\n    ',e}function m(a,b){var d;return d=a.abandoned,d=c.unless.call(a,d,{hash:{},inverse:h.noop,fn:h.program(4,n,b)}),d||d===0?d:""}function n(a,b){return"complete"}function o(a,b){var d="",e,f;return d+='\n                <span class="goal-title">',f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===i?e():e),d+=j(e)+"</span>\n                ",d}function p(a,b){var d="",e,f;return d+='\n                <input type="text" name="title" class="goal-title simple-input ui-corner-all blur-on-esc" placeholder="',f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===i?e():e),d+=j(e)+'" value="',f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===i?e():e),d+=j(e)+'"></input>\n                ',d}function q(a,b){var d="",e,f;return d+='<span class="summary-light">(started ',f=c.created_ago,f?e=f.call(a,{hash:{}}):(e=a.created_ago,e=typeof e===i?e():e),d+=j(e)+")</span>",d}function r(a,b){var d="",e,f;return d+='<span class="summary-light">(completed ',f=c.completed_ago,f?e=f.call(a,{hash:{}}):(e=a.completed_ago,e=typeof e===i?e():e),d+=j(e)+" in ",f=c.completed_time,f?e=f.call(a,{hash:{}}):(e=a.completed_time,e=typeof e===i?e():e),d+=j(e)+")</span>",d}function s(a,b){var d="",e,f;return d+='<span class="summary-light">(abandoned ',f=c.completed_ago,f?e=f.call(a,{hash:{}}):(e=a.completed_ago,e=typeof e===i?e():e),d+=j(e)+")</span>",d}function t(a,b){var d="",e,f;return d+='\n                <span class="goal-controls">\n                    <a class="abandon simple-button action-gradient" href="javascript:void(0)" id="goal-abandon-',f=c.id,f?e=f.call(a,{hash:{}}):(e=a.id,e=typeof e===i?e():e),d+=j(e)+'">Abandon</a>\n                </span>\n                ',d}function u(a,b){var e="",f;e+="\n                ",f=a,f=h.invokePartial(d["shared_goal-objectives"],"shared_goal-objectives",f,c,d);if(f||f===0)e+=f;return e+="\n            ",e}function v(a,b){var d="",e;d+="\n    ",e=a.readonly,e=c["if"].call(a,e,{hash:{},inverse:h.program(23,x,b),fn:h.program(21,w,b)});if(e||e===0)d+=e;return d+="\n",d}function w(a,b){return"\n        Nothing to show here!\n    "}function x(a,b){var e="",f;e+="\n        ",f=a,f=h.invokePartial(d["shared_goal-new"],"shared_goal-new",f,c,d);if(f||f===0)e+=f;return e+="\n    ",e}c=c||a.helpers,d=d||a.partials;var f="",g,h=this,i="function",j=this.escapeExpression;g=b.goals,g=c["if"].call(b,g,{hash:{},inverse:h.program(20,v,e),fn:h.program(1,k,e)});if(g||g===0)f+=g;return f+="\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_exercise_progress"]=a(function(a,b,c,d,e){function m(a,b){var d="",e,f;return d+='\n  <div class="student-module-status exercise-progress-block exercise-color ',f=c.color,f?e=f.call(a,{hash:{}}):(e=a.color,e=typeof e===i?e():e),d+=j(e)+'"\n       id="exercise-',f=c.name,f?e=f.call(a,{hash:{}}):(e=a.name,e=typeof e===i?e():e),d+=j(e)+'">\n	  <span class="exercise-display-name"><nobr>',f=c.shortName,f?e=f.call(a,{hash:{}}):(e=a.shortName,e=typeof e===i?e():e),d+=j(e)+'</nobr></span>\n    <div class="hover-data" style="display: none;">\n      <div class=exercise-display-name>',f=c.displayName,f?e=f.call(a,{hash:{}}):(e=a.displayName,e=typeof e===i?e():e),d+=j(e)+"</div>\n      <div class=exercise-status>Status: ",f=c.status,f?e=f.call(a,{hash:{}}):(e=a.status,e=typeof e===i?e():e),d+=j(e)+"</div>\n      <div class=exercise-progress>Progress: ",f=c.progress,f?e=f.call(a,{hash:{}}):(e=a.progress,e=typeof e===i?e():e),d+=j(e)+"</div>\n      <div class=exercise-done>Problems attempted: ",f=c.totalDone,f?e=f.call(a,{hash:{}}):(e=a.totalDone,e=typeof e===i?e():e),d+=j(e)+'</div>\n    </div>\n		<div style="clear:both"></div>\n  </div>\n  ',d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+='<div id="module-progress" class="clearfix">\n  ',h=c.exercises,h?g=h.call(b,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}):(g=b.exercises,g=typeof g===i?g():g),c.exercises||(g=l.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}));if(g||g===0)f+=g;return f+="\n</div>\n",f})})();
var GoalProfileView = Backbone.View.extend({
    template: Templates.get("profile.profile-goals"),
    needsRerender: true,

    initialize: function() {
        this.model.bind("change", this.render, this);
        this.model.bind("reset", this.render, this);
        this.model.bind("remove", this.render, this);
        this.model.bind("add", this.render, this);

        // only hookup event handlers if the view allows edits
        if (this.options.readonly) {
            return;
        }

        $(this.el)
            // edit titles
            .delegate("input.goal-title", "focusout", $.proxy(this.changeTitle, this))
            .delegate("input.goal-title", "keypress", $.proxy(function(e) {
                if (e.which == "13") { // enter
                    e.preventDefault();
                    this.changeTitle(e);
                    $(e.target).blur();
                }
            }, this))
            .delegate("input.goal-title", "keyup", $.proxy(function(e) {
                if (e.which == "27") { // escape
                    e.preventDefault();

                    // restore old title
                    var jel = $(e.target);
                    var goal = this.model.get(jel.closest(".goal").data("id"));
                    jel.val(goal.get("title"));

                    jel.blur();
                }
            }, this))

            // show abandon button on hover
            .delegate(".goal", "mouseenter mouseleave", function(e) {
                var el = $(e.currentTarget);
                if (e.type == "mouseenter") {
                    el.find(".goal-description .summary-light").hide();
                    el.find(".goal-description .goal-controls").show();
                } else {
                    el.find(".goal-description .goal-controls").hide();
                    el.find(".goal-description .summary-light").show();
                }
            })
            // respond to abandon button
            .delegate(".abandon", "click", $.proxy(this.abandon, this));
    },

    changeTitle: function(e, options) {
        var jel = $(e.target);
        var goal = this.model.get(jel.closest(".goal").data("id"));
        var newTitle = jel.val();
        if (newTitle !== goal.get("title")) {
            goal.save({title: newTitle});
        }
    },

    show: function() {
        // render if necessary
        if (this.needsRerender) {
            this.render();
        }
        return $(this.el).show();
    },

    hide: function() {
        $(this.el).hide();
    },

    render: function() {
        var jel = $(this.el);
        // delay rendering until the view is actually visible
        this.needsRerender = false;
        var json = _.pluck(this.model.models, "attributes");
        jel.html(this.template({
            goals: json,
            isCurrent: (this.options.type == "current"),
            isCompleted: (this.options.type == "completed"),
            isAbandoned: (this.options.type == "abandoned"),
            readonly: this.options.readonly,
            colors: this.options.colors
        }));

        // attach a NewGoalView to the new goals html
        var newGoalEl = this.$(".goalpicker");
        if (newGoalEl.length > 0) {
            this.newGoalsView = new NewGoalView({
                el: newGoalEl,
                model: this.model
            });
        }

        Profile.hoverContent(jel.find(".objective"), "#profile-goals-content");
        return jel;
    },

    abandon: function(evt) {
        var goalEl = $(evt.target).closest(".goal");
        var goal = this.model.get(goalEl.data("id"));
        if (!goal) {
            // haven't yet received a reponse from the server after creating the
            // goal. Shouldn't happen too often, so just show a message.
            alert("Please wait a few seconds and try again. If this is the second time you've seen this message, reload the page");
            return;
        }

        if (confirm("Abandoning a goal is permanent and cannot be undone. Do you really want to abandon this goal?")) {
            // move the model to the abandoned collection
            this.model.remove(goal);
            goal.set({"abandoned": true});
            AbandonedGoalBook.add(goal);

            // persist to server
            goal.save().fail(function() {
                KAConsole.log("Warning: failed to abandon goal", goal);
                AbandonedGoalBook.remove(goal);
                this.model.add(goal);
            });
        }
    }
});

var GoalProfileViewsCollection = {
    views: {},

    render: function(data) {
        var viewingOwnGoals = Profile.profile.get("isSelf"),
            current_goals = [],
            completed_goals = [],
            abandoned_goals = [];

        $.each(data, function(idx, goal) {
            if (goal.completed) {
                if (goal.abandoned) {
                    abandoned_goals.push(goal);
                } else {
                    completed_goals.push(goal);
                }
            } else {
                current_goals.push(goal);
            }
        });
        if (viewingOwnGoals) {
            GoalBook.reset(current_goals);
        } else {
            CurrentGoalBook = new GoalCollection(current_goals);
        }

        CompletedGoalBook = new GoalCollection(completed_goals);
        AbandonedGoalBook = new GoalCollection(abandoned_goals);

        $("#profile-goals-content").html('<div id="current-goals-list"></div><div id="completed-goals-list"></div><div id="abandoned-goals-list"></div>');

        this.views.current = new GoalProfileView({
            el: "#current-goals-list",
            model: viewingOwnGoals ? GoalBook : CurrentGoalBook,
            type: "current",
            readonly: !viewingOwnGoals
        });
        this.views.completed = new GoalProfileView({
            el: "#completed-goals-list",
            model: CompletedGoalBook,
            type: "completed",
            readonly: true
        });
        this.views.abandoned = new GoalProfileView({
            el: "#abandoned-goals-list",
            model: AbandonedGoalBook,
            type: "abandoned",
            readonly: true
        });

        if (viewingOwnGoals) {
            $(".new-goal").addClass("green").removeClass("disabled").click(function(e) {
                e.preventDefault();
                window.newGoalDialog.show();
            });
        }

        // Because we wait for a response from /api/v1/user/goals to render the collection,
        // a view can be selected by the user before they exist (either by
        // navigating directly to /profile/username/goals/abandoned or clicking quickly).
        var jel = $("#tab-content-goals .graph-picker .type"),
            selectedType = "current";
        $.each(this.views, function(index, view) {
            if (jel.filter("." + view.options.type).hasClass("selected")) {
                selectedType = view.options.type;
                return false;
            }
        });

        this.showGoalType(selectedType);
    },

    showGoalType: function(type) {
        var view = this.views[type];
        if (view) {
            view.show().siblings().hide();
        }

        $(".graph-picker").find("." + type).addClass("selected")
            .siblings().removeClass("selected");
    }
};
;
/**
 * Code to handle the logic for the profile page.
 */
// TODO: clean up all event listeners. This page does not remove any
// event listeners when tearing down the graphs.

var Profile = {
    version: 0,
    email: null,  // Filled in by the template after script load.
    fLoadingGraph: false,
    fLoadedGraph: false,
    profile: null,

    /**
     * The root segment of the URL for the profile page for this user.
     * Will be of the form "/profile/<identifier>" where identifier
     * can be a username, or other identifier sent by the server.
     */
    profileRoot: "",

    /**
     * Whether or not we can collect sensitive information like the user's
     * name. Users under 13 without parental consent should not be able
     * to enter data.
     */
    isDataCollectible: false,

    /**
     * Overridden w profile-intro.js if necessary
     */
    showIntro_: function() {},

    /**
     * Called to initialize the profile page. Passed in with JSON information
     * rendered from the server. See templates/viewprofile.html for details.
     */
    init: function(json) {
        this.profile = new ProfileModel(json.profileData);
        this.profile.bind("savesuccess", this.onProfileUpdated_, this);

        var root = json.profileRoot;
        if (window.location.pathname.indexOf("@") > -1) {
            // Note the path should be encoded so that @ turns to %40. However,
            // there is a bug (https://bugs.webkit.org/show_bug.cgi?id=30225)
            // that makes Safari always return the decoded part. Also, if
            // the user manually types in an @ sign, it will be returned
            // decoded. So we need to be robust to this.
            root = decodeURIComponent(root);
        }

        this.profileRoot = root;
        this.isDataCollectible = json.isDataCollectible;
        this.secureUrlBase = json.secureUrlBase;
        UserCardView.countVideos = json.countVideos;
        UserCardView.countExercises = json.countExercises;

        Profile.render();

        Profile.router = new Profile.TabRouter({routes: this.buildRoutes_()});
        Profile.router.bind("all", Analytics.handleRouterNavigation);

        Backbone.history.start({
            pushState: true,
            root: this.profileRoot
        });

        Profile.showIntro_();

        // Remove goals from IE<=8
        $(".lte8 .goals-accordion-content").remove();

        // Init Highcharts global options
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

        var navElementHandler = _.bind(this.onNavigationElementClicked_, this);
        // Delegate clicks for tab navigation
        $(".profile-navigation .vertical-tab-list").delegate("a",
                "click", navElementHandler);

        // Delegate clicks for vital statistics time period navigation
        $("#tab-content-vital-statistics").delegate(".graph-date-picker a",
                "click", navElementHandler);

        $("#tab-content-goals").delegate(".graph-picker .type a",
                "click", navElementHandler);

        // Delegate clicks for recent badge-related activity
        $(".achievement .ach-text").delegate("a", "click", function(event) {
            if (!event.metaKey) {
                event.preventDefault();
                Profile.router.navigate("achievements", true);
                $("#achievement-list ul li#category-" + $(this).data("category")).click();
            }
        });
    },

    /**
     * All the tabs that you could encounter on the profile page.
     */
    subRoutes: {
        "achievements": "showAchievements",
        "goals/:type": "showGoals",
        "goals": "showGoals",
        "vital-statistics": "showVitalStatistics",
        "vital-statistics/problems/:exercise": "showExerciseProblems",
        "vital-statistics/:graph/:timePeriod": "showVitalStatisticsForTimePeriod",
        "vital-statistics/:graph": "showVitalStatistics",
        "coaches": "showCoaches",
        "discussion": "showDiscussion",
        // Not associated with any tab highlighting.
        "settings": "showSettings",

        "": "showDefault",
        // If the user types /profile/username/ with a trailing slash
        // it should work, too
        "/": "showDefault",

        // If any old or crazy vital-statistics route is passed that we no longer support
        // and therefore hasn't matched yet, just show the default vital statistics graph.
        "vital-statistics/*path": "showVitalStatistics",

        // A minor hack to ensure that if the user navigates to /profile without
        // her username, it still shows the default profile screen. Note that
        // these routes aren't relative to the root URL, but will still work.
        "profile": "showDefault",
        "profile/": "showDefault",
        // And for the mobile app... hopefully we can find a better fix.
        "profile?view=mobile": "showDefault"
    },

    /**
     * Generate routes hash to be used by Profile.router
     */
    buildRoutes_: function() {
        var routes = this.subRoutes;
        var n = this.profileRoot.length;

        // Yet another hack: we want to allow /profile/bob to navigate
        // to the profile root, even though the root is /profile/bob/.
        // To do this, we create a pathName without leading/trailing
        // slash to show the default page.
        if (this.profileRoot.lastIndexOf("/") === n - 1) {
            var profileRootNoSlash = this.profileRoot.substr(1, n - 2);
            routes[profileRootNoSlash] = "showDefault";
        }
        return routes;
    },

    /**
     * Handle a change to the profile root.
     */
    onProfileUpdated_: function() {
        var username = this.profile.get("username");
        if (username && Profile.profileRoot != ("/profile/" + username + "/")) {
            // Profile root changed - we need to reload the page since
            // Backbone.router isn't happy when the root changes.
            window.location.replace("/profile/" + username + "/");
        }
    },

    TabRouter: Backbone.Router.extend({
        showDefault: function() {
            Profile.populateActivity().then(function() {
                // Pre-fetch badges, after the activity has been loaded, since
                // they're needed to edit the display-case.
                if (Profile.profile.isEditable()) {
                    Profile.populateAchievements();
                }
            });
            $("#tab-content-user-profile").show().siblings().hide();
            this.activateRelatedTab($("#tab-content-user-profile").attr("rel"));
            this.updateTitleBreadcrumbs();
        },

        showVitalStatistics: function(graph, exercise, timePeriod) {
            var exercise = exercise || "addition_1";
            var identityParam = "";
            if (Profile.profile.get("email")) {
                identityParam = "email=" +
                        encodeURIComponent(Profile.profile.get("email"));
            } else if (Profile.profile.get("username")) {
                identityParam = "username=" + Profile.profile.get("username");
            }

            var hrefLookup = {
                    "activity": "/profile/graph/activity?" + identityParam,
                    "focus": "/profile/graph/focus?" + identityParam,
                    "skill-progress-over-time": "/profile/graph/exercisesovertime?" + identityParam,
                    "skill-progress": "/api/v1/user/exercises?" + identityParam,
                    "problems": "/profile/graph/exerciseproblems?" +
                                            "exercise_name=" + exercise +
                                            "&" + identityParam
                },
                timePeriodLookup = {
                    "today": "&dt_start=today",
                    "yesterday": "&dt_start=yesterday",
                    "last-week": "&dt_start=lastweek&dt_end=today",
                    "last-month": "&dt_start=lastmonth&dt_end=today"
                },
                graph = !!(hrefLookup[graph]) ? graph : "activity",
                timePeriod = !!(timePeriodLookup[timePeriod]) ? timePeriod : "last-week",
                timeURLParameter = timePeriodLookup[timePeriod],
                href = hrefLookup[graph] + timeURLParameter;

            // Known bug: the wrong graph-date-picker item is selected when
            // server man decides to show 30 days instead of the default 7.
            // See redirect_for_more_data in util_profile.py for more on this tragedy.
            $("#tab-content-vital-statistics").show()
                .find(".vital-statistics-description ." + graph).show()
                    .find(".graph-date-picker .tabrow .last-week").addClass("selected")
                        .siblings().removeClass("selected").end()
                    .end()
                    .siblings().hide().end()
                .end().siblings().hide();

            this.activateRelatedTab($("#tab-content-vital-statistics").attr("rel") + " " + graph);
            var prettyGraphName = graph.replace(/-/gi, " ");
            if (graph == "problems") {
                var prettyExName = exercise.replace(/_/gi, " ");
                this.updateTitleBreadcrumbs([prettyGraphName, prettyExName]);
            }
            else {
                this.updateTitleBreadcrumbs([prettyGraphName]);
            }

            if (Profile.profile.isFullyAccessible()) {
                // If we have access to the profiled person's email, load real data.
                Profile.loadGraph(href);
            } else {
                // Otherwise, show some fake stuff.
                Profile.renderFakeGraph(graph, timePeriod);
            }
        },

        showExerciseProblems: function(exercise) {
            this.showVitalStatistics("problems", exercise);
        },

        showVitalStatisticsForTimePeriod: function(graph, timePeriod) {
            this.showVitalStatistics(graph, null, timePeriod);
            $(".vital-statistics-description ." + graph + " ." + timePeriod).addClass("selected")
                .siblings().removeClass("selected");
        },

        showAchievements: function() {
            Profile.populateAchievements();
            $("#tab-content-achievements").show()
                .siblings().hide();
            this.activateRelatedTab($("#tab-content-achievements").attr("rel"));
            this.updateTitleBreadcrumbs(["Achievements"]);
        },

        showGoals: function(type) {
            type = type || "current";
            Profile.populateGoals();

            GoalProfileViewsCollection.showGoalType(type);

            $("#tab-content-goals").show()
                .siblings().hide();
            this.activateRelatedTab($("#tab-content-goals").attr("rel"));
            this.updateTitleBreadcrumbs(["Goals"]);
        },

        showCoaches: function() {
            Profile.populateCoaches();

            $("#tab-content-coaches").show()
                .siblings().hide();

            this.activateRelatedTab("community coaches");
            this.updateTitleBreadcrumbs(["Coaches"]);

            if (Profile.profile.get("isPhantom")) {
                Profile.showNotification("no-coaches-for-phantoms");
            }
        },

        showDiscussion: function() {
            $("#tab-content-discussion").show()
                .siblings().hide();

            this.activateRelatedTab("community discussion");
            this.updateTitleBreadcrumbs(["Discussion"]);

            Profile.populateDiscussion();
        },

        settingsIframe_: null,
        showSettings: function() {
            // Password change forms need to happen in an iframe since it needs
            // to be POST'ed to a different domain (with https), and redirected
            // back with information on error/success.
            if (!Profile.settingsIframe_) {
                Profile.settingsIframe_ = $("<iframe></iframe>")
                        .attr("src", "/pwchange")
                        .attr("frameborder", "0")
                        .attr("scrolling", "no")
                        .attr("allowtransparency", "yes")
                        .attr("id", "settings-iframe")
                        .attr("class", "settings-iframe")
                        .appendTo($("#tab-content-settings"));
            }

            // Show.
            $("#tab-content-settings").show().siblings().hide();
            this.activateRelatedTab("");
            this.updateTitleBreadcrumbs(["Settings"]);
        },

        activateRelatedTab: function(rel) {
            $(".profile-navigation .vertical-tab-list a").removeClass("active-tab");
            $("a[rel='" + rel + "']").addClass("active-tab");
        },

        /**
         * Updates the title of the profile page to show breadcrumbs
         * based on the parts in the specified array. Will always pre-pend the profile
         * nickname.
         * @param {Array.<string>} parts A list of strings that will be HTML-escaped
         *     to be the breadcrumbs.
         */
        updateTitleBreadcrumbs: function(parts) {
            $(".profile-notification").hide();

            var sheetTitle = $(".profile-sheet-title");
            if (parts && parts.length) {
                var rootCrumb = Profile.profile.get("nickname") || "Profile";
                parts.unshift(rootCrumb);
                sheetTitle.text(parts.join(" » ")).show();

                if (!Profile.profile.isFullyAccessible()) {
                    $(".profile-notification").show();
                }
            } else {
                sheetTitle.text("").hide();
            }
        }
    }),

    /**
     * Navigate the router appropriately,
     * either to change profile sheets or vital-stats time periods.
     */
    onNavigationElementClicked_: function(e) {
        // TODO: Make sure middle-click + windows control-click Do The Right Thing
        // in a reusable way
        if (!e.metaKey) {
            e.preventDefault();
            var route = $(e.currentTarget).attr("href");
            // The navigation elements have the profileRoot in the href, but
            // Router.navigate should be relative to the root.
            if (route.indexOf(this.profileRoot) === 0) {
                route = route.substring(this.profileRoot.length);
            }
            Profile.router.navigate(route, true);
        }
    },

    loadGraph: function(href) {
        var apiCallbacksTable = {
            "/api/v1/user/exercises": this.renderExercisesTable,
            "/api/v1/exercises": this.renderFakeExercisesTable_
        };
        if (!href) {
            return;
        }

        if (this.fLoadingGraph) {
            setTimeout(function() {Profile.loadGraph(href);}, 200);
            return;
        }

        this.fLoadingGraph = true;
        this.fLoadedGraph = false;

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
            dataType: apiCallback ? "json" : "html",
            success: function(data) {
                Profile.finishLoadGraph(data, apiCallback);
            },
            error: function() {
                Profile.finishLoadGraphError();
            }
        });
        $("#graph-content").html("");
        this.showGraphThrobber(true);
    },

    finishLoadGraph: function(data, apiCallback) {
        this.fLoadingGraph = false;
        this.showGraphThrobber(false);

        var start = (new Date).getTime();
        if (apiCallback) {
            apiCallback(data);
        } else {
            $("#graph-content").html(data);
        }
        var diff = (new Date).getTime() - start;
        KAConsole.log("API call rendered in " + diff + " ms.");

        this.fLoadedGraph = true;
    },

    finishLoadGraphError: function() {
        this.fLoadingGraph = false;
        this.showGraphThrobber(false);
        Profile.showNotification("error-graph");
    },

    renderFakeGraph: function(graphName, timePeriod) {
        if (graphName === "activity") {
            ActivityGraph.render(null, timePeriod);
            Profile.fLoadedGraph = true;
        } else if (graphName === "focus") {
            FocusGraph.render();
            Profile.fLoadedGraph = true;
        } else if (graphName === "skill-progress") {
            Profile.loadGraph("/api/v1/exercises");
        } else {
            ExerciseGraphOverTime.render();
            Profile.fLoadedGraph = true;
        }
    },

    generateFakeExerciseTableData_: function(exerciseData) {
        // Generate some vaguely plausible exercise progress data
        return _.map(exerciseData, function(exerciseModel) {
            // See models.py -- h_position corresponds to the node's vertical position
            var position = exerciseModel["h_position"],
                totalDone = 0,
                states = {},
                rand = Math.random();
            if (position < 10) {
                if (Math.random() < 0.9) {
                    totalDone = 1;
                    if (rand < 0.5) {
                        states["proficient"] = true;
                    } else if (rand < 0.7) {
                        states["reviewing"] = true;
                    }
                }
            } else if (position < 17) {
                if (Math.random() < 0.6) {
                    totalDone = 1;
                    if (rand < 0.4) {
                        states["proficient"] = true;
                    } else if (rand < 0.7) {
                        states["reviewing"] = true;
                    } else if (rand < 0.75) {
                        states["struggling"] = true;
                    }
                }
            } else {
                if (Math.random() < 0.1) {
                    totalDone = 1;
                    if (rand < 0.2) {
                        states["proficient"] = true;
                    } else if (rand < 0.5) {
                        states["struggling"] = true;
                    }
                }
            }
            return {
                "exercise_model": exerciseModel,
                "total_done": totalDone,
                "exercise_states": states
            };
        });
    },

    renderFakeExercisesTable_: function(exerciseData) {
        // Do nothing if the user switches sheets before /api/v1/exercises responds
        // (The other fake sheets are rendered randomly client-side)

        if (Profile.fLoadedGraph) {
            return;
        }

        var fakeData = Profile.generateFakeExerciseTableData_(exerciseData);

        Profile.renderExercisesTable(fakeData, false);

        $("#module-progress").addClass("empty-chart");
    },

    /**
     * Renders the exercise blocks given the JSON blob about the exercises.
     */
    renderExercisesTable: function(data, bindEvents) {
        var templateContext = [],
            bindEvents = (bindEvents === undefined) ? true : bindEvents,
            isEmpty = true,
            exerciseModels = [];


        for (var i = 0, exercise; exercise = data[i]; i++) {
            var stat = "Not started";
            var color = "";
            var states = exercise["exercise_states"];
            var totalDone = exercise["total_done"];

            if (totalDone > 0) {
                isEmpty = false;
            }

            if (states["reviewing"]) {
                stat = "Review";
                color = "review light";
            } else if (states["proficient"]) {
                // TODO: handle implicit proficiency - is that data in the API?
                // (due to proficiency in a more advanced module)
                stat = "Proficient";
                color = "proficient";
            } else if (states["struggling"]) {
                stat = "Struggling";
                color = "struggling";
            } else if (totalDone > 0) {
                stat = "Started";
                color = "started";
            }

            if (color) {
                color = color + " action-gradient seethrough";
            } else {
                color = "transparent";
            }
            var model = exercise["exercise_model"];
            exerciseModels.push(model);
            templateContext.push({
                "name": model["name"],
                "color": color,
                "status": stat,
                "shortName": model["short_display_name"] || model["display_name"],
                "displayName": model["display_name"],
                "progress": Math.floor(exercise["progress"] * 100) + "%",
                "totalDone": totalDone
            });
        }

        if (isEmpty) {
            Profile.renderFakeExercisesTable_(exerciseModels);
            Profile.showNotification("empty-graph");
            return;
        }

        var template = Templates.get("profile.exercise_progress");
        $("#graph-content").html(template({ "exercises": templateContext }));

        if (bindEvents) {
            Profile.hoverContent($("#module-progress .student-module-status"));
            $("#module-progress .student-module-status").click(function(e) {
                $("#info-hover-container").hide();
                // Extract the name from the ID, which has been prefixed.
                var exerciseName = this.id.substring("exercise-".length);
                Profile.router.navigate("vital-statistics/problems/" + exerciseName, true);
            });
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

    /**
     * Show a profile notification
     * Expects the class name of the div to show, such as "error-graph"
     */
    showNotification: function(className) {
        var jel = $(".profile-notification").removeClass("uncover-nav");

        if (className === "empty-graph" || className === "no-discussion") {
            jel.addClass("uncover-nav");
        }

        jel.show()
            .find("." + className).show()
            .siblings().hide();
    },

    hoverContent: function(elements, containerSelector) {
        var lastHoverTime,
            mouseX,
            mouseY;

        containerSelector = containerSelector || "#graph-content";

        elements.hover(
            function(e) {
                var hoverTime = +(new Date()),
                    el = this;
                lastHoverTime = hoverTime;
                mouseX = e.pageX;
                mouseY = e.pageY;

                setTimeout(function() {
                    if (hoverTime !== lastHoverTime) {
                        return;
                    }

                    var hoverData = $(el).children(".hover-data"),
                        html = $.trim(hoverData.html());

                    if (html) {
                        var jelContainer = $(containerSelector),
                            leftMax = jelContainer.offset().left + jelContainer.width() - 150,
                            left = Math.min(mouseX + 15, leftMax),
                            jHoverEl = $("#info-hover-container");

                        if (jHoverEl.length === 0) {
                            jHoverEl = $('<div id="info-hover-container"></div>').appendTo("body");
                        }

                        jHoverEl
                            .html(html)
                            .css({left: left, top: mouseY + 5})
                            .show();
                    }
                }, 100);
            },
            function(e) {
                lastHoverTime = null;
                $("#info-hover-container").hide();
            }
        );
    },

    render: function() {
        var profileTemplate = Templates.get("profile.profile");
        Handlebars.registerHelper("graph-date-picker-wrapper", function(block) {
            this.graph = block.hash.graph;
            return block(this);
        });
        Handlebars.registerPartial("profile_graph-date-picker", Templates.get("profile.graph-date-picker"));
        Handlebars.registerPartial("profile_vital-statistics", Templates.get("profile.vital-statistics"));

        $("#profile-content").html(profileTemplate({
            profileRoot: this.profileRoot,
            profileData: this.profile.toJSON(),
            countVideos: UserCardView.countVideos,
            countExercises: UserCardView.countExercises
        }));

        // Show only the user card tab,
        // since the Backbone default route isn't triggered
        // when visiting khanacademy.org/profile
        $("#tab-content-user-profile").show().siblings().hide();

        Profile.populateUserCard();

        this.profile.bind("change:nickname", function(profile) {
            var nickname = profile.get("nickname") || "Profile";
            $("#profile-tab-link").text(nickname);
            $("#top-header-links .user-name a").text(nickname);
        });
        this.profile.bind("change:avatarSrc", function(profile) {
            var src = profile.get("avatarSrc");
            $(".profile-tab-avatar").attr("src", src);
            $("#top-header #user-info .user-avatar").attr("src", src);
        });
    },

    userCardPopulated_: false,
    populateUserCard: function() {
        if (Profile.userCardPopulated_) {
            return;
        }
        var view = new UserCardView({model: this.profile});
        $(".user-info-container").html(view.render().el);

        var publicBadgeList = new Badges.BadgeList(
                this.profile.get("publicBadges"));
        publicBadgeList.setSaveUrl("/api/v1/user/badges/public");
        var displayCase = new Badges.DisplayCase({ model: publicBadgeList });
        $(".sticker-book").append(displayCase.render().el);
        Profile.displayCase = displayCase;

        Profile.userCardPopulated_ = true;
    },

    achievementsDeferred_: null,
    populateAchievements: function() {
        if (Profile.achievementsDeferred_) {
            return Profile.achievementsDeferred_;
        }
        // Asynchronously load the full badge information in the background.
        return Profile.achievementsDeferred_ = $.ajax({
            type: "GET",
            url: "/api/v1/user/badges",
            data: {
                casing: "camel",
                email: USER_EMAIL
              },
            dataType: "json",
            success: function(data) {
                if (Profile.profile.isEditable()) {
                    // The display-case is only editable if you're viewing your
                    // own profile

                    // TODO: save and cache these objects
                    var fullBadgeList = new Badges.UserBadgeList();

                    var collection = data["badgeCollections"];
                    $.each(collection, function(i, categoryJson) {
                        $.each(categoryJson["userBadges"], function(j, json) {
                            fullBadgeList.add(new Badges.UserBadge(json));
                        });
                    });
                    Profile.displayCase.setFullBadgeList(fullBadgeList);
                }

                // TODO: make the rendering of the full badge page use the models above
                // and consolidate the information

                var badgeInfo = [
                        {
                            icon: "/images/badges/meteorite-medium.png",
                            className: "bronze",
                            label: "Meteorite"
                        },
                        {
                            icon: "/images/badges/moon-medium.png",
                            className: "silver",
                            label: "Moon"
                        },
                        {
                            icon: "/images/badges/earth-medium.png",
                            className: "gold",
                            label: "Earth"
                        },
                        {
                            icon: "/images/badges/sun-medium.png",
                            className: "diamond",
                            label: "Sun"
                        },
                        {
                            icon: "/images/badges/eclipse-medium.png",
                            className: "platinum",
                            label: "Black Hole"
                        },
                        {
                            icon: "/images/badges/master-challenge-blue.png",
                            className: "master",
                            label: "Challenge"
                        }
                    ];

                Handlebars.registerHelper("toMediumIconSrc", function(category) {
                    return badgeInfo[category].icon;
                });

                Handlebars.registerHelper("toBadgeClassName", function(category) {
                    return badgeInfo[category].className;
                });

                Handlebars.registerHelper("toBadgeLabel", function(category, fStandardView) {
                    var label = badgeInfo[category].label;

                    if (fStandardView) {
                        if (label === "Challenge") {
                            label += " Patches";
                        } else {
                            label += " Badges";
                        }
                    }
                    return label;
                });

                Handlebars.registerPartial(
                        "profile_badge-container",
                        Templates.get("profile.badge-container"));
                Handlebars.registerPartial(
                        "profile_badge",
                        Templates.get("profile.badge"));
                Handlebars.registerPartial(
                        "profile_user-badge",
                        Templates.get("profile.user-badge"));

                $.each(data["badgeCollections"], function(collectionIndex, collection) {
                    $.each(collection["userBadges"], function(badgeIndex, badge) {
                        var targetContextNames = badge["targetContextNames"];
                        var numHidden = targetContextNames.length - 1;
                        badge["visibleContextName"] = targetContextNames[0] || "";
                        badge["listContextNamesHidden"] = $.map(
                            targetContextNames.slice(1),
                            function(name, nameIndex) {
                                return {
                                    name: name,
                                    isLast: (nameIndex === numHidden - 1)
                                };
                            });
                        badge["hasMultiple"] = (badge["count"] > 1);
                    });
                });

                // TODO: what about mobile-view?
                data.fStandardView = true;

                var achievementsTemplate = Templates.get("profile.achievements");
                $("#tab-content-achievements").html(achievementsTemplate(data));

                $("#achievements #achievement-list > ul li").click(function() {
                     var category = $(this).attr("id");
                     var clickedBadge = $(this);

                     $("#badge-container").css("display", "");

                     clickedBadge.siblings().removeClass("selected");

                     if ($("#badge-container > #" + category).is(":visible")) {
                        if (clickedBadge.parents().hasClass("standard-view")) {
                            $("#badge-container > #" + category).slideUp(300, function() {
                                    $("#badge-container").css("display", "none");
                                    clickedBadge.removeClass("selected");
                                });
                        }
                        else {
                            $("#badge-container > #" + category).hide();
                            $("#badge-container").css("display", "none");
                            clickedBadge.removeClass("selected");
                        }
                     }
                     else {
                        var jelContainer = $("#badge-container");
                        var oldHeight = jelContainer.height();
                        $(jelContainer).children().hide();
                        if (clickedBadge.parents().hasClass("standard-view")) {
                            $(jelContainer).css("min-height", oldHeight);
                            $("#" + category, jelContainer).slideDown(300, function() {
                                $(jelContainer).animate({"min-height": 0}, 200);
                            });
                        } else {
                            $("#" + category, jelContainer).show();
                        }
                        clickedBadge.addClass("selected");
                     }
                });

                $("abbr.timeago").timeago();

                // Start with meteorite badges displayed
                $("#category-0").click();

                // TODO: move into profile-goals.js?
                var currentGoals = window.GoalBook.map(function(g) { return g.get("title"); });
                _($(".add-goal")).map(function(elt) {
                    var button = $(elt);
                    var badge = button.closest(".achievement-badge");
                    var goalTitle = badge.find(".achievement-title").text();

                    // remove +goal button if present in list of active goals
                    if (_.indexOf(currentGoals, goalTitle) > -1) {

                        button.remove();

                    // add +goal behavior to button, once.
                    } else {
                        button.one("click", function() {
                            var goalObjectives = _(badge.data("objectives")).map(function(exercise) {
                                return {
                                    "type" : "GoalObjectiveExerciseProficiency",
                                    "internal_id" : exercise
                                };
                            });

                            var goal = new Goal({
                                title: goalTitle,
                                objectives: goalObjectives
                            });

                            window.GoalBook.add(goal);

                            goal.save()
                                .fail(function(err) {
                                    var error = err.responseText;
                                    button.addClass("failure")
                                        .text("oh no!").attr("title", "This goal could not be saved.");
                                    KAConsole.log("Error while saving new badge goal", goal);
                                    window.GoalBook.remove(goal);
                                })
                                .success(function() {
                                    button.text("Goal Added!").addClass("success");
                                    badge.find(".energy-points-badge").addClass("goal-added");
                                });
                        });
                    }
                });
            }
        });
    },

    goalsDeferred_: null,
    populateGoals: function() {
        if (Profile.goalsDeferred_) {
            return Profile.goalsDeferred_;
        }

        if (Profile.profile.isFullyAccessible()) {
            Profile.goalsDeferred_ = $.ajax({
                type: "GET",
                url: "/api/v1/user/goals",
                data: Profile.getBaseRequestParams_(),
                dataType: "json",
                success: function(data) {
                    GoalProfileViewsCollection.render(data);
                }
            });
        } else {
            Profile.renderFakeGoals_();
            Profile.goalsDeferred_ = new $.Deferred();
            Profile.goalsDeferred_.resolve();
        }
        return Profile.goalsDeferred_;
    },

    renderFakeGoals_: function() {
        var exerciseGoal = new Goal(Goal.defaultExerciseProcessGoalAttrs_),
            videoGoal = new Goal(Goal.defaultVideoProcessGoalAttrs_),
            fakeGoalBook = new GoalCollection([exerciseGoal, videoGoal]),
            fakeView = new GoalProfileView({model: fakeGoalBook});

        $("#profile-goals-content").append(fakeView.show().addClass("empty-chart"));
    },

    coachesDeferred_: null,
    populateCoaches: function() {
        if (Profile.coachesDeferred_) {
            return Profile.coachesDeferred_;
        }

        Profile.coachesDeferred_ = Coaches.init();

        return Profile.coachesDeferred_;
    },

    discussionDeferred_: null,
    noDiscussion_: false,
    populateDiscussion: function() {
        if (Profile.noDiscussion_) {
            Profile.showNotification("no-discussion");
        }

        if (Profile.discussionDeferred_) {
            return Profile.discussionDeferred_;
        }

        if (Profile.profile.isFullyAccessible()) {
            Profile.discussionDeferred_ = $.ajax({
                type: "GET",
                url: "/api/v1/user/questions",
                data: Profile.getBaseRequestParams_(),
                dataType: "json",
                success: function(questions) {
                    if (questions.length === 0) {
                        Profile.noDiscussion_ = true;
                        Profile.showNotification("no-discussion");
                        return;
                    }

                    var template = Templates.get("profile.questions-list");

                    // Order questions from oldest to newest
                    questions = _.sortBy(questions, function(question) {
                        return question["lastDate"];
                    });

                    // Then reverse to get newest to oldest
                    questions.reverse();

                    $("#tab-content-discussion")
                        .append(template(questions))
                        .find("div.timeago").timeago();

                    if (Profile.profile.get("isSelf")) {
                        var initialPause = 500;
                        var rampOn = 500;
                        var hiOn = 300;
                        var rampOff = 300;

                        $("#tab-content-discussion .unread")
                            .delay(initialPause)
                            .animate({"background-color": "#dcf2fa"}, rampOn)
                            .delay(hiOn)
                            .animate({"background-color": "#ebf7fb"}, rampOff);
                    }
                }
            });
        } else {
            Profile.discussionDeferred_ = new $.Deferred();
            Profile.discussionDeferred_.resolve();
        }

        return Profile.discussionDeferred_;
    },

    populateSuggestedActivity: function(activities) {
        var suggestedTemplate = Templates.get("profile.suggested-activity");

        var attachProgress = function(activity) {
            activity.progress = activity.progress || 0;
        };
        _.each(activities["exercises"] || [], attachProgress);
        _.each(activities["videos"] || [], attachProgress);
        $("#suggested-activity").append(suggestedTemplate(activities));
    },

    populateRecentActivity: function(activities) {
        var listTemplate = Templates.get("profile.recent-activity-list"),
            exerciseTemplate = Templates.get("profile.recent-activity-exercise"),
            badgeTemplate = Templates.get("profile.recent-activity-badge"),
            videoTemplate = Templates.get("profile.recent-activity-video"),
            goalTemplate = Templates.get("profile.recent-activity-goal");

        Handlebars.registerHelper("renderActivity", function(activity) {
            _.extend(activity, {profileRoot: Profile.profileRoot});

            if (activity.sType === "Exercise") {
                return exerciseTemplate(activity);
            } else if (activity.sType === "Badge") {
                return badgeTemplate(activity);
            } else if (activity.sType === "Video") {
                return videoTemplate(activity);
            } else if (activity.sType === "Goal") {
                return goalTemplate(activity);
            }

            return "";
        });

        $("#recent-activity").append(listTemplate(activities))
            .find("span.timeago").timeago();
    },

    activityDeferred_: null,
    populateActivity: function() {
        if (Profile.activityDeferred_) {
            return Profile.activityDeferred_;
        }
        $("#recent-activity-progress-bar").progressbar({value: 100});

        if (Profile.profile.isFullyAccessible()) {
            Profile.activityDeferred_ = $.ajax({
                type: "GET",
                url: "/api/v1/user/activity",
                data: Profile.getBaseRequestParams_(),
                dataType: "json",
                success: function(data) {
                    $("#activity-loading-placeholder").fadeOut(
                            "slow", function() {
                                $(this).hide();
                            });
                    Profile.populateSuggestedActivity(data.suggested);
                    Profile.populateRecentActivity(data.recent);
                    $("#activity-contents").show();
                }
            });
        } else {
            Profile.activityDeferred_ = new $.Deferred();
            Profile.activityDeferred_.resolve();
        }
        return Profile.activityDeferred_;
    },

    /**
     * Return an object to be used in an outgoing XHR for user profile data
     * (e.g. activity graph data).
     * This includes an identifier for the current profile being viewed at,
     * and other common properties.
     */
    getBaseRequestParams_: function() {
        var params = {
            "casing": "camel"
        };
        if (Profile.profile.get("email")) {
            params["email"] = Profile.profile.get("email");
        } else if (Profile.profile.get("username")) {
            params["username"] = Profile.profile.get("username");
        }
        return params;
    }
};
