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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.age = age;
	exports.now = now;
	exports.capitalise = capitalise;
	exports.ordinalise = ordinalise;
	exports.classnames = classnames;
	exports.pollFor = pollFor;
	exports.retrieve = retrieve;
	exports.save = save;
	function age(time) {
	  var diff = now() - time;
	  return Math.floor(diff / 60000);
	}

	function now() {
	  return new Date().getTime();
	}

	function capitalise(str, allWords) {
	  if (allWords) {
	    return str.split(' ').map(function (w) {
	      return capitalise(w, false);
	    }).join(' ');
	  }
	  return str[0].toUpperCase() + str.slice(1).toLowerCase();
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

	function classnames(classes) {
	  var output = [];
	  Object.keys(classes).forEach(function (classname) {
	    if (classes[classname]) {
	      output.push(classname);
	    }
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
	  return new Promise(function (r) {
	    poll(r);
	  });
	}

	function retrieve(obj) {
	  return new Promise(function (r) {
	    window.chrome.storage.local.get(obj, r);
	  });
	}

	function save(obj) {
	  return new Promise(function (r) {
	    window.chrome.storage.local.set(obj, r);
	  });
	}

/***/ }
/******/ ]);