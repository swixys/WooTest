/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://wooTest/./src/scss/index.scss?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ \"./src/scss/index.scss\");\n\r\n\r\n\r\nwindow.onunload = function(){\r\n    sessionStorage.clear()\r\n}\r\n//// double range price\r\nconst fromSlider = document.querySelector('#fromSlider');\r\nif (fromSlider){\r\n    const toSlider = document.querySelector('#toSlider');\r\n    const fromInput = document.querySelector('#fromInput');\r\n    const toInput = document.querySelector('#toInput');\r\n    function controlFromSlider(fromSlider, toSlider, fromInput) {\r\n        const [from, to] = getParsed(fromSlider, toSlider);\r\n        fillSlider(fromSlider, toSlider, '#C6C6C6', '#28303d', toSlider);\r\n        if (from > to) {\r\n            fromSlider.value = to;\r\n            fromInput.value = to;\r\n        } else {\r\n            fromInput.value = from;\r\n        }\r\n    }\r\n    function controlToSlider(fromSlider, toSlider, toInput) {\r\n        const [from, to] = getParsed(fromSlider, toSlider);\r\n        fillSlider(fromSlider, toSlider, '#C6C6C6', '#28303d', toSlider);\r\n        setToggleAccessible(toSlider);\r\n        if (from <= to) {\r\n            toSlider.value = to;\r\n            toInput.value = to;\r\n        } else {\r\n            toInput.value = from;\r\n            toSlider.value = from;\r\n        }\r\n    }\r\n    function getParsed(currentFrom, currentTo) {\r\n        const from = parseInt(currentFrom.value, 10);\r\n        const to = parseInt(currentTo.value, 10);\r\n        return [from, to];\r\n    }\r\n    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {\r\n        const rangeDistance = to.max-to.min;\r\n        const fromPosition = from.value - to.min;\r\n        const toPosition = to.value - to.min;\r\n        controlSlider.style.background = `linear-gradient(\r\n      to right,\r\n      ${sliderColor} 0%,\r\n      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,\r\n      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,\r\n      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, \r\n      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, \r\n      ${sliderColor} 100%)`;\r\n    }\r\n    function setToggleAccessible(currentTarget) {\r\n        const toSlider = document.querySelector('#toSlider');\r\n        if (Number(currentTarget.value) <= 0 ) {\r\n            toSlider.style.zIndex = 2;\r\n        } else {\r\n            toSlider.style.zIndex = 0;\r\n        }\r\n    }\r\n    fillSlider(fromSlider, toSlider, '#C6C6C6', '#28303d', toSlider);\r\n    setToggleAccessible(toSlider);\r\n    fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);\r\n    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);\r\n}\r\n\r\n\r\n///view product\r\nconst spis = document.querySelector('.view_product_spis')\r\nconst list = document.querySelector('.view_product_tile')\r\nif (spis || list){\r\n    spis.addEventListener(\"click\", function () {\r\n        document.querySelector(\".product_container\").classList.add('full');\r\n    })\r\n    list.addEventListener(\"click\", function () {\r\n        document.querySelector(\".product_container\").classList.remove('full');\r\n    })\r\n}\r\n\r\n\r\n///mini-cart\r\nvar modal = document.getElementById(\"mini-cart-modal\");\r\nvar btn = document.getElementById(\"mini-cart\");\r\nvar span = document.getElementsByClassName(\"close\");\r\nbtn.onclick = function() {\r\n    modal.style.display = \"block\";\r\n}\r\nspan.onclick = function() {\r\n    modal.style.display = \"none\";\r\n}\r\nwindow.onclick = function(event) {\r\n    if (event.target == modal) {\r\n        modal.style.display = \"none\";\r\n    }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://wooTest/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;