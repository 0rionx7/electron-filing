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
import { X } from 'lucide-react'
import { cn } from '@renderer/lib/utils'
import { useMemo, useState } from 'react'

export type MultiOption = { value: string; label: string; disabled?: boolean }

type MultiSelectProps = {
  value: string[]
  onChange: (next: string[]) => void
  options: MultiOption[]
  placeholder?: string
  className?: string
  emptyText?: string
}

export function MultiSelect({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  emptyText = 'No results',
  className
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const selected = useMemo(() => options.filter((o) => value.includes(o.value)), [options, value])

  const toggle = (v: string) => {
    const set = new Set(value)
    set.has(v) ? set.delete(v) : set.add(v)
    onChange([...set])
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

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
            <span onClick={clear}>
              <X
                className="ml-2 size-4 opacity-60 hover:opacity-100 cursor-pointer"
                onClick={clear}
              />
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
              {options.map((opt) => {
                const checked = value.includes(opt.value)
                return (
                  <CommandItem
                    key={opt.value}
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
