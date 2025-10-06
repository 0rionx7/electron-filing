/// <reference types="vite/client" />

import { FileEntity } from '@renderer/components/FilesSelection'

export {}

declare global {
  interface Window {
    api: {
      openFolder: () => Promise<FileEntity[]>
      // add any other methods you expose from preload
    }
  }
}
