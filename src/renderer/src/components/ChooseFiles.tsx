import { use } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { MultiSelect, type MultiOption } from '@renderer/components/ui/multi-select'
import { Button } from '@renderer/components/ui/button'

import { FilesContext } from '@renderer/components/FilesSelection'
import AppCard from '@renderer/components/AppCard'

type Form = {
  fileList: string[]
}

export function ChooseFiles(): React.JSX.Element | null {
  const { fileEntities, setFileEndities } = use(FilesContext)
  const { handleSubmit, control } = useForm<Form>({ defaultValues: { fileList: [] } })

  if (!fileEntities.length) return null

  const options: MultiOption[] = fileEntities.map((f) => ({
    label: f.fileName,
    value: f.path
  }))

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data)
    setFileEndities([])
    window.api.choosenFiles(data.fileList)
  }

  const handleBackClick = (): void => {
    setFileEndities([])
  }

  return (
    <AppCard title="Select your files" description="">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <Controller
          name="fileList"
          control={control}
          render={({ field }) => (
            <MultiSelect
              value={field.value}
              onChange={field.onChange}
              options={options}
              placeholder="Choose files"
            />
          )}
        />
        <Button type="button" onClick={handleBackClick} className="mr-4">
          Back
        </Button>
        <Button type="submit">Select</Button>
      </form>
    </AppCard>
  )
}
