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
      handShake: () => Promise<never>
      onReceivePortlist: (
        callback: (event: Electron.IpcRendererEvent, list: string[]) => void
      ) => void
    }
  }
}
