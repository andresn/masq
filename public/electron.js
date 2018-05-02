const {app, BrowserWindow} = require('electron')
const path = require('path')

const isDev = process.env.ENV === 'development'

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 768,
    width: 1024,
    height: 768
  })

  console.log(path.join(__dirname, '../build/index.html'))

  // and load the index.html of the app.
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools()
  }
}

app.on('ready', createWindow)
