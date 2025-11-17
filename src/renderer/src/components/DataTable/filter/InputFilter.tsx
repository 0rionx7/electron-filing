import { useState } from 'react'
import { Column } from '@tanstack/react-table'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { Case } from '@renderer/components/DataTable/makeData'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { cn } from '@renderer/lib/utils'

const InputFilter = ({ column }: { column: Column<Case, unknown> }): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<string[]>([])

  const isFiltered = (column.getFilterValue() as string[])?.length

  const sortedUniqueValues = Array.from(column.getFacetedUniqueValues()).sort((a, b) => {
    return a[0] <= b[0] ? -1 : 1
  })

  const startsWithFilter = (value: string, search: string): 1 | 0 => {
    return value.toLowerCase().startsWith(String(search).toLowerCase()) ? 1 : 0
  }

  const handleCheckEntry = (checked: boolean | string, value: string): void => {
    const filterSet = new Set(filter)
    checked ? filterSet.add(value) : filterSet.delete(value)
    setFilter([...filterSet])
    column.setFilterValue([...filterSet])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('px-2 rounded-full', isFiltered && 'bg-lime-500')}>
          <span className="material-symbols-outlined text-black text-caption-sm!">
            filter_list_alt
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command filter={startsWithFilter}>
          <CommandInput placeholder={`Search ${column.id}...`} />
          <CommandList>
            <CommandEmpty>No entry found.</CommandEmpty>
            <CommandGroup>
              {sortedUniqueValues.map(([value, count]) => (
                <CommandItem key={value} className="flex items-center gap-2">
                  <Checkbox
                    checked={filter.includes(value)}
                    onCheckedChange={(checked) => handleCheckEntry(checked, value)}
                  />
                  {`${value} (${count} entr${count > 1 ? 'ies' : 'y'})`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default InputFilter
