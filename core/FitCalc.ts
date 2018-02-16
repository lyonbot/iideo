class FitCalc {
  /** 计算得到的 显示区域的大小 */
  width: number
  height: number
  marginX: number
  marginY: number

  /**
   *
   * @param aratio 内容的宽高比 aspect ratio
   */
  constructor(public aratio: number) {

  }

  // 上次fit时的容器大小
  private _old_ar: number
  private _old_cw: number
  private _old_ch: number

  /**
   * 根据容器尺寸，重新计算适合的显示区域大小
   *
   * @param width 容器宽度
   * @param height 容器高度
   * @returns 是否进行了重新计算
   */
  fit(width: number, height: number): boolean {
    if (width === this._old_cw && height === this._old_ch && this.aratio === this._old_ar) return false
    this._old_cw = width
    this._old_ch = height
    this._old_ar = this.aratio

    const ar = this.aratio
    const ar2 = width / height

    if (ar2 > ar) { // width too big
      this.width = height * ar
      this.height = height
      this.marginX = (width - this.width) / 2
      this.marginY = 0
    } else {
      this.width = width
      this.height = width / ar
      this.marginX = 0
      this.marginY = (height - this.height) / 2
    }

    return true
  }

  /**
   * Screen to Content:
   * 把容器坐标映射到内容坐标中（范围： 0~1）
   *
   * 注意：这个函数返回的坐标范围可能会小于0 或者大于1
   *
   * @param x 对于容器X坐标
   * @param y 对于容器Y坐标
   */
  s2c(x: number, y: number) {
    return [
      (x - this.marginX) / this.width,
      (y - this.marginY) / this.height,
    ]
  }
}

export default FitCalc
