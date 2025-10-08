import { promises as fs } from 'fs'
import { dialog } from 'electron'

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
      const path = `${item.parentPath}\\${item.name}`
      if (item.isFile()) fileEntities.push({ label: item.name, value: path })
      else if (level < DEPTH) await findFileEntities(level + 1, path)
    }
  }

  return { rootDirectory: rootPath, fileEntities }
}
