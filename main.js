const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    window.loadFile('index.html')
  }

app.whenReady().then(() => {
    createWindow()
    
    //On Mac, when all windows are closed it doesn't mean the app is closed
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//On Windows and Linux, apps close when all the windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })