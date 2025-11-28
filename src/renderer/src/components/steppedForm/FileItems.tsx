import { useEffect, useMemo, useState } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { X } from 'lucide-react'

import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { FilesSelection } from '@renderer/components/steppedForm/SelectFiles'
import { MultiOption, MultiSelect } from '@renderer/components/ui/multi-select'
import { selectEntities, setEntity } from '@renderer/slices/registerSlice'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'

type FileItemsProps = {
  name: 'entity1' | 'entity2'
  options: MultiOption[]
  field: ControllerRenderProps<FilesSelection, 'entity1' | 'entity2'>
  watch: ReturnType<typeof useForm<FilesSelection>>['watch']
  placeholder?: string
  className?: string
}

const FileItems = ({
  name,
  options,
  field,
  watch,
  placeholder = 'Select…',
  className
}: FileItemsProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const entities = useAppSelector(selectEntities)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const subscription = watch((data) => {
      const values = (data[name] ?? []).filter((x): x is string => x !== undefined)
      dispatch(setEntity({ key: name, values }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, name, dispatch])

  let selectedEntities: string[] = []

  for (const entityKey in entities) {
    if (entityKey !== name) selectedEntities = [...selectedEntities, ...entities[entityKey]]
  }

  const availableEntities = options.filter(({ value }) => {
    return !selectedEntities.includes(value)
  })

  const selected = useMemo(
    () => options.filter((o) => field.value.includes(o.value)),
    [options, field.value]
  )

  const clear = (e: React.MouseEvent): void => {
    e.stopPropagation()
    field.onChange([])
  }

  const placeHolder = (
    <>
      {selected.length > 0 && (
        <>
          <span>
            {selected.length} file{selected.length === 1 ? '' : 's'} selected
          </span>
          <span onClick={clear}>
            <X
              className="ml-2 size-4 opacity-60 hover:opacity-100 cursor-pointer"
              onClick={clear}
            />
          </span>
        </>
      )}
      {selected.length === 0 && <span>{placeholder}</span>}
    </>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className={cn(
            'w-full justify-between align-top',
            className,
            selected.length === 0 && 'text-muted-foreground'
          )}
        >
          {placeHolder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <MultiSelect {...field} options={availableEntities} />
      </PopoverContent>
    </Popover>
  )
}

export default FileItems
