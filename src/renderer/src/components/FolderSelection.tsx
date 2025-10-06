import { Button } from '@renderer/components/ui/button'
import { Toaster } from '@renderer/components/ui/sonner'

import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { FilesContext } from '@renderer/components/FilesSelection'
import { use } from 'react'

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
    <Card className="bg-stone-400 space-y-2.5 w-xl shadow-black shadow-md">
      <CardHeader>
        <CardTitle>Folder selection utility</CardTitle>
        <CardDescription>Please select a folder.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <Button className="button" onClick={handleSelect}>
          Select
        </Button>
        <Toaster />
      </CardContent>
    </Card>
  )
}

export default FolderSelection
