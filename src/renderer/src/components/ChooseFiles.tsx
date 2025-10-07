import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { MultiSelect, type MultiOption } from '@renderer/components/ui/multi-select'
import { Button } from '@renderer/components/ui/button'

import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import {
  selectEntity1,
  selectEntity2,
  selectFileList,
  selectRootDirectory,
  setStep
} from '@renderer/slice/slice'

type FilesSelection = {
  entity1: string[]
  entity2: string[]
}

export function ChooseFiles(): React.JSX.Element | null {
  const fileList = useAppSelector(selectFileList)
  const entity1 = useAppSelector(selectEntity1)
  const entity2 = useAppSelector(selectEntity2)
  const rootDirectory = useAppSelector(selectRootDirectory)
  const dispatch = useAppDispatch()
  const { handleSubmit, control } = useForm<FilesSelection>({ defaultValues: { entity1, entity2 } })

  const options: MultiOption[] = fileList

  const onSubmit: SubmitHandler<FilesSelection> = (data) => {
    const ent1 = entity1.map((e) => ({ label: e.split('\\').pop(), value: e }))
    const ent2 = entity2.map((e) => ({ label: e.split('\\').pop(), value: e }))
    const fileMapping = { rootDirectory, entity1: ent1, entity2: ent2 }
    console.log(fileMapping)
  }

  return (
    <Card className="w-full bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600">Select your files</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          <Controller
            name="entity1"
            control={control}
            render={({ field }) => (
              <MultiSelect
                name="entity1"
                value={field.value}
                onChange={field.onChange}
                options={options}
                placeholder="Choose files"
              />
            )}
          />
          <Controller
            name="entity2"
            control={control}
            render={({ field }) => (
              <MultiSelect
                name="entity2"
                value={field.value}
                onChange={field.onChange}
                options={options}
                placeholder="Choose files"
              />
            )}
          />
          <Button
            type="button"
            onClick={() => {
              dispatch(setStep(3))
            }}
            className="mr-4"
          >
            Back
          </Button>
          <Button type="submit">Select</Button>
        </form>
      </CardContent>
    </Card>
  )
}
