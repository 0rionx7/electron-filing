import { ipcMain, app, nativeImage } from 'electron'
import path from 'path'
import fs from 'fs'

import { EVENTS, handleFolderSelection } from './utils'

const iconPath = path.join(app.getAppPath(), 'resources', 'drag-and-drop.png')
const base64 = fs.readFileSync(iconPath, { encoding: 'base64' })
const icon = nativeImage.createFromDataURL(`data:image/png;base64,${base64}`)

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
