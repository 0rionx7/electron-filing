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
  handShake: () => Promise<unknown>
  onReceivePortlist: (callback: (event: Electron.IpcRendererEvent, list: string[]) => void) => void
}
