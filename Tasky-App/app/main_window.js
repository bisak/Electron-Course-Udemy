const electron = require('electron')
const { BrowserWindow } = electron

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      skipTaskbar: true,
      webPreferences: {
        backgroundThrottling: false
      }
    })
    this.loadURL(url)
    this.hideOnBlur()
  }

  hideOnBlur() {
    this.on('blur', () => {
      setTimeout(() => {
        this.hide()
      }, 200)
    })
  }
}

module.exports = MainWindow