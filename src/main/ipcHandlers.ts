import { ipcMain } from 'electron'

import { events, handleFolderSelection } from './utils'

export function registerHandlers(baseUrl: string): void {
  ipcMain.handle(events.API_HANDSHAKE, async () => {
    const res = await fetch(baseUrl)
    return res.json()
  })

  ipcMain.handle(events.DIALOG_OPEN_FOLDER, async () => {
    const fileEntities = await handleFolderSelection()
    return fileEntities
  })

  ipcMain.handle(events.SENT_FILES, (_event, files) => {
    console.log(files)
  })
}
