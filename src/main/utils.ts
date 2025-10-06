import { promises as fs } from 'fs'
import { dialog } from 'electron'
import path from 'path'

type FileEntity = {
  fileName: string
  path: string
}
type FolderEntity = {
  level: number
  path: string
}

const DEPTH = 5

export async function handleFolderSelection(): Promise<FileEntity[]> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  const folderEntry = { level: 1, path: filePaths[0] }
  const fileEntities: FileEntity[] = []

  await findFileEntities(folderEntry)

  async function findFileEntities(folderEntry: FolderEntity): Promise<void> {
    const folderEntries: FolderEntity[] = []
    const result = await fs.readdir(folderEntry.path, { withFileTypes: true })
    const entities = result.map((result) => {
      const fullPath = path.join(result.parentPath, result.name)
      return {
        fileName: result.name,
        path: fullPath,
        isFile: result.isFile(),
        isDirectory: result.isDirectory()
      }
    })

    for (const entity of entities) {
      const { fileName, path } = entity
      if (entity.isFile) fileEntities.push({ fileName, path })
      else if (folderEntry.level < DEPTH) folderEntries.push({ level: folderEntry.level + 1, path })
    }

    if (folderEntries.length) {
      for (const folderEntity of folderEntries) {
        await findFileEntities(folderEntity)
      }
    }
  }

  return fileEntities
}
