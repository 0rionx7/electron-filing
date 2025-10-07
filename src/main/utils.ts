import { promises as fs } from 'fs'
import { dialog } from 'electron'

type FileEntity = {
  label: string
  value: string
}
type FolderEntity = {
  level: number
  path: string
}

const DEPTH = 5

export async function handleFolderSelection(): Promise<{
  rootDirectory: string
  fileEntities: FileEntity[]
}> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  const rootDirectory = filePaths[0]
  const folderEntry = { level: 1, path: rootDirectory }
  const fileEntities: FileEntity[] = []

  await findFileEntities(folderEntry)

  async function findFileEntities(folderEntry: FolderEntity): Promise<void> {
    const folderEntries: FolderEntity[] = []
    const items = await fs.readdir(folderEntry.path, { withFileTypes: true })

    for (const item of items) {
      const path = `${item.parentPath}\\${item.name}`
      if (item.isFile()) fileEntities.push({ label: item.name, value: path })
      else if (folderEntry.level < DEPTH) folderEntries.push({ level: folderEntry.level + 1, path })
    }

    if (folderEntries.length) {
      for (const folderEntity of folderEntries) {
        await findFileEntities(folderEntity)
      }
    }
  }

  return { rootDirectory, fileEntities }
}
