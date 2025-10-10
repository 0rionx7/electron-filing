import { useEffect } from 'react'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { FilesSelection } from '@renderer/components/SelectFiles'
import { MultiOption, MultiSelect } from '@renderer/components/ui/multi-select'
import { selectEntities, setEntities } from '@renderer/slice/slice'

type FilteredMultiselectType = {
  name: string
  options: MultiOption[]
  field: ControllerRenderProps<FilesSelection, 'entity1' | 'entity2'>
}

const FilteredMultiSelect = ({
  name,
  options,
  field
}: FilteredMultiselectType): React.JSX.Element => {
  const entities = useAppSelector(selectEntities)
  const { watch } = useFormContext<FilesSelection>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(
        setEntities({
          entity1: (data.entity1 ?? []).filter((x): x is string => x !== undefined),
          entity2: (data.entity2 ?? []).filter((x): x is string => x !== undefined)
        })
      )
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, dispatch])

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
