import { EVENTS } from './../main/utils'
import { ApiType } from './index.d'
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api: ApiType = {
  openFolder: () => ipcRenderer.invoke(EVENTS.DIALOG_OPEN_FOLDER),
  sendFiles: (files) => ipcRenderer.invoke(EVENTS.SENT_FILES, files),
  onReceivePortlist: (callback) => {
    const handler = (_event: Electron.IpcRendererEvent, list: number[]): void => callback(list)

    ipcRenderer.on(EVENTS.GET_BACKEND_PORTS, handler)
    return () => ipcRenderer.off(EVENTS.GET_BACKEND_PORTS, handler)
  },
  onReceiveExpressPort: (callback) => {
    const handler = (_event: Electron.IpcRendererEvent, port: number): void => callback(port)

    ipcRenderer.on(EVENTS.GET_EXPRESS_PORT, handler)
    return () => ipcRenderer.off(EVENTS.GET_EXPRESS_PORT, handler)
  },
  startDrag: (file) => ipcRenderer.send(EVENTS.START_DRAG, file)
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
