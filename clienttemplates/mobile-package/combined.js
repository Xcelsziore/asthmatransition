/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Matches dashed string for camelizing
	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.7.1",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// Add the callback
		readyList.add( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {
		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.fireWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).off( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array, i ) {
		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

return jQuery;

})();


// String to Object flags format cache
var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
function createFlags( flags ) {
	var object = flagsCache[ flags ] = {},
		i, length;
	flags = flags.split( /\s+/ );
	for ( i = 0, length = flags.length; i < length; i++ ) {
		object[ flags[i] ] = true;
	}
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	flags:	an optional list of space-separated flags that will change how
 *			the callback list behaves
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible flags:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( flags ) {

	// Convert flags from String-formatted to Object-formatted
	// (we check in cache first)
	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = [],
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Add one or several callbacks to the list
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					// Inspect recursively
					add( elem );
				} else if ( type === "function" ) {
					// Add if not in unique mode and callback is not in
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		// Fire callbacks
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								// Handle firingIndex and firingLength
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								// Remove the element
								list.splice( i--, 1 );
								// If we have some unicity property then
								// we only need to do this once
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!memory;
			}
		};

	return self;
};




var // Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({

	Deferred: function( func ) {
		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
					return this;
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	}
});




jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		fragment,
		tds,
		events,
		eventName,
		i,
		isSupported,
		div = document.createElement( "div" ),
		documentElement = document.documentElement;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	div.innerHTML = "";

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( window.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.style.width = "2px";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	fragment.removeChild( div );

	// Null elements to avoid leaks in IE
	fragment = select = opt = marginDiv = div = input = null;

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, outer, inner, table, td, offsetSupport,
			conMarginTop, ptlm, vb, style, html,
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		conMarginTop = 1;
		ptlm = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;";
		vb = "visibility:hidden;border:0;";
		style = "style='" + ptlm + "border:5px solid #000;padding:0;'";
		html = "<div " + style + "><div></div></div>" +
			"<table " + style + " cellpadding='0' cellspacing='0'>" +
			"<tr><td></td></tr></table>";

		container = document.createElement("div");
		container.style.cssText = vb + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName( "td" );
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Figure out if the W3C box model works as expected
		div.innerHTML = "";
		div.style.width = div.style.paddingLeft = "1px";
		jQuery.boxModel = support.boxModel = div.offsetWidth === 2;

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.style.display = "inline";
			div.style.zoom = 1;
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
		}

		div.style.cssText = ptlm + vb;
		div.innerHTML = html;

		outer = div.firstChild;
		inner = outer.firstChild;
		td = outer.nextSibling.firstChild.firstChild;

		offsetSupport = {
			doesNotAddBorder: ( inner.offsetTop !== 5 ),
			doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
		};

		inner.style.position = "fixed";
		inner.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
		inner.style.position = inner.style.top = "";

		outer.style.overflow = "hidden";
		outer.style.position = "relative";

		offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
		offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

		body.removeChild( container );
		div  = container = null;

		jQuery.extend( support, offsetSupport );
	});

	return support;
})();




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
			isEvents = name === "events";

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Users should not attempt to inspect the internal events object using jQuery.data,
		// it is undocumented and subject to change. But does anyone listen? No.
		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			// Reference to internal data cache key
			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ internalKey ] : internalKey;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split( " " );
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		// Ensure that `cache` is not a window object #10080
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the cache and need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ internalKey ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( internalKey );
			} else {
				elem[ internalKey ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, attr, name,
			data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 && !jQuery._data( this[0], "parsedAttrs" ) ) {
					attr = this[0].attributes;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( this[0], name, data[ name ] );
						}
					}
					jQuery._data( this[0], "parsedAttrs", true );
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var self = jQuery( this ),
					args = [ parts[0], value ];

				self.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				jQuery.isNumeric( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery._data( elem, deferDataKey );
	if ( defer &&
		( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
		( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !jQuery._data( elem, queueDataKey ) &&
				!jQuery._data( elem, markDataKey ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function() {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			}
		}
		resolve();
		return defer.promise();
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	nodeHook, boolHook, fixSpecified;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.prop );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = ( value || "" ).split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, l,
			i = 0;

		if ( value && elem.nodeType === 1 ) {
			attrNames = value.toLowerCase().split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;

					// See #9699 for explanation of this approach (setting first, then removal)
					jQuery.attr( elem, name, "" );
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( rboolean.test( name ) && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};

	// Apply the nodeHook to tabindex
	jQuery.attrHooks.tabindex.set = nodeHook.set;

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});




var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack = /\bhover(\.\S+)?\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			//   0  1    2   3
			// [ _, tag, id, class ]
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		var attrs = elem.attributes || {};
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
			(!m[2] || (attrs.id || {}).value === m[2]) &&
			(!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
		);
	},
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				quick: quickParse( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, origType, namespaces, origCount,
			j, events, special, handle, eventType, handleObj;

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, [ "events", "handle" ], true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			old = null;
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old && old === elem.ownerDocument ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments, 0 ),
			run_all = !event.exclusive && !event.namespace,
			handlerQueue = [],
			i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Determine handlers that should run if there are delegated events
		// Avoid disabled elements in IE (#6911) and non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !event.target.disabled && !(event.button && event.type === "click") ) {

			// Pregenerate a single jQuery object for reuse with .is()
			jqcur = jQuery(this);
			jqcur.context = this.ownerDocument || this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
				selMatch = {};
				matches = [];
				jqcur[0] = cur;
				for ( i = 0; i < delegateCount; i++ ) {
					handleObj = handlers[ i ];
					sel = handleObj.selector;

					if ( selMatch[ sel ] === undefined ) {
						selMatch[ sel ] = (
							handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
						);
					}
					if ( selMatch[ sel ] ) {
						matches.push( handleObj );
					}
				}
				if ( matches.length ) {
					handlerQueue.push({ elem: cur, matches: matches });
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
		if ( event.metaKey === undefined ) {
			event.metaKey = event.ctrlKey;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				ret;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !form._submit_attached ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						// If form was submitted by the user, bubble the event up the tree
						if ( this.parentNode && !event.isTrigger ) {
							jQuery.event.simulate( "submit", this.parentNode, event, true );
						}
					});
					form._submit_attached = true;
				}
			});
			// return undefined since we don't need an event listener
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
							jQuery.event.simulate( "change", this, event, true );
						}
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					elem._change_attached = true;
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			var handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace? handleObj.type + "." + handleObj.namespace : handleObj.type,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( var type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set, seed );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					doneName = match[0];
					parent = elem.parentNode;
	
					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent[ expando ] = doneName;
					}
					
					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
Sizzle.selectors.attrMap = {};
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && ( 
			typeof selector === "string" ?
				// If this is a positional selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				POS.test( selector ) ? 
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];
		
		// Array (deprecated as of jQuery 1.7)
		if ( jQuery.isArray( selectors ) ) {
			var level = 1;

			while ( cur && cur.ownerDocument && cur !== context ) {
				for ( i = 0; i < selectors.length; i++ ) {

					if ( jQuery( cur ).is( selectors[ i ] ) ) {
						ret.push({ selector: selectors[ i ], elem: cur, level: level });
					}
				}

				cur = cur.parentNode;
				level++;
			}

			return ret;
		}

		// String
		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}




function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")", "i"),
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery.clean(arguments) );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || ( l > 1 && i < lastIndex ) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	// nodes may contain either an explicit document object,
	// a jQuery collection or context object.
	// If nodes[0] contains a valid object to assign to doc
	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	var nodeName = ( elem.nodeName || "" ).toLowerCase();
	if ( nodeName === "input" ) {
		fixDefaultChecked( elem );
	// Skip scripts, get other children
	} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

// Derived From: http://www.iecss.com/shimprove/javascript/shimprove.1-0-1.js
function shimCloneNode( elem ) {
	var div = document.createElement( "div" );
	safeFragment.appendChild( div );

	div.innerHTML = elem.outerHTML;
	return div.firstChild;
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			// IE<=8 does not properly clone detached, unknown element nodes
			clone = jQuery.support.html5Clone || !rnoshimcache.test( "<" + elem.nodeName ) ?
				elem.cloneNode( true ) :
				shimCloneNode( elem );

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Append wrapper element to unknown element safe doc fragment
					if ( context === document ) {
						// Use the fragment we've already created for this document
						safeFragment.appendChild( div );
					} else {
						// Use a fragment created with the owner document
						createSafeFragment( context ).appendChild( div );
					}

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^([\-+])=([\-+.\de]+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( (defaultView = elem.ownerDocument.defaultView) &&
				(computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft, uncomputed,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret === null && style && (uncomputed = style[ name ]) ) {
			ret = uncomputed;
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ( ret || 0 );
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight,
		i = 0,
		len = which.length;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			for ( ; i < len; i++ ) {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
				}
			}
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		for ( ; i < len; i++ ) {
			val += parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
			}
		}
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for ( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for ( key in s.converters ) {
				if ( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if ( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for ( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback );

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( display === "" && jQuery.css(elem, "display") === "none" ) {
						jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			var elem, display,
				i = 0,
				j = this.length;

			for ( ; i < j; i++ ) {
				elem = this[i];
				if ( elem.style ) {
					display = jQuery.css( elem, "display" );

					if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
						jQuery._data( elem, "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		function doAnimation() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e,
				parts, start, end, unit,
				method;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					// Tracks whether to show or hide based on private
					// data attached to the element
					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},

	stop: function( type, clearQueue, gotoEnd ) {
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var index,
				hadTimers = false,
				timers = jQuery.timers,
				data = jQuery._data( this );

			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}

			function stopQueue( elem, data, index ) {
				var hooks = data[ index ];
				jQuery.removeData( elem, index, true );
				hooks.stop( gotoEnd );
			}

			if ( type == null ) {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
						stopQueue( this, data, index );
					}
				}
			} else if ( data[ index = type + ".run" ] && data[ index ].stop ){
				stopQueue( this, data, index );
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					if ( gotoEnd ) {

						// force the next step to be the last
						timers[ index ]( true );
					} else {
						timers[ index ].saveState();
					}
					hadTimers = true;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( !( gotoEnd && hadTimers ) ) {
				jQuery.dequeue( this, type );
			}
		});
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx( "show", 1 ),
	slideUp: genFx( "hide", 1 ),
	slideToggle: genFx( "toggle", 1 ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ( ( -Math.cos( p*Math.PI ) / 2 ) + 0.5 ) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = fxNow || createFxNow();
		this.end = to;
		this.now = this.start = from;
		this.pos = this.state = 0;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

		function t( gotoEnd ) {
			return self.step( gotoEnd );
		}

		t.queue = this.options.queue;
		t.elem = this.elem;
		t.saveState = function() {
			if ( self.options.hide && jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
				jQuery._data( self.elem, "fxshow" + self.prop, self.start );
			}
		};

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval( fx.tick, fx.interval );
		}
	},

	// Simple 'show' function
	show: function() {
		var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any flash of content
		if ( dataShow !== undefined ) {
			// This show is picking up where a previous hide or show left off
			this.custom( this.cur(), dataShow );
		} else {
			this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
		}

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom( this.cur(), 0 );
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var p, n, complete,
			t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( p in options.animatedProperties ) {
				if ( options.animatedProperties[ p ] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function( index, value ) {
						elem.style[ "overflow" + value ] = options.overflow[ index ];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery( elem ).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[ p ] );
						jQuery.removeData( elem, "fxshow" + p, true );
						// Toggle data is no longer needed
						jQuery.removeData( elem, "toggle" + p, true );
					}
				}

				// Execute the complete function
				// in the event that the complete function throws an exception
				// we must ensure it won't be called twice. #5684

				complete = options.complete;
				if ( complete ) {

					options.complete = false;
					complete.call( elem );
				}
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ( (this.end - this.start) * this.pos );
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

// Adds width/height step functions
// Do not set anything below 0
jQuery.each([ "width", "height" ], function( i, prop ) {
	jQuery.fx.step[ prop ] = function( fx ) {
		jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
	};
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );
		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );
			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		// Set the scroll offset
		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			this[ type ]() :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ],
				body = elem.document.body;
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				body && body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNumeric( ret ) ? ret : orig;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});




// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}



})( window );
;
/*!
 * jQuery Mobile v1.0a4.1
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
/*!
 * jQuery UI Widget @VERSION
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function( $, undefined ) {

// jQuery 1.4+
if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			$( elem ).triggerHandler( "remove" );
		}
		_cleanData( elems );
	};
} else {
	var _remove = $.fn.remove;
	$.fn.remove = function( selector, keepData ) {
		return this.each(function() {
			if ( !keepData ) {
				if ( !selector || $.filter( selector, [ this ] ).length ) {
					$( "*", this ).add( [ this ] ).each(function() {
						$( this ).triggerHandler( "remove" );
					});
				}
			}
			return _remove.call( $(this), selector, keepData );
		});
	};
}

$.widget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};

	$[ namespace ] = $[ namespace ] || {};
	$[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	var basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
//	$.each( basePrototype, function( key, val ) {
//		if ( $.isPlainObject(val) ) {
//			basePrototype[ key ] = $.extend( {}, val );
//		}
//	});
	basePrototype.options = $.extend( true, {}, basePrototype.options );
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );

	$.widget.bridge( name, $[ namespace ][ name ] );
};

$.widget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name );
				if ( !instance ) {
					throw "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'";
				}
				if ( !$.isFunction( instance[options] ) ) {
					throw "no such method '" + options + "' for " + name + " widget instance";
				}
				var methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, name, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {
	// allow instantiation without initializing for simple inheritance
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		// $.widget.bridge stores the plugin instance, but we do it anyway
		// so that it's stored even before the _create function runs
		$.data( element, this.widgetName, this );
		this.element = $( element );
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions(),
			options );

		var self = this;
		this.element.bind( "remove." + this.widgetName, function() {
			self.destroy();
		});

		this._create();
		this._trigger( "create" );
		this._init();
	},
	_getCreateOptions: function() {
		var options = {};
		if ( $.metadata ) {
			options = $.metadata.get( element )[ this.widgetName ];
		}
		return options;
	},
	_create: function() {},
	_init: function() {},

	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetBaseClass + "-disabled " +
				"ui-state-disabled" );
	},

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.extend( {}, this.options );
		}

		if  (typeof key === "string" ) {
			if ( value === undefined ) {
				return this.options[ key ];
			}
			options = {};
			options[ key ] = value;
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				[ value ? "addClass" : "removeClass"](
					this.widgetBaseClass + "-disabled" + " " +
					"ui-state-disabled" )
				.attr( "aria-disabled", value );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_trigger: function( type, event, data ) {
		var callback = this.options[ type ];

		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		data = data || {};

		// copy original event properties over to the new event
		// this would happen if we could call $.event.fix instead of $.Event
		// but we don't have a way to force an event to be fixed multiple times
		if ( event.originalEvent ) {
			for ( var i = $.event.props.length, prop; i; ) {
				prop = $.event.props[ --i ];
				event[ prop ] = event.originalEvent[ prop ];
			}
		}

		this.element.trigger( event, data );

		return !( $.isFunction(callback) &&
			callback.call( this.element[0], event, data ) === false ||
			event.isDefaultPrevented() );
	}
};

})( jQuery );
/*
* jQuery Mobile Framework : widget factory extentions for mobile
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.widget( "mobile.widget", {
	_getCreateOptions: function() {
		var elem = this.element,
			options = {};
		$.each( this.options, function( option ) {
			var value = elem.jqmData( option.replace( /[A-Z]/g, function( c ) {
				return "-" + c.toLowerCase();
			} ) );
			if ( value !== undefined ) {
				options[ option ] = value;
			}
		});
		return options;
	}
});

})( jQuery );
/*
* jQuery Mobile Framework : resolution and CSS media query related helpers and behavior
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

var $window = $(window),
	$html = $( "html" ),

	//media-query-like width breakpoints, which are translated to classes on the html element
	resolutionBreakpoints = [320,480,768,1024];


/* $.mobile.media method: pass a CSS media type or query and get a bool return
	note: this feature relies on actual media query support for media queries, though types will work most anywhere
	examples:
		$.mobile.media('screen') //>> tests for screen media type
		$.mobile.media('screen and (min-width: 480px)') //>> tests for screen media type with window width > 480px
		$.mobile.media('@media screen and (-webkit-min-device-pixel-ratio: 2)') //>> tests for webkit 2x pixel ratio (iPhone 4)
*/
$.mobile.media = (function() {
	// TODO: use window.matchMedia once at least one UA implements it
	var cache = {},
		testDiv = $( "<div id='jquery-mediatest'>" ),
		fakeBody = $( "<body>" ).append( testDiv );

	return function( query ) {
		if ( !( query in cache ) ) {
			var styleBlock = document.createElement('style'),
        		cssrule = "@media " + query + " { #jquery-mediatest { position:absolute; } }";
	        //must set type for IE!	
	        styleBlock.type = "text/css";
	        if (styleBlock.styleSheet){ 
	          styleBlock.styleSheet.cssText = cssrule;
	        } 
	        else {
	          styleBlock.appendChild(document.createTextNode(cssrule));
	        } 
				
			$html.prepend( fakeBody ).prepend( styleBlock );
			cache[ query ] = testDiv.css( "position" ) === "absolute";
			fakeBody.add( styleBlock ).remove();
		}
		return cache[ query ];
	};
})();

/*
	private function for adding/removing breakpoint classes to HTML element for faux media-query support
	It does not require media query support, instead using JS to detect screen width > cross-browser support
	This function is called on orientationchange, resize, and mobileinit, and is bound via the 'htmlclass' event namespace
*/
function detectResolutionBreakpoints(){
	var currWidth = $window.width(),
		minPrefix = "min-width-",
		maxPrefix = "max-width-",
		minBreakpoints = [],
		maxBreakpoints = [],
		unit = "px",
		breakpointClasses;

	$html.removeClass( minPrefix + resolutionBreakpoints.join(unit + " " + minPrefix) + unit + " " +
		maxPrefix + resolutionBreakpoints.join( unit + " " + maxPrefix) + unit );

	$.each(resolutionBreakpoints,function( i, breakPoint ){
		if( currWidth >= breakPoint ){
			minBreakpoints.push( minPrefix + breakPoint + unit );
		}
		if( currWidth <= breakPoint ){
			maxBreakpoints.push( maxPrefix + breakPoint + unit );
		}
	});

	if( minBreakpoints.length ){ breakpointClasses = minBreakpoints.join(" "); }
	if( maxBreakpoints.length ){ breakpointClasses += " " +  maxBreakpoints.join(" "); }

	$html.addClass( breakpointClasses );
};

/* $.mobile.addResolutionBreakpoints method:
	pass either a number or an array of numbers and they'll be added to the min/max breakpoint classes
	Examples:
		$.mobile.addResolutionBreakpoints( 500 );
		$.mobile.addResolutionBreakpoints( [500, 1200] );
*/
$.mobile.addResolutionBreakpoints = function( newbps ){
	if( $.type( newbps ) === "array" ){
		resolutionBreakpoints = resolutionBreakpoints.concat( newbps );
	}
	else {
		resolutionBreakpoints.push( newbps );
	}
	resolutionBreakpoints.sort(function(a,b){ return a-b; });
	detectResolutionBreakpoints();
};

/* 	on mobileinit, add classes to HTML element
	and set handlers to update those on orientationchange and resize*/
$(document).bind("mobileinit.htmlclass", function(){
	/* bind to orientationchange and resize
	to add classes to HTML element for min/max breakpoints and orientation */
	$window.bind("orientationchange.htmlclass resize.htmlclass", function(event){
		//add orientation class to HTML element on flip/resize.
		if(event.orientation){
			$html.removeClass( "portrait landscape" ).addClass( event.orientation );
		}
		//add classes to HTML element for min/max breakpoints
		detectResolutionBreakpoints();
	});
});

/* Manually trigger an orientationchange event when the dom ready event fires.
   This will ensure that any viewport meta tag that may have been injected
   has taken effect already, allowing us to properly calculate the width of the
   document.
*/
$(function(){
	//trigger event manually
	$window.trigger( "orientationchange.htmlclass" );
});

})(jQuery);/*
* jQuery Mobile Framework : support tests
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($, undefined ) {



var fakeBody = $( "<body>" ).prependTo( "html" ),
	fbCSS = fakeBody[0].style,
	vendors = ['webkit','moz','o'],
	webos = window.palmGetResource || window.PalmServiceBridge, //only used to rule out scrollTop 
	bb = window.blackberry; //only used to rule out box shadow, as it's filled opaque on BB

//thx Modernizr
function propExists( prop ){
	var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1),
		props   = (prop + ' ' + vendors.join(uc_prop + ' ') + uc_prop).split(' ');
	for(var v in props){
		if( fbCSS[ v ] !== undefined ){
			return true;
		}
	}
};

//test for dynamic-updating base tag support (allows us to avoid href,src attr rewriting)
function baseTagTest(){
	var fauxBase = location.protocol + '//' + location.host + location.pathname + "ui-dir/",
		base = $("head base"),
		fauxEle = null,
		href = '';
	if (!base.length) {
		base = fauxEle = $("<base>", {"href": fauxBase}).appendTo("head");
	}
	else {
		href = base.attr("href");
	}
	var link = $( "<a href='testurl'></a>" ).prependTo( fakeBody ),
		rebase = link[0].href;
	base[0].href = href ? href : location.pathname;
	if (fauxEle) {
		fauxEle.remove();
	}
	return rebase.indexOf(fauxBase) === 0;
};


//non-UA-based IE version check by James Padolsey, modified by jdalton - from http://gist.github.com/527683
//allows for inclusion of IE 6+, including Windows Mobile 7
$.mobile.browser = {};
$.mobile.browser.ie = (function() {
    var v = 3, div = document.createElement('div'), a = div.all || [];
    while (div.innerHTML = '<!--[if gt IE '+(++v)+']><br><![endif]-->', a[0]); 
    return v > 4 ? v : !v;
}());

$.extend( $.support, {
	orientation: "orientation" in window,
	touch: "ontouchend" in document,
	cssTransitions: "WebKitTransitionEvent" in window,
	pushState: !!history.pushState,
	mediaquery: $.mobile.media('only all'),
	cssPseudoElement: !!propExists('content'),
	boxShadow: !!propExists('boxShadow') && !bb,
	scrollTop: ("pageXOffset" in window || "scrollTop" in document.documentElement || "scrollTop" in fakeBody[0]) && !webos,
	dynamicBaseTag: baseTagTest(),
	eventCapture: ("addEventListener" in document) // This is a weak test. We may want to beef this up later.
});

fakeBody.remove();

//for ruling out shadows via css
if( !$.support.boxShadow ){ $('html').addClass('ui-mobile-nosupport-boxshadow'); }

})( jQuery );/*
* jQuery Mobile Framework : "mouse" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function($, window, document, undefined) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split(" "),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	startScrollX = 0,
	startScrollY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	scrollTopSupported = $.support.scrollTop,
	eventCaptureSupported = $.support.eventCapture,
	$document = $(document),
	nextTouchID = 1,
	lastTouchID = 0;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent(event)
{
	while (event && typeof event.originalEvent !== "undefined") {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent(event, eventType)
{
	var t = event.type;
	event = $.Event(event);
	event.type = eventType;
	
	var oe = event.originalEvent;
	var props = $.event.props;
	
	// copy original event properties over to the new event
	// this would happen if we could call $.event.fix instead of $.Event
	// but we don't have a way to force an event to be fixed multiple times
	if (oe) {
		for ( var i = props.length, prop; i; ) {
			prop = props[ --i ];
			event[prop] = oe[prop];
		}
	}
	
	if (t.search(/^touch/) !== -1){
		var ne = getNativeEvent(oe),
			t = ne.touches,
			ct = ne.changedTouches,
			touch = (t && t.length) ? t[0] : ((ct && ct.length) ? ct[0] : undefined);
		if (touch){
			for (var i = 0, len = touchEventProps.length; i < len; i++){
				var prop = touchEventProps[i];
				event[prop] = touch[prop];
			}
		}
	}

	return event;
}

function getVirtualBindingFlags(element)
{
	var flags = {};
	var $ele = $(element);
	while ($ele && $ele.length){
		var b = $ele.data(dataPropertyName);
		for (var k in b) {
			if (b[k]){
				flags[k] = flags.hasVirtualBinding = true;
			}
		}
		$ele = $ele.parent();
	}
	return flags;
}

function getClosestElementWithVirtualBinding(element, eventType)
{
	var $ele = $(element);
	while ($ele && $ele.length){
		var b = $ele.data(dataPropertyName);
		if (b && (!eventType || b[eventType])) {
			return $ele;
		}
		$ele = $ele.parent();
	}
	return null;
}

function enableTouchBindings()
{
	if (!activeDocHandlers["touchbindings"]){
		$document.bind("touchend", handleTouchEnd)
		
			// On touch platforms, touching the screen and then dragging your finger
			// causes the window content to scroll after some distance threshold is
			// exceeded. On these platforms, a scroll prevents a click event from being
			// dispatched, and on some platforms, even the touchend is suppressed. To
			// mimic the suppression of the click event, we need to watch for a scroll
			// event. Unfortunately, some platforms like iOS don't dispatch scroll
			// events until *AFTER* the user lifts their finger (touchend). This means
			// we need to watch both scroll and touchmove events to figure out whether
			// or not a scroll happenens before the touchend event is fired.
		
			.bind("touchmove", handleTouchMove)
			.bind("scroll", handleScroll);

		activeDocHandlers["touchbindings"] = 1;
	}
}

function disableTouchBindings()
{
	if (activeDocHandlers["touchbindings"]){
		$document.unbind("touchmove", handleTouchMove)
			.unbind("touchend", handleTouchEnd)
			.unbind("scroll", handleScroll);
		activeDocHandlers["touchbindings"] = 0;
	}
}

function enableMouseBindings()
{
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	// When mouse bindings are enabled, our
	// touch bindings are disabled.
	disableTouchBindings();
}

function disableMouseBindings()
{
	// When mouse bindings are disabled, our
	// touch bindings are enabled.
	enableTouchBindings();
}

function startResetTimer()
{
	clearResetTimer();
	resetTimerID = setTimeout(function(){
		resetTimerID = 0;
		enableMouseBindings();
	}, $.vmouse.resetTimerDuration);
}

function clearResetTimer()
{
	if (resetTimerID){
		clearTimeout(resetTimerID);
		resetTimerID = 0;
	}
}

function triggerVirtualEvent(eventType, event, flags)
{
	var defaultPrevented = false;

	if ((flags && flags[eventType]) || (!flags && getClosestElementWithVirtualBinding(event.target, eventType))) {
		var ve = createVirtualEvent(event, eventType);
		$(event.target).trigger(ve);
		defaultPrevented = ve.isDefaultPrevented();
	}

	return defaultPrevented;
}

function mouseEventCallback(event)
{
	var touchID = $(event.target).data(touchTargetPropertyName);
	if (!blockMouseTriggers && (!lastTouchID || lastTouchID !== touchID)){
		triggerVirtualEvent("v" + event.type, event);
	}
}

function handleTouchStart(event)
{
	var touches = getNativeEvent(event).touches;
	if (touches && touches.length === 1){
		var target = event.target,
			flags = getVirtualBindingFlags(target);
	
		if (flags.hasVirtualBinding){
			lastTouchID = nextTouchID++;
			$(target).data(touchTargetPropertyName, lastTouchID);
	
			clearResetTimer();
			
			disableMouseBindings();
			didScroll = false;
			
			var t = getNativeEvent(event).touches[0];
			startX = t.pageX;
			startY = t.pageY;
		
			if (scrollTopSupported){
				startScrollX = window.pageXOffset;
				startScrollY = window.pageYOffset;
			}
		
			triggerVirtualEvent("vmouseover", event, flags);
			triggerVirtualEvent("vmousedown", event, flags);
		}
	}
}

function handleScroll(event)
{
	if (!didScroll){
		triggerVirtualEvent("vmousecancel", event, getVirtualBindingFlags(event.target));
	}

	didScroll = true;
	startResetTimer();
}

function handleTouchMove(event)
{
	var t = getNativeEvent(event).touches[0];

	var didCancel = didScroll,
		moveThreshold = $.vmouse.moveDistanceThreshold;
	didScroll = didScroll
		|| (scrollTopSupported && (startScrollX !== window.pageXOffset || startScrollY !== window.pageYOffset))
		|| (Math.abs(t.pageX - startX) > moveThreshold || Math.abs(t.pageY - startY) > moveThreshold);

	var flags = getVirtualBindingFlags(event.target);
	if (didScroll && !didCancel){
		triggerVirtualEvent("vmousecancel", event, flags);
	}
	triggerVirtualEvent("vmousemove", event, flags);
	startResetTimer();
}

function handleTouchEnd(event)
{
	disableTouchBindings();

	var flags = getVirtualBindingFlags(event.target);
	triggerVirtualEvent("vmouseup", event, flags);
	if (!didScroll){
		if (triggerVirtualEvent("vclick", event, flags)){
			// The target of the mouse events that follow the touchend
			// event don't necessarily match the target used during the
			// touch. This means we need to rely on coordinates for blocking
			// any click that is generated.
			var t = getNativeEvent(event).changedTouches[0];
			clickBlockList.push({ touchID: lastTouchID, x: t.clientX, y: t.clientY });

			// Prevent any mouse events that follow from triggering
			// virtual event notifications.
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent("vmouseout", event, flags);
	didScroll = false;
	
	startResetTimer();
}

function hasVirtualBindings($ele)
{
	var bindings = $ele.data(dataPropertyName), k;
	if (bindings){
		for (k in bindings){
			if (bindings[k]){
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler(){}

function getSpecialEventObject(eventType)
{
	var realType = eventType.substr(1);
	return {
		setup: function(data, namespace) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			var $this = $(this);

			if (!hasVirtualBindings($this)){
				$this.data(dataPropertyName, {});
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.

			var bindings = $this.data(dataPropertyName);
			bindings[eventType] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[eventType] = (activeDocHandlers[eventType] || 0) + 1;
			if (activeDocHandlers[eventType] === 1){
				$document.bind(realType, mouseEventCallback);
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$this.bind(realType, dummyMouseHandler);

			// For now, if event capture is not supported, we rely on mouse handlers.
			if (eventCaptureSupported){
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.
	
				activeDocHandlers["touchstart"] = (activeDocHandlers["touchstart"] || 0) + 1;
				if (activeDocHandlers["touchstart"] === 1) {
					$document.bind("touchstart", handleTouchStart);
				}
			}
		},

		teardown: function(data, namespace) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[eventType];
			if (!activeDocHandlers[eventType]){
				$document.unbind(realType, mouseEventCallback);
			}

			if (eventCaptureSupported){
				// If this is the last virtual mouse binding in existence,
				// remove our document touchstart listener.
	
				--activeDocHandlers["touchstart"];
				if (!activeDocHandlers["touchstart"]) {
					$document.unbind("touchstart", handleTouchStart);
				}
			}

			var $this = $(this),
				bindings = $this.data(dataPropertyName);
			bindings[eventType] = false;

			// Unregister the dummy event handler.

			$this.unbind(realType, dummyMouseHandler);

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			if (!hasVirtualBindings($this)){
				$this.removeData(dataPropertyName);
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for (var i = 0; i < virtualEventNames.length; i++){
	$.event.special[virtualEventNames[i]] = getSpecialEventObject(virtualEventNames[i]);
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if (eventCaptureSupported){
	document.addEventListener("click", function(e){
		var cnt = clickBlockList.length;
		var target = e.target;
		if (cnt) {
			var x = e.clientX,
				y = e.clientY,
				threshold = $.vmouse.clickDistanceThreshold;

			// The idea here is to run through the clickBlockList to see if
			// the current click event is in the proximity of one of our
			// vclick events that had preventDefault() called on it. If we find
			// one, then we block the click.
			//
			// Why do we have to rely on proximity?
			//
			// Because the target of the touch event that triggered the vclick
			// can be different from the target of the click event synthesized
			// by the browser. The target of a mouse/click event that is syntehsized
			// from a touch event seems to be implementation specific. For example,
			// some browsers will fire mouse/click events for a link that is near
			// a touch event, even though the target of the touchstart/touchend event
			// says the user touched outside the link. Also, it seems that with most
			// browsers, the target of the mouse/click event is not calculated until the
			// time it is dispatched, so if you replace an element that you touched
			// with another element, the target of the mouse/click will be the new
			// element underneath that point.
			//
			// Aside from proximity, we also check to see if the target and any
			// of its ancestors were the ones that blocked a click. This is necessary
			// because of the strange mouse/click target calculation done in the
			// Android 2.1 browser, where if you click on an element, and there is a
			// mouse/click handler on one of its ancestors, the target will be the
			// innermost child of the touched element, even if that child is no where
			// near the point of touch.
			
			var ele = target;
			while (ele) {
				for (var i = 0; i < cnt; i++) {
					var o = clickBlockList[i],
						touchID = 0;
					if ((ele === target && Math.abs(o.x - x) < threshold && Math.abs(o.y - y) < threshold) || $(ele).data(touchTargetPropertyName) === o.touchID){
						// XXX: We may want to consider removing matches from the block list
						//      instead of waiting for the reset timer to fire.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
				}
				ele = ele.parentNode;
			}
		}
	}, true);
}
})(jQuery, window, document);/*
* jQuery Mobile Framework : events
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

// add new event shortcuts
$.each( "touchstart touchmove touchend orientationchange tap taphold swipe swipeleft swiperight scrollstart scrollstop".split( " " ), function( i, name ) {
	$.fn[ name ] = function( fn ) {
		return fn ? this.bind( name, fn ) : this.trigger( name );
	};
	$.attrFn[ name ] = true;
});

var supportTouch = $.support.touch,
	scrollEvent = "touchmove scroll",
	touchStartEvent = supportTouch ? "touchstart" : "mousedown",
	touchStopEvent = supportTouch ? "touchend" : "mouseup",
	touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

function triggerCustomEvent(obj, eventType, event)
{
	var originalType = event.type;
	event.type = eventType;
	$.event.handle.call( obj, event );
	event.type = originalType;
}

// also handles scrollstop
$.event.special.scrollstart = {
	enabled: true,
	
	setup: function() {
		var thisObject = this,
			$this = $( thisObject ),
			scrolling,
			timer;
		
		function trigger( event, state ) {
			scrolling = state;
			triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
		}
		
		// iPhone triggers scroll after a small delay; use touchmove instead
		$this.bind( scrollEvent, function( event ) {
			if ( !$.event.special.scrollstart.enabled ) {
				return;
			}
			
			if ( !scrolling ) {
				trigger( event, true );
			}
			
			clearTimeout( timer );
			timer = setTimeout(function() {
				trigger( event, false );
			}, 50 );
		});
	}
};

// also handles taphold
$.event.special.tap = {
	setup: function() {
		var thisObject = this,
			$this = $( thisObject );
		
		$this
			.bind("vmousedown", function( event ) {
				if ( event.which && event.which !== 1 ) {
					return false;
				}
				
				var touching = true,
					origTarget = event.target,
					origEvent = event.originalEvent,
					timer;
					
				function clearTapHandlers() {
					touching = false;
					clearTimeout(timer);
					$this.unbind("vclick", clickHandler).unbind("vmousecancel", clearTapHandlers);
				}
				
				function clickHandler(event) {
					clearTapHandlers();

					/* ONLY trigger a 'tap' event if the start target is
					 * the same as the stop target.
					 */
					if ( origTarget == event.target ) {
						triggerCustomEvent( thisObject, "tap", event );
					}
				}

				$this.bind("vmousecancel", clearTapHandlers).bind("vclick", clickHandler);

				timer = setTimeout(function() {
					if ( touching ) {
						triggerCustomEvent( thisObject, "taphold", event );
					}
				}, 750 );
			});
	}
};

// also handles swipeleft, swiperight
$.event.special.swipe = {
	setup: function() {
		var thisObject = this,
			$this = $( thisObject );
		
		$this
			.bind( touchStartEvent, function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] :
						event,
					start = {
						time: (new Date).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					},
					stop;
				
				function moveHandler( event ) {
					if ( !start ) {
						return;
					}
					
					var data = event.originalEvent.touches ?
							event.originalEvent.touches[ 0 ] :
							event;
					stop = {
							time: (new Date).getTime(),
							coords: [ data.pageX, data.pageY ]
					};
					
					// prevent scrolling
					if ( Math.abs( start.coords[0] - stop.coords[0] ) > 10 ) {
						event.preventDefault();
					}
				}
				
				$this
					.bind( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function( event ) {
						$this.unbind( touchMoveEvent, moveHandler );
						if ( start && stop ) {
							if ( stop.time - start.time < 1000 && 
									Math.abs( start.coords[0] - stop.coords[0]) > 30 &&
									Math.abs( start.coords[1] - stop.coords[1]) < 75 ) {
								start.origin
								.trigger( "swipe" )

								.trigger( start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight" );
							}
						}
						start = stop = undefined;
					});
			});
	}
};

(function($){
	// "Cowboy" Ben Alman
	
	var win = $(window),
		special_event,
		get_orientation,
		last_orientation;
	
	$.event.special.orientationchange = special_event = {
		setup: function(){
			// If the event is supported natively, return false so that jQuery
			// will bind to the event using DOM methods.
			if ( $.support.orientation ) { return false; }
			
			// Get the current orientation to avoid initial double-triggering.
			last_orientation = get_orientation();
			
			// Because the orientationchange event doesn't exist, simulate the
			// event by testing window dimensions on resize.
			win.bind( "resize", handler );
		},
		teardown: function(){
			// If the event is not supported natively, return false so that
			// jQuery will unbind the event using DOM methods.
			if ( $.support.orientation ) { return false; }
			
			// Because the orientationchange event doesn't exist, unbind the
			// resize event handler.
			win.unbind( "resize", handler );
		},
		add: function( handleObj ) {
			// Save a reference to the bound event handler.
			var old_handler = handleObj.handler;
			
			handleObj.handler = function( event ) {
				// Modify event object, adding the .orientation property.
				event.orientation = get_orientation();
				
				// Call the originally-bound event handler and return its result.
				return old_handler.apply( this, arguments );
			};
		}
	};
	
	// If the event is not supported natively, this handler will be bound to
	// the window resize event to simulate the orientationchange event.
	function handler() {
		// Get the current orientation.
		var orientation = get_orientation();
		
		if ( orientation !== last_orientation ) {
			// The orientation has changed, so trigger the orientationchange event.
			last_orientation = orientation;
			win.trigger( "orientationchange" );
		}
	};
	
	// Get the current page orientation. This method is exposed publicly, should it
	// be needed, as jQuery.event.special.orientationchange.orientation()
	special_event.orientation = get_orientation = function() {
		var elem = document.documentElement;
		return elem && elem.clientWidth / elem.clientHeight < 1.1 ? "portrait" : "landscape";
	};
	
})(jQuery);

$.each({
	scrollstop: "scrollstart",
	taphold: "tap",
	swipeleft: "swipe",
	swiperight: "swipe"
}, function( event, sourceEvent ) {
	$.event.special[ event ] = {
		setup: function() {
			$( this ).bind( sourceEvent, $.noop );
		}
	};
});

})( jQuery );
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.browser.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);
/*
* jQuery Mobile Framework : "page" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		backBtnText: "Back",
		addBackBtn: true,
		backBtnTheme: null,
		degradeInputs: {
			color: false,
			date: false,
			datetime: false,
			"datetime-local": false,
			email: false,
			month: false,
			number: false,
			range: "number",
			search: true,
			tel: false,
			time: false,
			url: false,
			week: false
		},
		keepNative: null
	},

	_create: function() {
		var $elem = this.element,
			o = this.options;

		this.keepNative = ":jqmData(role='none'), :jqmData(role='nojs')" + (o.keepNative ? ", " + o.keepNative : "");

		if ( this._trigger( "beforeCreate" ) === false ) {
			return;
		}

		//some of the form elements currently rely on the presence of ui-page and ui-content
		// classes so we'll handle page and content roles outside of the main role processing
		// loop below.
		$elem.find( ":jqmData(role='page'), :jqmData(role='content')" ).andSelf().each(function() {
			$(this).addClass( "ui-" + $(this).jqmData( "role" ) );
		});

		$elem.find( ":jqmData(role='nojs')" ).addClass( "ui-nojs" );

		// pre-find data els
		var $dataEls = $elem.find( ":jqmData(role)" ).andSelf().each(function() {
			var $this = $( this ),
				role = $this.jqmData( "role" ),
				theme = $this.jqmData( "theme" );

			//apply theming and markup modifications to page,header,content,footer
			if ( role === "header" || role === "footer" ) {
				$this.addClass( "ui-bar-" + (theme || $this.parent( ":jqmData(role='page')" ).jqmData( "theme" ) || "a") );

				// add ARIA role
				$this.attr( "role", role === "header" ? "banner" : "contentinfo" );

				//right,left buttons
				var $headeranchors = $this.children( "a" ),
					leftbtn = $headeranchors.hasClass( "ui-btn-left" ),
					rightbtn = $headeranchors.hasClass( "ui-btn-right" );

				if ( !leftbtn ) {
					leftbtn = $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;
				}

				if ( !rightbtn ) {
					rightbtn = $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
				}

				// auto-add back btn on pages beyond first view
				if ( o.addBackBtn && role === "header" &&
						$( ".ui-page" ).length > 1 &&
						$elem.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) &&
						!leftbtn && $this.jqmData( "backbtn" ) !== false ) {

					var backBtn = $( "<a href='#' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" ).prependTo( $this );
					
					//if theme is provided, override default inheritance
					if( o.backBtnTheme ){
						backBtn.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme );
					}
				}

				//page title
				$this.children( "h1, h2, h3, h4, h5, h6" )
					.addClass( "ui-title" )
					//regardless of h element number in src, it becomes h1 for the enhanced page
					.attr({ "tabindex": "0", "role": "heading", "aria-level": "1" });

			} else if ( role === "content" ) {
				if ( theme ) {
					$this.addClass( "ui-body-" + theme );
				}

				// add ARIA role
				$this.attr( "role", "main" );

			} else if ( role === "page" ) {
				$this.addClass( "ui-body-" + (theme || "c") );
			}

			switch(role) {
				case "header":
				case "footer":
				case "page":
				case "content":
					$this.addClass( "ui-" + role );
					break;
				case "collapsible":
				case "fieldcontain":
				case "navbar":
				case "listview":
				case "dialog":
					$this[ role ]();
					break;
			}
		});

		//enhance form controls
  	this._enhanceControls();

		//links in bars, or those with  data-role become buttons
		$elem.find( ":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a" )
			.not( ".ui-btn" )
			.not(this.keepNative)
			.buttonMarkup();

		$elem
			.find(":jqmData(role='controlgroup')")
			.controlgroup();

		//links within content areas
		$elem.find( "a:not(.ui-btn):not(.ui-link-inherit)" )
			.not(this.keepNative)
			.addClass( "ui-link" );

		//fix toolbars
		$elem.fixHeaderFooter();
	},

	_typeAttributeRegex: /\s+type=["']?\w+['"]?/,

	_enhanceControls: function() {
		var o = this.options, self = this;

		// degrade inputs to avoid poorly implemented native functionality
		this.element.find( "input" ).not(this.keepNative).each(function() {
			var type = this.getAttribute( "type" ),
				optType = o.degradeInputs[ type ] || "text";

			if ( o.degradeInputs[ type ] ) {
				$( this ).replaceWith(
					$( "<div>" ).html( $(this).clone() ).html()
						.replace( self._typeAttributeRegex, " type=\""+ optType +"\" data-" + $.mobile.ns + "type=\""+type+"\" " ) );
			}
		});

		// We re-find form elements since the degredation code above
		// may have injected new elements. We cache the non-native control
		// query to reduce the number of times we search through the entire page.

		var allControls = this.element.find("input, textarea, select, button"),
			nonNativeControls = allControls.not(this.keepNative);

		// XXX: Temporary workaround for issue 785. Turn off autocorrect and
		//      autocomplete since the popup they use can't be dismissed by
		//      the user. Note that we test for the presence of the feature
		//      by looking for the autocorrect property on the input element.

		var textInputs = allControls.filter( "input[type=text]" );
		if (textInputs.length && typeof textInputs[0].autocorrect !== "undefined") {
			textInputs.each(function(){
				// Set the attribute instead of the property just in case there
				// is code that attempts to make modifications via HTML.
				this.setAttribute("autocorrect", "off");
				this.setAttribute("autocomplete", "off");
			});
		}

		// enchance form controls
		nonNativeControls
			.filter( "[type='radio'], [type='checkbox']" )
			.checkboxradio();

		nonNativeControls
			.filter( "button, [type='button'], [type='submit'], [type='reset'], [type='image']" )
			.button();

		nonNativeControls
			.filter( "input, textarea" )
			.not( "[type='radio'], [type='checkbox'], [type='button'], [type='submit'], [type='reset'], [type='image'], [type='hidden']" )
			.textinput();

		nonNativeControls
			.filter( "input, select" )
			.filter( ":jqmData(role='slider'), :jqmData(type='range')" )
			.slider();

		nonNativeControls
			.filter( "select:not(:jqmData(role='slider'))" )
			.selectmenu();
	}
});

})( jQuery );
/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( $, window, undefined ) {

	//jQuery.mobile configurable options
	$.extend( $.mobile, {

		//namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		//define the url parameter used for referencing widget-generated sub-pages.
		//Translates to to example.html&ui-page=subpageIdentifier
		//hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		//anchor links with a data-rel, or pages with a  data-role, that match these selectors will be untrackable in history
		//(no change in URL, not bookmarkable)
		nonHistorySelectors: "dialog",

		//class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		//class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		//automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		//automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// TODO: deprecated - remove at 1.0
		//automatically handle link clicks through Ajax, when possible
		ajaxLinksEnabled: true,

		// TODO: deprecated - remove at 1.0
		//automatically handle form submissions through Ajax, when possible
		ajaxFormsEnabled: true,

		//set default transition - 'none' for no transitions
		defaultTransition: "slide",

		//show loading message during Ajax requests
		//if false, message will not appear, but loading classes will still be toggled on html el
		loadingMessage: "loading",

		//error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		//configure meta viewport tag's content attr:
		//note: this feature is deprecated in A4 in favor of adding
		//the meta viewport element directly in the markup
		metaViewportContent: "width=device-width, minimum-scale=1, maximum-scale=1",

		//support conditions that must be met in order to proceed
		//default enhanced qualifications are media query support OR IE 7+
		gradeA: function(){
			return $.support.mediaquery || $.mobile.browser.ie && $.mobile.browser.ie >= 7;
		},

		//TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		//scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			ypos = ypos || 0;
			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout(function() {
				window.scrollTo( 0, ypos );
				$(document).trigger( "silentscroll", { x: 0, y: ypos });
			},20);

			setTimeout(function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		}
	});

	//mobile version of data and removeData and hasData methods
	//ensures all data is set and retrieved using jQuery Mobile's data namespace
  $.fn.jqmData = function( prop, value ){
    return this.data( prop ? $.mobile.ns + prop : prop, value );
  };

  $.jqmData = function( elem, prop, value ){
    return $.data( elem, prop && $.mobile.ns + prop, value );
  };

  $.fn.jqmRemoveData = function( prop ){
    return this.removeData( $.mobile.ns + prop );
  };

  $.jqmRemoveData = function( elem, prop ){
    return $.removeData( elem, prop && $.mobile.ns + prop );
  };

  $.jqmHasData = function( elem, prop ){
    return $.hasData( elem, prop && $.mobile.ns + prop );
  };


	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace(/:jqmData\(([^)]*)\)/g, "[data-" + ($.mobile.ns || "") + "$1]");

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [node] ).length > 0;
	};
})( jQuery, this );
/*
* jQuery Mobile Framework : core utilities for auto ajax navigation, base tag mgmt,
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

	//define vars for interal use
	var $window = $(window),
		$html = $('html'),
		$head = $('head'),

		//url path helpers for use in relative url management
		path = {

			//get path from current hash, or from a file path
			get: function( newPath ){
				if( newPath === undefined ){
					newPath = location.hash;
				}
				return path.stripHash( newPath ).replace(/[^\/]*\.[^\/*]+$/, '');
			},

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ){
				var splitkey = '&' + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},

			//set location hash to path
			set: function( path ){
				location.hash = path;
			},

			//location pathname from intial directory request
			origin: '',

			setOrigin: function(){
				path.origin = path.get( location.protocol + '//' + location.host + location.pathname );
			},

			//prefix a relative url with the current path
			// TODO rename to reflect conditional functionality
			makeAbsolute: function( url ){
				// only create an absolute path when the hash can be used as one
				return path.isPath(window.location.hash) ? path.get() + url : url;
			},

			// test if a given url (string) is a path
			// NOTE might be exceptionally naive
			isPath: function( url ){
				return /\//.test(url);
			},

			//return a url path with the window's location protocol/hostname/pathname removed
			clean: function( url ){
				// Replace the protocol, host, and pathname only once at the beginning of the url to avoid
				// problems when it's included as a part of a param
				// Also, since all urls are absolute in IE, we need to remove the pathname as well.
				var leadingUrlRootRegex = new RegExp("^" + location.protocol + "//" + location.host + location.pathname);
				return url.replace(leadingUrlRootRegex, "");
			},

			//just return the url without an initial #
			stripHash: function( url ){
				return url.replace( /^#/, "" );
			},

			//check whether a url is referencing the same domain, or an external domain or different protocol
			//could be mailto, etc
			isExternal: function( url ){
				return path.hasProtocol( path.clean( url ) );
			},

			hasProtocol: function( url ){
				return (/^(:?\w+:)/).test( url );
			},

			//check if the url is relative
			isRelative: function( url ){
				return  (/^[^\/|#]/).test( url ) && !path.hasProtocol( url );
			},

			isEmbeddedPage: function( url ){
				return (/^#/).test( url );
			}
		},

		//will be defined when a link is clicked and given an active class
		$activeClickedLink = null,

		//urlHistory is purely here to make guesses at whether the back or forward button was clicked
		//and provide an appropriate transition
		urlHistory = {
			//array of pages that are visited during a single page load. each has a url and optional transition
			stack: [],

			//maintain an index number for the active page in the stack
			activeIndex: 0,

			//get active
			getActive: function(){
				return urlHistory.stack[ urlHistory.activeIndex ];
			},

			getPrev: function(){
				return urlHistory.stack[ urlHistory.activeIndex - 1 ];
			},

			getNext: function(){
				return urlHistory.stack[ urlHistory.activeIndex + 1 ];
			},

			// addNew is used whenever a new page is added
			addNew: function( url, transition, title, storedTo ){
				//if there's forward history, wipe it
				if( urlHistory.getNext() ){
					urlHistory.clearForward();
				}

				urlHistory.stack.push( {url : url, transition: transition, title: title, page: storedTo } );

				urlHistory.activeIndex = urlHistory.stack.length - 1;
			},

			//wipe urls ahead of active index
			clearForward: function(){
				urlHistory.stack = urlHistory.stack.slice( 0, urlHistory.activeIndex + 1 );
			},

			directHashChange: function(opts){
				var back , forward, newActiveIndex;

				// check if url isp in history and if it's ahead or behind current page
				$.each( urlHistory.stack, function( i, historyEntry ){

					//if the url is in the stack, it's a forward or a back
					if( opts.currentUrl === historyEntry.url ){
						//define back and forward by whether url is older or newer than current page
						back = i < urlHistory.activeIndex;
						forward = !back;
						newActiveIndex = i;
					}
				});

				// save new page index, null check to prevent falsey 0 result
				this.activeIndex = newActiveIndex !== undefined ? newActiveIndex : this.activeIndex;

				if( back ){
					opts.isBack();
				} else if( forward ){
					opts.isForward();
				}
			},

			//disable hashchange event listener internally to ignore one change
			//toggled internally when location.hash is updated to match the url of a successful page load
			ignoreNextHashChange: true
		},

		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",

		//contains role for next page, if defined on clicked link via data-rel
		nextPageRole = null,

		//queue to hold simultanious page transitions
		pageTransitionQueue = [],

		// indicates whether or not page is in process of transitioning
		isPageTransitioning = false,

		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog",

		//existing base tag?
		$base = $head.children("base"),
		hostURL = location.protocol + '//' + location.host,
		docLocation = path.get( hostURL + location.pathname ),
		docBase = docLocation;

		if ($base.length){
			var href = $base.attr("href");
			if (href){
				if (href.search(/^[^:\/]+:\/\/[^\/]+\/?/) === -1){
					//the href is not absolute, we need to turn it into one
					//so that we can turn paths stored in our location hash into
					//relative paths.
					if (href.charAt(0) === '/'){
						//site relative url
						docBase = hostURL + href;
					}
					else {
						//the href is a document relative url
						docBase = docLocation + href;
						//XXX: we need some code here to calculate the final path
						// just in case the docBase contains up-level (../) references.
					}
				}
				else {
					//the href is an absolute url
					docBase = href;
				}
			}
			//make sure docBase ends with a slash
			docBase = docBase  + (docBase.charAt(docBase.length - 1) === '/' ? ' ' : '/');
		}

		//base element management, defined depending on dynamic base tag support
		var base = $.support.dynamicBaseTag ? {

			//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
			element: ($base.length ? $base : $("<base>", { href: docBase }).prependTo( $head )),

			//set the generated BASE element's href attribute to a new page's base path
			set: function( href ){
				base.element.attr('href', docBase + path.get( href ));
			},

			//set the generated BASE element's href attribute to a new page's base path
			reset: function(){
				base.element.attr('href', docBase );
			}

		} : undefined;



		//set location pathname from intial directory request
		path.setOrigin();

/*
	internal utility functions
--------------------------------------*/


	//direct focus to the page title, or otherwise first focusable element
	function reFocus( page ){
		var lastClicked = page.jqmData( "lastClicked" );
			
		if( lastClicked && lastClicked.length ){
			lastClicked.focus();
		}
		else {
			var pageTitle = page.find( ".ui-title:eq(0)" );
			
			if( pageTitle.length ){
				pageTitle.focus();
			}
			else{
				page.find( focusable ).eq(0).focus();
			}
		}
	}

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ){
		if( !!$activeClickedLink && (!$activeClickedLink.closest( '.ui-page-active' ).length || forceRemoval )){
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}

	//animation complete callback
	$.fn.animationComplete = function( callback ){
		if($.support.cssTransitions){
			return $(this).one('webkitAnimationEnd', callback);
		}
		else{
			// defer execution for consistency between webkit/non webkit
			setTimeout(callback, 0);
			return $(this);
		}
	};



/* exposed $.mobile methods	 */

	//update location.hash, with or without triggering hashchange event
	//TODO - deprecate this one at 1.0
	$.mobile.updateHash = path.set;

	//expose path object on $.mobile
	$.mobile.path = path;

	//expose base object on $.mobile
	$.mobile.base = base;

	//url stack, useful when plugins need to be aware of previous pages viewed
	//TODO: deprecate this one at 1.0
	$.mobile.urlstack = urlHistory.stack;

	//history stack
	$.mobile.urlHistory = urlHistory;

	//enable cross-domain page support
	$.mobile.allowCrossDomainPages = false;

	// changepage function
	$.mobile.changePage = function( to, transition, reverse, changeHash, fromHashChange ){
		//from is always the currently viewed page
		var toIsArray = $.type(to) === "array",
			toIsObject = $.type(to) === "object",
			from = toIsArray ? to[0] : $.mobile.activePage;

			to = toIsArray ? to[1] : to;

		var url = $.type(to) === "string" ? path.stripHash( to ) : "",
			fileUrl = url,
			data,
			type = 'get',
			isFormRequest = false,
			duplicateCachedPage = null,
			currPage = urlHistory.getActive(),
			back = false,
			forward = false,
			pageTitle = document.title;


		// If we are trying to transition to the same page that we are currently on ignore the request.
		// an illegal same page request is defined by the current page being the same as the url, as long as there's history
		// and to is not an array or object (those are allowed to be "same")
		if( currPage && urlHistory.stack.length > 1 && currPage.url === url && !toIsArray && !toIsObject ) {
			return;
		}
		else if(isPageTransitioning) {
			pageTransitionQueue.unshift(arguments);
			return;
		}

		isPageTransitioning = true;

		// if the changePage was sent from a hashChange event guess if it came from the history menu
		// and match the transition accordingly
		if( fromHashChange ){
			urlHistory.directHashChange({
				currentUrl: url,
				isBack: function(){
					forward = !(back = true);
					reverse = true;
					transition = transition || currPage.transition;
				},
				isForward: function(){
					forward = !(back = false);
					transition = transition || urlHistory.getActive().transition;
				}
			});

			//TODO forward = !back was breaking for some reason
		}

		if( toIsObject && to.url ){
			url = to.url;
			data = to.data;
			type = to.type;
			isFormRequest = true;
			//make get requests bookmarkable
			if( data && type === 'get' ){
				if($.type( data ) === "object" ){
					data = $.param(data);
				}

				url += "?" + data;
				data = undefined;
			}
		}

		//reset base to pathname for new request
		if(base){ base.reset(); }

		//kill the keyboard
		if( window.document.activeElement ){
			$( window.document.activeElement || "" ).add( "input:focus, textarea:focus, select:focus" ).blur();
		}

		function defaultTransition(){
			if(transition === undefined){
				transition = ( nextPageRole && nextPageRole === 'dialog' ) ? 'pop' : $.mobile.defaultTransition;
			}
		}

		function releasePageTransitionLock(){
			isPageTransitioning = false;
			if(pageTransitionQueue.length>0) {
				$.mobile.changePage.apply($.mobile, pageTransitionQueue.pop());
			}
		}

		//function for transitioning between two existing pages
		function transitionPages() {
		    $.mobile.silentScroll();

			//get current scroll distance
			var currScroll = $window.scrollTop(),
					perspectiveTransitions = [ "flip" ],
					pageContainerClasses = [];

			//support deep-links to generated sub-pages
			if( url.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ){
				to = $( ":jqmData(url='" + url + "')" );
			}

			if( from ){
				//set as data for returning to that spot
				from
					.jqmData( "lastScroll", currScroll)
					.jqmData( "lastClicked", $activeClickedLink);
				//trigger before show/hide events
				from.data( "page" )._trigger( "beforehide", null, { nextPage: to } );
			}
			to.data( "page" )._trigger( "beforeshow", null, { prevPage: from || $("") } );

			function pageChangeComplete(){

				if( changeHash !== false && url ){
					//disable hash listening temporarily
					urlHistory.ignoreNextHashChange = false;
					//update hash and history
					path.set( url );
				}

				//if title element wasn't found, try the page div data attr too
				var newPageTitle = to.jqmData("title") || to.find(".ui-header .ui-title" ).text();
				if( !!newPageTitle && pageTitle == document.title ){
					pageTitle = newPageTitle;
				}

				//add page to history stack if it's not back or forward
				if( !back && !forward ){
					urlHistory.addNew( url, transition, pageTitle, to );
				}

				//set page title
				document.title = urlHistory.getActive().title;

				removeActiveLinkClass();

				//jump to top or prev scroll, sometimes on iOS the page has not rendered yet.  I could only get by this with a setTimeout, but would like to avoid that.
				$.mobile.silentScroll( to.jqmData( "lastScroll" ) );

				reFocus( to );

				//trigger show/hide events
				if( from ){
					from.data( "page" )._trigger( "hide", null, { nextPage: to } );
				}
				//trigger pageshow, define prevPage as either from or empty jQuery obj
				to.data( "page" )._trigger( "show", null, { prevPage: from || $("") } );

				//set "to" as activePage
				$.mobile.activePage = to;

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if (duplicateCachedPage !== null) {
				    duplicateCachedPage.remove();
				}

				//remove initial build class (only present on first pageshow)
				$html.removeClass( "ui-mobile-rendering" );

				releasePageTransitionLock();
			}

			function addContainerClass(className){
				$.mobile.pageContainer.addClass(className);
				pageContainerClasses.push(className);
			}

			function removeContainerClasses(){
				$.mobile
					.pageContainer
					.removeClass(pageContainerClasses.join(" "));

				pageContainerClasses = [];
			}

			if(transition && (transition !== 'none')){
			    $.mobile.pageLoading( true );
				if( $.inArray(transition, perspectiveTransitions) >= 0 ){
					addContainerClass('ui-mobile-viewport-perspective');
				}

				addContainerClass('ui-mobile-viewport-transitioning');

				if( from ){
					from.addClass( transition + " out " + ( reverse ? "reverse" : "" ) );
				}
				to.addClass( $.mobile.activePageClass + " " + transition +
					" in " + ( reverse ? "reverse" : "" ) );

				// callback - remove classes, etc
				to.animationComplete(function() {
					to.add(from).removeClass("out in reverse " + transition );
					if( from ){
						from.removeClass( $.mobile.activePageClass );
					}
					pageChangeComplete();
					removeContainerClasses();
				});
			}
			else{
			    $.mobile.pageLoading( true );
			    if( from ){
					from.removeClass( $.mobile.activePageClass );
				}
				to.addClass( $.mobile.activePageClass );
				pageChangeComplete();
			}
		}

		//shared page enhancements
		function enhancePage(){

			//set next page role, if defined
			if ( nextPageRole || to.jqmData('role') === 'dialog' ) {
				url = urlHistory.getActive().url + dialogHashKey;
				if(nextPageRole){
					to.attr( "data-" + $.mobile.ns + "role", nextPageRole );
					nextPageRole = null;
				}
			}

			//run page plugin
			to.page();
		}

		//if url is a string
		if( url ){
			to = $( ":jqmData(url='" + url + "')" );
			fileUrl = path.getFilePath(url);
		}
		else{ //find base url of element, if avail
			var toID = to.attr( "data-" + $.mobile.ns + "url" ),
				toIDfileurl = path.getFilePath(toID);

			if(toID !== toIDfileurl){
				fileUrl = toIDfileurl;
			}
		}

		// ensure a transition has been set where pop is undefined
		defaultTransition();

		// find the "to" page, either locally existing in the dom or by creating it through ajax
		if ( to.length && !isFormRequest ) {
			if( fileUrl && base ){
				base.set( fileUrl );
			}
			enhancePage();
			transitionPages();
		} else {

			//if to exists in DOM, save a reference to it in duplicateCachedPage for removal after page change
			if( to.length ){
				duplicateCachedPage = to;
			}

			$.mobile.pageLoading();

			$.ajax({
				url: fileUrl,
				type: type,
				data: data,
				dataType: "html",
				success: function( html ) {
					//pre-parse html to check for a data-url,
					//use it as the new fileUrl, base path, etc
					var all = $("<div></div>"),
							redirectLoc,

							//page title regexp
							newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,

							// TODO handle dialogs again
							pageElemRegex = new RegExp(".*(<[^>]+\\bdata-" + $.mobile.ns + "role=[\"']?page[\"']?[^>]*>).*"),
							dataUrlRegex = new RegExp("\\bdata-" + $.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?");


					// data-url must be provided for the base tag so resource requests can be directed to the
					// correct url. loading into a temprorary element makes these requests immediately
					if(pageElemRegex.test(html) && RegExp.$1 && dataUrlRegex.test(RegExp.$1) && RegExp.$1) {
						redirectLoc = RegExp.$1;
					}

					if( redirectLoc ){
						if(base){
							base.set( redirectLoc );
						}
						url = fileUrl = path.getFilePath( redirectLoc );
					}
					else {
						if(base){
							base.set(fileUrl);
						}
					}

					//workaround to allow scripts to execute when included in page divs
					all.get(0).innerHTML = html;
					to = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

					//finally, if it's defined now, set the page title for storage in urlHistory
					if( newPageTitle ){
						pageTitle = newPageTitle;
					}

					//rewrite src and href attrs to use a base url
					if( !$.support.dynamicBaseTag ){
						var newPath = path.get( fileUrl );
						to.find( "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]" ).each(function(){
							var thisAttr = $(this).is('[href]') ? 'href' : 'src',
								thisUrl = $(this).attr(thisAttr);


							//if full path exists and is same, chop it - helps IE out
							thisUrl = thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

							if( !/^(\w+:|#|\/)/.test(thisUrl) ){
								$(this).attr(thisAttr, newPath + thisUrl);
							}
						});
					}

					//append to page and enhance
					to
						.attr( "data-" + $.mobile.ns + "url", fileUrl )
						.appendTo( $.mobile.pageContainer );

					enhancePage();
					setTimeout(function() { transitionPages(); }, 0);
				},
				error: function() {

					//remove loading message
					$.mobile.pageLoading( true );

					//clear out the active button state
					removeActiveLinkClass(true);

					//set base back to current path
					if( base ){
						base.set( path.get() );
					}

					//release transition lock so navigation is free again
					releasePageTransitionLock();

					//show error message
					$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ $.mobile.pageLoadErrorMessage +"</h1></div>")
						.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
						.appendTo( $.mobile.pageContainer )
						.delay( 800 )
						.fadeOut( 400, function(){
							$(this).remove();
						});
				}
			});
		}

	};


/* Event Bindings - hashchange, submit, and click */

	//bind to form submit events, handle with Ajax
	$( "form" ).live('submit', function(event){
		if( !$.mobile.ajaxEnabled ||
			//TODO: deprecated - remove at 1.0
			!$.mobile.ajaxFormsEnabled ||
			$(this).is( ":jqmData(ajax='false')" ) ){ return; }

		var type = $(this).attr("method"),
			url = path.clean( $(this).attr( "action" ) ),
			target = $(this).attr("target");

		//external submits use regular HTTP
		if( path.isExternal( url ) || target ){
			return;
		}

		//if it's a relative href, prefix href with base url
		if( path.isRelative( url ) ){
			url = path.makeAbsolute( url );
		}

		$.mobile.changePage({
				url: url.length && url || path.get(),
				type: type.length && type.toLowerCase() || "get",
				data: $(this).serialize()
			},
			$(this).jqmData("transition"),
			$(this).jqmData("direction"),
			true
		);
		event.preventDefault();
	});
	
	//add active state on vclick
	$( "a" ).live( "vclick", function(){
		$(this).closest( ".ui-btn" ).not( ".ui-disabled" ).addClass( $.mobile.activeBtnClass );
	});


	//click routing - direct to HTTP or Ajax, accordingly
	$( "a" ).live( "click", function(event) {

		var $this = $(this),

			//get href, if defined, otherwise fall to null #
			href = $this.attr( "href" ) || "#",

			//cache a check for whether the link had a protocol
			//if this is true and the link was same domain, we won't want
			//to prefix the url with a base (esp helpful in IE, where every
			//url is absolute
			hadProtocol = path.hasProtocol( href ),

			//get href, remove same-domain protocol and host
			url = path.clean( href ),

			//rel set to external
			isRelExternal = $this.is( "[rel='external']" ),

			//rel set to external
			isEmbeddedPage = path.isEmbeddedPage( url ),

			// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
			// requests if the document doing the request was loaded via the file:// protocol.
			// This is usually to allow the application to "phone home" and fetch app specific
			// data. We normally let the browser handle external/cross-domain urls, but if the
			// allowCrossDomainPages option is true, we will allow cross-domain http/https
			// requests to go through our page loading logic.
			isCrossDomainPageLoad = ($.mobile.allowCrossDomainPages && location.protocol === "file:" && url.search(/^https?:/) != -1),

			//check for protocol or rel and its not an embedded page
			//TODO overlap in logic from isExternal, rel=external check should be
			//     moved into more comprehensive isExternalLink
			isExternal = (path.isExternal(url) && !isCrossDomainPageLoad) || (isRelExternal && !isEmbeddedPage),

			//if target attr is specified we mimic _blank... for now
			hasTarget = $this.is( "[target]" ),

			//if data-ajax attr is set to false, use the default behavior of a link
			hasAjaxDisabled = $this.is( ":jqmData(ajax='false')" ),

			//if the url matches the active page's url
			isCurrentPage = path.stripHash(url) == $.mobile.activePage.jqmData("url");

		//if there's a data-rel=back attr, go back in history
		if( $this.is( ":jqmData(rel='back')" ) ){
			window.history.back();
			return false;
		}

		//prevent # urls from bubbling
		//path.get() is replaced to combat abs url prefixing in IE
		//or if the link is to the current page
		if( url.replace(path.get(), "") == "#" || isCurrentPage ){
			//for links created purely for interaction - ignore
			event.preventDefault();
			return;
		}

		$activeClickedLink = $this.closest( ".ui-btn" );

		if( isExternal || hasAjaxDisabled || hasTarget || !$.mobile.ajaxEnabled ||
			// TODO: deprecated - remove at 1.0
			!$.mobile.ajaxLinksEnabled ){
			//remove active link class if external (then it won't be there if you come back)
			window.setTimeout(function() {removeActiveLinkClass(true);}, 200);

			//use default click handling
			return;
		}

		//use ajax
		var transition = $this.jqmData( "transition" ),
			direction = $this.jqmData("direction"),
			reverse = (direction && direction === "reverse") ||
			// deprecated - remove by 1.0
			$this.jqmData( "back" );

		//this may need to be more specific as we use data-rel more
		nextPageRole = $this.attr( "data-" + $.mobile.ns + "rel" );

		//if it's a relative href, prefix href with base url
		if( path.isRelative( url ) && !hadProtocol ){
			url = path.makeAbsolute( url );
		}

		url = path.stripHash( url );

		$.mobile.changePage( url, transition, reverse);
		event.preventDefault();
	});

	//hashchange event handler
	$window.bind( "hashchange", function( e, triggered ) {
		//find first page via hash
		var to = path.stripHash( location.hash ),
			//transition is false if it's the first page, undefined otherwise (and may be overridden by default)
			transition = $.mobile.urlHistory.stack.length === 0 ? false : undefined;

		//if listening is disabled (either globally or temporarily), or it's a dialog hash
		if( !$.mobile.hashListeningEnabled || !urlHistory.ignoreNextHashChange ){
			if( !urlHistory.ignoreNextHashChange ){
				urlHistory.ignoreNextHashChange = true;
			}

			return;
		}

		// special case for dialogs
		if( urlHistory.stack.length > 1 &&
				to.indexOf( dialogHashKey ) > -1 ){

			// If current active page is not a dialog skip the dialog and continue
			// in the same direction
			if(!$.mobile.activePage.is( ".ui-dialog" )) {
				//determine if we're heading forward or backward and continue accordingly past
				//the current dialog
				urlHistory.directHashChange({
					currentUrl: to,
					isBack: function(){ window.history.back(); },
					isForward: function(){ window.history.forward(); }
				});

				// prevent changepage
				return;
			} else {
				var setTo = function(){ to = $.mobile.urlHistory.getActive().page; };
				// if the current active page is a dialog and we're navigating
				// to a dialog use the dialog objected saved in the stack
				urlHistory.directHashChange({	currentUrl: to, isBack: setTo, isForward: setTo	});
			}
		}

		//if to is defined, load it
		if ( to ){
			$.mobile.changePage( to, transition, undefined, false, true );
		}
		//there's no hash, go to the first page in the dom
		else {
			$.mobile.changePage( $.mobile.firstPage, transition, true, false, true );
		}
		});

})( jQuery );
/*
* jQuery Mobile Framework : "fixHeaderFooter" plugin - on-demand positioning for headers,footers
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.fn.fixHeaderFooter = function(options){
	if( !$.support.scrollTop ){ return this; }
	
	return this.each(function(){
		var $this = $(this);
		
		if( $this.jqmData('fullscreen') ){ $this.addClass('ui-page-fullscreen'); }
		$this.find( ".ui-header:jqmData(position='fixed')" ).addClass('ui-header-fixed ui-fixed-inline fade'); //should be slidedown
		$this.find( ".ui-footer:jqmData(position='fixed')" ).addClass('ui-footer-fixed ui-fixed-inline fade'); //should be slideup		
	});
};

//single controller for all showing,hiding,toggling		
$.fixedToolbars = (function(){
	if( !$.support.scrollTop ){ return; }
	var currentstate = 'inline',
		autoHideMode = false,
		showDelay = 100,
		delayTimer,
		ignoreTargets = 'a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed',
		toolbarSelector = '.ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last',
		stickyFooter, //for storing quick references to duplicate footers
		supportTouch = $.support.touch,
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		stateBefore = null,
		scrollTriggered = false,
        touchToggleEnabled = true;

	function showEventCallback(event)
	{
		// An event that affects the dimensions of the visual viewport has
		// been triggered. If the header and/or footer for the current page are in overlay
		// mode, we want to hide them, and then fire off a timer to show them at a later
		// point. Events like a resize can be triggered continuously during a scroll, on
		// some platforms, so the timer is used to delay the actual positioning until the
		// flood of events have subsided.
		//
		// If we are in autoHideMode, we don't do anything because we know the scroll
		// callbacks for the plugin will fire off a show when the scrolling has stopped.
		if (!autoHideMode && currentstate == 'overlay') {
			if (!delayTimer)
				$.fixedToolbars.hide(true);
			$.fixedToolbars.startShowTimer();
		}
	}

	$(function() {
		$(document)
			.bind( "vmousedown",function(event){
				if( touchToggleEnabled ) {
					stateBefore = currentstate;
				}
			})
			.bind( "vclick",function(event){
				if( touchToggleEnabled ) {
					if( $(event.target).closest(ignoreTargets).length ){ return; }
					if( !scrollTriggered ){
						$.fixedToolbars.toggle(stateBefore);
						stateBefore = null;
					}
				}
			})
			.bind('scrollstart',function(event){
				scrollTriggered = true;
				if(stateBefore == null){ stateBefore = currentstate; }

				// We only enter autoHideMode if the headers/footers are in
				// an overlay state or the show timer was started. If the
				// show timer is set, clear it so the headers/footers don't
				// show up until after we're done scrolling.
				var isOverlayState = stateBefore == 'overlay';
				autoHideMode = isOverlayState || !!delayTimer;
				if (autoHideMode){
					$.fixedToolbars.clearShowTimer();
					if (isOverlayState) {
						$.fixedToolbars.hide(true);
					}
				}
			})
			.bind('scrollstop',function(event){
				if( $(event.target).closest(ignoreTargets).length ){ return; }
				scrollTriggered = false;
				if (autoHideMode) {
					autoHideMode = false;
					$.fixedToolbars.startShowTimer();
				}
				stateBefore = null;
			})
			.bind('silentscroll', showEventCallback);

			$(window).bind('resize', showEventCallback);
	});
		
	//before page is shown, check for duplicate footer
	$('.ui-page').live('pagebeforeshow', function(event, ui){
		var page = $(event.target),
			footer = page.find( ":jqmData(role='footer')" ),
			id = footer.data('id'),
			prevPage = ui.prevPage;
		
		prevFooter = prevPage && prevPage.find( ":jqmData(role='footer')" );
		var prevFooterMatches = prevFooter.jqmData( "id" ) === id;
		
		if( id && prevFooterMatches ){
			stickyFooter = footer;
			setTop( stickyFooter.removeClass( "fade in out" ).appendTo( $.mobile.pageContainer ) );
		}
	});

	//after page is shown, append footer to new page
	$('.ui-page').live('pageshow', function(event, ui){
		var $this = $(this);
		
		if( stickyFooter && stickyFooter.length ){	
			
			setTimeout(function(){
				setTop( stickyFooter.appendTo( $this ).addClass("fade") );
				stickyFooter = null;
			}, 500);	
		}
		
		$.fixedToolbars.show(true, this);	
	});

	
	// element.getBoundingClientRect() is broken in iOS 3.2.1 on the iPad. The
	// coordinates inside of the rect it returns don't have the page scroll position
	// factored out of it like the other platforms do. To get around this,
	// we'll just calculate the top offset the old fashioned way until core has
	// a chance to figure out how to handle this situation.
	//
	// TODO: We'll need to get rid of getOffsetTop() once a fix gets folded into core.

	function getOffsetTop(ele)
	{
		var top = 0;
		if (ele)
		{
			var op = ele.offsetParent, body = document.body;
			top = ele.offsetTop;
			while (ele && ele != body)
			{
				top += ele.scrollTop || 0;
				if (ele == op)
				{
					top += op.offsetTop;
					op = ele.offsetParent;
				}
				ele = ele.parentNode;
			}
		}
		return top;
	}

	function setTop(el){
		var fromTop = $(window).scrollTop(),
			thisTop = getOffsetTop(el[0]), // el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
			thisCSStop = el.css('top') == 'auto' ? 0 : parseFloat(el.css('top')),
			screenHeight = window.innerHeight,
			thisHeight = el.outerHeight(),
			useRelative = el.parents('.ui-page:not(.ui-page-fullscreen)').length,
			relval;
		if( el.is('.ui-header-fixed') ){
			relval = fromTop - thisTop + thisCSStop;
			if( relval < thisTop){ relval = 0; }
			return el.css('top', ( useRelative ) ? relval : fromTop);
		}
		else{
			//relval = -1 * (thisTop - (fromTop + screenHeight) + thisCSStop + thisHeight);
			//if( relval > thisTop ){ relval = 0; }
			relval = fromTop + screenHeight - thisHeight - (thisTop - thisCSStop);
			return el.css('top', ( useRelative ) ? relval : fromTop + screenHeight - thisHeight );
		}
	}

	//exposed methods
	return {
		show: function(immediately, page){
			$.fixedToolbars.clearShowTimer();
			currentstate = 'overlay';
			var $ap = page ? $(page) : ($.mobile.activePage ? $.mobile.activePage : $(".ui-page-active"));
			return $ap.children( toolbarSelector ).each(function(){
				var el = $(this),
					fromTop = $(window).scrollTop(),
					thisTop = getOffsetTop(el[0]), // el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
					screenHeight = window.innerHeight,
					thisHeight = el.outerHeight(),
					alreadyVisible = (el.is('.ui-header-fixed') && fromTop <= thisTop + thisHeight) || (el.is('.ui-footer-fixed') && thisTop <= fromTop + screenHeight);	
				
				//add state class
				el.addClass('ui-fixed-overlay').removeClass('ui-fixed-inline');	
					
				if( !alreadyVisible && !immediately ){
					el.animationComplete(function(){
						el.removeClass('in');
					}).addClass('in');
				}
				setTop(el);
			});	
		},
		hide: function(immediately){
			currentstate = 'inline';
			var $ap = $.mobile.activePage ? $.mobile.activePage : $(".ui-page-active");
			return $ap.children( toolbarSelector ).each(function(){
				var el = $(this);

				var thisCSStop = el.css('top'); thisCSStop = thisCSStop == 'auto' ? 0 : parseFloat(thisCSStop);
				
				//add state class
				el.addClass('ui-fixed-inline').removeClass('ui-fixed-overlay');
				
				if (thisCSStop < 0 || (el.is('.ui-header-fixed') && thisCSStop != 0))
				{
					if(immediately){
						el.css('top',0);
					}
					else{
						if( el.css('top') !== 'auto' && parseFloat(el.css('top')) !== 0 ){
							var classes = 'out reverse';
							el.animationComplete(function(){
								el.removeClass(classes);
								el.css('top',0);
							}).addClass(classes);	
						}
					}
				}
			});
		},
		startShowTimer: function(){
			$.fixedToolbars.clearShowTimer();
			var args = $.makeArray(arguments);
			delayTimer = setTimeout(function(){
				delayTimer = undefined;
				$.fixedToolbars.show.apply(null, args);
			}, showDelay);
		},
		clearShowTimer: function() {
			if (delayTimer) {
				clearTimeout(delayTimer);
			}
			delayTimer = undefined;
		},
		toggle: function(from){
			if(from){ currentstate = from; }
			return (currentstate == 'overlay') ? $.fixedToolbars.hide() : $.fixedToolbars.show();
		},
        setTouchToggleEnabled: function(enabled) {
            touchToggleEnabled = enabled;
        }
	};
})();

})(jQuery);
/*
* jQuery Mobile Framework : "checkboxradio" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.widget( "mobile.checkboxradio", $.mobile.widget, {
	options: {
		theme: null
	},
	_create: function(){
		var self = this,
			input = this.element,
			//NOTE: Windows Phone could not find the label through a selector
			//filter works though.
			label = input.closest("form,fieldset,:jqmData(role='page')").find("label").filter("[for=" + input[0].id + "]"),
			inputtype = input.attr( "type" ),
			checkedicon = "ui-icon-" + inputtype + "-on",
			uncheckedicon = "ui-icon-" + inputtype + "-off";

		if ( inputtype != "checkbox" && inputtype != "radio" ) { return; }

		//expose for other methods
		$.extend( this,{
			label			: label,
			inputtype		: inputtype,
			checkedicon		: checkedicon,
			uncheckedicon	: uncheckedicon
		});

		// If there's no selected theme...
		if( !this.options.theme ) {
			this.options.theme = this.element.jqmData( "theme" );
		}

		label
			.buttonMarkup({
				theme: this.options.theme,
				icon: this.element.parents( ":jqmData(type='horizontal')" ).length ? undefined : uncheckedicon,
				shadow: false
			});

		// wrap the input + label in a div
		input
			.add( label )
			.wrapAll( "<div class='ui-" + inputtype +"'></div>" );

		label.bind({
			vmouseover: function() {
				if( $(this).parent().is('.ui-disabled') ){ return false; }
			},

			vclick: function( event ){
				if ( input.is( ":disabled" ) ){
					event.preventDefault();
					return;
				}

				self._cacheVals();
				input.attr( "checked", inputtype === "radio" && true || !input.is( ":checked" ) );
				self._updateAll();
				return false;
			}

		});

		input
			.bind({
				vmousedown: function(){
					this._cacheVals();
				},

				vclick: function(){
					self._updateAll();
				},

				focus: function() {
					label.addClass( "ui-focus" );
				},

				blur: function() {
					label.removeClass( "ui-focus" );
				}
			});

		this.refresh();

	},

	_cacheVals: function(){
		this._getInputSet().each(function(){
			$(this).jqmData("cacheVal", $(this).is(":checked") );
		});
	},

	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function(){
		return this.element.closest( "form,fieldset,:jqmData(role='page')" )
				.find( "input[name='"+ this.element.attr( "name" ) +"'][type='"+ this.inputtype +"']" );
	},

	_updateAll: function(){
		var self = this;

		this._getInputSet().each(function(){
			if( $(this).is(":checked") || self.inputtype === "checkbox" ){
				$(this).trigger("change");
			}
		})
		.checkboxradio( "refresh" );
	},

	refresh: function( ){
		var input = this.element,
			label = this.label,
			icon = label.find( ".ui-icon" );

		if ( input[0].checked ) {
			label.addClass( $.mobile.activeBtnClass );
			icon.addClass( this.checkedicon ).removeClass( this.uncheckedicon );

		} else {
			label.removeClass( $.mobile.activeBtnClass );
			icon.removeClass( this.checkedicon ).addClass( this.uncheckedicon );
		}

		if( input.is( ":disabled" ) ){
			this.disable();
		}
		else {
			this.enable();
		}
	},

	disable: function(){
		this.element.attr("disabled",true).parent().addClass("ui-disabled");
	},

	enable: function(){
		this.element.attr("disabled",false).parent().removeClass("ui-disabled");
	}
});
})( jQuery );
/*
* jQuery Mobile Framework : "textinput" plugin for text inputs, textareas
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null
	},
	_create: function(){
		var input = this.element,
			o = this.options,
			theme = o.theme,
			themeclass;
			
		if ( !theme ) {
			var themedParent = this.element.closest("[class*='ui-bar-'],[class*='ui-body-']"); 
				theme = themedParent.length ?
					/ui-(bar|body)-([a-z])/.exec( themedParent.attr("class") )[2] :
					"c";
		}	
		
		themeclass = " ui-body-" + theme;
		
		$('label[for='+input.attr('id')+']').addClass('ui-input-text');
		
		input.addClass('ui-input-text ui-body-'+ o.theme);
		
		var focusedEl = input;
		
		//"search" input widget
		if( input.is( "[type='search'],:jqmData(type='search')" ) ){
			focusedEl = input.wrap('<div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield'+ themeclass +'"></div>').parent();
			var clearbtn = $('<a href="#" class="ui-input-clear" title="clear text">clear text</a>')
				.tap(function( e ){
					input.val('').focus();
					input.trigger('change'); 
					clearbtn.addClass('ui-input-clear-hidden');
					e.preventDefault();
				})
				.appendTo(focusedEl)
				.buttonMarkup({icon: 'delete', iconpos: 'notext', corners:true, shadow:true});
			
			function toggleClear(){
				if(input.val() == ''){
					clearbtn.addClass('ui-input-clear-hidden');
				}
				else{
					clearbtn.removeClass('ui-input-clear-hidden');
				}
			}
			
			toggleClear();
			input.keyup(toggleClear);	
		}
		else{
			input.addClass('ui-corner-all ui-shadow-inset' + themeclass);
		}
				
		input
			.focus(function(){
				focusedEl.addClass('ui-focus');
			})
			.blur(function(){
				focusedEl.removeClass('ui-focus');
			});	
			
		//autogrow
		if ( input.is('textarea') ) {
			var extraLineHeight = 15,
				keyupTimeoutBuffer = 100,
				keyup = function() {
					var scrollHeight = input[0].scrollHeight,
						clientHeight = input[0].clientHeight;
					if ( clientHeight < scrollHeight ) {
						input.css({ height: (scrollHeight + extraLineHeight) });
					}
				},
				keyupTimeout;
			input.keyup(function() {
				clearTimeout( keyupTimeout );
				keyupTimeout = setTimeout( keyup, keyupTimeoutBuffer );
			});
		}
	},
	
	disable: function(){
		( this.element.attr("disabled",true).is( "[type='search'],:jqmData(type='search')" ) ? this.element.parent() : this.element ).addClass("ui-disabled");
	},
	
	enable: function(){
		( this.element.attr("disabled", false).is( "[type='search'],:jqmData(type='search')" ) ? this.element.parent() : this.element ).removeClass("ui-disabled");
	}
});
})( jQuery );
/*
* jQuery Mobile Framework : "selectmenu" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.widget( "mobile.selectmenu", $.mobile.widget, {
	options: {
		theme: null,
		disabled: false,
		icon: 'arrow-d',
		iconpos: 'right',
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		menuPageTheme: 'b',
		overlayTheme: 'a',
		hidePlaceholderMenuItems: true,
		closeText: 'Close',
		nativeMenu: true
	},
	_create: function(){
		
		var self = this,

			o = this.options,

			select = this.element
						.wrap( "<div class='ui-select'>" ),

			selectID = select.attr( "id" ),

			label = $( "label[for="+ selectID +"]" ).addClass( "ui-select" ),
			
			//IE throws an exception at options.item() function when
			//there is no selected item
			//select first in this case 
			selectedIndex = select[0].selectedIndex == -1 ? 0 : select[0].selectedIndex,
			
			button = ( self.options.nativeMenu ? $( "<div/>" ) : $( "<a>", {
					"href": "#",
					"role": "button",
					"id": buttonId,
					"aria-haspopup": "true",
					"aria-owns": menuId
				}) )
				.text( $( select[0].options.item( selectedIndex ) ).text() )
				.insertBefore( select )
				.buttonMarkup({
					theme: o.theme,
					icon: o.icon,
					iconpos: o.iconpos,
					inline: o.inline,
					corners: o.corners,
					shadow: o.shadow,
					iconshadow: o.iconshadow
				}),

			//multi select or not
			isMultiple = self.isMultiple = select[0].multiple;

		//Opera does not properly support opacity on select elements
		//In Mini, it hides the element, but not its text
		//On the desktop,it seems to do the opposite
		//for these reasons, using the nativeMenu option results in a full native select in Opera
		if( o.nativeMenu && window.opera && window.opera.version ){
			select.addClass( "ui-select-nativeonly" );
		}

		//vars for non-native menus
		if( !o.nativeMenu ){
			var options = select.find("option"),

				buttonId = selectID + "-button",

				menuId = selectID + "-menu",

				thisPage = select.closest( ".ui-page" ),

				//button theme
				theme = /ui-btn-up-([a-z])/.exec( button.attr("class") )[1],

				menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' data-" +$.mobile.ns + "theme='"+ o.menuPageTheme +"'>" +
							"<div data-" + $.mobile.ns + "role='header'>" +
								"<div class='ui-title'>" + label.text() + "</div>"+
							"</div>"+
							"<div data-" + $.mobile.ns + "role='content'></div>"+
						"</div>" )
						.appendTo( $.mobile.pageContainer )
						.page(),

				menuPageContent = menuPage.find( ".ui-content" ),

				menuPageClose = menuPage.find( ".ui-header a" ),

				screen = $( "<div>", {"class": "ui-selectmenu-screen ui-screen-hidden"})
							.appendTo( thisPage ),

				listbox = $( "<div>", { "class": "ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all pop ui-body-" + o.overlayTheme } )
						.insertAfter(screen),

				list = $( "<ul>", {
						"class": "ui-selectmenu-list",
						"id": menuId,
						"role": "listbox",
						"aria-labelledby": buttonId
					})
					.attr( "data-" + $.mobile.ns + "theme", theme )
					.appendTo( listbox ),

				header = $( "<div>", {
						"class": "ui-header ui-bar-" + theme
					})
					.prependTo( listbox ),

				headerTitle = $( "<h1>", {
						"class": "ui-title"
					})
					.appendTo( header ),

				headerClose = $( "<a>", {
						"text": o.closeText,
						"href": "#",
						"class": "ui-btn-left"
					})
					.attr( "data-" + $.mobile.ns + "iconpos", "notext" )
					.attr( "data-" + $.mobile.ns + "icon", "delete" )
					.appendTo( header )
					.buttonMarkup(),

				menuType;
		} //end non native vars

		// add counter for multi selects
		if( isMultiple ){
			self.buttonCount = $('<span>')
				.addClass( 'ui-li-count ui-btn-up-c ui-btn-corner-all' )
				.hide()
				.appendTo( button );
		}

		//disable if specified
		if( o.disabled ){ this.disable(); }

		//events on native select
		select
			.change(function(){
				self.refresh();
			});

		//expose to other methods
		$.extend(self, {
			select: select,
			optionElems: options,
			selectID: selectID,
			label: label,
			buttonId:buttonId,
			menuId:menuId,
			thisPage:thisPage,
			button:button,
			menuPage:menuPage,
			menuPageContent:menuPageContent,
			screen:screen,
			listbox:listbox,
			list:list,
			menuType:menuType,
			header:header,
			headerClose:headerClose,
			headerTitle:headerTitle,
			placeholder: ''
		});

		//support for using the native select menu with a custom button
		if( o.nativeMenu ){

			select
				.appendTo(button)
				.bind( "vmousedown", function( e ){
					//add active class to button
					button.addClass( $.mobile.activeBtnClass );
				})
				.bind( "focus vmouseover", function(){
					button.trigger( "vmouseover" );
				})
				.bind( "vmousemove", function(){
					//remove active class on scroll/touchmove
					button.removeClass( $.mobile.activeBtnClass );
				})
				.bind( "change blur vmouseout", function(){
					button
						.trigger( "vmouseout" )
						.removeClass( $.mobile.activeBtnClass );
				});


		} else {

			//create list from select, update state
			self.refresh();

			select
				.attr( "tabindex", "-1" )
				.focus(function(){
					$(this).blur();
					button.focus();
				});	

			//button events
			button
				.bind( "vclick keydown" , function( event ){
					if( event.type == "vclick" || 
						event.keyCode && ( event.keyCode === $.mobile.keyCode.ENTER || event.keyCode === $.mobile.keyCode.SPACE ) ){
						self.open();
						event.preventDefault();
					}
				});

			//events for list items
			list
			.attr( "role", "listbox" )
			.delegate( ".ui-li>a", "focusin", function() {
				$( this ).attr( "tabindex", "0" );
			})
			.delegate( ".ui-li>a", "focusout", function() {
				$( this ).attr( "tabindex", "-1" );
			})
			.delegate("li:not(.ui-disabled, .ui-li-divider)", "vclick", function(event){

				// index of option tag to be selected
				var oldIndex = select[0].selectedIndex,
					newIndex = list.find( "li:not(.ui-li-divider)" ).index( this ),
					option = self.optionElems.eq( newIndex )[0];

				// toggle selected status on the tag for multi selects
				option.selected = isMultiple ? !option.selected : true;

				// toggle checkbox class for multiple selects
				if( isMultiple ){
					$(this)
						.find('.ui-icon')
						.toggleClass('ui-icon-checkbox-on', option.selected)
						.toggleClass('ui-icon-checkbox-off', !option.selected);
				}

				// trigger change if value changed
				if( oldIndex !== newIndex ){
					select.trigger( "change" );
				}

				//hide custom select for single selects only
				if( !isMultiple ){
					self.close();
				}

				event.preventDefault();
			})
			//keyboard events for menu items
			.keydown(function( e ) {
				var target = $( e.target ),
					li = target.closest( "li" );
	
				// switch logic based on which key was pressed
				switch ( e.keyCode ) {
					// up or left arrow keys
					case 38:
						var prev = li.prev();
	
						// if there's a previous option, focus it
						if ( prev.length ) {
							target
								.blur()
								.attr( "tabindex", "-1" );
	
							prev.find( "a" ).first().focus();
						}	
	
						return false;
					break;
	
					// down or right arrow keys
					case 40:
						var next = li.next();
					
						// if there's a next option, focus it
						if ( next.length ) {
							target
								.blur()
								.attr( "tabindex", "-1" );
							
							next.find( "a" ).first().focus();
						}	
	
						return false;
					break;
	
					// if enter or space is pressed, trigger click
					case 13:
					case 32:
						 target.trigger( "vclick" );
	
						 return false;
					break;	
				}
			});	

			//events on "screen" overlay
			screen.bind("vclick", function( event ){
				self.close();
			});
			
			//close button on small overlays
			self.headerClose.click(function(){
				if( self.menuType == "overlay" ){
					self.close();
					return false;
				}
			})
		}
	},

	_buildList: function(){
		var self = this,
			o = this.options,
			placeholder = this.placeholder,
			optgroups = [],
			lis = [],
			dataIcon = self.isMultiple ? "checkbox-off" : "false";

		self.list.empty().filter('.ui-listview').listview('destroy');

		//populate menu with options from select element
		self.select.find( "option" ).each(function( i ){
			var $this = $(this),
				$parent = $this.parent(),
				text = $this.text(),
				anchor = "<a href='#'>"+ text +"</a>",
				classes = [],
				extraAttrs = [];

			// are we inside an optgroup?
			if( $parent.is("optgroup") ){
				var optLabel = $parent.attr("label");

				// has this optgroup already been built yet?
				if( $.inArray(optLabel, optgroups) === -1 ){
					lis.push( "<li data-" + $.mobile.ns + "role='list-divider'>"+ optLabel +"</li>" );
					optgroups.push( optLabel );
				}
			}

			//find placeholder text
			if( !this.getAttribute('value') || text.length == 0 || $this.jqmData('placeholder') ){
				if( o.hidePlaceholderMenuItems ){
					classes.push( "ui-selectmenu-placeholder" );
				}
				placeholder = self.placeholder = text;
			}

			// support disabled option tags
			if( this.disabled ){
				classes.push( "ui-disabled" );
				extraAttrs.push( "aria-disabled='true'" );
			}

			lis.push( "<li data-" + $.mobile.ns + "icon='"+ dataIcon +"' class='"+ classes.join(" ") + "' " + extraAttrs.join(" ") +">"+ anchor +"</li>" )
		});

		self.list.html( lis.join(" ") );
		
		self.list.find( "li" )
			.attr({ "role": "option", "tabindex": "-1" })
			.first().attr( "tabindex", "0" );

		// hide header close link for single selects
		if( !this.isMultiple ){
			this.headerClose.hide();
		}

		// hide header if it's not a multiselect and there's no placeholder
		if( !this.isMultiple && !placeholder.length ){
			this.header.hide();
		} else {
			this.headerTitle.text( this.placeholder );
		}

		//now populated, create listview
		self.list.listview();
	},

	refresh: function( forceRebuild ){
		var self = this,
			select = this.element,
			isMultiple = this.isMultiple,
			options = this.optionElems = select.find("option"),
			selected = options.filter(":selected"),

			// return an array of all selected index's
			indicies = selected.map(function(){
				return options.index( this );
			}).get();

		if( !self.options.nativeMenu && ( forceRebuild || select[0].options.length != self.list.find('li').length )){
			self._buildList();
		}

		self.button
			.find( ".ui-btn-text" )
			.text(function(){
				if( !isMultiple ){
					return selected.text();
				}

				return selected.length ?
					selected.map(function(){ return $(this).text(); }).get().join(', ') :
					self.placeholder;
			});

		// multiple count inside button
		if( isMultiple ){
			self.buttonCount[ selected.length > 1 ? 'show' : 'hide' ]().text( selected.length );
		}

		if( !self.options.nativeMenu ){
			self.list
				.find( 'li:not(.ui-li-divider)' )
				.removeClass( $.mobile.activeBtnClass )
				.attr( 'aria-selected', false )
				.each(function( i ){
					if( $.inArray(i, indicies) > -1 ){
						var item = $(this).addClass( $.mobile.activeBtnClass );

						// aria selected attr
						item.find( 'a' ).attr( 'aria-selected', true );

						// multiple selects: add the "on" checkbox state to the icon
						if( isMultiple ){
							item.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
						}
					}
				});
		}
	},

	open: function(){
		if( this.options.disabled || this.options.nativeMenu ){ return; }

		var self = this,
			menuHeight = self.list.parent().outerHeight(),
			menuWidth = self.list.parent().outerWidth(),
			scrollTop = $(window).scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = window.innerHeight,
			screenWidth = window.innerWidth;

		//add active class to button
		self.button.addClass( $.mobile.activeBtnClass );

		//remove after delay
		setTimeout(function(){
			self.button.removeClass( $.mobile.activeBtnClass );
		}, 300);

		function focusMenuItem(){
			self.list.find( ".ui-btn-active" ).focus();
		}

		if( menuHeight > screenHeight - 80 || !$.support.scrollTop ){

			//for webos (set lastscroll using button offset)
			if( scrollTop == 0 && btnOffset > screenHeight ){
				self.thisPage.one('pagehide',function(){
					$(this).jqmData('lastScroll', btnOffset);
				});
			}

			self.menuPage.one('pageshow', function() {
				// silentScroll() is called whenever a page is shown to restore
				// any previous scroll position the page may have had. We need to
				// wait for the "silentscroll" event before setting focus to avoid
				// the browser's "feature" which offsets rendering to make sure
				// whatever has focus is in view.
				$(window).one("silentscroll", function(){ focusMenuItem(); });
			});

			self.menuType = "page";
			self.menuPageContent.append( self.list );
			$.mobile.changePage(self.menuPage, 'pop', false, true);
		}
		else {
			self.menuType = "overlay";

			self.screen
				.height( $(document).height() )
				.removeClass('ui-screen-hidden');

			//try and center the overlay over the button
			var roomtop = btnOffset - scrollTop,
				roombot = scrollTop + screenHeight - btnOffset,
				halfheight = menuHeight / 2,
				maxwidth = parseFloat(self.list.parent().css('max-width')),
				newtop, newleft;

			if( roomtop > menuHeight / 2 && roombot > menuHeight / 2 ){
				newtop = btnOffset + ( self.button.outerHeight() / 2 ) - halfheight;
			}
			else{
				//30px tolerance off the edges
				newtop = roomtop > roombot ? scrollTop + screenHeight - menuHeight - 30 : scrollTop + 30;
			}

			// if the menuwidth is smaller than the screen center is
			if (menuWidth < maxwidth) {
				newleft = (screenWidth - menuWidth) / 2;
			} else { //otherwise insure a >= 30px offset from the left
				newleft = self.button.offset().left + self.button.outerWidth() / 2 - menuWidth / 2;
				// 30px tolerance off the edges
				if (newleft < 30) {
					newleft = 30;
				} else if ((newleft + menuWidth) > screenWidth) {
					newleft = screenWidth - menuWidth - 30;
				}
			}

			self.listbox
				.append( self.list )
				.removeClass( "ui-selectmenu-hidden" )
				.css({
					top: newtop,
					left: newleft
				})
				.addClass("in");

			focusMenuItem();
		}

		// wait before the dialog can be closed
		setTimeout(function(){
		 	self.isOpen = true;
		}, 400);
	},

	close: function(){
		if( this.options.disabled || !this.isOpen || this.options.nativeMenu ){ return; }
		var self = this;

		function focusButton(){
			setTimeout(function(){
				self.button.focus();
			}, 40);

			self.listbox.removeAttr('style').append( self.list );
		}

		if(self.menuType == "page"){
			$.mobile.changePage([self.menuPage,self.thisPage], 'pop', true, false);
			self.menuPage.one("pagehide", focusButton);
		}
		else{
			self.screen.addClass( "ui-screen-hidden" );
			self.listbox.addClass( "ui-selectmenu-hidden" ).removeAttr( "style" ).removeClass("in");
			focusButton();
		}

		// allow the dialog to be closed again
		this.isOpen = false;
	},

	disable: function(){
		this.element.attr("disabled",true);
		this.button.addClass('ui-disabled').attr("aria-disabled", true);
		return this._setOption( "disabled", true );
	},

	enable: function(){
		this.element.attr("disabled",false);
		this.button.removeClass('ui-disabled').attr("aria-disabled", false);
		return this._setOption( "disabled", false );
	}
});
})( jQuery );

/*
* jQuery Mobile Framework : plugin for making button-like links
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.fn.buttonMarkup = function( options ){
	return this.each( function() {
		var el = $( this ),
		    o = $.extend( {}, $.fn.buttonMarkup.defaults, el.jqmData(), options),

			// Classes Defined
			buttonClass,
			innerClass = "ui-btn-inner",
			iconClass;

		if ( attachEvents ) {
			attachEvents();
		}

		// if not, try to find closest theme container
		if ( !o.theme ) {
			var themedParent = el.closest("[class*='ui-bar-'],[class*='ui-body-']");
			o.theme = themedParent.length ?
				/ui-(bar|body)-([a-z])/.exec( themedParent.attr("class") )[2] :
				"c";
		}

		buttonClass = "ui-btn ui-btn-up-" + o.theme;

		if ( o.inline ) {
			buttonClass += " ui-btn-inline";
		}

		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.shadow ) {
				iconClass += " ui-icon-shadow";
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos == "notext" && !el.attr("title") ) {
				el.attr( "title", el.text() );
			}
		}

		if ( o.corners ) {
			buttonClass += " ui-btn-corner-all";
			innerClass += " ui-btn-corner-all";
		}

		if ( o.shadow ) {
			buttonClass += " ui-shadow";
		}

		el
			.attr( "data-" + $.mobile.ns + "theme", o.theme )
			.addClass( buttonClass );

		var wrap = ("<D class='" + innerClass + "'><D class='ui-btn-text'></D>" +
			( o.icon ? "<span class='" + iconClass + "'></span>" : "" ) +
			"</D>").replace(/D/g, o.wrapperEls);

		el.wrapInner( wrap );
	});
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	wrapperEls: "span"
};

var attachEvents = function() {
	$(".ui-btn:not(.ui-disabled)").live({
		"vmousedown": function() {
			var theme = $(this).attr( "data-" + $.mobile.ns + "theme" );
			$(this).removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
		},
		"vmousecancel vmouseup": function() {
			var theme = $(this).attr( "data-" + $.mobile.ns + "theme" );
			$(this).removeClass( "ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
		},
		"vmouseover focus": function() {
			var theme = $(this).attr( "data-" + $.mobile.ns + "theme" );
			$(this).removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
		},
		"vmouseout blur": function() {
			var theme = $(this).attr( "data-" + $.mobile.ns + "theme" );
			$(this).removeClass( "ui-btn-hover-" + theme ).addClass( "ui-btn-up-" + theme );
		}
	});

	attachEvents = null;
};

})(jQuery);
/*
* jQuery Mobile Framework : "button" plugin - links that proxy to native input/buttons
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/ 
(function($, undefined ) {
$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null, 
		icon: null,
		iconpos: null,
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true
	},
	_create: function(){
		var $el = this.element,
			o = this.options;
		
		//add ARIA role
		this.button = $( "<div></div>" )
			.text( $el.text() || $el.val() )
			.buttonMarkup({
				theme: o.theme, 
				icon: o.icon,
				iconpos: o.iconpos,
				inline: o.inline,
				corners: o.corners,
				shadow: o.shadow,
				iconshadow: o.iconshadow
			})
			.insertBefore( $el )
			.append( $el.addClass('ui-btn-hidden') );
		
		//add hidden input during submit
		var type = $el.attr('type');
		if( type !== 'button' && type !== 'reset' ){
			$el.bind("vclick", function(){
				var $buttonPlaceholder = $("<input>", 
						{type: "hidden", name: $el.attr("name"), value: $el.attr("value")})
						.insertBefore($el);
						
				//bind to doc to remove after submit handling	
				$(document).submit(function(){
					 $buttonPlaceholder.remove();
				});
			});
		}
		this.refresh();
			
	},

	enable: function(){
		this.element.attr("disabled", false);
		this.button.removeClass("ui-disabled").attr("aria-disabled", false);
		return this._setOption("disabled", false);
	},

	disable: function(){
		this.element.attr("disabled", true);
		this.button.addClass("ui-disabled").attr("aria-disabled", true);
		return this._setOption("disabled", true);
	},

	refresh: function(){
		if( this.element.attr('disabled') ){
			this.disable();
		}
		else{
			this.enable();
		}
	}
});
})( jQuery );/*
* jQuery Mobile Framework : "slider" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.widget( "mobile.slider", $.mobile.widget, {
	options: {
		theme: null,
		trackTheme: null,
		disabled: false
	},
	_create: function(){
		var self = this,

			control = this.element,

			parentTheme = control.parents('[class*=ui-bar-],[class*=ui-body-]').eq(0),

			parentTheme = parentTheme.length ? parentTheme.attr('class').match(/ui-(bar|body)-([a-z])/)[2] : 'c',

			theme = this.options.theme ? this.options.theme : parentTheme,

			trackTheme = this.options.trackTheme ? this.options.trackTheme : parentTheme,

			cType = control[0].nodeName.toLowerCase(),
			selectClass = (cType == 'select') ? 'ui-slider-switch' : '',
			controlID = control.attr('id'),
			labelID = controlID + '-label',
			label = $('[for='+ controlID +']').attr('id',labelID),
			val = function(){
				return (cType == 'input') ? parseFloat(control.val()) : control[0].selectedIndex;
			},
			min = (cType == 'input') ? parseFloat(control.attr('min')) : 0,
			max = (cType == 'input') ? parseFloat(control.attr('max')) : control.find('option').length-1,
			step = window.parseFloat(control.attr('step') || 1),
			slider = $('<div class="ui-slider '+ selectClass +' ui-btn-down-'+ trackTheme+' ui-btn-corner-all" role="application"></div>'),
			handle = $('<a href="#" class="ui-slider-handle"></a>')
				.appendTo(slider)
				.buttonMarkup({corners: true, theme: theme, shadow: true})
				.attr({
					'role': 'slider',
					'aria-valuemin': min,
					'aria-valuemax': max,
					'aria-valuenow': val(),
					'aria-valuetext': val(),
					'title': val(),
					'aria-labelledby': labelID
				});

		$.extend(this, {
			slider: slider,
			handle: handle,
			dragging: false,
			beforeStart: null
		});

		if(cType == 'select'){
			slider.wrapInner('<div class="ui-slider-inneroffset"></div>');
			var options = control.find('option');

			control.find('option').each(function(i){
				var side = (i==0) ?'b':'a',
					corners = (i==0) ? 'right' :'left',
					theme = (i==0) ? ' ui-btn-down-' + trackTheme :' ui-btn-active';
				$('<div class="ui-slider-labelbg ui-slider-labelbg-'+ side + theme +' ui-btn-corner-'+ corners+'"></div>').prependTo(slider);
				$('<span class="ui-slider-label ui-slider-label-'+ side + theme +' ui-btn-corner-'+ corners+'" role="img">'+$(this).text()+'</span>').prependTo(handle);
			});

		}

		label.addClass('ui-slider');

		// monitor the input for updated values
		control
			.addClass((cType == 'input') ? 'ui-slider-input' : 'ui-slider-switch')
			.change(function(){
				self.refresh( val(), true );
			})
			.keyup(function(){ // necessary?
				self.refresh( val(), true, true );
			})
			.blur(function(){
				self.refresh( val(), true );
			});

		// prevent screen drag when slider activated
		$(document).bind( "vmousemove", function(event){
			if ( self.dragging ) {
				self.refresh( event );
				return false;
			}
		});

		slider
			.bind( "vmousedown", function(event){
				self.dragging = true;
				if ( cType === "select" ) {
					self.beforeStart = control[0].selectedIndex;
				}
				self.refresh( event );
				return false;
			});

		slider
			.add(document)
			.bind( "vmouseup", function(){
				if ( self.dragging ) {
					self.dragging = false;
					if ( cType === "select" ) {
						if ( self.beforeStart === control[0].selectedIndex ) {
							//tap occurred, but value didn't change. flip it!
							self.refresh( self.beforeStart === 0 ? 1 : 0 );
						}
						var curval = val();
						var snapped = Math.round( curval / (max - min) * 100 );
						handle
							.addClass("ui-slider-handle-snapping")
							.css("left", snapped + "%")
							.animationComplete(function(){
								handle.removeClass("ui-slider-handle-snapping");
							});
					}
					return false;
				}
			});

		slider.insertAfter(control);

		// NOTE force focus on handle
		this.handle
			.bind( "vmousedown", function(){
				$(this).focus();
			})
			.bind( "vclick", false );

		this.handle
			.bind( "keydown", function( event ) {
				var index = val();

				if ( self.options.disabled ) {
					return;
				}

				// In all cases prevent the default and mark the handle as active
				switch ( event.keyCode ) {
				 case $.mobile.keyCode.HOME:
				 case $.mobile.keyCode.END:
				 case $.mobile.keyCode.PAGE_UP:
				 case $.mobile.keyCode.PAGE_DOWN:
				 case $.mobile.keyCode.UP:
				 case $.mobile.keyCode.RIGHT:
				 case $.mobile.keyCode.DOWN:
				 case $.mobile.keyCode.LEFT:
					event.preventDefault();

					if ( !self._keySliding ) {
						self._keySliding = true;
						$( this ).addClass( "ui-state-active" );
					}
					break;
				}

				// move the slider according to the keypress
				switch ( event.keyCode ) {
				 case $.mobile.keyCode.HOME:
					self.refresh(min);
					break;
				 case $.mobile.keyCode.END:
					self.refresh(max);
					break;
				 case $.mobile.keyCode.PAGE_UP:
				 case $.mobile.keyCode.UP:
				 case $.mobile.keyCode.RIGHT:
					self.refresh(index + step);
					break;
				 case $.mobile.keyCode.PAGE_DOWN:
				 case $.mobile.keyCode.DOWN:
				 case $.mobile.keyCode.LEFT:
					self.refresh(index - step);
					break;
				}
			}) // remove active mark
			.keyup(function( event ) {
				if ( self._keySliding ) {
					self._keySliding = false;
					$( this ).removeClass( "ui-state-active" );
				}
			});

		this.refresh();
	},

	refresh: function(val, isfromControl, preventInputUpdate){
		if ( this.options.disabled ) { return; }

		var control = this.element, percent,
			cType = control[0].nodeName.toLowerCase(),
			min = (cType === "input") ? parseFloat(control.attr("min")) : 0,
			max = (cType === "input") ? parseFloat(control.attr("max")) : control.find("option").length - 1;

		if ( typeof val === "object" ) {
			var data = val,
				// a slight tolerance helped get to the ends of the slider
				tol = 8;
			if ( !this.dragging
					|| data.pageX < this.slider.offset().left - tol
					|| data.pageX > this.slider.offset().left + this.slider.width() + tol ) {
				return;
			}
			percent = Math.round( ((data.pageX - this.slider.offset().left) / this.slider.width() ) * 100 );
		} else {
			if ( val == null ) {
				val = (cType === "input") ? parseFloat(control.val()) : control[0].selectedIndex;
			}
			percent = (parseFloat(val) - min) / (max - min) * 100;
		}

		if ( isNaN(percent) ) { return; }
		if ( percent < 0 ) { percent = 0; }
		if ( percent > 100 ) { percent = 100; }

		var newval = Math.round( (percent / 100) * (max - min) ) + min;
		if ( newval < min ) { newval = min; }
		if ( newval > max ) { newval = max; }

		//flip the stack of the bg colors
		if ( percent > 60 && cType === "select" ) {

		}
		this.handle.css("left", percent + "%");
		this.handle.attr({
				"aria-valuenow": (cType === "input") ? newval : control.find("option").eq(newval).attr("value"),
				"aria-valuetext": (cType === "input") ? newval : control.find("option").eq(newval).text(),
				title: newval
			});

		// add/remove classes for flip toggle switch
		if ( cType === "select" ) {
			if ( newval === 0 ) {
				this.slider.addClass("ui-slider-switch-a")
					.removeClass("ui-slider-switch-b");
			} else {
				this.slider.addClass("ui-slider-switch-b")
					.removeClass("ui-slider-switch-a");
			}
		}

		if(!preventInputUpdate){
			// update control's value
			if ( cType === "input" ) {
				control.val(newval);
			} else {
				control[ 0 ].selectedIndex = newval;
			}
			if (!isfromControl) { control.trigger("change"); }
		}
	},

	enable: function(){
		this.element.attr("disabled", false);
		this.slider.removeClass("ui-disabled").attr("aria-disabled", false);
		return this._setOption("disabled", false);
	},

	disable: function(){
		this.element.attr("disabled", true);
		this.slider.addClass("ui-disabled").attr("aria-disabled", true);
		return this._setOption("disabled", true);
	}

});
})( jQuery );

/*
* jQuery Mobile Framework : "collapsible" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/ 
(function($, undefined ) {
$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: ' click to expand contents',
		collapseCueText: ' click to collapse contents',
		collapsed: false,
		heading: '>:header,>legend',
		theme: null,
		iconTheme: 'd'
	},
	_create: function(){

		var $el = this.element,
			o = this.options,
			collapsibleContain = $el.addClass('ui-collapsible-contain'),
			collapsibleHeading = $el.find(o.heading).eq(0),
			collapsibleContent = collapsibleContain.wrapInner('<div class="ui-collapsible-content"></div>').find('.ui-collapsible-content'),
			collapsibleParent = $el.closest( ":jqmData(role='collapsible-set')" ).addClass('ui-collapsible-set');				
		
		//replace collapsibleHeading if it's a legend	
		if(collapsibleHeading.is('legend')){
			collapsibleHeading = $('<div role="heading">'+ collapsibleHeading.html() +'</div>').insertBefore(collapsibleHeading);
			collapsibleHeading.next().remove();
		}	
		
		//drop heading in before content
		collapsibleHeading.insertBefore(collapsibleContent);
		
		//modify markup & attributes
		collapsibleHeading.addClass('ui-collapsible-heading')
			.append('<span class="ui-collapsible-heading-status"></span>')
			.wrapInner('<a href="#" class="ui-collapsible-heading-toggle"></a>')
			.find('a:eq(0)')
			.buttonMarkup({
				shadow: !!!collapsibleParent.length,
				corners:false,
				iconPos: 'left',
				icon: 'plus',
				theme: o.theme
			})
			.find('.ui-icon')
			.removeAttr('class')
			.buttonMarkup({
				shadow: true,
				corners:true,
				iconPos: 'notext',
				icon: 'plus',
				theme: o.iconTheme
			});
			
			if( !collapsibleParent.length ){
				collapsibleHeading
					.find('a:eq(0)')	
					.addClass('ui-corner-all')
						.find('.ui-btn-inner')
						.addClass('ui-corner-all');
			}
			else {
				if( collapsibleContain.jqmData('collapsible-last') ){
					collapsibleHeading
						.find('a:eq(0), .ui-btn-inner')	
							.addClass('ui-corner-bottom');
				}					
			}
			
		
		//events
		collapsibleContain	
			.bind('collapse', function(event){
				if( !event.isDefaultPrevented() ){
					event.preventDefault();
					collapsibleHeading
						.addClass('ui-collapsible-heading-collapsed')
						.find('.ui-collapsible-heading-status').text(o.expandCueText);
					
					collapsibleHeading.find('.ui-icon').removeClass('ui-icon-minus').addClass('ui-icon-plus');	
					collapsibleContent.addClass('ui-collapsible-content-collapsed').attr('aria-hidden',true);
					
					if( collapsibleContain.jqmData('collapsible-last') ){
						collapsibleHeading
							.find('a:eq(0), .ui-btn-inner')
							.addClass('ui-corner-bottom');
					}
				}						
				
			})
			.bind('expand', function(event){
				if( !event.isDefaultPrevented() ){
					event.preventDefault();
					collapsibleHeading
						.removeClass('ui-collapsible-heading-collapsed')
						.find('.ui-collapsible-heading-status').text(o.collapseCueText);
					
					collapsibleHeading.find('.ui-icon').removeClass('ui-icon-plus').addClass('ui-icon-minus');	
					collapsibleContent.removeClass('ui-collapsible-content-collapsed').attr('aria-hidden',false);
					
					if( collapsibleContain.jqmData('collapsible-last') ){
						collapsibleHeading
							.find('a:eq(0), .ui-btn-inner')
							.removeClass('ui-corner-bottom');
					}
					
				}
			})
			.trigger(o.collapsed ? 'collapse' : 'expand');
			
		
		//close others in a set
		if( collapsibleParent.length && !collapsibleParent.jqmData("collapsiblebound") ){
			collapsibleParent
				.jqmData("collapsiblebound", true)
				.bind("expand", function( event ){
					$(this).find( ".ui-collapsible-contain" )
						.not( $(event.target).closest( ".ui-collapsible-contain" ) )
						.not( "> .ui-collapsible-contain .ui-collapsible-contain" )
						.trigger( "collapse" );
				});
			var set = collapsibleParent.find( ":jqmData(role=collapsible)" )
					
			set.first()
				.find('a:eq(0)')	
				.addClass('ui-corner-top')
					.find('.ui-btn-inner')
					.addClass('ui-corner-top');
					
			set.last().jqmData('collapsible-last', true)	
		}
					
		collapsibleHeading
			.bind("vmouseup", function(e){ 
				if( collapsibleHeading.is('.ui-collapsible-heading-collapsed') ){
					collapsibleContain.trigger('expand'); 
				}	
				else {
					collapsibleContain.trigger('collapse'); 
				}
				e.preventDefault();
			})
			.bind("vclick",false );
	}
});
})( jQuery );/*
* jQuery Mobile Framework: "controlgroup" plugin - corner-rounding for groups of buttons, checks, radios, etc
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.fn.controlgroup = function(options){
		
	return this.each(function(){
		var o = $.extend({
			direction: $( this ).jqmData( "type" ) || "vertical",
			shadow: false
		},options);
		var groupheading = $(this).find('>legend'),
			flCorners = o.direction == 'horizontal' ? ['ui-corner-left', 'ui-corner-right'] : ['ui-corner-top', 'ui-corner-bottom'],
			type = $(this).find('input:eq(0)').attr('type');
		
		//replace legend with more stylable replacement div	
		if( groupheading.length ){
			$(this).wrapInner('<div class="ui-controlgroup-controls"></div>');	
			$('<div role="heading" class="ui-controlgroup-label">'+ groupheading.html() +'</div>').insertBefore( $(this).children(0) );	
			groupheading.remove();	
		}

		$(this).addClass('ui-corner-all ui-controlgroup ui-controlgroup-'+o.direction);
		
		function flipClasses(els){
			els
				.removeClass('ui-btn-corner-all ui-shadow')
				.eq(0).addClass(flCorners[0])
				.end()
				.filter(':last').addClass(flCorners[1]).addClass('ui-controlgroup-last');
		}
		flipClasses($(this).find('.ui-btn'));
		flipClasses($(this).find('.ui-btn-inner'));
		if(o.shadow){
			$(this).addClass('ui-shadow');
		}
	});	
};
})(jQuery);/*
* jQuery Mobile Framework : "fieldcontain" plugin - simple class additions to make form row separators
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.fn.fieldcontain = function(options){
	return this.addClass('ui-field-contain ui-body ui-br');
};
})(jQuery);/*
* jQuery Mobile Framework : "listview" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.widget( "mobile.listview", $.mobile.widget, {
	options: {
		theme: "c",
		countTheme: "c",
		headerTheme: "b",
		dividerTheme: "b",
		splitIcon: "arrow-r",
		splitTheme: "b",
		inset: false
	},
	
	_create: function() {
		var $list = this.element,
			o = this.options;

		// create listview markup 
		$list
			.addClass( "ui-listview" );
		
		if ( o.inset ) {
			$list.addClass( "ui-listview-inset ui-corner-all ui-shadow" );
		}

		this._itemApply( $list, $list );
		
		this.refresh( true );

	},

	_itemApply: function( $list, item ) {
		// TODO class has to be defined in markup
		item.find( ".ui-li-count" )
			.addClass( "ui-btn-up-" + ($list.jqmData( "counttheme" ) || this.options.countTheme) + " ui-btn-corner-all" );

		item.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" );

		item.find( "p, dl" ).addClass( "ui-li-desc" );

		$list.find( "li" ).find( ">img:eq(0), >:first>img:eq(0)" ).addClass( "ui-li-thumb" ).each(function() {
			$( this ).closest( "li" ).addClass( $(this).is( ".ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
		});

		var aside = item.find( ".ui-li-aside" );

		if ( aside.length ) {
            aside.each(function(i, el) {
			    $(el).prependTo( $(el).parent() ); //shift aside to front for css float
            });
		}

		if ( $.support.cssPseudoElement || !$.nodeName( item[0], "ol" ) ) {
			return;
		}
	},
	
	_removeCorners: function(li){
		li
			.add( li.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb") )
			.removeClass( "ui-corner-top ui-corner-bottom ui-corner-br ui-corner-bl ui-corner-tr ui-corner-tl" );
	},
	
	refresh: function( create ) {
		this._createSubPages();
		
		var o = this.options,
			$list = this.element,
			self = this,
			dividertheme = $list.jqmData( "dividertheme" ) || o.dividerTheme,
			li = $list.children( "li" ),
			counter = $.support.cssPseudoElement || !$.nodeName( $list[0], "ol" ) ? 0 : 1;

		if ( counter ) {
			$list.find( ".ui-li-dec" ).remove();
		}

		li.each(function( pos ) {
			var item = $( this ),
				itemClass = "ui-li";

			// If we're creating the element, we update it regardless
			if ( !create && item.hasClass( "ui-li" ) ) {
				return;
			}

			var itemTheme = item.jqmData("theme") || o.theme;

			var a = item.find( ">a" );
				
			if ( a.length ) {	
				var icon = item.jqmData("icon");
				
				item
					.buttonMarkup({
						wrapperEls: "div",
						shadow: false,
						corners: false,
						iconpos: "right",
						icon: a.length > 1 || icon === false ? false : icon || "arrow-r",
						theme: itemTheme
					});

				a.first().addClass( "ui-link-inherit" );

				if ( a.length > 1 ) {
					itemClass += " ui-li-has-alt";

					var last = a.last(),
						splittheme = $list.jqmData( "splittheme" ) || last.jqmData( "theme" ) || o.splitTheme;
					
					last
						.appendTo(item)
						.attr( "title", last.text() )
						.addClass( "ui-li-link-alt" )
						.empty()
						.buttonMarkup({
							shadow: false,
							corners: false,
							theme: itemTheme,
							icon: false,
							iconpos: false
						})
						.find( ".ui-btn-inner" )
							.append( $( "<span>" ).buttonMarkup({
								shadow: true,
								corners: true,
								theme: splittheme,
								iconpos: "notext",
								icon: $list.jqmData( "spliticon" ) || last.jqmData( "icon" ) ||  o.splitIcon
							} ) );
				}

			} else if ( item.jqmData( "role" ) === "list-divider" ) {
				itemClass += " ui-li-divider ui-btn ui-bar-" + dividertheme;
				item.attr( "role", "heading" );

				//reset counter when a divider heading is encountered
				if ( counter ) {
					counter = 1;
				}

			} else {
				itemClass += " ui-li-static ui-body-" + itemTheme;
			}
			
			
			if( o.inset ){	
				if ( pos === 0 ) {
						itemClass += " ui-corner-top";
	
						item
							.add( item.find( ".ui-btn-inner" ) )
							.find( ".ui-li-link-alt" )
								.addClass( "ui-corner-tr" )
							.end()
							.find( ".ui-li-thumb" )
								.addClass( "ui-corner-tl" );
						if(item.next().next().length){
							self._removeCorners( item.next() );		
						}
	
				}
				if ( pos === li.length - 1 ) {
						itemClass += " ui-corner-bottom";
	
						item
							.add( item.find( ".ui-btn-inner" ) )
							.find( ".ui-li-link-alt" )
								.addClass( "ui-corner-br" )
							.end()
							.find( ".ui-li-thumb" )
								.addClass( "ui-corner-bl" );
						
						if(item.prev().prev().length){
							self._removeCorners( item.prev() );		
						}	
				}
			}


			if ( counter && itemClass.indexOf( "ui-li-divider" ) < 0 ) {
			
				var countParent = item.is(".ui-li-static:first") ? item : item.find( ".ui-link-inherit" );
				
				countParent
					.addClass( "ui-li-jsnumbering" )
					.prepend( "<span class='ui-li-dec'>" + (counter++) + ". </span>" );
			}

			item.add( item.find( ".ui-btn-inner" ) ).addClass( itemClass );

			if ( !create ) {
				self._itemApply( $list, item );
			}
		});
	},
	
	//create a string for ID/subpage url creation
	_idStringEscape: function( str ){
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	},
	
	_createSubPages: function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentId = parentPage.jqmData( "url" ),
			o = this.options,
			self = this,
			persistentFooterID = parentPage.find( ":jqmData(role='footer')" ).jqmData( "id" );

		$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function( i ) {
			var list = $( this ),
				parent = list.parent(),
				nodeEls = $( list.prevAll().toArray().reverse() ),
				nodeEls = nodeEls.length ? nodeEls : $( "<span>" + $.trim(parent.contents()[ 0 ].nodeValue) + "</span>" ),
				title = nodeEls.first().text(),//url limits to first 30 chars of text
				id = parentId + "&" + $.mobile.subPageUrlKey + "=" + self._idStringEscape(title + " " + i),
				theme = list.jqmData( "theme" ) || o.theme,
				countTheme = list.jqmData( "counttheme" ) || parentList.jqmData( "counttheme" ) || o.countTheme,
				newPage = list.wrap( "<div data-" + $.mobile.ns + "role='page'><div data-" + $.mobile.ns + "role='content'></div></div>" )
							.parent()
								.before( "<div data-" + $.mobile.ns + "role='header' data-" + $.mobile.ns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
								.after( persistentFooterID ? $( "<div data-" + $.mobile.ns + "role='footer'  data-" + $.mobile.ns + "id='"+ persistentFooterID +"'>") : "" )
								.parent()
									.attr( "data-" + $.mobile.ns + "url", id )
									.attr( "data-" + $.mobile.ns + "theme", theme )
									.attr( "data-" + $.mobile.ns + "count-theme", countTheme )
									.appendTo( $.mobile.pageContainer );

				newPage.page();		
			var anchor = parent.find('a:first');
			if (!anchor.length) {
				anchor = $("<a></a>").html( nodeEls || title ).prependTo(parent.empty());
			}
			anchor.attr('href','#' + id);
		}).listview();
	}
});

})( jQuery );
/*
* jQuery Mobile Framework : "listview" filter extension
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.mobile.listview.prototype.options.filter = false;
$.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";

$( ":jqmData(role='listview')" ).live( "listviewcreate", function() {
	var list = $( this ),
		listview = list.data( "listview" );

	if ( !listview.options.filter ) {
		return;
	}

	var wrapper = $( "<form>", { "class": "ui-listview-filter ui-bar-c", "role": "search" } ),

		search = $( "<input>", {
				placeholder: listview.options.filterPlaceholder
			})
			.attr( "data-" + $.mobile.ns + "type", "search" )
			.bind( "keyup change", function() {
				var val = this.value.toLowerCase(),
						listItems = list.children();
				listItems.show();
				if ( val ) {
					// This handles hiding regular rows without the text we search for
					// and any list dividers without regular rows shown under it
					var childItems = false,
							item;

					for (var i = listItems.length; i >= 0; i--) {
						item = $(listItems[i]);
						if (item.is("li:jqmData(role=list-divider)")) {
							if (!childItems) {
								item.hide();
							}
							// New bucket!
							childItems = false;
						} else if (item.text().toLowerCase().indexOf( val ) === -1) {
							item.hide();
						} else {
							// There's a shown item in the bucket
							childItems = true;
						}
					}
				}
			})
			.appendTo( wrapper )
			.textinput();

	if ($( this ).jqmData( "inset" ) ) {
		wrapper.addClass( "ui-listview-filter-inset" );
	}

	wrapper.insertBefore( list );
});

})( jQuery );
/*
* jQuery Mobile Framework : "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
(function($, undefined ) {
$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText: "Close"
	},
	_create: function(){
		var self = this,
			$el = self.element;
		
		/* class the markup for dialog styling */	
		this.element			
			//add ARIA role
			.attr("role","dialog")
			.addClass('ui-page ui-dialog ui-body-a')
			.find( ":jqmData(role=header)" )
			.addClass('ui-corner-top ui-overlay-shadow')
				.prepend( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "rel='back' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText +"</a>" )
			.end()
			.find('.ui-content:not([class*="ui-body-"])')
				.addClass('ui-body-c')
			.end()
			.find( ".ui-content,:jqmData(role='footer')" )
				.last()
				.addClass('ui-corner-bottom ui-overlay-shadow');
		
		/* bind events 
			- clicks and submits should use the closing transition that the dialog opened with
			  unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		this.element		
			.bind( "vclick submit", function(e){
				var $targetel;
				if( e.type == "vclick" ){
					$targetel = $(e.target).closest("a");
				}
				else{
					$targetel = $(e.target).closest("form");
				}
				
				if( $targetel.length && !$targetel.jqmData("transition") ){
					$targetel
						.attr("data-" + $.mobile.ns + "transition", $.mobile.urlHistory.getActive().transition )
						.attr("data-" + $.mobile.ns + "direction", "reverse");
				}
			});

	},
	
	//close method goes back in history
	close: function(){
		window.history.back();
	}
});
})( jQuery );/*
* jQuery Mobile Framework : "navbar" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.widget( "mobile.navbar", $.mobile.widget, {
	options: {
		iconpos: 'top',
		grid: null
	},
	_create: function(){
		var $navbar = this.element,
			$navbtns = $navbar.find("a"),
			iconpos = $navbtns.filter( ":jqmData(icon)").length ? this.options.iconpos : undefined;
		
		$navbar
			.addClass('ui-navbar')
			.attr("role","navigation")
			.find("ul")
				.grid({grid: this.options.grid });		
		
		if( !iconpos ){ 
			$navbar.addClass("ui-navbar-noicons");
		}
		
		$navbtns
			.buttonMarkup({
				corners:	false, 
				shadow:		false, 
				iconpos:	iconpos
			});
		
		$navbar.delegate("a", "vclick",function(event){
			$navbtns.not( ".ui-state-persist" ).removeClass( $.mobile.activeBtnClass );
			$( this ).addClass( $.mobile.activeBtnClass );
		});	
	}
});
})( jQuery );
/*
* jQuery Mobile Framework : plugin for creating CSS grids
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/ 
(function($, undefined ) {
$.fn.grid = function(options){
	return this.each(function(){
		var o = $.extend({
			grid: null
		},options);
	
			
		var $kids = $(this).children(),
			gridCols = {solo:1, a:2, b:3, c:4, d:5},
			grid = o.grid,
			iterator;
			
			if( !grid ){
				if( $kids.length <= 5 ){
					for(var letter in gridCols){
						if(gridCols[letter] == $kids.length){ grid = letter; }
					}
				}
				else{
					grid = 'a';
				}
			}
			iterator = gridCols[grid];
			
		$(this).addClass('ui-grid-' + grid);
	
		$kids.filter(':nth-child(' + iterator + 'n+1)').addClass('ui-block-a');
		if(iterator > 1){	
			$kids.filter(':nth-child(' + iterator + 'n+2)').addClass('ui-block-b');
		}	
		if(iterator > 2){	
			$kids.filter(':nth-child(3n+3)').addClass('ui-block-c');
		}	
		if(iterator > 3){	
			$kids.filter(':nth-child(4n+4)').addClass('ui-block-d');
		}	
		if(iterator > 4){	
			$kids.filter(':nth-child(5n+5)').addClass('ui-block-e');
		}
				
	});	
};
})(jQuery);/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( $, window, undefined ) {
	var	$html = $( "html" ),
			$head = $( "head" ),
			$window = $( window );

 	//trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );

	//support conditions
	//if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	//otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}

	//add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	//define & prepend meta viewport tag, if content is defined
	//NOTE: this is now deprecated. We recommend placing the meta viewport element in
	//the markup from the start.
	$.mobile.metaViewportContent && !$head.find( "meta[name='viewport']" ).length ? $( "<meta>", { name: "viewport", content: $.mobile.metaViewportContent}).prependTo( $head ) : undefined;

	//loading div which appears during Ajax requests
	//will not appear if $.mobile.loadingMessage is false
	var $loader = $.mobile.loadingMessage ?		$( "<div class='ui-loader ui-body-a ui-corner-all'>" + "<span class='ui-icon ui-icon-loading spin'></span>" + "<h1>" + $.mobile.loadingMessage + "</h1>" + "</div>" )	: undefined;

	if(typeof $loader === "undefined"){
		alert($.mobile.loadingMessage);
	}

	$.extend($.mobile, {
		// turn on/off page loading message.
		pageLoading: function ( done ) {
			if ( done ) {
				$html.removeClass( "ui-loading" );
			} else {
				if( $.mobile.loadingMessage ){
					var activeBtn = $( "." + $.mobile.activeBtnClass ).first();


					if(typeof $loader === "undefined"){
						 alert($.mobile.loadingMessage);
					}

					$loader
						.appendTo( $.mobile.pageContainer )
						//position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
						.css( {
							top: $.support.scrollTop && $(window).scrollTop() + $(window).height() / 2 ||
							activeBtn.length && activeBtn.offset().top || 100
						} );
				}

				$html.addClass( "ui-loading" );
			}
		},

		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function(){
			//find present pages
			var $pages = $( ":jqmData(role='page')" );

			//add dialogs, set data-url attrs
			$pages.add( ":jqmData(role='dialog')" ).each(function(){
				var $this = $(this);

				// unless the data url is already set set it to the id
				if( !$this.jqmData('url') ){
					$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) );
				}
			});

			//define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			//define page container
			$.mobile.pageContainer = $pages.first().parent().addClass( "ui-mobile-viewport" );

			//cue page loading message
			$.mobile.pageLoading();

			// if hashchange listening is disabled or there's no hash deeplink, change to the first page in the DOM
			if( !$.mobile.hashListeningEnabled || !$.mobile.path.stripHash( location.hash ) ){
				$.mobile.changePage( $.mobile.firstPage, false, true, false, true );
			}
			// otherwise, trigger a hashchange to load a deeplink
			else {
				$window.trigger( "hashchange", [ true ] );
			}
		}
	});

	//dom-ready inits
	$( $.mobile.initializePage );

	//window load event
	//hide iOS browser chrome on load
	$window.load( $.mobile.silentScroll );
})( jQuery, this );
;
// We don't want to load the mobile logo unless it's used
jQuery( document ).ready( function() {
	var mobileLogo = jQuery( "#mobile-logo" );
	if ( mobileLogo.length ) {
		mobileLogo.attr( "src", mobileLogo.data( "src" ) );
	}
} );
;
function createCookie(name, value, days, domain) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    if (domain) {
        domain = "; domain=" + domain;
    } else {
        domain = "";
    }
    document.cookie = name + "=" + value + expires + domain + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name, domain) {
    createCookie(name, "", -1, domain);
}

function areCookiesEnabled() {
    createCookie("detectCookiesEnabled", "KhanAcademy", 1);
    if (readCookie("detectCookiesEnabled") == null)
        return false;
    eraseCookie("detectCookiesEnabled");
    return true;
}
;
function onYouTubePlayerStateChange(state) {
    VideoStats.playerStateChange(state);
    $(VideoControls).trigger("playerStateChange", state);
}

var VideoControls = {

    player: null,
    autoPlayEnabled: false,
    autoPlayCallback: null,
    continuousPlayButton: null,

    readyDeferred_: new $.Deferred(),

    initJumpLinks: function() {
        $("span.youTube").addClass("playYouTube").removeClass("youTube").click(VideoControls.clickYouTubeJump);
    },

    initContinuousPlayLinks: function(parentEl) {
        this.continuousPlayButton = $("a.continuous-play", parentEl);
        this.continuousPlayButton.click(function() {
            VideoControls.setAutoPlayEnabled(!VideoControls.autoPlayEnabled);
        });
        this.setAutoPlayEnabled(VideoControls.autoPlayEnabled);
    },

    initPlaceholder: function(jelPlaceholder, youtubeParams) {
        var jelWrapper = null;

        // Once the youtube player is all loaded and ready, clicking the play
        // button will play inline.
        $(VideoControls).one("playerready", function() {

            // Before any playing, unveil and play the real youtube player
            $(VideoControls).one("beforeplay", function() {

                // Use .left to unhide the player without causing any
                // re-rendering or "pop"-in of the player.
                jelWrapper.css("left", 0);

                jelPlaceholder.find(".youtube-play").css("visibility", "hidden");

            });

            jelPlaceholder.click(function(e) {

                VideoControls.play();
                e.preventDefault();

            });

        });

        // Start loading the youtube player immediately,
        // and insert it wrapped in a hidden container
        var template = Templates.get("shared.youtube-player");

        jelPlaceholder
            .parent()
                .after(
                    $(template(youtubeParams))
                        .wrap("<div class='player-loading-wrapper'/>")
                        .parent()
            );

        jelWrapper = jelPlaceholder.parent().next();
    },

    clickYouTubeJump: function() {
        var seconds = $(this).attr("seconds");
        if (VideoControls.player && seconds) {
            VideoControls.player.seekTo(Math.max(0, seconds - 2), true);
            VideoControls.scrollToPlayer();
        }
    },

    play: function() {
        $(VideoControls).trigger("beforeplay");

        if (VideoControls.player && VideoControls.player.playVideo) {
            VideoControls.player.playVideo();
        }
    },

    pause: function() {
        if (VideoControls.player && VideoControls.player.pauseVideo)
            VideoControls.player.pauseVideo();
    },

    setAutoPlayEnabled: function(enabled) {
    /*
        this.autoPlayEnabled = enabled;
        this.continuousPlayButton.toggleClass("green", enabled);
        if (enabled) {
            this.continuousPlayButton.html("Continuous play is ON");
        } else {
            this.continuousPlayButton.html("Continuous play is OFF");
        }
        */
    },

    setAutoPlayCallback: function(callback) {
        this.autoPlayCallback = callback;
    },

    scrollToPlayer: function() {
        // If user has scrolled below the youtube video, scroll to top of video
        // when a play link is clicked.
        var yTop = $(VideoControls.player).offset().top - 2;
        if ($(window).scrollTop() > yTop) {
            $(window).scrollTop(yTop);
        }
    },

    onYouTubeBlocked: function(callback) {
        $("<img width=0 height=0>")
            .error(callback)
            .attr("src", "http://www.youtube.com/favicon.ico?" + Math.random())
            .appendTo("#page-container");
    },

    initThumbnails: function() {
        $("#thumbnails")
            .cycle({
                fx: "scrollHorz",
                timeout: 0,
                speed: 550,
                slideResize: 0,
                easing: "easeInOutBack",
                startingSlide: 0,
                prev: "#arrow-left",
                next: "#arrow-right",
                before: function() {
                    $(this).find("div.pending").each(function() {
                        $(this).css("background-image", "url('" + $(this).data("src") + "')");
                    });
                }
            })
            .css({ width: "" }) // We want #thumbnails to be full width even though the cycle plugin doesn't
            .find(".thumbnail_link")
                .click(VideoControls.thumbnailClick).end();

        this.initThumbnailHover($("#thumbnails"));
    },

    initThumbnailHover: function(parentEl) {
        // Queue:false to make sure all of these run at the same time
        var animationOptions = {duration: 150, queue: false};

        parentEl
            .find(".thumbnail_td")
                .hover(
                        function() {
                            $(this)
                                .find(".thumbnail_label").animate({ marginTop: -78 }, animationOptions).end()
                                .find(".thumbnail_teaser").animate({ height: 45 }, animationOptions);
                        },
                        function() {
                            $(this)
                                .find(".thumbnail_label").animate({ marginTop: -32 }, animationOptions).end()
                                .find(".thumbnail_teaser").animate({ height: 0 }, animationOptions);
                        }
            );
    },

    thumbnailClick: function() {
        var jelParent = $(this).parents("td").first();
        var youtubeId = jelParent.attr("data-youtube-id");
        if (youtubeId) {
            VideoControls.playVideo(youtubeId, jelParent.attr("data-key"), true);

            $("#thumbnails td.selected").removeClass("selected");
            jelParent.addClass("selected");

            return false;
        }
    },

    playVideo: function(youtubeId, videoKey, forcePlayBegin) {
        if (VideoControls.player && youtubeId) {
            $(VideoControls).trigger("beforeplay");

            if (forcePlayBegin || this.autoPlayEnabled) {
                VideoControls.player.loadVideoById(youtubeId, 0, "default");
            } else {
                VideoControls.player.cueVideoById(youtubeId, 0, "default");
            }
            VideoControls.scrollToPlayer();
        }
        VideoStats.startLoggingProgress(videoKey);
    },

    /**
     * Invokes a function (typically on the player) and ensures that the invoke
     * is done only after the player is ready.
     */
    invokeWhenReady: function(func) {
        this.readyDeferred_.then(func);
    },

    setPlayer: function(player) {
        this.player = player;
        this.readyDeferred_.resolve();
    }
};

var VideoStats = {

    dPercentGranularity: 0.1,
    dPercentLastSaved: 0.0,
    fSaving: false,
    consecutiveFailures: 0,
    player: null,
    intervalId: null,
    fAlternativePlayer: false,
    fEventsAttached: false,
    cachedDuration: 0, // For use by alternative FLV player
    cachedCurrentTime: 0, // For use by alternative FLV player
    dtLastSaved: null,
    sVideoKey: null,
    sYoutubeId: null,
    playing: false, //ensures pause and end events are idempotent

    /**
     * A cache of the last point value saved.
     * A value of -1 indicates that no value has been saved and we don't
     * know the points earned for the current video.
     */
    pointsSaved: -1,

    getSecondsWatched: function() {
        if (!this.player) return 0;
        return this.player.getCurrentTime() || 0;
    },

    getSecondsWatchedSinceSave: function() {
        var secondsPageTime = ((new Date()) - this.dtLastSaved) / 1000.0;
        return Math.min(secondsPageTime, this.getSecondsWatched());
    },

    POINTS_BASE: 750,
    REQUIRED_PERCENTAGE_FOR_FULL_VIDEO_POINTS: 0.9,

    /**
     * Computes an estimate of the points for the current video.
     * Returns -1 if no reasonable estimate can be made.
     * This logic must be in sync with the code in the server at points.py
     */
    getPointsEstimate: function() {
        if (this.pointsSaved < 0) {
            return -1;
        }
        var duration = this.player.getDuration() || 0;
        if (duration <= 0) {
            return -1;
        }

        var secondsSinceSave = this.getSecondsWatchedSinceSave();
        var percentSinceSave = Math.min(1.0, secondsSinceSave / duration);
        var percentTotal = percentSinceSave + (this.pointsSaved / this.POINTS_BASE);
        if (percentTotal > this.REQUIRED_PERCENTAGE_FOR_FULL_VIDEO_POINTS) {
            percentTotal = 1.0;
        }

        return Math.ceil(this.POINTS_BASE * percentTotal);
    },

    getPercentWatched: function() {
        if (!this.player) {
            return 0;
        }

        var duration = this.player.getDuration() || 0;
        if (duration <= 0) {
            return 0;
        }

        return Math.min(1.0, this.getSecondsWatched() / duration);
    },

    startLoggingProgress: function(sVideoKey, sYoutubeId) {

        if (sYoutubeId) {
            this.sYoutubeId = sYoutubeId;
            this.sVideoKey = null;
        } else if (sVideoKey) {
            this.sVideoKey = sVideoKey;
            this.sYoutubeId = null;
        } else {
            return; // no key given, can't log anything.
        }

        this.dPercentLastSaved = 0;
        this.cachedDuration = 0;
        this.cachedCurrentTime = 0;
        this.dtLastSaved = new Date();

        if (this.fEventsAttached) return;

        // Listen to state changes in player to detect final end of video
        if (this.player) this.listenToPlayerStateChange();
        // If the player isn't ready yet or if it is replaced in the future,
        // listen to the state changes once it is ready/replaced.
        $(this).on("playerready.videostats",
            _.bind(this.listenToPlayerStateChange, this));

        if (this.intervalId === null) {
            // Every 10 seconds check to see if we've crossed over our percent
            // granularity logging boundary
            this.intervalId = setInterval(function() {
                VideoStats.playerStateChange(-2);
            }, 10000);
        }

        this.fEventsAttached = true;
    },

    stopLoggingProgress: function() {
        // unhook event handler initializer
        $(this).unbind("playerready.videostats");

        // send a final pause event
        this.playerStateChange(2);

        // now unhook playback polling
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        // cannot unhook statechange handler as there is no removeEventListener

        this.fEventsAttached = false;
    },

    listenToPlayerStateChange: function() {
        if (!this.fAlternativePlayer && !this.player.fStateChangeHookAttached) {
            // YouTube player is ready, add event listener
            this.player.addEventListener("onStateChange", "onYouTubePlayerStateChange");

            // Multiple calls should be idempotent
            this.player.fStateChangeHookAttached = true;
        }
    },

    checkVideoComplete: function() {
        var state = this.player.getPlayerState();
        if (state === 0) { // ended
            if (VideoControls.autoPlayCallback) {
                VideoControls.autoPlayCallback();
            } else {
                VideoControls.setAutoPlayEnabled(false);
            }
        } else if (state === 2) { // paused
            VideoControls.setAutoPlayEnabled(false);
        }
    },

    playerStateChange: function(state) {
        var self = this;
        var playing = this.playing || this.fAlternativePlayer;
        if (state === -2) { // playing normally
            var percent = this.getPercentWatched();

            // Save after we hit certain intervals of video watching.
            if (percent > (this.dPercentLastSaved + this.dPercentGranularity)) {
                this.save();
            } else if (this.playing) {
                // If we hit the max video points for the first time, force a save,
                // since showing an estimate might entice the user to close the browser
                // thinking they finished (and it not having actually saved).
                var threshold = this.REQUIRED_PERCENTAGE_FOR_FULL_VIDEO_POINTS;
                if (this.dPercentLastSaved < threshold && percent >= threshold) {
                    this.save();
                } else {
                    var estimate = this.getPointsEstimate();
                    if (estimate >= 0) {
                        this.updatePointsDisplay(estimate);
                    }
                }
            }
        } else if (state === 0 && playing) { // ended
            this.playing = false;
            this.save();

            if (VideoControls.autoPlayEnabled) {
                setTimeout(function() { self.checkVideoComplete() }, 500);
            } else {
                VideoControls.setAutoPlayEnabled(false);
            }

            if (this.analyticsActivity) {
                this.analyticsActivity.parameters["Percent (end)"] = this.dPercentLastSaved;
                Analytics.trackActivityEnd(this.analyticsActivity);
                this.analyticsActivity = null;
            }
        } else if (state === 2 && playing) { // paused
            this.playing = false;
            if (this.getSecondsWatchedSinceSave() > 1) {
                this.save();
            }

            if (VideoControls.autoPlayEnabled) {
                setTimeout(function() { self.checkVideoComplete() }, 500);
            } else {
                VideoControls.setAutoPlayEnabled(false);
            }

            if (this.analyticsActivity) {
                this.analyticsActivity.parameters["Percent (end)"] = this.dPercentLastSaved;
                Analytics.trackActivityEnd(this.analyticsActivity);
                this.analyticsActivity = null;
            }
        } else if (state === 1) { // play
            this.playing = true;
            this.dtLastSaved = new Date();
            this.dPercentLastSaved = this.getPercentWatched();

            if (!this.analyticsActivity) {
                var id = "";
                if (this.sVideoKey !== null) {
                    id = this.sVideoKey;
                } else if (this.sYoutubeId !== null) {
                    id = this.sYoutubeId;
                }
                this.analyticsActivity = Analytics.trackActivityBegin("Video Play", {
                    "Video ID": id,
                    "Percent (begin)": this.dPercentLastSaved
                });
//                gae_bingo.bingo(["topic_pages_started_video"]);

            }
        }
        // If state is buffering, unstarted, or cued, don't do anything
    },

    // TODO(benkomalo): move this temporary check elsewhere and beef it up.
    // Right now it relies on a global variable set in page_template.html
    // for the user's nickname.
    isPhantom_: function() {
        return !window.USERNAME;
    },

    save: function() {

        if (this.fSaving) {
            return;
        }

        // Make sure cookies are enabled, otherwise this totally won't work
        if (!areCookiesEnabled()) {
            KAConsole.log("Cookies appear to be disabled. Not logging video progress.");
            return;
        }

        if (this.isPhantom_() && this.consecutiveFailures >= 3) {
            KAConsole.log("Not sending video log request due to too many failures");
            return;
        }

        this.fSaving = true;
        var percent = this.getPercentWatched();
        var dtLastSavedBeforeError = this.dtLastSaved;
        var id = 0;

        var data = {
            last_second_watched: this.getSecondsWatched(),
            seconds_watched: this.getSecondsWatchedSinceSave()
        };

        if (this.sVideoKey !== null) {
            data.video_key = this.sVideoKey;
        } else if (this.sYoutubeId !== null) {
            id = this.sYoutubeId;
        }

        $.ajax({type: "GET",
                url: "/api/v1/user/videos/" + id + "/log_compatability",
                data: data,
                success: function(data) {
                    VideoStats.finishSave(data, percent);
                    VideoStats.consecutiveFailures = 0;
                },
                error: function() {
                    // Restore pre-error stats so user can still get full
                    // credit for video even if GAE timed out on a request
                    VideoStats.fSaving = false;
                    VideoStats.dtLastSaved = dtLastSavedBeforeError;
                    VideoStats.consecutiveFailures++;
                }
        });

        this.dtLastSaved = new Date();
    },

    /* Use qtip2 (http://craigsworks.com/projects/qtip2/) to create a tooltip
     * that looks like the ones on youtube.
     *
     * Example:
     * VideoStats.tooltip('#points-badge-hover', '0 of 500 points');
     */
    tooltip: function(selector, content) {
        $(selector).qtip({
            content: {
                text: content
            },
            style: {
                classes: "ui-tooltip-youtube"
            },
            position: {
                my: "top center",
                at: "bottom center"
            },
            hide: {
                fixed: true,
                delay: 150
            }
        });
    },

    finishSave: function(dict_json, percent) {
        VideoStats.fSaving = false;
        VideoStats.dPercentLastSaved = percent;

        if (dict_json && dict_json.action_results.user_video) {
            video = dict_json.action_results.user_video;
            if (window.Video && Video.updateVideoPoints) {
                Video.updateVideoPoints(video.points);
            } else {
                this.updatePointsSaved(video.points);
            }

            if (video.completed) {
                var id = "";
                if (this.sVideoKey !== null) {
                    id = this.sVideoKey;
                } else if (this.sYoutubeId !== null) {
                    id = this.sYoutubeId;
                }
                Analytics.trackSingleEvent("Video Complete", {
                    "Video ID": id
                });
//                gae_bingo.bingo(["topic_pages_completed_video"]);
            }
        }
    },

    /**
     * Updates the number of points the video has earned, as saved to
     * the server.
     */
    updatePointsSaved: function(points) {
        this.pointsSaved = points;
        this.updatePointsDisplay(points);
    },

    /**
     * Update the points in the visible display of the video player.
     */
    updatePointsDisplay: function(points) {
        var jelPoints = $(".video-energy-points");
        if (jelPoints.length) {
            var hoverData = jelPoints.data("title");
            if (hoverData) {
                jelPoints.data("title", hoverData.replace(/^\d+/, points));
            }
            $(".video-energy-points-current", jelPoints).text(points);

            // Replace the old tooltip with an updated one.
            if (hoverData) {
                VideoStats.tooltip("#points-badge-hover", jelPoints.data("title"));
            }
        }
    },

    prepareAlternativePlayer: function() {

        this.player = $("#flvPlayer").get(0);
        if (!this.player) return;

        // Simulate the necessary YouTube APIs for the alternative player
        this.player.getDuration = function() { return VideoStats.cachedDuration; };
        this.player.getCurrentTime = function() { return VideoStats.cachedCurrentTime; };

        this.fAlternativePlayer = true;
    },

    cacheStats: function(time, duration) {

        // Only update current time if it exists, not if video finished
        // and scrubber went back to 0.
        var currentTime = parseFloat(time);
        if (currentTime) {
            this.cachedCurrentTime = currentTime;
        }

        this.cachedDuration = parseFloat(duration);
    }
};

// Called by standard (non-iframe) youtube player upon load.
// See http://code.google.com/apis/youtube/js_api_reference.html
function onYouTubePlayerReady(playerID) {

    // Check .playVideo to ensure that the YouTube JS API is available. Modern
    // browsers see both the OBJECT and EMBED elements, but only one has the
    // API attached to it, e.g., OBJECT for IE9, EMBED for Chrome.
    var player = $(".mirosubs-widget object").get(0);
    if (!player || !player.playVideo) player = document.getElementById("idPlayer");
    if (!player || !player.playVideo) player = document.getElementById("idOVideo");
    if (!player || !player.playVideo) throw new Error("YouTube player not found");

    // Ensure UniSub widget will know about ready players if/when it loads.
    (window.unisubs_readyAPIIDs = window.unisubs_readyAPIIDs || []).push((playerID === "undefined" || !playerID) ? "" : playerID);

    // defer this call as otherwise any exceptions thrown within will be
    // swallowed by flash
    _.defer(function() { connectYouTubePlayer(player); });
}

// Called by (experimental) iframe youtube player upon load.
// Currently only used on iOS devices.
// See http://code.google.com/apis/youtube/iframe_api_reference.html
function onYouTubePlayerAPIReady() {

    if (typeof YT === "undefined" || $("#iframePlayer").length === 0) {
        return;
    }

    // Always give each iframe player a unique id so YT.Player events
    // work properly. Hopefully in less-beta versions of YT's iframe API this
    // won't be necessary.
    //
    onYouTubePlayerAPIReady.players = onYouTubePlayerAPIReady.players || 0;
    $("#iframePlayer").attr("id", "iframePlayer_" + onYouTubePlayerAPIReady.players).data("ready", true);

    var playerJS = new YT.Player("iframePlayer_" + onYouTubePlayerAPIReady.players, {
        events: {
            "onReady": function(e) { connectYouTubePlayer(e.target); },
            "onStateChange": function(e) { onYouTubePlayerStateChange(e.data); }
        }
    });

    $("#page-container-inner")
        .on("pagehide", "div.video", function(a, b) {
            // Remove from DOM whenever leaving a video page
            // so a full refresh is triggered.
            $(a.target).remove();
        });

    // Whenever showing a new video page, making sure onYouTubePlayerAPIReady
    // gets called, even if it's been called previously.
    $("#page-container-inner").on("pageshow", "div.video", function() {
        onYouTubePlayerAPIReady();
    });

    onYouTubePlayerAPIReady.players += 1;
}

function connectYouTubePlayer(player) {

    VideoControls.setPlayer(player);
    VideoStats.player = player;

    // The UniSub (aka mirosubs) widget replaces the YouTube player with a copy
    // and that will cause onYouTubePlayerReady() to be called again.  So, we trigger
    // 'playerready' events on any objects that are using the player so that they can
    // take appropriate action to use the new player.
    $(VideoControls).trigger("playerready");
    $(VideoStats).trigger("playerready");
}
;
// Hello friend!
// APIActionResults is an observer for all XHR responses that go through the page
// The key being that it will listen for XHR messages with the magic header "X-KA-API-Response"
// which is added in from api/__init__.py
//
// In api/v1.py, add_action_results takes care of bundling data to be digested by this client-side
// listener. As a result, if you have something which happens as a result of an API POST, it's worth
// investigating whether or not you can have it triggered here rather than in khan-exercise.js
var APIActionResults = {

    init: function() {
        this.hooks = [];

        $(document).ajaxComplete(function(e, xhr, settings) {

            if (xhr &&
                xhr.getResponseHeader("X-KA-API-Version-Mismatch")) {
                apiVersionMismatch();
            }

            if (xhr &&
                xhr.getResponseHeader("X-KA-API-Response") &&
                xhr.responseText) {

                try { eval("var result = " + xhr.responseText); }
                catch (e) { return; }

                if (result) {
                    // Result format may differ depending on if 'casing=camel'
                    // was provided in the request.
                    var action = result['action_results'] || result['actionResults'];
                    if (action) {
                        $(APIActionResults.hooks).each(function(ix, el) {
                            if (typeof action[el.prop] !== "undefined") {
                                el.fxn(action[el.prop]);
                            }
                        });
                    }
                }
            }
        });

        jQuery.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (settings && settings.url && settings.url.indexOf("/api/") > -1) {
                    var xsrfToken = readCookie("fkey");
                    if (xsrfToken) {
                        // Send xsrf token along via header so it can be matched up
                        // w/ cookie value.
                        xhr.setRequestHeader("X-KA-FKey", xsrfToken);
                    } else {
                        apiVersionMismatch();
                        if (settings.error) {
                            settings.error();
                        }
                        return false;
                    }
                }
            }
        });

    },

    /**
     * Converts our Python code's underscore_variable_notation to camelCase
     *
     * TODO: can remove when all of our API calls use casing:camel, see
     * APIActionResults.register above.
     */
    toCamelCase: function(prop) {
        // From http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
        return prop.replace(/_([a-z])/g, function (match) { return match[1].toUpperCase() });
    },

    /**
     * Register both prop and the camelCase version of prop as an API event
     * listener.
     *
     * TODO: when all of our API calls use casing:camel, we won't need
     * toCamelCase because everything will register with APIActionResults using
     * the camelCased variable name.
     */
    register: function(prop, fxn) {
        this.hooks[this.hooks.length] = {prop: prop, fxn: fxn};
        this.hooks[this.hooks.length] = {prop: APIActionResults.toCamelCase(prop), fxn: fxn};
    }
};

function apiVersionMismatch() {
    Notifications.showTemplate("shared.api-version-mismatch");
}

APIActionResults.init();

// Show any badges that were awarded w/ any API ajax request
if (typeof Badges !== "undefined") {
    $(function() { APIActionResults.register("badges_earned_html", Badges.show); });
}

// Show any login notifications that pop up w/ any API ajax request
if (typeof Notifications !== "undefined") {
    $(function() { APIActionResults.register("login_notifications_html", Notifications.show); });
}

// Update user info after appropriate API ajax requests
$(function() { APIActionResults.register("user_info_html",
        function(sUserInfoHtml) {
            $("#badge-count-container").remove();
            $("#user-points-container").remove();

            $("#user-info").prepend(sUserInfoHtml);
        }
    );
});

// show point animation above progress bar when in exercise pages
$(function() {

    // TODO: this point animation isn't hooked up to new power mode. Restore
    // it.
    // https://trello.com/card/restore-mario-points-coolness/4f3f43cd45533a1b3a065a1d/86
    var updatePointDisplay = function(data) {
        if (jQuery(".single-exercise").length > 0 && data.points > 0) {
            var coin = jQuery("<div>+" + data.points + "</div>").addClass("energy-points-badge");
            jQuery(".streak-bar").append(coin);
            jQuery(coin)
                .fadeIn(195)
                .delay(650)
                .animate({top: "-30", opacity: 0}, 350, "easeInOutCubic",
                    function() {jQuery(coin).hide(0).remove();}); // remove coin on animation complete
        }
    };

    APIActionResults.register("points_earned", updatePointDisplay);
});
