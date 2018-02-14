require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var t="undefined "!=typeof Symbol?Symbol():"__@EventListenerList",r=function(){function r(){n(this,r),this[t]={}}return e(r,[{key:"addEventListener",value:function(e,n){var r=this[t],i=r[e];i?i.push(n):r[e]=[n]}},{key:"on",value:function(e,n){this.addEventListener(e,n)}},{key:"emit",value:function(e){var n=this[t][e];if(n&&n.length){for(var r=arguments.length,i=Array(r>1?r-1:0),o=1;o<r;o++)i[o-1]=arguments[o];for(var a=0;a<n.length;a++){n[a].apply(this,i)}}}},{key:"removeEventListener",value:function(e,n){var r=this[t][e];if(r&&r.length)for(var i=0;i<r.length;i++){if(r[i]===n)return void r.splice(i,1)}}},{key:"off",value:function(e,n){this.removeEventListener(e,n)}}]),r}();exports.default=r;
},{}],6:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(t){this.aratio=t}return t.prototype.fit=function(t,i){var h=this.aratio;t/i>h?(this.width=i*h,this.height=i,this.marginX=(t-this.width)/2,this.marginY=0):(this.width=t,this.height=t/h,this.marginX=0,this.marginY=(i-this.height)/2)},t.prototype.s2c=function(t,i){return[(t-this.marginX)/this.width,(i-this.marginY)/this.height]},t}();exports.default=t;
},{}],4:[function(require,module,exports) {
"use strict";var t=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}();exports.__esModule=!0;var e=require("../libs/EventEmitter"),i=require("./FitCalc");function n(){var t=document.createElement("video");return t.setAttribute("crossOrigin","anonymous"),t.setAttribute("preload","auto"),t.setAttribute("control","false"),t.setAttribute("style","object-fit:contain;width:100%;height:100%;position:absolute;left:0;top:0"),t.setAttribute("webkit-playsinline","true"),t.setAttribute("playsinline","true"),t.setAttribute("x-webkit-airplay","allow"),t.setAttribute("x5-video-player-type","h5"),t.setAttribute("x5-video-player-fullscreen","true"),t.setAttribute("x5-video-orientation","portraint"),t}var r=function(e){function r(t,r){var a=e.call(this)||this;a.container=t,a._canvas_mode=r,a.points=[],a._pts_actived=[],a.fitCalc=new i.default(1);var o=n();if(a.el=o,r){var s=document.createElement("canvas");s.setAttribute("style","position: absolute; left: 0; top: 0; width: 100%; height: 100%");var c=s.getContext("2d");a.canvas=s,a.cctx=c,a._canvas_repaint=a._canvas_repaint.bind(a),a._canvas_repaint()}o.addEventListener("resize",function(t){setTimeout(function(){return a.updateFitCalc()},300)},!1),o.addEventListener("timeupdate",function(t){a.process(o.currentTime)},!1),o.addEventListener("seeked",function(t){var e=o.currentTime;a.reset(!0,e),a.process(e)},!1);var u=a._mouseup.bind(a);return o.addEventListener("mouseup",u,!1),s&&s.addEventListener("mouseup",u,!1),t.addEventListener("click",function e(){o.play(),t.removeEventListener("click",e,!1)},!1),t.appendChild(r?s:o),"static"===getComputedStyle(t).position&&(t.style.position="relative"),a}return t(r,e),r.prototype._canvas_repaint=function(){if(this._canvas_mode){var t=this.fitCalc,e=this.el;this.cctx.drawImage(e,t.marginX,t.marginY,t.width,t.height),requestAnimationFrame(this._canvas_repaint)}},r.prototype._mouseup=function(t){var e=this.fitCalc.s2c(t.clientX,t.clientY),i=e[0],n=e[1];this.emit("tap",i,n,this)},r.prototype.updateFitCalc=function(){var t=this.el,e=this.fitCalc,i=t.videoWidth||1,n=t.videoHeight||1,r=this.container.offsetWidth,a=this.container.offsetHeight;if(e.aratio=i/n,e.fit(r,a),this._canvas_mode){var o=this.canvas;t.width=o.width=r,t.height=o.height=a}},r.prototype.reset=function(t,e){for(var i=this.points,n=this._pts_actived,r=0;r<i.length;r++){var a=!!n[r],o=i[r],s=o.onreset;if("function"==typeof s&&s.call(o,a,this),a&&t){this.emit("onleave",o,this,e);var c=o.onleave;"function"==typeof c&&c.call(o,e,this)}n[r]=!1}},r.prototype.process=function(t){for(var e=this.points,i=0;i<e.length;i++){var n=e[i],r=this._pts_actived[i],a=t>=n.start&&t<=n.end;if(r!=a){var o=a?"enter":"leave";this.emit(o,n,this,t);var s=n["on"+o];"function"==typeof s&&s.call(n,t,this),this._pts_actived[i]=a}}},r}(e.default);exports.StoryTeller=r;
},{"../libs/EventEmitter":7,"./FitCalc":6}],5:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(t){this.start=t.start,this.end=t.end,this.onclick=t.onclick,this.lt=t.lt,this.rb=t.rb,this._callback=this._callback.bind(this)}return t.prototype._callback=function(t,e,i){var n=this.lt,o=n[0],s=n[1],c=this.rb,r=c[0],a=c[1];t>=o&&t<=r&&e>=s&&e<=a&&this.onclick(t,e,this,i)},t.prototype.onenter=function(t,e){e.addEventListener("tap",this._callback)},t.prototype.onleave=function(t,e){e.removeEventListener("tap",this._callback)},t.prototype.onreset=function(t,e){t&&this.onleave(0,e)},t}();exports.default=t;
},{}],3:[function(require,module,exports) {
"use strict";!function(){for(var n=0,i=["","ms","moz","webkit","o"],e=0;e<i.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[i[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[e]+"CancelAnimationFrame"]||window[i[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i,e){var a=(new Date).getTime(),t=Math.max(0,16-(a-n)),o=window.setTimeout(function(){i(a+t)},t);return n=a+t,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)})}();
},{}],1:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./core/StoryTeller"),t=require("./core/Button"),r=i(t);function i(e){return e&&e.__esModule?e:{default:e}}function n(t){var r=new e.StoryTeller(t),i=r.el;return window.addEventListener("resize",function(){i.style.width=window.innerWidth+"px",i.style.height=window.innerHeight+"px",setTimeout(function(){return r.updateFitCalc()},300)},!1),{story:r,video:i}}require("./libs/polyfill"),n.Button=r.default,window.iideo=n,exports.default=n;
},{"./core/StoryTeller":4,"./core/Button":5,"./libs/polyfill":3}]},{},[1])