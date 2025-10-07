import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { Button } from '@renderer/components/ui/button'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { selectEntities, toggleEntity } from '@renderer/slice/slice'

export type MultiOption = { value: string; label: string; disabled?: boolean }

type MultiSelectProps = {
  name: 'entity1' | 'entity2'
  value: string[]
  onChange: (next: string[]) => void
  options: MultiOption[]
  placeholder?: string
  className?: string
  emptyText?: string
}

export function MultiSelect({
  name,
  value,
  onChange,
  options,
  placeholder = 'Select…',
  emptyText = 'No results',
  className
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const entities = useAppSelector(selectEntities)
  const dispatch = useAppDispatch()

  let selectedEntities: any[] = []

  for (const entityKey in entities) {
    if (entityKey !== name) selectedEntities = [...selectedEntities, ...entities[entityKey]]
  }

  const availableEntities = options.filter(({ value }) => {
    return !selectedEntities.includes(value)
  })

  const toggle = (v: string) => {
    const set = new Set(value)
    set.has(v) ? set.delete(v) : set.add(v)
    onChange([...set])
    dispatch(toggleEntity({ name, value: v }))
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }
  const selected = () => options.filter((o) => value.includes(o.value))

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
          {selected.length > 0 ? (
            <span>
              {selected.length} file{selected.length === 1 ? '' : 's'} selected
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
          {selected.length > 0 && (
            <span
              className="ml-2 size-4 opacity-60 hover:opacity-100 flex items-center justify-center"
              onClick={clear}
            >
              X
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {availableEntities.map((opt) => {
                const checked = value.includes(opt.value)
                return (
                  <CommandItem
                    key={opt.label + opt.value}
                    disabled={opt.disabled}
                    onSelect={() => toggle(opt.value)}
                    className="gap-2"
                  >
                    <Checkbox checked={checked} className="pointer-events-none" />
                    <span>{opt.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
