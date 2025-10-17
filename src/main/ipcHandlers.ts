import { ipcMain } from 'electron'

import { EVENTS, handleFolderSelection } from './utils'

export function registerHandlers(expressUrl: string): void {
  ipcMain.handle(EVENTS.GET_EXPRESS_URL, () => expressUrl)

  ipcMain.handle(EVENTS.DIALOG_OPEN_FOLDER, async () => {
    const fileEntities = await handleFolderSelection()
    return fileEntities
  })

  ipcMain.handle(EVENTS.SENT_FILES, (_event, files) => {
    console.log(files)
  })
}
