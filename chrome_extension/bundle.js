/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)

	var getCseQueue = __webpack_require__(5)
	var parseSections = __webpack_require__(8)
	var mapBySection = __webpack_require__(13)
	var buildUI = __webpack_require__(14)

	var cses = [
	  { name: 'Tommy', id: '41755044194088' },
	  { name: 'Jimmy', id: '76629447954998' },
	  { name: 'Stefi', id: '45131341129610' },
	  { name: 'David', id: '19208422049726' }
	]

	window.chrome.storage.local.get({'auth': false}, function (items) {
	  if (!items.auth) {
	    var el = document.createElement('div')
	    el.addEventListener('click', function () {
	      window.chrome.runtime.openOptionsPage()
	    })
	    el.innerHTML = 'Click here to set your auth code!'
	    var poll = function () {
	      if (document.body) {
	        document.body.innerHTML = ''
	        document.body.appendChild(el)
	      } else {
	        setTimeout(poll, 50)
	      }
	    }
	    poll()
	  } else {
	    Promise
	      .all(cses.map(function (cse) {
	        return getCseQueue(cse, items.auth)
	      }))
	      .then(function (cses) {
	        cses.unshift({})
	        return Object.assign.apply(Object, cses)
	      })
	      .then(parseSections)
	      .then(mapBySection)
	      .then(function (sections) {
	        return buildUI(sections, cses.map(function (c) { return c.name }))
	      })
	      .then(function (html) {
	        document.body.innerHTML = html
	      })
	  }
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "h3 {\n  border-bottom: 1px solid gray;\n  padding: 5px 10px 5px;\n  margin: 10px;\n}\n\n.Loader {\n  width: 256px;\n  height: 256px;\n  background-image: url('https://d1m54pdnjzjnhe.cloudfront.net/thomascookairlines/t012/ajax-loader.gif');\n  background-size: contain;\n}\n\n.Row {\n  display: flex;\n  width: 100%;\n}\n\n.List {\n  background-color: rgba(71, 178, 141, 0.7);\n  padding: 5px 20px;\n  margin: 0 1px;\n  box-sizing: border-box;\n  width: 25%;\n}\n\n.List.isFull {\n  background-color: rgba(255, 0, 0, 0.7);\n}\n\n.Task {\n  height: 20px;\n  line-height: 20px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(6)

	function getCseQueue (cse, auth) {
	  return new Promise(function (resolve) {
	    var path = 'tasks?workspace=896401739841&completed_since=now&assignee=' + cse.id
	    return request(path, auth, 'GET', function (json) {
	      var tasks = json.data

	      var queue = { 'new': [] }
	      var currentSection = 'new'
	      tasks.forEach(function (task) {
	        if (/:$/i.test(task.name)) {
	          currentSection = task.name
	          queue[currentSection] = []
	        } else {
	          queue[currentSection].push(task.name)
	        }
	      })
	      var output = {}
	      output[cse.name] = queue
	      resolve(output)
	    })
	  })
	}

	module.exports = getCseQueue


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(7)

	module.exports = function request (url, auth, type, cb) {
	  return new Promise(function (resolve) {
	    var xhr = new window.XMLHttpRequest()
	    xhr.onload = function () { cb(xhr.response) }
	    xhr.onerror = function (e) { throw e }
	    xhr.open(type, config.endpoint + url)
	    xhr.setRequestHeader('Authorization', 'Bearer ' + auth)
	    xhr.responseType = 'json'
	    xhr.send()
	  })
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	  endpoint: 'https://app.asana.com/api/1.0/'
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var objectMap = __webpack_require__(9)

	function parseSections (cses) {
	  return objectMap(cses, function (sections, cse) {
	    var newSections = {}
	    Object.keys(sections).forEach(function (oldSectionName) {
	      var newSectionName = matchOtherSections(oldSectionName)
	      if (!newSectionName) {
	        newSectionName = matchDateSection(oldSectionName)
	      }
	      if (newSectionName) {
	        var status = 'free'
	        if (/full/i.test(oldSectionName)) {
	          status = 'full'
	        } else if (/ooo|bank|leave/i.test(oldSectionName)) {
	          status = 'ooo'
	        }
	        newSections[newSectionName] = {
	          tasks: sections[oldSectionName],
	          status: status
	        }
	      }
	    })
	    return newSections
	  })
	}

	function matchDateSection (title) {
	  var regex = /(monday|tuesday|wednesday|thursday|friday)[^0-9]*(\d*)(?:st|nd|rd|th)/i
	  var matches = regex.exec(title)
	  if (!matches || matches.length < 3) return false
	  return (matches[1] + matches[2]).toLowerCase()
	}

	function matchOtherSections (title) {
	  var matches = /(newtasks|qa|xb)/i.exec(title)
	  if (!matches || matches.length < 2) return false
	  return matches[1].toLowerCase()
	}

	module.exports = parseSections


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var map = __webpack_require__(10)
	var keys = __webpack_require__(12)

	module.exports = function objectMap (object, callback, context) {
	  var result = {}
	  for (var key in object) {
	    if (object.hasOwnProperty(key)) {
	      result[key] = callback.call(context, object[key], key, object)
	    }
	  }
	  return result
	}

	module.exports.asArray = function objectMapAsArray (object, callback, context) {
	  return map(keys(object), function (key) {
	    return callback.call(context, object[key], key, object)
	  }, context)
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(11)
	var map = Array.prototype.map
	module.exports = isNative(map)
	  ? function nativeMap (array, callback, context) {
	    return map.call(array, callback, context)
	  }
	  : function map (array, callback, context) {
	    var l = array.length
	    var output = new Array(l)
	    for (var i = 0; i < l; i++) {
	      output[i] = callback.call(context, array[i], i, array)
	    }
	    return output
	  }


/***/ },
/* 11 */
/***/ function(module, exports) {

	// Checks to see whether a specified method is a browser native
	module.exports = function isNative (method) {
	  return method && typeof method === 'function' && regexpIsNative.test(toSource(method))
	}

	// TODO: Check if safe/featurefill
	var toString = Function.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty

	// Characters to escape in a regex
	var regexpCharacters = /[\\^$.*+?()[\]{}|]/g

	// Used to detect native methods
	var regexpIsNativeFn = toString.call(hasOwnProperty)
	  .replace(regexpCharacters, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
	var regexpIsNative = RegExp('^' + regexpIsNativeFn + '$')

	// Attempts to coerce a function to a string without using its `toString` method
	function toSource (func) {
	  if (!func) return ''
	  try {
	    return toString.call(func)
	  } catch (e) {}
	  try {
	    return (func + '')
	  } catch (e) {}
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(11)
	var keys = Object.keys
	module.exports = isNative(keys)
	  ? keys
	  : function keys (object) {
	    var keys = []
	    for (var key in object) {
	      if (object.hasOwnProperty(key)) keys.push(key)
	    }
	    return keys
	  }


/***/ },
/* 13 */
/***/ function(module, exports) {

	function mapBySection (cses) {
	  var sections = {}
	  Object.keys(cses).forEach(function (cse) {
	    Object.keys(cses[cse]).forEach(function (section) {
	      sections[section] = sections[section] || {}
	      sections[section][cse] = cses[cse][section]
	    })
	  })
	  return sections
	}

	module.exports = mapBySection


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var buildSection = __webpack_require__(15)
	var ordinalise = __webpack_require__(17)

	function buildUI (sections, cses) {
	  var currentDate = new Date()
	  var section
	  var title
	  var foundFree = false

	  var htmlSections = []

	  while (htmlSections.length < 5 || !foundFree) {
	    currentDate = getNextDay(currentDate)
	    section = sections[dateToKey(currentDate)] || {}
	    title = dateToTitle(currentDate)

	    htmlSections.push(buildSection(section, title, cses))
	    if (objectSome(section, function (k) { return k.status === 'free' })) {
	      foundFree = true
	    }
	  }

	  return htmlSections.join('')
	}

	function getNextDay (base) {
	  var bankHolidays = [
	    [5 - 1, 2]
	  ]
	  var next = new Date(base.getTime())
	  do {
	    next.setUTCDate(next.getUTCDate() + 1)
	  } while (next.getUTCDay() === 0 || next.getUTCDay() === 6 || bankHolidays.some(function (b) { return next.getUTCDate() === b[1] && next.getUTCMonth() === b[0]}))
	  return next
	}

	function dateToKey (date) {
	  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
	  return days[date.getUTCDay()] + date.getUTCDate()
	}

	function dateToTitle (date) {
	  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
	  return days[date.getUTCDay()] + ' ' + ordinalise(date.getUTCDate())
	}

	function objectSome (obj, fn) {
	  return Object.keys(obj).some(function (key) {
	    return fn(obj[key])
	  })
	}

	module.exports = buildUI


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var capitalise = __webpack_require__(16)

	function buildSection (section, title, cses) {
	  var html = ''
	  html += '<h3>' + capitalise(title) + '</h3>'
	  html += '<div class="Row">'
	  html += cses.map(function (cse) {
	    if (!section[cse]) {
	      return '<div class="List"></div>'
	    }
	    var tasks = section[cse].tasks
	    var isFull = section[cse].status === 'full' || section[cse].status === 'ooo'
	    var html = '<div class="List' + (isFull ? ' isFull' : '') + '">'
	    html += tasks.map(function (t) { return '<div class="Task">' + t + '</div>' }).join('')
	    html += '</div>'
	    return html
	  }).join('')
	  html += '</div>'
	  return html
	}

	module.exports = buildSection


/***/ },
/* 16 */
/***/ function(module, exports) {

	function capitalise (str, allWords) {
	  if (allWords) {
	    return str
	      .split(' ')
	      .map(function (w) {
	        return capitalise(w, false)
	      })
	      .join(' ')
	  }
	  return str[0].toUpperCase() + str.slice(1).toLowerCase()
	}

	module.exports = capitalise


/***/ },
/* 17 */
/***/ function(module, exports) {

	function ordinalise (i) {
	  var j = i % 10
	  var k = i % 100
	  if (j === 1 && k !== 11) {
	    return i + 'st'
	  }
	  if (j === 2 && k !== 12) {
	    return i + 'nd'
	  }
	  if (j === 3 && k !== 13) {
	    return i + 'rd'
	  }
	  return i + 'th'
	}

	module.exports = ordinalise


/***/ }
/******/ ]);