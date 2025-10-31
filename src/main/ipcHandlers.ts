import path from 'path'
import fs, { promises as pfs } from 'fs'
import { app, nativeImage, dialog } from 'electron'

import { EVENTS, FileEntity, secureHandle, secureOn } from './utils'

const ICON_PATH = path.join(app.getAppPath(), 'resources', 'drag-and-drop.png')
const base64Icon = fs.readFileSync(ICON_PATH, { encoding: 'base64' })
const icon = nativeImage.createFromDataURL(`data:image/png;base64,${base64Icon}`)

export function registerHandlers(): void {
  secureHandle(EVENTS.DIALOG_OPEN_FOLDER, async () => {
    const fileEntities = await handleFolderSelection()
    return fileEntities
  })
  secureHandle(EVENTS.SENT_FILES, (_event, files) => {
    console.log(files)
  })
  secureOn<string>(EVENTS.START_DRAG, (event, file) => {
    event.sender.startDrag({ file, icon })
  })
}

async function handleFolderSelection(): Promise<{
  rootDirectory: string
  fileEntities: FileEntity[]
}> {
  const DEPTH = 5
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  const rootPath = filePaths[0]
  const fileEntities: FileEntity[] = []

  await findFileEntities(1, rootPath)

  async function findFileEntities(level: number, folderPath: string): Promise<void> {
    const items = await pfs.readdir(folderPath, { withFileTypes: true })

    for (const item of items) {
      const filePath = path.join(item.parentPath, item.name)
      if (item.isFile()) fileEntities.push({ label: item.name, value: filePath })
      else if (level < DEPTH) await findFileEntities(level + 1, filePath)
    }
  }

  return { rootDirectory: rootPath, fileEntities }
}
