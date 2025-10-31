import { ipcMain, IpcMainInvokeEvent } from 'electron'

export const EVENTS = {
  DIALOG_OPEN_FOLDER: 'dialog:openFolder',
  SENT_FILES: 'send-files',
  GET_BACKEND_PORTS: 'get-backend-ports',
  GET_EXPRESS_PORT: 'get-express-port',
  START_DRAG: 'start-drag',
  GOTO_STEP: 'goto-step'
}

const ALLOWED_ORIGINS = ['http://localhost:5173/', 'http://localhost:5174/']

export type FileEntity = {
  label: string
  value: string
}

function validateSender(event: IpcMainInvokeEvent): void {
  const url = event.senderFrame?.url ?? ''
  const isAllowed = ALLOWED_ORIGINS.some((allowedUrl) => allowedUrl.startsWith(url))

  if (!isAllowed) throw new Error(`Blocked IPC call from unauthorized origin: ${url}`)
}

export function secureHandle<T = unknown>(
  channel: string,
  handler: (event: IpcMainInvokeEvent, ...args: T[]) => void
): void {
  ipcMain.handle(channel, (event, ...args) => {
    validateSender(event)
    return handler(event, ...args)
  })
}

export function secureOn<T = unknown>(
  channel: string,
  handler: (event: IpcMainInvokeEvent, ...args: T[]) => void
): void {
  ipcMain.on(channel, (event, ...args) => {
    validateSender(event)
    return handler(event, ...args)
  })
}
