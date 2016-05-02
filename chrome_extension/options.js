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

	'use strict';

	var _util = __webpack_require__(1);

	document.querySelector('.save').addEventListener('click', function (e) {
	  e.preventDefault();
	  var auth = document.querySelector('.auth').value;
	  if (auth) {
	    (0, _util.save)({ auth: auth }, function () {
	      document.body.innerHTML = 'Saved!';
	    });
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.classnames = exports.pollFor = exports.createElement = exports.retrieve = exports.save = exports.isWorkingDay = exports.ordinalise = exports.now = exports.age = undefined;
	exports.capitalise = capitalise;
	exports.objectSome = objectSome;
	exports.openTab = openTab;

	var _dateUtil = __webpack_require__(2);

	var _storageUtil = __webpack_require__(3);

	var _domUtils = __webpack_require__(4);

	exports.age = _dateUtil.age;
	exports.now = _dateUtil.now;
	exports.ordinalise = _dateUtil.ordinalise;
	exports.isWorkingDay = _dateUtil.isWorkingDay;
	exports.save = _storageUtil.save;
	exports.retrieve = _storageUtil.retrieve;
	exports.createElement = _domUtils.createElement;
	exports.pollFor = _domUtils.pollFor;
	exports.classnames = _domUtils.classnames;
	function capitalise(str, allWords) {
	  if (allWords) {
	    return str.split(' ').map(function (w) {
	      return capitalise(w, false);
	    }).join(' ');
	  }
	  return str[0].toUpperCase() + str.slice(1).toLowerCase();
	}

	function objectSome(obj, fn) {
	  return Object.keys(obj).some(function (key) {
	    return fn(obj[key]);
	  });
	}

	function openTab(url) {
	  window.chrome.tabs.create({ url: url });
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.age = age;
	exports.now = now;
	exports.ordinalise = ordinalise;
	exports.isWorkingDay = isWorkingDay;
	exports.isBankHoliday = isBankHoliday;
	function age(time) {
	  var diff = now() - time;
	  return Math.floor(diff / 60000);
	}

	function now() {
	  return new Date().getTime();
	}

	function ordinalise(i) {
	  var j = i % 10;
	  var k = i % 100;
	  if (j === 1 && k !== 11) {
	    return i + 'st';
	  }
	  if (j === 2 && k !== 12) {
	    return i + 'nd';
	  }
	  if (j === 3 && k !== 13) {
	    return i + 'rd';
	  }
	  return i + 'th';
	}

	function isWorkingDay(date) {
	  var day = date.getUTCDay();
	  return day !== 0 && day !== 6 && !isBankHoliday(date);
	}

	function isBankHoliday(d) {
	  var bankHolidays = [[2016, 5 - 1, 2], [2016, 5 - 1, 30], [2016, 8 - 1, 29], [2016, 12 - 1, 26], [2016, 12 - 1, 27], [2017, 1 - 1, 2], [2017, 4 - 1, 14], [2017, 4 - 1, 17], [2017, 5 - 1, 1], [2017, 5 - 1, 29], [2017, 8 - 1, 28], [2017, 12 - 1, 25], [2017, 12 - 1, 26]];

	  return bankHolidays.some(function (b) {
	    var _b = _slicedToArray(b, 3);

	    var year = _b[0];
	    var month = _b[1];
	    var date = _b[2];

	    return d.getUTCDate() === date && d.getUTCMonth() === month && d.getUTCFullYear() === year;
	  });
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.retrieve = retrieve;
	exports.save = save;
	function retrieve(obj) {
	  return new Promise(function (r) {
	    return window.chrome.storage.local.get(obj, r);
	  });
	}

	function save(obj) {
	  return new Promise(function (r) {
	    return window.chrome.storage.local.set(obj, r);
	  });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.classnames = classnames;
	exports.pollFor = pollFor;
	exports.createElement = createElement;
	function classnames(classes) {
	  var output = [];
	  Object.keys(classes).forEach(function (classname) {
	    classes[classname] && output.push(classname);
	  });
	  return output.join(' ');
	}

	function pollFor(condition) {
	  function poll(resolve) {
	    var result = condition();
	    if (result) {
	      resolve(result);
	    } else {
	      window.setTimeout(function () {
	        return poll(resolve);
	      }, 100);
	    }
	  }
	  return new Promise(poll);
	}

	function createElement(html) {
	  var el = document.createElement('div');
	  el.innerHTML = html;
	  return el.firstChild;
	}

/***/ }
/******/ ]);