import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  selectRootDirectory,
  setFileList,
  setRootDirectory,
  setStep
} from '@renderer/slices/registerSlice'
import { toast } from 'sonner'

const SelectFolder = (): React.JSX.Element | null => {
  const rootDirectory = useAppSelector(selectRootDirectory)
  const dispatch = useAppDispatch()

  const handleSelect = async (): Promise<void> => {
    try {
      const response = await window.api.openFolder()
      dispatch(setRootDirectory(response.rootDirectory))
      dispatch(setFileList(response.fileEntities))
      dispatch(setStep(4))
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
    <Card className="w-lg bg-stone-300">
      <CardHeader>
        <CardTitle>Please select a folder</CardTitle>
      </CardHeader>
      <CardContent className="space-x-1">
        <Button onClick={handleSelect}>Select</Button>
        <Button onClick={() => dispatch(setStep(2))}>Back</Button>
        {rootDirectory && <Button onClick={() => dispatch(setStep(4))}>Proceed</Button>}
      </CardContent>
      <CardFooter>{rootDirectory && `Selected: ${rootDirectory}`}</CardFooter>
    </Card>
  )
}

export default SelectFolder
