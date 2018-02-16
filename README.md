# iideo

轻松制作基于 HTML5 的交互视频

支持的平台：
 - 微信浏览器（X5内核）
 - 各大现代桌面浏览器（Chrome、Firefox、Edge 等）
 - 手机端 webkit (iOS、Android 原生 WebView、Chrome)
 - 手机端 Gecko (Firefox)
 - ...

## 使用方法

### 我只想使用

在 `dist` 文件夹下有已经编译好的库文件，在网页中使用它即可。

使用方法可以参考 `examples/basic` 文件夹下的例子

### 我想开发 iideo

*注：推荐使用 `yarn` 安装依赖，多多参考 `examples` 文件夹*

首先，你需要运行 `yarn` 或者 `npm i` 安装依赖，才能继续开发

- 运行 `yarn run build` 可以编译核心库。核心库输出到 `dist` 文件夹下。
  - `iideo.js` 是打包好的，可以直接用于浏览器的库
  - 其他文件是模块化的，基于 ES5 的库，可以按需使用

你可以先看看 `examples/basic` 的示例 js 代码，然后在浏览器里试试效果。
