# call-the-roll

## Usage

```bash
# Clone this repository
git clone https://github.com/web1992/call-the-roll
# Go into the repository
cd call-the-roll
# Install dependencies
npm install
# Run the app
npm start
```

## Debug

Electron 代码调试

> you can debug in `Debug Main Process` or `Debug Renderer Process`

* `Debug Main Process` is for `main.js`
* `Debug Renderer Process` is for `renderer.js` and `helper.js`

> debug 有两种模式

在 `vscode/launch.json`配置调试

* `Debug Main Process` 调试 `main.js`中的代码
* `Debug Renderer Process` 调试 `renderer.js` and `helper.js`中的代码

> dom 调试

取消`main.js`中的代码注释，可打开`chrome`调试控制台，如下：

```js
//mainWindow.webContents.openDevTools();
```

## Resources for Learning Electron

* [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
* [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
* [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
* [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
* [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
* [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

* [Debugging Electron in VSCode](https://github.com/octref/vscode-electron-debug)

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
