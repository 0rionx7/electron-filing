import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { MultiSelect, type MultiOption } from '@renderer/components/ui/multi-select'
import { Button } from '@renderer/components/ui/button'

import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { selectFileList, setStep } from '@renderer/slice/slice'

type Form = {
  entity1: string[]
  entity2: string[]
}

export function ChooseFiles(): React.JSX.Element | null {
  const { handleSubmit, control } = useForm<Form>({ defaultValues: { entity1: [], entity2: [] } })
  const fileList = useAppSelector(selectFileList)
  const dispatch = useAppDispatch()

  const options: MultiOption[] = fileList

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(fileList)
    console.log(data)
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
