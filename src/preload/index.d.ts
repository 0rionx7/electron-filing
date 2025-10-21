import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiType
  }
}

export type ApiType = {
  openFolder: () => Promise<{
    rootDirectory: string
    fileEntities: FileEntity[]
  }>
  sendFiles: (data: string[]) => Promise<unknown>
  onReceivePortlist: (callback: (list: number[]) => void) => () => Electron.IpcRenderer
  onReceiveExpressPort: (callback: (port: number) => void) => () => Electron.IpcRenderer
  startDrag: (file: string) => void
}
