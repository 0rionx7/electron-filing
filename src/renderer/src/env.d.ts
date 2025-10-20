/// <reference types="vite/client" />

import { FileEntity } from '@renderer/slices/registerSlice'

declare global {
  interface Window {
    api: {
      openFolder: () => Promise<{
        rootDirectory: string
        fileEntities: FileEntity[]
      }>
      sendFiles: (data) => Promise<never>
      onReceivePortlist: (callback: (list: number[]) => void) => () => Electron.IpcRenderer
      onReceiveExpressPort: (callback: (port: number) => void) => () => Electron.IpcRenderer
    }
  }
}
