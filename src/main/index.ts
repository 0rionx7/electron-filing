import { join } from 'path'
import { app, shell, BrowserWindow, session, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import { registerHandlers } from './ipcHandlers'
import { startExpress } from './expressApp'
import { EVENTS } from './utils'

const REDUX_DEV_TOOLS_PATH =
  'C:\\Users\\orionx7\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\3.2.10_0'

let expressPort: number

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 900,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: 'Choose Step',
      submenu: [
        {
          click: () => mainWindow.webContents.send('goto-step', 1),
          label: 'AccountDetails'
        },
        {
          click: () => mainWindow.webContents.send('goto-step', 2),
          label: 'PersonalInfo'
        },
        {
          click: () => mainWindow.webContents.send('goto-step', 3),
          label: 'ChooseFolder'
        },
        {
          click: () => mainWindow.webContents.send('goto-step', 4),
          label: 'ChooseFiles'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
        { role: 'togglefullscreen' }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    setTimeout(() => {
      mainWindow.webContents.send(EVENTS.GET_EXPRESS_PORT, expressPort)
      mainWindow.webContents.send(EVENTS.GET_BACKEND_PORTS, [1, 2, 3])
    }, 2000)
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
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  expressPort = startExpress()
  registerHandlers()

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = [
      "default-src 'self'",
      `connect-src 'self' http://localhost:${expressPort}`,
      "img-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'sha256-Z2/iFzh9VMlVkEOar1f/oSHWwQk3ve1qk/C2WdsC4Xk='"
    ].join('; ')

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp]
      }
    })
  })

  await session.defaultSession.extensions.loadExtension(REDUX_DEV_TOOLS_PATH, {
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
