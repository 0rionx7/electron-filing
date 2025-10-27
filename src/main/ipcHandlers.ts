import path from 'path'
import fs from 'fs'
import { app, nativeImage } from 'electron'

import { EVENTS, handleFolderSelection, secureHandle, secureOn } from './utils'

const ICON_PATH = path.join(app.getAppPath(), 'resources', 'drag-and-drop.png')
const base64Icon = fs.readFileSync(ICON_PATH, { encoding: 'base64' })
const icon = nativeImage.createFromDataURL(`data:image/png;base64,${base64Icon}`)

export function registerHandlers(): void {
  secureHandle(EVENTS.DIALOG_OPEN_FOLDER, async () => {
    const fileEntities = await handleFolderSelection()
    return fileEntities
  })
  secureHandle(EVENTS.SENT_FILES, (_event, files) => {
    console.log(files)
  })
  secureOn<string>(EVENTS.START_DRAG, (event, file) => {
    event.sender.startDrag({ file, icon })
  })
}
