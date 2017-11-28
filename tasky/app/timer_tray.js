const electron = require('electron')
const path = require('path')
const { Tray, Menu, app } = electron

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath)
    this.mainWindow = mainWindow
    this.on('click', this.onClick)
    this.setToolTip('Timer App')
    this.buildMenu()
  }

  buildMenu() {
    this.setContextMenu(Menu.buildFromTemplate([{ role: 'quit' }]))
  }

  onClick(event, bounds) {
    const { x, y } = bounds
    const { height, width } = this.mainWindow.getBounds()

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide()
    } else {
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: process.platform === 'win32' ? y - height : y,
        height: height,
        width: width,
      })
      this.mainWindow.show()
    }
  }
}

module.exports = TimerTray