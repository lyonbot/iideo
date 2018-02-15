import { StoryTeller } from './core/StoryTeller'
import Button from './core/Button'
import './libs/polyfill'

/**
 *
 * @param {HTMLElement} container
 */
function iideo(container) {
  var story = new StoryTeller(container)
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

iideo.StoryTeller = StoryTeller
iideo.Button = Button

window.iideo = iideo
export default iideo
