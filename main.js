const { app, BrowserWindow } = require('electron')

const { autoUpdater } = require("electron-updater")

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
  createWindow();
})

let window;

function createWindow () {
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      //'web-security': false,
    }
  })

  window.loadFile('index.html')

  window.on('closed', () => {
    window = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})