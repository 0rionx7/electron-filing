import path from 'path'
import fs from 'fs'
import { ipcMain, app, nativeImage } from 'electron'

import { EVENTS, handleFolderSelection } from './utils'

const ICON_PATH = path.join(app.getAppPath(), 'resources', 'drag-and-drop.png')
const base64Icon = fs.readFileSync(ICON_PATH, { encoding: 'base64' })
const icon = nativeImage.createFromDataURL(`data:image/png;base64,${base64Icon}`)

export function registerHandlers(): void {
  ipcMain.handle(EVENTS.DIALOG_OPEN_FOLDER, async () => {
    const fileEntities = await handleFolderSelection()
    return fileEntities
  })

  ipcMain.handle(EVENTS.SENT_FILES, (_event, files) => {
    console.log(files)
  })

  ipcMain.on(EVENTS.START_DRAG, (event, file) => {
    event.sender.startDrag({ file, icon })
  })
}
