import _StoryTeller from './core/StoryTeller'
import _Button from './core/Button'
import './libs/polyfill'

function iideo(container: HTMLElement) {
  var story = new _StoryTeller(container)
  var video = story.el

  // 微信
  if (/micromessenger/i.test(navigator.userAgent)) {
    window.addEventListener('resize', function () {
      video.style.width = window.innerWidth + "px";
      video.style.height = window.innerHeight + "px";
      setTimeout(() => story.updateFitCalc(), 300);
    }, false)
  }

  return { story, video }
}

namespace iideo {
  export const StoryTeller = _StoryTeller
  export const Button = _Button
}

if (typeof(window) == "object") {
  window["iideo"] = iideo
}

export default iideo
