import { useForm, type SubmitHandler } from 'react-hook-form'

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'

type FilesSelection = {
  entity1: string[]
  entity2: string[]
}

export function SelectFiles(): React.JSX.Element | null {
  const fileList = useAppSelector(selectFileList)
  const entity1 = useAppSelector(selectEntity1)
  const entity2 = useAppSelector(selectEntity2)
  const rootDirectory = useAppSelector(selectRootDirectory)
  const dispatch = useAppDispatch()
  const form = useForm<FilesSelection>({ defaultValues: { entity1, entity2 } })

  const options: MultiOption[] = fileList

  const onSubmit: SubmitHandler<FilesSelection> = async () => {
    const ent1 = entity1.map((e) => ({ label: e.split('\\').pop(), value: e }))
    const ent2 = entity2.map((e) => ({ label: e.split('\\').pop(), value: e }))
    const fileMapping = { rootDirectory, entity1: ent1, entity2: ent2 }
    await window.api.sendFiles(fileMapping)
    dispatch(setStep(5))
  }

  return (
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600">Select your files</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
            <FormField
              control={form.control}
              name="entity1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List 1</FormLabel>
                  <FormControl>
                    <MultiSelect
                      name="entity1"
                      value={field.value}
                      onChange={field.onChange}
                      options={options}
                      placeholder="Choose files"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entity2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List 2</FormLabel>
                  <FormControl>
                    <MultiSelect
                      name="entity2"
                      value={field.value}
                      onChange={field.onChange}
                      options={options}
                      placeholder="Choose files"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={() => {
                dispatch(setStep(3))
              }}
              className="mr-4 mb-0"
            >
              Back
            </Button>
            {(entity1.length > 0 || entity2.length > 0) && <Button type="submit">Select</Button>}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
