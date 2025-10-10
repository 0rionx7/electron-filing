import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { events } from '../main/utils'

const api = {
  handShake: () => ipcRenderer.invoke(events.API_HANDSHAKE),
  openFolder: () => ipcRenderer.invoke(events.DIALOG_OPEN_FOLDER),
  sendFiles: (files) => ipcRenderer.invoke(events.SENT_FILES, files)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
