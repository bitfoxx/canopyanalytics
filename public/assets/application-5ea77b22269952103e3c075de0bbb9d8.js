/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
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
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

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

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
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
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
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

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
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

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
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
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
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
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
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
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
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
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
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
				if ( !memory ) {
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
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
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
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
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

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

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
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
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
	var name;
	for ( name in obj ) {

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

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
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

	thisCache = cache[ id ];

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

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

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
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

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
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

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
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
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

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

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
			var body, eventDoc, doc,
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

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
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
			{
				type: type,
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

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
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
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

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

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

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
if ( !support.submitBubbles ) {

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
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
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
if ( !support.changeBubbles ) {

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
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
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

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
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
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
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

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


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

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
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
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
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

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
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
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
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

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
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

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

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
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

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
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

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
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

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

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
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
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
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
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
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
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

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
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
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
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

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

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
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

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

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
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
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

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
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
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

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
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

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

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

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
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
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
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
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
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
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
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

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
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

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




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
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
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

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
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

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
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote], button[data-confirm]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
(function() {


}).call(this);
/* Copyright 2010 Google, Inc. All Rights Reserved. */
 
function k(a){throw a;}var n=void 0,p=!0,s=null,w=!1;function aa(){return function(){}}function ba(a){return function(b){this[a]=b}}function y(a){return function(){return this[a]}}function ca(a){return function(){return a}}var A;function da(a){return"Showing events after "+a}function ea(a){return"Showing events until "+a};var fa=fa||{},B=this;function D(a){return a!==n}function ga(a,b){var c=a.split("."),d=B;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&D(b)?d[e]=b:d[e]?d=d[e]:d=d[e]={}}function ha(){}function ia(a){a.ib=function(){return a.Ad?a.Ad:a.Ad=new a}}
function ja(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ka(a){return"array"==ja(a)}function la(a){var b=ja(a);return"array"==b||"object"==b&&"number"==typeof a.length}function E(a){return"string"==typeof a}function ma(a){return"function"==ja(a)}function na(a){var b=typeof a;return"object"==b&&a!=s||"function"==b}function oa(a){return a[pa]||(a[pa]=++qa)}var pa="closure_uid_"+(1E9*Math.random()>>>0),qa=0;function ra(a,b,c){return a.call.apply(a.bind,arguments)}
function sa(a,b,c){a||k(Error());if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function F(a,b,c){F=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ra:sa;return F.apply(s,arguments)}
function ta(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}var G=Date.now||function(){return+new Date};function I(a,b){function c(){}c.prototype=b.prototype;a.s=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Se=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}}
Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return F.apply(s,c)}return F(this,a)};var _dbmode=w;function ua(a,b,c){this.c=a;this.a=b;this.b=c||"";this.b||this.a.match(va)}var va=/GMT[+-](([01]\d((?=:00)|(:\d{2})))|((\?)*))/;ua.prototype.u=function(a){return a!==s&&this.c==a.c&&this.a==a.a};function wa(a){return 10>a?"0"+a:String(a)}var xa=[,31,,31,30,31,30,31,31,30,31,30,31];function ya(a,b){return xa[b]||xa[a]||(xa[a]=28+((a&3?0:a%100||!(a%400))?1:0))}var za={};function Aa(a,b){var c=a<<4|b;return za[c]||(za[c]=(new Date(a,b-1,1,12,0,0,0)).getDay())}var Ba=[,0,31,59,90,120,151,181,212,243,273,304,334];function Ca(a,b,c){a=2>=b||29-ya(a,2);return Ba[b]+c-a}
function Ea(a){var b=[];b.push(String(a.year),"-",wa(a.month),"-",wa(a.j));a.cc()||b.push("T",wa(a.hour),":",wa(a.minute),":",wa(a.second),"Z");return b.join("")};var Fa;function Ga(a,b){var c=String(a).toLowerCase(),d=String(b).toLowerCase();return c<d?-1:c==d?0:1}function J(a){if(!Ha.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Ia,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Ja,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Ka,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(La,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Ma,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Na,"&#0;"));return a}var Ia=/&/g,Ja=/</g,Ka=/>/g,La=/"/g,Ma=/'/g,Na=/\x00/g,Ha=/[\x00&<>"']/;
function Oa(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")}function Pa(a){return Array.prototype.join.call(arguments,"")}function Qa(a,b){return a<b?-1:a>b?1:0}Math.random();function Ra(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})}function Sa(a){var b=E(n)?Oa(n):"\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(a,b,e){return b+e.toUpperCase()})};function K(){}K.prototype.M=w;K.prototype.isDisposed=y("M");K.prototype.C=function(){this.M||(this.M=p,this.o())};K.prototype.o=function(){if(this.Dd)for(;this.Dd.length;)this.Dd.shift()()};function Ta(a){a&&"function"==typeof a.C&&a.C()};function Ua(a,b){for(var c in a)b.call(n,a[c],c,a)}function Va(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function Wa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function Xa(a){for(var b in a)return w;return p}function Ya(a){var b={},c;for(c in a)b[c]=a[c];return b}var Za="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function $a(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Za.length;f++)c=Za[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}function ab(a){var b=arguments.length;if(1==b&&ka(arguments[0]))return ab.apply(s,arguments[0]);b%2&&k(Error("Uneven number of arguments"));for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c}
function bb(a){var b=arguments.length;if(1==b&&ka(arguments[0]))return bb.apply(s,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=p;return c};function L(a,b){this.type=a;this.a=this.target=b;this.b=w;this.$c=p}L.prototype.o=aa();L.prototype.C=aa();L.prototype.stopPropagation=function(){this.b=p};L.prototype.preventDefault=function(){this.$c=w};function cb(a){cb[" "](a);return a}cb[" "]=ha;var db=Array.prototype,eb=db.indexOf?function(a,b,c){return db.indexOf.call(a,b,c)}:function(a,b,c){c=c==s?0:0>c?Math.max(0,a.length+c):c;if(E(a))return E(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},fb=db.forEach?function(a,b,c){db.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=E(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},gb=db.filter?function(a,b,c){return db.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,
g=E(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var l=g[h];b.call(c,l,h,a)&&(e[f++]=l)}return e},hb=db.some?function(a,b,c){return db.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=E(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return p;return w};function ib(a){var b;t:{b=jb;for(var c=a.length,d=E(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(n,d[e],e,a)){b=e;break t}b=-1}return 0>b?s:E(a)?a.charAt(b):a[b]}function kb(a,b){return 0<=eb(a,b)}
function lb(a,b){var c=eb(a,b),d;(d=0<=c)&&db.splice.call(a,c,1);return d}function mb(a){return db.concat.apply(db,arguments)}function nb(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}function ob(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c],e;if(ka(d)||(e=la(d))&&Object.prototype.hasOwnProperty.call(d,"callee"))a.push.apply(a,d);else if(e)for(var f=a.length,g=d.length,h=0;h<g;h++)a[f+h]=d[h];else a.push(d)}}
function pb(a,b,c,d){db.splice.apply(a,qb(arguments,1))}function qb(a,b,c){return 2>=arguments.length?db.slice.call(a,b):db.slice.call(a,b,c)}function rb(a,b){for(var c=sb,d=0,e=a.length,f;d<e;){var g=d+e>>1,h;h=c(b,a[g]);0<h?d=g+1:(e=g,f=!h)}return f?d:~d}function tb(a,b){a.sort(b||sb)}function sb(a,b){return a>b?1:a<b?-1:0}function ub(a){for(var b=[],c=0;c<a;c++)b[c]=0;return b};var vb;t:{var wb=B.navigator;if(wb){var xb=wb.userAgent;if(xb){vb=xb;break t}}vb=""};var yb,zb;function Ab(){return B.navigator||s}var Bb=-1!=vb.indexOf("Opera")||-1!=vb.indexOf("OPR"),M=-1!=vb.indexOf("Trident")||-1!=vb.indexOf("MSIE"),N=-1!=vb.indexOf("Gecko")&&-1==vb.toLowerCase().indexOf("webkit")&&!(-1!=vb.indexOf("Trident")||-1!=vb.indexOf("MSIE")),O=-1!=vb.toLowerCase().indexOf("webkit"),Cb=Ab(),Db=Cb&&Cb.platform||"";yb=-1!=Db.indexOf("Mac");zb=-1!=Db.indexOf("Win");var Eb=!!Ab()&&-1!=(Ab().appVersion||"").indexOf("X11");
function Fb(){var a=B.document;return a?a.documentMode:n}var Gb=function(){var a="",b;if(Bb&&B.opera)return a=B.opera.version,ma(a)?a():a;N?b=/rv\:([^\);]+)(\)|;)/:M?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:O&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(vb))?a[1]:"");return M&&(b=Fb(),b>parseFloat(a))?String(b):a}(),Hb={};
function P(a){var b;if(!(b=Hb[a])){b=0;for(var c=String(Gb).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",l=RegExp("(\\d*)(\\D*)","g"),m=RegExp("(\\d*)(\\D*)","g");do{var r=l.exec(g)||["","",""],q=m.exec(h)||["","",""];if(0==r[0].length&&0==q[0].length)break;b=Qa(0==r[1].length?0:parseInt(r[1],10),0==q[1].length?0:parseInt(q[1],10))||Qa(0==r[2].length,0==q[2].length)||
Qa(r[2],q[2])}while(0==b)}b=Hb[a]=0<=b}return b}function Ib(a){return M&&Jb>=a}var Kb=B.document,Jb=Kb&&M?Fb()||("CSS1Compat"==Kb.compatMode?parseInt(Gb,10):5):n;var Lb=!M||Ib(9),Mb=!M||Ib(9),Nb=M&&!P("9");!O||P("528");N&&P("1.9b")||M&&P("8")||Bb&&P("9.5")||O&&P("528");N&&!P("8")||M&&P("9");function Ob(a,b){L.call(this,a?a.type:"");this.a=this.target=s;this.keyCode=this.clientY=this.clientX=0;this.c=this.e=this.d=this.Qa=w;this.wa=s;a&&this.init(a,b)}I(Ob,L);var Pb=[1,4,2];
Ob.prototype.init=function(a,b){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&N)try{cb(c.nodeName)}catch(d){}this.clientX=a.clientX!==n?a.clientX:a.pageX;this.clientY=a.clientY!==n?a.clientY:a.pageY;this.keyCode=a.keyCode||0;this.Qa=a.ctrlKey;this.d=a.altKey;this.e=a.shiftKey;this.c=a.metaKey;this.wa=a;a.defaultPrevented&&this.preventDefault()};
Ob.prototype.stopPropagation=function(){Ob.s.stopPropagation.call(this);this.wa.stopPropagation?this.wa.stopPropagation():this.wa.cancelBubble=p};Ob.prototype.preventDefault=function(){Ob.s.preventDefault.call(this);var a=this.wa;if(a.preventDefault)a.preventDefault();else if(a.returnValue=w,Nb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};Ob.prototype.o=aa();var Sb="closure_listenable_"+(1E6*Math.random()|0);function Tb(a){return!(!a||!a[Sb])}var Ub=0;function Vb(a,b,c,d,e){this.$=a;this.a=s;this.src=b;this.type=c;this.Ta=!!d;this.tb=e;this.Vb=++Ub;this.La=this.sb=w}function Wb(a){a.La=p;a.$=s;a.a=s;a.src=s;a.tb=s};function Xb(a){this.src=a;this.a={};this.b=0}Xb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.a[f];a||(a=this.a[f]=[],this.b++);var g=Yb(a,b,d,e);-1<g?(b=a[g],c||(b.sb=w)):(b=new Vb(b,this.src,f,!!d,e),b.sb=c,a.push(b));return b};Xb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return w;var e=this.a[a];b=Yb(e,b,c,d);return-1<b?(Wb(e[b]),db.splice.call(e,b,1),0==e.length&&(delete this.a[a],this.b--),p):w};
function Zb(a,b){var c=b.type;if(!(c in a.a))return w;var d=lb(a.a[c],b);d&&(Wb(b),0==a.a[c].length&&(delete a.a[c],a.b--));return d}function $b(a){var b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,Wb(d[e]);delete a.a[c];a.b--}}Xb.prototype.Bb=function(a,b){var c=this.a[a.toString()],d=[];if(c)for(var e=0;e<c.length;++e){var f=c[e];f.Ta==b&&d.push(f)}return d};Xb.prototype.Va=function(a,b,c,d){a=this.a[a.toString()];var e=-1;a&&(e=Yb(a,b,c,d));return-1<e?a[e]:s};
function Yb(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.La&&f.$==b&&f.Ta==!!c&&f.tb==d)return e}return-1};var ac="closure_lm_"+(1E6*Math.random()|0),bc={},cc=0;function Q(a,b,c,d,e){if(ka(b)){for(var f=0;f<b.length;f++)Q(a,b[f],c,d,e);return s}c=dc(c);return Tb(a)?a.B(b,c,d,e):ec(a,b,c,w,d,e)}function ec(a,b,c,d,e,f){b||k(Error("Invalid event type"));var g=!!e,h=fc(a);h||(a[ac]=h=new Xb(a));c=h.add(b,c,d,e,f);if(c.a)return c;d=gc();c.a=d;d.src=a;d.$=c;a.addEventListener?a.addEventListener(b.toString(),d,g):a.attachEvent(hc(b.toString()),d);cc++;return c}
function gc(){var a=ic,b=Mb?function(c){return a.call(b.src,b.$,c)}:function(c){c=a.call(b.src,b.$,c);if(!c)return c};return b}function jc(a,b,c,d,e){if(ka(b)){for(var f=0;f<b.length;f++)jc(a,b[f],c,d,e);return s}c=dc(c);return Tb(a)?a.bc(b,c,d,e):ec(a,b,c,p,d,e)}function kc(a,b,c,d,e){if(ka(b))for(var f=0;f<b.length;f++)kc(a,b[f],c,d,e);else c=dc(c),Tb(a)?a.Ua(b,c,d,e):a&&(a=fc(a))&&(b=a.Va(b,c,!!d,e))&&lc(b)}
function lc(a){if("number"==typeof a||!a||a.La)return w;var b=a.src;if(Tb(b))return Zb(b.Y,a);var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.Ta):b.detachEvent&&b.detachEvent(hc(c),d);cc--;(c=fc(b))?(Zb(c,a),0==c.b&&(c.src=s,b[ac]=s)):Wb(a);return p}function hc(a){return a in bc?bc[a]:bc[a]="on"+a}function mc(a,b,c,d){var e=1;if(a=fc(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.Ta==c&&!f.La&&(e&=nc(f,d)!==w)}return Boolean(e)}
function nc(a,b){var c=a.$,d=a.tb||a.src;a.sb&&lc(a);return c.call(d,b)}
function ic(a,b){if(a.La)return p;if(!Mb){var c;if(!(c=b))t:{c=["window","event"];for(var d=B,e;e=c.shift();)if(d[e]!=s)d=d[e];else{c=s;break t}c=d}e=c;c=new Ob(e,this);d=p;if(!(0>e.keyCode||e.returnValue!=n)){t:{var f=w;if(0==e.keyCode)try{e.keyCode=-1;break t}catch(g){f=p}if(f||e.returnValue==n)e.returnValue=p}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a.type,h=e.length-1;!c.b&&0<=h;h--)c.a=e[h],d&=mc(e[h],f,p,c);for(h=0;!c.b&&h<e.length;h++)c.a=e[h],d&=mc(e[h],f,w,c)}return d}return nc(a,
new Ob(b,this))}function fc(a){a=a[ac];return a instanceof Xb?a:s}var oc="__closure_events_fn_"+(1E9*Math.random()>>>0);function dc(a){if(ma(a))return a;a[oc]||(a[oc]=function(b){return a.handleEvent(b)});return a[oc]};function R(){this.Y=new Xb(this);this.re=this;this.qb=s}I(R,K);R.prototype[Sb]=p;A=R.prototype;A.na=ba("qb");A.addEventListener=function(a,b,c,d){Q(this,a,b,c,d)};A.removeEventListener=function(a,b,c,d){kc(this,a,b,c,d)};
A.dispatchEvent=function(a){var b,c=this.qb;if(c)for(b=[];c;c=c.qb)b.push(c);var c=this.re,d=a.type||a;if(E(a))a=new L(a,c);else if(a instanceof L)a.target=a.target||c;else{var e=a;a=new L(d,c);$a(a,e)}var e=p,f;if(b)for(var g=b.length-1;!a.b&&0<=g;g--)f=a.a=b[g],e=pc(f,d,p,a)&&e;a.b||(f=a.a=c,e=pc(f,d,p,a)&&e,a.b||(e=pc(f,d,w,a)&&e));if(b)for(g=0;!a.b&&g<b.length;g++)f=a.a=b[g],e=pc(f,d,w,a)&&e;return e};A.o=function(){R.s.o.call(this);this.Y&&$b(this.Y);this.qb=s};
A.B=function(a,b,c,d){return this.Y.add(String(a),b,w,c,d)};A.bc=function(a,b,c,d){return this.Y.add(String(a),b,p,c,d)};A.Ua=function(a,b,c,d){return this.Y.remove(String(a),b,c,d)};function pc(a,b,c,d){b=a.Y.a[String(b)];if(!b)return p;b=b.concat();for(var e=p,f=0;f<b.length;++f){var g=b[f];if(g&&!g.La&&g.Ta==c){var h=g.$,l=g.tb||g.src;g.sb&&Zb(a.Y,g);e=h.call(l,d)!==w&&e}}return e&&d.$c!=w}A.Bb=function(a,b){return this.Y.Bb(String(a),b)};A.Va=function(a,b,c,d){return this.Y.Va(String(a),b,c,d)};function qc(a){B.setTimeout(function(){k(a)},0)}var rc;
function sc(){var a=B.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=F(function(a){if(a.origin==d||a.data==c)this.port1.onmessage()},
this);b.addEventListener("message",a,w);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a){var b=new a,c={},d=c;b.port1.onmessage=function(){c=c.next;var a=c.Bd;c.Bd=s;a()};return function(a){d.next={Bd:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=s;b.parentNode.removeChild(b);
b=s;a();a=s};document.documentElement.appendChild(b)}:function(a){B.setTimeout(a,0)}};function tc(a,b){uc||vc();wc||(uc(),wc=p);xc.push(new yc(a,b))}var uc;function vc(){if(B.Promise&&B.Promise.resolve){var a=B.Promise.resolve();uc=function(){a.then(zc)}}else uc=function(){var a=zc;ma(B.setImmediate)?B.setImmediate(a):(rc||(rc=sc()),rc(a))}}var wc=w,xc=[];function zc(){for(;xc.length;){var a=xc;xc=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.a.call(c.b)}catch(d){qc(d)}}}wc=w}function yc(a,b){this.a=a;this.b=b};function Ac(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=p}function Bc(a){if(!a)return w;try{return!!a.$goog_Thenable}catch(b){return w}};function Cc(a,b){this.b=0;this.ea=n;this.a=this.e=s;this.c=this.d=w;try{var c=this;a.call(b,function(a){Dc(c,2,a)},function(a){Dc(c,3,a)})}catch(d){Dc(this,3,d)}}Cc.prototype.then=function(a,b,c){return Ec(this,ma(a)?a:s,ma(b)?b:s,c)};Ac(Cc);function Fc(a,b){a.a&&a.a.length||2!=a.b&&3!=a.b||Gc(a);a.a||(a.a=[]);a.a.push(b)}
function Ec(a,b,c,d){var e={ac:s,Mc:s,Nc:s};e.ac=new Cc(function(a,g){e.Mc=b?function(c){try{var e=b.call(d,c);a(e)}catch(m){g(m)}}:a;e.Nc=c?function(b){try{var e=c.call(d,b);!D(e)&&w?g(b):a(e)}catch(m){g(m)}}:g});e.ac.e=a;Fc(a,e);return e.ac}Cc.prototype.f=function(a){this.b=0;Dc(this,2,a)};Cc.prototype.g=function(a){this.b=0;Dc(this,3,a)};
function Dc(a,b,c){if(0==a.b){if(a==c)b=3,c=new TypeError("Promise cannot resolve to itself");else{if(Bc(c)){a.b=1;c.then(a.f,a.g,a);return}if(na(c))try{var d=c.then;if(ma(d)){Hc(a,c,d);return}}catch(e){b=3,c=e}}a.ea=c;a.b=b;Gc(a);3!=b||w||Ic(a,c)}}function Hc(a,b,c){function d(b){f||(f=p,a.g(b))}function e(b){f||(f=p,a.f(b))}a.b=1;var f=w;try{c.call(b,e,d)}catch(g){d(g)}}function Gc(a){a.d||(a.d=p,tc(a.h,a))}
Cc.prototype.h=function(){for(;this.a&&this.a.length;){var a=this.a;this.a=[];for(var b=0;b<a.length;b++){var c=a[b],d=this.ea;if(2==this.b)c.Mc(d);else{for(var e=n,e=this;e&&e.c;e=e.e)e.c=w;c.Nc(d)}}}this.d=w};function Ic(a,b){a.c=p;tc(function(){a.c&&Jc.call(s,b)})}var Jc=qc;/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function Kc(a,b){this.b=[];this.k=b||s;this.a=this.e=w;this.ea=n;this.h=this.d=w;this.c=0;this.f=s;this.n=0}Kc.prototype.g=function(a,b){this.d=w;this.e=p;this.ea=b;this.a=!a;Lc(this)};function Mc(a,b,c){a.b.push([b,c,n]);a.e&&Lc(a)}Kc.prototype.then=function(a,b,c){var d,e,f=new Cc(function(a,b){d=a;e=b});Mc(this,d,function(a){e(a)});return f.then(a,b,c)};Ac(Kc);function Nc(a){return hb(a.b,function(a){return ma(a[1])})}
function Lc(a){if(a.c&&a.e&&Nc(a)){var b=a.c,c=Oc[b];c&&(B.clearTimeout(c.fb),delete Oc[b]);a.c=0}a.f&&(a.f.n--,delete a.f);for(var b=a.ea,d=c=w;a.b.length&&!a.d;){var e=a.b.shift(),f=e[0],g=e[1],e=e[2];if(f=a.a?g:f)try{var h=f.call(e||a.k,b);D(h)&&(a.a=a.a&&(h==b||h instanceof Error),a.ea=b=h);Bc(b)&&(d=p,a.d=p)}catch(l){b=l,a.a=p,Nc(a)||(c=p)}}a.ea=b;d&&(h=F(a.g,a,p),d=F(a.g,a,w),b instanceof Kc?(Mc(b,h,d),b.h=p):b.then(h,d));c&&(b=new Pc(b),Oc[b.fb]=b,a.c=b.fb)}
function Pc(a){this.fb=B.setTimeout(F(this.b,this),0);this.a=a}Pc.prototype.b=function(){delete Oc[this.fb];k(this.a)};var Oc={};function Qc(){R.call(this)}I(Qc,R);function Rc(a,b,c,d,e,f,g){R.call(this);ka(a);this.c=b;this.b=c;this.e=D(d)?d:0;this.d=e||7;this.a=g||{}}I(Rc,Qc);Rc.prototype.set=function(a,b){var c=this.a[a];this.a[a]=b;return c!=b};Rc.prototype.get=function(a){return this.a[a]};var Sc=1/131072;function Tc(a){if(28>(a&31))return a+1;var b=a>>5&15;if((a&31)<(xa[b]||ya((a>>9)+1970,2)))return a+1;var c=(a>>9)+1970;12<++b&&(b=1,++c);return((c-1970<<4)+b<<5)+1+a%1}function Uc(a,b){var c=a;a%1||(a+=Sc);(b-Sc)%1||(b-=Sc);return function(d,e){return d<b&&(e>a||d>=c)}};function Vc(){}A=Vc.prototype;A.year=NaN;A.month=NaN;A.j=NaN;A.hour=NaN;A.minute=NaN;A.second=NaN;A.toString=function(){return this.b||(this.b=this.yb())};A.t=function(){return this.i()|0};A.min=function(a){return this.i()<a.i()?this:a};A.max=function(a){return this.i()>a.i()?this:a};function Wc(a,b){var c=Xc(a);isNaN(a.year)||(c.year=NaN,c.month=NaN,c.j=Yc(a,b));isNaN(a.hour)||(c.hour-=b.hour,c.minute-=b.minute,c.second-=b.second);return new Zc(c.j,c.hour,c.minute,c.second)}
function Yc(a,b){var c=a.year,d=a.month,e=a.j,f=b.year,g=b.month,h=b.j;return c==f?Ca(c,d,e)-Ca(f,g,h):Math.round((Date.UTC(c,d-1,e)-Date.UTC(f,g-1,h))/864E5)}function $c(a){var b=a.year,c=a.month;a=a.j;28<++a&&a>ya(b,c)&&(a=1,13===++c&&(c=1,++b));return ad(b,c,a)}function bd(a){return a.hour||a.minute||a.second?$c(a):a.m()}function S(a,b){return cd(a.year,a.month,a.j+b).m()}function dd(a,b){return S(a,-((a.V()-b+7)%7))}function ed(a,b){return S(a,(b-a.V()+7)%7)}
A.V=function(){var a=this.j;return(Aa(this.year,this.month)+a-1)%7};A.m=function(){return ad(this.year||0,this.month||1,this.j||1)};A.ca=function(){return new fd(this.year||0,this.month||1,this.j||1,this.hour||0,this.minute||0,this.second||0)};A.zb=function(){return new gd(this.hour||0,this.minute||0,this.second||0)};function hd(a){return 60*a.hour+a.minute};function id(){}I(id,Vc);id.prototype.cc=ca(w);function gd(a,b,c){this.hour=a;this.minute=b;this.second=c}I(gd,Vc);gd.prototype.zb=function(){return this};gd.prototype.yb=function(){return Pa("T",wa(this.hour),wa(this.minute),wa(this.second))};gd.prototype.u=function(a){return!!a&&this.constructor===a.constructor&&this.i()==a.i()};gd.prototype.i=function(){return this.a||(this.a=(((this.hour<<6)+this.minute<<6)+this.second+1)*Sc)};function fd(a,b,c,d,e,f){this.year=a;this.month=b;this.j=c;this.hour=d;this.minute=e;this.second=f}I(fd,id);fd.prototype.ca=function(){return this};fd.prototype.i=function(){return this.a||(this.a=((this.year-1970<<4)+this.month<<5)+this.j+(((this.hour<<6)+this.minute<<6)+this.second+1)*Sc)};fd.prototype.yb=function(){return Pa(String(this.year),wa(this.month),wa(this.j),"T",wa(this.hour),wa(this.minute),wa(this.second))};
fd.prototype.u=function(a){return!!a&&this.constructor===a.constructor&&this.i()==a.i()};function jd(a){return new fd(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds())}function kd(a){return new fd(a.getFullYear(),a.getMonth()+1,a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds())};function ld(){}I(ld,id);A=ld.prototype;A.cc=ca(p);function md(a,b,c,d){var e=new ld;e.year=a;e.month=b;e.j=c;e.a=d;return nd[d]=e}A.m=function(){return this};A.i=y("a");A.yb=function(){return Pa(String(this.year),wa(this.month),wa(this.j))};A.u=function(a){return this===a};var nd={};function ad(a,b,c){var d=((a-1970<<4)+b<<5)+c;return nd[d]||md(a,b,c,d)}function od(a){return nd[a]||md((a>>9)+1970,a>>5&15,a&31,a)}function pd(a){return ad(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate())};function Zc(a,b,c,d){this.c=a=60*(60*(24*a+b)+c)+d;this.second=a%60;a=a/60|0;this.minute=a%60;a=a/60|0;this.hour=a%24;this.j=a/24|0}I(Zc,Vc);Zc.prototype.i=function(){return this.a||(this.a=this.j+(((this.hour<<6)+this.minute<<6)+this.second+1)*Sc)};
Zc.prototype.yb=function(){var a=this.hour||this.minute||this.second||0,b=this.j||a,b=0>b?-1:0<b?1:0,c=0>b?"-P":"P";this.j&&(c=this.j%7?c+(b*this.j+"D"):c+(b*this.j/7+"W"));a?(c+="T",this.hour&&(c+=b*this.hour+"H"),this.minute&&(c+=b*this.minute+"M"),this.second&&(c+=b*this.second+"S")):b||(c+="0D");return c};Zc.prototype.u=function(a){return!!a&&this.constructor===a.constructor&&this.i()==a.i()};function qd(){}I(qd,Vc);A=qd.prototype;A.year=0;A.month=0;A.j=0;A.hour=0;A.minute=0;A.second=0;A.i=function(){var a=this.t();isNaN(this.hour)||(a+=(((this.hour<<6)+this.minute<<6)+this.second+1)*Sc);return a};A.t=function(){rd(this);return((this.year-1970<<4)+this.month<<5)+this.j};function sd(a,b){a.j+=b.j;a.hour+=b.hour;a.minute+=b.minute;a.second+=b.second}
function rd(a){if(a.hour||a.minute||a.second){var b=60*(60*a.hour+a.minute)+a.second,c=Math.floor(b/86400),b=b-86400*c;a.j+=c;a.second=b%60;b/=60;a.minute=(b|0)%60;a.hour=(b/60|0)%24}td(a);for(b=ya(a.year,a.month);1>a.j;)a.month-=1,td(a),b=ya(a.year,a.month),a.j+=b;for(;a.j>b;)a.j-=b,a.month+=1,td(a),b=ya(a.year,a.month)}function td(a){var b;if(1>a.month||12<a.month)b=Math.floor((a.month-1)/12),a.month-=12*b,a.year+=b}A.m=function(){rd(this);return ad(this.year,this.month,this.j)};
A.ca=function(){rd(this);return new fd(this.year,this.month,this.j,this.hour,this.minute,this.second)};A.zb=function(){rd(this);return new gd(this.hour,this.minute,this.second)};A.V=function(){rd(this);var a=this.j;return(Aa(this.year,this.month)+a-1)%7};A.u=function(a){return!!a&&this.constructor==a.constructor&&this.i()==a.i()};function Xc(a){return ud(a.year||0,a.month||0,a.j||0,a.hour||0,a.minute||0,a.second||0)}
function ud(a,b,c,d,e,f){var g=new qd;g.year=a;g.month=b;g.j=c;g.hour=d;g.minute=e;g.second=f;return g}function cd(a,b,c){var d=new qd;d.year=a;d.month=b;d.j=c;return d};function T(a,b){this.start=a;if(b.constructor===Zc){var c=Xc(a);sd(c,b);this.end=this.start instanceof fd?c.ca():c.m();this.a=b}else this.end=b,this.a=Wc(this.end,this.start)}T.prototype.toString=function(){return this.start+"/"+this.end};T.prototype.u=function(a){return!!a&&this.constructor===a.constructor&&this.start.u(a.start)&&this.end.u(a.end)};T.prototype.contains=function(a){a=a.i();return a>=this.start.i()&&a<this.end.i()};function vd(a,b){return 10*a.charCodeAt(b)+a.charCodeAt(b+1)-528}function wd(a){var b=parseInt(a,10),c=b%100,b=b/100,d=(b|0)%100,b=b/100|0;return 8==a.length?ad(b,d,c):new fd(b,d,c,vd(a,9),vd(a,11),vd(a,13))}
function xd(a,b,c){var d=parseInt(a,10),e=vd(a,5),f=vd(a,8),g=a.length;if(84==a.charCodeAt(10)){var h=vd(a,11),l=vd(a,14),m=vd(a,17);b||c?(c=Date.UTC(d,e-1,f,h,l,m),d=0,90!=a.charCodeAt(g-1)&&(d=60*vd(a,g-5)+vd(a,g-2),d*=44-a.charCodeAt(g-6)),a=(b?kd:jd)(new Date(c-6E4*d))):a=new fd(d,e,f,h,l,m)}else a=ad(d,e,f);return a};function yd(){R.call(this)}I(yd,R);A=yd.prototype;A.Wb=s;A.bd=s;A.ad=s;A.Ra=function(a,b,c){this.K(c)};A.K=function(a){this.Ra(a,a,a)};A.Ma=function(a){this.K(S(0<a?this.b:this.a,a))};A.contains=function(a){a=a.m();return a.i()>=this.a.i()&&a.i()<=this.b.i()};function zd(a){return Yc(a.b,a.a)+1}A.set=function(a,b,c){this.a=a;this.b=b;this.focus=c;this.Wb&&this.focus.u(this.ad)&&this.a.u(this.Wb)&&this.b.u(this.bd)||(this.ad=this.focus,this.Wb=this.a,this.bd=this.b,this.dispatchEvent("change"))};
function Ad(){R.call(this)}I(Ad,yd);Ad.prototype.Ra=function(a,b,c){this.c.Ra(a,b,c)};Ad.prototype.K=function(a){this.c.K(a)};Ad.prototype.Ma=function(a){this.c.Ma(a)};function Bd(a,b){a.c&&lc(a.e);a.c=b;a.e=Q(b,"change",a.d,w,a);a.d()}Ad.prototype.d=function(){var a=this.c;this.set(a.a,a.b,a.focus)};function Cd(){R.call(this)}I(Cd,yd);Cd.prototype.K=function(a){this.set(a,a,a)};function Dd(a){R.call(this);this.c=a}I(Dd,yd);Dd.prototype.K=function(a){var b=dd(a,this.c.c),c;this.c.b||(b=ed(b,this.c.e));c=S(b,this.c.d-1);a=a.min(c).max(b);this.set(b,c,a)};Dd.prototype.Ma=function(a){this.K(S(this.focus,7*a))};function Ed(){R.call(this)}I(Ed,yd);Ed.prototype.K=function(a){var b=a.year,c=a.month;this.set(ad(b,c,1),ad(b,c,ya(b,c)),a)};function Fd(a,b){R.call(this);this.d=a;this.c=b}I(Fd,yd);
Fd.prototype.K=function(a){var b=a;D(this.c)&&(b=dd(a,this.c));var c=S(b,this.d-1);a=a.min(c);this.set(b,c,a)};Fd.prototype.Ma=function(a){a*=zd(this);this.set(S(this.a,a),S(this.b,a),S(this.focus,a))};function U(a,b){this.c=a;this.d=!!b}var Gd=/>(\s+)</g,Hd=/\s{2,}/g,Id=/\$\{(\w+)\}/g;A=U.prototype;A.Nb=w;function Jd(a){if(!a.Nb){var b=a.c;delete a.c;a.d||(b=b.replace(Gd,"><").replace(Hd," "));var c=[];a.b=c;a.a={};for(var d=b.match(Id)||[],e=0,f=d.length,g=0;g<f;++g){var h=d[g],l=b.indexOf(h,e);e!=l&&c.push(b.substring(e,l));e=l+h.length;h=h.substring(2,h.length-1);l=a.a[h];l||(l=[],a.a[h]=l);l.push(c.length);c.push(n)}e!=b.length&&c.push(b.substring(e));a.Nb=p}}
A.clone=function(){Jd(this);var a=new U("");a.Nb=p;a.b=[].concat(this.b);a.a={};for(var b in this.a)a.a[b]=this.a[b];return a};A.put=function(a,b){Jd(this);var c=this.a[a],d=c.length;if(1==d)this.b[c[0]]=b;else for(;d--;)this.b[c[d]]=b};function Kd(a){var b=Ld,c;for(c in a)b.put(c,a[c]);return b.toString()}A.toString=function(){Jd(this);return this.b.join("")};A.da=function(){var a={},b;for(b in this.a)a[b]=s;return a};function Md(a){a=a.className;return E(a)&&a.match(/\S+/g)||[]}function Nd(a,b){for(var c=Md(a),d=c,e=qb(arguments,1),f=0;f<e.length;f++)kb(d,e[f])||d.push(e[f]);a.className=c.join(" ")}function Od(a,b){var c=Md(a),c=Pd(c,qb(arguments,1));a.className=c.join(" ")}function Pd(a,b){return gb(a,function(a){return!kb(b,a)})}function Qd(a,b,c){for(var d=Md(a),e=w,f=0;f<d.length;f++)d[f]==b&&(pb(d,f--,1),e=p);e&&(d.push(c),a.className=d.join(" "))};function Rd(a,b,c){return Math.min(Math.max(a,b),c)};function V(a,b){this.x=D(a)?a:0;this.y=D(b)?b:0}V.prototype.clone=function(){return new V(this.x,this.y)};function Sd(a,b){return new V(a.x-b.x,a.y-b.y)}V.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};V.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};V.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function Td(a,b){this.width=a;this.height=b}A=Td.prototype;A.clone=function(){return new Td(this.width,this.height)};A.Ha=function(){return!(this.width*this.height)};A.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};A.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};A.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var Ud=!M||Ib(9);!N&&!M||M&&Ib(9)||N&&P("1.9.1");M&&P("9");function Vd(a){return a?new Wd(Xd(a)):Fa||(Fa=new Wd)}function Yd(a){return E(a)?document.getElementById(a):a}function Zd(a,b){Ua(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in $d?a.setAttribute($d[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})}
var $d={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function ae(a){a=a.document.documentElement;return new Td(a.clientWidth,a.clientHeight)}function be(a){return a.parentWindow||a.defaultView}
function ce(a,b,c){function d(c){c&&b.appendChild(E(c)?a.createTextNode(c):c)}for(var e=2;e<c.length;e++){var f=c[e];!la(f)||na(f)&&0<f.nodeType?d(f):fb(de(f)?nb(f):f,d)}}function ee(a,b){var c=a.createElement("div");M?(c.innerHTML="<br>"+b,c.removeChild(c.firstChild)):c.innerHTML=b;if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(var d=a.createDocumentFragment();c.firstChild;)d.appendChild(c.firstChild);return d}
function fe(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a}function Xd(a){return 9==a.nodeType?a:a.ownerDocument||a.document}function de(a){if(a&&"number"==typeof a.length){if(na(a))return"function"==typeof a.item||"string"==typeof a.item;if(ma(a))return"function"==typeof a.item}return w}
function ge(a,b){if(!b)return s;var c=b?b.toUpperCase():s;return he(a,function(a){return(!c||a.nodeName==c)&&p})}function he(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return s}function Wd(a){this.a=a||B.document||document}A=Wd.prototype;A.l=function(a){return E(a)?this.a.getElementById(a):a};function ie(a){return ae(be(a.a)||window)}
A.xe=function(a,b,c){var d=this.a,e=arguments,f=e[0],g=e[1];if(!Ud&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',J(g.name),'"');if(g.type){f.push(' type="',J(g.type),'"');var h={};$a(h,g);delete h.type;g=h}f.push(">");f=f.join("")}f=d.createElement(f);g&&(E(g)?f.className=g:ka(g)?f.className=g.join(" "):Zd(f,g));2<e.length&&ce(d,f,e);return f};A.createElement=function(a){return this.a.createElement(a)};A.createTextNode=function(a){return this.a.createTextNode(String(a))};
function je(a){var b=a.a;a=O?b.body||b.documentElement:b.documentElement;b=be(b);return M&&P("10")&&b.pageYOffset!=a.scrollTop?new V(a.scrollLeft,a.scrollTop):new V(b.pageXOffset||a.scrollLeft,b.pageYOffset||a.scrollTop)}A.we=function(a,b){a.appendChild(b)};A.Be=function(a){a&&a.parentNode&&a.parentNode.removeChild(a)};A.contains=fe;function ke(){return O?"Webkit":N?"Moz":M?"ms":Bb?"O":s};function le(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}A=le.prototype;A.getHeight=function(){return this.bottom-this.top};A.clone=function(){return new le(this.top,this.right,this.bottom,this.left)};A.contains=function(a){return this&&a?a instanceof le?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:w};
A.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};A.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};A.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};function me(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}A=me.prototype;A.clone=function(){return new me(this.left,this.top,this.width,this.height)};A.contains=function(a){return a instanceof me?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};
A.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};A.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};A.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function ne(a,b,c){t:if(c=Ra(c),a.style[c]===n){var d=ke()+Sa(c);if(a.style[d]!==n){c=d;break t}}c&&(a.style[c]=b)}function oe(a,b){var c=Xd(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,s))?c[b]||c.getPropertyValue(b)||"":""}function pe(a,b){return oe(a,b)||(a.currentStyle?a.currentStyle[b]:s)||a.style&&a.style[b]}function qe(a,b,c){var d,e=N&&(yb||Eb)&&P("1.9");b instanceof V?(d=b.x,b=b.y):(d=b,b=c);a.style.left=re(d,e);a.style.top=re(b,e)}
function se(a){return new V(a.offsetLeft,a.offsetTop)}function te(a){a=a?Xd(a):document;var b;(b=!M||Ib(9))||(Vd(a),b=p);return b?a.documentElement:a.body}function ue(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}M&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function ve(a){if(M&&!Ib(8))return a.offsetParent;var b=Xd(a),c=pe(a,"position"),d="fixed"==c||"absolute"==c;for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(c=pe(a,"position"),d=d&&"static"==c&&a!=b.documentElement&&a!=b.body,!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return s}
function we(a){var b=new le(0,Infinity,Infinity,0),c=Vd(a),d=c.a.body,e=c.a.documentElement,f;f=c.a;for(f=O?f.body||f.documentElement:f.documentElement;a=ve(a);)if(!(M&&0==a.clientWidth||O&&0==a.clientHeight&&a==d)&&a!=d&&a!=e&&"visible"!=pe(a,"overflow")){var g=xe(a),h;h=a;if(N&&!P("1.9")){var l=parseFloat(oe(h,"borderLeftWidth"));if(ye(h))var m=h.offsetWidth-h.clientWidth-l-parseFloat(oe(h,"borderRightWidth")),l=l+m;h=new V(l,parseFloat(oe(h,"borderTopWidth")))}else h=new V(h.clientLeft,h.clientTop);
g.x+=h.x;g.y+=h.y;b.top=Math.max(b.top,g.y);b.right=Math.min(b.right,g.x+a.clientWidth);b.bottom=Math.min(b.bottom,g.y+a.clientHeight);b.left=Math.max(b.left,g.x)}d=f.scrollLeft;e=f.scrollTop;b.left=Math.max(b.left,d);b.top=Math.max(b.top,e);c=ie(c);b.right=Math.min(b.right,d+c.width);b.bottom=Math.min(b.bottom,e+c.height);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:s}
function xe(a){var b,c=Xd(a),d=pe(a,"position"),e=N&&c.getBoxObjectFor&&!a.getBoundingClientRect&&"absolute"==d&&(b=c.getBoxObjectFor(a))&&(0>b.screenX||0>b.screenY),f=new V(0,0),g=te(c);if(a==g)return f;if(a.getBoundingClientRect)b=ue(a),a=je(Vd(c)),f.x=b.left+a.x,f.y=b.top+a.y;else if(c.getBoxObjectFor&&!e)b=c.getBoxObjectFor(a),a=c.getBoxObjectFor(g),f.x=b.screenX-a.screenX,f.y=b.screenY-a.screenY;else{b=a;do{f.x+=b.offsetLeft;f.y+=b.offsetTop;b!=a&&(f.x+=b.clientLeft||0,f.y+=b.clientTop||0);if(O&&
"fixed"==pe(b,"position")){f.x+=c.body.scrollLeft;f.y+=c.body.scrollTop;break}b=b.offsetParent}while(b&&b!=a);if(Bb||O&&"absolute"==d)f.y-=c.body.offsetTop;for(b=a;(b=ve(b))&&b!=c.body&&b!=g;)f.x-=b.scrollLeft,Bb&&"TR"==b.tagName||(f.y-=b.scrollTop)}return f}function re(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a}
function ze(a){var b=Ae;if("none"!=pe(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}function Ae(a){var b=a.offsetWidth,c=a.offsetHeight,d=O&&!b&&!c;return D(b)&&!d||!a.getBoundingClientRect?new Td(b,c):(a=ue(a),new Td(a.right-a.left,a.bottom-a.top))}function Be(a){var b=xe(a);a=ze(a);return new me(b.x,b.y,a.width,a.height)}
function Ce(a,b){a.style.display=b?"":"none"}function ye(a){return"rtl"==pe(a,"direction")}function De(a,b){if(/^\d+px?$/.test(b))return parseInt(b,10);var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b;var e=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return e}function Ee(a,b){var c=a.currentStyle?a.currentStyle[b]:s;return c?De(a,c):0}
function Fe(a,b){if(M){var c=Ee(a,b+"Left"),d=Ee(a,b+"Right"),e=Ee(a,b+"Top"),f=Ee(a,b+"Bottom");return new le(e,d,f,c)}c=oe(a,b+"Left");d=oe(a,b+"Right");e=oe(a,b+"Top");f=oe(a,b+"Bottom");return new le(parseFloat(e),parseFloat(d),parseFloat(f),parseFloat(c))}var Ge={thin:2,medium:4,thick:6};function He(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:s))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:s;return c in Ge?Ge[c]:De(a,c)}var Ie=/matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;var Je=0;function Ke(){}Ke.prototype.a=function(a){return a};function Le(){var a=new Ke;F(a.a,a)};Le();var Me="StopIteration"in B?B.StopIteration:Error("StopIteration");function Ne(){}Ne.prototype.next=function(){k(Me)};Ne.prototype.Oe=function(){return this};function Oe(a,b){this.b={};this.a=[];this.d=this.c=0;var c=arguments.length;if(1<c){c%2&&k(Error("Uneven number of arguments"));for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof Oe?(c=a.da(),d=a.ha()):(c=Wa(a),d=Va(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}A=Oe.prototype;A.md=y("c");A.ha=function(){Pe(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};A.da=function(){Pe(this);return this.a.concat()};
A.u=function(a,b){if(this===a)return p;if(this.c!=a.md())return w;var c=b||Qe;Pe(this);for(var d,e=0;d=this.a[e];e++)if(!c(this.get(d),a.get(d)))return w;return p};function Qe(a,b){return a===b}A.Ha=function(){return 0==this.c};A.remove=function(a){return Re(this.b,a)?(delete this.b[a],this.c--,this.d++,this.a.length>2*this.c&&Pe(this),p):w};
function Pe(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Re(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],Re(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}}A.get=function(a,b){return Re(this.b,a)?this.b[a]:b};A.set=function(a,b){Re(this.b,a)||(this.c++,this.a.push(a),this.d++);this.b[a]=b};A.forEach=function(a,b){for(var c=this.da(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};A.clone=function(){return new Oe(this)};
A.Oe=function(a){Pe(this);var b=0,c=this.a,d=this.b,e=this.d,f=this,g=new Ne;g.next=function(){for(;;){e!=f.d&&k(Error("The map has changed since the iterator was created"));b>=c.length&&k(Me);var g=c[b++];return a?g:d[g]}};return g};function Re(a,b){return Object.prototype.hasOwnProperty.call(a,b)};function Se(a){if("function"==typeof a.ha)return a.ha();if(E(a))return a.split("");if(la(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Va(a)}function Te(a,b){if("function"==typeof a.forEach)a.forEach(b,n);else if(la(a)||E(a))fb(a,b,n);else{var c;if("function"==typeof a.da)c=a.da();else if("function"!=typeof a.ha)if(la(a)||E(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Wa(a);else c=n;for(var d=Se(a),e=d.length,f=0;f<e;f++)b.call(n,d[f],c&&c[f],a)}};var Ue=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Ve(a){if(We){We=w;var b=B.location;if(b){var c=b.href;c&&(c=(c=Ve(c)[3]||s)&&decodeURIComponent(c))&&c!=b.hostname&&(We=p,k(Error()))}}return a.match(Ue)}var We=O;function Xe(a){var b=Ve(a);a=b[1];var c=b[2],d=b[3],b=b[4],e="";a&&(e+=a+":");d&&(e+="//",c&&(e+=c+"@"),e+=d,b&&(e+=":"+b));return e}
function Ye(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=n)}return a.join("")}function Ze(a,b,c){if(ka(b))for(var d=0;d<b.length;d++)Ze(a,String(b[d]),c);else b!=s&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}function $e(a,b,c){for(c=c||0;c<b.length;c+=2)Ze(b[c],b[c+1],a);return a}function af(a,b){return Ye(2==arguments.length?$e([a],arguments[1],0):$e([a],arguments,1))}
function bf(a,b,c){a=[a,"&",b];c!=s&&a.push("=",encodeURIComponent(String(c)));return Ye(a)}var cf=/#|$/;function df(a,b){var c;if(a instanceof df)this.za=D(b)?b:a.za,ef(this,a.ia),this.xb=a.xb,this.Wa=a.Wa,ff(this,a.wb),this.vb=a.vb,gf(this,a.a.clone()),this.ub=a.ub;else if(a&&(c=Ve(String(a)))){this.za=!!b;ef(this,c[1]||"",p);var d=c[2]||"";this.xb=d?decodeURIComponent(d):"";this.Wa=(d=c[3]||"")?decodeURIComponent(d):"";ff(this,c[4]);this.vb=(d=c[5]||"")?decodeURIComponent(d):"";gf(this,c[6]||"",p);this.ub=(c=c[7]||"")?decodeURIComponent(c):""}else this.za=!!b,this.a=new hf(s,0,this.za)}A=df.prototype;
A.ia="";A.xb="";A.Wa="";A.wb=s;A.vb="";A.ub="";A.za=w;A.toString=function(){var a=[],b=this.ia;b&&a.push(jf(b,kf),":");if(b=this.Wa){a.push("//");var c=this.xb;c&&a.push(jf(c,kf),"@");a.push(encodeURIComponent(String(b)));b=this.wb;b!=s&&a.push(":",String(b))}if(b=this.vb)this.Wa&&"/"!=b.charAt(0)&&a.push("/"),a.push(jf(b,"/"==b.charAt(0)?lf:mf));(b=this.a.toString())&&a.push("?",b);(b=this.ub)&&a.push("#",jf(b,nf));return a.join("")};A.clone=function(){return new df(this)};
function ef(a,b,c){a.ia=c?b?decodeURIComponent(b):"":b;a.ia&&(a.ia=a.ia.replace(/:$/,""))}function ff(a,b){b?(b=Number(b),(isNaN(b)||0>b)&&k(Error("Bad port number "+b)),a.wb=b):a.wb=s}function gf(a,b,c){b instanceof hf?(a.a=b,of(a.a,a.za)):(c||(b=jf(b,pf)),a.a=new hf(b,0,a.za))}function jf(a,b){return E(a)?encodeURI(a).replace(b,qf):s}function qf(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var kf=/[#\/\?@]/g,mf=/[\#\?:]/g,lf=/[\#\?]/g,pf=/[\#\?@]/g,nf=/#/g;
function hf(a,b,c){this.a=a||s;this.b=!!c}function rf(a){if(!a.D&&(a.D=new Oe,a.U=0,a.a))for(var b=a.a.split("&"),c=0;c<b.length;c++){var d=b[c].indexOf("="),e=s,f=s;0<=d?(e=b[c].substring(0,d),f=b[c].substring(d+1)):e=b[c];e=decodeURIComponent(e.replace(/\+/g," "));e=sf(a,e);a.add(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}}A=hf.prototype;A.D=s;A.U=s;A.md=function(){rf(this);return this.U};
A.add=function(a,b){rf(this);this.a=s;a=sf(this,a);var c=this.D.get(a);c||this.D.set(a,c=[]);c.push(b);this.U++;return this};A.remove=function(a){rf(this);a=sf(this,a);return Re(this.D.b,a)?(this.a=s,this.U-=this.D.get(a).length,this.D.remove(a)):w};A.Ha=function(){rf(this);return 0==this.U};function tf(a,b){rf(a);b=sf(a,b);return Re(a.D.b,b)}A.da=function(){rf(this);for(var a=this.D.ha(),b=this.D.da(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
A.ha=function(a){rf(this);var b=[];if(E(a))tf(this,a)&&(b=mb(b,this.D.get(sf(this,a))));else{a=this.D.ha();for(var c=0;c<a.length;c++)b=mb(b,a[c])}return b};A.set=function(a,b){rf(this);this.a=s;a=sf(this,a);tf(this,a)&&(this.U-=this.D.get(a).length);this.D.set(a,[b]);this.U++;return this};A.get=function(a,b){var c=a?this.ha(a):[];return 0<c.length?String(c[0]):b};
A.toString=function(){if(this.a)return this.a;if(!this.D)return"";for(var a=[],b=this.D.da(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.ha(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.a=a.join("&")};A.clone=function(){var a=new hf;a.a=this.a;this.D&&(a.D=this.D.clone(),a.U=this.U);return a};function sf(a,b){var c=String(b);a.b&&(c=c.toLowerCase());return c}
function of(a,b){b&&!a.b&&(rf(a),a.a=s,a.D.forEach(function(a,b){var e=b.toLowerCase();b!=e&&(this.remove(b),this.remove(e),0<a.length&&(this.a=s,this.D.set(sf(this,e),nb(a)),this.U+=a.length))},a));a.b=b};var uf=/^(https?:\/\/[^/]*)\/calendar(\/((hosted)|(a)|(b))\/[^/]*)?/,vf="undefined"!=typeof window?window.location.href:"";vf.replace(/#.*/,"");function wf(a){return a&&a.match(/^(?:https?:)?\/\/(?:[^:\/]+\.)?google\.com(?::\d+)?(?:\/.*$|$)/)?a.replace(/^https?:\/\//i,"//"):a}function xf(){var a;return(a=(a=vf.match(uf))&&"b"==a[3]?[a[1]+"/calendar",a[2]]:s)?parseInt(a[1].split("/")[2],10):s}
function yf(a){a=a||"";a=a instanceof df?a.clone():new df(a,n);return"http"!=a.ia&&"https"!=a.ia&&""!=a.ia?"":a.toString()};function zf(a,b){this.b=a;this.ma=yf(b)}var Af=/^[a-zA-Z0-9_]+$/;function Bf(a){return!!a.ma&&"CHIP"!=a.yd()};function Cf(a,b,c,d,e){this.n=a;this.p=b;this.G=c;a=b.i();this.oa=isNaN(b.hour);this.Aa=c.i()>=Tc(a);this.g=!this.oa&&0==hd(c);this.f=(a<<1)+!this.Aa+a%1;this.h=d?d:0;this.e=e||{}}Cf.prototype.a="";Cf.prototype.c="";Le();var Df={invited:0,accepted:1,declined:2,tentative:3,unknown:-1},Ef={needsAction:0,accepted:1,declined:2,tentative:3};Cf.prototype.b=-1;bb(0,1,2,3,6);A=Cf.prototype;A.getId=y("n");A.A=y("p");function Ff(a,b){return b(a.A().i(),a.G.i())}A.Za=function(){return 1==this.h};
A.setTitle=ba("a");A.Q=ca(s);A.u=function(a){return this==a?p:!!a&&a.getId()==this.getId()};function Gf(a,b,c){return b.f-c.f||c.G.i()-b.G.i()||a(b,c)||Ga(b.a,c.a)};var Hf=M&&!Ib(8)?'<table style="table-layout:fixed" cellpadding=0 cellspacing=0><tr><td>':"",If=M&&!Ib(8)?"</tr></td></table>":"",Jf=0;function Kf(){if(Jf)return Jf;var a=document.createElement("div");a.style.cssText="visibility:hidden;overflow-y:scroll;position:absolute;top:0;width:100px;height:100px";document.body.appendChild(a);Jf=a.offsetWidth-a.clientWidth||18;document.body.removeChild(a);return Jf};function Lf(a){return 32>=a||4096<=a&&(8192<=a&&8198>=a||8200<=a&&8203>=a||5760==a||6158==a||8232==a||8233==a||8287==a||12288==a)}function Mf(a){if(!(15>a.length)){for(var b=[],c=0,d=0,e=0,f=0,g=0;g<a.length;g++){var f=a.charCodeAt(g),h;if(h=768<=f)h=!(1024<=f&&1315>f);15<=c&&!Lf(f)&&!h&&(b.push(a.substring(e,g),Nf),e=g,c=0);d?62==f&&60==d?d=0:59==f&&38==d&&(d=0,c++):60==f||38==f?d=f:Lf(f)?c=0:8204<=f&&8207>=f||8234<=f&&8238>=f||c++}b.push(a.substr(e));a=b.join("")}return a}
var Of=M&&P(8),Nf=O?"<wbr></wbr>":Bb?"&shy;":Of?"&#8203;":"<wbr>";function Pf(a,b,c,d,e,f){var g,h;if(g=c.offsetParent){var l="HTML"==g.tagName||"BODY"==g.tagName;l&&"static"==pe(g,"position")||(h=xe(g),l||(l=(l=ye(g))&&N?-g.scrollLeft:!l||M&&P("8")||"visible"==pe(g,"overflowX")?g.scrollLeft:g.scrollWidth-g.clientWidth-g.scrollLeft,h=Sd(h,new V(l,g.scrollTop))))}g=h||new V;h=Be(a);if(l=we(a)){var m=new me(l.left,l.top,l.right-l.left,l.bottom-l.top),l=Math.max(h.left,m.left),r=Math.min(h.left+h.width,m.left+m.width);if(l<=r){var q=Math.max(h.top,m.top),m=Math.min(h.top+
h.height,m.top+m.height);q<=m&&(h.left=l,h.top=q,h.width=r-l,h.height=m-q)}}l=Vd(a);r=Vd(c);if(l.a!=r.a){var l=l.a.body,r=be(r.a),q=new V(0,0),m=(m=Xd(l))?be(m):window,t=l;do{var u;if(m==r)u=xe(t);else{u=t;var x=n;if(u.getBoundingClientRect)x=ue(u),x=new V(x.left,x.top);else var x=je(Vd(u)),v=xe(u),x=new V(v.x-x.x,v.y-x.y);v=n;if(N&&!P(12)){v=n;v=n;i:{var v=u,C=Ra("transform");if(v.style[C]===n&&(C=ke()+Sa(C),v.style[C]!==n)){v=(O?"-webkit":N?"-moz":M?"-ms":Bb?"-o":s)+"-transform";break i}v="transform"}v=
(v=pe(u,v)||pe(u,"transform"))?(u=v.match(Ie))?new V(parseFloat(u[1]),parseFloat(u[2])):new V(0,0):new V(0,0);v=new V(x.x+v.x,x.y+v.y)}else v=x;u=v}q.x+=u.x;q.y+=u.y}while(m&&m!=r&&(t=m.frameElement)&&(m=m.parent));l=Sd(q,xe(l));h.left+=l.x;h.top+=l.y}a=Qf(a,b);b=new V(a&2?h.left+h.width:h.left,a&1?h.top+h.height:h.top);b=Sd(b,g);var z;f&&(z=we(c))&&(z.top-=g.y,z.right-=g.x,z.bottom-=g.y,z.left-=g.x);t:{a=z;z=b.clone();g=Qf(c,d);b=ze(c);d=b.clone();if(e||0!=g)g&2?z.x-=d.width+(e?e.right:0):e&&(z.x+=
e.left),g&1?z.y-=d.height+(e?e.bottom:0):e&&(z.y+=e.top);if(f&&(a?(e=z,g=0,65==(f&65)&&(e.x<a.left||e.x>=a.right)&&(f&=-2),132==(f&132)&&(e.y<a.top||e.y>=a.bottom)&&(f&=-5),e.x<a.left&&f&1&&(e.x=a.left,g|=1),e.x<a.left&&e.x+d.width>a.right&&f&16&&(d.width=Math.max(d.width-(e.x+d.width-a.right),0),g|=4),e.x+d.width>a.right&&f&1&&(e.x=Math.max(a.right-d.width,a.left),g|=1),f&2&&(g=g|(e.x<a.left?16:0)|(e.x+d.width>a.right?32:0)),e.y<a.top&&f&4&&(e.y=a.top,g|=2),e.y<=a.top&&e.y+d.height<a.bottom&&f&32&&
(d.height=Math.max(d.height-(a.top-e.y),0),e.y=a.top,g|=8),e.y>=a.top&&e.y+d.height>a.bottom&&f&32&&(d.height=Math.max(d.height-(e.y+d.height-a.bottom),0),g|=8),e.y+d.height>a.bottom&&f&4&&(e.y=Math.max(a.bottom-d.height,a.top),g|=2),f&8&&(g=g|(e.y<a.top?64:0)|(e.y+d.height>a.bottom?128:0)),f=g):f=256,f&496))break t;qe(c,z);b==d||b&&d&&b.width==d.width&&b.height==d.height||(Vd(Xd(c)),!M||P("8")?(c=c.style,N?c.MozBoxSizing="border-box":O?c.WebkitBoxSizing="border-box":c.boxSizing="border-box",c.width=
Math.max(d.width,0)+"px",c.height=Math.max(d.height,0)+"px"):(f=c.style,e=Fe(c,"padding"),M&&!Ib(9)?(z=He(c,"borderLeft"),a=He(c,"borderRight"),b=He(c,"borderTop"),c=He(c,"borderBottom"),c=new le(b,a,c,z)):(z=oe(c,"borderLeftWidth"),a=oe(c,"borderRightWidth"),b=oe(c,"borderTopWidth"),c=oe(c,"borderBottomWidth"),c=new le(parseFloat(b),parseFloat(a),parseFloat(c),parseFloat(z))),f.pixelWidth=d.width-c.left-e.left-e.right-c.right,f.pixelHeight=d.height-c.top-e.top-e.bottom-c.bottom))}}
function Qf(a,b){return(b&4&&ye(a)?b^2:b)&-5};function Rf(){}Rf.prototype.a=aa();function Sf(a,b,c){this.element=a;this.b=b;this.c=c}I(Sf,Rf);Sf.prototype.a=function(a,b,c){Pf(this.element,this.b,a,b,c,this.c)};function Tf(a){this.a=a;this.b={}}I(Tf,K);var Uf=[];A=Tf.prototype;A.B=function(a,b,c,d){ka(b)||(b&&(Uf[0]=b.toString()),b=Uf);for(var e=0;e<b.length;e++){var f=Q(a,b[e],c||this.handleEvent,d||w,this.a||this);if(!f)break;this.b[f.Vb]=f}return this};A.bc=function(a,b,c,d){return Vf(this,a,b,c,d)};function Vf(a,b,c,d,e,f){if(ka(c))for(var g=0;g<c.length;g++)Vf(a,b,c[g],d,e,f);else{b=jc(b,c,d||a.handleEvent,e,f||a.a||a);if(!b)return a;a.b[b.Vb]=b}return a}function Wf(a,b,c,d){c.B(b,d,n,a.a||a,a)}
A.Ua=function(a,b,c,d,e){if(ka(b))for(var f=0;f<b.length;f++)this.Ua(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.a||this,c=dc(c),d=!!d,b=Tb(a)?a.Va(b,c,d,e):a?(a=fc(a))?a.Va(b,c,d,e):s:s,b&&(lc(b),delete this.b[b.Vb]);return this};function Xf(a){Ua(a.b,lc);a.b={}}A.o=function(){Tf.s.o.call(this);Xf(this)};A.handleEvent=function(){k(Error("EventHandler.handleEvent not implemented"))};function Yf(a){switch(a){case 61:return 187;case 59:return 186;case 173:return 189;case 224:return 91;case 0:return 224;default:return a}};function Zf(a,b,c){ma(a)?c&&(a=F(a,c)):a&&"function"==typeof a.handleEvent?a=F(a.handleEvent,a):k(Error("Invalid listener argument"));return 2147483647<b?-1:B.setTimeout(a,b||0)};function $f(a,b){R.call(this);this.a=new Tf(this);var c=a||s;ag(this);this.P=c;b&&(this.Ka=b)}I($f,R);A=$f.prototype;A.P=s;A.Rc=p;A.Qc=s;A.ga=w;A.Pb=-1;A.Ob=-1;A.eb=w;A.Hb=p;A.Ka="toggle_display";A.Z=y("Ka");A.l=y("P");function bg(a){ag(a);a.Rc=p}function ag(a){a.ga&&k(Error("Can not change this state of the popup while showing."))}A.Ia=function(){return this.ga||150>G()-this.Ob};
A.T=function(a){this.c&&this.c.stop();this.b&&this.b.stop();if(a){if(!this.ga&&this.dispatchEvent("beforeshow")){this.P||k(Error("Caller must call setElement before trying to show the popup"));this.Pa();a=Xd(this.P);this.eb&&this.a.B(a,"keydown",this.ke,p);if(this.Rc)if(this.a.B(a,"mousedown",this.Tc,p),M){var b;try{b=a.activeElement}catch(c){}for(;b&&"IFRAME"==b.nodeName;){try{var d=b.contentDocument||b.contentWindow.document}catch(e){break}a=d;b=a.activeElement}this.a.B(a,"mousedown",this.Tc,p);
this.a.B(a,"deactivate",this.Sc)}else this.a.B(a,"blur",this.Sc);"toggle_display"==this.Ka?(this.P.style.visibility="visible",Ce(this.P,p)):"move_offscreen"==this.Ka&&this.Pa();this.ga=p;this.Pb=G();this.Ob=-1;this.c?(jc(this.c,"end",this.Uc,w,this),this.c.play()):this.Uc()}}else cg(this)};A.Pa=ha;function cg(a,b){if(!a.ga||!a.dispatchEvent({type:"beforehide",target:b}))return w;a.a&&Xf(a.a);a.ga=w;a.Ob=G();a.b?(jc(a.b,"end",ta(a.fd,b),w,a),a.b.play()):a.fd(b);return p}
A.fd=function(a){"toggle_display"==this.Ka?this.Ne():"move_offscreen"==this.Ka&&(this.P.style.top="-10000px");this.dispatchEvent({type:"hide",target:a})};A.Ne=function(){this.P.style.visibility="hidden";Ce(this.P,w)};A.Uc=function(){this.dispatchEvent("show")};A.Tc=function(a){a=a.target;fe(this.P,a)||dg(this,a)||150>G()-this.Pb||cg(this,a)};A.ke=function(a){27==a.keyCode&&cg(this,a.target)&&(a.preventDefault(),a.stopPropagation())};
A.Sc=function(a){if(this.Hb){var b=Xd(this.P);if("undefined"!=typeof document.activeElement){if(a=b.activeElement,!a||fe(this.P,a)||"BODY"==a.tagName)return}else if(a.target!=b)return;150>G()-this.Pb||cg(this)}};function dg(a,b){return hb(a.Qc||[],function(a){return b===a||fe(a,b)})}A.o=function(){$f.s.o.call(this);this.a.C();Ta(this.c);Ta(this.b);delete this.P;delete this.a;delete this.Qc};function eg(a,b){this.e=4;this.d=b||n;$f.call(this,a)}I(eg,$f);eg.prototype.Pa=function(){if(this.d){var a=!this.ga&&"move_offscreen"!=this.Z(),b=this.l();a&&(b.style.visibility="hidden",Ce(b,p));this.d.a(b,this.e,this.h);a&&Ce(b,w)}};function fg(a,b,c){this.c=[];this.b=b||gg;this.d=c||"gcal$func$";this.f=a}I(fg,K);var gg=B.gcal$func$={},hg=0,ig=new fg;fg.prototype.o=function(){for(var a=0,b=this.c.length;a<b;++a)delete this.b[this.c[a]];fg.s.o.call(this)};fg.prototype.a=function(a,b){var c=b||this.f;c&&(a=F(a,c));c=hg++;this.b[c]=a;this.c.push(c);return this.d+"["+c+"]"};fg.prototype.e=function(a){delete this.b[a.substring(this.d.length+1,a.length-1)]};F(ig.a,ig);F(ig.e,ig);function jg(a,b){this.a=a;this.b=Vd(a);this.c=new fg(this);this.d=b||30000001}I(jg,K);A=jg.prototype;A.H=s;A.X=s;A.o=function(){this.c.C();if(this.X){var a=this.X;if(a)if(Tb(a))a.Y&&$b(a.Y);else if(a=fc(a)){var b=0,c;for(c in a.a)for(var d=a.a[c].concat(),e=0;e<d.length;++e)lc(d[e])&&++b}this.X.C()}jg.s.o.call(this)};A.ge=function(){this.b.Be(this.H)};
A.render=function(a,b,c,d,e,f){if(!this.H){kg.put("closeCallback",this.c.a(this.lb));kg.put("zIndex",this.d);this.H=ee(this.b.a,kg.toString());this.X=new eg(this.H);bg(this.X);var g=this.X;ag(g);g.eb=p;this.X.Hb=w;Q(this.X,"beforehide",this.ge,w,this)}this.X.T(w);this.H.style.left="0";this.H.style.top="0";this.a.appendChild(this.H);this.H.style.display="";this.H.style.width=c?c+"px":"";this.H.childNodes[1].style.height=d?d+"px":"";this.H.childNodes[1].innerHTML=f;e&&0<e.length?(this.H.childNodes[0].childNodes[1].innerHTML=
e,this.H.childNodes[0].style.display=""):this.H.childNodes[0].style.display="none";d=ie(this.b);e=d.width;f=d.height;g=xe(this.a);c=this.H.offsetWidth;d=this.H.offsetHeight;a=lg(a,e-c-10);c=b;b=lg(b,f-d-10);c!=b&&(a+=16);a-=g.x;b-=g.y;this.H.style.left=a+"px";this.H.style.top=b+"px";this.X.T(p)};A.lb=function(){this.X&&this.X.T(w)};function lg(a,b){return Math.min(Math.max(a,10),Math.max(b,10))}var kg=new U('<div class=cc style=z-index:${zIndex}><div class=cc-titlebar><div class=cc-close onclick="${closeCallback}();"></div><div class=cc-title></div></div><div class=cc-body></div></div>');var mg,ng={"*":"http://maps.google.com/maps"};var og=new U('<${wcTag} frameborder=0 ${wcScrolling}src="${wcUrl}" class="wc-root"></${wcTag}>');function pg(a,b,c,d,e){R.call(this);this.a=b;this.d=e||Vd();this.fa=c;this.selection=d;d.K(qg(this.a.a));Q(d,"change",this.Fb,w,this);this.aa=a;this.h=new fg(this);this.c={};this.n=new jg(rg(this.aa));t:{for(b=0;b<a.h.length;b++)if(a.h[b]===this)break t;a.h.push(this);this.na(a);this.register();sg(a);tg(a)}}I(pg,R);A=pg.prototype;A.pa="CalendarView";A.o=function(){this.h.C();pg.s.o.call(this)};A.Z=y("fa");A.Fb=function(){this.render()};A.ud=function(){this.selection.Ma(1)};A.td=function(){this.selection.Ma(-1)};
A.O=function(){return new T(this.selection.a,$c(this.selection.b))};A.render=function(){this.n.lb()};A.register=function(){this.ab=this.h.a(this.gd)};A.ae=function(a){return 2!=a.b};
function ug(a,b){var c=[],d=vg(a.a.b,new T(b.A(),b.G));wg.put("label","When");wg.put("value",d);wg.put("valueClass","event-when");c.push(wg.toString());if(d=b.c){wg.put("label","Where");var e=J(d),f=ng["*"]+"?hl="+encodeURIComponent("en")+"&amp;q="+encodeURIComponent(d);mg&&(f=mg.replace("{q}",encodeURIComponent(d)).replace("{hl}","en").replace("{googUrl}",encodeURIComponent(f)));wg.put("value",Pa(e,' (<a href="',f,'" class="menu-link" target=_blank>map</a>)'));wg.put("valueClass","event-where");
c.push(wg.toString())}if(d=b.d||"")wg.put("label","Description"),wg.put("value",Mf(d)),wg.put("valueClass","event-description"),c.push(wg.toString());return c.join(" ")}
A.gd=function(a,b){var c=this.c[a],d=this.n,e=Be(b),f=J(c.a),g=c.Q();if(g.ua()){var h=wf(g.ua()),l,m=c.A(),r=c.G,q=g.ua(),c=g.Z();if(1==c)if(1!=g.Z())q=s;else{h="http://www.gmodules.com/gadgets/ifr?url="+encodeURIComponent(g.ua())+"&synd=calendar&w="+g.rb()+"&h="+g.getHeight()+"&up_startdate="+m.m().toString()+"&up_enddate="+r.m().toString()+"&lang="+"en".replace("_","-");if(m=g.Zc())for(l in m)l.match(Af)&&(h+="&up_"+l+"="+encodeURIComponent(m[l]));q=h}else q=h;og.put("wcTag",3==c?"img":"iframe");
og.put("wcScrolling",1==c?'scrolling="no" ':"");og.put("wcUrl",J(q));l=og.toString();g.rb();g.getHeight();c=document.body;c!=d.a&&(d.H&&d.lb(),d.a=c);d.render(e.left,e.top+e.height,g.rb(),g.getHeight(),f,l)}};function xg(a,b){for(var c=0;c<b.length;c++)a.c[oa(b[c])]=b[c]}function yg(a,b){var c=Fe(a,"margin"),d=Fe(a,"padding"),c=Math.max(1,b-c.top-d.top-c.bottom-d.bottom);a.style.height=c+"px"}var wg=new U('<div class="detail-item"><span class="event-details-label">${label}</span><span class="${valueClass}">${value}</span></div>');
function zg(a,b){var c=a.a.g,d=new T(b.A(),b.G),e=b.d||"";e&&1024<e.length&&(e=e.substring(0,1024)+"...");return af(c.a+"/event","action","TEMPLATE","hl","en","text",b.a,"dates",d,"location",b.c,"ctz",c.e,"details",e)}function Ag(a,b,c){var d=a.aa;Bg(a.aa,b,function(e){var f;if(f=d.d==a)f=a.O(),f=f.start.i()<=b.start.i()&&f.end.i()>=b.end.i();f&&c(e)})}pg.prototype.Fa=function(){this.n.lb()};function Cg(a,b,c){this.b=Math.max(c,1);this.c=a;this.a=b;this.a.push(this.b);this.d=this.c.length}function Dg(a,b,c,d){this.a=a;this.c=b;this.offset=c;this.b=d;this.d=this.offset/this.b}function Eg(a,b,c){return new Dg(a.c[b],a.c[b+1],c,a.a[b+1]-a.a[b]||1)}function Fg(a,b,c){var d=0,e=0;D(b)&&(d=rb(a.c,b),0>d?(d=-d-1,d==a.d&&(d--,e=a.b-a.a[d])):c&&(e=(a.a[d+1]-a.a[d])*c));return{index:d,offset:e}}Cg.prototype.Ha=function(){return!this.d};function Gg(a,b,c,d){this.J=d||28;this.g=a.selection.focus;this.f=Hg(this,this.g);this.pa="Agenda";this.k={};this.v=w;this.b=Ig++;this.F=s;this.r=c;pg.call(this,a,b,"agenda",new Cd,a.c)}I(Gg,pg);var Ig=1;A=Gg.prototype;A.Lb=0;A.jb=s;A.ud=function(){var a=Jg(this).scrollTop+parseInt(Jg(this).style.height,10),b=this.d.l("eventContainer"+this.b).offsetHeight;a>=b&&(this.Sa(p),a=b);Kg(this,a)};A.td=function(){var a=Jg(this).scrollTop-parseInt(Jg(this).style.height,10);0>=a&&(this.Sa(w),a=0);Kg(this,a)};
A.O=function(){return new T(this.g,this.f)};A.Rb=function(){return Lg(this.a.b,this.selection.focus)};A.Fb=function(){if(Jg(this)&&(!this.jb||!this.jb.u(this.selection.focus))){var a=this.selection.focus;qg(this.a.a);var b=this.O();b.start.i()<=a.i()&&b.end.i()>a.i()?(this.jb=a,Mg(this).Ha()?b=Ng(this):(b=Mg(this),a=a.t(),a=Fg(b,a,n),b=Eg(b,a.index,a.offset)),Og(this,b,p,w)):(b=new T(a,Hg(this,a)),this.g=b.start.m(),this.f=b.end.m(),Ag(this,b,Pg(this,b,w,w,p,p)))}};
A.render=function(){Gg.s.render.call(this);var a=!this.p;Ag(this,this.O(),Pg(this,this.O(),w,w,w,a))};
function Pg(a,b,c,d,e,f){return function(g){if(!c){var h=rg(a.aa);Qg.put("height","200px");Qg.put("id",a.b);h.innerHTML=Qg.toString();var l=Jg(a),h=parseInt(h.style.height,10);yg(l,h);lc(a.F);a.F=Q(Jg(a),"scroll",a.$d,w,a)}a.dispatchEvent("a");var h=b.end,m=[],r=b.start,l=a.d;c||(a.c={});xg(a,g);var q=a.r,t=a.ab;q.w=a.w;q.d=t;q=f?45:Infinity;for(t=ta(Gf,Rg);r.i()<h.i()&&0<q;){var u=a,x=r,v=[],x=Uc(x.i(),$c(x).i()),u=u.c,C=n;for(C in u){var z=u[C];Ff(z,x)&&v.push(z)}v=gb(v,a.ae,a);v.sort(t);m.push(Sg(a,
r,v));q-=v.length;r=$c(r)}if(!c||d)a.f=r;r=m.join("");a.dispatchEvent("b");h=a.d.l("eventContainer"+a.b);m=O?h.clientHeight:ze(h).height;c?(l=ee(l.a,r),d?h.appendChild(l):h.insertBefore(l,h.firstChild)):h.innerHTML=r;a.e=s;c&&!d&&(l=(O?h.clientHeight:ze(h).height)-m,Kg(a,Jg(a).scrollTop+l));a.dispatchEvent("c");l=a.a.b;h=a.d.l("agenda-underflow-top"+a.b);Tg.put("showingEvents_msg",da(Ug(l,a.g)));Tg.put("functionName",a.Ya);Tg.put("after","false");Tg.put("look_msg","Look for earlier events");h.innerHTML=
Tg.toString();h=Vg(a);Tg.put("showingEvents_msg",ea(Ug(l,a.f)));Tg.put("after","true");Tg.put("look_msg","Look for more");h.innerHTML=Tg.toString();a.p||(a.p=Ng(a));a.v=w;a.r.b(g);e?a.Fb():c||Og(a,a.p,p,p)}}
function Sg(a,b,c){var d=c.length;if(!d)return"";for(var e=[],f,g=0;g<d;g++){var h=c[g];f=["event"];0==g?f.push("first-event"):g==d-1&&f.push("last-event");e.push(a.r.render(h,b,f))}Wg.put("dayString",Lg(a.a.b,b));Wg.put("dayId",b.toString());Wg.put("events",e.join(""));Wg.put("extraClasses","");return Wg.toString()}
function Mg(a){if(a.e)return a.e;var b;b=a.aa.c.a;if(b.querySelectorAll&&b.querySelector)b=b.querySelectorAll("DIV.day");else if(b.getElementsByClassName){b=b.getElementsByClassName("day");for(var c={},d=0,e=0,f;f=b[e];e++)"DIV"==f.nodeName&&(c[d++]=f);c.length=d;b=c}else{b=b.getElementsByTagName("DIV");c={};for(e=d=0;f=b[e];e++){var g=f.className;"function"==typeof g.split&&kb(g.split(/\s+/),"day")&&(c[d++]=f)}c.length=d;b=c}e=[];f=[];for(g=0;g<b.length;g++)"none"!=b[g].style.display&&(c=b[g].id.substring(4),
d=se(b[g]),e.push(wd(c).t()),f.push(d.y));a.e=new Cg(e,f,se(Vg(a)).y);return a.e}A.register=function(){Gg.s.register.call(this);this.w=this.h.a(this.ue);this.Ya=this.h.a(this.Sa)};
A.ue=function(a){var b=this.d.l("details-"+a.id),c=parseInt(a.id.substring(0,a.id.lastIndexOf("-")),10);if(this.k[c])delete this.k[c],Xg(b,a,w);else{if(!b.firstChild){var d=this.c[c],e=ug(this,d),f=d.ta;!d.Q()&&f&&(Yg.put("links",'<a href="'+encodeURI(d.ta)+'" target="_blank">more details&raquo;</a>&nbsp;&nbsp;<a href="'+zg(this,d)+'" target="_blank">copy to my calendar</a>'),e+=Yg.toString());Zg.put("details",e);for(b.innerHTML="<pre>"+Zg.toString()+"</pre>";b.firstChild.firstChild;)b.appendChild(b.firstChild.firstChild);
b.removeChild(b.firstChild);Xg(b,a,p);this.k[c]=1;this.e=s;return}Xg(b,a,p);this.k[c]=1}this.e=s};function Xg(a,b,c){Ce(a,c);c?Qd(b,"event-summary","event-summary-expanded"):Qd(b,"event-summary-expanded","event-summary")}function Kg(a,b){Jg(a).scrollTop=Math.round(b)}function Ng(a){return new Dg(a.selection.focus.t(),n,0,1)}
function Og(a,b,c,d){a.p=b;if(c){c=Mg(a);var e=Fg(c,b.a,b.d);c=Rd(c.a[e.index]+e.offset,c.a[0],c.b);Kg(a,c);a.Lb=c}d&&(b=od(b.c&&30>b.b-b.offset?b.c:b.a),a.jb=b,a.selection.K(b))}
A.$d=function(){var a=Jg(this),b=a.scrollTop,c=this.d.l("agendaScrollContent"+this.b).offsetHeight;if(0!=c&&(b+a.clientHeight>=c?this.Sa(p):0==b&&this.Sa(w),5<Math.abs(this.Lb-b))){if(Mg(this).Ha())a=Ng(this);else{var a=Mg(this),c=Rd(b,a.a[0],a.b),d=rb(a.a,c);0>d?d=-d-2:d==a.d&&d&&d--;a=Eg(a,d,c-a.a[d])}Og(this,a,w,p);this.Lb=b}};
A.Sa=function(a){if(!this.v){this.v=p;var b=this.O();if(a){var c=b.end;this.f=b=Hg(this,b.end)}else c=Hg(this,b.start,p),b=b.start,this.g=c;c=new T(c,b);Ag(this,c,Pg(this,c,p,a,w,a))}};function Hg(a,b,c){c=c?-1:1;b=S(b,c*a.J);a=b.year;var d=b.month,e=ad(a,d,15);return b=0>c?e.i()<=b.i()?e:ad(a,d,1):e.i()>=b.i()?e:ad(a,d,ya(a,d))}function Jg(a){return a.d.l("agendaEventContainer"+a.b)}function Vg(a){return a.d.l("agenda-underflow-bottom"+a.b)}
var Zg=new U('<div class="event-details-inner">${details}</div>'),Yg=new U('<div class="event-links">${links}</div>'),Wg=new U('<div class="day ${extraClasses}" id="day-${dayId}"><div class="date-label">${dayString}</div>${events}</div>'),Tg=new U('${showingEvents_msg}. <span class="agenda-more" onclick="${functionName}(${after});">${look_msg}</span>'),Qg=new U('<div id="agenda${id}" class="agenda-scrollboxBoundary agenda"><div id="agendaEventContainer${id}" class="scrollbox" style="height:${height};position:relative">'+
Hf+'<div id="agendaScrollContent${id}" style="position:relative"><div id="agenda-underflow-top${id}" class="underflow-top"> </div><div id="eventContainer${id}"> </div></div>'+If+'<div id="agenda-underflow-bottom${id}"  class="underflow-bot" style="height:100%"> </div></div></div>');function $g(a){return eval("("+a+")")};function ah(){}function bh(a,b,c){a.b={};b||(b=[]);a.f=n;a.c=-1;a.a=b;t:{if(a.a.length){b=a.a.length-1;var d=a.a[b];if(d&&"object"==typeof d&&"number"!=typeof d.length){a.e=b-a.c;a.d=d;break t}}a.e=Number.MAX_VALUE}if(c)for(b=0;b<c.length;b++)d=c[b],d<a.e?(d+=a.c,a.a[d]=a.a[d]||[]):a.d[d]=a.d[d]||[]}function W(a,b){return b<a.e?a.a[b+a.c]:a.d[b]}function X(a,b,c){if(!a.b[c]){var d=W(a,c);d&&(a.b[c]=new b(d))}return a.b[c]}
function ch(a){var b=dh;if(!a.b[1]){for(var c=W(a,1),d=[],e=0;e<c.length;e++)d[e]=new b(c[e]);a.b[1]=d}return a.b[1]}ah.prototype.toString=function(){return this.a.toString()};var eh={Me:{1E3:{other:"0K"},1E4:{other:"00K"},1E5:{other:"000K"},1E6:{other:"0M"},1E7:{other:"00M"},1E8:{other:"000M"},1E9:{other:"0B"},1E10:{other:"00B"},1E11:{other:"000B"},1E12:{other:"0T"},1E13:{other:"00T"},1E14:{other:"000T"}},Le:{1E3:{other:"0 thousand"},1E4:{other:"00 thousand"},1E5:{other:"000 thousand"},1E6:{other:"0 million"},1E7:{other:"00 million"},1E8:{other:"000 million"},1E9:{other:"0 billion"},1E10:{other:"00 billion"},1E11:{other:"000 billion"},1E12:{other:"0 trillion"},1E13:{other:"00 trillion"},
1E14:{other:"000 trillion"}}},fh=eh,fh=eh;var gh={AED:[2,"dh","\u062f.\u0625.","DH"],ALL:[0,"Lek","Lek"],AUD:[2,"$","AU$"],BDT:[2,"\u09f3","Tk"],BGN:[2,"lev","lev"],BRL:[2,"R$","R$"],CAD:[2,"$","C$"],CDF:[2,"FrCD","CDF"],CHF:[2,"CHF","CHF"],CLP:[0,"$","CL$"],CNY:[2,"\u00a5","RMB\u00a5"],COP:[0,"$","COL$"],CRC:[0,"\u20a1","CR\u20a1"],CZK:[50,"K\u010d","K\u010d"],DKK:[18,"kr","kr"],DOP:[2,"$","RD$"],EGP:[2,"\u00a3","LE"],ETB:[2,"Birr","Birr"],EUR:[2,"\u20ac","\u20ac"],GBP:[2,"\u00a3","GB\u00a3"],HKD:[2,"$","HK$"],HRK:[2,"kn","kn"],HUF:[0,"Ft",
"Ft"],IDR:[0,"Rp","Rp"],ILS:[2,"\u20aa","IL\u20aa"],INR:[2,"\u20b9","Rs"],IRR:[0,"Rial","IRR"],ISK:[0,"kr","kr"],JMD:[2,"$","JA$"],JPY:[0,"\u00a5","JP\u00a5"],KRW:[0,"\u20a9","KR\u20a9"],LKR:[2,"Rs","SLRs"],LTL:[2,"Lt","Lt"],LVL:[2,"Ls","Ls"],MNT:[0,"\u20ae","MN\u20ae"],MXN:[2,"$","Mex$"],MYR:[2,"RM","RM"],NOK:[50,"kr","NOkr"],PAB:[2,"B/.","B/."],PEN:[2,"S/.","S/."],PHP:[2,"\u20b1","Php"],PKR:[0,"Rs","PKRs."],PLN:[50,"z\u0142","z\u0142"],RON:[2,"RON","RON"],RSD:[0,"din","RSD"],RUB:[50,"\u0440\u0443\u0431.",
"\u0440\u0443\u0431."],SAR:[2,"Rial","Rial"],SEK:[2,"kr","kr"],SGD:[2,"$","S$"],THB:[2,"\u0e3f","THB"],TRY:[2,"TL","YTL"],TWD:[2,"NT$","NT$"],TZS:[0,"TSh","TSh"],UAH:[2,"\u20b4","UAH"],USD:[2,"$","US$"],UYU:[2,"$","$U"],VND:[0,"\u20ab","VN\u20ab"],YER:[0,"Rial","Rial"],ZAR:[2,"R","ZAR"]};var hh={ye:".",ze:",",Ce:"%",nd:"0",He:"+",Ge:"-",Fe:"E",De:"\u2030",ie:"\u221e",je:"NaN",yc:"#,##0.###",Zd:"#E0",Yd:"#,##0%",Wd:"\u00a4#,##0.00",Xd:"USD"},Y=hh,Y=hh;function ih(){this.r=Y.Xd;this.e=40;this.a=1;this.w=0;this.c=3;this.f=this.b=0;this.J=w;this.v=this.M="";this.g="-";this.h="";this.d=1;this.p=3;this.n=this.F=w;this.k=0;switch(1){case 1:jh(this,Y.yc);break;case 2:jh(this,Y.Zd);break;case 3:jh(this,Y.Yd);break;case 4:var a;a=Y.Wd;var b=["0"],c=gh[this.r][0]&7;if(0<c){b.push(".");for(var d=0;d<c;d++)b.push("0")}a=a.replace(/0.00/g,b.join(""));jh(this,a);break;case 5:kh(this,1);break;case 6:kh(this,2);break;default:k(Error("Unsupported pattern type."))}}
function jh(a,b){b.replace(/ /g,"\u00a0");var c=[0];a.M=lh(a,b,c);for(var d=c[0],e=-1,f=0,g=0,h=0,l=-1,m=b.length,r=p;c[0]<m&&r;c[0]++)switch(b.charAt(c[0])){case "#":0<g?h++:f++;0<=l&&0>e&&l++;break;case "0":0<h&&k(Error('Unexpected "0" in pattern "'+b+'"'));g++;0<=l&&0>e&&l++;break;case ",":l=0;break;case ".":0<=e&&k(Error('Multiple decimal separators in pattern "'+b+'"'));e=f+g+h;break;case "E":a.n&&k(Error('Multiple exponential symbols in pattern "'+b+'"'));a.n=p;a.f=0;c[0]+1<m&&"+"==b.charAt(c[0]+
1)&&(c[0]++,a.J=p);for(;c[0]+1<m&&"0"==b.charAt(c[0]+1);)c[0]++,a.f++;(1>f+g||1>a.f)&&k(Error('Malformed exponential pattern "'+b+'"'));r=w;break;default:c[0]--,r=w}0==g&&0<f&&0<=e&&(g=e,0==g&&g++,h=f-g,f=g-1,g=1);(0>e&&0<h||0<=e&&(e<f||e>f+g)||0==l)&&k(Error('Malformed pattern "'+b+'"'));h=f+g+h;a.c=0<=e?h-e:0;0<=e&&(a.b=f+g-e,0>a.b&&(a.b=0));a.a=(0<=e?e:h)-f;a.n&&(a.e=f+a.a,0==a.c&&0==a.a&&(a.a=1));a.p=Math.max(0,l);a.F=0==e||e==h;d=c[0]-d;a.v=lh(a,b,c);c[0]<b.length&&";"==b.charAt(c[0])?(c[0]++,
a.g=lh(a,b,c),c[0]+=d,a.h=lh(a,b,c)):(a.g=a.M+a.g,a.h+=a.v)}function kh(a,b){a.k=b;jh(a,Y.yc);a.b=0;a.c=2;0<a.b&&k(Error("Can't combine significant digits and minimum fraction digits"));a.w=2}function mh(a,b){var c=Math.pow(10,a.c),d=0>=a.w?Math.round(b*c):Math.round(nh(b*c,a.w,a.c)),e;isFinite(d)?(e=Math.floor(d/c),c=Math.floor(d-e*c)):(e=b,c=0);return{Bc:e,ve:c}}
function oh(a,b,c,d){a.b>a.c&&k(Error("Min value must be less than max value"));b=mh(a,b);var e=Math.pow(10,a.c),f=b.Bc,g=b.ve,h=0<a.b||0<g||w;b=a.b;h&&(b=a.b);for(var l="",m=f;1E20<m;)l="0"+l,m=Math.round(m/10);var l=m+l,r=Y.ye,q=Y.ze,m=Y.nd.charCodeAt(0),t=l.length;if(0<f||0<c){for(f=t;f<c;f++)d.push(String.fromCharCode(m));for(f=0;f<t;f++)d.push(String.fromCharCode(m+1*l.charAt(f))),1<t-f&&0<a.p&&1==(t-f)%a.p&&d.push(q)}else h||d.push(String.fromCharCode(m));(a.F||h)&&d.push(r);a=""+(g+e);for(c=
a.length;"0"==a.charAt(c-1)&&c>b+1;)c--;for(f=1;f<c;f++)d.push(String.fromCharCode(m+1*a.charAt(f)))}function ph(a,b,c){c.push(Y.Fe);0>b?(b=-b,c.push(Y.Ge)):a.J&&c.push(Y.He);b=""+b;for(var d=Y.nd,e=b.length;e<a.f;e++)c.push(d);c.push(b)}
function lh(a,b,c){for(var d="",e=w,f=b.length;c[0]<f;c[0]++){var g=b.charAt(c[0]);if("'"==g)c[0]+1<f&&"'"==b.charAt(c[0]+1)?(c[0]++,d+="'"):e=!e;else if(e)d+=g;else switch(g){case "#":case "0":case ",":case ".":case ";":return d;case "\u00a4":c[0]+1<f&&"\u00a4"==b.charAt(c[0]+1)?(c[0]++,d+=a.r):d+=gh[a.r][1];break;case "%":1!=a.d&&k(Error("Too many percent/permill"));a.d=100;d+=Y.Ce;break;case "\u2030":1!=a.d&&k(Error("Too many percent/permill"));a.d=1E3;d+=Y.De;break;default:d+=g}}return d}
var qh={prefix:"",Oc:"",Mb:0};function rh(a,b){var c=1==a.k?fh.Me:fh.Le;if(3>b)return qh;b=Math.min(14,b);c=c[Math.pow(10,b)];if(!c)return qh;c=c.other;return c&&"0"!=c?(c=/([^0]*)(0+)(.*)/.exec(c))?{prefix:c[1],Oc:c[3],Mb:b-(c[2].length-1)}:qh:qh}function sh(a){for(var b=0;1<=(a/=10);)b++;return b}function nh(a,b,c){if(!a)return a;b=b-sh(a)-1;if(b<-c)return c=Math.pow(10,c),Math.round(a/c)*c;c=Math.pow(10,b);return Math.round(a*c)/c};function th(a){return 1==a%10&&11!=a%100?"one":2==a%10&&12!=a%100?"two":3==a%10&&13!=a%100?"few":"other"}var uh=th,uh=th;function vh(a,b){var c=a|0,d;if(n===b){d=a+"";var e=d.indexOf(".");d=Math.min(-1==e?0:d.length-e-1,3)}else d=b;return 1==c&&0==d?"one":"other"}var wh=vh,wh=vh;function xh(a){this.a=[];this.d=[];this.c=new ih;a&&(a=yh(this,a),this.d=zh(this,a))}var Ah=RegExp("'([{}#].*?)'","g"),Bh=RegExp("''","g");
function Ch(a,b,c,d,e){for(var f=0;f<b.length;f++)switch(b[f].type){case 4:e.push(b[f].value);break;case 3:var g=b[f].value,h=a,l=e,m=c[g];D(m)?(h.a.push(m),l.push(h.b(h.a))):l.push("Undefined parameter - "+g);break;case 2:g=b[f].value;h=e;l=g.hb;D(c[l])?(l=g[c[l]],D(l)||(l=g.other),Ch(a,l,c,d,h)):h.push("Undefined parameter - "+l);break;case 0:g=b[f].value;Dh(a,g,c,wh,d,e);break;case 1:g=b[f].value,Dh(a,g,c,uh,d,e)}}
function Dh(a,b,c,d,e,f){var g=b.hb,h=b.Pc,l=+c[g];if(isNaN(l))f.push("Undefined or invalid parameter - "+g);else if(h=l-h,g=b[c[g]],D(g)||(d=a.c.fa?d(h,a.c.fa()):d(h),g=b[d],D(g)||(g=b.other)),b=[],Ch(a,g,c,e,b),c=b.join(""),e)f.push(c);else{a=a.c;if(isNaN(h))a=Y.je;else{e=[];g=d=h;0==a.k?b=qh:(d=Math.abs(d),g=Math.abs(g),b=rh(a,1>=d?0:sh(d)).Mb,mh(a,g/Math.pow(10,b)),d=mh(a,d/Math.pow(10,b)),b=rh(a,b+sh(d.Bc)));h/=Math.pow(10,b.Mb);e.push(b.prefix);d=0>h||0==h&&0>1/h;e.push(d?a.g:a.M);if(isFinite(h))if(h=
h*(d?-1:1)*a.d,a.n)if(0==h)oh(a,h,a.a,e),ph(a,0,e);else{g=Math.log(h)/Math.log(10);g=Math.floor(g+2E-15);h/=Math.pow(10,g);l=a.a;if(1<a.e&&a.e>a.a){for(;0!=g%a.e;)h*=10,g--;l=1}else 1>a.a?(g++,h/=10):(g-=a.a-1,h*=Math.pow(10,a.a-1));oh(a,h,l,e);ph(a,g,e)}else oh(a,h,a.a,e);else e.push(Y.ie);e.push(d?a.h:a.v);e.push(b.Oc);a=e.join("")}f.push(c.replace(/#/g,a))}}
function yh(a,b){var c=a.a,d=F(a.b,a);b=b.replace(Bh,function(){c.push("'");return d(c)});return b=b.replace(Ah,function(a,b){c.push(b);return d(c)})}function Eh(a){var b=0,c=[],d=[],e=/[{}]/g;e.lastIndex=0;for(var f;f=e.exec(a);){var g=f.index;"}"==f[0]?(c.pop(),0==c.length&&(f={type:1},f.value=a.substring(b,g),d.push(f),b=g+1)):(0==c.length&&(b=a.substring(b,g),""!=b&&d.push({type:0,value:b}),b=g+1),c.push("{"))}b=a.substring(b);""!=b&&d.push({type:0,value:b});return d}
var Fh=/^\s*(\w+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/,Gh=/^\s*(\w+)\s*,\s*selectordinal\s*,/,Hh=/^\s*(\w+)\s*,\s*select\s*,/;
function zh(a,b){for(var c=[],d=Eh(b),e=0;e<d.length;e++){var f={};if(0==d[e].type)f.type=4,f.value=d[e].value;else if(1==d[e].type){var g=d[e].value;switch(Fh.test(g)?0:Gh.test(g)?1:Hh.test(g)?2:/^\s*\w+\s*/.test(g)?3:5){case 2:f.type=2;f.value=Ih(a,d[e].value);break;case 0:f.type=0;f.value=Jh(a,d[e].value);break;case 1:f.type=1;f.value=Kh(a,d[e].value);break;case 3:f.type=3,f.value=d[e].value}}c.push(f)}return c}
function Ih(a,b){var c="";b=b.replace(Hh,function(a,b){c=b;return""});var d={};d.hb=c;for(var e=Eh(b),f=0;f<e.length;){var g=e[f].value;f++;if(1==e[f].type)var h=zh(a,e[f].value);d[g.replace(/\s/g,"")]=h;f++}return d}function Jh(a,b){var c="",d=0;b=b.replace(Fh,function(a,b,e){c=b;e&&(d=parseInt(e,10));return""});var e={};e.hb=c;e.Pc=d;for(var f=Eh(b),g=0;g<f.length;){var h=f[g].value;g++;if(1==f[g].type)var l=zh(a,f[g].value);e[h.replace(/\s*(?:=)?(\w+)\s*/,"$1")]=l;g++}return e}
function Kh(a,b){var c="";b=b.replace(Gh,function(a,b){c=b;return""});var d={};d.hb=c;d.Pc=0;for(var e=Eh(b),f=0;f<e.length;){var g=e[f].value;f++;if(1==e[f].type)var h=zh(a,e[f].value);d[g.replace(/\s*(?:=)?(\w+)\s*/,"$1")]=h;f++}return d}xh.prototype.b=function(a){return"\ufddf_"+(a.length-1).toString(10)+"_"};var Lh=["en",0,".",[[[,0],[" \u2013 "],[,1]]],[[[,0],[" "],[,1]]],[[[,0],[", "],[,1]]],[[[,0],["/"],[,1]]],[[[,0],["/"],[,1],["/"],[,2]]],[[[,0],["/"],[,1]]],[[[,0],["/"],[,1]]],[[[,0],["/"],[,1]]],[[[,0],["/"],[,1],["/"],[,2]]],[[[,0],["-"],[,1],["-"],[,2]]],[[[,0],[":00"]]],[[[,0],[,1]]],[[[,0],[":"],[,1]]],[[[,0],[":"],[,1],[,2]]],[[[,0],[" "],[,1]]],[[[,0],[" "],[,1],[", "],[,2]]],[[[,0],[" "],[,1]]],[[[,0],[" "],[,1]]],[[[,0],[" "],[,1],[", "],[,2]]],[[[,0],[" "],[,1]]],[[[,0],[" "],[,1],[" \u2013 "],
[,2],[", "],[,3]]],[[[,0],[" "],[,1],[" \u2013 "],[,2],[", "],[,3]]],[[[,0],[" "],[,1],[" \u2013 "],[,2],[" "],[,3],[", "],[,4]]],[[[,0],[" \u2013 "],[,1]]],[[[,0],[" ("],[,1],[")"]]],[[[,0],[" \u2013 "],[,1],[" "],[,2]]],[[[,0],[" "],[,1]]],[[[,0],[", "],[,1]]],"SMTWTFS".split(""),"Sun Mon Tue Wed Thu Fri Sat".split(" "),"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),"January February March April May June July August September October November December".split(" "),
"January February March April May June July August September October November December".split(" "),["a","p"],["am","pm"],["am","pm"],"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),0,0,0,[[[,0],[", "],[,1]]]];function Mh(a){bh(this,a,[])}I(Mh,ah);function Z(a){bh(this,a,[1])}I(Z,ah);function dh(a){bh(this,a,[])}I(dh,ah);function Nh(a){bh(this,a,[])}I(Nh,ah);function Oh(a){bh(this,a,[])}I(Oh,ah);function Ph(a){bh(this,a,[])}I(Ph,ah);function Qh(a){return W(a,2)};function Rh(){this.q=new Mh(Lh);this.c=Sh(X(this.q,Nh,32));this.a=Sh(X(this.q,Nh,33));this.b=Sh(X(this.q,Nh,34));this.g=Th(X(this.q,Oh,35));this.e=Th(X(this.q,Oh,36));this.d=Th(X(this.q,Oh,37));this.f=Th(X(this.q,Oh,41))}ia(Rh);function Sh(a){return[W(a,1),W(a,2),W(a,3),W(a,4),W(a,5),W(a,6),W(a,7)]}function Th(a){return[,W(a,1),W(a,2),W(a,3),W(a,4),W(a,5),W(a,6),W(a,7),W(a,8),W(a,9),W(a,10),W(a,11),W(a,12)]}function Uh(a,b){return a.b[b]}function Vh(a){return isNaN(a)?"??":""+(a%12||12)}
function Wh(a){return isNaN(a)?"??":(10>a?"0":"")+a}function Xh(a,b){var c;isNaN(b)?c="":12>b%24?(c=X(a.q,Ph,39),c=W(c,1)):c=Qh(X(a.q,Ph,39));return c}function $(a,b){var c=[];fb(ch(a),function(a){W(a,1)!=s?c.push(W(a,1)):c.push(b[W(a,2)])});return c.join("")};function Yh(){};function Zh(a,b,c){this.b=a||new $h;this.a=b||Rh.ib();this.d=D(c)?c:p}I(Zh,Yh);function ai(a,b,c){return W(a.a.q,2)?String(b):c?a.a.g[b]:a.a.e[b]}function bi(a,b,c){return a.d&&!W(a.a.q,2)?c?a.a.f[b]:a.a.d[b]:ai(a,b,c||"ru"==W(a.a.q,1))}
function ci(a,b,c,d){a.b.c||isNaN(b.hour)?(c=b.hour,b=b.minute,b=$(X(a.a.q,Z,16),[isNaN(c)?"??":(10>c?"0":"")+c,Wh(b)])):c&&0==b.minute?d?(a=a.a,b=b.hour,b=$(X(a.q,Z,15),[Vh(b),isNaN(b)?"":12>b%24?"":Qh(X(a.q,Ph,38))])):(a=a.a,b=b.hour,b=$(X(a.q,Z,15),[Vh(b),Xh(a,b)])):d?(a=a.a,c=b.hour,b=b.minute,b=$(X(a.q,Z,17),[Vh(c),Wh(b),isNaN(c)?"":12>c%24?"":Qh(X(a.q,Ph,38))])):(a=a.a,c=b.hour,b=b.minute,b=$(X(a.q,Z,17),[Vh(c),Wh(b),Xh(a,c)]));return b}
function Ug(a,b){var c;t:switch(a.b.b){case 1:c=b.j;var d=b.month;c=$(X(a.a.q,Z,7),[c,d]);break t;case 0:c=b.month;d=b.j;c=$(X(a.a.q,Z,10),[c,d]);break t;case 2:c=b.month;d=b.j;c=$(X(a.a.q,Z,11),[c,d]);break t;default:c=b.month,d=b.j,c=$(X(a.a.q,Z,10),[c,d])}return c}
function Lg(a,b,c){var d=bi(a,b.month,n);if(b.year==a.b.a.year&&4>Math.abs(b.month-a.b.a.month))var e=b.j,d=$(X(a.a.q,Z,18),[d,e]);else var e=b.j,f=b.year,d=$(X(a.a.q,Z,19),[d,e,f]);c?(b=b.V(),b=a.a.a[b]):b=Uh(a.a,b.V());return $(X(a.a.q,Z,31),[b,d])}Zh.prototype.c=function(a){var b;1==a.j?(b=bi(this,a.month,p),a=a.j,b=$(X(this.a.q,Z,21),[b,a])):b=String(a.j);return b};
function di(a,b){var c;var d=b.start,e=S(b.end,-1),f=d.year,g=d.month,h=d.j;c=e.year;var l=e.month,e=e.j,m=bi(a,g,p),r=bi(a,l,p);f==c?g==l?h==e?(c=$(X(a.a.q,Z,19),[m,h,f]),d=Uh(a.a,d.V()),c=$(X(a.a.q,Z,31),[d,c])):c=$(X(a.a.q,Z,25),[m,h,e,f]):c=$(X(a.a.q,Z,26),[m,h,r,e,f]):(d=a.a,f=$(X(a.a.q,Z,22),[m,h,f]),c=$(X(a.a.q,Z,22),[r,e,c]),c=$(X(d.q,Z,4),[f,c]));return c}function ei(a,b){var c=ai(a,b.month),d=b.year;return $(X(a.a.q,Z,20),[c,d])}
function vg(a,b){var c,d,e;b instanceof T?(d=b.start,e=b.end):(d=b,e=n);if(isNaN(e.hour))c=24<=(Wc(e,d).c/3600|0)?di(a,new T(d,e)):Lg(a,d,p);else{var f=!(d.minute||e.minute);c=Lg(a,d,p)+", "+ci(a,d,f);d=(d.m()!=e.m()?Lg(a,e,p)+", ":"")+ci(a,e,f);c=$(X(a.a.q,Z,4),[c,d])}return c}function fi(a,b){return"ru"==W(a.a.q,1)?b.substring(0,1).toUpperCase()+b.substring(1):b}function $h(a,b){this.c=a||w;this.b=b||0;this.a=pd(new Date)};var gi=RegExp("[\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc]"),hi=RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]"),ii=RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc]"),ji=/^http:\/\/.*/,ki=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g,li=/\s+/,mi=/\d/;
function ni(a){var b=0,c=0,d=w;a=a.split(li);for(var e=0;e<a.length;e++){var f=a[e];ii.test(f)?(b++,c++):ji.test(f)?d=p:hi.test(f)?c++:mi.test(f)&&(d=p)}return-1==(0==c?d?1:0:.4<b/c?-1:1)};var oi={};function pi(a){return ni(a)?"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+a+"</span>":a};var qi;function ri(a){this.b=a};function si(a,b,c,d,e){this.a=a;this.d=b;this.e=c;this.b=d;this.c=e}function ti(a,b){var c=parseInt(a.substr(1,2),16),d=parseInt(a.substr(3,2),16),e=parseInt(a.substr(5,2),16),c=Math.floor(255-(255-c)*b),d=Math.floor(255-(255-d)*b),e=Math.floor(255-(255-e)*b);return"#"+ui(c)+ui(d)+ui(e)}
function vi(a){var b;b=parseInt(a.substr(1,2),16);var c=parseInt(a.substr(3,2),16),d=parseInt(a.substr(5,2),16);b*=.7;var c=.7*c,d=.7*d,e=.3*b+.59*c+.11*d,f,g=Math.exp(e/255);f=(.595716*b-.274453*c-.321263*d)*g;d=(.211456*b-.522591*c+.311135*d)*g;b=Math.floor(Math.min(Math.max(e+.9563*f+.621*d,0),255));c=Math.floor(Math.min(Math.max(e-.2721*f-.6474*d,0),255));d=Math.floor(Math.min(Math.max(e-1.107*f+1.7046*d,0),255));b="#"+ui(b)+ui(c)+ui(d);c=ti(a,.33);e=Math.min(1,.5+(parseInt(a.substr(1,2),16)+
parseInt(a.substr(3,2),16)+parseInt(a.substr(5,2),16))/3/255/1.5);e=ti(a,e);return new si(a,b,a,e,c)}si.prototype.u=function(a){return this.color==a.color};
function wi(a,b){return"#"+"666666888888aaaaaabbbbbbdddddda32929cc3333d96666e69999f0c2c2b1365fdd4477e67399eea2bbf5c7d67a367a994499b373b3cca2cce1c7e15229a36633cc8c66d9b399e6d1c2f029527a336699668cb399b3ccc2d1e12952a33366cc668cd999b3e6c2d1f01b887a22aa9959bfb391d5ccbde6e128754e32926265ad8999c9b1c2dfd00d78131096184cb05288cb8cb8e0ba52880066aa008cbf40b3d580d1e6b388880eaaaa11bfbf4dd5d588e6e6b8ab8b00d6ae00e0c240ebd780f3e7b3be6d00ee8800f2a640f7c480fadcb3b1440edd5511e6804deeaa88f5ccb8865a5aa87070be9494d4b8b8e5d4d47057708c6d8ca992a9c6b6c6ddd3dd4e5d6c6274878997a5b1bac3d0d6db5a69867083a894a2beb8c1d4d4dae54a716c5c8d8785aaa5aec6c3cedddb6e6e41898951a7a77dc4c4a8dcdccb8d6f47b08b59c4a883d8c5ace7dcce8531049f3501c7561ee2723ad6a58c6914268a2d38b5515dcd6a75d0a4a95c1158962181c244abda5dc4d69fcc23164e402175603f997d5cb5a89ac2182c5730487e536ca66d86c0a4afc9060d5e1821863640ad525cc8969acb125a121f753c3c995b5ab67998c2a62f62133d82155ca63279c34fa6c7942f63095a9a087ec2259add42b6d48e5f6b0281910ba7b828c3d445c8d0908755099d7000cf9911ebb42ed9c2858c500baa5a00d47f1eee9939ddb78d7549168d4500b56414d38233cda9866b3304743500914d14b37037bb9d845b123b870b50ab2671c9448ec98eae42104a70237f9643a5b15fc0c09cc7113f4725617d4585a361a0be9dbac73333335151517373738f8f8fb2b2b20f4b38227f6341a5875dc0a29bc7ba856508a59114d1bc36e9d34fddd398711616871111ad2d2dc94a4acb9292ac725e75481eac725ec68c78e6d5cfd06b64924420d06b64db7972f0d0cef83a22a64232f83a22f97d6df6c9c2fa573cd02424fa573cfc8976fed0c8ff7537bb5517ff7537fa9162ffd8c7ffad46cb7403ffad46ffad46ffe8cb42d69250b68e42d69242d692caf4e016a765007d3916a7656bcfa2d1ede07bd1484db8107bd1487bd148daf2ccb3dc6c93c00bb3dc6cb3dc6ceaf5dcfbe983bdb634fbe983fbe983fef9dcfad165bf9608fad165fad165fef2d392e1c033b69492e1c092e1c0e0f7ed9fe1e70bbcb29fe1e79fe1e7e4f7f89fc6e71587bd9fc6e79fc6e7e4eff84986e72c70d14986e78fb5f2dbe7fa9a9cff373ad79a9cffa9abfee3e3ffb99aff6733ddb99affb99affebe3ffc2c2c2979797c2c2c2d0d0d0e6e6e6cabdbf717171cabdbfcabdbfeae6e6cca6ac8a404dcca6accca6acf1e6e8f691b2d21e5bf691b2f9a9c3fce0e9cd74e6ca2ae6cd74e6dd8ef3f1d8f8a47ae29c3ce4a47ae2b38cede6daf7".substr(30*a+
6*b,6).toUpperCase()}var xi=s;function yi(){if(xi)return xi;for(var a=[],b=0;67>b;b++){var c=wi,c=new si(c(b,0),c(b,1),c(b,2),c(b,3),c(b,4));c.color=b;a[b]=c}return xi=a}for(var zi=[35,23,42,14,22,33,40,28,30,31,12,32,8,7,6,26,5,4,39,21,15,2,37,25],Ai=[26,23,41,28,33,37,35,30,38,40,24,31,27,22,25,42,29,32,34,36,39,6,1,12,9,14,4,21,8,19,7,2,11,10,3,20,13,5,15,16,17,18],Bi={},Ci=0;Ci<Ai.length;++Ci)Bi[Ai[Ci]]=Ci;function Di(a){a=Ei(a);return yi()[a]||s}var Fi=s;
function Gi(a){a=Hi(a);return 0<=a?Di(a):s}function Hi(a){a=a.toUpperCase();if(!Fi){Fi={};for(var b=yi(),c=0,d=b.length;c<d;++c)Fi[b[c].a]=c}return Fi[a]||-1}function Ii(a){if(!a)return Ai[0];a=Bi[a];return D(a)?Ai[(a+1)%Ai.length]:Ai[0]}function ui(a){a=Number(a|0).toString(16);return 2>a.length?"0"+a:a}function Ei(a){return 43<=a&&66>=a?zi[a-43]:a}function Ji(a){var b={};Ua(a,function(a,d){d=parseInt(d,10);d=Ei(d);var e=b[d];e&&(a+=e);b[d]=a});return b};function Ki(a,b,c,d){this.b=b;this.a=Ei(a);this.d=d;this.c=(b?vi(c):Di(a))||vi(c)}function Li(a){a=Ei(a);return new Ki(a,w,wi(a,0),"#000000")}Ki.prototype.ja=y("c");function Mi(a){if(a.classList)return a.classList;a=a.className;return E(a)&&a.match(/\S+/g)||[]}function Ni(a,b){return a.classList?a.classList.contains(b):kb(Mi(a),b)}function Oi(a,b){a.classList?a.classList.add(b):Ni(a,b)||(a.className+=0<a.className.length?" "+b:b)}function Pi(a,b){a.classList?a.classList.remove(b):Ni(a,b)&&(a.className=gb(Mi(a),function(a){return a!=b}).join(" "))};bb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));bb("action","cite","data","formaction","href","manifest","poster","src");bb("link","script","style");var Qi;function Ri(a){a=a||s;this.d=!!a&&a.a(12).d("VR");var b;if(b=a)b=!!a.a(4).b[43];b&&a.a(4)}Ri.prototype.a=function(){return Di(Ii())};
function Si(a,b){var c=a.a(b),d=Hi(c.a),e;if(0<=d)e=Li(d);else{c=c.a;d=Hi(c.toUpperCase());if(!(43<=d))for(var d=0,f=parseInt(c.substr(1,2),16)/255,g=parseInt(c.substr(3,2),16)/255,h=parseInt(c.substr(5,2),16)/255,l=43;66>l;l++){var m=wi(l,0),r=f-parseInt(m.substr(1,2),16)/255,q=g-parseInt(m.substr(3,2),16)/255,m=h-parseInt(m.substr(5,2),16)/255,r=r*r+q*q+m*m;if(43==l||r<e)d=l,e=r}e=d;e=new Ki(e,p,c,"#000000")}return e}
function Ti(a){if(!a||a.match(/^\s*$/))a="(No title)";else if(a&&gi.test(a)){var b=gi.test(a)?"\u200f":"\u200e";a="\u202b"+a.replace(ki,b+"$&"+b)+"\u202c"}return a}Ri.prototype.b=ca(w);Ri.prototype.c=ca("");Ri.prototype.e=ca("&nbsp;");function Ui(){};function Vi(a,b){this.a=a;this.c=b}I(Vi,Ui);
Vi.prototype.render=function(a,b,c){Wi.put("toggleDetails",this.w);var d=a.Q();d&&d.ma?(Xi.put("wc_icon_src",J(d.ma)),Xi.put("wc_title",J(d.b||"")),Xi.put("wc_listener",' onclick="'+this.d+"("+oa(a)+', this);"'),Wi.put("webContent",Xi.toString()),c.push("web-content")):Wi.put("webContent","");Wi.put("event_classes",c.join(" "));Wi.put("eventDuration",vg(this.a,new T(a.A(),a.G)));c=w;if(a.oa)d="All day",c=p;else{var d=a.A().m(),e=a.G.m();a.Aa||d!==e?d===b?d=ci(this.a,a.A(),w,w):e===b?d="&raquo;&nbsp;"+
ci(this.a,a.G,w,w):(d="All day",c=p):d=ci(this.a,a.A(),w,w)}Wi.put("start_time",d);Wi.put("allday",c?"all-day":"");Wi.put("title",pi(Ti(a.a)));Wi.put("titleColor",this.c.a(a).a);Wi.put("divId",oa(a)+"-"+b);return Wi.toString()};Vi.prototype.b=ha;
var Wi=new U('<div class="${event_classes}"><div class="${allday} event-summary" id="${divId}" onmousedown="${toggleDetails}(this);return false;"><span class="event-time" alt="${eventDuration}"title="${eventDuration}">${start_time}</span><div class="title-wrapper"><span class="event-reply-status">&nbsp;</span><span class="event-title" style="color: ${titleColor};">${webContent}${title}</span></div></div><div class="event-details" id="details-${divId}"></div></div>'),Xi=new U('<span ${wc_listener} class="agenda-wc"><img src="${wc_icon_src}"class="agenda-web-content" title="${wc_title}" alt="${wc_title}"></span>');function Yi(a,b,c){Cf.call(this,a,b,c);this.M=[]}I(Yi,Cf);A=Yi.prototype;A.mb=s;A.ta="";A.xd=s;A.qa=w;A.Q=y("mb");function Zi(a,b){var c=Xc(a.A());c.minute-=b;a.M.push(c.ca())}function $i(a,b){a.xd=b;var c=b.getId();a.k=c}A.va=y("xd");function Rg(a,b){return a.va()&&b.va()&&a.va().zd(b.va())||0}function aj(a,b,c){c=b.i()==c.i()?c.cc()?$c(c):ud(c.year,c.month,c.j,c.hour,c.minute,c.second+1).ca():c;return new Yi(a,b,c)};function bj(){this.a={};this.e={};this.d=this.b=this.c=s}function cj(a,b){for(var c=b.start.m(),d=b.end.m(),e=c.t(),d=d.t(),c={},f=[];e<d;e=Tc(e))if(e in a.a){var g=a.a[e];if(g){for(var h in g){var l=g[h];l.qa?delete g[h]:h in c||(f.push(l),c[h]=1)}Xa(g)&&delete a.a[e]}}return f};function dj(a){this.e=a}dj.prototype.getId=y("e");function ej(){R.call(this);this.a={};this.d={};this.b={};this.c={};this.e={}}I(ej,R);ej.prototype.f=0;var fj=1;function gj(a,b,c){this.id=a;this.e=b;this.c=c;this.d=s;this.b=[];this.a={}}function hj(a,b,c,d){var e;b.sort();e=c.toString()+":"+b.join(",");if(e in a.e)d(a.e[e]);else if(e in a.c)a.c[e].push(d);else if(b=ij(a,b,c,d),b.d=e,++a.f,a.c[e]=[d],Xa(b.a))jj(a,b);else for(var f in b.a)d=a.d[f],e=F(a.g,a,f,b),d.nb(b.a[f],e)}
function ij(a,b,c,d,e){var f=fj++;d=new gj(f,d,c);for(f=0;f<b.length;++f){var g=b[f],h=a.a[g],l;l=h;var m=c,r=e?h.d:s;if(l.c&&l.b){var r=!!r&&(l.d==s||r>=l.d),q=m.start.i()<l.c.i(),t=m.end.i()>l.b.i();l=q||t?q&&t?m:t?new T(r?l.c:l.b,m.end.m()):new T(m.start.m(),r?l.b:l.c):r?new T(l.c,l.b):s}else l=m;l?d.a[g]=l:e||d.b.push(cj(h,c))}return d}ej.prototype.g=function(a,b,c,d){c&&kj(this,a,c,b.c,d?d:n);b.b.push(cj(this.a[a],b.c));delete b.a[a];Xa(b.a)&&(jj(this,b),this.dispatchEvent("d"))};
function jj(a,b){--a.f;var c;c=b.b;for(var d=[],e=0;e<c.length;++e)ob(d,c[e]);c=d.sort(ta(Gf,Rg));(d=b.d)&&(a.e[d]=c);for(var e=a.c[d],f=0;f<e.length;++f)e[f](c);delete a.c[d]}ej.prototype.h=function(a,b,c,d){c&&(kj(this,a,c,b.c,d?d:n),b.b.push(c));delete b.a[a];Xa(b.a)&&(b.e(),this.dispatchEvent("d"))};
function kj(a,b,c,d,e){b=a.a[b];for(var f=0,g=c.length;f<g;++f){var h=c[f],l=h.getId(),m=b.e[l];m&&(m.qa=p);if(h.qa)delete b.e[l];else{var r=h.A().t(),m=h.G.t();h.oa||h.g||(m=Tc(m));for(b.e[l]=h;r<m;r=Tc(r)){var q;r in b.a?q=b.a[r]:(q=[],b.a[r]=q);q[l]=h}}}if(d){var t,u;if(!b.c||d.start.i()<=b.c.i())b.c=d.start.m(),t=p;if(!b.b||d.end.i()>=b.b.i())b.b=d.end.m(),u=p;e&&t&&u&&(!b.d||e>b.d)&&(b.d=e)}for(d=0;d<c.length;++d)e=c[d].getId(),e in a.b&&c[d].qa?delete a.b[e]:a.b[e]=c[d];a.e={}};function lj(a){var b=[],c=a.a,d;for(d in c){var e=c[d].slice().sort(function(a,b){return a-b});b.push(d+": "+e.join(", "))}b.push("\nreset?");confirm(b.join("\n"))&&(a.a={})};function mj(){R.call(this);this.a={}}I(mj,R);ia(mj);var nj=/\W/g;mj.prototype.log=function(a,b){if(!(0>b||6E5<b)){var c=a.replace(nj,"_");c in this.a||(this.a[c]=[]);this.a[c].push(b)}};function oj(a){this.d=a;this.c=this.a=G()}oj.prototype.A=y("a");function pj(a,b,c,d){this.e=a;this.a=c||a;a=this.d=b;b=this.getId();b in a.a&&k(Error("Already registered an event source with id "+b));a.a[b]=new bj;a.d[b]=this;d||(qj=d=Ii(qj),d=Di(d));this.h=d}I(pj,dj);A=pj.prototype;A.Xb=0;A.setTitle=ba("a");A.ja=y("h");A.zd=function(a){return this.Xb-a.Xb||Ga(this.a,a.a)};A.nb=function(a,b){b.call(s,[],s)};var qj=0;function rj(){R.call(this)}I(rj,R);function sj(a,b,c){R.call(this);this.c=a;this.e=b||Infinity;this.d=c;G();this.a=this.ba();this.b=0;this.Kb()}I(sj,rj);var tj=0;A=sj.prototype;A.Ea=function(a){var b=this.c;b===n?b=-6E4*(new Date(a)).getTimezoneOffset():a>=this.e&&(b=this.d);return b};A.Zb=function(){var a=G()+tj;return this.Ea(a)+a};A.ba=function(){return new Date(this.Zb())};A.Yb=function(){this.a.getUTCDate()!=this.ba().getUTCDate()&&(window.clearTimeout(this.b),this.Kb());return this.a};
A.Kb=function(){var a=this.a,b=this.ba(),c=18E5-b.getTime()%18E5;this.b=window.setTimeout(F(this.Kb,this),c);a.getUTCDate()!==b.getUTCDate()&&(this.a=this.ba(),this.dispatchEvent("newday"))};function uj(){R.call(this)}I(uj,rj);function vj(a,b,c){R.call(this);this.a=new sj(a,b,c);this.a.na(this)}I(vj,uj);vj.prototype.Ea=function(a){return this.a.Ea(a)};vj.prototype.Zb=function(){return this.a.Zb()};vj.prototype.ba=function(){return this.a.ba()};vj.prototype.Yb=function(){return this.a.Yb()};function qg(a){return pd(a.Yb())};function wj(a,b,c){vj.call(this,a,b,c)}I(wj,vj);function xj(a,b,c){R.call(this);this.a=a;c&&nb(c)}I(xj,R);function yj(a,b,c){xj.call(this,a,0,s);this.c=c?c.replace("{hl}",encodeURIComponent("en")):s}I(yj,xj);function zj(a,b,c,d,e,f){this.b=a;this.c=b;this.g=d;this.e=c;this.d=e;a=this.b+"calendar";this.d!=s?a+="/b/"+this.d:this.c&&(a+="/hosted/"+this.c);this.a=a;this.f=this.b+"calendar/feeds";this.h=f||s}zj.prototype.getProxyUrl=y("h");function Aj(a){for(var b in Bj)b in a||(a[b]=Bj[b]);this.J=a.collapseAllday;b=new $h(a.format24hour,parseInt(a.dateFieldOrder,10));this.b=new Zh(b);this.w=a.autoResize;this.domain=(b=a.hostedDomain)?new yj(b.name,0,b.maplink):s;this.h=a.baseUrl;Xe(this.h)||(this.h=Xe(window.location.href)+this.h);this.e=a.weekstart;this.c=a.imagePath;this.d=a.timezone||s;this.p=a.timezoneLocalized;this.fa=a.haveQuickAdd;if("nowMs"in a){b=parseInt(a.nowMs,10);var c=G()+tj;3E4<=Math.abs(c-b)&&(tj=b-G())}this.a=new wj(Cj(a.timezoneOffsetMs),
Cj(a.timezoneNextTransitionMs),Cj(a.timezoneNextOffsetMs));this.f=a.showWeekends;this.n=parseInt(a.firstWeekday,10);this.M=parseInt(a.workWeekLength,10);this.g=new zj(this.h,this.domain&&this.domain.a||"",this.d,this.e,xf(),a.proxyUrl);this.v=a.xsrftok;this.r=!!a.useApiV3;this.F=a.calendarApiVersion;this.k=a.developerKey}function Cj(a){a=parseInt(a,10);isNaN(a)&&(a=n);return a}
var Bj={autoResize:p,baseUrl:"http://www.google.com/",collapseAllday:w,dateFieldOrder:0,format24hour:p,hostedDomain:s,imagePath:"http://www.google.com/calendar/images/",showWeekends:p,preloadEnd:s,preloadStart:s,weekstart:0,haveQuickAdd:w,firstWeekday:1,workWeekLength:5};var Dj,Ej=s,Fj=/calendar\/(?:a|hosted)\/([^\/]*)\//;function Gj(a,b,c){b=new RegExp(Oa(b+"=")+"([^@"+c+"]*)");return(a=a.match(b))?a[1]:s}function Hj(){var a=Dj;if(D(a))return a;var b;(a=window.location.pathname.match(Fj))&&(b=a[1]);a="CAL";b&&(a+=Ij()?"HS":"H");(a=Gj(document.cookie,a,";"))&&b&&(a=Gj(a,b,":"));return Dj=a}function Ij(){Ej==s&&(Ej="https:"==window.location.protocol);return Ej};var Jj={};function Kj(a,b){var c=[a.year,Lj(a.month),Lj(a.j)].join("-"),d=[Lj(a.hour),Lj(a.minute),Lj(a.second)].join(":"),e="";if(D(b))if(0==b)e="Z";else{var e=b,f=Jj[e];if(f)e=f;else{0>e?(f="-",e*=-1):f="+";var g=Math.floor(e/60);10>g&&(g="0"+g);e%=60;e=Jj[e]=Pa(f,g,":",10>e?"0"+e:e)}}return Pa(c,"T",d,e)}function Lj(a){return 10>a?"0"+a:String(a)}var Mj=/\/feeds\/([^\/]*)/,Nj=/^(https?:\/\/.*\.google\.com.*\/calendar\/feeds\/.*\/)(basic|full|embed)/;
function Oj(a){return(a=a.match(Mj))?a[1]:s}function Pj(a){var b=a;"http://schemas.google.com/g/2005#event."==a.substr(0,39)&&(b=a.substr(39));a=Df[b];return D(a)?a:s};function Qj(a,b,c,d){c.body!=n&&(c.body=gadgets.json.stringify(c.body));c.path="/calendar/"+a.F+"/"+escape(b);c.root=a.g.getProxyUrl();gapi.client.request(c).execute(d)};function Rj(a,b){var c=a.title||b||"",d=wf(a.iconLink);zf.call(this,c,d);if(c=a.type)d=2,"application/x-google-gadgets+xml"==c?d=1:c.match(/^image/i)&&(d=3),this.type=d;if(a.link||a.width||a.height||a.display||a.preferences)this.ld=yf(a.link),this.kd=Sj[a.display]||s||"ICON",this.R=parseInt(a.width,10)||300,this.a=parseInt(a.height,10)||400,a.preferences&&(this.c=a.preferences)}I(Rj,zf);A=Rj.prototype;A.ld="";A.kd="ICON";A.rb=y("R");A.getHeight=y("a");A.ua=y("ld");A.Z=y("type");A.Zc=y("c");A.yd=y("kd");
var Sj={icon:"ICON",chip:"CHIP"};var Tj=ad(1970,1,1),Uj=ad(1970,1,2);function Vj(a){return a&&a.date?xd(a.date):a&&a.dateTime?xd(a.dateTime):s};function Wj(a,b){this.a=[];this.b=a;this.c=b};function Xj(a,b,c,d,e,f){pj.call(this,c,b,e,f);this.b=a;this.c=this.b.a;this.g=d}I(Xj,pj);Xj.prototype.f=aa();
Xj.prototype.nb=function(a,b,c){b==s&&(b=ha);var d=this.b.d;if(d==s){var d=this.c.Ea(G()+tj)/6E4,e="+";0>d&&(e="-",d=-d);var f=d/60,d="GMT"+e+f+":"+d%60}if(10<this.g)c?(e=xd(c),f=this.c.ba(),e=27>Wc(jd(f),e).j):e=w,e=e?c:n,d={calendarId:this.getId(),singleEvents:p,timeZone:d,maxAttendees:1,maxResults:250,updatedMin:e,sanitizeHtml:p},Yj(this,d,a),Zj(this,d,[],s,b,!!c);else{c=d;var d=[],e=a.start.m(),f=a.end.m(),g=Xc(e),h=new Zc(30,0,0,0);for(sd(g,h);g.i()<f.i();){var l=g.m();d.push(new T(e,l));e=l;
sd(g,h)}d.push(new T(e,f));a=new Wj(d.length,a);for(e=0;e<d.length;e++)f={timeZone:c,items:[{id:this.getId()}]},Yj(this,f,d[e]),Qj(this.b,"freeBusy",{method:"POST",body:f},F(this.n,this,b,a))}};function Yj(a,b,c){var d=c.start.m();c=c.end.m();a=a.c.Ea(G()+tj)/6E4;d=Kj(d.ca(),a);c=Kj(c.ca(),a);b.timeMin=d;b.timeMax=c}
Xj.prototype.n=function(a,b,c){if(c){var d=(c=c.calendars)?c[this.getId()]:n;if(d&&d.busy){c=[];for(var d=d.busy,e=0;e<d.length;e++){var f=d[e],g=xd(f.start),h=xd(f.end),f=aj(f.start+f.end,g,h);f.setTitle("busy");$i(f,this);c.push(f)}}else c=s}else c=s;c=c||[];b.b--;b.a=b.a.concat(c);if(0==b.b){c=this.d;h=b.c;if(e=c.a[this.getId()]){for(var d=[],l=h.start.m().t(),f=h.end.m().t(),g=h.start.m().i(),h=h.end.m().i();l<f;l=Tc(l)){var m=e.a[l],r;for(r in m)(m=e.e[r])&&m.A().m().i()>=g&&m.G.m().i()<=h&&
(delete e.e[r],d.push(r),delete e.a[l][r])}for(r=0;r<d.length;r++)delete c.b[d[r]]}a(b.a,Ea(jd(this.c.ba())))}};
Xj.prototype.k=function(a,b,c,d,e,f){if(f&&"calendar#events"==f.kind){var g=[],h=f.items;if(h)for(var l=0;l<h.length;l++){var m;m=h[l];var r=f.defaultReminders,q=m.id,t=Vj(m.start),u=Vj(m.end),x=n;if(t&&u){q=x=aj(q,t,u);t=m.visibility;(u=m.summary)?q.setTitle(J(u)):t&&"public"!=t&&"default"!=t?q.setTitle("busy"):q.setTitle("");D(m.description)&&(q.d=m.description);m.htmlLink!=s&&(x.ta=m.htmlLink);D(m.location)&&(x.c=m.location);if(D(m.attendees)){q=n;t:{q=m.attendees;for(t=0;t<q.length;t++)if(q[t].self){q=
q[t];break t}q=s}q=q&&q.responseStatus;D(q)&&(t=n,q=Ef[q],t=D(q)?q:s,t!=s&&(x.b=t))}q=n;!m.reminders||m.reminders.useDefault?q=r:m.reminders&&m.reminders.overrides&&(q=m.reminders.overrides);if(q)for(r=q,q=x,t=0;t<r.length;t++)u=r[t],"popup"==u.method&&Zi(q,u.minutes);r=x;D(m.gadget)&&(q=m.gadget,q.title!=n&&(q.title=J(q.title)),q=new Rj(q,r.a),r.mb=q?q:s)}else x=new Yi(q,Tj,Uj);"cancelled"==m.status&&(x.qa=p);m=x;$i(m,this);g.push(m)}b=b.concat(g);g=xd(f.updated,w,p);c=c?c.min(g):g;if(f.nextPageToken)a.pageToken=
f.nextPageToken,Zj(this,a,b,c,d,e);else{if(e&&!a.updatedMin&&(a=this.d,f=a.a[this.getId()])){e=[];for(var v in f.e)e.push(v);f.a={};f.e={};for(v=0;v<e.length;v++)delete a.b[e[v]]}d(b,Ea(c))}}else{t:{if(f&&f.error&&(v=f.error.data))for(f=0;f<v.length;f++)if("updatedMinTooLongAgo"==v[f].reason){v=p;break t}v=w}v?(delete a.updatedMin,Zj(this,a,b,c,d,e)):d(s)}};function Zj(a,b,c,d,e,f){Qj(a.b,"calendars/"+b.calendarId+"/events",{params:b},F(a.k,a,b,c,d,e,f))};function ak(){}var bk={};function ck(){}I(ck,ak);ck.prototype.init=function(a,b){this.b=a;this.c=b;gapi.config.update("googleapis.config/auth/useFirstPartyAuth",p);a.k!=n&&gapi.client.setApiKey(a.k);var c=xf();c!=s&&gapi.config.update("googleapis.config/sessionIndex",c)};ck.prototype.create=function(a,b,c,d){return new Xj(this.b,this.c,a,b,d,c)};ck.prototype.a=function(a,b){var c=b.color,d=b.title,e=b.access||0,c=c?Gi(c):n;return this.create(a,e,c,d)};function dk(){}dk.prototype.a=s;function ek(a){var b;(b=a.a)||(b={},fk(a)&&(b[0]=p,b[1]=p),b=a.a=b);return b};var gk;function hk(){}I(hk,dk);function ik(a){return(a=fk(a))?new ActiveXObject(a):new XMLHttpRequest}function fk(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(e){}}k(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))}return a.b}gk=new hk;function jk(a){R.call(this);this.headers=new Oe;this.h=a||s;this.b=w;this.g=this.a=s;this.p="";this.c=this.k=this.e=this.n=w;this.f=0;this.d=s;this.v="";this.r=this.w=w}I(jk,R);var kk=/^https?$/i,lk=["POST","PUT"],mk=[];function nk(a,b,c,d,e,f,g){var h=new jk;mk.push(h);b&&h.B("complete",b);h.bc("ready",h.Ee);f&&(h.f=Math.max(0,f));g&&(h.w=g);ok(h,a,c,d,e);return h}A=jk.prototype;A.Ee=function(){this.C();lb(mk,this)};
function ok(a,b,c,d,e){a.a&&k(Error("[goog.net.XhrIo] Object is active with another request="+a.p+"; newUri="+b));c=c?c.toUpperCase():"GET";a.p=b;a.n=w;a.b=p;a.a=a.h?ik(a.h):ik(gk);a.g=a.h?ek(a.h):ek(gk);a.a.onreadystatechange=F(a.Dc,a);try{a.k=p,a.a.open(c,String(b),p),a.k=w}catch(f){pk(a);return}b=d||"";var g=a.headers.clone();e&&Te(e,function(a,b){g.set(b,a)});e=ib(g.da());d=B.FormData&&b instanceof B.FormData;!kb(lk,c)||e||d||g.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
g.forEach(function(a,b){this.a.setRequestHeader(b,a)},a);a.v&&(a.a.responseType=a.v);"withCredentials"in a.a&&(a.a.withCredentials=a.w);try{qk(a),0<a.f&&(a.r=rk(a.a),a.r?(a.a.timeout=a.f,a.a.ontimeout=F(a.Ec,a)):a.d=Zf(a.Ec,a.f,a)),a.e=p,a.a.send(b),a.e=w}catch(h){pk(a)}}function rk(a){return M&&P(9)&&"number"==typeof a.timeout&&D(a.ontimeout)}function jb(a){return"content-type"==a.toLowerCase()}
A.Ec=function(){"undefined"!=typeof fa&&this.a&&(this.dispatchEvent("timeout"),this.a&&this.b&&(this.b=w,this.c=p,this.a.abort(),this.c=w,this.dispatchEvent("complete"),this.dispatchEvent("abort"),sk(this)))};function pk(a){a.b=w;a.a&&(a.c=p,a.a.abort(),a.c=w);tk(a);sk(a)}function tk(a){a.n||(a.n=p,a.dispatchEvent("complete"),a.dispatchEvent("error"))}A.o=function(){this.a&&(this.b&&(this.b=w,this.c=p,this.a.abort(),this.c=w),sk(this,p));jk.s.o.call(this)};
A.Dc=function(){this.isDisposed()||(this.k||this.e||this.c?uk(this):this.Ae())};A.Ae=function(){uk(this)};
function uk(a){if(a.b&&"undefined"!=typeof fa&&(!a.g[1]||4!=(a.a?a.a.readyState:0)||2!=vk(a)))if(a.e&&4==(a.a?a.a.readyState:0))Zf(a.Dc,0,a);else if(a.dispatchEvent("readystatechange"),4==(a.a?a.a.readyState:0)){a.b=w;try{var b=vk(a),c,d;t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:d=p;break t;default:d=w}if(!(c=d)){var e;if(e=0===b){var f=Ve(String(a.p))[1]||s;if(!f&&self.location)var g=self.location.protocol,f=g.substr(0,g.length-1);e=!kk.test(f?f.toLowerCase():"")}c=
e}c?(a.dispatchEvent("complete"),a.dispatchEvent("success")):tk(a)}finally{sk(a)}}}function sk(a,b){if(a.a){qk(a);var c=a.a,d=a.g[0]?ha:s;a.a=s;a.g=s;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){}}}function qk(a){a.a&&a.r&&(a.a.ontimeout=s);"number"==typeof a.d&&(B.clearTimeout(a.d),a.d=s)}function vk(a){try{return 2<(a.a?a.a.readyState:0)?a.a.status:-1}catch(b){return-1}};function wk(a,b,c,d){if(!Xa(a.a)){var e=wk.a+"=",f=encodeURIComponent,g=[];c=c||"";b=b||"";for(var h in a.a)g.push(b+h+c),g.push(a.a[h].join("#"));(d||nk)(wk.b,s,"POST",e+f(g.join(":")));a.a={}}}wk.a="perf";wk.b="perf";function xk(a,b,c){this.Qb=a;this.c=b;this.a=c;this.b=F(this.ne,this)}I(xk,K);A=xk.prototype;A.Ab=w;A.Ja=s;A.stop=function(){this.Ja&&(B.clearTimeout(this.Ja),this.Ja=s,this.Ab=w)};A.o=function(){xk.s.o.call(this);this.stop()};A.ne=function(){this.Ja=s;this.Ab&&(this.Ab=w,yk(this))};function yk(a){a.Ja=Zf(a.b,a.c);a.Qb.call(a.a)};function zk(a){R.call(this);this.b=a}I(zk,R);zk.prototype.getId=y("b");zk.prototype.getKey=y("b");zk.prototype.zd=function(a){return Ga(this.a.a,a.a.a)};function Ak(a){R.call(this);this.f=(Je++).toString(36);this.c=new R;a=a||[];for(var b={},c=0;c<a.length;c++){var d=a[c],e=d.getKey();b[e]=d;d.na&&d.na(this.c)}this.a=Ya(b);this.d=a.length;Q(this.c,"change",F(this.oe,this))}I(Ak,R);A=Ak.prototype;A.Xa=s;A.Cb=w;A.xa=0;A.o=function(){Ak.s.o.call(this);for(var a in this.a)Ta(this.a[a]);this.c.C()};A.Ha=function(){return 0==this.d};A.$b=function(a){return this.a[a]};A.contains=function(a){return a in this.a};
A.add=function(a){var b=a.getKey();if(b in this.a)return w;this.a[b]=a;this.d++;a.na&&a.na(this.c);this.xa&&a.ka&&a.ka();Bk(this,"f",a);Ck(this);return p};A.remove=function(a){if(!(a in this.a))return w;var b=this.a[a],c=this.a;a in c&&delete c[a];this.d--;b.na&&b.na(s);this.xa&&b.la&&b.la();Bk(this,"g",b);Ck(this);return p};A.da=function(){return Wa(this.a)};A.ka=function(){this.xa++;if(1==this.xa)for(var a in this.a){var b=this.a[a];b.ka&&b.ka()}};
A.la=function(){if(1==this.xa)for(var a in this.a){var b=this.a[a];b.la&&b.la()}this.xa--;Ck(this)};function Bk(a,b,c){var d=a.Xa||{};b in d||(d[b]=[]);d[b].push(c);a.Xa=d}A.oe=function(a){Bk(this,"change",a.target);this.Cb=p;Ck(this)};A.u=function(a){return a===this};A.getKey=y("f");function Ck(a){if(!a.xa&&(a.Xa||a.Cb)){a.ka();var b=a.Cb;a.Cb=w;a.Xa&&(b=new Dk,a.Xa=s,a.dispatchEvent(b),b=p);b&&a.dispatchEvent("change");a.la()}}function Dk(){L.call(this,"h")}I(Dk,L);function Ek(a,b,c){this.c=a;this.a={};this.b={};this.d=c||[];Fk(this,b||[])}I(Ek,K);function Gk(a,b,c){a.a[b]=c;b=c.a;a.b[b]=(a.b[b]||0)+1}Ek.prototype.ja=function(a){D(this.a[a])||Fk(this,[a]);return this.a[a].ja()};
function Fk(a,b){for(var c=0,d=b.length;c<d;c++){var e=b[c],f=a.c[e];D(f)&&Gk(a,e,f)}c=0;for(d=b.length;c<d;++c)if(e=b[c],!D(a.a[e])){t:{var f=a.b,g=a.d,f=Ji(f);if(g){for(var h=[],l=0;l<g.length;l++)h.push(Ei(g[l]));g=h}if(g&&g.length){h=nb(Ai);for(l=0;l<g.length;l++)lb(h,g[l]);g=h}else g=Ai;for(var h=g[0],l=Infinity,m=0,r=g.length;m<r;++m){var q=g[m];if(!f[q]){f=q;break t}var t=f[q];t<l&&(h=q,l=t)}f=h}Gk(a,e,Li(f))}}Ek.prototype.o=function(){Ek.s.o.call(this);this.b=this.a=this.c=s};
Ek.prototype.clone=function(){var a=new Ek(Ya(this.c));a.a=Ya(this.a);a.b=Ya(this.b);return a};function Hk(a){Ak.call(this);this.e=a||new Ek({});this.b={}}I(Hk,Ak);Hk.prototype.o=function(){this.b=s;Hk.s.o.call(this)};Hk.prototype.add=function(a,b,c){this.ka();var d=Hk.s.add.call(this,a);b||(this.b[a.getId()]=a,Bk(this,"i",a));c&&Gk(this.e,a.getId(),c);this.la();return d};Hk.prototype.remove=function(a){this.ka();var b=this.b[a];b&&(delete this.b[a],Bk(this,"i",b));a=Hk.s.remove.call(this,a);this.la();return a};
Hk.prototype.g=function(a,b){E(a)||(a=a.getId());var c=this.b[a],d=!!c!=b;b?(c=this.$b(a),this.b[a]=c):delete this.b[a];d&&(Bk(this,"i",c),Ck(this))};function Ik(a,b,c,d,e){this.c=a;this.e=b;this.f=b.V();this.b=c;this.a=d;this.d=e||7;this.h=this.b*this.a}function Jk(a){var b;if(!(b=a.g)){b=a.e.t();for(var c=a.a,d=a.d,e=[],f=0,g=0;g<a.b;g++){for(var h=0;h<c;h++)e[f++]=b,b=Tc(b);for(;h<d;h++)b=Tc(b)}b=a.g=e}return b}Ik.prototype.u=function(a){return this.c.u(a.c)&&this.e.u(a.e)&&this.b==a.b&&this.a==a.a&&this.d==a.d};function Kk(a,b){var c=Xc(a);c.j=ya(a.year,a.month);var d=(c.m().V()-b+7)%7;c.j-=d+35;return new Ik(a,c.m(),7,7)}function Lk(){}
function Mk(a){this.a=a}I(Mk,Lk);function Nk(a,b,c,d,e,f,g,h,l,m){this.p=d;this.d=a;this.id=e||this.d.id+"_";this.className=f||"dp-";this.r=c;this.b=b;this.g={};a=D(g)?g:1;h=(1<<a+7)-(1<<a+(h||5));this.v=h+(h>>7);this.J=!!l;this.F=!!m;Ok[this.id]=this}I(Nk,K);var Ok={};A=Nk.prototype;A.kb=w;A.Ib=s;A.Cc=s;
function Pk(a,b){var c=a.id,d=a.className+"cell "+a.className,e=a.a;if(!a.c){a.n=[];for(var f=7;f--;)a.n[f]=fi(a.b,a.b.a.c[f]);for(var f=a.className,g=[],h=48;h--;){var l=["cell"];h&2?(l.push(h&1?"weekend-selected":"weekday-selected"),h&8&&l.push("today-selected"),l.push(h&4?"onmonth-selected":"offmonth-selected")):(l.push(h&1?"weekend":"weekday"),h&8&&l.push("today"),l.push(h&4?"onmonth":"offmonth"));h&16&&l.push("day-left");h&32&&l.push("day-right");g[h]=f+l.join(" "+f)+" "}a.h=g;a.f=[];a.c=a.id+
"day_";a.e=a.id+"cur"}b.push('<div class="',a.className,'monthtablediv monthtableSpace">');b.push('<table class="',a.className,'monthtable" role="presentation" cellspacing=0 cellpadding=0 style="-moz-user-select:none;-webkit-user-select:none;">');a.J?b.push('<tr id="',c,'header" class="monthtableHeader"><td colspan=',e.a-2,' id="',a.e,'" class="',d,'sb-cur">',a.F?'<span class="h zippy-arrow" unselectable=on>&nbsp;</span>':"",'<span class="calHeaderSpace">',ei(a.b,a.a.c),'</span></td><td colspan=2 class="',
d,'sb-nav"><span id="',c,'prev" class="',d,'sb-prev goog-inline-block"></span><span id="',c,'next" class="',d,'sb-next goog-inline-block"></span></td></tr>'):b.push('<tr class="',d,'heading"  id="',c,'header"><td id="',c,'prev" class="',d,'prev">&laquo;</td><td colspan=',e.a-2,' id="',a.e,'" class="',d,'cur">',ei(a.b,a.a.c),'</td><td id="',c,'next" class="',d,'next">&raquo;</td></tr>');b.push("</table>");f=ei(a.b,a.a.c);a.fa&&(f=a.fa+" - "+f);b.push('<table class="',a.className,'monthtable monthtableBody" summary="',
J(f),'" cellspacing=0 cellpadding=0 id="',c,'tbl" style="-moz-user-select:none;-webkit-user-select:none;"><colgroup span=7>');b.push('<tr class="',a.className,'days">');c=a.a.f;f=a.v;for(g=0;g<e.a;g++)b.push('<th scope="col" class="',d,"dayh"),f>>c&1&&b.push(" ",d,"weekendh"),b.push('" title="',a.b.a.b[c],'">',a.n[c],"</th>"),c=(c+1)%7;b.push("</tr>");var d=a.a,e=d.a,c=a.id,f=a.v,g=a.h,h=Jk(d),m=a.Ib,l=m?a.Ib.t():1,r=m?a.Cc.t():0,m=m?"pointer":"default",q=a.k.t(),t=a.a.c.month,u=0;a.w&&(a.g=a.w(d));
for(var x=0;x<a.a.b;x++){b.push('<tr style="cursor:',m,'" id="',c,"row_",x,'">');for(var v=d.f,C=e;C--;u++){var z=h[u],H=(z==q&&8)|((z>>5&15)==t&&4)|(z>=l&&z<=r&&2)|(C==e-1&&16)|(0==C&&32)|f>>v&1,v=(v+1)%7;a.f[u]=H;b.push('<td id="',a.c,z,'" class="',g[H],a.g[z],'">',z&31,"</td>")}b.push("</tr>")}b.push("</table>");b.push("</div>")}
A.render=function(){if(this.kb){var a=[];Pk(this,a);this.d.innerHTML=a.join("");var b=this.id,a=this.p;a(b+"prev").onmousedown=function(){Qk(Ok[b],-1)};a(b+"next").onmousedown=function(){Qk(Ok[b],1)}}};function Rk(a,b){var c=b.id;return c&&0==c.indexOf(a.c)?od(parseInt(c.substr(a.c.length),10)):s}function Sk(a,b){return a.p(a.c+b)}A.l=y("d");function Qk(a,b){Tk(a,cd(a.a.c.year,a.a.c.month+b,1).m())}function Tk(a,b){var c=a.a.c;if(b.year!=c.year||b.month!=c.month)a.a=Kk(b,a.r.a),a.update()}
A.update=function(){this.kb&&this.render()};A.getId=y("id");function Uk(a,b,c,d){a.Ib=b;a.Cc=c;d&&Tk(a,d);if(a.kb){d=Jk(a.a);b=b.t();c=c.t();for(var e=a.a.h;e--;){var f=a.f[e],g=d[e],h=g>=b&&g<=c?f|2:f&-3;h!=f&&(f=e,Sk(a,Jk(a.a)[f]).className=a.h[h]+(a.g[g]||""),a.f[e]=h)}}else a.update()}A.setup=function(a){this.k=a;this.a?this.update():this.a=Kk(a,this.r.a)};A.o=function(){delete this.d;delete Ok[this.id];Nk.s.o.call(this)};function Vk(a,b,c,d){R.call(this);this.selection=c;this.a=a;a.setup(qg(b));Uk(a,this.selection.a,this.selection.b,this.selection.focus);this.b=new Tf(this);this.b.B(c,"change",this.Fc);this.b.B(a.l(),"mousedown",this.ee);this.b.B(a.l(),"mouseover",this.fe);this.b.B(a.l(),"mouseout",this.ce);this.b.B(b,"newday",this.de);this.c=new Tf(this);this.e=b;this.d=!!d}I(Vk,R);A=Vk.prototype;A.Ga=s;A.ob=s;
A.le=function(a){var b=Rk(this.a,a.target),c=this.Ga;b&&c&&!(this.ob||c).u(b)&&(this.ob=b,this.selection.Ra(c.min(b),c.max(b),b));a.preventDefault()};A.ee=function(a){var b=a.target,c=Rk(this.a,b);c?(this.Ga=c,this.d&&this.selection.K(c),b=this.a.l().ownerDocument,this.c.B(b,"mousemove",this.le),this.c.B(b,"mouseup",this.me)):(c=this.a,(c.e==b.id||b.parentNode&&c.e==b.parentNode.id)&&this.dispatchEvent("k"));a.preventDefault()};
A.Qe=function(){var a=this.Ga;a&&(Xf(this.c),this.Ga=s,this.ob||(this.d?this.Fc():this.selection.K(a)),this.ob=s,this.dispatchEvent("j"))};A.me=Vk.prototype.Qe;A.fe=function(a){if((a=Rk(this.a,a.target))&&this.Ga==s){var b=this.a;Nd(Sk(b,a.t()),b.className+"onhover")}};A.ce=function(a){if(a=Rk(this.a,a.target)){var b=this.a;Od(Sk(b,a.t()),b.className+"onhover")}};A.Fc=function(){var a=n;this.Ga==s&&(a=this.selection.focus);Uk(this.a,this.selection.a,this.selection.b,a)};
A.de=function(){var a=this.a,b=qg(this.e);a.k=b;a.update()};A.o=function(){Ta(this.b);Ta(s);Ta(this.c);Ta(this.a);Vk.s.o.call(this)};function Wk(a,b,c,d,e,f){Xk.put("id",f||"");f=Vd(a);var g=ee(f.a,Xk.toString());this.d=b;a=a.appendChild(g);this.c=new Vk(new Nk(a,this.d,d,F(f.l,f)),c,e,p);Q(this.c,"j",this.he,w,this);c=this.c.a;c.kb=p;c.render();this.a=new eg(a);bg(this.a);c=this.a;ag(c);c.eb=p;this.b=a}I(Wk,K);A=Wk.prototype;A.o=function(){this.a&&(this.a.C(),this.a=s);this.b=s};A.T=function(a){this.a.T(a)};A.Ia=function(){return this.a.Ia()};A.he=function(){this.T(w)};A.l=y("b");var Xk=new U('<div id="dpPopup${id}" class="dp-popup" style="display: none;"></div>');function Yk(){}var Zk=new Yk,$k=["click",N?"keypress":"keydown","keyup"];Yk.prototype.B=function(a,b,c,d,e){function f(a){var c=dc(b);"click"==a.type&&(Lb?0==a.wa.button:"click"==a.type||a.wa.button&Pb[0])&&!(O&&yb&&a.Qa)?c.call(d,a):13!=a.keyCode&&3!=a.keyCode||"keyup"==a.type?32==a.keyCode&&"keyup"==a.type&&"button"==(a.target.getAttribute("role")||s)&&(c.call(d,a),a.preventDefault()):(a.type="keypress",c.call(d,a))}f.Qb=b;f.Ke=d;e?e.B(a,$k,f,c):Q(a,$k,f,c)};
Yk.prototype.Ua=function(a,b,c,d,e){for(var f,g=0;f=$k[g];g++){var h;var l=a;h=f;var m=!!c;h=Tb(l)?l.Bb(h,m):l?(l=fc(l))?l.Bb(h,m):[]:[];for(l=0;m=h[l];l++)if(m.$.Qb==b&&m.$.Ke==d){e?e.Ua(a,f,m.$,c,d):kc(a,f,m.$,c,d);break}}};var al={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps-lock",27:"esc",32:"space",33:"pg-up",34:"pg-down",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:"semicolon",61:"equals",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",
93:"context",96:"num-0",97:"num-1",98:"num-2",99:"num-3",100:"num-4",101:"num-5",102:"num-6",103:"num-7",104:"num-8",105:"num-9",106:"num-multiply",107:"num-plus",109:"num-minus",110:"num-period",111:"num-division",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",186:"semicolon",187:"equals",189:"dash",188:",",190:".",191:"/",192:"`",219:"open-square-bracket",220:"\\",221:"close-square-bracket",222:"single-quote",224:"win"};function bl(a){R.call(this);this.c={};this.b={sa:[],time:0};this.g=bb(cl);this.h=bb(dl);this.d=s;this.a=a;Q(this.a,"keydown",this.gb,w,this);N&&Q(this.a,"keyup",this.Gc,w,this);zb&&!N&&(Q(this.a,"keypress",this.Hc,w,this),Q(this.a,"keyup",this.Ic,w,this))}var el;I(bl,R);var cl=[27,112,113,114,115,116,117,118,119,120,121,122,123,19],dl="color date datetime datetime-local email month number password search tel text time url week".split(" "),fl={qe:"shortcut",pe:"shortcut_"};A=bl.prototype;
A.ya=function(a,b){var c=gl,d=this.c,e=arguments;if(E(e[1])){for(var e=e[1],e=e.replace(/[ +]*\+[ +]*/g,"+").replace(/[ ]+/g," ").toLowerCase(),e=e.split(" "),f=[],g,h=0;g=e[h];h++){var l=g.split("+"),m;g=0;for(var r,q=0;r=l[q];q++){switch(r){case "shift":g|=1;continue;case "ctrl":g|=2;continue;case "alt":g|=4;continue;case "meta":g|=8;continue}m=r;if(!el){l={};r=n;for(r in al)l[al[r]]=r;el=l}m=el[m];break}f.push({keyCode:m,qd:g})}e=f}else for(f=e,h=1,ka(e[1])&&(f=e[1],h=0),e=[];h<f.length;h+=2)e.push({keyCode:f[h],
qd:f[h+1]});c(d,e,a)};A.o=function(){bl.s.o.call(this);this.c={};kc(this.a,"keydown",this.gb,w,this);N&&kc(this.a,"keyup",this.Gc,w,this);zb&&!N&&(kc(this.a,"keypress",this.Hc,w,this),kc(this.a,"keyup",this.Ic,w,this));this.a=s};A.Gc=function(a){if(yb){if(224==a.keyCode){this.f=p;Zf(function(){this.f=w},400,this);return}var b=a.c||this.f;67!=a.keyCode&&88!=a.keyCode&&86!=a.keyCode||!b||(a.c=b,this.gb(a))}32==this.d&&32==a.keyCode&&a.preventDefault();this.d=s};
function hl(a){return zb&&!N&&a.Qa&&a.d&&!a.e}A.Hc=function(a){32<a.keyCode&&hl(a)&&(this.e=p)};A.Ic=function(a){!this.e&&hl(a)&&this.gb(a)};function gl(a,b,c){var d=b.shift(),d=d.keyCode&255|d.qd<<8,e=a[d];e&&c&&(0==b.length||E(e))&&k(Error("Keyboard shortcut conflicts with existing shortcut"));b.length?(e||(e=a[d]={}),gl(e,b,c)):a[d]=c}function il(a,b,c,d){c=c||0;return(d=(d||a.c)[b[c]])&&!E(d)&&1<b.length-c?il(a,b,c+1,d):d}
A.gb=function(a){var b;b=a.keyCode;if(16==b||17==b||18==b)b=w;else{var c=a.target,d="TEXTAREA"==c.tagName||"INPUT"==c.tagName||"BUTTON"==c.tagName||"SELECT"==c.tagName,e=!d&&(c.isContentEditable||c.ownerDocument&&"on"==c.ownerDocument.designMode);b=!d&&!e||this.g[b]?p:e?w:a.d||a.Qa||a.c?p:"INPUT"==c.tagName&&this.h[c.type]?13==b:"INPUT"==c.tagName||"BUTTON"==c.tagName?32!=b:w}if(b)if("keydown"==a.type&&hl(a))this.e=w;else{b=N?Yf(a.keyCode):a.keyCode;var c=b&255|((a.e?1:0)|(a.Qa?2:0)|(a.d?4:0)|(a.c?
8:0))<<8,f,g,d=G();this.b.sa.length&&1500>=d-this.b.time?f=il(this,this.b.sa):this.b.sa.length=0;f=f?f[c]:this.c[c];f||(f=this.c[c],this.b.sa=[]);f&&E(f)?g=f:f?(this.b.sa.push(c),this.b.time=d,N&&a.preventDefault()):this.b.sa.length=0;g&&(a.preventDefault(),f=a.target,c=this.dispatchEvent(new jl(fl.qe,g,f)),(c&=this.dispatchEvent(new jl(fl.pe+g,g,f)))||a.preventDefault(),this.b.sa.length=0,N&&(this.d=b))}};function jl(a,b,c){L.call(this,a,c);this.c=b}I(jl,L);function kl(a){zk.call(this,a.getId());this.a=a}I(kl,zk);kl.prototype.setTitle=function(a){this.a.a!=a&&(this.a.setTitle(a),this.dispatchEvent("change"))};kl.prototype.ja=function(){return this.a.ja()};kl.prototype.va=y("a");function ll(){Hk.call(this)}I(ll,Hk);ll.prototype.$b=function(a){return ll.s.$b.call(this,a)};function ml(a){this.list=a;this.id=nl++;this.a="goog$calendar$CalendarList$"+this.id+"showHideCalendar";a=F(this.list.g,this.list);ga(this.a,a)}ml.prototype.b=ha;ml.prototype.c=ha;var ol=0,nl=0;function pl(a){ml.call(this,a)}I(pl,ml);var ql=new U('<div class="calendar-row"><label for="cal${calIndex}checkbox${id}"><input type="checkbox" name="calVisibility${id}" id="cal${calIndex}checkbox${id}" value="${cid}" onclick="${onclickCall}" ${checked}><span style="color: ${titleColor}">${name}</span></label></div>');function rl(a,b){this.f=a;var c=b||Vd(),d=c.xe("div",{style:"position:absolute;display:none;z-index:25000003"});c.we(c.a.body,d);eg.call(this,d);bg(this)}I(rl,eg);
rl.prototype.g=function(){this.T(w);if(!this.Ia()){var a=this.P,b=this.f,c=[];b.b(c);c.push('<div id="calendarList',b.id,'" class="calendar-list">');var d=Va(b.list.a);ql.put("id",b.id);for(var e=0;e<d.length;++e){var f=d[e].va(),g=f.getId(),h=++ol,l=b.list,m=g;E(m)||(m=m.getId());l=m in l.b?"checked":"";ql.put("calIndex",h);ql.put("cid",g);ql.put("checked",l);ql.put("titleColor",f.ja().a);ql.put("name",J(f.a));ql.put("onclickCall",b.a+"(value, this.checked);");c.push(ql.toString())}c.push("</div>");
b.c(c);a.innerHTML=c.join("");this.T(p)}};function sl(a,b,c,d,e){R.call(this);this.b=b;b=e||{};for(var f in tl)f in b||(b[f]=tl[f]);this.n=a;this.c=Vd(a);this.f=c;this.h=[];this.d=s;this.F=b.showNavigation;this.J=b.showTabs;this.qc=b.showPrintButton;this.g=b.showDateMarker;this.w=b.showCalendarMenu;this.Md=b.showTz;this.Ld=b.showSubscribeButton;this.Kd=b.showElementsLogo;this.a=ul++;a=this.fa=new fg(this);this.Id=a.a(this.Ca);this.vc=a.a(this.Od);this.Ya=a.a(this.Jd);this.Nd=a.a(this.Td);this.ab=a.a(this.Sd);this.k=new Tf(this);this.e=d;
Q(this.e,"h",this.Rd,w,this);this.r=s;Q(this.b.a,"newday",this.Qd,w,this);this.selection=new Ad;d=new Cd;d.K(qg(this.b.a));Bd(this.selection,d);d=vl;d.put("topHtml",wl(this));d.put("bottomHtml","");a=[];M&&(a.push("ie"),P("8")?a.push("ie8"):P("7")?a.push("ie7"):a.push("ie6"));d.put("extraClasses",a.join(" "));a="";this.Kd?(xl.put("imagePath",this.b.c),a=xl.toString()):this.Ld&&(yl.put("subscribe",this.Nd),yl.put("imagePath",this.b.c),a=yl.toString());c="";this.Md&&(zl.put("tz",this.b.d?"Events shown in time zone: "+
this.b.p:"Events shown in your computer's time zone"),c=zl.toString());Al.put("addButton",a);Al.put("tz",c);Al.put("id",this.a);d.put("id",this.a);d.put("footer",Al.toString());this.n.innerHTML=d.toString();d=this.c.l("nav"+this.a);a=[];this.F&&(Bl.put("id",this.a),Bl.put("protocol",Ij()?"https://":"http://"),a.push(Bl.toString()));this.g&&(Cl.put("id",this.a),Cl.put("toggleDatePicker",this.vc),Cl.put("hoverDatePicker",this.Ya),a.push(Cl.toString()),Dl.put("id",this.a),Dl.put("imagePath",this.b.c),
Dl.put("toggleDatePicker",this.vc),Dl.put("hoverDatePicker",this.Ya),a.push(Dl.toString()));a.push('<td class="navSpacer">&nbsp;</td>');this.qc&&(a.push('<td><img src="'+this.b.c+'icon_print.gif" style="cursor: pointer;" onclick="'+this.ab+'()"  title="Print my calendar (shows preview)" width="16" height="16"></td>'),a.push('<td><div class="tab-name" onclick="'+this.ab+'()">Print</div></td>'));a.push('<td id="calendarTabs',this.a,'"></td>');this.w&&(El.put("id",this.a),El.put("imagePath",this.b.c),
a.push(El.toString()));1>=a.length?a="":(Fl.put("navContent",a.join("")),a=Fl.toString());d.innerHTML=a;this.F&&(Xf(this.k),d=this.c,Wf(this.k,d.l("navBack"+this.a),Zk,this.sc),Wf(this.k,d.l("navForward"+this.a),Zk,this.tc),Wf(this.k,d.l("todayButton"+this.a),Zk,this.uc));Q(this.selection,"change",this.gc,w,this);this.w&&(d=Gl(this),d.e=6,d.ga&&d.Pa(),d=Gl(this),a=this.c.l("calendarListButton"+this.a),Q(a,"mousedown",d.g,w,d),d.d=new Sf(a,7)||n,d.ga&&d.Pa());this.J&&sg(this);this.g&&(this.p=new Wk(this.n,
this.b.b,this.b.a,new Mk(this.b.e),this.selection,String(this.a)));tg(this);this.v=s;b=b.pingInterval||36E5;-1!=b&&(this.fc=window.setInterval(F(this.Pd,this),b))}I(sl,R);var ul=1;sl.prototype.o=function(){sl.s.o.call(this);this.k.C();this.e.C();D(this.fc)&&window.clearInterval(this.fc);this.fa.C()};var tl={showNavigation:p,showPrintButton:p,showTabs:p,showDateMarker:p,showCalendarMenu:p,showSubscribeButton:p,showTz:p,showElementsLogo:w};
sl.prototype.Jd=function(a){if(this.g){var b=this.c.l("dateEditableBox"+this.a),c=this.c.l("dateMenuArrow"+this.a),d=this.c.l("arrowImg"+this.a);a?(b.className="date-picker-on",c.className="date-picker-on date-picker-arrow-on",d.src=this.b.c+"menu_arrow_hover.gif"):(b.className="date-picker-off",c.className="date-picker-off",d.src=this.b.c+"menu_arrow_open.gif")}};sl.prototype.Od=function(){this.g&&(this.p.Ia()?this.p.T(w):(this.p.T(p),Pf(this.c.l("dateMenuArrow"+this.a),7,this.p.l(),6,n,5)))};
function Gl(a){if(!a.r){var b=new pl(a.e);a.r=new rl(b,a.c)}return a.r}
var vl=new U('<div class="calendar-container ${extraClasses}">${topHtml}<div class="view-cap t1-embed">&nbsp;</div><div class="view-cap t2-embed">&nbsp;</div><div class="view-container-border" id="calendarContainer${id}"><div id="viewContainer${id}" class="view-container"></div>${footer}<div id="loading${id}" class="loading">Loading...</div></div><div class="view-cap t2-embed">&nbsp;</div><div class="view-cap t1-embed">&nbsp;</div>${bottomHtml}</div>'),Hl=new U('<div class="header" id="nav${id}" ${headerStyle}>&nbsp;</div>'),
Fl=new U('<div class="date-controls"><table class="nav-table" cellpadding="0" cellspacing="0" border="0"><tr>${navContent}</tr></table></div>'),Bl=new U('<td class="date-nav-buttons"><button class="today-button" id="todayButton${id}">Today</button><img id="navBack${id}" role=button tabindex=0 title="'+J("Previous period")+'" src="${protocol}calendar.google.com/googlecalendar/images/blank.gif" width=22 height=17 class="navbutton navBack"><img id="navForward${id}" role=button tabindex=0 title="'+J("Next period")+
'" src="${protocol}calendar.google.com/googlecalendar/images/blank.gif" width=22 height=17 class="navbutton navForward"></td>'),Dl=new U('<td id="dateMenuArrow${id}" class="date-picker-off" onmouseover="${hoverDatePicker}(true);"onmouseout="${hoverDatePicker}(false);"onmousedown="${toggleDatePicker}()"><img src="${imagePath}menu_arrow_open.gif" id="arrowImg${id}" class="arrowImg" width=9 height=9></td>'),Cl=new U('<td id="dateEditableBox${id}" class="date-picker-off"onmouseover="${hoverDatePicker}(true);"onmouseout="${hoverDatePicker}(false);"onmousedown="${toggleDatePicker}()"><div class="date-top" id="currentDate${id}">&nbsp;</div></td>'),
Il=new U('<td class="ui-rtsr"><div class="${tab_class} t1-embed">&nbsp;</div><div class="${tab_class} t2-embed">&nbsp;</div><div class="${tab_class} ui-rtsr-name" onclick="${changeTab}(\'${viewType}\')">${tab_name}</div></td>'),El=new U('<td class="calendar-nav"><img id="calendarListButton${id}" src="${imagePath}btn_menu6.gif" alt="" title="" width=15 height=14></td>'),Al=new U('<table id="footer${id}" class="footer" cellpadding="0" cellspacing="0"width="100%"><tr>${tz}${addButton}</tr></table>'),
zl=new U('<td valign="bottom" id="timezone">${tz}</td>'),yl=new U('<td valign="bottom"><img align="right" class="subscribe-image" src="${imagePath}calendar_plus_en.gif" height=17 alt="'+J("Add to Google Calendar")+'" onclick="${subscribe}();"></td>'),xl=new U(M&&7>Gb?'<td valign="bottom" align="right"><a target="_blank" href="http://www.google.com/webelements"><span style="width:130px;height:20px;display:inline-block;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=${imagePath}gwe.png,sizingMethod=crop);"</span></a></td>':
'<td valign="bottom"><a target="_blank" href="http://www.google.com/webelements"><img align="right"  src="${imagePath}gwe.png" width="130" height="20" border="0"></a></td>');function wl(a){var b='style="overflow:hidden'+(a.F||a.g||a.J||a.w||a.qc?'"':'; display:none"');Hl.put("id",a.a);Hl.put("headerStyle",b);return Hl.toString()}
function tg(a){if(!(0>=te(a.n).clientHeight)){var b=(parseInt(a.n.style.height,10)||0)-(a.c.l("footer"+a.a).offsetHeight+a.c.l("nav"+a.a).offsetHeight+4),c=rg(a);0>=b&&(b=1);c.style.height=b+"px";Jl(a)}}A=sl.prototype;
A.Sd=function(){var a=this.d,b=a.Z().toUpperCase(),c;c=window.location.href;var d=c.search(cf),e;i:{for(e=0;0<=(e=c.indexOf("pvttk",e))&&e<d;){var f=c.charCodeAt(e-1);if(38==f||63==f)if(f=c.charCodeAt(e+5),!f||61==f||38==f||35==f)break i;e+=6}e=-1}if(0>e)c=s;else{f=c.indexOf("&",e);if(0>f||f>d)f=d;e+=6;c=decodeURIComponent(c.substr(e,f-e).replace(/\+/g," "))}d=[];e=Wa(this.e.b);for(f=0;f<e.length;++f){var g=this.b.r?e[f]:Oj(e[f]);g&&d.push(decodeURIComponent(g))}e=this.b.g;a=a.O();b=af(e.a+"/print_preview",
"dates",a.toString(),"hl","en","ctz",e.e,"pgsz","letter","wkst",String(e.g+1),"mode",b,"wdtp",this.b.f?s:"23456","pvttk",c,"src",d);b=window.open(b.toString(),"goocalprint","location=0,status=0,fullscreen=0,directories=0,toolbar=0,menubar=0,width=600,height=680",p);try{b.document.close(),b.focus()}catch(h){}};
function sg(a){if(a.J){var b=a.h,c=a.d,d=["<table cellpadding=0 cellspacing=0><tr>"];Il.put("changeTab",a.Id);for(var e=0;e<b.length;e++){var f=b[e],g=f===c?"ui-rtsr-selected":"ui-rtsr-unselected";0==e&&(g+=" ui-rtsr-first-tab");e==b.length-1&&(g+=" ui-rtsr-last-tab");Il.put("tab_class",g);Il.put("tab_name",f.pa);Il.put("viewType",f.Z());d.push(Il.toString())}d.push("</tr></table>");a.c.l("calendarTabs"+a.a).innerHTML=d.join("")}}
A.te=function(a){switch(a.c){case "today":this.uc();break;case "prev":this.sc();break;case "next":this.tc();break;case "dayview":this.Ca("day");break;case "weekview":this.Ca("week");break;case "monthview":this.Ca("month");break;case "agendaview":this.Ca("agenda")}};
A.Ca=function(a){if("string"==typeof a){var b=a;a=s;for(var c=0;c<this.h.length;++c){var d=this.h[c];if(d.Z()==b){a=d;break}}if(!a)return w}b=0==a.Z().lastIndexOf("next",0);if(a==this.d&&!b)return w;this.d&&this.d.Fa();if(this.d=a)a=this.d.selection,a.Ra(this.selection.a,this.selection.b,this.selection.focus),Bd(this.selection,a);this.gc();Jl(this);sg(this);return p};A.Rd=function(){Jl(this)};function Jl(a){(a=a.d)&&a.render()}
function Bg(a,b,c){Kl(a,p);hj(a.f,Wa(a.e.b),b,function(b){c.call(s,b);Kl(a,0<a.f.f)})}A.Pd=function(){if(this.d&&!(0>=te(this.n).clientHeight)){var a=this.f,b=this.d.O(),c=F(this.se,this),b=ij(a,Wa(a.d),b,c,p),d;for(d in b.a){var c=a.d[d],e=a.a[d],f=F(a.h,a,d,b);c.nb(b.a[d],f,e.d)}}};A.se=function(){Jl(this)};
function Kl(a,b){var c=a.c.l("loading"+a.a),d=c.style,e;if(a.v!=s)e=a.v;else{e=Kf();var f=rg(a);e+=a.c.l("calendarContainer"+a.a).offsetWidth-(f.offsetWidth+f.offsetLeft);a.v=e}d.right=e+"px";c.style.display=b?"block":"none"}A.Qd=function(){window.setTimeout(F(this.Pe,this),3E5*Math.random())};A.Pe=function(){Jl(this)};A.tc=function(){this.d.ud()};A.sc=function(){this.d.td()};A.uc=function(){var a=qg(this.b.a);this.selection.K(a)};
A.gc=function(){this.g&&this.d&&(this.c.l("currentDate"+this.a).innerHTML=J(this.d.Rb()))};A.getId=y("a");function rg(a){return a.c.l("viewContainer"+a.a)}A.Td=function(){for(var a=Wa(this.e.b),b=[],c=0;c<a.length;++c)if(this.b.r)b.push(a[c]);else{var d=Oj(a[c]);d&&b.push(decodeURIComponent(d))}window.open(af(this.b.g.a+"/render","cid",b))};function Ll(a,b,c){this.b=a;this.a=b;this.d=new Tf(this);if(c||.05>Math.random())this.d.B(this.a,"a",this.e),this.d.B(this.a,["b","c"],this.f);Ml(this)}I(Ll,K);Ll.prototype.o=function(){this.d.C()};function Nl(a,b){return b.target.Z()+"_"+a}function Ml(a){var b=B.gcal$perf$serverTime,c=B.gcal$perf$headStartTime;D(b)&&D(c)&&(a.b.log("container",G()-c+b),jc(a.a,"c",function(a){var e=G()-c;this.b.log(Nl("loadTime",a),e);this.b.log(Nl("totalLoadTime",a),e+b)},w,a))}Ll.prototype.e=function(){this.c=new oj(this.b)};
Ll.prototype.f=function(a){if(this.c){var b="c"==a.type,c=this.c,d=Nl(b?"insertDom":"computeContent",a)||c.b,e=G();c.d.log(d,e-c.c);c.c=e;b&&(b=this.c,a=Nl("render",a)||b.b,c=G(),b.d.log(a,c-b.a),b.c=c,this.c=s)}};function Ol(a,b,c,d,e){R.call(this);this.e=b;this.f=a;this.b=c||"GET";this.k=d;this.c=e||"json"}I(Ol,R);var Pl=[],Ql=0;Ol.prototype.h=w;function Rl(a,b){nk(b,F(a.n,a),a.g,a.k,a.a,2E4)}var Sl=/(text\/(plain|javascript)|application\/(json|x-javascript))/;
Ol.prototype.n=function(a){var b=a.target;a=s;var c=w;if(412==vk(b)){var d=b.a&&4==(b.a?b.a.readyState:0)?b.a.getResponseHeader("X-Redirect-Location"):n;if(d&&!this.h){this.h=p;Rl(this,d);return}}else if(200==vk(b)||201==vk(b)){c=p;try{d=b.a&&4==(b.a?b.a.readyState:0)?b.a.getResponseHeader("Content-Type"):n}catch(e){}if(d&&Sl.test(d))try{var f;try{f=b.a?b.a.responseText:""}catch(g){f=""}a=$g(f)}catch(h){}}this.ea=a;this.dispatchEvent(c?"l":"m");this.C()};
ga("goog$calendar$GdataRequest$callback",function(a,b,c){var d=Pl[b];d&&(d.ea=a,d.dispatchEvent(c?"m":"l"),d.C(),delete Pl[b])});function Tl(a,b){var c=a.title||b||"",d=wf(a.icon);zf.call(this,c,d);this.d=a}I(Tl,zf);A=Tl.prototype;A.Wc=w;A.ma="";A.Xc="";A.Vc="";A.rb=function(){Ul(this);return this.R};A.getHeight=function(){Ul(this);return this.a};A.ua=function(){Ul(this);return this.Xc};A.Z=function(){Ul(this);return this.type};A.Zc=function(){Ul(this);return this.c};A.yd=function(){Ul(this);return this.Vc};
function Ul(a){if(!a.Wc){var b=a.d,c=b.type;if(c){var d=2;"application/x-google-gadgets+xml"==c?d=1:c.match(/^image/i)&&(d=3);a.type=d}b.hasWebContentElement&&(a.Xc=yf(b.url),a.Vc=b.display||"ICON",a.R=parseInt(b.width,10)||300,a.a=parseInt(b.height,10)||400,b.gadgetPreferences&&(a.c=b.gadgetPreferences));a.Wc=p}};function Vl(){}function Wl(a,b,c){b=a.Cd(b);return new Tl(b,c)}function Xl(a,b){for(var c=0;c<b.length;++c)"alert"!=b[c].method||b[c].absoluteTime||Zi(a,b[c].minutes||60*b[c].hours||1440*b[c].days)}function Yl(a,b,c){if(b&&0>a.indexOf("ctz=")){var d=0>a.indexOf("?")?"?":"&";a+=d+"ctz="+b}c&&(d=0>a.indexOf("?")?"?":"&",a+=d+"pvttk="+c);return a};function Zl(){}I(Zl,Vl);A=Zl.prototype;A.zc=ca("json");A.cd=function(a){return a.feed.entry||[]};A.od=function(a){return a.entry||[]};A.dd=function(a){return a.feed.title.$t};A.rd=function(a){return a.title.$t};A.sd=ca("feed");A.pd=function(a){return a.updated.$t};A.ed=function(a){return a.feed.updated.$t};
A.Cd=function(a){var b={};b.icon=a.href;b.title=a.title;b.type=a.type;if(a=a.gCal$webContent)if(b.hasWebContentElement=p,b.url=a.url,b.display=a.display,b.width=a.width,b.height=a.height,a=a.gCal$webContentGadgetPref){for(var c={},d=0;d<a.length;++d){var e=a[d];c[e.name]=e.value}b.gadgetPreferences=c}return b};
A.hd=function(a,b,c){for(var d=[],e=0;e<a.length;++e){var f=a[e],g=f.id.$t,h=f.title.$t,l,m=w;f.content?l=f.content.$t:(l="",h="busy",m=p);var r=f.link,q=f.gd$where,q=q&&q[0],t=f.gd$when[0],u=xd(t.startTime,!b),x=xd(t.endTime,!b),g=aj(g,u,x);g.setTitle(h);g.d=l;if(r&&!m)for(l=0,m=r.length;l<m;++l)if("alternate"==r[l].rel&&"text/html"==r[l].type){g.ta=Yl(r[l].href,b,c);break}q&&(g.c=q.valueString);if(r)for(l=0;l<r.length;++l)if(q=r[l],"http://schemas.google.com/gCal/2005/webContent"===q.rel){h=Wl(this,
q,h);g.mb=h?h:s;break}Xl(g,t.gd$reminder||[]);if(t=(t=(t=(t=f.gd$who)&&t[0])&&t.gd$attendeeStatus)&&t.value)g.b=Pj(t);(f=f.gd$eventStatus)&&"http://schemas.google.com/g/2005#event.canceled"==f.value&&(g.qa=p);d.push(g)}return d};function $l(){}I($l,Vl);A=$l.prototype;A.zc=ca("jsonc");A.cd=function(a){return a.data.items||[]};A.od=function(a){return a.items||[]};A.dd=function(a){return a.data.title};A.rd=function(a){return a.title};A.sd=ca("data");A.pd=function(a){return a.updated};A.ed=function(a){return a.data.updated};A.Cd=function(a){a.hasWebContentElement=a.url||a.width||a.height||a.display||a.gadgetPreferences;return a};
A.hd=function(a,b,c){for(var d=[],e=0;e<a.length;++e){var f=a[e],g=f.id,h=f.title,l,m=w;f.details||""==f.details?l=f.details:(l="",h="busy",m=p);var r=f.location,q=f.when[0],t=xd(q.start,!b),u=xd(q.end,!b),g=aj(g,t,u);g.setTitle(h);g.d=l;f.alternateLink&&!m&&(g.ta=Yl(f.alternateLink,b,c));r&&(g.c=r);f.webContent&&(h=Wl(this,f.webContent,h),g.mb=h?h:s);Xl(g,q.reminders||[]);if(q=(q=(q=f.attendees)&&q[0])&&q.status)g.b=Pj(q);(f=f.status)&&"http://schemas.google.com/g/2005#event.canceled"=="http://schemas.google.com/g/2005#event."+
f&&(g.qa=p);d.push(g)}return d};function am(a,b,c,d,e,f,g){(f=c.match(Nj))&&(c=f[1]+"embed");Ij()&&(c=c.replace(/^http:/,"https:"));pj.call(this,c,b,d,e);this.c=a;this.g=af(c,"ctz",this.c.d);b=window.location.href;a=Ve(this.g);b=Ve(b);this.r=a[3]==b[3]&&a[1]==b[1]&&a[4]==b[4];this.n=this.c.a;this.b=g||(qi.b[67]?new $l:new Zl)}I(am,pj);am.prototype.f=function(a,b){for(var c=bm(this,this.b.od(a)),d=this.b.pd(a),e=c.length-1;0<=e;--e)$i(c[e],this);kj(this.d,this.getId(),c,b,d)};
am.prototype.nb=function(a,b,c){var d=this.g,e=a.start.m(),f=a.end.m(),g=this.n.Ea(G()+tj);a=Kj(e.ca(),g/6E4);g=Kj(f.ca(),g/6E4);e=Wc(f,e);d=af(d,"singleevents","true","start-min",a,"start-max",g,"max-results",48*e.j,"updated-min",c);c=xf();c!=s&&(d=af(d,"sessionidx",c));var h;c="SCRIPT";this.r&&(h=Hj(),c="GET");h=new Ol(d,h,c,n,this.b.zc());this.c.v&&(h.d=this.c.v);Q(h,"l",F(this.p,this,b));Q(h,"m",F(this.k,this,b));"SCRIPT"==h.b?(b=++Ql,Pl[b]=h,d=af(h.f,"alt",h.c+"-in-script","callback","goog$calendar$GdataRequest$callback",
"reqid",b),h=document.createElement("script"),h.src=d,d=document.createElement("div"),d.style.display="none",d.innerHTML="<script defer>goog$calendar$GdataRequest$callback(null,"+b+",true);\x3c/script>",document.body.appendChild(h),document.body.appendChild(d)):(h.a={},h.a["X-If-No-Redirect"]=1,h.a["Content-Type"]="application/"+("json"==h.c?"atom+xml":"json"),h.e&&!h.d&&(h.a||(h.a={}),h.a.Authorization="GoogleLogin auth="+h.e),"PUT"==h.b||"DELETE"==h.b?(h.a["X-HTTP-Method-Override"]=h.b,h.g="POST"):
h.g=h.b,b=h.f,h.d&&(b=bf(b,"xsrftok",h.d)),Rl(h,bf(b,"alt",h.c)))};am.prototype.p=function(a,b){var c=b.target.ea,d=this.b.dd(c);this.a!=d&&this.setTitle(d);d=bm(this,this.b.cd(c));a.call(s,d,this.b.ed(c))};am.prototype.k=function(a){a.call(s,s)};var cm=/^https?:\/\/(?:[^\/]*)\.google\.com(?:\:\d+)?\/calendar\/feeds\/[\w%\.]+\/private-(\w+)\//;function bm(a,b){for(var c=a.c.d,d=a.e.match(cm),d=d&&d[1],c=a.b.hd(b,c,d),d=0;d<c.length;++d)$i(c[d],a);return c};function dm(a,b,c,d,e){am.call(this,a,b,c,d,e)}I(dm,am);dm.prototype.Xb=-1;function em(a){this.e=a||(qi.b[67]?new $l:new Zl)}I(em,ak);em.prototype.init=function(a,b){this.c=a;this.d=b;this.b=a.g.f+"/"};em.prototype.create=function(a,b,c,d){0!=a.indexOf(this.b)&&(a=this.b+a);var e;60<=b?e=new dm(this.c,this.d,a,d,c):e=new am(this.c,this.d,a,d,c);return e};em.prototype.a=function(a,b,c){var d=b.color,e=b.gdata&&b.gdata[this.e.sd()],f=e?this.e.rd(e):b.title;a=this.create(a,b.access||0,d?Gi(d):n,f);e&&a.f(e,c);return a};function fm(a){(a||window).location.reload(p)};function gm(a){qi=new ri(a.features);this.data=a;this.b=new Aj(a);bk.goog$calendar$GdataCalendar=new em;bk.gcal$connect$ApiV3Calendar=new ck}I(gm,K);gm.prototype.d=s;
gm.prototype.setup=function(){var a=this.data,b=Yd(a.aa||"container"),c=this.b.domain;(c=c&&c.c)&&(mg=c);if(M)try{document.execCommand("BackgroundImageCache",w,p)}catch(d){}this.f=new ej;this.e=new ll;if(a.useApiV3||a.xsrftok){var c=36E5*Math.abs(20),e=36E5*Math.abs(3),e=Math.floor(Math.random()*e);Zf(fm,c+e)}c=a.preloadStart;e=a.preloadEnd;c&&e&&(this.c=new T(wd(c),wd(e)));c=a.useApiV3?"gcal$connect$ApiV3Calendar":"goog$calendar$GdataCalendar";c=bk[a.calendarFactoryClass||c]||s;c.init(this.b,this.f);
var e=this.e,f=a.cids||{};e.ka();for(var g in f){var h=c.a(g,f[g],this.c),l=f[g].hidden;e.add(new kl(h),l)}e.la();a.skin&&(b.className=b.className+" "+a.skin);b.style.position="relative";this.g(b);hm(this,b);this.a=new sl(b,this.b,this.f,this.e,a);this.d=new mj;new Ll(this.d,this.a);Hj()&&(a=window.location.pathname,a=ta(wk,this.d,a.substr(a.lastIndexOf("/")+1)+"_",n,n),window.setTimeout(a,3E5),window.setInterval(a,36E5));a=qg(this.b.a);this.c&&!this.c.contains(a)&&(a=this.c.start);this.a.selection.K(a);
a=this.a;b=new im;"day"==this.data.view&&new jm(a,this.b,b,1);new jm(a,this.b,b);new km(a,this.b,b);new Gg(a,this.b,new Vi(this.b.b,b));this.a.Ca(this.data.view);ga("_ShowPerf",ta(lj,this.d))};function hm(a,b){var c=F(a.g,a,b),d=new xk(c,100);Q(window,"resize",function(){d.Ja?d.Ab=p:yk(d)})}
gm.prototype.g=function(a,b){if(this.b.w){var c;c=(c=Yd("calendarTitle"))?c.offsetHeight:0;var d=Yd("warningBox");d&&(c+=d.offsetHeight);d=Vd(a);d=be(d.a);d=b||ae(d||window).height;this.h!=d&&(c=d-c,0>=c&&(c=1),a.style.height=c+"px",this.a&&tg(this.a),this.h=d)}};function lm(){this.a={}}I(lm,K);lm.prototype.o=function(){lm.s.o.call(this);this.a=s};function im(){Ri.call(this);this.f=new lm}I(im,Ri);im.prototype.a=function(a){return a.va().ja()};im.prototype.c=function(a){return(a=a.Q())&&a.ma?'<img class=cwci src="'+a.ma+'">':""};im.prototype.b=function(a){a=a.b;return 2==a||6==a};
im.prototype.e=function(a){var b=this.f,b=b.a["{N, plural, =0 {0 events} =1 {1 event} other {# events}}"]||(b.a["{N, plural, =0 {0 events} =1 {1 event} other {# events}}"]=new xh("{N, plural, =0 {0 events} =1 {1 event} other {# events}}"));a={N:a};if(0==b.d.length)b="";else{var c=[];Ch(b,b.d,a,w,c);for(a=c.join("");0<b.a.length;)a=a.replace(b.b(b.a),b.a.pop());b=a}return b};function mm(a){this.b=a;this.e=[];this.c=[];this.f=[];this.a=new Tf(this)}I(mm,K);mm.prototype.g=w;mm.prototype.o=function(){this.a.C();this.f=this.c=this.e=this.b=this.a=s};function nm(a){this.a=a}function om(a,b){this.a=a;this.b=b}I(om,nm);function pm(a,b,c){b=new om(b,c);a.g||(Wf(a.a,a.b,Zk,F(a.d,a,a.e)),a.a.B(a.b,"click",F(a.d,a,a.c)),a.a.B(a.b,"dblclick",F(a.d,a,a.f)),a.g=p);a.c.push(b)}
mm.prototype.d=function(a,b){for(var c=b.target,d=0;d<a.length;d++){var e=a[d],f=e.a(c);if(f){e.b(f,b);b.preventDefault();break}}};function qm(a,b){return rm(a,b)!==s}function rm(a,b){for(var c=Md(b),d=0;d<c.length;++d){var e=c[d];if(0==e.lastIndexOf(a,0))return e.substring(a.length)}return s}function sm(a,b){var c;t:{c=b;for(var d=ta(qm,"ca-evp");c;){if(d(c))break t;if(a&&c==a)break;c=c.parentNode}c=s}return c}function tm(a){return he(a,ta(qm,"ca-mlp"))};function um(){}ia(um);um.prototype.a=0;function vm(a,b,c){this.a=a;this.e=new fg(this);this.b=":"+(um.ib().a++).toString(36);this.f=b||1001;this.c=Vd(a);this.d=!!c}I(vm,K);A=vm.prototype;A.L=s;A.W=s;A.S=s;A.R=400;A.Tb=0;A.Ub=0;A.pb=w;A.Sb=s;A.o=function(){this.e.C();Ta(this.S);vm.s.o.call(this)};
A.init=function(){if(!this.L){var a;this.d?(wm.put("id",this.b),wm.put("zIndex",this.f),xm.put("id",this.b),wm.put("prong",xm.toString()),a=wm.toString()):(a=this.e.a(this.Gb),ym.put("id",this.b),ym.put("zIndex",this.f),ym.put("closeHandler",a),zm.put("id",this.b),zm.put("closeHandler",a),ym.put("cornerT1",Am(this,"tl")),ym.put("cornerT2",Am(this,"tr")),ym.put("cornerB1",Am(this,"bl")),ym.put("cornerB2",Am(this,"br")),ym.put("prong",zm.toString()),a=ym.toString());a=ee(this.c.a,a);this.L=this.a.appendChild(a);
this.L.style.width=this.R+"px";this.W=this.c.l("prong"+this.b);this.S=new eg(this.L);bg(this.S);a=this.S;ag(a);a.eb=p;this.S.Hb=w;this.d&&Q(this.c.l("bubbleClose"+this.b),"click",this.Gb,w,this);Q(this.S,"beforehide",F(this.be,this));Q(this.S,"hide",F(this.Ac,this))}};A.l=y("L");function Am(a,b){Bm.put("id",a.b);Bm.put("pos",b);return Bm.toString()}function Cm(a,b,c){var d=a.left+10,e=a.top+a.height-10,f=a.top+10;return new le(d,Math.max(a.left+a.width-10-b,d),Math.max(e-c,f),f)}
A.render=function(a,b,c,d,e,f,g){var h=this.c.l("bubbleContent"+this.b);if(h)if(E(c)){for(h.innerHTML="<pre>"+c+"</pre>";h.firstChild.firstChild;)h.appendChild(h.firstChild.firstChild);h.removeChild(h.firstChild)}else this.Ac(),h.innerHTML="",this.Sb=c,c.render(h);Ce(this.c.l("bubbleClose"+this.b),!e);d&&jc(this.S,"beforehide",d);this.Tb=a;this.Ub=b;this.pb=!f;this.g=c.event&&c.event.Za?c.event.Za():w;this.d&&(a=this.c.l("bubblePromo"+this.b),Ce(a,!!g),g&&(g.render(a),this.h=g));if(this.d){this.pb&&
(this.W.style.display="block");this.L.style.display="block";g=this.Tb;h=this.Ub;a=this.L.offsetWidth;b=this.W.offsetWidth;c=Math.round((this.R-b)/2);d=ie(this.c);d=new le(0,d.width,d.height,0);var l=this.L.offsetHeight+this.W.offsetHeight-1;e=h-l-2;f="bottom-prong";e<d.top&&(e=h+2,f="top-prong");h=w;if(e+l>d.bottom||e<d.top)e=0,h=p;if(!this.pb||h||this.g&&e-220<d.top)f="no-prong",this.g&&(e=220);h=g-c;h+a>d.right&&(h=d.right-a,c=Math.min(a-b,g-h));this.W.style.display="";this.W.style.left=c-b/2+"px";
this.W.className=f;this.L.style.left=h+"px";this.L.style.top=e+"px";Nd(this.L,"has-"+f)}else a=this.Tb,g=this.Ub,this.L.style.display="block",this.W.style.display="block",c=Math.round(.4*this.R-.6*this.W.offsetWidth),b=ie(this.c),b=new me(0,0,b.width,b.height),e=this.L.offsetHeight+this.W.offsetHeight-1,d=Cm(b,this.R,e),e=g-e,Rd(e,d.top,d.bottom)!=e?d=s:(f=a-c,d=Rd(f,d.left,d.right)!=f?s:new V(f,e)),d&&this.pb?this.W.style.left=c+"px":(this.W.style.display="none",d=this.R,c=this.L.offsetHeight,b=
Cm(b,d,c),a=Rd(a-d/2,b.left,b.right),c=g-c-10,c<b.top&&(c=g+10),g=Rd(c,b.top,b.bottom),d=new V(a,g)),g=this.L,a=d.x,b=d.y,c=xe(g),a instanceof V&&(b=a.y,a=a.x),qe(g,g.offsetLeft+(a-c.x),g.offsetTop+(b-c.y));this.S.T(p)};A.Gb=function(){this.S&&this.S.T(w)};A.be=function(){M&&document.activeElement&&fe(this.L,document.activeElement)&&document.body.focus()};A.Ac=function(){Ta(this.Sb);delete this.Sb;Ta(this.h);delete this.h};A.Ia=function(){return!(!this.S||!this.S.Ia())};
var Bm=new U('<div class="bubble-corner" id="${pos}${id}"><div class="bubble-sprite bubble-${pos}"></div></div>'),zm=new U('<div class="prong" id="prong${id}" onclick="${closeHandler}()"><div class="bubble-sprite"></div></div>'),ym=new U('<div style="display:none;z-index:${zIndex}" class="bubble"><table cellpadding=0 cellspacing=0 class="bubble-table"><tr><td class="bubble-cell-side">${cornerT1}<td class="bubble-cell-main"><div class="bubble-top"></div><td class="bubble-cell-side">${cornerT2}<tr><td colspan=3 class="bubble-mid"><div style="overflow:hidden" id="bubbleContent${id}"></div><tr><td>${cornerB1}<td><div class="bubble-bottom"></div><td>${cornerB2}</table><div id="bubbleClose${id}" class="bubble-closebutton" onclick="${closeHandler}();"></div>${prong}</div>'),
wm=new U('<div style="z-index:${zIndex};display:none" class=bubble><div id="bubblePromo${id}"></div><div class=bubblemain><div id=bubbleClose${id} class=bubbleclose></div><div class=bubblecontent id="bubbleContent${id}"></div>${prong}</div></div>'),xm=new U("<div id=prong${id} class=no-prong><div class=prong-dk></div><div class=prong-lt></div></div>");function Dm(a,b,c,d,e){this.b=b;this.c=c;this.g=d;b=[];c=[];var f;d=0;var g=this.c,h=this.b,l=Uc(h.i(),S(h,g).i());for(f=0;f<g;f++)b[f]=[],c[f]=[];f=0;for(var m=a.length;f<m;f++){var r=a[f];if(Ff(r,l)){var q=r.Aa,t=0,u=Yc(r.A().m(),h);if(0>u){if(!q)continue;u=0;t|=1}var x=Yc(bd(r.G),h);x>g&&(x=g,t|=2);q=new Em(r,q?x-u:1,t);(r=r.Q())&&Bf(r)?c[u].push(q):(b[u].push(q),d++)}}this.a=b;this.d=c;this.f=d;this.e=e||0}function Em(a,b,c){this.event=a;this.a=b;this.b=c}
function Fm(a,b){for(var c=a.c,d=a.f,e=a.g,f=ub(c),g=ub(c),h=ub(c),l=[],m=0,r=0;d;){m==c&&(m=0,r++);var q=a.a[m][f[m]++];if(q){for(var t=q.a;t--;)h[m]=r,r+1==e?l[m]=q:r>=e&&(g[m]++,l[m]&&(l[m].Jc=p)),m++;--d}else m++}f=ub(c);d=[];t=r;r=0;switch(a.e){case 2:for(m=0;m<c;m++)if(a.a[m].length&&!(g[m]||l[m]&&l[m].Jc)){r=1;break}break;case 1:r=1}for(var e=Math.min(t,e-1),u=e+1+r,r=0;r<u;r++){var x=u-r;b.I.push("<tr>");for(m=0;m<c;m++)if(!d[m]){var q=a.a[m][f[m]++],v=r>=h[m];if(r==e&&(g[m]||l[m]&&l[m].Jc)){var v=
b,C=S(a.b,m),q=g[m]+(l[m]?1:0),C="ca-mlp"+C.t();v.I.push('<td class="',"st-c"," ","st-more-c",'">');v.e&&v.b?v.I.push('<div class="',C," ",'st-more st-morewk" >'+v.a.e(q)+"</div>"):v.e?v.I.push('<div class="',C," ",'st-more st-moreicon" >\u25bc</div>'):v.I.push('<span class="',C," ",'st-more st-moreul" >'+("+"+q+" more")+"</span>");v.I.push("</td>")}else if(q&&r<=e){C=1;1<q.a?m+=q.a-1:v&&r!=t&&(C=x,d[m]=p);var v=b,z=!!(q.b&1),H=!!(q.b&2),Da="ca-evp"+oa(q.event);v.Lc(q,C,w,z,H,Da);v.Jb(q,C,w,z,H,Da);
v.Kc(q,C,w,z,H,Da)}else v=(d[m]=v)?x:1,q=b.I,q.push('<td class="st-c st-s"'),1<v&&q.push(" rowspan=",v),q.push(">&nbsp;")}}};function Gm(){R.call(this);this.a={}}I(Gm,R);ia(Gm);A=Gm.prototype;A.add=function(a,b){this.put(a,b);this.dispatchEvent(new Hm(a))};A.put=function(a,b){this.a[a]=b};A.get=function(a){return this.a[a]};A.remove=function(a){delete this.a[a]};A.forEach=function(a){for(var b in this.a)if(a(b,this.a[b])===w)break};function Im(a,b){var c=s;a.forEach(function(a,e){if(e.b==b)return c=a,w});return c}function Hm(a){L.call(this,"detailsadd");this.id=a}I(Hm,L);function Jm(a){var b=Gm.ib(),c=a.k,d=b.get(c);d||(c=Im(b,c))&&(d=b.get(c));return!d||60>d.a?"":(a=a.e.eventColor)&&/^#[0-9a-fA-F]{6}$/.test(a)?Km(a):""}function Km(a){switch(a){case "#a4bdfc":case "#5484ed":case "#46d6db":return"#1111cc";case "#7ae7bf":case "#51b749":return"#228822";case "#dbadff":return"#551a8b";case "#ff887c":case "#dc2127":return"#ff0000";case "#fbd75b":return"#fbb818";case "#ffb878":return"#ff6600";case "#e1e1e1":return"#bfbfbf";default:return a}};function Lm(a){var b=a.ja();if(Mm){this.c=(a="#000000"!=(a.b?a.d:"#000000"))?"#eeeeee":"#1d1d1d";this.F=this.w=b.e;this.J="";this.r=a?"#dddddd":"#333333";this.a=b.e;this.b=b.d;this.v="";this.d=b.c;this.k=b.b;this.p="";b=this.e=b.d;a=255+.6*(parseInt(b.substr(3,2),16)-255);var c;c=255+.6*(parseInt(b.substr(5,2),16)-255);this.M="#"+ui(255+.6*(parseInt(b.substr(1,2),16)-255))+ui(a)+ui(c);this.f=this.a;this.g=this.b;this.h="";this.n=this.c}else this.c="",this.a=b.e,this.v=this.b=b.a,this.w=b.d,this.F=
b.c,this.J=b.d,this.d=b.c,this.p=this.k=b.b,this.r="",this.e=b.a,this.f=this.M=b.c,this.h=this.g=b.b,this.n=b.a}var Mm=w,Nm={};function Om(a){var b=oa(a);Nm[b]||(Nm[b]=new Lm(a));return Nm[b]};var Pm;Pm=w;var Qm=vb;Qm&&-1!=Qm.indexOf("Firefox")&&(Pm=p);var Rm=Pm;function Sm(a,b,c,d,e,f,g,h){var l;h?(l=Tm,l.put("borderColor",h)):l=Um?Vm:Wm;l.put("color",c);l.put("textColor",d);l.put("outerClasses",e||"");l.put("paddingClasses",g||"");l.put("extraHtml",f||"");c=l;c.put("content",a);c.put("dir",b?";direction:rtl;;text-align:left":"");return l.toString()}
var Wm=new U('<div class="${outerClasses} rb-o" style="border-color:${color}${dir}"><div class="${paddingClasses} rb-m" style="border-color:${color};background-color:${color};color:${textColor}">${extraHtml}<div class="rb-i">${content}</div></div></div>'),Vm=new U('<div class="${outerClasses} ${paddingClasses} rb-n" style="color:${textColor};background-color:${color}${dir}">${extraHtml}${content}</div>'),Tm=new U('<div class="${outerClasses} ${paddingClasses} rb-n" style="border:1px solid ${borderColor};color:${textColor};background-color:${color}${dir}"><div class=rb-ni>${extraHtml}${content}</div></div>'),
Um=O||Rm;var Ld=new U('<span class="te-c goog-inline-block" style="background-color:${eventColor}">&nbsp;</span>'),Xm=new U('<div class="${extraClasses} te" style="color:${color}"><span class="te-t">${time}&nbsp;</span>${eventColorSpan}<span class="te-s">${subject}</span></div>'),Ym=new U('<div class="${extraClasses} te" style="color:${color}"><table cellpadding=0 cellspacing=0 class="te-rev"><tr><td class="te-t">${time}&nbsp;</td><td>${eventColorSpan}&nbsp;</td><td class="te-rev-s"><div class="te-rev-spos">&nbsp;<div class="te-rev-scont" dir="rtl">${subject}</div></div></td></tr></table></div>');function Zm(a,b,c,d,e){this.c=a;this.a=b;this.f=c||w;this.e=!!d;this.d=!!e;this.b=b.d}A=Zm.prototype;A.I=s;A.Na=ba("I");function $m(a){a.I.push('<table cellpadding="0" cellspacing="0" class="st-grid">')}function an(a){a.I.push("</table>")}function bn(a,b){for(var c=a.I,d=0;d<b.length;d++){var e=b[d],f=e.event.Q();f.ma&&(cn.put("title",J(f.b||"")),cn.put("iconURL",J(f.ma)),e="ca-evp"+oa(e.event)+" st-wc",f.ua()&&(e+=" st-wc-click"),cn.put("class",e),c.push(cn.toString()))}}A.Lc=ha;
A.Jb=function(a,b,c,d,e,f){c=this.I;c.push("<td class=st-c");1<b&&c.push(" rowspan=",b);1<a.a&&c.push(" colspan=",a.a);c.push(">");c.push("<div class=st-c-pos>");c.push(dn(this,a.event,d,e,f));c.push("</div></td>")};A.Kc=ha;
function dn(a,b,c,d,e){if(b.Aa||b.oa){c=!!c;d=!!d;e=e||"";var f=a.a.c(b,p),g=Ti(b.a);g&&a.d&&(g='<span class="evt-lk ca-elp'+oa(b)+'">'+g+"</span>");g+="";b.oa||c||(g="("+ci(a.c,b.A())+") "+g);var g=f+g,f=Si(a.a,b),h=Om(f),l=h.c,f=a.a.b(b)?h.d:h.a,m=Jm(b);m&&(f=m);var r;a.a.d&&(r=h.b);a=[];c&&a.push("st-ad-mpad");d&&a.push("st-ad-mpadr");a=a.join(" ");c=en(c,d,f,r);d=g;b=ni(b.a)?!(b.r&&b.r()):w;b=Sm(d,b,f,l,e,c,a,r)}else r=e||"",c=a.a.c(b,w),(e=Ti(b.a))&&a.d&&(e='<span class="evt-lk ca-elp'+oa(b)+
'">'+e+"</span>"),e+="",d=a.a.b(b),g=Si(a.a,b),g=Om(g),d=d?g.M:g.e,g=Jm(b),b=c+ci(a.c,b.A(),p,a.f),a=Xm,ni(e)&&(a=Ym),a.put("color",d),a.put("time",b),a.put("subject",e),a.put("extraClasses",r),a.put("eventColorSpan",g?Kd({eventColor:g}):""),b=a.toString();return b}function en(a,b,c,d){if(!a&&!b)return"";var e=[];a&&(fn(e,"st-ad-ml",d||c),fn(e,"st-ad-ml2",c));b&&(fn(e,"st-ad-mr",d||c),fn(e,"st-ad-mr2",c));return e.join("")}
function fn(a,b,c){a.push("<div class=",b,' style="border-color: transparent ',c,'"></div>')}var cn=new U('<img src="${iconURL}" class="${class}" title="${title}" alt="${title}">');function gn(a,b,c,d,e){this.w=hn++;this.type=c;this.f=b.b;this.g=new vm(rg(a).parentNode);this.r=e;pg.call(this,a,b,c,d,a.c)}I(gn,pg);var hn=hn||1;A=gn.prototype;A.Db=s;A.render=function(){gn.s.render.call(this);this.g.Gb()};A.Yc=function(a,b){var c=this.c[a],d=b.clientX+document.documentElement.scrollLeft,e=b.clientY+document.documentElement.scrollTop;F(this.g.render,this.g,d,e);this.g.render(d,e,jn(this,c))};
function jn(a,b){var c=Ti(b.a);kn.put("title",c);c=a.r.a(b).a;kn.put("titleColor",c);b.ta?(ln.put("sepColor",c),ln.put("detailsLinkUrl",encodeURI(b.ta)),ln.put("addLinkUrl",zg(a,b)),kn.put("links",ln.toString())):kn.put("links","");kn.put("details",ug(a,b));return kn.toString()}A.dc=function(a,b){var c;c=rm("ca-evp",a);c=parseInt(c,10);var d=this.c[c].Q();d&&d.ua()?this.gd(c,b.target):this.Yc(c,b)};
A.ec=function(a){var b;b=rm("ca-mlp",a);b=od(parseInt(b,10));var c=ge(a,"TD"),d=ge(a,"TABLE");a=xe(c).x;var c=xe(d).y,d=this.wd(b),e=[];d.Da.Na(e);$m(d.Da);Fm(new Dm(this.Db,b,1,99),d.Da);an(d.Da);this.n.render(a,c,d.width,s,d.title,'<div class="'+d.vd+'">'+e.join("")+"</div>")};A.wd=function(a){return{title:Lg(this.f,a),Da:new Zm(this.f,this.r),vd:"st-contents",width:225}};A.register=function(){gn.s.register.call(this);this.h.a(this.Yc);this.g.init()};
var kn=new U('<div class="details"><span class="title" style="color: ${titleColor}">${title}</span><div class="detail-content">${details}</div>${links}</div>'),ln=(new U('<div class="separator" style="background-color: ${sepColor};"></div><span class="links"><a href="${detailsLinkUrl}" target="_BLANK">${detailsLinkText}</a>&nbsp;&nbsp;<a href="${addLinkUrl}" target="_BLANK">${addLinkText}</a></span>')).clone();ln.put("detailsLinkText","more details&raquo;");ln.put("addLinkText","copy to my calendar&raquo;");function mn(a,b,c){this.b=a;this.a=b;this.c=c}var nn=new function(a,b,c,d){this.b=a;this.c=b;this.d=c;this.a=d||0}(14,17,17);function km(a,b,c,d){this.b=parseInt(d,10)|0;if(2>this.b||4<this.b)this.b=w;this.b?(this.pa=[s,s,"2 Weeks","3 Weeks","4 Weeks"][this.b],d="next"+this.b+"weeks"):(this.pa="Month",d="month");var e=this.b?new Fd(7*this.b,b.e):new Ed;this.k=new Tf(this);gn.call(this,a,b,d,e,c);on(this);this.p=new Zm(this.f,c);this.F=new mn(this.f,this.p,this.w)}I(km,gn);function on(a){var b=a.O(),c=b.start,b=Math.ceil(b.a.j/7);a.v=new Ik(a.selection.focus,c,b,a.a.f?7:5,7)}A=km.prototype;
A.O=function(){var a=dd(this.selection.a,this.a.e),b=ed(this.selection.b,this.a.e+6);this.a.f||(a=ed(a,this.a.n),b=dd(b,this.a.n+this.a.M-1));return new T(a,$c(b))};A.Rb=function(){var a;if(this.b)a=di(this.f,this.O());else{a=this.f;var b;this.b?b=s:(b=this.selection.focus,b=ad(b.year,b.month,1));a=ei(a,b)}return a};A.register=function(){km.s.register.call(this)};
A.Ie=function(a){this.dispatchEvent("a");var b,c=this.F;b=this.v;var d=qg(this.a.a),e=this.selection.focus.month;var f;f=Math.max(1,Math.floor(((this.J-nn.b)/b.b+nn.a-nn.c)/nn.d));var g=[];g.push('<div class="mv-container"><table cellpadding=0 cellspacing=0 class="mv-daynames-table" id="mvDaynamesTable"><tr>');for(var h=0;h<b.a;h++){var l=b,m=h,l=od(Jk(l)[0*l.a+m]).V(),m=c.b,l=fi(m,m.a.a[l]);g.push('<th class="mv-dayname" title="',l,'">',l,"</th>")}g.push("</tr></table>");g.push('<div class="mv-event-container" id="mvEventContainer',
c.c,'">');h=100/b.b;c.a.Na(g);for(l=0;l<b.b;l++){var r,m=b,q=l;r=od(Jk(m)[q*m.a+0]);g.push('<div class=month-row style="top:',h*l,"%;");l<b.b-1?g.push("height:",h+1,'%">'):g.push('bottom:0">');var m=c.a,t=r,q=b.a,u=d,x=m.I;x.push('<table cellpadding=0 cellspacing=0 class="st-bg-table"><tr>');for(var v=p,C=q;C--;t=$c(t))x.push('<td class="st-bg'),v&&(v=w,x.push(" st-bg-fc")),t.u(u)&&(0==C&&m.a.d?x.push(" st-bg-td-last"):x.push(" st-bg-today")),t.u($c(u))&&C!=q-1&&x.push(" st-bg-next"),x.push('">&nbsp;');
x.push("</table>");$m(c.a);var m=new Dm(a,r,b.a,f),q=c.a,u=b.a,x=d,v=e,C=m.d,t=F(c.b.c,c.b),z=0==l,H=q.I;H.push("<tr>");for(var Da=p,ao=$c(x),bo=S(x,7),Qb=0;Qb<u;Qb++){var Rb=S(r,Qb);H.push('<td class="st-dtitle');z&&H.push(" st-dtitle-fr");Da&&(Da=w,H.push(" st-dtitle-fc"));x.u(Rb)&&(H.push(" st-dtitle-today"),Qb==u-1&&H.push(" st-dtitle-lc"));ao.u(Rb)&&0!=Qb&&H.push(" st-dtitle-next");bo.u(Rb)&&H.push(" st-dtitle-down");Rb.month!=v&&H.push(" st-dtitle-nonmonth");H.push('">');bn(q,C[Qb]);H.push('<span class="ca-cdp'+
Rb.t()+'">',t(Rb),"</span>")}Fm(m,c.a);an(c.a);g.push("</div>")}g.push("</div>");c.a.I=s;b=g.join("");this.dispatchEvent("b");this.Fa();c=rg(this.aa);c.innerHTML=b;this.c={};xg(this,a);this.Db=a.slice();a=new mm(c);pm(a,ta(sm,c),F(this.dc,this));pm(a,tm,F(this.ec,this));this.e=a;this.dispatchEvent("c")};A.Fa=function(){km.s.Fa.call(this);Xf(this.k);this.e&&(this.e.C(),this.e=s)};A.render=function(){km.s.render.call(this);on(this);this.J=rg(this.aa).offsetHeight;Ag(this,this.O(),F(this.Ie,this))};function pn(a,b,c,d,e){function f(a){a&&(a.tabIndex=0,a.setAttribute("role","tab"),Oi(a,"goog-zippy-header"),a&&g.h.B(a,"click",g.n),a&&g.g.B(a,"keydown",g.k))}R.call(this);this.e=e||Vd();this.a=this.e.l(a)||s;this.d=this.e.l(d||s);this.b=(this.f=ma(b)?b:s)||!b?s:this.e.l(b);this.c=c==p;this.g=new Tf(this);this.h=new Tf(this);var g=this;f(this.a);f(this.d);qn(this,this.c)}I(pn,R);pn.prototype.o=function(){pn.s.o.call(this);Ta(this.g);Ta(this.h)};
function qn(a,b){a.b?Ce(a.b,b):b&&a.f&&(a.b=a.f());a.b&&Oi(a.b,"goog-zippy-content");if(a.d)Ce(a.a,!b),Ce(a.d,b);else if(a.a){var c=a.a;b?Oi(c,"goog-zippy-expanded"):Pi(c,"goog-zippy-expanded");c=a.a;b?Pi(c,"goog-zippy-collapsed"):Oi(c,"goog-zippy-collapsed");var c=a.a,d=b;la(d)&&(d=d.join(" "));""===d||d==n?(Qi||(Qi={atomic:w,autocomplete:"none",dropeffect:"none",haspopup:w,live:"off",multiline:w,multiselectable:w,orientation:"vertical",readonly:w,relevant:"additions text",required:w,sort:"none",
busy:w,disabled:w,hidden:w,invalid:"false"}),d=Qi,"expanded"in d?c.setAttribute("aria-expanded",d.expanded):c.removeAttribute("aria-expanded")):c.setAttribute("aria-expanded",d)}a.c=b;a.dispatchEvent(new rn("toggle",a))}pn.prototype.k=function(a){if(13==a.keyCode||32==a.keyCode)qn(this,!this.c),this.dispatchEvent(new L("action",this)),a.preventDefault(),a.stopPropagation()};pn.prototype.n=function(){qn(this,!this.c);this.dispatchEvent(new L("action",this))};function rn(a,b){L.call(this,a,b)}
I(rn,L);function sn(a,b,c,d){Zm.call(this,a,b,c,w,d)}I(sn,Zm);sn.prototype.Lc=function(a,b,c,d,e,f){a=a.event;tn(this,a,f,d,w,a.A())};sn.prototype.Kc=function(a,b,c,d,e,f){a=a.event;b=a.G;b=S(bd(b),-1);tn(this,a,f,w,e,b)};sn.prototype.Jb=function(a,b,c,d,e,f){this.b||(e=d=w);sn.s.Jb.call(this,a,b,c,d,e,f)};
function tn(a,b,c,d,e,f){var g="",h="wk-sideevents";if(e||d)if(f=Ug(a.c,f),a.b&&f)h=d?"wk-sideeventsb":"wk-sideeventsa",g=f;else if(!a.b){g=a.a.a(b);b=(b=Jm(b))?b:g.b;g="";d&&(c+=" wk-more-prealign",g="st-ad-mpad");var l=ni(f),g=Sm(f,l,b,"",c,en(d,e,b),g)}a=a.I;a.push("<td class="+h+">");a.push(g);a.push("</td>")};function un(a,b){this.start=a<b?a:b;this.end=a<b?b:a}un.prototype.clone=function(){return new un(this.start,this.end)};function vn(){}function wn(){}wn.prototype.b=p;function xn(){this.b=[]}A=xn.prototype;A.top=0;A.nc=0;A.oc="px";A.mc="left";A.height="";A.width=100;A.pc="%";A.text="";A.wc=ca("");function yn(){this.b=[]}I(yn,xn);A=yn.prototype;A.ra=0;A.Eb="";A.lc="";A.kc="";A.Ud=s;A.hc="#fff";A.ic="#000";A.jc="#000";function zn(a,b,c){a.ra=c?a.ra|b:a.ra&~b}function An(a,b,c,d){var e=s,f=s;if(c){c=ni(c);var g=2*c+1,h=oi[g];h||(h=[],c&&(h.push("direction:rtl"),M&&h.push("zoom:1")),h=h.join(";"),oi[g]=h);if(c=h)e='<div style="'+c+'">',f="</div>"}a.put(d,b||"");a.put(d+"BidiStart",e||"");a.put(d+"BidiEnd",f||"")}
A.wc=function(){this.a=Bn.ib().a[this.ra];this.a.put("classes",this.b.join(" "));var a=[];this.ra&1&&a.push("cro");this.ra&2||a.push("cbrd");this.a.put("extraClasses",a.join(" "));this.a.put("top",this.top);this.a.put("offset",this.nc);this.a.put("offsetUnit",this.oc);this.a.put("edge",this.mc);this.a.put("width",this.width);this.a.put("widthUnit",this.pc);a=this.height;this.a.put("height",a?a-0-(this.ra&2?5:3)+"px":"auto");this.a.put("borderColor",this.ic);this.a.put("bgColor",this.hc);this.a.put("captionColor",
this.jc);this.a.put("textColor",this.c?"color:"+this.c+";":"");An(this.a,this.lc,this.kc,"caption");An(this.a,this.text,this.text,"text");this.Eb&&this.a.put("titleClass",this.Eb);this.a.put("beforeIcons","");this.a.put("icons","");this.d&&(this.a.put("userId",this.g),this.a.put("organizerPictureFade",this.e?"cpic-fade":""),this.a.put("picRot",this.f&1?"cpic-rot-left":"cpic-rot-right"),this.a.put("organizerPictureSrc",this.d));return this.a.toString()};function Cn(){}
function Dn(a,b){return a?'<span class="${titleClass}">'+b+"</span>":b}function En(a){return'<dt style="background-color:${captionColor};">${captionBidiStart}${beforeIcons}'+Dn(a,"${caption}")+"${icons}${captionBidiEnd}</dt>"}function Fn(a){return"<dd>"+("${textBidiStart}"+Dn(a,"${text}")+"${textBidiEnd}")+"</dd>"}var Gn=Cn.prototype;Gn.a="border-color:${borderColor};background-color:${bgColor};";var Hn='<div class="cb1" style="'+Gn.a+'">&nbsp;</div>';Gn.g='<div class="ct" style="border-bottom-color:${borderColor}">&nbsp;</div>';
Gn.f='<div class="cb2" style="border-color:${borderColor};">&nbsp;</div>'+Hn;Gn.b=Hn+'<div class="cb2" style="border-color:${borderColor};">&nbsp;</div>';Gn.h=En(w);Gn.r=En(p);Gn.n=Fn(w);Gn.e=Fn(p);var In=Gn.a;Gn.p=Pa('<div><div class="mask mask-top" style="',In,'">&nbsp;</div><div class="mask mask-bottom" style="',In,'">&nbsp;</div><div class="mask mask-left" style="height:${maskHeight};',In,'">&nbsp;</div><div class="mask mask-right" style="height:${maskHeight};',In,'">&nbsp;</div></div>');
Gn.k=Pa('<div class="rsvp-no-bg" style="top:${top}px;${edge}:${offset}${offsetUnit};height:${bgHeight};width:${width}${widthUnit};">&nbsp;</div>');Gn.d='<div class="resizer"><div class="rszr-icon">&nbsp;</div></div>';Gn.c='<div class="g-hovercard cpic ${organizerPictureFade} ${picRot}" data-userid="${userId}" style="border-color:${borderColor};"><img src="${organizerPictureSrc}?sz=24" height="24px" width="24px"></div>';var Jn=new U('${templateContentSpecialBackground}<div class="$[classes] chip ${organizerPictureClass}" style="top:$[top]px;$[edge]:$[offset]$[offsetUnit];width:$[width]$[widthUnit];"> ${templateContentPre}<dl class="$[extraClasses]" style="height:$[height];${templateColors}$[textColor]">${templateContent}</dl>${templateContentPost}${organizerPicture}</div>');
function Bn(){this.a=[];for(var a=new Cn,b=0;64>b;b++){var c;var d=!!(b&1),e=!!(b&2);c=!!(b&4);var f=!!(b&32);if(c&&d)c=s;else{d={templateColors:a.a,templateContentPre:e?d?a.f:a.g:"",organizerPicture:f?a.c:"",organizerPictureClass:f?"corg":"",templateContentPost:e?a.b:"",templateContentSpecialBackground:""};e="";e=a.h+(b&8?a.e:a.n);c&&(e+=a.d);d.templateContent=e;c=n;for(c in d)Jn.put(c,d[c]);c=Jn.toString().replace(/\[/g,"{").replace(/\]/g,"}");c=new U(c)}c&&(this.a[b]=c)}}ia(Bn);function Kn(a,b,c){this.b=b;this.a=c}I(Kn,vn);function Ln(a,b,c,d){b=ci(a.b,b.zb(),p,p);c?(a=d||ci(a.b,c.zb(),p,p),a=""+b+" \u2013 "+a):a="At "+b;return a}var Mn=!(O||Rm);function Nn(){k(Error("Do not instantiate directly"))}Nn.prototype.a=s;Nn.prototype.toString=y("content");function On(){Nn.call(this)}I(On,Nn);(function(a){function b(){}b.prototype=a.prototype;return function(a,d){if(!String(a))return"";var e=new b;e.content=String(a);d!==n&&(e.a=d);return e}})(On);function Pn(a,b){this.R=a;this.b=b||""}Pn.prototype.setTitle=ba("b");function Qn(a){Pn.call(this,4<a.title.length?60:a.d?45:40,a.title);this.d=a.c;this.c=a.a;this.a=a.b}I(Qn,Pn);function Rn(){}var Sn=new function(){this.b="tg-times-pri";this.a="tg-time-pri";this.c="tg-time-pri-last"};function Tn(a,b){this.b=a;this.e=b}Tn.prototype.d=ha;Tn.prototype.c=ha;Tn.prototype.a=y("b");Tn.prototype.T=ba("b");function Un(){Tn.call(this,w,0)}I(Un,Tn);Un.prototype.a=ca(w);function Vn(a,b,c,d,e,f){this.b=d;this.a=f}I(Vn,K);Vn.prototype.o=function(){Vn.s.o.call(this)};Vn.prototype.l=ca(s);ab([2,1,0,3]);Le();Le();function Wn(a,b,c,d){this.event=a;this.Ba=b;this.a=c;this.Vd=d;this.bb=[]};function Xn(a,b,c,d,e){this.r=new Kn(Vd(),a,b);this.a=c||"tg";this.k=d||w;this.p=e||"tg-gutter";b=new Rn;b.title="";b.c=0;b.a=a;b.b=Sn;this.c=[new Qn(b)];this.g=[];this.h=[];this.f=[];this.d=new Un;this.g.push(Yn);this.f.push(Zn)}Xn.prototype.e=s;Xn.prototype.n=s;Xn.prototype.Na=ba("e");
function $n(a,b,c,d){var e=a.r;if(a.b)for(var f in a.b)if(a.b[f].Re(b,c)){e=a.b[f].Da;break}a=new wn;a.Ba=b.Ba;a.c=b.a;a.event=b.event;a.left=b.left;a.width=b.Hd;a.a=42;a.d=0;a.b=!b.Gd;a.e=24;var g=e,e=a.event;b=new yn;zn(b,2,Mn&&p);f=qi.b[96]?"SS_asid"in e.e:w;var h=Si(g.a,e),l=0;f?l=3:g.a.b(e)&&(l=2);var m=Jm(e),r=l,l=Om(h),q=w,t,u,x=l.c;switch(r||0){case 1:r=l.w;t=l.F;u=l.J;break;case 2:r=l.d;t=l.k;u=l.p;x=l.r;q=p;break;case 3:r=l.f;t=l.g;u=l.h;x=l.n;break;default:r=l.a,t=l.b,u=l.v}m&&(r=m);b.Ud=
h;b.hc=r;b.ic=t;b.jc=u;b.c=x;b.e=q;l=0*a.a;h=(a.e-0)*a.a;m=Math.round((a.Ba/60-a.d)*a.a);m=Math.max(l,m);b.top=m;b.nc=100*a.left;b.oc="%";b.mc="left";l=Math.round((a.c/60-a.d)*a.a);l=Math.min(l,h);h=Math.max(l-m,a.a/2);b.height=h;b.width=100*a.width;b.pc="%";zn(b,1,w);h=g.a.b(e);zn(b,16,h);h&&b.b.push("rsvp-no-chip");zn(b,4,w);e.Za()&&a.b&&(h=e.getId().charCodeAt(1),m=e.Za()?"":s,b.d=s,b.f=h,b.g=m,zn(b,32,w));h=Ti(e.a);30<a.c-a.Ba?(m=Ln(g,e.A(),e.G),l="",b.text=h):(m=Ln(g,e.A(),e.G,h),l=h);m=g.a.c(e,
p)+m+" ";b.lc=m;b.kc=l||"";g="ca-evp"+oa(e);b.b.push(g);f&&b.b.push("av-chip");e="evt-lk ca-elp"+oa(e);b.Eb=e;zn(b,8,!!e);0<a.left&&(b.b.push("chip-border"),(d=d&&d.m())&&c==d?b.b.push("chip-color-today"):b.b.push("chip-color"));return b.wc()}function Yn(a,b,c,d,e){var f;(a=e&&e.m())&&b==a&&(f='<div class="tg-today" style="'+co()+'">&nbsp;</div>');return f}
function Zn(a,b,c,d,e){var f;a=e&&e.m();b==a&&(f='<div class="tg-hourmarker tg-nowmarker" id="'+d.a+'nowmarker" style="top:'+(42*(e.hour+e.minute/60-0)|0)+"px;"+(eo(e)?"":"display: none;")+'"> </div>');return f}function co(){return"height:1008px;margin-bottom:-1008px;"}
Xn.prototype.render=function(a,b,c){var d=a.length,e=this.e,f=co(),g=this.d;e.push('<div class="tg-mainwrapper" style="margin-top:',g.a()?g.e:0,'px;"><table id="',this.a,'Table" class="tg-timedevents" cellpadding="0" cellspacing="0" style="height:',1010,'px">');var h=c||s,g=this.c;e.push('<tr height="1">');for(var l=0,m=g.length;l<m;l++)e.push('<td style="width:',g[l].R,'px;"></td>');e.push('<td colspan="',d,'"><div class="tg-spanningwrapper"><div class="tg-hourmarkers">');this.d.d(42,e);for(l=0;24>
l;l++)e.push('<div class="tg-markercell"><div class="tg-dualmarker"></div></div>');this.d.c(42,e);e.push('</div></div><div class="tg-spanningwrapper tg-chipspanningwrapper" id="',this.a,'spanningwrapper"></div></td>');e.push("</tr>");l=[];h&&l.push('<div id="',this.a,'nowptr" class="tg-nowptr" style="left:',0,"px;top:",(42*(h.hour+h.minute/60-0)|0)-4,"px;",eo(h)?"":"display:none;",'"></div>');h=l.join("");e.push("<tr>");l=0;for(m=g.length;l<m;l++){var r=l==m-1,q=g[l],t=r?h:"",u=e;u.push('<td class="',
q.a.b,r?"":" tg-timesnotlast",'">');u.push("");for(r=0;24>r;++r){var x=23==r?q.a.a+" "+q.a.c:q.a.a,v;v=q.c;var C=ud(2E3,1,1,r,q.d,0);v=ci(v,C.ca(),p);u.push('<div style="height:42px;"><div class="'+x+'" style="height:41px;">'+v+"</div></div>")}u.push(t,"</td>")}g=b;for(b=0;b<d;b++){m=[];l=a[b];if(l.length){m=l;h=g;q=m.length;t=[];u=[];r=[];for(x=0;x<q;++x){var z=m[x],C=z.A();v=hd(C)||0;C.t()<h.t()&&(v=0);var H=z.G,C=hd(H)||0;30>C-v&&(C=v+30);if(H.t()>h.t()||1440<C)C=1440;for(H=0;u[H]>v;)H++;var z=
new Wn(z,v,C,H),Da=r[H];Da||(Da=r[H]=[]);Da.push(z);u[H]=C;t[H]=z;0!=H&&(z.cb=[t[H-1]],t[H-1].bb.push(z));for(C=H+1;u[C]<=v;)C++;if(v=t[C])z.bb.push(v),v.cb.push(z)}m=Array.prototype.concat.apply([],r);h=m.length;u=t=q=n;for(t=h;t--;){r=1;x=0;q=m[t];for(u=q.bb.length;u--;)v=q.bb[u],x=Math.max(x,v.xc),r=Math.min(r,v.left),v.Ba<q.Ba+30&&(q.Gd=p);q.xc=x+1;q.width=r/(q.Vd+1);q.left=r-q.width}for(t=0;t<h;t++){q=m[t];q.left=0;if(q.cb)for(u=q.cb.length;u--;)r=q.cb[u],q.left=Math.max(q.left,r.left+r.width);
u=(1-q.left)/q.xc;q.width=Math.max(q.width,u);q.Hd=Math.min(1-q.left,q.width+.7*u)}h=g;q=c;t=[];for(u=0;u<m.length;u++)t.push($n(this,m[u],h,q));m=t}h=[];for(u=0;u<this.g.length;++u)h.push(this.g[u](b,g,l,this,c));h.push("");q=[];for(u=0;u<this.h.length;++u)q.push(this.h[u](b,g,l,this,c));q.push("");t=[];for(u=0;u<this.f.length;++u)t.push(this.f[u](b,g,l,this,c));t.push("");l=this.k&&b==d-1?"tg-gutter":this.p;u="tg-col";c&&(g.u(c.m())||1<d&&g.u($c(c))&&0<b)&&(u="tg-col-today");r=g.V();x=this.a;v=
b;e.push('<td class="'+(0==r||6==r?u+" tg-weekend":u)+'">'+h.join("")+'<div id="'+x+"Col"+v+'" class="tg-col-eventwrapper" style="'+f+'"><div class="'+l+'">'+m.join("")+q.join("")+'</div></div><div id="'+x+"Over"+v+'" class="tg-col-overlaywrapper">'+t.join("")+"</div></td>");this.k||(g=$c(g))}e.push("</tr>");e.push("</table>");e.push("</div>");c=0;for(d=this.c.length;c<d;c++);d=c=NaN;a=Array.prototype.concat.apply([],a);e=a.length;for(b=0;b<e;b++)g=a[b],f=hd(g.A()),g=hd(g.G),g<f||(isNaN(c)?(c=f,d=
g):(c=Math.min(c,f),d=Math.max(d,g)));this.n=new Vn(0,0,0,42,0,isNaN(c)?s:new un(c,d))};function eo(a){return!isNaN(a.hour)&&0<=a.hour&&24>a.hour};var fo=new un(5,20);function go(a,b){this.a=a;this.b=b};function ho(a){this.a=a}ho.prototype.apply=function(a){for(var b=[],c=[],d=0,e=a.length;d<e;d++){var f=a[d],g=f.Q()&&Bf(f.Q());this.a&&g||(f.oa||f.Aa||g?b.push(f):c.push(f))}return new go(b,c)};function io(a,b,c,d,e){this.d=a;this.id=String(b);this.a=c;this.b=d;this.f=e}function jo(a){return"scrolltimedevents"+a.id}io.prototype.c=function(){return"topcontainer"+this.id};function ko(a,b,c,d,e){io.call(this,a,b,c,d,new ho(w));this.g=!!e}I(ko,io);ko.prototype.e=w;function lo(a,b){if(!a.e)return w;var c=gb(b,function(a){return!(a.Q()&&Bf(a.Q()))});tb(c,function(a,b){return a.A().m().t()-b.A().m().t()});for(var d=1,e=c.length;d<e;++d)if(c[d-1].G.m().t()>c[d].A().m().t())return p;return w}
function mo(a,b,c){for(var d=[],e=a.b.c,f=0,g=0;g<e.length;g++)f+=e[g].R,d.push("<td class=wk-tzlabel style=width:",e[g].R,"px rowspan=3>",J(e[g].b),g==e.length-1&&b?no(a,!!c,f):"","</td>");return d.join("")}function no(a,b,c){return"<div class=wk-disclose-pos style=width:"+c+'px><div id="'+("allday-disclose"+a.id)+'" title="'+(b?"Expand All Day events":"Collapse All Day events")+'" role=button class="wk-disclose goog-zippy-'+(b?"collapsed":"expanded")+'"><div class=wk-zip></div></div></div>'}
ko.prototype.c=function(){return"topcontainer"+this.id};function jm(a,b,c,d){this.k=b.J;this.b=parseInt(d,10);if(isNaN(this.b)||1>this.b||7<this.b)this.b=0;1==this.b?(this.pa="Day",d="day"):this.b?(this.pa=[s,s,"2 Days","3 Days","4 Days","5 Days","6 Days","7 Days"][this.b],d="next"+this.b+"days"):(this.pa="Week",d="week");var e;this.b?e=new Fd(this.b):(e=[],b.d&&e.push(new ua(b.d,b.p)),e=new Rc(e,b.e,b.f,b.f?n:b.n,b.f?n:b.M),e=new Dd(e));this.selection=e;gn.call(this,a,b,d,e,c);a=new Zm(b.b,c,w,p);this.v=new Xn(b.b,c);this.e=new ko(b.b,this.w,a,this.v);
this.e.e=p}I(jm,gn);A=jm.prototype;A.Oa=s;A.$a=s;A.Rb=function(){var a=this.a.b;return 1==zd(this.selection)?Lg(a,this.selection.a):di(a,this.O())};
A.Je=function(a){var b,c;this.dispatchEvent("a");var d=jd(this.a.a.ba()),e=this.e,f=this.selection.a;b=this.F;var g=!!this.k;c=e.f.apply(a);var h=[],l=c.a;h.push('<table class="wk-weektop',1<b?" wk-full-mode":"",'" cellpadding=0 cellspacing=0><tr class=wk-daynames>');var m=lo(e,l);h.push(mo(e,m,g));for(var m=d.m(),r,q=w,t=0;t<b;t++){r=S(f,t);var u;if(1==b){u=e.d;var x=r,v=Uh(u.a,x.V()),x=Ug(u,x);u=$(X(u.a.q,Z,30),[v,x])}else{v=e.d;x=r;u=v.a;var C=v,z=x.V(),C=fi(C,v.a.a[z]),v=Ug(v,x);u=$(X(u.q,Z,30),
[C,v])}h.push('<th title="',u,'" scope=col><div class="wk-dayname');q&&(q=w,h.push(" wk-tomorrow"));r.u(m)&&(h.push(" wk-today"),t==b-1?h.push(" wk-today-last"):q=p);h.push('">');h.push('<span class="',"ca-cdp"+r.t(),' wk-daylink">',u,"</span></div></th>")}h.push(['<th class="wk-dummyth" rowspan=3 style="width: ',Kf()-1,'px;">&nbsp;</th>'].join(""));h.push("</tr>");h.push("<tr>");h.push('<td class="wk-allday" colspan="',b,'"><div id="',"weekViewAllDay"+e.id,'" class="wk-allday-pos">');e.a.Na(h);m=
d.m();r=e.a.I;r.push('<table id="weekViewAllDayBg'+e.id+'" cellpadding=0 cellspacing=0 class="st-bg-all"><tr>');if(1==b&&f.u(m))r.push('<td class="st-bg-td-last">&nbsp;</td>');else for(q=w,t=b,u=f;t--;u=$c(u))v="",u.u(m)?(q=p,v=u.u(f)?"st-bg-td-first":0==t?"st-bg-td-last":"st-bg-today"):u.u(f)||q?(v="st-bg-next",q=w):v="st-bg",0==t&&(v+=" st-bg-lc"),r.push("<td"),v&&r.push(' class="'+v+'"'),r.push(">&nbsp;</td>");r.push("</tr></table>");$m(e.a);g=new Dm(l,f,b,g?1:200,e.g&&g?2:1);Fm(g,e.a);an(e.a);
h.push("</div></td>");h.push('</tr><tr class="wk-webcontent">');g=g.d;for(l=0;l<b;l++)h.push('<td class="wk-webcontent-td">'),bn(e.a,g[l]),h.push("</td>");e.a.I=s;h.push("</tr>");h.push("</table>");g=[];g.push(Hf);e.b.Na(g);c=c.b;l=[];m={};q=r=f.t();for(t=0;t<b;t++)l[t]=[],m[q]=t,q=Tc(q);b=q;t=0;for(u=c.length;t<u;t++)for(v=c[t],q=Math.max(v.A().t(),r),x=Math.min(bd(v.G).t(),b);q<x;)l[m[q]].push(v),q=Tc(q);e.b.render(l,f,d);e.b.e=s;g.push(If);b=h.join("");c=g.join("");this.dispatchEvent("b");f=this.aa;
e=f.c;f=rg(f);e.l(jo(this.e))||(h=this.e,g='<div id="'+h.c()+'"></div>',g=O?g+('<div id="topcontainerBorder'+h.id+'" class="wk-border"></div><div id="'+jo(h)+'" class="wbkt wk-scrolltimedevents"></div><div id="'+("bottomcontainerBorder"+h.id)+'" class="wk-border"></div>'):g+('<div id="'+jo(h)+'" class="wk-scrolltimedevents"></div>'),f.innerHTML=g);h=e.l(jo(this.e));g=e.l(this.e.c());g.innerHTML=b;h.innerHTML=c;yg(h,f.offsetHeight-g.offsetHeight);this.selection.a.i();b=a.length;c=[];for(g=0;g<b;g++)l=
a[g],!l.oa&&!l.Aa||l.Q()||c.push(l);this.Db=c;this.c={};xg(this,a);g=this.v.n;a=h.clientHeight;b=[];d&&(d=hd(d),b.push(d),b.push(d+30,d-30));(d=g.a)&&b.push(d.start,d.end);b.push(60*fo.start,60*fo.end,1440,0);d=D(n)?n:1E5;c=D(n)?n+a:-1;g=g.b;l=24*g;r=m=NaN;q=w;for(t=0;t<b.length;++t)if(u=Rd(b[t]*g/60,0,l),q=q||u<d||u>c,isNaN(m))m=r=u;else if(u<m?m=Math.max(u,r-a):u>r&&(r=Math.min(u,m+a)),r-m>=a)break;h.scrollTop=q?m:d;this.Oa==s&&(this.Oa=B.setInterval(F(this.Fd,this),6E4));this.p&&this.p.C();this.$a&&
this.$a.C();d="allday-disclose"+this.e.id;e.l(d)&&(this.$a=new pn(d,n,!this.k),Q(this.$a,"toggle",this.Ed,w,this));d=new mm(f);pm(d,ta(sm,f),F(this.dc,this));pm(d,tm,F(this.ec,this));this.p=d;this.dispatchEvent("c");if(d=Yd("weekViewAllDayBg"+this.e.id))a=ze(Yd("weekViewAllDay"+this.e.id)).height,E("height")?ne(d,a+"px","height"):Ua("height",ta(ne,d))};A.render=function(){jm.s.render.call(this);this.F=zd(this.selection);Ag(this,this.O(),F(this.Je,this))};
A.Fd=function(){var a=this.v,b=this.d,c=jd(this.a.a.ba()),d=eo(c),c=42*(c.hour+c.minute/60-0)|0,e=b.l(a.a+"nowmarker");e&&(Ce(e,d),e.style.top=c+"px");if(a=b.l(a.a+"nowptr"))Ce(a,d),a.style.top=c-4+"px"};A.Fa=function(){jm.s.Fa.call(this);this.p&&this.p.C();this.Oa!=s&&(B.clearInterval(this.Oa),this.Oa=s)};A.wd=function(){return{title:"",Da:new sn(this.f,this.r),vd:"wk-moreevents st-contents",width:400}};A.Ed=function(){this.k=!this.k;Jl(this.aa)};function oo(a){gm.call(this,a)}I(oo,gm);oo.prototype.setup=function(){oo.s.setup.call(this);var a=this.a;if(p!=!!a.jd){a.jd=new bl(a.c.a);var b=a.jd;b.ya("today","t");b.ya("prev","p");b.ya("next","n");b.ya("dayview","d");b.ya("weekview","w");b.ya("monthview","m");b.ya("agendaview","a");Q(b,"shortcut",F(a.te,a))}};window._init=function(a){(new oo(a)).setup()};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




;
