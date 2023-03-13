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

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-1/./src/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\nconst repoInput = document.querySelector('#repository-name');\nconst findRepoForm = document.querySelector('.repositories-form');\nconst repoList = document.querySelector('.repositories-list');\nconst listEmpty = document.querySelector('.repositories-empty');\nconst nameError = document.querySelector('.repositories-form__content_name-error');\nconst loader = document.querySelector('.lds-spinner');\nlet lastRepo;\n\nlet searchValue;\nlet limit = Math.ceil(document.documentElement.clientHeight / 160);\nlet page;\n\nconst options = {\n    root: null,\n    rootMargin: '0px',\n    threshold: 0.1,\n};\n\nconst callback = async (entries, observer) => {\n    if (entries[0].isIntersecting) {\n        page++;\n        const repositories = await fetchRepo({ page, limit });\n\n        repositories.items.forEach((i) => {\n            repoList.appendChild(renderRepo(i));\n        });\n\n        observer.unobserve(lastRepo);\n\n        if (page * limit < repositories.total_count) {\n            lastRepo = document.querySelector('.repositories-list__item:last-child');\n            observer.observe(lastRepo);\n        }\n    }\n};\n\nconst observer = new IntersectionObserver(callback, options);\n\nrepoInput.addEventListener('input', (e) => {\n    if (nameError.classList.contains('error-active')) nameError.classList.remove('error-active');\n});\n\nfindRepoForm.addEventListener('submit', async (e) => {\n    e.preventDefault();\n    page = 1;\n    listEmpty.classList.remove('repositories-empty__visible');\n    searchValue = repoInput.value;\n\n    if (searchValue.length < 2) {\n        nameError.classList.add('error-active');\n        return;\n    }\n\n    repoList.replaceChildren();\n\n    const repositories = await fetchRepo({ page, limit });\n\n    if (repositories.total_count === 0) {\n        listEmpty.classList.add('repositories-empty__visible');\n    }\n\n    repositories.items.forEach((i) => {\n        repoList.appendChild(renderRepo(i));\n    });\n\n    if (page * limit < repositories.total_count) {\n        lastRepo = document.querySelector('.repositories-list__item:last-child');\n        observer.observe(lastRepo);\n    }\n});\n\nfunction renderRepo(repo) {\n    const repoItem = document.createElement('li');\n    repoItem.classList.add('repositories-list__item');\n\n    const urls = document.createElement('div');\n    urls.classList.add('repositories-list__item_urls');\n\n    const git = document.createElement('a');\n    git.textContent = 'GitHub';\n    git.classList.add('urls__git');\n    git.setAttribute('href', repo.html_url);\n    git.setAttribute('target', 'blank');\n    urls.append(git);\n\n    if (repo.homepage) {\n        const home = document.createElement('a');\n        home.textContent = 'HomePage';\n        home.classList.add('urls__home');\n        home.setAttribute('href', repo.homepage);\n        home.setAttribute('target', 'blank');\n        urls.append(home);\n    }\n\n    const date = document.createElement('p');\n    date.classList.add('repositories-list__item_date');\n    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };\n    date.textContent = `Создан: ${new Date(repo.created_at).toLocaleDateString('ru-Ru', dateOptions)}`;\n\n    repoItem.innerHTML = `<p class=\"repositories-list__item_name\">${repo.name}</p>`;\n\n    repoItem.append(urls);\n    repoItem.append(date);\n\n    return repoItem;\n}\n\nasync function fetchRepo({ page, limit }) {\n    loader.style.display = 'inline-block';\n\n    const response = await fetch(`https://api.github.com/search/repositories?q=${searchValue} in:name&per_page=${limit}&page=${page}`);\n    const result = await response.json();\n\n    loader.style.display = 'none';\n\n    return result;\n}\n\n\n//# sourceURL=webpack://project-1/./src/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;