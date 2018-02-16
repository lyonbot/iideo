import StoryTeller, { EventPoint } from './StoryTeller'

export interface ButtonOptions {
  start: number
  end: number
  onclick: Function

  // Left-Top and Right-Bottom coord

  lt: [number, number]
  rb: [number, number]
}

class Button implements EventPoint {

  start: number
  end: number
  onclick: Function

  // Left-Top and Right-Bottom coord

  lt: [number, number]
  rb: [number, number]

  constructor(option: ButtonOptions) {
    this.start = option.start
    this.end = option.end
    this.onclick = option.onclick

    this.lt = option.lt
    this.rb = option.rb

    this._callback = this._callback.bind(this)
  }

  private _callback(x: number, y: number, player: StoryTeller) {
    const [x0, y0] = this.lt
    const [x1, y1] = this.rb
    if (x >= x0 && x <= x1 && y >= y0 && y <= y1) this.onclick(x, y, this, player)
  }

  onenter(time: number, player: StoryTeller) {
    player.addEventListener('tap', this._callback)
  }

  onleave(time: number, player: StoryTeller) {
    player.removeEventListener('tap', this._callback)
  }

  onreset(was_actived: boolean, player: StoryTeller) {
    if (was_actived) this.onleave(0, player);
  }
}

export default Button
