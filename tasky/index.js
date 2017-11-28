const electron = require('electron')
const { app, ipcMain } = electron
const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/main_window')

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`)
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = `src/assets/${iconName}`
  tray = new TimerTray(iconPath, mainWindow)
})

ipcMain.on('timer:update', (event, timeLeft) => {
  console.log(timeLeft)
  tray.setTitle(timeLeft)
})