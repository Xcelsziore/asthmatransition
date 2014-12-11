/* =========================================================
 * bootstrap-modal.js v1.4.0
 * http://twitter.github.com/bootstrap/javascript.html#modal
 * =========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* CSS TRANSITION SUPPORT (https://gist.github.com/373874)
  * ======================================================= */

  var transitionEnd

  $(document).ready(function () {

    $.support.transition = (function () {
      var thisBody = document.body || document.documentElement
        , thisStyle = thisBody.style
        , support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined
      return support
    })()

    // set CSS transition event type
    if ( $.support.transition ) {
      transitionEnd = "TransitionEnd"
      if ( $.browser.webkit ) {
      	transitionEnd = "webkitTransitionEnd"
      } else if ( $.browser.mozilla ) {
      	transitionEnd = "transitionend"
      } else if ( $.browser.opera ) {
      	transitionEnd = "oTransitionEnd"
      }
    }

  })


 /* MODAL PUBLIC CLASS DEFINITION
  * ============================= */

  var Modal = function ( content, options ) {
    this.settings = $.extend({}, $.fn.modal.defaults, options)
    this.$element = $(content)
      .delegate('.close', 'click.modal', $.proxy(this.hide, this))

    if ( this.settings.show ) {
      this.show()
    }

    return this
  }

  Modal.prototype = {

      toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          that.$element
            .appendTo(document.body)
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one(transitionEnd, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })

        return this
      }

    , hide: function (e) {
        e && e.preventDefault()

        if ( !this.isShown ) {
          return this
        }

        var that = this
        this.isShown = false

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)

        return this
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    // firefox drops transitionEnd events :{o
    var that = this
      , timeout = setTimeout(function () {
          that.$element.unbind(transitionEnd)
          hideModal.call(that)
        }, 500)

    this.$element.one(transitionEnd, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal (that) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop ( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''
    if ( this.isShown && this.settings.backdrop ) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if ( this.settings.backdrop != 'static' ) {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if ( doAnimate ) {
        this.$backdrop[0].offsetWidth // force reflow
      }

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one(transitionEnd, callback) :
        callback()

    } else if ( !this.isShown && this.$backdrop ) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one(transitionEnd, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if ( callback ) {
       callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if ( this.isShown && this.settings.keyboard ) {
      $(document).bind('keyup.modal', function ( e ) {
        if ( e.which == 27 ) {
          that.hide()
        }
      })
    } else if ( !this.isShown ) {
      $(document).unbind('keyup.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( options ) {
    var modal = this.data('modal')

    if (!modal) {

      if (typeof options == 'string') {
        options = {
          show: /show|toggle/.test(options)
        }
      }

      return this.each(function () {
        $(this).data('modal', new Modal(this, options))
      })
    }

    if ( options === true ) {
      return modal
    }

    if ( typeof options == 'string' ) {
      modal[options]()
    } else if ( modal ) {
      modal.toggle()
    }

    return this
  }

  $.fn.modal.Modal = Modal

  $.fn.modal.defaults = {
    backdrop: false
  , keyboard: false
  , show: false
  }


 /* MODAL DATA- IMPLEMENTATION
  * ========================== */

  $(document).ready(function () {
    $('body').delegate('[data-controls-modal]', 'click', function (e) {
      e.preventDefault()
      var $this = $(this).data('show', true)
      $('#' + $this.attr('data-controls-modal')).modal( $this.data() )
    })
  })

}( window.jQuery || window.ender );

;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["stories-package_story"]=a(function(a,b,c,d,e){function k(a,b){return"disabled"}function l(a,b){return"rotate"}function m(a,b){var d="",e;d+='\n        <div class="content-teaser">\n            ',e=a.youtube_id,e=c["if"].call(a,e,{hash:{},inverse:j.program(8,o,b),fn:j.program(6,n,b)});if(e||e===0)d+=e;return d+="\n        </div>\n        ",d}function n(a,b){var d="",e,f;return d+='\n            <div class="youtube-thumbnail-container">\n                <img class="youtube-thumbnail" src="http://img.youtube.com/vi/',f=c.youtube_id,f?e=f.call(a,{hash:{}}):(e=a.youtube_id,e=typeof e===h?e():e),d+=i(e)+'/hqdefault.jpg">\n                <div class="youtube-thumbnail-title">',f=c.youtube_title,f?e=f.call(a,{hash:{}}):(e=a.youtube_title,e=typeof e===h?e():e),d+=i(e)+'</div>\n                <img class="youtube-thumbnail-play" src="/images/stories/youtube_play.png">\n            </div>\n            ',d}function o(a,b){var d="",e,f;d+="\n            &ldquo;",f=c.teaser_html,f?e=f.call(a,{hash:{}}):(e=a.teaser_html,e=typeof e===h?e():e);if(e||e===0)d+=e;return d+="&hellip;&rdquo;\n            ",d}function p(a,b){var d="",e,f;return d+='\n<div class="tape envelope-under">',f=c.author,f?e=f.call(a,{hash:{}}):(e=a.author,e=typeof e===h?e():e),d+=i(e)+"<br>",f=c.date,f?e=f.call(a,{hash:{}}):(e=a.date,e=typeof e===h?e():e),d+=i(e)+"</div>\n",d}function q(a,b){return'\n<div class="envelope-under">\n    <a href="#" class="btn large primary share-story-btn-bottom">Share your story</a>\n</div>\n'}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div class="story ',g=b.disabled,g=c["if"].call(b,g,{hash:{},inverse:j.program(3,l,e),fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='">\n    <div class="envelope envelope-background">\n        ',g=b.empty,g=c.unless.call(b,g,{hash:{},inverse:j.noop,fn:j.program(5,m,e)});if(g||g===0)f+=g;f+='\n        <div class="envelope envelope-foreground">&nbsp;</div>\n    </div>\n</div>\n\n<div class="slit-overlay">&nbsp;</div>\n<div class="slit-overlay-background">&nbsp;</div>\n\n',g=b.author,g=c["if"].call(b,g,{hash:{},inverse:j.program(12,q,e),fn:j.program(10,p,e)});if(g||g===0)f+=g;return f+="\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["stories-package_story-full"]=a(function(a,b,c,d,e){function l(a,b){var d="",e,f;return d+='\n        <iframe width="100%" height="380" src="http://www.youtube.com/embed/',f=c.youtube_id,f?e=f.call(a,{hash:{}}):(e=a.youtube_id,e=typeof e===i?e():e),d+=j(e)+'?rel=0" frameborder="0" allowfullscreen></iframe>\n        ',d}function m(a,b){var d="",e,f;d+="\n        ",f=c.content_html,f?e=f.call(a,{hash:{}}):(e=a.content_html,e=typeof e===i?e():e);if(e||e===0)d+=e;return d+="\n        ",d}function n(a,b){return"disabled"}function o(a,b){return"disabled"}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<div id="modal-story" class="modal fade hide">\n\n    <div class="modal-header">\n        <a href="#" class="close-button close">x</a>\n        <h3>\n            <span class="tape">From ',h=c.author,h?g=h.call(b,{hash:{}}):(g=b.author,g=typeof g===i?g():g),f+=j(g)+", ",h=c.date,h?g=h.call(b,{hash:{}}):(g=b.date,g=typeof g===i?g():g),f+=j(g)+'</span>\n        \n            <span class="share-container">\n                <iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?count=none&amp;related=khanacademy&amp;text=Read%20this%20story%20from%20a%20Khan%20Academy%20user" style="width:56px; height:20px;"></iframe>\n\n                <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.khanacademy.org%2Fstories%2F',h=c.name,h?g=h.call(b,{hash:{}}):(g=b.name,g=typeof g===i?g():g),f+=j(g)+'&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=verdana&amp;height=21&amp;appId=160249463991765" scrolling="no" frameborder="0" style="border:none; position:relative; top:1px; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>\n            </span>\n\n        </h3>\n    </div>\n\n    <div class="modal-body">\n        ',g=b.youtube_id,g=c["if"].call(b,g,{hash:{},inverse:k.program(3,m,e),fn:k.program(1,l,e)});if(g||g===0)f+=g;f+='\n    </div>\n\n    <div class="modal-footer">\n\n        <div class="row">\n            <div class="span4">\n                <button class="btn prev-btn ',g=b.prev_story,g=c.unless.call(b,g,{hash:{},inverse:k.noop,fn:k.program(5,n,e)});if(g||g===0)f+=g;f+='">&larr; Previous</button>\n            </div>\n\n            <div class="span-middle center">\n                &nbsp;\n            </div>\n\n            <div class="span4 right">\n                <button class="btn next-btn ',g=b.next_story,g=c.unless.call(b,g,{hash:{},inverse:k.noop,fn:k.program(7,o,e)});if(g||g===0)f+=g;return f+='">Next &rarr;</button>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n',f})})();
// seedrandom.js version 2.0.
// Author: David Bau 4/2/2011
//
// Defines a method Math.seedrandom() that, when called, substitutes
// an explicitly seeded RC4-based algorithm for Math.random().  Also
// supports automatic seeding from local or network sources of entropy.
//
// Usage:
//
//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
//
//   Math.seedrandom('yipee'); Sets Math.random to a function that is
//                             initialized using the given explicit seed.
//
//   Math.seedrandom();        Sets Math.random to a function that is
//                             seeded using the current time, dom state,
//                             and other accumulated local entropy.
//                             The generated seed string is returned.
//
//   Math.seedrandom('yowza', true);
//                             Seeds using the given explicit seed mixed
//                             together with accumulated entropy.
//
//   <script src="http://bit.ly/srandom-512"></script>
//                             Seeds using physical random bits downloaded
//                             from random.org.
//
//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
//   </script>                 Seeds using urandom bits from call.jsonlib.com,
//                             which is faster than random.org.
//
// Examples:
//
//   Math.seedrandom("hello");            // Use "hello" as the seed.
//   document.write(Math.random());       // Always 0.5463663768140734
//   document.write(Math.random());       // Always 0.43973793770592234
//   var rng1 = Math.random;              // Remember the current prng.
//
//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
//   document.write(Math.random());       // Pretty much unpredictable.
//
//   Math.random = rng1;                  // Continue "hello" prng sequence.
//   document.write(Math.random());       // Always 0.554769432473455
//
//   Math.seedrandom(autoseed);           // Restart at the previous seed.
//   document.write(Math.random());       // Repeat the 'unpredictable' value.
//
// Notes:
//
// Each time seedrandom('arg') is called, entropy from the passed seed
// is accumulated in a pool to help generate future seeds for the
// zero-argument form of Math.seedrandom, so entropy can be injected over
// time by calling seedrandom with explicit data repeatedly.
//
// On speed - This javascript implementation of Math.random() is about
// 3-10x slower than the built-in Math.random() because it is not native
// code, but this is typically fast enough anyway.  Seeding is more expensive,
// especially if you use auto-seeding.  Some details (timings on Chrome 4):
//
// Our Math.random()            - avg less than 0.002 milliseconds per call
// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
// seedrandom('explicit', true) - avg less than 2 milliseconds per call
// seedrandom()                 - avg about 38 milliseconds per call
//
// LICENSE (BSD):
//
// Copyright 2010 David Bau, all rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
//   1. Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
// 
//   3. Neither the name of this module nor the names of its contributors may
//      be used to endorse or promote products derived from this software
//      without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
/**
 * All code is in an anonymous closure to keep the global namespace clean.
 *
 * @param {number=} overflow 
 * @param {number=} startdenom
 */
(function (pool, math, width, chunks, significance, overflow, startdenom) {


//
// seedrandom()
// This is the seedrandom function described above.
//
math['seedrandom'] = function seedrandom(seed, use_entropy) {
  var key = [];
  var arc4;

  // Flatten the seed string or build one from local entropy if needed.
  seed = mixkey(flatten(
    use_entropy ? [seed, pool] :
    arguments.length ? seed :
    [new Date().getTime(), pool, window], 3), key);

  // Use the seed to initialize an ARC4 generator.
  arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(arc4.S, pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  math['random'] = function random() {  // Closure to return a random double:
    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
    var d = startdenom;                 //   and denominator d = 2 ^ 48.
    var x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  // Return the seed that was used
  return seed;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, u, me = this, keylen = key.length;
  var i = 0, j = me.i = me.j = me.m = 0;
  me.S = [];
  me.c = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) { me.S[i] = i++; }
  for (i = 0; i < width; i++) {
    t = me.S[i];
    j = lowbits(j + t + key[i % keylen]);
    u = me.S[j];
    me.S[i] = u;
    me.S[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  me.g = function getnext(count) {
    var s = me.S;
    var i = lowbits(me.i + 1); var t = s[i];
    var j = lowbits(me.j + t); var u = s[j];
    s[i] = u;
    s[j] = t;
    var r = s[lowbits(t + u)];
    while (--count) {
      i = lowbits(i + 1); t = s[i];
      j = lowbits(j + t); u = s[j];
      s[i] = u;
      s[j] = t;
      r = r * width + s[lowbits(t + u)];
    }
    me.i = i;
    me.j = j;
    return r;
  };
  // For robust unpredictability discard an initial batch of values.
  // See http://www.rsa.com/rsalabs/node.asp?id=2009
  me.g(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
/** @param {Object=} result 
  * @param {string=} prop
  * @param {string=} typ */
function flatten(obj, depth, result, prop, typ) {
  result = [];
  typ = typeof(obj);
  if (depth && typ == 'object') {
    for (prop in obj) {
      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
  }
  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
/** @param {number=} smear 
  * @param {number=} j */
function mixkey(seed, key, smear, j) {
  seed += '';                         // Ensure the seed is a string
  smear = 0;
  for (j = 0; j < seed.length; j++) {
    key[lowbits(j)] =
      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
  }
  seed = '';
  for (j in key) { seed += String.fromCharCode(key[j]); }
  return seed;
}

//
// lowbits()
// A quick "n mod width" for width a power of 2.
//
function lowbits(n) { return n & (width - 1); }

//
// The following constants are related to IEEE 754 limits.
//
startdenom = math.pow(width, chunks);
significance = math.pow(2, significance);
overflow = significance * 2;

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

// End anonymous scope, and pass initial values.
})(
  [],   // pool: entropy pool starts empty
  Math, // math: package containing random, pow, and seedrandom
  256,  // width: each RC4 output is 0 <= x < 256
  6,    // chunks: at least six RC4 outputs for each double
  52    // significance: there are 52 significant digits in a double
);

;
$(function() {

    $(".share-story-btn").click(function(e) {

        // Show story submission area
        $(".stories-submit")
            .slideToggle(function() {
                $(".stories-submit textarea").focus();
            })
            .find(".submit-story-btn")
                .html("Send us your story")
                .removeClass("disabled")
                .removeClass("success")
                .addClass("primary");

        e.preventDefault();
    });

    $(".share-story-btn-bottom").click(function(e) {

        $('html, body').animate({
            scrollTop: 0
        }, 250, function() {
            if (!$(".stories-submit").is(":visible")) {
                $(".share-story-btn").trigger("click");
            }
        });

        e.preventDefault();

    });

    $(".submit-story-btn").click(function(e) {

        // Submit story
        if ($("#story").val().length) {

            $(this)
                .addClass("disabled")
                .html("Sending&hellip;");

            $.post(
                "/stories/submit",
                {
                    "story": $("#story").val(),
                    "name": $("#name").val(),
                    "email": $("#email").val(),
                    "share": $("#shareAllow").is(":checked") ? "1": "0"
                },
                function() {

                    $(".submit-story-btn")
                        .removeClass("primary")
                        .addClass("success")
                        .html("Success!");

                    // Close and clean up story submission area after delay
                    setTimeout(function() {
                        $(".stories-submit")
                            .slideUp()
                            .find("textarea")
                                .val("");
                    }, 3000);

                });

        }

        e.preventDefault();
    });

});
;

var Stories = Stories || {};

Stories.router = null;
Stories.views = {};
Stories.cShown = 0;
Stories.cRendered = 0;

Stories.render = function(storyData) {

    var row = null;
    var lastStory = null;
    var storiesPerRow = 3;

    $.each(storyData.content, function(ix, story) {

        if (ix % storiesPerRow == 0) {
            row = $("<div class='row'></div>");
            $(storyData.target).append(row);
        }

        if (lastStory && !story.empty) {
            lastStory.next_story = story;
            story.prev_story = lastStory;
        }

        var view = new Stories.SmallView({ model: story });
        row.append($(view.render(ix).el));

        Stories.views[story.name] = view;
        lastStory = story;

    });

    Stories.router = new Stories.StoryRouter();
    Backbone.history.start({
        pushState: true,
        root: "/stories/"
    });

};

Stories.SmallView = Backbone.View.extend({

    template: Templates.get("stories.story"),

    render: function(ix) {
        var model = this.model;

        $(this.el)
            .html(this.template(this.model))
            .addClass("span-one-third")
            .addClass("story-container")
            .find(".story")
                .addClass(this.model.envelope || this.randomEnvelope())
                .not(".disabled")
                    .addClass(this.randomRotation())
                    .click(function() { Stories.navigateTo(model); });

        Stories.cRendered++;

        return this;
    },

    randomRotation: function() {
        return this.randomChoice(["rotate-6", "rotate-neg-6"]);
    },

    randomEnvelope: function() {

        if (Stories.cRendered == 0) {
            // Evil dictator override!
            // I happen to think the first envelope is really pretty and it
            // should start off the series.
            return "envelope-1";
        }
        else if (Stories.cRendered == 1) {
            // Same as above
            return "envelope-2";
        }

        return this.randomChoice(["envelope-1", "envelope-2", "envelope-3", "envelope-4"]);
    },

    randomChoice: function(choices) {
        // Consistent style for this particular story
        Math.seedrandom(this.model.name);

        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    },

    showFull: function() {

        $(".content-teaser-show, .content-teaser-hide")
            .removeClass("content-teaser-show")
            .removeClass("content-teaser-hide");

        var model = this.model;
        var jelStory = $(this.el).find(".story");

        setTimeout(function() {

            $(jelStory).addClass("content-teaser-show");

            setTimeout(function() {

                $(jelStory).addClass("content-teaser-hide");
                var jelOld = $("#modal-story");

                var view = new Stories.FullView({ model: model });

                // If modal was previously visible, remove 'fade' class
                // so transition swaps immediately
                var classToRemove = Stories.cShown > 0 ? "fade" : "";

                $(view.render().el)
                    .find("#modal-story")
                        .removeClass(Stories.cShown > 0 ? "fade" : "")
                        .appendTo(document.body)
                        .bind("show", function() { Stories.cShown++; })
                        .bind("hidden", function() {

                            $(this).remove();

                            $(jelStory)
                                .removeClass("content-teaser-show")
                                .removeClass("content-teaser-hide");

                            // If no other modal dialog is on its way
                            // to becoming visible, push history
                            Stories.cShown--;
                            if (!Stories.cShown) {
                                Stories.navigateTo(null);
                            }
                        })
                        .modal({
                            keyboard: true,
                            backdrop: true,
                            show: true
                        })
                        .find(".modal-body")
                            .scroll(function() {

                                if (!this.fixedScrollRender) {

                                    // Chrome has an issue with not scrolling
                                    // content even though the scrollbars are
                                    // moving. Force a single re-render of the
                                    // modal dialog on first scroll.
                                    //
                                    // Feel free to enlighten me on the proper
                                    // fix for this bug...
                                    var jel = $(this).parents(".modal");
                                    $(jel).height($(jel).height() + 1);
                                    $(jel).height($(jel).height() - 1);

                                    this.fixedScrollRender = true;
                                }

                            });

                // Hide any existing modal dialog
                jelOld.removeClass("fade").modal("hide");

            }, 400);

        }
        , 1);

    }

});

Stories.FullView = Backbone.View.extend({

    template: Templates.get("stories.story-full"),

    render: function() {
        var model = this.model;

        $(this.el)
            .html(this.template(this.model))
            .find(".prev-btn")
                .not(".disabled")
                    .click(function() { Stories.navigateTo(model.prev_story); })
                    .end()
                .end()
            .find(".next-btn")
                .not(".disabled")
                    .click(function() { Stories.navigateTo(model.next_story); });
        return this;
    }

});

Stories.navigateTo = function(model) {
    if (model) {
        Stories.router.navigate(model.name, true);
    }
    else {
        Stories.router.navigate("");
    }
};

Stories.StoryRouter = Backbone.Router.extend({

    routes: {
        "": "showNone",
        ":story": "showStory"
    },

    showNone: function() {
        // If #modal-story is still in the DOM,
        // we got here via history navigation and
        // need to remove it.
        $("#modal-story").modal("hide");
    },

    showStory: function(name) {
        var view = Stories.views[name];
        if (view) {
            view.showFull();
        }
    }

});
