import EventEmitter from '../libs/EventEmitter'
import FitCalc from './FitCalc'

type EventPointCallback = (this: EventPoint, time: number, player: StoryTeller) => void
type StoryResetCallback = (this: EventPoint, was_actived: boolean, player: StoryTeller) => void

export interface EventPoint {
  start: number
  end: number

  onenter?: EventPointCallback
  onleave?: EventPointCallback
  onreset?: StoryResetCallback
}

function makeVideoElement(): HTMLVideoElement {
  var v = document.createElement('video')

  v.setAttribute("crossOrigin", "anonymous")

  v.setAttribute("preload", "auto")
  v.setAttribute("control", "false")
  v.setAttribute("style", "object-fit:contain;width:100%;height:100%;position:absolute;left:0;top:0")

  // iOS
  v.setAttribute("webkit-playsinline", "true")
  v.setAttribute("playsinline", "true")
  v.setAttribute("x-webkit-airplay", "allow")

  // 安卓微信 https://x5.tencent.com/tbs/guide/video.html
  v.setAttribute("x5-video-player-type", "h5")
  v.setAttribute("x5-video-player-fullscreen", "true")
  v.setAttribute("x5-video-orientation", "portraint")

  return v
}

export class StoryTeller extends EventEmitter {
  public points: EventPoint[] = []
  private _pts_actived: boolean[] = []

  public el: HTMLVideoElement
  public fitCalc: FitCalc = new FitCalc(1)

  // Only used for canvas_mode
  public canvas: HTMLCanvasElement
  public cctx: CanvasRenderingContext2D

  /**
   *
   * @param container     视频所在的容器
   * @param _canvas_mode （实验性）使用 canvas 绘制视频
   */
  constructor(
    public container: HTMLVideoElement,
    private _canvas_mode?: boolean
  ) {
    super()

    // 创建video元素

    var el = makeVideoElement()
    this.el = el

    // 创建一个div元素，用于接收点击事件

    if (_canvas_mode) {
      var canvas = document.createElement('canvas')
      canvas.setAttribute('style', 'position: absolute; left: 0; top: 0; width: 100%; height: 100%')
      var cctx = canvas.getContext('2d')
      this.canvas = canvas
      this.cctx = cctx

      this._canvas_repaint = this._canvas_repaint.bind(this)
      this._canvas_repaint()
    }

    // 添加尺寸相关的事件

    el.addEventListener('resize', (ev) => {
      setTimeout(() => this.updateFitCalc(), 300)
    }, false)

    // 添加时间相关的事件

    el.addEventListener('timeupdate', (ev) => {
      this.process(el.currentTime)
    }, false)
    el.addEventListener('seeked', (ev) => {
      const t = el.currentTime
      this.reset(true, t)
      this.process(t)
    }, false)

    // 添加触摸相关的事件

    var _mouseup = this._mouseup.bind(this)

    el.addEventListener('mouseup', _mouseup, false)

    if (canvas) {
      canvas.addEventListener('mouseup', _mouseup, false)
    }

    // 点击容器任意位置开始播放视频

    function clickToPlay() {
      el.play()
      container.removeEventListener('click', clickToPlay, false)
    }
    container.addEventListener('click', clickToPlay, false)

    // 把视频元素添加到容器里

    container.appendChild(_canvas_mode ? canvas : el)

    if (getComputedStyle(container).position === 'static') container.style.position = 'relative'
  }

  private _canvas_repaint() {
    // Note: 在初始化的时候， _canvas_repaint 已经 bind(this)，因此可以直接调用
    if (!this._canvas_mode) return

    const fitCalc = this.fitCalc
    const video = this.el
    const ctx = this.cctx
    ctx.drawImage(video, fitCalc.marginX, fitCalc.marginY, fitCalc.width, fitCalc.height)

    requestAnimationFrame(this._canvas_repaint)
  }

  private _mouseup(ev: MouseEvent) {
    var [x, y] = this.fitCalc.s2c(ev.clientX, ev.clientY)
    this.emit('tap', x, y, this)
  }

  updateFitCalc() {
    const video = this.el
    const fitCalc = this.fitCalc

    const vw = video.videoWidth || 1
    const vh = video.videoHeight || 1

    const sw = this.container.offsetWidth
    const sh = this.container.offsetHeight

    fitCalc.aratio = vw / vh
    fitCalc.fit(sw, sh)

    if (this._canvas_mode) {
      const canvas = this.canvas
      // canvas.setAttribute('style',
      // 'position:absolute;' +
      // 'left:' + video.offsetLeft + 'px;' +
      // 'top:' + video.offsetTop + 'px;' +
      // 'width:' + video.offsetWidth + 'px;' +
      // 'height:' + video.offsetHeight + 'px;'
      // )

      video.width = canvas.width = sw
      video.height = canvas.height = sh
    }
  }

  /**
   * Force reset all points' status.
   *
   * If a PlayerPoint has "onreset" handler, it will be trigged.
   */
  reset(emitLeaveEvents?: boolean, time?: number) {
    const pts = this.points
    var status = this._pts_actived
    for (let i = 0; i < pts.length; i++) {
      const was_actived = !!status[i]
      const pt = pts[i]
      const onreset: StoryResetCallback = pt["onreset"]
      if (typeof onreset === 'function') onreset.call(pt, was_actived, this)

      if (was_actived && emitLeaveEvents) {
        this.emit("onleave", pt, this, time)
        const onleave: EventPointCallback = pt["onleave"]
        if (typeof onleave === 'function') onleave.call(pt, time, this)
      }

      status[i] = false
    }
  }

  /**
   * Check every time pts and emit "enter" / "leave" events if neeeded.
   * @param time current time in seconds
   */
  process(time: number) {
    const pts = this.points
    for (let i = 0; i < pts.length; i++) {
      const pt = pts[i]
      const was_actived = this._pts_actived[i]
      const now_actived = (time >= pt.start && time <= pt.end)
      if (was_actived != now_actived) {
        const event_name = now_actived ? "enter" : "leave"
        this.emit(event_name, pt, this, time)

        const pt_handler: EventPointCallback = pt["on" + event_name]
        if (typeof pt_handler === 'function') pt_handler.call(pt, time, this)

        this._pts_actived[i] = now_actived
      }
    }
  }
}
