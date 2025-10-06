import { use } from 'react'

import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { FilesContext } from '@renderer/components/FilesSelection'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@renderer/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'

type Form = {
  fileList: string
}

export function ChooseFiles(): React.JSX.Element | null {
  const { fileEntities } = use(FilesContext)

  const { handleSubmit, control } = useForm<Form>({
    defaultValues: { fileList: '' }
  })

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data)
  }

  if (!fileEntities.length) return null

  return (
    <Card className="bg-stone-400 space-y-2.5 w-xl shadow-black shadow-md">
      <CardHeader>
        <CardTitle>Please select your files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="file-list">File List</FieldLabel>
              <Controller
                name="fileList"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="file-list">
                      <SelectValue placeholder="Choose a file" />
                    </SelectTrigger>
                    <SelectContent>
                      {fileEntities.map(({ fileName, path }) => (
                        <SelectItem key={fileName + path} value={fileName}>
                          {fileName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </FieldGroup>
          <Button type="submit">Select</Button>
        </form>
      </CardContent>
    </Card>
  )
}
