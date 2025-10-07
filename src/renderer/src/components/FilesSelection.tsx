import { createContext, useState } from 'react'

type FilesCtx = {
  fileEntities: FileEntity[]
  setFileEndities: (v: FileEntity[]) => void
}
export const FilesContext = createContext<FilesCtx>({ fileEntities: [], setFileEndities: () => {} })

export function FileSelection({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [fileEntities, setFileEndities] = useState<FileEntity[]>([])

  return (
    <FilesContext value={{ fileEntities, setFileEndities }}>
      <div className="space-y-2">{children}</div>
    </FilesContext>
  )
}
