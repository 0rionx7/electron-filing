import { promises as fs } from 'fs'
import path from 'path'
import { dialog } from 'electron'

export const EVENTS = {
  DIALOG_OPEN_FOLDER: 'dialog:openFolder',
  SENT_FILES: 'send-files',
  GET_BACKEND_PORTS: 'get-backend-ports',
  GET_EXPRESS_PORT: 'get-express-port',
  START_DRAG: 'start-drag',
  GOTO_STEP: 'goto-step'
}

type FileEntity = {
  label: string
  value: string
}
const DEPTH = 5

export async function handleFolderSelection(): Promise<{
  rootDirectory: string
  fileEntities: FileEntity[]
}> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  const rootPath = filePaths[0]
  const fileEntities: FileEntity[] = []

  await findFileEntities(1, rootPath)

  async function findFileEntities(level: number, folderPath: string): Promise<void> {
    const items = await fs.readdir(folderPath, { withFileTypes: true })

    for (const item of items) {
      const filePath = path.join(item.parentPath, item.name)
      if (item.isFile()) fileEntities.push({ label: item.name, value: filePath })
      else if (level < DEPTH) await findFileEntities(level + 1, filePath)
    }
  }

  return { rootDirectory: rootPath, fileEntities }
}
