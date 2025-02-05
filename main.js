const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const window = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        // eslint-disable-next-line no-undef
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    window.loadFile('index.html')
}

const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click () { console.log('New Window') }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    { label: 'New Command...' }
])

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
  
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
  

app.whenReady().then(() => {
    // eslint-disable-next-line no-undef
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu)
      }
    createWindow()
    
    //On Mac, when all windows are closed it doesn't mean the app is closed
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//On Windows and Linux, apps close when all the windows are closed
app.on('window-all-closed', () => {
    // eslint-disable-next-line no-undef
    if (process.platform !== 'darwin') app.quit()
  })