import { Case } from '@renderer/components/DataTable/makeData'
import { Input } from '@renderer/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Column } from '@tanstack/react-table'
import { useCallback, useEffect, useState } from 'react'

export default function FilterColumn({
  column
}: {
  column: Column<Case, unknown>
}): React.JSX.Element {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}

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

  const handleInputChange = useCallback(
    (value: number | string): void => column.setFilterValue(value),
    [column]
  )
  if (filterVariant === 'date')
    return (
      <div className="flex flex-col gap-1">
        <Input
          type="date"
          value={columnFilterValue?.[0] ?? ''}
          onChange={(e) =>
            column.setFilterValue((old: [string, string]) => [e.target.value, old?.[1]])
          }
          className="h-6 rounded"
        />
        {/* <Input
          type="date"
          value={columnFilterValue?.[1] ?? ''}
          onChange={(e) =>
            column.setFilterValue((old: [string, string]) => [old?.[0], e.target.value])
          }
          className="h-8"
        /> */}
      </div>
    )

  return filterVariant === 'range' ? (
    <div className="flex space-x-2">
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
        className="border shadow rounded h-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0 px-1"
      />
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={handleMaxRangeChange}
        placeholder={
          column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
        }
        className="border shadow rounded h-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0 px-1"
      />
    </div>
  ) : filterVariant === 'select' ? (
    <Select
      onValueChange={(value) => column.setFilterValue(value)}
      value={columnFilterValue?.toString() ?? ''}
    >
      <SelectTrigger className="w-full h-6! rounded">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Resolved">Resolved</SelectItem>
        <SelectItem value="Canceled">Canceled</SelectItem>
        <SelectItem value="Process">Process</SelectItem>
      </SelectContent>
    </Select>
  ) : (
    <DebouncedInput
      className="border shadow rounded h-6"
      onChange={handleInputChange}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  )
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>): React.JSX.Element {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}
