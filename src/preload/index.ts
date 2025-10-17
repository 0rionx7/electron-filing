import { ApiType } from './index.d'
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { EVENTS } from '../main/utils'

const api: ApiType = {
  openFolder: () => ipcRenderer.invoke(EVENTS.DIALOG_OPEN_FOLDER),
  sendFiles: (files) => ipcRenderer.invoke(EVENTS.SENT_FILES, files),
  onReceivePortlist: (callback) => ipcRenderer.on(EVENTS.PORTS_READY, callback),
  getExpressUrl: () => ipcRenderer.invoke(EVENTS.GET_EXPRESS_URL)
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
