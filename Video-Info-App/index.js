const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(`file://${__dirname}/index.html`)
})

// Electron receives the event from the main window here (2)
ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        // Electron sends event back to the main window (3)
        mainWindow.webContents.send('video:metadata', metadata.format.duration)
    })
})