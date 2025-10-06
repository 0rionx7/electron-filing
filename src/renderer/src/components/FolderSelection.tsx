import { use } from 'react'

import { toast } from 'sonner'
import { Button } from '@renderer/components/ui/button'
import { Toaster } from '@renderer/components/ui/sonner'

import { FilesContext } from '@renderer/components/FilesSelection'
import AppCard from '@renderer/components/AppCard'

const FolderSelection = (): React.JSX.Element | null => {
  const { fileEntities, setFileEndities } = use(FilesContext)

  if (fileEntities.length) return null

  const handleSelect = async (): Promise<void> => {
    try {
      const fileEntities = await window.api.openFolder()
      console.log(fileEntities)
      setFileEndities(fileEntities)
    } catch {
      toast('Folder selection failed.Please try again.', {
        action: {
          label: 'Ok',
          onClick: () => console.log('Undo')
        }
      })
    }
  }
  return (
    <AppCard title="Folder selection utility" description="Please select a folder">
      <Button className="button" onClick={handleSelect}>
        Select
      </Button>
      <Toaster />
    </AppCard>
  )
}

export default FolderSelection
