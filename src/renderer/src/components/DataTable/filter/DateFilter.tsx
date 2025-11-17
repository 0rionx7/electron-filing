import { useState } from 'react'
import { Column } from '@tanstack/react-table'

import { Command, CommandGroup, CommandList } from '@renderer/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Case } from '@renderer/components/DataTable/makeData'
import { Input } from '@renderer/components/ui/input'
import { cn } from '@renderer/lib/utils'

const DateFilter = ({ column }: { column: Column<Case, unknown> }): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  const columnFilterValue = column.getFilterValue() as string[]
  const isFiltered = columnFilterValue?.some(Boolean)

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
        <Command>
          <CommandList>
            <CommandGroup>
              <Input
                type="date"
                value={columnFilterValue?.[0] ?? ''}
                onChange={(e) =>
                  column.setFilterValue((old: [string, string]) => [e.target.value, old?.[1]])
                }
                className="h-6 rounded"
              />
              <Input
                type="date"
                value={columnFilterValue?.[1] ?? ''}
                onChange={(e) => {
                  column.setFilterValue((old: [string, string]) => [old?.[0], e.target.value])
                  setOpen(false)
                }}
                className="h-6 rounded"
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DateFilter
