const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    icon: __dirname + "./src/img/Book-icon.png",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })


  win.loadFile('src/index.html')

  ipc.on('closeApp', () => {
      console.log('clicked ')
      win.close()
  })

  ipc.on('minimizeApp', () => {
    console.log('minimized ')
    win.minimize()
})

    ipc.on('maximizeApp', () => {
        if(win.isMaximized()){
            console.log('restored')
            win.restore()
        } else{
            console.log('maximized')
            win.maximize()
        }
    })

    win.on('maximize', () => {
        win.webContents.send('isMaximized')
    })

    win.on('unmaximize', () => {
        win.webContents.send('isRestored')
    })
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})