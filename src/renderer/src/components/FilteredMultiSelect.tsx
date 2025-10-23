import { useEffect } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { FilesSelection } from '@renderer/components/SelectFiles'
import { MultiOption, MultiSelect } from '@renderer/components/ui/multi-select'
import { selectEntities, setEntity } from '@renderer/slices/registerSlice'

type FilteredMultiselectType = {
  name: 'entity1' | 'entity2'
  options: MultiOption[]
  field: ControllerRenderProps<FilesSelection, 'entity1' | 'entity2'>
  watch: ReturnType<typeof useForm<FilesSelection>>['watch']
}

const FilteredMultiSelect = ({
  name,
  options,
  field,
  watch
}: FilteredMultiselectType): React.JSX.Element => {
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

  return <MultiSelect {...field} options={availableEntities} placeholder="Choose files" />
}

export default FilteredMultiSelect
