const { app, BrowserWindow, Tray, Menu } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

const os = require('os')

// 'Linux' on Linux, 'Darwin' on macOS and 'Windows_NT'
console.log('os', os.type())

const isDev = process.env.ENV === 'development'

let win = null

const contextMenu = Menu.buildFromTemplate([
  { label: 'exit', type: 'normal' }
])

function toggleWindow () {
  if (win.isVisible()) {
    win.hide()
  } else {
    win.show()
  }
}

// on Linux and Windows_NT
function createTray () {
  const tray = new Tray(path.join(__dirname, './icon.png'))
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', toggleWindow)
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

// On macOS
function createDock () {
  app.dock.setMenu(contextMenu)
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 600,
    minHeight: 768,
    width: 1024,
    height: 768
    // titleBarStyle: 'hidden'
  })

  // and load the index.html of the app.
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  const osType = os.type()
  if (osType === 'macOS') {
    createDock()
  } else { // Linux of Windows
    createTray()
  }

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools()
  } else {
    autoUpdater.allowPrerelease = true
    autoUpdater.checkForUpdatesAndNotify()
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  win.hide()
})
