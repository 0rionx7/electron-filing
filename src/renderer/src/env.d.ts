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
      gotoStep: (callback: (step: number) => void) => () => Electron.IpcRenderer
      startDrag: (file: string) => void
    }
  }
}

declare module '@tanstack/react-table' {
  interface FilterFns {
    [key: string]: FilterFn<unknown>
    startsWith?: FilterFn<unknown>
    dateRange?: FilterFn<unknown>
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'date'
  }
}
