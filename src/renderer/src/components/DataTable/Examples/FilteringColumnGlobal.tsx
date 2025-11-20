import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

type User = {
  id: string
  name: string
  email: string
  age: number
  status: 'active' | 'invited' | 'disabled'
}

const initialData: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@acme.com', age: 28, status: 'active' },
  { id: '2', name: 'Bob Lee', email: 'bob@acme.com', age: 35, status: 'invited' },
  { id: '3', name: 'Carla Gomez', email: 'carla@damn.com', age: 42, status: 'disabled' },
  { id: '4', name: 'Daniel Kim', email: 'daniel@acme.com', age: 23, status: 'active' },
  { id: '5', name: 'Eva Rossi', email: 'eva@acme.com', age: 31, status: 'active' }
]

function NumberRangeFilter({
  column
}: {
  column: any // minimal typing here to keep the demo concise
}) {
  // why: show range filter for numeric columns; empty values mean "no bound"
  const min = (column.getFacetedMinMaxValues()?.[0] ?? '') as number | ''
  const max = (column.getFacetedMinMaxValues()?.[1] ?? '') as number | ''
  const val = (column.getFilterValue() as [number | '', number | '']) ?? ['', '']
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        type="number"
        placeholder={min !== '' ? `min (${min})` : 'min'}
        value={val[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue([e.target.value === '' ? '' : Number(e.target.value), val[1]])
        }
        style={{ width: 80 }}
      />
      <input
        type="number"
        placeholder={max !== '' ? `max (${max})` : 'max'}
        value={val[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue([val[0], e.target.value === '' ? '' : Number(e.target.value)])
        }
        style={{ width: 80 }}
      />
    </div>
  )
}

export default function FilteringDemo() {
  const [data] = React.useState<User[]>(initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        // why: string includes makes sense for name
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      },
      {
        header: 'Email',
        accessorKey: 'email',
        filterFn: 'includesString'
      },
      {
        header: 'Age',
        accessorKey: 'age',
        // why: demonstrate numeric range filter
        filterFn: 'inNumberRange'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        // why: equality filter via select for categorical column
        filterFn: 'equalsString',
        cell: ({ getValue }) => {
          const v = getValue<User['status']>()
          return <span style={{ textTransform: 'capitalize' }}>{v}</span>
        }
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'equalsString' // why: generic search that matches text-like cells
  })

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ marginBottom: 8 }}>TanStack Table – Column vs Global Filtering</h2>

      {/* Global Filtering */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="global" style={{ fontWeight: 600, marginRight: 8 }}>
          Global search:
        </label>
        <input
          id="global"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search across name, email, status..."
          style={{ width: 320 }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ textAlign: 'left', borderBottom: '1px solid #ddd', paddingBottom: 8 }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ userSelect: 'none', cursor: 'pointer' }}
                      title="Click to sort"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' ▲',
                        desc: ' ▼'
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                  {/* Column Filtering UIs */}
                  {header.column.getCanFilter() && (
                    <div style={{ marginTop: 6 }}>
                      {header.column.id === 'age' ? (
                        <NumberRangeFilter column={header.column} />
                      ) : header.column.id === 'status' ? (
                        <select
                          value={(header.column.getFilterValue() as string) ?? ''}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value || undefined)
                          }
                          style={{ width: '100%' }}
                        >
                          <option value="">All</option>
                          <option value="active">active</option>
                          <option value="invited">invited</option>
                          <option value="disabled">disabled</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={(header.column.getFilterValue() as string) ?? ''}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                          placeholder={`Filter ${header.column.id}`}
                          style={{ width: '100%' }}
                        />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        Showing {table.getRowModel().rows.length} of {data.length} rows
        <pre>{JSON.stringify({ columnFilters: table.getState().sorting }, null, 2)}</pre>
      </div>
    </div>
  )
}
