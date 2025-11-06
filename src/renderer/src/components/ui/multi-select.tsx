import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { Checkbox } from '@renderer/components/ui/checkbox'

export type MultiOption = { value: string; label: string; disabled?: boolean }

type MultiSelectProps = {
  value: string[]
  onChange: (next: string[]) => void
  options: MultiOption[]
  emptyText?: string
  className?: string
}

export function MultiSelect({
  value,
  onChange,
  options,
  emptyText = 'No results',
  className
}: MultiSelectProps) {
  const toggle = (v: string): void => {
    const set = new Set(value)
    set.has(v) ? set.delete(v) : set.add(v)
    onChange([...set])
  }

  const filter = (value: string, search: string) =>
    value.toLowerCase().startsWith(search.toLowerCase()) ? 1 : 0

  return (
    <Command filter={filter}>
      <CommandInput placeholder="Search…" />
      <CommandList className={className}>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {options.map((opt) => {
          const checked = value.includes(opt.value)
          return (
            <CommandItem key={opt.value} onMouseDown={() => toggle(opt.value)} className="gap-2">
              <Checkbox checked={checked} className="pointer-events-none" />
              <span>{opt.label}</span>
            </CommandItem>
          )
        })}
      </CommandList>
    </Command>
  )
}
