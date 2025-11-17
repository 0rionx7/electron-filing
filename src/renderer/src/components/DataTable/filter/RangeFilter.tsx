import { useCallback, useState } from 'react'
import { Column } from '@tanstack/react-table'

import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Command, CommandGroup, CommandList } from '@renderer/components/ui/command'
import DebouncedInput from '@renderer/components/DataTable/filter/DebouncedInput'
import { Case } from '@renderer/components/DataTable/makeData'
import { cn } from '@renderer/lib/utils'

const RangeFilter = ({ column }: { column: Column<Case, unknown> }): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  const columnFilterValue = column.getFilterValue() as [number, number]

  const handleMinRangeChange = useCallback(
    (value: number | string): void =>
      column.setFilterValue((old: [number, number]) => [value, old?.[1]]),
    [column]
  )

  const handleMaxRangeChange = useCallback(
    (value: number | string): void =>
      column.setFilterValue((old: [number, number]) => [old?.[0], value]),
    [column]
  )

  const isFiltered = columnFilterValue?.some(Boolean)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('px-2 rounded-full pr-2', isFiltered && 'bg-lime-500')}>
          <span className="material-symbols-outlined text-black text-caption-sm!">
            filter_list_alt
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-24 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <DebouncedInput
                type="number"
                min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                onChange={handleMinRangeChange}
                placeholder={
                  column.getFacetedMinMaxValues()?.[0] !== undefined
                    ? `(${column.getFacetedMinMaxValues()?.[0]})`
                    : ''
                }
                className="h-6 rounded"
              />
              <DebouncedInput
                type="number"
                min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                value={(columnFilterValue as [number, number])?.[1] ?? ''}
                onChange={handleMaxRangeChange}
                placeholder={
                  column.getFacetedMinMaxValues()?.[1]
                    ? `(${column.getFacetedMinMaxValues()?.[1]})`
                    : ''
                }
                className="h-6 rounded"
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default RangeFilter
