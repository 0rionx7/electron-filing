import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { Checkbox } from '@renderer/components/ui/checkbox'

export type MultiOption = { value: string; label: string }

type GeoMultiselectProps = {
  value: string[]
  onChange: (next: string[]) => void
  options: MultiOption[]
  level: number
}

export function GeoMultiselect({
  value,
  onChange,
  options
}: GeoMultiselectProps): React.JSX.Element {
  const toggle = (v: string): void => {
    const set = new Set(value)
    set.has(v) ? set.delete(v) : set.add(v)
    onChange([...set])
  }

  return (
    <Command
      filter={(value, search) => (value.toLowerCase().startsWith(search.toLowerCase()) ? 1 : 0)}
    >
      <CommandInput placeholder="Search…" />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList className="p-2 max-h-full">
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
