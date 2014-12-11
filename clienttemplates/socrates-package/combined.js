// Underscore.string
// (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
// Underscore.strings is freely distributable under the terms of the MIT license.
// Documentation: https://github.com/epeli/underscore.string
// Some code is borrowed from MooTools and Alexandru Marasteanu.

// Version 2.0.0

(function(root){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(i, m) {
    for (var o = []; m > 0; o[--m] = i) {}
    return o.join('');
  };

  var slice = function(a){
    return Array.prototype.slice.call(a);
  };

  var defaultToWhiteSpace = function(characters){
    if (characters != null) {
      return '[' + _s.escapeRegExp(''+characters) + ']';
    }
    return '\\s';
  };

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.0.0',

    isBlank: function(str){
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      return (''+str).replace(/<\/?[^>]+>/ig, '');
    },

    capitalize : function(str) {
      str = ''+str;
      return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    },

    chop: function(str, step){
      str = str+'';
      step = ~~step || str.length;
      var arr = [];
      for (var i = 0; i < str.length;) {
        arr.push(str.slice(i,i + step));
        i = i + step;
      }
      return arr;
    },

    clean: function(str){
      return _s.strip((''+str).replace(/\s+/g, ' '));
    },

    count: function(str, substr){
      str = ''+str; substr = ''+substr;
      var count = 0, index;
      for (var i=0; i < str.length;) {
        index = str.indexOf(substr, i);
        index >= 0 && count++;
        i = i + (index >= 0 ? index : 0) + substr.length;
      }
      return count;
    },

    chars: function(str) {
      return (''+str).split('');
    },

    escapeHTML: function(str) {
      return (''+str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                            .replace(/"/g, '&quot;').replace(/'/g, "&apos;");
    },

    unescapeHTML: function(str) {
      return (''+str).replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                            .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
    },

    escapeRegExp: function(str){
      // From MooTools core 1.2.4
      return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
    },

    insert: function(str, i, substr){
      var arr = (''+str).split('');
      arr.splice(~~i, 0, ''+substr);
      return arr.join('');
    },

    include: function(str, needle){
      return (''+str).indexOf(needle) !== -1;
    },

    join: function(sep) {
      var args = slice(arguments);
      return args.join(args.shift());
    },

    lines: function(str) {
      return (''+str).split("\n");
    },

    reverse: function(str){
        return Array.prototype.reverse.apply(String(str).split('')).join('');
    },

    splice: function(str, i, howmany, substr){
      var arr = (''+str).split('');
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    startsWith: function(str, starts){
      str = ''+str; starts = ''+starts;
      return str.length >= starts.length && str.substring(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      str = ''+str; ends = ''+ends;
      return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
    },

    succ: function(str){
      str = ''+str;
      var arr = str.split('');
      arr.splice(str.length-1, 1, String.fromCharCode(str.charCodeAt(str.length-1) + 1));
      return arr.join('');
    },

    titleize: function(str){
      var arr = (''+str).split(' '),
          word;
      for (var i=0; i < arr.length; i++) {
        word = arr[i].split('');
        if(typeof word[0] !== 'undefined') word[0] = word[0].toUpperCase();
        i+1 === arr.length ? arr[i] = word.join('') : arr[i] = word.join('') + ' ';
      }
      return arr.join('');
    },

    camelize: function(str){
      return _s.trim(str).replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/\-|\s+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1-$2').replace(/^([A-Z]+)/, '-$1').replace(/\_|\s+/g, '-').toLowerCase();
    },

    humanize: function(str){
      return _s.capitalize(this.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      str = ''+str;
      if (!characters && nativeTrim) {
        return nativeTrim.call(str);
      }
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      characters = defaultToWhiteSpace(characters);
      return (''+str).replace(new RegExp('\^' + characters + '+', 'g'), '');
    },

    rtrim: function(str, characters){
      characters = defaultToWhiteSpace(characters);
      return (''+str).replace(new RegExp(characters + '+$', 'g'), '');
    },

    truncate: function(str, length, truncateStr){
      str = ''+str; truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/sergiokas
     */
    prune: function(str, length, pruneStr){
      str = ''+str; length = ~~length;
      pruneStr = pruneStr != null ? ''+pruneStr : '...'; 
      
      var pruned, borderChar, template = str.replace(/\W/g, function(ch){
        return (ch.toUpperCase() != ch.toLowerCase()) ? 'A' : ' '
      });
      
      
      borderChar = template[length];
      
      pruned = template.slice(0, length);
      
      // Check if we're in the middle of a word
      if (borderChar && borderChar.match(/\S/))
        pruned = pruned.replace(/\s\S+$/, '')
        
      pruned = _s.rtrim(pruned);
      
      return (pruned+pruneStr).length > str.length ? str : str.substring(0, pruned.length)+pruneStr;
    },

    words: function(str, delimiter) {
      return (''+str).split(delimiter || " ");
    },

    pad: function(str, length, padStr, type) {
      str = ''+str;
      
      var padding = '', padlen  = 0;

      length = ~~length;
      
      if (!padStr) {
        padStr = ' ';
      } else if (padStr.length > 1) {
        padStr = padStr.charAt(0);
      }
      
      switch(type) {
        case 'right':
          padlen = (length - str.length);
          padding = strRepeat(padStr, padlen);
          str = str+padding;
          break;
        case 'both':
          padlen = (length - str.length);
          padding = {
            'left' : strRepeat(padStr, Math.ceil(padlen/2)),
            'right': strRepeat(padStr, Math.floor(padlen/2))
          };
          str = padding.left+str+padding.right;
          break;
        default: // 'left'
          padlen = (length - str.length);
          padding = strRepeat(padStr, padlen);;
          str = padding+str;
        }
      return str;
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      var num = parseNumber(parseNumber(str).toFixed(parseNumber(decimals)));
      return (!(num === 0 && (str !== "0" && str !== 0))) ? num : Number.NaN;
    },

    strRight: function(str, sep){
      str = ''+str; sep = sep != null ? ''+sep : sep;
      var pos =  (!sep) ? -1 : str.indexOf(sep);
      return (pos != -1) ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      str = ''+str; sep = sep != null ? ''+sep : sep;
      var pos =  (!sep) ? -1 : str.lastIndexOf(sep);
      return (pos != -1) ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      str = ''+str; sep = sep != null ? ''+sep : sep;
      var pos = (!sep) ? -1 : str.indexOf(sep);
      return (pos != -1) ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      str = ''+str; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return (pos != -1) ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator) {
        separator || (separator = ', ');
        lastSeparator || (lastSeparator = ' and ');
        var length = array.length, str = '';

        for (var i = 0; i < length; i++) {
            str += array[i];
            if (i === (length - 2)) { str += lastSeparator; }
            else if (i < (length - 1)) { str += separator; }
        }

        return str;
    },

    slugify: function(str) {
      var from  = "àáäâèéëêìíïîòóöôùúüûñç·/_:;",
          to    = "aaaaeeeeiiiioooouuuunc",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = (''+str).toLowerCase();

      str = str.replace(regex, function(ch){ return to[from.indexOf(ch)] || '-'; });

      return _s.trim(str.replace(/[^\w\s-]/g, '').replace(/[-\s]+/g, '-'), '-');
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop == 'include' || prop == 'contains' || prop == 'reverse') continue;
        result[prop] = this[prop];
      }

      return result;
    }

  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      // Export module
      module.exports = _s;
    }
    exports._s = _s;

  } else if (typeof define === 'function' && define.amd) {
    // Register as a named module with AMD.
    define('underscore.string', function() {
      return _s;
    });

  // Integrate with Underscore.js
  } else if (typeof root._ !== 'undefined') {
    // root._.mixin(_s);
    root._.string = _s;
    root._.str = root._.string;

  // Or define it
  } else {
    root._ = {
      string: _s,
      str: _s
    };
  }

}(this || window));
;
/*
 * jQuery UI Draggable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.draggable", $.ui.mouse, {
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false
	},
	_create: function() {

		if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
			this.element[0].style.position = 'relative';

		(this.options.addClasses && this.element.addClass("ui-draggable"));
		(this.options.disabled && this.element.addClass("ui-draggable-disabled"));

		this._mouseInit();

	},

	destroy: function() {
		if(!this.element.data('draggable')) return;
		this.element
			.removeData("draggable")
			.unbind(".draggable")
			.removeClass("ui-draggable"
				+ " ui-draggable-dragging"
				+ " ui-draggable-disabled");
		this._mouseDestroy();

		return this;
	},

	_mouseCapture: function(event) {

		var o = this.options;

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
			return false;

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle)
			return false;
		
		if ( o.iframeFix ) {
			$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
				$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
				.css({
					width: this.offsetWidth+"px", height: this.offsetHeight+"px",
					position: "absolute", opacity: "0.001", zIndex: 1000
				})
				.css($(this).offset())
				.appendTo("body");
			});
		}

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.positionAbs = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		//Trigger event + callbacks
		if(this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.helper.addClass("ui-draggable-dragging");
		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		
		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) $.ui.ddmanager.dragStart(this, event);
		
		return true;
	},

	_mouseDrag: function(event, noPropagation) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if(this._trigger('drag', event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			dropped = $.ui.ddmanager.drop(this, event);

		//if a drop comes from outside (a sortable)
		if(this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}
		
		//if the original element is removed, don't bother to continue if helper is set to "original"
		if((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original")
			return false;

		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			var self = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if(self._trigger("stop", event) !== false) {
					self._clear();
				}
			});
		} else {
			if(this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},
	
	_mouseUp: function(event) {
		if (this.options.iframeFix === true) {
			$("div.ui-draggable-iframeFix").each(function() { 
				this.parentNode.removeChild(this); 
			}); //Remove frame helpers
		}
		
		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if( $.ui.ddmanager ) $.ui.ddmanager.dragStop(this, event);
		
		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},
	
	cancel: function() {
		
		if(this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}
		
		return this;
		
	},

	_getHandle: function(event) {

		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		$(this.options.handle, this.element)
			.find("*")
			.andSelf()
			.each(function() {
				if(this == event.target) handle = true;
			});

		return handle;

	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone().removeAttr('id') : this.element);

		if(!helper.parents('body').length)
			helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));

		if(helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
			helper.css("position", "absolute");

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.element.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0),
			right: (parseInt(this.element.css("marginRight"),10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			o.containment == 'document' ? 0 : $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
			o.containment == 'document' ? 0 : $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
			(o.containment == 'document' ? 0 : $(window).scrollLeft()) + $(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			(o.containment == 'document' ? 0 : $(window).scrollTop()) + ($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
		        var c = $(o.containment);
			var ce = c[0]; if(!ce) return;
			var co = c.offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				(parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0),
				(parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0),
				(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
				(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top  - this.margins.bottom
			];
			this.relative_container = c;

		} else if(o.containment.constructor == Array) {
			this.containment = o.containment;
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options
		         var containment;
		         if(this.containment) {
				 if (this.relative_container){
				     var co = this.relative_container.offset();
				     containment = [ this.containment[0] + co.left,
						     this.containment[1] + co.top,
						     this.containment[2] + co.left,
						     this.containment[3] + co.top ];
				 }
				 else {
				     containment = this.containment;
				 }

				if(event.pageX - this.offset.click.left < containment[0]) pageX = containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < containment[1]) pageY = containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > containment[2]) pageX = containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > containment[3]) pageY = containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? (!(top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3]) ? top : (!(top - this.offset.click.top < containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? (!(left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2]) ? left : (!(left - this.offset.click.left < containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
		//if($.ui.ddmanager) $.ui.ddmanager.current = null;
		this.helper = null;
		this.cancelHelperRemoval = false;
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call(this, type, [event, ui]);
		if(type == "drag") this.positionAbs = this._convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return $.Widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function(event) {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.extend($.ui.draggable, {
	version: "1.8.17"
});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $.data(this, 'sortable');
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable.refreshPositions();	// Call the sortable's refreshPositions at drag start to refresh the containerCache since the sortable container cache is used in drag and needs to be up to date (this will ensure it's initialised as well as being kept in step with any changes that might have happened on the page).
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function(event, ui) {

		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var inst = $(this).data("draggable"),
			uiSortable = $.extend({}, ui, { item: inst.element });

		$.each(inst.sortables, function() {
			if(this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: 'valid/invalid'
				if(this.shouldRevert) this.instance.options.revert = true;

				//Trigger the stop of the sortable
				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				//If the helper has been the original item, restore properties in the sortable
				if(inst.options.helper == 'original')
					this.instance.currentItem.css({ top: 'auto', left: 'auto' });

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), self = this;

		var checkPos = function(o) {
			var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
			var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
			var itemHeight = o.height, itemWidth = o.width;
			var itemTop = o.top, itemLeft = o.left;

			return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
		};

		$.each(inst.sortables, function(i) {
			
			//Copy over some variables to allow calling the sortable's native _intersectsWith
			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;
			
			if(this.instance._intersectsWith(this.instance.containerCache)) {

				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if(!this.instance.isOver) {

					this.instance.isOver = 1;
					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(self).clone().removeAttr('id').appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					//hack so receive/update callbacks work (mostly)
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if(this.instance.currentItem) this.instance._mouseDrag(event);

			} else {

				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if(this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;
					
					//Prevent reverting on this forced stop
					this.instance.options.revert = false;
					
					// The out event needs to be triggered independently
					this.instance._trigger('out', event, this.instance._uiHash(this.instance));
					
					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			};

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(event, ui) {
		var t = $('body'), o = $(this).data('draggable').options;
		if (t.css("cursor")) o._cursor = t.css("cursor");
		t.css("cursor", o.cursor);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if (o._cursor) $('body').css("cursor", o._cursor);
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data('draggable').options;
		if(t.css("opacity")) o._opacity = t.css("opacity");
		t.css('opacity', o.opacity);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if(o._opacity) $(ui.helper).css('opacity', o._opacity);
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(event, ui) {
		var i = $(this).data("draggable");
		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
	},
	drag: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options, scrolled = false;

		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {

			if(!o.axis || o.axis != 'x') {
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
			}

			if(!o.axis || o.axis != 'y') {
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
			}

		} else {

			if(!o.axis || o.axis != 'x') {
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
			}

			if(!o.axis || o.axis != 'y') {
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
			}

		}

		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(i, event);

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options;
		i.snapElements = [];

		$(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != i.element[0]) i.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options;
		var d = o.snapTolerance;

		var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (var i = inst.snapElements.length - 1; i >= 0; i--){

			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width,
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;

			//Yes, I know, this is insane ;)
			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
				if(inst.snapElements[i].snapping) (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				inst.snapElements[i].snapping = false;
				continue;
			}

			if(o.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= d;
				var bs = Math.abs(b - y1) <= d;
				var ls = Math.abs(l - x2) <= d;
				var rs = Math.abs(r - x1) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
			}

			var first = (ts || bs || ls || rs);

			if(o.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= d;
				var bs = Math.abs(b - y2) <= d;
				var ls = Math.abs(l - x1) <= d;
				var rs = Math.abs(r - x2) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
			}

			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		};

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(event, ui) {

		var o = $(this).data("draggable").options;

		var group = $.makeArray($(o.stack)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || 0) - (parseInt($(b).css("zIndex"),10) || 0);
		});
		if (!group.length) { return; }
		
		var min = parseInt(group[0].style.zIndex) || 0;
		$(group).each(function(i) {
			this.style.zIndex = min + i;
		});

		this[0].style.zIndex = min + group.length;

	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data("draggable").options;
		if(t.css("zIndex")) o._zIndex = t.css("zIndex");
		t.css('zIndex', o.zIndex);
	},
	stop: function(event, ui) {
		var o = $(this).data("draggable").options;
		if(o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
	}
});

})(jQuery);
;
/*
 * jQuery UI Resizable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.resizable", $.ui.mouse, {
	widgetEventPrefix: "resize",
	options: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		containment: false,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,
		zIndex: 1000
	},
	_create: function() {

		var self = this, o = this.options;
		this.element.addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!(o.aspectRatio),
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || 'ui-resizable-helper' : null
		});

		//Wrap the element if it cannot hold child nodes
		if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {

			//Opera fix for relative positioning
			if (/relative/.test(this.element.css('position')) && $.browser.opera)
				this.element.css({ position: 'relative', top: 'auto', left: 'auto' });

			//Create a wrapper element and set the wrapper to the new current internal element
			this.element.wrap(
				$('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
					position: this.element.css('position'),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css('top'),
					left: this.element.css('left')
				})
			);

			//Overwrite the original this.element
			this.element = this.element.parent().data(
				"resizable", this.element.data('resizable')
			);

			this.elementIsWrapper = true;

			//Move margins to the wrapper
			this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") });
			this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});

			//Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css('resize');
			this.originalElement.css('resize', 'none');

			//Push the actual element to our proportionallyResize internal array
			this._proportionallyResizeElements.push(this.originalElement.css({ position: 'static', zoom: 1, display: 'block' }));

			// avoid IE jump (hard set the margin)
			this.originalElement.css({ margin: this.originalElement.css('margin') });

			// fix handlers offset
			this._proportionallyResize();

		}

		this.handles = o.handles || (!$('.ui-resizable-handle', this.element).length ? "e,s,se" : { n: '.ui-resizable-n', e: '.ui-resizable-e', s: '.ui-resizable-s', w: '.ui-resizable-w', se: '.ui-resizable-se', sw: '.ui-resizable-sw', ne: '.ui-resizable-ne', nw: '.ui-resizable-nw' });
		if(this.handles.constructor == String) {

			if(this.handles == 'all') this.handles = 'n,e,s,w,se,sw,ne,nw';
			var n = this.handles.split(","); this.handles = {};

			for(var i = 0; i < n.length; i++) {

				var handle = $.trim(n[i]), hname = 'ui-resizable-'+handle;
				var axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');

				// increase zIndex of sw, se, ne, nw axis
				//TODO : this modifies original option
				if(/sw|se|ne|nw/.test(handle)) axis.css({ zIndex: ++o.zIndex });

				//TODO : What's going on here?
				if ('se' == handle) {
					axis.addClass('ui-icon ui-icon-gripsmall-diagonal-se');
				};

				//Insert into internal handles object and append to element
				this.handles[handle] = '.ui-resizable-'+handle;
				this.element.append(axis);
			}

		}

		this._renderAxis = function(target) {

			target = target || this.element;

			for(var i in this.handles) {

				if(this.handles[i].constructor == String)
					this.handles[i] = $(this.handles[i], this.element).show();

				//Apply pad to wrapper element, needed to fix axis position (textarea, inputs, scrolls)
				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {

					var axis = $(this.handles[i], this.element), padWrapper = 0;

					//Checking the correct pad and border
					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

					//The padding type i have to apply...
					var padPos = [ 'padding',
						/ne|nw|n/.test(i) ? 'Top' :
						/se|sw|s/.test(i) ? 'Bottom' :
						/^e$/.test(i) ? 'Right' : 'Left' ].join("");

					target.css(padPos, padWrapper);

					this._proportionallyResize();

				}

				//TODO: What's that good for? There's not anything to be executed left
				if(!$(this.handles[i]).length)
					continue;

			}
		};

		//TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = $('.ui-resizable-handle', this.element)
			.disableSelection();

		//Matching axis name
		this._handles.mouseover(function() {
			if (!self.resizing) {
				if (this.className)
					var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
				//Axis, default = se
				self.axis = axis && axis[1] ? axis[1] : 'se';
			}
		});

		//If we want to auto hide the elements
		if (o.autoHide) {
			this._handles.hide();
			$(this.element)
				.addClass("ui-resizable-autohide")
				.hover(function() {
					if (o.disabled) return;
					$(this).removeClass("ui-resizable-autohide");
					self._handles.show();
				},
				function(){
					if (o.disabled) return;
					if (!self.resizing) {
						$(this).addClass("ui-resizable-autohide");
						self._handles.hide();
					}
				});
		}

		//Initialize the mouse interaction
		this._mouseInit();

	},

	destroy: function() {

		this._mouseDestroy();

		var _destroy = function(exp) {
			$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
				.removeData("resizable").unbind(".resizable").find('.ui-resizable-handle').remove();
		};

		//TODO: Unwrap at same DOM position
		if (this.elementIsWrapper) {
			_destroy(this.element);
			var wrapper = this.element;
			wrapper.after(
				this.originalElement.css({
					position: wrapper.css('position'),
					width: wrapper.outerWidth(),
					height: wrapper.outerHeight(),
					top: wrapper.css('top'),
					left: wrapper.css('left')
				})
			).remove();
		}

		this.originalElement.css('resize', this.originalResizeStyle);
		_destroy(this.originalElement);

		return this;
	},

	_mouseCapture: function(event) {
		var handle = false;
		for (var i in this.handles) {
			if ($(this.handles[i])[0] == event.target) {
				handle = true;
			}
		}

		return !this.options.disabled && handle;
	},

	_mouseStart: function(event) {

		var o = this.options, iniPos = this.element.position(), el = this.element;

		this.resizing = true;
		this.documentScroll = { top: $(document).scrollTop(), left: $(document).scrollLeft() };

		// bugfix for http://dev.jquery.com/ticket/1749
		if (el.is('.ui-draggable') || (/absolute/).test(el.css('position'))) {
			el.css({ position: 'absolute', top: iniPos.top, left: iniPos.left });
		}

		//Opera fixing relative position
		if ($.browser.opera && (/relative/).test(el.css('position')))
			el.css({ position: 'relative', top: 'auto', left: 'auto' });

		this._renderProxy();

		var curleft = num(this.helper.css('left')), curtop = num(this.helper.css('top'));

		if (o.containment) {
			curleft += $(o.containment).scrollLeft() || 0;
			curtop += $(o.containment).scrollTop() || 0;
		}

		//Store needed variables
		this.offset = this.helper.offset();
		this.position = { left: curleft, top: curtop };
		this.size = this._helper ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
		this.originalSize = this._helper ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
		this.originalPosition = { left: curleft, top: curtop };
		this.sizeDiff = { width: el.outerWidth() - el.width(), height: el.outerHeight() - el.height() };
		this.originalMousePosition = { left: event.pageX, top: event.pageY };

		//Aspect Ratio
		this.aspectRatio = (typeof o.aspectRatio == 'number') ? o.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);

	    var cursor = $('.ui-resizable-' + this.axis).css('cursor');
	    $('body').css('cursor', cursor == 'auto' ? this.axis + '-resize' : cursor);

		el.addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function(event) {

		//Increase performance, avoid regex
		var el = this.helper, o = this.options, props = {},
			self = this, smp = this.originalMousePosition, a = this.axis;

		var dx = (event.pageX-smp.left)||0, dy = (event.pageY-smp.top)||0;
		var trigger = this._change[a];
		if (!trigger) return false;

		// Calculate the attrs that will be change
		var data = trigger.apply(this, [event, dx, dy]), ie6 = $.browser.msie && $.browser.version < 7, csdif = this.sizeDiff;

		// Put this in the mouseDrag handler since the user can start pressing shift while resizing
		this._updateVirtualBoundaries(event.shiftKey);
		if (this._aspectRatio || event.shiftKey)
			data = this._updateRatio(data, event);

		data = this._respectSize(data, event);

		// plugins callbacks need to be called first
		this._propagate("resize", event);

		el.css({
			top: this.position.top + "px", left: this.position.left + "px",
			width: this.size.width + "px", height: this.size.height + "px"
		});

		if (!this._helper && this._proportionallyResizeElements.length)
			this._proportionallyResize();

		this._updateCache(data);

		// calling the user callback at the end
		this._trigger('resize', event, this.ui());

		return false;
	},

	_mouseStop: function(event) {

		this.resizing = false;
		var o = this.options, self = this;

		if(this._helper) {
			var pr = this._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
				soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
				soffsetw = ista ? 0 : self.sizeDiff.width;

			var s = { width: (self.helper.width()  - soffsetw), height: (self.helper.height() - soffseth) },
				left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
				top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

			if (!o.animate)
				this.element.css($.extend(s, { top: top, left: left }));

			self.helper.height(self.size.height);
			self.helper.width(self.size.width);

			if (this._helper && !o.animate) this._proportionallyResize();
		}

		$('body').css('cursor', 'auto');

		this.element.removeClass("ui-resizable-resizing");

		this._propagate("stop", event);

		if (this._helper) this.helper.remove();
		return false;

	},

    _updateVirtualBoundaries: function(forceAspectRatio) {
        var o = this.options, pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b;

        b = {
            minWidth: isNumber(o.minWidth) ? o.minWidth : 0,
            maxWidth: isNumber(o.maxWidth) ? o.maxWidth : Infinity,
            minHeight: isNumber(o.minHeight) ? o.minHeight : 0,
            maxHeight: isNumber(o.maxHeight) ? o.maxHeight : Infinity
        };

        if(this._aspectRatio || forceAspectRatio) {
            // We want to create an enclosing box whose aspect ration is the requested one
            // First, compute the "projected" size for each dimension based on the aspect ratio and other dimension
            pMinWidth = b.minHeight * this.aspectRatio;
            pMinHeight = b.minWidth / this.aspectRatio;
            pMaxWidth = b.maxHeight * this.aspectRatio;
            pMaxHeight = b.maxWidth / this.aspectRatio;

            if(pMinWidth > b.minWidth) b.minWidth = pMinWidth;
            if(pMinHeight > b.minHeight) b.minHeight = pMinHeight;
            if(pMaxWidth < b.maxWidth) b.maxWidth = pMaxWidth;
            if(pMaxHeight < b.maxHeight) b.maxHeight = pMaxHeight;
        }
        this._vBoundaries = b;
    },

	_updateCache: function(data) {
		var o = this.options;
		this.offset = this.helper.offset();
		if (isNumber(data.left)) this.position.left = data.left;
		if (isNumber(data.top)) this.position.top = data.top;
		if (isNumber(data.height)) this.size.height = data.height;
		if (isNumber(data.width)) this.size.width = data.width;
	},

	_updateRatio: function(data, event) {

		var o = this.options, cpos = this.position, csize = this.size, a = this.axis;

		if (isNumber(data.height)) data.width = (data.height * this.aspectRatio);
		else if (isNumber(data.width)) data.height = (data.width / this.aspectRatio);

		if (a == 'sw') {
			data.left = cpos.left + (csize.width - data.width);
			data.top = null;
		}
		if (a == 'nw') {
			data.top = cpos.top + (csize.height - data.height);
			data.left = cpos.left + (csize.width - data.width);
		}

		return data;
	},

	_respectSize: function(data, event) {

		var el = this.helper, o = this._vBoundaries, pRatio = this._aspectRatio || event.shiftKey, a = this.axis,
				ismaxw = isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width), ismaxh = isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
					isminw = isNumber(data.width) && o.minWidth && (o.minWidth > data.width), isminh = isNumber(data.height) && o.minHeight && (o.minHeight > data.height);

		if (isminw) data.width = o.minWidth;
		if (isminh) data.height = o.minHeight;
		if (ismaxw) data.width = o.maxWidth;
		if (ismaxh) data.height = o.maxHeight;

		var dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height;
		var cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);

		if (isminw && cw) data.left = dw - o.minWidth;
		if (ismaxw && cw) data.left = dw - o.maxWidth;
		if (isminh && ch)	data.top = dh - o.minHeight;
		if (ismaxh && ch)	data.top = dh - o.maxHeight;

		// fixing jump error on top/left - bug #2330
		var isNotwh = !data.width && !data.height;
		if (isNotwh && !data.left && data.top) data.top = null;
		else if (isNotwh && !data.top && data.left) data.left = null;

		return data;
	},

	_proportionallyResize: function() {

		var o = this.options;
		if (!this._proportionallyResizeElements.length) return;
		var element = this.helper || this.element;

		for (var i=0; i < this._proportionallyResizeElements.length; i++) {

			var prel = this._proportionallyResizeElements[i];

			if (!this.borderDif) {
				var b = [prel.css('borderTopWidth'), prel.css('borderRightWidth'), prel.css('borderBottomWidth'), prel.css('borderLeftWidth')],
					p = [prel.css('paddingTop'), prel.css('paddingRight'), prel.css('paddingBottom'), prel.css('paddingLeft')];

				this.borderDif = $.map(b, function(v, i) {
					var border = parseInt(v,10)||0, padding = parseInt(p[i],10)||0;
					return border + padding;
				});
			}

			if ($.browser.msie && !(!($(element).is(':hidden') || $(element).parents(':hidden').length)))
				continue;

			prel.css({
				height: (element.height() - this.borderDif[0] - this.borderDif[2]) || 0,
				width: (element.width() - this.borderDif[1] - this.borderDif[3]) || 0
			});

		};

	},

	_renderProxy: function() {

		var el = this.element, o = this.options;
		this.elementOffset = el.offset();

		if(this._helper) {

			this.helper = this.helper || $('<div style="overflow:hidden;"></div>');

			// fix ie6 offset TODO: This seems broken
			var ie6 = $.browser.msie && $.browser.version < 7, ie6offset = (ie6 ? 1 : 0),
			pxyoffset = ( ie6 ? 2 : -1 );

			this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() + pxyoffset,
				height: this.element.outerHeight() + pxyoffset,
				position: 'absolute',
				left: this.elementOffset.left - ie6offset +'px',
				top: this.elementOffset.top - ie6offset +'px',
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper
				.appendTo("body")
				.disableSelection();

		} else {
			this.helper = this.element;
		}

	},

	_change: {
		e: function(event, dx, dy) {
			return { width: this.originalSize.width + dx };
		},
		w: function(event, dx, dy) {
			var o = this.options, cs = this.originalSize, sp = this.originalPosition;
			return { left: sp.left + dx, width: cs.width - dx };
		},
		n: function(event, dx, dy) {
			var o = this.options, cs = this.originalSize, sp = this.originalPosition;
			return { top: sp.top + dy, height: cs.height - dy };
		},
		s: function(event, dx, dy) {
			return { height: this.originalSize.height + dy };
		},
		se: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		sw: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		},
		ne: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		nw: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		}
	},

	_propagate: function(n, event) {
		$.ui.plugin.call(this, n, [event, this.ui()]);
		(n != "resize" && this._trigger(n, event, this.ui()));
	},

	plugins: {},

	ui: function() {
		return {
			originalElement: this.originalElement,
			element: this.element,
			helper: this.helper,
			position: this.position,
			size: this.size,
			originalSize: this.originalSize,
			originalPosition: this.originalPosition
		};
	}

});

$.extend($.ui.resizable, {
	version: "1.8.17"
});

/*
 * Resizable Extensions
 */

$.ui.plugin.add("resizable", "alsoResize", {

	start: function (event, ui) {
		var self = $(this).data("resizable"), o = self.options;

		var _store = function (exp) {
			$(exp).each(function() {
				var el = $(this);
				el.data("resizable-alsoresize", {
					width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
					left: parseInt(el.css('left'), 10), top: parseInt(el.css('top'), 10),
					position: el.css('position') // to reset Opera on stop()
				});
			});
		};

		if (typeof(o.alsoResize) == 'object' && !o.alsoResize.parentNode) {
			if (o.alsoResize.length) { o.alsoResize = o.alsoResize[0]; _store(o.alsoResize); }
			else { $.each(o.alsoResize, function (exp) { _store(exp); }); }
		}else{
			_store(o.alsoResize);
		}
	},

	resize: function (event, ui) {
		var self = $(this).data("resizable"), o = self.options, os = self.originalSize, op = self.originalPosition;

		var delta = {
			height: (self.size.height - os.height) || 0, width: (self.size.width - os.width) || 0,
			top: (self.position.top - op.top) || 0, left: (self.position.left - op.left) || 0
		},

		_alsoResize = function (exp, c) {
			$(exp).each(function() {
				var el = $(this), start = $(this).data("resizable-alsoresize"), style = {}, 
					css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ['width', 'height'] : ['width', 'height', 'top', 'left'];

				$.each(css, function (i, prop) {
					var sum = (start[prop]||0) + (delta[prop]||0);
					if (sum && sum >= 0)
						style[prop] = sum || null;
				});

				// Opera fixing relative position
				if ($.browser.opera && /relative/.test(el.css('position'))) {
					self._revertToRelativePosition = true;
					el.css({ position: 'absolute', top: 'auto', left: 'auto' });
				}

				el.css(style);
			});
		};

		if (typeof(o.alsoResize) == 'object' && !o.alsoResize.nodeType) {
			$.each(o.alsoResize, function (exp, c) { _alsoResize(exp, c); });
		}else{
			_alsoResize(o.alsoResize);
		}
	},

	stop: function (event, ui) {
		var self = $(this).data("resizable"), o = self.options;

		var _reset = function (exp) {
			$(exp).each(function() {
				var el = $(this);
				// reset position for Opera - no need to verify it was changed
				el.css({ position: el.data("resizable-alsoresize").position });
			});
		};

		if (self._revertToRelativePosition) {
			self._revertToRelativePosition = false;
			if (typeof(o.alsoResize) == 'object' && !o.alsoResize.nodeType) {
				$.each(o.alsoResize, function (exp) { _reset(exp); });
			}else{
				_reset(o.alsoResize);
			}
		}

		$(this).removeData("resizable-alsoresize");
	}
});

$.ui.plugin.add("resizable", "animate", {

	stop: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options;

		var pr = self._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
					soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
						soffsetw = ista ? 0 : self.sizeDiff.width;

		var style = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
					left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
						top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

		self.element.animate(
			$.extend(style, top && left ? { top: top, left: left } : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function() {

					var data = {
						width: parseInt(self.element.css('width'), 10),
						height: parseInt(self.element.css('height'), 10),
						top: parseInt(self.element.css('top'), 10),
						left: parseInt(self.element.css('left'), 10)
					};

					if (pr && pr.length) $(pr[0]).css({ width: data.width, height: data.height });

					// propagating resize, and updating values for each animation step
					self._updateCache(data);
					self._propagate("resize", event);

				}
			}
		);
	}

});

$.ui.plugin.add("resizable", "containment", {

	start: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options, el = self.element;
		var oc = o.containment,	ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;
		if (!ce) return;

		self.containerElement = $(ce);

		if (/document/.test(oc) || oc == document) {
			self.containerOffset = { left: 0, top: 0 };
			self.containerPosition = { left: 0, top: 0 };

			self.parentData = {
				element: $(document), left: 0, top: 0,
				width: $(document).width(), height: $(document).height() || document.body.parentNode.scrollHeight
			};
		}

		// i'm a node, so compute top, left, right, bottom
		else {
			var element = $(ce), p = [];
			$([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) { p[i] = num(element.css("padding" + name)); });

			self.containerOffset = element.offset();
			self.containerPosition = element.position();
			self.containerSize = { height: (element.innerHeight() - p[3]), width: (element.innerWidth() - p[1]) };

			var co = self.containerOffset, ch = self.containerSize.height,	cw = self.containerSize.width,
						width = ($.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw ), height = ($.ui.hasScroll(ce) ? ce.scrollHeight : ch);

			self.parentData = {
				element: ce, left: co.left, top: co.top, width: width, height: height
			};
		}
	},

	resize: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options,
				ps = self.containerSize, co = self.containerOffset, cs = self.size, cp = self.position,
				pRatio = self._aspectRatio || event.shiftKey, cop = { top:0, left:0 }, ce = self.containerElement;

		if (ce[0] != document && (/static/).test(ce.css('position'))) cop = co;

		if (cp.left < (self._helper ? co.left : 0)) {
			self.size.width = self.size.width + (self._helper ? (self.position.left - co.left) : (self.position.left - cop.left));
			if (pRatio) self.size.height = self.size.width / o.aspectRatio;
			self.position.left = o.helper ? co.left : 0;
		}

		if (cp.top < (self._helper ? co.top : 0)) {
			self.size.height = self.size.height + (self._helper ? (self.position.top - co.top) : self.position.top);
			if (pRatio) self.size.width = self.size.height * o.aspectRatio;
			self.position.top = self._helper ? co.top : 0;
		}

		self.offset.left = self.parentData.left+self.position.left;
		self.offset.top = self.parentData.top+self.position.top;

		var woset = Math.abs( (self._helper ? self.offset.left - cop.left : (self.offset.left - cop.left)) + self.sizeDiff.width ),
					hoset = Math.abs( (self._helper ? self.offset.top - cop.top : (self.offset.top - co.top)) + self.sizeDiff.height );

		var isParent = self.containerElement.get(0) == self.element.parent().get(0),
		    isOffsetRelative = /relative|absolute/.test(self.containerElement.css('position'));

		if(isParent && isOffsetRelative) woset -= self.parentData.left;

		if (woset + self.size.width >= self.parentData.width) {
			self.size.width = self.parentData.width - woset;
			if (pRatio) self.size.height = self.size.width / self.aspectRatio;
		}

		if (hoset + self.size.height >= self.parentData.height) {
			self.size.height = self.parentData.height - hoset;
			if (pRatio) self.size.width = self.size.height * self.aspectRatio;
		}
	},

	stop: function(event, ui){
		var self = $(this).data("resizable"), o = self.options, cp = self.position,
				co = self.containerOffset, cop = self.containerPosition, ce = self.containerElement;

		var helper = $(self.helper), ho = helper.offset(), w = helper.outerWidth() - self.sizeDiff.width, h = helper.outerHeight() - self.sizeDiff.height;

		if (self._helper && !o.animate && (/relative/).test(ce.css('position')))
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

		if (self._helper && !o.animate && (/static/).test(ce.css('position')))
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

	}
});

$.ui.plugin.add("resizable", "ghost", {

	start: function(event, ui) {

		var self = $(this).data("resizable"), o = self.options, cs = self.size;

		self.ghost = self.originalElement.clone();
		self.ghost
			.css({ opacity: .25, display: 'block', position: 'relative', height: cs.height, width: cs.width, margin: 0, left: 0, top: 0 })
			.addClass('ui-resizable-ghost')
			.addClass(typeof o.ghost == 'string' ? o.ghost : '');

		self.ghost.appendTo(self.helper);

	},

	resize: function(event, ui){
		var self = $(this).data("resizable"), o = self.options;
		if (self.ghost) self.ghost.css({ position: 'relative', height: self.size.height, width: self.size.width });
	},

	stop: function(event, ui){
		var self = $(this).data("resizable"), o = self.options;
		if (self.ghost && self.helper) self.helper.get(0).removeChild(self.ghost.get(0));
	}

});

$.ui.plugin.add("resizable", "grid", {

	resize: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options, cs = self.size, os = self.originalSize, op = self.originalPosition, a = self.axis, ratio = o._aspectRatio || event.shiftKey;
		o.grid = typeof o.grid == "number" ? [o.grid, o.grid] : o.grid;
		var ox = Math.round((cs.width - os.width) / (o.grid[0]||1)) * (o.grid[0]||1), oy = Math.round((cs.height - os.height) / (o.grid[1]||1)) * (o.grid[1]||1);

		if (/^(se|s|e)$/.test(a)) {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
		}
		else if (/^(ne)$/.test(a)) {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
			self.position.top = op.top - oy;
		}
		else if (/^(sw)$/.test(a)) {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
			self.position.left = op.left - ox;
		}
		else {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
			self.position.top = op.top - oy;
			self.position.left = op.left - ox;
		}
	}

});

var num = function(v) {
	return parseInt(v, 10) || 0;
};

var isNumber = function(value) {
	return !isNaN(parseInt(value, 10));
};

})(jQuery);
;
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["socrates-package_inputtext"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+='<input type="text" placeholder="',h=c.placeholder,h?g=h.call(b,{hash:{}}):(g=b.placeholder,g=typeof g===i?g():g),f+=j(g)+'" disabled="disabled"></input>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["socrates-package_socrates-nav"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+='\n	<span class="event ',f=c.complete,f?e=f.call(a,{hash:{}}):(e=a.complete,e=typeof e===h?e():e),d+=i(e)+'" style="left: ',f=c.percentage,f?e=f.call(a,{hash:{}}):(e=a.percentage,e=typeof e===h?e():e),d+=i(e)+'%">\n		<div class="stem"></div>\n		<a href="#',f=c.slug,f?e=f.call(a,{hash:{}}):(e=a.slug,e=typeof e===h?e():e),d+=i(e)+'" class="icon" title="',f=c.time,f?e=f.call(a,{hash:{}}):(e=a.time,e=typeof e===h?e():e),d+=i(e)+": ",f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===h?e():e),d+=i(e)+'"></a>\n	</span>\n	',d}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div class="timebar">\n	',g=b.questions,g=c.each.call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;return f+="\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["socrates-package_submit-area"]=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;return d+='\n    <a class="explain simple-button action-gradient" href="',f=c.explainUrl,f?e=f.call(a,{hash:{}}):(e=a.explainUrl,e=typeof e===h?e():e),d+=i(e)+'">&laquo; Explain again</a>\n    ',d}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div class="submit-area">\n    ',g=b.explainUrl,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;return f+='\n    <button type="submit" class="submit simple-button action-gradient green">Submit</button>\n    <span class="alert alert-success">\n        <img class="face" src="/khan-exercises/css/images/face-smiley.gif">\n        Correct!\n    </span>\n    <span class="alert alert-error">\n        <img class="face" src="/khan-exercises/css/images/face-sad.gif">\n        Incorrect\n        <a class="see-answer" href="javascript: void 0">See Answer</a>\n    </span>\n    <a class="skip simple-button action-gradient" href="javascript:void 0">Skip &raquo;</a>\n</div>\n',f})})();
// Poppler is an event triggering library for streams.

var Poppler = (function() {
    function Poppler() {
        this.events = [];
        this.duration = -1;
        this.eventIndex = 0;
        _.bindAll(this);
    }

    Poppler.timeFn = function(e) { return e.time; };

    Poppler.nextPeriod = function(n, period) {
        return Math.round(Math.floor(n / period + 1)) * period;
    };

    Poppler.prototype.add = function(time, fn) {
        fn.time = time;
        var i = _.sortedIndex(this.events, fn, Poppler.timeFn);

        // if there are existing elements with the same time, insert afterwards
        while (this.events[i] && this.events[i].time == time) i++;

        this.events.splice(i, 0, fn);
    };

    Poppler.prototype.trigger = function trigger(time) {
        if (this.blocked) return;

        var delta = time - this.duration;

        // ignore duplicate triggers
        var epsilon = 0.001;
        if (Math.abs(delta) < epsilon) return;

        // ignore any huge jumps
        var maxJumpSize = 1;
        if (Math.abs(delta) > maxJumpSize) return;

        // get a new duration
        this.duration = time;
        this.triggerEvents();
    };

    Poppler.prototype.triggerEvents = function() {
        while (this.events[this.eventIndex] && this.events[this.eventIndex].time <= this.duration) {
            var blocking = this.events[this.eventIndex]();
            this.eventIndex++;
            if (blocking) {
                this.blocked = true;
                break;
            }
        }
    };

    Poppler.prototype.resumeEvents = function() {
        this.blocked = false;
        this.triggerEvents();
    };

    Poppler.prototype.seek = function(time) {
        this.duration = time;
        this.eventIndex = _.sortedIndex(this.events, {time: this.duration}, Poppler.timeFn);
    };

    return Poppler;
})();
;
Socrates = {};

// this should work with a QuestionView
Socrates.ControlPanel = Backbone.View.extend({
    el: ".interactive-video-controls",

    controls: [],

    events: {
        "click button#label": "addLabel",
        "click button#inputtext": "addInputText"
    },

    addLabel: function() {
        this.addView(new Socrates.Label());
    },

    addInputText: function() {
        this.addView(new Socrates.InputText());
    },

    addView: function(view) {
        this.controls.push(view);

        // place in document before rendering, as jquery.ui checks if element is
        // positioned, and positioning is done in external CSS.
        this.$controlEl.append(view.el);
        view.render();
    },

    serializeHtml: function() {
        _.each(this.controls, function(c) {
            c.moveable(false);
        });
        return this.$controlEl.html();
    }
}, {
    onReady: function() {
        window.ControlPanel = new Socrates.ControlPanel();
    }
});

// Editing actions needed:
// 1. Lock / unlock moving (console)
// 2. Delete (console)
// 3. Edit text (dblclick)

Socrates.Label = Backbone.View.extend({
    tagName: "div",
    className: "label",

    events: {
        "dblclick": "promptForContents"
    },

    render: function() {
        this.$el.text("Default label contents");
        this.moveable(true);
        return this;
    },

    isMoveable: false,
    moveable: function(val) {
        if (val === this.isMoveable) return this;
        if (val == null) {
            val = !this.isMoveable;
        }
        this.isMoveable = val;

        if (this.isMoveable) {
            this.$el
                .addClass("moveable")
                .resizable()
                .draggable();
        } else {
            this.$el
                .removeClass("moveable")
                .resizable("destroy")
                .draggable("destroy");
        }

        return this;
    },

    promptForContents: function(evt) {
        var contents = prompt("Enter label contents", this.$el.text());
        this.$el.text(contents);
        if (this.isMoveable) {
            // need to toggle as .text() destroys the corner thing
            this.moveable(false);
            this.moveable(true);
        }
    },

    serializedForm: function() {

    }
});

Socrates.InputText = Backbone.View.extend({
    className: "inputtext",
    template: Templates.get("socrates.inputtext"),

    events: {
        "dblclick": "promptForContents"
    },

    render: function() {
        var contents = this.template({
            placeholder: "?"
        });
        this.$el.html(contents);
        this.moveable(true);
        return this;
    },

    isMoveable: false,
    moveable: function(val) {
        if (val === this.isMoveable) return this;
        if (val == null) {
            val = !this.isMoveable;
        }
        this.isMoveable = val;

        if (this.isMoveable) {
            this.$el
                .addClass("moveable")
                .resizable()
                .draggable();
        } else {
            this.$el
                .removeClass("moveable")
                .resizable("destroy")
                .draggable("destroy");
        }

        return this;
    },

    promptForContents: function(evt) {
        var $input = this.$("input");
        var contents = prompt("Enter placeholder contents",
            $input.attr("placeholder"));
        $input.attr("placeholder", contents);
    },

    serializedForm: function() {
        this.$("input").prop("disabled", false);
    }
});

Socrates.Bookmark = Backbone.Model.extend({
    defaults: {
        complete: false
    },

    seconds: function() {
        return Socrates.Question.timeToSeconds(this.get("time"));
    },

    slug: function() {
        return _.str.slugify(this.get("title"));
    },

    toJSON: function() {
        var json = Backbone.Model.prototype.toJSON.call(this);
        json.slug = this.slug();
        return json;
    }
}, {
    timeToSeconds: function(time) {
        if (time == null || time.length === 0) {
            throw "Invalid argument";
        }
        // convert a string like "4m21s" into just the number of seconds
        result = 0;
        var i = 0;
        while (time[i]) {
            var start = i;
            while (time[i] && /[\d\.,]/.test(time[i])) i++;
            var n = parseFloat(time.slice(start, i));
            var unit = time[i] || "s"; // assume seconds if reached end
            if (unit == "m") {
                result += n * 60;
            } else if (unit == "s") {
                result += n;
            } else {
                throw "Unimplemented unit, only ISO8601 durations with mins and secs";
            }
            i++;
        }
        return result;
    }
});

// todo(dmnd): need to make this less confusing
Socrates.Question = Socrates.Bookmark.extend({
    baseSlug: Socrates.Bookmark.prototype.slug,

    slug: function() {
        return this.baseSlug() + "/q";
    },

    imageUrl: function() {
        return this.get("youtubeId") + "-" + this.get("time");
    },

    templateName: function() {
        return this.get("youtubeId") + "." + this.baseSlug();
    }
});

Socrates.QuestionCollection = Backbone.Collection.extend({
    model: Socrates.Question
});

Socrates.QuestionView = Backbone.View.extend({
    className: "question",

    events: {
        "submit form": "submit",
        "click .submit-area a.skip": "skip",
        "click .close": "skip",
        "click .submit-area a.see-answer": "seeAnswerClicked"
    },

    timeDisplayed: 0,
    startTime: null,

    initialize: function() {
        _.extend(this, this.options);
        this.version = 1;
        this.loaded = false;
        this.template = Templates.get(this.model.templateName());

        this.render();
    },

    render: function() {
        this.$el.html(this.template({
            title: this.model.get("title"),
            explainUrl: this.model.get("nested")
        }));

        // add in a backdrop if necessary
        var $screenshot = this.$(".layer.backdrop.videoframe");
        if ($screenshot.length > 0) {
            $screenshot.append($("<img>", {src: this.imageUrl()}));
        }

        // linkify the explain button
        var parent = this.model.get("nested");
        if (parent) {
            this.$(".simple-button.explain").attr("href", "#" + parent);
        }
        this.loaded = true;

        return this;
    },

    qtip: function() {
        var qtipq = this.$(".qtip-question");
        if (qtipq.length > 0) {
            var $controls = this.$('.controls');
            $controls.qtip({
                content: {
                    text: qtipq,
                    title: this.model.get('title')
                },
                position: $.extend({
                    container: $controls,
                    at: [0, 0]
                }, this.model.get('qtip-position')),
                style: {
                    classes: "ui-tooltip ui-tooltip-rounded ui-tooltip-shadow"
                },
                show: {
                    event: false,
                    ready: true
                },
                hide: false
            });
        }
    },

    hide: function() {
        this.finishRecordingTime();
        this.$el.removeClass("visible");
        return this;
    },

    finishRecordingTime: function() {
        if (this.startTime) {
            this.timeDisplayed += (+new Date() - this.startTime);
            this.startTime = null;
        } else {
            this.timeDisplayed = 0;
        }
        return this.timeDisplayed;
    },

    show: function() {
        this.startTime = +new Date();
        this.$el.addClass("visible");
        this.qtip();
        return this;
    },

    imageUrl: function() {
        return "/images/videoframes/" + this.model.imageUrl() + ".jpeg";
    },

    isCorrect: function(data) {
        var correctAnswer = this.model.get("correctData");

        // if no answer is specified, any answer is correct
        if (correctAnswer == null) {
            return true;
        }

        // otherwise make sure they got it right.
        // todo: look at how khan-exercise does their fancy number handling
        return _.isEqual(data, correctAnswer);
    },

    getData: function() {
        data = {};

        // process all matrix-inputs
        var $matrixInputs = this.$("table.matrix-input");
        data = _.extend(data, this.matrixInputToAnswer($matrixInputs));

        // process all checkbox-grids
        var $checkboxGrids = this.$("table.checkbox-grid");
        data = _.extend(data, this.checkBoxGridToAnswer($checkboxGrids));

        // process the result of the inputs
        var $inputs = this.$("input").
            not($matrixInputs.find("input")).
            not($checkboxGrids.find("input"));

        data = _.extend(data, this.freeInputsToAnswer($inputs));
        return data;
    },

    matrixInputToAnswer: function($matrixInputs) {
        var data = {};
        _.each($matrixInputs, function(table) {
            var matrix = _.map($(table).find("tr"), function(tr) {
                return _.map($(tr).find("input"), function(input) {
                    return parseFloat($(input).val());
                });
            });

            var name = $(table).attr("name") || "answer";
            data[name] = matrix;
        });
        return data;
    },

    checkBoxGridToAnswer: function($checkboxGrids) {
        var data = {};
        _.each($checkboxGrids, function(grid) {
            var headers = _.map($(grid).find("thead th"), function(td) {
                return $(td).attr("name");
            });
            headers = _.rest(headers, 1);
            var answer = {};
            _.each($(grid).find("tbody tr"), function(tr) {
                var row = {};
                _.each($(tr).find("input"), function(input, i) {
                    row[headers[i]] = $(input).prop("checked");
                });
                answer[$(tr).attr("name")] = row;
            });

            var name = $(grid).attr("name") || "answer";
            data[name] = answer;
        });
        return data;
    },

    freeInputsToAnswer: function($inputs) {
        var data = {};
        $inputs.each(function(i, el) {
            var $el = $(el);
            var key = $el.attr("name");

            var val;
            if ($el.attr("type") === "checkbox") {
                val = $el.prop("checked");
            } else if ($el.attr("type") === "radio") {
                if ($el.prop("checked")) {
                    val = $el.val();
                } else {
                    // ignore if it's an unchecked radio button
                    return true; // continue
                }
            } else {
                val = $el.val();
            }

            var isArray = false;
            if (data[key] != null) {
                if (!_.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                isArray = true;
            }

            if (isArray) {
                data[key].push(val);
            } else {
                data[key] = val;
            }
        });
        return data;
    },

    seeAnswerClicked: function() {
        this.$(".submit-area .submit").prop("disabled", true);
        this.showMem();
        this.loadAnswer();
    },

    loadAnswer: function() {
        var data = $.extend(true, {}, this.model.get("correctData"));

        // process all matrix-inputs
        var $matrixInputs = this.$("table.matrix-input");
        data = this.answerToMatrixInputs($matrixInputs, data);

        // process all checkbox-grids
        var $checkboxGrids = this.$("table.checkbox-grid");
        data = this.answerToCheckboxGrids($checkboxGrids, data);

        // process the result of the inputs
        var $inputs = this.$("input").
            not($matrixInputs.find("input")).
            not($checkboxGrids.find("input"));

        data = this.answerToFreeInputs($inputs, data);

        // by now data should be empty
        if (!_.isEmpty(data)) {
            console.log("failed to load answer correctly");
        }
    },

    answerToMatrixInputs: function($matrixInputs, data) {
        _.each($matrixInputs, function(table) {
            var name = $(table).attr("name") || "answer";
            var matrix = data[name];

            _.each($(table).find("tr"), function(tr, i) {
                return _.each($(tr).find("input"), function(input, j) {
                    $(input).val(matrix[i][j]);
                });
            });

            delete data[name];
        });
        return data;
    },

    answerToCheckboxGrids: function($checkboxGrids, data) {
        _.each($checkboxGrids, function(grid) {
            var name = $(grid).attr("name") || "answer";
            var answer = data[name];

            var headers = _.map($(grid).find("thead th"), function(td) {
                return $(td).attr("name");
            });
            headers = _.rest(headers, 1);
            _.each($(grid).find("tbody tr"), function(tr) {
                var rowName = $(tr).attr("name");
                _.each($(tr).find("input"), function(input, i) {
                    $(input).prop("checked", answer[rowName][headers[i]]);
                });
            });
        });
        return data;
    },

    answerToFreeInputs: function($inputs, data) {
        $inputs.each(function(i, el) {
            var $el = $(el);
            var key = $el.attr("name");

            var val = data[key];
            var isArray = _.isArray(data[key]);
            if (isArray) {
                val = data[key].pop();
            }
            // delete the item unless it's a nonempty array
            if (!(isArray && !_.isEmpty(data[key]))) {
                delete data[key];
            }

            if ($el.attr("type") === "checkbox") {
                $el.prop("checked", val);
            } if ($el.attr("type") === "radio") {
                if ($el.val() === val) {
                    $el.prop("checked", true);
                }
                else {
                    // put the item back since we can't use it
                    data[key] = val;
                    return true; // continue
                }
            } else {
                $el.val(val);
            }
        });

        return data;
    },

    getResponse: function() {
        // get response data
        var data = this.getData();

        // find how long it took to answer, then reset the countera
        var timeDisplayed = this.finishRecordingTime();
        this.timeDisplayed = 0;

        return {
            time: this.model.get("time"),
            youtubeId: this.model.get("youtubeId"),
            id: this.model.get("id"),
            version: this.version,
            correct: this.isCorrect(data),
            data: data,
            timeDisplayed: timeDisplayed
        };
    },

    validateResponse: function(response) {
        requiredProps = ["id", "version", "correct", "data", "youtubeId",
            "time"];
        var hasAllProps = _.all(requiredProps, function(prop) {
            return response[prop] != null;
        });
        if (!hasAllProps) {
            console.log(response);
            throw "Invalid response from question";
        }
        return true;
    },

    alreadyFiredAnswered: false,
    fireAnswered: function() {
        if (!this.alreadyFiredAnswered) {
            this.alreadyFiredAnswered = true;

            // notify router that the question was answered correctly
            this.trigger("answered");
        }
    },

    submit: function(evt) {
        evt.preventDefault();
        var $form = $(evt.currentTarget);
        var $button = $form.find(".submit");

        // when question has been answered correctly, the submit button
        // says continue.
        if ($button.text() === "Continue") {
            this.fireAnswered();
            return;
        }

        // otherwise, get the answer
        var response = this.getResponse();
        this.validateResponse(response);

        // log it on the server side
        this.log("submit", response);

        // tell the user if they got it right or wrong
        if (response.correct) {
            this.model.set({"complete": true});

            this.$(".submit-area .alert-error").hide();
            this.$(".submit-area .alert-success").show();

            if ($button) {
                $button.html("Continue");
            }

            if (this.hasMem()) {
                this.showMem();
            } else {
                // otherwise resume the video in 3s
                _.delay(_.bind(this.fireAnswered, this), 3000);
            }
        } else {
            this.$(".submit-area .alert-success").hide();
            this.$(".submit-area .alert-error").show();
        }
    },

    hasMem: function() {
        return this.$(".mem").length > 0;
    },

    showMem: function() {
        this.$(".mem").slideDown(350, 'easeInOutCubic');
    },

    skip: function() {
        var response = this.getResponse();
        this.validateResponse(response);
        this.log("skip", response);
        this.trigger("skipped");
    },

    log: function(kind, response) {
        console.log("POSTing response", kind, response);
    }
});

Socrates.MasterView = Backbone.View.extend({
    initialize: function(options) {
        this.views = options.views;
    },

    render: function() {
        this.$el.append(_.pluck(this.views, "el"));
    }
});

Socrates.Nav = Backbone.View.extend({
    template: Templates.get("socrates.socrates-nav"),

    initialize: function() {
        this.model.bind("change", this.render, this);
    },

    questionsJson: function() {
        return this.model.
            filter(function(i) {return i.constructor == Socrates.Question;}).
            map(function(question) {
                var pc = question.seconds() / this.options.videoDuration * 100;
                return {
                    title: question.get("title"),
                    time: question.get("time"),
                    slug: question.slug(),
                    percentage: pc,
                    complete: question.get("complete") ? "complete" : ""
                };
            }, this);
    },

    render: function() {
        this.$el.html(this.template({
            questions: this.questionsJson()
        }));
        return this;
    }
});

var recursiveTrigger = function recursiveTrigger(triggerFn) {
    var t = window.VideoStats.getSecondsWatched();

    triggerFn(t);

    // schedule another call when the duration is probably ticking over to
    // the next tenth of a second
    t = window.VideoStats.getSecondsWatched();
    var delay = (Poppler.nextPeriod(t, 0.1) - t) * 1000;
    _.delay(recursiveTrigger, delay, triggerFn);
};

Socrates.QuestionRouter = Backbone.Router.extend({
    routes: {
        ":segment": "reactToNewFragment",
        ":segment/:qid": "reactToNewFragment"
    },

    initialize: function(options) {
        _.defaults(options, this.constructor.defaults);

        this.beep = new Audio("");
        var mimeTypes = {
            "ogg": "audio/ogg",
            "mp3": "audio/mpeg",
            "wav": "audio/x-wav"
        };
        var ext;
        var match = _.find(mimeTypes, function(i, k) {
            if (this.beep.canPlayType(mimeTypes[k]) !== "") {
                ext = k;
                return true;
            }
            return false;
        }, this);
        if (match) {
            this.beep.src = options.beepUrl + "." + ext;
            this.beep.volume = options.beepVolume;
        } else {
            this.beep = null;
        }

        this.videoControls = options.videoControls;

        // listen to player state changes
        $(this.videoControls).on("playerStateChange",
            _.bind(this.playerStateChange, this));

        this.bookmarks = options.bookmarks;

        this.questions = this.bookmarks.filter(function(b) {
            return b.constructor.prototype === Socrates.Question.prototype;
        });

        // wrap each question in a view
        this.questionViews = this.questions.map(function(question) {
            return new Socrates.QuestionView({model: question});
        });

        // subscribe to submit and skip
        _.each(this.questionViews, function(view) {
            view.bind("skipped", this.skipped, this);
            view.bind("answered", this.submitted, this);
        }, this);

        // hookup question display to video timelime
        this.poppler = new Poppler();
        _.each(this.questions, function(q) {
            this.poppler.add(q.seconds(), _.bind(this.videoTriggeredQuestion, this, q));
        }, this);

        // trigger poppler every tenth of a second
        recursiveTrigger(_.bind(this.poppler.trigger, this.poppler));
    },

    // todo(dmnd) remove magic numbers, use named constants
    playerStateChange: function(evt, state) {
        if (state === 1) { // playing
            if (this.ignoreNextPlay) {
                this.ignoreNextPlay = false;
            } else {
                var t = VideoStats.getSecondsWatched();
                this.poppler.seek(t);
            }
        } else if (state === 2) { // paused
            // sometimes the video buffers then pauses. When this happens, allow
            // the next play event to cause a seek
            this.ignoreNextPlay = false;
        } else if (state === 3) { // buffering
            // buffering is usually followed by a play event. We only care about
            // play events caused by the user scrubbing, so ignore it
            this.ignoreNextPlay = true;
        }
    },

    // recieved a question or view, find the corresponding view
    questionToView: function(view) {
        if (view.constructor.prototype == Socrates.Question.prototype) {
            view = _.find(this.questionViews, function(v) { return v.model == view; });
        }
        return view;
    },

    reactToNewFragment: function(segment, qid) {
        if (qid) {
            segment = segment + "/" + qid;
        }

        // blank fragment for current state of video
        if (segment === "") {
            this.leaveCurrentState();
        }

        // top level question
        // slug for navigating to a particular question
        var question = this.bookmarks.find(function(b) {
            return b.slug() === segment;
        });
        if (question) {
            if (question.constructor.prototype === Socrates.Question.prototype) {
                this.linkTriggeredQuestion(question);
                return;
            } else {
                // was a bookmark
                var seconds = question.seconds();
                this.fragmentTriggeredSeek(seconds);
                return;
            }
        }

        // seek to time, e.g. 4m32s
        try {
            var seconds = Socrates.Question.timeToSeconds(slug);
            this.fragmentTriggeredSeek(seconds);
            return;
        } catch (e) {
            // ignore
        }

        // invalid fragment, replace it with nothing

        // todo(dmnd) replace playing with something that makes more sense
        this.navigate("playing", {replace: true, trigger: true});
    },

    // called when video was playing and caused a question to trigger
    videoTriggeredQuestion: function(question) {
        // pause the video
        this.videoControls.pause();
        if (this.beep != null) {
            this.beep.play();
        }

        // update the fragment in the URL
        this.navigate(question.slug());

        this.enterState(question);
        return true; // block poppler
    },

    // called when question has been triggered manually via clicking a link
    linkTriggeredQuestion: function(question) {
        this.videoControls.invokeWhenReady(_.bind(function() {
            // notify poppler
            this.poppler.blocked = true;
            this.poppler.seek(question.seconds());
            this.poppler.eventIndex++; // make poppler only listen to events after the current one

            // put video in correct position
            this.videoControls.pause();
            if (this.videoControls.player.getPlayerState() === 2) {
                // only seek to the correct spot if we are actually paused
                this.videoControls.player.seekTo(question.seconds(), true);
            }

            this.enterState(question);
        }, this));
    },

    fragmentTriggeredSeek: function(seconds) {
        this.leaveCurrentState();
        this.videoControls.invokeWhenReady(_.bind(function() {
            this.poppler.blocked = true;
            this.poppler.seek(seconds);
            this.videoControls.player.seekTo(seconds, true);
            if (this.videoControls.player.getPlayerState() === 2) {
                // if paused, resume
                this.videoControls.play();
            }
            this.poppler.blocked = false;
        }, this));
    },

    enterState: function(view) {
        this.leaveCurrentState();

        var nextView = this.questionToView(view);
        if (nextView) {
            this.currentView = nextView;
            this.currentView.show();
        } else {
            console.log("no view, wtf");
        }

        return this;
    },

    leaveCurrentState: function() {
        if (this.currentView) {
            if (this.currentView.hide)
                this.currentView.hide();
            this.currentView = null;
        }
        return this;
    },

    skipped: function() {
        var seconds = this.currentView.model.seconds();
        this.currentView.hide();

        this.navigate("playing");
        this.poppler.resumeEvents();

        if (this.poppler.blocked) {
            // another blocking event was present. Do nothing.
        } else {
            // no more events left, play video

            // prevent seek() from being called
            this.ignoreNextPlay = true;

            if (this.videoControls.player.getPlayerState() == 2) {
                this.videoControls.play();
            }
            else {
                this.videoControls.player.seekTo(seconds);
            }
        }
    },

    submitted: function() {
        this.skipped();
    }
}, {
    defaults: {
        beepUrl: "/sounds/72126__kizilsungur__sweetalertsound2",
        beepVolume: 0.3
    }
});

Socrates.Skippable = (function() {
    var Skippable = function(options) {
        _.extend(this, options);
    };

    Skippable.prototype.seconds = function() {
        return _.map(this.span, Socrates.Question.timeToSeconds);
    };

    Skippable.prototype.trigger = function() {
        var pos = this.seconds()[1];
        this.videoControls.player.seekTo(pos, true);
    };

    return Skippable;
})();

Socrates.init = function(youtubeId) {
    // Create data
    window.Bookmarks = new Backbone.Collection(Socrates.Data[youtubeId].Events);


    // Create router which will manage transitions between questions
    window.Router = new Socrates.QuestionRouter({
        bookmarks: window.Bookmarks,
        videoControls: window.VideoControls
    });

    // For now, don't call Video.init() Just render the page then let our router
    // take over.
    // todo(dmnd) Integrate socrates & ajax video player routers. May need to
    // use hashChange from here: https://github.com/documentcloud/backbone/issues/803
    Video.videoLibrary = {};
    Video.pushStateDisabled = true;
    Video.navigateToVideo(window.location.pathname);
    Backbone.history.start({
        pushState: false,
        root: window.location.pathname
    });


    // Render views
    VideoControls.invokeWhenReady(function() {
        var duration = VideoControls.player.getDuration();
        window.nav = new Socrates.Nav({
            el: ".socrates-nav",
            model: Bookmarks,
            videoDuration: duration
        });
        nav.render();
    });

    window.masterView = new Socrates.MasterView({
        el: ".video-overlay",
        views: Router.questionViews
    });
    masterView.render();
};

Socrates.initSkips = function(youtubeId) {
    window.skippable = _.map(Socrates.Data[youtubeId].Skips, function(item) {
        return new Socrates.Skippable(_.extend(item, {videoControls: window.VideoControls}));
    });
    _.each(skippable, function(item) {
        poppler.add(item.seconds()[0], _.bind(item.trigger, item));
    });
};

// This will be populated by video-specific javascript.
Socrates.Data = {};

Handlebars.registerPartial("submit-area", Templates.get("socrates.submit-area"));

// todo(dmnd) only run this in edit mode
$(Socrates.ControlPanel.onReady);
