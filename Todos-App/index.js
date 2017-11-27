const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow
let addWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(`file://${__dirname}/main.html`)
    mainWindow.on('closed', () => app.quit())

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

function createAddWindow() {
    addWindow = new BrowserWindow({
        height: 200,
        width: 300,
        title: 'Add new Todo'
    })
    addWindow.loadURL(`file://${__dirname}/add.html`)
    addWindow.addListener('closed', () => addWindow = null)
}

function clearTodos() {
    mainWindow.webContents.send('todos:clear')
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo)
    addWindow.close()
})

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click: createAddWindow
            },
            {
                label: 'Clear Todos',
                click: () => {
                    clearTodos()
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click: () => app.quit()
            }
        ]
    }
]

if (process.platform === 'darwin') {
    menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [
            {
                role: 'toggledevtools'
            },
            {
                role: 'reload'
            }
        ]
    })
}