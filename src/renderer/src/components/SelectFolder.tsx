import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { Button } from '@renderer/components/ui/button'
import {
  selectRootDirectory,
  setFileList,
  setRootDirectory,
  setStep
} from '@renderer/slices/registerSlice'
import { toast } from 'sonner'
import { Field } from '@renderer/components/ui/field'

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
        {rootDirectory && `Selected: ${rootDirectory}`}
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            onClick={() => dispatch(setStep(2))}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl px-4 py-2"
          >
            Back
          </Button>
          <Button
            onClick={handleSelect}
            className="bg-green-600 text-white hover:bg-neutral-800 shadow rounded-xl px-4 py-2"
          >
            Select
          </Button>
          {rootDirectory && (
            <Button
              onClick={() => dispatch(setStep(4))}
              className="bg-black text-white hover:bg-neutral-800 shadow rounded-xl px-4 py-2"
            >
              Proceed
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  )
}

export default SelectFolder
