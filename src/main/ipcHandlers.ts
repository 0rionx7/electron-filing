import { ipcMain } from 'electron'

import { EVENTS, handleFolderSelection } from './utils'

export function registerHandlers(baseUrl: string): void {
  ipcMain.handle(EVENTS.API_HANDSHAKE, async () => {
    const res = await fetch(baseUrl)
    return res.json()
  })

  ipcMain.handle(EVENTS.DIALOG_OPEN_FOLDER, async () => {
    const fileEntities = await handleFolderSelection()
    return fileEntities
  })

  ipcMain.handle(EVENTS.SENT_FILES, (_event, files) => {
    console.log(files)
  })
}
