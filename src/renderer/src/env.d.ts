/// <reference types="vite/client" />

import { FileEntity } from '@renderer/slice/slice'

declare global {
  interface Window {
    api: {
      openFolder: () => Promise<{
        rootDirectory: string
        fileEntities: FileEntity[]
      }>
      sendFiles: (data) => Promise<never>
      handShake: () => Promise<never>
      // add any other methods you expose from preload
    }
  }
}
