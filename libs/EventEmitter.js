const listenerSymbol = typeof (Symbol) !== 'undefined ' ? Symbol() : "__@EventListenerList"

/**
 * 简化版的，用于浏览器的 EventEmitter
 */
class EventEmitter {
  constructor() {
    /** @type {[event: string]: function[]} */
    this[listenerSymbol] = {}
  }

  addEventListener(event, handler) {
    var lss = this[listenerSymbol]
    var ls = lss[event]
    if (!ls) lss[event] = [handler]
    else ls.push(handler)
  }

  on(event, handler) {
    this.addEventListener(event, handler)
  }

  emit(event, ...args) {
    var fns = this[listenerSymbol][event]
    if (!fns || !fns.length) return
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i]
      fn.apply(this, args)
    }
  }

  removeEventListener(event, handler) {
    var fns = this[listenerSymbol][event]
    if (!fns || !fns.length) return
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i]
      if (fn === handler) {
        fns.splice(i, 1)
        return
      }
    }
  }

  off(event, handler) {
    this.removeEventListener(event, handler)
  }
}

export default EventEmitter
