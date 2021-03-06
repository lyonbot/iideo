var container = document.getElementById('app')
var iv = iideo(container)

var story = iv.story
var video = iv.video

/// 设置视频文件地址 和 封面图

video.src = "./1.mp4"
video.poster = "./1.jpg"

/// 以下是故事情节

// 1s ~ 4s 期间，视频部分区域可点击，点击后视频跳转到 7s 处
story.points.push(new iideo.Button({
  start: 1,
  end: 4,
  lt: [0, 0.75],
  rb: [1, 0.87],
  onclick() {
    video.currentTime = 7
  }
}))

// 只要进入 4s ~ 4.5s 之间，就会跳回 0s 处，同时手机振动
story.points.push({
  start: 4,
  end: 4.5,
  onenter() {
    video.currentTime = 0
    if ('vibrate' in navigator) navigator.vibrate(100)
  },
})

// 只要进入 9s ~ 10s 之间，就会停止播放
story.points.push({
  start: 9,
  end: 10,
  onenter() {
    video.pause()
  },
})

/// 以上是故事情节

story.reset()
