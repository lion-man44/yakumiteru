/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  'use strict';

  var regex = {
    base64: /^data:/
  };

  var onResponse = function onResponse(yakulist) {
    choiceYakuMitsuru(yakulist);
  };

  var choiceYakuMitsuru = function choiceYakuMitsuru(yakulist) {
    var random = Math.floor(Math.random() * 101);
    var url = yakulist[random];
    if (regex.base64.test(url)) {
      choiceYakuMitsuru(yakulist);
    } else {
      replaceMemo.src = yakulist[random];
    }
  };

  chrome.extension.sendMessage({ query: 'やくみつる' }, onResponse);

  var replaceMemo = {
    src: ''
  };

  var replaceImage = function replaceImage(images, aTags, divs) {
    images.forEach(function ($el) {
      var $img = document.createElement('img');
      $img.className = $el.className;
      $img.style.cssText = $el.style.cssText;
      //$img.height = $el.height;
      //$img.width = $el.width;
      $img.src = replaceMemo.src;
      $el.parentNode.replaceChild($img, $el);
    });
    aTags.bk.forEach(function ($a) {
      if ($a.parentNode == null) return;
      var $newA = document.createElement('a');
      $a.style.background = '';
      $newA.style.cssText = $a.style.cssText;
      $newA.style.background = 'url("' + replaceMemo.src + '")';
      $a.parentNode.replaceChild($newA, $a);
    });
    aTags.bki.forEach(function ($a) {
      if ($a.parentNode == null) return;
      var $newA = document.createElement('a');
      $a.style.backgroundImage = '';
      $newA.style.cssText = $a.style.cssText;
      $newA.style.backgroundImage = 'url("' + replaceMemo.src + '")';
      $a.parentNode.replaceChild($newA, $a);
    });
    divs.bk.forEach(function ($div) {
      if ($div.parentNode == null) return;
      var $newDiv = document.createElement('div');
      $div.style.background = '';
      $newDiv.style.cssText = $div.style.cssText;
      $newDiv.style.background = 'url("' + replaceMemo.src + '")';
      $div.parentNode.replaceChild($newDiv, $div);
    });
    divs.bki.forEach(function ($div) {
      if ($div.parentNode == null) return;
      var $newDiv = document.createElement('div');
      $div.style.backgroundImage = '';
      $newDiv.style.cssText = $div.style.cssText;
      $newDiv.style.backgroundImage = 'url("' + replaceMemo.src + '")';
      $div.parentNode.replaceChild($newDiv, $div);
    });
  };

  var includeBKUrl = function includeBKUrl($el) {
    return $el.style.background.includes('url');
  };
  var includeBKIUrl = function includeBKIUrl($el) {
    return $el.style.backgroundImage.includes('url');
  };

  var onWatch = function onWatch() {
    var $images = document.querySelectorAll('img');
    var $aTags = document.querySelectorAll('a');
    var $divs = document.querySelectorAll('div');
    var images = Array.from($images).filter(function ($el) {
      return $el.src !== replaceMemo.src;
    });
    var backgroundForATags = Array.from($aTags).filter(function ($a) {
      return includeBKUrl($a);
    });
    var backgroundImageForATags = Array.from($aTags).filter(function ($a) {
      return includeBKIUrl($a);
    });
    var backgroundForDivs = Array.from($divs).filter(function ($div) {
      return includeBKUrl($div);
    });
    var backgroundImageForDivs = Array.from($divs).filter(function ($div) {
      return includeBKIUrl($div);
    });
    replaceImage(images, { bk: backgroundForATags, bki: backgroundImageForATags }, { bk: backgroundForDivs, bki: backgroundImageForDivs });
  };

  var main = function main() {
    setInterval(onWatch, 1000);
  };

  main();
})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDZjYjk2NjMyMWYxMTU2Yjg4MjEiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvY29udGVudHNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyZWdleCIsImJhc2U2NCIsIm9uUmVzcG9uc2UiLCJ5YWt1bGlzdCIsImNob2ljZVlha3VNaXRzdXJ1IiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwidXJsIiwidGVzdCIsInJlcGxhY2VNZW1vIiwic3JjIiwiY2hyb21lIiwiZXh0ZW5zaW9uIiwic2VuZE1lc3NhZ2UiLCJxdWVyeSIsInJlcGxhY2VJbWFnZSIsImltYWdlcyIsImFUYWdzIiwiZGl2cyIsImZvckVhY2giLCIkaW1nIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiJGVsIiwic3R5bGUiLCJjc3NUZXh0IiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImJrIiwiJGEiLCIkbmV3QSIsImJhY2tncm91bmQiLCJia2kiLCJiYWNrZ3JvdW5kSW1hZ2UiLCIkZGl2IiwiJG5ld0RpdiIsImluY2x1ZGVCS1VybCIsImluY2x1ZGVzIiwiaW5jbHVkZUJLSVVybCIsIm9uV2F0Y2giLCIkaW1hZ2VzIiwicXVlcnlTZWxlY3RvckFsbCIsIiRhVGFncyIsIiRkaXZzIiwiQXJyYXkiLCJmcm9tIiwiZmlsdGVyIiwiYmFja2dyb3VuZEZvckFUYWdzIiwiYmFja2dyb3VuZEltYWdlRm9yQVRhZ3MiLCJiYWNrZ3JvdW5kRm9yRGl2cyIsImJhY2tncm91bmRJbWFnZUZvckRpdnMiLCJtYWluIiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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O0FBQ0QsR0FGRDs7QUFJQVk7QUFDRCxDQS9GRCxJIiwiZmlsZSI6ImNvbnRlbnRzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0NmNiOTY2MzIxZjExNTZiODgyMSIsIigoKSA9PiB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBjb25zdCByZWdleCA9IHtcbiAgICBiYXNlNjQ6IC9eZGF0YTovLFxuICB9O1xuXG4gIGNvbnN0IG9uUmVzcG9uc2UgPSAoeWFrdWxpc3QpID0+IHtcbiAgICBjaG9pY2VZYWt1TWl0c3VydSh5YWt1bGlzdCk7XG4gIH07XG5cbiAgY29uc3QgY2hvaWNlWWFrdU1pdHN1cnUgPSAoeWFrdWxpc3QpID0+IHtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDEpO1xuICAgIGNvbnN0IHVybCA9IHlha3VsaXN0W3JhbmRvbV07XG4gICAgaWYgKHJlZ2V4LmJhc2U2NC50ZXN0KHVybCkpIHtcbiAgICAgIGNob2ljZVlha3VNaXRzdXJ1KHlha3VsaXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwbGFjZU1lbW8uc3JjID0geWFrdWxpc3RbcmFuZG9tXTtcbiAgICB9XG4gIH07XG5cbiAgY2hyb21lLmV4dGVuc2lvbi5zZW5kTWVzc2FnZSh7IHF1ZXJ5OiAn44KE44GP44G/44Gk44KLJyB9LCBvblJlc3BvbnNlKTtcblxuICBjb25zdCByZXBsYWNlTWVtbyA9IHtcbiAgICBzcmM6ICcnLFxuICB9O1xuXG4gIGNvbnN0IHJlcGxhY2VJbWFnZSA9IChpbWFnZXMsIGFUYWdzLCBkaXZzKSA9PiB7XG4gICAgaW1hZ2VzLmZvckVhY2goJGVsID0+IHtcbiAgICAgIGNvbnN0ICRpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICRpbWcuY2xhc3NOYW1lID0gJGVsLmNsYXNzTmFtZTtcbiAgICAgICRpbWcuc3R5bGUuY3NzVGV4dCA9ICRlbC5zdHlsZS5jc3NUZXh0O1xuICAgICAgLy8kaW1nLmhlaWdodCA9ICRlbC5oZWlnaHQ7XG4gICAgICAvLyRpbWcud2lkdGggPSAkZWwud2lkdGg7XG4gICAgICAkaW1nLnNyYyA9IHJlcGxhY2VNZW1vLnNyYztcbiAgICAgICRlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCgkaW1nLCAkZWwpO1xuICAgIH0pO1xuICAgIGFUYWdzLmJrLmZvckVhY2goJGEgPT4ge1xuICAgICAgaWYgKCRhLnBhcmVudE5vZGUgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgJG5ld0EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAkYS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAkbmV3QS5zdHlsZS5jc3NUZXh0ID0gJGEuc3R5bGUuY3NzVGV4dDtcbiAgICAgICRuZXdBLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKFwiJHtyZXBsYWNlTWVtby5zcmN9XCIpYDtcbiAgICAgICRhLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKCRuZXdBLCAkYSk7XG4gICAgfSk7XG4gICAgYVRhZ3MuYmtpLmZvckVhY2goJGEgPT4ge1xuICAgICAgaWYgKCRhLnBhcmVudE5vZGUgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgJG5ld0EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAkYS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnJztcbiAgICAgICRuZXdBLnN0eWxlLmNzc1RleHQgPSAkYS5zdHlsZS5jc3NUZXh0O1xuICAgICAgJG5ld0Euc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7cmVwbGFjZU1lbW8uc3JjfVwiKWA7XG4gICAgICAkYS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCgkbmV3QSwgJGEpO1xuICAgIH0pO1xuICAgIGRpdnMuYmsuZm9yRWFjaCgkZGl2ID0+IHtcbiAgICAgIGlmICgkZGl2LnBhcmVudE5vZGUgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgJG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgJGRpdi5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAkbmV3RGl2LnN0eWxlLmNzc1RleHQgPSAkZGl2LnN0eWxlLmNzc1RleHQ7XG4gICAgICAkbmV3RGl2LnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKFwiJHtyZXBsYWNlTWVtby5zcmN9XCIpYDtcbiAgICAgICRkaXYucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoJG5ld0RpdiwgJGRpdik7XG4gICAgfSk7XG4gICAgZGl2cy5ia2kuZm9yRWFjaCgkZGl2ID0+IHtcbiAgICAgIGlmICgkZGl2LnBhcmVudE5vZGUgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgJG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgJGRpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnJztcbiAgICAgICRuZXdEaXYuc3R5bGUuY3NzVGV4dCA9ICRkaXYuc3R5bGUuY3NzVGV4dDtcbiAgICAgICRuZXdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7cmVwbGFjZU1lbW8uc3JjfVwiKWA7XG4gICAgICAkZGl2LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKCRuZXdEaXYsICRkaXYpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGluY2x1ZGVCS1VybCA9ICgkZWwpID0+IHtcbiAgICByZXR1cm4gJGVsLnN0eWxlLmJhY2tncm91bmQuaW5jbHVkZXMoJ3VybCcpO1xuICB9O1xuICBjb25zdCBpbmNsdWRlQktJVXJsID0gKCRlbCkgPT4ge1xuICAgIHJldHVybiAkZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlLmluY2x1ZGVzKCd1cmwnKTtcbiAgfTtcblxuICBjb25zdCBvbldhdGNoID0gKCkgPT4ge1xuICAgIGNvbnN0ICRpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcbiAgICBjb25zdCAkYVRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gICAgY29uc3QgJGRpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcbiAgICBjb25zdCBpbWFnZXMgPSBBcnJheS5mcm9tKCRpbWFnZXMpLmZpbHRlcigkZWwgPT4gJGVsLnNyYyAhPT0gcmVwbGFjZU1lbW8uc3JjKTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kRm9yQVRhZ3MgPSBBcnJheS5mcm9tKCRhVGFncykuZmlsdGVyKCRhID0+IGluY2x1ZGVCS1VybCgkYSkpO1xuICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZUZvckFUYWdzID0gQXJyYXkuZnJvbSgkYVRhZ3MpLmZpbHRlcigkYSA9PiBpbmNsdWRlQktJVXJsKCRhKSk7XG4gICAgY29uc3QgYmFja2dyb3VuZEZvckRpdnMgPSBBcnJheS5mcm9tKCRkaXZzKS5maWx0ZXIoJGRpdiA9PiBpbmNsdWRlQktVcmwoJGRpdikpO1xuICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZUZvckRpdnMgPSBBcnJheS5mcm9tKCRkaXZzKS5maWx0ZXIoJGRpdiA9PiBpbmNsdWRlQktJVXJsKCRkaXYpKTtcbiAgICByZXBsYWNlSW1hZ2UoaW1hZ2VzLCB7IGJrOiBiYWNrZ3JvdW5kRm9yQVRhZ3MsIGJraTogYmFja2dyb3VuZEltYWdlRm9yQVRhZ3MgfSwgeyBiazogYmFja2dyb3VuZEZvckRpdnMsIGJraTogYmFja2dyb3VuZEltYWdlRm9yRGl2cyB9KTtcbiAgfTtcblxuICBjb25zdCBtYWluID0gKCkgPT4ge1xuICAgIHNldEludGVydmFsKG9uV2F0Y2gsIDEwMDApO1xuICB9O1xuXG4gIG1haW4oKTtcbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9jb250ZW50c2NyaXB0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==