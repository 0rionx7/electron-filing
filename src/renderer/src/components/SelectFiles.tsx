import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { Button } from '@renderer/components/ui/button'

import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@renderer/components/ui/card'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import {
  selectEntity1,
  selectEntity2,
  selectFileList,
  selectRootDirectory,
  setStep
} from '@renderer/slices/registerSlice'
import FilteredMultiSelect from '@renderer/components/FilteredMultiSelect'
import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'

export type FilesSelection = {
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
        <form id="files-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
          <Controller
            name="entity1"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative mt-3">
                <FieldLabel htmlFor="files-form-entity1">List 1</FieldLabel>
                <FilteredMultiSelect
                  watch={form.watch}
                  name="entity1"
                  options={fileList}
                  field={field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="entity2"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative mt-3">
                <FieldLabel htmlFor="files-form-entity2">List 1</FieldLabel>
                <FilteredMultiSelect
                  watch={form.watch}
                  name="entity2"
                  options={fileList}
                  field={field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            onClick={() => {
              dispatch(setStep(3))
            }}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl px-4 py-2"
          >
            Back
          </Button>
          {(entity1.length > 0 || entity2.length > 0) && (
            <Button
              type="submit"
              form="files-form"
              className="bg-green-600 text-white hover:bg-neutral-800 shadow rounded-xl px-4 py-2"
            >
              Select
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  )
}
