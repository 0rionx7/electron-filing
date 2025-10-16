import { app, shell, BrowserWindow, session } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { startExpress } from './expressApp'
import { registerHandlers } from './ipcHandlers'
import { EVENTS } from './utils'

const reduxDevToolsPath =
  'C:\\Users\\orionx7\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\3.2.10_0'
const reactDevToolsPath =
  'C:\\Users\\orionx7\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\7.0.0_0'

function createWindow(): void {
  const baseUrl = startExpress()

  registerHandlers(baseUrl)

  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.openDevTools()

  setTimeout(() => {
    mainWindow.webContents.send(EVENTS.PORTS_READY, [1, 2, 3])
  }, 7000)
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  await session.defaultSession.extensions.loadExtension(reduxDevToolsPath, {
    allowFileAccess: true
  })
  await session.defaultSession.extensions.loadExtension(reactDevToolsPath, {
    allowFileAccess: true
  })

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
